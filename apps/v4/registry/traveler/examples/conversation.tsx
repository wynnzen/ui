import { useState } from "react"
import { FileText, Map, RotateCcw, X } from "lucide-react"
import { createRoot } from "react-dom/client"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/registry/traveler/ui/attachment"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/registry/traveler/ui/bubble"
import { Button } from "@/registry/traveler/ui/button"
import { Input } from "@/registry/traveler/ui/input"
import { Label } from "@/registry/traveler/ui/label"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/registry/traveler/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/registry/traveler/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@/registry/traveler/ui/message-scroller"
import { Spinner } from "@/registry/traveler/ui/spinner"

import "./preview.css"

function Transcript() {
  const [entries, setEntries] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      text: `Route note ${i + 1}: the path is clear. Pause beside the river, refill the flask, and mark the next crossing on the map.`,
    }))
  )
  const [draft, setDraft] = useState("")
  const { scrollToMessage } = useMessageScroller()
  const scrollable = useMessageScrollerScrollable()
  const { visibleMessageIds } = useMessageScrollerVisibility()
  return (
    <div className="grid min-w-0 gap-4">
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() =>
            setEntries((current) => [
              {
                id: current[0].id - 1,
                text: "An earlier note from the old river crossing.",
              },
              ...current,
            ])
          }
        >
          Load earlier note
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            scrollToMessage("12", { align: "start", behavior: "auto" })
          }
        >
          Jump to note 12
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setEntries((current) => [
              ...current,
              {
                id: current.at(-1)!.id + 1,
                text: "A new route report arrived.",
              },
            ])
          }
        >
          Append route report
        </Button>
      </div>
      <MessageScroller className="h-96 border bg-card">
        <MessageScrollerViewport aria-label="Route transcript">
          <MessageScrollerContent
            className="gap-6 p-5"
            aria-label="Journey notes"
          >
            {entries.map((entry) => (
              <MessageScrollerItem
                key={entry.id}
                messageId={String(entry.id)}
                scrollAnchor={entry.id === 12}
              >
                <Message align={entry.id % 2 ? "start" : "end"}>
                  <MessageAvatar className="size-9" aria-hidden="true">
                    {entry.id % 2 ? "E" : "W"}
                  </MessageAvatar>
                  <MessageContent>
                    <MessageHeader>
                      {entry.id % 2 ? "Eastbank guide" : "Wayfarer"} · Note{" "}
                      {entry.id}
                    </MessageHeader>
                    <Bubble variant={entry.id % 2 ? "outline" : "secondary"}>
                      <BubbleContent>{entry.text}</BubbleContent>
                    </Bubble>
                    <MessageFooter>Local journal entry</MessageFooter>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="start" />
        <MessageScrollerButton />
      </MessageScroller>
      <p className="text-xs text-muted-foreground" id="scroll-state">
        Earlier: {String(scrollable.start)} · Later: {String(scrollable.end)} ·
        Visible: {visibleMessageIds.join(", ")}
      </p>
      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          if (!draft.trim()) return
          setEntries((current) => [
            ...current,
            { id: current.at(-1)!.id + 1, text: draft.trim() },
          ])
          setDraft("")
        }}
      >
        <Label htmlFor="journal-entry">New local note</Label>
        <Input
          id="journal-entry"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <Button className="w-fit" disabled={!draft.trim()}>
          Add to journal
        </Button>
      </form>
      <output id="entry-count">{entries.length} journal entries</output>
    </div>
  )
}

