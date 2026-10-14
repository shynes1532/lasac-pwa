import React, { useState, useEffect, useMemo } from 'react';
import { PRESETS, PERIODOS, PERIODO_DEFAULT, MAX_CONSULTA } from '../data/radar.js';

// ============================================================
// RADAR DE MERCADO — pantalla INTERNA (no aparece en la nav del cliente).
// Se accede por hash: https://<app>/#radar
// Consulta a /api/radar, que busca en la web con Exa vía Vercel AI Gateway.
// ============================================================

const CODE_KEY = 'lasac-radar-code';

const RELEVANCIA = {
  alta: { label: 'Alta', clase: 'bg-red-500/20 text-red-300 border-red-500/40' },
  media: { label: 'Media', clase: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  baja: { label: 'Baja', clase: 'bg-white/10 text-white/60 border-white/20' },
};

export default function RadarMercado({ onSalir }) {
  const [codigo, setCodigo] = useState(() => {
    try { return localStorage.getItem(CODE_KEY) || ''; } catch { return ''; }
  });
  const [codigoInput, setCodigoInput] = useState('');
  const [preset, setPreset] = useState('competencia');
  const [consulta, setConsulta] = useState('');
  const [periodo, setPeriodo] = useState(PERIODO_DEFAULT);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [informe, setInforme] = useState(null);
  const [copiado, setCopiado] = useState(false);

  const presetActivo = useMemo(
    () => PRESETS.find((p) => p.id === preset) || PRESETS[0],
    [preset],
  );

  useEffect(() => {
    if (!copiado) return;
    const t = setTimeout(() => setCopiado(false), 2000);
    return () => clearTimeout(t);
  }, [copiado]);

  const guardarCodigo = (e) => {
    e.preventDefault();
    const valor = codigoInput.trim();
    if (!valor) return;
    try { localStorage.setItem(CODE_KEY, valor); } catch { /* ignore */ }
    setCodigo(valor);
    setCodigoInput('');
  };

  const cerrarSesion = () => {
    try { localStorage.removeItem(CODE_KEY); } catch { /* ignore */ }
    setCodigo('');
    setInforme(null);
    setError(null);
  };

  const buscar = async () => {
    if (cargando) return;
    setCargando(true);
    setError(null);
    try {
      const res = await fetch('/api/radar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-radar-code': codigo },
        body: JSON.stringify({ preset, consulta: consulta.trim(), periodo }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) cerrarSesion();
        throw new Error(data.error || `Error ${res.status}`);
      }
      setInforme(data);
    } catch (err) {
      setError(err.message || 'No se pudo completar la búsqueda.');
      setInforme(null);
    } finally {
      setCargando(false);
    }
  };

  const copiar = async () => {
    if (!informe) return;
    try {
      await navigator.clipboard.writeText(informeATexto(informe, presetActivo));
      setCopiado(true);
    } catch { /* clipboard no disponible */ }
  };

  // ---------- Pantalla de acceso ----------
  if (!codigo) {
    return (
      <Shell onSalir={onSalir}>
        <form onSubmit={guardarCodigo} className="mt-16 bg-white/[0.06] border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="text-lg font-bold">Acceso interno</h2>
            <p className="text-sm text-white/60 mt-1">
              Esta herramienta es para el equipo comercial. Ingresá el código interno.
            </p>
          </div>
          <input
            type="password"
            value={codigoInput}
            onChange={(e) => setCodigoInput(e.target.value)}
            placeholder="Código de acceso"
            autoFocus
            className="w-full bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-xl transition-colors"
          >
            Entrar
          </button>
        </form>
      </Shell>
    );
  }

  // ---------- Radar ----------
  return (
    <Shell onSalir={onSalir} onCerrarSesion={cerrarSesion}>
      {/* Presets */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-3 px-3 py-1">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPreset(p.id)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              preset === p.id
                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                : 'bg-white/[0.06] border-white/10 text-white/60 hover:text-white/90'
            }`}
          >
            <span className="mr-1">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-white/40 mt-2 px-0.5">{presetActivo.desc}</p>

      {/* Consulta */}
      <div className="mt-3 space-y-3">
        <textarea
          value={consulta}
          onChange={(e) => setConsulta(e.target.value.slice(0, MAX_CONSULTA))}
          rows={2}
          placeholder={presetActivo.placeholder}
          className="w-full bg-black/30 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 resize-none"
        />

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/40 shrink-0">Período:</span>
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriodo(p.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                periodo === p.id
                  ? 'bg-white/15 border-white/30 text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          onClick={buscar}
          disabled={cargando}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {cargando ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Buscando en la web…
            </>
          ) : (
            <>🛰️ Generar informe</>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-500/15 border border-red-500/30 rounded-xl p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {cargando && !informe && <Esqueleto />}

      {informe && (
        <div className="mt-5 space-y-4">
          {/* Resumen */}
          <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-500/[0.03] border border-emerald-400/25 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h2 className="font-bold text-sm text-emerald-200">Resumen ejecutivo</h2>
              <button
                onClick={copiar}
                className="text-[10px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full shrink-0"
              >
                {copiado ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
            <p className="text-sm text-white/85 leading-relaxed">{informe.resumen}</p>
            <p className="text-[10px] text-white/40 mt-3">
              {fechaCorta(informe.generadoEn)} · últimos {informe.periodo} días
              {informe.cacheado ? ' · resultado cacheado' : ''}
            </p>
          </div>

          {/* Hallazgos */}
          {informe.hallazgos?.length > 0 ? (
            <div className="space-y-3">
              {informe.hallazgos.map((h, i) => {
                const rel = RELEVANCIA[h.relevancia] || RELEVANCIA.baja;
                return (
                  <article key={i} className="bg-white/[0.06] border border-white/10 rounded-2xl p-4 card-hover">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-[15px] leading-snug">{h.titulo}</h3>
                      <span className={`shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full border ${rel.clase}`}>
                        {rel.label}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{h.detalle}</p>
                    {h.impacto && (
                      <p className="text-sm text-emerald-200/90 leading-relaxed mt-2 pl-3 border-l-2 border-emerald-400/40">
                        <span className="font-semibold">Impacto: </span>
                        {h.impacto}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-3 text-[10px] text-white/40">
                      {h.medio && <span className="font-semibold text-white/55">{h.medio}</span>}
                      {h.fecha && <span>· {h.fecha}</span>}
                      {h.url && (
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-emerald-300 hover:text-emerald-200 font-semibold"
                        >
                          Ver nota ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-white/50 text-center py-6">
              No hubo hallazgos relevantes en este período.
            </p>
          )}

          {/* Acciones */}
          {informe.acciones?.length > 0 && (
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
              <h2 className="font-bold text-sm mb-2">⚡ Acciones sugeridas</h2>
              <ul className="space-y-2">
                {informe.acciones.map((a, i) => (
                  <li key={i} className="text-sm text-white/75 leading-relaxed flex gap-2">
                    <span className="text-emerald-400 shrink-0">→</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fuentes */}
          {informe.fuentes?.length > 0 && (
            <details className="bg-white/[0.04] border border-white/10 rounded-2xl p-4">
              <summary className="text-xs font-bold text-white/60 cursor-pointer">
                Fuentes consultadas ({informe.fuentes.length})
              </summary>
              <ul className="mt-3 space-y-2">
                {informe.fuentes.map((f) => (
                  <li key={f.url} className="text-[11px] leading-snug">
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white/90"
                    >
                      {f.titulo}
                    </a>
                    {f.fecha && <span className="text-white/30"> · {f.fecha}</span>}
                  </li>
                ))}
              </ul>
            </details>
          )}

          <p className="text-[10px] text-white/30 leading-relaxed pb-4">
            Informe generado automáticamente a partir de prensa pública. Los precios que aparecen
            son referencias periodísticas de terceros, no listas oficiales de LASAC. Verificá antes
            de usarlo con un cliente.
          </p>
        </div>
      )}
    </Shell>
  );
}

// ------------------------------------------------------------
function Shell({ children, onSalir, onCerrarSesion }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="h-1 bg-emerald-500" />
        <div className="max-w-lg mx-auto flex justify-between items-center gap-2 p-3">
          <div className="min-w-0">
            <h1 className="font-bold text-sm truncate">🛰️ Radar de Mercado</h1>
            <p className="text-[10px] text-white/40">Uso interno · Grupo LASAC</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onCerrarSesion && (
              <button
                onClick={onCerrarSesion}
                className="text-[11px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-full"
              >
                Salir
              </button>
            )}
            <button
              onClick={onSalir}
              className="text-[11px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-full whitespace-nowrap"
            >
              ← App
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-lg mx-auto p-3">{children}</main>
    </div>
  );
}

function Esqueleto() {
  return (
    <div className="mt-5 space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="loading-shimmer rounded-2xl h-24 border border-white/10" />
      ))}
    </div>
  );
}

function fechaCorta(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('es-AR', {
      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
    });
  } catch { return iso; }
}

// Texto plano listo para pegar en WhatsApp o mail.
function informeATexto(informe, preset) {
  const lineas = [
    `🛰️ RADAR DE MERCADO — ${preset.label}`,
    `${fechaCorta(informe.generadoEn)} · últimos ${informe.periodo} días`,
    '',
    informe.resumen,
    '',
  ];
  (informe.hallazgos || []).forEach((h, i) => {
    lineas.push(`${i + 1}. ${h.titulo} [${(h.relevancia || '').toUpperCase()}]`);
    lineas.push(h.detalle);
    if (h.impacto) lineas.push(`Impacto: ${h.impacto}`);
    if (h.url) lineas.push(`${h.medio || 'Fuente'}: ${h.url}`);
    lineas.push('');
  });
  if (informe.acciones?.length) {
    lineas.push('ACCIONES SUGERIDAS');
    informe.acciones.forEach((a) => lineas.push(`- ${a}`));
    lineas.push('');
  }
  lineas.push('Referencias de prensa pública. Verificar antes de usar con un cliente.');
  return lineas.join('\n');
}
