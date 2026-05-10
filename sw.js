// EyeCalc Service Worker — caches everything for offline use.
const CACHE = 'eyecalc-v2-0-0';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './favicon-32.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Cache-first strategy: serve from cache, fall back to network.
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
