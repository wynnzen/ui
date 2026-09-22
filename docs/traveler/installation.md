# Development registry and installation

This is a local development registry, not a published release. Public name,
namespace and host are provisional. React 19 and Tailwind 4 are required for the
selected source baseline. Both clean-consumer matrices pass; see [compatibility](compatibility.md).

## Build and inspect

```sh
pnpm --filter=shadcn build
pnpm --filter=@shadcn/react build
pnpm traveler:registry
pnpm traveler:check
pnpm traveler:build
pnpm traveler:preview
```

The unchanged workspace CLI is shadcn **4.21.0**. Canonical metadata is
`apps/v4/registry/traveler/registry.json`. The CLI emits 62 items (foundation, 60 components and
the Sidebar mobile hook) into `public/r/v0.1.0-dev/`; the Vite preview serves them at
`http://127.0.0.1:4173/r/v0.1.0-dev/{name}.json`. Development paths are mutable;
release endpoints must be frozen and verified before publication.

The schema/source check validates every payload against the pinned CLI schema,
exact source text and export inventory. Every internal dependency is explicitly
namespaced. Dialog and Alert Dialog depend on Traveler Button; no bare `button`
dependency can pull in the built-in collection.

The [official registry namespace documentation](https://ui.shadcn.com/docs/registry/namespace)
describes namespace mapping. Merge this entry into an initialized consumer's
`components.json`; retain its recognized baseline style and existing aliases:

```json
{
  "registries": {
    "@traveler": "http://127.0.0.1:4173/r/sha256-48a5fb56b458e2c811e55fa5e556fa88f2548242d766d3dcda18ede8e919f737/{name}.json"
  }
}
```

Use the pinned workspace CLI for local validation. From the consumer directory,
substitute the actual absolute checkout path:

```sh
node /path/to/ui/packages/shadcn/dist/index.js add @traveler/dialog --dry-run
node /path/to/ui/packages/shadcn/dist/index.js add @traveler/dialog --diff
node /path/to/ui/packages/shadcn/dist/index.js add @traveler/dialog
```

The [registry item schema](https://ui.shadcn.com/docs/registry/registry-item-json)
supports root-relative `~/` file targets. Foundation installs:

- `styles/traveler.css` at the consumer project root.
- `licenses/traveler/LICENSE.md`, retaining the complete upstream MIT notice.

Component files go to the consumer's configured UI alias; package dependencies
are exact versions from this checkout, limited to imports actually used.
React/React DOM and the host Tailwind semantic bridge belong to the host app.

## Activate the stylesheet

Import the foundation after the host's Tailwind/shadcn imports and retain its
semantic `@theme inline` mappings. For `src/index.css` or `app/globals.css`:

```css
@import "tailwindcss";
@import "../styles/traveler.css";
```

For `src/app/globals.css`, the relative path is `../../styles/traveler.css`.
Keep CSS imports before other rules. The theme adds its own heading/destructive
foreground mappings but reuses the host's standard shadcn semantic utilities.

Activate on the document root, not an inner panel, so body portals inherit it:

```html
<html class="dark" data-ui-theme="traveler"></html>
```

In a Next.js root layout, use `className="dark" data-ui-theme="traveler"` on
`html`. Keep the installed client directives. Import individual modules from
your normal UI alias; importing Button does not import gallery/source viewers.

## Existing projects and updates

A namespace changes the item address, not its local destination. Before replacing
anything, commit or back up customized components, styles, `components.json`,
package metadata and the lockfile. Inspect `--dry-run` and `--diff` for every item
and transitive dependency. Install in a temporary branch or checkout, answer
replacement prompts deliberately, and reconcile your changes before merging.
Do not pass unattended overwrite flags. Declining a replacement should retain
customized files; M3.2 exercises this with a disposable consumer.

Changing a registry URL does not update copied source. Updates require another
reviewed installation and a compatible foundation. Keep component and foundation
versions together. Local validation does not authorize deployment, certify
accessibility, or establish support for untested browsers/framework versions.

## Pinned local snapshot

[release-candidate.json](release-candidate.json) records a content-addressed copy
of 63 JSON files: 60 components, foundation, use-mobile and the registry catalog.
The namespace above uses that exact path, keeping components and foundation
together. The original 22-file MVP manifest is archived at
[release-candidates/mvp.json](release-candidates/mvp.json); its payload bytes
remain unchanged. Final Vite/Next evidence records the candidate URL. `pnpm traveler:freeze` creates a
new content-addressed directory if payloads change and refuses to overwrite
existing pinned bytes. Rebuild the preview afterward to serve the new snapshot.

This is a local immutable candidate, not a published service or approved release.
The development URL remains useful during implementation; do not describe it as
immutable. Consumer fixture lockfiles are retained under `tests/traveler/fixtures`
for inspection of the dependency graph that was actually built.

The expanded consumer check records a pinned CLI client-directive issue during
bulk non-RSC installation. Inspect the same requested item set and decline any
unintended replacement; see [M5.2 installation notes](content.md#pinned-cli-limitation).

Combobox is explicitly excluded by user decision; its Base UI API is not supplied
by this Radix collection. Date Picker and Data Table are documented compositions
of installed components, not standalone registry items. See [advanced notes](advanced.md).
