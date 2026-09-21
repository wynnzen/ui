# Traveler UI prototype

Canonical themed source derived from the pinned Radix `new-york-v4` collection.
See [baseline](../../../../docs/traveler/baseline.md) and
[coverage](../../../../docs/traveler/component-coverage.json).

From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter=shadcn build
pnpm traveler:dev
```

Open <http://127.0.0.1:4173/>. The upstream comparison opens in a separate document.
Use `pnpm traveler:build` and `pnpm traveler:preview` for the production fixture.
With that server running, `pnpm traveler:test:browser` runs the Chromium checks.
`pnpm traveler:check` and `pnpm traveler:typecheck` run without a server.

Import `styles/theme.css` after the consumer's normal shadcn/Tailwind 4 stylesheet.
Set `<html class="dark" data-ui-theme="traveler">`. Theme tokens inherit into
body portals; no React styling provider is needed. Keep the host's semantic
Tailwind bridge, as demonstrated in `examples/preview.css`. The preview's layout
styles are not part of the distributable foundation.

The source components retain ordinary names and exports. No `octopath` variant
or decorative wrapper is needed. This is a design-review prototype; custom
registry installation and Next.js consumer validation arrive in M3.

Review material: [reference board](../../../../docs/traveler/reference-board.md),
[visual language](../../../../docs/traveler/visual-language.md), and
[measured compatibility / known findings](../../../../docs/traveler/compatibility.md).
With the production preview running, `pnpm traveler:review` compares the recorded
candidate screenshots and reruns the accessibility/responsive checks. Read the
review procedure before replacing any candidate images.
