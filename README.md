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

## 📞 Soporte

Desarrollado para LASAC - Liendo Automotores S.A.C.
Tierra del Fuego, Argentina 🇦🇷
