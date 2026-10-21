# Page-experience follow-up

Production release: `c5c09e0` (Cloudflare Workers Builds succeeded).

Both live homepage profiles score **100 SEO, 100 Best Practices and 100 Accessibility**. The three observed accessibility problems were corrected and directly retested with zero issues: metadata contrast, native list semantics and visible-label/accessibility-name agreement.

Project metadata now uses the existing readable soft-text token, not the disabled-control color. Portfolio links retain native names from their visible content. Skills have real buttons inside unchanged list items, with the existing contact dialog and keyboard behavior. Live browser interaction confirmed pointer activation, Escape dismissal/focus restoration and Enter activation.

The original hero vector is embedded in the homepage's head stylesheet. Its decoded data is verified byte-for-byte against the original local SVG. Removing the obsolete background URL eliminates the second download. The page retains the existing artwork, layout and slideshow. Mobile and desktop captures of the readable card metadata were inspected at 412px and 1350px in `output/seo-audit/project-card-{mobile,desktop}.png`.

Latest measured mobile LCP is **1.6 seconds**, CLS **0.001**, and blocking time **10ms**. Desktop has CLS **0** and blocking time **0ms**. The initial mobile diagnostic had LCP 6.7 seconds and an accessibility score of 93.

The latest mobile/desktop performance scores are **90/67**. The preceding pass measured 98/92; the raw reports preserve both. Performance varies with network timing and changing gallery frames; these are lab measurements, not a 100-performance or field Core Web Vitals claim. SEO, Best Practices and Accessibility remain 100 in both profiles.

Full machine-readable follow-up: [page-experience-2026-10-21.json](page-experience-2026-10-21.json). Raw final reports: `output/seo-audit/page-experience-{mobile,desktop}-release.report.{json,html}`. The original 38 public-page SEO/Best Practices audits remain in [the production repair record](audit-2026-10-21.md).

The token generator validates 154 token/source contracts. The earlier homepage fingerprint mismatch is documented and its baseline has not been overwritten to bypass review.

Search Console confirms domain ownership, and the production sitemap was submitted successfully. Google's live sitemap fetch succeeded. The initial Sitemaps report has not confirmed processing success; see [the Search Console record](search-console-2026-10-21.md). The account was already verified when this session resumed, so no duplicate DNS record or additional account permission was added.
