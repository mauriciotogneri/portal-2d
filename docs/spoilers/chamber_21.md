# Chamber 21 (run 9, chamber 9.4)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, mirrored, its start moved on its fresh reviewer's finding; checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their solution is not recorded yet. File: `src/chambers/chamber_21.json`, twenty-first in the play order; permanent id 21. Run 9's combine and last chamber (`docs/campaign.md`, "Run 9 in detail"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 9, chamber 4, combine. Elements: slide floor, a laser a button switches, a box, a button, a switch and the exit, with antlines; every wall steel. The player knows runs 1 to 8, and 9.1 to 9.3. It should teach that a laser a button switches, over slide floor, lets a slide go on while held off, and stops a slide before it while on. Hint: none (convention 7).

## Layout

8 × 5. Along the top floor row, from the left: the switch **s** (1, 3), then the lane, slide floor, (2, 3) to (5, 3), with the laser **Z** across it at (3, 3) and T (4, 3) under the exit, then the plain tile (6, 3), the lane's right end. Below it, the start (6, 2) joins the lane to the bottom row: B (4, 1), the box (5, 1) and (6, 1). Every wall is steel.

```
y4  ■ ■ ■ ■ E ■ ■ ■
y3  ■ s = Z = = . ■
y2  ■ ■ ■ ■ ■ ■ S ■
y1  ■ ■ ■ ■ o b . ■
y0  ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7
```

`■` steel, `=` slide floor, `S` the subject's start (6, 2), facing up the lane's plain end, `b` the box (5, 1), `o` B (4, 1), linked to `Z` (3, 3), a laser running V (up and down, across the lane), on slide floor, so it starts on, `s` the switch (1, 3), linked to the exit `E` (4, 4), closed, above T (4, 3).

Two antlines:

- B to Z: (4, 1), (3, 1), (3, 3): left onto the steel beside B and up through Z's lower end plate wall (3, 2) into Z from below, over steel only.
- The switch to the exit: (1, 3), (1, 4), (4, 4): up onto the top wall and right along it to the exit, over steel only.

No lane starts next to B, so no slide leaves it (guideline 84), and B stands two tiles from Z, beside nothing it links (guideline 59). The lane is entered only from (6, 3); the switch is reached only by a slide along it, through Z while it is off; T only by a slide that something stops there, which with every wall steel and the box unable to go down on Z's tile can only be Z, on.

## Idea

T has nothing to stop a slide but Z, so once the switch has opened the exit, the box comes off B, Z switches on, and the slide from (6, 3) stops before it, under the exit: the first chamber where a link is wanted blocked.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 9 in detail"), unmirrored:

