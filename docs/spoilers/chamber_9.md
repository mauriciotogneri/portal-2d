# Chamber 9 (run 4, chamber 4.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-23, their cold run its recorded solution. File: `src/chambers/chamber_9.json`, ninth in the play order; permanent id 9. Designed together with chambers 4.1 (id 8) and 4.3 (id 10), all three before the author played any (the author's call, 2026-11-23).

## Entry

Run 4, chamber 2, teach. Elements: a switch, a box that starts absent, a button, a door; walls, steel and the exit are known from run 1. The player knows runs 1 to 3 and chamber 4.1 (the switch). It should teach that a box can start absent: using a switch linked to it brings it in on its start tile, and from then on it is a box like any other. Hint: none (convention 7).

## Layout

5 × 7, upright. A 3 × 4 room, the door in the middle of its top wall and the exit right above the door, in the chamber's top wall. The subject starts in the bottom left corner, facing right at the switch two tiles away in the bottom right corner. Two tiles above the switch, in the room's right column, the box's start: bare floor, since the box starts absent. The button is on the room's left wall, in that same row. Every wall is steel.

```
y6  ■ ■ E ■ ■
y5  ■ ■ D ■ ■
y4  ■ . . . ■
y3  ■ o . a ■
y2  ■ . . . ■
y1  ■ S . s ■
y0  ■ ■ ■ ■ ■
    0 1 2 3 4
```

`■` steel, `S` the subject's start (1, 1), facing right, `s` the switch (3, 1), linked to the box, `a` the box's start (3, 3), where nothing is drawn until the switch brings it in, `o` the button (1, 3), linked to the door, `D` the door (2, 5) (linked, so it starts closed), `E` the exit (2, 6) (open).

The switch's antline runs straight up from the switch, (3, 1), (3, 3), and ends on the bare tile. The button's: (1, 3), (1, 4), (2, 4), (2, 5), into the door from below.

## Idea

The room holds no box until the switch brings one in where its antline ends, and that box then goes onto the button like any other.

From the idea pool, where it was sketched as a plant of chamber 4.3 (guideline 51):

