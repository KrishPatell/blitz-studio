# SEO, brand assets and project-title review — October 13, 2026

## User-requested approval

The user requested a high-level SEO setup, favicon and web clip assets, and confirmed blitzstudio.xyz as the launch domain. During that work the user supplied two screenshots of clipped glyph descenders in Khetaliya Group and Creator management and explicitly requested unchanged line height and padding.

## Title fix

The inherited `.casestudy-cardTitle` used `overflow:hidden`, clipping the glyphs at the existing line box. The only visual change to that title rule is `overflow:var(--project-title-overflow)` with a reviewed value of `visible`. Font size, line height, weight, letter spacing, header gap and padding are preserved. No extra padding or line-height adjustment hides the problem.

On the actual wide desktop rendering, both titles computed as Overused Grotesk 500 at 24px / 26.4px, with a 10px header gap and 24px 24px 0px padding. Both now paint complete descenders. On the measured 375 × 812 mobile viewport, Creator management retains its original 20px / 20px type, 8px gap and 16px 16px 0px padding, with visible overflow and no horizontal page overflow. Browser zoom changed during QA; measured CSS viewport values, rather than requested device dimensions, were used.

Evidence: `output/seo-uat/khetaliya-title.jpg`, `creator-title.jpg`, `titles-mobile.jpg`.

## SEO and page review

The real project-card activation still opens the shared preview. View full project navigates to work-khetaliya.html through the existing page transition. The dedicated page retains the homepage header, blue reading-page design, actual image, shared contact dialog and pixel footer. It has no horizontal overflow at the reviewed desktop and measured mobile viewport. Initial screenshots taken during the existing 700ms page entry were replaced after the content reached opacity 1 and its image finished loading.

Portfolio links remain real URLs without JavaScript and preserve modified activation. All new pages use the same existing styles; no project-page font palette or spacing system was invented. The sharing image was rendered with the actual local fonts at 1200 × 630, then normalized to PNG. Browser screenshots themselves are JPEG; the MIME/asset check validates the actual sharing file rather than trusting its extension.

Evidence: `output/seo-uat/project-desktop.jpg`, `project-mobile.jpg`, the native-rendered `dist/assets/social/blitz-studio.png`, and the exported icon files.

## Indexing and verification

The public preview is deliberately noindex until the redesign is served on blitzstudio.xyz. The production-domain build was independently verified with 22 unique titles/descriptions and 19 sitemap URLs; the preview build was restored. No Search Console ownership token or DNS configuration was supplied. Domain connection and owner verification remain launch steps, documented in docs/seo/README.md.

Build, site/content/SEO verification, design contracts and schema tests are required before publication. Site verification now covers all 22 pages and shared UI. All six autoplay videos, footer animation and verified quotes remain present. CSS remains within the existing gzip budget. New source builders are included in the reviewed fingerprint inventory. Refreshing this baseline follows the user-requested implementation and rendered evidence, not a desire to silence a mismatch.
