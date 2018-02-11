const cacheName = "sw-test-v1"

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {cache.addAll([
            'index.html',
            'index.js',
            'main.css',
            'assets/icon.png',
            'assets/icon-2x.png'
        ])})
        .then(() => {
            console.log('Service worker installed!')
        })
    )
})

self.addEventListener('activate', event => {
    console.log('hello')
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    )
})