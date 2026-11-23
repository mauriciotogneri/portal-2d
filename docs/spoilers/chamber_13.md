# Chamber 13 (run 5, chamber 5.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-23, checked and independently reviewed, waiting for the author's cold play. File: `src/chambers/chamber_13.json`, thirteenth in the play order; permanent id 13. Designed together with chambers 5.1 (id 11) and 5.2 (id 12), all three before the author plays any (the author's call, 2026-11-23). It has no recorded solution yet, so `npm run replay:check` and `npm run solver:check`, and with them `npm run verify` and `npm run deploy`, fail on it until the author's play is recorded.

## Entry

Run 5, chamber 3, combine, and the run's last chamber. Elements: steel a button opens, a box, two buttons, a laser, the exit, and antlines; walls and steel are known from run 1. The player knows runs 1 to 4 and chambers 5.1 and 5.2. It should teach that the box that holds steel open can be needed past it, though lifting it shuts the steel and the portal on it, where a portal past a door outlasts the door. Hint: none (convention 7).

## Layout

7 × 7: 5.1's room with a second row past the laser. The near side, 5 × 2, holds the subject, starting as in 5.1 and 5.2 in the middle of the lower row, facing up, over **N**, the near side's only plain face, in the bottom wall; the button **B**, one tile right of K's column, in the upper row; and the box, at the upper row's left end. The far side, 5 × 2 above the laser, holds the button **B2** in its lower row, linked to the exit, which stands at the far side's upper right, in the chamber's right wall; **K**, the one-tile blocked wall B links, in the top wall straight above the start, the only far face the near side sees; and **P**, a plain face at the far side's upper left, in the chamber's left wall, which no near tile is in line with. Every other wall is steel.

