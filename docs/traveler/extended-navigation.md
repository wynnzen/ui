# Extended navigation and overlays (M5.4)

The [navigation fixture](http://127.0.0.1:4173/extended-navigation.html) and
[Sidebar fixture](http://127.0.0.1:4173/sidebar.html) add seven pinned APIs.
Every export and public prop still type-checks in both directions. All use the
approved semantic palette; there is no new styling runtime or shared theme rule.

| Component       | Covered states and behavior                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Context Menu    | Pointer and keyboard opening, grouped/default/destructive/disabled items, mixed checkbox, radio submenu, labels/shortcut/separators and focus return            |
| Menubar         | Controlled menus, arrow navigation, disabled trigger/item, submenu, checkbox/radio values and actions                                                           |
| Navigation Menu | Links/current state, trigger style export, indicators, default viewport and inline content, keyboard entry/exit                                                 |
| Hover Card      | Controlled preview, focus/hover and dismissal; optional text repeats permanently available information                                                          |
| Sheet           | Four sides, controlled/uncontrolled, close-icon option, native entry, nested Dropdown Menu, Escape and focus return                                             |
| Drawer          | Four directions, controlled/uncontrolled, keyboard focus and close, bounded native scrolling and reduced motion; underlying Vaul behavior retained              |
| Sidebar         | Three variants, both sides, offcanvas/icon/none, all parts and menu sizes, active/disabled actions, controlled state, shortcut/cookie, desktop and mobile Sheet |

ContextMenuTrigger bridges the standard ContextMenu/Shift+F10 keys to Radix's
existing contextmenu handler because Firefox automation does not emit the native
mouse event. Consumer key handlers run first and may prevent it. It adds no focus
manager. Mixed checkboxes use a dash, matching the existing Dropdown Menu.

Drawer uses the existing **Vaul 1.1.2** (MIT) dependency. Its body scrolls in an inner flex container so Vaul's decorative overscroll
pseudo-element cannot cover the footer. The root keeps that primitive surface
because Vaul uses its geometry for drag eligibility on a scrolled document.
The 320×360 fixture covers footer hit testing; a pointer gesture checks dismissal
after the primitive's 500ms open guard and text-selection protection. Keyboard examples explicitly opt into
Vaul's `autoFocus`; its default and consumer settings remain unchanged. Physical
touch, on-screen keyboards and real Safari remain pending release checks.

Sidebar's mobile Sheet restores the opening control through Radix focus callbacks
because its trigger lives outside that Sheet root. Desktop offcanvas content is
`inert` when closed; icon mode retains accessible link names. Header input and
loading text hide in icon mode. Right-side layout reserves space on the right,
and separators respect their horizontal width override. Skeleton width is fixed
at 70% to avoid server/client random-markup disagreement. The existing seven-day
`sidebar_state` cookie and Ctrl/Meta B shortcut are preserved; the host owns cookie
restoration. A noncollapsible host explicitly stacks its layout at mobile widths.

The unchanged 768px `use-mobile` hook is a separate `registry:hook` dependency.
Its source hash is recorded, and clean consumers verify their custom hook alias.
No upstream source, CLI or workspace lockfile is modified.

Automated review retains the baseline-matched Context Menu background and
Navigation Menu hidden focus-proxy `aria-hidden-focus` findings. Those join the
earlier menu/Select/empty-cmdk findings in the human review queue. They are not
silently disabled, resolved by keyboard automation or represented as clean scans.
Human screen-reader, real Safari/mobile, browser zoom and release approval remain
pending by user instruction. Combobox remains explicitly deferred.
