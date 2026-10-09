# Navigation, footer and policy-page consistency — 9 October 2026

Scope: remove visible arrow/corner decorations and footer Pause Motion, align footer rows, share homepage navigation/contact UI on four policy pages, and animate separate-page entry/navigation.

## Verified result

| Requirement | Evidence |
| --- | --- |
| No arrow/corner decorations | Rendered desktop/mobile screenshots; SVG audit leaves only menu/social/About artwork/process ring; all-page markup verification rejects arrow glyphs and removed decoration classes. Contact actions and Previous/Next controls use text. |
| No footer Pause Motion | All-page markup verification and rendered footer DOM count zero. Footer automatic visibility/document/reduced-motion scheduling remains. |
| Consistent footer padding | 1280px view: all inner/intro/offices/legal/utility rows left 56px and right 1209px in a 1265px document. 375px view: all rows left 20px and right 340px in a 360px document. No horizontal overflow. |
| Responsive footer | 744, 1024, 1440 and 1728px viewport checks: no page or footer-nav overflow. Intro stacks through 1100px; wide gutters match 78/96px. |
| Shared navbar | Generated mobile/desktop headers match homepage markup with only destination/selection adaptations; verified by all-page assertions. All four desktop policy navs use Manrope 16px and the same six labels. All four mobile menus open with the same labels and no arrows. |
| Contact popup | Home footer and all four policy footers open the shared dialog. All four mobile policy menu CTAs open it; close tap works after layering fix. Desktop Escape closes and restores focus to LET’S TALK; background lock is released. |
| Policy entry animation | Actual desktop navigation to all four policy pages: computed policy-entry / 700ms, initial opacity 0–0.106 and translateY approaching zero. Mobile pages retain the same entry animation. |
| Page navigation | Home→Terms and sidebar transitions among all four policy pages navigate successfully. Body exit uses 180ms opacity/transform transition and shared same-origin link handling. Hash, external, modified and download navigation remain native. |
| Carousel controls | Mobile Previous/Next pills are 44px high; Next scrolls the native testimonial viewport and enables Previous. No icons or page overflow. |
| Decorative video behavior | Six rendered video elements retain controls=false, muted=true. Existing lazy-source/autoplay verification passes. |

## Fixes found during browser review

The homepage lacked the new shared script, so app.js could not initialize. It now loads site-ui.js before app.js; regression checks enforce order on every build. The animated contact brand row overlapped the mobile close button. The close control now uses a 44px touch target above the row, verified by actual pointer dismissal on all four policy pages. Policy footer contact links retain data-contact instead of bypassing the shared popup. Live reduced-motion changes now reschedule/clear pending process and achievement cycles.

## Checks and limits

`npm run build`, `npm run verify` and `npm run design:check` pass. Browser checks used the Codex in-app browser at 375×812 and 1280×960, plus remaining breakpoints above. Evidence is retained locally in output/uat-v9/. OS reduced-motion preference switching was not emulated; corresponding CSS/JavaScript paths were reviewed. This is a UI and navigation verification, not a legal-content review.
