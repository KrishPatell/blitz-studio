# Blitz Studio SEO implementation and launch

Updated October 13, 2026. The user confirmed `https://blitzstudio.xyz` as the final launch domain. The currently hosted redesign remains a public preview on `https://blitz-studio-redesign.k-1365.chatgpt.site`.

## Implemented

- Unique titles and descriptions on all 22 HTML pages: homepage, four policy pages and seventeen visual portfolio pages.
- Canonical, Open Graph and Twitter card metadata with absolute, matching URLs, real image dimensions, correct MIME types and descriptive image text.
- Linked Organization, WebSite, WebPage and ImageObject data; CreativeWork and visible BreadcrumbList data on project pages. Service offerings match the six visible skill categories. The organization uses its published Singapore address and Webflow profile. Personal social accounts are not represented as company profiles. Missing legal names, tax identifiers, phone numbers, India address details and project outcomes are not invented.
- Every homepage portfolio card has a real crawlable project URL. Ordinary activation keeps the approved preview dialog; the dialog offers a full-project link, and modified link activation retains native navigation.
- Multi-frame ICO (16/32/48), PNG exports (16/32/48/96/192/512), 180px Apple touch icon/web clip, application manifest and a 512px maskable icon. All exports use the approved studio mark. No service-worker cache was introduced.
- Branded 1200 × 630 sharing image rendered with the actual homepage fonts and existing artwork. Its source recipe is in `design/social-card.html`; the final export is a genuine PNG.
- Build-generated robots.txt and sitemap.xml. Anonymous/coming-soon previews and the cookie settings utility page are excluded from indexing. The launch build has 19 eligible URLs.
- Source verification checks metadata uniqueness, canonical/schema/image agreement, real image types and dimensions, one H1, indexing rules, sitemap membership, ICO entries, icon sizes, manifest assets and all seventeen native project links.

## Preview versus launch

`content/seo.json` is the authority. `indexPreview: false` protects the public preview from competing with the old production website. Preview pages have self-referencing preview canonicals and `noindex,follow`. Its robots.txt allows crawling so bots can read that directive; it does not advertise a staging sitemap. The staging sitemap is an empty XML URL set. Do not submit this preview to Search Console.

The launch configuration was built and verified with `SEO_SITE_ORIGIN=https://blitzstudio.xyz`. This produces matching apex-domain canonicals/social/schema URLs, index directives on eligible pages and a nineteen-URL sitemap. The published preview was restored after that validation.

## Domain launch steps

1. Connect `blitzstudio.xyz` to the hosting setup that will serve this redesign. Confirm HTTPS and direct access to the homepage, every project route, icons, manifest and images. Do not point canonicals at old or missing content.
2. Persist the transition by changing `deploymentOrigin` in `content/seo.json` to `https://blitzstudio.xyz`. The default build will then remain correct on future edits. `SEO_SITE_ORIGIN` is a validation override, not a substitute for this persistent change.
3. Run `npm run build`, `npm run verify`, `npm run verify:content`, `npm run verify:seo`, rendered review and the required design-baseline review. Publish that exact source state to the launch host.
4. Configure permanent HTTP/WWW redirects to the HTTPS apex host and `/index.html` to `/`. Preserve the original site's `/contact` URL with a permanent redirect to `/#contact`. Hosting-specific redirects were not guessed or changed in this task.
5. Verify the domain property in Google Search Console with the real owner-issued DNS record, and verify Bing Webmaster Tools. Submit `https://blitzstudio.xyz/sitemap.xml`; inspect the homepage and representative work pages. No ownership token or account access was supplied in this task, so no verification or submission is claimed.
6. Confirm genuine missing URLs return HTTP 404, not a successful homepage fallback. Check live canonical/meta tags and image responses, then monitor indexing and real mobile Core Web Vitals.

## Content and measurement work

These new routes are visual portfolio showcases using the actual published artwork and category labels. They do not invent detailed engagement scopes, technologies used on a particular project, dates or results. Confirmed client briefs can expand them into deeper case studies. Further organic growth requires useful service content, authentic links and ongoing Search Console data; this implementation does not claim a ranking or field-performance score.

## Sources

- [Google favicon guidance](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

The guidance was fetched and checked for this implementation. Stable crawler-visible URLs, consistent canonical/sitemap signals and real brand/contact data are preserved.
