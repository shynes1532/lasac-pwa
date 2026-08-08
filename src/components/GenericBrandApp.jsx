import React, { useState } from 'react';
import { SECCIONES_META, NAV_ORDER } from '../data/grupo.js';
import useTemaMarca from '../hooks/useTemaMarca.js';
import { LogoGrupo, MarcaWordmark } from './Logo.jsx';

import Inicio from './secciones/Inicio.jsx';
import Catalogo from './secciones/Catalogo.jsx';
import Oportunidades from './secciones/Oportunidades.jsx';
import Simulador from './secciones/Simulador.jsx';
import Novedades from './secciones/Novedades.jsx';
import Siniestros from './secciones/Siniestros.jsx';
import Turnos from './secciones/Turnos.jsx';
import Atencion from './secciones/Atencion.jsx';
import Contacto from './secciones/Contacto.jsx';

const SECCION_COMPONENTES = {
  inicio: Inicio,
  catalogo: Catalogo,
  oportunidades: Oportunidades,
  simulador: Simulador,
  novedades: Novedades,
  siniestros: Siniestros,
  turnos: Turnos,
  atencion: Atencion,
  contacto: Contacto,
};

// Experiencia genérica modular para las marcas del Grupo (JAC, Forthing, Dongfeng).
// FIAT usa su propia app dedicada (FiatApp).
export default function GenericBrandApp({ marca, onCambiarMarca }) {
  const [seccion, setSeccion] = useState('inicio');
  const [historial, setHistorial] = useState([]); // pila de secciones visitadas

  useTemaMarca(marca);

  const navegar = (s) => {
    if (s === seccion) return;
    setHistorial((h) => [...h, seccion]);
    setSeccion(s);
  };
  const atras = () => {
    if (historial.length === 0) {
      if (seccion !== 'inicio') setSeccion('inicio');
      return;
    }
    setSeccion(historial[historial.length - 1]);
    setHistorial(historial.slice(0, -1));
  };

  const seccionActiva = marca.secciones.includes(seccion) ? seccion : 'inicio';
  const SeccionComp = SECCION_COMPONENTES[seccionActiva] || Inicio;
  const navItems = NAV_ORDER.filter((id) => marca.secciones.includes(id));
  const mostrarAtras = seccion !== 'inicio' || historial.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="h-1 bg-brand" />
        <div className="max-w-lg mx-auto flex justify-between items-center gap-2 p-3">
          <div className="flex items-center gap-2 min-w-0">
            <LogoGrupo className="h-6 shrink-0" />
            <MarcaWordmark marca={marca} className="text-brand truncate" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {mostrarAtras && (
              <button onClick={atras} className="text-[11px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                ← Atrás
              </button>
            )}
            <button onClick={onCambiarMarca} className="text-[11px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap">
              ⇄ Marca
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-3">
        <SeccionComp marca={marca} onNavegar={navegar} />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-2 z-50">
        <div className="max-w-lg mx-auto flex justify-around">
          {navItems.map((id) => {
            const meta = SECCIONES_META[id];
            const activo = seccionActiva === id;
            return (
              <button key={id} onClick={() => navegar(id)} className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all duration-200 ${activo ? 'text-brand bg-brand-soft' : 'text-white/55 hover:text-white/85 active:scale-95'}`}>
                <span className={`text-lg transition-transform duration-200 ${activo ? 'scale-110' : ''}`}>{meta.icon}</span>
                <span className={`text-[9px] mt-0.5 ${activo ? 'font-semibold' : ''}`}>{meta.navLabel || meta.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
