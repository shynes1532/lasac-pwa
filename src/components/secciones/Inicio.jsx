import React from 'react';
import AutoImagen from '../AutoImagen.jsx';
import { SECCIONES_META, HOME_GRID_ORDER } from '../../data/grupo.js';

export default function Inicio({ marca, onNavegar }) {
  // Accesos rápidos: solo las secciones que la marca tiene y que están en el grid.
  const accesos = HOME_GRID_ORDER.filter((id) => marca.secciones.includes(id));
  const tieneOportunidades = marca.secciones.includes('oportunidades');
  const novedadesDestacadas = (marca.novedades || []).filter((n) => n.destacado);

  return (
    <div className="space-y-4">
      <div className="bg-brand-gradient-x rounded-2xl p-6 text-center relative overflow-hidden text-on-brand">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
        <h1 className="text-2xl font-bold mb-1 relative">Bienvenido a {marca.nombre}</h1>
        <p className="text-sm opacity-90 mb-4 relative">{marca.descripcion}</p>
        {tieneOportunidades && (
          <div className="flex gap-2 justify-center flex-wrap relative">
            <button onClick={() => onNavegar('oportunidades')} className="px-6 py-2 bg-white text-brand rounded-full font-bold text-sm">🔥 Oferta del Mes</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {accesos.map((id) => {
          const meta = SECCIONES_META[id];
          return (
            <div key={id} onClick={() => onNavegar(id)} className="bg-white/5 rounded-xl p-3 active:scale-95 transition-all border border-white/10 text-center">
              <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${meta.grid} flex items-center justify-center text-xl mb-2`}>{meta.icon}</div>
              <h3 className="font-bold text-xs">{meta.label}</h3>
            </div>
          );
        })}
      </div>

      {novedadesDestacadas.length > 0 && (
        <div>
          <h2 className="font-bold mb-3 flex items-center gap-2">📰 Novedades</h2>
          <div className="space-y-2">
            {novedadesDestacadas.map((nov) => (
              <div key={nov.id} onClick={() => onNavegar('novedades')} className="bg-white/5 rounded-xl p-3 border border-white/10 flex gap-3">
                <AutoImagen basePath={marca.imagenesPath} modelo={nov.imagen} ext={marca.imgExt} className="w-16 h-16 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/50">{nov.fecha}</p>
                  <h3 className="font-bold text-sm truncate">{nov.titulo}</h3>
                  <p className="text-xs text-white/60 line-clamp-2">{nov.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
