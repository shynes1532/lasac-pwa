import React from 'react';
import { grupo } from '../../data/grupo.js';

export default function Contacto({ marca }) {
  const sucursales = marca.contacto.sucursales || [];
  const wa = marca.contacto.whatsapp || {};

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📍 Sucursales {marca.nombre}</h2>
      <div className="space-y-4">
        {sucursales.map((suc) => (
          <div key={suc.ciudad} className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
            <div className="bg-brand-gradient-x rounded-lg p-3 text-center mb-3 text-on-brand">
              <span className="text-3xl">{suc.icon}</span>
              <h3 className="text-xl font-bold">{suc.ciudad}</h3>
              <p className="text-white/70 text-xs">{suc.sub}</p>
            </div>
            <div className="space-y-1 mb-3 text-xs">
              {suc.ventas && <p>🪧 Ventas: {suc.ventas}</p>}
              {suc.service && <p>🔧 Service: {suc.service}</p>}
              {suc.dir && <p>📍 {suc.dir}</p>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href={`https://wa.me/${suc.waVentas}`} className="py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-center text-sm shadow-md shadow-black/20 transition-all active:scale-95">💬 Ventas</a>
              <a href={`https://wa.me/${suc.waService}`} className="py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-center text-sm shadow-md shadow-black/20 transition-all active:scale-95">🔧 Service</a>
            </div>
          </div>
        ))}
      </div>

      {(wa.plan || wa.repuestos) && (
        <>
          <h3 className="text-lg font-bold mt-6 mb-3">📞 Otros Contactos</h3>
          <div className="space-y-2">
            {wa.plan && (
              <a href={`https://wa.me/${wa.plan}`} className="flex items-center gap-3 bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20 active:scale-[0.98] transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-xl">📋</div>
                <div className="flex-1"><h4 className="font-bold text-sm">{marca.nombre} Plan - Administración</h4><p className="text-xs text-white/60">Consultas sobre tu plan de ahorro</p></div>
                <span className="text-green-500 text-xl">💬</span>
              </a>
            )}
            {wa.repuestos && (
              <a href={`https://wa.me/${wa.repuestos}`} className="flex items-center gap-3 bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20 active:scale-[0.98] transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-xl">🔩</div>
                <div className="flex-1"><h4 className="font-bold text-sm">Repuestos</h4><p className="text-xs text-white/60">Consultas y pedidos de repuestos</p></div>
                <span className="text-green-500 text-xl">💬</span>
              </a>
            )}
          </div>
        </>
      )}

      <div className="bg-white/[0.06] rounded-2xl p-4 mt-4 text-center border border-white/10 shadow-lg shadow-black/20">
        <a href={grupo.web} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-brand-gradient-x rounded-full font-bold text-sm text-on-brand shadow-md shadow-black/20 transition-all active:scale-95">🌐 lasac.com.ar</a>
      </div>
    </div>
  );
}
