# Coastal footer implementation review — 13 October2026

## User authorisation and visual authority

The user explicitly requested a much higher quality footer using illustrated references and asked to continue designing. This approves replacement of the prior pixel atmosphere. Homepage fonts/palette/control behaviours remain the authority; the new footer is documented as a scoped visual change. Source is saved locally and published/pushed to main under the continuing authorisation.

## Image-first and Paper review

Generated a complete desktop footer comp, a separate text-free desktop artwork and two standalone mobile artwork compositions with the built-in imagegen tool. Selected mobile-v2 after review exposed excessive empty sky. Native masters and the exact generation specifications are documented in docs/coastal-footer-artwork.md. The generated comp informed composition, not a font substitution: implementation uses live Overused Grotesk500 heading,700 natural wordmark and Manrope copy.

Built Paper artboards05/06 in the user's Blitzstudio file. Screenshot checkpoints assessed spacing, typography, contrast, alignment, fit and repetition. Corrected dark inherited navigation headings, office/email overlap with bright architecture, excessive mobile sky and row pitch. Retrieved exact layout/computed styles before implementation. All working indicators released. No artwork from the references was copied.

## Desktop browser review

Actual measured CSS viewport1440×1100. Footer height900.40px, with no horizontal overflow. Invitation is44px/56.32px Overused500, with approved−.025em tracking; navigation, addresses and utility use Manrope14px/22.4px. Office headings use550 at the same size; the two office slots are224px each, with32px gap and480px maximum lane. The wordmark uses Overused700 at its natural proportions. Desktop1586 WebP source selected. All text is real HTML.

Initial rendered review caught older policy CSS overriding office type/columns. Moved the footer stylesheet to the end of the live cascade, retaining subtree-scoped selectors and existing page UI. Rebuilt and confirmed the correct14px office role, uncluttered layout and legible solid navy utility strip. Desktop footer image reviewed against the Paper comp. The contact action opens the existing dialog; closing restores its origin.

Evidence: output/coastal-footer-uat/desktop-footer.jpg (complete native footer screenshot), desktop-context.jpg.

## Mobile and interaction review

Measured CSS viewport390×844;375px content width after the native scrollbar. Footer height1421.20px, with no horizontal overflow. Heading32px/40.96px Overused500; all11 nav links compute44px height. Navigation has two columns and a full-width Connect group. Mobile480 WebP selected; the dedicated composition keeps architecture, water and boat visible. Country/office/utility text retains Manrope14px. Keyboard focus is clearly visible on Cookie Policy. Native upper/detail screenshots reviewed.

The desktop contact link opens the shared contact dialog, and its close action works. Cookie Policy navigates to the correct separate page and displays the same footer. On this page, the footer motion state isfalse while offscreen; after scrolling to the footer it becomes visible. The wordmark waits while offscreen, then marks entered and computes2s linear with120ms delay when it enters view. Mobile canvas is1×1, with no drawing loop. Reduced-motion behaviour is verified in source/contracts: no mask/scene transform/reflection animation and immediate wordmark. No OS accessibility setting was changed.

Evidence: output/coastal-footer-uat/mobile-navigation.jpg, mobile-detail.jpg. The auxiliary mobile-navigation-context.jpg captures upper content and is not claimed to show the complete footer.

## Performance and content

Optimised native and smaller WebP variants, no enlargement. Footer artwork is lazy-loaded/async decoded with intrinsic dimensions and picture media selection. Removed image-sampling allocation and pixel field generation; desktop draws42 small reflection strokes only while visible/document active, capped32ms/DPR1.5. Mobile and reduced motion allocate1×1 canvas. Existing six decorative autoplay videos remain intact and have no controls. No new scripts, tracking, fabricated address, testimonial or client result added. Removed an outdated pixel-animation sentence from the Cookie Policy.

All22 generated pages reuse one footer builder and homepage header/contact UI. Updated semantic tokens, strict schema, source contracts, design rules and live CSS order. The reviewed source inventory includes the footer builder. Build/site/content/SEO checks and12 design tests pass before the baseline refresh. CSS remains below50KB gzip. Refresh is backed by the explicit redesign request and rendering evidence, not just to silence a mismatch.
