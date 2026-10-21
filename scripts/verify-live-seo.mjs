import {readFile,writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {resolveSeoEnvironment} from './seo-config.mjs';
const config=JSON.parse(await readFile('content/seo.json','utf8'));
const {projects}=JSON.parse(await readFile('content/portfolio.json','utf8'));
const {origin}=resolveSeoEnvironment(config);
const paths=['/',...Object.keys(config.policyPages).map(x=>'/'+x),...projects.map(x=>`/work-${x.id}.html`)];
const excluded=new Set(['/cookie-settings.html',...projects.filter(x=>x.disclosure==='anonymous').map(x=>`/work-${x.id}.html`)]);
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
async function request(url,options={}){
  for(let attempt=0;attempt<3;attempt++){
    try{return await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(20000),...options});}
    catch(error){if(attempt===2)throw error;}
  }
}
const checks=[],images=new Map(),titles=new Set(),descriptions=new Set();
for(const path of paths){
  const target=origin+path,response=await request(target);
  assert.equal(response.status,200,`${target}: canonical must return 200 without redirect`);
  assert.match(response.headers.get('content-type')||'',/text\/html/);
  assert(!/noindex/i.test(response.headers.get('x-robots-tag')||''),`${target}: unexpected response noindex`);
  const html=await response.text(),head=html.slice(0,html.indexOf('</head>'));
  const metas=[...head.matchAll(/<meta\b[^>]*>/g)].map(m=>attrs(m[0]));
  const meta=name=>metas.find(x=>x.name===name||x.property===name)?.content;
  const canonical=[...head.matchAll(/<link\b[^>]*>/g)].map(m=>attrs(m[0])).filter(x=>x.rel==='canonical');
  assert.equal(canonical.length,1,target);assert.equal(canonical[0].href,target,target);
  assert.equal(meta('og:url'),target,target);
  assert.equal(meta('robots')?.split(',')[0],excluded.has(path)?'noindex':'index',target);
  assert(!head.includes(config.previewOrigin),`${target}: staging metadata leaked`);
  const title=head.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  assert(title&&!titles.has(title),`${target}: empty or duplicate title`);titles.add(title);
  const description=meta('description');assert(description&&!descriptions.has(description),`${target}: empty or duplicate description`);descriptions.add(description);
  assert.equal([...html.matchAll(/<h1\b/g)].length,1,target);
  const schema=JSON.parse(head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]||'null');
  assert(schema?.['@graph']?.length,`${target}: missing schema`);
  const org=schema['@graph'].find(x=>x['@type']==='Organization');assert.equal(org.url,origin+'/');
  for(const image of [...html.matchAll(/<img\b[^>]*>/g)].map(m=>attrs(m[0])))assert('alt' in image,`${target}: image missing alt`);
  const social=meta('og:image');assert(social?.startsWith(origin+'/'),target);assert.equal(meta('twitter:image'),social);images.set(social,meta('og:image:type'));
  checks.push({url:target,status:response.status,canonical:canonical[0].href,robots:meta('robots'),title:decode(title),schema:true});
}
const robotsResponse=await request(origin+'/robots.txt');assert.equal(robotsResponse.status,200);const robots=await robotsResponse.text();
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));assert(!/^Disallow:\s*\/$/m.test(robots));
const sitemapResponse=await request(origin+'/sitemap.xml');assert.equal(sitemapResponse.status,200);const sitemap=await sitemapResponse.text();
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1])).sort();
assert.deepEqual(locations,paths.filter(path=>!excluded.has(path)).map(path=>origin+path).sort());
const redirects=[];
for(const [from,to] of [[`http://${new URL(origin).hostname}/`,origin+'/'],[`https://www.${new URL(origin).hostname}/`,origin+'/'],[origin+'/index.html',origin+'/'],[origin+'/contact',origin+'/#contact'],[origin+'/privacy',origin+'/privacy.html'],[origin+'/work-champion-ceramics',origin+'/work-champion-ceramics.html']]){
  const response=await request(from);assert([301,308].includes(response.status),`${from}: permanent redirect missing (${response.status})`);
  assert.equal(new URL(response.headers.get('location'),from).href,to,from);redirects.push({from,to,status:response.status});
}
const missing=await request(origin+'/seo-missing-route-probe');assert.equal(missing.status,404,'Missing pages must return 404');
for(const [url,type] of images){const response=await request(url,{method:'HEAD'});assert.equal(response.status,200,url);assert(response.headers.get('content-type')?.startsWith(type),`${url}: image type mismatch`);}
for(const [path,type] of [['/favicon.ico','image/'],['/apple-touch-icon.png','image/png'],['/site.webmanifest','application/']]){
  const response=await request(origin+path);assert.equal(response.status,200,path);assert(response.headers.get('content-type')?.startsWith(type),path);
}
const report={status:'PASS',checkedAt:new Date().toISOString(),origin,pages:checks.length,indexablePages:locations.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,checkedSocialImages:images.size,real404:true,redirects,checks};
await mkdir('output/seo-audit',{recursive:true});await writeFile('output/seo-audit/live-crawl.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,checks:undefined},null,2));
