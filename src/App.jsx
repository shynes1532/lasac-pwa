import React, { useState, useEffect, Suspense, lazy } from 'react';
import { getMarca } from './data/index.js';
import BrandSelector from './components/BrandSelector.jsx';
import GenericBrandApp from './components/GenericBrandApp.jsx';
import FiatApp from './FiatApp.jsx';

// Pantalla interna (equipo comercial): se carga aparte para no sumar peso
// al bundle que descarga el cliente.
const RadarMercado = lazy(() => import('./components/RadarMercado.jsx'));

const STORAGE_KEY = 'lasac-marca';
const HASH_RADAR = '#radar';

// Orquestador del Grupo LASAC:
//  - #radar     -> Radar de Mercado (uso interno, fuera de la nav del cliente)
//  - sin marca  -> selector de marcas
//  - FIAT       -> app dedicada y completa (FiatApp), con botón flotante "Cambiar marca"
//  - JAC/Forthing/Dongfeng -> app genérica modular (GenericBrandApp)
export default function App() {
  const [marcaId, setMarcaId] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });
  const [hash, setHash] = useState(() => window.location.hash);

  const marca = getMarca(marcaId);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    try {
      if (marcaId) localStorage.setItem(STORAGE_KEY, marcaId);
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, [marcaId]);

  const elegirMarca = (id) => setMarcaId(id);
  const cambiarMarca = () => setMarcaId(null);

  if (hash === HASH_RADAR) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <RadarMercado onSalir={() => { window.location.hash = ''; setHash(''); }} />
      </Suspense>
    );
  }

  if (!marca) {
    return <BrandSelector onElegir={elegirMarca} />;
  }

  if (marca.id === 'fiat') {
    return (
      <div className="relative">
        <FiatApp />
        <button
          onClick={cambiarMarca}
          className="fixed top-2.5 right-2.5 z-[60] text-[11px] font-bold bg-black/70 hover:bg-black/90 text-white px-3 py-1.5 rounded-full backdrop-blur border border-white/20 flex items-center gap-1 whitespace-nowrap shadow-lg"
        >
          ⇄ Marca
        </button>
      </div>
    );
  }

  return <GenericBrandApp marca={marca} onCambiarMarca={cambiarMarca} />;
}
