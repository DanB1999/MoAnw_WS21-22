var staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/new.js',
];
var number = 9; 

self.addEventListener('install', function(event) {
  self.skipWaiting();
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  console.log("Install Service Worker")
  event.waitUntil(
    // We open a cache…
    caches
    .open('simple-sw-v1')
    .then(function(cache) {
      // And add resources to it
      return cache.addAll([
        './',
        '/index.html',
        '/css/style.css',
        '/js/new.js'
      ])
    })
  );
});
self.addEventListener('installed', function(event)  {
  console.log("Service Worker installed");
  //Alten Cache löschen 
  /*
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
  */
})

self.addEventListener('activate', async (event) => {
  console.log("Service Worker activate")
  //neuen Cache schreiben
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    skipWaiting();
  }
  
});


