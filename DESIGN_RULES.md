# Blitz Studio design rules

The existing homepage is the visual authority. These rules apply to every new section, component, page, policy page, responsive layout and interaction. Explicit user instructions take precedence. A generated mockup is an artwork reference, not permission to redefine typography, controls or content.

## Required workflow

1. Read this file and `design/design-tokens.json` before editing UI.
2. Identify the closest existing homepage component and its final CSS after all overrides. Match that component's role, proportions and behavior.
3. Reuse its classes and semantic tokens. Retain only approved functional icons; removed arrow decorations must stay removed. Use `design/design-tokens.css` when a consumer needs shared variables. This reference file is generated and is not automatically inserted into the current site's cascade.
4. New styles must consume existing semantic variables for fonts, colors, gradients, shadows, spacing and motion whenever a matching token exists. Do not duplicate raw values or substitute a different role. If a needed token is absent, add a named semantic token with source/rationale. Preserve an existing scoped exception rather than changing the entire palette or spacing system.
5. Update JSON, run `npm run design:tokens`, then `npm run design:check` and the relevant build/verification checks. Check desktop and mobile appearance when UI changes.
6. Never declare a redesign complete from a generated image alone. Verify the actual rendered page and interactions.

The registry is validated by `design/design-tokens.schema.json`. `contracts.css` binds typography, geometry, surfaces and composed animation values to exact source selectors and media conditions; `contracts.javascript` binds scheduling and observer constants to reviewed code. A token change must match its implementation. Source fingerprints provide a second guard against changes outside those contracts. These are static checks, not a browser cascade or interaction simulator.

Use `design/component-tokens.css` for the homepage's scoped custom-property profiles. It preserves source order and responsive conditions for About, Achievement, Services, Skills, Process, Case Studies, Clients, Stories labels, buttons, footer wordmark and mobile menu. Pair it with the existing component styles; custom properties alone do not create a component. Neither generated reference export is injected into the current live cascade.

## Typography

- Section headings use `--font-display` (Overused Grotesk, Arial fallback), weight **500**, tracking **−.025em**. Copy uses `--font-copy` (Manrope, Arial fallback), normally weight **400**.
- Preserve two scales: large display headings (hero/services/process) and editorial headings (about/skills/case studies/clients). Exact responsive values remain in each existing component's CSS variables. The inventory records common sizes; it is not a mandate to force all headings to one size.
- Stories use **44px desktop**, **36px tablet**, **24px mobile**, line height **1.28 / 1.3 mobile**. Quotes use Manrope **25px desktop / 23px mobile**, weight 400. Names use 15px/600; roles 12px/400.
- Hero keeps its existing responsive tracking and approved italic yellow accent. Services line height is 1.12. Footer wordmark keeps weight 700, line height 1 and tracking −.055em. Its natural letter proportions must remain intact.
- Reuse the white pill section label and its existing shadow. All seven section labels now share `--section-label-*` inset, responsive type, border and shadow; Achievement uses the same white surface and dark text as Skills. Do not restore the removed decorative arrow icons. Do not add decorative yellow lines, new uppercase eyebrow systems, new fonts, bold display treatments or stretched wordmarks without a user-requested design change.
- Retain fluid wrapping, readable line lengths and intentional breaks. Do not shrink text to hide overflow or rasterize functional text into an image.

The exact heading sizes below are separate component roles. Do not create a universal heading size that flattens them. Desktop section conditions are preserved in the generated scoped export; hero refinements use pixel queries at 1440/1728.

| Role | Base/mobile | From 1024px | From 1440px | From 1728px |
| --- | --- | --- | --- | --- |
| About | 24px | 26px | 36px | 44px |
| Achievement | 32px | 28px | 40px | 48px |
| Services | fluid 34–36px | 36px | 52px | 62px |
| Skills | 24px | 24px | 36px | 44px |
| Process | 34px | 36px | 52px | 62px |
| Case studies | 22px | 24px | 36px | 44px |
| Clients | 24px | 24px | 36px | 44px |

