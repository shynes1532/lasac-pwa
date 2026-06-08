// ============================================================
// Agregador de marcas del Grupo LASAC
// ============================================================
import fiat from './marcas/fiat.js';
import jac from './marcas/jac.js';
import forthing from './marcas/forthing.js';
import dongfeng from './marcas/dongfeng.js';
import { grupo } from './grupo.js';

export const marcas = { fiat, jac, forthing, dongfeng };

// Lista ordenada según grupo.ordenMarcas (para el selector)
export const marcasOrdenadas = grupo.ordenMarcas
  .map((id) => marcas[id])
  .filter(Boolean);

export const getMarca = (id) => marcas[id] || null;

export default marcas;
