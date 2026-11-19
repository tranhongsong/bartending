const CACHE='cocktail-v1';
const FILES=['./','index.html','tong-quan.html','lich-su.html','dung-cu.html','nguyen-lieu.html','ky-thuat.html','ly-va-da.html','cong-thuc.html','syrup.html','meo-pha-che.html','thuat-ngu.html','uong-co-trach-nhiem.html','manifest.webmanifest','assets/style.css','assets/app.js','assets/data.js','assets/recipes-ext.js','assets/recipes-c1.js','assets/recipes-c2.js','assets/recipes-c3.js','assets/recipes-m.js','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
