# Chamber 4 (run 1, chamber 1.4)

Spoilers: the author reads this only after playing the chamber cold.

Status: drafted, waiting for the author's cold play. File: `src/chambers/chamber_4.json`, fourth in the play order; permanent id 4. It has no recorded solution yet, so `npm run replay:check` and `npm run solver:check` fail on it.

## Entry

Run 1, chamber 4, combine, and the tutorial run's last chamber. Elements: a box, a button, a door, a ditch; walls, steel and the exit are known from chambers 1.1 to 1.3. The player knows chambers 1 to 3: portals, crossing over a ditch, steel taking no portal and aiming by row and column (1.1 and 1.2), and a button opening the door its antline leads to while something stands on it, which a box carried there holds for the subject (1.3). It should teach carrying a box through portals, and that the portal keys don't shoot while a box is carried. Hint: none.

## Layout

9 × 5. Three parts in an L around a steel block, each split from the next by a ditch: the exit room (3 × 2, bottom left), with the door in its top wall, the exit right behind it, and the button on its bottom row; the island (3 × 1, bottom right), where the subject starts; and the ledge (2 × 1, over the island across a row of ditch), where the box lies. One ditch tile splits the exit room's bottom row from the island. Every wall is steel but three plain wall tiles, one per part: the exit room's left wall at (0, 1) and the island's right wall at (8, 1), facing each other along the bottom row, and the ledge's top wall at (7, 4). An antline runs from the button left to (2, 1) and up into the door.

```
y4  ■ ■ E ■ ■ ■ ■ W ■
y3  ■ ■ D ■ ■ ■ b . ■
y2  ■ . . . ■ ~ ~ ~ ■
y1  W . . o ~ . S . W
y0  ■ ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7 8
```

`■` steel, `W` plain wall, `~` open ditch, `S` the subject's start (facing up), `o` the button, `b` the box, `D` the door (linked to the button, so it starts closed), `E` the exit (open).

The faces, named in the rest of these notes: **s**, the east face of (0, 1), the exit room's only face; **r**, the west face of (8, 1), the island's only face; **b**, the south face of (7, 4), the ledge's only face. The island sees all three (s and r along the bottom row, b up its right column); the exit room sees s and r; the ledge sees only b.

## Idea

The ledge sees no face of the exit room and the exit room none of the ledge, so the portal pair that fetches the box brings it back only to the island, and the subject, which can't shoot while carrying it, puts the box down on the island, shoots the exit room's face, picks the box up again and crosses.

From the idea pool, where it was sketched before run 1's teach chambers (guideline 51) as "the box beyond the ditch": the box out of reach beyond a ditch, the button and its door on the other side, and the catch that the portal keys don't shoot while a box is carried. The sketch's worry was that the pair that brought the subject to the box would also take it back with the box, so the catch would never bite; its answer was two islands in a row, the box on the second. Built, that line becomes this L (shots fly over ditches, so a straight line lets the box's island see the button's side), and the subject starts on the middle part rather than beside the button, which saves a crossing that only repeats chamber 1.1 (variant C). The pair that fetches the box still takes it back, but only to the island, which isn't where the button is.

The sketch, as it stood in the idea pool:

> **Run 1, chamber 4: the box beyond the ditch** (combine). The button, and the door it opens on the way to the exit, are on the subject's side; the box lies beyond a ditch, reached only by portal. The catch: carrying the box, the subject must cross by a portal it hasn't placed yet, and the portal keys don't shoot while a box is carried, so it puts the box down, shoots, picks it up and crosses (or places that portal before picking the box up). The lure: walk to the box, pick it up, head back. The layout must keep the portal pair that brought the subject over from being the way back with the box, or the catch never bites: portals work both ways, a carried box crosses with the subject, and run 1 has no arrow or switched wall to shut that way. One way with run 1's elements alone: the far side is two islands split by a second ditch, the box on the second, whose only face that takes portals is in line only from the first, so reaching the box moves one end of the pair and the subject's side is out of reach until a new shot. Plants: crossing and shots over a ditch (chambers 1 and 2), a box on a button (3). _Check:_ guideline 78 (a face to shoot back from), guideline 79 (a tile beyond the ditch to put the box down), guideline 40 (what the button's tile sees through the open door), guideline 66 (a run-up to the button, since turning in place is taught only in run 3), guideline 102 (no route brings the box back through the pair that brought the subject to it; check with `--par` or by hand, since `--solvable` misses routes that put a box down to shoot).

## Purpose

