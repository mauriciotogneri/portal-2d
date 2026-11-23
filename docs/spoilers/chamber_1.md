# Chamber 1 (run 1, chamber 1.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: approved by the author on 2026-11-22, their cold run its recorded solution. File: `src/chambers/chamber_1.json`, first in the play order; permanent id 1, taken from the old tutorial (now Playground 12), with stored progress reset.

## Entry

Run 1, chamber 1, teach. Elements: walls, steel, a ditch, the exit. The player knows only the move keys and the portal keys, from the controls legend. It should teach shooting a portal of each colour onto a plain wall and crossing from one to the other, that a ditch stops the subject but not a shot, and that steel takes no portal.

## Layout

9 × 5. Two 3 × 3 rooms split by a ditch running the full height between them; the subject starts in the left room, the exit is in the bottom wall of the right room. Every wall is steel but two plain wall tiles, one at each end of the middle row, facing each other across the ditch.

```
y4  ■ ■ ■ ■ ■ ■ ■ ■ ■
y3  ■ . . . ~ . . . ■
y2  W . . . ~ . . . W
y1  ■ . S . ~ . . . ■
y0  ■ ■ ■ ■ ■ ■ E ■ ■
    0 1 2 3 4 5 6 7 8
```

`■` steel, `W` plain wall, `~` open ditch, `S` the subject's start (facing right), `E` the exit.

## Idea

The exit lies past a ditch the subject can't walk over but shots fly over, so the subject crosses by a portal on the one plain wall beyond it and one on the one plain wall on its own side.

## Purpose

Teaching: the portal pair, the crossing, the ditch and steel, each met for the first time, with nothing else in the room.

Flow: no catch, a short route, and nothing to fail but a shot that misses.

## Intended route

1. Walk up a row to the middle row; face right, across the ditch.
2. Shoot one portal onto the plain wall beyond the ditch (8, 2).
3. Face left; shoot the other colour onto the plain wall on this side (0, 2).
4. Walk left into it; come out in front of the far portal, facing left.
5. Walk to the exit: down, left, down.

Either colour can go on either wall, and either wall first (guideline 31). Solver: 6 moves and 2 portals, both the fewest.

## Lure and where the player should get stuck

The subject starts on the bottom row facing right, the way the exit lies. Walking towards the exit, or shooting before walking, sends the first shot along the bottom row into the steel at (8, 1), right beside the only plain wall beyond the ditch: a miss ripple on riveted steel next to a plain face is the first contact with steel, and the contrast points one row up. That is the only intended stumble. Every shot from the start tile, any way, lands on steel, but meeting steel can't be forced: a player who steps up to the middle row before shooting never misses.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditch runs the full height of the room | Walking around it to the exit |
| 2 | Every wall face but (0, 2) and (8, 2) is steel | A second pair of faces, so no stalling on which faces to use; it also keeps the lesson to one pair (guideline 75) |
| 3 | The subject starts off the middle row | Nothing: it sets up the first contact with steel (guideline 56, a consequence shown first) |
| 4 | The top row of both rooms | Nothing: it keeps the rooms symmetric about the middle row, so the two plain faces read as the odd tiles (guideline 19) |

## Facts that must never be possible

- Reaching the right room without crossing a portal. Checked: a copy with every wall steel is unsolvable from `--par` and `--baseline`.
- A portal on any face but the east face of (0, 2) and the west face of (8, 2). Checked: the solver counts 2 portal wall sides.

## Guidelines broken on purpose

- Guideline 31 (make every option that doesn't matter work): only the middle row reaches the plain wall beyond the ditch, so the row to shoot from matters. Steel taking no portal is part of what the chamber teaches, and the row is chosen by the lone plain face, not by guessing.
- Guideline 4 (a near miss): the first shot across lands one row off the only plain face. Here the near miss is the clue, and the game shows the reason at once: the ripple lands on steel, beside the plain face.

## Near misses and wrong tries

None is a dead end: there is no box, link, arrow or anything one-way, and portals can be shot again at any time. The far room's middle row sees the near plain wall across the ditch, so the way back is always there (guideline 78).

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Walking into the ditch | The subject stops facing it, silently; it reads as a pit |
| 2 | Shooting across from the top or bottom row | A miss ripple on steel, beside the plain face |
| 3 | Shooting steel anywhere else | A miss ripple on steel |
| 4 | Shooting the second colour at the face that holds the first | A miss ripple on the portal |
| 5 | Shooting the same colour at both plain walls | The first portal closes as the second opens; walking into the one left does nothing, silently. Watch for this in playtests |
| 6 | Walking into a portal while only one is open | Nothing, silently. Watch for this in playtests |

## Variants tried

- A one-tile corridor cut by a two-tile ditch, a plain wall at each end (5 moves). Cut: no wrong row, so a player could finish without ever shooting steel, and the corridor reads as a strip, not a room.
- These rooms with the subject starting on the middle row (5 moves). Cut: the first shot across always lands, so steel is met only by wandering.

## Checks

- `npm run solve -- --baseline --par`: 6 moves, 2 portals, both searches; 2 portal wall sides; key 11 bits.
- The copy with every wall steel: unsolvable from `--baseline` and `--par`.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut or dead end: copies with both plain walls steel, or only one of them left, all unsolvable from `--baseline` and `--par`; the baseline search covers all 326 states. It flagged wrong try 6 as the one with no feedback at all, which comes from the rules, not the layout: a hint could cover it if hints are built.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-22 | The intended route with no wasted press: up to the middle row, right to the ditch, orange across, back left, blue on the near wall, through, then to the exit (8 moves, 2 portals). No shot missed, so they never shot steel: the case the lure section says can't be forced. Recorded as `chamber_1.solution.json`; kept |
| 2 | A friend, cold | 2026-11-23 | Played it through with the rest of run 1 and was fine with it: nothing confused them, by the author's account. Their route wasn't recorded |
