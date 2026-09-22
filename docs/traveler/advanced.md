# Advanced and conversational components

M5.5 adds ten pinned sources, bringing local coverage to 60 of 61. The Base UI
Combobox remains explicitly deferred by user decision. Every new export keeps
its pinned prop contract; no new primitive or styling provider was introduced.
Human release QA remains pending.

Run the production gallery at `/advanced.html` and `/conversation.html`.
The catalog links each component to its source and state evidence. Date Picker
and Data Table are compositions, not extra pinned upstream component files.

| Component        | Exercised states and composition                                                                                                                                                                                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calendar         | Single, multiple and range selection; controlled values, disabled days, outside days, today, month/year dropdowns, week numbers, keyboard selection and focus. Consumer `classNames`, components and formatters remain available. |
| Date Picker      | Calendar + Popover + Button; labeled trigger, disabled past dates, keyboard selection, Escape/focus return and a local-date hidden form value without UTC conversion.                                                             |
| Data Table       | Existing Table/Input/Checkbox/Button; sorting with `aria-sort`, filtering, row selection, empty/loading states and pagination. Six fictional records use native arrays; large data needs server filtering/paging.                 |
| Carousel         | Both axes, three slides, end-disabled controls, keyboard arrows, input caret handling and `setApi` selection updates. Options/plugins remain Embla's pinned API. No autoplay.                                                     |
| Chart            | Responsive grouped bars, keyboard tooltip, dot/line/dashed indicators, optional tooltip label and legend icons, theme colors, complete table and text alternatives. Animations are disabled in the example.                       |
| Resizable        | Horizontal/vertical panels, pointer handles, keyboard resizing, minimum sizes and a disabled Group. The v4 primitive owns layout and semantics.                                                                                   |
| Sonner           | Success/info/warning/error, persistent action/undo, loading-to-success update by ID, close/dismiss and reduced motion. Caller props, icons and toast options remain available.                                                    |
| Attachment       | All five states, three sizes, both orientations, icon/image media, full filenames, overlay button/link, independent remove/retry and disabled trigger. Native horizontal scrolling is named and keyboard focusable.               |
| Bubble           | All seven variants, both alignments, link/button composition, long CJK text and reactions at both edges. Destructive text explicitly describes the failure.                                                                       |
| Marker           | Default/separator/border, decorative icon, wrapping label and link composition.                                                                                                                                                   |
| Message          | Both alignments, avatar/header/content/footer and composed bubbles.                                                                                                                                                               |
| Message Scroller | Named native scroll region, initial end position, append while following, preserve earlier reading position, prepend, anchor jump, scroll buttons and all three hooks.                                                            |

## Wrapper changes

- Calendar uses opaque semantic colors and compact 36px day cells. Today is
  underlined; selected days/endpoints have weight and forced-color outlines.
  The two-dimensional calendar can scroll within its own focusable root at
  large text sizes. DayPicker still owns dates, selection and keyboard behavior.
- Carousel controls occupy a reserved footer inside its width. Keyboard capture
  invokes the consumer first, honors `preventDefault`, ignores editable targets,
  follows the chosen axis/RTL direction, and cleans up both Embla subscriptions.
  Prev/next jumps without animation when reduced motion is requested.
- Chart tick selectors match Recharts 3's actual markup. Keyboard outlines remain
  visible; tooltips use the shared panel and labels wrap. `hideIcon` now hides
  fallback swatches too; missing config labels fall back to the payload value.
  Five chart tokens alias existing approved colors. Color is supplemented by a
  complete data table. Chart config/IDs are developer-authored CSS, not an API for
  accepting untrusted strings; the upstream style injection contract is retained.
- Resizable handles have visible focus and a wider pointer area. Give the Group
  a bounded parent or explicit `style.height`; the primitive's inline `height:
100%` takes precedence over a utility height. `disabled` belongs on Group in
  pinned v4.5.8, not Separator.
- Sonner keeps its own notification lifecycle and next-themes integration, with
  explicit dark mode in the gallery. Actions and close controls are larger;
  reduced motion suppresses transitions/spinners. No theme provider is required
  by the Traveler foundation.
- Conversational wrappers use existing opaque tokens, logical alignment and
  full wrapping. Attachment triggers retain visible focus; unavailable shimmer,
  scroll-fade and scrollbar-hiding utility names were removed. Reaction controls
  need surrounding composition space. Static wrappers keep their server boundary.
- Message Scroller reuses `@shadcn/react/message-scroller` from the existing
  `@shadcn/react` package. Its button defaults to `behavior="auto"`; callers can
  explicitly request another behavior. Inactive buttons keep the primitive's
  inert/tab-order rules. There is no replacement scroll controller.

## Dependencies and verification

Registry metadata pins only actual imports: react-day-picker 9.8.1,
embla-carousel-react 8.5.2, recharts 3.8.0, react-resizable-panels 4.5.8,
sonner 2.0.7, next-themes 0.4.6 and @shadcn/react 0.3.1, alongside the existing
cn, CVA, Lucide and Radix packages. All are MIT licensed. Build the existing
workspace prerequisite with `pnpm --filter=@shadcn/react build` before the local
gallery; clean consumers use the published package through registry metadata.
No workspace dependency or lockfile change is required.

`tests/traveler/advanced.mjs` runs as part of the existing cross-engine browser
suite. The screenshot/axe review covers both pages at 320/768/1440px, 200% text,
Date Picker, empty/loading tables, keyboard chart tooltips, action toasts,
forced colors and the mobile transcript. Automated checks are not human AT,
real browser zoom, mobile hardware or Safari approval. See the recorded evidence
and the pending release worksheet.

Current API documentation was checked against the installed pinned types and
primary [Recharts accessibility docs](https://github.com/recharts/recharts/blob/main/storybook/stories/API/Accessibility.mdx),
[Sonner docs](https://github.com/emilkowalski/sonner),
[DayPicker docs](https://daypicker.dev/),
[Embla v8 docs](https://www.embla-carousel.com/api/methods/), and
[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels).
Latest documentation may describe newer versions; pinned imports/APIs govern.

The updated foundation measures 4,044 source bytes / 1,177 gzip bytes. The
isolated Button comparison remains free of other component modules: −52 gzip
JavaScript bytes and +256 gzip CSS bytes against the pinned baseline.
