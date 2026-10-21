import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/production.mjs';
const env = { ASSETS: { fetch: async request => {
  const pathname = new URL(request.url).pathname;
  return pathname === '/missing' ? new Response('Not found', { status: 404 }) : new Response(pathname, { headers: { 'Content-Type': 'text/html' } });
} } };
test('HTTP and www redirect directly to HTTPS apex and preserve query strings', async () => {
  for (const url of ['http://blitzstudio.xyz/?utm_source=test', 'https://www.blitzstudio.xyz/?utm_source=test']) {
    const response = await worker.fetch(new Request(url), env);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('Location'), 'https://blitzstudio.xyz/?utm_source=test');
  }
});
test('legacy and extensionless URLs resolve permanently to their canonical routes', async () => {
  for (const [path, expected] of [['/index.html', '/'], ['/contact', '/#contact'], ['/privacy', '/privacy.html'], ['/work-champion-ceramics/', '/work-champion-ceramics.html']]) {
    const response = await worker.fetch(new Request('https://blitzstudio.xyz' + path), env);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get('Location'), 'https://blitzstudio.xyz' + expected);
  }
});
test('canonical pages are served directly and home maps to the index asset', async () => {
  for (const [path, asset] of [['/', '/index.html'], ['/privacy.html', '/privacy.html']]) {
    const response = await worker.fetch(new Request('https://blitzstudio.xyz' + path), env);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), asset);
    assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  }
});
test('unknown URLs retain real 404 status and cannot be indexed', async () => {
  const response = await worker.fetch(new Request('https://blitzstudio.xyz/missing'), env);
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex');
});
