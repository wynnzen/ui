import { useState } from "react"
import { createRoot } from "react-dom/client"

import { Badge } from "@/registry/traveler/ui/badge"
import { Button } from "@/registry/traveler/ui/button"
import { Checkbox } from "@/registry/traveler/ui/checkbox"
import { Label } from "@/registry/traveler/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/traveler/ui/radio-group"
import { Separator } from "@/registry/traveler/ui/separator"
import { Switch } from "@/registry/traveler/ui/switch"
import { Textarea } from "@/registry/traveler/ui/textarea"

import "./preview.css"

function Forms() {
  const [mixed, setMixed] = useState<boolean | "indeterminate">("indeterminate")
  const [pace, setPace] = useState("steady")
  const [shared, setShared] = useState(false)
  const [notes, setNotes] = useState("Follow the river to Willowmere.")
  const [result, setResult] = useState("No settings submitted.")
  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-10">
      <header className="grid gap-3">
        <a className="trav-control w-fit underline" href="./">
          Traveler UI / Component index
        </a>
        <h1 className="font-heading text-4xl">Prepare for the road.</h1>
        <p className="text-muted-foreground">
          Forms and content, using the approved visual foundation.
        </p>
      </header>
      <section
        id="badge"
        className="grid gap-4"
        aria-labelledby="badge-heading"
      >
        <h2 id="badge-heading" className="font-heading text-2xl">
          Badge
        </h2>
        <div className="flex flex-wrap gap-3">
          {(
            [
              "default",
              "secondary",
              "outline",
              "destructive",
              "ghost",
              "link",
            ] as const
          ).map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
          <Badge asChild variant="outline">
            <a href="#settings">Open settings</a>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Six original variants; asChild retains link semantics. Plain badges
          are not controls.
        </p>
      </section>
      <section
        id="separator"
        className="grid gap-4"
        aria-labelledby="separator-heading"
      >
        <h2 id="separator-heading" className="font-heading text-2xl">
          Separator
        </h2>
        <div className="flex h-10 items-center gap-5 text-sm">
          <span>Journal</span>
          <Separator
            orientation="vertical"
            decorative={false}
            aria-label="Vertical rule"
          />
          <span>Settings</span>
        </div>
        <Separator decorative={false} aria-label="Horizontal rule" />
      </section>
      <form
        id="settings"
        className="grid gap-8"
        onSubmit={(event) => {
          event.preventDefault()
          setResult(
            JSON.stringify(
              Object.fromEntries(new FormData(event.currentTarget))
            )
          )
        }}
      >
        <section
          id="textarea"
          className="grid gap-4"
          aria-labelledby="textarea-heading"
        >
          <h2 id="textarea-heading" className="font-heading text-2xl">
            Textarea and Label
          </h2>
          <div id="label" className="grid gap-2">
            <Label htmlFor="journey-notes">Journey notes</Label>
            <Textarea
              id="journey-notes"
              name="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              required
              aria-describedby="notes-help"
            />
            <p id="notes-help" className="text-sm text-muted-foreground">
              Controlled text; native selection, resizing and form submission.
              Labels wrap without clipping.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="fixed-notes">Read-only notes</Label>
              <Textarea
                id="fixed-notes"
                readOnly
                defaultValue="The crossing opens at dawn."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="disabled-notes">Disabled notes</Label>
              <Textarea
                id="disabled-notes"
                disabled
                defaultValue="Archive unavailable"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="invalid-notes">Invalid notes</Label>
            <Textarea
              id="invalid-notes"
              aria-invalid="true"
              aria-describedby="notes-error"
              placeholder="A visible error example"
            />
            <p id="notes-error" className="text-sm text-destructive">
              Error: include a destination before submitting these notes.
            </p>
          </div>
        </section>
        <section
          id="checkbox"
          className="grid gap-4"
          aria-labelledby="checkbox-heading"
        >
          <h2 id="checkbox-heading" className="font-heading text-2xl">
            Checkbox
          </h2>
          <Label className="min-h-10">
            <Checkbox name="provisions" value="packed" defaultChecked />
            Provisions packed
          </Label>
          <Label className="min-h-10">
            <Checkbox checked={mixed} onCheckedChange={setMixed} />
            Partly packed
          </Label>
          <Label className="min-h-10">
            <Checkbox disabled defaultChecked />
            Archived supplies
          </Label>
          <Label className="min-h-10">
            <Checkbox aria-invalid="true" aria-describedby="supplies-error" />
            Unconfirmed supplies
          </Label>
          <p id="supplies-error" className="text-sm text-destructive">
            Error: confirm the supplies before departure.
          </p>
        </section>
        <fieldset id="radio-group" className="grid gap-4">
          <legend className="mb-4 font-heading text-2xl">Radio Group</legend>
          <RadioGroup
            name="pace"
            aria-label="Travel pace"
            value={pace}
            onValueChange={setPace}
          >
            <Label className="min-h-10">
              <RadioGroupItem value="steady" />
              Steady pace
            </Label>
            <Label className="min-h-10">
              <RadioGroupItem value="swift" />
              Swift pace
            </Label>
            <Label className="min-h-10">
              <RadioGroupItem value="unavailable" disabled />
              Express route unavailable
            </Label>
          </RadioGroup>
          <RadioGroup
            defaultValue="river"
            orientation="horizontal"
            className="flex flex-wrap gap-5"
            aria-label="Route preference"
          >
            <Label className="min-h-10">
              <RadioGroupItem value="river" />
              River route
            </Label>
            <Label className="min-h-10">
              <RadioGroupItem value="ridge" />
              Ridge route
            </Label>
          </RadioGroup>
        </fieldset>
        <section
          id="switch"
          className="grid gap-4"
          aria-labelledby="switch-heading"
        >
          <h2 id="switch-heading" className="font-heading text-2xl">
            Switch
          </h2>
          <Label className="min-h-10">
            <Switch name="share" checked={shared} onCheckedChange={setShared} />
            Share itinerary
          </Label>
          <Label className="min-h-10">
            <Switch size="sm" defaultChecked />
            Compact switch
          </Label>
          <Label className="min-h-10">
            <Switch disabled />
            Cloud sharing unavailable
          </Label>
          <p className="text-sm text-muted-foreground">
            On and off have distinct thumb positions. Labelled rows provide
            comfortable targets; the small size remains available.
          </p>
        </section>
        <Button type="submit" className="w-fit">
          Apply journey settings
        </Button>
        <output role="status" className="text-trav-success text-sm break-all">
          {result}
        </output>
      </form>
      <details>
        <summary className="trav-control w-fit cursor-pointer">Usage</summary>
        <pre className="mt-4 overflow-x-auto border bg-card p-4 text-sm">
          <code>{`<Label htmlFor="notes">Notes</Label>
<Textarea id="notes" name="notes" defaultValue="River road" />
<Label><Checkbox name="packed" />Packed</Label>
<RadioGroup name="pace" defaultValue="steady">
  <Label><RadioGroupItem value="steady" />Steady</Label>
</RadioGroup>
<Label><Switch name="share" />Share itinerary</Label>`}</code>
        </pre>
      </details>
    </main>
  )
}

createRoot(document.getElementById("root")!).render(<Forms />)
