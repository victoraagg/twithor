const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html'
]

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300'
]

self.addEventListener('install', e => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    })
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => {
        cache.addAll(APP_SHELL_INMUTABLE);
    })
    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]) );
})

self.addEventListener('activate', e => {
    const response = caches.keys().then( keys => {
        keys.forEach( key => {
            if( key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        })
    })
    e.waitUntil(response);
})

self.addEventListener('fetch', e => {
    
})