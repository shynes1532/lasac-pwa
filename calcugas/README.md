# 🔥 CalcuGas — Calculadora del Gasista

PWA móvil para **gasistas matriculados**: cálculo de cañerías de gas natural según
**NAG-200 (ENARGAS)** con pérdidas de carga de accesorios de **termofusión
(SIGAS Thermofusión® / NAG-E 210)** y de cañería roscada (hierro negro / epoxi).

## Qué hace

- **Cálculo por tramos**: cargás artefactos (consumos NAG-200 Tabla 1, editables),
  definís tramos con su longitud real y sus accesorios, y la app elige el menor
  diámetro comercial que cumple, recalculando la longitud equivalente de los
  accesorios **para cada diámetro candidato** (método iterativo de la norma).
- **Tabla completa de accesorios de termofusión** (Tabla Nº3 del Manual SIGAS):
  codos, tes, llaves esféricas, cuplas, bujes, transiciones a rosca, monturas.
- **Accesorios a rosca** según NAG-200 Tabla Nº18 (longitudes en diámetros).
- **Conversor de unidades**: kcal/h ↔ kJ/h ↔ kW ↔ m³/h, presiones, longitudes,
  caudales y diámetros comerciales.
- **Info**: método de cálculo, requisitos de la termofusión y tiempos de fusión.
- **Funciona offline** (service worker) — pensada para la obra.

## Motor de cálculo

```
Q [l/h] = √( 5 · di⁵ · h / (s · L) )
```

di = diámetro interior (mm) · h = pérdida de carga (mm c.a., 10 por norma) ·
s = densidad relativa (0,65 GN / 1,52 GLP) · L = longitud equivalente (m).

Verificado con tests (`npm test`) contra:

- SIGAS Thermofusión **Tabla 6** (GN) y **Tabla 4** (GLP): coincidencia < 0,5 %
- NAG-200 **Tabla 3** (hierro negro, usando di reales): error < 1,5 %
- Ejemplo resuelto del manual SIGAS (38,9 m³/h a 20 m → DN 63) ✓

## Desarrollo

```bash
npm install
npm run dev      # desarrollo
npm test         # tests del motor contra tablas oficiales
npm run build    # producción → dist/
```

## Mover a repo propio (recomendado)

Este proyecto vive temporalmente dentro de `lasac-pwa` porque la sesión no tenía
permisos para crear repos. Para independizarlo:

1. Crear repo vacío en GitHub (p. ej. `calcugas`).
2. ```bash
   git clone https://github.com/shynes1532/lasac-pwa -b claude/nuevo-proyecto-g426ca tmp
   cd tmp/calcugas && git init && git add -A && git commit -m "CalcuGas v0.1"
   git remote add origin https://github.com/shynes1532/calcugas
   git push -u origin main
   ```
3. Deploy en Vercel/Netlify apuntando a ese repo (framework: Vite).

## Descargo

Herramienta de ayuda para profesionales matriculados. No reemplaza el proyecto
aprobado ni la normativa de la distribuidora local.
