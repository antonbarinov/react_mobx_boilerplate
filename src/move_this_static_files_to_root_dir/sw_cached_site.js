const cacheName = 'v1';

const defaultRequest = new Request('/');

function defaultResponse() {
    return caches.match(defaultRequest.clone());
}

// Call Install Event
self.addEventListener('install', async e => {
    console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
});

const respHandler = async (e) => {
    let res;
    try {
        res = await fetch(e.request);

        // Open cache
        const cache = await caches.open(cacheName);

        // Add response to cache
        cache.put(e.request, res.clone()).catch(console.error);

        // Update main page cache
        if (e.request.mode === 'navigate') cache.put('/', res.clone()).catch(console.error);
    } catch (err) {
        res = await caches.match(e.request);

        // Return index page
        if (res === undefined && e.request.mode === 'navigate') {
            res = defaultResponse();
        }
    }

    return res;
};

// Call Fetch Event
self.addEventListener('fetch', async e => {
    if (e.request.method !== 'GET') return;

    e.respondWith(
        respHandler(e)
    );
});
