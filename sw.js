// Service worker: makes the site installable. Nothing is cached (the app talks to Google Sheets live),
// but the fetch handler really responds, so Chrome counts it as a valid installable PWA.
var VERSION = 'as-sw-2';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(function () {
        return new Response(
          '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
          '<body style="margin:0;background:#071430;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center">' +
          '<div><h2>ইন্টারনেট সংযোগ নেই</h2><p>সংযোগ ফিরলে আবার চেষ্টা করুন।</p></div>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      })
    );
    return;
  }
  e.respondWith(fetch(req));
});
