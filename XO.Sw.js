"use strict"
var CACHE_NAME = 'my-site-cache-v1';
var offlineFundamentals = [
    "",
    "/",
    "app.js",
    "src/styles/style.css",
    "src/styles/src/XO.css",
    "src/styles/src/large.css",
    "src/styles/src/medium.css",
    "src/styles/src/small.css",
    "src/styles/src/standard.css",
    "src/scripts/XO.js",
    "src/scripts/XO.Pwa.js",
    "src/scripts/XO.Spa.js",
    "src/scripts/XO.Engine.js",
    "src/scripts/XO.AbstractView.js",
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(offlineFundamentals);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                function(response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});