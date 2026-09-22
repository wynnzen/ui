"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Command, CommandDialog, CommandInput, CommandList, CommandItem } from "@fixture/components/ui/command"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@fixture/components/ui/form"
import { FieldSet, FieldLegend, Field, FieldLabel } from "@fixture/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@fixture/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@fixture/components/ui/input-otp"
import { Avatar, AvatarFallback } from "@fixture/components/ui/avatar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@fixture/components/ui/breadcrumb"
import { ButtonGroup, ButtonGroupText } from "@fixture/components/ui/button-group"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@fixture/components/ui/empty"
import { Item, ItemContent, ItemTitle, ItemDescription } from "@fixture/components/ui/item"
import { Kbd } from "@fixture/components/ui/kbd"
import { NativeSelect, NativeSelectOption } from "@fixture/components/ui/native-select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@fixture/components/ui/pagination"
import { Slider } from "@fixture/components/ui/slider"
import { Toggle } from "@fixture/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@fixture/components/ui/toggle-group"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@fixture/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@fixture/components/ui/alert"
import { AspectRatio } from "@fixture/components/ui/aspect-ratio"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@fixture/components/ui/collapsible"
import { DirectionProvider } from "@fixture/components/ui/direction"
import { Skeleton } from "@fixture/components/ui/skeleton"
import { Spinner } from "@fixture/components/ui/spinner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@fixture/components/ui/alert-dialog"
import { Badge } from "@fixture/components/ui/badge"
import { Button } from "@fixture/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@fixture/components/ui/card"
import { Checkbox } from "@fixture/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@fixture/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@fixture/components/ui/dropdown-menu"
import { Input } from "@fixture/components/ui/input"
import { Label } from "@fixture/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@fixture/components/ui/popover"
import { Progress } from "@fixture/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@fixture/components/ui/radio-group"
import { ScrollArea } from "@fixture/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@fixture/components/ui/select"
import { Separator } from "@fixture/components/ui/separator"
import { Switch } from "@fixture/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@fixture/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@fixture/components/ui/tabs"
import { Textarea } from "@fixture/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@fixture/components/ui/tooltip"

