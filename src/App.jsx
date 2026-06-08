import React, { useState, useEffect } from 'react';
import { getMarca } from './data/index.js';
import { SECCIONES_META, NAV_ORDER } from './data/grupo.js';
import useTemaMarca from './hooks/useTemaMarca.js';
import { LogoGrupo, MarcaWordmark } from './components/Logo.jsx';
import BrandSelector from './components/BrandSelector.jsx';

import Inicio from './components/secciones/Inicio.jsx';
import Catalogo from './components/secciones/Catalogo.jsx';
import Oportunidades from './components/secciones/Oportunidades.jsx';
import Simulador from './components/secciones/Simulador.jsx';
import Novedades from './components/secciones/Novedades.jsx';
import Siniestros from './components/secciones/Siniestros.jsx';
import Turnos from './components/secciones/Turnos.jsx';
import Atencion from './components/secciones/Atencion.jsx';
import Contacto from './components/secciones/Contacto.jsx';

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

const STORAGE_KEY = 'lasac-marca';

export default function App() {
  const [marcaId, setMarcaId] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });
  const [seccion, setSeccion] = useState('inicio');
  const [historial, setHistorial] = useState([]); // pila de secciones visitadas

  const marca = getMarca(marcaId);
  useTemaMarca(marca);

  // Persistir la marca elegida
  useEffect(() => {
    try {
      if (marcaId) localStorage.setItem(STORAGE_KEY, marcaId);
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, [marcaId]);

  // Navegar a una sección guardando la actual en el historial.
  const navegar = (s) => {
    if (s === seccion) return;
    setHistorial((h) => [...h, seccion]);
    setSeccion(s);
  };
  // Volver a la sección anterior (o a inicio si no hay historial).
  const atras = () => {
    if (historial.length === 0) {
      if (seccion !== 'inicio') setSeccion('inicio');
      return;
    }
    setSeccion(historial[historial.length - 1]);
    setHistorial(historial.slice(0, -1));
  };
  const elegirMarca = (id) => { setMarcaId(id); setSeccion('inicio'); setHistorial([]); };
  const cambiarMarca = () => { setMarcaId(null); setSeccion('inicio'); setHistorial([]); };

  // Sin marca → pantalla de selección del Grupo
  if (!marca) {
    return <BrandSelector onElegir={elegirMarca} />;
  }

  // Sección segura: si la marca no la tiene, caer en inicio
  const seccionActiva = marca.secciones.includes(seccion) ? seccion : 'inicio';
  const SeccionComp = SECCION_COMPONENTES[seccionActiva] || Inicio;

  const navItems = NAV_ORDER.filter((id) => marca.secciones.includes(id));
  const mostrarAtras = seccion !== 'inicio' || historial.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      {/* Header */}
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
            <button onClick={cambiarMarca} className="text-[11px] font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-full flex items-center gap-1 whitespace-nowrap">
              ⇄ Marca
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-lg mx-auto p-3">
        <SeccionComp marca={marca} onNavegar={navegar} />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-2 z-50">
        <div className="max-w-lg mx-auto flex justify-around">
          {navItems.map((id) => {
            const meta = SECCIONES_META[id];
            const activo = seccionActiva === id;
            return (
              <button key={id} onClick={() => navegar(id)} className={`flex flex-col items-center py-1 px-2 rounded-lg ${activo ? 'text-brand' : 'text-white/60'}`}>
                <span className="text-lg">{meta.icon}</span>
                <span className="text-[9px] mt-0.5">{meta.navLabel || meta.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
