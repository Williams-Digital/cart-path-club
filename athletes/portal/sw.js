// CartPath Athlete Portal — minimal service worker
// Network-first for the portal HTML so updates roll out instantly;
// cache-first for static assets and fonts.

const CACHE = 'cartpath-portal-v2';
const STATIC = [
  '/assets/cartpath-shield.png',
  '/assets/favicon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(STATIC)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Don't cache API calls — always fresh
  if (url.hostname.includes('execute-api')) return;

  // Network-first for HTML. Cache the document under a token-stripped key so a
  // single stale entry can't pin one ?token= URL, and ignore the query string
  // when matching the fallback. The token is never persisted in the cache.
  if (req.mode === 'navigate' || req.destination === 'document') {
    const docKey = new Request(url.origin + url.pathname);
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(docKey, copy));
        return res;
      }).catch(() => caches.match(docKey, { ignoreSearch: true }))
    );
    return;
  }

  // Cache-first for static
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res.ok && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
