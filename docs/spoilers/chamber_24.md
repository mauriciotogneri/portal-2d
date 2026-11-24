# Chamber 24 (run 10, chamber 10.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their cold run its recorded solution. File: `src/chambers/chamber_24.json`, twenty-fourth in the play order; permanent id 24. Run 10's combine and last chamber (`docs/campaign.md`, "Run 10 in detail").

## Entry

Run 10, chamber 3, combine. Elements: an emitter, a receiver, a fizzler it switches, slide floor, a box, a button and the exit, with antlines; every wall steel. The player knows runs 1 to 9, 10.1 and 10.2. It should teach that a fizzler a link switches breaks up a box lying in it as it switches on, and the box flies home from however far. Hint: none (convention 7).

## Layout

9 × 5. On the left, the start's room, the block (1, 1) to (3, 3), whose middle right tile, B (3, 2), is the one tile that leads on into the lane: the button where the box starts, linked to the exit **E** (7, 4), so the exit starts open. The lane, slide floor (4, 2) to (6, 2), ends on the landing (7, 2), plain floor. Above the landing, the fizzler **F** (7, 3) fills the one-tile way up to the exit, its connectors on the steel at (6, 3) and (8, 3); the receiver **r** (8, 1), listening left, holds it off while the emitter **e** (6, 1), firing right, lights it across the nook (7, 1) below the landing.

```
y4  ■ ■ ■ ■ ■ ■ ■ E ■
y3  ■ S . . ■ ■ ■ F ■
y2  ■ . . b = = = . ■
y1  ■ . . . ■ ■ e . r
y0  ■ ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7 8
```

`■` steel, `=` slide floor, `S` the subject's start (1, 3), facing up, `b` the box (3, 2), resting on its start, B, linked to `E` (7, 4), `F` the fizzler (7, 3), linked to `r` (8, 1), so it is off while the receiver is lit, `e` the emitter (6, 1), firing right.

Two antlines:

- B to the exit: (3, 2), (3, 4), (7, 4): up across (3, 3) and along the top wall into the exit.
- The receiver to F: (8, 1), (8, 3), (7, 3): up the right wall and left into the field.

The ray crosses only the nook (7, 1): nothing the receiver holds, and no tile on the way to the exit (guideline 92). No field lies beside a button, and the ray crosses no field (guideline 61).

## Idea

The box holds the exit open but bars the only way to it, and carried down the lane it can't be put back on B, since nothing stops the subject on the lane tile beside B; a field would send it home, but this one is off while its receiver is lit, so a box carried in is untouched: the box goes down in F, and the subject steps into the ray, which switches F on under the box, which breaks up and flies home along the lane onto B.

From the idea pool, where it was sketched first with the run (`docs/campaign.md`, "Run 10 in detail"), redrawn before approval on both proposal reviewers' findings (the idea pool, "Sketched for a run": its first draft started facing the box at the mouth, chamber 6.1's opening, and its field spanned from steel into open floor):

