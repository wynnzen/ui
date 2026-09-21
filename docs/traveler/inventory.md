# Inventory and catalog

`/inventory.html` combines Card, Badge, Checkbox, Progress, Table and Scroll Area
with fictional supplies. `/catalog.html` searches the frozen 61-entry inventory
by component/export and displays exact component source, coverage and theme CSS.
The catalog imports canonical source as raw text; it is not a second source copy.

| Component   | Applicable states                                                         | Boundaries                                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Progress    | Zero, intermediate, complete, custom maximum, indeterminate               | Supply a name. Indeterminate omits `aria-valuenow` and shows a static partial marker, without implying a numeric value. It is not interactive; hover/focus/disabled/invalid/read-only do not apply. |
| Table       | All semantic parts, hover, consumer-selected rows, numeric alignment      | Data/selection/sorting are consumer-owned. The wrapper is a named keyboard-focusable horizontal scroll region. No new sorting/filtering API.                                                        |
| Scroll Area | Vertical/horizontal, existing visibility modes, thumb/track/corner, focus | Focus the viewport for native arrow/End scrolling. The 24px track contains an 8px thumb. Reflow waits for Radix's resize measurement.                                                               |

Two deliberate accessibility changes are separate from styling:

- Progress now forwards `value` to Radix. The pinned wrapper dropped it, so the
  accessible state always reported indeterminate even when a fill was shown.
  Its visual percentage now respects `max`; the primitive still owns validation.
- Table's scrolling wrapper and Scroll Area's viewport receive keyboard focus.
  The native browser handles scrolling; no key interception or focus manager
  was added. Scroll Area also sets `min-width: 0` to shrink within grid tracks.

The browser check verifies progress values and fill agreement, checkbox changes,
completion/zero/indeterminate states, vertical and horizontal keyboard scrolling,
search by an exported part, exact source viewing and a no-results search. All
three viewport widths are included in review. See [compatibility](compatibility.md)
for measured results and outstanding release checks.
