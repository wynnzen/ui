import { useEffect, useState } from "react"
import type { DateRange } from "react-day-picker"
import { createRoot } from "react-dom/client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { toast } from "sonner"

import { Button } from "@/registry/traveler/ui/button"
import { Calendar } from "@/registry/traveler/ui/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/registry/traveler/ui/carousel"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/traveler/ui/chart"
import { Checkbox } from "@/registry/traveler/ui/checkbox"
import { Input } from "@/registry/traveler/ui/input"
import { Label } from "@/registry/traveler/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/traveler/ui/native-select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/traveler/ui/popover"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/traveler/ui/resizable"
import { Skeleton } from "@/registry/traveler/ui/skeleton"
import { Toaster } from "@/registry/traveler/ui/sonner"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/traveler/ui/table"

import "./preview.css"

const today = new Date(2026, 8, 21)
const formatDate = (date: Date | undefined) =>
  date
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date)
    : "Choose a date"
const routes = [
  { name: "Eastbank", distance: 12 },
  { name: "Willowmere", distance: 8 },
  { name: "North pass", distance: 21 },
  { name: "Old bridge", distance: 4 },
  { name: "Mosswood", distance: 16 },
  { name: "Harbor road", distance: 6 },
]
const chartData = [
  { day: "Mon", walked: 8, planned: 12 },
  { day: "Tue", walked: 12, planned: 14 },
  { day: "Wed", walked: 10, planned: 12 },
]
const chartConfig = {
  walked: { label: "Walked (km)", color: "var(--chart-1)" },
  planned: {
    label: "Planned (km)",
    theme: { light: "var(--chart-2)", dark: "var(--chart-2)" },
  },
} satisfies ChartConfig

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(today)
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState("")
  return (
    <form
      className="grid justify-items-start gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        setResult(new FormData(event.currentTarget).get("departure") as string)
      }}
    >
      <Label htmlFor="departure">Departure date</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="departure"
            variant="outline"
            aria-label={`Departure date: ${formatDate(date)}`}
          >
            {formatDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-1"
          aria-label="Choose departure date"
        >
          <Calendar
            mode="single"
            required
            autoFocus
            today={today}
            defaultMonth={today}
            selected={date}
            onSelect={(value) => {
              setDate(value)
              setOpen(false)
            }}
            disabled={{ before: today }}
          />
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name="departure"
        value={
          date
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
            : ""
        }
      />
      <Button type="submit">Record departure</Button>
      <output id="date-result" className="text-sm">
        {result ? `Recorded: ${result}` : "No departure recorded."}
      </output>
    </form>
  )
}

