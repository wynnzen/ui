# Traveler UI development

Source: [development specification v0.1](octopath-inspired-shadcn-ui-development-spec-v0.1.md).
Follow the specification's M0–M5 sequence. Check off a step only after its
implementation and relevant verification, then make a scoped git commit.
Preserve upstream collections and unrelated local changes.

## Plan

- [x] **P0 — Plan:** turn the specification into this tracked implementation plan.
- [x] **M0 — Baseline:** pin the checkout, audit canonical/generated ownership,
      choose one primitive/style baseline, record tools and commands, freeze the
      full component inventory, and build a relevant unchanged baseline example.
- [x] **M1.1 — First themed component:** implement document-root theme activation,
      semantic tokens and shared CSS recipes; expose a working Button page with
      its existing variants, sizes and composition contract. Verify imports,
      styling, types, production build and representative keyboard behavior.
- [x] **M1.2 — Five-component prototype:** add Card, Input, Dialog and Dropdown
      Menu from the pinned source, retaining every export and primitive contract.
      Include representative states, controlled/uncontrolled examples, forms,
      portal inheritance and an isolated upstream comparison.
- [x] **M1.3 — Design review evidence:** document the original reference board and
      visual language; review keyboard behavior, contrast, 320/768/1440 px layouts,
      zoom, reduced motion and forced colors; capture reproducible screenshots.
      Record provenance, asset licenses, limitations and measured results.
- [x] **M1 approval gate:** user reviews the concrete five-component prototype and
      approves the visual direction before expanding the collection (spec §§2, 9).
- [x] **M2.1 — Forms and content:** Badge, Separator, Label, Textarea, Checkbox,
      Radio Group, Switch and required helpers; document and verify applicable
      variants, states, forms, long labels and responsive behavior.
- [x] **M2.2 — Navigation and overlays:** Select, Tabs, Alert Dialog, Popover and
      Tooltip; verify keyboard operation, focus restoration, nested overlays,
      controlled/uncontrolled use and portal styling.
- [x] **M2.3 — Remaining MVP and gallery:** Progress, Table and Scroll Area;
      searchable component index, coverage/token references and original menu,
      settings and inventory compositions; interaction and visual regression checks.
- [x] **M3.1 — Registry:** foundation plus component metadata and reproducible
      generated payloads from canonical source; schema/export/source checks,
      explicit themed transitive dependencies and retained license notices.
- [x] **M3.2 — Consumer validation:** clean Vite and Next.js installs and production
      builds, aliases, CSS activation, portals and SSR/hydration; existing-project
      diff/backup and reinstallation checks without unattended overwrites.
- [x] **M4.1 — Release preparation:** installation/state documentation,
      compatibility/provenance records, measured CSS/assets/runtime/bundle budgets,
      cross-engine automation and a verified immutable local payload snapshot.
- [ ] **M4.2 — Human/release QA gate:** manual keyboard/screen-reader review,
      real Safari/mobile and browser zoom, current/previous stable browser matrix,
      final rights review, public name/namespace/host and publication authorization.
      See `docs/traveler/release-readiness.md`; no public release is claimed.
- [x] **M5.1 — Disclosure and feedback:** Accordion, Collapsible, Aspect Ratio,
      Direction, Alert, Skeleton and Spinner, with helper classifications.
- [x] **M5.2 — Content and controls:** Avatar, Breadcrumb, Button Group, Empty,
      Item, Kbd, Native Select, Pagination, Slider, Toggle and Toggle Group.
- [x] **M5.3 — Forms and command:** Field, Form, Input Group, Input OTP,
      Command; validate their complete dependency chains. Combobox is explicitly
      deferred by user decision because it uses Base UI.
- [x] **M5.4 — Extended navigation and overlays:** Context Menu, Menubar,
      Navigation Menu, Hover Card, Sheet, Drawer and Sidebar.