Body 400 is a default, not a universal weight: services descriptions and process subcopy use 550; skill descriptions and stat labels use 500; button labels use 650. About badge text uses 500; other established section badge text normally uses 550. Preserve each role. `--font-serif` is an inherited compatibility alias for Overused Grotesk, not a serif family.

Navbar font/weight changes at existing responsive conditions are scoped behavior. Footer navigation, policy links, copyright, craft, local time, office details and social links share `--footer-small-font`: Manrope 400 at 14px/1.6, tracking 0 on desktop and mobile. The wordmark retains its approved display font. Contact typography and its utility font remain scoped exceptions.

## Color, surfaces and depth

- Use existing `--color-*`, `--gradient-*` and `--shadow-*` values from the token registry. Core navy/blue: #000b33, #012299, #3557ff, #3e62e4, #80bdff; yellow accent: #f5c80a. Neutral surfaces and opacity values are already defined.
- Yellow remains an accent in established roles. Do not introduce a new accent palette or unrelated dark/glass composition for normal pages.
- Existing scoped exceptions are intentional: policy buttons #ffdc36; story pagination #284cf4; policy blue hero; illustrated coastal footer. Match their current component styles rather than globally normalizing them.
- Reuse the exact dark-button gradient and shadow stack. Do not invent extra glow, heavy shadows, glass panels or decorative borders.
- The existing contact dialog is a scoped component, not the design reference for policy pages or other page layouts.

## Layout, spacing and shape

- Breakpoints: mobile through **743px**, tablet **744–1023px**, desktop from **1024px**, wide refinements at **1440px** and **1728px**. Keep the 108rem outer frame.
- Main frame gutters: 12px mobile, 56px from 744, 78px from 1440, 96px from 1728. Shared footer/policy chrome uses 20px mobile, 56px desktop, 78px from 1440 and 96px from 1728. Stories retains its documented independent gutter. Do not flatten these roles.
- Choose spacing from the approved inventory and the nearest existing component. Preserve section rhythm, card gutters, alignment, content width and whitespace hierarchy. Do not convert the existing geometry to a new spacing grid.
- Existing card roles include 14px compact, 20px standard and 24px wide radii; story cards use 12px. Pills remain fully round.
- Portfolio cards keep the existing scatter layout and type scale. Full project names wrap without ellipsis; title overflow remains visible so glyph descenders are not clipped at the established line height; category appears below the title. The mockup fills the remaining card space so longer source labels do not crop the card.
- Stories: 590px card height / 540px mobile; 30px padding / 24px mobile; 20px gap / 14px mobile; circular 48px avatars. Follow the exact responsive width tokens.
- Menu/dialog close controls share `--control-size` (44px), zero internal padding and a centred `--control-icon-size` (20px) vector X. No font glyph is used for closing. Menu/close controls need 44px touch targets; mobile navigation rows are 48px. Keep labels and close actions reachable on short screens. Preserve visible keyboard focus.

Preserve existing scoped breakpoint exceptions: hero mobile text through 767.984px, About outer-gap adjustment from 1726px, footer intro stacking through 1100px and footer wordmark refinement from 1800px. These are not new global breakpoints. `--section-gutter` controls the main frame; `--site-gutter` controls shared chrome. They intentionally differ on mobile.

## Icons, controls and interaction

- **Visible arrow decorations are prohibited**, including Unicode/emoji arrows, SVG arrow icons and corner arrows. Use meaningful text labels for navigation, contact and carousel controls. Keyboard ArrowLeft/ArrowRight behavior remains available.
- Carousel controls read **Previous / Next**: dark-gradient pills, 44px height, minimum width 80px desktop / 66px mobile, padding 0 18px / 0 12px, Manrope 500 at 12px / 11px. No blue square buttons or ornamental glyphs.
- Every interactive visual has a real action, accessible name, focus state and keyboard support. Do not add ornamental arrows that imply a link.
- Testimonials use native horizontal scrolling, touch swipe and scroll snap; ArrowLeft/Right/Home/End, buttons and real scroll-stop pagination. Disable previous/next controls at bounds. Do not auto-advance client stories.
- Menus and dialogs preserve scroll position, lock the background while open, restore focus and support dismissal. Match existing behavior rather than adding a second interaction system.

## Shared navigation and page chrome

