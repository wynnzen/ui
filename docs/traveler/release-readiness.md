# MVP release readiness

**Local implementation and delivery pass; release is not approved or published.**
The user approved the M1 visual direction. M4 still requires human and platform
review under specification §§14, 17 and 19. The next completeness milestone
is tracked independently in `todo.md`; this report does not claim all 61 components are done.

| Gate                   | Current evidence                                                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Declared MVP           | 20 themed components, all pinned exports, source-backed examples/catalog/token reference                                           |
| Static/build           | Type contracts, scoped ESLint, 5 Vitest checks, production gallery build                                                           |
| Visual/responsive      | 23 inspected Chromium screenshots; 27 viewport/state checks; contrast, reduced motion and forced colors                            |
| Keyboard/interaction   | Full browser suite passes on Chromium 149.0.7827.55, Firefox 151.0 and Playwright WebKit 26.5 on Linux x64                         |
| Distribution           | Standard shadcn 4.21.0; Vite 7.3.2 and Next 16.3.3 development/production builds and browser checks; safe diff/reinstallation      |
| Immutable candidate    | Content-addressed 22-file snapshot; SHA-256 checks; both consumers resolve its transitive Dialog install as identical              |
| Assets/notices         | No required decorative/font assets; complete shadcn MIT notice included; inspected dependency license metadata                     |
| Human accessibility    | **Pending:** screen-reader review, particularly inherited menu/Select findings; real keyboard/manual acceptance                    |
| Release browser matrix | **Pending:** current/previous stable Chrome/Edge, Firefox and Safari on recorded platforms; real Safari/mobile and browser-UI zoom |
| Identity/publication   | **Pending:** final public name, namespace, host, actual-name/asset rights review, and publication authorization                    |

WebKit automation is **not Safari certification**. This host lacked WebKit's
AVIF/WOFF libraries. Ubuntu `libavif16` 1.0.4-1ubuntu3, `libwoff1` 1.0.2-2build1,
`libgav1-1` 0.18.0-1build3 and `libyuv0` 0.0~git202401110.af6ac82-1 were downloaded
and extracted under `/tmp/traveler-webkit-libs`. A temporary launcher retained
that library path; system packages were unchanged. Other hosts should provide
their normal Playwright dependencies.

## Measured budgets

[performance.json](performance.json) records an isolated production Button
comparison against the pinned upstream source. Both include React and existing
primitive/class utilities; hidden source maps are excluded from transfer sizes.

| Measurement                       |                                                       Result |
| --------------------------------- | -----------------------------------------------------------: |
| Foundation CSS                    |  3,887 raw bytes / **1,142 gzip bytes** (20 KiB gzip budget) |
| Required decorative/font assets   |                                                  **0 bytes** |
| Additional styling runtime        |                            **0** packages or runtime helpers |
| Upstream Button + host JavaScript |                                            73,286 gzip bytes |
| Traveler Button + host JavaScript |                            73,234 gzip bytes (**−52 bytes**) |
| Upstream Button CSS               |                                             2,971 gzip bytes |
| Traveler Button + foundation CSS  |                            3,195 gzip bytes (**+224 bytes**) |
| Full 20-component Vite consumer   |   384.98 kB JS / 121.21 kB gzip; 34.41 kB CSS / 7.23 kB gzip |
| External runtime requests         | **0** in tested gallery and development/production consumers |

Source-map inspection confirms the Button-only build contains no gallery or other
component modules. Button hover/focus bounds remain stable. Other interactions
are covered by the browser fixtures; no broad field-performance or Core Web
Vitals claim is made.

The user explicitly confirmed that manual results are not available yet and
requested that release QA stay pending. Local M5 work does not close this gate.

## Human review worksheet

Record browser, OS, assistive technology, version, result and any issue for each
row. Use the local [catalog](http://127.0.0.1:4173/catalog.html) and its example
links. A passing automated scan does not complete these rows.

| Check                    | Expected result                                                                                                            | Result  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------- |
| Screen-reader forms      | Names, checked/mixed state, invalid explanations, readonly/disabled status and live results are understandable             | Pending |
| Screen-reader overlays   | Dialog/alert titles and descriptions announce; focus stays within modal content and returns correctly                      | Pending |
| Menu/Select triage       | Hidden background is unavailable; keyboard scrolling reaches all options; inherited axe findings are reviewed with real AT | Pending |
| Safari/mobile + real IME | Entry/composition, touch targets, scrolling and nested overlays remain usable with an on-screen keyboard                   | Pending |
| Actual browser zoom/text | 200% browser-UI zoom and increased text do not clip essential controls or action areas                                     | Pending |
| Release versions         | Current and previous stable releases are exercised on recorded Chrome/Edge/Firefox/Safari platforms                        | Pending |

Automated keyboard input is recorded as automation, not a human screen-reader or
real-device review. Existing inherited findings are preserved in
[compatibility.md](compatibility.md) and [review/evidence.json](review/evidence.json).
No serious finding has been silently disabled or presented as a clean scan.

## Scope after MVP

The immutable MVP candidate remains at 20 components. M5.1–M5.2 add eighteen local
development items, including three helpers with no built-in visual surface;
23 entries remain backlog. Their coverage and install evidence are tracked
separately. M5 must verify or explicitly classify every remaining entry,
including Date Picker/Data Table compositions. Do not infer full-library
support from the completed MVP.
