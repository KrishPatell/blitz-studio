import {readFile,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
const config=JSON.parse(await readFile('content/seo.json','utf8'));
const studio=JSON.parse(await readFile('content/studio.json','utf8'));
const {projects}=JSON.parse(await readFile('content/portfolio.json','utf8'));
const origin=process.env.SEO_SITE_ORIGIN||config.deploymentOrigin;
if(![config.deploymentOrigin,config.launchOrigin].includes(origin)||new URL(origin).protocol!=='https:')throw Error('SEO origin must be an approved deployed or launch origin.');
const allowIndexing=origin===config.launchOrigin||config.indexPreview;
const url=path=>new URL(path,origin+'/').href;
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const services=['UI/UX Design','Web & App Development','Graphic Design','2D Illustration','Logo & Brand Identity','Marketing Design'];
const organization={
 '@type':'Organization','@id':url('#organization'),name:studio.businessName,url:url('/'),description:config.homeDescription,email:studio.email,
 logo:{'@type':'ImageObject','@id':url('#logo'),url:url('assets/icons/icon-512.png'),contentUrl:url('assets/icons/icon-512.png'),width:512,height:512,caption:studio.businessName},
 sameAs:config.organizationProfiles,knowsAbout:studio.capabilities,
 address:[
  {'@type':'PostalAddress',streetAddress:'700 Lorong 1 Toa Payoh #06-04, Trellis Towers',addressLocality:'Singapore',postalCode:'319773',addressCountry:'SG'},
  {'@type':'PostalAddress',streetAddress:'109, Nalanda Complex, nr. Mansi Complex, Mahavir Nagar society, Vastrapur',addressLocality:'Ahmedabad',addressRegion:'Gujarat',postalCode:'380015',addressCountry:'IN'}
 ],
 contactPoint:{'@type':'ContactPoint',contactType:'Project enquiries',email:studio.email,availableLanguage:'English'},
 hasOfferCatalog:{'@type':'OfferCatalog',name:'Design and development services',itemListElement:services.map(name=>({'@type':'Offer',itemOffered:{'@type':'Service',name,provider:{'@id':url('#organization')}}}))}
};
// This public address must continue to match the verified studio source.
if(!studio.offices.some(office=>office.country==='Singapore'&&office.address?.includes('700 Lorong 1 Toa Payoh #06-04')&&office.address.includes('319773')))throw Error('Organization address requires a reviewed studio source.');
if(!studio.offices.some(office=>office.country==='India'&&office.address?.replaceAll('\n',' ')==='109, Nalanda Complex, nr. Mansi Complex, Mahavir Nagar society, Vastrapur, Ahmedabad, Gujarat 380015'))throw Error('India address must match the user-provided studio address.');
const website={'@type':'WebSite','@id':url('#website'),url:url('/'),name:config.siteName,inLanguage:config.language,publisher:{'@id':url('#organization')}};
const pages=[{file:'index.html',path:'/',title:config.homeTitle,description:config.homeDescription,index:true,image:config.socialImage,imageAlt:config.socialImageAlt},...Object.entries(config.policyPages).map(([file,data])=>({file,path:file,...data,image:config.socialImage,imageAlt:config.socialImageAlt})),...projects.map(project=>({file:`work-${project.id}.html`,path:`work-${project.id}.html`,title:projects.filter(item=>item.name===project.name).length>1?`${project.name} | ${project.category} | Blitz Studio`:`${project.name} | Design Portfolio | Blitz Studio`,description:`Explore ${project.name}, ${project.category.toLowerCase()} design work by Blitz Studio. View the visual portfolio showcase and discuss your next project.`,index:project.disclosure!=='anonymous',image:project.variants.at(-1).path,imageAlt:`${project.name} ${project.category} design showcase by Blitz Studio`,project}))];
for(const page of pages){
 const canonical=url(page.path),image=url(page.image),dimensions=await sharp('dist/'+page.image).metadata();
 const imageObject={'@type':'ImageObject','@id':canonical+'#primaryimage',url:image,contentUrl:image,width:dimensions.width,height:dimensions.height,caption:page.imageAlt};
 const webpage={'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:page.title,description:page.description,inLanguage:config.language,isPartOf:{'@id':url('#website')},publisher:{'@id':url('#organization')},primaryImageOfPage:{'@id':imageObject['@id']}};
 const graph=[organization,website,imageObject,webpage];
 if(page.project){
  const work={'@type':'CreativeWork','@id':canonical+'#project',name:page.project.name,description:page.description,url:canonical,image:{'@id':imageObject['@id']},creator:{'@id':url('#organization')},genre:page.project.category};
  webpage.mainEntity={'@id':work['@id']};graph.push(work);
  graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:[{'@type':'ListItem',position:1,name:studio.businessName,item:url('/')},{'@type':'ListItem',position:2,name:page.project.name,item:canonical}]});
 }else if(page.file==='index.html')webpage.mainEntity={'@id':url('#organization')};
 const robots=`${page.index&&allowIndexing?'index':'noindex'},follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1`;
 const metadata=`<!-- seo:start -->
<meta name="description" content="${esc(page.description)}"><meta name="robots" content="${robots}"><meta name="theme-color" content="#000b33"><link rel="canonical" href="${canonical}">
<link rel="icon" href="favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="96x96" href="assets/icons/icon-96.png"><link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png"><link rel="manifest" href="site.webmanifest"><meta name="apple-mobile-web-app-title" content="Blitz Studio"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta property="og:type" content="website"><meta property="og:site_name" content="${esc(config.siteName)}"><meta property="og:locale" content="${config.locale}"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${image}"><meta property="og:image:secure_url" content="${image}"><meta property="og:image:type" content="${dimensions.format==='png'?'image/png':'image/webp'}"><meta property="og:image:width" content="${dimensions.width}"><meta property="og:image:height" content="${dimensions.height}"><meta property="og:image:alt" content="${esc(page.imageAlt)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(page.title)}"><meta name="twitter:description" content="${esc(page.description)}"><meta name="twitter:image" content="${image}"><meta name="twitter:image:alt" content="${esc(page.imageAlt)}">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>
<!-- seo:end -->`;
 let html=await readFile('dist/'+page.file,'utf8');
 html=html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/g,'').replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(page.title)}</title>`).replace(/<meta\b(?=[^>]*name="(?:description|theme-color)")[^>]*>/g,'').replace(/<link\b(?=[^>]*rel="(?:icon|apple-touch-icon|manifest|canonical)")[^>]*>/g,'');
 html=html.replace('</head>',metadata+'</head>');await writeFile('dist/'+page.file,html);
}
await writeFile('dist/site.webmanifest',JSON.stringify({id:'/',name:studio.businessName,short_name:'Blitz Studio',description:config.homeDescription,lang:config.language,start_url:'/',scope:'/',display:'standalone',background_color:'#000b33',theme_color:'#000b33',icons:[{src:'assets/icons/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'assets/icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},{src:'assets/icons/icon-maskable-512.png',sizes:'512x512',type:'image/png',purpose:'maskable'}]},null,2)+'\n');
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${allowIndexing?'\nSitemap: '+url('sitemap.xml')+'\n':'\n# Public preview: pages use noindex until the launch domain serves this build.\n'}`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(page=>page.index&&allowIndexing).map(page=>`  <url><loc>${esc(url(page.path))}</loc><lastmod>${config.lastModified}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log(`Built canonical metadata, search/social previews and linked structured data for ${pages.length} pages; ${pages.filter(page=>page.index&&allowIndexing).length} active sitemap URLs (${pages.filter(page=>page.index).length} eligible at launch) on ${origin}.`);
