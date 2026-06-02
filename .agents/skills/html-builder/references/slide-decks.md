# Slide Decks

Use for browser-based slide decks, weekly updates, pitch-style summaries, and presentation pages.

Source example:

- `09-slide-deck.html`: six-section platform engineering weekly deck with title, shipped items, carryover, metrics, decision, and next steps.

Useful template: `assets/templates/slide-deck.html`.

## Structure

- Use one `<section class="slide">` per slide.
- Keep each slide focused on one message.
- Include a visible slide rhythm: title slide, proof or progress slides, numbers, decision, next steps.
- Use large readable type and strong spacing, but keep content within fixed slide bounds.

## Patterns

- Title slide with date, team, and compact visual mark.
- Progress slide with cards or rows.
- Metrics slide with large numbers and a small chart.
- Decision slide with high contrast and one clear ask.
- On-deck slide with prioritized next actions.

## Implementation Notes

- Make slides printable or screenshot-friendly.
- Use CSS variables for slide size and theme.
- Avoid long paragraphs; prefer concise bullets, cards, tables, and charts.
