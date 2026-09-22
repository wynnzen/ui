import { useState } from "react"
import { BookOpen, Map, MoreHorizontal, Plus, Settings } from "lucide-react"
import { createRoot } from "react-dom/client"

import { Button } from "@/registry/traveler/ui/button"
import { Label } from "@/registry/traveler/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/traveler/ui/native-select"
import * as S from "@/registry/traveler/ui/sidebar"

import "./preview.css"

function SidebarStatus() {
  const { state, isMobile, openMobile } = S.useSidebar()
  return (
    <output id="sidebar-state" role="status">
      {isMobile
        ? `Mobile sidebar ${openMobile ? "open" : "closed"}`
        : `Desktop sidebar ${state}`}
    </output>
  )
}
function SidebarExample() {
  const [variant, setVariant] = useState<"sidebar" | "floating" | "inset">(
    "sidebar"
  )
  const [collapsible, setCollapsible] = useState<"offcanvas" | "icon" | "none">(
    "icon"
  )
  const [side, setSide] = useState<"left" | "right">("left")
  const [open, setOpen] = useState(true)
  const [result, setResult] = useState("Your journal is ready.")
  return (
    <S.SidebarProvider
      open={open}
      onOpenChange={setOpen}
      className={collapsible === "none" ? "flex-col md:flex-row" : undefined}
    >
      <S.Sidebar
        variant={variant}
        side={side}
        collapsible={collapsible}
        className={
          collapsible === "none" ? "w-full md:w-(--sidebar-width)" : undefined
        }
      >
        <S.SidebarHeader>
          <a
            className="trav-control flex min-h-11 items-center font-heading text-lg"
            href="./catalog.html"
            aria-label="Traveler catalog"
          >
            <BookOpen
              aria-hidden="true"
              className="hidden size-5 group-data-[collapsible=icon]:block"
            />
            <span className="group-data-[collapsible=icon]:sr-only">
              Traveler
            </span>
          </a>
          <Label className="sr-only" htmlFor="sidebar-search">
            Search journal
          </Label>
          <S.SidebarInput id="sidebar-search" placeholder="Search journal" />
        </S.SidebarHeader>
        <S.SidebarSeparator />
        <S.SidebarContent>
          <S.SidebarGroup>
            <S.SidebarGroupLabel>Journey</S.SidebarGroupLabel>
            <S.SidebarGroupAction
              aria-label="Add journey"
              onClick={() => setResult("Journey added.")}
            >
              <Plus aria-hidden="true" />
            </S.SidebarGroupAction>
            <S.SidebarGroupContent>
              <S.SidebarMenu>
                <S.SidebarMenuItem>
                  <S.SidebarMenuButton asChild isActive tooltip="Journal">
                    <a href="#journal" aria-current="page">
                      <BookOpen aria-hidden="true" />
                      <span>Journal</span>
                    </a>
                  </S.SidebarMenuButton>
                  <S.SidebarMenuBadge>8</S.SidebarMenuBadge>
                  <S.SidebarMenuSub>
                    <S.SidebarMenuSubItem>
                      <S.SidebarMenuSubButton href="#notes" isActive>
                        Current notes
                      </S.SidebarMenuSubButton>
                    </S.SidebarMenuSubItem>
                    <S.SidebarMenuSubItem>
                      <S.SidebarMenuSubButton href="#archive" size="sm">
                        Archive
                      </S.SidebarMenuSubButton>
                    </S.SidebarMenuSubItem>
                  </S.SidebarMenuSub>
                </S.SidebarMenuItem>
                <S.SidebarMenuItem>
                  <S.SidebarMenuButton
                    tooltip={{ children: "Map and destinations" }}
                    variant="outline"
                    onClick={() => setResult("Map opened.")}
                  >
                    <Map aria-hidden="true" />
                    <span>Map and destinations beyond the eastern ridge</span>
                  </S.SidebarMenuButton>
                  <S.SidebarMenuAction
                    showOnHover
                    aria-label="Map options"
                    onClick={() => setResult("Map options opened.")}
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </S.SidebarMenuAction>
                </S.SidebarMenuItem>
                <S.SidebarMenuItem>
                  <S.SidebarMenuButton size="sm" disabled>
                    <Settings aria-hidden="true" />
                    <span>Sync unavailable</span>
                  </S.SidebarMenuButton>
                </S.SidebarMenuItem>
                <S.SidebarMenuItem>
                  <S.SidebarMenuSkeleton showIcon />
                </S.SidebarMenuItem>
              </S.SidebarMenu>
            </S.SidebarGroupContent>
          </S.SidebarGroup>
        </S.SidebarContent>
        <S.SidebarFooter>
          <S.SidebarMenu>
            <S.SidebarMenuItem>
              <S.SidebarMenuButton
                size="lg"
                tooltip="Travel settings"
                onClick={() => setResult("Settings opened.")}
              >
                <Settings aria-hidden="true" />
                <span>Travel settings</span>
              </S.SidebarMenuButton>
            </S.SidebarMenuItem>
          </S.SidebarMenu>
        </S.SidebarFooter>
        <S.SidebarRail />
      </S.Sidebar>
      <S.SidebarInset>
        <header className="flex items-center gap-3 border-b p-4">
          <S.SidebarTrigger />
          <p className="text-sm text-muted-foreground">Journey / Journal</p>
        </header>
        <div className="mx-auto grid w-full max-w-3xl gap-8 p-5 sm:p-8">
          <h1 id="journal" className="font-heading text-4xl">
            A place for every journey.
          </h1>
          <p className="text-muted-foreground">
            The same navigation becomes a Sheet below 768px. Toggle with the
            button or Ctrl/⌘ B. Icon mode retains accessible names; offcanvas
            mode removes hidden controls from focus.
          </p>
          <SidebarStatus />
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="sidebar-variant">Sidebar variant</Label>
              <NativeSelect
                id="sidebar-variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value as typeof variant)}
              >
                {["sidebar", "floating", "inset"].map((value) => (
                  <NativeSelectOption key={value} value={value}>
                    {value}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sidebar-collapse">Collapse mode</Label>
              <NativeSelect
                id="sidebar-collapse"
                value={collapsible}
                onChange={(e) =>
                  setCollapsible(e.target.value as typeof collapsible)
                }
              >
                {["icon", "offcanvas", "none"].map((value) => (
                  <NativeSelectOption key={value} value={value}>
                    {value}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sidebar-side">Sidebar side</Label>
              <NativeSelect
                id="sidebar-side"
                value={side}
                onChange={(e) => setSide(e.target.value as typeof side)}
              >
                <NativeSelectOption value="left">left</NativeSelectOption>
                <NativeSelectOption value="right">right</NativeSelectOption>
              </NativeSelect>
            </div>
          </div>
          <section
            id="notes"
            className="trav-panel grid gap-4 border bg-card p-6"
          >
            <h2 className="font-heading text-2xl">The river road</h2>
            <p>
              Leave at dawn. Keep the bridge in sight until you reach the reeds.
            </p>
            <Button
              className="w-fit"
              onClick={() => setResult("Route note saved.")}
            >
              Save route note
            </Button>
            <output id="sidebar-result" role="status">
              {result}
            </output>
          </section>
          <section id="archive">
            <h2 className="font-heading text-xl">Archive</h2>
            <p className="text-muted-foreground">No archived journeys.</p>
          </section>
          <a className="trav-control w-fit underline" href="./catalog.html">
            Component catalog
          </a>
          <p className="text-sm text-muted-foreground">
            The existing seven-day sidebar_state cookie records desktop toggles;
            restoring it is owned by the host. Real mobile and
            assistive-technology QA remain pending.
          </p>
        </div>
      </S.SidebarInset>
    </S.SidebarProvider>
  )
}
createRoot(document.getElementById("root")!).render(<SidebarExample />)
