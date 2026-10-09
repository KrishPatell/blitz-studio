# Blitz Studio design rules

The existing homepage is the visual authority. These rules apply to every new section, component, page, policy page, responsive layout and interaction. Explicit user instructions take precedence. A generated mockup is an artwork reference, not permission to redefine typography, controls or content.

## Required workflow

1. Read this file and `design/design-tokens.json` before editing UI.
2. Identify the closest existing homepage component and its final CSS after all overrides. Match that component's role, proportions and behavior.
3. Reuse its classes and semantic tokens. Retain only approved functional icons; removed arrow decorations must stay removed. Use `design/design-tokens.css` when a consumer needs shared variables. This reference file is generated and is not automatically inserted into the current site's cascade.
4. New styles must consume existing semantic variables for fonts, colors, gradients, shadows, spacing and motion whenever a matching token exists. Do not duplicate raw values or substitute a different role. If a needed token is absent, add a named semantic token with source/rationale. Preserve an existing scoped exception rather than changing the entire palette or spacing system.
5. Update JSON, run `npm run design:tokens`, then `npm run design:check` and the relevant build/verification checks. Check desktop and mobile appearance when UI changes.
6. Never declare a redesign complete from a generated image alone. Verify the actual rendered page and interactions.

## Typography

- Section headings use `--font-display` (Overused Grotesk, Arial fallback), weight **500**, tracking **−.025em**. Copy uses `--font-copy` (Manrope, Arial fallback), normally weight **400**.
- Preserve two scales: large display headings (hero/services/process) and editorial headings (about/skills/case studies/clients). Exact responsive values remain in each existing component's CSS variables. The inventory records common sizes; it is not a mandate to force all headings to one size.
- Stories use **44px desktop**, **36px tablet**, **24px mobile**, line height **1.28 / 1.3 mobile**. Quotes use Manrope **25px desktop / 23px mobile**, weight 400. Names use 15px/600; roles 12px/400.
- Hero keeps its existing responsive tracking and approved italic yellow accent. Services line height is 1.12. Footer wordmark keeps weight 700, line height 1 and tracking −.055em. Its natural letter proportions must remain intact.
- Reuse the white pill section label and its existing shadow. Do not restore the removed decorative arrow icons. Do not add decorative yellow lines, new uppercase eyebrow systems, new fonts, bold display treatments or stretched wordmarks without a user-requested design change.
- Retain fluid wrapping, readable line lengths and intentional breaks. Do not shrink text to hide overflow or rasterize functional text into an image.

## Color, surfaces and depth

- Use existing `--color-*`, `--gradient-*` and `--shadow-*` values from the token registry. Core navy/blue: #000b33, #012299, #3557ff, #3e62e4, #80bdff; yellow accent: #f5c80a. Neutral surfaces and opacity values are already defined.
- Yellow remains an accent in established roles. Do not introduce a new accent palette or unrelated dark/glass composition for normal pages.
- Existing scoped exceptions are intentional: policy buttons #ffdc36; story pagination #284cf4; policy blue hero; pixel footer. Match their current component styles rather than globally normalizing them.
- Reuse the exact dark-button gradient and shadow stack. Do not invent extra glow, heavy shadows, glass panels or decorative borders.
- The existing contact dialog is a scoped component, not the design reference for policy pages or other page layouts.

## Layout, spacing and shape

- Breakpoints: mobile through **743px**, tablet **744–1023px**, desktop from **1024px**, wide refinements at **1440px** and **1728px**. Keep the 108rem outer frame.
- Main frame gutters: 12px mobile, 56px from 744, 78px from 1440, 96px from 1728. Shared footer/policy chrome uses 20px mobile, 56px desktop, 78px from 1440 and 96px from 1728. Stories retains its documented independent gutter. Do not flatten these roles.
- Choose spacing from the approved inventory and the nearest existing component. Preserve section rhythm, card gutters, alignment, content width and whitespace hierarchy. Do not convert the existing geometry to a new spacing grid.
- Existing card roles include 14px compact, 20px standard and 24px wide radii; story cards use 12px. Pills remain fully round.
- Stories: 590px card height / 540px mobile; 30px padding / 24px mobile; 20px gap / 14px mobile; circular 48px avatars. Follow the exact responsive width tokens.
- Menu/close controls need 44px touch targets; mobile navigation rows are 48px. Keep labels and close actions reachable on short screens. Preserve visible keyboard focus.

## Icons, controls and interaction

- **Visible arrow decorations are prohibited**, including Unicode/emoji arrows, SVG arrow icons and corner arrows. Use meaningful text labels for navigation, contact and carousel controls. Keyboard ArrowLeft/ArrowRight behavior remains available.
- Carousel controls read **Previous / Next**: dark-gradient pills, 44px height, minimum width 80px desktop / 66px mobile, padding 0 18px / 0 12px, Manrope 500 at 12px / 11px. No blue square buttons or ornamental glyphs.
- Every interactive visual has a real action, accessible name, focus state and keyboard support. Do not add ornamental arrows that imply a link.
- Testimonials use native horizontal scrolling, touch swipe and scroll snap; ArrowLeft/Right/Home/End, buttons and real scroll-stop pagination. Disable previous/next controls at bounds. Do not auto-advance client stories.
- Menus and dialogs preserve scroll position, lock the background while open, restore focus and support dismissal. Match existing behavior rather than adding a second interaction system.

