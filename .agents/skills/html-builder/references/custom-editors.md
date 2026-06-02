# Custom Editing Interfaces

Use for single-file browser tools that edit or inspect structured content, triage boards, feature flags, prompts, templates, or configuration.

Source examples:

- `18-editor-triage-board.html`: kanban-style triage board with draggable cards and status columns.
- `19-editor-feature-flags.html`: feature flag editor with sidebar list, JSON-like detail pane, toggles, and validation cues.
- `20-editor-prompt-tuner.html`: prompt template editor with slot highlighting, live previews, copy, reset, and token estimate.

Useful template: `assets/templates/interactive-editor.html`.

## Structure

- Put the editing surface in the first viewport.
- Use a compact header with the file, workflow, or artifact being edited.
- Split the page into navigation, editor, preview, inspector, or output panes as needed.
- Include realistic sample data in JavaScript constants.

## Interaction Patterns

- Triage board: columns, draggable cards, priority/status chips, selection or details.
- Feature flags: searchable sidebar, selected flag detail, toggles, environment chips, validation messages, JSON preview.
- Prompt tuner: contenteditable or textarea editor, highlighted slots, live sample previews, copy/reset actions, counters.

## Reliability

- Preserve user-entered text while re-rendering.
- Escape HTML before injecting user-controlled content into previews.
- Provide fallback copy behavior if using `navigator.clipboard`.
- Keep keyboard focus and caret behavior acceptable for editable controls.
