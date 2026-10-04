# Blitz Studio website

Responsive static website adapted from the requested Keitoto reference with Blitz Studio branding, projects, client logos, and testimonials.

## Preview

Run `python3 -m http.server 4173 --directory dist` and open http://127.0.0.1:4173.

## Implementation

- Local Season Sans, Overused Grotesk, Manrope, and Instrument Serif typography.
- Animated About card flips and interactive SVG statistics, achievement card, service videos, skills folders, process stepper, testimonial carousel, and metallic footer.
- Generated About prisms, achievement hand, and Blitz footer emblem, served as responsive WebP assets. Original images and generation prompts are retained in the workspace's `output/website-v2` folder.
- Blitz portfolio reel and six project previews. Five existing client testimonials and sixteen client logos sourced from the previous Blitz website.
- Contact dialog links to the existing studio email and Calendly. No form backend required.
- Keyboard controls, native dialogs, reduced-motion handling, and responsive navigation.

## Content

The statistics use the studio's existing public content: 17 portfolio projects, five testimonials, two build platforms, and one design-to-launch partner. They do not represent the reference agency's client counts. The team section is omitted as requested.

## Verification

Browser checked at mobile, tablet, and desktop widths; verified menu, About flips and statistics, achievement changes, process selection, project dialogs, testimonial navigation, contact links, and footer. JavaScript syntax validated with `node --check dist/app.js`.

Deployment configuration is in `.openai/hosting.json`; Sites manages source synchronization and private preview hosting.
