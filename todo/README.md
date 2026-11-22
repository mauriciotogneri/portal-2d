# Roadmap

> This folder is the author's plan, not work for agents. See `AGENTS.md`: build nothing from it unless asked, and only tick a checkbox for a step you were asked to do and finished.

## How these files work

- Stages are done **in order**. Each stage depends only on stages before it, so by the time a stage starts, everything it needs is already built.
- Every stage is written in as much detail as possible now, then **revisited right before it starts** (re-read against the code as it is then, update, set the status to Ready).
- Status values: **Draft** (written ahead, expect changes), **Ready** (revisited, safe to start), **In progress**, **Done**, **Stopped** (ended early by one of its go/no-go points).
- Steps are checkboxes. Tick one when it is implemented **and** verified. Each step is small enough to finish and check in one sitting.
- Each stage ends with a **Done when** checklist (the stage is finished only when every box is ticked) and **Go/no-go points** (results that change later plans).
- The engineering backbone (originally stage 7) is not a stage: its local checks are steps inside each stage, growing as the game grows. Everything runs locally on demand; there is no cloud CI.

## Files

| # | File | Status | Contents |
|---|---|---|---|
| 1 | `00_fixes.md` (file removed) | Done | Records keyed by permanent id (one-time migration, chamber number taken from list order), high-DPI blur fix, missing analytics events, first local check command |
| 2 | `01_engine_v2.md` (file removed) | Done | Sounds out of the rules, engine runnable without a browser, replays on today's engine, recorded solutions and a local replay check, input rewrite (remappable keys), v2 rules and chamber format, the three inherited bugs fixed, v2 checked against the old rules, old engine deleted |
| 3 | `02_solver.md` (file removed; see `docs/solver.md`) | Stopped | Solver prototype on the current chambers (go/no-go: no-go on 2026-11-08, decision 10); the rest was dropped: solvability and par in the local checks, shortcut finder, dead-end warning, hints, generated chambers |
| 4 | `03_look_and_sound.md` (file removed) | Done | Visual rework, one tutorial chamber (chamber 0) |
| 5 | `04a_mechanics.md` (file removed, decision 17) | Done | Slide floors, turnable arrows and rays (emitters, receivers and mirror boxes, the "live lasers" of decisions 14 to 16), each with a teach and a proof chamber |
| 6 | `04b_campaign.md` | Ready | The campaign completed at 20 chambers, a menu and catalogue that scale, chamber numbering and links |
| 7 | `05_creator_platform.md` | Draft | Editor, sharing in the link, share only what you solved |
| 8 | `future.md` | — | Not a stage: ideas for mechanics beyond the plan, and how a mechanic was built (kept from stage 04a) |

## The idea

The moonshot isn't "more chambers". It is turning the rules into a pure function — *current state + one keypress → next state* — with the frame loop only animating and drawing. Once that exists, five things become possible: a solver that understands every chamber, replays, an editor, a daily puzzle, and leaderboards that can be verified by re-running a replay. (Replays exist since stage 01 and the editor is planned in stage 05; the solver stopped at its prototype (decision 10); leaderboards went with ranked runs and Stage B (decisions 13 and 14), and no stage plans a daily puzzle.) Almost everything in stages 02–05 hangs off stage 01.

Two existing facts make this realistic: the rules never read the frame time, and `src/game/` is already walled off from Vue (enforced by lint).

## Where it started

The code as found on 2026-11-06, before stage 00 (three chambers, the old engine with its inherited bugs, no checks), was written up here as each stage's starting point. Stages 00 to 04a have since replaced nearly all of it, so it was removed on 2026-11-21; it is in git history. Each stage is re-read against the code as it is when it is revisited.

## Decisions made