## Shared navigation and page chrome

- All pages reuse the homepage header and `dist/site-ui.js` for navigation, mobile menu, dialogs and page transitions. Do not create an independent policy navbar or duplicate contact logic.
- Select a homepage nav item only when its section exists on the homepage. Policy pages must not falsely select Home.
- Footer inner padding is 112px top / 40px bottom, mobile 80px / 28px. Intro gap is 40px; at 1100px it stacks with 28px gap. Legal and utility rows follow the registry rather than introducing extra separators.
- Policy hero padding is 160px / shared gutter / 72px; mobile 138px / 20px / 48px. Reading layout is 240px + minmax(0,760px), gap 80px (40px at 1100px); mobile stacks with 36px / 20px / 64px padding.

## Animation

- Use the motion registry's exact duration/easing for the matching role. Primary settling curve: `cubic-bezier(.22,1,.36,1)`. Card hover: 450ms, lift −5px; image hover: 650ms, scale 1.025. About hover: 360ms. Achievement flip: 650ms.
- Do not apply every available animation to every component. Several old reveal definitions remain in source while the effective cascade disables them. The current rendered behavior is authoritative; do not reactivate dormant effects while extracting tokens.
- Mobile first-screen hero content appears immediately. Animation must not delay access to content.
- Process interval 6000ms, visibility threshold .2; achievement interval 6500ms, threshold .25. Pause automatic motion when hidden, offscreen, hovered, reduced-motion is requested, and on achievement focus. Manual controls remain usable.
- Reduced motion: reveal immediately, remove parallax/hover/scatter transforms and dialog animation, stop automatic cycling, hide footer particles, show the wordmark without a reveal mask, and navigate the carousel instantly.
- Footer wordmark uses its **2000ms linear internal fade**, 120ms delay; never stretch its glyphs. Footer light cycle is 12000ms linear. Canvas runs only while visible and document active, about 32ms per frame, DPR capped at 1.5. Pointer parallax is mouse-only.
- Policy entry: 700ms settling curve, opacity 0→1 and translateY(14px)→0; reading layout delay 120ms. Page exit: 180ms ease, opacity 1→0 and translateY(−6px). Reduced motion bypasses both.
- Page exits apply only to unmodified same-origin links to a different `.html` pathname. Preserve native hash/external/download/targeted/modified navigation and clear leaving state on `pageshow`.
- Do not add a footer Pause Motion button. Preserve automatic visibility/document/reduced-motion scheduling.
- Limit `will-change` to active motion and clean up loops/observers. Use transform/opacity where practical and keep geometry stable.

## Images, videos and factual content

- Testimonial card artwork is five individually generated images: cobalt, midnight, ice, royal, azure. Use responsive 480/800px WebP files in `dist/assets/stories/`, lazy decoding/loading and fixed dimensions. CSS gradients are not replacements for these assets.
- When the user requests generated artwork, generate and integrate the actual asset. Save project assets in the workspace; preserve masters. Follow `docs/testimonial-artwork-prompts.md`.
- Quotes come from `content/testimonials.json`; names, portraits, logos and results must be real approved content. Generated people, names, metrics and mockup quotes are not source material. Addresses come from `content/studio.json`; never invent missing details.
- Decorative video is muted, inline, looped autoplay with controls disabled. Matching sources load on visibility; pause offscreen/hidden; posters are fallbacks. No decorative video play/pause UI.
- Reuse local fonts and optimized media. Preserve the existing lazy-loading strategy and compressed build budgets. A new page must not eagerly fetch every image or video.

## Acceptance criteria

A change is ready when its font role, responsive scale, colors, spacing, approved controls, motion and artwork match the homepage system; content fits at mobile and desktop sizes; keyboard/reduced-motion behavior works; references resolve; and relevant checks pass. Record deliberate user-requested exceptions by component and update the registry. Do not silently turn a scoped exception into a new global rule.

## Enforcement and review

- `npm run design:check` validates the registry, generated CSS, live CSS order and reviewed CSS/motion/markup/page-generator fingerprints. It fails when the homepage baseline changes without review.
- For an explicitly approved visual change: update semantic tokens/rules, build and inspect the result, then run `npm run design:baseline`, `npm run design:tokens` and `npm run design:check`. Never refresh the baseline merely to silence a failure.
- The baseline preserves exact source-scoped responsive custom properties, including component font sizes, line heights, padding, dimensions and breakpoint conditions. Prefer those exact values over general scale inventories.
- Automated checks detect source drift and reject known prohibited arrow/pause markup; they do not replace rendered mobile/desktop, accessibility or interaction review. Existing CSS is not globally refactored by this extraction.

## Files and maintenance

- `design/design-tokens.json`: reviewed token registry, provenance and component exceptions.
- `design/design-tokens.css`: generated reusable CSS variables; do not edit directly.
- `design/homepage-baseline.json`: reviewed source fingerprints and exact responsive component variable inventory.
- `scripts/design-tokens.mjs`: registry-derived generator and baseline consistency check.
- Existing CSS order in `scripts/build.mjs` remains the live rendering authority until a separately verified migration uses the registry throughout the application. This extraction does not claim that every existing literal has already been refactored.