Teaching, as run 1's combine: the box carried through portals, twice, and the portal keys refused while it is carried, met at the one moment that needs a shot, with the answer (put the box down, shoot, pick it up) the only way on. It puts together 1.1's crossing over a ditch, 1.2's move of sending the portal left behind on to the next part, and 1.3's box on the button.

Gem, a gentle one: one key step, the put-down on the island to free the hands for the shot at s, with a short route around it.

## Intended route

1. Step right to (7, 1). Shoot one colour at r (facing right), then walk up into the ditch to face up and shoot the other colour up the column, over the ditch, onto b.
2. Walk right into r; come out on the ledge at (7, 3), facing down. Walk left into the box, which turns the subject to face it, and pick it up.
3. Walk up into b; come out of r onto (7, 1), facing left across the ditch towards s, carrying the box.
4. Put the box down in front, on (6, 1); shoot the colour that is on b left, over the box, the ditch and the exit room, onto s; pick the box up again.
5. Walk right into r; come out of s onto (1, 1), facing right. Step right to (2, 1), facing the button, and put the box down on it: the door opens and its antline lights.
6. Walk up three times, through the door and out through the exit.

Either colour can go on either face, and either face of the first pair first (guideline 31). On the island the box can go down on either side of the subject: from (7, 1) or (5, 1) onto (6, 1), or from (6, 1) onto either end, each without the turn key, and the shot at s flies over it wherever it lies. Solver: 8 moves and 3 portals, both the fewest; its routes are this one.

## Lure and where the player should get stuck

The box is the first thing in view: the subject starts right under it, across the ditch, facing it, and the obvious plan is to fetch it and carry it to the button. The trip out works with one portal on the island's face and one on the ledge's. The trip back works too, through the same pair, and lands the subject on the island carrying the box, facing the exit room, with s in line. The natural next press is a shot at s: refused, with the error sound and no ripple, whichever key and whichever way. That is the lure (guideline 3): a plan built from real rules that walks the player into the catch, and fails at once and plainly (guideline 4), with the error sound and nothing on the wall where every earlier shot opened a portal or left a ripple, right where the answer is.

Where the player should get stuck: on the island, carrying the box, working out that the hands must be free to shoot, and that the box can go down right there and come back up after the shot. The shot flies over the box put down in front; a player who shot from the start, straight up over the box on the ledge, has already seen a shot pass a box.

A player who thinks ahead meets the same catch from the other end: two portals can't hold the way to the ledge and the way to the exit room at once, and the ledge sees no face of the exit room, so the shot at s can come only after the box is on the island. So the refused shot itself isn't forced: a player who puts the box down before shooting never hears it. What every route forces is putting the box down on the island to re-aim.

A player who visits the exit room first (s and r are in line from the island) meets 1.3's button again, and comes back through the same pair; nothing is lost.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditch tile between the exit room and the island, and the ditch row between the island and the ledge | Walking between the parts: every trip is a crossing |
| 2 | The L: the ledge over the island, the exit room beside it, so the ledge's rows and columns miss every wall of the exit room and the exit room's miss every wall of the ledge | A pair joining the ledge and the exit room, and so a trip with the box that needs no new shot: the key move. The room's shape does this, not steel (guideline 7): the copy with every wall plain still can't be finished without a shot fired while the box rests on the island |
| 3 | One plain face per part, every other wall steel | A box left on the tile in front of a part's only face sealing that part off (guideline 67): with one face per part, the subject can leave a part only from that tile, so it can't leave while the box is there. The copy with every wall plain has 3,192 states that can't be finished, the box resting in front of s or r while the subject is out of that part (variant G) |
| 4 | The island three tiles wide | Nothing: from any of its tiles a carried box goes down within one step, without the turn key (guideline 66), including after a held key has turned the subject up on coming out of r. Two tiles wide, a player without the turn key could face a free tile there only on coming out of r (variant B) |
| 5 | The button on the exit room's bottom row, two tiles from s's tile | Nothing: the subject comes out of s facing its way, and one step on faces it from the tile beside it; the two tiles before it are its run-up (guideline 66), and its only one, since above it is a tile and then steel |
| 6 | The door right in front of the exit, in the exit room's top wall, off every line the button's tile sees | The shot through the open door (guideline 40, below), and stepping off the button onto the door's tile (guideline 59) |
| 7 | The exit room two rows tall | Nothing: room to walk round after carrying the box onto the button, and a room, not a corridor, around the door |
| 8 | The subject's start under the box, facing it | Nothing: the first shot, before any step, flies over the box and lands on steel one column off b: the near miss that points at the column (guideline 4, as in chambers 1.1 and 1.2), and the box shown passing a shot |

