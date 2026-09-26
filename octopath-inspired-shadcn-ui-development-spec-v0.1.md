# Octopath Traveler–Inspired shadcn/ui Library
## Development Requirements and Implementation Plan

**Document version:** 0.1  
**Date:** September 21, 2026  
**Working name:** Traveler UI — a placeholder, not a finalized public name  
**Status:** Proposed specification; implementation and validation have not started  
**Foundation:** The user's downloaded `shadcn-ui/ui` repository

> **Product principle:** Keep shadcn/ui's components, composition model, public APIs, and interaction behavior. Replace their visual presentation with a cohesive, original design system inspired by Octopath Traveler's menus and atmosphere.

**Baseline limitation:** The downloaded repository and its commit have not been inspected. Public upstream documentation and manifests were reviewed for this document. Paths below are proposed logical locations, not verified paths in the user's checkout. The first implementation milestone must resolve the exact source paths, primitive family, dependency versions, and build commands.

Normative wording: **must** means a release requirement; **should** means the preferred implementation unless an exception is documented; **may** means optional. Named visual values and performance budgets are proposed project targets, not measurements of the game or an implemented library.

---

## 1. Product definition

Build a reusable React UI library by restyling the shadcn/ui component source already available in the downloaded repository. Consumers should continue to use familiar components such as `Button`, `Card`, `Input`, `Dialog`, `Select`, and `Tabs`, rather than learn a parallel set of game-specific controls.

shadcn/ui explicitly supports modifying its component source and distributing custom components through its registry model. This project will use that model rather than introduce a replacement interaction framework. [S1, S2]

The result is **more than a palette preset**: typography, panel construction, selection indicators, spacing, borders, shadows, and every applicable interaction state must be designed together. It is also **less than a game engine**: no combat logic, character systems, world rendering, or controller framework is required.

A normal usage example should remain recognizable:

```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <div className="flex gap-3">
      <Button>Continue</Button>
      <Button variant="outline">Settings</Button>
      <Button variant="destructive">Delete save</Button>
    </div>
  )
}
```

The themed source and shared stylesheet supply the aesthetic. Ordinary consumers must not need to add `variant="octopath"` to every component or wrap every control in an `RpgFrame`.

### Success criteria

The library is successful when an existing example for the selected shadcn baseline can use the themed components without behavioral rewrites; components look coherent on a plain background; installation works outside the fork; and the visual treatment does not undermine readability, keyboard operation, responsiveness, or customization.

---

## 2. Initial decisions and assumptions

| Topic | Proposed decision for version 0.1 |
| --- | --- |
| Visual reference | Octopath Traveler I/II menu language, with II as the initial reference for the first design review. |
| Fidelity | Recognizable inspiration, not pixel-for-pixel reproduction or redistribution of game assets. |
| Core theme | A dark, restrained menu theme. A complete light/parchment theme is deferred. |
| Component identity | Preserve baseline names, exports, props, composition, and behavior. |
| Distribution | Custom shadcn registry and copyable source; no new CLI. |
| Primitive backend | Keep the family selected from the downloaded checkout. Support one baseline in the MVP. |
| Framework target | React and TypeScript; Tailwind CSS 4 is the preferred first consumer target if compatible with the checkout. |
| Theme activation | Explicit document-level activation, with no required new React provider for styling alone. |
| Scope | Cover the selected upstream component inventory in stages, not just a showcase of a few controls. |
| Public branding | Choose an independent name before publication. `Traveler UI` and `@traveler` are provisional. |

These defaults allow work to begin without assuming that the user has approved an exact font, palette, public name, or package scope. Visual direction must be approved after the first five-component prototype, before the rest of the library is restyled.

---

## 3. Scope and exclusions

### Included

The deliverable includes a token system, restyled shadcn source components, shared decoration recipes, component documentation, an interactive gallery, registry metadata and generated payloads, clean-consumer installation tests, accessibility checks, visual regression tests, and an upstream maintenance record.

The long-term scope is **every applicable component in the pinned baseline**. A published coverage manifest must distinguish completed components, work in progress, deferred components, and components with no visible surface to restyle. Newly added upstream components enter the backlog; they do not silently expand a frozen release.

### Excluded from the MVP

Do not build a game engine, 3D renderer, particle system, audio engine, global gamepad navigation, or game-state management. Do not introduce a different headless UI library, rebuild the shadcn CLI, publish a compiled npm component package, or rewrite the entire upstream documentation site. Vue, Svelte, React Native, multiple primitive backends, multiple Tailwind majors, and mixed nested themes are not first-release commitments.

Game-inspired compositions may demonstrate the library, but they must remain examples built from its existing components—not replacements for those components.

---

## 4. Repository audit and baseline selection

