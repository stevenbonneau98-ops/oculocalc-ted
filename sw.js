// EyeCalc Service Worker — caches everything for offline use.
const CACHE = 'eyecalc-v2-3-0';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './favicon-32.png',
  './assets/frisen/frisen-0.jpg',
  './assets/frisen/frisen-1.jpg',
  './assets/frisen/frisen-2.jpg',
  './assets/frisen/frisen-3.jpg',
  './assets/frisen/frisen-4.jpg',
  './assets/frisen/frisen-5.jpg',
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
  const req = e.request;
  const isHTML = req.mode === 'navigate' ||
    (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'));

  if (isHTML) {
    // Network-first for HTML so edits show up immediately; fall back to cache offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets.
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
