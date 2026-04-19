const CACHE = "paradas-v5";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/manifest.json",
        "/icon-192.png",
        "/icon-512.png"
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // NÃO intercepta Supabase/API externas
  if (
    url.hostname.includes("supabase.co") ||
    url.hostname.includes("jsdelivr.net")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).catch(() => caches.match("/index.html"));
    })
  );
});
