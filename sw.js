importScripts('cache-polyfill.js');

const cacheName = 'ccApp_v3';          //cache Name declaration

self.addEventListener('install', (event) => {             //Install event for service worker

    event.waitUntil(
        //Cache important resources
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                'https://philipobiorah.github.io/cc_app/',
                'index.html',
                'main.js',
                'main.css',
                'cache-polyfill.js',
                'https://free.currencyconverterapi.com/api/v5/currencies',
                // 'https://free.currencyconverterapi.com/api/v5/countries'
            ]);
        })
    )
});

self.addEventListener('fetch', (event) => {        //Fetch event for service worker

    let url = event.request.url; 

    event.respondWith(
        // If no response is saved, respond with the cached response or,
        //respond with result from the network.
        caches.match(event.request).then((response) => {
            if(response) return response;
            return fetch(event.request);
        })
    )
    
  
});

