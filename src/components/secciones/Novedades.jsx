import React from 'react';
import AutoImagen from '../AutoImagen.jsx';

export default function Novedades({ marca }) {
  const novedades = marca.novedades || [];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📰 Novedades {marca.nombre}</h2>
      {novedades.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3">📰</div>
          <p className="text-sm">No hay novedades por el momento.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {novedades.map((nov) => (
            <div key={nov.id} className="bg-white/[0.06] rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5">
              <AutoImagen basePath={marca.imagenesPath} modelo={nov.imagen} ext={marca.imgExt} className="w-full h-44" contain />
              <div className="p-4">
                <p className="text-[10px] text-white/40 mb-1 tracking-wide uppercase">{nov.fecha}</p>
                <h3 className="font-bold text-lg mb-2 tracking-tight">{nov.titulo}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{nov.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
