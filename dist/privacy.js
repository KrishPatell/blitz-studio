/* Google Analytics is installed in the shared head. This records notice acknowledgement, not consent. */
(()=>{
 const key='blitz.privacy.v1',duration=180*24*60*60*1000;
 const status=document.querySelector('[data-privacy-status]');let acknowledged=false;
 try{const saved=JSON.parse(localStorage.getItem(key)||'null');acknowledged=saved?.version===2&&saved.expires>Date.now();if(saved&&!acknowledged)localStorage.removeItem(key)}catch{}
 function remember(){try{localStorage.setItem(key,JSON.stringify({version:2,essential:true,analytics:true,advertising:false,expires:Date.now()+duration}));acknowledged=true;return true}catch{return false}}
 const isSettings=Boolean(document.querySelector('[data-save-privacy]'));
 let notice;
 if(!isSettings&&!acknowledged){notice=document.createElement('section');notice.className='privacy-notice';notice.setAttribute('aria-label','Privacy notice');notice.innerHTML='<div class="privacy-notice__copy"><strong>A little privacy. By design.</strong><p>We use Google Analytics to understand site usage. No advertising tags are installed.</p></div><div class="privacy-notice__actions"><a href="cookie-settings.html">Cookie settings</a><button class="studio-action" type="button">Got it</button></div>';document.body.append(notice);notice.querySelector('button').addEventListener('click',()=>{remember();notice.remove()})}
 if(status&&acknowledged)status.textContent='Your notice acknowledgement is saved in this browser.';
 document.querySelector('[data-save-privacy]')?.addEventListener('click',()=>{const ok=remember();status.textContent=ok?'Acknowledged for 180 days. Google Analytics remains active.':'Browser storage is unavailable. Google Analytics remains active.'});
 document.querySelector('[data-reset-privacy]')?.addEventListener('click',()=>{try{localStorage.removeItem(key);acknowledged=false;status.textContent='Saved choice cleared. The privacy notice will appear on your next page visit.'}catch{status.textContent='Browser storage is unavailable. You can manage site data in your browser settings.'}});
 if(document.body.classList.contains('policy-page')){const clock=document.getElementById('local-time');if(clock)clock.textContent='Local time: '+new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(new Date())}
})();
