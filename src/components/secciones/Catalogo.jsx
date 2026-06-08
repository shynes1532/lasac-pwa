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
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-3 px-3">
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setFiltro(cat)} className={`px-3 py-1.5 rounded-full text-xs capitalize whitespace-nowrap ${filtro === cat ? 'bg-brand' : 'bg-white/10'}`}>{cat}</button>
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
            <div key={v.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
              <AutoImagen basePath={marca.imagenesPath} modelo={v.modelo} ext={v.ext || marca.imgExt} className="w-full h-36" alt={v.nombre} nombre={v.nombre} contain />
              <div className="p-3">
                <h3 className="font-bold text-sm truncate">{v.nombre}</h3>
                <div className="flex gap-1 my-1.5 flex-wrap">
                  {v.motor && <span className="bg-blue-500/30 px-1.5 py-0.5 rounded text-[10px]">{v.motor}</span>}
                  {v.potencia && v.potencia !== '—' && <span className="bg-green-500/30 px-1.5 py-0.5 rounded text-[10px]">{v.potencia}</span>}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-green-400">{formatPrecio(v.precio, marca.moneda)}</p>
                  <button onClick={() => consultar(v)} className="px-4 py-2 bg-brand rounded-lg text-xs font-bold">💬 Consultar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
