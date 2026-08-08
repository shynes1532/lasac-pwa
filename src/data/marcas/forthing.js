// ============================================================
// FORTHING (Dongfeng Forthing) — Grupo LASAC
// Lineup real: T5 EVO, T5 HEV, Friday, U-Tour.
// ⚠️ FALTA lista de precios -> precio: null (la UI muestra "Consultar").
//    Imágenes en  public/images/forthing/<modelo>.png|jpg|webp
//    (friday todavía sin foto limpia -> muestra fallback con color de marca).
//    Color de marca tentativo: ajustar al oficial Forthing.
// ============================================================

// TODO: cargar precios reales (definir también la moneda: ARS o USD).
const catalogo = [
  { id: 1, categoria: 'suv', modelo: 't5evo', nombre: 'Forthing T5 EVO', precio: null, motor: 'Nafta Turbo', ext: 'jpg' },
  { id: 2, categoria: 'suv', modelo: 't5hev', nombre: 'Forthing T5 HEV', precio: null, motor: 'Híbrido' },
  { id: 3, categoria: 'suv', modelo: 't5mt', nombre: 'Forthing T5 MT', precio: null, motor: 'Nafta MT', ext: 'jpg' },
  { id: 4, categoria: 'suv', modelo: 'friday', nombre: 'Forthing Friday', precio: null, motor: 'REEV (Eléctrico)' },
  { id: 5, categoria: 'monovolumen', modelo: 'utour', nombre: 'Forthing U-Tour', precio: null },
];

const stockOportunidad = [];

const novedades = [
  { id: 9, fecha: '08 Ago 2026', titulo: '🎉 Ahora somos Grupo LASAC', descripcion: 'Crecimos para estar más cerca tuyo. LASAC ahora es Grupo LASAC: una sola gran familia que reúne a FIAT, JAC Motors, Forthing y Dongfeng bajo un mismo techo. Más marcas, más modelos y la misma atención de siempre en Ushuaia y Río Grande. ¡Bienvenido a Grupo LASAC! 🇦🇷', imagen: 'grupo-lasac', destacado: true },
  { id: 1, fecha: '2026', titulo: '🚀 Forthing en el Grupo LASAC', descripcion: 'Llegó Forthing a Tierra del Fuego: SUVs T5 EVO y T5 HEV, y monovolúmenes Friday y U-Tour. Consultá disponibilidad y precios.', imagen: 't5hev', destacado: true },
];

const servicios = [
  { id: 'service10', nombre: 'Service 10.000 km', descripcion: 'Cambio de aceite + filtros + controles de seguridad', duracion: '2 horas' },
  { id: 'service20', nombre: 'Service 20.000 km', descripcion: 'Cambio de aceite + filtros + controles de seguridad', duracion: '2 horas' },
  { id: 'scanner', nombre: 'Scanner / Diagnóstico', descripcion: 'Diagnóstico computarizado con scanner oficial Forthing', duracion: '30 min' },
  { id: 'ac', nombre: 'Aire Acondicionado', descripcion: 'Carga de gas refrigerante + control de fugas', duracion: '1 hora' },
];

const modelosService = ['T5 EVO', 'T5 HEV', 'T5 MT', 'Friday', 'U-Tour', 'Otro'];

const forthing = {
  id: 'forthing',
  nombre: 'Forthing',
  descripcion: 'Concesionario Oficial Forthing',
  oficial: true,
  imagenesPath: '/images/forthing/',
  imgExt: 'png',
  // moneda: definir cuando lleguen los precios ('ARS' o 'USD'). Default ARS.
  // ⚠️ Color tentativo (teal). Ajustar al oficial.
  tema: {
    primary: '#0d9488', primaryDark: '#115e59',
    gradient: ['#0d9488', '#115e59'], onPrimary: '#ffffff',
  },
  categorias: ['todos', 'suv', 'monovolumen'],
  catalogo,
  stockOportunidad,
  novedades,
  planAhorro: null, // venta directa / financiación
  servicios,
  modelosService,
  contacto: {
    // TODO: confirmar WhatsApp/sucursales específicos de Forthing
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

export default forthing;
