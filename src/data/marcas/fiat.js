// ============================================================
// FIAT — Concesionario Oficial (Grupo LASAC)
// Datos migrados desde el App.jsx original. Fuente: lista Feb 2026.
// ============================================================

// ---------- PLAN DE AHORRO (FIAT Plan) ----------
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

// ---------- CATÁLOGO 0KM ----------
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
  { id: 1, fecha: '04 Feb 2026', titulo: '🚀 Nuevo Fiat 600 Hybrid ya disponible', descripcion: 'Llegó el nuevo Fiat 600 con tecnología híbrida. Motor 1.2 de 145 CV con consumo reducido. ¡Vení a conocerlo!', imagen: 'fiat600', destacado: true },
  { id: 2, fecha: '01 Feb 2026', titulo: '📋 Nuevos Planes de Ahorro Febrero', descripcion: 'Actualizamos todos los planes con nuevas condiciones. Cronos desde $347.000 de cuota. Consultá el simulador.', imagen: 'cronos', destacado: true },
  { id: 3, fecha: '28 Ene 2026', titulo: '🔥 Oportunidades de Stock', descripcion: 'Más de 25 unidades con precios especiales. Cronos, Fastback, Pulse y más. Entrega inmediata.', imagen: 'fastback', destacado: false },
  { id: 4, fecha: '20 Ene 2026', titulo: '🔧 Promo Service de Verano', descripcion: 'Revisión de aire acondicionado + control de niveles gratis con cualquier service. Válido hasta el 28/02.', imagen: 'strada', destacado: false },
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
