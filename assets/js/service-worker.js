// Service Worker pour PWA et Cache
const CACHE_NAME = 'ludovic-portfolio-v1';
const STATIC_CACHE_NAME = 'ludovic-portfolio-static-v1';
const DYNAMIC_CACHE_NAME = 'ludovic-portfolio-dynamic-v1';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
    '/index.html',
    '/projets.html',
    '/parcours.html',
    '/veille.html',
    '/contact.html',
    '/assets/css/css_index.css',
    '/assets/css/css_projet.css',
    '/assets/css/css_stages.css',
    '/assets/css/css_veille.css',
    '/assets/css/css_contact.css',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/hero-animation.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching static assets');
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.error('[Service Worker] Error caching static assets:', err);
            });
        })
    );
    
    self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE_NAME && 
                        cacheName !== DYNAMIC_CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    return self.clients.claim();
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorer les requêtes non-GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Stratégie: Cache First pour les assets statiques
    if (isStaticAsset(request.url)) {
        event.respondWith(cacheFirst(request));
        return;
    }
    
    // Stratégie: Network First pour les pages HTML
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(networkFirst(request));
        return;
    }
    
    // Stratégie: Stale While Revalidate pour les images
    if (isImage(request.url)) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }
    
    // Par défaut: Network First
    event.respondWith(networkFirst(request));
});

// Stratégie: Cache First
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);
        return new Response('Offline', { status: 503 });
    }
}

// Stratégie: Network First
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[Service Worker] Network failed, trying cache');
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Page offline par défaut pour les pages HTML
        if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Stratégie: Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    });
    
    return cachedResponse || fetchPromise;
}

// Helpers
function isStaticAsset(url) {
    return url.includes('/assets/css/') ||
           url.includes('/assets/js/') ||
           url.includes('/assets/fonts/');
}

function isImage(url) {
    return url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
}

