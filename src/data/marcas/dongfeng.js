// ============================================================
// DONGFENG — Camiones y Utilitarios (Grupo LASAC)
// Lista Septiembre 2026 — precios en USD. Se muestra el "Precio Final" (incluye
// flete, inscripción, gastos administrativos e ingresos brutos). T/C ref. $1.530.
// Imágenes en  public/images/dongfeng/<modelo>.png
// ⚠️ Color de marca tentativo: ajustar al oficial Dongfeng.
// ============================================================

// Precio Final en USD (lista + flete + inscripción + Gs.Ad/IB).
const catalogo = [
  // --- Utilitarios livianos (W series) ---
  { id: 1, categoria: 'utilitarios', modelo: 'w310cs', nombre: 'Captain W 310 Cabina Simple', precio: 16700 },
  { id: 2, categoria: 'utilitarios', modelo: 'w310cd', nombre: 'Captain W 310 Cabina Doble', precio: 17700 },
  { id: 3, categoria: 'utilitarios', modelo: 'w412cs', nombre: 'Captain W 412 Cabina Simple', precio: 18200 },
  { id: 4, categoria: 'utilitarios', modelo: 'w412cd', nombre: 'Captain W 412 Cabina Doble', precio: 19200 },
  // --- Vans (V series) ---
  { id: 5, categoria: 'vans', modelo: 'vvan312cargo', nombre: 'V Van 312 Cargo', precio: 21700 },
  { id: 6, categoria: 'vans', modelo: 'vvan312largo', nombre: 'V Van 312 Largo', precio: 23700 },
  { id: 7, categoria: 'vans', modelo: 'vvan312bus', nombre: 'V Van 312 Bus', precio: 26200 },
  { id: 8, categoria: 'vans', modelo: 'uvan414cargo', nombre: 'V UVan 414 Cargo', precio: 36400 },
  { id: 9, categoria: 'vans', modelo: 'uvan414bus', nombre: 'V UVan 414 Bus', precio: 41400 },
  // --- Camiones (T / C / D series) ---
  { id: 10, categoria: 'camiones', modelo: 't515chasis', nombre: 'T 515 Chasis', precio: 24400 },
  { id: 11, categoria: 'camiones', modelo: 't515caja', nombre: 'T 515 con Caja', precio: 25100 },
  { id: 12, categoria: 'camiones', modelo: 'c615caja', nombre: 'C 615 con Caja', precio: 35200 },
  { id: 13, categoria: 'camiones', modelo: 'c815caja', nombre: 'C 815 con Caja', precio: 37700 },
  { id: 14, categoria: 'camiones', modelo: 'c1016chasis', nombre: 'C 1016 Chasis', precio: 42200 },
  { id: 15, categoria: 'camiones', modelo: 'c1016caja', nombre: 'C 1016 con Caja', precio: 45700 },
  { id: 16, categoria: 'camiones', modelo: 'c1217chasis', nombre: 'C 1217 Chasis', precio: 47200 },
  { id: 19, categoria: 'camiones', modelo: 'd1830chasis', nombre: 'D 1830 Tractor', precio: 68000 },
  { id: 17, categoria: 'camiones', modelo: 'd1830chasis', nombre: 'D 1830 Chasis', precio: 68000 },
  { id: 18, categoria: 'camiones', modelo: 'd1830caja', nombre: 'D 1830 con Caja', precio: 70500 },
];

const stockOportunidad = [];

const novedades = [
  { id: 9, fecha: '08 Ago 2026', titulo: '🎉 Ahora somos Grupo LASAC', descripcion: 'Crecimos para estar más cerca tuyo. LASAC ahora es Grupo LASAC: una sola gran familia que reúne a FIAT, JAC Motors, Forthing y Dongfeng bajo un mismo techo. Más marcas, más modelos y la misma atención de siempre en Ushuaia y Río Grande. ¡Bienvenido a Grupo LASAC! 🇦🇷', imagen: 'grupo-lasac', destacado: true },
  { id: 1, fecha: '2026', titulo: '🚚 Dongfeng Camiones en el Grupo LASAC', descripcion: 'Gama completa de utilitarios, vans y camiones Dongfeng en Tierra del Fuego. Consultá disponibilidad y financiación.', imagen: 'c1016caja', destacado: true },
];

const servicios = [
  { id: 'service10', nombre: 'Service Programado', descripcion: 'Mantenimiento según plan del fabricante + controles de seguridad', duracion: 'A confirmar' },
  { id: 'scanner', nombre: 'Scanner / Diagnóstico', descripcion: 'Diagnóstico computarizado con scanner oficial Dongfeng', duracion: '30 min' },
  { id: 'frenos', nombre: 'Revisión de Frenos', descripcion: 'Control y mantenimiento del sistema de frenos', duracion: '1 hora' },
];

const modelosService = ['W 310', 'W 412', 'V Van 312', 'V UVan 414', 'T 515', 'C 615', 'C 815', 'C 1016', 'C 1217', 'D 1830', 'Otro'];

const dongfeng = {
  id: 'dongfeng',
  nombre: 'Dongfeng',
  descripcion: 'Camiones y Utilitarios Dongfeng',
  oficial: true,
  imagenesPath: '/images/dongfeng/',
  imgExt: 'webp',
  moneda: 'USD',
  notaCatalogo: 'Lista Septiembre 2026 · Precios finales en USD (incluyen flete, inscripción y gastos). Tipo de cambio de referencia: $1.530.',
  // ⚠️ Color tentativo (índigo). Ajustar al oficial Dongfeng.
  tema: {
    primary: '#4f46e5', primaryDark: '#3730a3',
    gradient: ['#4f46e5', '#3730a3'], onPrimary: '#ffffff',
  },
  categorias: ['todos', 'utilitarios', 'vans', 'camiones'],
  catalogo,
  stockOportunidad,
  novedades,
  planAhorro: null, // venta directa / financiación
  servicios,
  modelosService,
  contacto: {
    // TODO: confirmar WhatsApp/sucursales específicos de Dongfeng
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

export default dongfeng;
