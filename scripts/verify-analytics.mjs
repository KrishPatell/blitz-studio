import {readdir,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const files=(await readdir('dist')).filter(file=>file.endsWith('.html'));
for(const file of files){
 const html=await readFile('dist/'+file,'utf8');
 const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
 assert.ok(head,`${file}: missing head`);
 assert.equal((html.match(/https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-E9JLN2HQNT/g)||[]).length,1,`${file}: missing/duplicate loader`);
 assert.match(head,/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-E9JLN2HQNT"><\/script>/);
 const init=[...head.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.includes("gtag('config', 'G-E9JLN2HQNT')"));
 assert.equal(init.length,1,`${file}: missing/duplicate initialization`);
 const context={};context.window=context;vm.createContext(context);vm.runInContext(init[0],context);
 assert.deepEqual(Array.from(context.dataLayer[0]).slice(0,1),['js']);
 assert.deepEqual(Array.from(context.dataLayer[1]),['config','G-E9JLN2HQNT']);
}
const privacy=await readFile('dist/privacy.js','utf8');
assert.ok(!privacy.includes('No analytics or advertising trackers'));
for(const file of ['privacy.html','cookies.html','cookie-settings.html']) assert.ok((await readFile('dist/'+file,'utf8')).includes('Google Analytics'),`${file}: missing disclosure`);
console.log(`PASS: exactly one asynchronous Google tag and matching initialization in all ${files.length} page heads; privacy disclosures match.`);
