if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const t=s=>i(s,l),u={module:{uri:l},exports:o,require:t};e[l]=Promise.all(n.map((s=>u[s]||t(s)))).then((s=>(r(...s),o)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"3567de8f2cb55016a9018a8fbab4c8de"},{url:"assets/Box-bRcen-H5.js",revision:null},{url:"assets/Button-hhEbow5x.js",revision:null},{url:"assets/Container--g_0yjYT.js",revision:null},{url:"assets/dialog-E9f0uGn8.js",revision:null},{url:"assets/favorites-ktiRooGm.js",revision:null},{url:"assets/index-BDZr12Im.css",revision:null},{url:"assets/index-NQcnBVEJ.js",revision:null},{url:"assets/index-zEBb2vpe.js",revision:null},{url:"assets/MenuItem-DjKhSq1N.js",revision:null},{url:"assets/new-recipe-H3TtgHmq.js",revision:null},{url:"assets/recipe-Blq2971s.js",revision:null},{url:"assets/recipe-description-q4fMpyRc.js",revision:null},{url:"assets/recipe-ingredients-LXcFLQFS.js",revision:null},{url:"assets/recipe-steps-qgyiQ0Nx.js",revision:null},{url:"assets/shopping-list-B0bq3-B4.js",revision:null},{url:"assets/signin-sgcgYPgW.js",revision:null},{url:"assets/signup-YkXirkTr.js",revision:null},{url:"index.html",revision:"253499bc24ad6759df39264a120e94ea"},{url:"registerSW.js",revision:"f0d9b157408848a78a59d3e05ea0db70"},{url:"img/android-chrome-192x192.png",revision:"188a9230b65eb9bc169af13beb4c4b5e"},{url:"img/android-chrome-512x512.png",revision:"52d1d3361958c820f08929149518af6a"},{url:"manifest.webmanifest",revision:"9fbe15f33ebb02f2524a735ec434f6e0"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
