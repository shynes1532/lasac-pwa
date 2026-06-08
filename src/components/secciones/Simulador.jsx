import React, { useState } from 'react';
import AutoImagen from '../AutoImagen.jsx';
import { formatPrecio } from '../../data/grupo.js';

// Solo se renderiza si la marca tiene planAhorro.activo (hoy: FIAT).
export default function Simulador({ marca }) {
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const planes = marca.planAhorro?.planes || [];

  const consultarPlan = (plan) => {
    const msg = `📋 *CONSULTA ${marca.nombre.toUpperCase()} PLAN*%0A%0AModelo: *${plan.nombre}*%0ACódigo: ${plan.codigo}%0APlan: ${plan.plan}%0ASuscripción: ${formatPrecio(plan.suscripcion)}%0ACuota desde: ${formatPrecio(plan.cuotas[1]?.valor)}`;
    const wa = marca.contacto.whatsapp.plan || marca.contacto.whatsapp.ventas;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">📊 Simulador de Cuotas</h2>
      <p className="text-white/60 text-xs mb-4">{marca.nombre} Plan</p>
      {!planSeleccionado ? (
        <div className="space-y-3">
          <p className="text-sm text-white/70 mb-2">Seleccioná un modelo para ver el detalle de cuotas:</p>
          {planes.map((plan) => (
            <div key={plan.id} onClick={() => setPlanSeleccionado(plan)} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 active:scale-[0.98] transition-all">
              <AutoImagen basePath={marca.imagenesPath} modelo={plan.modelo} ext={marca.imgExt} className="w-full h-32" nombre={plan.nombre} contain />
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm">{plan.nombre}</h3>
                  <span className="bg-brand px-1.5 py-0.5 rounded text-[10px] font-bold">{plan.codigo}</span>
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="bg-blue-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.plan}</span>
                  <span className="bg-green-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.tipo}</span>
                </div>
                <p className="text-sm text-green-400 font-bold mt-2">Desde {formatPrecio(plan.cuotas[1]?.valor)}/mes</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <button onClick={() => setPlanSeleccionado(null)} className="text-sm text-white/60 flex items-center gap-1">← Volver a planes</button>
          <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <AutoImagen basePath={marca.imagenesPath} modelo={planSeleccionado.modelo} ext={marca.imgExt} className="w-full h-44" nombre={planSeleccionado.nombre} contain />
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg">{planSeleccionado.nombre}</h3>
                <span className="bg-brand px-2 py-1 rounded text-xs font-bold">{planSeleccionado.codigo}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Plan</p><p className="font-bold text-sm">{planSeleccionado.plan}</p></div>
                <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Condición</p><p className="font-bold text-sm">{planSeleccionado.condicion}</p></div>
                <div className="bg-black/20 rounded-lg p-2 col-span-2"><p className="text-[10px] text-white/50">Valor Móvil (sin IVA)</p><p className="font-bold text-green-400">{formatPrecio(planSeleccionado.valorMovil)}</p></div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 mb-4">
                <p className="text-xs opacity-80">SUSCRIPCIÓN</p>
                <p className="text-2xl font-bold">{formatPrecio(planSeleccionado.suscripcion)}</p>
              </div>
              <div className="bg-black/20 rounded-xl p-3 mb-4">
                <h4 className="font-bold text-sm mb-3">📋 Detalle de Cuotas (sin IVA)</h4>
                <div className="space-y-2">
                  {planSeleccionado.cuotas.map((c, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                      <span className="text-xs text-white/70">{c.rango}</span>
                      <span className="font-bold text-sm">{formatPrecio(c.valor)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-blue-500/20 rounded-lg p-3"><p className="text-white/60">🎯 Adjudicación</p><p className="font-bold">{planSeleccionado.adjudicacion}</p></div>
                <div className="bg-amber-500/20 rounded-lg p-3"><p className="text-white/60">📊 Diferimientos</p><p className="font-bold">{planSeleccionado.diferimientos}</p></div>
                {planSeleccionado.subite && <div className="bg-green-500/20 rounded-lg p-3"><p className="font-bold">✅ Opción SUBITE disponible</p></div>}
              </div>
              <button onClick={() => consultarPlan(planSeleccionado)} className="w-full mt-4 py-3 bg-brand-gradient-x rounded-xl font-bold text-on-brand">📞 Consultar este Plan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
