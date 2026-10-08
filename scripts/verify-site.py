"""Content/asset regression checks for the static deployment. No packages required."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import re,gzip,json,subprocess
root=Path(__file__).resolve().parents[1]/'dist'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.tags=[];self.ids=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.tags.append((tag,a))
  if a.get('id'):self.ids.append(a['id'])
p=Page();html=(root/'index.html').read_text();p.feed(html)
assert len(p.ids)==len(set(p.ids)), 'Duplicate IDs'
for tag,a in p.tags:
 for key in ['src','href','poster','data-src','data-poster','data-project-src']:
  val=a.get(key,'');url=urlsplit(val)
  if not val or url.scheme or url.netloc:continue
  if not url.path:
   if url.fragment:assert unquote(url.fragment) in p.ids,(tag,val,'missing anchor')
  else:assert (root/unquote(url.path).lstrip('/')).is_file(),(tag,key,val,'missing asset')
 for key in ['srcset','data-srcset']:
  for item in a.get(key,'').split(','):
   if item.strip():assert (root/item.strip().split()[0]).is_file(),item
 for key in ['style']:
  for val in re.findall(r'url\([\'"]?([^\)\'"]+)',a.get(key,'')):
   assert (root/val).is_file(),val
for path in root.glob('*.css'):
 for url in re.findall(r'url\([\'"]?([^\)\'"]+)',path.read_text()):
  if not url.startswith(('data:','http','#')):assert (root/url).is_file(),(path,url)
for path in root.glob('*.js'):subprocess.run(['node','--check',str(path)],check=True)
videos=[a for tag,a in p.tags if tag=='video'];assert len(videos)==6
previews=[a for a in videos if 'services-hoverVideoClip' in a.get('class','')]
assert len(previews)==5
assert all(a.get('preload')=='none' and 'autoplay' not in a for a in previews),'offscreen previews eagerly load'
mp4=[a['data-src'] for tag,a in p.tags if tag=='source' and a.get('type')=='video/mp4' and 'data-src' in a];assert len(mp4)==12
assert all('controls' not in a for a in videos),'native video controls present'
assert not any(any(c in a.get('class','') for c in ['service-playback','hero-videoPlayerPlayButton','hero-videoPlayerHitArea']) for tag,a in p.tags),'video control markup present'
assert all('src' not in a for tag,a in p.tags if tag=='source'),'video requests before viewport preparation'
assert (root/'assets/blitz-reel-mobile.mp4').stat().st_size<(root/'assets/blitz-reel.mp4').stat().st_size
assert len([a for tag,a in p.tags if 'skillscoverage-skillsCardCell' in a.get('class','')])==6
assert not [a for tag,a in p.tags if a.get('rel')=='stylesheet'],'blocking CSS round trip'
assert len([a for tag,a in p.tags if tag=='style' and a.get('id')=='site-styles'])==1
assert len(gzip.compress(html.encode()))<100000,'HTML plus inline CSS compressed budget'
assert len([a for tag,a in p.tags if a.get('name')=='viewport'])==1
assert not any('seasonSans' in p.read_text() for p in root.glob('*.css'))
assert len(gzip.compress((root/'site.css').read_bytes()))<50000,'CSS compressed budget'
assert not list(root.glob('qa-*.html')),'temporary QA file in deployment'
print(json.dumps({'status':'PASS','html_bytes':len(html.encode()),'css_gzip_bytes':len(gzip.compress((root/'site.css').read_bytes())),'videos':len(videos),'lazy_service_previews':len(previews),'skills':6,'local_assets_and_anchors':'PASS','js_syntax':'PASS'},indent=2))

# Every separate policy page must resolve links, assets and cross-page anchors.
pages={}
for file in root.glob('*.html'):
 page=Page();page.feed(file.read_text());pages[file.name]=page
for name,page in pages.items():
 assert len(page.ids)==len(set(page.ids)),(name,'duplicate IDs')
 for tag,a in page.tags:
  for key in ['href','src','poster']:
   value=a.get(key,'');url=urlsplit(value)
   if not value or url.scheme or url.netloc:continue
   target=url.path or name
   assert (root/target).is_file(),(name,target,'missing local target')
   if url.fragment and target in pages:assert unquote(url.fragment) in pages[target].ids,(name,value,'missing page anchor')
print('PASS: all five pages, cross-page anchors and local assets')
