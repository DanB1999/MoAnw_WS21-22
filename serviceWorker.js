var staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/new.js',
];
var number = 3; 

self.addEventListener("install", installEvent => {
  console.log("Installable");
  installEvent.waitUntil(
    caches
    .open(staticDevCoffee)
    .then(cache => {
      cache.addAll(assets);
    })
    .catch(console.log(" Service Worker installed"))
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        './',
        '/index.html',
        '/css/style.css',
        '/js/new.js'
      ]);
    })
  );
});
/*
self.addEventListener('activate', async (event) => {

  var cacheAllowlist = ['dev-coffee-site-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log("Alter Cache gelöscht");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
});
*/
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    skipWaiting();
  }
  
});


