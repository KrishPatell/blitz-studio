# Blitz Studio SEO

Updated 21 October 2026. The live production domain is **https://blitzstudio.xyz**. Production is no longer a preview.

## Production contract

- `content/seo.json` persists the production origin. `scripts/seo-config.mjs` rejects a staging production origin, unapproved overrides and preview indexing. Builds default to production; explicit staging validation uses `SEO_SITE_ORIGIN=<approved-preview-origin>` and remains noindex.
- All 22 pages have unique titles/descriptions, one H1, matching canonical/Open Graph/schema URLs, social image metadata, icons and the application manifest. Organization addresses and business profiles use the approved content.
- Nineteen public URLs are indexable and included in `https://blitzstudio.xyz/sitemap.xml`. Cookie Settings and the two anonymous/coming-soon project previews intentionally remain noindex and are excluded from the sitemap.
- `robots.txt` permits crawling and advertises the production sitemap. No staging URLs belong in production metadata or the sitemap.
- Favicons, Apple web clips (152/167/180), application and maskable icons, and the 1200 × 630 sharing image are local, validated assets.
- Portfolio pages retain crawlable native links and project-specific CreativeWork, ImageObject and BreadcrumbList data. No invented outcomes, ratings or reviews are added for rich results.

## Hosting and redirects

Production is Cloudflare Worker **blitz-studio**, built automatically from the GitHub repository's `main` branch. `.openai/hosting.json` identifies the separately hosted historical Sites preview; it does not control the custom production domain.

`wrangler.jsonc` defines the production Worker and static asset directory. The build command runs the build, site verification, SEO verification and seven SEO/routing regression tests before deployment.

`worker/production.mjs` serves canonical `.html` routes directly with static `html_handling: none`; Cloudflare must not strip their extensions. It permanently redirects HTTP, www and worker host aliases to the HTTPS apex, `/index.html` to `/`, known extensionless page aliases to `.html`, and legacy `/contact` to `/#contact`. Query strings survive redirects. Unknown URLs preserve HTTP 404 and receive `X-Robots-Tag: noindex`.

The Cloudflare dashboard has the apex custom domain and a `www.blitzstudio.xyz/*` route on this same worker. The route uses the existing proxied DNS record. Do not delete or repoint unrelated DNS records.

## Validation

```sh
npm run build
npm run verify
npm run verify:content
npm run verify:seo
npm run test:seo
# Checks real production responses, routing and sitemap membership:
npm run verify:seo:live
```

The source verifier checks metadata uniqueness, canonical/schema/social-image consistency, image dimensions/types, heading counts, indexing, sitemap membership, icons and native portfolio links. The live verifier crawls all 22 pages and verifies actual statuses, redirects, response headers, production metadata, image delivery, icons, manifest and sitemap membership. It writes `output/seo-audit/live-crawl.json`.

Lighthouse reports are retained under `output/seo-audit/`. The dated release record summarizes scores and deployment evidence. Lighthouse scores measure automated technical checks; they do not establish Google rankings or field Core Web Vitals.

## Search engine follow-up

The sitemap is publicly discoverable through robots.txt. On October 21, 2026, Search Console confirmed verified domain ownership and accepted the production sitemap submission. Google's live sitemap inspection reported a successful fetch and crawl permission. The initial Sitemaps report still awaits successful processing; [the Search Console record](search-console-2026-10-21.md) preserves the exact status. Do not confuse submission with processing or indexing, invent verification tokens, or grant DNS/account permissions silently. Keep genuine client briefs and case study results as the basis for future organic content.

## References

- [Google robots meta guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Lighthouse SEO audits](https://developer.chrome.com/docs/lighthouse/seo/)
- [Cloudflare HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
