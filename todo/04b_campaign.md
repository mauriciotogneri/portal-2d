# Stage 04b — Campaign

Status: Ready
Last revised: 2026-11-22

## Goal

The campaign grows to its full length: 20 handcrafted chambers in total, numbered 0–19 (stage 03's tutorial as chamber 0, chambers 1–3, and 16 new ones built around stage 04a's mechanics and the existing elements, six of them the teach and proof chambers stage 04a built with its mechanics, chambers 4–9, so 10 are left to make), in one list with no wings, with a catalogue, links and a Play menu that scale to that many, and an order set by playtests (the friends' analytics informing them). This stage and stage 04a were one stage until README decision 15 split them.

## Depends on

Stages 00, 01, 03 and 04a are done, and stage 02 stopped after its prototype (README decision 10).

**From stage 00 (fixes)**, done

- Completions and best times keyed by permanent id; analytics sending quits on tab close, an attempt counter and first-completion and new-best flags, collecting since 00 shipped (months of history by now); one local check command.

**From stage 01 (engine v2)**, done 2026-11-07

- Chamber format 2 with a version number, optional element lists and link groups (one button or switch driving a group). The upgrader from format 1 was removed (README decision 13).
- Replays and recorded solutions, and a local replay check.

**What stage 02 left** (stopped, README decision 10)

- No solvability check, no par from a solver, no shortcut finder, no dead-end warning and no generated chambers. Every chamber is proven solvable by its recorded solution.
- The solver check, `npm run solver:check`, which `npm run verify` runs on every chamber file (`docs/solver.md`). It fails when a chamber's state key needs more than 64 bits (decision 1): today's chambers need 18–53 (the tutorial 29, chambers 1–3 49–53, chambers 4–9 18–29). A box adds about 8 bits in a room the size of chambers 1–3, so a third box fits there and a fourth doesn't, and 6–7 bits in one the size of chambers 4–9. On a chamber with a receiver, which the macro search refuses since the subject cuts a ray by walking, it checks only the state key and skips the walk, shot, skip and region checks, saying why.

**From stage 03 (look and sound)**, done 2026-11-14

- The tutorial first in the list (permanent id 0), as chamber 0 (stage 03 settled that numbers count from 0). Links still follow position.
- Kept from stage 03's notes when its file was removed (2026-11-14):
  - Every chamber must fit the screen whole (`docs/level_design.md`, guideline 36): this stage's chambers stay within that, as does stage 05's grid cap.
  - The home menu's map doesn't redraw when only the pixel ratio changes (a window dragged to a denser screen without changing size), unlike the chamber screen.

**From stage 04a (mechanics)**, done 2026-11-20

- Slide floors, turnable arrows and rays (emitters, receivers and mirror boxes), each with its rules in `docs/elements.md`, its rule fixtures, and a teach and a proof chamber with recorded solutions, six chambers in all (4–9).
- The interaction table in `docs/elements.md`. No step may need the rules' cap of 32 settling passes: one that does throws, which fails every engine check that plays it (`docs/elements.md` argues why settling always ends). There is no separate oscillation warning.

## Decisions made

This stage's own decisions are numbered from 1. Stage 04a's, below them, keep their numbers and are cited as "04a decision N".

| # | Date | Decision |
|---|---|---|
| 1 | 2026-11-22 | The solver check keeps failing on a chamber whose state key needs more than 64 bits, instead of skipping and naming it as 04a decision 18 settled: that part was never built, today's chambers need at most 53 bits, and `docs/level_design.md` (guideline 11) already treats 64 bits as a limit. A chamber that needs more is redesigned, or this decision is revisited |

**Stage 04a's decisions.** Decisions 6–19 were made while this stage and stage 04a were one stage (README decision 15), so "this stage" and "here" in them mean both; 20 is 04a's own, cited by a chamber idea below. The rest of 04a's decisions settled the mechanics as built (now in `docs/elements.md`, `docs/sprites.md` and `docs/solver.md`); all of them, with what each was chosen over, are in git history in `todo/04a_mechanics.md` (removed 2026-11-20, README decision 17). Their wording uses today's names: an emitter's light is a ray, while "beam" is a laser's or a light barrier's.

| # | Date | Decision |
|---|---|---|
| 6 | 2026-11-08 | A mechanic's chambers go into the campaign in this same stage: its teach chamber and the rest of its run, as the campaign plan sets (replaces "a teach and a proof chamber per mechanic; full wings are stage 04's job"). Since README decision 15, this stage builds each mechanic's teach and proof chamber (R7), and stage 04b the rest of its run |
| 7 | 2026-11-06 | Chamber links (`/chamber/N`, by position) stay as they are until this stage picks the numbering scheme (README decision 4); stage 03 only made the count start at 0 for the tutorial. Settled by README decision 13: links stay by position, with no redirects |
| 10 | 2026-11-08 | The campaign is 20 chambers in total, numbered 0–19: the tutorial (0), chambers 1–3 and 16 new ones built here. No wings: one ordered list, with no wing manifest, wing menu level, wing unlocking, wing music or wing analytics parameter (replaces about 120 chambers in about 10 wings) |
| 13 | 2026-11-09 | The author is the only player during development, and a few friends play later (README decision 13): no compatibility work, so links stay by position with no redirect table, no retired-id list and no migration of stored progress. Difficulty from player data and the histogram are dropped, since a few friends are far below any useful sample: the chamber order comes from playtests, with the friends' analytics informing them. Analytics stays |
| 16 | 2026-11-15 | The campaign's new mechanics are slide floors, turnable arrows and rays, about 4 chambers each, with about 4 for the existing elements. Echo, timed buttons and push blocks are dropped from the plan, with their phases, the open decisions only they needed (echo, what counts as a tick) and their go/no-go points; their specs stay in git history (README open decision 3 settled). The phases and open decisions left were renumbered |
| 18 | 2026-11-15 | The other open decisions settled as recommended: lasers stay their own element; unfinished chambers go straight into the catalogue; a ray stops at the subject, which it leaves unharmed; a mirror box's angle is fixed in the chamber file; and the solver check skips, and names, each chamber it can't handle (built only for a chamber with a receiver; decision 1 keeps the failure on a key over 64 bits). With every open decision settled, the section was removed; their options stay in git history |
| 19 | 2026-11-15 | Loading chambers without a hand-kept list dropped: it would only save one import line per chamber, the play order stays a hand-typed list anyway, the engine scripts can't use Vite's loading and keep their own list, and TypeScript would stop checking each chamber file against the chamber type. Chambers stay imported by hand in `src/services/chamber_catalogue.ts`; the catalogue check stays |
| 20 | 2026-11-17 | The subject can walk into, stand in and cross a ray. A ray blocks nothing; it stops at the subject and leaves it unharmed (decision 18), so standing in a ray switches its receiver off until the subject steps out. Lasers stay the light that blocks walking, and a ray is only a signal, so the two differ in what they do, not only in colour. This replaces the draft rule that a ray blocks walking like a laser that is on. That rule repeated the lasers, and it came bundled with decision 18's option without being weighed on its own |

## Steps

### Campaign plan

Each mechanic, and each existing element the campaign teaches, gets a run of chambers: teach, test, twist and combine (`docs/level_design.md`, guidelines 40–42). With 16 new chambers for the whole campaign (04a decision 10), a full run doesn't fit, so the campaign takes three mechanics at about 4 chambers each (04a decision 16). Stage 04a built the first two of each mechanic's run, a teach and a proof chamber (chambers 4–9), so 10 new chambers are left to make.

The existing elements need chambers too (portal basics, boxes and buttons, doors and switches, blocked walls, light barriers and ditches, fizzlers, arrows, lasers); the tutorial (chamber 0) and chambers 1–3 already cover some of them. Blocked walls a link switches (already used in chambers 2 and 3) deserve a teach chamber of their own.

**Campaign plan table** (chamber counts set by 04a decision 16, each mechanic's including the two chambers stage 04a built; the teach notes filled in from the playtests, stage 04a's cold playtests first, then this stage's):

| # | Mechanic or element | New chambers | Teach notes (signage, confusion seen) |
|---|---|---|---|
| 1 | Existing elements | About 4 | — |
| 2 | Slide floors | About 4 | Chambers 4 (teach) and 5 (test), stage 04a's cold playtest of 2026-11-19: no confusion seen |
| 3 | Turnable arrows | About 4 | Chambers 6 (teach) and 7 (twist), stage 04a's cold playtest of 2026-11-19: no confusion seen |
| 4 | Rays | About 4 | Chambers 8 (teach) and 9 (test), stage 04a's cold playtest of 2026-11-20: liked, no confusion reported |
| 5 | Total | 16 (20 with chambers 0–3) | |

**Chambers built by stage 04a** (each mechanic's first two, from layouts the author approved; what designing them taught became guidelines 26 and 28–30 in `docs/level_design.md`):

| # | Chamber | Mechanic, part | What it asks | Best routes (moves, portals) |
|---|---|---|---|---|
| 1 | 4 | Slide floors, teach | The first step slides across a slide room to a ledge, from which a portal is aimed across a ditch at the far end of the exit lane; the slide out of it stops under the exit | Fewest portals: 2 portals |
| 2 | 5 | Slide floors, test | The same move twice, where the second lane is entered only by sliding back into the portal just come out of, so the other portal is the one to move | Both: 3 portals |
| 3 | 6 | Turnable arrows, teach (10 × 7) | The start room's way out is a gate arrow pointing into the wall until the switch, with an antline to it, turns it for good, onto a run of fixed arrows to the exit | Both: 12 moves, 0 portals |
| 4 | 7 | Turnable arrows, twist (10 × 9) | Standing on the button beside the arrow turns it; stepping onto it releases the button, so it turns back under the subject and sends it into a lower corridor, whose exit door needs the box on its own button. Neither 6 nor 7 can be solved with the links to its turnable arrow removed | Fewest portals: 25 moves, 0 portals; fewest moves: 13 moves, 4 portals |
| 5 | 8 | Rays, teach (9 × 7) | A portal pair through a stub sends the emitter's ray to a receiver in the right wall, which opens the exit | Fewest portals: 15 moves, 2 portals; fewest moves: 10 moves, 3 portals |
| 6 | 9 | Rays, test (9 × 7) | The same room: the receiver is in the bottom wall, so the ray must come down from a portal on the ceiling, where chamber 8's answer only runs it into the right wall | Fewest portals: 14 moves, 2 portals; fewest moves: 11 moves, 3 portals |

Neither ray chamber uses the mirror box; this stage's combine chamber is the first to need it.

**Chamber ideas left by stage 04a** (its slide floor phase built the teach and test chambers, its turnable arrow phase the teach and twist, its ray phase the teach and test):

| # | Mechanic | Part | Idea |
|---|---|---|---|
| 1 | Slide floors | Twist | An active fizzler on the slide path wipes your portals mid-slide, so the portal you were aiming for is gone |
| 2 | Slide floors | Combine | Carry a box across slides and through a portal to a button you can only reach by sliding |
| 3 | Turnable arrows | Test | An arrow held turned by a button you must put a box on |
| 4 | Turnable arrows | Combine | Arrows that change where a slide ends |
| 5 | Rays | Twist | The ray that holds the exit door open crosses the tile in front of the door, so stepping there cuts the ray and shuts the door in your face. You must route the ray so it crosses your path somewhere else (04a decision 20) |
| 6 | Rays | Combine | Carry a mirror box through portals to bend a ray onto a receiver behind a fizzler (the box resets if you carry it through) |

### Phase 0 — Ready the stage

- [x] **Revisit.** Re-read stage 04a's mechanics and chambers as built, and the catalogue, the router and the home menu as they are then. Rename everything in this file to their real names; set the status to Ready. Done 2026-11-22: names updated, and the solver check, the local checks, the Play menu, the catalogue check, the progress step and the authoring workflow brought in line with the code; decision 1 added.

### Phase 1 — Catalogue and links that scale

- [ ] **Catalogue check.** Today the engine scripts fail on a chamber file missing from their own list (`scripts/chamber_files.ts`), and the replay check fails on a listed chamber with no recorded solution. Nothing compares the scripts' list with the game's play order (`src/services/chamber_catalogue.ts`), a duplicate id is only logged in development, and nothing checks that the chamber with id N is the file `chamber_N.json` (Download solution names its file by id). Add a local check that every chamber file appears in the play order exactly once, ids are unique, and each id matches its chamber's file. Verify: break each rule once on purpose and the check fails.
- [ ] **Numbering and links** (04a decision 7, settled by README decision 13). Links stay by position (`/chamber/N`): the route in `src/router.ts` doesn't change, and there is no redirect table; unknown chambers still fall back home. Verify: in `npm run preview`, the first and the last number open their chambers and an unknown one goes home.
- [ ] **Progress follows the chamber.** Progress is already keyed by id (00); links follow position, as today. The last chamber, which the home menu highlights on the way back, is kept by position in memory only, and a reorder needs a reload, which forgets it, so it has nothing to follow. Verify: reorder two chambers in the play order locally; their completions and best times follow them.
- [ ] **Analytics stays comparable.** `chamber_number` keeps meaning the position in the list (0 for the tutorial, then 1, 2, 3…), like the links (04a decision 7), and `chamber_id` follows the chamber across reorders; no new parameter is needed. Verify: a production preview build sends the position as `chamber_number` (GA4 DebugView).

### Phase 2 — A Play menu that scales

- [ ] **Design the scrolling chamber list** (uses the frontend-design skill). Today the home menu has up to three columns (sections, rows, detail). No column scrolls on its own, but the whole page does, and the keyboard's highlight scrolls it to the row. Ten chamber rows fit a 1080p window; twenty need about 1,200 px for the list alone (60 px a row, under the logo), and in development the Playground row pushes the list down one row more. So the chamber column scrolls, with the map staying in the third column. It must keep the keyboard model in `AGENTS.md` (Up/Down within a column with wrapping, Right/Enter steps in, Left/Escape steps back, one Tab stop per column, hover highlights, held Enter ignored), and leave room for stage 05's Editor entry. Verify: the design is written down here before building.
- [ ] **Build the scrolling chamber list** (uses the frontend-design skill). The highlighted row scrolls into view, the cascade still lines up with `--menu-row-height`, and interface sounds play as `AGENTS.md` lists. Verify: keyboard-only and pointer-only walks through all 20 chambers, wrapping from the last to the first; `prefers-reduced-motion` respected.
- [ ] **Back from a chamber.** Play opens with that chamber highlighted, focused and scrolled into view, as today. Verify: back from the first, a middle and the last chamber.
- [ ] **Update `AGENTS.md`.** Keyboard ownership, the layout description and the UI direction for the new menu.

### Phase 3 — Campaign content

- [ ] **Chamber plan.** List the 10 new chambers left to make in this file, in play order together with chambers 0–9, each with its mechanic or element and its part (teach, test, twist or combine), following the campaign plan table and 04a decision 16. Starting order: the existing elements first, then the new mechanics in the order built. Later reorders follow playtests, with the friends' analytics informing them, and the ordering guideline (`docs/level_design.md`, guideline 43). Verify: every mechanic stage 04a shipped has chambers or a recorded reason it doesn't, and the total is 20.
- [ ] **Authoring workflow before the editor.** Until stage 05's editor exists: hand-write the chamber file in format 2. Today the only development-only chamber route is the playground's, and saving a chamber file reloads the whole page, through the loading screen and Start (read from the code, not tried). Add a development-only route (behind `import.meta.env.DEV`, never in production builds) that loads a chamber file from disk and reloads on save; record the solution by completing the chamber in `npm run dev` and pressing Download solution in the completion dialog; tick a per-chamber checklist (`docs/level_design.md`, guidelines 37 and 39). Verify: one chamber goes through the whole workflow; a production build has no development route.
- [ ] **Place chambers 0–9 in the campaign.** The tutorial, chambers 1–3 and stage 04a's chambers keep permanent ids 0–9 wherever the plan puts them; their links follow their new places. Verify: their completions and best times survive.
- [ ] **Author release 1** (3–4 new chambers; each release ships with a changelog entry in `src/services/changelog.ts`, and release 1's also covers stage 04a's mechanics and chambers 4–9, which have none yet). Verify: `npm run verify` and the catalogue check pass; playtested.
- [ ] **Author release 2.** Same checks.
- [ ] **Author release 3.** Same checks; the campaign reaches 20 chambers.

### Phase 4 — Wrap-up

- [ ] **Campaign plan table.** Fill in its teach notes with real results from the playtests. Verify: every row the plan keeps is filled in.
- [ ] **Docs.** `AGENTS.md` (keyboard model, layout, and chamber numbering and links) and the changelog match what shipped.
- [ ] **README.** Update the stage status and record any new decisions.
- [ ] **Status.** Set this file to Done once every *Done when* box is ticked.

## Local checks added

- Catalogue check: every chamber file in the play order exactly once, ids unique, each id matching its chamber's file (the replay check already requires a recorded solution for every chamber).

## Done when

- [ ] The campaign plan table is filled in.
- [ ] 20 chambers ship, numbered 0–19, each with a recorded solution, with `npm run verify` and the catalogue check passing.
- [ ] Progress and best times follow chambers after a reorder.
- [ ] The scrolling Play menu works fully by keyboard and by pointer, and `AGENTS.md` describes it.
- [ ] Local checks pass: every chamber replays with its expected outcome, and no step reaches the rules' cap of 32 settling passes.
- [ ] AGENTS.md and `todo/README.md` are up to date.

## Go/no-go points

None: stage 04's two go/no-go points, the hook check and ray oscillation, were about the mechanics, and stage 04a closed both.

## Risks

- **Mechanics barely used.** With 16 new chambers, each mechanic gets about 4 (04a decision 16), so a full run doesn't fit; a combine chamber can serve two at once.
- **Content volume.** The new chambers are most of this stage's work. Ship them in small releases, so the game grows instead of waiting.
- **Reordering surprises players.** Display numbers and links change after a reorder, which friends will see. Progress is safe (keyed by id); say what changed in the changelog.

## Notes for later stages

- **Stage 05:** the editor reuses the chamber format, Download solution and the per-chamber authoring checklist.
- **Stage 05:** campaign links stay by position (README decision 13); any new route needs a no-cache header in `firebase.json`.
- Notes (filled in during this stage): the campaign plan table, the chamber plan and the Play menu design.