The public upstream repository currently contains an `apps/v4` application, workspace packages, and registry build scripts. Its root and application manifests do not have identical dependency responsibilities. The local checkout, its lockfile, and its relevant application manifest must determine implementation choices—not a guessed directory layout or the root manifest alone. [S3, S4]

### Required audit output

Create `docs/traveler/baseline.md` recording the upstream remote, commit or release, local modifications, package-manager version, Node/runtime requirements, React and TypeScript versions, Tailwind major, selected base/style, primitive packages, canonical component source directories, generated directories, and relevant development/build/test commands.

Inspect the component implementations and generator before editing. Determine whether the selected files are canonical sources, templates, or generated outputs. If code is generated, change its designated source and regenerate; never maintain independent edits that the next build will erase.

Current shadcn documentation exposes distinct Base UI and Radix implementations. Preserve the selected implementation's own contract; do not assume `asChild`, `render`, data attributes, or portal APIs are interchangeable. [S5, S6]

### Repository strategy

Keep the downloaded repository as the development foundation. Add one isolated themed source collection and the minimum gallery/registry integration needed to expose it. Leave original upstream style collections intact for comparison and maintenance. Do not mass-replace colors across the monorepo or modify the official CLI merely to recognize the new theme.

Use existing workspace conventions and lockfiles. Read build scripts before invoking them: upstream aggregate scripts can include formatting or other mutations. Prefer scoped commands for the new collection, and review generated changes before committing.

**Audit exit condition:** the relevant baseline example builds, the canonical source path is established, and the selected component contract is documented. Existing failures must be recorded separately from failures introduced by this project.

---

## 5. Architecture and source ownership

```text
Selected shadcn source baseline
             |
             v
Traveler component source — same interaction contract
             |
             +---- Semantic theme tokens
             +---- Shared visual decoration recipes
             |
             +---- Gallery and interaction fixtures
             +---- Registry metadata -> generated installation payloads
             +---- Original example compositions
```

### Responsibilities

**Semantic tokens** define surfaces, text, status colors, borders, typography, spacing, and motion. Retain shadcn's semantic token vocabulary and add namespaced tokens only for genuinely new visual concepts. shadcn recommends CSS-variable theming and semantic foreground/background pairs. [S7]

**Decoration recipes** implement fine frames, inset rules, subtle surface treatment, and menu indicators. Prefer CSS and small original SVGs. These recipes do not own application state or replace interaction primitives.

**Component source** contains the normal shadcn exports and the minimum styling changes necessary to apply the design. Keep event handling and composition intact.

**Compositions** combine components into example screens. They may contain demonstration state, but must not contain the only working implementation of a supposedly reusable component.

**Registry and documentation** read from the same canonical themed source. Avoid maintaining separate showcase, copy-code, and installed implementations.

### Proposed logical layout

Map this layout onto the audited repository instead of moving unrelated upstream files:

```text
<existing-ui-application>/
  registry/traveler/
    ui/                         # Canonical restyled component source
    styles/                     # Semantic tokens and decoration recipes
    lib/                        # Only helpers needed by installed components
    examples/                   # Compositions built from the same components
    registry.json               # Theme/component distribution metadata
  <existing-docs-location>/traveler/
  <existing-public-location>/r/traveler/  # Generated payloads, never hand-edited

docs/traveler/
  baseline.md
  visual-language.md
  component-coverage.json
  compatibility.md
  upstream-changes.md
  asset-manifest.md

tests/traveler/
  interactions/
  visual/
  consumers/
```

The actual generator may require different locations. Preserve this ownership model even when the paths differ.

---

## 6. Visual design specification

### 6.1 Visual intent

The proposed interpretation is an elegant, atmospheric RPG menu system: translucent-looking dark surfaces, fine pale rules, restrained highlights, compact information groups, and minimal ornament. The official game describes HD-2D as a combination of pixel art and 3DCG; this project translates the atmosphere into DOM-based UI rather than reproducing that rendering technique. [S8]

The design must not collapse into generic medieval gold panels or a heavy 8-bit skin. Pixelated body text, thick staircase borders on every control, parchment behind every input, excessive flourishes, and constant glowing effects are outside the default direction.

Prepare a reference board covering a navigation menu, item list, confirmation dialog, status panel, and selected/disabled states. Record which visual traits are being adapted. Keep reference material distinct from redistributable library assets.

### 6.2 Proposed palette

These are original starting values, not colors sampled or claimed to match the game. Validate rendered foreground/background combinations before approval.

