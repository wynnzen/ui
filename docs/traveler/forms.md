# Forms and content

Preview: `/forms.html`. Canonical sources: `apps/v4/registry/traveler/ui`.
All seven modules retain the pinned upstream exports and prop contracts; both
assignment directions compile in `examples/contracts.tsx`.

| Component   | Applicable states and use                                              | Styling boundary                                                      |
| ----------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Badge       | All six variants; `asChild` link and native span                       | A span is not focusable; use link/button composition for interaction. |
| Separator   | Horizontal/vertical; decorative or semantic                            | No interactive states; semantic examples supply an accessible name.   |
| Label       | `htmlFor`, nested controls, disabled context, wrapping text            | It labels the control; it does not add validation behavior.           |
| Textarea    | Controlled/default value, required, readonly, disabled, invalid, focus | Native entry, selection, resizing and form validation remain.         |
| Checkbox    | Checked/unchecked/mixed, controlled/default, disabled, invalid, focus  | Mixed uses a dash; check and fill distinguish checked state.          |
| Radio Group | Both orientations, controlled/default, selected, disabled, focus       | Arrow selection and roving focus are owned by Radix.                  |
| Switch      | Default and small sizes, controlled/default, on/off, disabled, focus   | Thumb position conveys state; small size stays available.             |

Hover/press behavior is inherited where present. Busy/loading is not a new API.
Read-only applies to Textarea; it is not invented for the Radix controls. For
invalid controls, set `aria-invalid`, associate a visible explanation using
`aria-describedby`, and validate values in the consuming application.

Ordinary markers are 24px. Example label rows have a 40px target; the preserved
small switch has a 20px visual height and should be used with a labelled row.
Long labels can wrap. All geometry is CSS, with no decorative assets or runtime.

The browser check submits CJK notes and checkbox/radio/switch values using native
FormData, exercises Space and arrow keys and verifies disabled controls. Radix
radio selection happens during deferred focus while an arrow key remains down;
the test explicitly models keydown → focus/selection → keyup.

Three viewport screenshots and axe 4.10.3 scans pass on recorded Chromium. See
[compatibility](compatibility.md) for human QA and installation limitations.
Local registry installation is verified in Vite and Next; follow [installation](installation.md). A public endpoint remains a separate release decision.
