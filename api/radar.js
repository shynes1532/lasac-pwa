// ============================================================
// RADAR DE MERCADO — función serverless (Vercel)
//
// Busca en la web con Exa (vía Vercel AI Gateway) y devuelve un
// informe estructurado de inteligencia comercial para el Grupo LASAC.
//
// Variables de entorno (ver .env.example):
//   AI_GATEWAY_API_KEY   obligatoria — key del AI Gateway de Vercel
//   RADAR_ACCESS_CODE    obligatoria — código interno; sin esto el endpoint no responde
//   RADAR_MODEL          opcional    — modelo del gateway (default: anthropic/claude-opus-5)
//   RADAR_MAX_DIA        opcional    — tope de búsquedas por día e instancia (default: 120)
// ============================================================
import { timingSafeEqual } from 'node:crypto';
import { gateway, generateText, stepCountIs } from 'ai';
import {
  getPreset,
  PERIODOS_VALIDOS,
  PERIODO_DEFAULT,
  MAX_CONSULTA,
} from '../src/data/radar.js';

const MODELO = process.env.RADAR_MODEL || 'anthropic/claude-opus-5';
const MAX_DIA = Number(process.env.RADAR_MAX_DIA || 120);

// Caché en memoria: la instancia vive lo suficiente como para evitar que dos
// gerentes consultando lo mismo gasten dos búsquedas.
const CACHE_MS = 30 * 60 * 1000;
const cache = new Map();

// Contadores best-effort (por instancia; no son un rate limit estricto).
const usoPorIp = new Map();
let usoDia = { fecha: null, total: 0 };

const LIMITE_IP_HORA = 20;

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Método no permitido.' });
  }

  const accessCode = process.env.RADAR_ACCESS_CODE;
  if (!accessCode) {
    return json(res, 503, {
      error: 'Radar sin configurar: falta la variable RADAR_ACCESS_CODE en Vercel.',
    });
  }
  if (!process.env.AI_GATEWAY_API_KEY) {
    return json(res, 503, {
      error: 'Radar sin configurar: falta la variable AI_GATEWAY_API_KEY en Vercel.',
    });
  }

  const codigoRecibido = String(req.headers['x-radar-code'] || '');
  if (!comparaSegura(codigoRecibido, accessCode)) {
    return json(res, 401, { error: 'Código de acceso inválido.' });
  }

  const body = leerBody(req);
  const preset = getPreset(body.preset || 'libre');
  if (!preset) return json(res, 400, { error: 'Preset desconocido.' });

  const consulta = String(body.consulta || '').trim().slice(0, MAX_CONSULTA);
  if (!consulta && !preset.consultaBase) {
    return json(res, 400, { error: 'Escribí qué querés buscar.' });
  }

  const periodo = PERIODOS_VALIDOS.includes(Number(body.periodo))
    ? Number(body.periodo)
    : PERIODO_DEFAULT;

  const ahora = Date.now();
  const clave = `${preset.id}|${periodo}|${consulta.toLowerCase()}`;

  const enCache = cache.get(clave);
  if (enCache && ahora - enCache.ts < CACHE_MS) {
    return json(res, 200, { ...enCache.data, cacheado: true });
  }

  const limite = chequearLimites(req, ahora);
  if (limite) return json(res, 429, { error: limite });

  const desde = new Date(ahora - periodo * 24 * 60 * 60 * 1000).toISOString();
  const hoy = new Date(ahora).toISOString().slice(0, 10);
  const consultaFinal = consulta || preset.consultaBase;

  try {
    const resultado = await generateText({
      model: MODELO,
      system: SYSTEM_PROMPT,
      prompt: armarPrompt({ preset, consulta: consultaFinal, periodo, hoy }),
      tools: {
        exa_search: gateway.tools.exaSearch({
          type: 'auto',
          numResults: 8,
          ...(preset.categoria ? { category: preset.categoria } : {}),
          ...(preset.dominios?.length ? { includeDomains: preset.dominios } : {}),
          userLocation: 'AR',
          startPublishedDate: desde,
          contents: {
            text: { maxCharacters: 2500 },
            highlights: true,
            maxAgeHours: 12,
          },
        }),
      },
      stopWhen: stepCountIs(4),
      providerOptions: { gateway: { tags: ['lasac-radar', preset.id] } },
    });

    const informe = parsearInforme(resultado.text);
    if (!informe) {
      return json(res, 502, {
        error: 'El modelo no devolvió un informe legible. Probá de nuevo o acotá la consulta.',
      });
    }

    const data = {
      generadoEn: new Date(ahora).toISOString(),
      preset: preset.id,
      consulta: consultaFinal,
      periodo,
      modelo: MODELO,
      resumen: informe.resumen || '',
      hallazgos: (informe.hallazgos || []).slice(0, 8),
      acciones: (informe.acciones || []).slice(0, 5),
      fuentes: extraerFuentes(resultado),
      cacheado: false,
    };

    cache.set(clave, { ts: ahora, data });
    podarCache(ahora);

    return json(res, 200, data);
  } catch (err) {
    console.error('[radar] error', err);
    return json(res, 502, {
      error: 'No se pudo completar la búsqueda. Reintentá en un minuto.',
      detalle: process.env.NODE_ENV === 'development' ? String(err?.message || err) : undefined,
    });
  }
}

