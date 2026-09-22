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
- [ ] **M5.1 — Disclosure and feedback:** Accordion, Collapsible, Aspect Ratio,
      Direction, Alert, Skeleton and Spinner, with helper classifications.
- [ ] **M5.2 — Content and controls:** Avatar, Breadcrumb, Button Group, Empty,
      Item, Kbd, Native Select, Pagination, Slider, Toggle and Toggle Group.
- [ ] **M5.3 — Forms and command:** Field, Form, Input Group, Input OTP,
      Command and Combobox; validate their complete dependency chains.
- [ ] **M5.4 — Extended navigation and overlays:** Context Menu, Menubar,
      Navigation Menu, Hover Card, Sheet, Drawer and Sidebar.
- [ ] **M5.5 — Advanced and conversational:** Calendar/Date Picker, Data Table,
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
