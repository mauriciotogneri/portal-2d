# Chamber 2 (run 1, chamber 1.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: draft, waiting for the author's cold play (2026-11-22). File: `src/chambers/chamber_2.json`, second in the play order; permanent id 2. No recorded solution yet, so `npm run replay:check` and `npm run solver:check` fail on it until the author's run is recorded.

## Entry

Run 1, chamber 2, test. Elements: walls, steel, a ditch, the exit. The player knows chamber 1. It should teach that a shot flies straight along the row or column the subject faces, so where it stands decides which wall it hits, and that either portal can be the way in.

## Layout

7 × 7. Three 2 × 2 rooms in an L around a steel block: the start room (bottom left), the middle room (bottom right) and the exit room (top right, over the middle room). A ditch runs between the start room and the middle room, and another between the middle room and the exit room. Every wall is steel but four plain wall faces: the start room's floor (two tiles), one tile of the middle room's right wall, and one tile of the exit room's top wall.

```
y6  ■ ■ ■ ■ W ■ ■
y5  ■ ■ ■ ■ . . E
y4  ■ ■ ■ ■ . . ■
y3  ■ ■ ■ ■ ~ ~ ■
y2  ■ . . ~ . . W
y1  ■ S . ~ . . ■
y0  ■ W W ■ ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `W` plain wall, `~` open ditch, `S` the subject's start (facing right), `E` the exit.

## Idea

The exit room's only face that takes portals, (4, 6), is in line only from the middle room's left column, so the subject crosses into the middle room first, then sends the portal it left behind up that column and walks back into the one it came out of.

## Purpose

Reinforcing: chamber 1's crossing used on purpose, in both axes (a shot down at the floor, a shot up over a ditch and a room into the far wall), with the tile to shoot from chosen by where the plain face is. It also plants the hop from island to island that chamber 1.4's sketch builds on (`docs/spoilers/ideas.md`, "Sketched for a run").

Gem, a gentle one: one key step, the second crossing (stand in the middle room's left column, keep one portal in the middle room), with a short route around it.

## Intended route

1. Step up to the start room's top row; face right; shoot one colour across the ditch onto the middle room's right wall (6, 2).
2. Face down; shoot the other colour onto the start room's floor, (1, 0) or (2, 0).
3. Walk down into it; come out in the middle room at (5, 2), facing left.
4. Step left to (4, 2); face up; shoot the colour still on the start room's floor up the column, over the ditch and the exit room, onto (4, 6).
5. Step back right to (5, 2) and walk right into the portal just come out of; come out in the exit room at (4, 5), facing down.
6. Walk right twice, out through the exit (6, 5).

Either colour can go on either face, and either floor tile serves (guideline 31). In step 4, sending up the colour on (6, 2) instead works too: the other colour then goes onto (6, 2) again and the subject walks into that (4 portals). Solver: 8 moves and 3 portals, both the fewest.

## Lure and where the player should get stuck

The exit room and its plain face are in view from the start, but no tile of the start room lines up with any of the exit room's walls: its columns end at the steel block right above it, and its rows at the middle room's right wall. So the first idea, getting straight to the exit room, fails on steel at every try. The subject starts on the bottom row facing right, so its first shot, before any step, lands on steel at (6, 1), just below the only plain face beyond the ditch: chamber 1's clue again, for a player who skipped it there (the author never shot steel in chamber 1). In the middle room the subject comes out in the right column, so a shot straight up from there lands on steel at (5, 6), beside the plain face: the clue that the column matters.

Where the player should get stuck: in the middle room, seeing that the exit room is reached only from its left column, and working out which portal to send up; one of the two must stay in the middle room, and either colour choice works.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The two ditches | Walking to the exit |
| 2 | The steel block over the start room | The start room seeing the exit room: its columns end at the block, so the room's shape, not a patch, keeps it from reaching the exit room straight away (guideline 7) |
| 3 | (6, 1) steel | A second face in the middle room in line from the start room, so the row matters; it also puts the start's first shot beside the plain face |
| 4 | (5, 6) steel | A face above the column the subject comes out in, which would need no aiming (variant C) |
| 5 | The start room's left wall steel, its floor plain | The first crossing as a copy of chamber 1's (variant B): the near portal needs a shot down the column |
| 6 | The middle room's floor, and the exit room's walls but (4, 6), steel | Nothing: faces the idea doesn't use (guideline 56). The middle room's only face is the one the subject comes out of, so its second crossing walks back into that portal or puts the other colour there again |
| 7 | The exit in the right wall, at (6, 5) | Nothing: it keeps the exit room's top wall to the plain face and steel, so a shot up the wrong column misses on steel, not out through the open exit |

## Facts that must never be possible

- Reaching the middle room without a portal on (6, 2). Checked: a copy with (6, 2) steel is unsolvable from `--par` and `--baseline`.
- Reaching the exit room without a portal on (4, 6), and so straight from the start room. Checked: a copy with (4, 6) steel is unsolvable from `--par` and `--baseline`.
- A portal on any face but the top faces of (1, 0) and (2, 0), the west face of (6, 2) and the south face of (4, 6). Checked: the solver counts 4 portal wall sides.
- A state from which the chamber can't be finished. Checked: all 400 reachable states, explored through the rules' step, can still be finished.

## Guidelines broken on purpose

- Guideline 4 (a near miss): the start's first shot lands one row off the plain face in the middle room's right wall, and a shot up from where the subject comes out lands one column off the exit room's plain face. Here the near misses are the clue, as in chamber 1, and the game shows the reason at once: a ripple on steel, beside the plain face.

Guideline 78 (a way back) holds, though the start room can't be reached again once its portal is moved (no face of the start room is in line from the middle room): nothing there is needed, and the middle room always has its way on, a portal on (4, 6) from its left column and one on (6, 2).

## Near misses and wrong tries

None is a dead end: there is no box, link, arrow or anything one-way, and from the middle room both faces of the way on can always be shot.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting right along the bottom row, as the subject starts | A miss ripple on steel at (6, 1), beside the plain face |
| 2 | Shooting up or left from the start room | A miss ripple on steel |
| 3 | Shooting up the middle room's right column, where the subject comes out | A miss ripple on steel at (5, 6), beside the plain face |
| 4 | In the middle room, sending up the colour it came out of | That portal leaves (6, 2) for (4, 6), and the other is still on the start room's floor, out of reach; shooting it onto (6, 2) fixes it. Watch for a player who thinks the way is lost and restarts (guideline 28) |
| 5 | Shooting left or down from the middle room | A miss ripple on steel |
| 6 | Walking back into (6, 2) before moving a portal | Back to the start room, out of its floor: harmless |
| 7 | Walking into a ditch | The subject stops facing it, silently |
| 8 | Walking into a portal while only one is open | Nothing, silently, as in chamber 1 |

## Variants tried

- The start room's face on its left wall at (0, 2), facing (6, 2) across the row (variant B: 7 moves, 3 portals). Cut: the first crossing is chamber 1's again, with nothing new to aim.
- The exit room's face above the column the subject comes out in, (5, 6) instead of (4, 6) (variant C: 5 moves, 3 portals). Cut: the second crossing needs no aiming, since the spot where the subject arrives already looks onto its target (guideline 12).
- Chamber 1's two rooms, with the exit moved to a corridor along the top past a ditch (not built). Cut: 9 × 7 with a one-row strip, and the start room sees the corridor's top wall, so it needs steel patches there.
- Four rooms around a cross of ditches, the exit room reached through either neighbour (not built). Cut: two equal routes double the faces, and the fourth room adds nothing.
- The exit room one row tall, making the chamber 7 × 6 (not built; raised by the independent check, since no route uses the exit room's bottom row or the middle room's). Kept at 2 × 2: three rooms of one size read as one L-shaped room at a glance, and the smaller chamber is drawn at the same tile size anyway (guideline 99).

## Checks

- `npm run solve -- --baseline --par`: 8 moves, 3 portals, both searches; 4 portal wall sides; key 13 bits.
- Copies with (6, 2) steel, with (4, 6) steel, with the start room's floor steel and with every wall steel: all unsolvable from `--baseline` and `--par`.
- Every reachable state (400, and 2 completed) explored through the rules' step: each can still be finished.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass.
- Played through in the real game (headless Chrome, a throwaway profile, the dev server on a port of its own): the intended route, with wrong try 6 on the way, completes the chamber, with no console error.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut or dead end: copies with (6, 2) steel, (4, 6) steel or both floor tiles steel are unsolvable from `--baseline` and `--par`, and either floor tile alone is enough (9 or 8 moves); its own walk of every state found 402, none a dead end. It flagged that the half "either portal can be the way in" isn't forced: a player who keeps one colour as the way in finishes with 4 portals (wrong try 4). Only walking back into the wall come out of is forced. And it flagged that the start's first shot repeats chamber 1's opening, so a player may line up the row from habit; the new test is the column shot in the middle room.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
