import { createRoot } from "react-dom/client"

import { ButtonExamples } from "./button-examples"

import "./preview.css"

createRoot(document.getElementById("root")!).render(
  <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-10">
    <header className="grid gap-4 border-b pb-8">
      <p className="text-trav-ornament text-xs tracking-[0.2em] uppercase">
        Traveler UI / Design study 01
      </p>
      <h1 className="font-heading text-4xl leading-tight sm:text-5xl">
        A quieter kind of adventure.
      </h1>
      <p className="max-w-2xl text-muted-foreground">
        Familiar components. Fine rules, warm ivory and room to read. An
        original menu-inspired system for everyday interfaces.
      </p>
      <a
        className="trav-control w-fit underline underline-offset-4"
        href="./baseline.html"
      >
        Open the unchanged shadcn comparison
      </a>
    </header>
    <ButtonExamples />
    <footer className="border-t pt-6 text-sm text-muted-foreground">
      Foundation prototype · Radix / React 19 / Tailwind 4 · Visual approval
      pending
    </footer>
  </main>
)