function Conversation() {
  const [result, setResult] = useState("No attachment action yet.")
  const [removed, setRemoved] = useState(false)
  const [retried, setRetried] = useState(false)
  const [reactions, setReactions] = useState(2)
  return (
    <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 sm:px-10">
      <header className="grid gap-4 border-b pb-8">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Traveler UI · Conversation
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl">
          Letters along the road.
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Local notes, shared maps, and a record of the journey.
        </p>
        <a className="trav-control w-fit underline" href="./catalog.html">
          Component catalog
        </a>
      </header>
      <section
        id="attachment"
        aria-labelledby="attachment-title"
        className="grid min-w-0 gap-5"
      >
        <h2 id="attachment-title" className="font-heading text-2xl">
          Attachments
        </h2>
        <AttachmentGroup
          tabIndex={0}
          role="region"
          aria-label="Attachment states"
        >
          {(["idle", "uploading", "processing", "error", "done"] as const).map(
            (state) => (
              <Attachment
                key={state}
                state={state === "error" && retried ? "done" : state}
                size={
                  state === "uploading"
                    ? "sm"
                    : state === "processing"
                      ? "xs"
                      : "default"
                }
                className="max-w-64"
              >
                <AttachmentMedia>
                  {state === "uploading" || state === "processing" ? (
                    <Spinner aria-label={state} />
                  ) : (
                    <FileText aria-hidden="true" />
                  )}
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>
                    River-crossing-notes-旅の記録.txt
                  </AttachmentTitle>
                  <AttachmentDescription>
                    {state === "error"
                      ? retried
                        ? "Retry complete · 4 KB"
                        : "Upload failed · Retry available"
                      : `${state} · 4 KB`}
                  </AttachmentDescription>
                </AttachmentContent>
                {state === "error" && (
                  <AttachmentActions>
                    <AttachmentAction
                      aria-label="Retry map upload"
                      onClick={() => {
                        setRetried(true)
                        setResult("Map upload retried.")
                      }}
                    >
                      <RotateCcw />
                    </AttachmentAction>
                  </AttachmentActions>
                )}
              </Attachment>
            )
          )}
        </AttachmentGroup>
        <div className="flex flex-wrap items-start gap-5">
          {!removed && (
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <svg
                  className="size-full!"
                  viewBox="0 0 80 80"
                  role="img"
                  aria-label="Original geometric route sketch"
                >
                  <rect width="80" height="80" fill="var(--card)" />
                  <path
                    d="M8 64 28 20 48 48 72 12"
                    fill="none"
                    stroke="var(--trav-ornament)"
                    strokeWidth="3"
                  />
                  <circle cx="28" cy="20" r="4" fill="var(--primary)" />
                </svg>
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>River map</AttachmentTitle>
                <AttachmentDescription>Original sketch</AttachmentDescription>
              </AttachmentContent>
              <AttachmentTrigger
                aria-label="Open river map"
                onClick={() => setResult("River map opened locally.")}
              />
              <AttachmentActions>
                <AttachmentAction
                  aria-label="Remove river map"
                  variant="secondary"
                  onClick={() => {
                    setRemoved(true)
                    setResult("River map removed.")
                  }}
                >
                  <X />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          )}
          <Attachment size="sm">
            <AttachmentMedia>
              <FileText aria-hidden="true" />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Read the transcript</AttachmentTitle>
            </AttachmentContent>
            <AttachmentTrigger asChild>
              <a href="#message-scroller" aria-label="Read the transcript" />
            </AttachmentTrigger>
          </Attachment>
          <Attachment size="xs">
            <AttachmentContent>
              <AttachmentTitle>Unavailable map</AttachmentTitle>
            </AttachmentContent>
            <AttachmentTrigger disabled aria-label="Unavailable map" />
          </Attachment>
        </div>
        <output id="attachment-result">{result}</output>
      </section>
      <section
        id="bubble"
        aria-labelledby="bubble-title"
        className="grid min-w-0 gap-5"
      >
        <h2 id="bubble-title" className="font-heading text-2xl">
          Bubbles
        </h2>
        <BubbleGroup className="gap-6">
          {(
            [
              "default",
              "secondary",
              "muted",
              "tinted",
              "outline",
              "ghost",
              "destructive",
            ] as const
          ).map((variant, i) => (
            <Bubble
              key={variant}
              variant={variant}
              align={i % 2 ? "end" : "start"}
            >
              <BubbleContent>
                {variant === "destructive"
                  ? "Delivery failed. The note remains in your local journal."
                  : `${variant}: Meet beside the old bridge. 長い道でも、一歩ずつ進みましょう。`}
              </BubbleContent>
            </Bubble>
          ))}
          <Bubble variant="outline" className="mb-6">
            <BubbleContent asChild>
              <a href="#message-scroller">Read the latest journey notes</a>
            </BubbleContent>
            <BubbleReactions side="bottom" align="end">
              <Button
                size="sm"
                variant="ghost"
                aria-label={`Appreciate note, ${reactions} reactions`}
                onClick={() => setReactions(reactions + 1)}
              >
                + {reactions}
              </Button>
            </BubbleReactions>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent asChild>
              <button
                type="button"
                onClick={() => setResult("Message copied locally.")}
              >
                Copy this route note
              </button>
            </BubbleContent>
            <BubbleReactions side="top" align="start">
              <span aria-label="One acknowledgment">✓ 1</span>
            </BubbleReactions>
          </Bubble>
        </BubbleGroup>
      </section>
      <section
        id="marker"
        aria-labelledby="marker-title"
        className="grid gap-5"
      >
        <h2 id="marker-title" className="font-heading text-2xl">
          Markers
        </h2>
        {(["default", "separator", "border"] as const).map((variant) => (
          <Marker variant={variant} key={variant}>
            <MarkerIcon>
              <Map />
            </MarkerIcon>
            <MarkerContent>
              September 21 · A new chapter beside the river · {variant}
            </MarkerContent>
          </Marker>
        ))}
        <Marker asChild>
          <a href="#message">
            <MarkerContent>Continue to the letters</MarkerContent>
          </a>
        </Marker>
      </section>
      <section
        id="message"
        aria-labelledby="message-title"
        className="grid min-w-0 gap-5"
      >
        <h2 id="message-title" className="font-heading text-2xl">
          Messages
        </h2>
        <MessageGroup className="gap-8">
          {(["start", "end"] as const).map((align) => (
            <Message align={align} key={align}>
              <MessageAvatar className="size-10" aria-hidden="true">
                {align === "start" ? "E" : "W"}
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>
                  {align === "start" ? "Eastbank guide" : "Wayfarer"} · 09:30
                </MessageHeader>
                <Bubble variant={align === "start" ? "outline" : "secondary"}>
                  <BubbleContent>
                    Bring the lantern. The old bridge is sheltered from the
                    rain.
                  </BubbleContent>
                </Bubble>
                <MessageFooter>Recorded in this browser</MessageFooter>
              </MessageContent>
            </Message>
          ))}
        </MessageGroup>
      </section>
      <section
        id="message-scroller"
        aria-labelledby="scroller-title"
        className="grid min-w-0 gap-5"
      >
        <h2 id="scroller-title" className="font-heading text-2xl">
          Message Scroller
        </h2>
        <p className="text-muted-foreground">
          New notes follow while you are at the end. Reading earlier notes keeps
          your place.
        </p>
        <MessageScrollerProvider autoScroll defaultScrollPosition="end">
          <Transcript />
        </MessageScrollerProvider>
      </section>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<Conversation />)
