import { useState } from 'react'

const fmt = (n, d = 4) =>
  Number.isFinite(n) ? Number(n).toLocaleString('es-AR', { maximumFractionDigits: d }) : '—'

function Converter({ titulo, unidades, base }) {
  // unidades: [{ id, nombre, aBase: x=>, deBase: x=> }]
  const [valor, setValor] = useState('')
  const [unidad, setUnidad] = useState(unidades[0].id)
  const num = parseFloat(String(valor).replace(',', '.'))
  const uActiva = unidades.find((u) => u.id === unidad)
  const enBase = Number.isFinite(num) ? uActiva.aBase(num) : NaN

  return (
    <section className="card space-y-3">
      <h3 className="font-bold text-sm text-flame-300">{titulo}</h3>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          inputMode="decimal"
          placeholder="Valor…"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <select className="input !w-40" value={unidad} onChange={(e) => setUnidad(e.target.value)}>
          {unidades.map((u) => (
            <option key={u.id} value={u.id}>{u.nombre}</option>
          ))}
        </select>
      </div>
      {Number.isFinite(num) && (
        <div className="divide-y divide-slate-800">
          {unidades.filter((u) => u.id !== unidad).map((u) => (
            <div key={u.id} className="flex justify-between py-1.5 text-sm">
              <span className="text-slate-400">{u.nombre}</span>
              <span className="font-mono text-slate-100">{fmt(u.deBase(enBase))}</span>
            </div>
          ))}
        </div>
      )}
      {base && <p className="text-[10px] text-slate-600">{base}</p>}
    </section>
  )
}

export default function EquivalenciasTab() {
  return (
    <div className="space-y-4">
      <Converter
        titulo="Energía / consumo"
        base="Gas natural: PC ≈ 9.300 kcal/m³ (editable en Cálculo). GLP: 22.380 kcal/m³."
        unidades={[
          { id: 'kcalh', nombre: 'kcal/h', aBase: (x) => x, deBase: (x) => x },
          { id: 'kjh', nombre: 'kJ/h', aBase: (x) => x / 4.184, deBase: (x) => x * 4.184 },
          { id: 'kw', nombre: 'kW', aBase: (x) => x * 860, deBase: (x) => x / 860 },
          { id: 'm3hgn', nombre: 'm³/h gas natural', aBase: (x) => x * 9300, deBase: (x) => x / 9300 },
          { id: 'm3hglp', nombre: 'm³/h GLP', aBase: (x) => x * 22380, deBase: (x) => x / 22380 },
          { id: 'kghglp', nombre: 'kg/h GLP', aBase: (x) => x * 11900, deBase: (x) => x / 11900 },
        ]}
      />
      <Converter
        titulo="Longitud"
        unidades={[
          { id: 'm', nombre: 'metros', aBase: (x) => x, deBase: (x) => x },
          { id: 'cm', nombre: 'centímetros', aBase: (x) => x / 100, deBase: (x) => x * 100 },
          { id: 'mm', nombre: 'milímetros', aBase: (x) => x / 1000, deBase: (x) => x * 1000 },
          { id: 'in', nombre: 'pulgadas', aBase: (x) => x * 0.0254, deBase: (x) => x / 0.0254 },
          { id: 'ft', nombre: 'pies', aBase: (x) => x * 0.3048, deBase: (x) => x / 0.3048 },
        ]}
      />
      <Converter
        titulo="Presión"
        base="Baja presión domiciliaria: 180-230 mm c.a. (≈ 18-23 mbar). Pérdida admisible interna: 10 mm c.a."
        unidades={[
          { id: 'mmca', nombre: 'mm c.a.', aBase: (x) => x, deBase: (x) => x },
          { id: 'mbar', nombre: 'mbar', aBase: (x) => x * 10.197, deBase: (x) => x / 10.197 },
          { id: 'kpa', nombre: 'kPa', aBase: (x) => x * 101.97, deBase: (x) => x / 101.97 },
          { id: 'bar', nombre: 'bar', aBase: (x) => x * 10197, deBase: (x) => x / 10197 },
          { id: 'kgcm2', nombre: 'kg/cm²', aBase: (x) => x * 10000, deBase: (x) => x / 10000 },
          { id: 'psi', nombre: 'psi', aBase: (x) => x * 703.07, deBase: (x) => x / 703.07 },
        ]}
      />
      <Converter
        titulo="Caudal"
        unidades={[
          { id: 'm3h', nombre: 'm³/h', aBase: (x) => x, deBase: (x) => x },
          { id: 'lh', nombre: 'litros/h', aBase: (x) => x / 1000, deBase: (x) => x * 1000 },
          { id: 'lmin', nombre: 'litros/min', aBase: (x) => (x * 60) / 1000, deBase: (x) => (x * 1000) / 60 },
          { id: 'm3d', nombre: 'm³/día', aBase: (x) => x / 24, deBase: (x) => x * 24 },
        ]}
      />
      <Converter
        titulo="Diámetros comerciales"
        base="Correspondencia usual rosca ↔ termofusión: 1/2→DN20 · 3/4→DN25 · 1→DN32 · 1 1/4→DN40 · 1 1/2→DN50 · 2→DN63."
        unidades={[
          { id: 'inch', nombre: 'pulgadas', aBase: (x) => x * 25.4, deBase: (x) => x / 25.4 },
          { id: 'mm', nombre: 'milímetros', aBase: (x) => x, deBase: (x) => x },
        ]}
      />
    </div>
  )
}
