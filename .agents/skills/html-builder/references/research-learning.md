# Research And Learning

Use for technical explainers, feature explainers, concept teaching pages, and small interactive lessons.

Source examples:

- `14-research-feature-explainer.html`: rate-limiting feature explainer with request path, configuration, gotchas, and FAQ.
- `15-research-concept-explainer.html`: consistent hashing concept page with interactive ring, comparison table, and examples.

Useful template: `assets/templates/diagram-explainer.html`.

## Structure

- Lead with the concept and the mental model.
- Teach in ordered chunks: path or model, configuration or mechanics, gotchas, FAQ or usage.
- Use diagrams and small interactions to reduce prose.
- Include tables only for comparisons that benefit from side-by-side reading.

## Patterns

- Feature explainer: request path, config snippet, gotchas, FAQ.
- Concept explainer: interactive visualization, short explanation, comparison table, where it appears in practice.
- Use code blocks and inline code for exact terms.

## Avoid

- Encyclopedia-style coverage.
- Interactive visuals that do not teach a specific point.
- Assuming prior context when the page should stand alone.
