# Chamber 18 (run 9, chamber 9.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their cold run its recorded solution. File: `src/chambers/chamber_18.json`, eighteenth in the play order; permanent id 18. Run 9's first chamber (`docs/campaign.md`, "Run 9 in detail").

## Entry

Run 9, chamber 1, teach: the slide floor's first contact. Elements: slide floor and the exit, every wall steel. The player knows runs 1 to 8. It should teach that moving onto slide floor carries the subject on the way it moved until something stops it: it stops on plain floor, and before a wall. Hint: none (convention 7).

## Layout

8 × 5. A room of three rows, (1, 1) to (6, 3), all slide floor but three tiles of the middle row: the start (1, 2), plain floor against the left wall; the pillar (5, 2), steel; and the stone (6, 2), plain floor, in front of the exit in the right wall. Every wall is steel.

```
y4  ■ ■ ■ ■ ■ ■ ■ ■
y3  ■ = = = = = = ■
y2  ■ S = = = ■ . E
y1  ■ = = = = = = ■
y0  ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7
```

`■` steel, `=` slide floor, `S` the subject's start (1, 2), plain floor, facing right, `.` the stone (6, 2), plain floor, `E` the exit (7, 2), open, no link.

The stops: before a wall, the room's four corners, (4, 2) before the pillar, and (4, 3) and (4, 1) above and below it; on plain floor, the start and the stone. The stone is entered only from (6, 3) or (6, 1), down or up its column, since the pillar closes it from the left, and the exit only from the stone.

## Idea

A slide stops only on plain floor or before something it can't enter, so the stone in front of the exit is reached by a slide down or up its column, which stops on it though slide floor goes on past it.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 9 in detail"):

> - **Run 9, chamber 1: the pillar and the stone** (teach; slide floor, the exit). 8 × 5, every wall steel:
>
> ```
> y4  # # # # # # # #
> y3  # = = = = = = #
> y2  # S = = = # . E
> y1  # = = = = = = #
> y0  # # # # # # # #
>     0 1 2 3 4 5 6 7
> ```
>
> `S` the start (1, 2), plain floor, facing right; slide floor everywhere else but the pillar (5, 2), steel, and the stone (6, 2), plain floor beside the exit `E` (7, 2), open.
>
> Idea: a slide stops only on plain floor or before something it can't enter, so the stone beside the exit is reached by a slide down or up its column, which stops on it.
>
> Route: up (stops at (1, 3), before the wall); right (slides to (6, 3)); down (stops on the stone); right into the exit. Or down, right, up, right: both work (guideline 31). 4 moves.
>
> Lure: the first press, right along the exit's row, slides three tiles and stops before the pillar, short of the exit: a stop before a wall, plainly and at once (guideline 4). Purpose: the slide's first contact, forced and safe (guideline 24), each kind of stop met. Flow. It is Playground 5's opening move, guideline 41's model teach. Its blind reviewer: on the route the stop on plain floor is a single step off slide floor, and a long slide ending on plain floor shows only sliding back to the start; making (6, 3) and (6, 1) plain would show it, at the build's choice. _Check:_ 85, 88. Feasibility: 4 moves, the fewest; all 37 states can be finished; with the stone made slide floor, unsolvable.

Built as sketched.

## Purpose

Teach: the slide floor's first contact, forced, safe and with no other element (guideline 24): the only thing to do is slide, and each kind of stop is met on the way to the exit. Slide floors were last taught in Playground 5 and 6, outside the campaign; this is Playground 5's opening move, which guideline 41 names as the model teach.

Flow: no catch, three slides and a step, in a chamber that looks as simple as it is (guideline 32).

## Intended route

1. Up: the subject moves onto (1, 3), slide floor, and stops at once before the top wall.
2. Right: it slides along the top row and stops at (6, 3), before the right wall.
3. Down: it steps onto the stone, plain floor, and stops there, though slide floor goes on below it. The key move: plain floor stops a slide.
4. Right: into the exit.

Or the same through the bottom row: down, right, up, right. Either takes 4 moves and no portal, the fewest (`--baseline` and `--par` agree); the turn key isn't needed.

## Lure and where the player should get stuck

None set: a teach (guideline 24). The likely first press, right along the exit's row, slides three tiles and stops before the pillar, short of the exit: a slide that stops before a wall, plainly and at once (guideline 4). Where the player should stop is seeing that the stone, the one plain tile by the exit, is where a slide down or up its column ends.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The pillar (5, 2) | The straight slide from the start along the exit's row, which would end on the stone with no thought, and the stone reached from the left |
| 2 | The stone (6, 2), plain floor | Nothing: it is the one stop in front of the exit. With it made slide floor, unsolvable |
| 3 | Every wall steel | Portals: the first slide chamber holds no other element (guideline 24) |
| 4 | The top and bottom rows slide floor from wall to wall | Nothing: both routes work alike, so no one stalls on which (guideline 31) |

## Facts that must never be possible

- Finishing without stopping on the stone: the exit is entered only from it, and the pillar keeps a slide along row 2 from passing over it. Checked: with the stone made slide floor, unsolvable.
- A dead state. Checked: all 37 reachable states can be finished, and all 19 with the turn key refused.
- The subject standing in something blocked, or a move that only turns. Checked: none among the 37 states.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end: every stop has a slide that leads somewhere new (guidelines 85 and 88).

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Right from the start | A three-tile slide, stopped before the pillar, short of the exit |
| 2 | Left from there | A slide back onto the start |
| 3 | Up or down from (4, 2), or from the start | A one-tile move onto the top or bottom row, stopped at once before the wall |
| 4 | Along the top or bottom row | A slide to its end, before the side wall, the stone's column on the right |

## Variants tried

- The sketch's first draft: the pillar at (3, 2), beside the start, so the first press right moved one tile and stopped, showing no slide at all; the pillar moved to (5, 2), so the first press slides three tiles before it stops.
- Its blind reviewer's suggestion, (6, 3) and (6, 1) made plain floor so a long slide ends on plain floor on the route: not taken, since both are already stops before the right wall, so a slide ending there can't show that plain floor stopped it. The stone shows it unmistakably: the subject stops on it with slide floor going on past it.

## Checks

- `npm run solve -- --baseline --par`: 4 moves and no portal, both searches; no portal wall side; key 7 bits.
- A copy with the stone made slide floor: unsolvable from `--baseline` and `--par`.
- Every reachable state (37, one completed) explored through the rules' step: none dead, none with the subject standing in something blocked, no move that only turns. With every turn action refused: 19, none dead.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass; `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded, of chambers 13 to 18.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check, with the run's proposal (a fresh agent with only the files of run 9's four sketches as then drafted and their plan entries, and the earlier chambers' files, not these notes), found no shortcut, no dead end and nothing that looks broken: 4 moves; 37 states, none dead; every route stops before a wall and on the stone. Its one finding, the stop on plain floor a single step off slide floor on the route, is answered under Variants tried. The run's handbook reviewer found it fine, Playground 5's opening, guideline 41's model teach.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their recorded run is the intended route's bottom-row way, after the likely first press: right, the slide stopped on (4, 2) before the pillar; down onto (4, 1), stopped at once before the bottom wall; right, the slide along the bottom row to (6, 1), before the right wall; up onto the stone, which stops it; right into the exit (5 moves and no portal; the fewest are 4, the one over being the first slide to the pillar). Every kind of stop shows in it: before the pillar, before a wall, and on the stone. Earlier tries, if any, leave no trace in a recording. Recorded as `chamber_18.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
