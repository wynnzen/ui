import { createRoot } from "react-dom/client"

import { ButtonExamples } from "./button-examples"
import { FoundationExamples } from "./foundation-examples"

import "./preview.css"

createRoot(document.getElementById("root")!).render(
  <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-10">
    <header className="grid gap-4 border-b pb-8">
      <p className="text-trav-ornament flex items-center gap-4 font-mono text-xs tracking-[0.15em] uppercase">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-12 shrink-0"
          fill="currentColor"
          shapeRendering="crispEdges"
        >
          <path d="M11 0h2v4h-2zM11 20h2v4h-2zM0 11h4v2H0zM20 11h4v2h-4zM8 4h8v2H8zM6 6h2v2H6zM4 8h2v8H4zM6 16h2v2H6zM8 18h8v2H8zM16 16h2v2h-2zM18 8h2v8h-2zM16 6h2v2h-2zM13 8h3v3h-2v2h-2v2H8v-3h2v-2h3z" />
        </svg>
        Traveler UI / Pixel edition
      </p>
      <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
        A quieter kind of adventure.
      </h1>
      <p className="max-w-2xl text-muted-foreground">
        Familiar components with a pixel-art soul. Stepped frames, warm ivory
        and quiet texture. A little adventure, with room to read.
      </p>
      <a
        className="trav-control w-fit underline underline-offset-4"
        href="./baseline.html"
      >
        Open the unchanged shadcn comparison
      </a>
    </header>
    <nav
      aria-label="Components"
      className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
    >
      {["button", "card", "input", "dropdown-menu", "dialog"].map((name) => (
        <a
          key={name}
          href={`#${name}`}
          className="trav-control underline underline-offset-4"
        >
          {name.replaceAll("-", " ")}
        </a>
      ))}
    </nav>
    <nav
      aria-label="Collection"
      className="flex flex-wrap gap-x-6 gap-y-3 text-sm"
    >
      <a className="trav-control underline" href="./catalog.html">
        Search components, coverage and tokens
      </a>
      <a className="trav-control underline" href="./forms.html">
        Settings form
      </a>
      <a className="trav-control underline" href="./overlays.html">
        Navigation and overlays
      </a>
      <a className="trav-control underline" href="./inventory.html">
        Inventory
      </a>
    </nav>
    <ButtonExamples />
    <FoundationExamples />
    <footer className="border-t pt-6 text-sm text-muted-foreground">
      MVP development · Radix / React 19 / Tailwind 4 · Visual direction
      approved; release QA pending
    </footer>
  </main>
)
