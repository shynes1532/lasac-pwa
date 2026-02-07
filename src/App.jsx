import React, { useState, useEffect } from 'react';

// Logo LASAC como componente SVG
const LogoLASAC = ({ className = "h-8" }) => (
  <svg viewBox="0 0 200 50" className={className}>
    <text x="0" y="38" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900" fill="#e5e7eb" letterSpacing="2">LASAC</text>
    <path d="M155 8 Q175 8 175 25 Q175 42 155 42" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M160 12 Q177 12 177 25 Q177 38 160 38" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round"/>
    <path d="M165 16 Q179 16 179 25 Q179 34 165 34" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
  </svg>
);

// Imágenes de los vehículos
const imagenesBase = ['mobi', 'argo', 'cronos', 'pulse', 'fastback', 'fiat600', 'strada', 'toro', 'titano', 'fiorino'];

const colorFallback = {
  mobi: 'from-red-500 to-red-600', argo: 'from-gray-700 to-gray-800',
  cronos: 'from-gray-600 to-gray-700', pulse: 'from-slate-200 to-slate-300',
  fastback: 'from-gray-500 to-gray-600', fiat600: 'from-teal-600 to-teal-700',
  strada: 'from-red-600 to-red-700', toro: 'from-gray-400 to-gray-500',
  titano: 'from-red-700 to-red-800', fiorino: 'from-slate-100 to-slate-200'
};

const nombreModelo = {
  mobi: 'MOBI', argo: 'ARGO', cronos: 'CRONOS', pulse: 'PULSE',
  fastback: 'FASTBACK', fiat600: '600', strada: 'STRADA',
  toro: 'TORO', titano: 'TITANO', fiorino: 'FIORINO'
};