- [x] **M5.5 — Advanced and conversational:** Calendar/Date Picker, Data Table,
      Carousel, Chart, Resizable, Sonner, Attachment, Bubble, Marker, Message
      and Message Scroller; reconcile every pinned entry and composition.
- [ ] **M5.6 — Completeness review:** every entry explicitly classified, consumer
      and cross-engine evidence, documentation and versioned candidate updated.
      Human/release QA remains separate and pending.

## Working rules

- Components are prototypes until their visual, interaction, accessibility,
  documentation and installation evidence satisfies the definition of done.
- Reuse the selected shadcn source, `cn`, variant mechanism and existing tooling.
  No new styling provider, primitive family, CLI or documentation framework.
- Use scoped checks/builds; do not invoke monorepo-wide formatting or unrelated
  generator writes. Commit only files belonging to the completed step.
- Local commits are authorized. Publication, deployment and release claims are
  separate from local development and require their stated gates.

## Execution record

### P0 — Plan

- Created the milestone checklist from the complete specification.
- Initial checkout: `98a1fe67b439324ddc857f47fbdce056600a4329`.
- Pre-existing untracked files: the input specification and `.serena/`; preserve
  them without including them in implementation commits.
- Validation: read all specification milestones and acceptance gates; documentation
  only, so no code test applies.

### M0 — Baseline

- Selected authored Radix `new-york-v4`; froze all 61 component files with source
  hashes, exports and dependency imports in `docs/traveler/component-coverage.json`.
- Added `docs/traveler/baseline.md` and a scoped Vite baseline fixture using the
  unchanged upstream Button and app PostCSS/CSS conventions.
- Validation passed: frozen dependency install, CLI prerequisite build,
  `pnpm traveler:build`, `pnpm traveler:typecheck`, `pnpm traveler:check` (1 test).
- Full upstream Next build and aggregate tests were not run; reasons and existing
  tool warnings are recorded in the baseline report. No lockfile changes.

### M1.1 — First themed component

- Added document-root tokens and layered control/panel recipes, a themed Button
  retaining six variants/eight sizes and `asChild`, and a plain-background page.
- Theme activation is explicit on `<html class="dark" data-ui-theme="traveler">`;
  consumer utility overrides and reduced-motion/forced-colors foundations remain.
- Validation passed: production build, scoped TypeScript (bidirectional Button
  contracts), ESLint, 3 Vitest checks, and Chromium 149.0.7827.55 keyboard,
  disabled/link, computed-theme and utility-override checks. Visually inspected
  the rendered page. Installation and final visual approval remain pending.
- Preview: `pnpm traveler:dev`, then `http://127.0.0.1:4173/`.

### M1.2 — Five-component prototype

- Added Card, Input, Dialog and Dropdown Menu with all baseline exports, parts,
  native props and Radix behavior. Extended the separate upstream comparison.
- Added fictional journal panels, a controlled/uncontrolled settings form,
  disabled/read-only/invalid fields, checked/mixed/radio menu items, a submenu,
  controlled and uncontrolled dialogs, and a nested menu inside a dialog.
- Validation passed: production build, TypeScript contracts in both directions
  for every export, ESLint, 3 Vitest checks, and Chromium forms/refs/CJK entry,
  keyboard navigation, nested portal tokens and focus-restoration checks.
- Corrected a utility overriding the shared menu focus outline. Browser tests
  use Playwright's retrying focus assertions for Radix's deferred focus changes.
- All five components remain classified as prototypes; visual approval and M3
  installation evidence are pending.

### M1.3 — Design review evidence

- Added the original reference board, visual-language proposal, compatibility and
  accessibility triage, asset/notice manifest and upstream maintenance record.
- Captured and visually reviewed nine original candidate screenshots; a fresh
  run matches them byte-for-byte with the pinned Chromium/OS environment.
- Ten responsive/interaction review checks pass, including 320/768/1440 px
  reflow, a 320×360 dialog, 200% text, a documented CSS-zoom approximation,
  reduced/default motion, forced colors and upstream-document isolation.
