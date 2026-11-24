# Chamber 17 (run 8, chamber 8.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-24, after their cold play; their run's solution is not recorded yet. File: `src/chambers/chamber_17.json`, seventeenth in the play order; permanent id 17. Run 8's one chamber (`docs/campaign.md`, "Run 8 in detail"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 8, chamber 1, combine, and the run's only chamber: the light barrier's first contact and run 7's missing combine, serving arrows too. Elements: a light barrier, a laser, an arrow a button turns, an arrow, a box, a button and the exit, with antlines. The player knows runs 1 to 7. It should teach that a light barrier stops the subject and shots while on, as a closed door does, where the laser beside it stops only the subject, and that its button switches it off while held; that one button can link two elements, each with its antline; and that an arrow a button turns can close a way. Hint: none (convention 7).

## Layout

7 × 6. Along the third row, from the left wall: **F**, the landing **t** (1, 2), the laser, the light barrier, then the start area, (4, 2), (5, 2), (4, 1) and the button B (5, 1), with the box at (4, 1). Under t, the tile (1, 1) and the exit in the bottom wall. Above the start area's left column, the turnable arrow **A** (4, 3), and above it the pocket, (4, 4) and (5, 4), under **G**; from the pocket's right tile a fixed arrow (5, 3) leads back down to the start. Every wall is steel but F and G.

