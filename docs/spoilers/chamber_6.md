# Chamber 6 (run 3, chamber 3.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-23, their cold run its recorded solution. File: `src/chambers/chamber_6.json`, sixth in the play order; permanent id 6. Designed together with chamber 3.2 (id 7), both before the author played either (the author's call, 2026-11-23, as for 1.3 and 1.4).

## Entry

Run 3, chamber 1, teach. Elements: a box, a button, a door, an antline; walls, steel and the exit are known from run 1. The player knows runs 1 and 2 (chambers 1 to 5). It should teach that turning in place faces the subject any way without moving, the only way to face a free tile beside it without stepping onto it, and so to put a box down there. Hint: none (convention 7): the controls legend names the turn key ("Turn in place: hold it, then a move key, to face that way"), and this chamber makes it the only way through.

## Layout

5 × 6. A 3 × 2 room at the top, where the subject starts in the top row's middle, facing down at the box right below it. Below the room's middle, a one-tile neck: the button, then the bend **P** (2, 1), where the neck turns right into the door, with the exit right behind it in the chamber's right wall. Every wall is steel. An antline runs from the button down to P and right into the door.

```
y5  ■ ■ ■ ■ ■
y4  ■ . S . ■
y3  ■ . b . ■
y2  ■ ■ o ■ ■
y1  ■ ■ P D E
y0  ■ ■ ■ ■ ■
    0 1 2 3 4
```

`■` steel, `S` the subject's start (facing down), `b` the box, on **R** (2, 3), the room's tile above the button, `o` the button, `P` the bend (floor), `D` the door (linked to the button, so it starts closed), `E` the exit (open).

P's only open sides are the button above it and the door to its right; below and left of it are walls. So the subject reaches P only from the button, moving down, facing the wall, and nothing it can do there but the turn key faces it back up at the button: a move up steps onto the button, and no tile lies behind P to come at it from.

## Idea

The box has to go on the button from beyond it, at the bend, where the subject arrives facing away from the button and only turning in place faces it back.

From the idea pool, idea 5, "Solved but trapped", which the sketch of chamber 3.2 named as this chamber's plant, bent at the far tile so it doesn't read as 3.2's straight corridor (variant A):

> **Solved but trapped** (box twist). A one-tile corridor: start, box, floor, button, floor, floor, exit, where the button opens the exit. Carrying the box to the button and putting it down from the start side seals the corridor with the exit open beyond it; the answer is to carry the box over the button, turn on the far side (turn key) and put it down facing back. _Teaches:_ a box bars its tile; the put-down tile is the one faced. _Check:_ guideline 59 (button not next to the exit), guideline 67; it's fully reversible, which is why it suits a game with no undo.

Built, two things changed. As written, the floor two tiles past the button gave the far tile a run-up (step out to it, step back), so the box went down from beyond without the turn key: here the far tile P has no tile behind it, the shut door on its other side. And a door before an open exit, as in chambers 1.3 to 2.4, rather than the exit itself linked.

## Purpose

