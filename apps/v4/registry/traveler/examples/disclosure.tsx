import { useState } from "react"
import { InfoIcon, TriangleAlertIcon } from "lucide-react"
import { createRoot } from "react-dom/client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/traveler/ui/accordion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/traveler/ui/alert"
import { AspectRatio } from "@/registry/traveler/ui/aspect-ratio"
import { Button } from "@/registry/traveler/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/traveler/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/traveler/ui/collapsible"
import {
  DirectionProvider,
  useDirection,
} from "@/registry/traveler/ui/direction"
import { Skeleton } from "@/registry/traveler/ui/skeleton"
import { Spinner } from "@/registry/traveler/ui/spinner"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/traveler/ui/tabs"

import "./preview.css"

function ReadingDirection() {
  const direction = useDirection()
  return <p data-testid="reading-direction">Primitive direction: {direction}</p>
}

function Disclosures() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(["weather"])
  return (
    <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 sm:px-10">
      <header className="grid gap-4 border-b pb-8">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Traveler UI · Disclosure and feedback
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">
          Before the next crossing.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Route notes, status messages and patient loading states. Behavior-only
          helpers keep their original primitive contracts.
        </p>
        <a className="trav-control w-fit underline" href="./catalog.html">
          Component catalog
        </a>
      </header>
      <section
        id="accordion"
        className="grid gap-5"
        aria-labelledby="accordion-title"
      >
        <h2 id="accordion-title" className="font-heading text-2xl">
          Accordion · route notes
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Accordion
            type="single"
            collapsible
            defaultValue="road"
            aria-label="Journey questions"
          >
            <AccordionItem value="road">
              <AccordionTrigger>Which road is open?</AccordionTrigger>
              <AccordionContent>
                The stone road through North Hollow is open. Carry water for the
                long walk between shelters.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="rest">
              <AccordionTrigger>
                Where can the party rest before the unusually long mountain
                crossing?
              </AccordionTrigger>
              <AccordionContent>
                A staffed shelter beside the old bridge offers warm meals and a
                quiet place to rest.{" "}
                <a className="trav-control underline" href="#collapsible">
                  Read the shelter notes
                </a>
                .
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="closed" disabled>
              <AccordionTrigger>Winter trail · unavailable</AccordionTrigger>
              <AccordionContent>The winter trail is closed.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="grid content-start gap-3">
            <Accordion
              type="multiple"
              value={expanded}
              onValueChange={setExpanded}
              aria-label="Preparation notes"
            >
              <AccordionItem value="weather">
                <AccordionTrigger>Weather notes</AccordionTrigger>
                <AccordionContent>
                  Light rain is expected after dusk.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="supplies">
                <AccordionTrigger>Supply notes</AccordionTrigger>
                <AccordionContent>
                  Pack a dry cloak and enough provisions for two days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <output role="status" className="text-sm text-muted-foreground">
              Open notes: {expanded.join(", ") || "none"}
            </output>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Single/uncontrolled and multiple/controlled. Enter or Space opens a
          note; arrow keys, Home and End move between enabled triggers. Long
          content wraps; disabled entries remain unavailable.
        </p>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Accordion usage"
        >
          <code>
            {
              '<Accordion type="single" collapsible>\n  <AccordionItem value="road">\n    <AccordionTrigger>Road notes</AccordionTrigger>\n    <AccordionContent>Carry water.</AccordionContent>\n  </AccordionItem>\n</Accordion>'
            }
          </code>
        </pre>
      </section>
      <section
        id="collapsible"
        className="grid gap-5"
        aria-labelledby="collapsible-title"
      >
        <h2 id="collapsible-title" className="font-heading text-2xl">
          Collapsible · shelter details
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Old bridge shelter</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Collapsible
              open={open}
              onOpenChange={setOpen}
              className="grid gap-3"
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-fit">
                  {open ? "Hide" : "Show"} shelter details
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="border-s-2 ps-4">
                Three bunks, a covered hearth, and fresh water. Arrival before
                dusk is recommended.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible defaultOpen className="grid gap-3">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-fit">
                  Visitor note
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                Leave the shelter ready for the next traveller.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible disabled>
              <CollapsibleTrigger asChild>
                <Button variant="outline">Locked archive</Button>
              </CollapsibleTrigger>
              <CollapsibleContent>Unavailable archive</CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          No built-in chrome. Compose the unchanged primitive with Button and
          your own content. Controlled, default-open and disabled examples
          retain asChild and native focus.
        </p>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Collapsible usage"
        >
          <code>
            {
              "<Collapsible defaultOpen>\n  <CollapsibleTrigger asChild><Button>Details</Button></CollapsibleTrigger>\n  <CollapsibleContent>Shelter notes</CollapsibleContent>\n</Collapsible>"
            }
          </code>
        </pre>
      </section>
      <section id="alert" className="grid gap-5" aria-labelledby="alert-title">
        <h2 id="alert-title" className="font-heading text-2xl">
          Alert · travel notices
        </h2>
        <Alert>
          <InfoIcon aria-hidden="true" />
          <AlertTitle>Supplies are ready</AlertTitle>
          <AlertDescription>
            Your provisions have been packed. Review the inventory before
            departing.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <TriangleAlertIcon aria-hidden="true" />
          <AlertTitle>
            The eastern crossing is temporarily closed after heavy rainfall in
            the upper valley
          </AlertTitle>
          <AlertDescription>
            <p>
              Choose the stone road instead. This warning remains fully visible
              at narrow widths and increased text sizes.
            </p>
            <Button variant="outline" asChild>
              <a href="./inventory.html">Review supplies</a>
            </Button>
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertTitle>A quiet notice without an icon</AlertTitle>
          <AlertDescription>
            Messages do not depend on color or decoration for meaning.
          </AlertDescription>
        </Alert>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Alert usage"
        >
          <code>
            {
              '<Alert variant="destructive">\n  <AlertTitle>Crossing closed</AlertTitle>\n  <AlertDescription>Use the stone road.</AlertDescription>\n</Alert>'
            }
          </code>
        </pre>
      </section>
      <section
        id="aspect-ratio"
        className="grid gap-5"
        aria-labelledby="ratio-title"
      >
        <h2 id="ratio-title" className="font-heading text-2xl">
          Aspect Ratio · reserved space
        </h2>
        <div className="grid items-start gap-6 sm:grid-cols-2">
          <AspectRatio
            ratio={16 / 9}
            className="grid place-items-center border bg-muted p-4"
          >
            <p>16:9 map space</p>
          </AspectRatio>
          <div className="max-w-48">
            <AspectRatio
              ratio={1}
              className="grid place-items-center border bg-muted p-4"
            >
              <p>1:1 seal space</p>
            </AspectRatio>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          The helper only reserves geometry. The border, background and content
          above are consumer utilities; no image, animation or required asset is
          installed.
        </p>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Aspect Ratio usage"
        >
          <code>
            {"<AspectRatio ratio={16 / 9}>Your content</AspectRatio>"}
          </code>
        </pre>
      </section>
      <section
        id="direction"
        className="grid gap-5"
        aria-labelledby="direction-title"
      >
        <h2 id="direction-title" className="font-heading text-2xl">
          Direction · basic RTL fixture
        </h2>
        <DirectionProvider dir="ltr" direction="rtl">
          <div dir="rtl" className="grid gap-4 border p-4">
            <ReadingDirection />
            <Tabs defaultValue="route">
              <TabsList aria-label="RTL journey tabs">
                <TabsTrigger value="route">Route</TabsTrigger>
                <TabsTrigger value="camp">Camp</TabsTrigger>
              </TabsList>
              <TabsContent value="route">Follow the stone road.</TabsContent>
              <TabsContent value="camp">Rest before dusk.</TabsContent>
            </Tabs>
          </div>
        </DirectionProvider>
        <p className="text-sm text-muted-foreground">
          The direction alias takes precedence over dir, as upstream. Set HTML
          direction as well as the primitive provider. This small keyboard
          fixture does not claim a complete translated or RTL library audit.
        </p>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Direction usage"
        >
          <code>
            {
              '<DirectionProvider dir="rtl">\n  <div dir="rtl">Your interface</div>\n</DirectionProvider>'
            }
          </code>
        </pre>
      </section>
      <section
        id="skeleton"
        className="grid gap-5"
        aria-labelledby="skeleton-title"
      >
        <h2 id="skeleton-title" className="font-heading text-2xl">
          Skeleton · loading a route
        </h2>
        <div role="status" className="grid gap-3">
          <span>Loading the next route…</span>
          <div aria-hidden="true" className="grid max-w-md gap-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Dimensions belong to the consumer. Announce loading once and hide
          decorative placeholders. Reduced motion removes the pulse; forced
          colors retain a border.
        </p>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Skeleton usage"
        >
          <code>{'<Skeleton aria-hidden="true" className="h-4 w-48" />'}</code>
        </pre>
      </section>
      <section
        id="spinner"
        className="grid gap-5"
        aria-labelledby="spinner-title"
      >
        <h2 id="spinner-title" className="font-heading text-2xl">
          Spinner · waiting for a report
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Spinner />
          <Spinner className="size-6" aria-label="Fetching weather" />
          <Button disabled>
            <Spinner aria-hidden="true" />
            Saving route
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          The default status name is Loading. Supply a specific label or hide a
          redundant glyph beside visible text. Reduced motion keeps a static
          recognizable mark.
        </p>
        <pre
          className="overflow-auto border p-3 text-xs"
          tabIndex={0}
          aria-label="Spinner usage"
        >
          <code>{'<Spinner aria-label="Fetching weather" />'}</code>
        </pre>
      </section>
      <footer className="border-t pt-6 text-sm text-muted-foreground">
        Development examples. Human screen-reader, Safari/mobile and
        browser-zoom release QA remain pending.
      </footer>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<Disclosures />)
