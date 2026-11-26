# Chamber 5 (run 2, chamber 2.4, the run's only chamber)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-23, their cold run its recorded solution. File: `src/chambers/chamber_5.json`, fifth in the play order; permanent id 5. It was built as 2.4, the last of four, with id 8; the other three, 2.1 to 2.3 (ids 5 to 7), were cut on the same play (the idea pool, "Cut drafts"), so it is now run 2's only chamber and comes straight after chamber 1.4, and it took id 5, the id after the last chamber's, so none is skipped (the author's rule, 2026-11-23; `AGENTS.md`, "Chambers"); the cut drafts' ids were never deployed.

## Entry

Run 2, its only chamber, a combine, built as 2.4. Elements: a box, a button, a door, ditches. The player knows run 1 (when it was designed, 2.1 to 2.3 too; see Purpose). It should teach that a door shutting closes no portal, and that either portal can be the way in. Hint: none.

## Layout

10 × 5. The room (4 × 3, left), where the subject starts in the bottom right corner, beside the door's wall, with the button in its middle row, two tiles in from the door; every wall of the room is plain. The door (5, 2) is in the room's right wall, which is steel. Past it, the far side: (6, 2) and (6, 3), with the exit (6, 4) above them. Then a ditch column (x = 7), and past it the pocket: the landing (8, 2), in front of the pocket's face **P**, the west face of (9, 2), and the box (8, 1) below the landing. Every wall right of the room is steel but P. An antline runs from the button right into the door.

```
y4  W W W W W # E # # #
y3  W . . . . # . ~ # #
y2  W . . o . D . ~ . P
y1  W . . . S # # ~ b #
y0  W W W W W # # # # #
    0 1 2 3 4 5 6 7 8 9
```

`W` plain wall, `P` the pocket's face (a plain wall), `#` steel, `~` open ditch, `S` the subject's start (facing up), `o` the button, `b` the box, `D` the door (linked to the button, so it starts closed), `E` the exit (open).

The room sees past its walls only through the open door, along the middle row, where the line runs over the far side, the ditch and the landing to P. The pocket sees P and, with the door shut, nothing else that takes a portal.

## Idea

From the idea pool, where it was sketched before run 2's other chambers (guideline 51): the box lies in a pocket beyond the door and a ditch, and the pocket's only face is in line only through the open doorway from the button, so the subject holds the door open itself, shoots through it from the button onto that face, steps off (the door shuts, the portal stays), crosses with a portal on its own side, and brings the box back through the same pair, walking into the colour it came out of.

The sketch, as it stood in the idea pool:

