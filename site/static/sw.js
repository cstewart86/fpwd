'use strict';

const version = 'VO03082019::';
// Caches for different resources
const coreCacheName = version + 'core';
const pagesCacheName = version + 'pages';
const assetsCacheName = version + 'assets';

// Resources that will be always be cached
const coreCacheUrls = [
  "/",
  "/volunteer/",
  "/donate/",
  "/news/",
  "/contact/",
  "/img/hero.jpg",
  "/css/style.css",  
  "/js/nav.js",
  "/js/lazyload.js",
  "/js/share.js",
  "/js/install-pwa.js"
];

function updateCoreCache() {
  return caches.open(coreCacheName)
    .then( cache => {
      // Make installation contingent on storing core cache items
      return cache.addAll(coreCacheUrls);
    });
}

function addToCache(cacheName, request, response) {
  caches.open(cacheName)
    .then( cache => cache.put(request, response) );
}

    // Trim specified cache to max size
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(function(cache) {
    cache.keys().then(function(keys) {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

    // Remove old caches that done't match current version
function clearCaches() {
  return caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(key) {
        return key.indexOf(version) !== 0;
      }).map(function(key) {
        return caches.delete(key);
      })
    );
  });
}

    // Check if request is something SW should handle
function shouldFetch(event) {
  let request = event.request;
  let url = new URL(request.url);

  return (request.method === 'GET' && url.origin === self.location.origin);
}

self.addEventListener('install', event => {
  event.waitUntil(updateCoreCache()
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clearCaches().then( () => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('message', event => {
  if (event.data.command == 'trimCaches') {
    trimCache(pagesCacheName, 20);
    trimCache(assetsCacheName, 20);
  }
});


self.addEventListener('fetch', event => {

  let request = event.request,
      acceptHeader = request.headers.get('Accept');

  // Do not respond to non-GET requests
  if (!shouldFetch(event)) {
    event.respondWith(
      fetch(request)
        .catch( () => {
          return caches.match('/offline/');
        })
      );
    return;
  }

  // HTML Requests
  if (acceptHeader.indexOf('text/html') !== -1) {
    // Try network first
    event.respondWith(
      fetch(request)
        .then(response => {
          addToCache(pagesCacheName, request, response.clone());
          return response;
        })
      // Try cache second with offline fallback
      .catch( () => {
        return caches.match(request).then( response => {
            return response || caches.match('/offline/');
        });
      })
    );

  // Non-HTML Requests
  } else if (acceptHeader.indexOf('text/html') == -1) {
    event.respondWith(
      caches.match(request)
        .then( response => {
          // Try cache, then network, then offline fallback
          return response || fetch(request)
            .then( response => {
              addToCache(assetsCacheName, request, response.clone());
              return response;
            })
          .catch( () => {
            return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' }});
          });
      })
    );
  }
});
