# Shared micro components and project templates — 13 October 2026

## User request and design authority

The user explicitly requested a structured Paper component system, a top-positioned privacy notice with aligned actions, a correctly centred menu close control, unified Achievement/Skills labels and desktop/mobile plans for individual case-study pages. The homepage remains the authority for fonts, palette, shadows, buttons, responsive scale and motion. This record supplements the earlier SEO/title review; the new editorial project template supersedes that record's initial blue policy-layout prototype.

## Paper review

Built four artboards in the user's [Blitzstudio file](https://app.paper.design/file/01M4SPS5N3ES3Z63XANVKQXNZ5/p-1-0): shared controls desktop/mobile and project template desktop/mobile. Added 27 mirror tokens, then inspected screenshots for spacing, typography, contrast, alignment, artboard fit and repetition. Component controls align, contrast is readable, labels use the same white surface, and project artboards grow to content instead of clipping artwork. Exact control/notice/header/artwork values were retrieved with get_computed_styles before implementation. Working indicators were released.

Paper's font lookup cannot resolve the local Overused Grotesk Medium family. Project title proofs use vector glyph outlines generated from the site's actual font. These are confined to design/paper; no functional website text uses raster/vector replacement. Paper copy and controls use editable Manrope. Website headings retain live Overused Grotesk 500. The temporary local-font attempt was removed.

## Actual mobile review

Measured CSS viewport 375 × 812 (browser zoom is user-controlled). Privacy notice sits below the visible navigation, has 20px inset/padding and two controls sharing the exact action-row bounds: top234.54, bottom278.53, height43.99px. It hides while the menu is open. Menu close target44px, icon20px: their horizontal and vertical centres match. Escape closes the menu and returns its Open menu state. Got it removes the notice; the choice persists after reloading the dedicated project page. Reset saved choice exposes the notice again on the next visit.

The Khetaliya page renders its live 34px/39.44px title, natural-ratio artwork, overview and related links without horizontal overflow. Start a conversation opens the existing contact dialog. Its close target44px and SVG20px have matching centres; the close action works. Title-card descender evidence and unchanged card line-height/padding are recorded separately in seo-and-project-title-fix.md.

Evidence: output/paper-uat/privacy-mobile.jpg, menu-mobile.jpg, project-mobile.jpg.

## Actual desktop review

Measured CSS viewport1440 × 900. Notice top90px follows the header bottom73.10px with at least16px clearance. Cookie settings and Got it both compute43.99px height and share top119.05/bottom163.04px. Notice is white, 20px radius with the homepage soft shadow.

Achievement and Skills compute identical white background, 6px12px inset, hairline border, homepage three-part shadow and Manrope55016px/19.2px. Project headings compute Overused Grotesk50062px/71.92px; the actual1440 WebP variant is selected. No horizontal overflow. Desktop project image/type composition reviewed, with the same homepage nav/footer. Some native screenshot clips offset during browser zoom/smooth-scroll, so those captures are not relied on as section evidence; the matching computed geometry and Paper screenshots support the label review.

Evidence: output/paper-uat/privacy-desktop.jpg, project-desktop.jpg, Paper artboards and these measurements.

## Implementation and constraints

The JSON registry adds named shared control, label, privacy and project-page variables before regenerating exports. Source contracts bind their geometry, type and responsive aliases. Every page generator reuses the same homepage SVG close markup/header/contact/footer. Removed the superseded privacy banner CSS and Unicode × menu glyph. Privacy remains non-blocking, essential-only and locally acknowledged; no trackers were added. Reduced-motion and existing autoplay scheduling remain unchanged. Project pages use real responsive assets and lazy-load any comparison image.

Project templates include only verified portfolio name/category/artwork. The Paper board plans brief/challenge/approach/delivery/results sections for future approved details; unverified results or invented implementation claims are not published. SEO staging/production-domain behavior and Search Console launch steps are documented in docs/seo/README.md.

Run build, site/content/SEO verification, design tests and contracts before publication. Baseline refresh records this user-requested change and rendered review; it is not merely a check bypass.
