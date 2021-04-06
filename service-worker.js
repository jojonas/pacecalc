const cacheName = "pacecalc";

const filesToCache = [
  "/",
  "/index.html",
  "/favicon.png",
  "/icons/icon-72.png",
  "/icons/icon-96.png",
  "/icons/icon-120.png",
  "/icons/icon-128.png",
  "/icons/icon-144.png",
  "/icons/icon-152.png",
  "/icons/icon-180.png",
  "/icons/icon-192.png",
  "/icons/icon-384.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/build/bundle.css",
  "/build/bundle.js",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async function () {
      const response = await caches.match(e.request);
      return response || fetch(e.request);
    })()
  );
});
