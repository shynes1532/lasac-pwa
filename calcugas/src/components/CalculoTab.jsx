import { useEffect, useMemo, useState } from 'react'
import { ARTEFACTOS, GASES } from '../data/nag200.js'
import { SIGAS_ACCESORIOS } from '../data/sigas.js'
import { ROSCA_ACCESORIOS } from '../data/nag200.js'
import { dimensionarTramo, caudalDesdeArtefactos } from '../engine/calc.js'

const fmt = (n, d = 2) =>
  Number(n).toLocaleString('es-AR', { maximumFractionDigits: d, minimumFractionDigits: 0 })

let uid = 1
const nid = () => `id${Date.now().toString(36)}${uid++}`

const ESTADO_INICIAL = {
  gas: 'natural',
  sistema: 'sigas',
  pc: 9300,
  h: 10,
  artefactos: [
    { id: nid(), tipo: 'cocina', nombre: 'Cocina 4 hornallas c/horno', kcal: 9000 },
    { id: nid(), tipo: 'calefon12', nombre: 'Calefón 12 l/min', kcal: 18500 },
  ],
  tramos: [
    { id: nid(), nombre: 'Tramo A (medidor → 1ª derivación)', longitud: 8, alimenta: 'todos', accesorios: { codo90: 3, llaveEsferica: 1 } },
  ],
}