> **Run 2, chamber 4: the box beyond the window** (combine; sketched 2026-11-23, its run detailed in `docs/campaign.md` the same day). The button, and the door it opens on the way to the exit, are on the subject's side; the box lies beyond the door, past a ditch, in a pocket whose only face that takes portals lines up with the doorway, so the subject's side sees that face only through the open door, and only along the button's line. The catch: the door must be held open to reach the box, and the box is what would hold it. It resolves by the subject holding the door itself: it walks onto the button towards the door, shoots one portal through the open doorway onto the pocket's face, steps off (the door shuts, the portal stays), shoots the other on its own side and crosses; it takes the box and comes back through the same pair, walking into the colour it came out of, since the pocket sees no other face; then the box goes on the button and the subject walks out through the door. One key move, the shot from the button; the trip to the box and back stays plain (the pair stands, no re-aim), so nothing else is hard (guidelines 11 and 24). The lure: run 1's habit, box to button, with the box out of reach; stepping off the button shuts the door, as in 1.3, and a shot at the shut door misses on it. It takes the training wheels off (guideline 49): for the first time no box is within reach of the button, so the subject holds it to shoot, and the subject's room can have every wall plain, since it sees the pocket and the exit's side only through the doorway; the pocket keeps its single face (guideline 78, below). Plants: 2.2, a door as a window, held open by the box, with the button off the doorway's line, so the subject never holds the door to shoot there; 1.3, standing on the button holds the door open and the step off shuts it (its lure); 1.4, or 2.3 if a redo of 1.4 loses it, a pocket left through the colour come out of; 2.3, carrying the box through portals, brought back just before (guideline 48); 2.1, where the subject comes out of a portal. Keep it unrehearsed (guideline 47): no earlier chamber lets the subject shoot through a door it holds open itself onto a face that takes portals (guideline 40 decides it as a cheat in 2.2 and 2.3; 1.3 and 1.4 already leave it nothing to hit). Idea 3 below, "Hold the door with a shot", is this move with no box; the proposal leaves it out as a chamber of its own so as not to rehearse this one (its decision 1). If the author picks five chambers, idea 3 goes between 2.2 and 2.3, and this chamber's catch then rests on seeing that a known move reaches the box, which makes it easier. _Check:_ guideline 40 (the move is the lesson here); 59 (the button not beside the door); 66 (the subject reaches the button moving towards the door, so the shot needs no turn key, and the box goes onto the button with a run-up); 67 (the box's start off the tile in front of the pocket's face, where it would refuse the crossing); 78 (the pocket sees no face but its own, so the portal come out of can't be lost from inside: a second face there, or one over the ditch, lets one wrong shot strand the subject); 74 and 102 (the pocket sees no face on the exit's side, or a route skips the box; linking the exit to the button too, the campaign's first closed exit, is the fallback if the room's shape can't do it); 28 (the portal stays in view as the door shuts, so nothing looks lost). Feasibility, 2026-11-23: a throwaway prototype in a scratch folder, not a draft (7 × 9, the subject's room's walls all plain, the pocket's other walls steel), came out at 11 moves and 2 portals, every route the solver found shooting from the button through the open door, and copies with the pocket's face steel, with the box removed, with the door's link removed, or with the button moved off the doorway's line all came back unsolvable from `--baseline` and `--par`.

Built, the sketch holds as written; the room's shape keeps the pocket from seeing the exit's side, so the exit stays open (no fallback needed). The one change: the door's wall and the far side's walls are steel, since a face there lets the box be carried past the door and stranded (variant A).

## Purpose

Combine, and the run's end: a door held open by the subject itself as a window, which takes the training wheels off (guideline 49); the pocket left through the colour come out of (1.4); carrying the box through portals (1.4); landing in front of a face beyond a ditch (1.1 to 1.4). It was designed with 2.2's window, held by the box, and 2.3's carry through portals planted just before it (the sketch's plants); with them cut, only chamber 1.3 plants the door it builds on (standing on the button opens it, the step off shuts it), and a shot through an open door is met here for the first time, so it may be harder cold than it was for the author, who played it after 2.1 to 2.3. The friends' cold play (Playtests, below) will show whether it needs a warm-up. Every route makes both of the entry's lessons happen: the door shuts as the subject steps off the button with the portal on P, and the way back from the pocket is the colour come out of.

Gem: one key step, the shot from the button through the door it holds open, with a short, plain route around it.

## Intended route

1. Step up to (4, 2) and left onto the button: the door opens behind the subject, its antline lit. Step left again to (2, 2) and back right onto the button, now facing the door.
2. Shoot one colour through the open door, over the far side, the ditch and the landing, onto P.
3. Step off the button, up to (3, 3): the door shuts, the portal on P stays. Shoot the other colour up onto the room's top wall (3, 4).
4. Walk up into it; come out on the landing (8, 2), facing left. Walk down into the box; pick it up.
5. Walk right into P, the colour come out of; come out at (3, 3) facing down, the button right below. Put the box down on it: the door opens.
6. Walk round to the door, through it and the far side, and up out through the exit.

Either colour can go on either face, and the room's portal on any wall of the room (guideline 31); one above, below or left of the button's row brings the subject back facing a tile from which the box goes onto the button at once or after one step, and any other after a short walk. Solver: 11 moves and 2 portals, both the fewest (with the turn key, facing the door on the button with a turn); without it the state walk's fewest presses (18) are this route, 13 moves.

