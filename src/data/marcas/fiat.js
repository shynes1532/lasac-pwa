// ============================================================
// FIAT — Concesionario Oficial (Grupo LASAC)
// Plan de Ahorro actualizado a la Sobrepauta Comercial Agosto 2026 (LASAC).
// ============================================================

// ---------- PLAN DE AHORRO (FIAT Plan) — Sobrepauta Agosto 2026 ----------
// Valores sin IVA. Cuota = Total Cliente (incluye sellado TDF).
const planesDetalle = [
  {
    id: 'mobi-80-20', modelo: 'mobi', nombre: 'MOBI TREKKING 1.0', codigo: 'MB1',
    plan: '80/20', condicion: 'M80', tipo: 'CUOTA VARIABLE', valorMovil: 24966942, suscripcion: 258022,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 303599 }, { rango: 'Cuota 12', valor: 322075 },
      { rango: 'Cuotas 13 a 18', valor: 327377 }, { rango: 'Cuota 19', valor: 351155 },
      { rango: 'Cuotas 20 a 24', valor: 280034 }, { rango: 'Cuotas 25 a 72', valor: 294895 },
      { rango: 'Cuotas 73 a 84', valor: 280034 },
    ],
    adjudicacion: 'Cuotas 4 y 6 + 20% (AE)', diferimientos: 'Cuotas 1 a 12: 20% / Cuotas 13 a 18: 10%', subite: true
  },
  {
    id: 'argo-70-30', modelo: 'argo', nombre: 'ARGO DRIVE 1.3L MT', codigo: 'AR2',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 27305785, suscripcion: 302577,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 387185 }, { rango: 'Cuota 12', valor: 407391 },
      { rango: 'Cuota 13', valor: 387185 }, { rango: 'Cuotas 14 a 84', valor: 270509 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'fiorino-70-30', modelo: 'fiorino', nombre: 'FIORINO ENDURANCE 1.3L', codigo: 'FO1',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 29149321, suscripcion: 300895,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 410169 }, { rango: 'Cuota 12', valor: 431739 },
      { rango: 'Cuota 13', valor: 410169 }, { rango: 'Cuotas 14 a 84', valor: 288773 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'cronos-90-10', modelo: 'cronos', nombre: 'CRONOS DRIVE 1.3L MT5 PACK PLUS', codigo: 'NC1',
    plan: '90/10', condicion: 'B91', tipo: 'CUOTA VARIABLE', valorMovil: 30066116, suscripcion: 349560,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 440642 }, { rango: 'Cuota 12', valor: 462891 },
      { rango: 'Cuota 13', valor: 472856 }, { rango: 'Cuotas 14 a 18', valor: 344386 },
      { rango: 'Cuota 19', valor: 376600 }, { rango: 'Cuotas 20 a 24', valor: 376600 },
      { rango: 'Cuotas 25 a 72', valor: 396733 }, { rango: 'Cuotas 73 a 84', valor: 376600 },
    ],
    adjudicacion: 'Cuotas 3, 6, 9 y 12 + 15% (AE + 5%)', diferimientos: 'Cuotas 1 a 12: 20% / Cuotas 13 a 18: 10%', subite: true
  },
  {
    id: 'pulse-70-30', modelo: 'pulse', nombre: 'PULSE DRIVE 1.3L MT', codigo: 'FP3',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 33818182, suscripcion: 382261,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 479528 }, { rango: 'Cuota 12', valor: 504553 },
      { rango: 'Cuota 13', valor: 479528 }, { rango: 'Cuotas 14 a 84', valor: 335025 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'strada-70-30', modelo: 'strada', nombre: 'STRADA FREEDOM CD', codigo: 'FS1',
    plan: '70/30', condicion: 'B70', tipo: 'SIN DIFERIMIENTOS', valorMovil: 37303167, suscripcion: 385064,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 524904 }, { rango: 'Cuota 12', valor: 552508 },
      { rango: 'Cuota 13', valor: 524904 }, { rango: 'Cuotas 14 a 84', valor: 369550 },
    ],
    adjudicacion: 'Cuotas 6 y 12 + 30% (AE)', diferimientos: 'SIN DIFERIMIENTOS', subite: true
  },
  {
    id: 'fastback-70-30', modelo: 'fastback', nombre: 'FASTBACK TURBO 270 AT6', codigo: 'FT3',
    plan: '70/30', condicion: 'B71', tipo: 'CUOTA VARIABLE', valorMovil: 41768595, suscripcion: 424915,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 557454 }, { rango: 'Cuota 12', valor: 588363 },
      { rango: 'Cuota 13', valor: 592262 }, { rango: 'Cuotas 14 a 18', valor: 413788 },
      { rango: 'Cuotas 19 a 42', valor: 431191 }, { rango: 'Cuotas 43 a 84', valor: 413788 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'Cuotas 1 a 12: 10%', subite: true
  },
  {
    id: 'toro-70-30', modelo: 'toro', nombre: 'TORO FREEDOM T270 AT6 4X2', codigo: 'NT3',
    plan: '70/30', condicion: 'B71', tipo: 'CUOTA VARIABLE', valorMovil: 46977376, suscripcion: 436433,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 621885 }, { rango: 'Cuota 12', valor: 656648 },
      { rango: 'Cuota 13', valor: 661033 }, { rango: 'Cuotas 14 a 18', valor: 465389 },
      { rango: 'Cuotas 19 a 42', valor: 484963 }, { rango: 'Cuotas 43 a 84', valor: 465389 },
    ],
    adjudicacion: 'Cuotas 4, 6 y 12 + 30% (AE)', diferimientos: 'Cuotas 1 a 12: 10%', subite: true
  },
  {
    id: 'titano-70-30', modelo: 'titano', nombre: 'TITANO FREEDOM MT', codigo: 'DT1',
    plan: '70/30', condicion: 'B76', tipo: 'CUOTA VARIABLE', valorMovil: 55131222, suscripcion: 455275,
    cuotas: [
      { rango: 'Cuotas 2 a 11', valor: 607349 }, { rango: 'Cuota 12', valor: 648146 },
      { rango: 'Cuotas 13 a 18', valor: 653291 }, { rango: 'Cuota 19', valor: 699234 },
      { rango: 'Cuotas 20 a 24', valor: 546167 }, { rango: 'Cuotas 25 a 72', valor: 574881 },
      { rango: 'Cuotas 73 a 84', valor: 546167 },
    ],
    adjudicacion: 'Cuotas 2, 4 y 6 + 20% (resto de AE se prorratea)', diferimientos: 'Cuotas 1 a 12: 20% / Cuotas 13 a 18: 10%', subite: true
  },
];

