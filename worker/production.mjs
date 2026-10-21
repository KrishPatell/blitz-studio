import seo from '../content/seo.json' with { type: 'json' };
import portfolio from '../content/portfolio.json' with { type: 'json' };

const canonicalOrigin = seo.launchOrigin;
const canonicalPages = new Set([
  ...Object.keys(seo.policyPages),
  ...portfolio.projects.map(project => `work-${project.id}.html`),
]);
const aliases = new Map([
  ['/index', '/'], ['/index.html', '/'],
  ['/contact', '/#contact'], ['/contact/', '/#contact'], ['/contact.html', '/#contact'],
  ...[...canonicalPages].flatMap(file => [[`/${file.slice(0, -5)}`, `/${file}`], [`/${file.slice(0, -5)}/`, `/${file}`]]),
]);

export default {
  async fetch(request, env) {
    const incoming = new URL(request.url);
    const target = new URL(incoming.pathname + incoming.search, canonicalOrigin);
    const alias = aliases.get(incoming.pathname);
    if (alias) {
      const replacement = new URL(alias, canonicalOrigin);
      target.pathname = replacement.pathname;
      target.hash = replacement.hash;
    }
    if (incoming.origin !== canonicalOrigin || alias) {
      return new Response(null, {
        status: 308,
        headers: { Location: target.href, 'Cache-Control': 'public, max-age=3600' },
      });
    }
    // html_handling:none keeps the public .html routes identical to their canonicals.
    const assetURL = new URL(request.url);
    if (assetURL.pathname === '/') assetURL.pathname = '/index.html';
    const asset = await env.ASSETS.fetch(new Request(assetURL, request));
    const response = new Response(asset.body, asset);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Strict-Transport-Security', 'max-age=31536000');
    if (response.status === 404) response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  },
};
