# Chamber 19 (run 9, chamber 9.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their cold run its recorded solution. File: `src/chambers/chamber_19.json`, nineteenth in the play order; permanent id 19. Run 9's second chamber (`docs/campaign.md`, "Run 9 in detail").

## Entry

Run 9, chamber 2, teach: the box as a stopper. Elements: slide floor, a box and the exit, every wall steel. The player knows runs 1 to 8, and 9.1. It should teach that a resting box stops a slide on the tile before it, so where the box goes down decides where a slide ends. Hint: none (convention 7).

## Layout

7 × 4. Two rows of floor, (1, 1) to (5, 2), all slide floor but the stone (4, 2), plain floor; the exit below the bottom row's middle. Every wall is steel.

```
y3  ■ ■ ■ ■ ■ ■ ■
y2  ■ b = = . S ■
y1  ■ = = = = = ■
y0  ■ ■ ■ E ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `=` slide floor, `S` the subject's start (5, 2), on slide floor, facing left, `b` the box (1, 2), on slide floor, `.` the stone (4, 2), plain floor, `E` the exit (3, 0), open, no link, under T (3, 1).

Without the box, nothing stops a slide on T or on (3, 2) above it: the bottom row's slides run from wall to wall, and the top row's stop on the stone or at its ends. A slide down column 3 from (3, 2) would run through T into the exit, but nothing stops one on (3, 2) either.

## Idea

T has nothing to stop a slide, so the box goes down beside it, on (2, 1), and the slide along the bottom row from (4, 1) stops on T before it; or on (2, 2), so the slide from the stone stops on (3, 2), and down runs through T into the exit.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 9 in detail"):

> - **Run 9, chamber 2: the stopper** (teach; slide floor, a box, the exit). 7 × 4, every wall steel:
>
>   ```
>   y3  # # # # # # #
>   y2  # b = = . S #
>   y1  # . = = = = #
>   y0  # # # E # # #
>       0 1 2 3 4 5 6
>   ```
>
>   `S` the start (5, 2), on slide floor, facing left; the box `b` (1, 2), on slide floor; the stone (4, 2) and the corner (1, 1), plain floor; the rest of both rows slide floor; the exit `E` (3, 0), open, under T (3, 1).
>
>   Idea: T has nothing to stop a slide, so the box goes down beside it, and a slide along the bottom row stops on T, or one down column 3 runs on through T into the exit.
>
>   Route: left onto the stone; left: the slide stops before the box, which shows a box stopping a slide before any route needs it (guideline 25); pick it up; turn down and put it on (2, 1); right back onto the stone; down to (4, 1); left: the slide stops on T before the box; down into the exit. 6 moves, 9 presses. Or the box on (2, 2), so the slide from the stone stops on (3, 2), and down through T into the exit.
>
>   Lure: the bottom row slid without the box, past T both ways. Purpose: the box as a stopper the player places. Flow. Needs the turn key (guideline 66). _Check:_ 64, 67, 85, 88. Feasibility: 6 moves, the fewest; all 334 states can be finished; without the box, unsolvable; with the slide floor plain, 4 moves without the box.

Built as sketched, but for the corner (1, 1), plain floor in the sketch and slide floor here: it stopped no slide the walls beside it don't, an odd tile with no use (guideline 19); the reachable states are the same 334.

## Purpose

Teach: the box as a stopper the player places, the slide floor's tool, with no other element (guideline 24). The first two presses show it before any route needs it (guideline 25): the slide from the stone stops before the box where it starts.

Flow: one realisation, that the box goes down beside the tile under the exit, in a chamber that looks as simple as it is (guideline 32).

## Intended route

1. Left: the subject steps onto the stone and stops.
2. Left: it slides along the top row and stops on (2, 2), before the box.
3. Interact: pick up the box from (1, 2).
4. Turn down and interact: the box goes down on (2, 1), beside T. The key move: the box placed as a stopper.
5. Right: the subject slides back onto the stone and stops.
6. Down: it moves onto (4, 1) and stops before the bottom wall.
7. Left: it slides onto T and stops before the box.
8. Down: into the exit.

This takes 6 moves and no portal, the fewest (`--baseline` and `--par` agree), and needs the turn key, known from run 3, since on slide floor turning in place is the only way to face a tile without sliding onto it (guideline 66). The other way, the box on (2, 2) from (2, 1) or (3, 2), works as well (guideline 31).

## Lure and where the player should get stuck

None set: a teach (guideline 24). The likely first tries slide along the bottom row, past T both ways, with no stop under the exit, plainly and at once (guideline 4). Where the player should stop is seeing that the box, which stopped the second slide, can stop one beside T.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | T (3, 1) and (3, 2) slide floor, with slide floor on both sides | A stop under the exit without the box. Checked: without the box, unsolvable |
| 2 | The stone (4, 2), plain floor | Nothing: it is the stop the route comes back to, above (4, 1), the run-up to T |
| 3 | The box starting on (1, 2), in the top row's path | Nothing: it shows a box stopping a slide on the first slides (guideline 25) |
| 4 | Every wall steel | Portals: the chamber holds only the slide floor's new tool (guideline 24) |

## Facts that must never be possible

- Finishing without a box stopping a slide on T or on (3, 2). Checked: without the box, unsolvable.
- A dead state. Checked: all 334 reachable states can be finished.
- The subject standing in something blocked, or a move that only turns. Checked: none among the 334 states.
- The box under the subject: nothing sends a box home in this chamber.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | The bottom row slid without the box | A slide past T, wall to wall, under the open exit |
| 2 | The box carried along a row | The slide carries it; it goes down only on the tile faced |
| 3 | The box put down on T itself | The slide stops beside it, one tile short; it is picked up again from there |
| 4 | The box put down on (2, 2) and the slide taken along the bottom row | The bottom row passes T; down from (3, 2), reached from the stone, it works |

## Variants tried

- Its first draft (the idea pool, "Sketched for a run": the ring): a ring of floor round steel, the box set on its top row and a lap round to come at the target from the far side, out through the top wall. Its handbook reviewer found it chamber 7.2's ring and route mirrored (guideline 113), seven of its twelve moves the lap (guideline 37); redrawn as two open rows before approval.
- This one, its corner (1, 1) made slide floor (Idea, above).

## Checks

- `npm run solve -- --baseline --par`: 6 moves and no portal, both searches; no portal wall side; key 11 bits.
- Copies: without the box, unsolvable from `--baseline`; with the slide floor made plain, 4 moves without the box.
- Every reachable state (334) explored through the rules' step: none dead, none with the subject standing in something blocked, no move that only turns. With every turn action refused: no completion, as the turn key is needed.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 18 to 21 as built, their plan entries and the earlier chambers' files, not these notes) found no shortcut, no dead end and nothing that looks broken: 334 states, none dead; with the box removed, or fixed at its start, unsolvable; the second press shows a box stopping a slide before any route needs it. Its findings:
  - The turn key is a second hurdle in a teach: every put-down here is from slide floor or beside it, so with the turn key refused all 57 states are dead, where chambers 15 to 18 need none. Kept, as the run's plan has it (guideline 66): on slide floor turning in place is the only way to face a tile without sliding onto it, and this is where the run meets it.
  - The bottom row's overshoot passes right under the open exit, which could read as a slide to catch (guideline 23); low, since a key pressed mid-slide acts only once it stops.
  - It reads as no earlier chamber, nor as Playground 5 or 6.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their recorded run isn't the intended route: it takes a third way these notes don't list, the box on the stone. Left onto the stone; left, the slide stopped on (2, 2) before the box; the box picked up from (1, 2) and carried on the slide back onto the stone; down onto (4, 1), then, turning up in place, the box put down on the stone; left, the slide along the bottom row to (1, 1), past T; up onto (1, 2); right, the slide along the top row stopped on (3, 2) before the box; down, the slide through T into the exit (8 moves and no portal; the fewest are 6, the intended route, the two over being the way round by (1, 1) and (1, 2) to come at (3, 2) from the left). The box still makes the stop, so the teach holds; the bottom row's slide past T is part of this way, not a wrong try. Earlier tries, if any, leave no trace in a recording. Recorded as `chamber_19.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
