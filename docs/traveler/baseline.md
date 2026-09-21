# Traveler UI baseline

Audited September 21, 2026 against specification v0.1. The collection remains a
local prototype; this report is not a release or cross-browser support claim.

## Pinned checkout

- Local remote: `git@github.com:wynnzen/ui.git` (`origin`).
- Upstream project: <https://github.com/shadcn-ui/ui>.
- Source commit: `98a1fe67b439324ddc857f47fbdce056600a4329`.
- Initial tracked working tree: clean. The specification and `.serena/` were
  already untracked and are left outside development commits.
- Selected source: **`apps/v4/registry/new-york-v4`**, the authored Radix legacy
  collection. Its components are canonical, not generator outputs.
- Frozen inventory: [component-coverage.json](component-coverage.json), containing
  all 61 `.tsx` UI files with upstream paths, SHA-256 hashes, exports, imports and
  milestone/status fields. Recipes without separate UI source (such as Date
  Picker/Data Table) remain part of M5 composition work, not invented source files.
- Original MIT notice: [LICENSE.md](../../LICENSE.md); preserve it in distribution.

## Resolved tools

Versions below were read from the installed packages after
`pnpm install --frozen-lockfile`. The lockfile is unchanged.

| Tool / dependency                       | Version      |
| --------------------------------------- | ------------ |
| Node used for checks                    | 24.15.0      |
| Package manager (root `packageManager`) | pnpm 10.33.4 |
| React / React DOM                       | 19.2.3       |
| TypeScript                              | 5.9.2        |
| App Tailwind CSS / PostCSS plugin       | 4.3.0        |
| Radix umbrella package                  | 1.4.3        |
| class-variance-authority                | 0.7.1        |
| cn                                      | 0.2.2        |
| lucide-react                            | 0.474.0      |
| Next.js                                 | 16.3.3       |
| Vite (existing workspace dependency)    | 7.3.2        |
| Vitest (existing workspace dependency)  | 3.2.6        |
| shadcn CLI (workspace source)           | 4.21.0       |

Use Node 22.12+ or the audited Node 24 runtime for this preview (Vite 7's
requirement); the CLI declares Node >=20.18.1 and Next.js >=20.9.0. The root's
Tailwind 3 dependency is **not** the component target: app CSS resolves Tailwind
4 through `apps/v4/node_modules` and its existing PostCSS configuration.
Bun is absent locally; it is needed by the upstream aggregate registry command,
but not by the scoped Traveler preview.

## Source and generated ownership

| Location                                                                                            | Ownership                                                    |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `apps/v4/registry/new-york-v4/ui`                                                                   | Pinned authored baseline; unchanged                          |
| `apps/v4/registry/bases/*`, `registry/styles/style-*.css`                                           | Other authored upstream collections; unchanged               |
| `apps/v4/registry/traveler/ui`, `styles`, `examples`                                                | Traveler canonical component/CSS/example source              |
| `apps/v4/registry/__index__.tsx`, `__components__`, `bases/__index__.tsx`, `examples/__index__.tsx` | Upstream generated indexes                                   |
| `apps/v4/styles/<base-style>/ui`, `ui-rtl`                                                          | Upstream generated compiled components                       |
| `apps/v4/public/r`                                                                                  | Upstream generated installation JSON; do not hand-edit       |
| `apps/v4/build/traveler`                                                                            | Ignored, disposable Traveler preview build                   |
| `packages/shadcn/dist`                                                                              | Ignored CLI build, including shared `tailwind.css`           |
| `apps/v4/public/r/traveler`                                                                         | Reserved for M3 generated Traveler payloads; not shipped yet |

Read `apps/v4/registry/README.md`, `bases/README.md`,
`scripts/build-registry.mts` and the CLI's `tsup.config.ts` before implementation.
The generator validates `registry.ts`, rewrites source paths/dependencies and
invokes the standard CLI. Generated base/style trees are temporary. The legacy
`new-york-v4` tree is specifically preserved during cleanup.

Do not add Traveler to the upstream style matrix or edit generated style files.
M3 will use the existing CLI's custom `registry.json` build path. No CLI fork is
needed. Root `registry:build` additionally runs repository-wide lint/format writes;
do not use it for this isolated collection.

## Preserved component contract

The selected baseline uses React 19 component props, `cn` for utility merging,
`cva` for Button variants, and Radix primitives. Button supports `asChild`
through `Slot.Root` (not Base UI's `render`). Native props, React 19 refs,
`data-slot`, named sizes and all six variants are retained. Dialog and Dropdown
Menu retain their client directives, part exports, controlled/uncontrolled
callbacks and original portal behavior. Dialog's internal Button must import the
Traveler Button. No new provider or game-specific variant is required.

Semantic colors use full CSS values and Tailwind 4 `@theme inline` mappings in
`apps/v4/app/globals.css`, not `hsl(var(...))`. Existing `dark:` selectors require
`.dark` on the document root in addition to `data-ui-theme="traveler"`.

## Scoped preview and checks

The upstream Next root mounts theme providers, downloaded fonts and analytics,
and imports generated style collections. For the initial plain-background and
isolated-document comparisons, use the **already installed Vite runner** with
canonical source imports. This is a small development fixture, not a second docs
framework or a claim of clean-consumer/SSR support. M3 still requires independent
Vite and Next.js registry installation tests.

Run from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter=shadcn build
pnpm traveler:dev                 # http://127.0.0.1:4173/baseline.html
pnpm traveler:build               # production preview, no upstream regeneration
pnpm traveler:preview             # serve the production output on port 4173
pnpm traveler:typecheck
pnpm traveler:check
pnpm --filter=v4 exec eslint registry/traveler traveler.vite.config.ts
```

Baseline evidence:

- Frozen install and CLI prerequisite build passed.
- Unchanged Button variants, disabled state and `asChild` link compile in the
  baseline page. Production preview build, scoped types and inventory test passed.
- The first preview attempt failed because the fresh checkout had no
  `packages/shadcn/dist/tailwind.css`; the documented CLI build resolves it.
- Reused the app's existing PostCSS config after an inline plugin import exposed
  incompatible duplicate PostCSS types. No dependency/version change was needed.
- pnpm reports that root `pnpm.overrides` / `packageExtensions` are ignored;
  retained existing configuration and frozen resolved versions.
- Vite reports that dependency `use client` directives are ignored in its
  client-only bundle; canonical source keeps those directives for Next consumers.
- Full upstream Next production build and monorepo test suite were not run.
  They cover unrelated integrations/generated collections and are not evidence
  required for the unchanged scoped baseline; their status is unverified.

Documentation revalidated with find-docs against the official shadcn
[theming](https://ui.shadcn.com/docs/theming) and
[registry](https://ui.shadcn.com/docs/registry/getting-started) conventions.
