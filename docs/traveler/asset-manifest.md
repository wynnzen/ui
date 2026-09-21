# Asset and notice record

M1 contains no game assets, scenic background, texture files, audio, downloaded
font or proprietary branding. “Traveler UI” and `@traveler` are provisional;
public naming and rights review remain release tasks.

| Material                                                         | Origin                                                       | Handling                                                                                                                |
| ---------------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Component source                                                 | Pinned shadcn/ui; MIT                                        | Full upstream notice retained in repository root and `registry/traveler/LICENSE.md`; include with M3 foundation payload |
| Token palette, CSS frames, diamond marker and fictional copy     | Original implementation of the provided brief                | Source in `registry/traveler`; no external asset request                                                                |
| Check, minus, radio, chevron, close, bookmark and compass glyphs | Existing lucide-react 0.474.0; package metadata declares ISC | Existing dependency, no extracted game icons; retain upstream package notices                                           |
| Review PNGs                                                      | Original screenshots of this prototype                       | Documentation evidence only, not installed component assets                                                             |
| Body and heading fonts                                           | Consumer OS stacks                                           | Not bundled or downloaded; no font redistribution claim                                                                 |

Other prototype dependencies retain their own notices: Radix and `cn` declare
MIT; class-variance-authority declares Apache-2.0; React declares MIT. This table
records inspected package metadata and is not a complete future release audit.
The original shadcn MIT text is copied without modification. Review actual M3
payloads and any subsequently added assets before publication.