- All pages reuse the homepage header and `dist/site-ui.js` for navigation, mobile menu, dialogs and page transitions. Do not create an independent policy navbar or duplicate contact logic.
- Select a homepage nav item only when its section exists on the homepage. Policy pages must not falsely select Home.
- Never save runtime indicator widths or transforms into navbar markup. Keep the active tab usable before JavaScript; measure the indicator with transitions disabled on startup, font settlement, pageshow and resize, then enable normal tab movement.
- The original dark coastal footer artwork is restored at the user's13 October request, retaining the refined navigation/office geometry. `dist/footer.css` is last in the live cascade and limits its rules to footer components. Inner padding80px top /32px bottom, mobile56px /32px; scene height900–1080px desktop,1200px tablet,1500px mobile. Keep artwork at its natural ratio, aligned to the bottom; use the original dedicated dark mobile image, not a desktop crop. The surface returns to the approved navy (#000b33). Mobile artwork keeps its natural bottom alignment and uses a24% top alpha fade so its sky joins the full-height navy surface without a horizontal color seam.
- Intro is470px + fluid navigation with80px gap; through1100px it stacks with32px gap. Navigation has three groups (Explore, Information, Connect), two columns on mobile with Connect across both. Every link has44px minimum height. Consistent translucent column rails and24px insets group navigation; offices use the same full-width three-column grid below a horizontal rule. Singapore aligns with Explore; Ahmedabad aligns with Information and spans the remaining two columns. Both retain the14px Manrope role and full verified addresses; remove inherited address width caps. On mobile offices stack with matching separator/padding rhythm. The white contact pill opens the shared dialog.
- The navy utility strip centers copyright, craft and local time in one three-column row on all sizes; mobile uses a scoped9–11px fluid utility role to fit the full labels without overflow. The wordmark uses natural Overused Grotesk700 proportions, without vertical stretching, its existing2000ms linear reveal mask, and the same vertical alpha fade over the actual approved logo asset (`assets/logo-light.png`), preserving symbol and lettering proportions. The top brand signature uses the same actual lockup at44px height. The invitation uses Overused50044px desktop /32px mobile,1.2 line-height,−.025em tracking; the tighter pitch follows the latest user correction.
- Policy hero padding is 160px / shared gutter / 72px; mobile 138px / 20px / 48px. Reading layout is 240px + minmax(0,760px), gap 80px (40px at 1100px); mobile stacks with 36px / 20px / 64px padding.

## Animation

- Use the motion registry's exact duration/easing for the matching role. Primary settling curve: `cubic-bezier(.22,1,.36,1)`. Card hover: 450ms, lift −5px; image hover: 650ms, scale 1.025. About hover: 360ms. Achievement flip: 650ms.
- Do not apply every available animation to every component. Several old reveal definitions remain in source while the effective cascade disables them. The current rendered behavior is authoritative; do not reactivate dormant effects while extracting tokens.
- Mobile first-screen hero content appears immediately. Animation must not delay access to content.
- Process interval 6000ms, observer threshold .2; achievement interval 6500ms, observer threshold .25. Hidden/offscreen/reduced-motion scheduling and achievement focus cancellation must remain intact. Observer thresholds describe notification points; current callbacks use `isIntersecting`, not a minimum-ratio guard. Manual controls remain usable.
- Process hover pauses scheduling. Achievement pointer entry clears its timer, but clicking or a visibility callback can reschedule while hovered; do not claim a persistent hover guard exists. Fixing that behavior requires a reviewed implementation change.
- Reduced motion: reveal immediately, remove established case-card/scatter/parallax transforms and dialog animation, stop automatic cycling, hide footer particles, show the wordmark without a reveal mask, and navigate the carousel instantly. Existing client-logo hover scale persists with globally shortened transitions; do not copy it into new reduced-motion interactions.
- Footer wordmark uses its **2000ms linear internal fade**,120ms delay, triggered once when the wordmark enters view (observer threshold.2); never stretch its glyphs. Footer light cycle and background drift use12000ms linear; drift alternates gently by6px horizontally /4px vertically with1.015 scale to hide edge seams. Background motion runs only while visible/document active, including mobile; UI text stays fixed. The water-reflection canvas runs only on desktop while visible and document active, about32ms per frame, DPR capped at1.5. Mobile/reduced-motion canvas allocation is1×1 and no frame loop runs. Reduced motion removes drift/parallax/light/reveal animations while leaving artwork and text visible. Pointer parallax is mouse-only.
- Policy entry: 700ms settling curve, opacity 0→1 and translateY(14px)→0; reading layout delay 120ms. Page exit: 180ms ease, opacity 1→0 and translateY(−6px). Reduced motion bypasses both.
- Page exits apply only to unmodified same-origin links to a different `.html` pathname. Preserve native hash/external/download/targeted/modified navigation and clear leaving state on `pageshow`.
- Do not add a footer Pause Motion button. Preserve automatic visibility/document/reduced-motion scheduling.
- Limit `will-change` to active motion and clean up loops/observers. Use transform/opacity where practical and keep geometry stable.

