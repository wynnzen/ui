# Disclosure and feedback (M5.1)

The [local examples](http://127.0.0.1:4173/disclosure.html) cover seven additional
pinned sources. Their exact code and install coverage are in the catalog. Use
`/r/v0.1.0-dev/{name}.json` for these development items; the immutable M4 snapshot
continues to contain the original 20 MVP components.

| Component    | Applicable states and composition                                                                                | Visual changes                                                                    |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Accordion    | Single/uncontrolled/collapsible; multiple/controlled; disabled; keyboard Home/End/arrows; long content and links | Shared focus recipe, 44px minimum trigger, logical alignment, no height animation |
| Collapsible  | Controlled, default-open and disabled; Button `asChild` inside a Card                                            | **No built-in visual surface**; upstream bytes retained                           |
| Aspect Ratio | 16:9 and 1:1 at responsive widths, content-owned geometry                                                        | **No built-in visual surface**; upstream bytes retained                           |
| Direction    | Provider alias precedence, `useDirection`, HTML RTL and Tabs arrow navigation                                    | **No visual surface**; upstream bytes retained                                    |
| Alert        | Default/destructive, icon/no icon, long message and linked action                                                | Shared inset frame, full wrapping title, opaque semantic colors                   |
| Skeleton     | Custom dimensions inside an announced loading group                                                              | Fine border, rectangular geometry, static under reduced motion                    |
| Spinner      | Default/custom status name, custom size, disabled Button composition                                             | Inherits text color; static under reduced motion                                  |

Disclosure state, event callbacks, refs, DOM semantics and client directives are
unchanged. Decorative arrows are hidden from AT. Alert no longer truncates its
title. Skeletons are decorative when a containing status already announces
loading; Spinner accepts a specific label or `aria-hidden` for redundant glyphs.
Static helpers have no native checked/invalid/form-value state to demonstrate.

A DirectionProvider supplies primitive behavior; set HTML `dir` for content
layout as well. This basic fixture is not a complete translation/RTL audit.
Official behavior references: [Direction provider](https://www.radix-ui.com/primitives/docs/utilities/direction-provider)
and [Accordion](https://www.radix-ui.com/primitives/docs/components/accordion).

Verification: bidirectional type contracts, source-exact registry payloads,
Chromium/Firefox/WebKit interactions, clean automated disclosure scan, reviewed
320/768/1440px screenshots, 200% text, reduced motion and forced colors.
Human screen-reader, real Safari/mobile and browser-UI zoom remain pending by
the user's request. Existing menu/Select findings remain recorded separately.
