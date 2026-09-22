# Traveler UI development

Local development is complete: 60 themed components, the unchanged mobile helper,
and Date Picker/Data Table compositions. Combobox is explicitly deferred by user
decision. The M1 visual direction is approved; human release QA remains pending.
Nothing has been published.

- [Plan and step-by-step execution record](../../todo.md)
- [Local installation and update safety](installation.md)
- [Measured compatibility and accessibility findings](compatibility.md)
- [Release gates and human review worksheet](release-readiness.md)
- [Frozen 61-component coverage](component-coverage.json)
- [Approved visual language](visual-language.md)
- [Source provenance](baseline.md), [upstream changes](upstream-changes.md), and [asset notices](asset-manifest.md)

Prepare the existing workspace packages with `pnpm --filter=shadcn build` and
`pnpm --filter=@shadcn/react build`. Build with `pnpm traveler:registry` and `pnpm traveler:build`, then run
`pnpm traveler:preview`. Open `http://127.0.0.1:4173/catalog.html` to search
components, review exact sources/tokens and find the local install instructions.
The gallery has no required scenic image, font request or styling provider.

M5.1 [disclosure and feedback](disclosure.md) adds a basic RTL fixture and
classifies three unchanged behavior/layout helpers explicitly.

M5.2 [content and controls](content.md) includes accessible slider naming and
the reproduced non-RSC CLI directive limitation.

M5.3 [forms and command](advanced-forms.md) includes the explicit Combobox
deferral and inherited empty-results accessibility triage.

M5.4 [extended navigation](extended-navigation.md) covers responsive overlays,
Sidebar and its unchanged mobile helper.

M5.5 [advanced and conversational components](advanced.md) includes Date Picker
and Data Table compositions and the existing Message Scroller primitive.

M5.6 records the [immutable candidate](release-candidate.json), verifies fresh
Vite/Next installs from its exact URL, and preserves the original MVP snapshot.
All local milestones are complete; M4.2 human/release QA stays open.
