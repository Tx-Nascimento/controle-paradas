const CACHE = "paradas-v3";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icon-192.png",
        "/icon-512.png",
        "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
        .then(networkResponse => {
          return networkResponse;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
