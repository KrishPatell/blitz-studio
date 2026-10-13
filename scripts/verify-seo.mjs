import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const json=async file=>JSON.parse(await readFile(file,'utf8'));
const config=await json('content/seo.json'),studio=await json('content/studio.json'),{projects}=await json('content/portfolio.json');
const origin=process.env.SEO_SITE_ORIGIN||config.deploymentOrigin;
const indexing=origin===config.launchOrigin||config.indexPreview;
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const attributes=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],decode(m[2])]));
const pages=(await readdir('dist')).filter(file=>file.endsWith('.html'));
assert.equal(pages.length,22,'Five existing pages and all seventeen portfolio pages must be present.');
const titles=new Set(),descriptions=new Set(),indexable=[];
for(const file of pages){
 const html=await readFile('dist/'+file,'utf8'),head=html.slice(0,html.indexOf('</head>'));
 const metadata=[...head.matchAll(/<meta\b[^>]*>/g)].map(m=>attributes(m[0]));
 const links=[...head.matchAll(/<link\b[^>]*>/g)].map(m=>attributes(m[0]));
 const meta=(name,property=false)=>{const matches=metadata.filter(item=>item[property?'property':'name']===name);assert.equal(matches.length,1,`${file}: ${name} must occur once`);return matches[0].content};
 const canonical=links.filter(item=>item.rel==='canonical');assert.equal(canonical.length,1,file);
 const expected=origin+(file==='index.html'?'/':'/'+file);assert.equal(canonical[0].href,expected);
 const title=decode(head.match(/<title>([\s\S]*?)<\/title>/)[1]);assert(!titles.has(title),`${file}: duplicate title`);titles.add(title);
 const description=meta('description');assert(!descriptions.has(description),`${file}: duplicate description`);descriptions.add(description);assert(description.length>=70&&description.length<230,file);
 assert.equal([...html.matchAll(/<h1\b/g)].length,1,`${file}: one primary heading`);
 const anonymous=projects.some(project=>file===`work-${project.id}.html`&&project.disclosure==='anonymous');
 const shouldIndex=indexing&&file!=='cookie-settings.html'&&!anonymous;
 assert.equal(meta('robots').split(',')[0],shouldIndex?'index':'noindex',file);if(shouldIndex)indexable.push(expected);
 assert.equal(meta('og:url',true),expected);assert.equal(meta('og:title',true),title);assert.equal(meta('og:description',true),description);
 assert.equal(meta('twitter:card'),'summary_large_image');assert.equal(meta('twitter:title'),title);assert.equal(meta('twitter:description'),description);
 const image=new URL(meta('og:image',true));assert.equal(image.origin,origin);assert.equal(meta('twitter:image'),image.href);assert(meta('og:image:alt',true).length>5);
 const dimensions=await sharp('dist'+decodeURIComponent(image.pathname)).metadata();assert.equal(Number(meta('og:image:width',true)),dimensions.width);assert.equal(Number(meta('og:image:height',true)),dimensions.height);assert.equal(meta('og:image:type',true),'image/'+dimensions.format);
 const blocks=[...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];assert.equal(blocks.length,1,file);
 const data=JSON.parse(blocks[0][1]);assert.equal(data['@context'],'https://schema.org');assert(!/AggregateRating|"@type":"Review"|FAQPage/.test(blocks[0][1]),'No invented ratings or self-serving rich-result claims.');
 const graph=data['@graph'];assert.equal(new Set(graph.map(entity=>entity['@id'])).size,graph.length);
 const organization=graph.find(entity=>entity['@type']==='Organization');assert.equal(organization.name,studio.businessName);assert.equal(organization.email,studio.email);assert.equal(organization.url,origin+'/');
 assert.deepEqual(organization.sameAs,config.organizationProfiles);assert.equal(organization.logo.width,512);assert.equal(organization.address.addressCountry,'SG');assert.equal(organization.address.postalCode,'319773');
 assert.equal(graph.find(entity=>entity['@type']==='WebPage').url,expected);
 if(file.startsWith('work-')){assert(graph.some(entity=>entity['@type']==='CreativeWork'));assert(graph.some(entity=>entity['@type']==='BreadcrumbList'));}
 for(const rel of ['icon','apple-touch-icon','manifest'])assert(links.some(link=>link.rel===rel),`${file}: ${rel} missing`);
}
const sitemap=await readFile('dist/sitemap.xml','utf8');assert(sitemap.includes('http://www.sitemaps.org/schemas/sitemap/0.9'));
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>decode(m[1]));assert.deepEqual(locations.sort(),indexable.sort());assert.equal(new Set(locations).size,locations.length);
const robots=await readFile('dist/robots.txt','utf8');assert(robots.includes('User-agent: *')&&robots.includes('Allow: /'));assert.equal(robots.includes('Sitemap: '+origin+'/sitemap.xml'),Boolean(indexing));
assert(!robots.includes('Disallow: /assets')&&!robots.includes('Noindex:'));
for(const size of [16,32,48,96,192,512]){const dimensions=await sharp(`dist/assets/icons/icon-${size}.png`).metadata();assert.equal(dimensions.width,size);assert.equal(dimensions.height,size);}
const apple=await sharp('dist/apple-touch-icon.png').metadata();assert.equal(apple.width,180);assert.equal(apple.height,180);
const ico=await readFile('dist/favicon.ico');assert.equal(ico.readUInt16LE(2),1);assert.equal(ico.readUInt16LE(4),3);
for(let i=0;i<3;i++){const start=6+i*16,length=ico.readUInt32LE(start+8),offset=ico.readUInt32LE(start+12);const dimensions=await sharp(ico.subarray(offset,offset+length)).metadata();assert.equal(dimensions.width,[16,32,48][i]);}
const manifest=await json('dist/site.webmanifest');assert.equal(manifest.start_url,'/');assert.equal(manifest.scope,'/');assert.equal(manifest.name,studio.businessName);
for(const icon of manifest.icons){const dimensions=await sharp('dist/'+icon.src).metadata();assert.equal(icon.sizes,`${dimensions.width}x${dimensions.height}`);}assert(manifest.icons.some(icon=>icon.purpose==='maskable'));
const social=await sharp('dist/'+config.socialImage).metadata();assert.equal(social.width,1200);assert.equal(social.height,630);
const home=await readFile('dist/index.html','utf8');for(const project of projects)assert(home.includes(`href="work-${project.id}.html"`),`${project.name}: crawlable project link missing`);
console.log(JSON.stringify({status:'PASS',pages:pages.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,sitemapURLs:indexable.length,origin,indexing:!!indexing,icons:'ICO 16/32/48, PNG 16/32/48/96/192/512, Apple 180, maskable 512',structuredData:'Organization, WebSite, WebPage, CreativeWork, ImageObject, BreadcrumbList',socialCard:'1200 × 630',projectLinks:projects.length},null,2));
