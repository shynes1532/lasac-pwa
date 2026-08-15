// Tests del motor contra valores publicados en tablas oficiales.
// Ejecutar: node --test src/engine/calc.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { caudalAdmisible, dimensionarTramo, caudalDesdeArtefactos } from './calc.js';

const pct = (a, b) => Math.abs(a - b) / b * 100;

// ---------- SIGAS Thermofusión Tabla 6 (gas natural, s=0,65, h=10) ----------
// Valores del Manual Técnico ed.14 (m³/h)
const TABLA6 = [
  // [L, di, Q m³/h]
  [1, 13.24, 5.594], [2, 13.24, 3.956], [3, 13.24, 3.23], [55, 13.24, 0.754],
  [1, 18.19, 12.377], [4, 24.94, 13.622], [5, 33.0, 24.537],
  [1, 42.8, 105.108], [60, 54.84, 25.217], [65, 94.0, 93.195],
];
test('coincide con SIGAS Tabla 6 (GN) al 0,5%', () => {
  for (const [L, di, q] of TABLA6) {
    const calc = caudalAdmisible(di, L, { s: 0.65 }) / 1000;
    assert.ok(pct(calc, q) < 0.5, `L=${L} di=${di}: calc=${calc.toFixed(3)} vs tabla=${q}`);
  }
});

// ---------- SIGAS Tabla 4 (GLP, s=1,52, h=10) ----------
const TABLA4 = [
  [1, 13.24, 3.658], [2, 18.19, 5.723], [3, 24.94, 10.286],
  [4, 33.0, 17.94], [5, 42.8, 30.739], [60, 54.84, 16.49],
];
test('coincide con SIGAS Tabla 4 (GLP) al 0,5%', () => {
  for (const [L, di, q] of TABLA4) {
    const calc = caudalAdmisible(di, L, { s: 1.52 }) / 1000;
    assert.ok(pct(calc, q) < 0.5, `L=${L} di=${di}: calc=${calc.toFixed(3)} vs tabla=${q}`);
  }
});

// ---------- NAG-200 Tabla 3 (gas natural, hierro negro; l/h) ----------
// di reales de cañería de hierro (ver data/nag200.js)
const TABLA3 = [
  // [L, di, Q l/h tabla]
  [10, 9.54, 780], [100, 9.54, 245],
  [10, 12.72, 1600], [100, 12.72, 505],
  [10, 19.09, 4420], [100, 19.09, 1400],
  [10, 25.45, 9060], [100, 25.45, 2865],
  [10, 31.81, 15825], [10, 38.17, 24965], [10, 50.9, 51245],
  [10, 63.4, 88689], [10, 76.06, 139903], [10, 94.0, 0], // 94 no aplica acá
];
test('coincide con NAG-200 Tabla 3 al 1,5%', () => {
  for (const [L, di, q] of TABLA3) {
    if (!q) continue;
    const calc = caudalAdmisible(di, L, { s: 0.65 });
    assert.ok(pct(calc, q) < 1.5, `L=${L} di=${di}: calc=${calc.toFixed(0)} vs tabla=${q}`);
  }
});

// ---------- Ejemplo del manual SIGAS ----------
// Prolongación A-B: 38,929 m³/h a 20 m → debe dar 63 mm (di 54,84)
test('ejemplo del manual SIGAS: 38,9 m³/h a 20 m → DN 63', () => {
  const r = dimensionarTramo({ caudal: 38.929, longitud: 20, sistema: 'sigas', gas: 'natural' });
  assert.equal(r.elegido.dn, 63);
});

// ---------- Dimensionamiento iterativo con accesorios ----------
test('accesorios aumentan la longitud equivalente y pueden subir el diámetro', () => {
  const sin = dimensionarTramo({ caudal: 2.5, longitud: 14, sistema: 'sigas' });
  const con = dimensionarTramo({
    caudal: 2.5, longitud: 14,
    accesorios: { codo90: 6, teDerivacion: 2, llaveEsferica: 2 },
    sistema: 'sigas',
  });
  assert.ok(con.elegido.leTotal > sin.elegido.leTotal);
  assert.ok(con.elegido.dn >= sin.elegido.dn);
});

test('rosca: Tabla 18 en diámetros (codo90 = 30·di)', () => {
  const r = dimensionarTramo({
    caudal: 1.0, longitud: 10,
    accesorios: { codo90: 2 },
    sistema: 'acero',
  });
  const el = r.elegido;
  // 2 codos × 30 × di/1000
  assert.ok(Math.abs(el.leAccesorios - (2 * 30 * el.di) / 1000) < 1e-9);
});

// ---------- Caudal desde artefactos ----------
test('consumos → m³/h con PC 9300', () => {
  const { kcal, m3h } = caudalDesdeArtefactos(
    [{ kcal: 9000, cant: 1 }, { kcal: 15500, cant: 1 }],
    9300,
  );
  assert.equal(kcal, 24500);
  assert.ok(Math.abs(m3h - 2.634) < 0.01);
});

// ---------- Un caso realista completo ----------
test('vivienda: cocina + calefón 12 + estufa a 12 m con accesorios → DN razonable', () => {
  const { m3h } = caudalDesdeArtefactos(
    [{ kcal: 9000 }, { kcal: 18500 }, { kcal: 3000 }],
    9300,
  );
  const r = dimensionarTramo({
    caudal: m3h, longitud: 12,
    accesorios: { codo90: 4, tePaso: 1, teDerivacion: 1, llaveEsferica: 1 },
    sistema: 'sigas',
  });
  assert.ok(r.elegido, 'debe encontrar diámetro');
  assert.ok([25, 32].includes(r.elegido.dn), `dio DN ${r.elegido.dn}`);
});
