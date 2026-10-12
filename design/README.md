# Homepage design system

The homepage's final CSS cascade is the authority. Start with [the rules](../DESIGN_RULES.md) and [the registry](design-tokens.json). Explicit user changes take precedence and require updating the definitions with the implementation.

| File | Purpose |
| --- | --- |
| `design-tokens.json` | Font roles, palette, surfaces, shadows, layout, components, motion, artwork rules, source contracts and provenance |
| `design-tokens.schema.json` | Required structure, allowed fields, types and ranges |
| `design-tokens.css` | Generated global variables and reusable semantic aliases |
| `component-tokens.css` | Generated source-scoped component variables with exact media conditions |
| `homepage-baseline.json` | Reviewed source fingerprints and responsive variable inventory |

Typography uses Overused Grotesk for section headings and Manrope for copy. Preserve component-specific scales and weights rather than treating every heading or paragraph identically. Scoped gradients, pixel-footer styling, contact typography and policy buttons remain component exceptions. Story backgrounds are actual generated images, never approximated with CSS gradients.

Use semantic aliases such as `--blitz-type-stories-quote-font`, `--blitz-motion-card-hover`, `--blitz-ease-settle` and `--blitz-story-card-padding-mobile`. Use the component export for exact `--about-*`, `--services-*`, `--skills-*`, `--op-*`, `--cs-*`, `--oc-*` and other existing scopes. The exports provide variables, not a replacement stylesheet or automatic live-site migration.

For definitions/checker-only work:

```sh
npm run design:tokens
npm run design:check
npm run design:test
```

For UI work, also build, run site verification and review desktop/mobile rendering and interactions. If an approved change changes the baseline, document that review before refreshing it:

```sh
npm run design:baseline -- --review-record=docs/uat/your-reviewed-change.md
npm run design:tokens
npm run design:check
```

The checker validates explicit token/source contracts, both exports, the cascade and the reviewed source inventory. It catches defined source drift; it cannot verify visual quality, browser specificity in every state or whether a review record is truthful. Preserve real keyboard, reduced-motion, autoplay and lazy-loading behavior during implementation.

The October 12 extraction was audited separately for typography, colours/geometry and motion/enforcement. It records the existing homepage; it does not approve unrelated UI redesigns or revive obsolete carousel, team and footer definitions.
