import { useState } from "react"
import { createRoot } from "react-dom/client"

import { Button } from "@/registry/traveler/ui/button"
import * as C from "@/registry/traveler/ui/context-menu"
import * as D from "@/registry/traveler/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/traveler/ui/dropdown-menu"
import * as H from "@/registry/traveler/ui/hover-card"
import { Input } from "@/registry/traveler/ui/input"
import { Label } from "@/registry/traveler/ui/label"
import * as M from "@/registry/traveler/ui/menubar"
import * as N from "@/registry/traveler/ui/navigation-menu"
import * as S from "@/registry/traveler/ui/sheet"

import "./preview.css"

function NavigationExamples() {
  const [result, setResult] = useState("No route action yet.")
  const [marked, setMarked] = useState<boolean | "indeterminate">(
    "indeterminate"
  )
  const [pace, setPace] = useState("steady")
  const [menu, setMenu] = useState("")
  const [sheet, setSheet] = useState<string | null>(null)
  const [hover, setHover] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <main className="mx-auto grid max-w-4xl gap-12 px-5 py-12 sm:px-10">
      <header className="grid gap-4 border-b pb-8">
        <p className="text-trav-ornament text-xs tracking-widest uppercase">
          Traveler UI · Extended navigation
        </p>
        <h1 className="font-heading text-4xl">Choose the next road.</h1>
        <p className="text-muted-foreground">
          Context actions, route navigation and compact travelling panels.
        </p>
        <nav className="flex gap-5">
          <a className="trav-control underline" href="./catalog.html">
            Component catalog
          </a>
          <a className="trav-control underline" href="./sidebar.html">
            Sidebar example
          </a>
        </nav>
      </header>
      <section id="context-menu" className="grid gap-5">
        <h2 className="font-heading text-2xl">Context Menu · map actions</h2>
        <C.ContextMenu>
          <C.ContextMenuTrigger asChild>
            <button
              className="trav-control min-h-32 rounded-xs border border-dashed p-6 text-start"
              aria-label="Map context actions"
            >
              Old bridge map
              <br />
              <span className="text-sm text-muted-foreground">
                Right click or press the context-menu key while focused.
              </span>
            </button>
          </C.ContextMenuTrigger>
          <C.ContextMenuContent>
            <C.ContextMenuLabel>Map actions</C.ContextMenuLabel>
            <C.ContextMenuGroup>
              <C.ContextMenuItem onSelect={() => setResult("Map copied.")}>
                Copy map<C.ContextMenuShortcut>⌘C</C.ContextMenuShortcut>
              </C.ContextMenuItem>
              <C.ContextMenuItem disabled>Closed crossing</C.ContextMenuItem>
            </C.ContextMenuGroup>
            <C.ContextMenuSub>
              <C.ContextMenuSubTrigger inset>
                Walking pace
              </C.ContextMenuSubTrigger>
              <C.ContextMenuPortal>
                <C.ContextMenuSubContent>
                  <C.ContextMenuRadioGroup value={pace} onValueChange={setPace}>
                    <C.ContextMenuRadioItem value="steady">
                      Steady
                    </C.ContextMenuRadioItem>
                    <C.ContextMenuRadioItem value="swift">
                      Swift
                    </C.ContextMenuRadioItem>
                  </C.ContextMenuRadioGroup>
                </C.ContextMenuSubContent>
              </C.ContextMenuPortal>
            </C.ContextMenuSub>
            <C.ContextMenuSeparator />
            <C.ContextMenuCheckboxItem
              checked={marked}
              onCheckedChange={setMarked}
            >
              Marked routes
            </C.ContextMenuCheckboxItem>
            <C.ContextMenuItem
              variant="destructive"
              onSelect={() => setResult("Map archived.")}
            >
              Archive map
            </C.ContextMenuItem>
          </C.ContextMenuContent>
        </C.ContextMenu>
        <p className="text-sm text-muted-foreground">
          Keyboard navigation, mixed/checked and radio states use the existing
          Radix primitive.{" "}
          <a className="trav-control underline" href="#menubar">
            The menu below
          </a>{" "}
          exposes the same Copy map action without a context gesture.
        </p>
      </section>
      <section id="menubar" className="grid gap-5">
        <h2 className="font-heading text-2xl">Menubar · journal tools</h2>
        <M.Menubar
          value={menu}
          onValueChange={setMenu}
          aria-label="Journal tools"
        >
          <M.MenubarMenu value="journal">
            <M.MenubarTrigger>Journal</M.MenubarTrigger>
            <M.MenubarContent>
              <M.MenubarLabel inset>Current journey</M.MenubarLabel>
              <M.MenubarGroup>
                <M.MenubarItem onSelect={() => setResult("Map copied.")}>
                  Copy map<M.MenubarShortcut>⌘C</M.MenubarShortcut>
                </M.MenubarItem>
                <M.MenubarItem disabled>Print journal</M.MenubarItem>
              </M.MenubarGroup>
              <M.MenubarSub>
                <M.MenubarSubTrigger>Export format</M.MenubarSubTrigger>
                <M.MenubarPortal>
                  <M.MenubarSubContent>
                    <M.MenubarItem
                      onSelect={() => setResult("Exported plain text.")}
                    >
                      Plain text
                    </M.MenubarItem>
                    <M.MenubarItem
                      onSelect={() => setResult("Exported route list.")}
                    >
                      Route list
                    </M.MenubarItem>
                  </M.MenubarSubContent>
                </M.MenubarPortal>
              </M.MenubarSub>
              <M.MenubarSeparator />
              <M.MenubarItem
                variant="destructive"
                onSelect={() => setResult("Journal archived.")}
              >
                Archive journal
              </M.MenubarItem>
            </M.MenubarContent>
          </M.MenubarMenu>
          <M.MenubarMenu value="view">
            <M.MenubarTrigger>View</M.MenubarTrigger>
            <M.MenubarContent>
              <M.MenubarCheckboxItem
                checked={marked}
                onCheckedChange={setMarked}
              >
                Marked routes
              </M.MenubarCheckboxItem>
              <M.MenubarSeparator />
              <M.MenubarRadioGroup value={pace} onValueChange={setPace}>
                <M.MenubarRadioItem value="steady">Steady</M.MenubarRadioItem>
                <M.MenubarRadioItem value="swift">Swift</M.MenubarRadioItem>
              </M.MenubarRadioGroup>
            </M.MenubarContent>
          </M.MenubarMenu>
          <M.MenubarMenu value="unavailable">
            <M.MenubarTrigger disabled>Sync</M.MenubarTrigger>
          </M.MenubarMenu>
        </M.Menubar>
        <output id="navigation-result" role="status">
          {result} Pace: {pace}. Marked: {String(marked)}.
        </output>
      </section>
      <section id="navigation-menu" className="grid gap-5">
        <h2 className="font-heading text-2xl">
          Navigation Menu · destinations
        </h2>
        <N.NavigationMenu aria-label="Destinations">
          <N.NavigationMenuList>
            <N.NavigationMenuItem>
              <N.NavigationMenuTrigger>Destinations</N.NavigationMenuTrigger>
              <N.NavigationMenuContent>
                <ul>
                  <li>
                    <N.NavigationMenuLink href="#eastbank" active>
                      Eastbank
                      <span className="text-muted-foreground">
                        The river port beside the old bridge.
                      </span>
                    </N.NavigationMenuLink>
                  </li>
                  <li>
                    <N.NavigationMenuLink href="#willowmere">
                      Willowmere
                      <span className="text-muted-foreground">
                        A sheltered path through the reeds.
                      </span>
                    </N.NavigationMenuLink>
                  </li>
                </ul>
              </N.NavigationMenuContent>
            </N.NavigationMenuItem>
            <N.NavigationMenuItem>
              <N.NavigationMenuLink
                className={N.navigationMenuTriggerStyle()}
                href="#route-notes"
              >
                Route notes
              </N.NavigationMenuLink>
            </N.NavigationMenuItem>
            <N.NavigationMenuIndicator />
          </N.NavigationMenuList>
        </N.NavigationMenu>
        <N.NavigationMenu viewport={false} aria-label="Inline route navigation">
          <N.NavigationMenuList>
            <N.NavigationMenuItem>
              <N.NavigationMenuTrigger>Travel guides</N.NavigationMenuTrigger>
              <N.NavigationMenuContent>
                <N.NavigationMenuLink href="#route-notes">
                  Read the trail guide
                </N.NavigationMenuLink>
              </N.NavigationMenuContent>
            </N.NavigationMenuItem>
          </N.NavigationMenuList>
        </N.NavigationMenu>
        <div
          id="route-notes"
          className="border-s ps-5 text-sm text-muted-foreground"
        >
          <p id="eastbank">Eastbank · ferries leave at dawn.</p>
          <p id="willowmere">Willowmere · a quiet route after rain.</p>
        </div>
      </section>
      <section id="hover-card" className="grid gap-5">
        <h2 className="font-heading text-2xl">
          Hover Card · optional route preview
        </h2>
        <H.HoverCard open={hover} onOpenChange={setHover} openDelay={150}>
          <H.HoverCardTrigger asChild>
            <a className="trav-control w-fit underline" href="#route-notes">
              Preview Eastbank
            </a>
          </H.HoverCardTrigger>
          <H.HoverCardContent>
            <p className="font-heading text-lg">Eastbank</p>
            <p>Ferries leave at dawn. Follow the river from the old bridge.</p>
          </H.HoverCardContent>
        </H.HoverCard>
        <p className="text-sm text-muted-foreground">
          This optional preview repeats visible route notes. Essential
          information and actions never depend on hover.
        </p>
      </section>
      <section id="sheet" className="grid gap-5">
        <h2 className="font-heading text-2xl">Sheet · notes beside the map</h2>
        <div className="flex flex-wrap gap-3">
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <S.Sheet
              key={side}
              open={sheet === side}
              onOpenChange={(open) => setSheet(open ? side : null)}
            >
              <S.SheetTrigger asChild>
                <Button variant="outline">Open sheet {side}</Button>
              </S.SheetTrigger>
              <S.SheetContent side={side}>
                <S.SheetHeader>
                  <S.SheetTitle>{side} route notes</S.SheetTitle>
                  <S.SheetDescription>
                    A scrollable side panel with native entry and a nested menu.
                  </S.SheetDescription>
                </S.SheetHeader>
                <div className="grid gap-4 px-5">
                  <Label htmlFor={`sheet-note-${side}`}>Sheet note</Label>
                  <Input
                    id={`sheet-note-${side}`}
                    defaultValue="Follow the river."
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Sheet actions</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => setResult("Sheet note pinned.")}
                      >
                        Pin sheet note
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Keep the bridge in sight. The river path remains open after
                    the rain. Long route descriptions wrap inside this bounded
                    panel.
                  </p>
                </div>
                <S.SheetFooter>
                  <S.SheetClose asChild>
                    <Button>Save sheet notes</Button>
                  </S.SheetClose>
                </S.SheetFooter>
              </S.SheetContent>
            </S.Sheet>
          ))}
        </div>
        <S.Sheet>
          <S.SheetTrigger asChild>
            <Button className="w-fit" variant="ghost">
              Open sheet without icon
            </Button>
          </S.SheetTrigger>
          <S.SheetContent showCloseButton={false}>
            <S.SheetHeader>
              <S.SheetTitle>Quiet route panel</S.SheetTitle>
              <S.SheetDescription>
                An explicit footer action dismisses this panel.
              </S.SheetDescription>
            </S.SheetHeader>
            <S.SheetFooter>
              <S.SheetClose asChild>
                <Button>Close quiet panel</Button>
              </S.SheetClose>
            </S.SheetFooter>
          </S.SheetContent>
        </S.Sheet>
      </section>
      <section id="drawer" className="grid gap-5">
        <h2 className="font-heading text-2xl">Drawer · preparation</h2>
        <div className="flex flex-wrap gap-3">
          {(["bottom", "top", "left", "right"] as const).map((direction) => (
            <D.Drawer
              key={direction}
              direction={direction}
              autoFocus
              {...(direction === "bottom"
                ? { open: drawerOpen, onOpenChange: setDrawerOpen }
                : {})}
            >
              <D.DrawerTrigger asChild>
                <Button variant="outline">Open drawer {direction}</Button>
              </D.DrawerTrigger>
              <D.DrawerContent>
                <D.DrawerHeader>
                  <D.DrawerTitle>{direction} preparation</D.DrawerTitle>
                  <D.DrawerDescription>
                    Review your supplies, then return to the map.
                  </D.DrawerDescription>
                </D.DrawerHeader>
                <div className="grid gap-4 px-5">
                  <Label htmlFor={`drawer-note-${direction}`}>
                    Drawer note
                  </Label>
                  <Input
                    id={`drawer-note-${direction}`}
                    defaultValue="Lantern, map and dry clothes."
                  />
                  <p className="text-sm text-muted-foreground">
                    Vaul keeps its drag, dismiss and input behavior. These
                    keyboard examples opt into autoFocus.
                  </p>
                </div>
                <D.DrawerFooter>
                  <D.DrawerClose asChild>
                    <Button>Finish preparation</Button>
                  </D.DrawerClose>
                </D.DrawerFooter>
              </D.DrawerContent>
            </D.Drawer>
          ))}
        </div>
      </section>
      <footer className="border-t pt-6 text-sm text-muted-foreground">
        Human screen-reader, real Safari/mobile and browser zoom QA remain
        pending.
      </footer>
    </main>
  )
}
createRoot(document.getElementById("root")!).render(<NavigationExamples />)
