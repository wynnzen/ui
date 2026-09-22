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