> - **Run 4, chamber 2: the box the switch brings in** (teach; a plant of chamber 4.3's sketch, since 2026-11-23). No box in view: the room holds a switch, a button and the door it opens before the exit, and the switch's antline runs to a bare floor tile, the start of a box that starts absent. Using the switch brings the box in there, gathering from pieces; the subject carries it onto the button and walks out. First contact forced, safe and unambiguous (guideline 24): no box exists until the switch is used, so every route uses it, and the box is then carried like any other. What it plants for 4.3: a switch linked to a box puts it on its start tile, the tile its antline ends on. Not forced: a second use, which would send the box home from wherever it lies, offered as a rescue only; a box flying home from elsewhere, met in 4.3. _Check:_ guideline 114 (the start off the switch's tile, the only one the subject stands on when the switch acts); 113 (every route is 4.1's interact, then chamber 1.3's box onto its button, only the box appearing new, so it may read as 1.3: the author's play will tell); 112 and 4 (in the prototype the switch's antline ends beside the button, so check in the game that it doesn't seem to lead to the button); 59 (the button not beside its door); 80 (the switch off the tiles where the box goes down). Feasibility, 2026-11-23: a prototype (7 × 4, every wall steel, the switch in the room's top left corner, the box's start two tiles right of it, the button beside that, the door below the button's right, then the exit): 7 moves and 0 portals; all 265 reachable states can be finished, with or without the turn key; the copy without the switch and its box is unsolvable.

Built, the sketch holds, with these changes:

- **Upright.** The door and the exit are at the top and the room is taller than it is wide, so it doesn't look like chamber 1.3's wide room, whose route it shares (the sketch's risk).
- **The switch's line is one straight column**, two tiles up from the switch to the box's start, so the subject on the switch, turning up, looks along the line at where the box gathers.
- **The box's start is off the switch's neighbours**: a box appearing right in front of the subject standing on the switch invites interact there, which uses the switch again rather than picking the box up (guideline 80's refusal, in another form).
- **The start is two tiles from the switch, facing it, in the bottom row**, where chamber 4.1's start is beside its switch in its room's lower row, under the room's top row, so the two chambers don't open alike.

## Purpose

Teaching: the box that starts absent (decision 12 of `todo/campaign.md`), its first contact forced, safe and unambiguous (guideline 24): no box exists until the switch is used, so every route uses it, and the box is then carried like any other. Its plant for chamber 4.3: a switch linked to a box puts it on its start tile, the tile its antline ends on. It may also leave the belief that a switch makes boxes, which walks players into 4.3's trap (guideline 27, used there).

Flow: no hard step.

## Intended route

1. Walk right twice, onto the switch.
2. Interact: the box takes shape on (3, 3) from gathering pieces, where the line ends, with the sound of a box sent home; the line lights.
3. Step up to (3, 2), facing the box; interact: pick it up.
4. Step up onto (3, 3) and left to (2, 3), facing the button; interact: the box goes down on it; the door opens and its line lights.
5. Walk up through the door and out through the exit.

Solver: 8 moves and 0 portals, both the fewest; the state walk's fewest presses (11) are this route. No route needs the turn key (the same 11 presses without it).

## Lure and where the player should get stuck

A teach chamber has no lure. A button, a door and its line are in view, as in chamber 1.3, but no box anywhere: run 1's habit says find the box. Where the player may stall: looking for it, until they follow the switch's line, which ends on an empty floor tile, and use the switch, which chamber 4.1 taught. Standing on the button without a box opens the door only while the subject is there, as in 1.3.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The door, linked to the button, right in front of the exit | Walking out: the copy with the switch and its box removed is unsolvable from `--baseline` and `--par` |
| 2 | No box but the absent one | Skipping the switch: the walk refusing every step in which a box appears (48 states) reaches no completion |
| 3 | The button off the door's neighbours | Guideline 59: stepping off the button into the doorway |
| 4 | The box's start off the switch and its neighbours, off the button's neighbours and off the button's line | Guideline 114 (the switch acts only while the subject stands on it, so the box never lands under the subject: checked, never), the box appearing in front of the subject on the switch (Idea), and guideline 112 |
| 5 | The switch off the button's neighbours | Guideline 80: no tile the box goes down from onto the button is a switch |
| 6 | Every wall steel | Nothing to cross: the chamber is about the box; 4.1 keeps portals in use before 4.3 |

## Facts that must never be possible

- Finishing without the switch bringing the box in. Checked: the walk refusing it reaches no completion, and the copy without the switch and its box is unsolvable.
- The box landing under the subject. Checked: no reachable state has it.
- A portal anywhere. Checked: the solver counts 0 portal wall sides.
- The subject in the shut doorway. Checked: every reachable state.
- A state from which the chamber can't be finished. Checked: all 585 reachable states can be finished, with or without the turn key.

## Guidelines broken on purpose

None. Guideline 113, the sketch's risk: every route is chamber 4.1's interact on a switch, then chamber 1.3's box onto its button, only the box appearing being new, so it may read as 1.3. The author's play will tell.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Standing on the button | The door opens while the subject is there and shuts on the step off, its line lit only meanwhile |
| 2 | Stepping onto the switch without interact | Nothing |
| 3 | Using the switch again, the box still on its start | Nothing: a box already on its start isn't sent back |
| 4 | Using the switch again once the box has moved | The box comes apart and flies home to (3, 3); on the button, the door shuts as it leaves. A rescue the chamber offers and never needs; no route needs a second use (a later chamber shows it before any relies on it) |
| 5 | Interact on the switch while carrying the box | Refused, with the error sound; the box stays in hand. The switch lies off the way to the button |
| 6 | Putting the box down in front of the door, on (2, 4) | It bars the way; picked up again from beside it |
| 7 | Shooting | A miss ripple on steel |

## Variants tried

- The sketch's prototype (7 × 4, the switch in the top left corner, the box's start two tiles right of it, the button beside that): not built; its box's start beside the button left a carry of one step.
- B: the same upright room with the switch in the bottom left corner and the start beside it, facing it, the box's start reached by a line along the second row (585 states, none dead, 7 moves). Not kept: it opened exactly as chamber 4.1 does.
- C, kept: the start two tiles from the switch.

## Checks

- `npm run solve -- --baseline --par`: 8 moves and 0 portals, both searches; 0 portal wall sides; key 13 bits.
- The copy with the switch and its box removed: unsolvable from `--baseline` and `--par`.
- Every reachable state (585, one completed) explored through the rules' step: each can still be finished, and none breaks a fact above. With every turn action refused: 426 states, completed in 11 presses.
- `npm run chamber:check` passes.
- Played through in the real game (headless Chrome with a throwaway profile, the dev server on a port of its own): the switch, the box gathering on (3, 3) at the end of its lit line, the pickup, the put-down on the button, the door opening and the walk out, completing the chamber with no console error.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 585 states (426 without the turn key), none unfinishable, the box never under the subject, 8 moves and 0 portals, every completion with the box on the button, and the copy without the switch and its box unsolvable from both searches. Both halves of the lesson are forced, and the combine's move isn't rehearsed: no route uses the switch on a box resting on the button, though a curious player can. Its judgment calls:
  - Refusals that could look like bugs: interact on the switch while carrying (wrong try 5), and a put-down facing the switch from (2, 1) or (3, 2). None lies between the box and the button. Accepted.
  - Where the switch's line seems to end: a line stops a sixth of a tile short of its element's tile and the switch hides its start, so before the box exists it shows as a short stub over (3, 2), pointing at the bare tile, and could be read as ending on (3, 2). Seen in the game, it points at (3, 3), and the box then gathers there in view (guideline 70), which settles it; chamber 4.3's line ends under a box already resting there. Accepted, to watch in the author's play.
  - It reads close to chamber 1.3 (guideline 113): after one use of a switch, the route is 1.3's, only the box appearing being new. Acceptable for a teach (guideline 24); the sketch named the same risk.
  - Its opening was close to chamber 4.1's mirrored; since then 4.1 was turned upside down (its notes, variant C), so the two open differently.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-23 | Played after chamber 4.1. Exactly the intended route: onto the switch, the box brought in, picked up from (3, 2), carried up and left and put down on the button from (2, 3), out through the door (8 moves, 0 portals, both the fewest). The recorded run (restarts before it, if any, aren't in it) met none of the wrong tries. Recorded as `chamber_9.solution.json` (Download solution); kept: "i like those" |
| 2 | Friends, cold | 2026-11-23 | Played it with the rest of run 4, by the author's account. Their routes, and how many friends played, weren't recorded, so what it taught them can't be shown (guideline 105) |
