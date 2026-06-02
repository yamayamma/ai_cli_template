# Design Systems

Use for design-system references, visual language pages, component variants, and reusable UI inventories.

Source examples:

- `05-design-system.html`: color, typography, spacing, radius, elevation, and core component examples.
- `06-component-variants.html`: card variant matrix with live controls and snippet preview.

Useful template: `assets/templates/comparison-board.html`.

## Structure

- Start with the system or component name and the intended product context.
- Organize primitives before components: color, typography, spacing, shape, elevation, then components.
- Show examples as rendered UI, not only token lists.
- For variants, use a matrix so differences are comparable without scrolling back and forth.

## Patterns

- Token reference: swatches, type specimens, spacing bars, radius examples, elevation samples.
- Component matrix: repeated cells, variant labels, usage notes, controls for padding/border/shadow, generated snippet preview.
- Use stable dimensions for samples so variant hover or control changes do not move surrounding content.

## Avoid

- Palette dumps without usage guidance.
- Oversized marketing hero sections.
- Decorative UI that does not demonstrate reusable rules.
