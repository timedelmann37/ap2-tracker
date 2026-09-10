# UI Reference Lock — Programa surfaces, current Attio typography and navigation

Stand: 2026-09-10. The user explicitly chose the current Attio fonts (not Gilroy
from the older screenshot), navigation motion, readable status text and plain German.
Programa's existing colors and surfaces remain; this is not another layout redesign.

## Current override: Attio and readability

- Live source: https://attio.com/; inspected with the user's crawler and a browser.
- Exact capture: `attio.com_2026-09-10_20-13-21` in the local visualization reference folder.
- Live headings use Inter Display 600; secondary headings use 500. UI uses Inter
  400/500/600. Use those original open-source font files locally, with `ss03`.
- Tiempos exists in the source but is not the current hero font. It is not needed
  for AP2's working interface. The historical Refero style's serif prescription
  and the previous Rhymes/Roboto Mono choices are superseded.
- Remove monospace styling from every status/plan line. Status text is 14 px,
  normal tracking, 1.6 line-height, with separated facts that wrap on mobile.
- Navigation hover: 50 ms entry, 300 ms exit, cubic-bezier(.2,0,0,1).
  Dropdown: desktop hover and click, 150 ms opacity and -4px to 0 translation
  with cubic-bezier(.65,0,.35,1). A 140 ms close delay bridges the popover gap.
  Retain AP2's three destinations; no mega-menu.
- Keyboard, outside-click dismissal, interruption and Reduced Motion work.
  Theme color changes remain immediate; hover color animation is paused on a
  theme change so no mixed-theme states are introduced.
- Copy: describe actual actions and status. Remove slogans and phrases such as
  “Fortschrittsbild”, “Zeitverlauf” and “Alles an einem Ort”. Preserve curriculum,
  dates, storage keys, and `Bereich > Themengruppe > Kernthema`.

## Brief and sources

Apply the supplied background, palette, shadows, fonts and simple interactions to
the five AP2 pages. Preserve learning content, navigation, progress storage, optional
cloud sync and `Bereich > Themengruppe > Kernthema`. Simulation is outside this pass.

- Primary visual authority: [user-selected Programa screen](https://refero.design/pages/5ac321a6-20c8-4844-ad74-b47c209b398a).
- Verified original: [Programa Client Dashboard](https://programa.design/features/client-dashboard-for-designers-and-architects).
- Refero research: exact screen metadata and screenshot; Programa style record
  `69987cc6-447d-4c32-a5d1-7cc9d627c40d`. The style record's sans-only headings
  describe another surface; the user's actual serif screenshot wins.
- Programa originally supplied the typography too. The later explicit choice
  of current Attio fonts supersedes that choice, including all status labels.

## Decision ledger

| Decision | Adopt | AP2 translation / reject |
| --- | --- | --- |
| Background | White canvas, warm off-white work surfaces | Remove full-page dot grid and exterior app frame |
| Typography | Current Attio Inter Display + Inter | Readable sans status text; no mono, no historical Gilroy or serif |
| Color | Near-black ink, warm gray metadata, pale yellow highlight | Yellow for the next action/today; green remains completion |
| Depth | Fine neutral borders, small radii, shallow soft shadows | Real learning panels, no fake browser traffic lights |
| Rhythm | Generous title space, compact working panels | Weekly action visible sooner than the prior oversized hero |
| Interaction | Small, direct hover/press response | No floating decoration, scroll effects or delayed theme fade |
| Theme | Same surface hierarchy in warm charcoal | Every click inverts visible mode; persist across all five pages |

## Assets and scope

Source fonts are locally served; see `assets/fonts/SOURCES.md` for source and
licensing notes. Existing Camera Plain is retained unused for the earlier branch work.
No third-party logos, product photos or testimonial content are copied.

The original screenshot is light-only. Dark colors are an AP2 adaptation, not
an assertion about Programa's dark mode. Outline icons retain their semantic roles,
with smaller neutral tiles and matching control geometry.

## Acceptance

- Compare desktop/mobile screenshots against the supplied reference character.
- Verify fonts loaded, no horizontal overflow, readable light/dark controls.
- Verify immediate click inversion from both OS defaults, repeated clicks,
  navigation, reload, cross-tab changes and keyboard activation.
- Exercise search, topic expansion and progress without touching user data.
