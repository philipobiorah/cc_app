importScripts('cache-polyfill.js');


const cacheName = 'ccApp_v3';

self.addEventListener('install', (event) => {

    event.waitUntil(
        //Cache important stuffus
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

self.addEventListener('fetch', (event) => {

    let url = event.request.url;
    
    

    event.respondWith(
        //Respond with the cached response or if no response is saved,
        //respond with result from the network.
        caches.match(event.request).then((response) => {
            if(response) return response;
            return fetch(event.request);
        })
    )
    
  
});