About stack geometry uses 420ms settling transitions; stat/state motion 320ms; top crossfade 280ms; label opacity 260ms. Flip content uses the separate `cubic-bezier(.16,1,.3,1)` curve: opacity 220ms, transform 280ms, entrance 420ms with 120ms delay. Process image/caption motion is 450ms with default ease. Achievement captions use 420ms settling transitions, with an existing 200ms opacity transition under reduced motion.

Contact opening uses 320ms ease-out, backdrop 350ms; brand entry 480ms, other content 550ms settling, with delays 40/90/140/200/250/300ms. Closing is 180ms **ease-in**, distinct from page exit **ease**. Do not substitute one easing role for another. Generic heading/badge/card/artwork reveals are marked `definedButDormant`; their presence in the registry does not authorize reactivation.

## Images, videos and factual content

- Testimonial card artwork is five individually generated images: cobalt, midnight, ice, royal, azure. Use responsive 480/800px WebP files in `dist/assets/stories/`, lazy decoding/loading and fixed dimensions. CSS gradients are not replacements for these assets.
- When the user requests generated artwork, generate and integrate the actual asset. Save project assets in the workspace; preserve masters. Follow `docs/testimonial-artwork-prompts.md`.
- Quotes come from `content/testimonials.json`; names, portraits, logos and results must be real approved content. Generated people, names, metrics and mockup quotes are not source material. User-requested testimonial drafts live in `content/testimonial-drafts.json` and `docs/testimonial-drafts.md`; they must not enter the verified list or public carousel until a client approves the wording and attribution. Addresses come from `content/studio.json`; never invent missing details.
- Decorative video is muted, inline, looped autoplay with controls disabled. Matching sources load on visibility; pause offscreen/hidden; posters are fallbacks. No decorative video play/pause UI.
- Reuse local fonts and optimized media. Preserve the existing lazy-loading strategy and compressed build budgets. A new page must not eagerly fetch every image or video.

## Acceptance criteria

A change is ready when its font role, responsive scale, colors, spacing, approved controls, motion and artwork match the homepage system; content fits at mobile and desktop sizes; keyboard/reduced-motion behavior works; references resolve; and relevant checks pass. Record deliberate user-requested exceptions by component and update the registry. Do not silently turn a scoped exception into a new global rule.

## Enforcement and review

- `npm run design:check` validates the schema, token/source contracts, both generated CSS exports, live CSS order and reviewed CSS/motion/markup/page-generator fingerprints. It rejects untracked top-level CSS/JS sources and known prohibited decorations on every generated HTML page. It fails when the homepage baseline changes without review.
- For an explicitly approved visual change: update semantic tokens/rules, build and inspect the result, record approval, desktop/mobile review and evidence in a workspace Markdown file, then run `npm run design:baseline -- --review-record=docs/uat/<review>.md`, `npm run design:tokens` and `npm run design:check`. The review-record gate checks documentation presence, not whether a human actually reviewed screenshots. Never refresh the baseline merely to silence a failure.
- Run `npm run design:test` when changing the checker or schema. Negative tests must demonstrate that altered typography, mobile geometry, easing, intervals and unknown registry fields are rejected.
- The baseline preserves exact source-scoped responsive custom properties, including component font sizes, line heights, padding, dimensions and breakpoint conditions. Prefer those exact values over general scale inventories.
- Automated checks detect source drift and reject known prohibited arrow/pause markup; they do not replace rendered mobile/desktop, accessibility or interaction review. Existing CSS is not globally refactored by this extraction.

