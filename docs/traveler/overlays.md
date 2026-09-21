# Navigation and overlays

Preview: `/overlays.html`. Source: `apps/v4/registry/traveler/ui`.
All exported parts and prop types remain bidirectionally compatible with the
pinned Radix baseline. Alert Dialog's Button dependency points to Traveler.

| Component    | Applicable examples/states                                                                                                                                                         | Keyboard and composition                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Select       | Controlled/default, placeholder, disabled/invalid, default/small trigger, item-aligned/popper, groups, separators, selected/highlighted/disabled items, long content and scrolling | Arrows, typeahead, Enter, Escape; native form values; nested inside Dialog                                 |
| Tabs         | Both list variants and orientations; controlled/default; active/inactive/disabled                                                                                                  | Automatic activation and manual Enter/Space activation; roving focus skips disabled tabs                   |
| Alert Dialog | Controlled/uncontrolled, default/small, media, title/description and action/cancel                                                                                                 | Cancel receives initial focus; Tab is contained; Escape dismisses; outside pointer does not dismiss        |
| Popover      | Controlled/uncontrolled, anchor, start alignment/top placement, editable content and contextual text                                                                               | Focus enters the first control; Escape and save restore trigger focus; collision handling stays with Radix |
| Tooltip      | Provider, composed trigger, supplementary text, side/offset                                                                                                                        | Hover and keyboard focus reveal; Escape dismisses without moving focus                                     |

Selection uses a stable check/active rule; focus uses a separate outline. Popups
are opaque, document-root themed, and bounded by available viewport space. No
additional positioning or animation library is introduced. Hover and disabled
states use existing primitives. Read-only and busy are not newly invented props;
loading can be composed with consumer-owned announcements when needed.

The examples provide labels and descriptions. Tooltip content is supplementary;
never put the only instructions there. PopoverTitle retains the baseline div
rendering, so explicitly connect its ID with the content's `aria-labelledby`.

The pinned [Radix Alert Dialog documentation](https://www.radix-ui.com/primitives/docs/components/alert-dialog)
confirms Escape dismissal and return to the trigger. An outside pointer can blur
to body without dismissing; Tab re-enters the alert's focus trap, which is tested.
The baseline owns that behavior; this theme adds no global keyboard handlers.

See [compatibility](compatibility.md) for measured browser/accessibility results,
including inherited findings and outstanding assistive-technology review.
