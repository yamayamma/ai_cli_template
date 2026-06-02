# Illustrations And Diagrams

Use for inline SVG illustration sets, annotated flowcharts, technical diagrams, process maps, and explanatory visuals.

Source examples:

- `10-svg-illustrations.html`: three downloadable SVG header illustrations with palette rules.
- `13-flowchart-diagram.html`: annotated deploy flowchart with clickable nodes and detail panel.
- `04-code-understanding.html`: request path diagram embedded in a code explanation.
- `16-implementation-plan.html`: data-flow diagram within a plan.

Useful template: `assets/templates/diagram-explainer.html`.

## Structure

- State what the diagram explains and the reading order.
- Use a constrained canvas with a clear legend or detail panel.
- Make nodes and labels large enough to read on desktop; provide responsive scaling or horizontal containment on mobile.
- Use color for semantic meaning: success, failure, decision, external system, active path.

## Patterns

- SVG illustration set: repeated canvases, captions, consistent palette, optional SVG download buttons.
- Flowchart: nodes, labeled connectors, decision diamonds or gates, terminal states, legend, and click-to-inspect side panel.
- System diagram: grouped regions, arrows, numbered steps, and short callouts.

## Avoid

- Tiny labels that disappear on mobile.
- Ambiguous arrows or unlabeled decision branches.
- Pure decoration when the user needs explanation.
