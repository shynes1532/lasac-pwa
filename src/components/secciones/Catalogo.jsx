import React, { useState } from 'react';
import AutoImagen from '../AutoImagen.jsx';
import { formatPrecio } from '../../data/grupo.js';

export default function Catalogo({ marca }) {
  const [filtro, setFiltro] = useState('todos');
  const categorias = marca.categorias || ['todos'];
  const vehiculos = filtro === 'todos' ? marca.catalogo : marca.catalogo.filter((v) => v.categoria === filtro);

  const consultar = (v) => {
    const msg = `🚗 *CONSULTA ${marca.nombre.toUpperCase()}*%0A%0AMe interesa: *${v.nombre}*%0A💰 ${formatPrecio(v.precio || v.precioFinal, marca.moneda)}${v.color ? `%0A🎨 ${v.color}` : ''}`;
    window.open(`https://wa.me/${marca.contacto.whatsapp.ventas}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">🚗 Catálogo {marca.nombre}</h2>
      <p className="text-white/60 text-xs mb-3">Precios Tierra del Fuego</p>
      {marca.notaCatalogo && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mb-3 -mt-1">
          <p className="text-[10px] text-amber-200 leading-tight">{marca.notaCatalogo}</p>
        </div>
      )}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-3 px-3">
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setFiltro(cat)} className={`px-3.5 py-1.5 rounded-full text-xs capitalize whitespace-nowrap transition-all duration-200 ${filtro === cat ? 'bg-brand text-on-brand font-semibold shadow-md' : 'bg-white/10 text-white/70 hover:bg-white/[0.16]'}`}>{cat}</button>
        ))}
      </div>
      {vehiculos.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3">🚗</div>
          <p className="text-sm">Catálogo en preparación. Consultá disponibilidad.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {vehiculos.map((v) => (
            <div key={v.id} className="bg-white/[0.06] rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/20 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5">
              <AutoImagen basePath={marca.imagenesPath} modelo={v.modelo} ext={v.ext || marca.imgExt} className="w-full h-40" alt={v.nombre} nombre={v.nombre} contain />
              <div className="p-3.5">
                <h3 className="font-bold text-sm truncate">{v.nombre}</h3>
                <div className="flex gap-1.5 my-1.5 flex-wrap">
                  {v.motor && <span className="bg-blue-500/25 text-blue-200 px-2 py-0.5 rounded-md text-[10px] font-medium">{v.motor}</span>}
                  {v.potencia && v.potencia !== '—' && <span className="bg-emerald-500/25 text-emerald-200 px-2 py-0.5 rounded-md text-[10px] font-medium">{v.potencia}</span>}
                </div>
                <div className="flex justify-between items-end mt-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-white/40 leading-none mb-1">Precio</p>
                    <p className="text-xl font-extrabold text-green-400 tabular-nums tracking-tight leading-none">{formatPrecio(v.precio, marca.moneda)}</p>
                    {v.precioFinanciado && <p className="text-[10px] text-white/45 mt-1 tabular-nums">Financiado {formatPrecio(v.precioFinanciado, marca.moneda)}</p>}
                  </div>
                  <button onClick={() => consultar(v)} className="shrink-0 px-4 py-2 bg-brand text-on-brand rounded-lg text-xs font-bold shadow-md shadow-black/20 active:scale-95 transition-transform">💬 Consultar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
