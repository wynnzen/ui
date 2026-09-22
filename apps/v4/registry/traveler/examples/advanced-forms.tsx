import { useState } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"
import { createRoot } from "react-dom/client"
import { useForm } from "react-hook-form"

import { Button } from "@/registry/traveler/ui/button"
import { Checkbox } from "@/registry/traveler/ui/checkbox"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/traveler/ui/command"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/traveler/ui/field"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/registry/traveler/ui/form"
import { Input } from "@/registry/traveler/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/traveler/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/traveler/ui/input-otp"
import { Label } from "@/registry/traveler/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/traveler/ui/popover"
import { Textarea } from "@/registry/traveler/ui/textarea"

import "./preview.css"

function FormFieldState() {
  const { name, invalid } = useFormField()
  return (
    <p data-testid="form-field-state" className="text-xs text-muted-foreground">
      Field {name}: {invalid ? "invalid" : "valid"}.
    </p>
  )
}
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
function AdvancedForms() {
  const form = useForm({
    defaultValues: {
      nickname: "",
      notes: "Follow the river.",
      region: "North Hollow",
      permit: "Unavailable",
    },
  })
  const [profile, setProfile] = useState("")
  const [delivery, setDelivery] = useState("")
  const [query, setQuery] = useState("Old bridge")
  const [summary, setSummary] = useState("Leave before dusk.")
  const [action, setAction] = useState("No command selected.")
  const [code, setCode] = useState("")
  const [completedCode, setCompletedCode] = useState("")
  const [postedCode, setPostedCode] = useState("")
  const [commandOpen, setCommandOpen] = useState(false)
  const [quickOpen, setQuickOpen] = useState(false)
  const [selectedCommand, setSelectedCommand] = useState("eastbank")
  const [destinationOpen, setDestinationOpen] = useState(false)
  const [destination, setDestination] = useState("Eastbank")
  const choose = (value: string) => {
    setAction(`Selected: ${value}.`)
    setCommandOpen(false)
    setQuickOpen(false)
  }
  return (
    <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 sm:px-10">
      <header className="grid gap-4 border-b pb-8">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Traveler UI · Forms and Command
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">
          Make the journey your own.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Validation, grouped fields, courier codes and searchable commands.
        </p>
        <a className="trav-control w-fit underline" href="./catalog.html">
          Component catalog
        </a>
      </header>
      <section id="form" className="grid gap-5" aria-labelledby="form-heading">
        <h2 id="form-heading" className="font-heading text-2xl">
          Form · traveller profile
        </h2>
        <Form {...form}>
          <form
            className="grid max-w-xl gap-6"
            noValidate
            onSubmit={form.handleSubmit((values) =>
              setProfile(JSON.stringify(values))
            )}
          >
            <FormField
              control={form.control}
              name="nickname"
              rules={{
                required: "Enter a traveller name.",
                minLength: {
                  value: 2,
                  message: "Use at least two characters.",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Traveller name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The name shown on your journey notes.
                  </FormDescription>
                  <FormMessage />
                  <FormFieldState />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Long notes and CJK input remain ordinary text.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home region · readonly</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    This value is included in the profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permit"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Permit · disabled</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Disabled values are omitted from submission.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-3">
              <Button type="submit">Save traveller profile</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setProfile("")
                }}
              >
                Reset profile
              </Button>
            </div>
            <output
              id="profile-result"
              role="status"
              className="text-sm break-all"
            >
              {profile || "No profile saved yet."}
            </output>
          </form>
        </Form>
        <p className="text-sm text-muted-foreground">
          All form exports use the existing React Hook Form context. Labels,
          descriptions, errors and invalid state share generated IDs. Submit an
          empty or one-character name to exercise validation and focus.
        </p>
        <Usage>
          {
            '<Form {...form}><form onSubmit={form.handleSubmit(save)}><FormField control={form.control} name="nickname" render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormDescription>Public name.</FormDescription><FormMessage /></FormItem>} /></form></Form>'
          }
        </Usage>
      </section>
      <section
        id="field"
        className="grid gap-5"
        aria-labelledby="field-heading"
      >
        <h2 id="field-heading" className="font-heading text-2xl">
          Field · delivery preferences
        </h2>
        <form
          className="grid gap-6"
          onSubmit={(event) => {
            event.preventDefault()
            setDelivery(
              JSON.stringify(Array.from(new FormData(event.currentTarget)))
            )
          }}
        >
          <FieldSet>
            <FieldLegend>Journey delivery</FieldLegend>
            <FieldDescription>
              Choose how your notes travel with you.
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="delivery-name">Recipient</FieldLabel>
                <Input
                  id="delivery-name"
                  name="recipient"
                  defaultValue="Mira"
                />
                <FieldDescription>
                  A vertical field keeps its explanation close to the entry.
                </FieldDescription>
              </Field>
              <Field orientation="responsive">
                <FieldLabel htmlFor="arrival-contact">
                  Arrival contact with a deliberately long translated label
                </FieldLabel>
                <Input
                  id="arrival-contact"
                  name="contact"
                  defaultValue="North Hollow shelter"
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="weather-report" name="weather" defaultChecked />
                <FieldContent>
                  <FieldLabel htmlFor="weather-report">
                    Include a weather report
                  </FieldLabel>
                  <FieldDescription>
                    Read the forecast before the mountain crossing.
                  </FieldDescription>
                </FieldContent>
              </Field>
              <FieldSeparator>Delivery method</FieldSeparator>
              <FieldLabel htmlFor="courier-service">
                <Field orientation="horizontal">
                  <Checkbox
                    id="courier-service"
                    aria-labelledby="courier-service-title"
                    name="courier"
                  />
                  <FieldContent>
                    <FieldTitle id="courier-service-title">
                      Send with a courier
                    </FieldTitle>
                    <FieldDescription>
                      A labelled selection panel uses the same field parts.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <Field data-disabled="true">
                <FieldLabel htmlFor="delivery-archive">
                  Archive address · disabled
                </FieldLabel>
                <Input
                  id="delivery-archive"
                  disabled
                  defaultValue="Archive closed"
                />
              </Field>
              <Field data-invalid="true">
                <FieldLabel htmlFor="delivery-code">
                  Delivery reference
                </FieldLabel>
                <Input
                  id="delivery-code"
                  aria-invalid="true"
                  aria-describedby="delivery-errors"
                  defaultValue="?"
                />
                <FieldError
                  id="delivery-errors"
                  errors={[
                    { message: "Use a readable reference." },
                    { message: "Use a readable reference." },
                    undefined,
                    { message: "Include the destination name." },
                  ]}
                />
              </Field>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend variant="label">Confirmation</FieldLegend>
                <FieldDescription>
                  A smaller legend remains a real fieldset legend.
                </FieldDescription>
                <FieldError errors={[]} />
              </FieldSet>
            </FieldGroup>
          </FieldSet>
          <Button type="submit" className="w-fit">
            Save delivery preferences
          </Button>
          <output
            id="delivery-result"
            role="status"
            className="text-sm break-all"
          >
            {delivery || "Delivery preferences have not been saved."}
          </output>
        </form>
        <Usage>
          {
            '<FieldSet><FieldLegend>Delivery</FieldLegend><FieldGroup><Field><FieldLabel htmlFor="name">Name</FieldLabel><Input id="name" /><FieldDescription>Recipient name.</FieldDescription></Field></FieldGroup></FieldSet>'
          }
        </Usage>
      </section>
      <section
        id="input-group"
        className="grid gap-5"
        aria-labelledby="input-group-heading"
      >
        <h2 id="input-group-heading" className="font-heading text-2xl">
          Input Group · route research
        </h2>
        <div className="grid max-w-xl gap-2">
          <Label htmlFor="route-query">Route query</Label>
          <InputGroup>
            <InputGroupInput
              id="route-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                aria-label="Clear route query"
                onClick={() => setQuery("")}
              >
                <XIcon />
              </InputGroupButton>
              <InputGroupButton onClick={() => setAction(`Search: ${query}.`)}>
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid max-w-xl gap-2">
          <Label htmlFor="route-summary">Route summary</Label>
          <InputGroup id="summary-group">
            <InputGroupAddon align="block-start" className="border-b">
              <InputGroupText>Journal summary</InputGroupText>
            </InputGroupAddon>
            <InputGroupTextarea
              id="route-summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
            <InputGroupAddon
              align="block-end"
              className="justify-between border-t"
            >
              <InputGroupText>{summary.length} characters</InputGroupText>
              <div className="flex gap-2">
                <InputGroupButton
                  size="sm"
                  variant="outline"
                  onClick={() => setAction(`Saved summary: ${summary}`)}
                >
                  Save summary
                </InputGroupButton>
                <InputGroupButton
                  size="icon-sm"
                  aria-label="Clear summary"
                  onClick={() => setSummary("")}
                >
                  <XIcon />
                </InputGroupButton>
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputGroup>
            <InputGroupInput
              aria-label="Readonly route"
              readOnly
              defaultValue="The stone road"
            />
            <InputGroupAddon>
              <InputGroupText>Fixed</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
              aria-label="Disabled route"
              disabled
              defaultValue="Winter trail"
            />
          </InputGroup>
          <div className="grid gap-2">
            <InputGroup>
              <InputGroupInput
                aria-label="Invalid route"
                aria-invalid="true"
                aria-describedby="route-error"
                defaultValue="Unknown crossing"
              />
            </InputGroup>
            <FieldError id="route-error">Choose a known crossing.</FieldError>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          All four addon alignments and button sizes, input/textarea, readonly,
          disabled and invalid states. Clicking a text addon focuses its input
          or textarea; addon buttons keep their own actions. One group outline
          identifies keyboard focus.
        </p>
        <Usage>
          {
            '<InputGroup><InputGroupInput aria-label="Route" /><InputGroupAddon align="inline-end"><InputGroupButton>Search</InputGroupButton></InputGroupAddon></InputGroup>'
          }
        </Usage>
      </section>
      <section
        id="input-otp"
        className="grid gap-5"
        aria-labelledby="otp-heading"
      >
        <h2 id="otp-heading" className="font-heading text-2xl">
          Input OTP · courier code
        </h2>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            setPostedCode(
              String(new FormData(event.currentTarget).get("courierCode"))
            )
          }}
        >
          <Label htmlFor="courier-code">Courier code</Label>
          <InputOTP
            id="courier-code"
            name="courierCode"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={code}
            onChange={setCode}
            onComplete={setCompletedCode}
            pasteTransformer={(text) => text.replace(/-/g, "")}
            aria-describedby="courier-hint"
          >
            <InputOTPGroup>
              {[0, 1, 2].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {[3, 4, 5].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p id="courier-hint" className="text-sm text-muted-foreground">
            Six digits. Pasted hyphens are removed. These fictional codes are
            only a form demonstration.
          </p>
          <Button type="submit" className="w-fit" disabled={code.length !== 6}>
            Record courier code
          </Button>
          <output id="otp-complete" role="status">
            Last complete code: {completedCode || "none"}.
          </output>
          <output id="otp-result" role="status">
            Recorded code: {postedCode || "none"}.
          </output>
        </form>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="locked-code">Locked code</Label>
            <InputOTP
              id="locked-code"
              maxLength={4}
              defaultValue="1234"
              disabled
            >
              <InputOTPGroup>
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="invalid-code">Incomplete code</Label>
            <InputOTP
              id="invalid-code"
              maxLength={4}
              defaultValue="12"
              aria-invalid="true"
              aria-describedby="code-error"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3].map((index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldError id="code-error">Enter all four digits.</FieldError>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          The primitive retains one labelled native input, selection, paste and
          completion callbacks. Slots mirror its state. Reduced motion disables
          the fake-caret animation.
        </p>
        <Usage>
          {
            '<InputOTP maxLength={4} aria-label="Code"><InputOTPGroup>{[0,1,2,3].map(index => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup></InputOTP>'
          }
        </Usage>
      </section>
      <section
        id="command"
        className="grid gap-5"
        aria-labelledby="command-heading"
      >
        <h2 id="command-heading" className="font-heading text-2xl">
          Command · find the next action
        </h2>
        <Command
          label="Journey commands"
          value={selectedCommand}
          onValueChange={setSelectedCommand}
          className="max-w-xl"
        >
          <CommandInput
            aria-label="Find a journey command"
            placeholder="Search routes or actions…"
          />
          <CommandList>
            <CommandEmpty>No matching journey commands.</CommandEmpty>
            <CommandGroup heading="Destinations">
              <CommandItem value="eastbank" onSelect={choose}>
                Eastbank<CommandShortcut aria-hidden="true">↵</CommandShortcut>
              </CommandItem>
              <CommandItem value="willowmere" onSelect={choose}>
                Willowmere
              </CommandItem>
              <CommandItem value="closed-ferry" disabled>
                Closed ferry
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Preparation">
              <CommandItem
                value="lantern"
                keywords={["pack", "light"]}
                onSelect={choose}
              >
                Pack a lantern
              </CommandItem>
              <CommandItem value="map" onSelect={choose}>
                Review the map
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setCommandOpen(true)}>
            Open command palette
          </Button>
          <Button variant="outline" onClick={() => setQuickOpen(true)}>
            Open quick search
          </Button>
        </div>
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput
            aria-label="Search command palette"
            placeholder="Find a route…"
          />
          <CommandList>
            <CommandEmpty>No routes found.</CommandEmpty>
            <CommandGroup heading="Routes">
              {Array.from({ length: 24 }, (_, index) => (
                <CommandItem
                  key={index}
                  value={`route-${index + 1}`}
                  onSelect={choose}
                >
                  Route {index + 1}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <CommandDialog
          open={quickOpen}
          onOpenChange={setQuickOpen}
          title="Quick route search"
          description="Choose one nearby destination."
          showCloseButton={false}
        >
          <CommandInput aria-label="Search nearby destinations" />
          <CommandList>
            <CommandEmpty>No nearby destination found.</CommandEmpty>
            <CommandItem value="old-bridge" onSelect={choose}>
              Old bridge
            </CommandItem>
            <CommandItem value="north-hollow" onSelect={choose}>
              North Hollow
            </CommandItem>
          </CommandList>
        </CommandDialog>
        <output id="command-result" role="status" className="break-words">
          {action}
        </output>
        <p className="text-sm text-muted-foreground">
          Automatic filtering, empty results, groups, separator, shortcut,
          disabled options and controlled selection retain cmdk behavior. Modal
          title/description live inside Dialog content; the viewport bounds the
          scrolling list. Enter runs an option, Escape closes a palette.
        </p>
        <Usage>
          {
            '<Command label="Routes"><CommandInput aria-label="Find a route" /><CommandList><CommandEmpty>No route.</CommandEmpty><CommandItem value="eastbank" onSelect={choose}>Eastbank</CommandItem></CommandList></Command>'
          }
        </Usage>
        <div className="grid gap-4 border-t pt-5">
          <h3 className="font-heading text-xl">
            Searchable destination · Popover + Command recipe
          </h3>
          <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-label="Destination picker"
                aria-expanded={destinationOpen}
                aria-controls={
                  destinationOpen ? "destination-popup" : undefined
                }
                aria-haspopup="dialog"
                className="w-fit gap-6"
              >
                {destination}
                <ChevronDownIcon aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              id="destination-popup"
              aria-label="Choose a destination"
              className="p-0"
            >
              <Command
                label="Destination choices"
                className="rounded-none border-0 shadow-none"
              >
                <CommandInput aria-label="Find a destination" />
                <CommandList>
                  <CommandEmpty>No matching destination.</CommandEmpty>
                  {["Eastbank", "Willowmere", "North Hollow"].map((place) => (
                    <CommandItem
                      key={place}
                      value={place}
                      onSelect={() => {
                        setDestination(place)
                        setDestinationOpen(false)
                      }}
                    >
                      {place}
                      {destination === place && (
                        <CheckIcon className="ms-auto" aria-hidden="true" />
                      )}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground">
            This recipe composes the existing Radix Popover and cmdk Command.
            The separate pinned Base UI Combobox component is explicitly
            deferred for this release.
          </p>
        </div>
      </section>
      <footer className="border-t pt-6 text-sm text-muted-foreground">
        Human screen-reader, real Safari/mobile and browser-zoom release QA
        remain pending.
      </footer>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<AdvancedForms />)
