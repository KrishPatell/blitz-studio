// Authoring originals stay in assets; pages use efficient responsive derivatives.
import {createRequire} from 'node:module';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
const require=createRequire(import.meta.url);
const sharp=require(process.env.BLITZ_SHARP_PACKAGE||'sharp');
const root=resolve('dist'),html=await readFile(resolve(root,'index.html'),'utf8');
let existing=[];try{existing=JSON.parse(await readFile('docs/uat/image-optimization.json','utf8'))}catch{}
const paths=[...new Set([...existing.map(row=>row.source),...[...html.matchAll(/(?:src|poster)="(assets\/[^"?]+\.(?:png|jpe?g))"/g)].map(m=>m[1])])];
const mapping={},metrics=[];
for(const path of paths){
 if(/(?:mark|favicon|clients\/)/.test(path))continue;
 const input=resolve(root,path),meta=await sharp(input).metadata();
 if((await stat(input)).size<12000)continue;
 const base=path.slice(0,-extname(path).length),widths=[480,960,1440].filter(w=>w<meta.width);widths.push(Math.min(meta.width,1600));
 const variants=[];
 for(const width of [...new Set(widths)].sort((a,b)=>a-b)){
  const out=`${base}-${width}.webp`;await sharp(input).resize({width,withoutEnlargement:true}).webp({quality:86,effort:6}).toFile(resolve(root,out));variants.push({path:out,width,bytes:(await stat(resolve(root,out))).size});
 }
 mapping[path]=variants;metrics.push({source:path,bytes:(await stat(input)).size,variants});
}
await mkdir('docs/uat',{recursive:true});let previous=[];try{previous=JSON.parse(await readFile('docs/uat/image-optimization.json','utf8'))}catch{}
await writeFile('docs/uat/image-optimization.json',JSON.stringify([...previous.filter(p=>!metrics.some(m=>m.source===p.source)),...metrics],null,2));
let updated=html.replace(/<img\b[^>]*>/g,tag=>{
 const src=tag.match(/src="([^"]+)"/)?.[1],variants=mapping[src];if(!variants)return tag;
 const largest=variants.at(-1),sizes=/ourprocess/.test(tag)?'(max-width: 743px) 92vw, 960px':/testimonials/.test(tag)?'(max-width: 743px) 90vw, 650px':/casestudy/.test(tag)?'(max-width: 743px) 90vw, 560px':'(max-width: 743px) 90vw, 760px';
 return tag.replace(`src="${src}"`,`src="${largest.path}" srcset="${variants.map(v=>v.path+' '+v.width+'w').join(', ')}" sizes="${sizes}"`);
});
updated=updated.replace(/poster="([^"]+)"/g,(match,src)=>mapping[src]?`data-poster="${mapping[src].find(v=>v.width>=960)?.path||mapping[src].at(-1).path}"`:match);
await writeFile(resolve(root,'index.html'),updated);
console.log(`Optimized ${metrics.length} images; originals retained.`);