function cargar() {
  try {
    const raw = localStorage.getItem('cg.proyecto')
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return ESTADO_INICIAL
}

export default function CalculoTab() {
  const [st, setSt] = useState(cargar)
  useEffect(() => {
    localStorage.setItem('cg.proyecto', JSON.stringify(st))
  }, [st])

  const set = (patch) => setSt((s) => ({ ...s, ...patch }))

  const accesoriosDisponibles = st.sistema === 'sigas' ? SIGAS_ACCESORIOS : ROSCA_ACCESORIOS

  // ---- artefactos ----
  const agregarArtefacto = (tipo) => {
    const base = ARTEFACTOS.find((a) => a.id === tipo)
    if (!base) return
    setSt((s) => ({
      ...s,
      artefactos: [...s.artefactos, { id: nid(), tipo, nombre: base.nombre, kcal: base.kcal }],
    }))
  }
  const quitarArtefacto = (id) =>
    setSt((s) => ({
      ...s,
      artefactos: s.artefactos.filter((a) => a.id !== id),
      tramos: s.tramos.map((t) =>
        t.alimenta === 'todos' ? t : { ...t, alimenta: t.alimenta.filter((x) => x !== id) },
      ),
    }))
  const editarArtefacto = (id, patch) =>
    setSt((s) => ({
      ...s,
      artefactos: s.artefactos.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }))

  // ---- tramos ----
  const agregarTramo = () =>
    setSt((s) => ({
      ...s,
      tramos: [
        ...s.tramos,
        { id: nid(), nombre: `Tramo ${String.fromCharCode(65 + s.tramos.length)}`, longitud: 5, alimenta: 'todos', accesorios: {} },
      ],
    }))
  const quitarTramo = (id) => setSt((s) => ({ ...s, tramos: s.tramos.filter((t) => t.id !== id) }))
  const editarTramo = (id, patch) =>
    setSt((s) => ({ ...s, tramos: s.tramos.map((t) => (t.id === id ? { ...t, ...patch } : t)) }))

  // ---- resultados ----
  const resultados = useMemo(() => {
    return st.tramos.map((t) => {
      const lista =
        t.alimenta === 'todos'
          ? st.artefactos
          : st.artefactos.filter((a) => t.alimenta.includes(a.id))
      const { kcal, m3h } = caudalDesdeArtefactos(lista, st.pc)
      const r = dimensionarTramo({
        caudal: m3h,
        longitud: Number(t.longitud) || 0,
        accesorios: t.accesorios,
        sistema: st.sistema,
        gas: st.gas,
        h: Number(st.h) || 10,
      })
      return { tramo: t, kcal, m3h, r, artefactosCount: lista.length }
    })
  }, [st])

  const totalKcal = st.artefactos.reduce((a, x) => a + x.kcal, 0)

  return (
    <div className="space-y-4">
      {/* ------- configuración ------- */}
      <section className="card space-y-3">
        <h2 className="font-bold text-sm text-slate-300">Configuración</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Gas</label>
            <select
              className="input"
              value={st.gas}
              onChange={(e) => {
                const gas = e.target.value
                set({ gas, pc: GASES[gas].pcDefault })
              }}
            >
              <option value="natural">Gas natural</option>
              <option value="envasado">GLP (envasado)</option>
            </select>
          </div>
          <div>
            <label className="label">Sistema</label>
            <select className="input" value={st.sistema} onChange={(e) => set({ sistema: e.target.value })}>
              <option value="sigas">Termofusión (SIGAS)</option>
              <option value="acero">Hierro negro / epoxi</option>
            </select>
          </div>
          <div>
            <label className="label">Poder calorífico (kcal/m³)</label>
            <input
              type="number" inputMode="decimal" className="input" value={st.pc}
              onChange={(e) => set({ pc: Number(e.target.value) || 1 })}
            />
          </div>
          <div>
            <label className="label">Pérdida adm. (mm c.a.)</label>
            <input
              type="number" inputMode="decimal" className="input" value={st.h}
              onChange={(e) => set({ h: Number(e.target.value) || 10 })}
            />
          </div>
        </div>
        <p className="text-[11px] text-slate-500">
          NAG-200: máx. 10 mm c.a. entre medidor y artefacto con todos los artefactos funcionando.
        </p>
      </section>

      {/* ------- artefactos ------- */}
      <section className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-300">Artefactos</h2>
          <span className="chip">{fmt(totalKcal, 0)} kcal/h · {fmt(totalKcal / st.pc)} m³/h</span>
        </div>

        {st.artefactos.map((a) => (
          <div key={a.id} className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{a.nombre}</p>
            </div>
            <input
              type="number" inputMode="numeric"
              className="input !w-24 text-right"
              value={a.kcal}
              onChange={(e) => editarArtefacto(a.id, { kcal: Number(e.target.value) || 0 })}
            />
            <span className="text-[10px] text-slate-500 w-9">kcal/h</span>
            <button onClick={() => quitarArtefacto(a.id)} className="text-slate-500 hover:text-red-400 px-1 text-lg leading-none">×</button>
          </div>
        ))}

        <select
          className="input"
          value=""
          onChange={(e) => e.target.value && agregarArtefacto(e.target.value)}
        >
          <option value="">+ Agregar artefacto…</option>
          {ARTEFACTOS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre} ({fmt(a.kcal, 0)} kcal/h)
            </option>
          ))}
        </select>
      </section>

      {/* ------- tramos ------- */}
      {st.tramos.map((t, i) => {
        const res = resultados[i]
        return (
          <TramoCard
            key={t.id}
            tramo={t}
            res={res}
            artefactos={st.artefactos}
            accesoriosDisponibles={accesoriosDisponibles}
            onEdit={(patch) => editarTramo(t.id, patch)}
            onDelete={() => quitarTramo(t.id)}
          />
        )
      })}

      <button onClick={agregarTramo} className="btn-ghost w-full">＋ Agregar tramo</button>

      <button
        onClick={() => {
          if (confirm('¿Borrar todo el proyecto y empezar de nuevo?')) {
            localStorage.removeItem('cg.proyecto')
            setSt({ ...ESTADO_INICIAL, artefactos: [], tramos: [] })
          }
        }}
        className="w-full text-center text-xs text-slate-600 hover:text-red-400 py-1"
      >
        Reiniciar proyecto
      </button>
    </div>
  )
}

