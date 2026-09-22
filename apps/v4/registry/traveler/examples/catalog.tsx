/// <reference types="vite/client" />
import { useState } from "react"
import { createRoot } from "react-dom/client"

import { Badge } from "@/registry/traveler/ui/badge"
import { Input } from "@/registry/traveler/ui/input"
import { Label } from "@/registry/traveler/ui/label"

import coverage from "../../../../../docs/traveler/component-coverage.json"
import releaseCandidate from "../../../../../docs/traveler/release-candidate.json"
import themeSource from "../styles/theme.css?raw"

import "./preview.css"

const sources = import.meta.glob<string>("../ui/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
})
const pages: Record<string, string[]> = {
  "advanced.html": ["calendar", "carousel", "chart", "resizable", "sonner"],
  "conversation.html": [
    "attachment",
    "bubble",
    "marker",
    "message",
    "message-scroller",
  ],
  "extended-navigation.html": [
    "context-menu",
    "menubar",
    "navigation-menu",
    "hover-card",
    "sheet",
    "drawer",
  ],
  "sidebar.html": ["sidebar"],
  "advanced-forms.html": [
    "form",
    "field",
    "input-group",
    "input-otp",
    "command",
  ],
  "content.html": [
    "avatar",
    "breadcrumb",
    "button-group",
    "empty",
    "item",
    "kbd",
    "native-select",
    "pagination",
    "slider",
    "toggle",
    "toggle-group",
  ],
  "index.html": ["button", "card", "input", "dialog", "dropdown-menu"],
  "forms.html": [
    "badge",
    "separator",
    "label",
    "textarea",
    "checkbox",
    "radio-group",
    "switch",
  ],
  "overlays.html": ["select", "tabs", "alert-dialog", "popover", "tooltip"],
  "inventory.html": ["progress", "table", "scroll-area"],
  "disclosure.html": [
    "accordion",
    "collapsible",
    "aspect-ratio",
    "direction",
    "alert",
    "skeleton",
    "spinner",
  ],
}
const tokens = [
  ...themeSource.split("@theme")[0].matchAll(/(--[\w-]+):\s*([^;]+);/g),
]