- Production fixtures made no external runtime requests. Shared theme source is
  1,142 gzip bytes; no dependency or lockfile change. Full MIT notice retained.
- Build, types, lint, 3 Vitest checks, browser interactions and review comparison
  pass. The inherited serious open-menu `aria-hidden-focus` finding is reproduced
  against upstream and recorded; it is not represented as a clean scan. Human
  assistive-technology, real zoom/mobile and other-engine checks remain pending.
- Clarified the supported mixed menu value with a dash instead of a checkmark.
- **Next:** user reviews the concrete prototype and approves the direction per
  specification §§2/9. M2 restyling must wait for that approval. No release or
  publication has occurred.

### M1 approval

- User approved the five-component visual direction in this conversation.
- Proceed with M2 using the approved palette, geometry, typography and state recipes.
- Approval is for continued development; publication and release QA remain separate.

### M2.1 — Forms and content

- Added seven components and a settings-form page preserving all exports, both
  size/variant sets, labels, native form values and controlled/default props.
- Checked mixed/checked/disabled/invalid controls, CJK textarea entry, horizontal
  separators, link badges, radio navigation and submitted form data. The radio
  check holds ArrowDown through Radix's deferred focus before releasing it.
- TypeScript contracts, ESLint, production build, 3 Vitest checks, Chromium
  interactions and 12 screenshot comparisons pass. Forms have no axe violations
  and no document overflow at 320/768/1440 px. No new dependency or theme rule.
- Sources remain prototypes until installation and release QA are complete.

### M2.2 — Navigation and overlays

- Added Select, Tabs, Alert Dialog, Popover and Tooltip with every pinned export,
  variant/size/orientation, native callbacks and scoped themed dependencies.
- Verified Select typeahead/forms/scrolling and nesting inside Dialog, automatic
  and manual Tabs, alert focus/dismissal/action rules, editable Popover and
  keyboard Tooltip. Small alerts and long Select values work at 320px.
- Build, types, lint, 3 Vitest checks, browser interactions and 19 screenshot
  comparisons pass; 20 responsive/interaction review checks pass. New screenshots
  were visually inspected. Captures park the mouse to prevent stale hover states.
- Upstream and themed scrolling Select reproduce `aria-hidden-focus` and
  `scrollable-region-focusable`; both support End-to-last-option scrolling.
  Findings are retained and require human review. Other new scans are clean.
- No new dependency, styling runtime or asset; installation and human QA pending.

### M2.3 — Remaining MVP and gallery

- Added Progress, Table and Scroll Area plus a fictional inventory composition.
  The catalog searches all 61 pinned entries and displays exact source, coverage
  and tokens; all 20 MVP components now have themed sources and examples.
- Corrected Progress value forwarding/custom-max fill, made scrolling regions
  keyboard-focusable, and fixed grid shrinkage at the Scroll Area root. Forced
  colors preserve meter and thumb cues. Recorded these changes separately.
- Build, type contracts, lint, 3 Vitest checks, browser interactions, 23 reviewed
  screenshot comparisons and 27 responsive/state review checks pass. Inventory
  and catalog scans have no violations; inherited menu/Select findings remain.
- Updated foundation navigation and approval text. No added runtime dependency.
  All components remain prototypes pending installation and release evidence.

### M3.1 — Registry

- Added canonical registry metadata, 21 development items and generated payloads
  using unchanged shadcn 4.21.0. Foundation installs one CSS file and the full MIT
  notice; every component has explicit themed transitive dependencies.
- Source/schema/export/dependency checks pass (4 Vitest checks total). Rebuilding
  all 22 JSON files, including the catalog, gives byte-identical output. Production
  preview serves the Dialog payload with the expected foundation/Button edges.
- Added installation/backup/diff documentation and scoped project conventions.
  `v0.1.0-dev` is mutable development output, not an immutable public release.
- Registry installation into fresh/existing consumers is the next verification.

