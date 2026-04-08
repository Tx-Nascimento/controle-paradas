self.addEventListener('install', () => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', () => {
  // simples (sem cache por enquanto)
});