// ---------- CATÁLOGO 0KM ----------
// Lista FIAT N°08/2026 — Vigencia 1° de Agosto 2026 (precio público sugerido c/IVA)
const catalogo = [
  { id: 1, categoria: 'autos', modelo: 'mobi', nombre: 'Mobi Trekking 1.0', precio: 30210000, motor: '1.0 8V', potencia: '75 CV', caja: 'Manual 5V' },
  { id: 2, categoria: 'autos', modelo: 'argo', nombre: 'Argo Drive 1.3L MT', precio: 33040000, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 3, categoria: 'autos', modelo: 'argo', nombre: 'Argo Drive 1.3L CVT', precio: 35140000, motor: '1.3 Firefly', potencia: '99 CV', caja: 'CVT' },
  { id: 4, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Like 1.3 GSE', precio: 34010000, motor: '1.3 GSE', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 5, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Drive 1.3 MT Pack Plus', precio: 36380000, motor: '1.3 GSE', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 6, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Drive 1.3 CVT Pack Plus', precio: 41540000, motor: '1.3 GSE', potencia: '99 CV', caja: 'CVT' },
  { id: 7, categoria: 'autos', modelo: 'cronos', nombre: 'Cronos Precision 1.3 CVT', precio: 42170000, motor: '1.3 GSE', potencia: '99 CV', caja: 'CVT' },
  { id: 8, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Drive 1.3 MT5', precio: 40920000, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 9, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Drive 1.3 CVT', precio: 41500000, motor: '1.3 Firefly', potencia: '99 CV', caja: 'CVT' },
  { id: 10, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Audace 1.0T CVT', precio: 44390000, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 11, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Impetus 1.0T CVT', precio: 45930000, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 12, categoria: 'suv', modelo: 'pulse', nombre: 'Pulse Abarth Turbo 270 AT6', precio: 48170000, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 13, categoria: 'suv', modelo: 'fastback', nombre: 'Fastback Turbo 270 AT', precio: 50540000, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 14, categoria: 'suv', modelo: 'fastback', nombre: 'Fastback Abarth Turbo 270 AT6', precio: 53490000, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 15, categoria: 'suv', modelo: 'fiat600', nombre: 'Fiat 600 Hybrid 1.2 eDCT', precio: 49340000, motor: '1.2 Hybrid', potencia: '145 CV', caja: 'eDCT' },
  { id: 16, categoria: 'utilitarios', modelo: 'fiorino', nombre: 'Fiorino Endurance 1.3 Firefly', precio: 32210000, motor: '1.3 Firefly', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 17, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Freedom C/S 1.3 MT', precio: 35570000, motor: '1.3 8V', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 18, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Freedom 1.3 8V CD', precio: 41220000, motor: '1.3 8V', potencia: '99 CV', caja: 'Manual 5V' },
  { id: 19, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Volcano 1.3 8V CD CVT', precio: 45320000, motor: '1.3 8V', potencia: '99 CV', caja: 'CVT' },
  { id: 20, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Ranch T200 CD CVT', precio: 49000000, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 21, categoria: 'pickups', modelo: 'strada', nombre: 'Strada Ultra T200 CD CVT', precio: 49140000, motor: '1.0 Turbo', potencia: '130 CV', caja: 'CVT' },
  { id: 22, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Freedom 1.3T AT6 4X2', precio: 51910000, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 23, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Volcano 1.3T AT6 4X2', precio: 57110000, motor: '1.3 Turbo', potencia: '185 CV', caja: 'AT6' },
  { id: 24, categoria: 'pickups', modelo: 'toro', nombre: 'Toro Volcano 2.2TD AT9 4X4', precio: 61550000, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT9' },
  { id: 25, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Endurance MT 4X2', precio: 52270000, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 26, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Endurance MT 4X4', precio: 55320000, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 27, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Freedom MT 4X4', precio: 60920000, motor: '2.2 Diesel', potencia: '200 CV', caja: 'Manual 6V' },
  { id: 28, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Freedom Plus AT 4X4', precio: 66890000, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT8' },
  { id: 29, categoria: 'pickups', modelo: 'titano', nombre: 'Titano Ranch AT 4X4', precio: 72220000, motor: '2.2 Diesel', potencia: '200 CV', caja: 'AT8' },
];

// ---------- STOCK OPORTUNIDAD ----------
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

// ---------- NOVEDADES ----------
const novedades = [
  { id: 9, fecha: '08 Ago 2026', titulo: '🎉 Ahora somos Grupo LASAC', descripcion: 'Crecimos para estar más cerca tuyo. LASAC ahora es Grupo LASAC: una sola gran familia que reúne a FIAT, JAC Motors, Forthing y Dongfeng bajo un mismo techo. Más marcas, más modelos y la misma atención de siempre en Ushuaia y Río Grande. ¡Bienvenido a Grupo LASAC! 🇦🇷', imagen: 'grupo-lasac', destacado: true },
  { id: 1, fecha: '07 Mar 2026', titulo: '📋 Cambio de Modelo Abril 2026', descripcion: 'Ya disponible la nueva sobrepauta con todos los modelos actualizados. Cronos, Argo, Pulse, Strada y más. Consultá el simulador.', imagen: 'cronos', destacado: true },
  { id: 2, fecha: '04 Mar 2026', titulo: '💳 Nuevo: Solicitud de Crédito Online', descripcion: 'Ahora podés solicitar tu crédito automotor directamente desde la app. Completá el formulario y te contactamos en 24hs.', imagen: 'pulse', destacado: true },
  { id: 3, fecha: '01 Mar 2026', titulo: '🚀 Nuevo Fiat 600 Hybrid disponible', descripcion: 'Llegó el nuevo Fiat 600 con tecnología híbrida. Motor 1.2 de 145 CV. Disponible para ahorristas de Pulse y Fastback.', imagen: 'fiat600', destacado: false },
  { id: 4, fecha: '20 Feb 2026', titulo: '🔥 Oportunidades de Stock', descripcion: 'Unidades con precios especiales y entrega inmediata. Cronos, Fastback, Pulse, Titano y más.', imagen: 'fastback', destacado: false },
];

// ---------- SERVICIOS (Service / Posventa) ----------
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

// ---------- MODELOS PARA TURNO SERVICE ----------
const modelosService = ['Mobi', 'Argo', 'Cronos', 'Pulse', 'Fastback', '600', 'Fiorino', 'Strada', 'Toro', 'Titano', 'Otro'];

const fiat = {
  id: 'fiat',
  nombre: 'FIAT',
  descripcion: 'Concesionario Oficial FIAT',
  oficial: true,
  imagenesPath: '/images/fiat/',
  imgExt: 'png',
  // Identidad visual FIAT (rojo corporativo)
  tema: {
    primary: '#dc2626', primaryDark: '#991b1b',
    gradient: ['#dc2626', '#991b1b'], onPrimary: '#ffffff',
  },
  categorias: ['todos', 'autos', 'suv', 'pickups', 'utilitarios'],
  catalogo,
  stockOportunidad,
  novedades,
  planAhorro: { activo: true, planes: planesDetalle },
  servicios,
  modelosService,
  contacto: {
    whatsapp: {
      ventas: '5492964487924',
      atencion: '5492964610900',
      plan: '5492964465270',
      repuestos: '5492964609082',
      // Service y siniestros se resuelven por sucursal (ver sucursales[].waService)
    },
    sucursales: [
      { ciudad: 'Ushuaia', icon: '🏔️', sub: 'Fin del Mundo', ventas: 'L. Lugones 1950', service: 'Piedrabuena 256', waVentas: '5492964487924', waService: '5492901559933' },
      { ciudad: 'Río Grande', icon: '🏭', sub: 'Corazón Industrial', dir: 'San Martín 2599', waVentas: '5492964487924', waService: '5492964465050' },
    ],
  },
  secciones: ['inicio', 'catalogo', 'oportunidades', 'simulador', 'novedades', 'siniestros', 'turnos', 'atencion', 'contacto'],
};

export default fiat;
