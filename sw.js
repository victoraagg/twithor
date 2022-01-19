const STATIC_CACHE = 'cache-v2';

const APP_SHELL = [
    './img/favicon.ico',
    './img/icons/icon-144x144.png',
    './img/avatars/ironman.jpg',
    './img/avatars/wolverine.jpg',
    './img/avatars/spiderman.jpg',
    './img/avatars/hulk.jpg',
    './img/avatars/thor.jpg',
    './css/animate.css',
    './css/style.css',
    './js/libs/jquery.js',
    './js/app.js',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
]

self.addEventListener('install', e => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache => {
        cache.addAll(APP_SHELL);
    })
    e.waitUntil( Promise.all([cacheStatic]) );
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

self.addEventListener('fetch', event => {
    const response = caches.match(event.request)
    .then( res => {
        if(res) return res;
        return fetch(event.request);
    })
    event.respondWith(response);
})