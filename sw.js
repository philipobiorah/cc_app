importScripts('/js/cache-polyfill.js');


const cacheName = 'ccApp_v1';

self.addEventListener('install', (event) => {

    event.waitUntil(
        //I cache the currencies
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                './',
                '/index.html',
                '/js/main.js',
                '/css/main.css',
                '/js/cache-polyfill.js',
                'https://free.currencyconverterapi.com/api/v5/currencies',
                'https://free.currencyconverterapi.com/api/v5/countries'
            ]);
        })
    )
});

self.addEventListener('fetch', (event) => {

    let url = event.request.url;
    
    //If the convert API is called
    // if(url.indexOf("v5/convert?") >= 0){

    //     let portion1 = url.substring(url.indexOf('=')+1);
    //     let query = portion1.slice(0, portion1.indexOf('&'));
        
    //     event.respondWith(
    //         caches.match(event.request).then(response => {
    //             if(response) return response;

    //             caches.open
    //         })
    //     );
    //     caches.match(url).then(response => {
    //         if(response) return response;

    //         caches.open(cacheName).then((cache) => {
    //             return cache.addAll(url);
    //         })

    //         return fetch(url);
    //     })
    // }

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