> - **Run 9, chamber 4: the laser you want on** (combine; slide floor, a laser a button switches, a box, a button, a switch, the exit). 8 × 5, every wall steel:
>
>   ```
>   y4  # # # E # # # #
>   y3  # . = = Z = s #
>   y2  # . # # # # # #
>   y1  # S b o # # # #
>   y0  # # # # # # # #
>       0 1 2 3 4 5 6 7
>   ```
>
>   `S` the start (1, 1), facing right at the box `b` (2, 1); `o` B (3, 1), linked to `Z` (4, 3), so Z starts on; the lane, from the plain tile (1, 3) along (2, 3) to (5, 3), to the switch `s` (6, 3), where a slide stops, linked to the exit `E` (3, 4), closed, above T (3, 3); (1, 2) joins the start row to the lane's plain end. Antlines: B to Z, (3, 1), (4, 1), (4, 3), up through Z's lower end plate wall; the switch to the exit, (6, 3), (6, 4), (3, 4), along the top wall. No lane starts next to B, so no slide leaves it (guideline 84).
>
>   Idea: T has nothing to stop a slide but Z, so once the switch has opened the exit, the box comes off B, Z switches on, and the slide from (1, 3) stops before it, under the exit: the first chamber where a link is wanted blocked.
>
>   Route: pick up the box and put it on B (Z switches off); up to (1, 3); right: the slide passes T and Z and stops on the switch; use it (the exit opens, its line lights); left: the slide goes back past Z and T to (1, 3); down to the start row and lift the box off B (Z switches on); up to (1, 3); right: the slide stops on T before Z; up into the exit. 14 moves, 0 portals, 18 presses.
>
>   Forced: Z off for the slides to and from the switch, Z on for the last, so the player chooses when B is held. Lure: the box left on B, the done look of every chamber since 1.3 (guideline 19), so each slide under the open exit passes it, both ways, by a clear margin; with Z a door (on plain floor) each would stop on the door tile beside T, a near miss (guideline 4), which over slide floor the laser avoids. Gem, light: one realisation, a short route.
>
>   Risks: lifting the box off its button to undo its link is chamber 8.1's last step and 7.2's key move, so it may read as old, though here it makes a stopper (guideline 113); the switch's trip is a walk only the slide floor makes needed (with plain floor the route is 13 moves, chamber 4.1's shape, no lift), and a light barrier would do the laser's job (guideline 17, bent on purpose, `docs/campaign.md`, run 9). _Check:_ 59 (B two tiles from Z, beside nothing it links), 62 and 96 (a line from B and from the switch), 80 (the switch on no put-down tile), 82 (the switch where a slide ends), 84, 67, 33. Feasibility: 14 moves and 0 portals, the fewest; all 293 reachable states can be finished; with Z always on, or always off, unsolvable; with the slide floor plain, 13 moves without the lift; with Z a door, 16 moves.

