import React from 'react';
import { Flame, Palette, Zap } from 'lucide-react';
import AutoImagen from '../AutoImagen.jsx';
import { formatPrecio } from '../../data/grupo.js';

export default function Oportunidades({ marca }) {
  const stock = marca.stockOportunidad || [];
  const totalStock = stock.reduce((a, b) => a + (b.stock || 0), 0);

  const consultar = (item) => {
    const msg = `🚗 *CONSULTA ${marca.nombre.toUpperCase()}*%0A%0AMe interesa: *${item.nombre}*%0A💰 ${formatPrecio(item.precioFinal, marca.moneda)}${item.color ? `%0A🎨 ${item.color}` : ''}`;
    window.open(`https://wa.me/${marca.contacto.whatsapp.ventas}?text=${msg}`, '_blank');
  };

  return (
    <div>
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-brand-gradient-x p-4 text-on-brand shadow-lg shadow-black/25">
        <div className="brand-watermark brand-watermark--sm" aria-hidden="true"><span>Oferta</span><span>del mes</span></div>
        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 ring-1 ring-inset ring-white/30"><Flame className="h-6 w-6" /></span>
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight">Oferta del Mes</h2>
            <p className="mt-1 text-sm opacity-90">{totalStock > 0 ? `${totalStock} unidades · Entrega inmediata` : 'Consultá las oportunidades disponibles'}</p>
          </div>
        </div>
      </div>
      {stock.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3"><Flame className="h-12 w-12 mx-auto" /></div>
          <p className="text-sm">No hay stock de oportunidad cargado por el momento.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {stock.map((item, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-lg shadow-black/20 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5">
              {item.stock === 1
                ? <span className="sticker absolute top-3 right-3 z-10">Última unidad</span>
                : <span className="sticker sticker-brand absolute top-3 right-3 z-10">x{item.stock} unidades</span>}
              <AutoImagen basePath={marca.imagenesPath} modelo={item.modelo} ext={item.ext || marca.imgExt} className="w-full h-36" nombre={item.nombre} contain />
              <div className="p-3">
                <h3 className="font-bold text-sm">{item.nombre}</h3>
                <p className="text-xs text-white/60 mb-2"><Palette className="inline h-3.5 w-3.5 mr-1 align-[-0.15em]" />{item.color}</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-white/40 leading-none mb-1">Precio oferta</p>
                    <p className="text-xl font-extrabold text-green-400 tabular-nums tracking-tight leading-none">{formatPrecio(item.precioFinal, marca.moneda)}</p>
                  </div>
                  <button onClick={() => consultar(item)} className="shrink-0 px-4 py-2 bg-green-600 rounded-lg text-xs font-bold shadow-md shadow-black/20 active:scale-95 transition-transform"><Zap className="inline h-4 w-4 mr-1.5 align-[-0.2em]" />Consultar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
