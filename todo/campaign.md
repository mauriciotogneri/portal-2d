# Campaign

Status: In progress. Now: phase 9, step 9.1: chamber 7.1 (phase 8's two solutions still to record)
Last revised: 2026-11-24

## Goal

Build the campaign's chambers, one run at a time, each designed with the handbook (`docs/level_design.md`), played cold by the author before they read its notes, and kept, tweaked or redone on what that play shows. What each chamber teaches us goes back into the handbook, so later chambers start from more than earlier ones did. The campaign has no fixed size: it grows run by run until the outline's runs are built.

## Decisions

Settled with the author on 2026-11-22, before any chamber was designed, but decisions 12 and 13, added on 2026-11-23.

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
| 12  | An exception to decision 3, the author's call on 2026-11-23 while run 4 was detailed: a box can start absent until a button, switch or receiver linked to it first brings it in on its start tile, with nothing marking where, the gathering of a box that fell and the sound of a box sent home (`docs/elements.md`, "A box that starts absent"); run 4 teaches it |
| 13  | No chamber lets the player reach a dead end, a state from which it can't be finished, not even one that is plainly fatal: the author's call on 2026-11-23, after getting stuck in the first 4.3 ("i prefer to avoid letting the user getting in a dead end"); the handbook's guideline 33 made a `Must` for it, never broken on purpose |

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
- [x] **4.3 Chamber 2.3** (twist: a box in front of a portal). Built (id 7), played cold by the author and cut, 2026-11-23, for the same reason; its lesson moved to run 3's outline and on to a later run.
- [x] **4.4 Chamber 2.4** (combine). Kept by the author and recorded from their cold play, 2026-11-23; built with id 8, renumbered to id 5, the id after the last chamber's, so none is skipped (the author's rule), fifth in the play order; the cut drafts' ids were never deployed. Two handbook guidelines came out of the drafts, 111 and 112, and one out of the cut, 113. The next chamber takes id 6.
- [x] **4.5 Friends play run 2 cold.** Friends played chamber 2.4 (`/chamber/5`) cold, 2026-11-23, and found it ok, by the author's account; their routes weren't recorded (`docs/spoilers/chamber_5.md`, Playtests). With this, run 2 is finished (assumption 6).
- [x] **4.6 Detail run 3** in the outline, its combine chamber sketched first, with what run 2's cut chambers were to teach (`docs/campaign.md`, run 3). Drafted 2026-11-23 from a proposal a fresh reviewer checked against the handbook, and approved by the author the same day: two chambers (a teach, a combine), in `docs/campaign.md` ("Run 3 in detail"), the combine's sketch, checked with a throwaway prototype, in the idea pool. One box for two buttons in turn, and the portal just come out of forced to move, are carried forward to a later run (guideline 113); the walls facing a door move to run 5.

### Phase 5 — Run 3: boxes and buttons

