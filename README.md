# Blitz Studio

Complete responsive static website for Blitz Studio: source HTML, CSS, JavaScript, local fonts, images, video originals and optimized variants, content provenance, build scripts, and UAT evidence.

## Preview

Requires Node.js 20.9+ and Python 3. No installation is needed to build, check, or preview the website.

```sh
npm run build
npm run verify
npm run preview
```

Open `http://127.0.0.1:4173`. Deploy the `dist/` directory to static hosting; the existing Sites configuration is in `.openai/hosting.json`.

## Editing

- `dist/index.html`: content and markup.
- `dist/site-ui.js`: shared navbar, mobile menu, contact dialogs and page transitions.
- `dist/app.js`: About cards and statistics, service autoplay, process steps, partner card, testimonial carousel, and native project/contact dialogs.
- `dist/styles.css`, `blitz.css`, `footer.css`, `contact.css`, `refinements.css`, `mobile.css`, `stories.css`, `privacy.css`, `consistency.css`: source styles. `npm run build` combines them into `dist/site.css`, inlines the styles in HTML to remove a blocking request, and versions scripts/media.
- `dist/footer.js`, `case-study-motion.js`: footer pixels and scroll animation. Motion pauses offscreen and respects reduced-motion preferences.
- `content/testimonials.json`: the existing client quotes and their source. Add only approved attributed quotes.
- `docs/uat/mobile-uat.md`: mobile testing scope, fixes, results, and limitations.

All production resources are local. The only external destinations are Webflow, LinkedIn, X, email, and the existing Calendly booking link. There is no form backend, tracking SDK, or runtime JavaScript dependency.

## Loading and media

Videos are decorative: muted, inline, looping autoplay with no play/pause buttons, click overlays, or native controls. Each starts when visible and pauses offscreen/background to avoid unnecessary decoding. The hero waits until after first paint before preparing its URLs. Phone visitors receive 640px H.264 variants; desktops receive the optimized 960px hero and existing 1280px service previews. A visible portfolio poster appears while the hero loads. Browser policies can still block autoplay (for example, iOS Low Power Mode); an ordinary page interaction retries playback without adding video controls.

Images have responsive WebP derivatives, local posters, explicit dimensions, asynchronous decoding, and lazy loading. Original artwork is retained. The footer samples the selected responsive texture only when visible and draws at about 30 fps with capped pixel density.

Optional media regeneration:

```sh
npm ci
npm run optimize:images
# Requires ffmpeg with libx264 and the installed sharp development dependency:
python3 scripts/optimize-video.py
npm run build
npm run verify
```

The asset size comparison is retained in `docs/uat/image-optimization.json`. No GitHub Pages or automatic public publication is enabled by this repository. The GitHub repository is private; the website's existing hosting audience is managed independently.

## Content and design

Adapted from the requested Keitoto reference with Blitz branding, projects, client logos, generated artwork, and the selected blue pixel footer. Statistics reflect the studio's public content: 17 portfolio projects, five client stories, two build platforms, and one design-to-launch partner. The team section is omitted. Typography uses Overused Grotesk and Manrope; small utility labels use system monospace.

## Design system

Read [DESIGN_RULES.md](DESIGN_RULES.md) before UI changes. [design/design-tokens.json](design/design-tokens.json) records the homepage system; [design/design-tokens.css](design/design-tokens.css) is generated for reuse. [design/homepage-baseline.json](design/homepage-baseline.json) preserves 151 scoped variable groups and fingerprints of the 17 current CSS, motion, markup and page-generation sources. `AGENTS.md` requires all future UI work to read and follow these files.

Run `npm run design:tokens` after registry edits, then `npm run design:check`. The check validates token dependencies, homepage palette/font/gradient defaults, responsive shared gutters, generated CSS, build order, prohibited markup and source drift. It flags homepage style, motion and markup changes until the visual changes, tokens and rules have been reviewed. After an explicitly approved design change, build and inspect desktop/mobile rendering, then run `npm run design:baseline` to record the new baseline. Never refresh it solely to silence a failure.

The generated stylesheet is reusable but is not injected into the existing cascade. This extraction preserves current rendering and does not claim that all existing CSS literals have been migrated. Visual and interaction review remain required.
