// Minimal service worker: it only exists so Chrome treats the site as installable.
// It does not cache anything (the app talks to Google Sheets live), so nothing can go stale.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) { /* pass-through: let the network handle it */ });
