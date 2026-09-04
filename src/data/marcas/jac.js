// ============================================================
// JAC MOTORS — Grupo LASAC
// Lista JIÀNTÓU S.A. Septiembre 2026 — precios en PESOS (ARS).
// precio = CONTADO / BNA (lista + flete + inscripción + Gs.Adm/IIBB).
// precioFinanciado = columna FINANCIADO de la lista.
// Ushuaia: sumar $500.000 de flete si la unidad se solicita desde Río Grande.
// Imágenes en  public/images/jac/<modelo>.png  (un archivo por modelo base:
//   js2, js4, js6, js8, ev30x, t8, t9, jacx200).
// ⚠️ Color de marca tentativo: ajustar al oficial JAC.
// ============================================================

const catalogo = [
  // --- SUV ---
  { id: 13, categoria: 'suv', modelo: 'tiggo4', nombre: 'Chery Tiggo 4 Pro Luxury', precio: 27000000, precioFinanciado: 28000000 },
  { id: 1, categoria: 'suv', modelo: 'js2', nombre: 'JS2 Intelligent MT', precio: 23500000, precioFinanciado: 24500000, caja: 'Manual' },
  { id: 2, categoria: 'suv', modelo: 'js2', nombre: 'JS2 Intelligent CVT', precio: 24500000, precioFinanciado: 25500000, caja: 'CVT' },
  { id: 4, categoria: 'suv', modelo: 'js4', nombre: 'JS4 1.5 CVT Flagship', precio: 29500000, precioFinanciado: 30500000, motor: '1.5', caja: 'CVT' },
  { id: 5, categoria: 'suv', modelo: 'js6', nombre: 'JS6 PHEV Híbrida', precio: 44000000, precioFinanciado: 45000000, motor: 'PHEV', caja: 'Automática' },
  { id: 6, categoria: 'suv', modelo: 'js8', nombre: 'JS8 1.5 TGDI + 7 DCT', precio: 36900000, precioFinanciado: 38500000, motor: '1.5 TGDI', caja: '7 DCT' },
  { id: 7, categoria: 'suv', modelo: 'ev30x', nombre: 'EV30X (EV3) Luxury', precio: 39500000, precioFinanciado: 40500000, motor: 'Eléctrico', caja: 'Automática' },
  // --- Pickups ---
  { id: 8, categoria: 'pickups', modelo: 't8', nombre: 'T8 4X4 MT Intelligent', precio: 36500000, precioFinanciado: 37500000, caja: 'Manual' },
  { id: 9, categoria: 'pickups', modelo: 't9', nombre: 'T9 4X4 Automatic Luxury', precio: 45000000, precioFinanciado: 46000000, caja: 'Automática' },
  // --- Comerciales ---
  { id: 10, categoria: 'comerciales', modelo: 'jacx200', nombre: 'JACX200 2.0 MT Lux CS Nafta', precio: 30000000, precioFinanciado: 31000000, motor: '2.0 Nafta', caja: 'Manual' },
  { id: 11, categoria: 'comerciales', modelo: 'jacx200', nombre: 'JACX200 2.0 MT Lux CD Nafta', precio: 31000000, precioFinanciado: 32000000, motor: '2.0 Nafta', caja: 'Manual' },
  { id: 12, categoria: 'comerciales', modelo: 'jacx200', nombre: 'JACX200 2.0 MT Lux CS Diésel', precio: 35000000, precioFinanciado: 36000000, motor: '2.0 Diésel', caja: 'Manual' },
];

const stockOportunidad = [];

const novedades = [
  { id: 9, fecha: '08 Ago 2026', titulo: '🎉 Ahora somos Grupo LASAC', descripcion: 'Crecimos para estar más cerca tuyo. LASAC ahora es Grupo LASAC: una sola gran familia que reúne a FIAT, JAC Motors, Forthing y Dongfeng bajo un mismo techo. Más marcas, más modelos y la misma atención de siempre en Ushuaia y Río Grande. ¡Bienvenido a Grupo LASAC! 🇦🇷', imagen: 'grupo-lasac', destacado: true },
  { id: 1, fecha: '2026', titulo: '🚀 JAC Motors en el Grupo LASAC', descripcion: 'Toda la gama JAC en Tierra del Fuego: SUVs, pickups, híbridos y eléctricos. Consultá disponibilidad y financiación.', imagen: 'js6', destacado: true },
];

const servicios = [
  { id: 'service10', nombre: 'Service 10.000 km', descripcion: 'Cambio de aceite + filtros + controles de seguridad', duracion: '2 horas' },
  { id: 'service20', nombre: 'Service 20.000 km', descripcion: 'Cambio de aceite + filtros + controles de seguridad', duracion: '2 horas' },
  { id: 'scanner', nombre: 'Scanner / Diagnóstico', descripcion: 'Diagnóstico computarizado con scanner oficial JAC', duracion: '30 min' },
  { id: 'ac', nombre: 'Aire Acondicionado', descripcion: 'Carga de gas refrigerante + control de fugas', duracion: '1 hora' },
];

const modelosService = ['Tiggo 4', 'JS2', 'JS4', 'JS6', 'JS8', 'EV30X', 'T8', 'T9', 'JACX200', 'Otro'];

const jac = {
  id: 'jac',
  nombre: 'JAC Motors',
  descripcion: 'Concesionario Oficial JAC',
  oficial: true,
  imagenesPath: '/images/jac/',
  imgExt: 'webp',
  moneda: 'ARS',
  notaCatalogo: 'Lista JIÀNTÓU Septiembre 2026 · Precio contado/BNA (incluye flete, inscripción y gastos). Ushuaia: +$500.000 de flete si la unidad viene de Río Grande.',
  // ⚠️ Color tentativo (azul JAC). Ajustar al oficial.
  tema: {
    primary: '#2563eb', primaryDark: '#1e3a8a',
    gradient: ['#2563eb', '#1e3a8a'], onPrimary: '#ffffff',
  },
  categorias: ['todos', 'suv', 'pickups', 'comerciales'],
  catalogo,
  stockOportunidad,
  novedades,
  planAhorro: null, // venta directa / financiación
  servicios,
  modelosService,
  contacto: {
    // TODO: confirmar WhatsApp/sucursales específicos de JAC (por ahora, los del Grupo)
    whatsapp: {
      ventas: '5492964487924',
      atencion: '5492964610900',
      repuestos: '5492964609082',
    },
    sucursales: [
      { ciudad: 'Ushuaia', icon: '🏔️', sub: 'Fin del Mundo', ventas: 'L. Lugones 1950', service: 'Piedrabuena 256', waVentas: '5492964487924', waService: '5492901559933' },
      { ciudad: 'Río Grande', icon: '🏭', sub: 'Corazón Industrial', dir: 'San Martín 2599', waVentas: '5492964487924', waService: '5492964465050' },
    ],
  },
  secciones: ['inicio', 'catalogo', 'oportunidades', 'novedades', 'siniestros', 'turnos', 'atencion', 'contacto'],
};

export default jac;