// ========== DATOS PLAN DE AHORRO - FEBRERO 2026 ==========
const planesDetalle = [
  {
    id: 'mobi-80-20', modelo: 'mobi', nombre: 'MOBI TREKKING 1.0 MT', codigo: 'MB1',
    plan: '80/20', condicion: 'M80', tipo: 'CUOTA VARIABLE', valorMovil: 22487603, suscripcion: 232399,
    cuotas: [
      { rango: 'Cuota 2', valor: 236341 }, { rango: 'Cuotas 3-11', valor: 252982 },
      { rango: 'Cuota 12', valor: 259990 }, { rango: 'Cuotas 13-18', valor: 283459 },
      { rango: 'Cuota 19', valor: 252225 }, { rango: 'Cuotas 20-24', valor: 266949 },
      { rango: 'Cuotas 25-84', valor: 252225 },
    ],
    adjudicacion: 'Cuotas 6 y 12 + 30% (AE + 10%)', diferimientos: 'Cuotas 1 a 12: 20% / Cuotas 13 a 18: 10%', subite: true
  },
  {
    id: 'fiorino-70-30', modelo: 'fiorino', nombre: 'FIORINO ENDURANCE 1.3 MT', codigo: 'FO1',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 26660633, suscripcion: 275206,
    cuotas: [
      { rango: 'Cuota 2', valor: 319661 }, { rango: 'Cuotas 3-11', valor: 319661 },
      { rango: 'Cuota 12', valor: 339390 }, { rango: 'Cuota 13', valor: 319661 },
      { rango: 'Cuotas 14-84', valor: 264118 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'argo-70-30', modelo: 'argo', nombre: 'ARGO DRIVE 1.3L MT', codigo: 'AR2',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 24735537, suscripcion: 279596,
    cuotas: [
      { rango: 'Cuota 2', valor: 296579 }, { rango: 'Cuotas 3-11', valor: 296579 },
      { rango: 'Cuota 12', valor: 314883 }, { rango: 'Cuota 13', valor: 296579 },
      { rango: 'Cuotas 14-84', valor: 245047 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-70-30', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'DP1',
    plan: '70/30', condicion: 'B72', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30752066, suscripcion: 347603,
    cuotas: [
      { rango: 'Cuota 2', valor: 347362 }, { rango: 'Cuotas 3-11', valor: 347362 },
      { rango: 'Cuota 12', valor: 370118 }, { rango: 'Cuotas 13-19', valor: 347362 },
      { rango: 'Cuotas 20-84', valor: 304650 },
    ],
    adjudicacion: 'Cuotas 2, 4, 9, 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-80-20', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'DP1',
    plan: '80/20', condicion: 'M81', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30752066, suscripcion: 397261,
    cuotas: [
      { rango: 'Cuota 2', valor: 408988 }, { rango: 'Cuotas 3-11', valor: 408988 },
      { rango: 'Cuota 12', valor: 431744 }, { rango: 'Cuota 13', valor: 408988 },
      { rango: 'Cuotas 14-84', valor: 344921 },
    ],
    adjudicacion: 'Cuotas 6, 9, 12 + 20% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-90-10', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'DP1',
    plan: '90/10', condicion: 'B90', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30752066, suscripcion: 446919,
    cuotas: [
      { rango: 'Cuota 2', valor: 449258 }, { rango: 'Cuotas 3-11', valor: 449258 },
      { rango: 'Cuota 12', valor: 472015 }, { rango: 'Cuota 13', valor: 449258 },
      { rango: 'Cuotas 14-84', valor: 385192 },
    ],
    adjudicacion: 'Cuota 10 + 20% (AE + 10%)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'pulse-70-30', modelo: 'pulse', nombre: 'PULSE DRIVE 1.3L MT', codigo: 'FP1',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30462810, suscripcion: 344334,
    cuotas: [
      { rango: 'Cuota 2', valor: 365249 }, { rango: 'Cuotas 3-11', valor: 365249 },
      { rango: 'Cuota 12', valor: 387792 }, { rango: 'Cuota 13', valor: 365249 },
      { rango: 'Cuotas 14-84', valor: 301785 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'strada-70-30', modelo: 'strada', nombre: 'STRADA FREEDOM CD 1.3 8V MT', codigo: 'FS1',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 34126697, suscripcion: 352274,
    cuotas: [
      { rango: 'Cuota 2', valor: 409179 }, { rango: 'Cuotas 3-11', valor: 409179 },
      { rango: 'Cuota 12', valor: 434433 }, { rango: 'Cuota 13', valor: 409179 },
      { rango: 'Cuotas 14-84', valor: 338082 },
    ],
    adjudicacion: 'Cuotas 6 y 12 + 35% (AE + 5%)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'toro-70-30', modelo: 'toro', nombre: 'TORO FREEDOM 1.3T AT6 4X2', codigo: 'NT1',
    plan: '70/30', condicion: 'B71', tipo: 'CUOTA VARIABLE', valorMovil: 42977376, suscripcion: 399272,
    cuotas: [
      { rango: 'Cuota 2', valor: 475903 }, { rango: 'Cuotas 3-11', valor: 507706 },
      { rango: 'Cuota 12', valor: 515299 }, { rango: 'Cuota 13', valor: 425763 },
      { rango: 'Cuotas 14-18', valor: 445460 }, { rango: 'Cuotas 19-42', valor: 425763 },
      { rango: 'Cuotas 43-84', valor: 425763 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'Cuotas 1 a 12: 10%', subite: true
  },
  {
    id: 'fastback-70-30', modelo: 'fastback', nombre: 'FASTBACK TURBO 270 AT6', codigo: 'FT1',
    plan: '70/30', condicion: 'B71', tipo: 'CUOTA VARIABLE', valorMovil: 37636364, suscripcion: 382878,
    cuotas: [
      { rango: 'Cuota 2', valor: 416760 }, { rango: 'Cuotas 3-11', valor: 444611 },
      { rango: 'Cuota 12', valor: 451260 }, { rango: 'Cuota 13', valor: 372851 },
      { rango: 'Cuotas 14-18', valor: 390101 }, { rango: 'Cuotas 19-42', valor: 372851 },
      { rango: 'Cuotas 43-84', valor: 372851 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'Cuotas 1 a 12: 10%', subite: true
  },
  {
    id: 'titano-60-40', modelo: 'titano', nombre: 'TITANO FREEDOM MT 4W', codigo: 'DT1',
    plan: '60/40', condicion: 'B61', tipo: 'CUOTA VARIABLE', valorMovil: 52977376, suscripcion: 421864,
    cuotas: [
      { rango: 'Cuota 2', valor: 487409 }, { rango: 'Cuotas 3-11', valor: 526612 },
      { rango: 'Cuota 12', valor: 529034 }, { rango: 'Cuotas 13-18', valor: 549846 },
      { rango: 'Cuota 19', valor: 476267 }, { rango: 'Cuotas 20-42', valor: 455454 },
      { rango: 'Cuotas 43-84', valor: 455454 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 40% (AE)', diferimientos: 'Cuotas 1 a 12: 10%', subite: true
  },
];

// ========== CATÁLOGO VEHÍCULOS ==========
const catalogo = [
  { id: 1, categoria: 'autos', modelo: 'mobi', nombre: 'Mobi Trekking 1.0', precio: 26541725, motor: '1.0 8V', potencia: '75 CV', caja: 'Manual 5V' },
  { id: 2, categoria: 'autos', modelo: 'argo', nombre: 'Argo Drive 1.3L MT', precio: 29055824, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 3, categoria: 'autos', modelo: 'argo', nombre: 'Argo Drive 1.3L CVT', precio: 31569922, motor: '1.3 Firefly', potencia: '99 CV', caja: 'CVT' },
  { id: 4, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Like 1.3 GSE', precio: 30178786, motor: '1.3 GSE', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 5, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Drive 1.3 MT Pack Plus', precio: 35812288, motor: '1.3 GSE', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 6, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Drive 1.3 CVT Pack Plus', precio: 36015797, motor: '1.3 GSE', potencia: '99 CV', caja: 'CVT' },
  { id: 7, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Precision 1.3 CVT', precio: 37273853, motor: '1.3 GSE', potencia: '99 CV', caja: 'CVT' },
  { id: 8, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Drive 1.3L MT', precio: 35488523, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 9, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Drive 1.3L CVT', precio: 36691077, motor: '1.3 Firefly', potencia: '99 CV', caja: 'CVT' },
  { id: 10, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Audace 1.0T CVT', precio: 39540204, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 11, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Impetus 1.0T CVT', precio: 41204373, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 12, categoria: 'suv', modelo: 'fastback', nombre: 'Fastback Turbo 270 AT6', precio: 43882202, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 13, categoria: 'suv', modelo: 'fastback', nombre: 'Fastback Abarth Turbo 270 AT6', precio: 47763654, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 14, categoria: 'suv', modelo: 'fiat600', nombre: 'Fiat 600 MHEV 1.2 AT', precio: 49676388, motor: '1.2 Hybrid', potencia: '145 CV', caja: 'AT' },
  { id: 15, categoria: 'utilitarios', modelo: 'fiorino', nombre: 'Fiorino Endurance 1.4 MT5', precio: 31384446, motor: '1.4', potencia: '88 CV', caja: 'Manual 5V' },
  { id: 16, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Freedom C/S 1.3 MT', precio: 35039391, motor: '1.3 8V', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 17, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Freedom 1.3 CD', precio: 39783693, motor: '1.3 8V', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 18, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Volcano 1.3 CD CVT', precio: 44263291, motor: '1.3 8V', potencia: '99 CV', caja: 'CVT' },
  { id: 19, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Ranch T200 CD CVT', precio: 47734979, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 20, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Freedom T270 AT6 4X2', precio: 49740618, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 21, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Volcano T270 AT6 4X2', precio: 55421563, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 22, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Volcano TD350 AT9 4x4', precio: 59616096, motor: '2.0 Diesel', potencia: '170 CV', caja: 'AT9' },
  { id: 23, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Ultra TD350 AT9 4x4', precio: 66040247, motor: '2.0 Diesel', potencia: '170 CV', caja: 'AT9' },
  { id: 24, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Endurance MT 4X2', precio: 52530186, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 25, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Endurance MT 4X4', precio: 55513191, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 26, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Freedom MT 4X4', precio: 60990518, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 27, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Freedom Plus AT 4X4', precio: 66834357, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT8' },
  { id: 28, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Ranch AT 4X4', precio: 72057161, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT8' },
];

// ========== STOCK OPORTUNIDAD ==========
const stockOportunidad = [
  { modelo: 'cronos', nombre: 'Cronos Drive 1.3 MT', color: 'Plata Bari', precioFinal: 31600000, stock: 6 },
  { modelo: 'cronos', nombre: 'Cronos Drive 1.3 MT', color: 'Negro Vulcano', precioFinal: 31600000, stock: 6 },
  { modelo: 'cronos', nombre: 'Cronos Drive 1.3 CVT', color: 'Plata Bari', precioFinal: 31785000, stock: 1 },
  { modelo: 'fastback', nombre: 'Fastback Turbo 270 AT6', color: 'Gris Strato + Techo', precioFinal: 38700000, stock: 1 },
  { modelo: 'fastback', nombre: 'Fastback Turbo 270 AT6', color: 'Rojo M.C. + Techo', precioFinal: 38700000, stock: 2 },
  { modelo: 'fastback', nombre: 'Fastback Turbo 270 AT6', color: 'Blanco Banchisa', precioFinal: 38700000, stock: 1 },
  { modelo: 'fiat600', nombre: 'Fiat 600 MHEV 1.2 AT', color: 'Bicolor Turquesa', precioFinal: 43900000, stock: 1 },
  { modelo: 'fiat600', nombre: 'Fiat 600 MHEV 1.2 AT', color: 'Metallic Sand', precioFinal: 43900000, stock: 1 },
  { modelo: 'fiat600', nombre: 'Fiat 600 MHEV 1.2 AT', color: 'Blanco Gelato', precioFinal: 43900000, stock: 1 },
  { modelo: 'pulse', nombre: 'Pulse Audace 1.0T CVT', color: 'Plata Bari', precioFinal: 34900000, stock: 1 },
  { modelo: 'pulse', nombre: 'Pulse Drive 1.3L CVT', color: 'Gris Silverstone', precioFinal: 32400000, stock: 1 },
  { modelo: 'pulse', nombre: 'Pulse Drive 1.3L CVT', color: 'Negro Vulcano', precioFinal: 32400000, stock: 1 },
  { modelo: 'strada', nombre: 'Strada Ranch CD 1.0T CVT', color: 'Blanco Banchisa', precioFinal: 42100000, stock: 1 },
  { modelo: 'titano', nombre: 'Titano Endurance MT 4X4', color: 'Blanco Banchisa', precioFinal: 48800000, stock: 1 },
  { modelo: 'titano', nombre: 'Titano Endurance MT 4X4', color: 'Plata Bari', precioFinal: 48800000, stock: 1 },
  { modelo: 'titano', nombre: 'Titano Freedom MT 4X4', color: 'Gris Silverstone', precioFinal: 53600000, stock: 1 },
  { modelo: 'titano', nombre: 'Titano Ranch AT 4X4', color: 'Negro Vulcano', precioFinal: 63400000, stock: 2 },
  { modelo: 'toro', nombre: 'Toro Freedom 1.3T AT6 4x2', color: 'Gris Granito', precioFinal: 43800000, stock: 1 },
  { modelo: 'toro', nombre: 'Toro Volcano TD350 AT9 4x4', color: 'Blanco Polar', precioFinal: 52400000, stock: 1 },
];

// ========== NOVEDADES ==========
const novedades = [
  { id: 1, fecha: '04 Feb 2026', titulo: '🚀 Nuevo Fiat 600 Hybrid ya disponible', descripcion: 'Llegó el nuevo Fiat 600 con tecnología híbrida. Motor 1.2 de 145 CV con consumo reducido. ¡Vení a conocerlo!', imagen: 'fiat600', destacado: true },
  { id: 2, fecha: '01 Feb 2026', titulo: '📋 Nuevos Planes de Ahorro Febrero', descripcion: 'Actualizamos todos los planes con nuevas condiciones. Cronos desde $347.000 de cuota. Consultá el simulador.', imagen: 'cronos', destacado: true },
  { id: 3, fecha: '28 Ene 2026', titulo: '🔥 Oportunidades de Stock', descripcion: 'Más de 25 unidades con precios especiales. Cronos, Fastback, Pulse y más. Entrega inmediata.', imagen: 'fastback', destacado: false },
  { id: 4, fecha: '20 Ene 2026', titulo: '🔧 Promo Service de Verano', descripcion: 'Revisión de aire acondicionado + control de niveles gratis con cualquier service. Válido hasta el 28/02.', imagen: 'strada', destacado: false },
];

// ========== SERVICIOS ==========
const servicios = [
  { id: 'service10', nombre: 'Service 10.000 km', descripcion: 'Cambio aceite sintético Selenia + filtro aceite + filtro habitáculo + 25 controles', duracion: '2 horas' },
  { id: 'service20', nombre: 'Service 20.000 km', descripcion: 'Cambio aceite sintético Selenia + filtro aceite + filtro habitáculo + 25 controles', duracion: '2 horas' },
  { id: 'service30', nombre: 'Service 30.000 km', descripcion: 'Cambio aceite + filtro aceite + filtro aire + filtro habitáculo + 25 controles', duracion: '2.5 horas' },
  { id: 'service40', nombre: 'Service 40.000 km', descripcion: 'Cambio aceite + filtro aceite + filtro habitáculo + 25 controles de seguridad', duracion: '2 horas' },
  { id: 'service50', nombre: 'Service 50.000 km', descripcion: 'Cambio aceite + filtros completos + líquido frenos + 25 controles', duracion: '3 horas' },
  { id: 'alineacion', nombre: 'Alineación y Balanceo', descripcion: 'Alineación computarizada tren delantero/trasero + balanceo 4 ruedas', duracion: '1 hora' },
  { id: 'scanner', nombre: 'Scanner / Diagnóstico', descripcion: 'Diagnóstico computarizado completo con scanner oficial Fiat', duracion: '30 min' },
  { id: 'ac', nombre: 'Aire Acondicionado', descripcion: 'Carga de gas refrigerante + control de fugas + limpieza filtro', duracion: '1 hora' },
];

const horarios = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

// ========== TIPOS ATENCIÓN AL CLIENTE ==========
const tiposAtencion = [
  { id: 'consulta', icon: '❓', titulo: 'Consulta', desc: 'Tengo una pregunta', color: 'from-blue-500 to-blue-700', border: 'border-blue-400', bg: 'bg-blue-500/20' },
  { id: 'reclamo', icon: '⚠️', titulo: 'Reclamo', desc: 'Reportar un problema', color: 'from-red-500 to-red-700', border: 'border-red-400', bg: 'bg-red-500/20' },
  { id: 'sugerencia', icon: '💡', titulo: 'Sugerencia', desc: 'Tengo una idea', color: 'from-amber-500 to-amber-700', border: 'border-amber-400', bg: 'bg-amber-500/20' },
  { id: 'felicitacion', icon: '⭐', titulo: 'Felicitación', desc: 'Destacar buena atención', color: 'from-green-500 to-green-700', border: 'border-green-400', bg: 'bg-green-500/20' },
];

const areasAtencion = ['Ventas 0KM', 'Plan de Ahorro', 'Service / Posventa', 'Repuestos', 'Administración', 'Otro'];

const formatPrecio = (precio) => {
  if (!precio) return 'Consultar';
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio);
};

// Componente de imagen con fallback y múltiples extensiones
const AutoImagen = ({ modelo, className = '', alt = '', contain = false }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const gradient = colorFallback[modelo] || 'from-slate-700 to-slate-800';
  const nombre = nombreModelo[modelo] || modelo?.toUpperCase() || '';
  const extensiones = ['png', 'jpg', 'jpeg', 'webp'];
  const [extIndex, setExtIndex] = useState(0);

  useEffect(() => {
    if (modelo && extIndex < extensiones.length) {
      setImgSrc(`/images/${modelo}.${extensiones[extIndex]}`);
    }
  }, [modelo, extIndex]);

  const handleError = () => {
    if (extIndex < extensiones.length - 1) setExtIndex(extIndex + 1);
    else { setError(true); setLoading(false); }
  };

  if (error || !modelo) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex flex-col items-center justify-center ${className}`}>
        <div className="text-white/30 text-2xl font-black text-center px-2">{nombre}</div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gradient-to-br ${gradient} ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {imgSrc && (
        <img src={imgSrc} alt={alt || modelo}
          className={`w-full h-full ${contain ? 'object-contain' : 'object-cover'} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)} onError={handleError} />
      )}
    </div>
  );
};

// Calendario
const Calendario = ({ fechaSeleccionada, onSeleccionar }) => {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
  const ultimoDia = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);
  const dias = [];
  for (let i = 0; i < primerDia.getDay(); i++) dias.push(null);
  for (let d = 1; d <= ultimoDia.getDate(); d++) dias.push(new Date(mesActual.getFullYear(), mesActual.getMonth(), d));
  const esHabil = (f) => f && f.getDay() !== 0;
  const esPasado = (f) => f && f < hoy && f.toDateString() !== hoy.toDateString();
  const esSeleccionado = (f) => f && fechaSeleccionada && f.toDateString() === fechaSeleccionada.toDateString();

  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1))} className="p-2 hover:bg-white/10 rounded-lg text-lg">←</button>
        <span className="font-bold text-sm">{meses[mesActual.getMonth()]} {mesActual.getFullYear()}</span>
        <button onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1))} className="p-2 hover:bg-white/10 rounded-lg text-lg">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {diasSemana.map((d, i) => <div key={i} className="text-white/50 py-1 font-bold">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dias.map((fecha, i) => (
          <button key={i} disabled={!fecha || !esHabil(fecha) || esPasado(fecha)}
            onClick={() => fecha && esHabil(fecha) && !esPasado(fecha) && onSeleccionar(fecha)}
            className={`aspect-square rounded-lg text-xs flex items-center justify-center transition-all
              ${!fecha ? 'invisible' : ''} ${fecha && !esHabil(fecha) ? 'text-white/20' : ''}
              ${fecha && esPasado(fecha) && esHabil(fecha) ? 'text-white/30' : ''}
              ${fecha && esHabil(fecha) && !esPasado(fecha) ? 'hover:bg-white/20 active:scale-95' : ''}
              ${esSeleccionado(fecha) ? 'bg-red-600 text-white font-bold' : ''}`}>
            {fecha?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

// ========== APP PRINCIPAL ==========
export default function LasacApp() {
  const [seccion, setSeccion] = useState('inicio');
  const [filtro, setFiltro] = useState('todos');
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
  const [turno, setTurno] = useState({ nombre: '', telefono: '', email: '', patente: '', modelo: '', km: '', servicio: '', sucursal: '', fecha: null, horario: '', comentarios: '' });
  const [enviado, setEnviado] = useState(false);
  const [servicioDetalle, setServicioDetalle] = useState(null);

  // Estado para Atención al Cliente interactiva
  const [atencionTipo, setAtencionTipo] = useState(null);
  const [atencionForm, setAtencionForm] = useState({ nombre: '', telefono: '', email: '', area: '', modelo: '', patente: '', mensaje: '' });
  const [atencionSucursal, setAtencionSucursal] = useState(null);
  const [atencionEnviado, setAtencionEnviado] = useState(false);

  const vehiculos = filtro === 'todos' ? catalogo : catalogo.filter(v => v.categoria === filtro);
  const totalStock = stockOportunidad.reduce((a, b) => a + b.stock, 0);
  const formatFecha = (fecha) => fecha ? fecha.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' }) : '';
  const tipoActual = tiposAtencion.find(t => t.id === atencionTipo);

  const consultarVehiculo = (vehiculo) => {
    const msg = `🚗 *CONSULTA*%0A%0AMe interesa: *${vehiculo.nombre}*%0A💰 ${formatPrecio(vehiculo.precio || vehiculo.precioFinal)}${vehiculo.color ? `%0A🎨 ${vehiculo.color}` : ''}`;
    window.open(`https://wa.me/5492964487924?text=${msg}`, '_blank');
  };

  const consultarPlan = (plan) => {
    const msg = `📋 *CONSULTA FIAT PLAN*%0A%0AModelo: *${plan.nombre}*%0ACódigo: ${plan.codigo}%0APlan: ${plan.plan}%0ASuscripción: ${formatPrecio(plan.suscripcion)}%0ACuota desde: ${formatPrecio(plan.cuotas[1]?.valor)}`;
    window.open(`https://wa.me/5492964487924?text=${msg}`, '_blank');
  };

  const enviarTurno = () => {
    const fechaStr = turno.fecha ? formatFecha(turno.fecha) : 'A confirmar';
    const msg = `🔧 *SOLICITUD DE TURNO*%0A%0A👤 ${turno.nombre}%0A📱 ${turno.telefono}%0A🚗 ${turno.modelo} - ${turno.patente}%0A📊 ${turno.km} km%0A🔧 ${turno.servicio}%0A📅 ${fechaStr} ${turno.horario}%0A📍 ${turno.sucursal}`;
    const wa = turno.sucursal === 'Río Grande' ? '5492964465050' : '5492901559933';
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
    setEnviado(true);
  };

  const enviarAtencion = () => {
    if (!atencionTipo || !atencionForm.nombre || !atencionForm.telefono || !atencionForm.mensaje || !atencionSucursal) {
      alert('Completá los campos obligatorios (*)');
      return;
    }
    const t = tipoActual;
    const f = atencionForm;
    const msg = `${t.icon} *ATENCIÓN AL CLIENTE - ${t.titulo.toUpperCase()}*%0A%0A` +
      `👤 *Datos*%0ANombre: ${f.nombre}%0ATel: ${f.telefono}%0AEmail: ${f.email || 'No indicado'}%0A%0A` +
      `🏢 Área: ${f.area || 'General'}%0A📍 Sucursal: ${atencionSucursal}%0A` +
      (f.modelo || f.patente ? `🚗 Vehículo: ${f.modelo} ${f.patente}%0A%0A` : '%0A') +
      `✍️ *Mensaje:*%0A${f.mensaje}`;
    window.open(`https://wa.me/5492964610900?text=${msg}`, '_blank');
    setAtencionEnviado(true);
  };

  const resetAtencion = () => {
    setAtencionTipo(null);
    setAtencionForm({ nombre: '', telefono: '', email: '', area: '', modelo: '', patente: '', mensaje: '' });
    setAtencionSucursal(null);
    setAtencionEnviado(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pb-20">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg border-b border-white/10 p-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <LogoLASAC className="h-7" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/60 hidden sm:block">Tierra del Fuego</span>
            <span className="text-lg">🇦🇷</span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-lg mx-auto p-3">

        {/* ========== INICIO ========== */}
        {seccion === 'inicio' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full" />
              <h1 className="text-2xl font-bold mb-1 relative">Bienvenido a LASAC</h1>
              <p className="text-sm opacity-90 mb-4 relative">Concesionario Oficial FIAT</p>
              <div className="flex gap-2 justify-center flex-wrap relative">
                <button onClick={() => setSeccion('oportunidades')} className="px-6 py-2 bg-white text-red-600 rounded-full font-bold text-sm">🔥 Oferta del Mes</button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '🚗', title: 'Catálogo', id: 'catalogo', color: 'from-blue-500 to-blue-600' },
                { icon: '📋', title: 'Plan de Ahorro', id: 'simulador', color: 'from-green-500 to-green-600' },
                { icon: '📰', title: 'Novedades', id: 'novedades', color: 'from-purple-500 to-purple-600' },
                { icon: '🛡️', title: 'Siniestros', id: 'siniestros', color: 'from-orange-500 to-orange-600' },
                { icon: '🔧', title: 'Service', id: 'turnos', color: 'from-amber-500 to-amber-600' },
                { icon: '💬', title: 'Atención', id: 'atencion', color: 'from-sky-500 to-sky-600' },
              ].map(item => (
                <div key={item.id} onClick={() => setSeccion(item.id)} className="bg-white/5 rounded-xl p-3 active:scale-95 transition-all border border-white/10 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-xl mb-2`}>{item.icon}</div>
                  <h3 className="font-bold text-xs">{item.title}</h3>
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-bold mb-3 flex items-center gap-2">📰 Novedades</h2>
              <div className="space-y-2">
                {novedades.filter(n => n.destacado).map(nov => (
                  <div key={nov.id} onClick={() => setSeccion('novedades')} className="bg-white/5 rounded-xl p-3 border border-white/10 flex gap-3">
                    <AutoImagen modelo={nov.imagen} className="w-16 h-16 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white/50">{nov.fecha}</p>
                      <h3 className="font-bold text-sm truncate">{nov.titulo}</h3>
                      <p className="text-xs text-white/60 line-clamp-2">{nov.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== CATÁLOGO ========== */}
        {seccion === 'catalogo' && (
          <div>
            <h2 className="text-xl font-bold mb-1">🚗 Catálogo</h2>
            <p className="text-white/60 text-xs mb-3">Precios Tierra del Fuego - Feb 2026</p>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-3 px-3">
              {['todos', 'autos', 'suv', 'pickups', 'utilitarios'].map(cat => (
                <button key={cat} onClick={() => setFiltro(cat)} className={`px-3 py-1.5 rounded-full text-xs capitalize whitespace-nowrap ${filtro === cat ? 'bg-red-600' : 'bg-white/10'}`}>{cat}</button>
              ))}
            </div>
            <div className="space-y-3">
              {vehiculos.map(v => (
                <div key={v.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <AutoImagen modelo={v.modelo} className="w-full h-36" alt={v.nombre} contain />
                  <div className="p-3">
                    <h3 className="font-bold text-sm truncate">{v.nombre}</h3>
                    <div className="flex gap-1 my-1.5 flex-wrap">
                      <span className="bg-blue-500/30 px-1.5 py-0.5 rounded text-[10px]">{v.motor}</span>
                      <span className="bg-green-500/30 px-1.5 py-0.5 rounded text-[10px]">{v.potencia}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-green-400">{formatPrecio(v.precio)}</p>
                      <button onClick={() => consultarVehiculo(v)} className="px-4 py-2 bg-red-600 rounded-lg text-xs font-bold">💬 Consultar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== OPORTUNIDADES ========== */}
        {seccion === 'oportunidades' && (
          <div>
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-4 text-center mb-4">
              <h2 className="text-xl font-bold mb-1">🔥 Oferta del Mes</h2>
              <p className="text-sm">{totalStock} unidades • Entrega inmediata</p>
            </div>
            <div className="space-y-3">
              {stockOportunidad.map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 relative">
                  <span className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-xs font-bold z-10">x{item.stock} unidades</span>
                  <AutoImagen modelo={item.modelo} className="w-full h-36" contain />
                  <div className="p-3">
                    <h3 className="font-bold text-sm">{item.nombre}</h3>
                    <p className="text-xs text-white/60 mb-2">🎨 {item.color}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-green-400">{formatPrecio(item.precioFinal)}</p>
                      <button onClick={() => consultarVehiculo(item)} className="px-4 py-2 bg-green-600 rounded-lg text-xs font-bold">⚡ Consultar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== SIMULADOR DE CUOTAS ========== */}
        {seccion === 'simulador' && (
          <div>
            <h2 className="text-xl font-bold mb-1">📊 Simulador de Cuotas</h2>
            <p className="text-white/60 text-xs mb-4">Fiat Plan - Febrero 2026</p>
            {!planSeleccionado ? (
              <div className="space-y-3">
                <p className="text-sm text-white/70 mb-2">Seleccioná un modelo para ver el detalle de cuotas:</p>
                {planesDetalle.map(plan => (
                  <div key={plan.id} onClick={() => setPlanSeleccionado(plan)} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 active:scale-[0.98] transition-all">
                    <AutoImagen modelo={plan.modelo} className="w-full h-32" contain />
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm">{plan.nombre}</h3>
                        <span className="bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{plan.codigo}</span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <span className="bg-blue-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.plan}</span>
                        <span className="bg-green-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.tipo}</span>
                      </div>
                      <p className="text-sm text-green-400 font-bold mt-2">Desde {formatPrecio(plan.cuotas[1]?.valor)}/mes</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <button onClick={() => setPlanSeleccionado(null)} className="text-sm text-white/60 flex items-center gap-1">← Volver a planes</button>
                <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <AutoImagen modelo={planSeleccionado.modelo} className="w-full h-44" contain />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg">{planSeleccionado.nombre}</h3>
                      <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold">{planSeleccionado.codigo}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Plan</p><p className="font-bold text-sm">{planSeleccionado.plan}</p></div>
                      <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Condición</p><p className="font-bold text-sm">{planSeleccionado.condicion}</p></div>
                      <div className="bg-black/20 rounded-lg p-2 col-span-2"><p className="text-[10px] text-white/50">Valor Móvil (sin IVA)</p><p className="font-bold text-green-400">{formatPrecio(planSeleccionado.valorMovil)}</p></div>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 mb-4">
                      <p className="text-xs opacity-80">SUSCRIPCIÓN</p>
                      <p className="text-2xl font-bold">{formatPrecio(planSeleccionado.suscripcion)}</p>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3 mb-4">
                      <h4 className="font-bold text-sm mb-3">📋 Detalle de Cuotas (sin IVA)</h4>
                      <div className="space-y-2">
                        {planSeleccionado.cuotas.map((c, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                            <span className="text-xs text-white/70">{c.rango}</span>
                            <span className="font-bold text-sm">{formatPrecio(c.valor)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="bg-blue-500/20 rounded-lg p-3"><p className="text-white/60">🎯 Adjudicación</p><p className="font-bold">{planSeleccionado.adjudicacion}</p></div>
                      <div className="bg-amber-500/20 rounded-lg p-3"><p className="text-white/60">📊 Diferimientos</p><p className="font-bold">{planSeleccionado.diferimientos}</p></div>
                      {planSeleccionado.subite && <div className="bg-green-500/20 rounded-lg p-3"><p className="font-bold">✅ Opción SUBITE disponible</p></div>}
                    </div>
                    <button onClick={() => consultarPlan(planSeleccionado)} className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-bold">📞 Consultar este Plan</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== NOVEDADES ========== */}
        {seccion === 'novedades' && (
          <div>
            <h2 className="text-xl font-bold mb-4">📰 Novedades</h2>
            <div className="space-y-4">
              {novedades.map(nov => (
                <div key={nov.id} className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <AutoImagen modelo={nov.imagen} className="w-full h-44" contain />
                  <div className="p-4">
                    <p className="text-[10px] text-white/50 mb-1">{nov.fecha}</p>
                    <h3 className="font-bold text-lg mb-2">{nov.titulo}</h3>
                    <p className="text-sm text-white/70">{nov.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== SINIESTROS ========== */}
        {seccion === 'siniestros' && (
          <div>
            <h2 className="text-xl font-bold mb-1">🛡️ Atención de Siniestros</h2>
            <p className="text-white/60 text-xs mb-4">Gestión de reclamos por seguro</p>
            <div className="space-y-4">
              <div className="bg-amber-500/20 rounded-xl p-4 border border-amber-500/30">
                <p className="text-sm">⚠️ <strong>Importante:</strong> Completá todos los datos para agilizar la gestión de tu siniestro.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-sm mb-3">👤 Datos del Titular</h3>
                <div className="space-y-2">
                  <input placeholder="Nombre completo *" id="siniestro-nombre" className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="DNI *" id="siniestro-dni" className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="Teléfono *" id="siniestro-telefono" className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="Email" id="siniestro-email" type="email" className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-sm mb-3">🚗 Datos del Vehículo</h3>
                <div className="grid grid-cols-2 gap-2">
                  <select id="siniestro-marca" className="p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
                    <option value="">Marca *</option><option value="FIAT">FIAT</option><option value="Otra">Otra marca</option>
                  </select>
                  <input placeholder="Modelo *" id="siniestro-modelo" className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="Año *" id="siniestro-anio" className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="Patente *" id="siniestro-patente" className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
                  <input placeholder="Color" id="siniestro-color" className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="Kilometraje" id="siniestro-km" className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-sm mb-3">🏢 Datos de la Aseguradora</h3>
                <div className="space-y-2">
                  <select id="siniestro-aseguradora" className="w-full p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
                    <option value="">Compañía de Seguros *</option>
                    <option value="Allianz">Allianz</option><option value="Federación Patronal">Federación Patronal</option>
                    <option value="La Segunda">La Segunda</option><option value="Mapfre">Mapfre</option>
                    <option value="Mercantil Andina">Mercantil Andina</option><option value="Rivadavia">Rivadavia</option>
                    <option value="San Cristóbal">San Cristóbal</option><option value="Sancor">Sancor</option>
                    <option value="Zurich">Zurich</option><option value="Otra">Otra</option>
                  </select>
                  <input placeholder="N° de Póliza *" id="siniestro-poliza" className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="N° de Siniestro (si lo tenés)" id="siniestro-numero" className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-sm mb-3">📋 Datos del Siniestro</h3>
                <div className="space-y-2">
                  <input placeholder="Fecha del siniestro *" id="siniestro-fecha" type="date" className="w-full p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm" />
                  <select id="siniestro-tipo" className="w-full p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
                    <option value="">Tipo de siniestro *</option>
                    <option value="Colisión">Colisión / Choque</option><option value="Robo total">Robo total</option>
                    <option value="Robo parcial">Robo parcial</option><option value="Granizo">Daño por granizo</option>
                    <option value="Incendio">Incendio</option><option value="Vandalismo">Vandalismo</option><option value="Otro">Otro</option>
                  </select>
                  <textarea placeholder="Descripción del siniestro *" id="siniestro-descripcion" rows={3} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm resize-none" />
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-bold text-sm mb-3">📍 Sucursal de Atención</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={(e) => { document.querySelectorAll('[data-suc]').forEach(el => el.classList.remove('bg-red-600')); e.currentTarget.classList.add('bg-red-600'); }} data-suc data-sucursal="Ushuaia" className="p-3 rounded-lg text-left bg-white/5 border border-white/10">
                    <div className="font-bold text-sm">Ushuaia</div><div className="text-[10px] text-white/60">Piedrabuena 256</div>
                  </button>
                  <button type="button" onClick={(e) => { document.querySelectorAll('[data-suc]').forEach(el => el.classList.remove('bg-red-600')); e.currentTarget.classList.add('bg-red-600'); }} data-suc data-sucursal="Río Grande" className="p-3 rounded-lg text-left bg-white/5 border border-white/10">
                    <div className="font-bold text-sm">Río Grande</div><div className="text-[10px] text-white/60">San Martín 2599</div>
                  </button>
                </div>
              </div>
              <button onClick={() => {
                const nombre = document.getElementById('siniestro-nombre')?.value || '';
                const dni = document.getElementById('siniestro-dni')?.value || '';
                const telefono = document.getElementById('siniestro-telefono')?.value || '';
                const marca = document.getElementById('siniestro-marca')?.value || '';
                const modelo = document.getElementById('siniestro-modelo')?.value || '';
                const anio = document.getElementById('siniestro-anio')?.value || '';
                const patente = document.getElementById('siniestro-patente')?.value || '';
                const aseguradora = document.getElementById('siniestro-aseguradora')?.value || '';
                const poliza = document.getElementById('siniestro-poliza')?.value || '';
                const numSiniestro = document.getElementById('siniestro-numero')?.value || '';
                const fecha = document.getElementById('siniestro-fecha')?.value || '';
                const tipo = document.getElementById('siniestro-tipo')?.value || '';
                const descripcion = document.getElementById('siniestro-descripcion')?.value || '';
                const sucursal = document.querySelector('[data-suc].bg-red-600')?.innerText?.split('\n')[0] || '';
                const msg = `🛡️ *ATENCIÓN DE SINIESTRO*%0A%0A👤 *TITULAR*%0ANombre: ${nombre}%0ADNI: ${dni}%0ATel: ${telefono}%0A%0A🚗 *VEHÍCULO*%0A${marca} ${modelo} ${anio}%0APatente: ${patente}%0A%0A🏢 *SEGURO*%0AAseguradora: ${aseguradora}%0APóliza: ${poliza}%0AN° Siniestro: ${numSiniestro || 'Pendiente'}%0A%0A📋 *SINIESTRO*%0AFecha: ${fecha}%0ATipo: ${tipo}%0ADescripción: ${descripcion}%0A%0A📍 Sucursal: ${sucursal}`;
                const wa = sucursal === 'Río Grande' ? '5492964465050' : '5492901559933';
                window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
              }} className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-700 active:scale-95 transition-all">
                📱 Enviar Solicitud por WhatsApp
              </button>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-2">¿Necesitás ayuda urgente?</p>
                <a href="tel:+5492901559933" className="inline-block px-4 py-2 bg-green-600 rounded-full text-sm font-bold">📞 Llamar ahora</a>
              </div>
            </div>
          </div>
        )}

        {/* ========== ATENCIÓN AL CLIENTE - INTERACTIVA ========== */}
        {seccion === 'atencion' && (
          <div>
            <h2 className="text-xl font-bold mb-1">💬 Atención al Cliente</h2>
            <p className="text-white/60 text-xs mb-5">Seleccioná el motivo de tu contacto</p>

            {atencionEnviado ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">✅</div>
                <h3 className="text-xl font-bold">¡Mensaje enviado!</h3>
                <p className="text-white/60 text-sm">Tu {tipoActual?.titulo.toLowerCase()} fue derivada al equipo de atención</p>
                <button onClick={resetAtencion} className="px-6 py-3 bg-white/10 rounded-xl font-bold text-sm">Enviar otra consulta</button>
              </div>
            ) : (
              <>
                {/* Selector de tipo - INTERACTIVO */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {tiposAtencion.map(tipo => {
                    const sel = atencionTipo === tipo.id;
                    return (
                      <button key={tipo.id} onClick={() => setAtencionTipo(tipo.id)}
                        className={`relative p-4 rounded-2xl text-left transition-all duration-300 border-2 ${sel ? `${tipo.bg} ${tipo.border} scale-[1.02] shadow-lg` : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                        {sel && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-xs font-bold">✓</span>
                          </div>
                        )}
                        <div className="text-2xl mb-2">{tipo.icon}</div>
                        <div className="font-bold text-sm">{tipo.titulo}</div>
                        <div className="text-[10px] text-white/50 mt-0.5">{tipo.desc}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Formulario - aparece al seleccionar tipo */}
                {atencionTipo && tipoActual && (
                  <div className="space-y-4">
                    {/* Barra de color del tipo */}
                    <div className={`bg-gradient-to-r ${tipoActual.color} rounded-xl p-3 flex items-center gap-3`}>
                      <span className="text-2xl">{tipoActual.icon}</span>
                      <div>
                        <div className="font-bold text-sm">{tipoActual.titulo}</div>
                        <div className="text-[10px] opacity-80">Completá los datos para enviar</div>
                      </div>
                    </div>

                    {/* Datos personales */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                      <h3 className="font-bold text-sm mb-3">👤 Tus Datos</h3>
                      <input placeholder="Nombre completo *" value={atencionForm.nombre} onChange={e => setAtencionForm({...atencionForm, nombre: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <input placeholder="Teléfono *" type="tel" value={atencionForm.telefono} onChange={e => setAtencionForm({...atencionForm, telefono: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <input placeholder="Email (opcional)" type="email" value={atencionForm.email} onChange={e => setAtencionForm({...atencionForm, email: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                    </div>

                    {/* Área - botones seleccionables */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3">🏢 Área Relacionada</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {areasAtencion.map(a => (
                          <button key={a} onClick={() => setAtencionForm({...atencionForm, area: a})}
                            className={`p-2 rounded-lg text-xs font-medium transition-all ${atencionForm.area === a ? 'bg-sky-600 text-white' : 'bg-white/5 border border-white/20 text-white/70'}`}>
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vehículo - más prominente en Reclamo */}
                    <div className={`bg-white/5 rounded-xl p-4 border border-white/10 ${atencionTipo === 'reclamo' ? 'ring-1 ring-red-400/30' : ''}`}>
                      <h3 className="font-bold text-sm mb-1">🚗 Vehículo {atencionTipo === 'reclamo' ? '' : '(opcional)'}</h3>
                      {atencionTipo === 'reclamo' && <p className="text-[10px] text-red-300 mb-3">Completá estos datos para agilizar tu reclamo</p>}
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Modelo" value={atencionForm.modelo} onChange={e => setAtencionForm({...atencionForm, modelo: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                        <input placeholder="Patente" value={atencionForm.patente} onChange={e => setAtencionForm({...atencionForm, patente: e.target.value.toUpperCase()})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
                      </div>
                    </div>

                    {/* Mensaje - placeholder adaptado */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3">✍️ Tu Mensaje *</h3>
                      <textarea
                        placeholder={
                          atencionTipo === 'consulta' ? '¿Cuál es tu consulta?' :
                          atencionTipo === 'reclamo' ? 'Describí el problema con el mayor detalle posible...' :
                          atencionTipo === 'sugerencia' ? 'Contanos tu idea o sugerencia...' :
                          '¡Contanos tu experiencia positiva!'
                        }
                        value={atencionForm.mensaje} onChange={e => setAtencionForm({...atencionForm, mensaje: e.target.value})}
                        rows={4} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm resize-none" />
                    </div>

                    {/* Sucursal */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3">📍 Sucursal *</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Ushuaia', 'Río Grande'].map(s => (
                          <button key={s} onClick={() => setAtencionSucursal(s)}
                            className={`p-3 rounded-lg font-bold text-sm transition-all ${atencionSucursal === s ? 'bg-sky-600' : 'bg-white/5 border border-white/20'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Enviar - color del tipo seleccionado */}
                    <button onClick={enviarAtencion}
                      className={`w-full p-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r ${tipoActual.color} active:scale-95 transition-all`}>
                      <span>📲</span> Enviar {tipoActual.titulo} por WhatsApp
                    </button>

                    {/* Contacto directo */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-sm text-center text-white/70 mb-3">También podés contactarnos directamente:</p>
                      <div className="flex gap-2 justify-center">
                        <a href="tel:+5492964610900" className="px-4 py-2 bg-green-600 rounded-full text-sm font-bold">📞 Llamar</a>
                        <a href="mailto:atencion@lasac.com.ar" className="px-4 py-2 bg-blue-600 rounded-full text-sm font-bold">✉️ Email</a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mensaje cuando no hay tipo seleccionado */}
                {!atencionTipo && (
                  <div className="text-center py-8 text-white/30">
                    <div className="text-4xl mb-3">👆</div>
                    <p className="text-sm">Seleccioná una opción para continuar</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ========== TURNOS ========== */}
        {seccion === 'turnos' && (
          <div>
            <h2 className="text-xl font-bold mb-1">🔧 Turno Service</h2>
            <p className="text-white/60 text-xs mb-4">Solicitá tu turno online</p>
            {enviado ? (
              <div className="bg-green-500/20 rounded-xl p-6 text-center border border-green-500/30">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-xl font-bold mb-2">¡Solicitud Enviada!</h3>
                <p className="text-sm text-white/70 mb-4">Te contactaremos para confirmar</p>
                <button onClick={() => { setEnviado(false); setTurno({nombre:'',telefono:'',email:'',patente:'',modelo:'',km:'',servicio:'',sucursal:'',fecha:null,horario:'',comentarios:''}); }} className="px-4 py-2 bg-white/10 rounded-lg text-sm">Nueva Solicitud</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">👤 Datos</h3>
                  <div className="space-y-2">
                    <input placeholder="Nombre *" value={turno.nombre} onChange={e => setTurno({...turno, nombre: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                    <input placeholder="Teléfono *" value={turno.telefono} onChange={e => setTurno({...turno, telefono: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">🚗 Vehículo</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={turno.modelo} onChange={e => setTurno({...turno, modelo: e.target.value})} className="p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
                      <option value="">Modelo *</option>
                      {['Mobi', 'Argo', 'Cronos', 'Pulse', 'Fastback', '600', 'Fiorino', 'Strada', 'Toro', 'Titano', 'Otro'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <input placeholder="Patente *" value={turno.patente} onChange={e => setTurno({...turno, patente: e.target.value.toUpperCase()})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
                    <input placeholder="Kilometraje *" value={turno.km} onChange={e => setTurno({...turno, km: e.target.value})} className="col-span-2 p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">🔧 Servicio</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {servicios.map(s => (
                      <button key={s.id} onClick={() => { setTurno({...turno, servicio: s.nombre}); setServicioDetalle(s); }} className={`p-2 rounded-lg text-left text-xs ${turno.servicio === s.nombre ? 'bg-red-600' : 'bg-white/5'} border border-white/10`}>
                        <div className="font-bold">{s.nombre}</div>
                        <div className="text-white/60 text-[10px]">⏱️ {s.duracion}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">📅 Fecha</h3>
                  <Calendario fechaSeleccionada={turno.fecha} onSeleccionar={(fecha) => setTurno({...turno, fecha})} />
                  {turno.fecha && (
                    <div className="mt-3">
                      <p className="text-xs text-white/60 mb-2">Horario:</p>
                      <div className="grid grid-cols-4 gap-1">
                        {horarios.map(h => (<button key={h} onClick={() => setTurno({...turno, horario: h})} className={`p-1.5 rounded text-[10px] ${turno.horario === h ? 'bg-red-600' : 'bg-white/10'}`}>{h}</button>))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">📍 Sucursal</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ nombre: 'Ushuaia', dir: 'Piedrabuena 256' }, { nombre: 'Río Grande', dir: 'San Martín 2599' }].map(suc => (
                      <button key={suc.nombre} onClick={() => setTurno({...turno, sucursal: suc.nombre})} className={`p-3 rounded-lg text-left ${turno.sucursal === suc.nombre ? 'bg-red-600' : 'bg-white/5'} border border-white/10`}>
                        <div className="font-bold text-sm">{suc.nombre}</div>
                        <div className="text-[10px] text-white/60">{suc.dir}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={enviarTurno} disabled={!turno.nombre || !turno.telefono || !turno.patente || !turno.modelo || !turno.km || !turno.servicio || !turno.sucursal}
                  className={`w-full py-4 rounded-xl font-bold text-lg ${turno.nombre && turno.telefono && turno.patente && turno.modelo && turno.km && turno.servicio && turno.sucursal ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-white/20 text-white/50'}`}>
                  📱 Enviar por WhatsApp
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========== CONTACTO ========== */}
        {seccion === 'contacto' && (
          <div>
            <h2 className="text-xl font-bold mb-4">📍 Sucursales</h2>
            <div className="space-y-4">
              {[
                { ciudad: 'Ushuaia', icon: '🏔️', sub: 'Fin del Mundo', ventas: 'L. Lugones 1950', service: 'Piedrabuena 256', waVentas: '5492964487924', waService: '5492901559933' },
                { ciudad: 'Río Grande', icon: '🏭', sub: 'Corazón Industrial', dir: 'San Martín 2599', waVentas: '5492964487924', waService: '5492964465050' }
              ].map(suc => (
                <div key={suc.ciudad} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-3 text-center mb-3">
                    <span className="text-3xl">{suc.icon}</span>
                    <h3 className="text-xl font-bold">{suc.ciudad}</h3>
                    <p className="text-white/70 text-xs">{suc.sub}</p>
                  </div>
                  <div className="space-y-1 mb-3 text-xs">
                    {suc.ventas && <p>🪧 Ventas: {suc.ventas}</p>}
                    {suc.service && <p>🔧 Service: {suc.service}</p>}
                    {suc.dir && <p>📍 {suc.dir}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a href={`https://wa.me/${suc.waVentas}`} className="py-2 bg-green-600 rounded-lg font-bold text-center text-sm">💬 Ventas</a>
                    <a href={`https://wa.me/${suc.waService}`} className="py-2 bg-blue-600 rounded-lg font-bold text-center text-sm">🔧 Service</a>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mt-6 mb-3">📞 Otros Contactos</h3>
            <div className="space-y-2">
              <a href="https://wa.me/5492964465270" className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 active:scale-[0.98] transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-xl">📋</div>
                <div className="flex-1"><h4 className="font-bold text-sm">FIAT Plan - Administración</h4><p className="text-xs text-white/60">Consultas sobre tu plan de ahorro</p></div>
                <span className="text-green-500 text-xl">💬</span>
              </a>
              <a href="https://wa.me/5492964609082" className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10 active:scale-[0.98] transition-all">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-xl">🔩</div>
                <div className="flex-1"><h4 className="font-bold text-sm">Repuestos</h4><p className="text-xs text-white/60">Consultas y pedidos de repuestos</p></div>
                <span className="text-green-500 text-xl">💬</span>
              </a>
            </div>
            <div className="bg-white/5 rounded-xl p-4 mt-4 text-center border border-white/10">
              <a href="https://lasac.com.ar" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-bold text-sm">🌐 lasac.com.ar</a>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-2 z-50">
        <div className="max-w-lg mx-auto flex justify-around">
          {[
            { id: 'inicio', icon: '🏠', label: 'Inicio' },
            { id: 'catalogo', icon: '🚗', label: 'Catálogo' },
            { id: 'simulador', icon: '📋', label: 'Plan Ahorro' },
            { id: 'turnos', icon: '🔧', label: 'Service' },
            { id: 'atencion', icon: '💬', label: 'Atención' },
            { id: 'contacto', icon: '📍', label: 'Contacto' },
          ].map(item => (
            <button key={item.id} onClick={() => setSeccion(item.id)} className={`flex flex-col items-center py-1 px-2 rounded-lg ${seccion === item.id ? 'text-red-500' : 'text-white/60'}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="text-[9px] mt-0.5">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}