'use strict';
const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const onPreferenceChange=(preference,handler)=>preference.addEventListener?preference.addEventListener('change',handler):preference.addListener(handler);
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.setAttribute('data-revealed','');reveal.unobserve(e.target)}}),{threshold:.08});
$$('[data-reveal]').forEach(e=>reveal.observe(e));
// Reference's four layered SVG stacks respond to hover, keyboard focus, and touch.
function selectStat(index){$$('[data-stat]').forEach(el=>{let active=Number(el.dataset.stat)===index;el.dataset.active=String(active);$('button',el)?.setAttribute('aria-pressed',String(active))})}
$$('[data-stat]').forEach(el=>['pointerenter','focusin','click'].forEach(event=>el.addEventListener(event,()=>selectStat(Number(el.dataset.stat)))));
$$('input[name="about-card-toggle"]').forEach(input=>input.addEventListener('change',()=>{if(input.checked)$$('input[name="about-card-toggle"]').forEach(other=>{if(other!==input)other.checked=false});$$('.about-aboutCardCell').forEach(cell=>$('.about-aboutCardFlipContent',cell).setAttribute('aria-hidden',String(!$('.about-aboutCardToggle',cell).checked)))}));
// Mobile menu and measured desktop navigation indicator.
const menu=$('.topbar-mobileMenuButton'),shell=$('.topbar-mobileShell'),panel=$('#mobile-primary-panel');
function toggleMenu(open){shell.dataset.open=String(open);shell.classList.toggle('topbar-mobileShellOpen',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');panel.classList.toggle('topbar-mobilePanelOpen',open);panel.setAttribute('aria-hidden',String(!open));panel.inert=!open;syncPageLock();}
let lockedScroll=0,pageLocked=false;
function syncPageLock(){
 const lock=menu.getAttribute('aria-expanded')==='true'||Boolean($('dialog[open]'));
 if(lock===pageLocked)return;
 pageLocked=lock;
 if(lock){lockedScroll=scrollY;document.body.style.setProperty('--locked-scroll',-lockedScroll+'px');document.body.classList.add('page-locked')}
 else{document.body.classList.remove('page-locked');document.body.style.removeProperty('--locked-scroll');const behavior=document.documentElement.style.scrollBehavior;document.documentElement.style.scrollBehavior='auto';scrollTo(0,lockedScroll);document.documentElement.style.scrollBehavior=behavior}
}
addEventListener('resize',()=>{if(innerWidth>=1024&&menu.getAttribute('aria-expanded')==='true')toggleMenu(false)});
document.addEventListener('pointerdown',e=>{if(menu.getAttribute('aria-expanded')==='true'&&!shell.contains(e.target))toggleMenu(false)});
menu.addEventListener('click' ,()=>toggleMenu(menu.getAttribute('aria-expanded')!=='true'));
$$('.topbar-mobileNavItem').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
const nav=$$('.topbar-itemLink');let currentNav='#home';
function setNav(hash){currentNav=hash;nav.forEach(a=>{const active=a.hash===hash;a.classList.toggle('topbar-itemLinkActive',active);a.classList.toggle('topbar-itemLinkInactive',!active);$('.topbar-itemLabel',a).classList.toggle('topbar-itemLabelActive',active);$('.topbar-itemLabel',a).classList.toggle('topbar-itemLabelInactive',!active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');$('.topbar-itemIcon',a)?.classList.toggle('nav-icon-hidden',!active)});const active=nav.find(a=>a.hash===hash)||nav[0],indicator=$('.topbar-activeIndicator');indicator.style.width=active.offsetWidth+'px';indicator.style.transform=`translateX(${active.offsetLeft}px)`;$$('.topbar-mobileNavItem').forEach(a=>a.classList.toggle('topbar-mobileNavItemActive',a.hash===hash));}
const navSections=['home','about','services','our-process','case-study','testimonials'];
function updateNav(){let id='home';for(const key of navSections.slice(1)){const el=$('#'+key);if(el.getBoundingClientRect().top<innerHeight*.4)id=key}if(currentNav!=='#'+id)setNav('#'+id);shell.dataset.scrolled=String(scrollY>30)}
let navFrame=0;addEventListener('scroll',()=>{if(!navFrame)navFrame=requestAnimationFrame(()=>{navFrame=0;updateNav()})},{passive:true});addEventListener('resize',()=>setNav(currentNav));document.fonts.ready.then(()=>setNav(currentNav));setNav(currentNav);
// Decorative videos autoplay only while visible, with sources selected for the viewport.
const serviceClips=[];
function configureVideo(video){video.muted=true;video.defaultMuted=true;video.playsInline=true;video.controls=false;video.autoplay=true;video.loop=true}
function requestPlayback(video){if(!video.paused)return;const pending=video.play();if(pending)pending.catch(()=>{});}
function prepareVideo(video){
 if(video.dataset.prepared)return;
 video.dataset.prepared='true';
 if(video.dataset.poster)video.poster=video.dataset.poster;
 $$('source[data-src]',video).forEach(source=>{if(!source.media||matchMedia(source.media).matches)source.src=source.dataset.src});
 video.preload='auto';video.load();
}
$$('.services-serviceCard').forEach(card=>{
 const video=$('video',card);if(!video)return;
 const clip={video,visible:false};serviceClips.push(clip);configureVideo(video);
 video.classList.add('services-hoverVideoClipVisible');
 clip.update=()=>{if(clip.visible&&!document.hidden){prepareVideo(video);requestPlayback(video)}else video.pause()};
 video.addEventListener('loadeddata',clip.update);
 new IntersectionObserver(entries=>{clip.visible=entries[0].isIntersecting;clip.update()},{threshold:.1}).observe(video);
});
$$('.skillscoverage-skillsCardCell').forEach(cell=>{cell.tabIndex=0;cell.setAttribute('role','button');cell.setAttribute('aria-label','Discuss '+($('.skillscoverage-skillsCardTitle',cell)?.textContent||'this service'));cell.addEventListener('click',()=>openDialog($('#contact-dialog')));cell.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openDialog($('#contact-dialog'))}})});
// Process: one six-second cycle per step, with explicit manual selection.
let processIndex=0,processVisible=false,processPaused=false,processTimer;
const stepButtons=$$('.ourprocess-stepTab'),ring=$('.ourprocess-stepTabRing').cloneNode(true);
function selectStep(index){processIndex=index;stepButtons.forEach((b,i)=>{const active=i===index;b.classList.toggle('ourprocess-stepTabActive',active);b.classList.toggle('ourprocess-stepTabReached',i<=index);b.setAttribute('aria-current',active?'step':'false');$('.ourprocess-stepTabRing',b)?.remove();if(active)b.prepend(ring.cloneNode(true));});$$('.ourprocess-mockupImage').forEach((el,i)=>{el.classList.toggle('ourprocess-mockupImageActive',i===index);el.setAttribute('aria-hidden',String(i!==index))});$$('.ourprocess-caption').forEach((el,i)=>{el.classList.toggle('ourprocess-captionActive',i===index);el.setAttribute('aria-hidden',String(i!==index))});scheduleProcess()}
function scheduleProcess(){clearTimeout(processTimer);if(processVisible&&!processPaused&&!reduced.matches&&!document.hidden)processTimer=setTimeout(()=>selectStep((processIndex+1)%4),6000)}
stepButtons.forEach((b,i)=>{b.addEventListener('click',()=>selectStep(i));b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();const next=(i+(e.key==='ArrowRight'?1:3))%4;selectStep(next);stepButtons[next].focus()}})});
new IntersectionObserver(entries=>{processVisible=entries[0].isIntersecting;scheduleProcess()},{threshold:.2}).observe($('#our-process'));
$('#our-process').addEventListener('pointerenter',()=>{processPaused=true;clearTimeout(processTimer)});$('#our-process').addEventListener('pointerleave',()=>{processPaused=false;scheduleProcess()});
// Achievement flipping card, with verified studio highlights.
const highlights=[['<img class="partner-cardBadge" src="assets/webflow-certified-partner.svg" width="160" height="33" alt="Webflow Certified Partner"/><span class="partner-cardLabel">Webflow Partner</span>',0],['Design<br>+ Build',1],['SaaS<br>& Beyond',2]];let achievementIndex=0,turns=0,achVisible=false,achFocused=false,achTimer;
const rank=$('.achievement-rankCard'),flipper=$('.achievement-rankCardFlipper');
function advanceAchievement(){achievementIndex=(achievementIndex+1)%3;turns++;const faces=$$('.achievement-rankCardText');faces[turns%2].innerHTML=highlights[achievementIndex][0];flipper.style.transform=`rotateY(${turns*180}deg)`;$$('.achievement-captionTitle,.achievement-captionBody').forEach((el,i)=>{const active=i%3===achievementIndex;el.dataset.active=String(active);el.setAttribute('aria-hidden',String(!active))});scheduleAchievement()}
function scheduleAchievement(){clearTimeout(achTimer);if(achVisible&&!achFocused&&!reduced.matches&&!document.hidden)achTimer=setTimeout(advanceAchievement,6500)}
rank.addEventListener('focusin',()=>{achFocused=true;clearTimeout(achTimer)});rank.addEventListener('focusout',()=>{achFocused=false;scheduleAchievement()});rank.addEventListener('click',advanceAchievement);rank.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();advanceAchievement()}});rank.addEventListener('pointerenter',()=>{rank.dataset.poke='true';clearTimeout(achTimer)});rank.addEventListener('pointerleave',()=>{rank.dataset.poke='false';scheduleAchievement()});new IntersectionObserver(entries=>{achVisible=entries[0].isIntersecting;scheduleAchievement()},{threshold:.25}).observe($('#achievements'));
// Start the hero after first paint; never fetch a hidden reel on initial load.
const reel=$('.video-player'),reelFrame=$('.hero-videoPlayerFrame');
let reelVisible=false,reelReady=false;configureVideo(reel);
function updateReel(){if(reelReady&&reelVisible&&!document.hidden){prepareVideo(reel);requestPlayback(reel)}else reel.pause()}
reel.addEventListener('loadeddata',updateReel);
new IntersectionObserver(entries=>{reelVisible=entries[0].isIntersecting;updateReel()},{threshold:.15}).observe(reelFrame);
requestAnimationFrame(()=>requestAnimationFrame(()=>{reelReady=true;updateReel()}));
// Retry a browser-blocked autoplay on an ordinary page interaction, without a video control.
for(const event of ['pointerdown','keydown'])document.addEventListener(event,()=>{updateReel();serviceClips.forEach(clip=>clip.update())},{passive:true});
// Client stories use native scrolling, swipe, keyboard navigation and real scroll stops.
const viewport=$('.stories-viewport'),slides=$$('.stories-slide'),arrows=$$('.stories-arrow'),pagination=$('.stories-pagination');
let storyStops=[],storyButtons=[];
function activeStory(){return storyStops.reduce((best,value,i)=>Math.abs(value-viewport.scrollLeft)<Math.abs(storyStops[best]-viewport.scrollLeft)?i:best,0)}
function goStory(i){viewport.scrollTo({left:storyStops[Math.max(0,Math.min(i,storyStops.length-1))],behavior:reduced.matches?'instant':'smooth'})}
function syncTestimonials(){const max=Math.max(0,viewport.scrollWidth-viewport.clientWidth);const first=slides[0].offsetLeft;const next=[...new Set(slides.map(s=>Math.round(Math.min(max,s.offsetLeft-first))))];if(JSON.stringify(next)!==JSON.stringify(storyStops)){storyStops=next;pagination.replaceChildren();storyButtons=next.map((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Show testimonial group ${i+1}`);b.addEventListener('click',()=>goStory(i));pagination.append(b);return b})}const current=activeStory();arrows[0].disabled=viewport.scrollLeft<3;arrows[1].disabled=viewport.scrollLeft>=max-3;storyButtons.forEach((b,i)=>b.setAttribute('aria-current',String(i===current)))}
arrows.forEach((b,i)=>b.addEventListener('click',()=>goStory(activeStory()+(i?1:-1))));viewport.addEventListener('scroll',syncTestimonials,{passive:true});viewport.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();goStory(e.key==='Home'?0:e.key==='End'?storyStops.length-1:activeStory()+(e.key==='ArrowRight'?1:-1))}});syncTestimonials();
// Native dialogs restore focus automatically and close with Escape or the backdrop.
const closeTimers=new WeakMap();
function closeDialog(dialog){
 if(!dialog.open||dialog.hasAttribute('data-closing'))return;
 if(reduced.matches){dialog.close();return}
 dialog.setAttribute('data-closing','');
 closeTimers.set(dialog,setTimeout(()=>{dialog.close();dialog.removeAttribute('data-closing');closeTimers.delete(dialog)},180));
}
function openDialog(dialog){
 $$('dialog').forEach(d=>{clearTimeout(closeTimers.get(d));closeTimers.delete(d);d.removeAttribute('data-closing');if(d.open)d.close()});
 dialog.showModal();document.body.classList.add('dialog-open');syncPageLock();
}
$$('[data-contact]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();toggleMenu(false);openDialog($('#contact-dialog'))}));
$$('.blitz-dialog').forEach(dialog=>{
 $('.dialog-close',dialog).addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog(dialog)});
 dialog.addEventListener('close',()=>{if(!$('dialog[open]'))document.body.classList.remove('dialog-open');syncPageLock()});
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog)}});
});
$$('[data-project]').forEach(card=>{function showProject(){const title=$('.casestudy-cardTitle',card).textContent,type=$('.casestudy-cardYear',card).textContent,img=$('img',card);$('#project-title').textContent=title;$('#project-type').textContent=type;$('#project-image').src=img.currentSrc||img.src;$('#project-image').alt=img.alt;openDialog($('#project-dialog'))}card.addEventListener('click',e=>{e.preventDefault();showProject()});card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showProject()}})});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape')toggleMenu(false);
 if(e.key==='Tab'&&menu.getAttribute('aria-expanded')==='true'){
  const controls=[menu,...$$('a',panel)],first=controls[0],last=controls.at(-1);
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});document.addEventListener('visibilitychange',()=>{scheduleProcess();scheduleAchievement();serviceClips.forEach(clip=>clip.update());updateReel()});
function updateTime(){$('#local-time').textContent='LOCAL TIME: '+new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'}).format(new Date())}updateTime();setInterval(updateTime,60000);
new IntersectionObserver(entries=>document.body.classList.toggle('footer-in-view',entries[0].isIntersecting),{threshold:.25}).observe($('footer'));

document.fonts.ready.then(syncTestimonials);
new ResizeObserver(syncTestimonials).observe(viewport);
