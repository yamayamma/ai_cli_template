---
name: html-builder
description: Create polished, self-contained HTML artifacts from user requests. Use when Codex needs to produce, redesign, or adapt a single-file HTML deliverable such as an exploration board, code review summary, codebase explainer, design system reference, component variant matrix, prototype, diagram, slide deck, research explainer, status or incident report, implementation plan, PR writeup, or custom editing interface. Also use when a user asks to make HTML in the style of the html-effectiveness examples.
---

# HTML Builder

## Workflow

1. Classify the requested artifact using the format guide below.
2. Read only the matching reference file, plus `references/shared-quality.md`.
3. Check `references/source-corpus.md` for the original html-effectiveness examples that inspired the format.
4. Copy or adapt one template from `assets/templates/` only when it accelerates the task.
5. Produce a self-contained HTML file with inline CSS and JavaScript unless the user asks for a framework or multi-file app.
6. Verify responsive layout, text fit, non-overlap, and any interactions before handing off.

## Format Guide

- **Exploration and planning boards**: read `references/exploration-planning.md` for option comparisons, visual directions, and implementation plans.
- **Code review and understanding**: read `references/code-review-understanding.md` for PR reviews, codebase walkthroughs, and risk maps.
- **Design references and component matrices**: read `references/design-systems.md` for design-system pages and component variant explorations.
- **Interactive prototypes**: read `references/prototyping.md` for micro-interactions, drag/reorder demos, and small product interactions.
- **Illustrations and diagrams**: read `references/illustrations-diagrams.md` for inline SVG illustration sets, annotated flowcharts, and explanatory diagrams.
- **Slide decks**: read `references/slide-decks.md` for browser-based decks and presentation pages.
- **Research and learning explainers**: read `references/research-learning.md` for technical explainers and interactive concept teaching pages.
- **Reports**: read `references/reports.md` for status reports, incident reports, metrics pages, and written operational artifacts.
- **Custom editing interfaces**: read `references/custom-editors.md` for browser tools that edit structured data, prompts, flags, boards, or other artifacts.

## Shared Rules

- Read `references/shared-quality.md` for baseline layout, visual, accessibility, and verification requirements.
- Use `references/source-corpus.md` as the map of the source corpus and visual tone.
- Use `assets/templates/base-artifact.html` as the generic starting point when no format-specific template fits.
- Prefer semantic HTML, CSS custom properties, restrained motion, and plain JavaScript.
- Keep the first viewport useful: the artifact itself or its main content should be visible immediately.
- Avoid generic landing-page composition unless the user specifically asks for a landing page.
