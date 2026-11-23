# Campaign

Status: In progress. Now: phase 4, step 4.6: run 3's detail drafted, waiting for the author's review
Last revised: 2026-11-23

## Goal

Build the campaign's chambers, one run at a time, each designed with the handbook (`docs/level_design.md`), played cold by the author before they read its notes, and kept, tweaked or redone on what that play shows. What each chamber teaches us goes back into the handbook, so later chambers start from more than earlier ones did. The campaign has no fixed size: it grows run by run until the outline's runs are built.

## Decisions

Settled with the author on 2026-11-22, before any chamber was designed.

| #   | Decision                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | No upper bound on the number of chambers: the campaign grows one run at a time                                                                                                        |
| 2   | The outline (`docs/campaign.md`) fixes the order of the runs and what each run teaches for the whole campaign, and details only the next run                                          |
| 3   | The rules and the elements are frozen while the campaign is built, bugs aside; an idea that needs a new rule or element waits for after the campaign                                  |
| 4   | One handbook, `docs/level_design.md`, with the outside research curated into it and then deleted                                                                                      |
| 5   | The handbook is laid out by workflow, with every guideline marked `Must` or `Should`                                                                                                  |
| 6   | Tutorial hints (`docs/hints.md`) are a backup only: every teach chamber works on its layout alone, and hints appear only in the first few chambers, saying what an element is or does |
| 7   | Today's tutorial is redesigned as the first run of small teach chambers                                                                                                               |
| 8   | The author plays each draft cold, before reading its notes; one or two friends play each finished run cold                                                                            |
| 9   | The outline shows each chamber's part, elements and teaching goal only; its key move, layout and route stay in its notes under `docs/spoilers/` until the author has played it        |
| 10  | One pass over the handbook now, then a planned revision after run 1                                                                                                                   |
| 11  | A chamber goes live as soon as the author approves it (no preview link)                                                                                                               |

And the assumptions that follow from them:

| #   | Assumption                                                                                                                                                                                                                                   |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Each chamber's notes are a file of its own, `docs/spoilers/chamber_<id>.md`; ideas with no chamber yet are in `docs/spoilers/ideas.md`                                                                                                       |
| 2   | When a chamber is ready, the author gets only its address                                                                                                                                                                                    |
| 3   | The author's cold play, once the chamber is approved, becomes its recorded solution                                                                                                                                                          |
| 4   | Chamber 1.1 took id 1 from today's tutorial, with stored progress reset (the author's call, 2026-11-22); later chambers take fresh permanent ids (2, 3 and so on), each the id after the last chamber's, so none is skipped (the author's rule, 2026-11-23); a tweak keeps a chamber's id and its best times, a redesign gets a new id |
| 5   | Today's tutorial moves to the playground, as the old chambers did, once the new first chamber is approved (done: Playground 12)                                                                                                              |
| 6   | A run is finished when every chamber in it is approved, recorded and passes the checks, and friends have played it                                                                                                                           |

## Workflow for each chamber

1. Design it from its entry in the outline and the handbook, trying several variants privately; write its notes (guideline 52).
2. Check it: guidelines 100–104 (loading it and the solver, the key move check, the forbidden facts, the near misses), then a fresh reviewer (guideline 110); the chamber check itself refuses a chamber file the play order doesn't list, so it runs in step 3.
3. Add it to the campaign list, at its place in the play order, run `npm run chamber:check`, and hand the author its address only. Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.
4. The author plays it cold in `npm run dev`, then reads its notes and decides: keep, tweak or redo.
5. On keep: the author's play becomes its recorded solution (Download solution); the chamber goes live at the next deploy.
6. Lessons that hold beyond the chamber go into the handbook, the rest into its notes (guideline 107).

## Steps

### Phase 1 — Handbook

- [x] **1.1 Curate the research into the handbook.** `docs/level_design.md` rebuilt from the old guide and `level_design_research.md`: 107 guidelines, 40 `Must` and 67 `Should`, laid out by workflow; an independent review's findings fixed.
- [x] **1.2 Retire the research.** Its chamber ideas moved to `docs/spoilers/ideas.md`, the file deleted, `AGENTS.md` updated.

### Phase 2 — Outline

- [x] **2.1 Write the outline.** `docs/campaign.md`: the campaign's conventions, every run in order with its new elements, what it teaches and a guess at its size, and run 1 detailed chamber by chamber. Approved by the author 2026-11-22.
- [x] **2.2 Sketch run 1's combine chamber** in the idea pool, before its teach chambers (guideline 51).

### Phase 3 — Run 1: first steps (the tutorial)

Cut from five chambers to four on 2026-11-22, with the author: walls alone can't make a portal crossing necessary, so 1.1 already crosses a ditch, and the ditch's own teach chamber was dropped (`docs/campaign.md`, run 1).

