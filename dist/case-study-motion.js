(()=>{
 const grid=document.querySelector('.casestudy-grid');if(!grid)return;
 const preference=matchMedia('(prefers-reduced-motion: reduce)');let current=1,target=1,frame=0;
 const clamp=value=>Math.min(1,Math.max(0,value));
 function position(){if(preference.matches||innerWidth<744)return 1;const r=grid.getBoundingClientRect();return clamp((innerHeight*.88-r.top)/(innerHeight*.7))}
 function tick(){current+=(target-current)*.12;if(Math.abs(target-current)<.001)current=target;grid.style.setProperty('--cs-scatter-progress',current.toFixed(4));grid.dataset.scatterActive=String(current<.999);if(current!==target)frame=requestAnimationFrame(tick);else frame=0}
 function update(){target=position();if(!frame)frame=requestAnimationFrame(tick)}
 current=target=position();grid.style.setProperty('--cs-scatter-progress',current.toFixed(4));grid.dataset.scatterActive=String(current<.999);
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update);document.fonts.ready.then(update);if(preference.addEventListener)preference.addEventListener('change',update);else preference.addListener(update);
})();