Detailed 2026-11-23 (`docs/campaign.md`, "Run 3 in detail"): a teach and a combine, the combine sketched first in the idea pool. From 3.2 on, a route may need the turn key, which 3.1 teaches. Both were designed before the author played either (the author's call, 2026-11-23, as for 1.3 and 1.4), taking ids 6 and 7; the next chamber takes id 8.

- [x] **5.1 Chamber 3.1** (teach: turning in place). Kept by the author and recorded from their cold play, 2026-11-23; id 6. Their run turned in place at once and met none of the wrong tries; since the author already used the turn key, whether players find it is for step 5.3 to show (`docs/spoilers/chamber_6.md`, Playtests and Checks).
- [x] **5.2 Chamber 3.2** (combine: a door several buttons link, two boxes). Kept by the author and recorded from their cold play, 2026-11-23; id 7. Their run was the intended route with the boxes' order swapped (`docs/spoilers/chamber_7.md`, Playtests).
- [x] **5.3 Friends play run 3 cold.** Friends played chambers 3.1 and 3.2 (`/chamber/6` and `/chamber/7`) cold, 2026-11-23, and found them ok, by the author's account; their routes weren't recorded (each chamber's notes, Playtests). With this, run 3 is finished (assumption 6).
- [x] **5.4 Detail run 4** in the outline, its combine chamber sketched first (`docs/campaign.md`, run 4). Drafted 2026-11-23 from a proposal two fresh reviewers checked against the handbook, and approved by the author the same day: three chambers (two teaches and a combine), in `docs/campaign.md` ("Run 4 in detail"), the combine's sketch and both teaches', each checked with a throwaway prototype, in the idea pool. While it was detailed the author added the box that starts absent to the rules (decision 12), built, pinned by fixtures and placed in Playground 1 the same day, and 4.2 became its teach in place of a show chamber. Carried forward: a box sent home from elsewhere (to run 5 at the latest), a used switch acting again, and the portal just come out of forced to move by a box in front of it.

### Phase 6 — Run 4: switches

Detailed 2026-11-23 (`docs/campaign.md`, "Run 4 in detail"): two teaches and a combine, the combine sketched first in the idea pool. All three are designed before the author plays any (the author's call, 2026-11-23, as for runs 2 and 3), taking ids 8, 9 and 10; the next chamber after them takes id 11.

- [x] **6.1 Chamber 4.1** (teach: the switch). Its sketch's prototype has the combine's shape, so its design keeps it from rehearsing 4.3 (guideline 47), or drops the portal crossing. Built 2026-11-23 as id 8, keeping the crossing in a shape that doesn't rehearse 4.3; kept by the author and recorded from their cold play the same day (`docs/spoilers/chamber_8.md`).
- [x] **6.2 Chamber 4.2** (teach: the box that starts absent). Built 2026-11-23 as id 9; kept by the author and recorded from their cold play the same day (`docs/spoilers/chamber_9.md`).
- [x] **6.3 Chamber 4.3** (combine: a door a switch and a button link, one box for two buttons in turn). Its sketch was built as id 10, checked and independently reviewed, and played cold by the author on 2026-11-23, who got stuck in its dead end and ruled dead ends out (decision 13); it was cut to the idea pool ("Cut drafts"), its sketch's risks moot. With these elements no catch both avoids a dead end and can't be got round, so the author chose a milder one, built the same day with the same id (none of them deployed); its independent check found it showed only half of the door's rule, so, on the author's choice, a third design replaced it: both halves on every route, a run 3 move as its catch, no dead end; checked and independently reviewed, kept by the author and recorded from their play the same day, and played by friends, who liked it (`docs/spoilers/chamber_10.md`). Two handbook guidelines came out of its drafts, 115 and 116.
- [x] **6.4 Friends play run 4 cold.** Friends played chambers 4.1, 4.2 and 4.3 (`/chamber/8`, `/chamber/9` and `/chamber/10`) cold, 2026-11-23, and liked 4.3, by the author's account; their routes weren't recorded (each chamber's notes, Playtests). With this, run 4 is finished (assumption 6).
- [x] **6.5 Detail run 5** in the outline, its combine chamber sketched first (`docs/campaign.md`, run 5), forcing a box sent home from elsewhere before any chamber relies on it (guideline 28). Drafted 2026-11-23 from a proposal two fresh reviewers checked, one against the handbook and one on the prototypes alone, and approved by the author the same day: three chambers (a teach, a twist and a combine), in `docs/campaign.md` ("Run 5 in detail"), all three sketched in the idea pool, each checked with a throwaway prototype. The twist, from the handbook reviewer, forces the box sent home from elsewhere with one box and a switch. Carried forward: the laser a link switches to run 9, the ditch a link switches (and a box falling as it opens) to run 10, the portal just come out of forced to move by a box in front of it, and a used switch acting again; the walls behind an end plate and facing a door are left to guideline 75.

### Phase 7 — Run 5: lasers, and walls that switch

Detailed 2026-11-23 (`docs/campaign.md`, "Run 5 in detail"): a teach, a twist and a combine, the combine sketched first in the idea pool. All three were designed before the author played any (the author's call, 2026-11-23, as for runs 2 to 4), taking ids 11, 12 and 13. On their cold play the same day the author kept the teach and the combine and cut the twist, "basically the same as chamber 11", so run 5 is two chambers (guideline 113), and the combine took id 12 in place of 13, the id after the last chamber's, so none is skipped (the author's rule), as run 2's kept chamber took 5; the next chamber takes id 13. Each sketch named the layout rules its build had to keep and the risks to watch in the author's play; the handbook lessons the drafts turned up waited until after that play, since they gave the chambers away, and went in then: guideline 113's second example (the cut twist), guideline 111 widened to steel a button opens, and guideline 118.

- [x] **7.1 Chamber 5.1** (teach: steel a button opens, and the laser). Its route may read as an earlier chamber, as cut 2.2 did (guideline 113): kept on the author's call, to be judged on their cold play. Built 2026-11-23 as id 11; kept by the author and recorded from their cold play the same day (`docs/spoilers/chamber_11.md`).
- [x] **7.2 Chamber 5.2** (twist: a box sent home from elsewhere, and a portal on steel closing as it shuts). Built (id 12), played cold by the author and cut, 2026-11-23: "basically the same as chamber 11"; in the idea pool ("Cut drafts"). A box sent home from elsewhere, which it forced, is carried to run 6; the portal on steel closing shows on the likeliest wrong tries of 5.1 and 5.3.
- [x] **7.3 Chamber 5.3** (combine: steel a button opens, one box needed on both sides of it). Built 2026-11-23 as id 13, renumbered to id 12 when 5.2 was cut, twelfth in the play order; kept by the author and recorded from their cold play the same day (`docs/spoilers/chamber_12.md`).
- [x] **7.4 Friends play run 5 cold.** Friends played chambers 5.1 and 5.3 (now `/chamber/11` and `/chamber/12`) cold, 2026-11-23, and liked them, by the author's account; their routes weren't recorded (each chamber's notes, Playtests). With this, run 5 is finished (assumption 6).
- [x] **7.5 Detail run 6** in the outline, its combine chamber sketched first (`docs/campaign.md`, run 6), forcing a box sent home from elsewhere, as no loss, before any chamber relies on it (carried from runs 4 and 5, guideline 28). Drafted 2026-11-23 from a proposal three fresh reviewers checked, and approved by the author 2026-11-24: two chambers (a teach and a test), in `docs/campaign.md` ("Run 6 in detail"), both sketched in the idea pool, each checked with a throwaway prototype. The combine sketched first was dropped before any chamber was built: with run 1 to 6's elements, forcing a box sent home took a round trip that only a switch could set up, and it played as chamber 4.3 with a fizzler (guideline 113), so the teach forces the send-home instead; its sketch is in the idea pool. Carried forward: the fizzler a link switches to run 10; and, still, the portal just come out of forced to move by a box in front of it, and a used switch acting again.

### Phase 8 — Run 6: fizzlers

Detailed 2026-11-24 (`docs/campaign.md`, "Run 6 in detail"): a teach and a test, both sketched in the idea pool. Both are designed before the author plays either (the author's call, 2026-11-24, as for runs 2 to 5), taking ids 13 and 14; the next chamber after them takes id 15. Each breaks one `Must` on purpose, named with its reason in its notes, which the author accepted with the plan. The handbook lessons its drafts turned up waited until after the author's play, since they gave the chambers away, and went in then, approved by the author on 2026-11-24: guidelines 26, 70, 73, 113 and 116 extended, and guideline 119.

- [ ] **8.1 Chamber 6.1** (teach: the fizzler, and a box sent home from elsewhere, as no loss). Built 2026-11-24 as id 13, thirteenth in the play order, from its sketch, with two tiles no route needs taken out on its reviewer's finding (`docs/spoilers/chamber_13.md`); checked and independently reviewed; kept by the author after their cold play, 2026-11-24, their solution still to be recorded. A flight home from far off, which it shows only over one tile, is carried forward in the outline.
- [ ] **8.2 Chamber 6.2** (test: shots and portals at the fizzler). Built 2026-11-24 as id 14, fourteenth in the play order, from its sketch (`docs/spoilers/chamber_14.md`); checked and independently reviewed; kept by the author after their cold play, 2026-11-24, their solution still to be recorded.
- [x] **8.3 Friends play run 6 cold.** Friends played chambers 6.1 and 6.2 (`/chamber/13` and `/chamber/14`) cold, 2026-11-24, and liked them, by the author's account; their routes weren't recorded (each chamber's notes, Playtests). Run 6 is finished once both solutions are recorded (assumption 6).
- [x] **8.4 Detail run 7** in the outline, its combine chamber sketched first (`docs/campaign.md`, run 7). Drafted 2026-11-24 from a proposal two fresh reviewers checked, one against the handbook and one on the prototypes alone, and approved by the author the same day: three chambers (two teaches and a twist), in `docs/campaign.md` ("Run 7 in detail"), all three sketched in the idea pool, each checked with a throwaway prototype; the reviewers' findings replaced the first drafts of 7.1 and 7.3. No combine: the one sketched first, and a second, each read as an earlier chamber and were dropped before any chamber was built (the idea pool, "Sketched for a run"), so run 8's combine serves arrows too (guideline 42). Carried forward again: a box flying home from far off, the portal just come out of forced to move by a box in front of it, and a used switch acting again.

### Phase 9 — Run 7: arrows

Detailed 2026-11-24 (`docs/campaign.md`, "Run 7 in detail"): two teaches and a twist, all three sketched in the idea pool. All three were designed before the author played any (approved with the plan, 2026-11-24, as for runs 2 to 6), taking ids 15, 16 and 17. On the built chambers' fresh check the author cut the twist, built as 17, before playing it, so run 7 is two chambers and the next chamber takes id 17, the id after the last chamber's (the author's rule); and had 7.1 mirrored, its frame having been chamber 5.1's. Each sketch names the risks to watch in the author's cold play; the handbook lessons its drafts turned up waited until after that play, since they gave the chambers away, and went in then, approved by the author on 2026-11-24: guidelines 3, 97, 108 and 113 extended.

- [ ] **9.1 Chamber 7.1** (teach: the arrow, a one-way road, and a portal back past it). Built 2026-11-24 as id 15, fifteenth in the play order, from its sketch, mirrored left to right on its fresh reviewer's finding (`docs/spoilers/chamber_15.md`); checked and independently reviewed; kept by the author after their cold play, 2026-11-24, their solution still to be recorded.
- [ ] **9.2 Chamber 7.2** (teach: the arrow a button turns, which turns back when released, even under the subject). Built 2026-11-24 as id 16, sixteenth in the play order, from its sketch, its antline routed round on its fresh reviewer's finding (`docs/spoilers/chamber_16.md`); checked and independently reviewed; the run's last chamber; kept by the author after their cold play, 2026-11-24, their solution still to be recorded.
- [x] **9.3 Chamber 7.3** (twist: on an arrow the subject faces only its way). Built 2026-11-24 as id 17 from its sketch, checked, and cut the same day before the author played it, on its fresh reviewer's findings: it read as 7.2 reversed, in the same room shape, and the facing rule its entry named was never felt (the idea pool, "Sketched for a run"). The facing rule is carried forward in the outline. Its lessons, and the run's others, went into the handbook after the author's play of 7.1 and 7.2, approved by the author on 2026-11-24: guidelines 3, 97, 108 and 113 extended.
- [ ] **9.4 Friends play run 7 cold.**
- [ ] **9.5 Detail run 8** in the outline, its combine chamber sketched first and serving arrows too (`docs/campaign.md`, run 8).

### Later runs

Each run repeats phase 3: its chambers in play order, friends' cold play, the lessons into the handbook, then the next run detailed. Runs 10 and 11 hold receivers, which the solver's macro search refuses, so expect their shortcuts to be checked by hand (`docs/solving_by_hand.md`), which takes longer.
