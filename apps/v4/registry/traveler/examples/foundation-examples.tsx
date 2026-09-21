import { useRef, useState } from "react"
import { BookmarkIcon, ChevronDownIcon, CompassIcon } from "lucide-react"

import { Button } from "@/registry/traveler/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/traveler/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/traveler/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/traveler/ui/dropdown-menu"
import { Input } from "@/registry/traveler/ui/input"

export function FoundationExamples() {
  const [bookmarked, setBookmarked] = useState(false)
  const [name, setName] = useState("Ari Vale")
  const [saved, setSaved] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)
  const [mapVisible, setMapVisible] = useState(true)
  const [pace, setPace] = useState("steady")
  const [action, setAction] = useState("No action selected.")
  const [open, setOpen] = useState(false)
  const [destination, setDestination] = useState("Northreach")

  return (
    <>
      <section
        id="card"
        aria-labelledby="card-heading"
        className="grid gap-6 border-t pt-10"
      >
        <div className="grid gap-1">
          <p className="text-trav-ornament text-xs tracking-widest uppercase">
            02 / Surfaces
          </p>
          <h2 id="card-heading" className="font-heading text-2xl">
            Card
          </h2>
          <p className="text-sm text-muted-foreground">
            Fine outer frame, quiet inset rule. Composed header, action, content
            and footer.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription>FIELD JOURNAL / 08</CardDescription>
              <CardTitle>
                <h3>The northern passage</h3>
              </CardTitle>
              <CardAction>
                <Button
                  aria-label="Bookmark journey"
                  aria-pressed={bookmarked}
                  onClick={() => setBookmarked(!bookmarked)}
                  variant="ghost"
                  size="icon"
                  className="aria-pressed:bg-accent aria-pressed:text-primary"
                >
                  <BookmarkIcon
                    aria-hidden="true"
                    className={bookmarked ? "fill-current" : undefined}
                  />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="grid gap-5">
              <p className="text-muted-foreground">
                Past the last lantern, a road follows the river north. There is
                still time to make the crossing.
              </p>
              <dl className="grid grid-cols-3 gap-3 border-y py-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Distance</dt>
                  <dd className="mt-1 text-lg tabular-nums">24 km</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Waypoints</dt>
                  <dd className="mt-1 text-lg tabular-nums">03</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Weather</dt>
                  <dd className="mt-1 text-lg">Clear</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter>
              <CompassIcon
                aria-hidden="true"
                className="text-trav-ornament size-4"
              />
              <p className="text-sm text-muted-foreground">
                Fictional places. Ordinary, reusable components.
              </p>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>TRAVEL NOTES</CardDescription>
              <CardTitle>
                <h3>A little room for detail</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y text-sm">
                <li className="flex justify-between gap-4 py-3">
                  <span>River crossing</span>
                  <span className="text-muted-foreground">Open</span>
                </li>
                <li className="flex justify-between gap-4 py-3">
                  <span>Lantern oil</span>
                  <span className="text-muted-foreground">2 flasks</span>
                </li>
                <li className="flex justify-between gap-4 py-3">
                  <span>非常に長い旅の名前 / A longer journey name</span>
                  <span className="shrink-0 text-muted-foreground">Saved</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="border-t">
              <p className="text-sm text-muted-foreground">
                No image, texture or font download is needed.
              </p>
            </CardFooter>
          </Card>
        </div>
        <details>
          <summary className="trav-control w-fit cursor-pointer text-sm">
            Card usage
          </summary>
          <pre className="mt-3 overflow-x-auto border bg-card p-4 text-sm">
            <code>{`<Card>\n  <CardHeader><CardTitle>Journal</CardTitle></CardHeader>\n  <CardContent>Your content.</CardContent>\n  <CardFooter><Button>Continue</Button></CardFooter>\n</Card>`}</code>
          </pre>
        </details>
      </section>

      <section
        id="input"
        aria-labelledby="input-heading"
        className="grid gap-6 border-t pt-10"
      >
        <div className="grid gap-1">
          <p className="text-trav-ornament text-xs tracking-widest uppercase">
            03 / Entry
          </p>
          <h2 id="input-heading" className="font-heading text-2xl">
            Input
          </h2>
          <p className="text-sm text-muted-foreground">
            A clear boundary and a separate focus outline. Native entry,
            validation and form semantics.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <form
            className="grid content-start gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              const data = new FormData(event.currentTarget)
              setSaved(
                `Saved ${data.get("traveler")} from ${data.get("home")}.`
              )
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="traveler-name" className="text-sm">
                Traveler name
              </label>
              <Input
                ref={nameRef}
                id="traveler-name"
                name="traveler"
                autoComplete="nickname"
                required
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-describedby="name-hint"
              />
              <p id="name-hint" className="text-sm text-muted-foreground">
                Controlled value. CJK and long names are welcome.
              </p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="home-town" className="text-sm">
                Home town
              </label>
              <Input
                id="home-town"
                name="home"
                defaultValue="Willowmere"
                required
              />
              <p className="text-sm text-muted-foreground">
                Uncontrolled value, included in native FormData.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save settings</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => nameRef.current?.focus()}
              >
                Focus name
              </Button>
            </div>
            <p role="status" className="text-trav-success min-h-6 text-sm">
              {saved || "Settings are saved only in this preview."}
            </p>
          </form>
          <div className="grid content-start gap-4">
            <div className="grid gap-2">
              <label htmlFor="invalid-input" className="text-sm">
                Email / invalid example
              </label>
              <Input
                id="invalid-input"
                type="email"
                defaultValue="ari@"
                aria-invalid="true"
                aria-describedby="email-error"
              />
              <p id="email-error" className="text-sm text-destructive">
                Error: enter a complete email address, such as ari@example.com.
              </p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="readonly-input" className="text-sm">
                Journal ID / read only
              </label>
              <Input id="readonly-input" readOnly value="JRNL-008" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="disabled-input" className="text-sm">
                Cloud sync / unavailable
              </label>
              <Input
                id="disabled-input"
                disabled
                defaultValue="Not connected"
              />
              <p className="text-sm text-muted-foreground">
                Cloud sync is not part of this local prototype.
              </p>
            </div>
            <div className="grid gap-2">
              <label htmlFor="empty-input" className="text-sm">
                Next stop / empty
              </label>
              <Input
                id="empty-input"
                placeholder="Choose your own destination"
              />
            </div>
          </div>
        </div>
        <details>
          <summary className="trav-control w-fit cursor-pointer text-sm">
            Input usage
          </summary>
          <pre className="mt-3 overflow-x-auto border bg-card p-4 text-sm">
            <code>{`<label htmlFor="name">Name</label>
<Input id="name" name="name" defaultValue="Ari" />`}</code>
          </pre>
        </details>
      </section>

      <section
        id="dropdown-menu"
        aria-labelledby="menu-heading"
        className="grid gap-6 border-t pt-10"
      >
        <div className="grid gap-1">
          <p className="text-trav-ornament text-xs tracking-widest uppercase">
            04 / Selection
          </p>
          <h2 id="menu-heading" className="font-heading text-2xl">
            Dropdown Menu
          </h2>
          <p className="text-sm text-muted-foreground">
            Arrow keys navigate, letters search, Enter selects, Escape returns
            focus. The diamond marks a highlighted row; checkmarks retain value
            state.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Journey options
                <ChevronDownIcon aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Field journal</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setAction("Journal opened.")}>
                  Open journal<DropdownMenuShortcut>↵</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Fast travel unavailable
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Travel pace</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={pace}
                        onValueChange={setPace}
                      >
                        <DropdownMenuRadioItem value="steady">
                          Steady
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="swift">
                          Swift
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={mapVisible}
                onCheckedChange={(checked) => setMapVisible(checked === true)}
              >
                Show map
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked="indeterminate"
                onCheckedChange={() => setAction("Mixed notes selected.")}
              >
                Some notes visible
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => setAction("Draft discarded in this preview.")}
              >
                Discard draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="text-sm text-muted-foreground">
            Map {mapVisible ? "visible" : "hidden"} · Pace {pace}
          </p>
        </div>
        <p role="status" className="text-sm text-muted-foreground">
          {action}
        </p>
        <details>
          <summary className="trav-control w-fit cursor-pointer text-sm">
            Menu usage
          </summary>
          <pre className="mt-3 overflow-x-auto border bg-card p-4 text-sm">
            <code>{`<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Options</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={openJournal}>Open journal</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</code>
          </pre>
        </details>
      </section>

      <section
        id="dialog"
        aria-labelledby="dialog-heading"
        className="grid gap-6 border-t pt-10"
      >
        <div className="grid gap-1">
          <p className="text-trav-ornament text-xs tracking-widest uppercase">
            05 / Overlays
          </p>
          <h2 id="dialog-heading" className="font-heading text-2xl">
            Dialog
          </h2>
          <p className="text-sm text-muted-foreground">
            A named, described panel. Tab stays inside; Escape closes and
            restores focus. Body portals inherit the document theme.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Plan a journey</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Before you set out</DialogTitle>
                <DialogDescription>
                  Choose a destination for this fictional journey. Your settings
                  stay in the preview.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2">
                <label htmlFor="journey-title" className="text-sm">
                  Journey title
                </label>
                <Input
                  id="journey-title"
                  defaultValue="Along the northern river"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Destination: {destination}
                    <ChevronDownIcon aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuRadioGroup
                    value={destination}
                    onValueChange={setDestination}
                  >
                    <DropdownMenuRadioItem value="Northreach">
                      Northreach
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Willowmere">
                      Willowmere
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    setOpen(false)
                    setAction(`Journey planned for ${destination}.`)
                  }}
                >
                  Confirm journey
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Read travel notice</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Take the longer road</DialogTitle>
                <DialogDescription>
                  An uncontrolled dialog with an explicit footer close button.
                </DialogDescription>
              </DialogHeader>
              <p>
                The river path is open. Bring a lantern and leave time to stop
                at Willowmere.
              </p>
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
        </div>
        <details>
          <summary className="trav-control w-fit cursor-pointer text-sm">
            Dialog usage
          </summary>
          <pre className="mt-3 overflow-x-auto border bg-card p-4 text-sm">
            <code>{`<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>A clear title</DialogTitle>
      <DialogDescription>A useful description.</DialogDescription>
    </DialogHeader>
    <DialogFooter showCloseButton />
  </DialogContent>
</Dialog>`}</code>
          </pre>
        </details>
      </section>
    </>
  )
}
