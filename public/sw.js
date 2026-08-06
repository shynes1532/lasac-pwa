const CACHE_NAME = 'lasac-pwa-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Instalación: cachea lo básico y activa inmediatamente
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activación: borra TODOS los caches viejos y toma control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia: SIEMPRE red primero, cache solo si no hay internet
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('wa.me') || event.request.url.includes('api.whatsapp')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Solo cacheamos respuestas propias (mismo origen) y exitosas.
        // Evita guardar recursos de terceros (OneSignal, CDNs) en el cache.
        const mismoOrigen = event.request.url.startsWith(self.location.origin);
        if (response && response.status === 200 && mismoOrigen) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((response) => {
          if (response) return response;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});