import React from 'react';
import { LogoGrupo } from './Logo.jsx';
import { marcasOrdenadas } from '../data/index.js';
import { grupo } from '../data/grupo.js';

// Pantalla inicial: el cliente elige con qué marca del Grupo interactuar.
// Cada tarjeta usa el color propio de la marca (estilo inline porque conviven
// varios colores en una misma pantalla; las CSS vars de marca aplican recién
// al entrar a una marca).
export default function BrandSelector({ onElegir }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <header className="p-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <LogoGrupo className="h-8" />
        <span className="text-lg">🇦🇷</span>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full p-5 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">{grupo.nombre}</h1>
          <p className="text-white/60 text-sm">{grupo.tagline}</p>
          <p className="text-white/40 text-xs mt-3">Elegí una marca para continuar</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {marcasOrdenadas.map((marca) => {
            const [g1, g2] = marca.tema.gradient || [marca.tema.primary, marca.tema.primaryDark];
            return (
              <button
                key={marca.id}
                onClick={() => onElegir(marca.id)}
                className="group relative rounded-2xl p-5 h-36 flex flex-col justify-between text-left overflow-hidden shadow-lg ring-1 ring-inset ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${g1}, ${g2})`, color: marca.tema.onPrimary || '#fff' }}
              >
                {/* Brillos y profundidad */}
                <div className="absolute -top-10 -right-8 w-28 h-28 bg-white/15 rounded-full blur-xl" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/25 to-transparent" />
                {marca.oficial && (
                  <span className="relative self-start text-[9px] font-bold tracking-wide bg-white/20 ring-1 ring-white/25 backdrop-blur-sm px-2 py-0.5 rounded-full">OFICIAL</span>
                )}
                <div className="relative">
                  <div className="text-xl font-extrabold tracking-tight leading-tight drop-shadow-sm">{marca.nombre}</div>
                  <div className="text-[11px] font-medium opacity-85 mt-0.5 leading-snug">{marca.descripcion}</div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <footer className="p-4 text-center text-white/30 text-[10px]">
        {grupo.region} · Ushuaia · Río Grande
      </footer>
    </div>
  );
}
