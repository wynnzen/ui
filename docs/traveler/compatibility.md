# Prototype compatibility and verification

This records **measured M1–M4.1 behavior**, not a released support matrix or WCAG
conformance claim. Full release checks remain in M3/M4 of [todo.md](../../todo.md).

| Area                 | Evidence / status                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source baseline      | Radix `new-york-v4` at `98a1fe67b439324ddc857f47fbdce056600a4329`                                                                                                          |
| Runtime              | React/React DOM 19.2.3; Tailwind 4.3.0; Vite 7.3.2                                                                                                                         |
| Types                | TypeScript 5.9.2; bidirectional assignability of every prototype export and Button variants                                                                                |
| Browser actually run | Playwright 1.61.0, Chromium 149.0.7827.55, Linux x64                                                                                                                       |
| Screenshot setup     | DPR 1; viewport 320/768/1440 × 1000; `en-US`; UTC; reduced motion; fixed fictional content                                                                                 |
| Font environment     | System fonts only; local Fontconfig resolves system-ui to Noto Sans, Georgia to Noto Serif; no font assets bundled                                                         |
| Reflow               | No document overflow at 320, 768, 1440 px; a 320 × 360 dialog stays in bounds and its footer is reachable                                                                  |
| Enlarged text        | 200% root font size at 768 px passes reflow and form submission                                                                                                            |
| Zoom                 | 200% CSS zoom at 1440 px passes; this approximates layout effects and is **not** real browser-UI zoom validation                                                           |
| Forced colors        | Control/focus outlines and panel borders visible; shadows removed; menu keyboard operation retained                                                                        |
| Reduced motion       | Overlay animation computes to 0 seconds; interactions remain immediate                                                                                                     |
| Input / composition  | Native FormData, required fields, controlled/default values, refs, CJK text, readonly/disabled state and Button link composition checked                                   |
| Overlays             | Arrow navigation skips disabled items; typeahead, checkbox/radio/mixed values, submenus, Tab containment, Escape and focus restoration checked; nested menu tokens checked |
| Isolation            | Original preview in another document has no Traveler attribute/tokens                                                                                                      |
| Network              | No external runtime requests observed for the production fixtures                                                                                                          |
| Styling size         | Shared theme source: 3,887 bytes / 1,142 gzip bytes. Entire themed preview CSS: about 22.21 kB / 5.40 kB gzip, including Tailwind and gallery utilities                    |
| Dependencies         | No new package, lockfile change, font request, analytics, canvas or animation runtime                                                                                      |
| Still pending        | Full release-browser matrix, real Safari/mobile, real browser zoom, assistive technology, RTL support and publication                                                      |

## Automated accessibility triage

Scans use the existing pinned axe-core 4.10.3 from the app's accessibility lint
stack. The plain gallery, open dialog and nested dialog/menu have no reported
violations in this run. **The open dropdown has one serious `aria-hidden-focus`
finding on `#root`.** The unchanged upstream menu produces the same finding:
Radix hides the background from assistive technology while its descendants
remain DOM-focusable. Tab is intercepted and remains in the active menu in both
fixtures; Escape restores trigger focus. This comparison explains the finding,
but does not establish screen-reader correctness or waive human review.

The review command reruns the matching upstream fixtures. It permits only that
specific inherited rules and matching affected surfaces, preserving it in the
report; every other themed violation fails the command. The baseline comparison
also reports an upstream highlighted-row contrast finding that is not present in
the themed menu. No accessibility rule is globally disabled.

axe also reports checks requiring review:

- `aria-valid-attr-value`: closed Radix dialog/submenu triggers reference popup
  IDs not mounted until opened. The opened relationships and accessible names
  are exercised by the browser checks; screen-reader review remains pending.
- `aria-hidden-focus`: Radix focus guards and hidden background need confirmation
  that they redirect/contain focus. Keyboard tests cover Tab, Shift+Tab, Escape
  and nested focus return. Representative assistive-technology review is pending.
- `color-contrast`: some overlay scan states require review. The actual screenshots
  were inspected and nineteen opaque palette pairs pass numeric checks; final
  manual state review remains a release requirement.

Do not label this prototype “accessibility certified” or claim all scans are
clean. A release must resolve or formally review inherited issues with the
selected primitive baseline and complete the missing human checks.

## Reproduction and screenshot review

```sh
pnpm traveler:build
pnpm traveler:preview
# With that server running, in a second terminal:
pnpm traveler:typecheck
pnpm traveler:check
pnpm traveler:test:browser
pnpm traveler:review
```

