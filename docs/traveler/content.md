# Content and controls (M5.2)

The [local fixture](http://127.0.0.1:4173/content.html) adds eleven sources from
the frozen inventory. These are development registry items; the immutable MVP
snapshot still contains its original 20 components.

| Component     | Covered parts and states                                                                                                    | Changes                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Avatar        | Three sizes, image/fallback, badge/group/count                                                                              | Fine rectangular frame, logical badge position; image lifecycle unchanged           |
| Breadcrumb    | Links/asChild, current page, default/custom separator, interactive ellipsis, long labels                                    | Shared link focus, wrapping, logical separator direction                            |
| Button Group  | Horizontal/vertical, text/asChild, separator, native Input and Button composition                                           | Logical joined borders, shrinkable input, approved geometry                         |
| Empty         | Both media variants, header/title/description/content and action                                                            | Shared frame, serif heading, readable message                                       |
| Item          | Three surface variants, both sizes, all three media variants, group/separator/header/footer/actions, link asChild           | Wrapping content and full description; semantic surfaces and focus                  |
| Kbd           | Single/group, Tooltip composition                                                                                           | Fine border; fixes dark text on the dark Tooltip surface                            |
| Native Select | Both sizes, controlled/default value, options/groups, disabled/invalid, native form submission                              | Opaque field, logical icon, 16px text; native popup retained                        |
| Pagination    | Current, previous, next, ellipsis, anchors and state updates                                                                | Logical icon direction and wrapping; routes remain consumer-owned                   |
| Slider        | Controlled/default, single/range, min/max/step, commit callbacks, horizontal/vertical, disabled/invalid, native form values | 24px thumbs, visible track/range, shared focus, forced colors and accessible naming |
| Toggle        | Both variants, all sizes, controlled/default, on/off/disabled/invalid                                                       | Shared focus, on-state underline without movement, semantic surfaces                |
| Toggle Group  | Single/multiple, controlled/default, sizes/variants, spacing, disabled items, horizontal/vertical keyboard                  | Logical joined borders; geometry follows primitive orientation                      |

Slider now forwards `aria-label`, `aria-labelledby`, `aria-describedby` and
`aria-invalid` to generated thumbs, fixing the upstream wrapper's root-only
attributes. Multiple thumbs receive numbered explicit labels. The Radix value,
keyboard, hidden-input and callback behavior is unchanged. The form fixture
preserves every repeated range entry rather than discarding values.

Toggle Group exposes its existing orientation as a data attribute for layout.
Kbd's previous tooltip rule used a background-colored foreground; the replacement
uses the same semantic foreground as Tooltip. Item descriptions no longer clamp
important content. Other changes are styles, logical positioning and decorative
icon semantics; all public exports/props and client boundaries still type-check
in both directions against the pinned source.

Avatar's small original geometric emblem is inline example-only SVG. It is not
a required library asset, and failed image loading uses the primitive fallback.
A meaningful status badge uses `role="img"` with a name; decorative badges may be
hidden. Group/list/label semantics belong to each consuming composition, as shown.

The new page has no automated accessibility violations. Chromium, Firefox and
WebKit interaction suites pass. Reviewed screenshots cover 320/768/1440px and
forced-color Slider focus; increased text and reduced motion remain covered.
Real AT, Safari/mobile and browser-UI zoom are still pending, by user decision.

## Pinned CLI limitation

The unchanged shadcn 4.21.0 `transform-rsc.ts` uses a global regular expression
with `.test()` to remove `"use client"` in non-RSC consumers. Its state can make a
bulk transformation differ from a prior single-item install. The clean Vite
fixture reproduced a directive-only Dialog overwrite prompt; standalone `--diff`
reported no change, while the bulk diff revealed the extra directive.

The consumer check declines replacement of existing files and verifies complete
installation and identical before/after hashes. It never uses `--overwrite`.
Review the **same set of requested items** with dry-run/diff before updating a
customized project. Do not interpret `--yes` as permission to replace files, or a
zero CLI exit code as proof that every requested file was installed. Next's RSC
configuration retains directives and does not run the faulty removal branch.
An upstream CLI upgrade needs a new baseline and consumer review; no upstream
CLI source was changed here.
