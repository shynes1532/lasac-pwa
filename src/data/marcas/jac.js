// ============================================================
// JAC MOTORS — Grupo LASAC
// Precios en USD (Precio Final = lista + flete + inscripción + Gs.Adm/IIBB).
// Imágenes en  public/images/jac/<modelo>.png  (un archivo por modelo base:
//   js2, js4, js6, js8, ev30x, t8, t9, jacx200).
// ⚠️ Color de marca tentativo: ajustar al oficial JAC.
// ============================================================

const catalogo = [
  // --- SUV ---
  { id: 1, categoria: 'suv', modelo: 'js2', nombre: 'JS2 Intelligent MT', precio: 17500, caja: 'Manual' },
  { id: 2, categoria: 'suv', modelo: 'js2', nombre: 'JS2 Intelligent CVT', precio: 18700, caja: 'CVT' },
  { id: 3, categoria: 'suv', modelo: 'js4', nombre: 'JS4 1.5 CVT Lux', precio: 19000, motor: '1.5', caja: 'CVT' },
  { id: 4, categoria: 'suv', modelo: 'js4', nombre: 'JS4 1.5 CVT Flagship', precio: 21200, motor: '1.5', caja: 'CVT' },
  { id: 5, categoria: 'suv', modelo: 'js6', nombre: 'JS6 PHEV Híbrida', precio: 30000, motor: 'PHEV', caja: 'Automática' },
  { id: 6, categoria: 'suv', modelo: 'js8', nombre: 'JS8 1.5 TGDI + 7 DCT', precio: 27500, motor: '1.5 TGDI', caja: '7 DCT' },
  { id: 7, categoria: 'suv', modelo: 'ev30x', nombre: 'EV30X (EV3) Luxury', precio: 26500, motor: 'Eléctrico', caja: 'Automática' },
  // --- Pickups ---
  { id: 8, categoria: 'pickups', modelo: 't8', nombre: 'T8 4X4 MT Intelligent', precio: 24900, caja: 'Manual' },
  { id: 9, categoria: 'pickups', modelo: 't9', nombre: 'T9 4X4 Automatic Luxury', precio: 31400, caja: 'Automática' },
  // --- Comerciales ---
  { id: 10, categoria: 'comerciales', modelo: 'jacx200', nombre: 'JACX200 2.0 MT Lux CS Nafta', precio: 20900, motor: '2.0 Nafta', caja: 'Manual' },
  { id: 11, categoria: 'comerciales', modelo: 'jacx200', nombre: 'JACX200 2.0 MT Lux CD Nafta', precio: 21400, motor: '2.0 Nafta', caja: 'Manual' },
  { id: 12, categoria: 'comerciales', modelo: 'jacx200', nombre: 'JACX200 2.0 MT Lux CS Diésel', precio: 24900, motor: '2.0 Diésel', caja: 'Manual' },
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

const modelosService = ['JS2', 'JS4', 'JS6', 'JS8', 'EV30X', 'T8', 'T9', 'JACX200', 'Otro'];

const jac = {
  id: 'jac',
  nombre: 'JAC Motors',
  descripcion: 'Concesionario Oficial JAC',
  oficial: true,
  imagenesPath: '/images/jac/',
  imgExt: 'webp',
  moneda: 'USD',
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
