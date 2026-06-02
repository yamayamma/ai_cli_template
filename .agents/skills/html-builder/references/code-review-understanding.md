# Code Review And Understanding

Use for PR review summaries, file-by-file walkthroughs, codebase explanations, and risk maps.

Source examples:

- `03-code-review-pr.html`: PR summary with risk map, file cards, diffs, and next steps.
- `04-code-understanding.html`: codebase request path with SVG flow, callstack walkthrough, and sidebar notes.
- `17-pr-writeup.html`: PR author writeup with why, file-by-file tour, review focus, test plan, and rollout.

Useful template: `assets/templates/comparison-board.html` for review matrices, or `assets/templates/diagram-explainer.html` for architecture walkthroughs.

## Structure

- Put the PR, feature, or code path name in the H1.
- Give an immediate summary of what changed or how the system works.
- Use file cards, callstack steps, risk badges, or review-focus blocks to make scanning easy.
- Include code snippets only when they clarify behavior, not as bulk dumps.

## Patterns

- PR review: header metadata, "what this does", risk map, file-by-file findings, suggested next steps.
- Code understanding: request/data path diagram, ordered callstack, key concepts, edge cases, and "where to inspect next".
- PR writeup: why, tour, review focus, test plan, rollout, and reviewer notes.

## Visuals

- Use inline SVG for architecture, request path, or dependency flow.
- Use mono-styled code boxes for snippets and diffs.
- Use severity or confidence chips, but keep color meanings consistent.
