# Approved visual language

Status: five-component visual direction **approved by the user**; M2 implementation may proceed. Start with the
[original reference studies](reference-board.md) and
[desktop gallery](review/gallery-1440.png). The spec's §§2 and 9 require approval
of this direction before restyling the remaining inventory.

## Palette and typography

Canonical tokens and shared recipes live in
[`theme.css`](../../apps/v4/registry/traveler/styles/theme.css).

| Role                                 | Value / treatment                                             |
| ------------------------------------ | ------------------------------------------------------------- |
| Background / card / raised panel     | `#111315` / `#1B1E21` / `#24282D`                             |
| Foreground / supporting text         | `#F2EEE5` / `#B9B3A7`                                         |
| Primary fill / foreground            | `#E4DCCB` / `#1A1C1F`                                         |
| Secondary and highlight / foreground | `#30363D` / `#F2EEE5`                                         |
| Destructive fill / foreground        | `#E6A19A` / `#261513`                                         |
| Success fill / foreground            | `#B9CEAC` / `#182014`                                         |
| Quiet border / input boundary        | `#666761` / `#96968D`                                         |
| Keyboard focus / sparse ornament     | `#C2D7E8` / `#BAA680`                                         |
| Body                                 | System sans; 16 px body and text entry, 14 px supporting copy |
| Panel headings                       | Georgia/Times/system serif fallback; 20–24 px                 |
| Geometry                             | Small rectangular corners, thin frame, restrained inset rule  |
| Motion                               | 140 ms color/opacity; 0 ms with reduced motion                |

Nineteen opaque text/control/focus pairs pass the applicable 4.5:1 or 3:1 test.
The quiet divider is decorative; input boundaries and focus use separate,
higher-contrast tokens. No mandatory font download is made. Chart/sidebar tokens
and a complete light theme are deferred until those components enter scope.

## Activation and overrides

Keep the consumer's normal Tailwind 4 semantic bridge. Import `styles/traveler.css`
after its shadcn stylesheet, then activate the document root:

```html
<html lang="en" class="dark" data-ui-theme="traveler"></html>
```

The attribute selects the tokens; `.dark` preserves baseline dark-variant
behavior. The root selector outranks plain `:root` / `.dark` tokens. Shared
`.trav-control`, `.trav-panel`, `.trav-menu-item` and `.trav-overlay` recipes
live in the components layer with a low-specificity theme scope. Consumer
utilities remain able to override geometry and surface styles. The gallery
checks an ordinary `className="rounded-full px-8"` override.

Use document-level activation for body portals. Do not place two independent
themes in one document; use the provided separate upstream preview. A React
styling provider, special variant and wrapper around every control are absent.

## Component states

| Component     | Demonstrated                                                                                                                                      | Not a new API                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Button        | Six variants; eight sizes; keyboard focus; pressed; disabled; invalid; composed busy state; `asChild` link; utility override                      | No `loading` or game-specific variant                                              |
| Card          | Every exported part; action slot; framed/default and utility-composed footer; long text; numeric values                                           | No disabled/selected prop on a noninteractive panel                                |
| Input         | Controlled and uncontrolled; required form submission; refs; CJK entry; empty; invalid with visible message; read only; disabled                  | Native type, name, validation, selection and IME ownership remain with the browser |
| Dialog        | Controlled/uncontrolled; title/description; default/hidden close icon; optional footer Close; trapped focus; Escape and focus return; nested menu | Original `showCloseButton`, portal and Radix callbacks retained                    |
| Dropdown Menu | Highlighted, disabled, checked, unchecked, mixed, radio, destructive; labels, separator, shortcut, submenu; Escape/typeahead/arrows               | Checked values remain separate from hover/focus; mixed state uses a dash           |

A leading diamond is decorative and reserves its position, so highlighting
cannot shift row text. Checkmarks, mixed dashes and radio dots remain value
indicators. A highlighted menu row also receives a visible outline. Native
button focus uses an offset outline independent of its fill. Decorative icons
are hidden from assistive technology. Inputs have no decorative child wrappers.

## Review evidence and limits

- [320 px](review/gallery-320.png), [768 px](review/gallery-768.png),
  [1440 px](review/gallery-1440.png), [focus](review/button-focus.png),
  [menu](review/menu-highlight.png), [dialog](review/dialog.png), and
  [forced colors](review/forced-colors.png).
- Keyboard/forms/portal tests, API assignment checks and deterministic screenshot
  comparisons pass in the recorded environment.
- [Compatibility and accessibility triage](compatibility.md) records the
  inherited serious open-menu scan finding and unresolved human review.
- [Machine-readable evidence](review/evidence.json) records exact browser,
  screenshot hashes, scan findings, responsive checks and network observations.

The 20 MVP sources pass installation and development/production checks in clean Vite and Next consumers. Human screen-reader review, real Safari/mobile/zoom and the full release-browser matrix remain pending; see the release-readiness record.