> - **Run 10, chamber 3: the field the light holds off** (combine; an emitter, a receiver, a fizzler it switches, slide floor, a box, a button, the exit; sketched first). 9 × 5, every wall steel.
>
>   Route: to (2, 2), facing the box; interact: lift it (the exit closes); right onto B; right: the slide runs the lane to the landing; turn up and put the box down in F, where it bars the way to the exit; down into the nook: the receiver goes dark, F switches on, the box breaks up and flies home onto B, the exit opens; up onto the landing (F off again), up through F, up into the exit. 8 moves, no portal, 11 presses (12 without the turn key).
>
>   Forced: the box resting in F as the ray is cut, by the subject. Lure: chamber 6.1's habit, carrying the box into a field: this one is off, so nothing happens, and the subject can't stand in the ray and in the field at once; and the box carried back down the lane lands the subject on B, so it goes back on B only from the start's side, where it bars the way again. Gem, light: one realisation, a short route.
>
>   Risks: its catch is 6.1's (the box holds the exit open and bars the only way to it; with F always on, the route is 6.1's, 7 presses), and wanting a link blocked is 9.4's key move with the ray for the button (both reviewers, guideline 113), though switching a field on under a resting box, because a carried one can't meet it on, is new; stepping onto B carrying the box opens the exit, which shuts as the slide off B ends below it (guideline 23's look, mild: nothing is passed); seven kinds of element (guideline 18).

## Purpose

Combine: run 10's ray and receiver with run 6's fizzler, now held by a link, run 9's slide floor and the box on its button. Its new consequence, a field switching on under a resting box, sends the box home from far off, carried from runs 6 and 9: 6.1 showed a box flying home over one tile, this one flies the length of the lane (guideline 70), onto a button seen held at the start, with its antline.

Gem, light: one realisation, a short route.

## Intended route

1. Down to (1, 2), right to (2, 2): the box only turns the subject to face it; interact: lift it. The exit closes; B's line goes dark.
2. Right onto B: standing there, the subject holds B down, and the exit opens.
3. Right: the slide runs the lane to the landing (7, 2). B comes up as the slide ends, and the exit closes.
4. Turn up and interact: the box goes down in F, which is off.
5. Down into the nook (7, 1), into the ray: the receiver goes dark, F switches on, and the box breaks up and flies home along the lane onto B. The exit opens. The key move.
6. Up onto the landing: the receiver lights, F switches off.
7. Up through F, up into the exit.

This takes 8 moves and no portal, the fewest (`--baseline`); 11 presses, 12 without the turn key.

## Lure and where the player should get stuck

Two habits: chamber 6.1's, carrying the box into a field, here off while the receiver is lit, so nothing happens, and the subject can't stand in the ray and in the field at once; and putting the box back on its button, which from the lane's side it can't reach (the slide back carries the subject onto B, so the box goes back only from the start's side, where it bars the way again, 6.1's catch). Where the player should get stuck is that the field only switches on while the ray is cut, and only the subject can cut it while the box lies in the field.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The lane slide floor, three tiles long | Putting the box back on B from the lane's side: the subject never rests beside B there, nor can the box be set where a stop beside B would follow. Checked: with the lane plain, the box goes back on B from (4, 2) and F isn't needed |
| 2 | B the room's one-tile mouth | Leaving the box on B and walking past it |
| 3 | F held off by the receiver, not a button | A field the subject can switch on under the box: with a button, the one box couldn't hold it off while resting in it. Checked: with F always off, unsolvable; always on, 6.1's carry, 7 presses |
| 4 | The ray only across the nook below the landing | An accidental cut on the way to the exit, and a ray across anything the receiver holds (guideline 92) |
| 5 | F in the one-tile way to the exit, between steel | A field that reads as spanning a gap, and the box put down there barring the exit until it is sent home |
| 6 | Every wall steel | Portals: the box can't be carried home by a pair (guideline 116) |

## Facts that must never be possible

- Finishing without the box sent home by F: checked, with F always off, unsolvable.
- The box going back on B with the subject past it, by hand: checked, the only completion sends it home from F.
- The subject standing in something blocked: checked, none among the 633 reachable states.
- A dead state: checked, all 633 can be finished.
- The box under the subject: the box lands on B only while the subject is in the nook.

## Guidelines broken on purpose

None. Guideline 18 is bent: seven kinds of element, each with a job, the emitter and its receiver one between them (`docs/campaign.md`, "Run 10 in detail").

## Near misses and wrong tries

None is a dead end: the lane slides both ways, so the subject can always go back for the box.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Carrying the box into F | Nothing: the field is off; the box stays carried |
| 2 | Sliding back with the box | The slide stops on B; stepping off and putting it back from the start's side bars the way again |
| 3 | Putting the box down in the nook | It cuts the ray: F switches on, empty, and stays on while the box lies there |
| 4 | Stepping into the nook before the box is in F | F switches on, empty, and off again on the step out |
| 5 | Leaving the box in the start's room | The exit stays shut; the slide back fetches it |

## Variants tried

- The first sketch (the idea pool, "Sketched for a run"): the start facing the box at the mouth, chamber 6.1's opening, the field on a tile beside the landing, spanning from steel into open floor; redrawn before approval.
- Before it, the box as a slide stopper lying in the field: it let the box be carried past the stop and left there, out of reach for good (132 of 881 states dead).

## Checks

- `npm run solve -- --baseline`: 8 moves and no portal, both searches; no portal wall side; key 13 bits.
- Every reachable state (633) explored through the rules' step: none dead, none with the subject standing in something blocked, none with a box under the subject. With every turn action refused: 412, none dead.
- Copies: with F always off, unsolvable; with F always on, 7 presses (6.1's carry into the field); with the lane plain, the box goes back on B from (4, 2), 12 presses, F unused.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run random:walk`, `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 22 to 24 as built and their plan entries, not these notes) found no shortcut, no dead end and nothing that looks broken: on every route the box is destroyed and F switches on, and forbidding either makes it unsolvable; with F always off, unsolvable; with the lane plain, F isn't needed. Without the turn key the fewest route, 12 presses, walks the carried box through the ray first, which shows F switching on, a fair hint; and after the slide only 0.2% of random four-press sequences send the box home, so stumbling into it is unlikely (guideline 8). Its findings:
  - It reads as chamber 6.1: its idea sentence is 6.1's (the box on the exit's button bars the only way on, is carried past its own button, and a field beyond sends it home), and with F always on and no ray it is 6.1's route plus a slide, 7 presses. Answered: named in the plan as a risk for the author's cold play. If it reads as 6.1, change the idea, not the frame: give the box a first job past the lane, so it leaves the button for a reason other than barring the way (guideline 116 says why one box otherwise falls back to 6.1's form).
  - Presentation: the one-tile ray, lit from the start, draws the eye to the nook; the receiver's line up the right wall into F reads clearly; F spans between steel, two walls against the exit's one, so it reads as a gate across the way to the exit; the start's room is larger than the route needs, harmless, and gives room to put the box down while looking around.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their recorded run is the intended route but for lifting the box from above B, from (3, 3), not from (2, 2): along the top row, the box lifted, down onto B carrying it, the slide to the landing, the box put down in F, then down into the nook, where F switched on and the box broke up and flew home onto B, and up through F into the exit (8 moves and no portal, the fewest). The lure doesn't show in it; earlier tries, if any, leave no trace in a recording. Recorded as `chamber_24.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, with no trouble, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