Built mirrored left to right, so that its start isn't 9.3's, bottom left facing right at a box beside it (the run's handbook reviewer, guideline 113); then, on its fresh reviewer's finding that the mirrored start, bottom right facing left at the box with the button beyond, was chamber 16's, the start moved up to (6, 2), between the lane and the box's row, facing up. The states are the same 293; the route takes one move more.

## Purpose

Combine: the laser a link switches, carried from run 5, needed both ways in one route over slide floor: held off, it lets the slides to and from the switch go on; on, it stops the last slide under the exit. With run 4's switch. It breaks a habit every chamber since 1.3 has trained, the box left on its button once what it opens is open (guidelines 19 and 41: a twist that breaks a belief), since here the link is wanted blocked.

Flow: one realisation, that the laser has to come back on, which a player fetching the box as a stopper may reach without seeing it (its fresh reviewer); its keeping is judged on the author's cold play.

## Intended route

1. Down to (6, 1); left: the box only turns the subject to face it; interact: pick it up.
2. Left to (5, 1); interact: the box goes down on B. Z switches off; B's line lights.
3. Right to (6, 1), up to (6, 2), up onto (6, 3).
4. Left: the slide runs along the lane, through Z and past T, and stops on the switch.
5. Interact: the switch is used; the exit opens and its line lights.
6. Right: the slide runs back past Z and T to (6, 3).
7. Down twice, to (6, 1), and left to (5, 1); interact facing B: the box comes off B. Z switches on. The key move: the laser put back on.
8. Right, up twice to (6, 3).
9. Left: the slide stops on T, before Z.
10. Up into the exit.

This takes 15 moves and no portal, the fewest (`--baseline` and `--par` agree); the turn key isn't needed.

## Lure and where the player should get stuck

The box left on B, the done look of every button since chamber 1.3 (guideline 19): with Z off, each slide under the open exit passes T, both ways, by a clear margin, to the switch or back to (6, 3) (guideline 4). Where the player should get stuck is that the open exit can't be stopped under, and that the one stopper there is the laser, which the box keeps off.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | Z on slide floor | A stop on Z's tile while it is off: the slides go on through it, so T has no stop but Z on |
| 2 | B off the lane, two tiles from Z | A slide off B through Z while B is still judged held (guidelines 23 and 84), and the subject holding Z off beside it (59) |
| 3 | The switch the lane's far end | The trip through Z off: the exit opens only from beyond it. Checked: with Z always on, unsolvable |
| 4 | T between Z and the lane's plain end, slide floor | A stop under the exit while Z is off. Checked: with Z always off, unsolvable |
| 5 | The box the chamber's one, and no tile beside T where it could go down while Z is on | The box as the stopper instead of Z: it can't go down on Z's tile while Z is on, nor stay there as Z comes back on |
| 6 | Every wall steel | Portals: no shot route round the lane |

## Facts that must never be possible

- Finishing without Z off once and on once: checked, with Z always on and always off, unsolvable.
- The subject standing in Z while it is on, or anything else blocked. Checked: none among the 293 reachable states.
- A dead state. Checked: all 293 reachable states can be finished.
- The box under the subject: nothing sends a box home in this chamber.

## Guidelines broken on purpose

None. Guideline 17 is bent, on the run's plan: a light barrier would do the laser's job here (`docs/campaign.md`, "Run 9 in detail"); with Z a door, on plain floor, it solves too (17 moves), but each slide past T would stop on the door tile beside it, a near miss (guideline 4).

## Near misses and wrong tries

None is a dead end: the subject is never beyond Z while it is on, since only lifting the box switches it on, from the start row.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | The lane slid before the box is on B | The slide stops on T, before Z, under the exit, still closed, its line unlit |
| 2 | The slides under the open exit with the box on B | Past T both ways, by a clear margin |
| 3 | Walking onto B without the box | Z switches off while the subject stands there and on as it steps off |
| 4 | The box carried up into the lane | It rides along; Z is on, so the slide stops on T, the box in hand; it can go down beside T, where nothing is gained |
| 5 | The box put down in the lane | It bars the lane until picked up from beside it |
| 6 | Interact on the switch carrying the box | Refused, with the error sound; the box stays carried (guideline 80) |

## Variants tried

- The run's first combine, the slide off the button (the idea pool, "Sketched for a run"): dropped before approval on both reviewers' findings, for a broken state, a key move that was the natural walk and the look of a timing check.
- This one as sketched, unmirrored; mirrored (above).

## Checks

- `npm run solve -- --baseline --par`: 15 moves and no portal, both searches; no portal wall side; key 14 bits.
- Copies: with Z always on, unsolvable; with Z always off, unsolvable; with the slide floor made plain, 14 moves without lifting the box; with Z a door, on plain floor, 17 moves.
- Every reachable state (293) explored through the rules' step: none dead, none with the subject standing in something blocked, no move that only turns. With every turn action refused: 129, none dead.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 18 to 21 as built, their plan entries and the earlier chambers' files, not these notes) found no shortcut, no dead end and nothing that looks broken: 293 states, none dead, 129 with the turn key refused, none dead; with the laser always on, always off, or without the box, unsolvable; with the slide floor plain, the box is never lifted, so the catch is the slides'. Its findings:
  - The trained move may solve it by accident: after the overshoot, a player trained by 9.2 and 9.3 fetches the box to use as a stopper, and lifting it puts the laser on, so the next slide stops under the exit whatever they meant to do with the box. Answered: marked a flow (Purpose), its keeping to be judged on the author's cold play; watch whether they lift the box knowing the laser comes on, or are stopped by it by surprise.
  - It may read as chamber 16: holding an element with the box, getting past it, then lifting the box so it changes back and becomes the way, is 16's key move with a laser for the arrow, and its frame, the start bottom right facing left at the box with the button beyond, was 16's too. Answered: the start moved to (6, 2), facing up the lane, off the box's row; the key move stays, to be judged on the cold play. If it reads as repetitive or slight, give the box a second job on the slide floor so lifting it costs something.
  - The antlines are neither hidden nor missing, but the switch's line runs along the top wall over (3, 4), right above the laser, and the button's comes up column 3 into the laser from below, so seen whole column 3 could read as one line from the button through the laser to the exit's. Not checked in the game (the extension wasn't connected): watch it in the author's play, and if it misreads, route the switch's line round, which with row 2 solid steel takes it along the bottom wall.
  - The likely wrong tries fail plainly: the first slide, before the box is on B, stops under the closed exit, which shows the laser stopping a slide early (guideline 25).

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their route isn't known until their solution is recorded (guideline 106) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
