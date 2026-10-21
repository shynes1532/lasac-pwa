import React from 'react';

// Pasos de un proceso en una línea de progreso (como la barra de niveles de un programa de beneficios).
// pasos: [{ titulo, desc }]
export default function Stepper({ titulo, pasos }) {
  const cols = pasos.length;
  const margen = `${50 / cols}%`;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-lg shadow-black/20">
      {titulo && <h3 className="mb-4 text-sm font-bold">{titulo}</h3>}
      <ol className="relative grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        <div className="absolute top-4 h-0.5 bg-brand-gradient-x opacity-70" style={{ left: margen, right: margen }} aria-hidden="true" />
        {pasos.map((p, i) => (
          <li key={p.titulo} className="relative text-center">
            <div className="font-display mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand text-base font-extrabold text-on-brand shadow-md shadow-black/30 ring-4 ring-slate-900/80">{i + 1}</div>
            <p className="mt-2 text-[11px] font-bold leading-tight">{p.titulo}</p>
            {p.desc && <p className="mt-0.5 text-[10px] leading-tight text-white/50">{p.desc}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
