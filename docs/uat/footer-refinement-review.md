# Cobalt footer refinement review · 13 October 2026

## Explicit request and scope

The user asked for more invitation line spacing, background animation, consistent navigation and an India location that no longer floats away from the grid. Their screenshot shows the selected cobalt Paper footer. Updated the existing Paper desktop/mobile boards and carried this selected direction into the shared live footer across all22 pages. Existing homepage fonts, header/mobile-menu implementation, contact dialog, factual addresses, verified content and video behavior remain the authority.

## Design and geometry

- Live invitation remains Overused Grotesk50044px desktop /32px mobile; line-height changed1.28→1.42 (62.48px and45.44px). Paper's52px reference heading now has74px pitch; its32px mobile proof follows1.42. Neither uses rasterized text in production.
- Footer navigation remains Manrope14px/1.6 and44px targets, with matching translucent column rails and24px inset. The office row uses the same three-column grid and spans the last two columns for Ahmedabad. Singapore and Explore left628px; Ahmedabad and Information left900.66px at measured1440px viewport. Removed inherited260px address maximum width.
- On mobile, navigation is two columns plus a full-width Connect row. Locations stack with matching rules/padding; full Ahmedabad address is three lines at335px content width. No invented address or shortened public address.
- Adopted the selected original cobalt illustration; generated a dedicated portrait companion, no desktop crop. New assets are lazy/async WebP: mobile48083KB, desktop1586326KB; native masters are retained. Mobile artwork sits132px above its base so the naturally proportioned wordmark occupies the water.
- Wordmark preserves700/line1/−.055em and the existing2s linear reveal, with a vertical white-fill fade. No stretched typography or decorative arrows.
- Floating contact control follows the footer's actual data-visible state as well as the existing body class, preventing it covering footer links during responsive geometry changes.

## Motion and interactions

Background picture drifts±3px horizontally /±2px vertically over12s linear alternate with1.015 scale to cover edge seams. Read-only computed styles confirmed running motion and changed matrices at separate observations while content geometry stayed fixed. Same inexpensive CSS motion runs on mobile; the canvas remains1×1 and no drawing loop runs. Existing desktop42-stroke reflections remain visibility/hidden/reduced gated. Offscreen data state is verified in the browser; reduced-motion rules remove picture drift, texture/parallax, reflection/light and reveal animations without hiding content. This is a CSS/code verification of reduced-motion behavior; no OS setting was changed.

The footer Let’s talk opens the shared dialog, Close contact menu closes it and restores the originating action. All22 pages share the same homepage header/contact UI. Main navigation computed Manrope across all links; no independent nav implementation was added. Keyboard focus and menu controls remain native/shared.

## Paper review and evidence

Desktop board07: invitation pitch corrected, CTA moved below the taller heading, Ahmedabad label aligned to Information rather than halfway between columns. Mobile board06: cobalt portrait artwork, corresponding heading spacing, navigation rails, office separators, full address and internal wordmark fade. Screenshot verdict: deliberate spacing, clear type hierarchy/contrast, aligned lanes, no clipping, visual scale variety. Retrieved computed styles and exported the final boards; working indicators released.

Paper exports: design/footer-cobalt/paper-board-refined.png and paper-mobile-refined.png. Direct desktop JSX export saved as paper-board-refined.jsx.

Browser evidence: output/footer-refinement-uat/desktop.jpg, mobile-navigation.jpg, mobile-bottom.jpg. Desktop1440×1100: footer900.40px, no horizontal overflow. Mobile390×844, content375px: heading32px/45.44px, all11 links44px, office address widths335px, mobile480image selected, canvas1×1 and no horizontal overflow.

## Acceptance

Additional steering: the user requested a web clip before publication. Retained the approved opaque black-and-white180px Apple touch icon, added152px and167px iPad variants, and linked all three sizes exactly once on every generated page. Expanded SEO verification to check real image dimensions, opaque backgrounds, home-screen title, Apple capability metadata and standalone manifest settings. This verifies site configuration; no physical iOS home-screen installation was claimed.

Build, site/content/SEO verification and registry contracts must pass after the final CSS changes; then refresh the baseline using this record. The explicit user-requested refinement and actual Paper/browser evidence authorize the refresh. Schema/checker code was not changed, so additional checker tests are unnecessary. Keep source state, archive and published version consistent, and push the same final source to GitHub main.

## Portrait artwork prompt

Create a dedicated portrait companion to this text-free cobalt engraved coastal garden artwork for a narrow mobile website footer. Preserve the same deep royal cobalt blue sky, fine ivory engraved linework, three stone archways, pine trees, warm yellow atelier windows, lake reflections and mountainous island setting. Portrait aspect ratio 1:2. Keep the upper 58% entirely calm cobalt sky with subtle print grain, so stacked mobile footer navigation and full office addresses have clean space. Compose architecture at lower right, mountain silhouette lower left, engraved water across the bottom, all important structures fully visible within the portrait frame. More like an architectural etching than a photograph, exquisitely fine lines and warm pinpoints of light. Do not crop a landscape image, recompose the scene deliberately for portrait. No text, logo, buttons, borders, UI, ghost lettering, unrelated extra landmarks or additional color accents. Natural illustration without stretching. This is background artwork only.