- [x] **3.1 Chamber 1.1** (teach: portals, over a ditch). Approved by the author and recorded from their cold play, 2026-11-22; id 1.
- [x] **3.2 Chamber 1.2** (test: portals). Kept by the author and recorded from their cold play, 2026-11-22; id 2. Their run never walked into one of the two colours, so run 2 should force "either portal can be the way in" (`docs/spoilers/chamber_2.md`, Playtests).
- [x] **3.3 Chamber 1.3** (teach: button and door). Kept by the author and recorded from their cold play, 2026-11-23; id 3. Exceptionally, 1.3 and 1.4 were both designed before the author played either (the author's call, 2026-11-23).
- [x] **3.4 Chamber 1.4** (combine). Kept by the author and recorded from their cold play, 2026-11-23; id 4. Their run put the box down before shooting, so it never met the portal keys refused while a box is carried: watch for that in step 3.6 (`docs/spoilers/chamber_4.md`, Playtests).
- [x] **3.5 Retire today's tutorial.** Done with 3.1, 2026-11-22: today's tutorial is Playground 12, chamber 1.1 took its id 1, and the stored progress was reset (version 4). First-visit Play starts id 1, now chamber 1.1, so it needed no change; checked with empty progress.
- [x] **3.6 Friends play run 1 cold.** A friend played run 1 cold, 2026-11-23, and was fine with every chamber: nothing confused them, by the author's account, and their routes weren't recorded. Noted in each chamber's notes. With this, run 1 is finished (assumption 6).
- [x] **3.7 Revise the handbook** with what run 1 taught (decision 10). Done 2026-11-23 from a proposal the author approved: 20 changes, among them three new guidelines, 108 to 110 (teach only what every route forces; force which portal moves; a fresh reviewer checks each draft), with today's numbers kept for good and the handbook 3% longer.
- [x] **3.8 Detail run 2** in the outline, its combine chamber sketched first. Drafted 2026-11-23 ahead of 3.6 and 3.7 at the author's request, rechecked against the revised handbook and approved the same day: four chambers (a test, two twists, a combine), in `docs/campaign.md` ("Run 2 in detail"), the combine's sketch in the idea pool.

### Phase 4 — Run 2: portals in depth

Detailed 2026-11-23 (`docs/campaign.md`, "Run 2 in detail"): four chambers, with the combine sketched first in the idea pool. Every put-down and every shot a route needs works without the turn key, which run 3 teaches (guideline 66). All four were designed before the author played any (the author's call, 2026-11-23, as for 1.3 and 1.4); on their cold play the same day the author kept only the combine, finding the other three "very similar to chamber 4 but even simpler", so run 2 is one chamber (guideline 113, from this). The cut drafts are in the idea pool ("Cut drafts"), with their verdicts, and the lessons later chambers need moved to run 3's outline.

- [x] **4.1 Chamber 2.1** (test: where the subject comes out of a portal). Built (id 5), played cold by the author and cut, 2026-11-23: it taught nothing chamber 1.4 hadn't.
- [x] **4.2 Chamber 2.2** (twist: what an open door lets through). Built (id 6), played cold by the author and cut, 2026-11-23, for the same reason.
- [x] **4.3 Chamber 2.3** (twist: a box in front of a portal). Built (id 7), played cold by the author and cut, 2026-11-23, for the same reason; its lesson moves to run 3.
- [x] **4.4 Chamber 2.4** (combine). Kept by the author and recorded from their cold play, 2026-11-23; built with id 8, renumbered to id 5, the id after the last chamber's, so none is skipped (the author's rule), fifth in the play order; the cut drafts' ids were never deployed. Two handbook guidelines came out of the drafts, 111 and 112, and one out of the cut, 113. The next chamber takes id 6.
- [x] **4.5 Friends play run 2 cold.** Friends played chamber 2.4 (`/chamber/5`) cold, 2026-11-23, and found it ok, by the author's account; their routes weren't recorded (`docs/spoilers/chamber_5.md`, Playtests). With this, run 2 is finished (assumption 6).
- [ ] **4.6 Detail run 3** in the outline, its combine chamber sketched first, with what run 2's cut chambers were to teach (`docs/campaign.md`, run 3). Drafted 2026-11-23: the proposal is `run_3_detail.md` at the repo root, waiting for the author's review, and its combine sketch is in the idea pool. Once approved, its section moves into `docs/campaign.md` and the file goes.

### Later runs

Each run repeats phase 3: its chambers in play order, friends' cold play, the lessons into the handbook, then the next run detailed. Runs 10 and 11 hold receivers, which the solver's macro search refuses, so expect their shortcuts to be checked by hand (`docs/solving_by_hand.md`), which takes longer.
