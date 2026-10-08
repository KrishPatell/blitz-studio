/* No analytics or advertising scripts are installed. This only remembers notice acknowledgement. */
(()=>{
 const key='blitz.privacy.v1',duration=180*24*60*60*1000;
 const status=document.querySelector('[data-privacy-status]');let acknowledged=false;
 try{const saved=JSON.parse(localStorage.getItem(key)||'null');acknowledged=saved?.version===1&&saved.expires>Date.now();if(saved&&!acknowledged)localStorage.removeItem(key)}catch{}
 function remember(){try{localStorage.setItem(key,JSON.stringify({version:1,essential:true,analytics:false,advertising:false,expires:Date.now()+duration}));acknowledged=true;return true}catch{return false}}
 const isSettings=Boolean(document.querySelector('[data-save-privacy]'));
 let notice;
 if(!isSettings&&!acknowledged){notice=document.createElement('section');notice.className='privacy-notice';notice.setAttribute('aria-label','Privacy notice');notice.innerHTML='<div><strong>A little privacy. By design.</strong><p>Essential services only. No analytics or advertising trackers.</p></div><button class="policy-button" type="button">Got it <span aria-hidden="true">↗</span></button><a href="cookie-settings.html">Cookie settings ↗</a>';document.body.append(notice);notice.querySelector('button').addEventListener('click',()=>{remember();notice.remove()})}
 if(status&&acknowledged)status.textContent='Your essential-only preferences are saved in this browser.';
 document.querySelector('[data-save-privacy]')?.addEventListener('click',()=>{const ok=remember();status.textContent=ok?'Saved. Essential services only. Your choice is remembered for 180 days.':'Browser storage is unavailable. Essential services remain the only active category.'});
 document.querySelector('[data-reset-privacy]')?.addEventListener('click',()=>{try{localStorage.removeItem(key);acknowledged=false;status.textContent='Saved choice cleared. The privacy notice will appear on your next page visit.'}catch{status.textContent='Browser storage is unavailable. You can manage site data in your browser settings.'}});
 if(document.body.classList.contains('policy-page')){const clock=document.getElementById('local-time');if(clock)clock.textContent=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date())}
})();
