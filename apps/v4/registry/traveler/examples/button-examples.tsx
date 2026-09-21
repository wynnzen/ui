import { useState } from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"

import { Button } from "@/registry/traveler/ui/button"

const variants = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "link",
  "destructive",
] as const
const sizes = [
  "xs",
  "sm",
  "default",
  "lg",
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
] as const

export function ButtonExamples() {
  const [count, setCount] = useState(0)
  return (
    <section
      id="button"
      aria-labelledby="button-heading"
      className="grid gap-6"
    >
      <div className="grid gap-1">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          01 / Actions
        </p>
        <h2 id="button-heading" className="font-heading text-2xl">
          Button
        </h2>
        <p className="text-sm text-muted-foreground">
          Tab to focus. Enter or Space to activate. Every original variant and
          size remains available.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-4">
        {sizes.map((size) => (
          <div key={size} className="grid justify-items-start gap-2">
            <Button
              size={size}
              variant="outline"
              aria-label={
                size.startsWith("icon") ? `Continue, ${size}` : undefined
              }
            >
              {size.startsWith("icon") ? (
                <ArrowRightIcon aria-hidden="true" />
              ) : (
                size
              )}
            </Button>
            <span className="text-xs text-muted-foreground">{size}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setCount((value) => value + 1)}>
          <CheckIcon aria-hidden="true" />
          Record progress
        </Button>
        <Button disabled>Unavailable</Button>
        <Button aria-busy="true" disabled>
          Saving…
        </Button>
        <Button variant="outline" aria-invalid="true">
          Invalid action
        </Button>
        <Button asChild variant="link">
          <a href="#button-notes">Usage notes</a>
        </Button>
        <Button className="rounded-full px-8" variant="outline">
          Consumer override
        </Button>
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        Progress recorded {count} times.
      </p>
      <details id="button-notes" className="border-t pt-4">
        <summary className="trav-control w-fit cursor-pointer text-sm">
          Usage and state notes
        </summary>
        <pre className="mt-4 overflow-x-auto border bg-card p-4 text-sm">
          <code>{`import { Button } from "@/components/ui/button"

<Button variant="outline">Settings</Button>
<Button asChild><a href="/journal">Journal</a></Button>`}</code>
        </pre>
        <p className="mt-3 text-sm text-muted-foreground">
          The document root enables the theme. Disabled and composed busy
          examples retain native semantics; no loading prop is added. Default
          controls are at least 40 px high, large controls 44 px; compact sizes
          preserve 24/32 px options. Class utilities can override geometry.
        </p>
      </details>
    </section>
  )
}