## Files and maintenance

- `design/design-tokens.json`: reviewed token registry, provenance and component exceptions.
- `design/design-tokens.schema.json`: strict registry structure, units/types, easing syntax and numeric ranges.
- `design/design-tokens.css`: generated reusable CSS variables; do not edit directly.
- `design/component-tokens.css`: generated exact component custom-property scopes and responsive conditions; do not edit directly.
- `design/homepage-baseline.json`: reviewed source fingerprints and exact responsive component variable inventory.
- `scripts/design-tokens.mjs`: registry-derived generator and baseline consistency check.
- `scripts/design-contracts.mjs`: schema and source-contract validation; tests in `tests/design-contracts.test.mjs`.
- Existing CSS order in `scripts/build.mjs` remains the live rendering authority until a separately verified migration uses the registry throughout the application. This extraction does not claim that every existing literal has already been refactored.

## Paper component board — reviewed 13 October 2026

The shared desktop/mobile components and project-page templates are built in [Blitzstudio on Paper](https://app.paper.design/file/01M4SPS5N3ES3Z63XANVKQXNZ5/p-1-0). The website registry remains the source of truth; Paper tokens mirror its palette and control geometry.

- Privacy notice: compact bottom-right card, maximum480px,20px side/bottom insets plus the device bottom safe area. It must never sit below or follow the header. White surface,20px radius,20px padding and16px gap; copy is Manrope55016px/24px and40014px/21px. Copy sits above one44px action row on desktop/mobile, with settings left and acknowledgement right. Use the homepage dark button gradient/shadow. Hide it while a menu/dialog locks the page; hide the duplicate floating contact button while the notice is present so it cannot cover either action. It is a non-blocking disclosure notice. The user requested Google Analytics G-E9JLN2HQNT on17 October2026; disclose that active measurement accurately. Acknowledgement is not an analytics consent switch. This bottom placement supersedes the earlier top-popup specification under the user's13 October correction.
- Section labels: `--section-label-*` applies to About, Achievement, Services, Skills, Process, Case Studies and Clients. Mobile/base 16px, desktop 1024px 12px, 1440px 16px and 1728px 20px preserve the existing responsive scale. About retains its 500 weight; others 550.
- Project pages: shared homepage header/footer, white editorial body, native breadcrumb, live Overused Grotesk 500 heading (34px mobile / 44px tablet / 62px from1440), category metadata, full natural-ratio artwork, overview and related work/contact. Image radius20px, gap48px desktop /32px mobile, 240px metadata lane. Long names wrap with visible descenders. Existing verified assets and category are the source; brief/challenge/approach/results sections stay omitted until approved content exists.
- Paper cannot currently resolve the local display font. Its project titles use exact vector outlines from the existing Overused Grotesk Medium website font as a visual proof. Website headings remain selectable live text in the original local font. Paper copy/controls are editable Manrope. No substitute font is introduced on the website.

## Coastal illustration provenance

Original built-in imagegen assets and prompts are documented in `docs/coastal-footer-artwork.md`. The selected desktop/mobile masters live under `assets/footer-coast/`; optimized WebP variants are under `dist/assets/footer-coast/`. The scene carries visual detail; typography, links, address and controls remain live. Footer nav/office/utility type is one14px Manrope role. Paper artboards05/06 document the reviewed desktop/mobile composition.

## Page-experience accessibility corrections

Project metadata uses `--cs-readable-meta-color`, an alias of the existing `--color-text-soft`, to meet normal-text contrast on white. The disabled-text token is reserved for disabled controls. Project links keep their natural accessible names from the visible card content; do not override those names with aria-label or aria-labelledby. Skills retain native list items; a full-card native button opens contact and receives keyboard focus. Existing skill artwork hover effects use `:focus-within` so keyboard interaction preserves the same effect. The existing hero dotted-map image is preloaded to avoid its late CSS discovery.