function DataTable() {
  const [query, setQuery] = useState("")
  const [ascending, setAscending] = useState(true)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  // ponytail: client-side six-row recipe; use server filtering/paging for large datasets.
  const filtered = routes
    .filter((route) => route.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) =>
      ascending ? a.distance - b.distance : b.distance - a.distance
    )
  const visible = filtered.slice(page * 3, page * 3 + 3)
  return (
    <div className="grid min-w-0 gap-4" aria-busy={loading}>
      <div className="grid max-w-sm gap-2">
        <Label htmlFor="route-filter">Filter routes</Label>
        <Input
          id="route-filter"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(0)
          }}
        />
      </div>
      <Table>
        <TableCaption>
          Fictional walking routes. Distances in kilometers.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only">Selection</span>
            </TableHead>
            <TableHead>Route</TableHead>
            <TableHead aria-sort={ascending ? "ascending" : "descending"}>
              <Button
                variant="ghost"
                onClick={() => {
                  setAscending(!ascending)
                  setPage(0)
                }}
              >
                Distance {ascending ? "↑" : "↓"}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Skeleton className="h-24 w-full" />
                <span role="status">Loading routes…</span>
              </TableCell>
            </TableRow>
          ) : visible.length ? (
            visible.map((route) => (
              <TableRow
                key={route.name}
                data-state={
                  selected.includes(route.name) ? "selected" : undefined
                }
              >
                <TableCell>
                  <Checkbox
                    aria-label={`Select ${route.name}`}
                    checked={selected.includes(route.name)}
                    onCheckedChange={(checked) =>
                      setSelected(
                        checked
                          ? [...selected, route.name]
                          : selected.filter((name) => name !== route.name)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{route.name}</TableCell>
                <TableCell>{route.distance} km</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No routes match your filter.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          disabled={page === 0 || loading}
          onClick={() => setPage(page - 1)}
        >
          Previous routes
        </Button>
        <Button
          variant="outline"
          disabled={(page + 1) * 3 >= filtered.length || loading}
          onClick={() => setPage(page + 1)}
        >
          Next routes
        </Button>
        <output id="table-result">
          Page {page + 1} of {Math.max(1, Math.ceil(filtered.length / 3))};{" "}
          {selected.length} selected.
        </output>
      </div>
      <Button
        className="w-fit"
        variant="secondary"
        onClick={() => setLoading(!loading)}
      >
        {loading ? "Finish loading" : "Show loading state"}
      </Button>
    </div>
  )
}

function RouteCarousel({ vertical = false }: { vertical?: boolean }) {
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!api) return
    const select = () => setIndex(api.selectedScrollSnap())
    select()
    api.on("select", select)
    return () => {
      api.off("select", select)
    }
  }, [api])
  return (
    <div className="grid min-w-0 gap-3">
      <Carousel
        setApi={setApi}
        orientation={vertical ? "vertical" : "horizontal"}
        aria-label={vertical ? "Trail notes" : "Route stops"}
        tabIndex={0}
        className="max-w-full"
      >
        <CarouselContent className={vertical ? "h-52" : undefined}>
          {["Eastbank", "Willowmere", "North pass"].map((name, i) => (
            <CarouselItem key={name} aria-label={`${i + 1} of 3: ${name}`}>
              <div className="trav-panel grid h-48 content-start gap-4 border bg-card p-5">
                <h3 className="font-heading text-xl">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  A quiet place to rest and read the map.
                </p>
                {i === 0 && !vertical && (
                  <Input
                    aria-label="Slide note"
                    defaultValue="River crossing"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <output
        className="text-sm"
        id={vertical ? "vertical-slide" : "horizontal-slide"}
      >
        Stop {index + 1} of 3
      </output>
    </div>
  )
}

function Advanced() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: today,
    to: new Date(2026, 8, 24),
  })
  const [multiple, setMultiple] = useState<Date[] | undefined>([today])
  const [indicator, setIndicator] = useState<"dot" | "line" | "dashed">("dot")
  const [hideLabel, setHideLabel] = useState(false)
  const [hideIcon, setHideIcon] = useState(false)
  const [toastResult, setToastResult] = useState("No action yet.")
  return (
    <main className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-10">
      <header className="grid gap-4 border-b pb-8">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Traveler UI · Advanced components
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">
          Plan the next crossing.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Dates, route records and measured progress.
        </p>
        <a className="trav-control w-fit underline" href="./catalog.html">
          Component catalog
        </a>
      </header>
      <section
        id="calendar"
        aria-labelledby="calendar-title"
        className="grid min-w-0 gap-6"
      >
        <h2 id="calendar-title" className="font-heading text-2xl">
          Calendar
        </h2>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <div className="grid min-w-0 content-start justify-items-start gap-3">
            <h3>Walking dates</h3>
            <Calendar
              mode="range"
              today={today}
              defaultMonth={today}
              selected={range}
              onSelect={setRange}
              captionLayout="dropdown"
              startMonth={new Date(2026, 0)}
              endMonth={new Date(2027, 11)}
              disabled={{ dayOfWeek: [0] }}
              showWeekNumber
            />
            <output id="range-result" className="text-sm">
              {formatDate(range?.from)} — {formatDate(range?.to)}
            </output>
          </div>
          <div className="grid min-w-0 content-start justify-items-start gap-3">
            <h3>Rest days · 休息日</h3>
            <Calendar
              mode="multiple"
              today={today}
              defaultMonth={today}
              selected={multiple}
              onSelect={setMultiple}
              max={3}
            />
            <output id="multiple-result">
              {multiple?.length ?? 0} rest days
            </output>
          </div>
        </div>
      </section>
      <section
        id="date-picker"
        aria-labelledby="date-title"
        className="grid gap-4"
      >
        <h2 id="date-title" className="font-heading text-2xl">
          Date Picker
        </h2>
        <DatePicker />
      </section>
      <section
        id="data-table"
        aria-labelledby="table-title"
        className="grid min-w-0 gap-4"
      >
        <h2 id="table-title" className="font-heading text-2xl">
          Data Table
        </h2>
        <DataTable />
      </section>
      <section
        id="carousel"
        aria-labelledby="carousel-title"
        className="grid min-w-0 gap-6"
      >
        <h2 id="carousel-title" className="font-heading text-2xl">
          Carousel
        </h2>
        <div className="grid min-w-0 gap-8 lg:grid-cols-2">
          <RouteCarousel />
          <RouteCarousel vertical />
        </div>
      </section>
      <section
        id="chart"
        aria-labelledby="chart-title"
        className="grid min-w-0 gap-5"
      >
        <h2 id="chart-title" className="font-heading text-2xl">
          Distance journal
        </h2>
        <p id="chart-description">
          Walking totals: 30 km across three days; 38 km planned. The table
          below contains every value.
        </p>
        <div className="flex flex-wrap gap-4">
          <Label>
            Tooltip marker
            <NativeSelect
              aria-label="Tooltip marker"
              value={indicator}
              onChange={(event) =>
                setIndicator(event.target.value as typeof indicator)
              }
            >
              {["dot", "line", "dashed"].map((value) => (
                <NativeSelectOption key={value}>{value}</NativeSelectOption>
              ))}
            </NativeSelect>
          </Label>
          <Label>
            <Checkbox
              checked={hideLabel}
              onCheckedChange={(value) => setHideLabel(value === true)}
            />
            Hide tooltip label
          </Label>
          <Label>
            <Checkbox
              checked={hideIcon}
              onCheckedChange={(value) => setHideIcon(value === true)}
            />
            Hide legend icons
          </Label>
        </div>
        <ChartContainer
          config={chartConfig}
          className="h-72 w-full"
          aria-describedby="chart-description"
        >
          <BarChart
            title="Walking and planned distance by day"
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 12, top: 12, bottom: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis width={30} tickLine={false} axisLine={false} />
            <ChartTooltip
              isAnimationActive={false}
              content={
                <ChartTooltipContent
                  indicator={indicator}
                  hideLabel={hideLabel}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent hideIcon={hideIcon} />} />
            <Bar
              dataKey="walked"
              fill="var(--color-walked)"
              isAnimationActive={false}
            />
            <Bar
              dataKey="planned"
              fill="var(--color-planned)"
              isAnimationActive={false}
            />
          </BarChart>
        </ChartContainer>
        <Table>
          <TableCaption>Distance journal, kilometers</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Walked</TableHead>
              <TableHead>Planned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((row) => (
              <TableRow key={row.day}>
                <TableCell>{row.day}</TableCell>
                <TableCell>{row.walked}</TableCell>
                <TableCell>{row.planned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <section
        id="resizable"
        aria-labelledby="resize-title"
        className="grid min-w-0 gap-5"
      >
        <h2 id="resize-title" className="font-heading text-2xl">
          Resizable workspace
        </h2>
        <p className="text-muted-foreground">
          Drag a divider or focus it and use the arrow keys.
        </p>
        <ResizablePanelGroup
          orientation="horizontal"
          className="min-h-48 border"
        >
          <ResizablePanel id="map" defaultSize="50%" minSize="20%">
            <div className="p-4">Map</div>
          </ResizablePanel>
          <ResizableHandle withHandle aria-label="Resize map and notes" />
          <ResizablePanel id="notes" minSize="20%">
            <div className="p-4">Notes</div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <ResizablePanelGroup
          orientation="vertical"
          style={{ height: 256 }}
          className="border"
        >
          <ResizablePanel defaultSize="50%" minSize="20%">
            <div className="p-4">Morning</div>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize morning and evening" />
          <ResizablePanel minSize="20%">
            <div className="p-4">Evening</div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <ResizablePanelGroup
          orientation="horizontal"
          disabled
          style={{ height: 80 }}
          className="border"
        >
          <ResizablePanel defaultSize="50%">
            <div className="p-3">Fixed</div>
          </ResizablePanel>
          <ResizableHandle aria-label="Fixed divider" />
          <ResizablePanel>
            <div className="p-3">Reference</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </section>
      <section id="sonner" aria-labelledby="toast-title" className="grid gap-5">
        <h2 id="toast-title" className="font-heading text-2xl">
          Journey notices
        </h2>
        <div className="flex flex-wrap gap-3">
          {(["success", "info", "warning", "error"] as const).map((kind) => (
            <Button
              key={kind}
              variant="outline"
              onClick={() =>
                toast[kind](`${kind}: route notice`, {
                  description: "The journal keeps a local record.",
                  duration: 10000,
                })
              }
            >
              {kind} notice
            </Button>
          ))}
          <Button
            onClick={() =>
              toast("Map saved", {
                duration: Infinity,
                action: {
                  label: "Undo save",
                  onClick: () => setToastResult("Save undone."),
                },
              })
            }
          >
            Save with undo
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.loading("Copying map…", { id: "copy-map" })}
          >
            Start copying
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.success("Map copied", { id: "copy-map", duration: 10000 })
            }
          >
            Finish copying
          </Button>
          <Button variant="ghost" onClick={() => toast.dismiss()}>
            Dismiss notices
          </Button>
        </div>
        <output id="toast-result">{toastResult}</output>
        <Toaster theme="dark" closeButton position="bottom-right" />
      </section>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<Advanced />)
