# Upstream maintenance record

Pinned source: `98a1fe67b439324ddc857f47fbdce056600a4329`.
Canonical baseline files and SHA-256 hashes are frozen in
[component-coverage.json](component-coverage.json). All upstream collections and
the official CLI are unchanged.

| Component     | Visual changes                                                                                                          | Preserved contract                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Button        | Rectangular corners, 40/44 px ordinary targets, complete destructive foreground, restrained hover/pressed/focus recipes | `Button`, `buttonVariants`, six variants/eight sizes, native props, `asChild`, refs                                          |
| Card          | Dark inset frame, serif title role, wrapping footer                                                                     | All seven exported parts and native div props                                                                                |
| Input         | Opaque inset field, 16 px entry, clear boundaries, separate focus, readonly/invalid/disabled states                     | Native input, React 19 ref/props, controlled/default values, form behavior                                                   |
| Dialog        | Fine frame, subtle fade, logical close position, usable close target, viewport-bounded scrollable panel                 | All ten exports, Radix callbacks/portals, client boundary, `showCloseButton`; internal Button import points to Traveler      |
| Dropdown Menu | Shared row/frame recipes, reserved diamond, checked/mixed/radio cues, logical spacing, restrained fade                  | All fifteen exports, primitive state/portal behavior and callback ownership; mixed glyph changes visually from check to dash |

No custom focus manager, global keyboard handler or extra interaction primitive
was introduced. The inherited open-menu accessibility finding is tracked in
[compatibility.md](compatibility.md); do not “fix” it by silently changing the
baseline's default modal behavior.

For an upstream update, review source and primitive changes before moving the
pin. Separate behavioral/accessibility fixes from class changes, deliberately
reapply the visual layer, update the full inventory, then run scoped types,
interactions, screenshots and both M3 consumers. Do not overwrite themed source
with unreviewed CLI output. New upstream files enter the backlog explicitly.

The user approved the M1 direction. M2 adds Badge, Separator, Label, Textarea,
Checkbox, Radio Group, Switch, Select, Tabs, Alert Dialog, Popover and Tooltip.
Exports, state ownership, client directives and primitives are retained. Visual
changes reuse control/panel/menu recipes, logical spacing, opaque surfaces and
visible mixed/selected states. No event-handler rewrite was needed.

Clean Vite/Next installation is verified and a content-addressed local snapshot
is available. Publication and human QA remain pending; remaining source work is tracked in
the coverage manifest. Existing prototypes are not marked complete.

M2.3 adds Progress, Table and Scroll Area. Progress now forwards its value to
Radix and computes fill relative to max, fixing the upstream wrapper's missing
value semantics. Table's named scrolling region and Scroll Area's viewport are
keyboard-focusable; scrolling stays native. Scroll Area's minimum width permits
grid reflow. Progress fill, Switch thumb and Scroll Area thumb use system colors
in forced-colors mode, after measured default backgrounds lost their state cues.

M5.1 adds Accordion, Alert, Skeleton and Spinner using the existing recipes.
Alert titles wrap instead of truncating; disclosure height animation is removed;
loading animations respect reduced motion. Collapsible, Aspect Ratio and
Direction are byte-identical behavior/layout helpers with no built-in chrome.
No new package, shared CSS rule or state-management layer was introduced.

M5.2 adds eleven content/control sources. Slider forwards accessible thumb names,
descriptions and invalid state while retaining Radix state, events and hidden
form inputs. Toggle Group exposes orientation for CSS. Item descriptions wrap;
Kbd fixes its dark-tooltip foreground. All other changes use existing visual
recipes and logical geometry. The pinned CLI non-RSC directive regex limitation
is documented in content.md; consumer tests decline replacement rather than
patching upstream or enabling unattended overwrites.

M5.3 adds Field, Form, Input Group, Input OTP and Command. Input Group text
addons focus textarea as well as input. CommandDialog keeps its labels inside
the modal and restores the prior focused element via Radix callbacks because
it has no trigger wrapper; decorative separators are hidden. OTP's invisible
native text opts out of forced color replacement while its visible slots retain
system colors. Form/OTP/cmdk state and filtering stay in their existing libraries.
The upstream empty-listbox axe finding is reproduced and retained for human QA.
The user explicitly deferred the Base UI Combobox; no substitute API is claimed.

M5.4 adds seven navigation/overlay APIs and an unchanged use-mobile helper.
Context Menu bridges standard keyboard opening to its native primitive handler.
Drawer separates inner scrolling from its primitive overscroll surface to keep
bounded-panel footer actions and drag dismissal working. Sidebar adds inert closed offcanvas content, prior-focus restoration for
its mobile Sheet, stable skeleton markup, right-side spacing and correct
separator width; icon mode keeps names while hiding unsuitable input/loading
text. Other changes retain state/callback ownership and reuse semantic recipes.

## M5.5

Added ten sources with unchanged pinned exports and client/server boundaries.
[Advanced notes](advanced.md) document Carousel keyboard/listener fixes, actual
Recharts 3 tick selectors and legend icon handling, bounded resizing, native
conversational scrolling, visible attachment focus and reduced-motion changes.
Five chart aliases reuse the approved palette. No original collection, CLI,
workspace lockfile or immutable MVP payload was changed.
