import React from 'react';
import { ArrowRight, ChevronRight, Flame, MessageCircle, Newspaper } from 'lucide-react';
import AutoImagen from '../AutoImagen.jsx';
import PromoHero from '../ui/PromoHero.jsx';
import { SeccionIcon } from '../ui/Icon.jsx';
import { SECCIONES_META, HOME_GRID_ORDER } from '../../data/grupo.js';

export default function Inicio({ marca, onNavegar }) {
  // Accesos rápidos: solo las secciones que la marca tiene y que están en el grid.
  const accesos = HOME_GRID_ORDER.filter((id) => marca.secciones.includes(id));
  const tiene = (id) => marca.secciones.includes(id);
  const novedadesDestacadas = (marca.novedades || []).filter((n) => n.destacado);
  const waVentas = marca.contacto?.whatsapp?.ventas;
  const catalogo = marca.catalogo || [];
  const destacado = catalogo.find((m) => m.modelo === marca.heroModelo) || catalogo[0];

  // Hero de promos deslizable: bienvenida, catálogo y service (según las secciones de la marca).
  const slides = [
    {
      id: 'bienvenida', eyebrow: `${marca.descripcion} · Tierra del Fuego`, title: `Bienvenido a ${marca.nombre}`,
      text: 'Catálogo, turnos de service y atención al cliente, todo en un solo lugar.',
      cta: tiene('oportunidades') ? { label: 'Oferta del Mes', icon: Flame, onClick: () => onNavegar('oportunidades') } : undefined,
      cta2: waVentas ? { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/${waVentas}?text=${encodeURIComponent(`Hola ${marca.nombre} 👋 Quiero hacer una consulta.`)}` } : undefined,
    },
    tiene('catalogo') && destacado && {
      id: 'catalogo', eyebrow: `Catálogo ${marca.nombre}`, title: `Toda la gama ${marca.nombre}`,
      text: `${catalogo.length} modelos con versiones y equipamiento detallado.`,
      image: { basePath: marca.imagenesPath, modelo: destacado.modelo, ext: destacado.ext || marca.imgExt, nombre: destacado.nombre },
      cta: { label: 'Ver catálogo', arrow: true, onClick: () => onNavegar('catalogo') },
    },
    tiene('turnos') && {
      id: 'service', eyebrow: 'Posventa oficial', title: 'Turno de service online',
      text: 'Pedilo en segundos y te lo confirmamos por WhatsApp.',
      cta: { label: 'Pedir turno', arrow: true, onClick: () => onNavegar('turnos') },
    },
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <PromoHero watermark={marca.nombre} slides={slides} />

      <div className="grid grid-cols-3 gap-2.5">
        {accesos.map((id) => {
          const meta = SECCIONES_META[id];
          return (
            <button key={id} onClick={() => onNavegar(id)} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-left shadow-lg shadow-black/20 transition-all duration-200 hover:border-white/20 hover:-translate-y-0.5 active:scale-95">
              <div className={`mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${meta.grid} text-white shadow-md shadow-black/30`}>
                <SeccionIcon id={id} className="h-5 w-5" />
              </div>
              <h3 className="text-[13px] font-bold leading-tight">{meta.label}</h3>
              {meta.hint && <p className="mt-0.5 text-[10px] leading-tight text-white/45">{meta.hint}</p>}
            </button>
          );
        })}
      </div>

      {novedadesDestacadas.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2.5 font-bold"><span className="icon-chip"><Newspaper className="h-4 w-4" /></span>Novedades</h2>
            <button onClick={() => onNavegar('novedades')} className="inline-flex items-center gap-1 text-xs font-bold text-brand">Ver todas <ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
          <div className="space-y-2">
            {novedadesDestacadas.map((nov) => (
              <div key={nov.id} onClick={() => onNavegar('novedades')} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-lg shadow-black/20 transition-all duration-200 hover:border-white/20 active:scale-[0.98]">
                <AutoImagen basePath={marca.imagenesPath} modelo={nov.imagen} ext={marca.imgExt} className="h-16 w-16 flex-shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wide text-white/40">{nov.fecha}</p>
                  <h3 className="truncate text-sm font-bold">{nov.titulo}</h3>
                  <p className="line-clamp-2 text-xs leading-snug text-white/60">{nov.descripcion}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
