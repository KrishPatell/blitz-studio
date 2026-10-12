# October 12 studio content and footer review

## User approval and scope

The user requested 45 clients, 15+ client stories, broad Webflow / Framer / WordPress / Next.js / full-stack capability, removal of the redundant certification badge, all original portfolio entries and client logos, and one consistent footer navigation/type treatment. The user subsequently requested that we draft additional testimonials ourselves. These instructions authorize the content and footer changes; the approved homepage remains the design authority.

Five proposed testimonials are separated from the five verified published quotes. Drafts have no invented attribution, portrait or performance metric and are not rendered on the public website. India’s missing street address remains absent; the Singapore address comes from the published original homepage and contact page.

## Desktop review

Reviewed the actual page at 1280 × 960. All four statistics fit, the capability selector changes its active state and stack label, and every one of the 17 project titles fits without clipping. The existing scatter composition and type scales remain intact. The Champion Ceramics title had been truncated by the inherited one-line header; stacking the category under the full title and letting the mockup fill the remaining space corrected that observed defect.

The achievement card flips to the Framer and full-stack highlights. Its old certification image is absent. The original Webflow logo/profile link remains. The full footer fits in the viewport after scrolling to its identity, with one four-column site/policy navigation. Computed styles for all nine navigation links, copyright, craft, time and socials use Manrope at 12px / 19.2px; touch targets are at least 44px. The footer texture loaded, particle canvas measured 1265 × 824, animation state was active and light animation was running. The footer animation script is unchanged.

Cookie Policy and Cookie Settings open from the shared footer. The footer contact action opens the shared dialog; Escape closes it and restores focus to Let’s talk. The policy footer About link returns to index.html#about through the existing page transition. The policy header intentionally hides when the footer is visible; navigation was verified using the visible footer links.

## Mobile review

Reviewed at 375 × 812. The mobile hero copy fits with no horizontal overflow. All six videos remain muted autoplay with controls disabled. All 17 cards and titles fit. Champion Ceramics opens its 2048px detail asset; RemoteDesk opens the supplied 2048px before/after derivative. Both detail images completed loading with natural width 2048. The five verified story cards fit their fixed-height containers; Next updates horizontal carousel position and enables Previous. Footer site/policy links form two columns, use the same Manrope role, and retain the particle animation. The wordmark has no transform that stretches its letters.

Also checked the footer at 768 × 1024: four 142.25px navigation columns, the shared Manrope utility font and no horizontal overflow. The completed mobile wordmark fade shows the full natural-width name.

## Evidence

Local screenshots under `output/uat-v10/`:

- `stats-desktop.png`, `about-desktop.png`
- `cases-desktop.png`, `cases-mobile.png`
- `champion-mobile.png`, `remotedesk-mobile.png`
- `achievement-desktop.png`
- `hero-mobile.png`, `stories-mobile.png`
- `footer-desktop.png`, `footer-mobile.png`, `footer-mobile-bottom.png`

This is implementation QA, not a claim that the user reviewed these screenshots. Browser console inspection reported no errors. Source verification checks all 17 project entries, 18 logos, their original SHA-256 hashes, optimized variants and actual integration; it checks all five generated page footers and only the verified story list.

## Validation and limitations

`npm run build`, `npm run verify`, `npm run verify:content` and all 12 `design:test` checks pass. The baseline is refreshed only after this requested change and rendered review; schema/source contracts and generated exports remain mandatory. CSS remains below its existing 50KB gzip budget. Manual reduced-motion switching and real-device/network performance measurements were not repeated for this content update; the existing behavior and media-loading logic are preserved.
