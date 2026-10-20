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
      <div className="bg-brand-gradient-x rounded-xl p-4 text-center mb-4 text-on-brand">
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2.5"><span className="icon-chip"><Flame className="h-4 w-4" /></span>Oferta del Mes</h2>
        <p className="text-sm">{totalStock > 0 ? `${totalStock} unidades • Entrega inmediata` : 'Consultá las oportunidades disponibles'}</p>
      </div>
      {stock.length === 0 ? (
        <div className="text-center py-12 text-white/40">
          <div className="text-4xl mb-3"><Flame className="h-12 w-12 mx-auto" /></div>
          <p className="text-sm">No hay stock de oportunidad cargado por el momento.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {stock.map((item, i) => (
            <div key={i} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 relative">
              <span className="absolute top-2 right-2 bg-brand px-2 py-1 rounded text-xs font-bold z-10">x{item.stock} unidades</span>
              <AutoImagen basePath={marca.imagenesPath} modelo={item.modelo} ext={item.ext || marca.imgExt} className="w-full h-36" nombre={item.nombre} contain />
              <div className="p-3">
                <h3 className="font-bold text-sm">{item.nombre}</h3>
                <p className="text-xs text-white/60 mb-2"><Palette className="inline h-3.5 w-3.5 mr-1 align-[-0.15em]" />{item.color}</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-green-400">{formatPrecio(item.precioFinal, marca.moneda)}</p>
                  <button onClick={() => consultar(item)} className="px-4 py-2 bg-green-600 rounded-lg text-xs font-bold"><Zap className="inline h-4 w-4 mr-1.5 align-[-0.2em]" />Consultar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
