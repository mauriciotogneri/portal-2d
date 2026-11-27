# Chamber 30 (run 13, chamber 13.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-27, checked and independently reviewed; waiting for the author's cold play, then its recorded solution. File: `src/chambers/chamber_30.json`, thirtieth in the play order; permanent id 30. Run 13's second chamber and the campaign's last (`docs/campaign.md`, "Run 13 in detail").

## Entry

Run 13, chamber 2, combine, the campaign's last chamber. Elements, with antlines: a fizzler, an arrow a button turns, fixed arrows, two boxes (one absent until a switch brings it in), three doors in a row, each with its own button, a pit of ditches, the exit. Every wall is steel but two plain walls. The player knows runs 1 to 12, and 13.1. It should teach that a box can rest on an arrow's tile, and that doors in a row open together only while every button is held, with one box fewer than buttons. Hint: none (convention 7).

## Layout

15 × 12, in two areas: the box room on the right, then the doors room and the corridor on the left and along the top.

```
y11 ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ X ■
y10 ■ 1 . . D . . E . . F _ _ . W
y9  ■ ■ . ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
y8  ■ 3 . . 2 . ■ ■ ■ ■ ■ ■ ■ ■ ■
y7  ■ . . . . . ■ . > . ■ ■ ■ ■ ■
y6  N . . . . . k T ■ v ■ ■ ■ ■ ■
y5  ■ . . x . . ■ . . w . . . ■ ■
y4  ■ . . . . . Z . . . . . . ■ ■
y3  ■ . . . . . ■ . . S . . . ■ ■
y2  ■ . . . . . ■ . . . . . . ■ ■
y1  ■ ■ ■ ■ ■ ■ ■ . . . . . b ■ ■
y0  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7 8 9 10 ...  14
```

`■` steel; `N` and `W` plain walls; `_` an open ditch.

**Area A, the new catch** (the box room, x 7–12):

- The box **b** (12, 1). The start **S** (9, 3), facing left.
- The fizzler **Z** (6, 4), always on, between the box room and the doors room.
- The turnable arrow **T** (7, 6):
  - It points up, its own way, and right while its button **k** (6, 6), beside it in the doors room, is held.
  - It is entered from the box room's tile (7, 5), below it.
  - Up from it a road loops back into the box room: (7, 7), the fixed arrow `>` (8, 7), (9, 7), the fixed arrow `v` (9, 6).
- The road ends on the switch **w** (9, 5). It links only the box **x**, which it brings in on (3, 5) in the doors room. It has no antline (guideline 96).

**Area B, the author's seed** (the doors room, x 1–5, and the corridor along row 10):

- The corridor:
  - **Button 1** (1, 10), on the doors' line at its west end.
  - The doors **D** (4, 10), **E** (7, 10) and **F** (10, 10), opened by buttons 1, **2** (4, 8) and **3** (1, 8).
  - A pit, the ditches (11, 10) and (12, 10).
  - The ledge (13, 10), under the exit X (13, 11), with the plain face **W** (14, 10) behind it.
- The doors room reaches the corridor by the gap (2, 9). Its plain face **N** (0, 6) is the near portal face.

Four antlines:

| # | From | To | Path |
|---|---|---|---|
| 1 | Button 1 | D | (1, 10), (4, 10) |
| 2 | Button 2 | E | (4, 8), (4, 9), (7, 9), (7, 10) |
| 3 | Button 3 | F | (1, 8), (0, 8), (0, 11), (10, 11), (10, 10) |
| 4 | k | T | (6, 6), (6, 7), (7, 7), (7, 6) |

## Idea

**Area A, the new catch:**

- The box can't be carried through the field, and the arrow it could ride loops back.
- So leave the box on the arrow, the one tile both rooms touch, and walk through the field.
- Then stand on the arrow's button. The arrow turns, box and all, toward the subject, so the box can be lifted from its side.
- A box resting on an arrow can be lifted only from a tile that could step onto the arrow. No earlier route ever put a box on an arrow (checked on the recorded solutions and every state of chambers 15 to 17).
- The catch was found by a fresh designer searching for one.

**Area B, the author's seed:**

- Three doors in a row, open together only while all three buttons are held, are the only line to W.
- With two boxes, the subject holds the button on the line, button 1, and shoots W through all three doors and over the pit.
- It steps off: the doors close and the portal stays. Then it shoots N and crosses to the ledge.

## Purpose

The finale: synthesis and spectacle, with catches no harder than chamber 29's (guideline 50).

- The turntable is the new catch.
- The closing show: the three doors opening one by one, their antlines lit, and the shot across the pit to the exit's ledge.

## Gem or flow

Two steps:

- area A, a gem;
- the seed, light: chamber 5's move with more doors.

## Intended route

1. Use the switch, at any time: x appears in the doors room.
2. Carry b to (7, 5) and put it down on T, which points up.
3. Walk through the field into the doors room, step onto k (T turns right, with the box on it), and lift the box.
4. Put the boxes on buttons 2 and 3.
5. Stand on button 1 and shoot W through D, E and F, over the pit.
6. Step off, shoot N, walk into it, and go up into the exit.