| Role | Starting value | Intended use |
| --- | --- | --- |
| Background | `#111315` | Quiet charcoal application base. |
| Surface | `#1B1E21` | Cards and ordinary panels. |
| Raised surface | `#24282D` | Popovers and higher-emphasis panels. |
| Main text | `#F2EEE5` | Warm ivory body text and labels. |
| Muted text | `#B9B3A7` | Descriptions and supporting information. |
| Action/selected fill | `#E4DCCB` | High-emphasis action with dark text. |
| Action foreground | `#1A1C1F` | Text on the light action fill. |
| Hover surface | `#30363D` | Low-key row and control emphasis. |
| Focus indicator | `#C2D7E8` | Cool, clearly visible keyboard focus. |
| Quiet border | `#666761` | Decorative separators, not every control boundary. |
| Input boundary | `#96968D` | More distinct interactive boundaries. |
| Error accent | `#E6A19A` | Invalid states and error messaging. |
| Success accent | `#B9CEAC` | Positive feedback. |
| Optional ornament | `#BAA680` | Sparse muted brass details. |

Status text, destructive filled buttons, charts, and sidebar states require complete semantic color pairs, not reuse of the same accent regardless of its background. Gold/brass is an ornament, not the universal action or selection color.

### 6.3 Typography

Use a readable body face for menus, forms, tables, and documentation. Start with a system sans-serif stack so the prototype has no font-download dependency. A restrained serif heading stack may add a literary character to panel titles and large headings.

Proposed sizing: 16 px default body and text entry, 14 px supporting labels, and 18–24 px panel headings. Use relative sizing and test browser zoom. Keep tabular numerals for numeric tables. Test long labels and CJK fallback; a Latin-only display font must never become a requirement for reading the interface.

A final display font is a later visual decision. Any bundled font needs verified redistribution terms and its own license notice.

### 6.4 Geometry, material, and density

Use predominantly rectangular controls with 0–2 px corner rounding. Preserve purposeful shapes, such as circular radio indicators, rather than forcing every element into a square. Prefer thin borders, an occasional inset rule, and shallow shadows. A panel can have more structure than a tiny badge.

Use a 4 px spacing rhythm. Propose a 40 px minimum height for ordinary standalone controls and 44 px touch targets where appropriate; existing named size variants remain available and must be evaluated separately. List density must leave room for indicators and text without making mobile controls miniature.

Ship opaque surfaces as the reliable default. An optional atmospheric treatment may add low-opacity grain or controlled translucency after contrast testing. No background image, blur filter, or canvas should be necessary for the library to look complete.

### 6.5 Selection and focus

Menus and selectable rows may use a small arrow or diamond-shaped decorative marker, a fine leading rule, or a soft horizontal highlight. Reserve indicator space so its appearance does not move text.

A highlighted row, selected value, pressed button, and keyboard-focused element are different states. Their styles must remain distinguishable. A game-like pointer supplements—not replaces—a visible focus indicator.

### 6.6 Motion

Use short, quiet transitions, initially 100–180 ms for ordinary state changes. Prefer opacity and limited translation for overlays. Avoid bounce, looping shimmer, particles, or sound in the core library. Respect reduced-motion preferences; interaction must not wait for an animation to finish.

---

## 7. Theme implementation and CSS contract

