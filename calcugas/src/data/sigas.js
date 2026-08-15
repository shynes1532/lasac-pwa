// ============================================================
// Sistema SIGAS Thermofusión® (acero-polietileno, NAG-E 210)
// Fuente: Manual Técnico Sigas Thermofusión ed.14 (2023),
// Grupo Dema — Tabla 2 (dimensiones), Tabla 3 (pérdida de
// carga en accesorios, en metros de longitud equivalente).
// ============================================================

// Diámetros comerciales: DN = diámetro exterior (mm), di = diámetro interior real (mm)
export const SIGAS_DIAMETROS = [
  { dn: 20, di: 13.24, rosca: '1/2"' },
  { dn: 25, di: 18.19, rosca: '3/4"' },
  { dn: 32, di: 24.94, rosca: '1"' },
  { dn: 40, di: 33.0, rosca: '1 1/4"' },
  { dn: 50, di: 42.8, rosca: '1 1/2"' },
  { dn: 63, di: 54.84, rosca: '2"' },
  { dn: 75, di: 63.0, rosca: '2 1/2"' },
  { dn: 90, di: 74.0, rosca: '3"' },
  { dn: 110, di: 94.0, rosca: '4"' },
];

// Longitudes equivalentes (m) por accesorio y DN — Tabla Nº3 SIGAS.
// Familias usadas por la calculadora (las más frecuentes en obra).
export const SIGAS_ACCESORIOS = {
  codo90: {
    nombre: 'Codo 90°',
    le: { 20: 0.953, 25: 0.856, 32: 1.191, 40: 1.004, 50: 1.422, 63: 2.283, 75: 2.334, 90: 2.075, 110: 2.115 },
  },
  codo45: {
    nombre: 'Codo 45°',
    le: { 20: 0.519, 25: 0.583, 32: 0.668, 40: 0.682, 50: 0.315, 63: 0.633, 75: 0.845, 90: 0.719, 110: 1.629 },
  },
  teDerivacion: {
    nombre: 'Te (flujo a 90°)',
    le: { 20: 0.771, 25: 0.707, 32: 0.928, 40: 0.902, 50: 1.262, 63: 1.662, 75: 2.577, 90: 2.004, 110: 4.269 },
  },
  tePaso: {
    nombre: 'Te (flujo a través)',
    le: { 20: 0.392, 25: 0.222, 32: 0.235, 40: 0.237, 50: 0.27, 63: 0.396, 75: 0.829, 90: 0.985, 110: 2.153 },
  },
  llaveEsferica: {
    nombre: 'Llave esférica',
    le: { 20: 0.678, 25: 0.227, 32: 0.327, 40: 1.159, 50: 0.89, 63: 0.78 },
  },
  union: {
    nombre: 'Unión normal (cupla)',
    le: { 20: 0.369, 25: 0.242, 32: 0.408, 40: 0.237, 50: 0.234, 63: 0.162, 75: 0.103, 90: 0.206, 110: 0.224 },
  },
  cuplaElectro: {
    nombre: 'Cupla electrofusión',
    le: { 20: 0.369, 25: 0.242, 32: 0.408, 40: 0.237, 50: 0.234, 63: 0.162, 75: 0.14, 90: 0.15, 110: 0.19 },
  },
  curvaSobrepaso: {
    nombre: 'Curva de sobrepasaje',
    le: { 20: 0.476, 25: 0.324, 32: 0.383 },
  },
  nipleCorto: {
    nombre: 'Niple corto con tope',
    le: { 20: 0.391, 25: 0.257, 32: 0.432, 40: 0.251, 50: 0.248, 63: 0.172, 75: 0.109, 90: 0.218, 110: 0.237 },
  },
  transicionMacho: {
    nombre: 'Transición macho (a rosca)',
    le: { 20: 0.369, 25: 0.152, 32: 0.526, 40: 0.396, 50: 0.277, 63: 0.232, 75: 0.828, 90: 1.98, 110: 0.958 },
  },
  transicionHembra: {
    nombre: 'Transición hembra (a rosca)',
    le: { 20: 0.404, 25: 0.159, 32: 0.303, 40: 0.471, 50: 0.498, 63: 0.232, 75: 0.828, 90: 1.98, 110: 0.958 },
  },
  codoMH90: {
    nombre: 'Codo MH 90°',
    le: { 20: 1.058, 25: 0.95, 32: 1.322, 40: 1.114 },
  },
  codoMH45: {
    nombre: 'Codo MH 45°',
    le: { 20: 0.576, 25: 0.647, 32: 0.741, 40: 0.757 },
  },
  codoRoscaHembra: {
    nombre: 'Codo 90° c/rosca hembra',
    le: { 20: 0.651, 25: 0.398, 32: 0.899, 40: 1.004, 50: 2.528, 63: 3.092, 75: 2.334, 90: 2.48, 110: 3.509 },
  },
  cuplaReduccion: {
    nombre: 'Cupla reducción HH (al Ø menor)',
    // clave = Ø menor del par más usual
    le: { 20: 0.329, 25: 0.525, 32: 0.506, 40: 0.517, 50: 0.817, 63: 0.676, 75: 0.561, 90: 0.283, 110: 0.972 },
  },
  bujeReduccion: {
    nombre: 'Buje reducción (al Ø menor)',
    le: { 20: 0.384, 25: 0.576, 32: 0.718, 40: 0.571, 50: 0.817, 63: 0.908, 75: 0.704, 90: 0.958, 110: 1.092 },
  },
};