// ------------------------------------------------------------
// Prompting
// ------------------------------------------------------------
const SYSTEM_PROMPT = [
  'Sos analista de inteligencia comercial del Grupo LASAC, concesionario oficial de FIAT, JAC,',
  'Forthing y Dongfeng en Tierra del Fuego (sucursales en Ushuaia y Río Grande).',
  'Tu lector es el Director Comercial: escribí en español rioplatense, directo y sin relleno.',
  '',
  'Reglas:',
  '1. Usá SIEMPRE la herramienta exa_search antes de responder. No respondas de memoria.',
  '2. Cada hallazgo tiene que apoyarse en una nota concreta que hayas encontrado, con su URL real.',
  '3. Si un dato no aparece en las fuentes, no lo inventes: decilo como "sin dato".',
  '4. Los precios son referencias de prensa, no listas oficiales nuestras: aclaralo cuando corresponda.',
  '5. Si la búsqueda no trae nada relevante, devolvé hallazgos vacíos y explicalo en el resumen.',
  '',
  'Devolvé ÚNICAMENTE un objeto JSON válido, sin texto alrededor ni bloques de código, con esta forma:',
  '{',
  '  "resumen": "2 o 3 oraciones con lo más importante del período",',
  '  "hallazgos": [',
  '    {',
  '      "titulo": "titular corto",',
  '      "detalle": "qué pasó, con los números concretos que aparezcan en la fuente",',
  '      "impacto": "qué significa para LASAC en Tierra del Fuego",',
  '      "relevancia": "alta" | "media" | "baja",',
  '      "fecha": "YYYY-MM-DD o texto corto si no hay fecha exacta",',
  '      "medio": "nombre del medio",',
  '      "url": "URL exacta de la nota"',
  '    }',
  '  ],',
  '  "acciones": ["acción concreta y accionable para el equipo comercial"]',
  '}',
].join('\n');

function armarPrompt({ preset, consulta, periodo, hoy }) {
  return [
    `Fecha de hoy: ${hoy}.`,
    `Ventana de análisis: últimos ${periodo} días.`,
    `Eje del informe: ${preset.label}.`,
    preset.foco,
    '',
    `Consulta del Director Comercial: "${consulta}"`,
    '',
    'Buscá en la web, quedate con lo que realmente mueve la aguja de un concesionario',
    'multimarca fueguino y armá el informe. Máximo 6 hallazgos, ordenados por relevancia.',
  ].join('\n');
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function json(res, status, payload) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).send(JSON.stringify(payload));
}

function leerBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  return req.body;
}

function comparaSegura(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function chequearLimites(req, ahora) {
  const hoy = new Date(ahora).toISOString().slice(0, 10);
  if (usoDia.fecha !== hoy) usoDia = { fecha: hoy, total: 0 };
  if (usoDia.total >= MAX_DIA) {
    return 'Se alcanzó el tope diario de búsquedas del radar. Volvé a intentar mañana.';
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'sin-ip';
  const previo = usoPorIp.get(ip);
  const ventana = 60 * 60 * 1000;
  if (previo && ahora - previo.desde < ventana) {
    if (previo.total >= LIMITE_IP_HORA) {
      return 'Demasiadas búsquedas seguidas. Esperá unos minutos.';
    }
    previo.total += 1;
  } else {
    usoPorIp.set(ip, { desde: ahora, total: 1 });
  }

  usoDia.total += 1;
  return null;
}

// El modelo puede envolver el JSON en ```json ... ``` o agregar una línea previa.
function parsearInforme(texto) {
  if (!texto) return null;
  const limpio = texto.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const candidatos = [limpio];

  const desde = limpio.indexOf('{');
  const hasta = limpio.lastIndexOf('}');
  if (desde !== -1 && hasta > desde) candidatos.push(limpio.slice(desde, hasta + 1));

  for (const c of candidatos) {
    try {
      const obj = JSON.parse(c);
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) return obj;
    } catch { /* siguiente candidato */ }
  }
  return null;
}

// Recorre los resultados de la herramienta buscando objetos { title, url }.
// El formato exacto que devuelve Exa puede variar, así que vamos a lo seguro.
function extraerFuentes(resultado) {
  const fuentes = new Map();

  const visitar = (nodo, profundidad = 0) => {
    if (!nodo || profundidad > 6) return;
    if (Array.isArray(nodo)) {
      nodo.forEach((n) => visitar(n, profundidad + 1));
      return;
    }
    if (typeof nodo !== 'object') return;

    const url = typeof nodo.url === 'string' ? nodo.url : null;
    if (url && /^https?:\/\//.test(url) && !fuentes.has(url)) {
      fuentes.set(url, {
        url,
        titulo: typeof nodo.title === 'string' ? nodo.title : dominioDe(url),
        fecha: typeof nodo.publishedDate === 'string' ? nodo.publishedDate.slice(0, 10) : null,
      });
    }
    Object.values(nodo).forEach((v) => visitar(v, profundidad + 1));
  };

  for (const paso of resultado.steps || []) {
    for (const tr of paso.toolResults || []) visitar(tr.output ?? tr.result, 0);
  }
  return [...fuentes.values()].slice(0, 20);
}

function dominioDe(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
}

function podarCache(ahora) {
  for (const [k, v] of cache) {
    if (ahora - v.ts > CACHE_MS) cache.delete(k);
  }
  if (cache.size > 50) cache.clear();
}