71 presses, the fewest (a walk of every state).

## Lure and where the player should get stuck

**Area A:** each wrong try fails plainly within a few moves.

- Carry the box into the field: it breaks and flies home.
- Ride the road with it: it loops back.
- Put the box on k: T turns, but no box rests on T, so nothing is gained.

**Area B:** two boxes and three buttons, so the player hunts for a third box until standing on button 1 shows the line.

## Restrictions

| # | Restriction | What it blocks |
|---|---|---|
| 1 | No plain face is in sight of the box room | A portal pair carrying the box round the field |
| 2 | The fixed arrow `>` (8, 7) | A box left at (7, 7) from the east, which would freeze a subject carrying the other box on T (98 dead states without the arrows; blind reviewer) |
| 3 | The fixed arrow `v` (9, 6) | Entering the road from the switch and leaving a box at (9, 7) (dead end) |
| 4 | The road ends on the switch, which can never hold a box | A box blocking the road's exit while the subject rides it with the other box (294 dead states with plain floor there) |
| 5 | The pit before the ledge | A box carried past the doors and left there, out of reach once the portals are lost (guideline 111) |
| 6 | W is on the corridor's line only, and buttons 2 and 3 are off it | Shooting W without the subject on button 1 |

## Facts that must never be possible

- W hit while any door is shut.
- A box past E. Boxes can rest between D and E, harmlessly.
- b in the doors room without being lifted from T.

## Guidelines broken on purpose

- **11:** two hard steps (decision 7).
- **18:** nine kinds of element (decision 4).
- **80 and 9:** riding the road carrying a box ends on the switch, where interact is refused with the error sound (4,024 states). Kept, as plain floor there is a dead end (restriction 4).

## Risks named by the reviewers

- **113: it may read as chamber 16 reversed.**
  - The arrow's button lies right beside the arrow, which is entered only from there: chamber 16's frame.
  - The move is 16's with the roles swapped: the box on the arrow, the subject on its button.
  - Run 7's cut third chamber died as "16 reversed". The author's cold play decides.
- **108, 89 and 20: the turn is heard but not seen.**
  - The box covers the arrow's chevron, so the turn under it is heard, and its antline lights, but it can't be seen. To check in the game.
  - Standing on k always turns T, so the lift always works.
  - What every route is forced to do is leave the box on the arrow and lift it from the other room, which is all the entry claims.
- **28 and 117: x may read as lost.**
  - Carried into the field, or caught in a closing door, x is gone until the switch is used again (125,331 states). It is recoverable and never dead.
  - A second use of the switch also sends a box resting on (3, 5) back to the box room.
- **Decision 7, partly met:** a slip that destroys b sends it home to the box room, so the turntable must be done again; no restart is needed.
  - A switch that turned the field off for good, to keep area A solved, was tried and dropped: it let two boxes into the box room, which made the dead ends of restrictions 2 to 4.

## Near misses and wrong tries

- **Two boxes on buttons 1 and 2,** or 1 and 3: D and one other door open, the third stays shut, plainly.
- **A box carried through the portal to the ledge:** it can't be put down there (the pit, the exit and the walls refuse it), so it comes back or goes out with the subject.
- **No dead state.** Every one-way step (the road, T, the field for a box) has a way back.

## Variants tried

1. **The prototype of area A alone:** 7 × 6, its exit standing in for the hand-over; 734 states. With T fixed: 501 states and no completion.
2. **The switch in a nook off the corridor between D and E,** reached through D, held by the box. That made the "box on button 1 looks done" lure.
   - Its second use sent x home from button 1 and shut the subject in between the doors.
   - A one-way arrow back to the room fixed that.
   - Then a box parked on the road's landing froze the subject on the road's last arrow, and that ended the nook.
3. **The road ending on plain floor:** 294 dead states (restriction 4).
4. **The corridor running on past F to the ledge:** a box left there was out of reach once the portals were lost (426,482 dead states). Hence the pit.
5. **The field at (6, 2):** 75 presses. Moved to (6, 4) on the blind reviewer's advice: 71.

## Checks

- **Walk of every reachable state** through the rules' step, with the game's presses:
  - 8,383,120 states, 3,776 completed;
  - 0 dead, 0 with the subject standing in something blocked, 0 with a box under it;
  - 71 presses, the fewest.
- **Key move forced:** with T fixed pointing up and k plain floor, 751,693 states and 0 completed.
- **The seed's shot is forced, by argument:**
  - W is reached only along row 10, and only through D, E and F, which need buttons 1, 2 and 3 held.
  - There are two boxes, and of the three buttons only button 1 is on row 10.
  - The handbook reviewer confirmed it: no state has the subject past D with E and F open, until it comes out of the portal.
- **Handbook reviewer:** the subject never stands on T while it points right (guideline 77).
- **Blind reviewer:**
  - Solved it by reasoning: the doors in about a minute, the crossing in a couple of minutes.
  - Verdict "fair and good, only long".

## Playtests

None yet.
