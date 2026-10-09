// Registry-derived CSS plus reviewed homepage source guard. Does not rewrite live UI.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFile(resolve(root,path),'utf8');
const write=(path,data)=>writeFile(resolve(root,path),data);
const tokens=JSON.parse(await read('design/design-tokens.json'));
const assert=(condition,message)=>{if(!condition)throw Error(message)};
const slug=s=>s.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
assert(tokens.version===2,'Unsupported token registry version.');
assert(tokens.typography.display.weight===500,'Homepage heading weight must remain 500.');
assert(tokens.components.carouselTextControl.icons==='none','Visible arrow icons are prohibited.');
assert(tokens.components.footer.motionControl==='none','Footer pause controls are prohibited.');
assert(!tokens.components.carouselArrow,'Remove stale carousel arrow tokens.');
for(const [name,value] of Object.entries(tokens.cssVariables)){
 assert(/^--[\w-]+$/.test(name)&&typeof value==='string',`Invalid CSS token ${name}`);
 for(const [,reference] of value.matchAll(/var\((--[\w-]+)/g))assert(reference in tokens.cssVariables,`${name} depends on missing ${reference}`);
}
for(const [name,ms] of Object.entries(tokens.motion.durationMs))assert(Number.isFinite(ms)&&ms>=0,`Invalid motion duration ${name}`);
const build=await read('scripts/build.mjs');
const liveOrder=[...build.match(/const cssFiles=\[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map(m=>m[1]);
assert(JSON.stringify(liveOrder)===JSON.stringify(tokens.baseline.cssOrder),'Token CSS order differs from live build order. Review the baseline.');
const declarations={...tokens.cssVariables};
for(const [key,value] of Object.entries(tokens.motion.durationMs))declarations['--blitz-motion-'+slug(key)]=value+'ms';
for(const [key,value] of Object.entries(tokens.motion.easing))declarations['--blitz-ease-'+slug(key)]=value;
for(const [key,value] of Object.entries(tokens.motion.intervalMs))declarations['--blitz-interval-'+slug(key)]=value+'ms';
const roleAliases={
 'heading-weight':tokens.typography.display.weight,'heading-tracking':tokens.typography.display.tracking,
 'heading-stories':tokens.typography.stories.desktop,'heading-stories-tablet':tokens.typography.stories.tablet,'heading-stories-mobile':tokens.typography.stories.mobile,
 'hover-scale':tokens.motion.hoverScale,'card-lift':tokens.motion.cardLift,'radius-pill':tokens.components.badge.radius,'radius-story':tokens.components.storiesCard.radius,
 'frame-max':tokens.layout.frameMax,'story-card-width':tokens.components.storiesCard.width,'story-card-width-mobile':tokens.components.storiesCard.widthMobile,
 'story-card-height':tokens.components.storiesCard.height,'story-card-height-mobile':tokens.components.storiesCard.heightMobile,
 'story-card-padding':tokens.components.storiesCard.padding,'story-card-padding-mobile':tokens.components.storiesCard.paddingMobile,
 'story-gap':tokens.components.storiesCard.gap,'story-gap-mobile':tokens.components.storiesCard.gapMobile,
 'carousel-height':tokens.components.carouselTextControl.height,'carousel-min-width':tokens.components.carouselTextControl.minWidth,
 'carousel-min-width-mobile':tokens.components.carouselTextControl.minWidthMobile,'carousel-font-size':tokens.components.carouselTextControl.fontSize,'carousel-font-size-mobile':tokens.components.carouselTextControl.fontSizeMobile,
 'footer-padding':tokens.components.footer.padding,'footer-padding-mobile':tokens.components.footer.paddingMobile,
 'policy-entry-distance':tokens.motion.policyEntryDistance,'policy-layout-delay':tokens.motion.policyLayoutDelayMs+'ms','page-exit-distance':tokens.motion.pageExitDistance,
 'footer-word-delay':tokens.motion.footerWordRevealDelayMs+'ms'
};
for(const [key,value] of Object.entries(roleAliases))declarations['--blitz-'+key]=String(value);
for(const n of tokens.layout.spacingPx)declarations['--blitz-space-'+n]=n+'px';
const block=values=>Object.entries(values).map(([k,v])=>`  ${k}: ${v};`).join('\n');
const css='/* GENERATED from design/design-tokens.json. Run npm run design:tokens.\n   Consumer stylesheet; existing site cascade remains the visual authority. */\n:root {\n'+block(declarations)+'\n}\n'+tokens.responsiveCssVariables.map(({query,values})=>`@media ${query} {\n  :root {\n${block(values)}\n  }\n}\n`).join('');
// Preserve scope/media conditions rather than flattening component variables into global root.
function inventory(css,file){
 const found=[];
 css=css.replace(/\/\*[\s\S]*?\*\//g,'');
 function visit(start,end,conditions=[]){
  let cursor=start;
  while(cursor<end){
   const open=css.indexOf('{',cursor);if(open<0||open>=end)break;
   const selector=css.slice(cursor,open).trim();let depth=1,quote='',escape=false,close=open+1;
   for(;close<end&&depth;close++){
    const c=css[close];if(escape){escape=false;continue}if(c==='\\'){escape=true;continue}
    if(quote){if(c===quote)quote='';continue}if(c==='"'||c==="'"){quote=c;continue}
    if(c==='{')depth++;if(c==='}')depth--;
   }
   assert(depth===0,`Unbalanced CSS in ${file}`);
   const body=css.slice(open+1,close-1);
   if(selector.startsWith('@')&&body.includes('{'))visit(open+1,close-1,[...conditions,selector]);
   else {
    const variables=Object.fromEntries([...body.matchAll(/(--(?!tw-)[\w-]+)\s*:\s*([^;{}]+)/g)].map(m=>[m[1],m[2].trim()]));
    if(Object.keys(variables).length)found.push({file,selector,conditions,variables});
   }
   cursor=close;
  }
 }
 visit(0,css.length);return found;
}
const sources=[...liveOrder.map(f=>'dist/'+f),'dist/app.js','dist/footer.js','dist/case-study-motion.js','dist/site-ui.js','dist/privacy.js','dist/index.html','scripts/build-policy-pages.mjs','scripts/build.mjs'];
const contents=await Promise.all(sources.map(read));
// Builds rewrite inline CSS and cache hashes; the actual source styles/assets are checked separately.
const homepageIndex=sources.indexOf('dist/index.html');
contents[homepageIndex]=contents[homepageIndex].replace(/<style id="site-styles">[\s\S]*?<\/style>/g,'').replace(/\?v=[a-f0-9]{12}/g,'');
assert(!/[↗↖↙↘←→]/u.test(contents[homepageIndex]),'Visible arrow glyphs are prohibited in homepage markup.');
assert(!/class="[^"]*(?:pixel-footer__motion|contact-dialog__arrow|topbar-mobileNavArrow|services-serviceIconBadge)[^"]*"/.test(contents[homepageIndex]),'Removed arrow decorations or footer pause controls were reintroduced.');
const snapshot={version:1,authority:'Reviewed local homepage source after user-requested consistency fixes; not a new design proposal',cssOrder:liveOrder,sourceHashes:Object.fromEntries(sources.map((file,i)=>[file,createHash('sha256').update(contents[i]).digest('hex')])),responsiveCustomProperties:contents.slice(0,liveOrder.length).flatMap((css,i)=>inventory(css,sources[i]))};
// Shared palette/font/gradient aliases must describe the effective homepage defaults.
const defaults={};
for(const group of snapshot.responsiveCustomProperties){
 if(group.selector.split(',').some(s=>s.trim()===':root')&&!group.conditions.some(c=>c.startsWith('@media')))Object.assign(defaults,group.variables);
}
const normalize=value=>value.replace(/\s+/g,'');
for(const [name,value] of Object.entries(tokens.cssVariables))assert(defaults[name]&&normalize(defaults[name])===normalize(value),`Registry ${name} differs from the homepage default. Update source and tokens together after review.`);
for(const {query,values} of tokens.responsiveCssVariables){
 for(const [name,value] of Object.entries(values))assert(snapshot.responsiveCustomProperties.some(group=>group.selector===':root'&&group.conditions.some(c=>normalize(c)===normalize('@media '+query))&&normalize(group.variables[name]||'')===normalize(value)),`Responsive ${name} at ${query} differs from homepage source.`);
}
const baselinePath='design/homepage-baseline.json';
if(process.argv.includes('--update-baseline')){
 await write(baselinePath,JSON.stringify(snapshot,null,2)+'\n');
 console.log(`Captured reviewed homepage baseline: ${sources.length} sources, ${snapshot.responsiveCustomProperties.length} scoped variable groups. Verify approved rendering before committing.`);
}else if(process.argv.includes('--check')){
 assert(await read('design/design-tokens.css')===css,'Design token CSS is stale. Run npm run design:tokens.');
 const baseline=JSON.parse(await read(baselinePath));
 const changed=sources.filter(file=>baseline.sourceHashes[file]!==snapshot.sourceHashes[file]);
 assert(!changed.length,`Homepage design source changed: ${changed.join(', ')}. Review tokens/rules and rendered pages before running npm run design:baseline.`);
 assert(JSON.stringify(baseline.responsiveCustomProperties)===JSON.stringify(snapshot.responsiveCustomProperties),'Responsive variable baseline drifted. Review before refreshing.');
 console.log(`PASS: registry, generated CSS, live cascade and ${sources.length} reviewed design/motion sources match.`);
}else{
 await write('design/design-tokens.css',css);console.log('Generated design/design-tokens.css from registry values.');
}
