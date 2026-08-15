import { useState } from 'react'
import { SIGAS_TABLA_COMPLETA, SIGAS_DIAMETROS } from '../data/sigas.js'
import { ROSCA_ACCESORIOS, ACERO_DIAMETROS } from '../data/nag200.js'

const fmt = (n, d = 3) => Number(n).toLocaleString('es-AR', { maximumFractionDigits: d })

export default function AccesoriosTab() {
  const [modo, setModo] = useState('sigas')
  const [filtro, setFiltro] = useState('')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setModo('sigas')}
          className={modo === 'sigas' ? 'btn-primary' : 'btn-ghost'}
        >
          Termofusión
        </button>
        <button
          onClick={() => setModo('rosca')}
          className={modo === 'rosca' ? 'btn-primary' : 'btn-ghost'}
        >
          Rosca (NAG-200)
        </button>
      </div>

      {modo === 'sigas' && (
        <>
          <input
            className="input"
            placeholder="Buscar accesorio… (ej: codo, te, llave)"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <p className="text-[11px] text-slate-500">
            Longitud equivalente en metros de caño recto — Tabla Nº3, Manual Técnico SIGAS Thermofusión®.
          </p>
          {SIGAS_TABLA_COMPLETA.map((g) => {
            const items = g.items.filter(
              ([n]) =>
                !filtro ||
                g.grupo.toLowerCase().includes(filtro.toLowerCase()) ||
                n.toLowerCase().includes(filtro.toLowerCase()),
            )
            if (!items.length) return null
            return (
              <section key={g.grupo} className="card">
                <h3 className="font-bold text-sm text-flame-300 mb-2">{g.grupo}</h3>
                <div className="divide-y divide-slate-800">
                  {items.map(([nombre, le], i) => (
                    <div key={i} className="flex justify-between py-1.5 text-sm">
                      <span className="text-slate-300">{nombre}</span>
                      <span className="font-mono text-slate-100">{fmt(le)} m</span>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </>
      )}

      {modo === 'rosca' && (
        <>
          <p className="text-[11px] text-slate-500">
            NAG-200 Tabla Nº18 — longitudes equivalentes de accesorios a rosca, expresadas en
            diámetros (multiplicar por el di del caño). Abajo, ya convertidas a metros por diámetro.
          </p>
          <section className="card overflow-x-auto">
            <table className="w-full text-[11px] text-right">
              <thead className="text-slate-500">
                <tr>
                  <th className="text-left py-1.5">Accesorio</th>
                  <th className="py-1.5">n×Ø</th>
                  {ACERO_DIAMETROS.slice(0, 7).map((d) => (
                    <th key={d.dn} className="py-1.5 px-1">{d.dn}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.values(ROSCA_ACCESORIOS).map((a) => (
                  <tr key={a.nombre} className="border-t border-slate-800">
                    <td className="text-left py-1.5 text-slate-300">{a.nombre}</td>
                    <td className="font-mono text-flame-300">{a.nd}d</td>
                    {ACERO_DIAMETROS.slice(0, 7).map((d) => (
                      <td key={d.dn} className="font-mono text-slate-400 px-1">
                        {fmt((a.nd * d.di) / 1000, 2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-slate-600 mt-2">Valores en metros de caño recto equivalente.</p>
          </section>
        </>
      )}

      <section className="card">
        <h3 className="font-bold text-sm text-slate-300 mb-2">Diámetros del sistema</h3>
        <table className="w-full text-xs text-right">
          <thead className="text-slate-500">
            <tr>
              <th className="text-left py-1">DN ext.</th>
              <th>Ø interior</th>
              <th>Rosca equiv.</th>
            </tr>
          </thead>
          <tbody>
            {SIGAS_DIAMETROS.map((d) => (
              <tr key={d.dn} className="border-t border-slate-800 text-slate-300">
                <td className="text-left py-1.5 font-semibold">DN {d.dn}</td>
                <td className="font-mono">{fmt(d.di, 2)} mm</td>
                <td>{d.rosca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
