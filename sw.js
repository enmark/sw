const cacheName = "sw-test-v1"

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {cache.addAll([
            'index.html',
            'index.js',
            'main.css',
            'assets/icon.png',
            'assets/icon-2x.png',
            'manifest.json'
        ])})
        .then(() => {
            console.log('Service worker installed!')
        })
    )
})

self.addEventListener('activate', event => {
    console.log('sw activated!')
})

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)

    if (url.pathname === '/') {
        event.respondWith(caches.match('index.html')
            .then(response => response || fetch(event.request))
        )
        return
    }

    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    )
})