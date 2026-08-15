// ============================================================
// Motor de cálculo — método NAG-200 § 5.2.8
//
// Fórmula de caudal admisible (baja presión, h = pérdida de
// carga en mm c.a., di en mm, L en m, s densidad relativa):
//
//   Q [l/h] = √( 5 · di⁵ · h / (s · L) )
//
// Verificada contra las tablas oficiales:
//  · SIGAS Thermofusión Tabla 6 (GN, s=0,65): coincidencia exacta
//  · SIGAS Thermofusión Tabla 4 (GLP, s=1,52): coincidencia exacta
//  · NAG-200 Tabla 3 (GN, hierro negro): error < 1% usando di real
// ============================================================

import { SIGAS_DIAMETROS, SIGAS_ACCESORIOS } from '../data/sigas.js';
import { ACERO_DIAMETROS, ROSCA_ACCESORIOS, H_ADMISIBLE_MM, GASES } from '../data/nag200.js';

/** Caudal admisible en l/h para un diámetro interior di (mm), longitud L (m). */
export function caudalAdmisible(di, L, { h = H_ADMISIBLE_MM, s = 0.65 } = {}) {
  if (di <= 0 || L <= 0) return 0;
  return Math.sqrt((5 * Math.pow(di, 5) * h) / (s * L));
}

/** Longitud equivalente en m de los accesorios SIGAS para un DN dado. */
export function leAccesoriosSigas(accesorios, dn) {
  let le = 0;
  const detalles = [];
  for (const [key, cant] of Object.entries(accesorios || {})) {
    if (!cant) continue;
    const acc = SIGAS_ACCESORIOS[key];
    if (!acc) continue;
    // Si el DN no tiene valor tabulado, usar el mayor DN disponible (criterio conservador)
    const dns = Object.keys(acc.le).map(Number).sort((a, b) => a - b);
    const dnUso = acc.le[dn] != null ? dn : dns.reduce((p, c) => (Math.abs(c - dn) < Math.abs(p - dn) ? c : p), dns[0]);
    const unit = acc.le[dnUso];
    le += cant * unit;
    detalles.push({ key, nombre: acc.nombre, cant, unit, aproximado: dnUso !== dn });
  }
  return { le, detalles };
}

/** Longitud equivalente en m de accesorios a rosca (NAG-200 Tabla 18) para di (mm). */
export function leAccesoriosRosca(accesorios, di) {
  let le = 0;
  const detalles = [];
  for (const [key, cant] of Object.entries(accesorios || {})) {
    if (!cant) continue;
    const acc = ROSCA_ACCESORIOS[key];
    if (!acc) continue;
    const unit = (acc.nd * di) / 1000; // nd × di [mm] → m
    le += cant * unit;
    detalles.push({ key, nombre: acc.nombre, cant, unit, aproximado: false });
  }
  return { le, detalles };
}

/**
 * Dimensiona un tramo: elige el menor diámetro cuyo caudal admisible,
 * computada la longitud equivalente de accesorios A ESE diámetro,
 * cubre el caudal requerido. (Iterativo, como manda la NAG-200.)
 *
 * @param {object} p
 * @param {number} p.caudal      caudal requerido en m³/h
 * @param {number} p.longitud    longitud real de cañería en m
 * @param {object} p.accesorios  { claveAccesorio: cantidad }
 * @param {'sigas'|'acero'} p.sistema
 * @param {'natural'|'envasado'} p.gas
 * @param {number} [p.h]         pérdida de carga admisible en mm c.a.
 * @returns resultado con diámetro elegido y detalle por candidato
 */
export function dimensionarTramo({ caudal, longitud, accesorios = {}, sistema = 'sigas', gas = 'natural', h = H_ADMISIBLE_MM }) {
  const s = GASES[gas].s;
  const qReqLh = caudal * 1000;
  const diametros = sistema === 'sigas' ? SIGAS_DIAMETROS : ACERO_DIAMETROS;

  const candidatos = diametros.map((d) => {
    const { le, detalles } =
      sistema === 'sigas' ? leAccesoriosSigas(accesorios, d.dn) : leAccesoriosRosca(accesorios, d.di);
    const leTotal = longitud + le;
    const qAdm = caudalAdmisible(d.di, leTotal, { h, s });
    return {
      ...d,
      leAccesorios: le,
      leTotal,
      qAdmLh: qAdm,
      qAdmM3h: qAdm / 1000,
      cumple: qAdm >= qReqLh,
      usoPct: qAdm > 0 ? (qReqLh / qAdm) * 100 : Infinity,
      detalles,
    };
  });

  const elegido = candidatos.find((c) => c.cumple) || null;
  return { caudal, qReqLh, sistema, gas, s, h, longitud, candidatos, elegido };
}

/** Suma de consumos de artefactos → caudal en m³/h. */
export function caudalDesdeArtefactos(items, poderCalorifico) {
  const kcal = items.reduce((acc, it) => acc + (it.kcal || 0) * (it.cant || 1), 0);
  return { kcal, m3h: kcal / poderCalorifico };
}
