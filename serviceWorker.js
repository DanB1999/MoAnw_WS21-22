const staticDevCoffee = "dev-coffee-site-v1";
var urlsToCache = [
  '/',
  'images/t'
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key != v) return caches.delete(key);
    }));
  }));
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    skipWaiting();
  }
});