### M3.2 — Consumer validation

- Fresh Vite 7.3.2 and Next.js 16.3.3 projects install all 20 components through
  the served registry, with exact package versions and nondefault aliases.
- Development and production browser checks pass for state, document/portal
  colors and focus return. Next's server Card and hydrated controls render with
  no page/console errors. Both production builds and type checks pass.
- Installing Dialog alone resolves themed Button/foundation/license. Identical
  reinstallation skips 22 files. Dry-run/diff does not mutate files or packages;
  declining overwrite preserves a customized Button. No overwrite flag used.
- Retained consumer lockfiles and a measured compatibility report. No external
  runtime requests, missing CSS or unresolved imports; workspace lock unchanged.
- Local implementation and delivery gates now pass. M4 human/browser review,
  final public identity/endpoint and release approval remain outstanding.

### M4.1 — Release preparation

- Prepared an immutable content-addressed copy of the 22 registry JSON files and
  checksum verification. Both consumers resolve its transitive Dialog payloads
  as identical. The development address remains explicitly mutable.
- Added local install instructions to the source-backed catalog and reconciled
  approval/compatibility/asset documentation. Reviewed the new catalog screenshot.
- The full interaction suite passes in Chromium 149.0.7827.55, Firefox 151.0 and
  Playwright WebKit 26.5. WebKit used extracted temporary libraries, with no system
  package changes. No Safari or full stable-browser-matrix claim is made.
- Isolated Button measurement: foundation 1,142 gzip bytes; JavaScript −52 gzip
  bytes and CSS +224 gzip bytes versus upstream. No other component/gallery
  modules in that bundle, no styling runtime, required font/decorative asset or
  external runtime request in tested fixtures.
- Types, lint, 5 Vitest checks, production build and 23 screenshot comparisons
  pass. Human QA worksheet and outstanding release gates are concrete and linked.
- **M4.2 remains open:** requested human AT/Safari/mobile/real-zoom results. Final
  public identity, rights review and publication authorization are not supplied.
  M5 remains queued; all 41 remaining sources are visible in the backlog.

### M4.2 — User decision

- The user has no human screen-reader, real Safari/mobile or browser-zoom
  results yet and explicitly requested that release QA remain pending.
- Keep the M4.2 gate unchecked. Continue authorized local M5 development and
  per-step commits without publishing or claiming release readiness.

### M5.1 — Disclosure and feedback

- Added seven sources, exact-source registry items, API contracts and examples;
  Collapsible, Aspect Ratio and Direction are unchanged no-chrome helpers.
- Accordion uses shared focus and logical alignment; Alert titles wrap; loading
  states respect reduced motion. No added package or shared theme rule.
- Types, lint, 5 Vitest checks, production build, 27 inspected/reproduced
  screenshot comparisons and 32 responsive/state checks pass. Disclosure axe
  scan is clean; inherited menu/Select findings remain. All three browser engines
  pass, including a basic Direction/RTL keyboard fixture.
- Fresh Vite/Next installs of all 27 sources pass dev/prod, aliases, CSS, portal,
  SSR/hydration and safe reinstall checks. Fixed fixture readiness for streamed
  Next hydration and scoped Alert checks away from its route announcer.
- M4.2 remains pending by user instruction. Original immutable MVP payloads
  remain unchanged; M5 additions use the documented development registry.

### M5.2 — Content and controls

- Added eleven components, all exported parts and supported variants/states,
  a composed content/control page, API contracts and explicit registry edges.
- Slider names/descriptions/invalid state now reach its thumbs; form examples
  preserve repeated range values. Kbd tooltip colors are readable, Item text
  wraps fully, and Toggle Group layout follows its primitive orientation.
- Types, lint, source/schema checks, build, all three engine interaction suites,
  31 inspected/reproduced screenshots and 37 responsive/state checks pass.
  Content scan has no violations; inherited menu/Select findings remain.
