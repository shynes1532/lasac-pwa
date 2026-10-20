import React, { useState, useEffect } from 'react';
import { getMarca } from './data/index.js';
import BrandSelector from './components/BrandSelector.jsx';
import GenericBrandApp from './components/GenericBrandApp.jsx';
import FiatApp from './FiatApp.jsx';
import useTemaMarca from './hooks/useTemaMarca.js';

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
  useTemaMarca(marca); // colores de la marca activa (o del Grupo en el selector) para toda la app

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
    return <FiatApp onCambiarMarca={cambiarMarca} />;
  }

  return <GenericBrandApp marca={marca} onCambiarMarca={cambiarMarca} />;
}
