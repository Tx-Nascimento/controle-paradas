const CACHE_NAME = "paradas-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener("push", event => {
  const data = event.data?.json() || {};

  self.registration.showNotification(
    data.title || "Controle de Paradas",
    {
      body: data.body || "Nova notificação",
      icon: "/icon-192.png"
    }
  );
});