## Lure and where the player should get stuck

Run 1's habit: box to button, with the box out of reach beyond the door and the ditch. The subject starts beside the door's wall, so its natural first steps reach the button from the right, facing away from the door: stepping on opens the door, as in chamber 1.3, and the step off shuts it; from the tile in front of the shut door a shot misses on it, since a door never holds a portal. Every wall of the room takes portals, so every shot from the room opens a portal in the room: nothing past the room is in reach. P is in view through the open door only from the button.

Where the player should get stuck: seeing that the subject can stand on the button facing the door, hold it open itself and shoot through it, and trusting that the portal stays when the door shuts (it stays in view across the ditch, guideline 28).

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditch column | Walking between the far side and the pocket: from the pocket straight to the exit, skipping the box on the button |
| 2 | The door's wall and the far side's walls steel | A face past the door that the subject, through the open door, could put a portal on and then carry the box past the door by: variant A, with them plain, has 8,944 states that can't be finished with the turn key (the box left on the far side, its portal moved; guideline 111, added from this draft and a cut one of run 2's) |
| 3 | The pocket's walls steel but P | A second face in the pocket, or one over the ditch, that one wrong shot would strand the subject by (guideline 78), and any face on the far side in line from the pocket, which would skip the door |
| 4 | The button on the door's row, two tiles in | The shot through the door, the lesson (guideline 40); not beside the door (guideline 59). A copy with the button moved off the door's row is unsolvable |
| 5 | The room four tiles wide | The button's run-up from the left, which faces the door from the button and the box onto it without the turn key (guideline 66) |
| 6 | The box beside the landing, not on it | A box start in front of P would refuse the first crossing (guideline 67) |
| 7 | The exit off the door's row | The door's line running out through the exit, which would leave nothing to hit |
| 8 | The room's walls plain | Nothing: the room sees past its walls only through the door (guideline 49) |
| 9 | The start in the room's bottom right corner | Nothing: the natural way onto the button is from the right or below, facing away from the door, so facing it from the button takes a choice (guideline 8). From the first draft's start, in the bottom left corner, the natural first walk (up, right, right) ended on the button facing the door, the shot one press away (variant B) |

## Facts that must never be possible

- Reaching the exit without the box on the button. Checked: copies with the box removed, with the button's link and its antline removed, with P steel, and with the button moved off the door's row are unsolvable from `--baseline` and `--par`.
- Finishing without a shot from the button. Checked: the state walk that refuses every shot from the button reaches no completion (6,384 states).
- Finishing without walking into each colour. Checked: the walks that refuse every crossing into blue, or into orange, reach no completion.
- The box on the far side, (6, 2) and (6, 3), in the doorway, destroyed or sent home; the subject in the shut doorway; the door out of step with its button. Checked: every reachable state; the box rests only on the room's 12 tiles and the pocket's 2.
- A state from which the chamber can't be finished, with or without the turn key. Checked: all 87,732 reachable states (67,109 without the turn key) can still be finished.

## Guidelines broken on purpose

None. Guideline 40's shot through an open door from the button is the lesson here.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished, and while the door is shut the pocket's pair always stands with the subject in it, since nothing in the pocket can move either end but P itself; once the box holds the door open, a shot left from the landing reaches the room's west wall, and P can be shot again from the landing.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting at the door from the room | A miss ripple on the shut door |
| 2 | Stepping onto the button from above or below and shooting | The shot hits the room's top or bottom wall; stepping right moves off the button and shuts the door. The button faces the door only from the left |
| 3 | Shooting from the button, then stepping off | The door shuts; the portal on P stays, in view across the ditch |
| 4 | In the pocket, shooting anything | While the door is shut, P only: from the landing every other line ends on steel or the shut door |
| 5 | Coming back with the box and carrying it onto the button | The door opens, held by the subject; interact puts the box down on the tile faced, beside the button, as in chamber 1.3, and the step off shuts the door. Coming back at the button from two tiles left faces it |
| 6 | Putting the box down on the landing, in front of P | It bars the crossing; picked up again from beside it |
| 7 | Shooting while carrying the box | Refused, with the error sound |
| 8 | Walking into a ditch | The subject stops facing it, silently |

