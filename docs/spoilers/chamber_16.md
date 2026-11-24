# Chamber 16 (run 7, chamber 7.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-24, after their cold play; their run's solution is not recorded yet. File: `src/chambers/chamber_16.json`, sixteenth in the play order; permanent id 16. Designed together with chamber 7.1 (id 15), both before the author plays either (approved with the plan, 2026-11-24, as for runs 2 to 6); a third, 7.3, was built with them and cut before the author played it, as reading as this chamber reversed (the idea pool, "Sketched for a run"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 7, chamber 2, teach, and the run's last chamber, since 7.3 was cut and the run has no combine (`docs/campaign.md`, "Run 7 in detail"). Elements: an arrow a button turns, a box and the exit, with an antline; steel is known from run 1. The player knows runs 1 to 6 and chamber 7.1. It should teach that a button turns an arrow while held, its antline leading to it, and lets it turn back when released, even under the subject, who turns with it. Hint: none (convention 7).

## Layout

5 × 6. A ring of floor round a steel tile, the turnable arrow on the ring's top middle, and above it a one-tile column up to the open exit in the top wall. The button is the ring's top left tile, right beside the arrow; the start is the ring's bottom right tile, facing the box beside it. Every wall is steel.

```
y5  ■ ■ E ■ ■
y4  ■ ■ . ■ ■
y3  ■ B A . ■
y2  ■ . ■ . ■
y1  ■ . b S ■
y0  ■ ■ ■ ■ ■
    0 1 2 3 4
```

`■` steel, `S` the subject's start (3, 1), facing left, `b` the box (2, 1), `B` the button (1, 3), linked to `A`, the arrow (2, 3), pointing up, turned left while B is held, `E` the exit (2, 5), open.

A's own way's entry tile, (2, 2), is steel, so A is entered only moving left, from (3, 3), while B is held; its own way leads up the column to the exit, which nothing else reaches. B's free sides are (1, 2), below it, and A.

One antline, B to A: (1, 3), (1, 2), (2, 2), (2, 3): down onto the ring's left tile, right over the steel in the ring's middle and up into A from below. Straight from B to A, one tile, both its dots would lie under the button (`dotsAlong` in `src/game/antline_drawing.ts`), so it goes round, as Playground 8's does.

## Idea

The box on B turns A to point at it, so the subject steps onto A from the right; there it faces the box, and lifting it lets A turn back up under the subject, which turns with it to face the exit.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 7 in detail"):

> - **Run 7, chamber 2: the box on the button ahead** (teach). 5 × 6, every wall steel: the layout above, with `#` for steel and `o` for B.
>
> Idea: the box on B turns A to point at it, so the subject steps onto A from the right; there it faces the box, and lifting it lets A turn back up under the subject, which turns with it to face the exit. Route: pick up the box; left, left, up; put the box on B (A turns left, in view); down, right, right, up, up; left onto A; lift the box (A turns up under the subject); up, up into the exit. Forced: all of it; on A, lifting the box is the only thing to do.
>
> Risks: the turn under the subject is met by doing the only thing left, not worked out, which a teach may be (guideline 24); the walk round is five steps (guideline 37). _Check:_ 77 (A points left only while the box is on B, when the subject on A faces it and can lift it; up, the exit's column), 89 (the subject sees A turn as the box goes down), 90, 96. Feasibility, 2026-11-24: 11 moves and 0 portals; all 204 reachable states can be finished, and all 112 without the turn key; a copy with B unlinked is unsolvable from `--par`.

Built as its sketch, tile for tile.

## Purpose

Teach: the arrow a link turns, both ways, and the turn under the subject. The box goes on B from (1, 2), right beside A, so the player sees A turn as it goes down (guideline 89).

Flow: no catch; on A the one thing to do is lift the box, and the turn shows the rest.

## Intended route

1. Interact: pick up the box from (2, 1).
2. Walk left to (1, 1) and up to (1, 2), facing B; interact: the box goes down on B, the line lights, and A turns left, pointing at it.
3. Walk down, right along the bottom row to (3, 1) and up to (3, 3).
4. Step left onto A, facing the box on B.
5. Interact: lift the box; B comes up and A turns back up under the subject, which turns with it. The key move, met as the only thing left.
6. Walk up into the exit.

This route takes 11 moves and 0 portals, the fewest (`--baseline` and `--par` agree); the turn key isn't needed.

## Lure and where the player should get stuck

None set: a teach (guideline 24). A player may stand on B first: A turns left, and from B it can't be entered, since it points back at B; stepping off turns it up again, which shows the link both ways. On A, the up key does nothing until the box is lifted.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | (2, 2), under A, steel | Entering A on its own way: A is entered only turned, from (3, 3) |
| 2 | The exit's column, (2, 4), reached only from A | Reaching the exit without being on A as it turns back up |
| 3 | B beside A, its only other free side (1, 2) | The box going down out of sight of A's turn (guideline 89) |
| 4 | Every wall steel | Portals: the chamber needs none (guideline 56) |

## Facts that must never be possible

- Finishing without lifting the box from A. Checked: the walk refusing every pickup made from A's tile reaches no completion.
- The box under the subject. Nothing sends a box home in this chamber.
- A dead state. Checked: all 204 reachable states can be finished, and all 112 with the turn key refused.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Pressing left from (3, 3) before the box is on B | Nothing but a turn: A points up |
| 2 | Standing on B | A turns left while the subject stands there, can't be entered from B, and turns back on the step off |
| 3 | Pressing up on A before lifting the box | Nothing: A points at the box |
| 4 | The box put down on the ring, or at (3, 3) | Picked up again from beside it |

## Variants tried

- Built as sketched; its blind reviewer, given only the file and the entry, found every lesson forced and no shortcut.
- Its antline, first straight from B to A, one tile, went round on its fresh reviewer's finding (Layout).

## Checks

- `npm run solve -- --baseline --par`: 11 moves and 0 portals, both searches; no portal wall side; key 12 bits.
- A copy with B unlinked: unsolvable from `--par`.
- Every reachable state (204, one completed) explored through the rules' step: none dead. With every turn action refused: 112, none dead.
- The walk refusing every pickup made from A's tile: no completion.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 15 to 17 as then built, their plan entries and the earlier chambers' files and notes, not these notes) found no shortcut and no dead end: 11 moves and 0 portals; 204 states, none dead, 112 with the turn key refused; every route puts the box on B, steps onto A turned and lifts the box from it. Its findings:
  - The antline, one tile from B to A, lay under the button, both its dots inside the button's plate, and under the box once it is down (guidelines 96 and 112; worked out from the drawing code, not seen in the game): routed round, over the ring's middle (Layout).
  - On A facing the box on B, every move key does nothing (three ways aren't A's, the fourth is the box), which can look like being frozen on an arrow until the player presses interact, the lesson itself; a player may restart instead (guideline 9). Left to the author's cold play.
  - 7.3, as then built, read as this chamber turned a quarter turn, its key move this one's reversed (guideline 113): 7.3 was cut.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their route isn't known until their solution is recorded (guideline 106) |
