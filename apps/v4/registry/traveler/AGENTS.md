# Traveler collection

Canonical source is `ui/`, `styles/theme.css`, and `registry.json`. Do not edit
`public/r/` payloads by hand: regenerate with the upstream shadcn CLI. Preserve
all other registry collections and the pinned exports in the coverage manifest.

Run commands from the repository root:

- `pnpm --filter=shadcn build` prepares the existing CLI/schema prerequisites.
- `pnpm --filter=@shadcn/react build` prepares the existing Message Scroller package.
- `pnpm traveler:registry` regenerates the development registry payloads.
- `pnpm traveler:typecheck` checks bidirectional component API contracts.
- `pnpm traveler:check` checks source provenance, contrast, CSS budget and registry.
- `pnpm --filter=v4 exec eslint registry/traveler traveler.vite.config.ts`
- `pnpm traveler:build` builds the scoped gallery and copies registry payloads.
- `pnpm traveler:preview` serves production fixtures on 127.0.0.1:4173.
- With that server running, `pnpm traveler:test:browser` and `pnpm traveler:review`.
- `pnpm traveler:test:consumers` installs into fresh temporary Vite/Next projects
  and checks builds, portals, SSR, aliases and safe reinstallation. Requires the
  production registry preview and package-registry access.
- `pnpm traveler:performance` measures an isolated Button build versus upstream.
- `pnpm traveler:freeze` creates a content-addressed local registry snapshot;
  existing pinned payload bytes must never be changed. Record the candidate
  manifest in `docs/traveler/release-candidate.json` after review.
- `TRAVELER_BROWSER=firefox pnpm traveler:test:browser` selects another installed
  Playwright engine; `webkit` is also supported. `TRAVELER_BROWSER_EXECUTABLE`
  optionally supplies a compatible local browser launcher.
- `pnpm traveler:review:capture` explicitly changes screenshots: inspect changes
  before committing. It is not a substitute for release approval.

Use document-root theme activation, semantic tokens and existing Radix behavior.
Every component depends on `@traveler/foundation`; internal dependencies must use
explicit `@traveler/` addresses. Keep actual package dependencies minimal. The
foundation carries the MIT notice and installs CSS once. Consumer API names and
client/server boundaries remain those of the pinned source.

Registry namespaces do not isolate destination filenames. Never recommend
unattended overwrites. Test changes in a clean consumer and inspect dry-run/diff
output before replacing customized files. Keep manual QA and inherited axe
findings visible in documentation. No publication or deployment is implied by a
local build or commit; final name, namespace and host remain release decisions.
