"""Verify that every extracted source record is actually integrated in the built site."""
import hashlib
import html
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
load = lambda name: json.loads((root / 'content' / name).read_text())
projects = load('portfolio.json')['projects']
clients = load('clients.json')['clients']
stories = load('testimonials.json')['verified']
studio = load('studio.json')
home = (root / 'dist/index.html').read_text()
markup = re.sub(r'<style[\s\S]*?</style>', '', home)
assert len(projects) == 17 and len(clients) == 18, 'Original source coverage changed; re-audit the extraction.'
assert len({p['sourceImage'] for p in projects}) == len(projects)
assert len({c['sourceImage'] for c in clients}) == len(clients)
assert set(re.findall(r'data-project="([^"]+)"', markup)) == {p['id'] for p in projects}
assert len(re.findall(r'data-project="', markup)) == len(projects)
for record in projects + clients:
    assert record['source'] == 'https://blitzstudio.xyz/'
    assert hashlib.sha256((root / record['master']).read_bytes()).hexdigest() == record['masterSha256'], f'Original changed: {record["master"]}'
    assert (root / 'dist' / record['image']).is_file()
    assert f'src="{record["image"]}"' in markup
for project in projects:
    for variant in project['variants']:
        assert (root / 'dist' / variant['path']).is_file()
        assert variant['path'] in markup
    detail = project.get('comparison', {}).get('image') or project['detailImage']
    assert (root / 'dist' / detail).is_file()
    assert f'data-detail-image="{detail}"' in markup
for client in clients:
    assert f'alt="{html.escape(client["name"], quote=True)}"' in markup
for story in stories:
    assert story['quote'] in html.unescape(markup)
    assert story['name'] in html.unescape(markup)
    assert story['portrait'] in markup
    assert f'assets/stories/{story["artwork"]}-800.webp' in markup
assert len(re.findall(r'<figure class="stories-card ', markup)) == len(stories)
assert '<dt class="about-aboutStatValue">45</dt>' in markup
assert '<dt class="about-aboutStatValue">15+</dt>' in markup
for stale in ['public portfolio', '17 Projects', '5 Stories', '2 Platforms', '1 Partner', 'Partner from idea to launch', 'webflow-certified-partner.svg']:
    assert stale not in markup, f'Stale claim or badge: {stale}'
assert 'webflow-certified-partner.svg' not in (root / 'dist/app.js').read_text()
for platform in studio['capabilities']:
    assert platform.lower() in html.unescape(markup).lower()
for page in ['index', 'terms', 'privacy', 'cookies', 'cookie-settings']:
    source = (root / 'dist' / (page + '.html')).read_text()
    footer = re.search(r'<footer\b[\s\S]*?</footer>', source)[0]
    nav = re.search(r'<nav class="pixel-footer__navigation"[\s\S]*?</nav>', footer)[0]
    for link in ['terms.html', 'privacy.html', 'cookies.html', 'cookie-settings.html']:
        assert f'href="{link}"' in nav
    assert 'class="footer-legal"' not in footer
    assert 'pixel-footer__particles' in footer and 'pixel-footer__light' in footer
print(f'PASS: all {len(projects)} original projects, {len(clients)} logos, {len(stories)} real stories, approved stats, detail assets and unified footers on five pages.')
