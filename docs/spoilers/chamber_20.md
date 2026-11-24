# Chamber 20 (run 9, chamber 9.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their solution is not recorded yet. Its entry's lesson, the slide out of a portal, is met on every route but not tested (Checks, its fresh reviewer): watch whether the author's play ever expects to stop where it comes out. File: `src/chambers/chamber_20.json`, twentieth in the play order; permanent id 20. Run 9's third chamber (`docs/campaign.md`, "Run 9 in detail"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 9, chamber 3, test. Elements: slide floor, a box, ditches and the exit, with walls that take portals. The player knows runs 1 to 8, 9.1 and 9.2. It should teach that coming out of a portal onto slide floor, the subject slides on the way that portal faces. Hint: none (convention 7).

## Layout

8 × 6. A room of two rows, (1, 1) to (6, 2), plain floor; above it a row of open ditches, (1, 3) to (6, 3); above them the lane, (1, 4) to (6, 4), slide floor, from steel on the left, (0, 4), to WB, a plain wall, on the right, (7, 4); the exit in the lane's top wall.

```
y5  ■ W ■ W ■ E ■ ■
y4  ■ = = = = = = B
y3  ■ ~ ~ ~ ~ ~ ~ ■
y2  ■ . . . . . . ■
y1  ■ S b . . . . ■
y0  ■ W W W W W W ■
    0 1 2 3 4 5 6 7
```

`■` steel, `W` a plain wall, `=` slide floor, `~` an open ditch (no link), `S` the subject's start (1, 1), facing right, `b` the box (2, 1), `B` WB (7, 4), a plain wall, `E` the exit (5, 5), open, no link, above T (5, 4).

The faces: (1, 5) and (3, 5), their bottom faces over the lane; WB's west face, at the lane's right end; the room's floor wall, (1, 0) to (6, 0), their top faces. From the room, shots cross the ditches to the lane's top wall; WB is seen only from the lane, along it; from every column of the lane, a shot down crosses the ditches and the room to the floor wall, so the lane always has a way back (guideline 78).

The lane is reached only out of a portal: out of (1, 5) or (3, 5) the subject lands on (1, 4) or (3, 4) facing down and stops, the ditch below; out of WB onto (6, 4), facing left, it slides on along the lane.

## Idea

Carried in out of (3, 5), the box goes down on (4, 4), beside T, from the landing (3, 4), the one stop next to a tile beside T; the subject then comes at T from the other side, out of a portal on WB, sliding left along the lane and stopping before the box.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 9 in detail"):

> - **Run 9, chamber 3: the far end** (test; slide floor, a box, ditches, the exit). 8 × 6, every wall steel but the faces `W`:
>
>   ```
>   y5  # W # W # E # #
>   y4  # = = = = = = W
>   y3  # ~ ~ ~ ~ ~ ~ #
>   y2  # . . . . . . #
>   y1  # S b . . . . #
>   y0  # W W W W W W #
>       0 1 2 3 4 5 6 7
>   ```
>
>   `S` the start (1, 1), facing right at the box `b` (2, 1); the lane (1, 4) to (6, 4), slide floor, from steel (0, 4) to WB (7, 4); the ditches (1, 3) to (6, 3), open, no link; the exit `E` (5, 5), open, above T (5, 4); the faces: (1, 5) and (3, 5) over the lane, WB at its right end, and the room's floor wall (1, 0) to (6, 0).
>
>   The lane is reached only out of a portal: from the room, shots cross the ditches to the lane's top wall, and out of (1, 5) or (3, 5) the subject lands on the lane facing down, stopped by the ditch. WB is seen only from the lane, along it. From the lane every column sees the room's floor wall, so the lane always has a way back (guideline 78), and its second face over the lane keeps a box left on one landing from sealing it (guideline 67: with only (3, 5), 2,016 states were dead).
>
>   Idea: carried in out of (3, 5), the box goes down on (4, 4), beside T, from the landing (3, 4), the one stop next to a tile beside T; the subject then comes at T from the other side, out of a portal on WB, sliding left along the lane and stopping before the box.
>
>   Route: shoot (3, 5) from column 3, and the floor wall under it; carry the box through, out onto (3, 4); turn right and put the box on (4, 4); shoot WB with the room's colour; walk up into (3, 5): out of WB onto (6, 4), sliding left, stopped on T by the box; up into the exit. 5 moves and 3 portals, or 4 moves and 4.
>
>   Lure: the box carried along the lane: the slide stops at its far end, (6, 4), from where it can go down only on T itself; no stop lies next to T on the far side, so the box can't go there. Purpose: a test of 9.2's stopper with portals, forcing a slide out of a portal along a lane. Flow, firm: WB, the one face on its wall, points at the answer (guideline 16). The lane's left end is steel, since with a portal on each end a slide along it would loop and be refused (guideline 86).
>
>   Risks: its last move is Playground 5's finish, out of a portal at a lane's end and along the lane to stop under the exit, with a box for Playground 5's ditch as the stopper, so the author may know it (guideline 113, both reviewers); the first slide out of a portal in the campaign is the key move itself, since out of the top faces the ditch stops the subject at once (its blind reviewer: low risk, it follows from 9.1). _Check:_ 67, 78, 79, 81, 85, 86, 109. Feasibility: 5 moves and 3 portals, 4 and 4; all 86,538 states can be finished; with WB steel, unsolvable; without the box, unsolvable; with the slide floor plain, solvable without the box.

Built as sketched.

## Purpose

