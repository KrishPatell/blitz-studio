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
- `dist/app.js`: navigation, About cards and statistics, service playback, process steps, partner card, testimonial carousel, and native project/contact dialogs.
- `dist/styles.css`, `blitz.css`, `footer.css`, `contact.css`, `refinements.css`, `mobile.css`: source styles. `npm run build` combines them into the versioned `dist/site.css` and versions scripts.
- `dist/footer.js`, `case-study-motion.js`: footer pixels and scroll animation. Motion pauses offscreen and respects reduced-motion preferences.
- `content/testimonials.json`: the existing client quotes and their source. Add only approved attributed quotes.
- `docs/uat/mobile-uat.md`: mobile testing scope, fixes, results, and limitations.

All production resources are local. The only external destinations are Webflow, LinkedIn, X, email, and the existing Calendly booking link. There is no form backend, tracking SDK, or runtime JavaScript dependency.

## Loading and media

Service previews prepare their sources near the viewport and autoplay while visible. Explicit pause is retained. Reduced-motion and data-saving preferences suppress automatic playback while allowing manual play. H.264 MP4 is the primary service format; original WebM files remain as fallback/authoring assets. Phones receive a 720px portfolio reel.

Images have responsive WebP derivatives, local posters, explicit dimensions, asynchronous decoding, and lazy loading. Original artwork is retained. The footer samples the selected responsive texture only when visible and draws at about 30 fps with capped pixel density.

Optional media regeneration:

```sh
npm ci
npm run optimize:images
# Requires ffmpeg with libx264:
python3 scripts/optimize-video.py
npm run build
npm run verify
```

The asset size comparison is retained in `docs/uat/image-optimization.json`. No GitHub Pages or automatic public publication is enabled by this repository. The GitHub repository is private; the website's existing hosting audience is managed independently.

## Content and design

Adapted from the requested Keitoto reference with Blitz branding, projects, client logos, generated artwork, and the selected blue pixel footer. Statistics reflect the studio's public content: 17 portfolio projects, five client stories, two build platforms, and one design-to-launch partner. The team section is omitted. Typography uses Overused Grotesk and Manrope; small utility labels use system monospace.
