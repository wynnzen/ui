# Forms and command (M5.3)

The [local fixture](http://127.0.0.1:4173/advanced-forms.html) adds Field, Form,
Input Group, Input OTP and Command. All public exports/props and client boundaries
remain assignable in both directions to the pinned sources. Actual dependencies
are cmdk 1.1.1, input-otp 1.4.2 and react-hook-form 7.62.0, already in the workspace.

| Component   | Coverage and changes                                                                                                                                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Field       | All parts, both legend styles, three orientations, disabled/invalid fields, deduplicated errors and checkbox composition; logical spacing and wrapping                                                                                       |
| Form        | Existing React Hook Form context/Controller/useFormField, linked labels/descriptions/errors, required/minimum length validation, invalid focus, readonly/disabled, reset and CJK entry                                                       |
| Input Group | All four addon alignments and button sizes, Input/Textarea, readonly/disabled/invalid, one group focus outline; clicking text addons now focuses either input or textarea, while buttons retain their actions                                |
| Input OTP   | One labelled native input with six visual slots, numeric filtering, insertion/deletion, transformed paste, completion, submission, disabled/invalid and forced colors; hidden native text retains transparency so digits do not render twice |
| Command     | Inline and modal, filter/empty/groups/separator/shortcut, selected/disabled, controlled selection, keyboard scrolling and Popover recipe; opaque surfaces and bounded lists                                                                  |

CommandDialog's title and description now live inside its modal content. Its
Command root receives the title as `label`; cmdk names its input through this
root label, so use `<Command label="Routes">` for inline commands. The wrapper
exposes no DialogTrigger; Radix's auto-focus callbacks now retain and restore the
previous focused element when a modal closes. Nonmodal focus handling is unchanged.
Command separators are decorative and hidden from the accessibility tree.

The empty-results scan reproduces cmdk's upstream **critical
`aria-required-children`** finding on an empty listbox. The review reruns an
unchanged upstream Command and permits only the matching rule/surface for this
state. It is not a clean scan or a conformance claim; human AT triage remains
required alongside the earlier menu/Select findings. No rule is disabled globally.
Populated forms, validation, CommandDialog and the Popover recipe have no new axe
violations. Synthetic paste tests explicitly supply ClipboardEvent data because
Firefox discards constructor-supplied clipboard data; OS clipboard, real IME and
mobile autofill remain human checks.

## Explicit Combobox deferral

The user explicitly deferred Combobox for this release. Its pinned source uses
Base UI, outside the selected Radix baseline. Its original source/hash/exports
remain in the inventory, classified `deferred`, with no themed module or registry
item. The searchable destination example composes existing Radix Popover and cmdk
Command; it does not implement or advertise the Base UI Combobox API.

The original 20-component immutable snapshot remains unchanged. These additions
use the mutable development registry until the M5 completeness review. Human
screen-reader, real Safari/mobile and browser-UI zoom QA remain pending by the
user's instruction. Nothing has been published.
