# Blitz Studio implementation requirements

For any website design or UI work, first read [DESIGN_RULES.md](DESIGN_RULES.md) and [the token registry](design/design-tokens.json). The current homepage is the visual authority. Follow its typography, colors, component spacing, approved text controls, artwork and interaction rules strictly. Explicit user instructions take precedence.

Use existing components and token roles before inventing styles. Document any necessary new semantic token or scoped exception. Update JSON first, regenerate CSS with `npm run design:tokens`, and run `npm run design:check`. Never edit the generated CSS directly. No visible arrow decorations or footer pause controls. A baseline mismatch requires design review; never update the baseline simply to make a check pass.

Run relevant existing build/verification checks for UI edits and inspect mobile/desktop rendering. Preserve approved factual content, autoplay video behavior, reduced-motion support and optimized assets. See DESIGN_RULES.md for the full requirements.
