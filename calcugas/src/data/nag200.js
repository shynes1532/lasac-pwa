// ============================================================
// NAG-200 (ENARGAS) — Reglamento de instalaciones internas.
// § 5.2.8: método de cálculo del diámetro (longitud equivalente,
// pérdida de carga admisible 10 mm c.a. entre medidor y artefacto).
// Apéndice 1: Tabla 1 (consumos), Tabla 3 (caudales GN),
// Tabla 5 (poder calorífico/densidad), Tabla 18 (long. equiv. rosca).
// ============================================================

// Pérdida de carga admisible medidor→artefacto (mm columna de agua)
export const H_ADMISIBLE_MM = 10;

// Densidades relativas (Tabla 5)
export const GASES = {
  natural: { nombre: 'Gas natural', s: 0.65, pcDefault: 9300 }, // PC facturado típico actual ~9300 kcal/m³
  envasado: { nombre: 'GLP (envasado)', s: 1.52, pcDefault: 22380 },
};

// Cañería de hierro negro / epoxi — diámetros nominales y di real
// (los di reproducen la Tabla 3 NAG-200 con la fórmula de caudal; verificado <1%)
export const ACERO_DIAMETROS = [
  { dn: '3/8"', di: 9.54 },
  { dn: '1/2"', di: 12.72 },
  { dn: '3/4"', di: 19.09 },
  { dn: '1"', di: 25.45 },
  { dn: '1 1/4"', di: 31.81 },
  { dn: '1 1/2"', di: 38.17 },
  { dn: '2"', di: 50.9 },
  { dn: '2 1/2"', di: 63.4 },
  { dn: '3"', di: 76.06 },
  { dn: '4"', di: 101.4 },
];

// Tabla 18 — longitudes equivalentes de accesorios a rosca, EN DIÁMETROS (× di)
export const ROSCA_ACCESORIOS = {
  codo45: { nombre: 'Codo 45°', nd: 14 },
  codo90: { nombre: 'Codo 90°', nd: 30 },
  curva: { nombre: 'Curva', nd: 20 },
  tePaso: { nombre: 'Te (flujo a través)', nd: 20 },
  teDerivacion: { nombre: 'Te (flujo a 90°)', nd: 60 },
  valvulaEsclusa: { nombre: 'Válvula esclusa', nd: 7 },
  valvulaGlobo: { nombre: 'Válvula globo', nd: 333 },
  valvulaMacho: { nombre: 'Llave de paso (v. macho)', nd: 100 },
  reduccion: { nombre: 'Reducción (Ø menor)', nd: 10 },
};

// Tabla 1 — consumos medios de artefactos domésticos (kcal/h)
// Valores promedio de los rangos de la NAG-200; todos editables en la app.
export const ARTEFACTOS = [
  { id: 'cocina', nombre: 'Cocina 4 hornallas c/horno', kcal: 9000 },
  { id: 'anafe', nombre: 'Anafe 2 hornallas', kcal: 2600 },
  { id: 'horno', nombre: 'Horno solo', kcal: 3250 },
  { id: 'calefon8', nombre: 'Calefón 8 l/min', kcal: 12000 },
  { id: 'calefon10', nombre: 'Calefón 10 l/min', kcal: 15500 },
  { id: 'calefon12', nombre: 'Calefón 12 l/min', kcal: 18500 },
  { id: 'calefon14', nombre: 'Calefón 14 l/min', kcal: 21700 },
  { id: 'calefon16', nombre: 'Calefón 16 l/min', kcal: 24750 },
  { id: 'termo50', nombre: 'Termotanque 50 l', kcal: 4500 },
  { id: 'termo75', nombre: 'Termotanque 75 l', kcal: 5750 },
  { id: 'termo110', nombre: 'Termotanque 110 l', kcal: 7250 },
  { id: 'termo150', nombre: 'Termotanque 150 l', kcal: 8750 },
  { id: 'estufa2500', nombre: 'Estufa / calefactor 2500', kcal: 2500 },
  { id: 'estufa3000', nombre: 'Estufa / calefactor 3000', kcal: 3000 },
  { id: 'estufa4500', nombre: 'Estufa / calefactor 4500', kcal: 4500 },
  { id: 'estufa6000', nombre: 'Estufa / calefactor 6000', kcal: 6000 },
  { id: 'estufa9000', nombre: 'Estufa / calefactor 9000', kcal: 9000 },
  { id: 'caldera20', nombre: 'Caldera individual ~20.000', kcal: 20000 },
  { id: 'caldera30', nombre: 'Caldera individual ~30.000', kcal: 30000 },
  { id: 'secarropas', nombre: 'Secarropas', kcal: 3000 },
  { id: 'parrilla', nombre: 'Parrilla / asador a gas', kcal: 5000 },
  { id: 'heladera', nombre: 'Heladera a gas', kcal: 650 },
  { id: 'custom', nombre: 'Otro artefacto (personalizado)', kcal: 10000 },
];
