import { useState } from "react"
import { CheckIcon, MapIcon } from "lucide-react"
import { createRoot } from "react-dom/client"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/traveler/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/traveler/ui/breadcrumb"
import { Button } from "@/registry/traveler/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/traveler/ui/button-group"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/traveler/ui/empty"
import { Input } from "@/registry/traveler/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/traveler/ui/item"
import { Kbd, KbdGroup } from "@/registry/traveler/ui/kbd"
import { Label } from "@/registry/traveler/ui/label"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/registry/traveler/ui/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/traveler/ui/pagination"
import { Slider } from "@/registry/traveler/ui/slider"
import { Toggle } from "@/registry/traveler/ui/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/traveler/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/traveler/ui/tooltip"

import "./preview.css"

// Original inline geometric emblem; no remote asset or font request.
const emblem =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="#30363d"/><path d="M40 12 66 40 40 68 14 40Z" fill="none" stroke="#e4dccb" stroke-width="3"/></svg>'
  )

function Usage({ children }: { children: string }) {
  return (
    <pre
      className="overflow-auto border bg-card p-3 text-xs"
      tabIndex={0}
      aria-label="Usage code"
    >
      <code>{children}</code>
    </pre>
  )
}

function Content() {
  const [pace, setPace] = useState("steady")
  const [distance, setDistance] = useState([30])
  const [committed, setCommitted] = useState(30)
  const [pinned, setPinned] = useState(false)
  const [layers, setLayers] = useState(["roads"])
  const [alignment, setAlignment] = useState("north")
  const [page, setPage] = useState(1)
  const [notes, setNotes] = useState(0)
  const [levels, setLevels] = useState(false)
  const [submitted, setSubmitted] = useState("")
  return (
    <TooltipProvider>
      <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 sm:px-10">
        <header className="grid gap-4 border-b pb-8">
          <p className="text-trav-ornament text-xs tracking-widest uppercase">
            Traveler UI · Content and controls
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl">
            A well-prepared party.
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            People, routes and useful controls for the next day’s journey.
          </p>
          <a className="trav-control w-fit underline" href="./catalog.html">
            Component catalog
          </a>
        </header>
        <section
          id="avatar"
          className="grid gap-5"
          aria-labelledby="avatar-heading"
        >
          <h2 id="avatar-heading" className="font-heading text-2xl">
            Avatar · the travelling party
          </h2>
          <div className="flex flex-wrap items-center gap-8">
            {(["sm", "default", "lg"] as const).map((size) => (
              <div key={size} className="grid gap-2">
                <Avatar size={size}>
                  <AvatarImage src={emblem} alt={`Ari's emblem, ${size}`} />
                  <AvatarFallback>AR</AvatarFallback>
                  <AvatarBadge role="img" aria-label="Available">
                    <CheckIcon aria-hidden="true" />
                  </AvatarBadge>
                </Avatar>
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
            <Avatar aria-label="Mira">
              <AvatarImage src="data:image/png;base64,invalid" alt="Mira" />
              <AvatarFallback>MI</AvatarFallback>
            </Avatar>
            <AvatarGroup aria-label="Other companions">
              <Avatar>
                <AvatarFallback>EL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>NO</AvatarFallback>
              </Avatar>
              <AvatarGroupCount aria-label="Two more companions">
                +2
              </AvatarGroupCount>
            </AvatarGroup>
          </div>
          <p className="text-sm text-muted-foreground">
            All three sizes, loaded image, fallback, badge, group and count.
            Supply meaningful alternative text; badges also need a name if they
            communicate status.
          </p>
          <Usage>
            {
              '<Avatar size="lg"><AvatarImage src={image} alt="Ari" /><AvatarFallback>AR</AvatarFallback></Avatar>'
            }
          </Usage>
        </section>
        <section
          id="breadcrumb"
          className="grid gap-5"
          aria-labelledby="breadcrumb-heading"
        >
          <h2 id="breadcrumb-heading" className="font-heading text-2xl">
            Breadcrumb · route hierarchy
          </h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="./index.html">Journal</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Show hidden route levels"
                  onClick={() => setLevels(!levels)}
                  aria-expanded={levels}
                >
                  <BreadcrumbEllipsis />
                </Button>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span>/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="#item">
                    Northern routes and neighbouring settlements
                  </a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Old bridge</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {levels && (
            <p role="status">Archive / Current season / River country</p>
          )}
          <p className="text-sm text-muted-foreground">
            Links remain anchors. The current page is identified semantically;
            separators are decorative. An ellipsis needs a named interactive
            wrapper when it reveals content.
          </p>
          <Usage>
            {
              "<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbPage>Old bridge</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>"
            }
          </Usage>
        </section>
        <section
          id="button-group"
          className="grid gap-5"
          aria-labelledby="group-heading"
        >
          <h2 id="group-heading" className="font-heading text-2xl">
            Button Group · journal actions
          </h2>
          <div className="flex flex-wrap items-start gap-6">
            <ButtonGroup aria-label="Journal counter">
              <ButtonGroupText>Notes</ButtonGroupText>
              <Button variant="outline" onClick={() => setNotes(notes + 1)}>
                Add note
              </Button>
              <ButtonGroupSeparator />
              <Button
                variant="outline"
                disabled={notes === 0}
                onClick={() => setNotes(notes - 1)}
              >
                Remove
              </Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" aria-label="Map tools">
              <Button variant="outline" onClick={() => setAlignment("north")}>
                Face north
              </Button>
              <ButtonGroupSeparator orientation="horizontal" />
              <Button variant="outline" onClick={() => setAlignment("east")}>
                Face east
              </Button>
            </ButtonGroup>
          </div>
          <ButtonGroup aria-label="Route search">
            <ButtonGroupText asChild>
              <label htmlFor="route-search">Route</label>
            </ButtonGroupText>
            <Input id="route-search" placeholder="Search notes" />
            <Button variant="outline" onClick={() => setNotes(notes + 1)}>
              Save
            </Button>
          </ButtonGroup>
          <output role="status">
            Notes: {notes}. Facing {alignment}.
          </output>
          <p className="text-sm text-muted-foreground">
            Horizontal/vertical groups retain native child behavior. Text
            supports asChild; separators follow orientation. Groups use logical
            borders and allow input shrinkage.
          </p>
          <Usage>
            {
              '<ButtonGroup orientation="vertical" aria-label="Map tools"><Button>North</Button><Button>East</Button></ButtonGroup>'
            }
          </Usage>
        </section>
        <section
          id="empty"
          className="grid gap-5"
          aria-labelledby="empty-heading"
        >
          <h2 id="empty-heading" className="font-heading text-2xl">
            Empty · an unwritten chapter
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MapIcon aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>No routes recorded</EmptyTitle>
                <EmptyDescription>
                  Start with a nearby landmark. Your journal can grow one short
                  journey at a time.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={() => setNotes(notes + 1)}>
                  Record a route
                </Button>
              </EmptyContent>
            </Empty>
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <span
                    aria-hidden="true"
                    className="text-trav-ornament text-3xl"
                  >
                    ◇
                  </span>
                </EmptyMedia>
                <EmptyTitle>No archived notes</EmptyTitle>
                <EmptyDescription>
                  Archived pages will appear here.{" "}
                  <a className="trav-control" href="#item">
                    Browse current notes
                  </a>
                  .
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <span className="text-sm text-muted-foreground">
                  Your current journal is safe.
                </span>
              </EmptyContent>
            </Empty>
          </div>
          <Usage>
            {
              "<Empty><EmptyHeader><EmptyTitle>No routes</EmptyTitle><EmptyDescription>Record your first journey.</EmptyDescription></EmptyHeader><EmptyContent><Button>Record route</Button></EmptyContent></Empty>"
            }
          </Usage>
        </section>
        <section
          id="item"
          className="grid gap-5"
          aria-labelledby="item-heading"
        >
          <h2 id="item-heading" className="font-heading text-2xl">
            Item · route ledger
          </h2>
          <ItemGroup aria-label="Recorded routes">
            <Item role="listitem" variant="outline">
              <ItemHeader>
                <span className="text-trav-ornament text-xs tracking-wide uppercase">
                  Day one
                </span>
                <span className="text-xs">Ready</span>
              </ItemHeader>
              <ItemMedia variant="icon">
                <MapIcon aria-hidden="true" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Old bridge crossing</ItemTitle>
                <ItemDescription>
                  A long, descriptive route note remains fully visible at narrow
                  widths, including important instructions to follow the stone
                  road when the riverside path is flooded.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm" asChild>
                  <a href="#native-select">Prepare</a>
                </Button>
              </ItemActions>
              <ItemFooter>
                <span className="text-xs text-muted-foreground">
                  North Hollow
                </span>
                <Kbd>1</Kbd>
              </ItemFooter>
            </Item>
            <ItemSeparator />
            <Item role="listitem" variant="muted" size="sm">
              <ItemMedia variant="image">
                <img src={emblem} alt="" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>River country archive</ItemTitle>
                <ItemDescription>
                  Maps and notes from earlier journeys.
                </ItemDescription>
              </ItemContent>
              <ItemContent>
                <span>12 notes</span>
              </ItemContent>
            </Item>
            <Item role="listitem">
              <ItemMedia>
                <span aria-hidden="true">◇</span>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Unsorted observations</ItemTitle>
                <ItemDescription>
                  Ordinary content without a frame.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
          <Item asChild size="sm" variant="outline">
            <a href="#pagination">
              <ItemContent>
                <ItemTitle>Open the next journal page</ItemTitle>
                <ItemDescription>
                  The whole row is a native link.
                </ItemDescription>
              </ItemContent>
            </a>
          </Item>
          <p className="text-sm text-muted-foreground">
            Default/outline/muted surfaces, both sizes and three media variants.
            Assign list-item semantics in a list; asChild retains link behavior.
            Long descriptions are not clamped.
          </p>
          <Usage>
            {
              '<Item variant="outline"><ItemContent><ItemTitle>Old bridge</ItemTitle><ItemDescription>Follow the stone road.</ItemDescription></ItemContent></Item>'
            }
          </Usage>
        </section>
        <section id="kbd" className="grid gap-5" aria-labelledby="kbd-heading">
          <h2 id="kbd-heading" className="font-heading text-2xl">
            Kbd · keyboard hints
          </h2>
          <p>
            Move between tabs with{" "}
            <KbdGroup>
              <Kbd>←</Kbd>
              <span>or</span>
              <Kbd>→</Kbd>
            </KbdGroup>
            .
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Keyboard hint</Button>
            </TooltipTrigger>
            <TooltipContent>
              Activate the focused button with <Kbd>Enter</Kbd>.
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-muted-foreground">
            Hints describe existing browser interactions; rendering a key does
            not register a shortcut. Tooltip composition keeps readable semantic
            colors.
          </p>
          <Usage>
            {"<KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>K</Kbd></KbdGroup>"}
          </Usage>
        </section>
        <form
          className="grid gap-12"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(
              JSON.stringify(Array.from(new FormData(event.currentTarget)))
            )
          }}
        >
          <section
            id="native-select"
            className="grid gap-5"
            aria-labelledby="native-heading"
          >
            <h2 id="native-heading" className="font-heading text-2xl">
              Native Select · travel pace
            </h2>
            <div className="flex flex-wrap items-end gap-6">
              <div className="grid gap-2">
                <Label htmlFor="pace">Travel pace</Label>
                <NativeSelect
                  id="pace"
                  name="pace"
                  value={pace}
                  onChange={(event) => setPace(event.target.value)}
                >
                  <NativeSelectOptGroup label="Available paces">
                    <NativeSelectOption value="steady">
                      Steady
                    </NativeSelectOption>
                    <NativeSelectOption value="swift">Swift</NativeSelectOption>
                    <NativeSelectOption value="closed" disabled>
                      Winter pace · unavailable
                    </NativeSelectOption>
                  </NativeSelectOptGroup>
                </NativeSelect>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="season">Season · compact</Label>
                <NativeSelect
                  id="season"
                  name="season"
                  size="sm"
                  defaultValue="autumn"
                >
                  <NativeSelectOption value="summer">Summer</NativeSelectOption>
                  <NativeSelectOption value="autumn">Autumn</NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="closed-select">Unavailable</Label>
                <NativeSelect id="closed-select" disabled defaultValue="closed">
                  <NativeSelectOption value="closed">
                    Route closed
                  </NativeSelectOption>
                </NativeSelect>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invalid-select">Crossing selection</Label>
              <NativeSelect
                id="invalid-select"
                aria-invalid="true"
                aria-describedby="crossing-error"
                defaultValue=""
              >
                <NativeSelectOption value="">
                  Choose a crossing
                </NativeSelectOption>
                <NativeSelectOption value="bridge">
                  Old bridge
                </NativeSelectOption>
              </NativeSelect>
              <p id="crossing-error" className="text-sm text-destructive">
                Choose an open crossing before departure.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Native browser menus and system option colors are retained. Both
              sizes use readable input text; form values, groups and disabled
              options remain native.
            </p>
            <Usage>
              {
                '<NativeSelect name="pace" defaultValue="steady"><NativeSelectOption value="steady">Steady</NativeSelectOption></NativeSelect>'
              }
            </Usage>
          </section>
          <section
            id="slider"
            className="grid gap-5"
            aria-labelledby="slider-heading"
          >
            <h2 id="slider-heading" className="font-heading text-2xl">
              Slider · daily distance
            </h2>
            <div className="grid gap-3">
              <p id="distance-description">
                Arrow keys adjust by 5; Home and End reach the bounds.
              </p>
              <Slider
                aria-label="Daily distance"
                aria-describedby="distance-description"
                name="distance"
                min={0}
                max={100}
                step={5}
                value={distance}
                onValueChange={setDistance}
                onValueCommit={(value) => setCommitted(value[0])}
              />
              <output role="status">
                Distance: {distance[0]} km; committed: {committed} km.
              </output>
            </div>
            <div className="grid gap-3">
              <p>Uncontrolled range</p>
              <Slider
                aria-label="Range limit"
                name="range"
                defaultValue={[20, 70]}
                step={5}
                minStepsBetweenThumbs={1}
              />
            </div>
            <div className="flex flex-wrap items-start gap-8">
              <div className="grid gap-2">
                <span>Elevation</span>
                <Slider
                  aria-label="Elevation"
                  orientation="vertical"
                  defaultValue={[40]}
                  max={100}
                  className="h-44"
                />
              </div>
              <div className="grid flex-1 gap-4">
                <span>Disabled range</span>
                <Slider
                  aria-label="Unavailable distance"
                  defaultValue={[25]}
                  disabled
                />
                <span id="distance-error" className="text-destructive">
                  Distance exceeds this route’s limit.
                </span>
                <Slider
                  aria-label="Invalid distance"
                  aria-invalid="true"
                  aria-describedby="distance-error"
                  defaultValue={[90]}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Names, descriptions and invalid state reach the generated thumbs.
              A shared range name receives a 1-based suffix per thumb.
              Track/range/thumbs retain visible forced-color cues.
            </p>
            <Usage>
              {
                '<Slider aria-label="Daily distance" name="distance" defaultValue={[30]} step={5} />'
              }
            </Usage>
          </section>
          <div className="grid gap-3">
            <Button type="submit" className="w-fit">
              Save travel controls
            </Button>
            <output
              id="travel-values"
              role="status"
              className="text-sm break-all"
            >
              {submitted || "Travel controls have not been submitted."}
            </output>
          </div>
        </form>
        <section
          id="toggle"
          className="grid gap-5"
          aria-labelledby="toggle-heading"
        >
          <h2 id="toggle-heading" className="font-heading text-2xl">
            Toggle · keep a note close
          </h2>
          <div className="flex flex-wrap gap-4">
            <Toggle
              pressed={pinned}
              onPressedChange={setPinned}
              aria-label="Pin journal"
            >
              Pin journal
            </Toggle>
            <Toggle variant="outline" size="sm" defaultPressed>
              Compact pin
            </Toggle>
            <Toggle variant="outline" size="lg">
              Large pin
            </Toggle>
            <Toggle disabled>Unavailable pin</Toggle>
            <Toggle aria-invalid="true" aria-describedby="pin-error">
              Conflicting pin
            </Toggle>
          </div>
          <p id="pin-error" className="text-sm text-destructive">
            Resolve the duplicate before keeping this note.
          </p>
          <output role="status">
            Journal {pinned ? "pinned" : "unpinned"}.
          </output>
          <p className="text-sm text-muted-foreground">
            Both variants and all sizes retain pressed callbacks and
            disabled/invalid props. An underline marks the on state without
            changing text or control size.
          </p>
          <Usage>
            {
              '<Toggle variant="outline" pressed={pinned} onPressedChange={setPinned}>Pin journal</Toggle>'
            }
          </Usage>
        </section>
        <section
          id="toggle-group"
          className="grid gap-5"
          aria-labelledby="toggle-group-heading"
        >
          <h2 id="toggle-group-heading" className="font-heading text-2xl">
            Toggle Group · map layers
          </h2>
          <ToggleGroup
            type="multiple"
            variant="outline"
            value={layers}
            onValueChange={setLayers}
            aria-label="Map layers"
          >
            <ToggleGroupItem value="roads">Roads</ToggleGroupItem>
            <ToggleGroupItem value="rivers">Rivers</ToggleGroupItem>
            <ToggleGroupItem value="winter" disabled>
              Winter
            </ToggleGroupItem>
          </ToggleGroup>
          <output role="status">Layers: {layers.join(", ") || "none"}.</output>
          <ToggleGroup
            type="single"
            defaultValue="north"
            size="sm"
            spacing={2}
            aria-label="Compass heading"
          >
            <ToggleGroupItem value="north">North</ToggleGroupItem>
            <ToggleGroupItem value="east">East</ToggleGroupItem>
            <ToggleGroupItem value="south">South</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup
            type="single"
            orientation="vertical"
            defaultValue="near"
            variant="outline"
            size="lg"
            spacing={1}
            aria-label="Map scale"
          >
            <ToggleGroupItem value="near">Near</ToggleGroupItem>
            <ToggleGroupItem value="far">Far</ToggleGroupItem>
          </ToggleGroup>
          <p className="text-sm text-muted-foreground">
            Single/multiple selection, controlled/default values, sizes,
            disabled items, vertical orientation and numeric spacing. Arrow keys
            move focus; Space or Enter selects.
          </p>
          <Usage>
            {
              '<ToggleGroup type="multiple" variant="outline"><ToggleGroupItem value="roads">Roads</ToggleGroupItem><ToggleGroupItem value="rivers">Rivers</ToggleGroupItem></ToggleGroup>'
            }
          </Usage>
        </section>
        <section
          id="pagination"
          className="grid gap-5"
          aria-labelledby="pagination-heading"
        >
          <h2 id="pagination-heading" className="font-heading text-2xl">
            Pagination · journal pages
          </h2>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#pagination"
                  onClick={() => setPage(Math.max(1, page - 1))}
                />
              </PaginationItem>
              {[1, 2, 3].map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink
                    href="#pagination"
                    isActive={page === number}
                    aria-label={`Page ${number}`}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#pagination"
                  onClick={() => setPage(Math.min(3, page + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <output role="status">Journal page {page}.</output>
          <p className="text-sm text-muted-foreground">
            Current, previous, next and ellipsis parts retain anchor semantics.
            Page state and URL routing belong to the consumer. The compact
            layout fits narrow viewports.
          </p>
          <Usage>
            {
              '<PaginationLink href="?page=2" isActive={page === 2}>2</PaginationLink>'
            }
          </Usage>
        </section>
        <footer className="border-t pt-6 text-sm text-muted-foreground">
          Development examples. Manual release QA remains pending.
        </footer>
      </main>
    </TooltipProvider>
  )
}
createRoot(document.getElementById("root")!).render(<Content />)
