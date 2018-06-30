importScripts('cache-polyfill.js');


const cacheName = 'ccApp_v2';

self.addEventListener('install', (event) => {

    event.waitUntil(
        //I cache the currencies
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                '/',
                'index.html',
                'main.js',
                'main.css',
                'cache-polyfill.js',
                'https://free.currencyconverterapi.com/api/v5/currencies',
                'https://free.currencyconverterapi.com/api/v5/countries'
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
    
    // if(url == 'https://free.currencyconverterapi.com/api/v5/currencies'){
    //     console.log("Intercepted");
    // }
    
});

