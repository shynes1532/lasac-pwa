import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AutoImagen from '../AutoImagen.jsx';

// Hero de promos deslizable (patrón de apps de consumo como Mostaza): titular display en mayúsculas,
// marca de agua tipográfica de la marca, imagen flotante y llamados a la acción con flecha.
// slides: [{ id, eyebrow, title, text, image?: props de AutoImagen, cta?, cta2? }]
// cta: { label, onClick | href, icon?, arrow? }
function Cta({ label, onClick, href, icon: Icon, arrow, primary }) {
  const cls = `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold shadow-md shadow-black/20 transition-transform active:scale-95 ${
    primary ? 'bg-white text-brand' : 'bg-white/15 ring-1 ring-inset ring-white/30 backdrop-blur-sm'
  }`;
  const inner = (<>{Icon && <Icon className="h-4 w-4" />}{label}{arrow && <ArrowRight className="h-4 w-4" />}</>);
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}

export default function PromoHero({ slides, watermark, className = '' }) {
  const rail = useRef(null);
  const tocado = useRef(false);
  const [idx, setIdx] = useState(0);
  const n = slides.length;

  // Avance automático cada 7 s hasta que el usuario toca o desliza (respeta reduced-motion).
  useEffect(() => {
    if (n < 2 || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      const el = rail.current;
      if (!el || tocado.current || document.hidden) return;
      const siguiente = (Math.round(el.scrollLeft / el.clientWidth) + 1) % n;
      el.scrollTo({ left: siguiente * el.clientWidth, behavior: 'smooth' });
    }, 7000);
    return () => clearInterval(t);
  }, [n]);

  const onScroll = () => { const el = rail.current; if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth)); };
  const detener = () => { tocado.current = true; };
  const irA = (i) => { detener(); const el = rail.current; if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' }); };

  return (
    <section className={`relative overflow-hidden rounded-3xl bg-brand-gradient text-on-brand shadow-xl shadow-black/30 ring-1 ring-inset ring-white/15 ${className}`}>
      {watermark && (
        <div className="brand-watermark" aria-hidden="true"><span>{watermark}</span><span>{watermark}</span><span>{watermark}</span></div>
      )}
      <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-black/25 blur-2xl" />
      <div ref={rail} onScroll={onScroll} onPointerDown={detener} onTouchStart={detener} className="relative flex snap-x snap-mandatory overflow-x-auto hide-scrollbar">
        {slides.map((s, i) => {
          const Titulo = i === 0 ? 'h1' : 'h2';
          return (
            <article key={s.id} className={`flex w-full shrink-0 snap-start flex-col p-6 pt-7 ${n > 1 ? 'pb-9' : 'pb-6'}`}>
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  {s.eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-75">{s.eyebrow}</p>}
                  <Titulo className="font-display mt-2 text-[34px] font-extrabold uppercase leading-[0.92] tracking-tight">{s.title}</Titulo>
                </div>
                {s.image?.modelo && (
                  <div className="-mr-3 mt-1 w-32 shrink-0">
                    <AutoImagen {...s.image} transparent sinFallback contain className="h-24 w-32 overflow-hidden rounded-xl drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)]" />
                  </div>
                )}
              </div>
              {s.text && <p className="mt-2 text-sm opacity-85">{s.text}</p>}
              {(s.cta || s.cta2) && (
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {s.cta && <Cta {...s.cta} primary />}
                  {s.cta2 && <Cta {...s.cta2} />}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {n > 1 && (
        <div className="absolute bottom-3 left-6 flex gap-1.5">
          {slides.map((s, i) => (
            <button key={s.id} type="button" aria-label={`Ver promo ${i + 1} de ${n}`} onClick={() => irA(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/45'}`} />
          ))}
        </div>
      )}
    </section>
  );
}
