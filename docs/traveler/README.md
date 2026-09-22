# Traveler UI development

The 20-component MVP plus eighteen M5 additions are implemented and installed
successfully in clean Vite and Next.js applications. M1 visual direction is approved; M4 human/release QA
and the M5 completeness milestone remain open. Nothing has been published.

- [Plan and step-by-step execution record](../../todo.md)
- [Local installation and update safety](installation.md)
- [Measured compatibility and accessibility findings](compatibility.md)
- [Release gates and human review worksheet](release-readiness.md)
- [Frozen 61-component coverage](component-coverage.json)
- [Approved visual language](visual-language.md)
- [Source provenance](baseline.md), [upstream changes](upstream-changes.md), and [asset notices](asset-manifest.md)

Build with `pnpm traveler:registry` and `pnpm traveler:build`, then run
`pnpm traveler:preview`. Open `http://127.0.0.1:4173/catalog.html` to search
components, review exact sources/tokens and find the local install instructions.
The gallery has no required scenic image, font request or styling provider.

M5.1 [disclosure and feedback](disclosure.md) adds a basic RTL fixture and
classifies three unchanged behavior/layout helpers explicitly.

M5.2 [content and controls](content.md) includes accessible slider naming and
the reproduced non-RSC CLI directive limitation.
