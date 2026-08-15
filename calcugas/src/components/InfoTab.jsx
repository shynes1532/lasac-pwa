import { SIGAS_FUSION } from '../data/sigas.js'

export default function InfoTab() {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <section className="card space-y-2">
        <h2 className="font-bold text-flame-300">Método de cálculo</h2>
        <p className="text-slate-300">
          La app aplica el método de la <b>NAG-200</b> (ENARGAS), § 5.2.8 «Diámetro de la cañería»:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-slate-400">
          <li>Caudal máximo: suma de consumos de los artefactos que alimenta cada tramo, dividida por el poder calorífico del gas.</li>
          <li>Longitud de cálculo: longitud real del tramo <b>+ longitud equivalente</b> de cada accesorio (la resistencia del accesorio expresada en metros de caño recto).</li>
          <li>Pérdida de carga admisible: <b>10 mm de columna de agua</b> (0,1 kPa) entre medidor y artefacto, con todos los artefactos funcionando.</li>
          <li>Se adopta el menor diámetro comercial cuyo caudal admisible cubre el requerido. La verificación es iterativa: las longitudes equivalentes se recalculan para cada diámetro candidato.</li>
        </ol>
        <p className="text-slate-400">
          Fórmula de caudal admisible (baja presión):{' '}
          <span className="font-mono text-slate-200">Q = √(5·di⁵·h / (s·L))</span> con di en mm, h en
          mm c.a., L en m, s = densidad relativa (0,65 GN / 1,52 GLP). Reproduce la Tabla 3 de la
          NAG-200 y las Tablas 4 y 6 del manual SIGAS con error menor al 1%.
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="font-bold text-flame-300">Termofusión (NAG-E 210)</h2>
        <p className="text-slate-400">
          Los sistemas de tubería acero-polietileno unidos por termofusión (p. ej. SIGAS
          Thermofusión®) están aprobados por Resolución ENARGAS 3251/2005, Especificación Técnica
          NAG-E 210. Recordá:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li>En ambientes habitables solo puede ir <b>por contrapiso o embutida</b> — no a la vista.</li>
          <li>No intercambiar tubos/accesorios entre marcas de distintos sistemas (ENARGAS 03546/2015).</li>
          <li>La transición a rosca se hace con accesorios de transición aprobados.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="font-bold text-flame-300 mb-2">Tiempos de Thermofusión®</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="text-slate-500">
              <tr>
                <th className="text-left py-1">DN</th>
                <th>Calent. (s)</th>
                <th>Acople máx (s)</th>
                <th>Enfriam. (min)</th>
                <th>Inserción (mm)</th>
              </tr>
            </thead>
            <tbody>
              {SIGAS_FUSION.map((f) => (
                <tr key={f.dn} className="border-t border-slate-800 text-slate-300">
                  <td className="text-left py-1 font-semibold">{f.dn}</td>
                  <td>{f.calent}</td>
                  <td>{f.acople}</td>
                  <td>{f.enfria}</td>
                  <td>{f.insercion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-600 mt-2">
          Boquillas a 245-275 °C (equilibrio 260 °C). En zonas muy frías o con viento, superar los
          tiempos mínimos hasta verificar el ablandamiento del material. Fuente: Manual Técnico SIGAS.
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="font-bold text-amber-400">⚠ Importante</h2>
        <p className="text-slate-400">
          Esta herramienta es una <b>ayuda de cálculo para gasistas matriculados</b>. No reemplaza el
          criterio profesional, el proyecto aprobado ni la normativa vigente de la distribuidora
          local (Camuzzi, Metrogas, Naturgy, Litoral Gas, etc.). Verificá siempre contra la
          reglamentación aplicable y las especificaciones del fabricante del sistema que instales.
        </p>
        <p className="text-[11px] text-slate-500">
          Fuentes: NAG-200 (ENARGAS) · Manual Técnico SIGAS Thermofusión® ed. 14 (Grupo Dema) ·
          NAG-E 210 / Res. ENARGAS 3251/2005.
        </p>
      </section>
    </div>
  )
}