Teaching: the turn key, a move the controls hide (guideline 29), in a chamber where it is the only way through. The author already uses it (chamber 2.4's playtest), so it is kept for players who don't (the run's detail). It plants what chamber 3.2 builds on (its sketch, in `chamber_7.md`): the turn key puts the box down behind, and a box on a button in a one-tile passage shuts it, offered here to the wrong try that puts the box down from the near side (guideline 108) and forced in 3.2. It keeps 3.2 unrehearsed (guideline 47): one box and one button, so no route leaves a box beyond its button and comes back for it.

Gem, a gentle one: one key step, the turn at the bend, with a short route around it.

## Intended route

1. Interact: pick the box up from R, the subject facing down at it.
2. Step down to R, down onto the button (the door opens, its antline lit), down to P (the door shuts as the subject steps off). The subject faces the wall below, the button behind it.
3. Turn up in place (the turn key and up).
4. Interact: the box goes down on the button; the door opens and its antline lights, both for good.
5. Step right through the door and right out through the exit.

Solver: 5 moves and 0 portals, both the fewest; the state walk's fewest presses (8) are this route. Every completing route turns in place at least once (the walk's fewest turn actions on a completing route: 1).

## Lure and where the player should get stuck

The subject starts facing the box, with the button and the neck beyond it on the same column, so the first plan is chamber 1.3's: pick the box up, step to the button's edge, put it down on the button. Picked up from the start and carried one step down, the subject stands on R facing the button, and interact puts it there: the door opens and the antline lights, and the box now bars the only way to the door (guideline 67). That is the lure (guideline 3): 1.3's habit, a box onto the button from the near side, which fails at once and for a reason the game shows (guideline 4): the door stands open beyond a box the subject can't pass. Interact again picks it up.

Then the box has to go down from beyond. Carried over the button (the door opens, held by the subject) and down to P (the door shuts), it leaves the subject facing the wall, the button behind it: interact is refused there, with the error sound, and so is it facing right, at the shut door; up only steps back onto the button. Where the player should get stuck: at P, carrying the box, seeing that it must face the button without stepping onto it, which only the turn key does, and the controls legend says so.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The door, linked to the button, across the only way to the exit | Walking to the exit: the idea itself |
| 2 | Every wall steel | A portal run-up: with every wall plain, the start shoots one portal at the room's top wall and the other straight down the column, over the box, the button and P, onto the wall below P, and walking into the top one with the box brings the subject out on P facing the button, with no turn key (the copy: 3 moves and 2 portals; its walk with turns refused completes in 9 presses) |
| 3 | P walled below and to its left | A run-up onto P facing the button: any tile behind P would let the subject step out and back, as idea 5's far floor did |
| 4 | The neck one tile wide | A way round the box on the button: the near-side put-down must seal (the lure). The walls beside the button also keep the box from going on it from the side |
| 5 | The button off the door's tile, diagonal to it | Guideline 59: stepping off the button into the doorway, which would shut under the subject |
| 6 | The room 3 × 2 | Nothing: the room's top middle tile gives the near-side put-down its run-up, so the lure needs no turn key, and the side columns give room to try things (guideline 36) and keep the chamber from being a bare corridor like 3.2's |
| 7 | The box on R, the start facing it | Nothing: the first thing in view, and the lure one step away (guideline 12, a teach chamber shows) |
| 8 | The neck bent at P | Nothing: a straight neck (variant A) forces the same; bent, it doesn't read as chamber 3.2's straight corridor (the sketch's risk) |

Guideline 40, the shot through the open door: the door's row runs from P out through the open exit, and no other tile sees through the doorway, so the line has nothing to hit; and every wall is steel.

## Facts that must never be possible

- Reaching the exit without the box on the button. Checked: the copy with the box removed is unsolvable from `--baseline` and `--par`; the state walk finds no completion with the button up.
- Finishing without turning in place. Checked: the walk that refuses every turn action (183 states) reaches no completion.
- The box in the doorway or past it, and so destroyed or sent home; the subject in the shut doorway; the door out of step with its button. Checked: every reachable state; the box rests only on the room's six tiles, the button and P.
- A portal anywhere, above all on the wall face below P, whose portal would bring the subject out on P facing the button. Checked: the solver counts 0 portal wall sides; a copy with only that face and one other plain completes with every turn refused (the independent check). Any wall made plain here means running the walk with turns refused again.
- A state from which the chamber can't be finished. Checked: all 261 reachable states, explored through the rules' step, can still be finished; and every state of the walk with turns refused can still be finished once a turn is allowed, so a player who doesn't know the turn key stalls but is never trapped.

## Guidelines broken on purpose

None. Guideline 66 (every put-down works without the turn key until it is taught): this is the chamber that teaches it, so its one put-down is the one that needs it.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished, there is no one-way step, and the box can be neither destroyed nor lost.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Putting the box down on the button from R (the lure) | The door opens, its antline lit, and the box bars the neck; interact from R picks it up again |
| 2 | Carrying the box onto the button and pressing interact | The box goes down on P, the tile faced, barring the way on; the door stays open only while the subject stands there. Picked up again from the button |
| 3 | At P with the box, interact facing the wall or the shut door | Refused, with the error sound |
| 4 | At P with the box, up | Steps back onto the button, the door opening, rather than turning |
| 5 | Stepping onto the button empty-handed and on to P | The door opens and shuts on the step off, as in chamber 1.3 |
| 6 | Putting the box down on R from the button, facing up | The box bars the room from the neck; picked up again from the button |
| 7 | Walking into the box | The subject turns to face it, silently |
| 8 | Shooting | A miss ripple on steel; along the door's row, with the door open, the shot leaves through the exit |
| 9 | At P, holding the turn key and up, or pressing it twice | The first press turns; a turn the subject already faces moves, so the second, or the held key's repeat after about half a second, steps back onto the button with the box (the door opens). Down and the turn again recover it in two presses. A rule of the game, not of the layout: watch for it in playtests |

## Variants tried

- A: the neck straight, the door below P and the exit in the bottom wall (5 × 7; the same 261 states, 183 without the turn key, and the same route). Not kept: the box put down behind in a straight one-tile run reads like chamber 3.2's corridor, which the sketch warned against.
- B: every wall plain (a copy): the portal run-up of restriction 2 skips the turn key.
- C: the box in the room's top left corner, the subject in its bottom right, facing left (10 presses, the same states). Not kept: two more steps before the lure, for nothing.
- Not built: idea 5 as written, a bare one-tile corridor: no room to try things (guideline 36), its far floor gives a run-up, and the sketch asks for 3.1 not to be a bare corridor.

## Checks

- `npm run solve -- --baseline --par`: 5 moves and 0 portals, both searches; 0 portal wall sides; key 12 bits.
- The copy with the box removed: unsolvable from `--baseline` and `--par`. The copy with every wall plain: 3 moves and 2 portals, and it completes with every turn refused.
- Every reachable state (261, one completed) explored through the rules' step: each can still be finished, and none breaks a fact above. With every turn action refused: 183 states, no completion. The fewest turn actions on any completing route: 1.
- `npm run chamber:check` passes.
- Played through in the real game (headless Chrome with a throwaway profile, the dev server on a port of its own, so nothing touched the author's browser or progress): the lure (the box on the button from R: the door opens, the neck sealed), picking it up again, the walk to P and the refused put-downs there, then the turn, the put-down and the walk out, completing the chamber with no console error.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 261 states, none unfinishable, none completing with every turn refused, and the copy without the box unsolvable from `--baseline` and `--par`. Its findings, judgment calls:
  - The main risk is whether a player finds the turn key at all: there is no hint (convention 7), and the controls legend that names it can be folded away, which is remembered between visits, so a player who folded it in run 1 reaches P with no pointer. The author's cold play can't test this, since the author already uses the key: watch for it in the friends' play (step 5.3 of `todo/campaign.md`). Accepted, as the run's detail did.
  - Every wall steel is load-bearing (restriction 2): it asked for the face below P to be named among the facts that must never be possible. Done.
  - A held or doubled turn steps back onto the button (wrong try 9). Accepted: a rule of the game.
  - The room's side tiles are on no route and stop nothing; it would keep them, since they make the room read as a room (restriction 6). Kept.
  - A box barring its tile already shows here, at the first press down into the box and in the lure, so chamber 3.2 shouldn't count it as new. Agreed: here it is offered, and only to a wrong try; in 3.2 every route meets it as the catch.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-23 | Picked the box up, stepped right and back left, then carried it down over the button to P, turned up in place, put it down and walked out (7 moves, 0 portals; the fewest are 5 and 0). The recorded run (restarts before it, if any, aren't in it) met none of the wrong tries: not the lure's put-down from R, nor the refusals at P; the author already used the turn key (chamber 2.4), so it tests the chamber's puzzle, not its teaching (guideline 105). Recorded as `chamber_6.solution.json` (Download solution); kept |
| 2 | Friends, cold | 2026-11-23 | Played it with chamber 3.2 and found it ok, by the author's account. Their routes, and how many friends played, weren't recorded, so whether each found the turn key without trouble, this chamber's main risk (Checks, the independent check), can't be shown (guideline 105) |
