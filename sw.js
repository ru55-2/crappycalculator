



const cacheName = 'v1'

const cacheAssets = [
    'index.html',
    'home.html',
    'style.css',
    'game.html',
   'login.html'
]


//install service worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installed');
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('service worker: chaceing files');
            cache.addAll(cacheAssets)
        })
        .then(() => self.skipWaiting())
    );
});

//activate the service worker
self.addEventListener('activate' , (e) => {
    console.log("[ServiceWorker]: Activated");
    
    //remove old caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                //look at all the cache names
                cacheNames.map(cache => {
                    //if the current cache name !== cacheName then delete it
                    if(cache !== cacheName){
                        console.log('service worker: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})



self.addEventListener('fetch' , (e) => {
    console.log("Fetch request : fetching");

    e.respondWith(
        caches.match(e.request).then(cachedResponse => {
            //if yes then serve the files
            if (cachedResponse){
                console.log("Found in Cache")
                return cachedResponse;
            }
            //else do on http request to the server
            return fetch(e.request)
        })
    )
})