function Catalog() {
  const [query, setQuery] = useState("")
  const components = coverage.components.filter((component) =>
    `${component.name} ${component.exports.join(" ")}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  )
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-10">
      <header className="grid gap-4 border-b pb-8">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Traveler UI · Component catalog
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">
          An index for the journey.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {Object.keys(sources).length} available components from a pinned
          inventory of {coverage.components.length}. The visual direction is
          approved; installation evidence and release QA are tracked separately.
        </p>
        <nav
          aria-label="Catalog sections"
          className="flex flex-wrap gap-5 text-sm"
        >
          <a className="trav-control underline" href="#components">
            Components and coverage
          </a>
          <a className="trav-control underline" href="#installation">
            Installation
          </a>
          <a className="trav-control underline" href="#tokens">
            Theme tokens
          </a>
          <a className="trav-control underline" href="./index.html">
            Foundation / menu example
          </a>
          <a className="trav-control underline" href="./forms.html">
            Settings form
          </a>
          <a className="trav-control underline" href="./inventory.html">
            Inventory
          </a>
          <a
            className="trav-control underline"
            href="./advanced.html#date-picker"
          >
            Date Picker recipe
          </a>
          <a
            className="trav-control underline"
            href="./advanced.html#data-table"
          >
            Data Table recipe
          </a>
        </nav>
      </header>
      <section
        id="components"
        className="grid gap-6"
        aria-labelledby="components-heading"
      >
        <h2 id="components-heading" className="font-heading text-2xl">
          Components and coverage
        </h2>
        <div className="grid max-w-md gap-2">
          <Label htmlFor="component-search">Find a component or export</Label>
          <Input
            id="component-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Select or CardTitle"
          />
          <output role="status" className="text-sm text-muted-foreground">
            {components.length} of {coverage.components.length} components
          </output>
        </div>
        <p className="text-sm text-muted-foreground">
          Prototype means themed, exercised locally and installed in clean
          consumers. Human release review remains pending. Combobox is
          explicitly deferred because its pinned implementation uses Base UI.
        </p>
        <ul className="divide-y border-y">
          {components.map((component) => {
            const page = Object.entries(pages).find(([, names]) =>
              names.includes(component.name)
            )?.[0]
            const source = sources[`../ui/${component.name}.tsx`]
            return (
              <li key={component.name} className="grid gap-4 py-5">
                <div className="flex flex-wrap items-center gap-4">
                  <h3 className="min-w-40 font-heading text-xl">
                    {component.name}
                  </h3>
                  <Badge variant={source ? "outline" : "secondary"}>
                    {component.status}
                  </Badge>
                  {page && (
                    <a
                      className="trav-control text-sm underline"
                      href={`./${page}#${component.name}`}
                    >
                      Open examples
                    </a>
                  )}
                </div>
                <details>
                  <summary className="trav-control w-fit cursor-pointer text-sm">
                    Coverage and exported parts
                  </summary>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-[10rem_1fr]">
                    {Object.entries({
                      exports: component.exports.join(", "),
                      states:
                        component.requiredStates?.join(", ") ||
                        "Not audited; unsupported states will be marked not applicable.",
                      visual: component.visual,
                      interaction: component.interaction,
                      accessibility: component.accessibility,
                      documentation: component.documentation,
                      installation: component.installation,
                      upstream: component.upstreamCommit,
                    }).map(([key, value]) => (
                      <div key={key} className="contents">
                        <dt className="text-muted-foreground">{key}</dt>
                        <dd className="min-w-0 break-words">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
                {source && (
                  <details>
                    <summary className="trav-control w-fit cursor-pointer text-sm">
                      Exact component source
                    </summary>
                    <pre
                      className="mt-4 max-h-96 overflow-auto border bg-card p-4 text-xs"
                      tabIndex={0}
                      aria-label={`${component.name} source`}
                    >
                      <code>{source}</code>
                    </pre>
                  </details>
                )}
              </li>
            )
          })}
        </ul>
        {components.length === 0 && (
          <p>No matching components. Try a shorter name.</p>
        )}
      </section>
      <section
        id="installation"
        className="grid gap-5"
        aria-labelledby="installation-heading"
      >
        <h2 id="installation-heading" className="font-heading text-2xl">
          Install the local snapshot
        </h2>
        <p className="max-w-3xl text-muted-foreground">
          Clean Vite and Next.js consumers pass. Start the repository preview,
          then merge this namespace into your existing components.json. The
          snapshot is pinned by its contents; the public name and host remain
          provisional.
        </p>
        <pre
          className="overflow-x-auto border bg-card p-4 text-sm"
          tabIndex={0}
          aria-label="Registry configuration"
        >
          <code>
            {JSON.stringify(
              {
                registries: {
                  "@traveler": `http://127.0.0.1:4173/${releaseCandidate.path}`,
                },
              },
              null,
              2
            )}
          </code>
        </pre>
        <p className="text-sm text-muted-foreground">
          Set TRAVELER_CHECKOUT to the absolute path of this repository. From
          your consumer directory, inspect the diff and retain a backup before
          installation:
        </p>
        <pre
          className="overflow-x-auto border bg-card p-4 text-sm"
          tabIndex={0}
          aria-label="Installation commands"
        >
          <code>{`node "$TRAVELER_CHECKOUT/packages/shadcn/dist/index.js" add @traveler/dialog --dry-run
node "$TRAVELER_CHECKOUT/packages/shadcn/dist/index.js" add @traveler/dialog --diff
node "$TRAVELER_CHECKOUT/packages/shadcn/dist/index.js" add @traveler/dialog`}</code>
        </pre>
        <p className="max-w-3xl text-sm text-muted-foreground">
          This pinned candidate contains all 60 supported components and the
          mobile helper. Combobox is explicitly deferred. The original
          20-component MVP snapshot remains available unchanged. Internal
          dependencies resolve to the same Traveler snapshot. Foundation
          installs styles/traveler.css and licenses/traveler/LICENSE.md at your
          project root. Import that CSS after your Tailwind/shadcn imports,
          retain your host semantic token mappings, and activate the html
          element with the attributes below. An existing button.tsx can conflict
          even when the registry namespace is different; do not use unattended
          overwrite flags.
        </p>
      </section>
      <section
        id="tokens"
        className="grid gap-6"
        aria-labelledby="tokens-heading"
      >
        <h2 id="tokens-heading" className="font-heading text-2xl">
          Theme tokens
        </h2>
        <p className="max-w-3xl text-muted-foreground">
          Read directly from the canonical stylesheet. Activate on the document
          root with <code>{'class="dark" data-ui-theme="traveler"'}</code> so
          portals inherit the same surface. Import the foundation after the host
          shadcn stylesheet.
        </p>
        <dl className="grid gap-x-10 sm:grid-cols-2">
          {tokens.map(([, name, value]) => (
            <div key={name} className="grid min-w-0 gap-2 border-t py-3">
              <dt className="flex items-center gap-3 text-sm break-all">
                {value.startsWith("#") && (
                  <span
                    aria-hidden="true"
                    className="size-5 shrink-0 border"
                    style={{ backgroundColor: value }}
                  />
                )}
                {name}
              </dt>
              <dd className="text-xs break-words text-muted-foreground">
                {value.replace(/\s+/g, " ")}
              </dd>
            </div>
          ))}
        </dl>
        <details>
          <summary className="trav-control w-fit cursor-pointer">
            Exact foundation stylesheet
          </summary>
          <pre
            className="mt-4 max-h-96 overflow-auto border bg-card p-4 text-xs"
            tabIndex={0}
            aria-label="Theme stylesheet source"
          >
            <code>{themeSource}</code>
          </pre>
        </details>
      </section>
      <footer className="border-t pt-6 text-sm text-muted-foreground">
        Radix / React 19 / Tailwind 4. Dark theme only. No required image or
        font request. Automated Chromium, Firefox and WebKit interactions pass.
        Human assistive-technology, real Safari/mobile and full release-browser
        checks remain pending.
      </footer>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<Catalog />)