```
y6  ■ ■ ■ K ■ ■ ■
y5  P . . . . . E
y4  ■ . . . Q . ■
y3  ■ L L L L L ■
y2  ■ x . . B . ■
y1  ■ . . S . . ■
y0  ■ ■ ■ N ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `S` the subject's start (3, 1), facing up, `x` the box (1, 2), `B` B (4, 2), linked to K, `L` the laser run (1, 3) to (5, 3), horizontal, on, `Q` B2 (4, 4), linked to the exit, `K` the blocked wall (3, 6), linked, `P` a plain wall (0, 5), `N` a plain wall (3, 0), `E` the exit (6, 5), linked, so it starts closed.

Antlines, two:

- B to K: (4, 2), (3, 2), (3, 6): one tile left on the floor, turning there, then up under the laser and across the far side into K from below.
- B2 to the exit: (4, 4), (6, 4), (6, 5): right across the floor, turning on the right wall and up into the exit from below.

## Idea

The box opens the way (on B, K takes a portal) and is needed past it (on B2), and lifting it shuts K and the portal on it, so the portal the subject came out of on K is moved, from the far side, onto P, the far side's own face, before the box is fetched through N and P.

From the idea pool, where it was sketched before run 5's other chambers (guideline 51):

> - **Run 5, chamber 3: the steel that shuts on its portal** (combine; sketched 2026-11-23, before run 5's other chambers, guideline 51). A laser run splits the chamber wall to wall. The near side holds the subject, the box, button **B** and one face that takes portals, **N**; the far side holds the exit, linked to button **B2**, and two faces: **K**, a one-tile blocked wall B links, the only far face the near side sees (along a column, over the laser), and **P**, a plain face that no near tile is in line with, so only the far side sees it. The catch: the box opens the way (on B, K takes a portal) and is needed past it (on B2); picking it up off B shuts K, and the portal on K closes with it. It resolves by making a lasting way while K is open: the box on B, a pair on N and K, the subject crosses out of K and, from the far side, moves the portal just come out of onto P; back through P to N, it lifts the box (K shuts with nothing on it) and carries it through N and P onto B2. One key move, the shot onto P from the far side; every route moves the portal on K by a shot fired past the laser, which is run 3's carried item, the portal just come out of forced to move (guideline 27), forced by the steel rather than by a box in front of it: once the author has played this chamber, the outline's carried item can be marked answered. What it turns over: chamber 2.4's lesson, a door shutting closes no portal, which a player can take for any wall; on steel a button opens, the portal goes with it (guideline 41, a twist that breaks a trained belief, here inside the combine). Every route also uses one box for two buttons in turn (run 4), met again, not taught. The lure: 5.1's answer, the box on B and a pair through K, then back for the box: the steel shuts as it lifts, the portal on it gone, plain at once and within a few moves (guideline 4); put back, the box opens K again, so nothing is lost (guideline 28). Plants: 5.2 (a portal on steel closes as the steel shuts, forced on every route there as no loss); 5.1 (steel a button holds open takes portals; its likeliest wrong try shows the closing too); 1.4 and 2.4 (a part left through the colour come out of; carrying the box through portals). Keep it unrehearsed (guideline 47): no earlier chamber has the subject shoot a lasting face from beyond a gate it can't hold open, and 5.2's far side has no plain face. Two rules its layout must keep, both found by the prototype's state walk (guidelines 33 and 111): N is the near side's only face, so once the box is across, both portals can never be on the near side (with three near faces, 2,160 of 23,012 states were dead: the box left across, both portals moved home, P out of reach); and B is off K's line, or the subject standing on B, the box across, moves the portal on P onto K, which closes on the step off (with N alone but B on K's line, 1,224 of 7,674 dead). The first prototype broke both, four near faces and B on K's line: 7,920 of 41,324 dead. N lies in a column the far side sees down over the laser, so the far side always has a way back (guideline 78). Its fresh reviewer's notes: P, the far side's only plain face in a steel frame, in view on arrival, may be shot because it stands alone (guideline 16) by a player who hasn't seen why, a risk for the author's play; and the key move comes after a stretch that replays 5.1 (guideline 34, mild), as a reprise of 5.1's room does (guideline 43). _Check:_ guideline 111 (walk every state after any change to the faces); 60 (neither button in front of a plain face); 59 (neither button beside what it links); 67 (the box put down in front of P or N bars that way in: recoverable in the prototype, check again); 17 (the laser does here what an open ditch would: it is there to be met before runs 8 and 9 set it apart); 113 and 43 (built on 5.1's room, it may read as 5.1 until K shuts on its portal); 112 and 97 (B's antline to K turns on floor, not on the wall's edge). Feasibility, 2026-11-23: a prototype (7 × 7: the near side 5 × 2 below a laser row, the far side 5 × 2 above it, every wall steel but N, under the start, K, in the top wall, and P, at the far side's left end; B beside K's column, B2 in the far side's lower row, the exit in its right wall): 17 moves and 3 portals, both the fewest; all 5,418 reachable states can be finished, none of 3,749 dead without the turn key; copies with P steel, with K unlinked steel, or without the box are unsolvable from `--baseline` and `--par`; the state walks refusing every shot from past the laser, or every shot that moves the portal off K, reach no completion; with the exit open and unlinked it takes 9 moves and 2 portals, 5.1's route, so B2 and P are what make it a combine. A fresh reviewer, given only the file and the entry, found the same counts, no dead end and no shortcut.

Built as its prototype: the same state counts, 5,418 and 3,749 without the turn key; 16 moves where the prototype took 17, so B2 or the exit may sit a tile from where it was (the prototype's file wasn't kept).

## Purpose

Combine, and the run's end. The key move, the shot onto P from the far side, moves the portal just come out of, run 3's carried item (guideline 27), forced here by the steel rather than by a box in front of it. It turns over chamber 2.4's lesson, a door shutting closes no portal, which a player can take for any wall: on steel a button opens, the portal goes with it (a twist inside the combine, guideline 41). One box for two buttons in turn (run 4) is met again on every route.

Gem: one key move, the shot onto P from past the laser, with 5.1's crossing before it and a carry after it.

## Intended route

1. Step up to (3, 2), left to (2, 2); interact: pick up the box.
2. Step right to (3, 2), facing right; interact: the box goes down on B. K's steel slides back and B's line lights.
3. Step down to (3, 1), facing down; shoot blue onto N; turn up in place and shoot orange, over (3, 2) and the laser, onto K.
4. Press down: walk into N and come out of K onto (3, 5), facing down.
5. Step left to (2, 5); shoot orange left onto P: the portal leaves K. The key move.
6. Walk left into P and come out of N onto (3, 1), facing up; step up to (3, 2) and press right (the box ahead only turns the subject); interact: lift the box off B. K's steel shuts, with nothing on it.
7. Step down to (3, 1); press down: carry the box into N and out of P onto (1, 5), facing right.
8. Walk right to (4, 5), turn down in place, interact: the box goes down on B2 and the exit opens; walk right twice and out.

Solver: 16 moves and 3 portals, both the fewest; the state walk's fewest presses (26) are this route. Without the turn key, 27 presses.

## Lure and where the player should get stuck

5.1's answer gets the subject across: the box on B, a pair on N and K, the crossing. Past the laser the exit is shut, its line from B2 dark, and B2 wants the box. The natural next move is back through K and N to fetch it: lifting it shuts K's steel, and the portal on it goes, as 5.2 showed, leaving the subject on the near side with the box and only N, plain at once and within a few moves (guideline 4); put back, the box opens K again, and nothing is lost (guideline 28). Standing on B and shooting up, the other try, misses: B is a column off K. Where the player should get stuck: seeing that the portal on K has to move before the box is lifted, and that only the far side can move it, onto P.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | K linked to B | Crossing without the box on B: the copy with K unlinked steel is unsolvable from `--baseline` and `--par` |
| 2 | P, the far side's only plain face, in line with no near tile | Making the lasting way from the near side: the copy with P steel is unsolvable; the walks refusing every shot from past the laser, or every shot that moves the portal off K, reach no completion |
| 3 | The exit linked to B2, past the laser | The box left on B: with the exit open and unlinked, 8 moves and 2 portals, 5.1's route; B2 and P are what make it a combine |
| 4 | N the near side's only face | A dead end: with the box across, both portals can never be on the near side (the sketch's prototype walk, with three near faces: 2,160 of 23,012 states dead) |
| 5 | B off K's column | A dead end: the subject on B, the box across, moving the portal on P onto K, which closes on the step off (the sketch's prototype walk, B on K's column: 1,224 of 7,674 states dead); and the lure's shortcut, holding B with the subject and shooting K |
| 6 | N in a column the far side sees down over the laser | Being stranded past the laser (guideline 78): the far side can always put a portal on N |
| 7 | Every other wall steel | Faces the idea doesn't need (guidelines 56 and 75) |
| 8 | Neither button beside what it links nor in front of a plain face | Guidelines 59 and 60 |

## Facts that must never be possible

- Finishing without a shot fired from past the laser. Checked: the walk refusing it reaches no completion.
- Finishing without a shot moving the portal off K. Checked: the walk refusing it reaches no completion.
- Finishing without the box on B2, or without P. Checked: the copies are unsolvable, or need the exit open.
- The subject in the laser, or the box under the subject. Checked: no reachable state has either.
- A dead state. Checked: all 5,418 reachable states can be finished, and none of 3,749 without the turn key (guideline 111).

## Guidelines broken on purpose

- 17, bent: the laser plays an open ditch's part, as in 5.1 and 5.2. Named in the outline.
- 34, mild: the key move comes after a stretch that replays 5.1, as a reprise of 5.1's room does (guideline 43). Its sketch's reviewer named it.
- 16, a risk: P, the far side's only plain face in a steel frame, in view on arrival, may be shot because it stands alone by a player who hasn't seen why. Its sketch's reviewer named it; to watch in the author's play.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Back through K and N to lift the box, the portal still on K | K's steel shuts and the portal on it goes; the box put back on B opens K again, and a shot puts the portal back |
| 2 | Walking into N, the box in hand, after that | With one portal open, it only turns the subject |
| 3 | Standing on B and shooting up | A miss ripple on the steel: B is a column off K |
| 4 | From the far side, moving N's portal onto P instead | Both portals past the laser; the far side can put one on N again, down column 3 |
| 5 | The box put down in front of N or of P | Nothing crosses onto that tile while it rests there; picked up again from beside it |
| 6 | Standing on B2 | The exit opens while the subject stands there and shuts on the step off |
| 7 | Shooting the steel | A miss ripple |

## Variants tried

- P at (0, 4), in the far side's lower row: the same 5,418 states, none dead, 18 moves and 3 portals; the carry out of P then runs straight along B2's row, handing over the last step. P kept in the upper row.
- The sketch's prototypes, from its walk: four near faces with B on K's column (7,920 of 41,324 states dead), then N alone with B still on K's column (1,224 of 7,674 dead), before this one (Restrictions 4 and 5).

## Checks

- `npm run solve -- --baseline --par`: 16 moves and 3 portals, both searches; 3 portal wall sides; key 19 bits.
- Copies with P steel, with K unlinked steel, or without the box: unsolvable from `--baseline` and `--par`. With the exit open and unlinked: 8 moves and 2 portals.
- Every reachable state (5,418, two completed) explored through the rules' step: none dead, none breaking a fact above. With every turn action refused: 3,749 states, none dead.
- The walks refusing every shot from past the laser, and every shot that moves the portal off K: no completion.
- `npm run chamber:check` passes.
- Played through in the real game (`npm run dev` in Chrome, the tab muted), along the route without the turn key: the box onto B, a pair on K and N, the crossing, the portal on K moved onto P from (1, 5), back through P, the box lifted (K shutting with nothing on it), carried through N and P onto B2, the exit opening, out, with no console error. At the start B's line and B2's read apart: B's runs up column 3 beside B2 and B2's leaves it to the right.
- An independent check (a fresh agent with only the file, the plan's entry and the files of 5.1 and 5.2, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 5,418 states, 3,749 without the turn key, none dead; 16 moves and 3 portals; copies with P or N steel are unsolvable, and without the laser it is a 9-move walk with no portal; every route carries the box through N and P after a first crossing through K; the far side always sees two faces it can shoot, and the near side keeps P whenever the box is across (guidelines 78, 79 and 111); no crossing is ever refused. Its judgment calls:
  - The key move can be stumbled into (guidelines 8 and 108): P is the far side's only face that takes a portal, so a player who shoots it out of curiosity with the colour on K has the lasting pair without meeting the catch, and lifts the box off empty steel; only players who try the lure feel it. Accepted for the run's last chamber, nothing depending on it (guideline 50), and every route still makes the move; the same risk as guideline 16's, named at the sketch, for the author's play.
  - The training wheels are still on (guidelines 49 and 113): the same frame as 5.1 and 5.2, its first five steps 5.1's whole route, and B's line again runs up the column to shoot K from. Kept: the line is convention 4's, and the cue it gives is for 5.1's half, not the key move, which nothing points at but P standing alone.
  - B's line runs up beside B2: checked in the game above, the two read apart.
  - "A portal past a door outlasts the door" can only be a contrast with chamber 2.4: no route here can force it. As the entry means it.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
