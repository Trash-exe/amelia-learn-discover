const VERSION='__VER__';const SHELL='amelia-ld-shell-'+VERSION;
const PRE=['./','index.html','manifest.webmanifest','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(PRE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('amelia-ld-')&&k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin!==location.origin){if(u.host==='i.ytimg.com'){e.respondWith(caches.open(SHELL).then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}))))}return}
 if(!u.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 if(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/')){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{if(res.ok){const cl=res.clone();caches.open(SHELL).then(c=>c.put('index.html',cl))}return res}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
