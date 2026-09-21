import { useState } from "react"
import { ArchiveIcon } from "lucide-react"
import { createRoot } from "react-dom/client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/traveler/ui/alert-dialog"
import { Button } from "@/registry/traveler/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/traveler/ui/dialog"
import { Input } from "@/registry/traveler/ui/input"
import { Label } from "@/registry/traveler/ui/label"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/traveler/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/traveler/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/traveler/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/traveler/ui/tooltip"

import "./preview.css"

function Destinations() {
  return (
    <>
      <SelectGroup>
        <SelectLabel>River settlements</SelectLabel>
        <SelectItem value="northreach">Northreach</SelectItem>
        <SelectItem value="willowmere">Willowmere</SelectItem>
        <SelectItem value="closed" disabled>
          Stone crossing / closed
        </SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Highland paths</SelectLabel>
        <SelectItem value="eastbank">Eastbank</SelectItem>
        <SelectItem value="long">
          The old observatory beyond the eastern ridge
        </SelectItem>
        {Array.from({ length: 12 }, (_, index) => (
          <SelectItem key={index} value={`waypoint-${index}`}>
            Waypoint {index + 1}
          </SelectItem>
        ))}
      </SelectGroup>
    </>
  )
}

function Overlays() {
  const [destination, setDestination] = useState("northreach")
  const [tab, setTab] = useState("journal")
  const [smallAlert, setSmallAlert] = useState(false)
  const [popover, setPopover] = useState(false)
  const [result, setResult] = useState("Your journey is saved.")
  return (
    <TooltipProvider>
      <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 sm:px-10">
        <header className="grid gap-3">
          <a className="trav-control w-fit underline" href="./catalog.html">
            Traveler UI / Component index
          </a>
          <h1 className="font-heading text-4xl">Choose your next chapter.</h1>
          <p className="text-muted-foreground">
            Navigation, decisions and small moments of context.
          </p>
        </header>
        <section
          id="select"
          className="grid gap-5"
          aria-labelledby="select-heading"
        >
          <h2 id="select-heading" className="font-heading text-2xl">
            Select
          </h2>
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              setResult(
                `Destination submitted: ${new FormData(event.currentTarget).get("destination")}.`
              )
            }}
          >
            <Label htmlFor="destination">Destination</Label>
            <Select
              name="destination"
              value={destination}
              onValueChange={setDestination}
              required
            >
              <SelectTrigger id="destination" className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                <Destinations />
              </SelectContent>
            </Select>
            <Button type="submit" variant="outline" className="w-fit">
              Save destination
            </Button>
          </form>
          <div className="flex flex-wrap items-start gap-5">
            <div className="grid gap-2">
              <Label htmlFor="small-select">Small, item aligned</Label>
              <Select defaultValue="river">
                <SelectTrigger id="small-select" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="river">River road</SelectItem>
                  <SelectItem value="ridge">Ridge road</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="empty-select">Optional companion</Label>
              <Select>
                <SelectTrigger id="empty-select">
                  <SelectValue placeholder="Choose a companion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ari">Ari</SelectItem>
                  <SelectItem value="nora">Nora</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="disabled-select">Unavailable route</Label>
              <Select disabled defaultValue="closed">
                <SelectTrigger id="disabled-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="closed">Closed for winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invalid-select">Route requiring review</Label>
              <Select>
                <SelectTrigger
                  id="invalid-select"
                  aria-invalid="true"
                  aria-describedby="route-error"
                >
                  <SelectValue placeholder="Choose a route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="river">River road</SelectItem>
                </SelectContent>
              </Select>
              <p id="route-error" className="text-sm text-destructive">
                Error: choose an open route.
              </p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-fit">Plan destination in dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>A place to begin</DialogTitle>
                <DialogDescription>
                  A nested Select keeps its theme and returns focus to this
                  dialog.
                </DialogDescription>
              </DialogHeader>
              <Label htmlFor="nested-select">Dialog destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="nested-select" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <Destinations />
                </SelectContent>
              </Select>
            </DialogContent>
          </Dialog>
          <p className="text-sm text-muted-foreground">
            Type to search; arrows move the highlight. Enter chooses a value.
            Checked and highlighted rows remain distinct.
          </p>
        </section>
        <section
          id="tabs"
          className="grid gap-5"
          aria-labelledby="tabs-heading"
        >
          <h2 id="tabs-heading" className="font-heading text-2xl">
            Tabs
          </h2>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList aria-label="Journey sections">
              <TabsTrigger value="journal">Journal</TabsTrigger>
              <TabsTrigger value="supplies">Supplies</TabsTrigger>
              <TabsTrigger value="archive" disabled>
                Archive
              </TabsTrigger>
            </TabsList>
            <TabsContent value="journal" className="border-b py-4">
              A quiet morning at the river crossing. Arrow keys activate the
              next available chapter.
            </TabsContent>
            <TabsContent value="supplies" className="border-b py-4">
              Three meals, one lantern, and a map of the northern roads.
            </TabsContent>
          </Tabs>
          <Tabs
            defaultValue="river"
            orientation="vertical"
            activationMode="manual"
          >
            <TabsList variant="line" aria-label="Manual route tabs">
              <TabsTrigger value="river">River</TabsTrigger>
              <TabsTrigger value="ridge">Ridge</TabsTrigger>
            </TabsList>
            <TabsContent value="river" className="p-3">
              Follow the water. This vertical example activates only with Enter
              or Space.
            </TabsContent>
            <TabsContent value="ridge" className="p-3">
              Climb above the clouds. The ridge path takes one extra day.
            </TabsContent>
          </Tabs>
        </section>
        <section
          id="alert-dialog"
          className="grid gap-5"
          aria-labelledby="alert-heading"
        >
          <h2 id="alert-heading" className="font-heading text-2xl">
            Alert Dialog
          </h2>
          <div className="flex flex-wrap gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Archive journey</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <ArchiveIcon aria-hidden="true" />
                  </AlertDialogMedia>
                  <AlertDialogTitle>
                    Move this journey to the archive?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    The journal stays available in your archive. Cancel is
                    focused first; clicking the backdrop does not confirm or
                    dismiss this decision.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep journey</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => setResult("Journey archived.")}
                  >
                    Confirm archive
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={smallAlert} onOpenChange={setSmallAlert}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Open small alert</Button>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Pause for the night?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress will be kept.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => setResult("Camp prepared.")}
                  >
                    Rest
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </section>
        <section
          id="popover"
          className="grid gap-5"
          aria-labelledby="popover-heading"
        >
          <h2 id="popover-heading" className="font-heading text-2xl">
            Popover
          </h2>
          <div className="flex flex-wrap gap-4">
            <Popover open={popover} onOpenChange={setPopover}>
              <PopoverTrigger asChild>
                <Button variant="outline">Edit waypoint</Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                aria-labelledby="waypoint-title"
                aria-describedby="waypoint-description"
              >
                <PopoverHeader>
                  <PopoverTitle id="waypoint-title">
                    A note on the map
                  </PopoverTitle>
                  <PopoverDescription id="waypoint-description">
                    Keep a short name for this stopping place.
                  </PopoverDescription>
                </PopoverHeader>
                <div className="mt-4 grid gap-2">
                  <Label htmlFor="waypoint">Waypoint name</Label>
                  <Input id="waypoint" defaultValue="Old ferry" />
                  <Button
                    onClick={() => {
                      setPopover(false)
                      setResult("Waypoint saved.")
                    }}
                  >
                    Save waypoint
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverAnchor asChild>
                <span className="inline-flex">
                  <PopoverTrigger asChild>
                    <Button variant="ghost">Read river conditions</Button>
                  </PopoverTrigger>
                </span>
              </PopoverAnchor>
              <PopoverContent side="top" aria-labelledby="conditions-title">
                <PopoverHeader>
                  <PopoverTitle id="conditions-title">
                    River conditions
                  </PopoverTitle>
                  <PopoverDescription>
                    The current is calm. The ferry departs at first light.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </div>
        </section>
        <section
          id="tooltip"
          className="grid gap-5"
          aria-labelledby="tooltip-heading"
        >
          <h2 id="tooltip-heading" className="font-heading text-2xl">
            Tooltip
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-fit">
                Travel note
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              The old ferry takes foot passengers.
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-muted-foreground">
            Hover or focus to reveal supplementary context. Essential directions
            stay in the page.
          </p>
        </section>
        <output role="status" className="text-trav-success text-sm">
          {result}
        </output>
        <details>
          <summary className="trav-control w-fit cursor-pointer">
            Usage and keyboard notes
          </summary>
          <pre className="mt-4 overflow-x-auto border bg-card p-4 text-sm">
            <code>{`<Select defaultValue="river" name="route">
  <SelectTrigger aria-label="Route"><SelectValue /></SelectTrigger>
  <SelectContent><SelectItem value="river">River road</SelectItem></SelectContent>
</Select>
<Tabs defaultValue="notes" activationMode="manual">
  <TabsList><TabsTrigger value="notes">Notes</TabsTrigger></TabsList>
  <TabsContent value="notes">Journal entry</TabsContent>
</Tabs>`}</code>
          </pre>
          <p className="mt-4 text-sm text-muted-foreground">
            Escape dismisses overlays and restores focus where the primitive
            supports it. Alert Dialog prevents outside dismissal. Descriptions
            and labels are supplied by the consumer. All module exports and
            native event handlers are preserved.
          </p>
        </details>
      </main>
    </TooltipProvider>
  )
}
createRoot(document.getElementById("root")!).render(<Overlays />)
