# Prototyping

Use for interactive product prototypes, micro-interactions, animation studies, and small behavior demos.

Source examples:

- `07-prototype-animation.html`: task completion animation with easing controls, timeline, and copyable CSS.
- `08-prototype-interaction.html`: sidebar drag-to-reorder prototype with notes and open questions.

Useful template: `assets/templates/interactive-editor.html`.

## Structure

- Lead with the interaction being tested, not a product pitch.
- Put the usable prototype in the first viewport.
- Pair the prototype with controls, observed feel, open questions, and implementation notes.
- Include a short snippet only when it helps the user reuse the behavior.

## Interaction Patterns

- Use real click, toggle, drag, reorder, hover, keyboard, or input behavior.
- Keep state visible through classes, labels, selected states, and direct visual feedback.
- Add reset or replay controls for animations.
- For drag demos, make hit targets large enough and preserve layout during movement.

## Motion

- Use meaningful easing and timing labels.
- Keep animations under a second unless the artifact is specifically an animation study.
- Respect `prefers-reduced-motion` by reducing or disabling nonessential movement.
