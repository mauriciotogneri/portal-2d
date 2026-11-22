# Campaign

Status: In progress. Now: phase 3, step 3.3: Chamber 1.3, not started (on hold until the author says to start)
Last revised: 2026-11-22

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
| 4   | Chamber 1.1 took id 1 from today's tutorial, with stored progress reset (the author's call, 2026-11-22); later chambers take fresh permanent ids (2, 3 and so on); a tweak keeps a chamber's id and its best times, a redesign gets a new id |
| 5   | Today's tutorial moves to the playground, as the old chambers did, once the new first chamber is approved (done: Playground 12)                                                                                                              |
| 6   | A run is finished when every chamber in it is approved, recorded and passes the checks, and friends have played it                                                                                                                           |

## Workflow for each chamber

1. Design it from its entry in the outline and the handbook, trying several variants privately; write its notes (guideline 52).
2. Check it: guidelines 100–104 (loading it and the solver, the key move check, the forbidden facts, the near misses); the chamber check itself refuses a chamber file the play order doesn't list, so it runs in step 3.
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
- [ ] **3.3 Chamber 1.3** (teach: button and door).
- [ ] **3.4 Chamber 1.4** (combine).
- [x] **3.5 Retire today's tutorial.** Done with 3.1, 2026-11-22: today's tutorial is Playground 12, chamber 1.1 took its id 1, and the stored progress was reset (version 4). First-visit Play starts id 1, now chamber 1.1, so it needed no change; checked with empty progress.
- [ ] **3.6 Friends play run 1 cold.** Note what confused them in each chamber's notes.
- [ ] **3.7 Revise the handbook** with what run 1 taught (decision 10).
- [ ] **3.8 Detail run 2** in the outline, its combine chamber sketched first.

### Later runs

Each run repeats phase 3: its chambers in play order, friends' cold play, the lessons into the handbook, then the next run detailed. Runs 10 and 11 hold receivers, which the solver's macro search refuses, so expect their shortcuts to be checked by hand (`docs/solving_by_hand.md`), which takes longer.
