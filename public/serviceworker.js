const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    const url = new URL(req.url);
    if(url.origin === location.origin)
    {
        event.respondWith(cacheFirst(req));
    }
   else
   {
       event.respondWith(networkFirst(req));
   }
});
async function cacheFirst(req)
{
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}
async function networkFirst(req)
{
    const cache = await caches.open('articles-dynamic');
    try{
        const res = await fetch(req);
        cache.put(req,res.clone());
    }
    catch(error)
    {
        return await cache.match(req);
    }
}
// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});