| # | Date | Decision |
|---|---|---|
| 1 | 2026-11-06 | `00_fixes.md` holds records by id (with migration), the blur fix and the analytics events. The rule bugs wait for stage 01, because rules are frozen until v2 |
| 2 | 2026-11-06 | The original stage 6 is split: remappable keys and gamepad go to stage 01's input rewrite; colour-blind palettes and relaxed mode go to stage 04 |
| 3 | 2026-11-06 | Today's rules become a **reference only**: v2 is checked against them on every recorded solution (except intended fixes), then the old engine is deleted. All chambers run on v2, with the fixes |
| 4 | 2026-11-06 | Chamber links (`/chamber/N`) stay by position until stage 04, which decides the numbering scheme |
| 5 | 2026-11-06 | `TODO.md` deleted: its two ideas are planned in stage 04 (tutorial chambers) and stage 05 (uploaded chambers with name, author, date, rating and thumbnail) |
| 6 | 2026-11-06 | The engineering backbone is woven into every stage as local tools, run on demand. No cloud CI |
| 7 | 2026-11-06 | Every stage is detailed now and revisited right before it starts |
| 8 | 2026-11-06 | Moves count every step taken (open decision 1's counting half, settled in stage 01); how ranked runs are judged waits for stage 04 |
| 9 | 2026-11-07 | No gamepad support: stage 01's gamepad bridge (its step D8) is dropped and no stage plans it |
| 10 | 2026-11-08 | Stage 02 stops after phase A (its go/no-go 1): the solver can't prove the current chambers solvable within 60 s each. With every pruning built, chamber 3 takes 110 s and chambers 1 and 2 give up after 10 minutes, past 6 million states each. Dropped: solvability and par checks, par in chamber files, the shortcut report, hints and the dead-end warning, solver difficulty metrics (open decision 2 settled: difficulty from measured clear rates) and generated chambers. Stage 03 keeps new mechanics small and relies on recorded solutions; stage 05's "publish only what you solved" relies on the creator's replay alone, with no par. Stages 03–05 must take this in when revisited. What the stage learned, and what a revisit would start from, is in `docs/solver.md` |
| 11 | 2026-11-08 | Stages 03 and 04 swap. Identity, look and sound come first (now stage 03, `03_identity_look_sound.md`) and add only a tutorial chamber, numbered 0 (chamber numbers count from 0), so chambers 1–3 keep their numbers and links. Mechanics and the rest of the campaign follow (now stage 04, `04_mechanics_campaign.md`), with the catalogue, menu and links that scale, difficulty from data and medals. The campaign has 20 chambers in total (0–19), with no wings. All seven mechanics stay in the plan; how they fit is settled when stage 04 is revisited. Stage 04 later dropped conveyors (its decision 15), then echo, timed buttons and push blocks (its decision 16), leaving three. In decisions 1–10, "stage 03" means the mechanics stage and "stage 04" the campaign, identity, look and sound stage |
| 12 | 2026-11-08 | A private fan game: played only by the author and a few friends, never published on Steam or any other platform. It stays "Portal 2D" with Valve's name, logo and assets (open decision 5 settled), so stage 03 drops all identity work and becomes "Look and sound" (`03_look_and_sound.md`). Stage 03 also drops the colour-blind palettes, portal shapes and relaxed mode, the camera (every chamber fits the screen) and preview deploys; the renderer stays on the 2D canvas unless stage 03's profiling shows it can't hold 60 fps (open decision 4 settled). Stages 04 and 05 were updated to match |
| 13 | 2026-11-09 | The author is the only player during development; a few friends will play later (decision 12). No compatibility work, ever: saves and settings may be reset by updates, with no migrations, and links and the chamber and replay formats may break. Done in the code the same day: chamber format 1 support removed (the upgrader and its example), the progress migration from version 1 and the guard against overwriting a newer save removed, and the format, ruleset and chamber-id fields dropped from recorded solutions. Analytics was removed and restored the same day, so it stays as it was (Firebase events and the attempts counter). Kept: permanent chamber ids (they name the chamber files, key stored progress and are analytics' `chamber_id`), the recorded solutions and their checks, and the chamber hash. For the plan: links may follow position with no redirects (open decision 6 settled), no retired-id list, no data migrations. Difficulty from player data and the histogram stay dropped, since a few friends are far below any useful sample (stage 04 had set about 50 players), so the chamber order comes from playtests, with the friends' analytics informing them. Stage 05's Stage B (accounts, community) is removed, since a few friends are no audience (open decisions 7 and 8 settled). Stages 03–05 were updated to match, and stages 04 and 05 now also apply decision 10 in full |
| 14 | 2026-11-15 | Stage 04 settles its open decisions (its decisions 16–18): the campaign's new mechanics are slide floors, rotating arrows and live lasers (built as slide floors, turnable arrows, and emitters with their rays, receivers and mirror boxes); echo, timed buttons and push blocks are dropped, and so are medals, so the time stays the only score (open decisions 1 and 3 settled) |
| 15 | 2026-11-16 | Stage 04 splits in two. 04a (`04a_mechanics.md`) builds slide floors, rotating arrows and live lasers, each with its rules, fixtures, docs and a teach and a proof chamber that prove it in play. 04b (`04b_campaign.md`) builds the rest of the 16 new chambers and their order, and the catalogue, links and Play menu that scale to 20. Stage 04's decisions 1–19 stay in 04a with their numbers, and 04b cites them as "04a decision N". 04b's parts that need no new mechanic (lab chambers, chambers for the existing elements, catalogue, links, menu) may start before 04a is done. Earlier decisions here that name stage 04 mean both halves |
| 16 | 2026-11-20 | Stage 04a is done: slide floors, turnable arrows and live lasers each shipped with their rules, fixtures, docs and a teach and a proof chamber (chambers 4 to 9). Its file is kept, unlike the files of the stages done before it, because 04b cites its decisions by number |
| 17 | 2026-11-20 | `04a_mechanics.md` is removed after all, as the files of the stages done before it were. What later stages still need moved out first: the decisions 04b cites, into 04b's "Decisions made" with their 04a numbers; a summary of chambers 4–9, into 04b; the editor's needs, into stage 05; stage 03's profiling numbers, into `docs/performance.md`; that settling's end is argued, not proven, into `docs/elements.md`; and the way a mechanic was built, step by step, into `future.md`. The rest (each mechanic's spec, plan and the code as found, and what each decision was chosen over) is in `docs/` as built, or in git history |

## Open decisions

Each one belongs to the stage that must settle it, and appears there with options.

| # | Question | Recommendation | Settled in |
|---|---|---|---|
| 1 | How are ranked runs judged? (How moves are counted was settled in 01, decision 8) | Settle it with the medals | 04 (settled by decision 14: no medals, so no ranked runs) |
| 2 | Is the solver's difficulty score worth building? | No: use measured clear rates; keep solver metrics as a designer aid | 02 (settled by decision 10: no solver metrics) |
| 3 | Echo (a ghost replaying your previous attempt): build it? | Design it last or cut it: the ghost's whole input history becomes part of the state | 04 (settled by decision 14: cut) |
| 4 | GPU renderer or the current 2D canvas? | Stay on the 2D canvas; move only if profiling shows a real need | 03 (settled by decision 12: the 2D canvas) |
| 5 | The game's name and identity | Settle it in stage 03, before anything is shared publicly in stage 05 | 03 (settled by decision 12: stays "Portal 2D", a private fan game) |
| 6 | Chamber numbering and links once chambers are inserted and reordered | Links by permanent id, with old `/chamber/0`–`/chamber/3` redirected (stage 03 only makes the count start at 0) | 04 (settled by decision 13: links stay by position, no redirects) |
| 7 | When does Stage B (accounts, publishing) start? | Only once there is an audience; stage 05 sets the threshold | 05 (settled by decision 13: never, Stage B removed) |
| 8 | Firestore security rules need checking, but AGENTS.md says the project has no tests by design | Allow rules tests against the local emulator as the one exception | 05 (settled by decision 13: moot, no Firestore) |

## Order and dependencies

| # | Stage | Needs | Unlocks |
|---|---|---|---|
| 1 | 00 Fixes | — | Safe reordering of chambers; analytics history for stage 04b; first local check |
| 2 | 01 Engine v2 | 00 | Replays, a browser-free pure step, data-described elements, chamber format v2 |
| 3 | 02 Solver | 01 | The prototype's measurements only (stopped after phase A, decision 10) |
| 4 | 03 Look and sound | 01 | The visual rework, a tutorial chamber |
| 5 | 04a Mechanics | 01, 03 | New element types, each with rule fixtures, docs and a teach and a proof chamber with recorded solutions |
| 6 | 04b Campaign | 01, 03, 04a (only for the chambers built around its mechanics) | 20 chambers; a catalogue, links and a Play menu that scale |
| 7 | 05 Creator platform | 01, 03, 04a, 04b | Editor, shared chambers |

## Engineering backbone (woven in)

Local commands only, growing stage by stage:

| # | Stage | Adds |
|---|---|---|
| 1 | 00 | One command that runs lint, type check and build without changing files (recommended name: `npm run verify`) |
| 2 | 01 | Engine loads under Node; every recorded solution is replayed and must complete; v2 checked against the old rules |
| 3 | 02 | The solver check in `npm run verify`; no solvability or par check (stopped after phase A, decision 10) |
| 4 | 03–05 | Bundle size watch |
| 5 | 04a | Each new mechanic ships with at least one chamber and a recorded solution |
| 6 | 04b | The catalogue check |

## What we deliberately skip

- Real-time physics or 3D: they break the discrete rules that the solver and replays depend on.
- Chambers made by an LLM as a headline feature. Generated chambers judged by the solver, the alternative, were dropped too (decision 10).
- Ads or sales: this is a private fan game, never published (decision 12).
- Compatibility work: saves and settings may be reset by updates (no migrations, ever), and links and the chamber and replay formats may break (decision 13).
- Cloud CI (GitHub Actions and the like).
- Mobile layouts and touch controls (the game is desktop only).

## Stage file layout

Every stage file follows this layout:

```markdown
# Stage NN — Title

Status: Draft | Ready | In progress | Done | Stopped
Last revised: YYYY-MM-DD

## Goal
One paragraph: what the player or the author gets when this stage is done.

## Depends on
Earlier stages and the specific things this stage uses from them.

## Decisions made
Settled choices that shape this stage, with the date.

## Open decisions
Each: the question, the options with their cost, and a recommendation.

## Steps
Grouped into phases. Each step:
- [ ] **Short title.** What changes, where (files), and how it is verified.

## Local checks added
Commands this stage adds to the local checks.

## Done when
- [ ] Testable conditions; the stage is finished only when every box is ticked.

## Go/no-go points
Results that change this stage's or later stages' plans, and what changes.

## Risks
What could go wrong and how to notice early.

## Notes for later stages
Things this stage learns or leaves that a later stage must pick up.
```