Use existing semantic tokens such as `--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, and `--ring`, including their required foreground pairs. Cover chart and sidebar tokens when those components enter scope. Add `--trav-*` tokens for decoration-specific concepts such as inset rules, selection-marker size, grain strength, and panel shadow. [S7]

The preferred MVP activation is an explicit attribute on the document root:

```html
<html data-ui-theme="traveler">
```

Illustrative Tailwind-4-oriented token fragment:

```css
/* Illustrative only: complete the token inventory during implementation. */
:root[data-ui-theme="traveler"] {
  color-scheme: dark;
  --background: #111315;
  --foreground: #f2eee5;
  --card: #1b1e21;
  --card-foreground: #f2eee5;
  --popover: #24282d;
  --popover-foreground: #f2eee5;
  --primary: #e4dccb;
  --primary-foreground: #1a1c1f;
  --secondary: #30363d;
  --secondary-foreground: #f2eee5;
  --muted: #24282d;
  --muted-foreground: #b9b3a7;
  --accent: #30363d;
  --accent-foreground: #f2eee5;
  --border: #666761;
  --input: #96968d;
  --ring: #c2d7e8;
  --radius: 0.125rem;
  --trav-rule: #96968d;
  --trav-grain-opacity: 0;
}
```

Reuse the baseline's Tailwind token bridge. For a Tailwind 4 target, define any new utility-facing mappings through its theme system; do not blindly mix full CSS color values with older `hsl(var(--token))` conventions. Resolve the exact bridge from the audited checkout. Tailwind's current theme documentation explains its CSS-based token mappings. [S9]

Where retained component styles use a class-based `dark:` variant, the activation instructions must also set the baseline's `.dark` class on the same root, or deliberately map that variant to the theme attribute. `color-scheme: dark` alone does not activate a Tailwind dark selector. Establish stylesheet order so existing light/dark token declarations cannot silently override the enabled theme, and verify the actual computed styles in the consumer fixtures. [S7]

### Styling rules

Preserve the baseline's class-merging helper and variant mechanism. Use low-specificity, namespaced decoration rules in an appropriate CSS layer so documented consumer utilities can still override them. Avoid blanket `!important`, broad selectors targeting all buttons, and global resets outside the enabled theme.

Color tokens alone will not produce the design: component source must also remove incompatible rounding, tune spacing, apply typography roles, and cover state-specific borders and highlights. Keep repeated visual recipes centralized rather than duplicating them in every component.

Do not add children to an `input` or `textarea`; use their own border/background treatment. Do not insert decorative wrappers that break slot composition, refs, labels, event forwarding, focus outlines, or layout. Decorative SVGs must be non-focusable and hidden from assistive technology; decoration layers must not intercept pointer events.

### Portals and theme ownership

Portaled content must receive the same tokens and styling as its trigger. Document-level activation makes the ordinary body-portal case straightforward. Retain the baseline's portal container behavior; do not move portals merely to make CSS selectors work. Dialog primitives expose portal behavior that must be preserved. [S10, S11]

For the initial gallery, isolate upstream/themed comparisons in separate preview documents or iframes. Do not promise arbitrary nested light/dark themes in one document. A later scoped-theme API must explicitly solve portal inheritance, nested overlays, and stacking contexts.

---

## 8. Functional requirements

| ID | Requirement | Evidence required |
| --- | --- | --- |
| R01 | Preserve selected shadcn exports and public component contracts. | Baseline usage and type fixtures compile. |
| R02 | Apply the approved aesthetic to every completed component and visible subpart. | Reviewed component/state screenshots. |
| R03 | Centralize semantic tokens and repeated decoration recipes. | Token audit; no uncontrolled palette duplication. |
| R04 | Preserve keyboard, pointer, focus, form, and controlled/uncontrolled behavior. | Interaction tests against the selected baseline. |
| R05 | Distribute components through a custom registry. | Clean consumer installation and build. |
| R06 | Provide working previews, source examples, and state documentation. | Gallery and installable source remain synchronized. |
| R07 | Support documented responsive and accessibility scenarios. | Manual and automated verification records. |
| R08 | Keep decorative assets optional and independently licensed. | Asset manifest and plain-background fixtures. |
| R09 | Prevent silent overwrites of existing consumer customizations. | Existing-project installation/diff procedure. |
| R10 | Track upstream provenance and full component coverage. | Baseline record, coverage manifest, and changelog. |
| R11 | Avoid unexpected runtime network, telemetry, or heavy rendering dependencies. | Consumer bundle and network inspection. |
| R12 | Make builds and registry releases reproducible. | Pinned tooling and immutable release evidence. |

---

## 9. Component rollout and visual mapping

### Stage A: visual foundation prototype

Implement **Button, Card, Input, Dialog, and Dropdown Menu** first. Together they exercise actions, surfaces, editable content, overlays, item highlighting, portals, and keyboard behavior. Include representative variants and disabled/invalid/focus states; five attractive default screenshots are not enough.

Approve these components before converting the full inventory. Changes to the visual grammar should happen here, not after dozens of components have accumulated inconsistent decoration.

### Stage B: MVP collection

| Component family | Required treatment | Behavior to preserve |
| --- | --- | --- |
| Button / Badge | Rectangular silhouettes; coherent default, outline, secondary, ghost, link, and destructive treatments where present. | Native attributes, composition, named sizes, disabled behavior. |
| Card | Dark panel, fine frame, measured heading hierarchy, optional inset rule. | Existing header/content/footer composition. |
| Separator / Label | Fine rules and readable subdued typography. | Orientation, labeling, and semantic behavior. |
| Input / Textarea | Inset dark field, clear boundary, focus and invalid states. | Entry, selection, autofill, IME, refs, form attributes. |
| Checkbox / Radio Group | Restrained outlined markers with unmistakable checked states. | Keyboard behavior, indeterminate state where supported, forms. |
| Switch | Compact, clear on/off control rather than an ambiguous ornament. | Accessible name, state, keyboard and disabled behavior. |
| Select | Framed trigger and popup, readable item rows, stable selection indicator. | Value handling, keyboard search/navigation, scrolling and portals. |
| Tabs | Quiet tab strip, clear active marker, restrained panel separation. | Activation mode, focus order, orientation and disabled tabs. |
| Dialog / Alert Dialog | Strong panel hierarchy, understated backdrop, clear action area. | Naming, descriptions, focus containment/restoration, dismissal rules. |
| Dropdown Menu | Soft row highlight and optional leading marker; coherent submenus. | Navigation, checked items, disabled items and dismissal behavior. |
| Popover / Tooltip | Small dark framed surfaces with careful padding. | Positioning, collision handling and baseline trigger behavior. |
| Progress | Thin meter and deliberate muted fill; no decorative looping glow. | Value semantics and indeterminate behavior where supported. |
| Table | Clear headers, fine row dividers, readable numeric alignment. | Semantic table structure and consumer-owned data behavior. |
| Scroll Area | Minimal but discoverable thumb and track. | Scrolling, keyboard access and usable hit areas. |

Promote any helper or composition dependency required by an MVP component into the same milestone. For example, a needed field/error-message component cannot be left unstyled simply because it was scheduled later.

### Stage C: completeness release

Extend the design to the remaining inventory: Accordion, Collapsible, Command, Combobox, Context Menu, Menubar, Navigation Menu, Sheet, Drawer, Calendar, Date Picker, Data Table recipes, Slider, Toggle, Toggle Group, Input OTP, Avatar, Breadcrumb, Pagination, Sidebar, Skeleton, Spinner, notifications, Chart, Carousel, Resizable, and additional groups or primitives present in the pinned checkout.

This list is a planning guide, not a claim about the exact contents of the user's version. Form helpers, third-party-backed components, and newer upstream entries must be reconciled during the audit.

For components without visible UI, record “behavior retained; no visual surface” rather than invent unnecessary chrome. Browser-owned native popup surfaces are not promised a pixel-identical custom appearance; retain their native behavior and document the styling boundary.

### Completion tracking

For each component record its upstream source and commit, exported parts, dependencies, required states, visual status, interaction status, accessibility review, documentation status, and installation status. “Done” requires all applicable fields, not merely a styled root element.

---

## 10. State and interaction contract

Each component must document the states it actually supports: default, hover, focus-visible, active/pressed, selected/checked, expanded/open, disabled, invalid, read-only, and busy/loading where applicable. Unsupported states are marked not applicable, not invented as new props.

Loading examples should use the baseline's composition pattern, with appropriate semantics supplied by the example. Do not add a mandatory `loading` prop across the library solely for styling. Disabled controls must not react visually as though they were enabled, but essential explanatory text must remain legible.

Use the selected primitives' actual state attributes. An open menu does not mean a value is selected; a highlighted item is not necessarily selected; a checked item is not merely hovered. Preserve these distinctions in both selectors and examples.

Retain baseline behavior for Enter, Space, arrow keys, Tab, Escape, focus return, and outside interaction where each is supported. Alert Dialog and Dialog can have different dismissal expectations. Do not add global arrow-key interception or application-wide keyboard shortcuts to imitate a console menu.

The implementation must also preserve `name`, `value`, `defaultValue`, validation attributes, associated labels, refs, event handlers, controlled state callbacks, and link-versus-button semantics wherever applicable. Existing client/server component boundaries must remain intact; the theme must not make every file a client component.

---

## 11. Distribution and installation

### Registry-first delivery

Publish the theme foundation and each supported component as registry items. Use the existing shadcn CLI and schema. The current schema supports component files, package dependencies, registry dependencies, CSS variables, and CSS rules; validate against the CLI version selected for the project. [S2, S12]

A component item should include only its own source and actual dependencies. Do not copy the fork's entire application dependency list into consumers. Theme rules must be installed once through the shared foundation item, not duplicated into every component.

**Critical dependency rule:** references to this library's components must resolve to this library. A bare registry dependency such as `button` means the built-in shadcn item, not necessarily the custom registry's themed button. Use explicit namespaced or fully qualified addresses and test transitive installation. [S12]

### Intended consumer experience

After publication, users configure a custom registry, install the theme and components, follow the documented stylesheet/activation step, and import components from their ordinary local UI alias. The installed files retain names such as `button.tsx` and exports such as `Button`.

Illustrative namespace configuration, to be merged into an existing `components.json`:

```json
{
  "registries": {
    "@traveler": "https://registry.example.com/v0.1/r/{name}.json"
  }
}
```

`registry.example.com` is a placeholder and is not a deployed service. The final release must publish and test its real installation command, CLI version, and endpoint. Namespace configuration and item-address installation follow the official registry namespace mechanism. [S13]

Keep `components.json` on a recognized baseline style/base. A custom registry namespace does not automatically register a new official `style` value.

### Installation safety and updates

Test both an empty consumer and an existing project with customized shadcn files. Registry namespaces distinguish addresses, not necessarily local file destinations: `@traveler/button` may still target a pre-existing `button.tsx`.

Require a documented diff/backup process before replacement; do not prescribe unattended overwrite flags. Explain which component files, dependency declarations, and CSS rules are affected. Changing a registry endpoint must not be described as automatically updating previously copied source.

Version the component payloads and their theme dependencies together. Retain immutable release endpoints or equivalent pinned references. Test alias rewriting, shared helpers, imported CSS, client directives, package dependencies, and reinstallation behavior in clean consumers.

---

## 12. Gallery and documentation requirements

Reuse the repository's relevant preview/documentation infrastructure where practical. Do not add a second complete documentation framework by default.

Each component page must show the default example, all baseline variants/sizes, meaningful states, a keyboard-interaction example where appropriate, usage code, styling notes, and any compatibility limitation. Installation snippets and source previews must correspond to the exact registry source.

Provide a searchable component index, a coverage/status page, a token reference, and the following integrated examples: a menu/list screen, an editable settings form, and a dashboard or inventory-like screen using fictional content. The examples must prove everyday web usability, not only resemblance to a game screenshot.

A plain-background fixture is mandatory. An optional atmospheric example may add an original scenic background, but the core library must remain convincing when that background is removed. Side-by-side upstream comparisons should use isolated preview documents to avoid theme and portal leakage.

Documentation must clearly separate product policy, measured compatibility, known limitations, and future plans. Do not advertise untested browsers, primitive families, or framework versions as supported.

---

## 13. Accessibility and responsive requirements

Target WCAG 2.2 AA for the relevant component demonstrations. Normal text generally needs 4.5:1 contrast, large text 3:1, and required non-text visual indicators 3:1 against adjacent colors, subject to the standard's applicability and exceptions. Preserve visible focus, meaningful labels, and non-color cues. Automated scans alone do not establish conformance. [S14]

WCAG 2.2's minimum pointer-target criterion is generally 24 by 24 CSS pixels, with defined exceptions. This project proposes more comfortable targets for ordinary controls; do not confuse a 44 px product preference with the AA minimum. [S15]

Review actual rendered states, not just token swatches. Text on translucency must be tested over bright, dark, and high-detail backgrounds. Decorative borders may be subtle, but boundaries needed to identify controls and their states must remain discernible. Error messages must not rely on color alone.

Use semantic HTML and preserve underlying accessibility behavior. Verify labels, dialog naming, focus return, announcement of state changes, and icon-only action names. Decorative markers must not produce redundant announcements. Keep full error messages visible and avoid tooltip-only essential instructions.

### Required responsive scenarios

Test 320 px, 768 px, and 1440 px widths, plus increased text size and browser zoom. Forms and navigation must reflow without clipped controls. Tables may use an explicitly managed horizontal scroll region. Use content-driven sizing, allow long translations, and ensure overlays remain usable when a mobile keyboard reduces the viewport.

Test reduced motion and forced-colors modes. Suppress unnecessary texture/shadow in forced colors and retain visible borders/focus. Do not disable browser zoom, browser focus behavior, or text selection for aesthetic reasons. Use logical spacing properties and include a basic RTL fixture before claiming RTL support.

---

## 14. Test strategy and quality gates

Reuse existing test tools where adequate. Prefer the repository's unit/interaction runner and browser tests rather than introducing parallel infrastructure without a gap to solve.

| Test layer | Required coverage |
| --- | --- |
| Static checks | Types, lint, exports, imports, registry schema, source/payload consistency. |
| Component behavior | Controlled/uncontrolled usage, callbacks, focus, keyboard, disabled/invalid states, forms and composition. |
| Visual regression | Component parts, variants and states on fixed background/viewport fixtures. |
| Accessibility | Automated checks plus manual keyboard and representative screen-reader review. |
| Consumer integration | Registry install, alias transformation, CSS activation, portals, development and production builds. |
| Performance | Incremental JS/CSS/assets, unnecessary network requests and interactive layout shifts. |

Use Playwright screenshot comparisons or the existing equivalent. Fix browser versions, OS image, fonts, viewport, pixel ratio, animation settings, time-dependent data, and test content for reproducible baselines. Playwright notes that rendering can vary by environment; baseline updates must be reviewed rather than accepted automatically. [S16]

The minimum consumer matrix is one Vite React/TypeScript application and one Next.js application, using the same selected primitive family and Tailwind major. The latter must exercise SSR/hydration boundaries. These fixtures validate delivery and do not add Vite or Next.js to the components' runtime API.

Browser targets are the current and previous stable releases of Chrome/Edge, Firefox, and Safari at release testing time, subject to the selected dependency baseline. Record exact versions and platforms tested. Run cross-engine automation where possible and a real Safari/mobile spot check before claiming those environments; WebKit automation alone is not a blanket Safari certification.

No new serious or critical automated accessibility findings may remain unexplained, and no known blocking manual accessibility failure may ship. Lesser findings must be triaged; a clean automated scan does not waive manual checks.

---

## 15. Performance and dependency budgets

These are initial targets to validate, not current results:

| Area | Proposed budget or rule |
| --- | --- |
| Styling runtime | Zero additional JavaScript required solely to draw borders, textures, or selection markers. |
| Theme CSS | At most 20 KiB gzip of incremental foundation/decorative CSS for the MVP; measure separately from host Tailwind output. |
| Decorative assets | At most 75 KiB compressed in the optional MVP asset set; no required background image. |
| Fonts | No mandatory remote font request; optional font cost reported separately. |
| Component imports | Installing/importing one component must not pull in the gallery, entire collection, or unrelated visual libraries. |
| Network behavior | No runtime registry calls, telemetry, or analytics initiated by the UI components. |
| Layout | Hover/focus/selection must not cause avoidable text or control movement. |

Prefer CSS over animation libraries for the MVP. Add a dependency only when an existing baseline capability is insufficient. Large blur surfaces, SVG filters, and repeating effects need performance evidence before they become defaults.

---

## 16. Implementation milestones

| Milestone | Work | Exit evidence |
| --- | --- | --- |
| M0 — Baseline | Audit checkout, select source/base, record versions, run baseline checks, inventory components. | `baseline.md`, initial coverage manifest, reproducible relevant build. |
| M1 — Design foundation | Reference board, semantic tokens, five prototype components, full representative states. | Approved visual language plus keyboard/contrast review. |
| M2 — MVP components | Complete Stage B; unify recipes; cover subparts, variants, states and responsiveness. | Component pages and passing interaction/visual checks. |
| M3 — Distribution | Build registry, install foundation/dependencies, test existing and clean consumers. | Passing Vite and Next.js installation/build fixtures. |
| M4 — MVP release | Final manual QA, documentation, bundle audit, asset review and versioned payloads. | Release checklist satisfied; explicit scope and limitations. |
| M5 — Completeness | Finish the pinned component inventory and advanced compositions. | Every inventory entry complete or explicitly classified; no silent omissions. |

Do not estimate a reliable calendar completion date until M0 establishes repository complexity and the scope of the selected baseline. If resources are constrained, reduce the published component scope explicitly rather than claim library-wide completion from a polished demo.

### First implementation task

Produce the baseline report and component manifest, then prepare one working themed Button page using the existing project conventions. Confirm the import, style, build, and test paths before adding the other four prototype components. Do not begin by batch-rewriting all classes or deleting upstream applications.

---

## 17. Definition of done

### Per component

A component is complete only when its provenance is recorded; its public exports and supported usage compile; every visible subpart and applicable state follows the approved style; behavior, focus, forms, and composition remain intact; long content and responsive layouts work; documentation and installation reference the same source; and its consumer fixture has no unresolved dependencies or missing CSS/assets.

Review the themed component both alone and inside at least one realistic composition. A Select that works alone but loses styling inside a Dialog is not complete.

### MVP release

The release must include all declared MVP components, foundation tokens, consistent documentation, a versioned registry, source examples, passing clean-consumer tests, reviewed screenshots, manual keyboard checks, the compatibility matrix, a license/asset manifest, an upstream baseline record, and an honest list of deferred components.

All checks described here are pending until implemented and run. This document is not evidence that the current checkout builds or that any component already meets these criteria.

---

## 18. Upstream maintenance and versioning

Record the upstream origin of each component and maintain a small change log separating visual edits from behavioral changes. Preserve the baseline's event and accessibility implementation wherever possible so future fixes remain reviewable.

Before an upstream update, compare source changes, identify behavioral/security/accessibility fixes, reapply the visual layer deliberately, and run the component and consumer tests. Do not periodically overwrite the themed source with unreviewed CLI output.

Use versioned releases for the design system. Treat export/prop changes, removal of supported tokens, and incompatible theme installation changes as breaking changes. Document meaningful visual changes, because downstream applications may depend on density, dimensions, or screenshot baselines even when TypeScript APIs are unchanged.

Maintain compatibility only for the matrix actually tested. Source compatibility means compatibility with the selected shadcn baseline—not a promise to match every historic or future shadcn release or every primitive backend.

---

## 19. Licensing, assets, and publication hygiene

The upstream code is MIT-licensed; retain the required copyright and permission notices in redistributed code. Track third-party packages and asset licenses separately. The upstream license text is the authority for its notice requirements. [S17]

Project policy is to create original borders, icons, textures, sample content, and branding or use assets with documented redistribution permission. Do not ship extracted game sprites, maps, portraits, logos, proprietary fonts, sound effects, or game screenshots as library assets. A reference board is not an asset license.

Choose an independent public name and describe the visual inspiration without implying official affiliation. Public release requires a rights review of the actual name and bundled assets; this specification does not determine trademark availability or provide legal clearance.

Review inherited documentation-site integrations before deployment. Publish only intentionally configured analytics or third-party services, keep credentials out of registry payloads, and avoid placing unsafe scripts or external fetches inside decorative SVGs.

---

## 20. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Generic fantasy styling instead of the requested aesthetic | Approve a specific reference board and five-component prototype first. |
| Only changing colors | Review typography, geometry, spacing, selection treatment and all visible subparts. |
| Losing accessible behavior through visual rewrites | Preserve primitives/composition; run behavior tests after each family. |
| Unreadable translucent menus | Opaque default; validate optional translucent surfaces over adverse backgrounds. |
| Wrong source files or overwritten generated edits | Establish canonical ownership during M0 and test regeneration. |
| Themed components pulling in unstyled upstream dependencies | Explicit custom-registry addresses and transitive installation fixtures. |
| Registry install damaging consumer customizations | Diff-first documentation and existing-project installation tests. |
| Portal theme leakage and overlay conflicts | Document-root activation, isolated gallery previews, nested-overlay tests. |
| Excessive fork maintenance | Keep the change set isolated; preserve CLI and upstream style collections. |
| Attractive gallery but broken reusable library | Release requires standalone installation and production consumer builds. |
| Unbounded “all components” scope | Freeze the baseline inventory and publish a versioned coverage manifest. |

---

## 21. Decisions to resolve during development

| Decision | Default now | Must be resolved by |
| --- | --- | --- |
| Exact local commit and primitive/style baseline | Not yet known. | End of M0. |
| Exact visual reference balance between I and II | Start from II's restrained menu direction. | M1 approval. |
| Final palette and heading typeface | Proposed colors and system font fallbacks. | M1 approval. |
| Final public name, registry namespace and host | `Traveler UI`, `@traveler`, placeholder host. | Before M4 publication. |
| Light theme | Deferred; dark theme only in MVP. | Separate future scope decision. |
| Additional backends or Tailwind majors | Not supported in MVP. | Separate compatibility milestone. |
| Optional scenic demo/assets | Not required for core acceptance. | Before any such assets are published. |

**Recommended implementation sequence:** establish the real repository baseline → approve the visual system with five components → complete the declared MVP → prove registry installation in fresh applications → expand to the full pinned inventory.

---

## References

Public sources reviewed September 21, 2026. They support upstream capabilities and standards; the design decisions, rollout, budgets, and project policies in this document are proposals. Revalidate implementation details against the pinned checkout and selected tooling before coding.

| ID | Source | Address |
| --- | --- | --- |
| S1 | shadcn/ui — Introduction | `https://ui.shadcn.com/docs` |
| S2 | shadcn/ui — Registry getting started | `https://ui.shadcn.com/docs/registry/getting-started` |
| S3 | shadcn-ui/ui — Public repository and root manifest | `https://github.com/shadcn-ui/ui` ; `https://raw.githubusercontent.com/shadcn-ui/ui/main/package.json` |
| S4 | shadcn-ui/ui — Application manifest | `https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/v4/package.json` |
| S5 | shadcn/ui — Base UI Button | `https://ui.shadcn.com/docs/components/base/button` |
| S6 | shadcn/ui — Radix Button | `https://ui.shadcn.com/docs/components/radix/button` |
| S7 | shadcn/ui — Theming | `https://ui.shadcn.com/docs/theming` |
| S8 | Square Enix — Octopath Traveler II, About | `https://www.jp.square-enix.com/octopathtraveler2/about/` |
| S9 | Tailwind CSS — Theme variables | `https://tailwindcss.com/docs/theme` |
| S10 | Radix Primitives — Dialog | `https://www.radix-ui.com/primitives/docs/components/dialog` |
| S11 | Base UI — Dialog | `https://base-ui.com/react/components/dialog` |
| S12 | shadcn/ui — Registry item schema | `https://ui.shadcn.com/docs/registry/registry-item-json` |
| S13 | shadcn/ui — Registry namespaces | `https://ui.shadcn.com/docs/registry/namespace` |
| S14 | W3C — Web Content Accessibility Guidelines 2.2 | `https://www.w3.org/TR/WCAG22/` |
| S15 | W3C — Understanding target size minimum | `https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html` |
| S16 | Playwright — Visual comparisons | `https://playwright.dev/docs/test-snapshots` |
| S17 | shadcn-ui/ui — MIT license | `https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md` |
