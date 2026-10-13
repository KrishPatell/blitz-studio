# Navy footer and bottom privacy notice review — 13 October2026

## Approval and scope

The user requested the original darker blue illustrated footer with the refined hierarchy, spacing, column rails and aligned offices retained. Their latest correction explicitly requires tighter heading line height, the actual logo asset, a centered single utility row and removal of the abrupt mobile background color seam. They also explicitly requested moving the cookie notice away from the top and pushing the completed site to GitHub main.

## Implementation

- Restore original desktop and dedicated mobile coastal masters; use existing responsive WebP exports.
- Keep navigation/office grid, full verified addresses and gentle visibility-aware background motion.
- Use the approved `assets/logo-light.png` lockup for both footer signatures, preserving its772:120 proportions. Apply the internal vertical alpha fade to the large logo and retain its linear reveal.
- Tighten invitation line height to1.2: desktop44px/52.8px, mobile32px/38.4px.
- Blend the mobile artwork's top24% into the full-height navy background, avoiding a hard image-start edge without stretching the illustration.
- Center copyright, Design + Development and local time in three columns on one row. Mobile has an explicitly scoped9–11px fluid utility role to fit the full labels.
- Move privacy notice to20px above the bottom safe area with480px maximum width; remove header measurement/resize positioning. Copy sits above a44px action row. Hide the floating contact control while the notice is present to avoid overlapping controls. Preserve essential-only acknowledgement behavior.

## Desktop/mobile review and evidence

Reviewed actual local site at1440×1000 and390×844, with a320px narrow viewport fit check. Desktop navigation and office heading lanes match at628px and900.664px. All three utility paragraphs share the same vertical position and center alignment. No page horizontal overflow at390 or320. Mobile canvas remains1×1 and footer motion runs only while visible. Both signatures resolve to the actual logo asset; natural aspect ratio is preserved.

Screenshots: `output/navy-footer-uat/desktop.jpg`, `mobile-upper.jpg`, `mobile-lower.jpg`. The full mobile clip API returned an inaccurate region; acceptance uses the native upper/lower viewport screenshots instead. Reviewed the corresponding desktop/mobile Paper boards, repaired inherited flex-basis causing office overflow, and updated logo, line pitch, utility alignment and gradual sky blending. Paper artwork uses the same approved masters and actual font outline proofs; production heading remains live text.

Spacing, typography, contrast, alignment, artboard fit and repetition review: tighter heading groups remain distinct from body/CTA; preserved link rails and office lanes align; text fits; dark sky joins artwork smoothly; logo and illustration provide scale contrast without adding decorative elements.

Cookie behavior previously verified on this same pending change: desktop480×155px card and mobile335×176px card, both20px above viewport bottom,44px actions; floating contact hidden while notice exists. Got it removes the notice and reload retains acknowledgement. Evidence: `output/cookie-bottom-uat/mobile.jpg`.

This baseline refresh records the explicitly requested visual changes after rendered review; it does not change typography or UI rules elsewhere.
