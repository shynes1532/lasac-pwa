// ============================================================
// GRUPO LASAC — Configuración y datos transversales
// (compartidos por todas las marcas: atención, siniestros, service)
// ============================================================

export const grupo = {
  nombre: 'Grupo LASAC',
  tagline: 'Concesionario Oficial en Tierra del Fuego',
  region: 'Tierra del Fuego',
  web: 'https://lasac.com.ar',
  // Orden en que se muestran las marcas en el selector
  ordenMarcas: ['fiat', 'jac', 'forthing', 'dongfeng'],
};

// ---------- ATENCIÓN AL CLIENTE ----------
export const tiposAtencion = [
  { id: 'consulta', icon: '❓', titulo: 'Consulta', desc: 'Tengo una pregunta', color: 'from-blue-500 to-blue-700', border: 'border-blue-400', bg: 'bg-blue-500/20' },
  { id: 'reclamo', icon: '⚠️', titulo: 'Reclamo', desc: 'Reportar un problema', color: 'from-red-500 to-red-700', border: 'border-red-400', bg: 'bg-red-500/20' },
  { id: 'sugerencia', icon: '💡', titulo: 'Sugerencia', desc: 'Tengo una idea', color: 'from-amber-500 to-amber-700', border: 'border-amber-400', bg: 'bg-amber-500/20' },
  { id: 'felicitacion', icon: '⭐', titulo: 'Felicitación', desc: 'Destacar buena atención', color: 'from-green-500 to-green-700', border: 'border-green-400', bg: 'bg-green-500/20' },
];

export const areasAtencion = ['Ventas 0KM', 'Plan de Ahorro', 'Service / Posventa', 'Repuestos', 'Administración', 'Otro'];

// ---------- TURNOS ----------
export const horarios = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

// ---------- SINIESTROS ----------
export const aseguradoras = ['Allianz', 'Federación Patronal', 'La Segunda', 'Mapfre', 'Mercantil Andina', 'Rivadavia', 'San Cristóbal', 'Sancor', 'Zurich', 'Otra'];

export const tiposSiniestro = [
  { value: 'Colisión', label: 'Colisión / Choque' },
  { value: 'Robo total', label: 'Robo total' },
  { value: 'Robo parcial', label: 'Robo parcial' },
  { value: 'Granizo', label: 'Daño por granizo' },
  { value: 'Incendio', label: 'Incendio' },
  { value: 'Vandalismo', label: 'Vandalismo' },
  { value: 'Otro', label: 'Otro' },
];

// ---------- NAVEGACIÓN ----------
// Metadatos de cada sección. `grid` = color del ícono en el grid de Inicio.
export const SECCIONES_META = {
  inicio: { icon: '🏠', label: 'Inicio', navLabel: 'Inicio' },
  catalogo: { icon: '🚗', label: 'Catálogo', navLabel: 'Catálogo', grid: 'from-blue-500 to-blue-600' },
  simulador: { icon: '📋', label: 'Plan de Ahorro', navLabel: 'Plan Ahorro', grid: 'from-green-500 to-green-600' },
  oportunidades: { icon: '🔥', label: 'Oportunidades', navLabel: 'Ofertas' },
  novedades: { icon: '📰', label: 'Novedades', navLabel: 'Novedades', grid: 'from-purple-500 to-purple-600' },
  siniestros: { icon: '🛡️', label: 'Siniestros', navLabel: 'Siniestros', grid: 'from-orange-500 to-orange-600' },
  turnos: { icon: '🔧', label: 'Service', navLabel: 'Service', grid: 'from-amber-500 to-amber-600' },
  atencion: { icon: '💬', label: 'Atención', navLabel: 'Atención', grid: 'from-sky-500 to-sky-600' },
  contacto: { icon: '📍', label: 'Contacto', navLabel: 'Contacto' },
};

// Orden de la barra inferior (se filtra por las secciones de cada marca).
export const NAV_ORDER = ['inicio', 'catalogo', 'simulador', 'turnos', 'atencion', 'contacto'];

// Secciones que aparecen como accesos rápidos en el grid de Inicio.
export const HOME_GRID_ORDER = ['catalogo', 'simulador', 'novedades', 'siniestros', 'turnos', 'atencion'];

// ---------- HELPERS ----------
// moneda: 'ARS' (default, muestra "$ 1.234") o 'USD' (muestra "USD 1.234").
export const formatPrecio = (precio, moneda = 'ARS') => {
  if (!precio) return 'Consultar';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: moneda,
    maximumFractionDigits: 0,
    currencyDisplay: moneda === 'USD' ? 'code' : 'symbol',
  }).format(precio);
};
