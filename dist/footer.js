/* Subtle light travels through pixels sampled from the generated Blitz texture. */
(()=>{
 const footer=document.querySelector('.pixel-footer');if(!footer)return;
 const canvas=footer.querySelector('canvas'),ctx=canvas.getContext('2d'),texture=footer.querySelector('.pixel-footer__texture');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,frame=0,width=0,height=0,points=[],clock=0,last=0;
 const image=new Image();let imageRequested=false;
 if(!ctx){footer.setAttribute('data-entered','');return}
 function loadTexture(){if(imageRequested||preference.matches)return;imageRequested=true;image.src=texture.currentSrc||texture.src}
 function resize(){const r=footer.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);width=r.width;height=r.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
 function sample(){const sampler=document.createElement('canvas');sampler.width=image.naturalWidth;sampler.height=image.naturalHeight;const sctx=sampler.getContext('2d',{willReadFrequently:true});sctx.drawImage(image,0,0);const data=sctx.getImageData(0,0,sampler.width,sampler.height).data;points=[];for(let y=20;y<sampler.height-30;y+=9){for(let x=15;x<sampler.width-15;x+=9){const i=(y*sampler.width+x)*4;if(data[i+2]>52&&data[i+2]>data[i]*1.5&&((x*13+y*7)%17)<9)points.push({x,y,phase:(x*.051+y*.017)%6.28,power:Math.min(data[i+2]/160,1)})}}start()}
 function draw(now){if(last&&now-last<32){frame=requestAnimationFrame(draw);return}if(!visible||preference.matches||document.hidden){frame=0;return}const delta=last?Math.min(now-last,50):0;last=now;clock+=delta/1000;ctx.clearRect(0,0,width,height);const scale=Math.max((width+40)/image.naturalWidth,(height+40)/image.naturalHeight),ox=(width-image.naturalWidth*scale)/2,oy=(height-image.naturalHeight*scale)*.43;
  for(const p of points){const x=p.x*scale+ox,y=p.y*scale+oy;const wave=Math.sin(clock*.7-p.y*.015+p.x*.004),glint=Math.pow(Math.max(0,Math.sin(clock*.45+p.phase)),10);const alpha=(Math.max(0,wave)*.1+glint*.38)*p.power;if(alpha<.06)continue;ctx.fillStyle=`rgba(111,211,255,${alpha.toFixed(3)})`;const size=glint>.8?1.4:1;ctx.fillRect(x,y,size,size)}
  frame=requestAnimationFrame(draw);
 }
 function start(){const active=visible&&!preference.matches&&!document.hidden;footer.dataset.animating=String(active);if(active&&!frame&&points.length){last=0;frame=requestAnimationFrame(draw)}else if(!active&&frame){cancelAnimationFrame(frame);frame=0;last=0}if(preference.matches)ctx.clearRect(0,0,width,height)}
 new ResizeObserver(resize).observe(footer);resize();image.addEventListener('load',sample);if(image.complete&&image.naturalWidth)sample();
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){footer.setAttribute('data-entered','');loadTexture()}footer.dataset.visible=String(visible);start()},{threshold:.12}).observe(footer);
 footer.addEventListener('pointermove',event=>{if(preference.matches||event.pointerType!=='mouse')return;const r=footer.getBoundingClientRect();texture.style.setProperty('--footer-x',((event.clientX-r.left)/r.width-.5)*10+'px');texture.style.setProperty('--footer-y',((event.clientY-r.top)/r.height-.5)*8+'px')},{passive:true});
 footer.addEventListener('pointerleave',()=>{texture.style.setProperty('--footer-x','0px');texture.style.setProperty('--footer-y','0px')});
 const preferenceChanged=()=>{loadTexture();start()};if(preference.addEventListener)preference.addEventListener('change',preferenceChanged);else preference.addListener(preferenceChanged);document.addEventListener('visibilitychange',start);
})();