```
y5  ■ ■ ■ ■ G ■ ■
y4  ■ ■ ■ ■ . . ■
y3  ■ ■ ■ ■ A v ■
y2  F . Z L . S ■
y1  ■ . ■ ■ b B ■
y0  ■ E ■ ■ ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `S` the subject's start (5, 2), facing left, `b` the box (4, 1), `B` the button (5, 1), linked to `L` and `A`, `Z` a laser (2, 2), V, on, no link, `L` the light barrier (3, 2), V, linked, so it starts on, `A` the arrow (4, 3), pointing up, turned left while B is held, `v` a fixed arrow (5, 3), pointing down, `E` the exit (1, 0), open, `F` a plain wall (0, 2), `G` a plain wall (4, 5).

The faces: **F**, the east face of (0, 2), over t, T's top tile, T being t and (1, 1), above the exit; **G**, the bottom face of (4, 5), over the pocket's tile (4, 4). F is seen only along row 2, through L and over the laser; G up column 4, from (4, 2) and (4, 1) over A, or from the pocket. B is off row 2: standing on it, the subject sees no line to F, since row 1 ends at the steel (3, 1).

The parts: the start area, with L's tile while L is off; T, reached only out of F; the pocket, reached only up through A while it points up (turned left, A is entered only moving left, from the fixed arrow, which lets the subject move only down, so never) and left only down the fixed arrow or by portal.

Two antlines, both from B:

- B to L: (5, 1), (5, 0), (3, 0), (3, 2): down onto the bottom wall, left along it, and up through L's lower end plate wall (3, 1) into L from below. It runs over steel only, under no element.
- B to A: (5, 1), (5, 2), (4, 2), (4, 3): up across the start, left, and up into A from below, clear of the fixed arrow (guideline 112).

## Idea

B both switches L off and turns A away, so the box on B opens the line to F but shuts the way up to the pocket, where the subject walks into G; the shot through L comes first, and its portal stays when lifting the box switches L back on and turns A back up.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 8 in detail"); the chamber has its light barrier and laser swapped, (2, 2) and (3, 2) in the sketch:

> - **Run 8, chamber 1: the window and the gate** (combine; the light barrier's first contact, and run 7's missing combine, serving arrows). 7 × 6, every wall steel but F and G:
>
> ```
> y5  # # # # G # #
> y4  # # # # . . #
> y3  # # # # A v #
> y2  F . L Z . S #
> y1  # . # # b o #
> y0  # E # # # # #
>     0 1 2 3 4 5 6
> ```
>
> `S` the start (5, 2), facing left; `b` the box (4, 1); `o` B (5, 1), linked to `L` (2, 2) and to `A` (4, 3), an arrow pointing up, turned left while B is held; `Z` (3, 2), on, no link; `E` (1, 0), open; `F` (0, 2), its east face over T's top tile (1, 2), T being (1, 2) and (1, 1), above the exit; `G` (4, 5), its bottom face over the pocket's tile (4, 4); `v` (5, 3), the pocket's one-way way back to the start. Antlines: B to L, (5, 1), (5, 0), (2, 0), (2, 2), along the bottom wall and up through L's lower end plate wall; B to A, (5, 1), (5, 2), (4, 2), (4, 3), clear of the fixed arrow (guideline 112).
>
> The pocket, (4, 4) and (5, 4), is reached only up through A while it points up (turned left, A is entered only moving left, from the fixed arrow, so never), and left only down the fixed arrow or by portal; T only out of F. F is seen only along row 2, over the laser and through L; G up column 4, over A, or from the pocket. B is off row 2: standing on it, the subject sees no line to F (row 1 ends at the steel (3, 1)), so the box holds B.
>
> Idea: B switches L off and turns A away, so the box on B opens the line to F but shuts the way up to the pocket, where the subject walks into G; the shot through L comes first, and its portal stays when lifting the box switches L back on and turns A back.
>
> Route: pick up the box; put it on B (L switches off, A turns left, both lines light); shoot F, over the laser and through L; shoot G up column 4; lift the box (L switches on, A turns back up); walk up through A into the pocket and into G, out of F onto (1, 2); down twice, out through the exit. Forced: F shot while the box holds B; the lift after it; the portal on F outlasting L. Offered: carrying the box along, or leaving it.
>
> Lure: chamber 2.4's held door, standing on B, which switches L off but sees no line to F, a miss on steel; then the box left on B, the natural "done" state (guideline 19), with A visibly turned against the subject. The likeliest first press, a shot from the start, passes the laser and stops at L.
>
> Risks: both reviewers rate it a light flow with a thin catch: shooting first and lifting second is the natural order, so the conflict may never be felt, and a player who lifts the box to carry it along before trying A never meets A shut (guideline 108); it may read as chamber 5.1 (the box on the button, then a shot over the laser past what it opened) followed by 7.2 (the box lifted, the arrow turning back), with 6.2's opening shot. The box has no job once lifted (guideline 19). Judge it on the author's cold play; if it reads as old, cut it and let run 9 meet the light barrier. _Check:_ 59 (B beside neither L nor A), 60 (B's neighbours steel; no face faces L), 62 and 96 (a line from B to each), 77 (A turned can't be entered; A up leads into the pocket; the fixed arrow leads to the start), 78 (the pocket's fixed arrow back), 89 (B in view of A), 90 (A reached from plain floor), 67 (a box on A, below it, on the start or in the pocket is picked up from beside it), 112. Feasibility, 2026-11-24: 8 moves and 2 portals, both the fewest (`--baseline` and `--par` agree), 18 presses; all 1,168 reachable states can be finished, and all 309 with the turn key refused (22 presses); a copy with L always on is unsolvable (432 states); with A fixed (B linking L only) it finishes with the box left on B, so A's link forces the lift; with the laser made floor, walking through the open L needs no portal; with L made a door, it solves the same, so the light barrier does nothing here a door wouldn't, acceptable since meeting it is the point. On its handbook reviewer's findings the first draft's exit moved under T, since it ended on chamber 6.2's tiles (out on the left wall's middle, down, left into the exit), and its line to A was rerouted off the fixed arrow.

One change since the sketch: its fresh reviewer found that with the laser in front of L no route ever walks into L, so "stops the subject" was never met (guideline 108); the two swapped, the start's first walk left stops at L, and with L off the subject steps onto its tile and stops at the laser, so both halves of each are met on the natural first walk. The cost: the first shot from the start no longer shows the laser letting it through before L stops it; the shot at F shows that later.

## Purpose

Combine: the light barrier's first contact, its rules a door's, set against a laser that lets shots through (guideline 17), and run 7's missing combine (guideline 42): one button linked to two elements for the first time, one of them an arrow it turns to close a way, the one thing a link can do only to an arrow ("Links only open things", the patterns' facts in `docs/level_design.md`). Before slides and rays a light barrier does nothing a door doesn't, so it has no teach of its own (`docs/campaign.md`, run 8).

Flow, light: one realisation, that the shot through L can be made before the box comes off B, in a chamber with a short route.

## Intended route

1. Step left to (4, 2) and down into the box, facing it; interact: pick it up.
2. Step down to (4, 1); turn right in place; interact: the box goes down on B. L switches off and A turns left; both lines light.
3. Step up to (4, 2) and left onto L's tile; press left (the laser only turns the subject) and shoot blue over the laser onto F.
4. Step right to (4, 2); press up (A, turned left, only turns the subject) and shoot orange up column 4, over A, onto G.
5. Step down to (4, 1); press right (the box only turns the subject); interact: lift the box. L switches on and A turns back up; the portal on F stays. The key move: the box comes off after the shot.
6. Walk up through A into the pocket and into G; come out of F onto t, facing right; walk down twice and out through the exit.

This route takes 12 moves and 2 portals; the fewest is 8 moves and 2 portals (`--baseline` and `--par` agree), picking the box up from B's tile, putting it down on B from (5, 2) and shooting F from there, without stepping onto L's tile. The box can be carried out or left anywhere; the shots can be fired in either order, F from L's tile, (4, 2) or (5, 2), and G from (4, 2), (4, 1) or the pocket. With the turn key refused it takes a lap to put the box on B from above (22 presses).

## Lure and where the player should get stuck

The start faces F along row 2. The likeliest first press, a shot, stops at L, one tile away: the band reacts. The likeliest first walk, left, stops at L too. Standing on B (chamber 2.4's held door) switches L off but sees no line to F: a miss on steel; with the box on B, walking left, the subject crosses L's tile and stops at the laser. Then the box left on B, the natural "done" state (guideline 19), with A visibly turned against the subject and its line lit. Where the player should stop is seeing that the portal on F, once shot, doesn't need L off any more.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The laser between L and T | Walking through L while the box holds it off, straight to T and the exit with no portal. Checked: the copy without the laser finishes in 8 moves and 0 portals |
| 2 | B off row 2, its row ending at the steel (3, 1) | The subject holding L off itself and shooting F from B (2.4's move), which would leave the box nothing to do |
| 3 | A linked to B, turned left while held | Leaving the box on B and walking up to the pocket. Checked: the copy with A fixed finishes with the box left on B |
| 4 | A turned can't be entered (its back is the fixed arrow) | The subject on A when it turns, and an arrow pointing at steel to stand on (guideline 77) |
| 5 | The fixed arrow (5, 3) pointing down | A way up to the pocket that skips A; with it floor, its fresh reviewer found 7 dead states, frozen on the turned arrow entered from (5, 3), and the climb not needing the box lifted |
| 6 | The exit in the bottom wall under T | T's ending on chamber 6.2's tiles (out of the left wall's middle, down, then left into the exit) |
| 7 | Every other wall steel | Faces the idea doesn't need (guidelines 56 and 75) |

## Facts that must never be possible

- A portal opening on F while L is on, or from B. Checked: none among every transition of the 1,196 reachable states.
- The subject on A or in the pocket while B is held. Checked: none.
- Crossing into T with the box on B. Checked: none of the 60 crossings into T.
- L switching on with the subject on its tile, or with a box on it (guideline 59). Checked: none; the box comes off B only from (4, 1) or (5, 2), and there is one box. The subject walks onto L's tile, while it is off, on 35 transitions.
- The box under the subject. Nothing sends a box home in this chamber.
- A dead state. Checked: all 1,196 reachable states can be finished, and all 337 with the turn key refused.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting F from the start before anything else | The shot stops at L: the band reacts, a miss ripple |
| 2 | Walking left from the start | L stops the subject at (4, 2) |
| 3 | Standing on B and shooting left | L switches off, but the shot hits the steel (3, 1): a miss ripple |
| 4 | Walking left while the box holds B | Onto L's tile, then the laser stops the subject |
| 5 | The box left on B, then pressing up at A | A points left, so the subject only turns; both lines stay lit |
| 6 | Lifting the box before shooting F | L is back on; the box goes back on B for the shot |
| 7 | Walking up through A first, before anything | The pocket sees G only; the fixed arrow leads back down to the start |
| 8 | The box put down on A, below it, on the start or in the pocket | It bars that tile until picked up from beside it, which is always reachable. It never goes down on L's tile: that takes L off, so B held, and the one box is the one carried |
| 9 | Carrying the box through the pair | Fine: the exit takes a carried box |

## Variants tried

- The sketch's first draft: the exit at (0, 1), in the left wall beside F, T being t and (1, 1) to its right, and B's line to A running (5, 1), (5, 3), (4, 3), under the fixed arrow (1,168 states, none dead; 307 with the turn key refused). Its handbook reviewer found its ending chamber 6.2's (out at (1, 2), down, left into the exit, on the same tiles) and its line seeming to link the fixed arrow (guideline 112).
- The sketch as approved: the exit under T, the line rerouted, the laser in front of L (1,168 states, none dead; 309 with the turn key refused). Built so, then L and the laser swapped on its fresh reviewer's finding (Idea, above).
- This one: L at (3, 2), the laser at (2, 2), L's line turning up at (3, 0).
- A teach sketched with it, the band beside the laser on one row, was dropped before approval: it was chamber 2.4's route with the door a light barrier (the idea pool, "Sketched for a run").

## Checks

- `npm run solve -- --baseline --par`: 8 moves and 2 portals, both searches; 2 portal wall sides; key 17 bits.
- Copies: with L always on (B linking A only), unsolvable from `--baseline` and `--par` (432 states); with A fixed (B linking L only), 8 moves and 2 portals, the box can stay on B; without the laser, 8 moves and 0 portals.
- Every reachable state (1,196, twelve completed) explored through the rules' step: none dead. With every turn action refused: 337, none dead, 22 presses.
- The facts above, checked on every transition of the reachable states.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the chamber file as then built, with the laser in front of L, its plan entry, the handbook, the rules and the earlier chambers' files and notes, not these notes) found no shortcut and no dead end: 1,168 states, none dead, 309 with the turn key refused; every route holds B for the shot at F and then lets it go; with L made a door the chamber is the same, which the plan accepts. Its findings:
  - It reads as chamber 2.4's core move (hold a barrier open, shoot through it onto the one far face, let it shut, the portal stays) in chamber 5.1's dress (7 × 6, the box beside its button by the start, a shot over a laser onto the far face); what is new is the release, forced by the arrow on the same button. The plan's known risk, left to the author's cold play.
  - L stopping the subject was never met, the laser in front of it on the only approach: L and the laser swapped (Idea, above).
  - The line to L turned up beside the open exit: the swap moves its turn a tile further off. The line to A leaves B upward, toward the fixed arrow, and turns on the start, under the subject, and runs under (4, 2) and (5, 2), where routes may park the box: no clearer route exists (round by the right wall it would cross the fixed arrow, round by the bottom it would cross the box's start), so check it in the game.
  - Seven kinds of element in 13 floor tiles, beyond guideline 18's two to four, much for a first contact: the plan's choice.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept: they liked it. Their route isn't known until their solution is recorded (guideline 106) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