// Tabla completa de referencia (para la pestaña "Accesorios") — valores tal cual catálogo.
export const SIGAS_TABLA_COMPLETA = [
  { grupo: 'Uniones', items: [
    ['Unión Normal 20', 0.369], ['Unión Normal 25', 0.242], ['Unión Normal 32', 0.408],
    ['Unión Normal 40', 0.237], ['Unión Normal 50', 0.234], ['Unión Normal 63', 0.162],
    ['Unión Normal 75', 0.103], ['Unión Normal 90', 0.206], ['Unión Normal 110', 0.224],
  ]},
  { grupo: 'Codos 45°', items: [
    ['Codo 45° · 20', 0.519], ['Codo 45° · 25', 0.583], ['Codo 45° · 32', 0.668],
    ['Codo 45° · 40', 0.682], ['Codo 45° · 50', 0.315], ['Codo 45° · 63', 0.633],
    ['Codo 45° · 75', 0.845], ['Codo 45° · 90', 0.719], ['Codo 45° · 110', 1.629],
  ]},
  { grupo: 'Codos 90°', items: [
    ['Codo 90° · 20', 0.953], ['Codo 90° · 25', 0.856], ['Codo 90° · 32', 1.191],
    ['Codo 90° · 40', 1.004], ['Codo 90° · 50', 1.422], ['Codo 90° · 63', 2.283],
    ['Codo 90° · 75', 2.334], ['Codo 90° · 90', 2.075], ['Codo 90° · 110', 2.115],
  ]},
  { grupo: 'Codos MH', items: [
    ['Codo MH 45° · 20', 0.576], ['Codo MH 45° · 25', 0.647], ['Codo MH 45° · 32', 0.741], ['Codo MH 45° · 40', 0.757],
    ['Codo MH 90° · 20', 1.058], ['Codo MH 90° · 25', 0.95], ['Codo MH 90° · 32', 1.322], ['Codo MH 90° · 40', 1.114],
  ]},
  { grupo: 'Codos 90° con rosca hembra', items: [
    ['20 × 1/2"', 0.651], ['25 × 1/2"', 0.398], ['25 × 3/4"', 0.768], ['32 × 3/4"', 0.543],
    ['32 × 1"', 0.899], ['40 × 1"', 0.854], ['40 × 1 1/4"', 1.004], ['50 × 1 1/4"', 1.004],
    ['50 × 1 1/2"', 2.528], ['63 × 1 1/2"', 3.092], ['63 × 2"', 2.612], ['75 × 2 1/2"', 2.334],
    ['90 × 3"', 2.48], ['110 × 4"', 3.509],
  ]},
  { grupo: 'Tes (flujo a 90° / derivación)', items: [
    ['Te 20', 0.771], ['Te 25', 0.707], ['Te 32', 0.928], ['Te 40', 0.902], ['Te 50', 1.262],
    ['Te 63', 1.662], ['Te 75', 2.577], ['Te 90', 2.004], ['Te 110', 4.269],
  ]},
  { grupo: 'Tes (flujo a través / paso)', items: [
    ['Te 20', 0.392], ['Te 25', 0.222], ['Te 32', 0.235], ['Te 40', 0.237], ['Te 50', 0.27],
    ['Te 63', 0.396], ['Te 75', 0.829], ['Te 90', 0.985], ['Te 110', 2.153],
  ]},
  { grupo: 'Tes reducción central (flujo a 90°)', items: [
    ['25×20', 0.755], ['32×20', 0.845], ['32×25', 0.819], ['40×25', 0.837], ['40×32', 0.99],
    ['50×32', 0.774], ['50×40', 1.004], ['63×40', 0.902], ['63×50', 1.921], ['75×50', 1.108],
    ['75×63', 1.067], ['90×63', 2.414], ['90×75', 2.632], ['110×75', 1.592], ['110×90', 2.094],
  ]},
  { grupo: 'Tes reducción central (flujo a través)', items: [
    ['25×20', 0.352], ['32×20', 0.618], ['32×25', 0.618], ['40×25', 0.708], ['40×32', 0.371],
    ['50×32', 0.284], ['50×40', 0.277], ['63×40', 0.162], ['63×50', 0.28], ['75×50', 0.144],
    ['75×63', 0.297], ['90×63', 0.355], ['90×75', 0.347], ['110×75', 0.631], ['110×90', 0.9],
  ]},
  { grupo: 'Llaves esféricas', items: [
    ['Llave esférica 20', 0.678], ['Llave esférica 25', 0.227], ['Llave esférica 32', 0.327],
    ['Llave esférica 40', 1.159], ['Llave esférica 50 × 1 1/2"', 0.89], ['Llave esférica 63 × 2"', 0.78],
  ]},
  { grupo: 'Cuplas electrofusión', items: [
    ['20', 0.369], ['25', 0.242], ['32', 0.408], ['40', 0.237], ['50', 0.234],
    ['63', 0.162], ['75', 0.14], ['90', 0.15], ['110', 0.19],
  ]},
  { grupo: 'Curvas de sobrepasaje', items: [
    ['20', 0.476], ['25', 0.324], ['32', 0.383],
  ]},
  { grupo: 'Niples cortos con tope', items: [
    ['20', 0.391], ['25', 0.257], ['32', 0.432], ['40', 0.251], ['50', 0.248],
    ['63', 0.172], ['75', 0.109], ['90', 0.218], ['110', 0.237],
  ]},
  { grupo: 'Cuplas reducción HH', items: [
    ['25 a 20', 0.329], ['32 a 20', 0.329], ['32 a 25', 0.525], ['40 a 25', 0.49], ['40 a 32', 0.506],
    ['50 a 32', 0.506], ['50 a 40', 0.517], ['63 a 40', 0.676], ['63 a 50', 0.817], ['75 a 50', 0.561],
    ['75 a 63', 0.324], ['90 a 63', 0.205], ['90 a 75', 0.283], ['110 a 75', 0.972], ['110 a 90', 0.972],
  ]},
  { grupo: 'Bujes reducción', items: [
    ['25-20', 0.375], ['32-25', 0.576], ['32-20', 0.384], ['MH 40 a 25', 0.445], ['MH 40 a 32', 0.718],
    ['MH 50 a 32', 0.538], ['MH 50 a 40', 0.571], ['MH 63 a 40', 0.676], ['MH 63 a 50', 0.817],
    ['MH 75 a 50', 0.704], ['MH 75 a 63', 0.687], ['MH 90 a 63', 0.908], ['MH 90 a 75', 0.958],
    ['MH 110 a 75', 1.092], ['MH 110 a 90', 0.972],
  ]},
  { grupo: 'Reductores anulares', items: [
    ['32-20', 0.699], ['40-20', 0.635], ['40-25', 0.485], ['50-25', 0.613], ['50-32', 0.586],
    ['63-32', 0.779], ['63-40', 0.772], ['75-32', 0.787], ['75-40', 0.75], ['75-50', 0.75],
    ['90-63', 0.99], ['90-75', 1.08],
  ]},
  { grupo: 'Transiciones hembra (a rosca)', items: [
    ['20 × 1/2"', 0.404], ['25 × 1/2"', 0.159], ['25 × 3/4"', 0.397], ['32 × 1"', 0.303],
    ['40 × 1 1/4"', 0.471], ['50 × 1 1/2"', 0.498], ['63 × 2"', 0.232], ['75 × 2 1/2"', 0.828],
    ['90 × 3"', 1.98], ['110 × 4"', 0.958],
  ]},
  { grupo: 'Transiciones macho (a rosca)', items: [
    ['20 × 1/2"', 0.369], ['25 × 1/2"', 0.152], ['25 × 3/4"', 0.362], ['32 × 1"', 0.526],
    ['40 × 1 1/4"', 0.396], ['50 × 1 1/2"', 0.277], ['63 × 2"', 0.232], ['75 × 2 1/2"', 0.828],
    ['90 × 3"', 1.98], ['110 × 4"', 0.958],
  ]},
  { grupo: 'Monturas de derivación', items: [
    ['63-25', 0.315], ['75-25', 0.3], ['75-32', 0.3], ['90-25', 0.54], ['90-32', 0.54],
    ['110-25', 0.88], ['110-32', 0.88],
  ]},
  { grupo: 'Otros', items: [
    ['Transición Macho 110 × 4', 0.958], ['Te reduc. extremo 25×25×20', 0.4], ['Te reduc. extremo 32×32×20', 0.704],
  ]},
];

// Tiempos de Thermofusión® (Tabla 1 del manual) y profundidad de inserción (Tabla 2)
export const SIGAS_FUSION = [
  { dn: 20, calent: 5, acople: 4, enfria: 2, insercion: 12 },
  { dn: 25, calent: 7, acople: 4, enfria: 2, insercion: 13 },
  { dn: 32, calent: 8, acople: 6, enfria: 4, insercion: 14 },
  { dn: 40, calent: 12, acople: 6, enfria: 4, insercion: 16 },
  { dn: 50, calent: 18, acople: 6, enfria: 4, insercion: 18 },
  { dn: 63, calent: 24, acople: 8, enfria: 6, insercion: 24 },
  { dn: 75, calent: 30, acople: 10, enfria: 6, insercion: 26 },
  { dn: 90, calent: 35, acople: 12, enfria: 8, insercion: 29 },
  { dn: 110, calent: 45, acople: 12, enfria: 10, insercion: 32 },
];