- Fresh Vite/Next installs/builds and dev/prod checks pass for all 38 components.
  Inspected the pinned CLI's stateful non-RSC directive regex: a bulk Dialog diff
  differs only by its client directive. Tests decline existing-file replacement
  and verify complete inventory and stable hashes; upstream CLI is unchanged.
- No new package or shared theme rule. The geometric SVG is original, inline
  and example-only. Release QA and the original immutable MVP snapshot remain
  unchanged. 23 pinned entries remain to be processed.

### M5.3 — Forms and command

- Added Field, Form, Input Group, Input OTP and Command with every pinned API,
  explicit dependency edges and a complete form/command example page.
- Corrected textarea addon focus, CommandDialog naming and modal focus return,
  decorative separator semantics and duplicate OTP text in forced colors.
- Types, lint, 5 source/schema/contrast checks, production build, all three engine
  suites, 37 inspected/reproduced screenshots and 43 responsive/state checks pass.
  An upstream critical empty cmdk listbox finding is reproduced and retained for
  human triage; other new scan states have no violations. Synthetic clipboard
  data tests do not claim real OS clipboard/mobile autofill coverage.
- Fresh Vite/Next installs of all 43 components pass builds, dev/prod interaction,
  aliases, SSR, portal focus and safe reinstall checks. An initial upstream TLS
  failure was retried successfully. Retained exact consumer locks and evidence.
- The user explicitly deferred the Base UI Combobox for this release. Its frozen
  source/API inventory remains; no themed source or install item is supplied.
  The Popover/Command recipe is a separate composition. Human release QA remains
  pending, and the original immutable MVP bytes remain untouched.

### M5.4 — Extended navigation and overlays

- Added Context Menu, Menubar, Navigation Menu, Hover Card, Sheet, Drawer and
  Sidebar, plus the unchanged use-mobile hook and complete registry edges.
- Shared keyboard context opening now works across engines. Fixed bounded
  Drawer footer hit testing, Sidebar offcanvas focus, icon labels, mobile focus
  return, right-side spacing, separator width and random SSR skeleton markup.
- Types, lint, 5 source/schema checks, production build, all three browser engine
  suites, 49 inspected/reproduced screenshots and 54 responsive/state checks pass.
  Four Sheet sides and four Drawer directions fit 320×360 with usable footers.
  Baseline-matched Context Menu/Navigation Menu focus findings remain for human
  review alongside the earlier findings; no rule is globally disabled.
- Fresh Vite/Next installs of all 50 components and the hook pass builds,
  dev/prod, SSR/hydration, custom aliases and safe reinstallation. Vaul remains
  the pinned 1.1.2 dependency; no upstream or workspace-lock change.
- Combobox remains explicitly deferred. Ten component sources and advanced
  compositions remain; human release QA and publication gates are still open.

### M5.5 — Advanced and conversational

- Added the final ten sources and registry items, preserving every pinned export.
  Date Picker and Data Table reuse existing components and native local state.
  All 61 source entries are now classified: 60 prototypes and one user-deferred
  Combobox, plus the unchanged mobile helper and two documented compositions.
- Corrected Carousel keyboard capture/listener cleanup, Recharts 3 tick contrast
  and legend icon hiding; added visible conversational focus, opaque states,
  reduced motion, reachable toast targets and separated reaction controls.
- Type contracts, scoped lint, 5 source/schema/contrast checks and production
  build pass. All three browser engines pass the extended interaction suite;
  final mobile spacing/target checks pass. Sixty screenshots were inspected and
  65 responsive/state checks pass. No new axe finding or external runtime request.
- Fresh Vite/Next consumers install all 60 components and the mobile hook, use
  published @shadcn/react 0.3.1, build, hydrate, exercise advanced controls and
  preserve customized files. M5.6 verifies the final immutable candidate.
- Combobox stays deferred and M4.2 stays pending. No publication, upstream source
  change or workspace dependency/lockfile change.
