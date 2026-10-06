# Mobile UAT and loading improvements — 6 October 2026

## Scope and environment

Tested the actual static site in the Codex browser (Chromium 154) with isolated browser frames at 320×568, 375×667, 414×736, 667×375 landscape, and 768×900, plus the normal 1280×720 desktop viewport. These are rendered breakpoint and interaction tests, not physical iPhone/Android certification. Device-specific battery-saving, network, and Safari behavior remain dependent on the user's device. H.264 files and media fallback behavior are provided for compatibility; a physical Safari run was not available.

The autoplay follow-up supersedes manual playback controls and video preference gating in this earlier test run; see [autoplay-loading.md](autoplay-loading.md) for current behavior.

## Issues fixed

- The five service previews fetched and decoded their WebM files even while far below the viewport. They now prepare URLs near their section, autoplay only while visible, and pause offscreen. Explicit pause is preserved. Data-saving and reduced-motion preferences permit manual playback.
- WebM-only previews now have H.264 MP4 primary sources. MP4 files use 4:2:0 encoding and fast-start metadata; WebM originals remain available as fallback/authoring assets. Phones receive a 720px hero reel.
- Longer testimonial quotes exceeded the original fixed 320px card height. Phone cards now have room for quotes and author details (420px minimum, 460px on narrow phones), with readable 20px type.
- About cards used radios, so another tap could not flip a card back. They now use reversible, exclusive checkbox selection.
- Menus and dialogs now lock the background while preserving the page position, restore scrolling on close, and close appropriately after navigation. Menus close on desktop resize and dismiss on outside interaction. Keyboard focus stays in an open menu.
- Touch controls have larger targets. Short phone/landscape dialogs scroll within the viewport, with the close control kept visible while scrolling. Safe-area spacing is respected. The floating contact button hides in the footer so it does not cover footer navigation.
- Large images now have responsive WebP derivatives. Source PNG/JPEG files are retained. There is one versioned stylesheet, two critical font preloads, and no runtime package dependency. Footer sampling starts when visible and its canvas refresh is capped at about 30 fps.

## Results

| Check | Result |
|---|---|
| Document horizontal overflow at tested widths | Pass |
| Skills columns: phone / tablet / desktop | 1 / 2 / 3 |
| Mobile menu shows all six section links | Pass |
| About card opens and reverses on a second tap | Pass |
| Statistics and partner card change | Pass |
| Process step selects the correct caption | Pass |
| All five visible service previews play MP4 | Pass; playback times advanced |
| Manual service pause | Pass |
| Project dialog and project-to-contact transition | Pass; image loaded and panel fits |
| Contact close / Escape / scroll restoration | Pass |
| Contact, email, Calendly, social destination URLs | Pass; inspected without submitting a booking/email |
| Long testimonial quotes and authors fit | Pass |
| Horizontal testimonial scrolling | Pass |
| Footer reveal, pause/resume, and contact action | Pass |
| Missing local assets, broken internal anchors, duplicate IDs | Pass via `npm run verify` |
| JavaScript syntax | Pass |
| MP4 codecs, dimensions, and fast-start metadata | Pass; `video-validation.json` |
| Development dependency audit | 0 vulnerabilities at verification time |

The browser console inspector produced MutationObserver errors while inspecting iframe documents. The application has no MutationObserver code or external runtime scripts; the iframe error/rejection listener recorded no application errors in the final run (`mobile-load.json`). These inspector errors are separate from the website's runtime checks.

## Loading evidence

Forty optimized images total 9,482,118 bytes in their original formats versus 2,002,130 bytes for their largest WebP derivatives: **78.9% smaller**. Phones select smaller derivatives where available. This is an asset-size comparison, not a measured Core Web Vitals score.

The five original WebM previews total 5,520,310 bytes; their primary MP4 derivatives total 2,505,011 bytes: **54.6% smaller**. The original 3,184,049-byte hero reel has a smaller phone variant. Individual sizes, codec details, and dimensions are in `video-validation.json`.

The final first-screen phone resource snapshot contains **no service video requests**; only the phone hero reel was fetched. `mobile-load.json` retains the resource list, local loading data, browser version, and zero captured application errors. Local timings and cache state are not production network benchmarks.

## Repeat checks

```sh
npm run build
npm run verify
npm audit
npm run preview
```

Repeat the interaction matrix after editing markup or motion. Asset/video originals, responsive derivatives, screenshots, and machine-readable results are included in the private repository. Temporary QA frame pages are excluded from deployment and removed after testing.

Compatibility references: [WebKit's iOS WebM support history](https://webkit.org/blog/15063/webkit-features-in-safari-17-4/), [MDN video preload behavior](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video), and [MDN autoplay guidance](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).
