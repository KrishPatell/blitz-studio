// No client dependencies or bundler: combine render-blocking CSS and version scripts.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const cssFiles=['styles.css','blitz.css','footer.css','contact.css','refinements.css','mobile.css'];
const css=(await Promise.all(cssFiles.map(file=>readFile('dist/'+file,'utf8')))).join('\n');
await writeFile('dist/site.css',css);
let html=await readFile('dist/index.html','utf8');
const styleTag=`<link rel="stylesheet" href="site.css?v=${createHash('sha256').update(css).digest('hex').slice(0,12)}"/>`;
let replaced=false;
html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*\/?>/g,()=>{if(replaced)return '';replaced=true;return styleTag});
for(const file of ['app.js','footer.js','case-study-motion.js']){
 const hash=createHash('sha256').update(await readFile('dist/'+file)).digest('hex').slice(0,12);
 html=html.replace(new RegExp(file.replace('.','\\.')+'(?:\\?v=[^"\\s]+)?','g'),file+'?v='+hash);
}
await writeFile('dist/index.html',html);
console.log('Built dependency-free static site with one versioned stylesheet.');
