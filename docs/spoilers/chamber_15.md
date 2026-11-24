# Chamber 15 (run 7, chamber 7.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-24, after their cold play; their run's solution is not recorded yet. File: `src/chambers/chamber_15.json`, fifteenth in the play order; permanent id 15. Designed together with chamber 7.2 (id 16), both before the author plays either (approved with the plan, 2026-11-24, as for runs 2 to 6); a third, 7.3, was built with them and cut before the author played it (the idea pool, "Sketched for a run"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 7, chamber 1, teach, and the run's first chamber. Elements: arrows, a box, a button and the exit, with an antline; walls and steel are known from run 1. The player knows runs 1 to 6. It should teach that an arrow lets the subject on only its way, so a run of them is a one-way road, and that a portal takes the subject back past it. Hint: none (convention 7).

## Layout

7 × 6. A room along the fifth row, the start in its fourth tile facing the box at its right end and the exit in its left wall; from the room's middle tile a road of two arrows runs down to the bottom row, where the button stands two tiles left of the road's foot. Every wall is steel but two plain walls, **W** over the road's head and **Q** beside its foot.

```
y5  ■ ■ ■ W ■ ■ ■
y4  E . . . S b ■
y3  ■ ■ ■ v ■ ■ ■
y2  ■ ■ ■ v ■ ■ ■
y1  ■ B . . Q ■ ■
y0  ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `S` the subject's start (4, 4), facing right, `b` the box (5, 4), `v` arrows (3, 3) and (3, 2), pointing down, `B` the button (1, 1), linked to the exit, `E` the exit (0, 4), linked, so it starts closed, `W` a plain wall (3, 5), `Q` a plain wall (4, 1).

The faces: **W**, the bottom face of (3, 5), over the road's head (3, 4), the room's only face; **Q**, the west face of (4, 1), beside the road's foot (3, 1), the bottom row's only face. The room sees W; the bottom row sees Q along its row and W up the road's column, over the arrows.

One antline, B to the exit: (1, 1), (0, 1), (0, 4): left onto the wall and up the left wall into the exit from below. It runs over steel only, under no element.

## Idea

The button lies past the foot of a one-way road, so the subject goes down it, and comes back up only through a pair on Q and W, which it can make only from below.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 7 in detail"); the chamber is the sketch mirrored left to right, so its x is 6 minus the sketch's:

> - **Run 7, chamber 1: the box rides down** (teach). 7 × 6, every wall steel but W and Q:
>
> ```
> y5  # # # W # # #
> y4  # b S . . . E
> y3  # # # v # # #
> y2  # # # v # # #
> y1  # # Q . . o #
> y0  # # # # # # #
>     0 1 2 3 4 5 6
> ```
>
> `S` the start (2, 4), facing left at `b`, the box (1, 4); `v` a road of two arrows, (3, 3) and (3, 2), pointing down from the room's middle tile (3, 4) to the foot (3, 1); `o` B (5, 1), linked to `E` (6, 4), the exit, which starts closed; `W` (3, 5), a plain wall, its bottom face over the road's head, the room's one face; `Q` (2, 1), a plain wall, its east face beside the foot, the bottom row's one face. Antline: (5, 1), (6, 1), (6, 4), up the right wall into the exit.
>
> Idea: the button lies past the foot of a one-way road, so the box rides down it and the subject comes back alone, through a pair on Q and W. Route: pick up the box; right; down the road; right; put the box on B (the exit opens); shoot Q, and W from the foot, over the arrows, or from the room before going down; walk into Q and out of W onto (3, 4); right to the exit. Forced: walking the road its way, with the box; the crossing back, since Q is shot only from the bottom row. Offered: W shot from below, over the arrows.
>
> Risks: coming back by portal after a job down there is chamber 4.1's shape (a switch past a ditch, guideline 113). The first draft, with the box at the foot and the button in the room, was chamber 1.4's catch and route, the box picked up, put down to shoot and carried back through the pair (its handbook reviewer), so the box and the button swapped. _Check:_ 75 (two faces), 78 (the bottom row sees W up the road and Q beside it: always a way back), 67 (a box on the road's head bars the road and is picked up from beside it), 77 (the road leads to the foot), 59 and 60 (B links only the exit, far off). Feasibility, 2026-11-24: 10 moves and 2 portals, both the fewest; all 1,362 reachable states can be finished, and all 1,011 without the turn key; copies with Q or W steel are unsolvable from `--par`; with the arrows plain floor, it is solvable with no portal.

Two changes since the sketch. Building it showed that the box riding down is offered, not forced: a route can walk the road empty-handed, come back up through the pair and take the box down through it. And its fresh reviewer found the sketch's frame was chamber 5.1's (`chamber_11.md`): the exit at (6, 4), the one top face at (3, 5), and every route ending out of that face facing down, then three steps right to the exit; so the chamber is mirrored, the route now ending three steps left.

## Purpose

Teach: the arrow, met as a road that goes one way, and a portal as the way back past it (guideline 74: a portal is needed only where something keeps the subject out but lets shots through, here the arrows' way). Arrows and turnable arrows were last taught in Playground 7 and 8, outside the campaign.

Flow: one step, seeing that the way back up is a pair made from below, in a chamber that looks as simple as it is (guideline 32).

## Intended route

1. Interact: pick up the box from (5, 4).
2. Walk left to (3, 4) and down the road to its foot, (3, 1). The road can't be walked back up.
3. Step left to (2, 1), facing B; interact: the box goes down on B and the exit opens; its line lights.
4. Step right to (3, 1), facing Q, and shoot blue onto Q.
5. Press up: the arrow above only lets the subject on going down, so it turns up in place; shoot orange up the road, over the arrows, onto W. The key move: the way back is a pair, made from below.
6. Walk right into Q and out of W onto (3, 4), facing down; walk left to the exit.

This route takes 10 moves and 2 portals, both the fewest (`--baseline` and `--par` agree); the turn key isn't needed.

## Lure and where the player should get stuck

None set: a teach (guideline 24). The likely wrong try is walking back up the road once down, or pressing a side key on it: on an arrow only its way does anything, and at the foot the up key only turns the subject. Where the player should stop is seeing that the bottom row's two faces, Q beside it and W up the road, make the way back.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | Q the bottom row's only face, its west face seen only from row 1 | A pair made from the room: the bottom row is reached first only by the road. Checked: the walk refusing every step onto the road reaches no completion |
| 2 | (3, 0), under the road's foot, steel | The room's shot down the road's column opening a portal below |
| 3 | W the room's only face, seen from the foot up the road's column | The bottom row always sees a way back (guideline 78) |
| 4 | The road's arrows pointing down | Walking back up: every route crosses back. Checked: the walk refusing every crossing reaches no completion |
| 5 | B two tiles from the road's foot and far from the exit | The subject holding the exit open itself (guideline 59), and B on the road's line, where the box would bar the foot |
| 6 | Every other wall steel | Faces the idea doesn't need (guidelines 56 and 75) |

## Facts that must never be possible

- Finishing without a crossing. Checked: the walk refusing every crossing reaches no completion.
- Finishing without walking down the road. Checked: the walk refusing every step onto (3, 3) reaches no completion.
- The box under the subject. Nothing sends a box home in this chamber.
- A dead state. Checked: all 1,362 reachable states can be finished, and all 1,011 with the turn key refused.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Walking back up the road, or a side key on it | Nothing on an arrow; at the foot the subject only turns up |
| 2 | Going down without the box | The pair brings the subject back up; the box goes down by the road or through the pair |
| 3 | Shooting W from the room before going down | Fine: Q is then the one shot left, from below |
| 4 | The box left on the road's head (3, 4) | The road is barred until it is picked up from beside it; the subject can't be below while it lies there |
| 5 | The box put down at the foot | The last arrow faces it, so it is picked up from there |
| 6 | Standing on B | The exit opens while the subject stands there and shuts on the step off |
| 7 | Shooting the steel, or down the road's column from the room | A miss ripple |

## Variants tried

- The sketch's first draft: the box at the foot, in a two-tile pocket, and B in the room beside the start (10 moves and 2 portals; 568 states, none dead, 30 dead with the turn key refused). Its handbook reviewer found it chamber 1.4's catch and route: the box picked up, put down to shoot and carried back up through the pair. Its blind reviewer found its antline, round the lower room, read as part of the circuit.
- The sketch as approved: the box and the button swapped, so the box goes down and the subject comes back alone; its antline short, up the right wall. Built so, then mirrored on its fresh reviewer's finding (Idea, above).
- This one: the sketch mirrored left to right.

## Checks

- `npm run solve -- --baseline --par`: 10 moves and 2 portals, both searches; 2 portal wall sides; key 16 bits.
- Copies with Q steel or W steel: unsolvable from `--par`. With the arrows made floor: 12 moves and 0 portals.
- Every reachable state (1,362, two completed) explored through the rules' step: none dead. With every turn action refused: 1,011, none dead.
- The walks refusing every crossing, and every step onto the road: no completion. The walk refusing every step onto the road while carrying the box: 1,162 states, completed in 20 presses (the box down through the pair), so the box riding down is offered.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 15 to 17 as then built, their plan entries and the earlier chambers' files and notes, not these notes) found no shortcut and no dead end: 10 moves and 2 portals; 1,362 states, none dead, 1,011 with the turn key refused; every route walks down both arrows and crosses back up; with the arrows plain floor, 12 moves and no portal, so the arrows alone make the portal needed. Its findings:
  - The frame was chamber 5.1's (guideline 113): mirrored, above.
  - Nothing else for this chamber; it rated it new and its lessons forced.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their route isn't known until their solution is recorded (guideline 106) |
