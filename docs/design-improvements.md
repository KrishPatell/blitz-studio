# Design improvement plan

## This pass

1. Unify typography: Overused Grotesk for headings and Manrope for body copy. Remove Season Sans and Instrument Serif from active styles. Season Sans is the provisional interpretation of the disliked thin rounded font; confirm against the user's answer.
2. Repair the case-study scatter effect with a real scroll controller. Keep all six projects, settle cards into their grid, and add restrained hover/focus movement.
3. Reduce Skills Coverage to six cards: UI/UX, no-code development, graphic design, illustration, brand identity, and marketing design. Use three columns on desktop, two on tablet, and one on mobile, preserving the folder artwork.
4. Autoplay all existing clips, muted and looping, when visible. Remove hover-only playback. Retain pause controls and reduced-motion behavior.
5. Use Webflow's official logo and the Certified Partner badge already published on Blitz's site. Keep the achievement card tappable; expand the caption width so desktop lines stay intact.
6. Refine the contact dialog with a quiet fade, short staggered content reveal, and controlled closing. Preserve existing Calendly and email links.

## Testimonial expansion

The current Blitz site has five unique attributed testimonials; repeated carousel copies are not new reviews. No new attributed quotations were found in the public sources inspected. Prepare the full client roster and a structured content file, then populate new testimonial cards from approved client quotes, names, roles, and permission to publish. Client logos alone are not testimonials.

Pending: approved quotes for additional clients and confirmation of the disliked font. Keep this work open until those requirements are resolved.

## Next design refinements

- Develop project-specific case studies with actual problem, approach, outcome, and approved metrics, so each card opens a useful story.
- Replace generic service demo clips with Blitz's own project footage over time.
- Maintain a content checklist for testimonial provenance, project attribution, and partner marks.
- Evaluate video load and animation frame stability on a physical low-powered phone before the public domain switch.

## Validation

Verify computed fonts; count and inspect the six skill cards at mobile/tablet/desktop widths; inspect scroll-driven case-study transforms; confirm muted autoplay actually advances video time; test achievement taps through every state and return to the official badge; check caption line boxes; test dialog open, close, Escape, focus restoration, and mobile fit; inspect console errors and local asset paths; publish the verified source state.

## Sources

- Current studio content: https://blitzstudio.xyz/
- Verified studio partner listing: https://webflow.com/@blitzstudio
- Webflow logo assets: https://brand.webflow.com/brand-assets
- Certified Partner badge: the SVG linked by the current Blitz site, https://cdn.prod.website-files.com/66c9ae84e04685acefff4349/685ff01ef39ada4a1eacd05b_certified_partner_badge_white.svg

## Validation completed

- Desktop (1280px): consistent section heading family, six skills cards, no missing local assets or duplicate IDs.
- Service previews: observed playback advancing in all five clips, and MVP pause works.
- Case-study grid: observed intermediate scatter progress and all six cards settling to zero translation.
- Partner card: pointer and keyboard cycle back to the official badge; desktop caption occupies one line.
- Phone (390px): contact panel fits without horizontal overflow; tablet (768px) skills grid has two columns.
- Contact closes with Escape; no browser console errors observed. Reduced motion fallbacks reviewed in source.
