import { createRoot } from "react-dom/client"

import { Button } from "@/registry/new-york-v4/ui/button"

import "@/app/globals.css"

createRoot(document.getElementById("root")!).render(
  <main className="mx-auto grid max-w-3xl gap-6">
    <h1 className="text-2xl font-semibold">Unmodified shadcn/ui baseline</h1>
    <p className="text-muted-foreground">
      Radix · new-york-v4 · React 19 · Tailwind 4
    </p>
    <div className="flex flex-wrap gap-3">
      <Button>Continue</Button>
      <Button variant="outline">Settings</Button>
      <Button variant="destructive">Delete save</Button>
      <Button disabled>Unavailable</Button>
      <Button asChild variant="link">
        <a href="#notes">Read notes</a>
      </Button>
    </div>
    <p id="notes">
      This document imports the pinned upstream source unchanged.
    </p>
  </main>
)
