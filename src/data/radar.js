// ============================================================
// RADAR DE MERCADO — configuración compartida
// La usan tanto el front (src/components/RadarMercado.jsx) como la
// función serverless (api/radar.js), para que presets, dominios y
// períodos no se desincronicen.
// ============================================================

// ---------- PERÍODOS ----------
export const PERIODOS = [
  { id: 7, label: '7 días' },
  { id: 30, label: '30 días' },
  { id: 90, label: '90 días' },
];

export const PERIODO_DEFAULT = 30;
export const PERIODOS_VALIDOS = PERIODOS.map((p) => p.id);

// ---------- DOMINIOS ----------
// Prensa automotriz y económica argentina: es donde aparecen precios de
// lista, lanzamientos y patentamientos con fecha confiable.
export const DOMINIOS_AUTOMOTRIZ = [
  'autoblog.com.ar',
  'motor1.uol.com.ar',
  'autocosmos.com.ar',
  'parabrisas.perfil.com',
  'autotest.com.ar',
  'mega-autos.com.ar',
  '16valvulas.com.ar',
  'infoauto.com.ar',
  'cronica.com.ar',
  'lanacion.com.ar',
  'infobae.com',
  'clarin.com',
];

export const DOMINIOS_ECONOMICOS = [
  'cronista.com',
  'ambito.com',
  'iprofesional.com',
  'lanacion.com.ar',
  'infobae.com',
  'acara.org.ar',
  'adefa.org.ar',
];

export const DOMINIOS_TDF = [
  'eldiariodelfindelmundo.com',
  'infofueguina.com',
  'actualidadtdf.com.ar',
  'surenio.com.ar',
  'tiempofueguino.com',
];

// ---------- PRESETS ----------
// `foco` es la instrucción que se le suma al pedido de búsqueda.
// `consultaBase` es el texto que se usa si el usuario no escribe nada.
export const PRESETS = [
  {
    id: 'competencia',
    icon: '🎯',
    label: 'Competencia',
    desc: 'Precios de lista, lanzamientos y promos de otras marcas',
    consultaBase:
      'precios de lista y promociones de autos 0km en Argentina: Toyota, Volkswagen, Chevrolet, Renault, Peugeot, Ford',
    placeholder: 'Ej: bonificaciones de Toyota Yaris y VW Polo',
    foco:
      'Precios de lista, bonificaciones, planes de financiación y lanzamientos de marcas competidoras en Argentina. ' +
      'Prestá atención a los segmentos donde competimos: hatch chico, sedán compacto, SUV compacto y pick-up mediana.',
    dominios: DOMINIOS_AUTOMOTRIZ,
    categoria: 'news',
  },
  {
    id: 'marcas',
    icon: '🚗',
    label: 'Nuestras marcas',
    desc: 'FIAT, JAC, Forthing y Dongfeng en Argentina',
    consultaBase:
      'novedades de FIAT, JAC, Forthing y Dongfeng en Argentina: lanzamientos, precios, producción y red de concesionarios',
    placeholder: 'Ej: nueva Fiat Titano o llegada de Forthing',
    foco:
      'Novedades de las marcas que representa el Grupo LASAC (FIAT, JAC, Forthing, Dongfeng) en Argentina: ' +
      'lanzamientos, restyling, cambios de precio, stock, producción en Córdoba y anuncios de la terminal.',
    dominios: DOMINIOS_AUTOMOTRIZ,
    categoria: 'news',
  },
  {
    id: 'plan-ahorro',
    icon: '📋',
    label: 'Plan de Ahorro',
    desc: 'Planes, cuotas, tasas y financiación del mercado',
    consultaBase:
      'plan de ahorro automotor Argentina: cambios en cuotas, valor móvil, tasas de interés y créditos prendarios para autos 0km',
    placeholder: 'Ej: créditos prendarios UVA para 0km',
    foco:
      'Plan de ahorro automotor y financiación de 0km en Argentina: valor móvil, ajustes de cuota, ' +
      'condiciones de adjudicación, créditos prendarios, tasas bancarias y programas de las terminales.',
    dominios: [...DOMINIOS_ECONOMICOS, ...DOMINIOS_AUTOMOTRIZ],
    categoria: 'news',
  },
  {
    id: 'mercado',
    icon: '📊',
    label: 'Mercado',
    desc: 'Patentamientos, impuestos internos y volumen del sector',
    consultaBase:
      'patentamientos de autos 0km en Argentina, ranking de modelos más vendidos, impuestos internos y proyecciones del mercado automotor',
    placeholder: 'Ej: patentamientos del mes y ranking por modelo',
    foco:
      'Volumen y contexto del mercado automotor argentino: patentamientos ACARA, ranking de modelos, ' +
      'impuestos internos, importaciones, tipo de cambio aplicado a listas de precios y proyecciones del sector.',
    dominios: DOMINIOS_ECONOMICOS,
    categoria: 'news',
  },
  {
    id: 'tdf',
    icon: '🧊',
    label: 'Tierra del Fuego',
    desc: 'Régimen fiscal, economía y consumo en Ushuaia y Río Grande',
    consultaBase:
      'Tierra del Fuego: régimen de promoción industrial, impuestos provinciales, actividad económica y consumo en Ushuaia y Río Grande',
    placeholder: 'Ej: cambios en el régimen fiscal fueguino',
    foco:
      'Contexto de Tierra del Fuego que afecta la venta de autos: régimen de promoción, sellado provincial, ' +
      'paritarias y empleo local, turismo, y cualquier medida que cambie el poder de compra en Ushuaia y Río Grande.',
    dominios: [...DOMINIOS_TDF, ...DOMINIOS_ECONOMICOS],
    categoria: 'news',
  },
  {
    id: 'libre',
    icon: '🔎',
    label: 'Búsqueda libre',
    desc: 'Preguntá cualquier cosa sobre el mercado',
    consultaBase: '',
    placeholder: 'Ej: qué pick-ups chinas se venden en Argentina',
    foco:
      'Respondé exactamente lo que pide la consulta, siempre con foco en el negocio de un concesionario ' +
      'multimarca en Tierra del Fuego.',
    dominios: [],
    categoria: null,
  },
];

export const getPreset = (id) => PRESETS.find((p) => p.id === id) || null;

// Límites (validados también del lado del servidor).
export const MAX_CONSULTA = 300;