function TramoCard({ tramo, res, artefactos, accesoriosDisponibles, onEdit, onDelete }) {
  const [abierto, setAbierto] = useState(true)
  const el = res.r.elegido

  const setAccesorio = (key, delta) => {
    const actual = tramo.accesorios?.[key] || 0
    const next = Math.max(0, actual + delta)
    onEdit({ accesorios: { ...tramo.accesorios, [key]: next } })
  }

  const toggleArtefacto = (id) => {
    const lista = tramo.alimenta === 'todos' ? artefactos.map((a) => a.id) : [...tramo.alimenta]
    const next = lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]
    onEdit({ alimenta: next.length === artefactos.length ? 'todos' : next })
  }

  return (
    <section className="card space-y-3">
      <div className="flex items-center gap-2">
        <input
          className="input !py-1.5 text-sm font-semibold flex-1"
          value={tramo.nombre}
          onChange={(e) => onEdit({ nombre: e.target.value })}
        />
        <button onClick={() => setAbierto(!abierto)} className="btn-ghost !px-3 !py-1.5 text-sm">
          {abierto ? '▾' : '▸'}
        </button>
        <button onClick={onDelete} className="text-slate-500 hover:text-red-400 text-lg px-1">×</button>
      </div>

      {/* resultado destacado */}
      <div className={`rounded-xl px-4 py-3 flex items-center justify-between ${el ? 'bg-emerald-950/60 border border-emerald-800/60' : 'bg-red-950/60 border border-red-800/60'}`}>
        {el ? (
          <>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">Diámetro</p>
              <p className="text-2xl font-black text-emerald-300 leading-tight">
                {typeof el.dn === 'number' ? `DN ${el.dn}` : el.dn}
                {el.rosca && <span className="text-sm font-semibold text-emerald-500 ml-2">≈ {el.rosca}</span>}
              </p>
            </div>
            <div className="text-right text-xs text-emerald-400/90 space-y-0.5">
              <p>{fmt(res.m3h)} m³/h · {fmt(res.kcal, 0)} kcal/h</p>
              <p>L. equiv: {fmt(el.leTotal)} m</p>
              <p>Uso: {fmt(el.usoPct, 0)}% de capacidad</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-red-300 font-semibold">
            Ningún diámetro alcanza — revisá longitud/caudal
          </p>
        )}
      </div>

      {abierto && (
        <>
          <div>
            <label className="label">Longitud real del tramo (m)</label>
            <input
              type="number" inputMode="decimal" min="0.1" step="0.5" className="input"
              value={tramo.longitud}
              onChange={(e) => onEdit({ longitud: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Artefactos que alimenta ({res.artefactosCount})</label>
            <div className="flex flex-wrap gap-1.5">
              {artefactos.length === 0 && (
                <p className="text-xs text-slate-500">Agregá artefactos arriba.</p>
              )}
              {artefactos.map((a) => {
                const activo = tramo.alimenta === 'todos' || tramo.alimenta.includes(a.id)
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleArtefacto(a.id)}
                    className={`chip transition ${activo ? '!bg-flame-900/60 !border-flame-700 !text-flame-200' : 'opacity-50'}`}
                  >
                    {a.nombre}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="label">Accesorios del tramo</label>
            <div className="space-y-1.5">
              {Object.entries(accesoriosDisponibles).map(([key, acc]) => {
                const cant = tramo.accesorios?.[key] || 0
                return (
                  <div key={key} className={`flex items-center justify-between rounded-lg px-2 py-1 ${cant ? 'bg-slate-800/70' : ''}`}>
                    <span className={`text-sm ${cant ? 'text-slate-200' : 'text-slate-500'}`}>{acc.nombre}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setAccesorio(key, -1)} className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 active:scale-95">−</button>
                      <span className={`w-6 text-center text-sm font-bold ${cant ? 'text-flame-300' : 'text-slate-600'}`}>{cant}</span>
                      <button onClick={() => setAccesorio(key, +1)} className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 active:scale-95">＋</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* tabla de candidatos */}
          <details className="text-xs">
            <summary className="cursor-pointer text-slate-400 font-semibold py-1">
              Ver verificación por diámetro
            </summary>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-right text-[11px]">
                <thead className="text-slate-500">
                  <tr>
                    <th className="text-left py-1">Ø</th>
                    <th>di (mm)</th>
                    <th>L equiv (m)</th>
                    <th>Q adm (m³/h)</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {res.r.candidatos.map((c) => (
                    <tr key={c.dn} className={`border-t border-slate-800 ${c.dn === el?.dn ? 'text-emerald-300 font-bold' : 'text-slate-400'}`}>
                      <td className="text-left py-1">{typeof c.dn === 'number' ? `DN ${c.dn}` : c.dn}</td>
                      <td>{fmt(c.di)}</td>
                      <td>{fmt(c.leTotal)}</td>
                      <td>{fmt(c.qAdmM3h)}</td>
                      <td>{c.cumple ? '✓' : '✗'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </>
      )}
    </section>
  )
}
