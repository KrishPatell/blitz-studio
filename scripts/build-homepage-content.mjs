import {readFile,writeFile} from 'node:fs/promises';
const studio=JSON.parse(await readFile('content/studio.json','utf8'));
const {projects}=JSON.parse(await readFile('content/portfolio.json','utf8'));
const {clients}=JSON.parse(await readFile('content/clients.json','utf8'));
const {verified:stories}=JSON.parse(await readFile('content/testimonials.json','utf8'));
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
let home=await readFile('dist/index.html','utf8');
// Discover the existing LCP background artwork before CSS parsing finishes.
if(!home.includes('rel="preload" as="image" href="assets/reference/hero-map-dotted.svg"'))home=home.replace('</head>','<link rel="preload" as="image" href="assets/reference/hero-map-dotted.svg" fetchpriority="high"></head>');
// Runtime-measured pill geometry must never be saved into first-paint markup.
home=home.replace(/<div\b[^>]*class="topbar-activeIndicator(?: topbar-activeIndicatorVisible)?"[^>]*>/g,'<div aria-hidden="true" class="topbar-activeIndicator">');
const replace=(pattern,value,label)=>{if(!pattern.test(home))throw Error(`Missing homepage ${label}`);home=home.replace(pattern,value)};
const stats=studio.stats.map((stat,index)=>`<div class="about-aboutStat" data-active="${index===0}" data-stat="${index}"><dt class="about-aboutStatValue${stat.kind==='capability'?' about-aboutStatValue--capability':''}">${escape(stat.value)}</dt><dd class="about-aboutStatLabel">${escape(stat.label)}<button aria-label="${escape(stat.accessibleLabel)}" aria-pressed="${index===0}" class="about-aboutStatHitArea" type="button"></button></dd></div>`).join('');
replace(/<dl class="about-aboutStats"[^>]*>[\s\S]*?<\/dl>/,`<dl class="about-aboutStats" data-reveal="">${stats}</dl>`,'statistics');
const stackLabels=['45 Clients','15+ Stories','Full-stack','Design + Build'];let stackIndex=0;
home=home.replace(/(<span class="about-aboutStackLabel">)[\s\S]*?(<\/span>)/g,(_,start,end)=>`${start}${escape(stackLabels[stackIndex++])}${end}`);
if(stackIndex!==studio.stats.length)throw Error('About stack labels must match the approved statistics');
// Featured order changes presentation only; every distinct original project remains present.
const order=['champion-ceramics','roraj','remotedesk','quickads','tigerloans','khetaliya'];
const ordered=[...order.map(id=>projects.find(project=>project.id===id)),...projects.filter(project=>!order.includes(project.id))];
if(ordered.some(project=>!project))throw Error('Missing featured project');
// Lightweight hero: the first project is immediate; subsequent images load one ahead.
const heroImages=ordered.map((project,index)=>`<img class="hero-projectImage" data-active="${index===0}" aria-hidden="${index!==0}" alt="${escape(project.name)} design by Blitz Studio" width="${project.width}" height="${project.height}" decoding="async" ${index===0?'fetchpriority="high" src':'data-src'}="${escape(project.image)}" ${index===0?'srcset':'data-srcset'}="${project.variants.map(v=>`${escape(v.path)} ${v.width}w`).join(', ')}" sizes="(max-width:743px) 100vw, (min-width:1728px) 1536px, 90vw">`).join('');
replace(/<div class="hero-videoPlayerFrame(?: hero-slideshow)?"[^>]*>[\s\S]*?<\/div>/,`<div class="hero-videoPlayerFrame hero-slideshow" role="img" aria-label="Blitz Studio project showcase" data-hero-slideshow>${heroImages}</div>`,'hero showcase');
const cards=ordered.map(project=>`<li class="casestudy-cardCell" data-reveal=""><a href="work-${escape(project.id)}.html" aria-haspopup="dialog" class="casestudy-card" data-project="${escape(project.id)}" ${project.comparison?`data-detail-image="${escape(project.comparison.image)}" data-detail-caption="${escape(project.comparison.caption)}"`:`data-detail-image="${escape(project.detailImage)}"`}><div class="casestudy-cardHeader" id="project-${escape(project.id)}-header"><div class="casestudy-cardHeaderStack"><span class="casestudy-cardLabel">${project.disclosure==='anonymous'?'Project Preview':'Case Study'}</span><h3 class="casestudy-cardTitle">${escape(project.name)}</h3></div><span class="casestudy-cardYear">${escape(project.category)}</span></div><div class="casestudy-cardMockup"><div class="casestudy-cardMockupInner"><img alt="${escape(project.name)} ${escape(project.category)} project by Blitz Studio" class="casestudy-cardMockupImage" decoding="async" height="${project.height}" loading="lazy" src="${escape(project.image)}" srcset="${project.variants.map(variant=>`${escape(variant.path)} ${variant.width}w`).join(', ')}" sizes="(max-width:743px) 90vw, (min-width:1728px) 328px, (min-width:1440px) 272px, 560px" width="${project.width}"/></div></div></a></li>`).join('');
replace(/<ul aria-label="Case studies" class="casestudy-grid"[^>]*>[\s\S]*?<\/ul>/,`<ul aria-label="Case studies" class="casestudy-grid">${cards}</ul>`,'project grid');
const logos=clients.map(client=>`<li class="ourclients-cell" data-reveal=""><img alt="${escape(client.name)}" class="blitz-client-logo" width="${client.width}" height="${client.height}" loading="lazy" decoding="async" src="${escape(client.image)}"/></li>`).join('');
replace(/<ul class="ourclients-grid">[\s\S]*?<\/ul>/,`<ul class="ourclients-grid">${logos}</ul>`,'client logos');
const storyCards=stories.map(story=>{
 if(!story.source||!story.artwork||!story.portrait)throw Error(`Testimonial ${story.name} needs approved source, artwork and portrait`);
 return `<li class="stories-slide"><figure class="stories-card stories-card--${escape(story.artwork)}"><img class="stories-art" src="assets/stories/${escape(story.artwork)}-800.webp" srcset="assets/stories/${escape(story.artwork)}-480.webp 480w, assets/stories/${escape(story.artwork)}-800.webp 800w" sizes="(max-width:743px) 82vw, 400px" width="800" height="1200" alt="" loading="lazy" decoding="async"><div class="stories-card-top"><span>${escape(story.company)}</span></div><div class="stories-card-copy"><blockquote>“${escape(story.quote)}”</blockquote><figcaption><img src="${escape(story.portrait)}" alt="" width="48" height="48" loading="lazy" decoding="async"><div><strong>${escape(story.name)}</strong><span>${escape(story.role)}</span></div></figcaption></div></figure></li>`;
}).join('');
replace(/<ul class="stories-track">[\s\S]*?<\/ul>/,`<ul class="stories-track">${storyCards}</ul>`,'verified stories');
await writeFile('dist/index.html',home);
console.log(`Built ${studio.stats.length} approved stats, all ${projects.length} original project entries, ${clients.length} client logos and ${stories.length} verified stories.`);
