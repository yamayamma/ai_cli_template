# Shared Quality Rules

Use these rules for every HTML artifact.

## Source Style

The source corpus is indexed in `references/source-corpus.md`. When this skill is used inside the `html-effectiveness` repo, inspect the original root-level HTML files listed there if a concrete precedent is useful. The bundled assets are abstract templates, not copies of the originals.

Use a GitHub Dark Default-like palette by default:

- `--bg: #0d1117`
- `--panel: #161b22`
- `--panel-2: #21262d`
- `--text: #e6edf3`
- `--muted: #8b949e`
- `--border: #30363d`
- `--accent: #2f81f7`
- `--success: #3fb950`
- `--danger: #f85149`
- `--warning: #d29922`

The source corpus uses self-contained HTML files with:

- Inline `<style>` and, when needed, small inline `<script>` blocks.
- A dark product palette: deep background, slightly raised panels, muted borders, blue primary accents, and GitHub-like semantic colors.
- Clear content hierarchy, dense but readable layouts, and purpose-built components.
- SVG, CSS geometry, tables, chips, timelines, cards, panels, and small interactions instead of stock imagery.

Use the examples for structure and interaction patterns, not as content to copy verbatim. Use `assets/templates/` for reusable scaffolds.

## Baseline Implementation

- Start with `<!doctype html>`, `lang`, UTF-8 charset, responsive viewport, and a meaningful title.
- Put reusable color, type, spacing, radius, and shadow tokens in `:root`.
- Use semantic regions: `header`, `main`, `section`, `article`, `aside`, `table`, `figure`, `svg` where appropriate.
- Make the layout responsive with `grid`, `flex`, `minmax`, `clamp` for dimensions, and explicit breakpoints.
- Keep JavaScript small and dependency-free unless a specialized library is clearly necessary.
- Include realistic sample content. Placeholder lorem ipsum weakens these artifacts.
- If starting from a template, replace every bracketed placeholder and remove unused blocks.

## Visual Standards

- Favor content-specific visuals: diagrams, mock UI, charts, timelines, thumbnails, SVG illustrations, or live controls.
- Keep cards to repeated items, framed tools, and modals. Do not put cards inside cards.
- Avoid decorative gradient blobs, generic hero graphics, and one-note palettes.
- Use stable dimensions for boards, thumbnails, controls, tiles, and charts so hover and dynamic states do not shift layout.
- Ensure text fits inside buttons, chips, table cells, cards, and sidebars at mobile and desktop widths.

## Interaction Standards

- Make controls visible and directly useful: segmented controls, toggles, sliders, tabs, sortable lists, copy buttons, live previews, or hover-linked panels.
- Reflect state with classes and ARIA attributes where relevant.
- Keep animations purposeful and short. Provide `prefers-reduced-motion` fallbacks when motion is central.
- For draggable or editable demos, provide enough scripted behavior that the artifact can actually be used.

## Verification

Before finishing, check:

- The HTML opens without build steps.
- Mobile and desktop layouts have no overlapping text or incoherent clipping.
- Interactions work after repeated use.
- Tables and SVGs remain readable on narrow screens, or scroll horizontally with clear containment.
- The final file contains no TODOs, broken links, or missing assets.
