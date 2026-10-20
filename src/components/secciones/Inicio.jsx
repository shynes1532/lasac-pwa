import React from 'react';
import { Flame, MessageCircle, Newspaper, ChevronRight } from 'lucide-react';
import AutoImagen from '../AutoImagen.jsx';
import { SeccionIcon } from '../ui/Icon.jsx';
import { SECCIONES_META, HOME_GRID_ORDER } from '../../data/grupo.js';

export default function Inicio({ marca, onNavegar }) {
  // Accesos rápidos: solo las secciones que la marca tiene y que están en el grid.
  const accesos = HOME_GRID_ORDER.filter((id) => marca.secciones.includes(id));
  const tieneOportunidades = marca.secciones.includes('oportunidades');
  const novedadesDestacadas = (marca.novedades || []).filter((n) => n.destacado);
  const waVentas = marca.contacto?.whatsapp?.ventas;

  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-3xl bg-brand-gradient p-6 pt-7 text-on-brand shadow-xl shadow-black/30 ring-1 ring-inset ring-white/15">
        <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-black/25 blur-2xl" />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] opacity-75">{marca.descripcion} · Tierra del Fuego</p>
        <h1 className="relative mt-1.5 text-[28px] font-extrabold leading-tight tracking-tight">Bienvenido a {marca.nombre}</h1>
        <p className="relative mt-1.5 text-sm opacity-85">Catálogo, turnos de service y atención al cliente, todo en un solo lugar.</p>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {tieneOportunidades && (
            <button onClick={() => onNavegar('oportunidades')} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand shadow-md shadow-black/20 transition-transform active:scale-95">
              <Flame className="h-4 w-4" /> Oferta del Mes
            </button>
          )}
          {waVentas && (
            <a href={`https://wa.me/${waVentas}?text=${encodeURIComponent(`Hola ${marca.nombre} 👋 Quiero hacer una consulta.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-bold ring-1 ring-inset ring-white/30 backdrop-blur-sm transition-transform active:scale-95">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          )}
        </div>
      </section>

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
          <h2 className="mb-3 flex items-center gap-2.5 font-bold"><span className="icon-chip"><Newspaper className="h-4 w-4" /></span>Novedades</h2>
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
