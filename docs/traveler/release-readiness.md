# Local candidate and release readiness

**Local development is complete; release approval remains pending.**
The collection implements 60 of the 61 pinned component sources, the unchanged
mobile hook, and Date Picker/Data Table compositions. The user explicitly deferred
Combobox because its pinned implementation uses Base UI. The M1 visual direction
is approved. The user has no human QA results yet and asked that release QA remain
open. Nothing has been published.

| Gate                   | Current evidence                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Declared scope         | 60 themed sources with every pinned export; one explicitly deferred Combobox; helper and compositions classified in the coverage manifest               |
| Static/build           | Bidirectional type contracts, scoped ESLint, 5 Vitest checks, source/hash/schema/dependency validation and production gallery build                     |
| Visual/responsive      | 60 reviewed Chromium screenshots; 65 responsive/state checks; 320/768/1440px, 200% text, reduced motion and forced colors                               |
| Keyboard/interaction   | Full suite on Chromium 149.0.7827.55, Firefox 151.0 and Playwright WebKit 26.5, Linux x64                                                               |
| Distribution           | Unchanged shadcn 4.21.0; clean Vite 7.3.2 and Next 16.3.3 installs/builds; aliases, SSR/hydration, portals, advanced controls and safe reinstallation   |
| Immutable candidate    | 63 JSON files addressed by SHA-256; foundation and all dependencies stay on the same candidate URL; original 22-file MVP snapshot preserved and checked |
| Assets/notices         | No required decorative/font asset; complete shadcn MIT notice; dependency license metadata and original example SVGs recorded                           |
| Human accessibility    | **Pending:** screen readers, real keyboard acceptance, inherited menu/Select/Command/Navigation findings, dates/charts and live message behavior        |
| Release browser matrix | **Pending:** current/previous stable Chrome/Edge, Firefox and Safari on recorded platforms; real Safari/mobile and browser-UI zoom                      |
| Identity/publication   | **Pending:** final name, namespace, host, actual-name/asset rights review and publication authorization                                                 |

[release-candidate.json](release-candidate.json) identifies the complete local
candidate. [release-candidates/mvp.json](release-candidates/mvp.json) retains the
original MVP identity. Both are checked byte-for-byte. [consumers.json](consumers.json)
records the exact registry URL, package versions and lock hashes of the final
fresh-install run; the initial expanded development run is superseded by that
candidate verification. See [installation](installation.md) for the concrete
namespace and safe update procedure.

WebKit automation is **not Safari certification**. This host lacked WebKit's
AVIF/WOFF libraries. Ubuntu libavif16 1.0.4-1ubuntu3, libwoff1 1.0.2-2build1,
libgav1-1 0.18.0-1build3 and libyuv0 0.0~git202401110.af6ac82-1 were extracted
under `/tmp/traveler-webkit-libs`; a temporary launcher uses that library path.
System packages were unchanged. Other hosts need their normal Playwright
platform dependencies.

## Measured budgets

[performance.json](performance.json) records an isolated production Button
comparison. React and the existing primitive/class utilities are included;
hidden source maps are excluded from transfer sizes.

| Measurement                       |                                                        Result |
| --------------------------------- | ------------------------------------------------------------: |
| Foundation CSS                    | 4,044 source bytes / **1,177 gzip bytes**; 20 KiB gzip budget |
| Required decorative/font assets   |                                                   **0 bytes** |
| Additional styling runtime        |                             **0** packages or runtime helpers |
| Upstream Button + host JavaScript |                                             73,286 gzip bytes |
| Traveler Button + host JavaScript |                              73,234 gzip bytes; **−52 bytes** |
| Upstream Button CSS               |                                              2,971 gzip bytes |
| Traveler Button + foundation CSS  |                              3,227 gzip bytes; **+256 bytes** |
| External runtime requests         |  **0** in tested gallery and development/production consumers |

Source-map inspection confirms that Button imports no gallery, chart or other
component module. Advanced primitives are installed only by components that use
them. Five chart aliases reuse existing approved colors. Button hover/focus
bounds remain stable. These are scoped bundle and interaction measurements,
not a field-performance or Core Web Vitals claim.

## Human review worksheet

Record browser, OS, assistive technology, version, result and issues for each row.
Use the [catalog](http://127.0.0.1:4173/catalog.html) and its example links.
Passing automation does not complete these rows.

| Check                                 | Expected result                                                                                                  | Result  |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------- |
| Screen-reader forms                   | Names, checked/mixed state, errors, readonly/disabled status and live results are understandable                 | Pending |
| Screen-reader overlays                | Titles/descriptions announce, modal focus is contained, and focus returns correctly                              | Pending |
| Menu/Select/Command/Navigation triage | Hidden background and focus proxies behave correctly; options and empty results remain usable with real AT       | Pending |
| Calendars/charts/tables               | Date/grid navigation, sorting, selection, tooltip data and complete table alternatives are understandable        | Pending |
| Messages and toasts                   | Live announcements, focus, history/prepend behavior and actions remain usable without unexpected jumps           | Pending |
| Safari/mobile + real IME              | Input/composition, touch targets, dragging, native scrolling and nested overlays work with an on-screen keyboard | Pending |
| Actual browser zoom/text              | 200% browser-UI zoom and enlarged text preserve essential content and actions                                    | Pending |
| Release versions                      | Current/previous stable Chrome/Edge/Firefox/Safari are exercised on recorded platforms                           | Pending |

Inherited axe findings remain visible in [compatibility.md](compatibility.md)
and [review/evidence.json](review/evidence.json). They include serious hidden-focus
and scrolling-Select findings and the critical empty cmdk listbox finding.
Baseline matching explains their origin; it does not waive human triage.
No accessibility rule is globally disabled, and no conformance claim is made.

M4.2 is intentionally unchecked in [todo.md](../../todo.md). Completing M5 local
implementation, commits and candidate verification does not close that gate.
