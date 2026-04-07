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

// ========== DATOS PLAN DE AHORRO — ABRIL 2026 (FIAT Plan Comercial) ==========
const planesDetalle = [
  {
    id: 'mobi-80-20', modelo: 'mobi', nombre: 'MOBI TREKKING 1.0', codigo: 'MB1',
    plan: '80/20', condicion: 'M80', tipo: 'CON DIFERIMIENTOS', valorMovil: 22603306, precioLista: 22603306, suscripcion: 233595,
    derechoAdjudicacion: 547000,
    cuotas: [
      { rango: 'C1', valor: 233595 }, { rango: 'C2 a C11', valor: 247766 },
      { rango: 'C12', valor: 264492 }, { rango: 'C13 a C18', valor: 271898 },
      { rango: 'C19', valor: 296029 }, { rango: 'C20 a C24', valor: 258043 },
      { rango: 'C25 a C72', valor: 273125 }, { rango: 'C73 a C84', valor: 258043 },
    ],
    selladoTDF: 279740, selladoCuotas: 'C2-C19', selladoPorCuota: 15541,
    alicuota: 215270, gastosAdm: 26048, seguroVida: 16726, derSusc: 40221,
    totalCliente: [
      { rango: 'C1', valor: 233595 }, { rango: 'C2 a C11', valor: 247766 },
      { rango: 'C12', valor: 264492 }, { rango: 'C13 a C18', valor: 271898 },
      { rango: 'C19', valor: 296029 }, { rango: 'C20 a C24', valor: 258043 },
      { rango: 'C25 a C72', valor: 273125 }, { rango: 'C73 a C84', valor: 258043 },
    ],
    adjudicacion: 'Cuotas 6 y 12 + 30% (AE + 10%)', diferimientos: 'C1-12: 20% / C13-18: 10% (recupero C25-72)', subite: true
  },
  {
    id: 'argo-70-30', modelo: 'argo', nombre: 'ARGO DRIVE 1.3L MT', codigo: 'AR2',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 24735537, precioLista: 24735537, suscripcion: 279596,
    derechoAdjudicacion: 598600,
    cuotas: [
      { rango: 'C1', valor: 279596 }, { rango: 'C2 a C11', valor: 311230 },
      { rango: 'C12', valor: 330100 }, { rango: 'C13 a C25', valor: 311230 },
      { rango: 'C26 a C84', valor: 249375 },
    ],
    selladoTDF: 306130, selladoCuotas: 'C2-C13', selladoPorCuota: 25511,
    alicuota: 206129, gastosAdm: 24942, seguroVida: 18304, derSusc: 62354,
    totalCliente: [
      { rango: 'C1', valor: 279596 }, { rango: 'C2 a C11', valor: 311230 },
      { rango: 'C12', valor: 330100 }, { rango: 'C13 a C25', valor: 311230 },
      { rango: 'C26 a C84', valor: 249375 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-70-30', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'DP1',
    plan: '70/30', condicion: 'B72', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30909091, precioLista: 30909091, suscripcion: 349378,
    derechoAdjudicacion: 748000,
    cuotas: [
      { rango: 'C1', valor: 349378 }, { rango: 'C2 a C11', valor: 363559 },
      { rango: 'C12', valor: 386432 }, { rango: 'C13 a C19', valor: 363559 },
      { rango: 'C20 a C84', valor: 311614 },
    ],
    selladoTDF: 382534, selladoCuotas: 'C2-C19', selladoPorCuota: 21252,
    alicuota: 257576, gastosAdm: 31167, seguroVida: 22873, derSusc: 55000,
    totalCliente: [
      { rango: 'C1', valor: 349378 }, { rango: 'C2 a C11', valor: 363559 },
      { rango: 'C12', valor: 386432 }, { rango: 'C13 a C19', valor: 363559 },
      { rango: 'C20 a C84', valor: 311614 },
    ],
    adjudicacion: 'Cuotas 2, 4, 9, 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-80-20', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'DP1',
    plan: '80/20', condicion: 'M81', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30909091, precioLista: 30909091, suscripcion: 399290,
    derechoAdjudicacion: 748000,
    cuotas: [
      { rango: 'C1', valor: 399290 }, { rango: 'C2 a C11', valor: 430780 },
      { rango: 'C12', valor: 453653 }, { rango: 'C13', valor: 430780 },
      { rango: 'C14 a C84', valor: 352864 },
    ],
    selladoTDF: 382534, selladoCuotas: 'C2-C13', selladoPorCuota: 31878,
    alicuota: 294372, gastosAdm: 35619, seguroVida: 22873, derSusc: 77917,
    totalCliente: [
      { rango: 'C1', valor: 399290 }, { rango: 'C2 a C11', valor: 430780 },
      { rango: 'C12', valor: 453653 }, { rango: 'C13', valor: 430780 },
      { rango: 'C14 a C84', valor: 352864 },
    ],
    adjudicacion: 'Cuotas 6, 9 y 12 + 20% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-90-10', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'DP1',
    plan: '90/10', condicion: 'B90', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30909091, precioLista: 30909091, suscripcion: 449201,
    derechoAdjudicacion: 748000,
    cuotas: [
      { rango: 'C1', valor: 449201 }, { rango: 'C2 a C11', valor: 472029 },
      { rango: 'C12', valor: 494902 }, { rango: 'C13', valor: 469635 },
      { rango: 'C14 a C84', valor: 394113 },
    ],
    selladoTDF: 382534, selladoCuotas: 'C2-C13', selladoPorCuota: 31878,
    alicuota: 331169, gastosAdm: 40071, seguroVida: 22873, derSusc: 77917,
    totalCliente: [
      { rango: 'C1', valor: 449201 }, { rango: 'C2 a C11', valor: 472029 },
      { rango: 'C12', valor: 494902 }, { rango: 'C13', valor: 469635 },
      { rango: 'C14 a C84', valor: 394113 },
    ],
    adjudicacion: 'Cuota 10 + 10% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'pulse-70-30', modelo: 'pulse', nombre: 'PULSE DRIVE 1.3L MT', codigo: 'FP1',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 30619835, precioLista: 30619835, suscripcion: 346109,
    derechoAdjudicacion: 741000,
    cuotas: [
      { rango: 'C1', valor: 346109 }, { rango: 'C2 a C11', valor: 385886 },
      { rango: 'C12', valor: 408545 }, { rango: 'C13', valor: 385886 },
      { rango: 'C14 a C84', valor: 308699 },
    ],
    selladoTDF: 378955, selladoCuotas: 'C2-C13', selladoPorCuota: 31580,
    alicuota: 255165, gastosAdm: 30875, seguroVida: 22659, derSusc: 84205,
    totalCliente: [
      { rango: 'C1', valor: 346109 }, { rango: 'C2 a C11', valor: 385886 },
      { rango: 'C12', valor: 408545 }, { rango: 'C13', valor: 385886 },
      { rango: 'C14 a C84', valor: 308699 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'fastback-70-30', modelo: 'fastback', nombre: 'FASTBACK TURBO 270 AT6', codigo: 'FT1',
    plan: '70/30', condicion: 'B71', tipo: 'CON DIFERIMIENTOS', valorMovil: 37826446, precioLista: 37826446, suscripcion: 384811,
    derechoAdjudicacion: 915400,
    cuotas: [
      { rango: 'C1', valor: 384811 }, { rango: 'C2 a C11', valor: 441371 },
      { rango: 'C12', valor: 469362 }, { rango: 'C13', valor: 476707 },
      { rango: 'C14 a C18', valor: 381353 }, { rango: 'C19 a C42', valor: 399021 },
      { rango: 'C43 a C84', valor: 381353 },
    ],
    selladoTDF: 468144, selladoCuotas: 'C2-C13', selladoPorCuota: 39012,
    alicuota: 315220, gastosAdm: 38142, seguroVida: 27992, derSusc: 95354,
    totalCliente: [
      { rango: 'C1', valor: 384811 }, { rango: 'C2 a C11', valor: 441371 },
      { rango: 'C12', valor: 469362 }, { rango: 'C13', valor: 476707 },
      { rango: 'C14 a C18', valor: 381353 }, { rango: 'C19 a C42', valor: 399021 },
      { rango: 'C43 a C84', valor: 381353 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'C1-12: 10% (recupero C19-42)', subite: true
  },
];

// ========== CATÁLOGO VEHÍCULOS ==========
// Lista FIAT N°04/2026 — Vigencia 1° de Abril 2026 (precios finales con todos los gastos)
const catalogo = [
  { id: 1, categoria: 'autos', modelo: 'mobi', nombre: 'Mobi Trekking 1.0', precio: 26670849, motor: '1.0 8V', potencia: '75 CV', caja: 'Manual 5V' },
  { id: 2, categoria: 'autos', modelo: 'argo', nombre: 'Argo Drive 1.3L MT', precio: 29055825, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 3, categoria: 'autos', modelo: 'argo', nombre: 'Argo Drive 1.3L CVT', precio: 31569923, motor: '1.3 Firefly', potencia: '99 CV', caja: 'CVT' },
  { id: 4, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Like 1.3 GSE', precio: 30155743, motor: '1.3 GSE', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 5, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Drive 1.3 MT Pack Plus', precio: 35959972, motor: '1.3 GSE', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 6, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Drive 1.3 CVT Pack Plus', precio: 36163319, motor: '1.3 GSE', potencia: '99 CV', caja: 'CVT' },
  { id: 7, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Precision 1.3 CVT', precio: 37245131, motor: '1.3 GSE', potencia: '99 CV', caja: 'CVT' },
  { id: 8, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Drive 1.3 MT5', precio: 35636467, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 9, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Drive 1.3 CVT', precio: 36662821, motor: '1.3 Firefly', potencia: '99 CV', caja: 'CVT' },
  { id: 10, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Audace 1.0T CVT', precio: 39509668, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 11, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Impetus 1.0T CVT', precio: 41809984, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 12, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Abarth Turbo 270 AT6', precio: 43780232, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 13, categoria: 'suv', modelo: 'fastback', nombre: 'Fastback Turbo 270 AT', precio: 44745951, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 14, categoria: 'suv', modelo: 'fastback', nombre: 'Fastback Abarth Turbo 270 AT6', precio: 48469041, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 15, categoria: 'suv', modelo: 'fiat600', nombre: 'Fiat 600 Hybrid 1.2 eDCT', precio: 48132857, motor: '1.2 Hybrid', potencia: '145 CV', caja: 'eDCT' },
  { id: 16, categoria: 'utilitarios', modelo: 'fiorino', nombre: 'Fiorino Endurance 1.3 Firefly', precio: 29150451, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 17, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Freedom C/S 1.3 MT', precio: 32533160, motor: '1.3 8V', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 18, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Freedom 1.3 8V CD', precio: 36924087, motor: '1.3 8V', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 19, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Volcano 1.3 8V CD CVT', precio: 41070027, motor: '1.3 8V', potencia: '99 CV', caja: 'CVT' },
  { id: 20, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Ranch T200 CD CVT', precio: 44283130, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 21, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Ultra T200 CD CVT', precio: 44405624, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 22, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Freedom 1.3T AT6 4X2', precio: 46139381, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 23, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Volcano 1.3T AT6 4X2', precio: 51397186, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 24, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Volcano 2.2TD AT9 4X4', precio: 55279293, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT9' },
  { id: 25, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Endurance MT 4X2', precio: 48721170, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 26, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Endurance MT 4X4', precio: 51481989, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 27, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Freedom MT 4X4', precio: 56551343, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 28, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Freedom Plus AT 4X4', precio: 61959909, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT8' },
  { id: 29, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Ranch AT 4X4', precio: 66793698, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT8' },
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
  { id: 1, fecha: '07 Mar 2026', titulo: '📋 Cambio de Modelo Abril 2026', descripcion: 'Ya disponible la nueva sobrepauta con todos los modelos actualizados. Cronos, Argo, Pulse, Strada y más. Consultá el simulador.', imagen: 'cronos', destacado: true },
  { id: 2, fecha: '04 Mar 2026', titulo: '💳 Nuevo: Solicitud de Crédito Online', descripcion: 'Ahora podés solicitar tu crédito automotor directamente desde la app. Completá el formulario y te contactamos en 24hs.', imagen: 'pulse', destacado: true },
  { id: 3, fecha: '01 Mar 2026', titulo: '🚀 Nuevo Fiat 600 Hybrid disponible', descripcion: 'Llegó el nuevo Fiat 600 con tecnología híbrida. Motor 1.2 de 145 CV. Disponible para ahorristas de Pulse y Fastback.', imagen: 'fiat600', destacado: false },
  { id: 4, fecha: '20 Feb 2026', titulo: '🔥 Oportunidades de Stock', descripcion: 'Unidades con precios especiales y entrega inmediata. Cronos, Fastback, Pulse, Titano y más.', imagen: 'fastback', destacado: false },
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

// ========== COLORES DE VEHÍCULOS - Cambio Modelo Abril 2026 ==========
const COLORES_VEHICULO = {
  "249": { nombre: "Blanco Banchisa", hex: "#F5F5F5", grupo: "blanco" },
  "534": { nombre: "Blanco Alaska", hex: "#EAEAEA", grupo: "blanco" },
  "742": { nombre: "Blanco Polar", hex: "#F0F0F0", grupo: "blanco" },
  "296": { nombre: "Blanco Ambiente", hex: "#E8E4DF", grupo: "blanco" },
  "979": { nombre: "Gris Silverstone", hex: "#8E8E8E", grupo: "gris" },
  "619": { nombre: "Plata Bari", hex: "#B8B8B8", grupo: "gris" },
  "806": { nombre: "Negro Vulcano", hex: "#1a1a1a", grupo: "negro" },
  "978": { nombre: "Rojo Montecarlo", hex: "#CC0000", grupo: "rojo" },
  "847": { nombre: "Gris Granito", hex: "#6B6B6B", grupo: "gris" },
  "097": { nombre: "Billet Silver", hex: "#A8A8A8", grupo: "gris" },
  "503": { nombre: "Gris Sting", hex: "#5A5A5A", grupo: "gris" },
  "766": { nombre: "Gris Strato", hex: "#4A4A4A", grupo: "gris" },
  "345": { nombre: "Azul Jazz", hex: "#1E3A5F", grupo: "azul" },
  "268": { nombre: "Blanco Gelatto", hex: "#FFF8E7", grupo: "blanco" },
  "636": { nombre: "Crema Capuccino", hex: "#C4A882", grupo: "beige" },
  "572": { nombre: "Naranja Sole", hex: "#E8652B", grupo: "naranja" },
  "688": { nombre: "Azul Passione", hex: "#003DA5", grupo: "azul" },
  "959": { nombre: "Azul Acqua", hex: "#4BA3C3", grupo: "azul" },
  "176": { nombre: "Rojo Pastel", hex: "#A32020", grupo: "rojo" },
};

// ========== MODELOS POR FAMILIA - Cambio Modelo Abril 2026 ==========
const CRONOS_UNIVERSAL = [
  { nombre: "Cronos Like 1.3 GSE", pda: "LI1", colores: ["249","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "Manual 5 vel." },
  { nombre: "Cronos Drive 1.3 GSE CVT", pda: "PC5", colores: ["534","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "CVT (AT7)" },
  { nombre: "Cronos Drive Plus 1.3 GSE", pda: "DP1", colores: ["534","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "Manual 5 vel." },
  { nombre: "Cronos Precision 1.3 CVT", pda: "CA6", colores: ["534","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "CVT (AT7)" },
];

const MODELOS_POR_FAMILIA = {
  cronos: [...CRONOS_UNIVERSAL],
  argo: [
    { nombre: "Argo Drive 1.3 CVT", pda: "AC1", colores: ["249","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "CVT (AT7)" },
    { nombre: "Argo Drive 1.3 MT", pda: "AR2", colores: ["249","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "Manual 5 vel." },
  ],
  strada: [
    { nombre: "Strada Freedom 1.3 CD", pda: "FS1", colores: ["249","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "Manual 5 vel.", nota: "Cabina Doble" },
    { nombre: "Strada Volcano 1.3 CD CVT", pda: "VS1", colores: ["249","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "CVT", nota: "Cabina Doble" },
    { nombre: "Strada Freedom CS 1.3 MT", pda: "DA1", colores: ["249","979","619","806","978"], motor: "1.3 Firefly 99 CV", caja: "Manual 5 vel.", nota: "Cabina Simple" },
  ],
  toro: [
    { nombre: "Toro Volcano 1.3T AT6 4x2", pda: "VT1", colores: ["742","806","847","097","503","345","176"], motor: "1.3 Turbo 175 CV", caja: "Automática AT6" },
    { nombre: "Toro Freedom T270 AT6 4x2", pda: "NT1", colores: ["296","806","847","097","176"], motor: "T270 185 CV", caja: "Automática AT6" },
  ],
  pulse: [
    { nombre: "Pulse Drive 1.3 MT5", pda: "FP1", colores: ["249","979","619","806","978","766"], motor: "1.3 Firefly 99 CV", caja: "Manual 5 vel." },
    { nombre: "Pulse Drive 1.3 CVT", pda: "UL1", colores: ["249","979","619","806","978","766"], motor: "1.3 Firefly 99 CV", caja: "CVT (AT7)" },
    { nombre: "Pulse Abarth 270 AT6", pda: "UA4", colores: ["249","806","978","766"], motor: "1.3 Turbo 270 CV", caja: "Automática AT6", nota: "Performance" },
    { nombre: "FIAT 600 1.2 AT Hybrid", pda: "GO0", colores: ["268","636","572","688","959"], motor: "1.2 Hybrid", caja: "Automática", nota: "Disponible para ahorristas de Pulse", especial: true },
  ],
  fastback: [
    { nombre: "Fastback Turbo 270 AT6", pda: "FT1", colores: ["249","979","619","806","978","766"], motor: "1.3 Turbo 270 CV", caja: "Automática AT6" },
    { nombre: "Fastback Abarth 270 AT6", pda: "FA1", colores: ["249","806","978","176"], motor: "1.3 Turbo 270 CV", caja: "Automática AT6", nota: "Performance" },
    { nombre: "FIAT 600 1.2 AT Hybrid", pda: "GO0", colores: ["268","636","572","688","959"], motor: "1.2 Hybrid", caja: "Automática", nota: "Disponible para ahorristas de Fastback", especial: true },
  ],
  titano: [
    { nombre: "Titano Endurance MT 4WD", pda: "TI1", colores: ["249","979","619","806","978","766"], motor: "2.2 Turbodiesel", caja: "Manual 6 vel.", nota: "Tracción 4WD" },
    { nombre: "Titano Endurance MT 4x2", pda: "ET1", colores: ["249","979","619","806","978","766"], motor: "2.2 Turbodiesel", caja: "Manual 6 vel.", nota: "Tracción 4x2" },
    { nombre: "Titano Freedom Plus AT8 AWD", pda: "PT1", colores: ["249","979","619","978","766"], motor: "2.2 Turbodiesel", caja: "Automática AT8", nota: "Tracción AWD" },
    { nombre: "Titano Freedom MT 4WD", pda: "DT1", colores: ["249","979","619","978","766"], motor: "2.2 Turbodiesel", caja: "Manual 6 vel.", nota: "Tracción 4WD" },
    { nombre: "Titano Ranch AT8 AWD", pda: "AT1", colores: ["249","979","619","978","766"], motor: "2.2 Turbodiesel", caja: "Automática AT8", nota: "Tracción AWD · Tope de gama" },
  ],
  fiorino: [
    { nombre: "Nuevo Fiorino 1.3L MT", pda: "FO1", colores: ["249"], motor: "1.3L", caja: "Manual 5 vel." },
  ],
  mobi: [
    { nombre: "Mobi Trekking 1.0 MT", pda: "MB1", colores: ["249","979","619","806","978"], motor: "1.0 Firefly 75 CV", caja: "Manual 5 vel." },
  ],
};

// ========== PLANES SOBREPAUTA - ABRIL 2026 ==========
const planesAbril = [
  { id: "cronos9010", base: "Cronos", tipoPlan: "90/10", condicion: "B90", familia: "cronos", emoji: "📈", precio: 30752066, entregaMin: 6155000, da: 750000, gastos: 3980000, pctEntrega: 20, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Solo familia Cronos.", descripcion: "Máxima financiación: solo 10% de anticipo." },
  { id: "cronos9010L", base: "Cronos Like", tipoPlan: "90/10", condicion: "B90", familia: "cronos", emoji: "📈", precio: 25719008, entregaMin: 5145000, da: 625000, gastos: 3350000, pctEntrega: 20, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Solo familia Cronos.", descripcion: "Cronos Like 90/10." },
  { id: "cronos8020", base: "Cronos", tipoPlan: "80/20", condicion: "M81", familia: "cronos", emoji: "💰", precio: 30752066, entregaMin: 6250000, da: 740000, gastos: 3980000, pctEntrega: 20, adjCuotas: [6,12], licitacionMin: 30, restriccion: "Solo familia Cronos.", descripcion: "Menor anticipo: plan 80/20." },
  { id: "cronos8020L", base: "Cronos Like", tipoPlan: "80/20", condicion: "M81", familia: "cronos", emoji: "💰", precio: 25719008, entregaMin: 5250000, da: 625000, gastos: 3350000, pctEntrega: 20, adjCuotas: [6,12], licitacionMin: 30, restriccion: "Solo familia Cronos.", descripcion: "Cronos Like 80/20." },
  { id: "cronos7030", base: "Cronos", tipoPlan: "70/30", condicion: "B70", familia: "cronos", emoji: "🏠", precio: 30752066, entregaMin: 9300000, da: 750000, gastos: 3980000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Solo familia Cronos.", descripcion: "El sedán argentino. Plan clásico 70/30." },
  { id: "cronos7030L", base: "Cronos Like", tipoPlan: "70/30", condicion: "B70", familia: "cronos", emoji: "🏠", precio: 25719008, entregaMin: 7780000, da: 625000, gastos: 3350000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Solo familia Cronos.", descripcion: "Cronos Like 70/30." },
  { id: "argo", base: "Argo", tipoPlan: "70/30", condicion: "B70", familia: "argo", emoji: "🚗", precio: 24735537, entregaMin: 7500000, da: 600000, gastos: 3220000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Familia Argo + cambio a Cronos disponible.", descripcion: "Hatch versátil: MT y CVT." },
  { id: "pulse", base: "Pulse", tipoPlan: "70/30", condicion: "B70", familia: "pulse", emoji: "⛰️", precio: 30462810, entregaMin: 9250000, da: 740000, gastos: 3960000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Familia Pulse (incluye FIAT 600) + cambio a Cronos.", descripcion: "SUV compacto + acceso al FIAT 600." },
  { id: "strada", base: "Strada", tipoPlan: "70/30", condicion: "B70", familia: "strada", emoji: "🛻", precio: 34126697, entregaMin: 11946000, da: 825000, gastos: 4435000, pctEntrega: 35, adjCuotas: [6,12], licitacionMin: 35, restriccion: "Familia Strada + cambio a Cronos disponible.", descripcion: "Pickup compacta. Cabina doble y simple." },
  { id: "fiorino", base: "Fiorino", tipoPlan: "70/30", condicion: "B70", familia: "fiorino", emoji: "📦", precio: 26660633, entregaMin: 8065000, da: 650000, gastos: 3465000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Familia Fiorino + cambio a Cronos disponible.", descripcion: "Utilitario compacto. Ideal para negocios." },
  { id: "toro", base: "Toro", tipoPlan: "70/30", condicion: "B71", familia: "toro", emoji: "💪", precio: 42977376, entregaMin: 13000000, da: 1040000, gastos: 5590000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Familia Toro + cambio a Cronos disponible.", descripcion: "Pickup mediana. Potencia y tecnología." },
  { id: "fastback", base: "Fastback", tipoPlan: "70/30", condicion: "B71", familia: "fastback", emoji: "🏎️", precio: 37636364, entregaMin: 11400000, da: 912000, gastos: 4890000, pctEntrega: 30, adjCuotas: [4,6,12], licitacionMin: 30, restriccion: "Familia Fastback (incluye FIAT 600) + cambio a Cronos.", descripcion: "SUV coupé. Turbo 270 CV." },
  { id: "titano", base: "Titano", tipoPlan: "60/40", condicion: "B61", familia: "titano", emoji: "🏔️", precio: 52977376, entregaMin: 21200000, da: 1285000, gastos: 6890000, pctEntrega: 40, adjCuotas: [4,6,12], licitacionMin: 40, restriccion: "Familia Titano + cambio a Cronos disponible.", descripcion: "La pickup grande de FIAT." },
  { id: "mobi", base: "Mobi", tipoPlan: "80/20", condicion: "M80", familia: "mobi", emoji: "🏙️", precio: 22487603, entregaMin: 4500000, da: 546000, gastos: 2925000, pctEntrega: 20, adjCuotas: [6,12], licitacionMin: 30, restriccion: "Familia Mobi + cambio a Cronos disponible.", descripcion: "El 0km más accesible." },
];

// ========== DOCUMENTACIÓN REQUERIDA PLAN ==========
const DOCUMENTACION_PLAN = [
  { id: 1, texto: "DNI frente y dorso (titular y cónyuge/garante)", icono: "🪪" },
  { id: 2, texto: "CUIT / CUIL constancia AFIP", icono: "📋" },
  { id: 3, texto: "Comprobante de domicilio (< 90 días)", icono: "🏠" },
  { id: 4, texto: "Últimos 3 recibos de sueldo (ingreso mín. 3x cuota)", icono: "💼" },
  { id: 5, texto: "Acta de matrimonio / divorcio (si aplica)", icono: "💍" },
  { id: 6, texto: "Formulario 01 firmado", icono: "📝" },
  { id: 7, texto: "Solicitud de pedido de unidad", icono: "📄" },
  { id: 8, texto: "Seguro con compañía autorizada FCA", icono: "🛡️" },
  { id: 9, texto: "No figurar en Veraz (titular ni garantes)", icono: "⚠️" },
];

const obtenerModelosParaPlan = (plan) => {
  const modelosFamilia = MODELOS_POR_FAMILIA[plan.familia] || [];
  if (plan.familia === 'cronos') return modelosFamilia;
  const cronosConMarca = CRONOS_UNIVERSAL.map(m => ({ ...m, esCambioUniversal: true }));
  return [...modelosFamilia, ...cronosConMarca];
};

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

// Color dot para colores de vehículos
const ColorDot = ({ colorId, size = 16, showName = false }) => {
  const color = COLORES_VEHICULO[colorId];
  if (!color) return null;
  const border = color.grupo === 'blanco' ? '2px solid #ccc' : color.grupo === 'negro' ? '2px solid #444' : 'none';
  return (
    <div className="flex items-center gap-1" title={color.nombre}>
      <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: color.hex, border, flexShrink: 0 }} />
      {showName && <span className="text-[10px] text-white/60">{color.nombre}</span>}
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

  // Estado para Plan de Ahorro mejorado (multi-step)
  const [planStep, setPlanStep] = useState(0); // 0=tipo usuario, 1=licitación, 2=selector plan, 3=modelos, 4=docs, 5=contacto
  const [tipoUsuarioPlan, setTipoUsuarioPlan] = useState(null); // 'suscriptor' | 'adjudicado'
  const [planSucursal, setPlanSucursal] = useState('Ushuaia');
  const [planSelecAbril, setPlanSelecAbril] = useState(null);
  const [modeloSelec, setModeloSelec] = useState(null);
  const [planExpandido, setPlanExpandido] = useState(null);
  const [docChecks, setDocChecks] = useState({});
  const [planFiltro, setPlanFiltro] = useState('');

  // Estado para simulador detallado (Quiero Suscribirme)
  const [showTotalCliente, setShowTotalCliente] = useState(true);
  const [planDetalleSelec, setPlanDetalleSelec] = useState(null);

  // Estado para Crédito Automotor
  const [creditoStep, setCreditoStep] = useState(0);
  const [creditoForm, setCreditoForm] = useState({
    nombre: '', domicilio: '', localidad: 'Ushuaia', telefono: '', email: '', dni: '',
    fechaNac: '', estadoCivil: '', conyuge: '', cuilConyuge: '',
    empleador: '', cargo: '', antiguedad: '', ingresoNeto: '',
    tieneTarjetas: false, tarjetas: [], otroBanco: '',
    vehiculoInteres: '', urgencia: 'normal',
    entregaUsado: false, marcaUsado: '', modeloUsado: '', anioUsado: '', kmUsado: '', patenteUsado: '',
    comentarios: '',
  });
  const [creditoEnviado, setCreditoEnviado] = useState(false);

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
    // Taller — mismo número para ambas sucursales
    window.open(`https://wa.me/5492964465050?text=${msg}`, '_blank');
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

  // Plan de Ahorro - navegación
  const resetPlan = () => {
    setPlanStep(0); setTipoUsuarioPlan(null); setPlanSelecAbril(null);
    setModeloSelec(null); setPlanExpandido(null); setDocChecks({}); setPlanFiltro('');
    setPlanDetalleSelec(null); setShowTotalCliente(true);
  };
  const planVolver = () => {
    if (planStep === 2 && tipoUsuarioPlan === 'adjudicado') setPlanStep(0);
    else if (planStep === 6 && !planDetalleSelec) setPlanStep(0);
    else if (planStep === 6 && planDetalleSelec) setPlanDetalleSelec(null);
    else setPlanStep(Math.max(0, planStep - 1));
  };

  // Crédito - enviar por WhatsApp
  const enviarCredito = () => {
    const f = creditoForm;
    const msg = `💳 *SOLICITUD DE CRÉDITO AUTOMOTOR*%0A%0A` +
      `👤 *DATOS PERSONALES*%0ANombre: ${f.nombre}%0ADNI: ${f.dni}%0ADomicilio: ${f.domicilio}%0ALocalidad: ${f.localidad}%0ATel: ${f.telefono}%0AEmail: ${f.email}%0AFecha Nac: ${f.fechaNac}%0AEstado Civil: ${f.estadoCivil}%0A` +
      (f.estadoCivil === 'Casado/a' ? `Cónyuge: ${f.conyuge}%0ACUIL Cónyuge: ${f.cuilConyuge}%0A` : '') +
      `%0A💼 *DATOS LABORALES*%0AEmpleador: ${f.empleador}%0ACargo: ${f.cargo}%0AAntigüedad: ${f.antiguedad}%0AIngreso Neto: $${f.ingresoNeto}%0A` +
      `%0A💳 *TARJETAS:* ${f.tieneTarjetas ? f.tarjetas.join(', ') : 'No posee'}%0A` +
      `%0A🚗 *VEHÍCULO DE INTERÉS:* ${f.vehiculoInteres}%0AUrgencia: ${f.urgencia}%0A` +
      (f.entregaUsado ? `%0A🔄 *ENTREGA USADO*%0A${f.marcaUsado} ${f.modeloUsado} ${f.anioUsado}%0AKm: ${f.kmUsado}%0APatente: ${f.patenteUsado}%0A` : '') +
      (f.comentarios ? `%0A📝 *Comentarios:* ${f.comentarios}` : '');
    window.open(`https://wa.me/5492964487924?text=${msg}`, '_blank');
    setCreditoEnviado(true);
  };

  const resetCredito = () => {
    setCreditoStep(0);
    setCreditoForm({ nombre:'',domicilio:'',localidad:'Ushuaia',telefono:'',email:'',dni:'',fechaNac:'',estadoCivil:'',conyuge:'',cuilConyuge:'',empleador:'',cargo:'',antiguedad:'',ingresoNeto:'',tieneTarjetas:false,tarjetas:[],otroBanco:'',vehiculoInteres:'',urgencia:'normal',entregaUsado:false,marcaUsado:'',modeloUsado:'',anioUsado:'',kmUsado:'',patenteUsado:'',comentarios:'' });
    setCreditoEnviado(false);
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
                { icon: '📋', title: 'Plan Ahorro', id: 'simulador', color: 'from-green-500 to-green-600' },
                { icon: '💳', title: 'Crédito', id: 'credito', color: 'from-violet-500 to-violet-600' },
                { icon: '🔧', title: 'Service', id: 'turnos', color: 'from-amber-500 to-amber-600' },
                { icon: '🛡️', title: 'Siniestros', id: 'siniestros', color: 'from-orange-500 to-orange-600' },
                { icon: '💬', title: 'Atención', id: 'atencion', color: 'from-sky-500 to-sky-600' },
                { icon: '📰', title: 'Novedades', id: 'novedades', color: 'from-purple-500 to-purple-600' },
                { icon: '🔥', title: 'Ofertas', id: 'oportunidades', color: 'from-red-500 to-red-600' },
                { icon: '📍', title: 'Contacto', id: 'contacto', color: 'from-teal-500 to-teal-600' },
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
            <p className="text-white/60 text-xs mb-2">Precios Tierra del Fuego - Abril 2026</p>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mb-3">
              <p className="text-[10px] text-amber-200 leading-tight">
                ⚠️ Precios orientativos sujetos a modificación sin previo aviso. La cotización final se confirma al momento de la operación. No constituye oferta vinculante.{' '}
                <button onClick={() => setSeccion('legal')} className="underline font-bold">Ver términos</button>
              </p>
            </div>
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
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mb-3">
              <p className="text-[10px] text-amber-200 leading-tight">
                ⚠️ Precios y stock sujetos a modificación. Oferta válida hasta agotar existencias.{' '}
                <button onClick={() => setSeccion('legal')} className="underline font-bold">Ver términos</button>
              </p>
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

        {/* ========== PLAN DE AHORRO MEJORADO - MULTI STEP ========== */}
        {seccion === 'simulador' && (
          <div>
            {planStep === 0 && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2 mb-3">
                <p className="text-[10px] text-amber-200 leading-tight">
                  ⚠️ Valores Comercial FIAT Plan abril 2026. Sujetos a actualización mensual por FCA Compañía Financiera S.A.{' '}
                  <button onClick={() => setSeccion('legal')} className="underline font-bold">Ver términos</button>
                </p>
              </div>
            )}
            {/* Barra de navegación interna */}
            {planStep > 0 && (
              <div className="flex items-center justify-between mb-4">
                <button onClick={planVolver} className="text-sm text-white/60 flex items-center gap-1">← Volver</button>
                {planStep !== 6 && (
                  <div className="flex gap-1">
                    {[0,1,2,3,4].map(i => (
                      <div key={i} className={`w-6 h-1.5 rounded-full ${i <= planStep ? 'bg-red-500' : 'bg-white/20'}`} />
                    ))}
                  </div>
                )}
                {planStep === 6 && (
                  <span className="text-[10px] text-white/50 bg-white/10 px-2 py-1 rounded">📊 Simulador</span>
                )}
                <button onClick={resetPlan} className="text-[10px] text-white/40 px-2 py-1 bg-white/5 rounded">Reiniciar</button>
              </div>
            )}

            {/* STEP 0: Tipo de usuario + sucursal */}
            {planStep === 0 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-center relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="relative">
                    <div className="text-3xl mb-2">📋</div>
                    <h2 className="text-xl font-bold mb-1">FIAT Plan de Ahorro</h2>
                    <p className="text-sm opacity-80">Sobrepauta Abril 2026</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">¿Cuál es tu situación?</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'suscriptor', icon: '📝', titulo: 'Soy Suscriptor', desc: 'Ya tengo un plan activo y quiero ver opciones de licitación y cambio de modelo' },
                      { id: 'adjudicado', icon: '🎉', titulo: 'Estoy Adjudicado', desc: 'Ya me adjudicaron y necesito elegir modelo para retirar' },
                      { id: 'nuevo', icon: '🆕', titulo: 'Quiero Suscribirme', desc: 'Quiero conocer los planes disponibles y suscribirme' },
                    ].map(tipo => (
                      <button key={tipo.id} onClick={() => setTipoUsuarioPlan(tipo.id)}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 ${tipoUsuarioPlan === tipo.id ? 'bg-red-500/20 border-red-500 scale-[1.01]' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{tipo.icon}</span>
                          <div>
                            <div className="font-bold text-sm">{tipo.titulo}</div>
                            <div className="text-[10px] text-white/50 mt-0.5">{tipo.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-sm mb-3">📍 Sucursal</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Ushuaia', 'Río Grande'].map(s => (
                      <button key={s} onClick={() => setPlanSucursal(s)}
                        className={`p-3 rounded-lg font-bold text-sm transition-all ${planSucursal === s ? 'bg-red-600' : 'bg-white/5 border border-white/20'}`}>
                        {s === 'Ushuaia' ? '🏔️' : '🏭'} {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => { if (tipoUsuarioPlan) setPlanStep(tipoUsuarioPlan === 'suscriptor' ? 1 : tipoUsuarioPlan === 'nuevo' ? 6 : 2); }}
                  disabled={!tipoUsuarioPlan}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${tipoUsuarioPlan ? 'bg-gradient-to-r from-red-600 to-red-700 active:scale-95' : 'bg-white/20 text-white/50'}`}>
                  Comenzar →
                </button>
              </div>
            )}

            {/* STEP 1: Pitch Licitación (solo suscriptores) */}
            {planStep === 1 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-900/40 to-amber-700/20 rounded-xl p-5 border border-amber-500/30">
                  <div className="text-3xl mb-2">🏆</div>
                  <h3 className="text-lg font-bold mb-2">¿Por qué licitar?</h3>
                  <div className="space-y-3 text-sm text-white/80">
                    <p>La <strong className="text-amber-400">licitación</strong> te permite adelantar la adjudicación ofreciendo un porcentaje sobre el valor móvil.</p>
                    <div className="bg-black/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Elegís el monto que ofrecés</div>
                      <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Podés ganar la adjudicación este mes</div>
                      <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Retirás tu 0KM en semanas, no meses</div>
                      <div className="flex items-center gap-2"><span className="text-green-400">✓</span> Accedés al cambio de modelo</div>
                    </div>
                    <p className="text-amber-300 text-xs">💡 Mínimo de licitación según plan: entre 30% y 40% del valor móvil.</p>
                  </div>
                </div>
                <button onClick={() => setPlanStep(2)} className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 active:scale-95 transition-all">
                  Ver Planes Disponibles →
                </button>
              </div>
            )}

            {/* STEP 2: Selector de Plan */}
            {planStep === 2 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold">Elegí tu Plan</h2>
                <p className="text-white/60 text-xs mb-2">Precios sobrepauta Abril 2026</p>
                {/* Filtro por familia */}
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3">
                  {['Todos','Cronos','Argo','Pulse','Strada','Toro','Fastback','Titano','Mobi','Fiorino'].map(f => (
                    <button key={f} onClick={() => setPlanFiltro(f === 'Todos' ? '' : f.toLowerCase())}
                      className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${(f === 'Todos' && !planFiltro) || planFiltro === f.toLowerCase() ? 'bg-red-600' : 'bg-white/10'}`}>{f}</button>
                  ))}
                </div>
                {planesAbril.filter(p => !planFiltro || p.familia === planFiltro).map(plan => (
                  <button key={plan.id} onClick={() => { setPlanSelecAbril(plan); setPlanExpandido(null); setPlanStep(3); }}
                    className="w-full bg-white/5 rounded-xl p-4 border border-white/10 text-left active:scale-[0.98] transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{plan.emoji}</span>
                        <div>
                          <h3 className="font-bold text-sm">{plan.base}</h3>
                          <span className="text-[10px] text-white/50">{plan.condicion}</span>
                        </div>
                      </div>
                      <span className="bg-red-600 px-2 py-1 rounded text-[10px] font-bold">{plan.tipoPlan}</span>
                    </div>
                    <p className="text-[10px] text-white/50 mb-2">{plan.descripcion}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-black/20 rounded-lg p-2"><p className="text-[8px] text-white/40">Valor Móvil</p><p className="text-xs font-bold text-green-400">{formatPrecio(plan.precio)}</p></div>
                      <div className="bg-black/20 rounded-lg p-2"><p className="text-[8px] text-white/40">Entrega Mín</p><p className="text-xs font-bold">{formatPrecio(plan.entregaMin)}</p></div>
                      <div className="bg-black/20 rounded-lg p-2"><p className="text-[8px] text-white/40">Gastos</p><p className="text-xs font-bold">{formatPrecio(plan.gastos)}</p></div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 flex-wrap">
                      <span className="text-[9px] text-white/40">Adjudicación cuotas:</span>
                      {plan.adjCuotas.map(c => <span key={c} className="bg-blue-500/30 px-1.5 py-0.5 rounded text-[9px]">{c}</span>)}
                      <span className="text-[9px] text-white/40 ml-1">+ {plan.pctEntrega}%</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3: Explorador de Modelos */}
            {planStep === 3 && planSelecAbril && (
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl p-4">
                  <h2 className="font-bold">{planSelecAbril.base} — {planSelecAbril.tipoPlan}</h2>
                  <p className="text-xs opacity-70">Valor móvil: {formatPrecio(planSelecAbril.precio)}</p>
                  <p className="text-[10px] opacity-50 mt-1">{planSelecAbril.restriccion}</p>
                </div>
                <h3 className="font-bold text-sm">Modelos disponibles para tu plan:</h3>
                {obtenerModelosParaPlan(planSelecAbril).map((modelo, idx) => (
                  <div key={idx} className={`bg-white/5 rounded-xl border overflow-hidden transition-all ${planExpandido === idx ? 'border-red-500/50' : 'border-white/10'}`}>
                    <button onClick={() => setPlanExpandido(planExpandido === idx ? null : idx)}
                      className="w-full p-4 text-left">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm">{modelo.nombre}</h4>
                            {modelo.esCambioUniversal && <span className="bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded text-[8px]">CAMBIO</span>}
                            {modelo.especial && <span className="bg-green-500/30 text-green-300 px-1.5 py-0.5 rounded text-[8px]">ESPECIAL</span>}
                          </div>
                          <div className="flex gap-1 mt-1">
                            <span className="text-[10px] text-white/50">PDA: {modelo.pda}</span>
                            <span className="text-[10px] text-white/30">|</span>
                            <span className="text-[10px] text-white/50">{modelo.motor}</span>
                          </div>
                        </div>
                        <span className="text-white/40">{planExpandido === idx ? '▲' : '▼'}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {modelo.colores.slice(0, 6).map(c => <ColorDot key={c} colorId={c} size={14} />)}
                      </div>
                    </button>
                    {planExpandido === idx && (
                      <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-black/20 rounded-lg p-2"><span className="text-white/40 text-[10px]">Motor</span><p className="font-bold">{modelo.motor}</p></div>
                          <div className="bg-black/20 rounded-lg p-2"><span className="text-white/40 text-[10px]">Caja</span><p className="font-bold">{modelo.caja}</p></div>
                        </div>
                        {modelo.nota && <p className="text-[10px] text-amber-300 bg-amber-500/10 rounded-lg p-2">ℹ️ {modelo.nota}</p>}
                        <div>
                          <p className="text-[10px] text-white/50 mb-2">Colores disponibles:</p>
                          <div className="flex flex-wrap gap-2">
                            {modelo.colores.map(c => <ColorDot key={c} colorId={c} size={18} showName />)}
                          </div>
                        </div>
                        <button onClick={() => { setModeloSelec(modelo); setPlanStep(4); }}
                          className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-xl font-bold text-sm active:scale-95 transition-all">
                          ✅ Elegir este modelo
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <button onClick={() => setPlanStep(4)} className="w-full py-3 bg-white/10 rounded-xl text-sm text-white/60">
                  Saltar a documentación →
                </button>
              </div>
            )}

            {/* STEP 4: Documentación */}
            {planStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold">📋 Documentación Requerida</h2>
                <p className="text-xs text-white/60">Marcá lo que ya tenés listo</p>
                <div className="space-y-2">
                  {DOCUMENTACION_PLAN.map(doc => (
                    <button key={doc.id} onClick={() => setDocChecks({...docChecks, [doc.id]: !docChecks[doc.id]})}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${docChecks[doc.id] ? 'bg-green-500/20 border-green-500/40' : 'bg-white/5 border-white/10'}`}>
                      <span className="text-lg">{docChecks[doc.id] ? '✅' : doc.icono}</span>
                      <span className={`text-sm text-left ${docChecks[doc.id] ? 'line-through text-white/40' : ''}`}>{doc.texto}</span>
                    </button>
                  ))}
                </div>
                <div className="bg-blue-500/20 rounded-xl p-3 border border-blue-500/30">
                  <p className="text-xs"><strong>Progreso:</strong> {Object.values(docChecks).filter(Boolean).length}/{DOCUMENTACION_PLAN.length} documentos listos</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div className="bg-green-500 rounded-full h-2 transition-all" style={{width: `${(Object.values(docChecks).filter(Boolean).length / DOCUMENTACION_PLAN.length) * 100}%`}} />
                  </div>
                </div>
                <button onClick={() => setPlanStep(5)} className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-green-600 to-green-700 active:scale-95 transition-all">
                  Contactar Asesor →
                </button>
              </div>
            )}

            {/* STEP 5: Contacto */}
            {planStep === 5 && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-5 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h2 className="text-xl font-bold">¡Último paso!</h2>
                  <p className="text-sm opacity-80">Contactá a tu asesor para avanzar</p>
                </div>
                {/* Resumen */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2 text-sm">
                  <h3 className="font-bold">📝 Resumen</h3>
                  {tipoUsuarioPlan && <p className="text-white/60">Tipo: <span className="text-white font-medium capitalize">{tipoUsuarioPlan}</span></p>}
                  {planSelecAbril && <p className="text-white/60">Plan: <span className="text-white font-medium">{planSelecAbril.base} {planSelecAbril.tipoPlan}</span></p>}
                  {modeloSelec && <p className="text-white/60">Modelo: <span className="text-white font-medium">{modeloSelec.nombre} ({modeloSelec.pda})</span></p>}
                  <p className="text-white/60">Sucursal: <span className="text-white font-medium">{planSucursal}</span></p>
                  <p className="text-white/60">Docs listos: <span className="text-white font-medium">{Object.values(docChecks).filter(Boolean).length}/{DOCUMENTACION_PLAN.length}</span></p>
                </div>
                {/* WhatsApp */}
                <a href={`https://wa.me/5492964465270?text=${encodeURIComponent(
                  `📋 *CONSULTA FIAT PLAN*\n\nSoy ${tipoUsuarioPlan || 'interesado'}.\n${planSelecAbril ? `Plan: ${planSelecAbril.base} ${planSelecAbril.tipoPlan} (${planSelecAbril.condicion})` : ''}\n${modeloSelec ? `Modelo: ${modeloSelec.nombre} (PDA: ${modeloSelec.pda})` : ''}\nSucursal: ${planSucursal}\nDocs listos: ${Object.values(docChecks).filter(Boolean).length}/${DOCUMENTACION_PLAN.length}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-green-600 rounded-xl font-bold text-lg active:scale-95 transition-all">
                  💬 WhatsApp {planSucursal}
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a href="tel:+5492964465270" className="py-3 bg-white/10 rounded-xl font-bold text-center text-sm">📞 Llamar</a>
                  <a href="mailto:planes@lasac.com.ar" className="py-3 bg-white/10 rounded-xl font-bold text-center text-sm">✉️ Email</a>
                </div>
                <div className="text-center">
                  <button onClick={resetPlan} className="text-xs text-white/40 underline">Reiniciar consulta</button>
                </div>
              </div>
            )}

            {/* STEP 6: Simulador Detallado (Quiero Suscribirme) */}
            {planStep === 6 && (
              <div className="space-y-3">
                {!planDetalleSelec ? (
                  <>
                    <h2 className="text-lg font-bold">📊 Simulador de Cuotas</h2>
                    <p className="text-white/60 text-xs mb-2">FIAT Plan — Vigencia Marzo 2026 · Valores s/IVA (TDF)</p>
                    <p className="text-sm text-white/70 mb-2">Seleccioná un plan para ver el detalle completo:</p>
                    {planesDetalle.map(plan => (
                      <div key={plan.id} onClick={() => setPlanDetalleSelec(plan)} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 active:scale-[0.98] transition-all">
                        <AutoImagen modelo={plan.modelo} className="w-full h-32" contain />
                        <div className="p-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-sm">{plan.nombre}</h3>
                            <span className="bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{plan.codigo}</span>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="bg-blue-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.plan}</span>
                            <span className="bg-green-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.condicion}</span>
                            <span className="bg-purple-500/30 px-1.5 py-0.5 rounded text-[10px]">{plan.tipo}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-green-400 font-bold">Suscripción: {formatPrecio(plan.suscripcion)}</p>
                            <p className="text-[10px] text-white/40">VM: {formatPrecio(plan.valorMovil)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
                      <AutoImagen modelo={planDetalleSelec.modelo} className="w-full h-44" contain />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg">{planDetalleSelec.nombre}</h3>
                          <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold">{planDetalleSelec.codigo}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Plan</p><p className="font-bold text-sm">{planDetalleSelec.plan}</p></div>
                          <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Condición</p><p className="font-bold text-sm">{planDetalleSelec.condicion}</p></div>
                          <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Valor Móvil (s/IVA)</p><p className="font-bold text-green-400 text-sm">{formatPrecio(planDetalleSelec.valorMovil)}</p></div>
                          <div className="bg-black/20 rounded-lg p-2"><p className="text-[10px] text-white/50">Precio Lista</p><p className="font-bold text-sm">{formatPrecio(planDetalleSelec.precioLista)}</p></div>
                        </div>

                        {/* Suscripción destacada */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 mb-4">
                          <p className="text-xs opacity-80">CUOTA SUSCRIPCIÓN Nro 1</p>
                          <p className="text-2xl font-bold">{formatPrecio(planDetalleSelec.suscripcion)}</p>
                        </div>

                        {/* Toggle cuota s/IVA vs Total Cliente */}
                        <div className="flex bg-black/30 rounded-lg p-1 mb-3">
                          <button onClick={() => setShowTotalCliente(false)}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${!showTotalCliente ? 'bg-white/20 text-white' : 'text-white/50'}`}>
                            Cuota s/IVA
                          </button>
                          <button onClick={() => setShowTotalCliente(true)}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${showTotalCliente ? 'bg-red-600 text-white' : 'text-white/50'}`}>
                            ★ Total Cliente
                          </button>
                        </div>

                        {/* Tabla de cuotas */}
                        <div className="bg-black/20 rounded-xl p-3 mb-4">
                          <h4 className="font-bold text-sm mb-3">
                            {showTotalCliente ? '★ Total lo que paga el cliente (Cuota + Sellado TDF)' : '📋 Cuotas s/IVA (sin sellado)'}
                          </h4>
                          <div className="space-y-1">
                            {(showTotalCliente ? planDetalleSelec.totalCliente : planDetalleSelec.cuotas).map((c, i) => (
                              <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                                <span className="text-xs text-white/70">{c.rango}</span>
                                <span className={`font-bold text-sm ${showTotalCliente ? 'text-amber-300' : ''}`}>{formatPrecio(c.valor)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sellado TDF info */}
                        <div className="bg-amber-500/10 rounded-xl p-3 mb-4 border border-amber-500/20">
                          <p className="text-xs font-bold text-amber-300 mb-1">✚ Sellado TDF</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-white/60">Total sellado:</span>
                            <span className="font-bold">{formatPrecio(planDetalleSelec.selladoTDF)}</span>
                          </div>
                          <div className="flex justify-between text-xs mt-1">
                            <span className="text-white/60">Prorrateado en {planDetalleSelec.selladoCuotas}:</span>
                            <span className="font-bold">{formatPrecio(planDetalleSelec.selladoPorCuota)}/cuota</span>
                          </div>
                        </div>

                        {/* Condiciones */}
                        <div className="space-y-2 text-xs">
                          <div className="bg-blue-500/20 rounded-lg p-3"><p className="text-white/60">🏆 Adjudicación</p><p className="font-bold">{planDetalleSelec.adjudicacion}</p></div>
                          <div className="bg-purple-500/20 rounded-lg p-3"><p className="text-white/60">📊 Diferimientos</p><p className="font-bold">{planDetalleSelec.diferimientos}</p></div>
                          {planDetalleSelec.subite && <div className="bg-green-500/20 rounded-lg p-3"><p className="font-bold">✅ Opción SUBITE disponible</p></div>}
                        </div>

                        {/* Contactar */}
                        <button onClick={() => {
                          const msg = `📋 *QUIERO SUSCRIBIRME - FIAT PLAN*%0A%0AModelo: *${planDetalleSelec.nombre}*%0ACódigo: ${planDetalleSelec.codigo}%0APlan: ${planDetalleSelec.plan} (${planDetalleSelec.condicion})%0ASuscripción: ${formatPrecio(planDetalleSelec.suscripcion)}%0AValor Móvil: ${formatPrecio(planDetalleSelec.valorMovil)}%0ASucursal: ${planSucursal}`;
                          window.open(`https://wa.me/5492964465270?text=${msg}`, '_blank');
                        }} className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-xl font-bold flex items-center justify-center gap-2">
                          💬 Quiero este Plan
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                // Siniestros van a Calidad/Reclamos
                window.open(`https://wa.me/5492964610900?text=${msg}`, '_blank');
              }} className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-orange-600 to-orange-700 active:scale-95 transition-all">
                📱 Enviar Solicitud por WhatsApp
              </button>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-2">¿Necesitás ayuda urgente?</p>
                <a href="tel:+5492964610900" className="inline-block px-4 py-2 bg-green-600 rounded-full text-sm font-bold">📞 Llamar ahora</a>
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

        {/* ========== CRÉDITO AUTOMOTOR ========== */}
        {seccion === 'credito' && (
          <div>
            <h2 className="text-xl font-bold mb-1">💳 Solicitud de Crédito</h2>
            <p className="text-white/60 text-xs mb-4">Completá tus datos para pre-aprobación</p>

            {creditoEnviado ? (
              <div className="text-center py-8 space-y-4">
                <div className="bg-green-500/20 rounded-2xl p-8 border border-green-500/30">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="text-xl font-bold mb-2">¡Solicitud Enviada!</h3>
                  <p className="text-sm text-white/70 mb-4">Te contactamos en 24hs con tu oferta personalizada.</p>
                  <button onClick={resetCredito} className="px-6 py-3 bg-white/10 rounded-xl font-bold text-sm">Nueva Solicitud</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Step indicator */}
                <div className="flex gap-1 mb-2">
                  {['Datos', 'Laboral', 'Vehículo', 'Enviar'].map((s, i) => (
                    <button key={s} onClick={() => setCreditoStep(i)}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${creditoStep === i ? 'bg-red-600' : creditoStep > i ? 'bg-green-600/50' : 'bg-white/10 text-white/40'}`}>{s}</button>
                  ))}
                </div>

                {/* Step 0: Datos Personales */}
                {creditoStep === 0 && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                      <h3 className="font-bold text-sm mb-2">👤 Datos Personales</h3>
                      <input placeholder="Nombre completo *" value={creditoForm.nombre} onChange={e => setCreditoForm({...creditoForm, nombre: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <input placeholder="DNI *" value={creditoForm.dni} onChange={e => setCreditoForm({...creditoForm, dni: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <input placeholder="Domicilio *" value={creditoForm.domicilio} onChange={e => setCreditoForm({...creditoForm, domicilio: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <div className="grid grid-cols-2 gap-2">
                        <select value={creditoForm.localidad} onChange={e => setCreditoForm({...creditoForm, localidad: e.target.value})} className="p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
                          <option value="Ushuaia">Ushuaia</option>
                          <option value="Río Grande">Río Grande</option>
                          <option value="Tolhuin">Tolhuin</option>
                          <option value="Otra">Otra</option>
                        </select>
                        <input placeholder="Fecha Nac. *" type="date" value={creditoForm.fechaNac} onChange={e => setCreditoForm({...creditoForm, fechaNac: e.target.value})} className="p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm" />
                      </div>
                      <input placeholder="Teléfono *" type="tel" value={creditoForm.telefono} onChange={e => setCreditoForm({...creditoForm, telefono: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <input placeholder="Email *" type="email" value={creditoForm.email} onChange={e => setCreditoForm({...creditoForm, email: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3">💍 Estado Civil</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'].map(ec => (
                          <button key={ec} onClick={() => setCreditoForm({...creditoForm, estadoCivil: ec})}
                            className={`p-2.5 rounded-lg text-xs font-medium transition-all ${creditoForm.estadoCivil === ec ? 'bg-red-600' : 'bg-white/5 border border-white/20'}`}>{ec}</button>
                        ))}
                      </div>
                      {creditoForm.estadoCivil === 'Casado/a' && (
                        <div className="mt-3 space-y-2">
                          <input placeholder="Nombre cónyuge *" value={creditoForm.conyuge} onChange={e => setCreditoForm({...creditoForm, conyuge: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                          <input placeholder="CUIL cónyuge" value={creditoForm.cuilConyuge} onChange={e => setCreditoForm({...creditoForm, cuilConyuge: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                        </div>
                      )}
                    </div>
                    <button onClick={() => setCreditoStep(1)} disabled={!creditoForm.nombre || !creditoForm.dni || !creditoForm.telefono}
                      className={`w-full py-3 rounded-xl font-bold text-sm ${creditoForm.nombre && creditoForm.dni && creditoForm.telefono ? 'bg-gradient-to-r from-red-600 to-red-700 active:scale-95' : 'bg-white/20 text-white/50'}`}>
                      Siguiente: Datos Laborales →
                    </button>
                  </div>
                )}

                {/* Step 1: Datos Laborales */}
                {creditoStep === 1 && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                      <h3 className="font-bold text-sm mb-2">💼 Datos Laborales</h3>
                      <input placeholder="Empleador / Empresa *" value={creditoForm.empleador} onChange={e => setCreditoForm({...creditoForm, empleador: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Cargo" value={creditoForm.cargo} onChange={e => setCreditoForm({...creditoForm, cargo: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                        <input placeholder="Antigüedad" value={creditoForm.antiguedad} onChange={e => setCreditoForm({...creditoForm, antiguedad: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                      </div>
                      <input placeholder="Ingreso neto mensual ($) *" type="number" value={creditoForm.ingresoNeto} onChange={e => setCreditoForm({...creditoForm, ingresoNeto: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-sm">💳 ¿Tenés tarjetas de crédito?</h3>
                        <button onClick={() => setCreditoForm({...creditoForm, tieneTarjetas: !creditoForm.tieneTarjetas})}
                          className={`w-12 h-6 rounded-full transition-all ${creditoForm.tieneTarjetas ? 'bg-green-500' : 'bg-white/20'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full transition-all ${creditoForm.tieneTarjetas ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      {creditoForm.tieneTarjetas && (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            {['Visa', 'Mastercard', 'Amex', 'Naranja X', 'Cabal', 'Otra'].map(t => (
                              <button key={t} onClick={() => {
                                const tarjetas = creditoForm.tarjetas.includes(t) ? creditoForm.tarjetas.filter(x => x !== t) : [...creditoForm.tarjetas, t];
                                setCreditoForm({...creditoForm, tarjetas});
                              }} className={`p-2 rounded-lg text-xs ${creditoForm.tarjetas.includes(t) ? 'bg-blue-600' : 'bg-white/5 border border-white/20'}`}>{t}</button>
                            ))}
                          </div>
                          <input placeholder="Banco emisor (opcional)" value={creditoForm.otroBanco} onChange={e => setCreditoForm({...creditoForm, otroBanco: e.target.value})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCreditoStep(0)} className="flex-1 py-3 bg-white/10 rounded-xl font-bold text-sm">← Anterior</button>
                      <button onClick={() => setCreditoStep(2)} disabled={!creditoForm.empleador || !creditoForm.ingresoNeto}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm ${creditoForm.empleador && creditoForm.ingresoNeto ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-white/20 text-white/50'}`}>
                        Siguiente →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Vehículo */}
                {creditoStep === 2 && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                      <h3 className="font-bold text-sm mb-2">🚗 Vehículo de Interés</h3>
                      <select value={creditoForm.vehiculoInteres} onChange={e => setCreditoForm({...creditoForm, vehiculoInteres: e.target.value})} className="w-full p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
                        <option value="">Seleccioná un modelo *</option>
                        {catalogo.map(v => <option key={v.id} value={v.nombre}>{v.nombre} — {formatPrecio(v.precio)}</option>)}
                      </select>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3">⏰ Urgencia</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {[{id:'alta',label:'🔥 Urgente',desc:'Esta semana'},{id:'normal',label:'📅 Normal',desc:'Este mes'},{id:'baja',label:'🕐 Sin apuro',desc:'Explorando'}].map(u => (
                          <button key={u.id} onClick={() => setCreditoForm({...creditoForm, urgencia: u.id})}
                            className={`p-2 rounded-lg text-center transition-all ${creditoForm.urgencia === u.id ? 'bg-red-600' : 'bg-white/5 border border-white/20'}`}>
                            <div className="text-sm">{u.label}</div>
                            <div className="text-[9px] text-white/50 mt-0.5">{u.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-sm">🔄 ¿Entregás un usado?</h3>
                        <button onClick={() => setCreditoForm({...creditoForm, entregaUsado: !creditoForm.entregaUsado})}
                          className={`w-12 h-6 rounded-full transition-all ${creditoForm.entregaUsado ? 'bg-green-500' : 'bg-white/20'}`}>
                          <div className={`w-5 h-5 bg-white rounded-full transition-all ${creditoForm.entregaUsado ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                      {creditoForm.entregaUsado && (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <input placeholder="Marca *" value={creditoForm.marcaUsado} onChange={e => setCreditoForm({...creditoForm, marcaUsado: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                            <input placeholder="Modelo *" value={creditoForm.modeloUsado} onChange={e => setCreditoForm({...creditoForm, modeloUsado: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                            <input placeholder="Año" value={creditoForm.anioUsado} onChange={e => setCreditoForm({...creditoForm, anioUsado: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                            <input placeholder="Km" value={creditoForm.kmUsado} onChange={e => setCreditoForm({...creditoForm, kmUsado: e.target.value})} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                          </div>
                          <input placeholder="Patente" value={creditoForm.patenteUsado} onChange={e => setCreditoForm({...creditoForm, patenteUsado: e.target.value.toUpperCase()})} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
                        </div>
                      )}
                    </div>
                    <textarea placeholder="Comentarios adicionales (opcional)" value={creditoForm.comentarios} onChange={e => setCreditoForm({...creditoForm, comentarios: e.target.value})} rows={3} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm resize-none" />
                    <div className="flex gap-2">
                      <button onClick={() => setCreditoStep(1)} className="flex-1 py-3 bg-white/10 rounded-xl font-bold text-sm">← Anterior</button>
                      <button onClick={() => setCreditoStep(3)} disabled={!creditoForm.vehiculoInteres}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm ${creditoForm.vehiculoInteres ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-white/20 text-white/50'}`}>
                        Revisar →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Resumen y enviar */}
                {creditoStep === 3 && (
                  <div className="space-y-3">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h3 className="font-bold text-sm mb-3">📋 Resumen de Solicitud</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">Nombre</span><span className="font-medium">{creditoForm.nombre}</span></div>
                        <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">DNI</span><span className="font-medium">{creditoForm.dni}</span></div>
                        <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">Teléfono</span><span className="font-medium">{creditoForm.telefono}</span></div>
                        <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">Empleador</span><span className="font-medium">{creditoForm.empleador}</span></div>
                        <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">Ingreso</span><span className="font-medium text-green-400">${Number(creditoForm.ingresoNeto).toLocaleString('es-AR')}</span></div>
                        <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">Vehículo</span><span className="font-medium">{creditoForm.vehiculoInteres}</span></div>
                        {creditoForm.entregaUsado && <div className="flex justify-between py-1.5 border-b border-white/10"><span className="text-white/50">Entrega</span><span className="font-medium">{creditoForm.marcaUsado} {creditoForm.modeloUsado}</span></div>}
                        <div className="flex justify-between py-1.5"><span className="text-white/50">Urgencia</span><span className="font-medium capitalize">{creditoForm.urgencia}</span></div>
                      </div>
                    </div>
                    <div className="bg-amber-500/20 rounded-xl p-3 border border-amber-500/30 text-xs">
                      <p>⚠️ Al enviar, tus datos serán recibidos por el equipo comercial de LASAC para evaluar tu solicitud. Te contactamos en <strong>menos de 24 horas</strong>.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setCreditoStep(2)} className="flex-1 py-3 bg-white/10 rounded-xl font-bold text-sm">← Editar</button>
                      <button onClick={enviarCredito} className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl font-bold text-sm active:scale-95 transition-all">
                        📱 Enviar Solicitud
                      </button>
                    </div>
                  </div>
                )}
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
                { ciudad: 'Ushuaia', icon: '🏔️', sub: 'Fin del Mundo', ventas: 'L. Lugones 1950', service: 'Piedrabuena 256', waVentas: '5492964487924', waService: '5492964465050' },
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
            <div className="text-center mt-4 pb-4">
              <button onClick={() => setSeccion('legal')} className="text-[10px] text-white/40 underline">
                Términos y condiciones
              </button>
            </div>
          </div>
        )}

        {/* ========== LEGAL / TÉRMINOS Y CONDICIONES ========== */}
        {seccion === 'legal' && (
          <div className="space-y-4 pb-8">
            <button onClick={() => setSeccion('contacto')} className="text-sm text-white/60 flex items-center gap-1">
              ← Volver
            </button>

            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">📜 Términos y Condiciones</h2>
              <p className="text-[10px] text-white/50">Última actualización: Abril 2026</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">1. Información sobre precios</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Los precios publicados en esta aplicación corresponden a la <strong>Lista de Precios FIAT N°04/2026</strong> con vigencia desde el 1° de abril de 2026, para la jurisdicción de la Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur.
              </p>
              <p className="text-xs text-white/80 leading-relaxed">
                Los valores son <strong>orientativos</strong> y están sujetos a modificación por parte de FCA Automobiles Argentina S.A. (Terminal) y/o FCA Compañía Financiera S.A. (Plan de Ahorro) sin necesidad de previo aviso. La cotización definitiva, condiciones de financiación y disponibilidad de stock serán <strong>confirmadas al momento de la operación</strong> por el asesor comercial.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">2. Naturaleza no vinculante</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                La información publicada en esta aplicación tiene <strong>carácter meramente informativo</strong> y no constituye oferta vinculante en los términos del <strong>Art. 7° de la Ley N° 24.240 de Defensa del Consumidor</strong>. La aceptación de cualquier operación queda sujeta a la verificación de stock, evaluación crediticia (cuando corresponda) y confirmación expresa por escrito por parte de Liendo Automotores S.A.C. (LASAC).
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">3. Stock y disponibilidad</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Las unidades publicadas en la sección <strong>Oportunidades</strong> están sujetas a disponibilidad de stock y se ofrecen <strong>hasta agotar existencias</strong>. El stock se actualiza periódicamente pero puede no reflejar la existencia real al momento de la consulta. La reserva de una unidad solo se considera efectiva con la firma del boleto de compraventa correspondiente y el pago de la seña.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">4. Plan de Ahorro FIAT</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                El Plan de Ahorro FIAT es un sistema de ahorro previo administrado por <strong>FCA Compañía Financiera S.A.</strong> bajo la modalidad de Círculo Cerrado autorizada por la Inspección General de Justicia (IGJ). Las cuotas, valor móvil, gastos administrativos, sellados, derecho de suscripción y derecho de adjudicación están sujetos a actualización mensual conforme las variaciones del valor móvil del vehículo y normativas vigentes.
              </p>
              <p className="text-xs text-white/80 leading-relaxed">
                La adjudicación se realiza por sorteo o licitación según las condiciones de cada plan. Los gastos de patentamiento, prenda, gestoría, flete y entrega son a cargo del adherente y no están incluidos en el valor de la cuota.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">5. Solicitud de crédito</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                La solicitud de crédito automotor enviada a través de esta aplicación constituye una <strong>preselección</strong> y está sujeta a la evaluación crediticia y aprobación final por parte de la entidad financiera correspondiente. El envío del formulario no implica la aprobación automática del crédito ni compromete a Liendo Automotores S.A.C. a otorgar la financiación solicitada.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">6. Protección de datos personales</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Los datos personales suministrados a través de esta aplicación serán tratados conforme a la <strong>Ley N° 25.326 de Protección de Datos Personales</strong>. Los datos serán utilizados exclusivamente para gestionar consultas, solicitudes de crédito, turnos de service y comunicaciones comerciales relacionadas con productos y servicios de Liendo Automotores S.A.C. El titular de los datos podrá ejercer en cualquier momento los derechos de acceso, rectificación y supresión previstos en la mencionada ley.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">7. Atención de siniestros</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                La gestión de siniestros se realiza en coordinación con la compañía aseguradora del cliente. Los tiempos de gestión, autorización de presupuestos, provisión de repuestos y reparación dependen de las condiciones particulares de cada póliza y de la respuesta de la aseguradora. LASAC actúa como prestador de servicios técnicos y no es responsable por demoras imputables a la compañía de seguros.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">8. Limitación de responsabilidad</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Liendo Automotores S.A.C. realiza sus mejores esfuerzos para mantener actualizada la información publicada en esta aplicación, pero <strong>no garantiza la exactitud, completitud ni vigencia</strong> permanente de los datos. En caso de discrepancia entre la información publicada en la aplicación y la información oficial brindada por la Terminal o Compañía Financiera, prevalecerá esta última. LASAC no será responsable por daños o perjuicios derivados del uso o interpretación errónea de la información publicada.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">9. Modificaciones</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Liendo Automotores S.A.C. se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento, así como la información, productos, servicios y precios publicados, sin necesidad de notificación previa. Las modificaciones serán efectivas desde su publicación en la aplicación.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
              <h3 className="font-bold text-sm text-red-400">10. Jurisdicción</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Para toda controversia que pudiera derivarse del uso de esta aplicación o de las operaciones comerciales con Liendo Automotores S.A.C., serán competentes los <strong>Tribunales Ordinarios de la Ciudad de Ushuaia, Provincia de Tierra del Fuego</strong>, con renuncia expresa a cualquier otro fuero o jurisdicción que pudiera corresponder.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center space-y-2">
              <p className="text-xs font-bold">LIENDO AUTOMOTORES SOCIEDAD ANÓNIMA C.</p>
              <p className="text-[10px] text-white/60">Concesionario Oficial FIAT</p>
              <p className="text-[10px] text-white/60">Tierra del Fuego, Antártida e Islas del Atlántico Sur</p>
              <p className="text-[10px] text-white/60">CUIT: 30-70767846-8</p>
              <p className="text-[10px] text-white/40 mt-2">📧 atencionalcliente@lasac.com.ar</p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
              <p className="text-[10px] text-amber-200 leading-tight">
                ⚠️ Al utilizar esta aplicación, el usuario declara haber leído, comprendido y aceptado los presentes Términos y Condiciones en todos sus términos.
              </p>
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
            { id: 'credito', icon: '💳', label: 'Crédito' },
            { id: 'turnos', icon: '🔧', label: 'Service' },
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
