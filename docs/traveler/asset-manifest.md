# Asset and notice record

The MVP contains no game assets, scenic background, texture files, audio, downloaded
font or proprietary branding. “Traveler UI” and `@traveler` are provisional;
public naming and rights review remain release tasks.

| Material                                                         | Origin                                                       | Handling                                                                                                                           |
| ---------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Component source                                                 | Pinned shadcn/ui; MIT                                        | Full upstream notice retained in repository root and `registry/traveler/LICENSE.md`; included with the verified foundation payload |
| Token palette, CSS frames, diamond marker and fictional copy     | Original implementation of the provided brief                | Source in `registry/traveler`; no external asset request                                                                           |
| Check, minus, radio, chevron, close, bookmark and compass glyphs | Existing lucide-react 0.474.0; package metadata declares ISC | Existing dependency, no extracted game icons; retain upstream package notices                                                      |
| Review PNGs                                                      | Original screenshots of this prototype                       | Documentation evidence only, not installed component assets                                                                        |
| Body and heading fonts                                           | Consumer OS stacks                                           | Not bundled or downloaded; no font redistribution claim                                                                            |

Other prototype dependencies retain their own notices: Radix and `cn` declare
MIT; class-variance-authority declares Apache-2.0; React declares MIT. This table
records inspected package metadata and is not a complete future release audit.
The original shadcn MIT text is copied without modification. The development registry items
contain only component source, foundation CSS and that notice. No gallery PNG,
font or scenic asset is included. Final public-name/rights review is still required.

M5.2 adds an original inline SVG diamond emblem in `examples/content.tsx` solely
to exercise Avatar/Item image rendering. No component or registry payload requires
this example asset; no external image or font request was added.

M5.3 package metadata declares MIT for cmdk 1.1.1, input-otp 1.4.2 and
react-hook-form 7.62.0. Their original notices remain with the dependencies.

M5.4 uses the already-pinned Vaul 1.1.2 dependency, whose package metadata
declares MIT. No new visual or font asset is required.