export default function Consumer() {
  const [count, setCount] = useState(0)
  const profileForm = useForm({defaultValues:{nickname:""}})
  const [profile, setProfile] = useState("")
  const [commandsOpen, setCommandsOpen] = useState(false)
  const [place, setPlace] = useState("eastbank")
  return <TooltipProvider><main ref={(node) => { node?.setAttribute("data-hydrated", "true") }} className="mx-auto grid max-w-2xl gap-6 p-6"><h1 className="font-heading text-3xl">Traveler consumer</h1><Card><CardHeader><CardTitle>Ready for the road</CardTitle></CardHeader><CardContent className="grid gap-4"><Badge>Installed from the local registry</Badge><Button onClick={() => setCount(value=>value+1)}>Record progress</Button><output id="recorded-progress" role="status">Recorded {count}</output><Progress aria-label="Preparation" value={count} max={4} /><Label htmlFor="name">Traveler name</Label><Input id="name" defaultValue="Ari" /><Label htmlFor="notes">Journey notes</Label><Textarea id="notes" defaultValue="Follow the river." /><Label><Checkbox defaultChecked />Packed</Label><RadioGroup aria-label="Travel pace" defaultValue="steady"><Label><RadioGroupItem value="steady" />Steady</Label><Label><RadioGroupItem value="swift" />Swift</Label></RadioGroup><Label><Switch />Share itinerary</Label></CardContent></Card><Separator />
  <Dialog><DialogTrigger asChild><Button>Open journey</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Choose a destination</DialogTitle><DialogDescription>A themed Select inside a themed Dialog.</DialogDescription></DialogHeader><Label htmlFor="destination">Destination</Label><Select value={place} onValueChange={setPlace}><SelectTrigger id="destination"><SelectValue /></SelectTrigger><SelectContent position="popper"><SelectItem value="eastbank">Eastbank</SelectItem><SelectItem value="willowmere">Willowmere</SelectItem></SelectContent></Select></DialogContent></Dialog>
  <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Journey menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Open map</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
  <AlertDialog><AlertDialogTrigger asChild><Button variant="destructive">Archive</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Archive journey?</AlertDialogTitle><AlertDialogDescription>Your notes will remain available.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Confirm</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  <Popover><PopoverTrigger asChild><Button variant="outline">River conditions</Button></PopoverTrigger><PopoverContent aria-label="River conditions">Calm water at first light.</PopoverContent></Popover>
  <Tooltip><TooltipTrigger asChild><Button variant="ghost">Travel hint</Button></TooltipTrigger><TooltipContent>Bring a map.</TooltipContent></Tooltip>
  <Tabs defaultValue="journal"><TabsList aria-label="Sections"><TabsTrigger value="journal">Journal</TabsTrigger><TabsTrigger value="supplies">Supplies</TabsTrigger></TabsList><TabsContent value="journal">The ferry leaves at dawn.</TabsContent><TabsContent value="supplies">Lantern and map.</TabsContent></Tabs>
  <Table aria-label="Supplies"><TableHeader><TableRow><TableHead scope="col">Item</TableHead><TableHead scope="col">Quantity</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Map</TableCell><TableCell>1</TableCell></TableRow></TableBody></Table>
  <ScrollArea className="h-24 border" aria-label="Waypoints" role="region"><ol className="p-4 pe-6">{Array.from({length:12},(_,index)=><li key={index}>Waypoint {index+1}</li>)}</ol></ScrollArea>
  <DirectionProvider dir="ltr"><Accordion type="single" collapsible><AccordionItem value="route"><AccordionTrigger>Route notes</AccordionTrigger><AccordionContent>Installed disclosure content.</AccordionContent></AccordionItem></Accordion></DirectionProvider>
  <Collapsible><CollapsibleTrigger asChild><Button>Shelter details</Button></CollapsibleTrigger><CollapsibleContent>Installed collapsible content.</CollapsibleContent></Collapsible>
  <Alert><AlertTitle>Supplies ready</AlertTitle><AlertDescription>No required decorative assets.</AlertDescription></Alert>
  <AspectRatio ratio={16 / 9} className="border p-4">Reserved map area</AspectRatio>
  <Skeleton aria-hidden="true" className="h-4 w-48"/><Spinner aria-label="Loading route"/>
  <Avatar aria-label="Ari"><AvatarFallback>AR</AvatarFallback></Avatar>
  <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbPage>Consumer journal</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
  <ButtonGroup aria-label="Grouped actions"><ButtonGroupText>Notes</ButtonGroupText><Button variant="outline">Add note</Button></ButtonGroup>
  <Empty><EmptyHeader><EmptyTitle>No archived notes</EmptyTitle><EmptyDescription>Your current notes remain available.</EmptyDescription></EmptyHeader></Empty>
  <Item variant="outline"><ItemContent><ItemTitle>Old bridge route</ItemTitle><ItemDescription>Follow the stone road. <Kbd>Enter</Kbd> activates a focused control.</ItemDescription></ItemContent></Item>
  <Label htmlFor="terrain">Terrain</Label><NativeSelect id="terrain" defaultValue="road"><NativeSelectOption value="road">Road</NativeSelectOption><NativeSelectOption value="river">River</NativeSelectOption></NativeSelect>
  <Slider aria-label="Daily distance" defaultValue={[30]} step={5}/>
  <Toggle variant="outline">Pin route</Toggle>
  <ToggleGroup type="multiple" aria-label="Route layers"><ToggleGroupItem value="roads">Roads</ToggleGroupItem><ToggleGroupItem value="rivers">Rivers</ToggleGroupItem></ToggleGroup>
  <Pagination><PaginationContent><PaginationItem><PaginationLink href="#" isActive aria-label="Page 1">1</PaginationLink></PaginationItem></PaginationContent></Pagination>
  <Form {...profileForm}><form onSubmit={profileForm.handleSubmit(values=>setProfile(values.nickname))}><FormField control={profileForm.control} name="nickname" rules={{required:"Enter your profile name."}} render={({field})=><FormItem><FormLabel>Consumer profile name</FormLabel><FormControl><Input {...field}/></FormControl><FormDescription>Your public journey name.</FormDescription><FormMessage/></FormItem>}/><Button type="submit">Save consumer profile</Button><output id="consumer-profile" role="status">{profile}</output></form></Form>
  <FieldSet><FieldLegend>Consumer fields</FieldLegend><Field><FieldLabel htmlFor="consumer-summary">Consumer summary</FieldLabel><InputGroup><InputGroupAddon align="block-start"><InputGroupText>Summary addon</InputGroupText></InputGroupAddon><InputGroupTextarea id="consumer-summary" defaultValue="Follow the river."/></InputGroup></Field></FieldSet>
  <Label htmlFor="consumer-code">Consumer courier code</Label><InputOTP id="consumer-code" maxLength={4}><InputOTPGroup>{[0,1,2,3].map(index=><InputOTPSlot key={index} index={index}/>)}</InputOTPGroup></InputOTP>
  <Command label="Consumer inline commands"><CommandInput aria-label="Find consumer command"/><CommandList><CommandItem value="map">Open map</CommandItem></CommandList></Command>
  <Button onClick={()=>setCommandsOpen(true)}>Open consumer commands</Button><CommandDialog open={commandsOpen} onOpenChange={setCommandsOpen} title="Consumer commands" description="Search the installed command list."><CommandInput aria-label="Consumer modal search"/><CommandList><CommandItem value="eastbank" onSelect={()=>setCommandsOpen(false)}>Eastbank</CommandItem></CommandList></CommandDialog>
  </main></TooltipProvider>
}
