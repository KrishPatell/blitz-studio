# Blitz Studio website

A responsive, standalone website based on the visual direction of https://keitoto.com, using Blitz Studio branding and the portfolio assets from https://blitzstudio.xyz/.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` from this directory and open http://127.0.0.1:4173/.

## Edit

- `dist/index.html`: sections, copy, project cards, client testimonials, and contact links.
- `dist/styles.css`: desktop/mobile layout, colors, typography, and transitions.
- `dist/app.js`: portfolio carousel and dialogs, process tabs, mobile navigation, and local time.
- `dist/assets/`: the existing Blitz Studio logo kit and portfolio images downloaded from the current public website.

No build step or dependencies are required. Geist loads from Google Fonts, with Arial as the fallback. Calendly and email links use the destinations on the existing Blitz Studio website. No form submission backend is included.

## Content notes

The homepage is a new visual and editorial treatment of Blitz Studio's existing offering. Portfolio images and project names come from the current website; the project summaries and positioning copy are newly written. Client quotes are reproduced from the existing website; the Nitin Mahajan quote is shortened to its first two sentences. Keitoto's client names, team portraits, achievements, and project work are not used.

The review site is private. It does not alter the existing blitzstudio.xyz domain or website.
