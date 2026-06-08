import React, { useState, useEffect } from 'react';
import { getMarca } from './data/index.js';
import BrandSelector from './components/BrandSelector.jsx';
import GenericBrandApp from './components/GenericBrandApp.jsx';
import FiatApp from './FiatApp.jsx';

const STORAGE_KEY = 'lasac-marca';

// Orquestador del Grupo LASAC:
//  - sin marca  -> selector de marcas
//  - FIAT       -> app dedicada y completa (FiatApp), con botón flotante "Cambiar marca"
//  - JAC/Forthing/Dongfeng -> app genérica modular (GenericBrandApp)
export default function App() {
  const [marcaId, setMarcaId] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });

  const marca = getMarca(marcaId);

  useEffect(() => {
    try {
      if (marcaId) localStorage.setItem(STORAGE_KEY, marcaId);
      else localStorage.removeItem(STORAGE_KEY);
    } catch { /* ignore */ }
  }, [marcaId]);

  const elegirMarca = (id) => setMarcaId(id);
  const cambiarMarca = () => setMarcaId(null);

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
