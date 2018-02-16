const cacheName = "sw-test-v3"

const filesToCache = [
    'index.html',
    'index.js',
    'main.css',
    'assets/icon.png',
    'assets/icon-2x.png',
    'manifest.json'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {cache.addAll(filesToCache)})
        .then(() => {
            console.log('Service worker installed!')
            self.skipWaiting()
        })
    )
})

self.addEventListener('activate', event => {
    console.log('sw activated!')
    if (self.clients && clients.claim) {
        clients.claim()
    }
})

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)

    if (url.pathname === '.') {
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

self.addEventListener('sync', event => {
    if (event.tag.startsWith('send-todo')) {
        event.waitUntil(
            sendTodo(event)
        )
    }
})

function sendTodo(event) {
    const todoNumber = event.tag.split('-').slice(-1)[0]
    const todo = `todo${todoNumber}`
    console.log(`${todo} SENT!`)
    broadcast({action: 'todo-sent', todo})
}

function broadcast(message) {
    clients.matchAll().then(clients => {
        for (const client of clients) {
            client.postMessage(message)
        }
    })
}
