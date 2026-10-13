/* Quiet engraved-water reflections; rendering stops offscreen, hidden or under reduced motion. */
(()=>{
 const footer=document.querySelector('.pixel-footer');if(!footer)return;
 const canvas=footer.querySelector('canvas'),ctx=canvas?.getContext('2d'),texture=footer.querySelector('.pixel-footer__texture');
 const preference=matchMedia('(prefers-reduced-motion: reduce)'),small=matchMedia('(max-width:743px)');let visible=false,frame=0,width=0,height=0,clock=0,last=0;
 function resize(){if(!ctx)return;if(small.matches||preference.matches){canvas.width=1;canvas.height=1;return}const r=footer.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
 function draw(now){if(last&&now-last<32){frame=requestAnimationFrame(draw);return}if(!visible||preference.matches||small.matches||document.hidden){frame=0;return}const delta=last?Math.min(now-last,50):0;last=now;clock+=delta/1000;ctx.clearRect(0,0,width,height);
  const fr=footer.getBoundingClientRect(),ir=texture.getBoundingClientRect();
  for(let i=0;i<42;i++){const band=i%3,xn=[.17,.55,.75][band]+Math.sin(i*7.31)*.055,yn=.79+(i/42)*.17;const x=ir.left-fr.left+xn*ir.width,y=ir.top-fr.top+yn*ir.height;const pulse=Math.pow(Math.max(0,Math.sin(clock*.55+i*1.618)),4)*.3;if(pulse<.035)continue;ctx.strokeStyle=`rgba(255,219,144,${pulse.toFixed(3)})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+3+Math.sin(clock*.4+i)*2,y);ctx.stroke()}
  frame=requestAnimationFrame(draw);
 }
 function start(){const active=visible&&!preference.matches&&!document.hidden;footer.dataset.animating=String(active);if(active&&ctx&&!small.matches&&!frame){last=0;frame=requestAnimationFrame(draw)}else if((!active||small.matches)&&frame){cancelAnimationFrame(frame);frame=0;last=0}if(ctx&&(preference.matches||small.matches))ctx.clearRect(0,0,width,height)}
 new ResizeObserver(resize).observe(footer);resize();
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;footer.dataset.visible=String(visible);start()},{threshold:.12}).observe(footer);
 const word=footer.querySelector('.pixel-footer__identity');const wordObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){footer.setAttribute('data-entered','');wordObserver.disconnect()}},{threshold:.2});wordObserver.observe(word);
 footer.addEventListener('pointermove',event=>{if(preference.matches||small.matches||event.pointerType!=='mouse')return;const r=footer.getBoundingClientRect();texture.style.setProperty('--footer-x',((event.clientX-r.left)/r.width-.5)*6+'px');texture.style.setProperty('--footer-y',((event.clientY-r.top)/r.height-.5)*4+'px')},{passive:true});
 footer.addEventListener('pointerleave',()=>{texture.style.setProperty('--footer-x','0px');texture.style.setProperty('--footer-y','0px')});
 const changed=()=>{resize();start()};for(const query of [preference,small]){if(query.addEventListener)query.addEventListener('change',changed);else query.addListener(changed)}document.addEventListener('visibilitychange',start);
})();