`traveler:review` compares screenshots byte-for-byte with the committed review
candidates, checks browser/platform identity, and repeats accessibility,
responsive, portal, motion and network checks. Candidate images are original
prototype evidence. The user approved the M1 visual direction; subsequent
screenshots document implementation checks, not release certification. Actual comparison
images are written to ignored `.codex-artifacts/traveler/` for inspection.

`pnpm traveler:review:capture` explicitly replaces candidate images and their
`evidence.json`. Use it only after inspecting the change; never silently accept
regressions. A different browser build, OS font set or rendering environment can
change pixels. The runner records the current kernel/platform and browser; a
portable pinned OS image is a later release task. Read
[visual-language.md](visual-language.md) for the approved visual direction.

Full upstream Next build and monorepo tests were not run. The scoped M3 consumer
validation below establishes the tested installation and SSR cases only.

## M2 navigation and overlay evidence

The forms and navigation pages plus open Alert Dialog, Popover and Tooltip scans
have no axe violations. A scrolling Select reproduces two serious upstream
findings: `aria-hidden-focus` on `#root`, and `scrollable-region-focusable` on
Radix's presentation viewport. Options use managed focus with `tabIndex=-1`;
End moves focus to the last option and scrolls it into view in both fixtures.
The comparison permits these exact rules only when reproduced on the same
surfaces in the corresponding upstream Select scan. Findings remain recorded;
keyboard success is not a substitute for assistive-technology review.

All 20 modules retain their export/prop contracts. The browser suite exercises
Select form submission/typeahead/nested portals, both Tabs activation modes,
Alert Dialog cancellation/action/focus containment and outside interaction,
Popover editing/Escape, and Tooltip keyboard focus/Escape. All screenshots use
the same approved recipes. There are still no added runtime packages or assets.

## M2 inventory and catalog evidence

The inventory and searchable catalog have no axe violations at the recorded
scan state. 320/768/1440px layouts keep horizontal overflow inside explicitly
focusable table/scroll regions. Progress accessible values match the rendered
fill and custom maximum; native keyboard scrolling and source search pass.
Forced-colors checks cover Progress fill, Switch position and scroll thumbs.
Catalog token markup was corrected to use valid definition-list grouping.

## M3 clean-consumer validation

Both Vite 7.3.2 and Next.js 16.3.3 (webpack) install all 20 components from the
served registry using shadcn 4.21.0, with React 19.2.3 and Tailwind 4.3.0.
Production builds and Chromium development/production interaction checks pass.
The Next fixture renders Card on the server and exercises client state and
nested Dialog/Select after hydration with no page/console errors.

Custom `@fixture/*` aliases rewrite correctly for Vite's `src` layout and Next's
root layout. Installing only Dialog brings in the themed Button, foundation and
license. Identical reinstallation skips 22 files. A customized Button appears in
`--diff`, dry-run leaves files/package metadata intact, and answering no to its
replacement prompt preserves the customization. No overwrite flag is used.

Foundation CSS and license are byte-identical to source. Development and
production fixtures make no external runtime requests. Package installation
requires registry network access when local metadata is absent. Consumer
lockfiles are retained with their SHA-256 hashes in [consumers.json](consumers.json).
The workspace lockfile and upstream CLI remain unchanged.

Run `pnpm traveler:test:consumers` with the production registry preview running.
The command uses fresh temporary projects, retains logs under
`.codex-artifacts/traveler/consumers/`, and shuts down its own browser/server
processes. It does not modify existing user applications.

## M4.1 additional engines and budgets

The same interaction suite also passes in Firefox 151.0 and Playwright WebKit
26.5 on Linux. Pixel comparisons, axe scans and the 27 responsive/state checks
remain recorded for Chromium. The full release-browser matrix, real Safari,
mobile and assistive-technology review are still open. Environment details,
measured bundle/CSS budgets and the human worksheet are in
[release-readiness.md](release-readiness.md).

## M5.1 additions

All 27 development components now install and build in the same clean Vite/Next
matrix; updated exact versions and checks are in [consumers.json](consumers.json).
The browser suite passes on Chromium 149.0.7827.55, Firefox 151.0 and Playwright
WebKit 26.5. The new disclosure fixture has no axe findings; its 320/768/1440px
and forced-colors screenshots were inspected and reproduce. Total review: 27
screenshots and 32 responsive/state checks. RTL evidence is limited to the basic
Direction/Tabs fixture; full RTL and all human release checks remain pending.

## M5.2 additions

All 38 development components pass fresh Vite/Next installs, builds and dev/prod
interactions. Chromium, Firefox and WebKit suites pass, including native form
values, range-thumb names, Slider commit callbacks, vertical controls and Toggle
state. Review totals are 31 inspected/reproduced screenshots and 37 responsive
checks, with no new accessibility findings. The non-RSC CLI directive-only drift
is reproduced and safely declined; see content.md. Human release QA is pending.
