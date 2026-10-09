// No client dependencies or bundler: combine render-blocking CSS and version scripts.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const cssFiles=['styles.css','blitz.css','footer.css','contact.css','refinements.css','mobile.css','stories.css','privacy.css','consistency.css'];
const css=(await Promise.all(cssFiles.map(file=>readFile('dist/'+file,'utf8')))).join('\n');
await writeFile('dist/site.css',css);
let html=await readFile('dist/index.html','utf8');
// This single-page site inlines its compact, gzipped CSS to avoid a second blocking host round trip.
const styleTag=`<style id="site-styles">${css}</style>`;
html=html.replace(/<style id="site-styles">[\s\S]*?<\/style>/g,'');
html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*\/?>/g,'');
html=html.replace('</head>',styleTag+'</head>');
for(const file of ['app.js','footer.js','case-study-motion.js','privacy.js','site-ui.js']){
 const hash=createHash('sha256').update(await readFile('dist/'+file)).digest('hex').slice(0,12);
 html=html.replace(new RegExp(file.replace('.','\\.')+'(?:\\?v=[^"\\s]+)?','g'),file+'?v='+hash);
}
// Changing a video or poster invalidates browser caches as well as scripts/styles.
for(const match of [...html.matchAll(/(data-src|poster|href)="(assets\/[^"?]+\.(?:mp4|webp))(?:\?v=[^"]+)?"/g)]){
 const hash=createHash('sha256').update(await readFile('dist/'+match[2])).digest('hex').slice(0,12);
 html=html.replace(match[0],`${match[1]}="${match[2]}?v=${hash}"`);
}
await writeFile('dist/index.html',html);
console.log('Built dependency-free static site with inline CSS and versioned scripts/media.');

await import('./build-policy-pages.mjs');
