const CACHE_NAME = 'voucher-app-v2'; // ဗားရှင်းကို ပြောင်းလိုက်ပါတယ်
const urlsToCache = [
    '/mbs-vg081/',
    '/mbs-vg081/index.html',
    '/mbs-vg081/icons/icon-192x192.png',
    '/mbs-vg081/icons/icon-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

// Service Worker ကို ထည့်သွင်းတဲ့အခါ
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// ကက်ရှ်ထဲက ဖိုင်တွေကို ပြန်ယူတဲ့အခါ
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// ကက်ရှ်ကို အပ်ဒိတ်လုပ်တဲ့အခါ အဟောင်းတွေ ဖျက်ဖို့
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});