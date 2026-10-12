# Navbar initial-load fix — October 12, 2026

## User-requested approval

The user supplied a screen recording, asked to fix the navbar animation immediately after page load, and authorized publication and a push to GitHub main. This is a startup bug fix within the existing homepage design.

## Cause and change

The tracked homepage included runtime indicator geometry: an already-visible pill with a 1904px inline width. Its CSS width transition animated to the measured tab width when the shared navigation script started. Builds now remove transient indicator geometry and visibility. Until measurement completes, the active link supplies its normal dark background, the indicator stays hidden, and navbar transitions are disabled through the new `--nav-initial-transition` token. JavaScript measures and flushes geometry before enabling normal tab transitions. Font settlement, pageshow and resize use the same synchronization; the scroll handler compares like-for-like hash strings rather than rewriting the active state on every scroll.

## Desktop review and evidence

At 1440 × 900, an isolated browser comparison delayed shared navbar startup by 300ms. The old source began at 1904px and emitted a width transition through 1440, 1052, 751 and smaller intermediate widths until reaching 63px. The corrected source emitted no startup transition and measured 63px immediately when initialized. The hidden, uninitialized indicator itself has only its 1px border width; the active link provides the visible correctly sized pill before initialization.

Normal About navigation still emitted width and transform transitions. Resizing to 1280px synchronized the 53px About pill with its 53px link without adding a resize transition. The real, uninstrumented homepage then measured a 63px Home pill and a 63px Home link at 1440px. A policy page retained no active tab and zero indicator opacity.

The temporary comparison pages were removed before verification and packaging. They deliberately delayed only the shared navbar script; the main application reported its expected missing-UI dependency in those isolated pages. They were used solely to observe navbar startup geometry. The production script order is unchanged.

Evidence: `output/nav-load-fix/desktop.png`, `output/nav-load-fix/mobile-menu.png`, the supplied recording’s extracted frames and recorded comparison output from browser QA.

## Mobile review

At 375 × 812, the mobile menu opened, displayed all section links and its contact action, and closed with aria-expanded=false. Mobile styling and its existing animation timing remain unchanged.

## Verification

Build and existing site/content checks are required. All five HTML pages are checked to reject persisted indicator styles or initial visible classes. The token/source contract binds the startup transition override. Refresh the reviewed baseline only after this requested rendered review; preserve normal scroll navigation, shared policy navigation and reduced-motion behavior.
