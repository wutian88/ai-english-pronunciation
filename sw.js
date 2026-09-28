const CACHE="ai-english-v2";
const ASSETS=["./","index.html","styles.css","app.js","manifest.webmanifest","icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener("fetch",e=>{
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(()=>caches.match("./")));
    return;
  }
  e.respondWith(fetch(e.request).then(response=>{
    if(response.ok && new URL(e.request.url).origin === self.location.origin){
      const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(e.request,copy));
    }
    return response;
  }).catch(()=>caches.match(e.request)));
});