Test: 9.2's stopper again, with portals, forcing a slide out of a portal along a lane: the box can go down only on the near side of T, so the subject comes at T from the far side, which only a portal on WB reaches.

Flow, firm: one step to see, the way in from the far end, with WB the one face on its wall pointing at it (guideline 16).

## Intended route

1. Up to (1, 2), right to (3, 2), and up: the ditch only turns the subject up. Shoot blue across the ditches onto (3, 5).
2. Down to (3, 1) and shoot orange down onto (3, 0).
3. Turn left and pick up the box from (2, 1).
4. Down: into orange, out of blue onto the landing (3, 4), facing down, stopped by the ditch below.
5. Turn right and put the box down on (4, 4), beside T.
6. Shoot orange right along the lane, over the box, onto WB.
7. Up: into blue, out of WB onto (6, 4), sliding left onto T, stopped by the box. The key move: in from the far end, out of a portal onto slide floor.
8. Up into the exit.

This route takes 7 moves and 3 portals. The fewest portals are 3, in 5 moves, and the fewest moves 4, with 4 portals (`--baseline` and `--par` agree); every such route also comes out of WB onto the lane. It needs the turn key (guideline 66).

## Lure and where the player should get stuck

The box carried along the lane: the slide carries it to the far end, (6, 4), from where it goes down only on T itself, since no stop lies next to T on the far side; and the subject alone, crossed in and slid along the lane, passes T to the far end. Both fail plainly and at once (guideline 4). Where the player should get stuck is seeing that the box can only go on the near side, so the slide onto T has to come from the far one.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditches between the room and the lane | Walking into the lane: it is reached only out of a portal, so the box comes in carried through one |
| 2 | The lane's left end (0, 4) steel | A slide along the lane looping through a portal on each end, which would be refused (guideline 86) |
| 3 | WB the right wall's one face | Nothing: it is the far end's way in. Checked: with WB steel, unsolvable |
| 4 | (1, 5) beside (3, 5) | A box left on one landing sealing the lane (guideline 67): with (3, 5) alone, 2,016 states were dead |
| 5 | The room's floor wall taking portals | The lane's way back: every lane column sees it (guideline 78); with fewer faces there, dead states |
| 6 | The exit in the lane's top wall over T, slide floor on both sides of T | A stop under the exit without the box. Checked: without the box, unsolvable |

## Facts that must never be possible

- Finishing without a slide out of a portal on WB. Checked: with WB steel, unsolvable.
- Finishing without the box. Checked: without it, unsolvable.
- A dead state. Checked: all 86,538 reachable states can be finished.
- The subject standing in something blocked. Checked: none.
- A slide that loops: only WB lets a slide go on out of a portal, so none can (restriction 2).

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Crossing in without the box and sliding right | A slide past T to the far end, under the open exit |
| 2 | The box carried along the lane | It rides to the far end; from there it goes down only on T, and the slide back stops beside it |
| 3 | The box put down on T | Every slide stops beside it; picked up again from there |
| 4 | Sliding into WB with the pair open | Out of the other portal, wherever it is |
| 5 | A crossing onto a tile where the box rests | Refused, with the error sound (a box bars its tile, run 3) |
| 6 | A shot at the steel | A miss ripple |

## Variants tried

- The sketch's first draft: one face over the lane, (3, 5): a box left on the landing sealed the lane, 2,016 dead states (guideline 67); a second face, (1, 5), added.
- A narrower draft, 7 wide, the landing next to the lane's left end: the box could go down on the landing from there, the same seal (1,200 dead states).
- Ditches in place of a laser run as the fence: the plainer element (guideline 17), and no glow to draw the eye (guideline 20).
- The lane's left end steel, not a face: with a portal on each end a slide along the lane loops and is refused (guideline 86).

## Checks

- `npm run solve -- --baseline --par`: 4 moves and 4 portals for the fewest moves, 5 moves and 3 portals for the fewest portals, both searches; 9 portal wall sides; key 21 bits.
- Copies: with WB steel, unsolvable; without the box, unsolvable; with the slide floor made plain, solvable without the box.
- Every reachable state (86,538) explored through the rules' step: none dead, none with the subject standing in something blocked; the moves that only turn are crossings refused onto the resting box. With every turn action refused: no completion, as the turn key is needed.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 18 to 21 as built, their plan entries and the earlier chambers' files, not these notes) found no shortcut, no dead end and nothing that looks broken: 86,538 states, none dead; with WB steel, or without the box, unsolvable; with either top face steel, still solvable, so either works (guideline 31). Its findings:
  - Its entry's lesson is shown, not tested (guideline 27): every route slides out of WB, but in a straight lane that slide is what the next press would do anyway, so a player who believes the subject stops where it comes out makes the same plan and succeeds; and the landings out of the top faces, stopped at once by the ditch, seed that belief. What it tests is reaching the far side of a placed box through a portal, a good catch. Answered: the room kept, the slide out of a portal carried forward in the outline (`docs/campaign.md`, run 9) to a later chamber that needs the player to act where the subject comes out, before any chamber relies on it. A layout putting T in front of WB, so the slide would carry the subject off it, was tried in thought and fails: the lane's end stops a slide there without the box.
  - Its first half, both portals shot and the box carried across the ditch, is chamber 1.4's move, a warm-up here; the frame differs, and nothing reads as Playground 6.
  - The lure works: the box carried in and slid along the lane goes down only under the exit, plainly and at once; recovery is long but never dead.
  - Crossings refused onto the resting box, with the error sound, the run 1 rule, met only off the route.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their route isn't known until their solution is recorded (guideline 106) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
