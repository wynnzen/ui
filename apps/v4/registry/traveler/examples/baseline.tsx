import { createRoot } from "react-dom/client"

import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import { Input } from "@/registry/new-york-v4/ui/input"

import "@/app/globals.css"

createRoot(document.getElementById("root")!).render(
  <main className="mx-auto grid max-w-3xl gap-6">
    <h1 className="text-2xl font-semibold">Unmodified shadcn/ui baseline</h1>
    <p className="text-muted-foreground">
      Radix · new-york-v4 · React 19 · Tailwind 4
    </p>
    <div className="flex flex-wrap gap-3">
      <Button>Continue</Button>
      <Button variant="outline">Settings</Button>
      <Button variant="destructive">Delete save</Button>
      <Button disabled>Unavailable</Button>
      <Button asChild variant="link">
        <a href="#notes">Read notes</a>
      </Button>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Unchanged upstream panel</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <label htmlFor="baseline-name">Traveler name</label>
        <Input id="baseline-name" defaultValue="Ari Vale" />
      </CardContent>
    </Card>
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open baseline dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Baseline dialog</DialogTitle>
            <DialogDescription>
              Original Radix behavior in a separate document.
            </DialogDescription>
          </DialogHeader>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Baseline nested menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Choose destination</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Baseline menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Open journal</DropdownMenuItem>
          <DropdownMenuItem disabled>Unavailable</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <p id="notes">
      This document imports the pinned upstream source unchanged.
    </p>
  </main>
)
