# LASAC PWA - Concesionario Oficial FIAT

App móvil (PWA) para Liendo Automotores S.A.C. - Concesionario Oficial FIAT en Tierra del Fuego.

## 🚀 Instalación Rápida

### Opción 1: Usando Claude Code (Recomendado)

Abrí Claude Code en la carpeta del proyecto y decile:

```
Instalá las dependencias y corré el proyecto
```

### Opción 2: Manual

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

## 📱 Agregar Imágenes de Vehículos

1. Creá la carpeta `public/images/`
2. Copiá las imágenes con estos nombres:
   - `mobi.png`
   - `argo.png`
   - `cronos.png`
   - `pulse.png`
   - `fastback.png`
   - `fiat600.png`
   - `strada.png`
   - `toro.png`
   - `titano.png`
   - `fiorino.png`

3. Actualizá las URLs en `src/App.jsx` (líneas 14-24):

```javascript
const imagenes = {
  mobi: '/images/mobi.png',
  argo: '/images/argo.png',
  // ... etc
};
```

## 🎨 Agregar Logo

1. Creá la carpeta `public/icons/`
2. Generá iconos en estos tamaños (podés usar https://realfavicongenerator.net):
   - icon-72x72.png
   - icon-96x96.png
   - icon-128x128.png
   - icon-144x144.png
   - icon-152x152.png
   - icon-192x192.png
   - icon-384x384.png
   - icon-512x512.png

## 🌐 Publicar en Vercel (Gratis)

1. Creá cuenta en https://vercel.com
2. Conectá tu repositorio de GitHub
3. Vercel detecta automáticamente que es un proyecto Vite
4. ¡Listo! Te da una URL tipo `lasac.vercel.app`

### Comandos para GitHub:

```bash
git init
git add .
git commit -m "LASAC PWA inicial"
git remote add origin https://github.com/TU_USUARIO/lasac-pwa.git
git push -u origin main
```

## 📂 Estructura del Proyecto

```
lasac-pwa/
├── public/
│   ├── icons/          # Iconos de la app
│   ├── images/         # Imágenes de vehículos
│   ├── manifest.json   # Configuración PWA
│   └── sw.js           # Service Worker
├── src/
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Entrada de React
│   └── index.css       # Estilos Tailwind
├── index.html          # HTML principal
├── package.json        # Dependencias
├── vite.config.js      # Config de Vite
└── tailwind.config.js  # Config de Tailwind
```

## 🔧 Personalización

### Cambiar precios
Editá el array `catalogo` en `src/App.jsx` (línea ~50)

### Cambiar stock
Editá el array `stockOportunidad` en `src/App.jsx` (línea ~80)

### Cambiar planes de ahorro
Editá el array `planesAhorro` en `src/App.jsx` (línea ~110)

### Cambiar números de WhatsApp
Buscá los números en el código y reemplazalos:
- Ventas: `5492964487924`
- Service Ushuaia: `5492901559933`
- Service Río Grande: `5492964465050`

## 🛰️ Radar de Mercado (uso interno)

Pantalla interna para el equipo comercial. Busca en la web con **Exa** a través del
**AI Gateway de Vercel** y devuelve un informe con hallazgos, impacto para LASAC,
acciones sugeridas y links a las notas originales.

**No aparece en la navegación del cliente.** Se entra por hash:

```
https://<tu-dominio>/#radar
```

### Configuración en Vercel

En `Project → Settings → Environment Variables` (ver `.env.example`):

| Variable | Obligatoria | Para qué |
|---|---|---|
| `AI_GATEWAY_API_KEY` | Sí | Key del AI Gateway. La búsqueda de Exa se enruta por el Gateway: **no hace falta una API key de Exa** |
| `RADAR_ACCESS_CODE` | Sí | Código interno que se pide antes de dejar buscar. Sin esta variable el endpoint no responde |
| `RADAR_MODEL` | No | Modelo del Gateway (default `anthropic/claude-opus-5`) |
| `RADAR_MAX_DIA` | No | Tope de búsquedas por día (default `120`) |

Cada búsqueda del radar consume una request de Exa en el Gateway, así que el endpoint
tiene tres frenos: código de acceso, límite por IP (20/hora) y tope diario. Además cachea
30 minutos cada consulta repetida.

### Ejes disponibles

`Competencia` · `Nuestras marcas` · `Plan de Ahorro` · `Mercado` · `Tierra del Fuego` · `Búsqueda libre`

Cada eje filtra por dominios de prensa automotriz/económica argentina y por fecha
(7, 30 o 90 días). Se editan en `src/data/radar.js`.

### Archivos

```
api/radar.js                      # función serverless (Exa vía AI Gateway)
src/data/radar.js                 # presets, dominios y períodos (compartido front/back)
src/components/RadarMercado.jsx   # pantalla interna (se carga aparte del bundle del cliente)
```

> ⚠️ Los precios que aparecen en el informe son referencias de prensa, no listas
> oficiales de LASAC. La pantalla lo aclara, pero conviene verificar antes de usar
> un dato con un cliente.

## 📞 Soporte

Desarrollado para LASAC - Liendo Automotores S.A.C.
Tierra del Fuego, Argentina 🇦🇷