## Variants tried

- A: the door's wall and the far side's walls plain (the same pars). Cut: from the far side, through the open door, a face there can hold a portal by which the box is carried past the door and left, 8,944 states that can't be finished with the turn key (none without it).
- B: the subject starting in the room's bottom left corner, facing up (12 moves, the same states), the first draft, which the independent check saw. Changed: its natural first walk ended on the button facing the door, so the key shot could be stumbled on.
- The sketch's prototype, 7 × 9, on its side (not kept): this layout is the same chamber laid along the screen's width, at run 1's 9 × 5 scale.

## Checks

- `npm run solve -- --baseline --par --max-states=40000000`: 11 moves and 2 portals, both searches; 12 portal wall sides; key 22 bits.
- Copies with the box removed, with the button's link and its antline removed, with P steel, and with the button moved off the door's row: all unsolvable from `--baseline` and `--par`.
- Every reachable state (87,732, and 67,109 without the turn key) explored through the rules' step: each can still be finished, and none breaks a fact above.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass (the walk: 100,000 steps, 4 completions).
- Played through in the real game (the user's Chrome, the dev server on a port of its own, so the author's stored progress is untouched): on variant B, then on this layout, the shot from the button lands on P, the portal stays as the door shuts, and the rest of the route completes the chamber with no console error. On this layout the subject first stepped onto the button from the right, facing away, then came back at it from the left.
- An independent check (a fresh agent with only the file and the plan's entry, no notes), on variant B, found no shortcut, no dead end and no `Must` breached: its own walk found 87,732 states (67,109 without the turn key), none unfinishable, and refusing each in turn the door shutting on a portal on P, walking into blue, walking into orange, walking into P and a shot through the open doorway leaves no completion. Its findings, judgment calls:
  - Probably easy: the natural first walk ended on the button facing the door, the key shot the next thing to try. Changed: the start moved (restriction 9, variant B).
  - "Either portal can be the way in" is forced as in chamber 1.4's ledge, a part that sees only the face it was entered by, so here it reinforces rather than adds; the new lesson is the self-held window and the door shutting on its portal. Accepted.
  - The ditches at (7, 1) and (7, 3) block nothing steel wouldn't (they must not be plain walls: (7, 3) would give a face onto the far side, (7, 1) a second face to the pocket). Kept: the moat reads as one column, as in chambers 1.2 and 1.4.
  - Without the turn key, the box goes down in the pocket only straight back onto (8, 1) right after the pickup; coming in carrying it, every put-down there is refused. Never a stuck state, since walking into P always leads out (guideline 79 holds in purpose, not in letter). Accepted: nothing sends a player there with the box.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-23 | Played after the cut drafts 2.1 to 2.3, so with the window and the carry through portals freshly planted. Left and up onto the button from below, turned to face the door with the turn key, blue through the open door onto P; turned left and shot orange along the button's row onto the room's west wall (0, 2), walked into it, took the box, back through P, out at (1, 2), the box onto the button from (2, 2), then round to the door and out (15 moves, 2 portals; the fewest are 11 and 2). The turn key, which run 3 teaches, did what a step left and back would have. Kept: "this one is ok because it forces the player to shoot a portal through an open door". Recorded as `chamber_5.solution.json` (Download solution, while it still had id 8) |
| 2 | Friends, cold | 2026-11-23 | Played it and found it ok, by the author's account: so far no sign it needs a warm-up for the shot through an open door now that 2.2 is gone (Purpose). Their routes, and how many friends played, weren't recorded, so whether each met the lesson can't be shown (guideline 105) |

Lesson (guideline 107): its three companions, cut on the same play, gave guideline 113: keep only chambers whose every route does something the last combine didn't, and that doesn't look like an old move. This one's forced, new key move is what kept it.
