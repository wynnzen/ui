import { useState } from "react"
import { createRoot } from "react-dom/client"

import { Badge } from "@/registry/traveler/ui/badge"
import { Button } from "@/registry/traveler/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/traveler/ui/card"
import { Checkbox } from "@/registry/traveler/ui/checkbox"
import { Progress } from "@/registry/traveler/ui/progress"
import { ScrollArea, ScrollBar } from "@/registry/traveler/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/traveler/ui/table"

import "./preview.css"

const supplies = [
  { name: "River map", category: "Navigation", quantity: 1, weight: 0.2 },
  { name: "Brass lantern", category: "Equipment", quantity: 1, weight: 0.8 },
  {
    name: "Dried orchard fruit",
    category: "Provisions",
    quantity: 3,
    weight: 0.6,
  },
  {
    name: "Wool travelling cloak",
    category: "Clothing",
    quantity: 1,
    weight: 1.2,
  },
]

function Inventory() {
  const [packed, setPacked] = useState<string[]>(["River map", "Brass lantern"])
  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-10">
      <header className="grid gap-3">
        <a className="trav-control w-fit underline" href="./catalog.html">
          Traveler UI / Component index
        </a>
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Eastbank outfitter · Journal 024
        </p>
        <h1 className="font-heading text-4xl">Everything for the road.</h1>
        <p className="max-w-2xl text-muted-foreground">
          A small inventory for a long journey. Pack what you need, then leave
          room for what you find.
        </p>
      </header>
      <Card id="progress">
        <CardHeader>
          <CardTitle>Ready for departure</CardTitle>
          <CardDescription>
            Pack each item to complete your preparations.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="flex flex-wrap justify-between gap-3">
            <span id="packed-label">Supplies packed</span>
            <output role="status">
              {packed.length} of {supplies.length}
            </output>
          </div>
          <Progress
            aria-labelledby="packed-label"
            value={packed.length}
            max={supplies.length}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <span className="text-sm text-muted-foreground">Empty</span>
              <Progress aria-label="Empty meter" value={0} />
            </div>
            <div className="grid gap-2">
              <span className="text-sm text-muted-foreground">Complete</span>
              <Progress aria-label="Complete meter" value={100} />
            </div>
            <div className="grid gap-2">
              <span className="text-sm text-muted-foreground">
                Awaiting the weather report
              </span>
              <Progress aria-label="Weather report loading" value={null} />
            </div>
          </div>
        </CardContent>
      </Card>
      <section
        id="table"
        className="grid min-w-0 gap-4"
        aria-labelledby="table-heading"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="table-heading" className="font-heading text-2xl">
            Supply ledger
          </h2>
          <Badge variant="outline">Personal inventory</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          The table scrolls horizontally on small screens. Focus its region and
          use the arrow keys.
        </p>
        <Table aria-label="Supply ledger">
          <TableCaption>
            Fictional supplies for the Northreach crossing. Selection belongs to
            this example.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Packed</TableHead>
              <TableHead scope="col">Item</TableHead>
              <TableHead scope="col">Category</TableHead>
              <TableHead scope="col" className="text-end">
                Qty.
              </TableHead>
              <TableHead scope="col" className="text-end">
                Weight / kg
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplies.map((item) => (
              <TableRow
                key={item.name}
                data-state={packed.includes(item.name) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    aria-label={`Pack ${item.name}`}
                    checked={packed.includes(item.name)}
                    onCheckedChange={(checked) =>
                      setPacked((current) =>
                        checked
                          ? [...current, item.name]
                          : current.filter((name) => name !== item.name)
                      )
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {item.category}
                </TableCell>
                <TableCell className="text-end tabular-nums">
                  {item.quantity}
                </TableCell>
                <TableCell className="text-end tabular-nums">
                  {item.weight.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total weight</TableCell>
              <TableCell className="text-end tabular-nums">2.8</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
      <section
        id="scroll-area"
        className="grid gap-5"
        aria-labelledby="scroll-heading"
      >
        <h2 id="scroll-heading" className="font-heading text-2xl">
          Along the river
        </h2>
        <p className="text-muted-foreground">
          A keyboard-accessible route log. The 24px track contains a quieter,
          narrow thumb.
        </p>
        <ScrollArea
          type="always"
          className="h-56 rounded-xs border bg-card"
          aria-label="Route log"
          role="region"
        >
          <ol className="divide-y pe-6">
            {Array.from({ length: 16 }, (_, index) => (
              <li key={index} className="grid gap-1 px-5 py-3">
                <span className="text-trav-ornament text-xs tracking-wider">
                  WAYPOINT {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  {
                    [
                      "The old ferry at Eastbank",
                      "A sheltered bend in the river",
                      "The observatory beyond the eastern ridge",
                      "Northreach market square",
                    ][index % 4]
                  }
                </span>
              </li>
            ))}
          </ol>
        </ScrollArea>
        <ScrollArea
          type="always"
          className="w-full rounded-xs border"
          aria-label="Horizontal route"
          role="region"
        >
          <div className="flex w-max gap-10 p-5 pb-10">
            {[
              "Eastbank",
              "Old ferry",
              "Willowmere",
              "Eastern ridge",
              "Observatory",
              "Northreach",
            ].map((place, index) => (
              <span key={place} className="whitespace-nowrap">
                <span className="text-trav-ornament me-3">{index + 1}.</span>
                {place}
              </span>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
      <Button asChild variant="outline" className="w-fit">
        <a href="./forms.html">Review journey settings</a>
      </Button>
      <details>
        <summary className="trav-control w-fit cursor-pointer">
          Usage and state notes
        </summary>
        <pre className="mt-4 overflow-x-auto border bg-card p-4 text-sm">
          <code>{`<Progress value={2} max={4} aria-label="Supplies packed" />
<Progress value={null} aria-label="Loading" />
<Table aria-label="Supplies"><TableBody><TableRow><TableCell>Map</TableCell></TableRow></TableBody></Table>
<ScrollArea className="h-56" aria-label="Route log" role="region">
  <ol>{waypoints.map(place => <li key={place}>{place}</li>)}</ol>
</ScrollArea>`}</code>
        </pre>
        <p className="mt-4 text-sm text-muted-foreground">
          Progress supports zero, complete, custom maximum and indeterminate
          values. The indeterminate marker is static. Table sorting/filtering
          remain consumer-owned; this example only controls selection. Scroll
          Area supports both axes and keeps native keyboard scrolling.
        </p>
      </details>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<Inventory />)