Guideline 40, the shot through the open door: a cheat here, and nothing is left for it to hit. The button's tile sees neither the door's column nor its row, and from the door's column the line through the open doorway runs on out through the open exit. The walls beside a door or the exit take no portal, so no face past the door can hold one, whatever it is made of.

## Facts that must never be possible

- Reaching the exit without the box resting on the button. Checked: copies with the box removed, with the button's link and its antline removed, and with the button and its antline removed are unsolvable from `--par` and `--baseline`; the state walk finds no completion without the box on the button.
- The box reaching the exit room without being put down on the island and a shot fired while it rests there (the key move). Checked: the walk, refusing every shot while the box rests on the island, reaches no completion; refusing every put-down but onto the button reaches none either; a copy with the island cut to the one tile in front of r, where the box can't go down, is unsolvable from `--par` and `--baseline`.
- A crossing between the ledge and the exit room, either way, with or without the box. Checked: the walk; every crossing joins the island to the ledge or to the exit room.
- A portal on any face but s, r and b. Checked: the solver counts 3 portal wall sides; the walk sees only those three open.
- The door open with nothing on the button, or shut with something on it; the subject in the shut doorway. Checked: every reachable state.
- The box in the doorway, or destroyed, or sent home (so guideline 65's case never arises). Checked: the walk; the box rests on 11 tiles, none the doorway, and no step reports `boxDestroyed`, `carriedBoxDestroyed` or `boxSentBack`.
- A state from which the chamber can't be finished, and, for a player who never holds the turn key, a state reached without it that can't be finished without it. Checked: all 1,318 reachable states can still be finished, and all 916 reached without the turn key can be finished without it.

## Guidelines broken on purpose

- Guideline 4 (a near miss): the start's first shot lands one column off b, on steel beside it. Here the near miss is the clue, as in chambers 1.1 and 1.2, and the game shows the reason at once: a ripple on steel, beside the plain face.

Weighed, not broken:

- Guideline 49 (take the training wheels off at the end of a run): each part keeps a single plain face, the cue run 1 has used throughout, since more plain faces open dead ends here (restriction 3). What the chamber drops is 1.3's cue of the box beside the door it opens and the button in front of the start: here the box starts two crossings from its button, out of sight of any face of the exit room. The independent check agreed: nothing else is dropped at the end of the run, and keeping the faces few follows guideline 75.
- Guideline 9 (don't make a refused action look possible): shooting while carrying, which it names, is the lesson here, and is refused the same way each time, with the error sound and no ripple.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished, without the turn key too, and there is no one-way step. Every part is reached only by portal once the subject has left it, and none can be left without its way back: s and r are in line from the island, r from the exit room, and from the ledge, which sees only b, the pair the subject came by always stands, since nothing on the ledge can move either end. A box put down in front of a part's only face (on (1, 1), (7, 1) or (7, 3)) keeps the subject in that part until it is picked up, so it never cuts the subject off from the box.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting from the start, facing up | The shot flies over the box and leaves a miss ripple on steel at (6, 4), beside b |
| 2 | Coming back to the island with the box and shooting at s | The error sound, no shot, no ripple, whichever colour: the lure |
| 3 | Shooting while carrying the box on the ledge or in the exit room | The same refusal |
| 4 | From the island, shooting b with the colour that is on r | The portal leaves r, so no portal stands on the island's face and the subject can walk into none; shooting r again fixes it |
| 5 | Visiting the exit room first and stepping on the button | The door opens, its antline lit, and shuts on the step off: 1.3 again. Back through s to the island |
| 6 | Carrying the box onto the button | The door opens, held by the subject. Interact there is refused with the error sound, since the subject faces the ditch (come along the bottom row) or the bottom wall (come down from the top row); in 1.3 the box went down beside the button instead. The door shuts as the subject steps off with the box still in hand. Coming back at it along the bottom row from two tiles away (left, left, right) faces it again, and the box goes down; the game run stepped up off it and came round by the top row (up, left, left, down, right) |
| 7 | Holding the key that crosses back from the ledge | A repeat after the crossing turns the subject up, facing the ditch, where the put-down is refused with the error sound. One step left faces a free tile on the island, and the box goes down there |
| 8 | Putting the box down facing a ditch or a wall | Refused, with the error sound |
| 9 | Putting the box down in front of r, s or b (b's tile only with the turn key) | It bars the one tile from which the subject can walk into that part's face, so the subject stays in the part until it picks the box up from beside it; nothing outside is cut off |
| 10 | On the ledge, shooting anything but b | A miss ripple on steel; the other colour at b misses too, since a face holds one portal |
| 11 | Walking into a ditch | The subject stops facing it, silently |
| 12 | Walking into a portal while only one is open | Nothing, silently, as in chambers 1.1 and 1.2 |
| 13 | Carrying the box to (5, 1), facing the ditch, and pressing a portal key, then interact (or the other way round) | Both are refused with the same error sound: the shot because the box is carried, the put-down because the ditch is in front. It muddies what the sound meant (guidelines 4 and 9), and this is the first chamber with a box beside a ditch, so a player may try to fill the ditch with it. It recovers at once: one step right faces a free tile on the island |

## Variants tried

- A: the button on the exit room's top row, at (3, 2) (8 moves). Cut: its run-up runs along the top row while the subject comes out of s on the bottom row, so the way out of the portal doesn't point at the button.
- B: the island two tiles wide (8 × 5, 8 moves). Cut: in a room two tiles long, stepping towards the other tile moves onto it, so a player without the turn key faces a free tile there only on coming out of r; 12 states reached without the turn key can't be finished without it.
- C: the sketch's order, the subject starting in the exit room (8 moves, 4 portals). Cut: the first crossing only repeats chamber 1.1, the catch comes later (guideline 34), and a restart replays more (guideline 33).
- D: the ledge three tiles wide, a tidy 3 × 3 block with the island and the ditch (8 moves). Cut: a ledge tile no route uses (convention 6).
- E: the corner at (4, 2) a ditch, so one moat wraps the island (8 moves, the same states). Not chosen: kept chamber 1.2's look of a ditch per gap and a steel corner, which reads as three parts, not one island in a moat.
- F: the box on the subject's side and the button beyond one ditch, chamber 1.1's two rooms (9 × 6, 7 moves, 2 portals). Cut: a player who shoots before picking the box up never needs a free hand again; the walk finishes it with the box put down only on the button.
- G: every wall plain, to take the training wheels off (guideline 49; 8 moves, 3 portals). Cut: the key move still holds (restriction 2), but 3,192 states can't be finished: a box left in front of s or r while the subject leaves that part by another face seals it off; and 2,542 states reached without the turn key can't be finished without it.
- Not built: the sketch's two islands in a straight line from the button's side. Shots fly over ditches, so along a straight line the box's island sees the button's side; stepping the islands off the line gives this L.

## Checks

- `npm run solve -- --baseline --par --max-states=40000000`: 8 moves, 3 portals, both searches (the reference search keeps 1,096 states for fewest moves and 940 for fewest portals); 3 portal wall sides; key 18 bits. `--solvable` finds 10 moves and 3 portals, since its limited box drops allow a put-down in front of a portal.
- Copies with the box removed, with the button's link and its antline removed, with the button and its antline removed, with s, r or b steel, and with the island cut to the tile in front of r (the key move made impossible): all unsolvable from `--baseline` and `--par`. The copy with every wall plain: 8 moves and 3 portals; with the box removed too, unsolvable.
- Every reachable state (1,318, two completed) explored through the rules' step: each can still be finished, and none breaks a fact above. The same walk with the turn key never pressed (916 states) finishes from each. Refusing every shot while the box rests on the island (340 states), every step from a state with the box resting there (268), or every put-down but onto the button (252) reaches no completion. On the copy with every wall plain, the walk finds the dead states of variant G, so the check can fail.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass (the walk: 100,000 steps, 16 completions). `npm run replay:check` and `npm run solver:check` fail on chambers 3 and 4 only, for want of a recorded solution.
- Played through in the real game (headless Chrome, a throwaway profile, the dev server on a port of its own, sound muted), each run completing the chamber with no console error:
  - The intended route, with the start's shot and the refused shot on the island on the way (8 moves, 3 portals).
  - Wrong tries 5, 3 (on the ledge), 2 and 6, with the recovery from 6, then the exit.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no `Must` breached, no shortcut and no dead end. It walked 1,318 states with the turn key and 916 without, none of them unfinishable either way. Its copy with the box removed is unsolvable in all four searches. Forbidding crossings while carrying leaves the exit out of reach, and so does forbidding every put-down but onto the button: a route needs at least two put-downs. A copy with the ditch tile at (4, 1) made floor gets a 2-portal route with no put-down to shoot, so that ditch is load-bearing. Guideline 40 holds: the button doesn't line up with the door, and a shot through the door leaves by the exit. It flagged wrong try 13 (the same error sound for two refusals), that nothing is dropped at the end of the run (guideline 49, weighed above), and that the refused shot isn't forced, only the put-down to re-aim (the lure section); all three were accepted with no change to the layout.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
