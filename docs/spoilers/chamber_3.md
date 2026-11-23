# Chamber 3 (run 1, chamber 1.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-23, their cold run its recorded solution. File: `src/chambers/chamber_3.json`, third in the play order; permanent id 3.

## Entry

Run 1, chamber 3, teach. Elements: a box, a button, a door, an antline; walls, steel and the exit are known from chambers 1.1 and 1.2. The player knows chambers 1 and 2. It should teach that a button opens the door its antline leads to while something stands on it, and that a box carried there holds it for the subject. Hint, if hints are built: Button, box.

## Layout

8 × 5. One 5 × 3 room; the button is in the room's middle and the subject starts right in front of it, on the middle row, facing it, with one column of the room behind it. The door is at the right end of the middle row, in the room's right wall, and the exit is right behind the door, in the chamber's right wall. The box starts in the room's bottom right corner, beside the tile in front of the door. An antline runs from the button along the middle row into the door. Every wall is steel.

```
y4  ■ ■ ■ ■ ■ ■ ■ ■
y3  ■ . . . . . ■ ■
y2  ■ . S o . . D E
y1  ■ . . . . b ■ ■
y0  ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7
```

`■` steel, `S` the subject's start (facing right), `o` the button, `b` the box, `D` the door (linked to the button, so it starts closed), `E` the exit (open).

## Idea

The door to the exit opens only while something stands on its button, and the button is too far from the door for the subject to hold it and pass, so the subject puts the box down on the button and walks through.

## Purpose

Teaching: the button, the door it opens, the antline between them and the box, each met for the first time, as one mechanism. It plants the box on a button that chamber 1.4 builds on, with no portal in the room, so 1.4's catch (crossing with a box, and no shots while carrying one) is met fresh there (guideline 47).

Gem, a gentle one: one key step, the box onto the button, which is guideline 2's smallest catch (a button that opens a door the subject can't reach while standing on it), with a short route around it.

## Intended route

1. Step right onto the button: the door opens and its antline lights. Walk on right: the door shuts as the subject steps off, the antline going dark. Stop in front of the shut door, at (5, 2).
2. Face down, walking into the box; pick it up.
3. Step left to (4, 2): the subject now faces the button.
4. Put the box down on the button: the door opens and the antline lights, and both stay so.
5. Walk right three times, through the doorway and out through the exit.

The box can go down on the button from either side along the middle row, from the right as above or from the left, after walking round by the top or bottom row (guideline 31). Neither needs the turn key, which run 3 teaches (guideline 29). Solver: 7 moves and 0 portals, both the fewest; its route is this one.

## Lure and where the player should get stuck

The subject starts on the door's row, facing right, with the button right in front of it and the door beyond, so the first press towards the exit lands on the button: the door opens under the player's eyes, and stays open while the subject stands there. A player holding the key waits there for the keyboard's repeat delay, about half a second, longer than the door's 0.3 s opening, so the door is seen open in full either way (guideline 26). The next step shuts it, two tiles before the subject gets there. That is the lure (guideline 3), and it fails at once and for a reason the game shows (guideline 4 gives this very case: a door shutting on the step off its button). The walk ends in front of the shut door with the box right beside it, below.

Where the player should get stuck: in front of the shut door, working out that the button holds it open only while something stands on it, that the subject can't stand there and walk through, and that the box beside them can. A player who takes the top or bottom row misses the button, finds the door shut and follows the antline back to it; a player who goes for the box first meets the same idea from the other end.

The second likely stumble: carrying the box onto the button and pressing interact there. A player who picks the box up from the bottom row, walking along it into the box, will likely do this, since the way back to the button from there leads onto it. The box goes down on the tile in front, not underfoot, and stepping off shuts the door. The answer, coming at the button from a tile away, works from both sides along the middle row, and never needs the turn key (wrong tries 4 and 5).

This is the first chamber where interact does anything: picking the box up and putting it down are met here, with only the controls legend's line ("pick up and drop boxes") to go on, which is why the entry's hint, if hints are built, names the box as well as the button.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The door, linked to the button, across the only way to the exit | Walking to the exit: the idea itself |
| 2 | The button three tiles from the door, not beside it | Stepping off the button into the doorway, where the door would shut under the subject, who could then walk on out without the box (guideline 59). A copy with the button beside the door completes that way |
| 3 | Every wall steel | Nothing: with every wall plain, the box is still needed and portals save nothing (still 7 moves, 0 portals), since no portal can open past the door. Steel keeps portals out of a lesson about the box (guideline 56), and keeps 1.4's catch unrehearsed (guideline 47) |
| 4 | The room three rows tall | Nothing: a way round the box on the button for a player who puts it down from the start's side, where a one-tile corridor would seal them in (variant D); it also keeps the room symmetric about the door's row, so the box is the one odd tile (guideline 19) |
| 5 | The button in the room's middle, the subject starting right in front of it, with a column behind the start | Nothing: the first press stops on the button, where a held key's repeat delay keeps it while the door opens in full (guideline 26); and the button has a run-up along the middle row from each side, the column behind the start giving the left one, so the box goes down on it without the turn key (guideline 66) |
| 6 | The box's start beside the tile in front of the door | Nothing: it lies where the lure leaves the player, shown rather than hidden, as a teach chamber wants (guideline 12), and the one step from there towards the button faces it |

Guideline 40, the shot through the open door: a cheat here, and the layout leaves it nothing to hit. From the button, the line through the open doorway runs on out through the open exit, and the walls beside a door or the exit take no portal, so no face past the door can hold one, whatever the walls are made of.

## Facts that must never be possible

- Reaching the exit without the box resting on the button. Checked: copies with the box removed, with the button's link and its antline removed, and with the button and its antline removed are all unsolvable from `--par` and `--baseline`; the walk of every reachable state found no completion without the box on the button.
- The same by portal, had the walls been plain. Checked: a copy with every wall plain and the box removed is unsolvable from `--par` and `--baseline`.
- The subject in the doorway while the door is shut, or the door shutting on it (guideline 59). Checked: the state walk.
- The box in the doorway or past it, and so the box destroyed or sent home, which keeps guideline 65's case from arising. Checked: the state walk; the box rests only on the room's 15 tiles, and no step reports `boxDestroyed`, `carriedBoxDestroyed` or `boxSentBack`.
- The door open with nothing on the button, or shut with something on it. Checked: every reachable state.
- A portal anywhere. Checked: the solver counts 0 portal wall sides.
- A state from which the chamber can't be finished. Checked: all 905 reachable states, explored through the rules' step, can still be finished.

## Guidelines broken on purpose

None.

Guideline 26 (stop where it matters) holds through the start: the first press stops on the button, and a held key waits there for its repeat delay before walking on. The first draft started a tile further back, where a held key crossed the button within one key repeat, the door open for about 33 ms (variant G). A player whose keyboard repeats much sooner than usual could still see the door only half open; watch for it.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished, there is no one-way step, and the box can be neither destroyed nor lost.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Walking right from the start, onto the button and on to the door | The door opens, the antline lit, while the subject stands on the button, and shuts, the antline dark, on the next step: the lure |
| 2 | Standing on the button, looking for a way past the door | Every way off the button shuts the door |
| 3 | Carrying the box onto the button | The door opens, held by the subject, and shuts as it steps off with the box still in its hands |
| 4 | Pressing interact on the button with the box | The box goes down on the tile faced, beside the button; the door stays open only while the subject stays, and shuts as it steps off. Interact again picks the box back up; the way on is to come at the button along the middle row from a tile away |
| 5 | Picking the box up from the bottom row, then heading back to the button | Up and left lead onto the button with the box: wrong tries 3 and 4. It always recovers without the turn key: at fewest, 6 presses from the pick-up with the box kept in hand (up, left onto the button, two steps left, one back right, put down), or 8 if interact on the button drops it first (drop, pick up again, then the same four), as the real-game play under Checks did; both counted through the rules' step |
| 6 | Putting the box down facing the shut door or a wall | Refused, with the error sound |
| 7 | Putting the box down in front of the door | It bars the door's one approach, but the door is shut anyway; picked up again from beside it |
| 8 | Walking into the box | The subject turns to face it, silently; interact then picks it up |
| 9 | Shooting | A miss ripple on steel. From the button, with the door open, the shot leaves through the open exit, with a ripple just inside it. While carrying the box, the error sound and no shot: 1.4's catch, which nothing here invites |
| 10 | Picking the box up off the button once the door is open | The door shuts and the antline goes dark; putting it back opens it again |

## Variants tried

- A: G's room (below) with a one-tile corridor between the door and the exit (9 × 5, 9 moves). Cut: the corridor serves no step (convention 6), and drawn by the game, the door right in front of the exit reads just as plainly as what holds the exit shut.
- B: the box beside the start, at (1, 1) (9 × 5 with A's corridor, 7 moves). Cut: a player who takes the box first can put it on the button without ever standing there and seeing the door shut on the step off, and its fewest route puts the box down with the turn key.
- C: a 4 × 3 room, the start right beside the button (8 × 5 with A's corridor, 8 moves). Cut: the button has no run-up from the start's side, so a player carrying the box back that way needs the turn key or a walk round. Its start right before the button came back in G.
- D: a one-tile corridor, the box in a nook below it (9 × 4, 9 moves). Cut: a box put down on the button from the start's side seals the corridor (idea 5, "Solved but trapped", a box twist for run 3), and a corridor leaves no room to try things (guideline 36).
- F: chamber 1's frame, its ditch replaced by a wall with the door in it and the exit in the far room's floor (9 × 5, 7 moves). Cut: the far room adds walking and nothing else, and its fewest route puts the box down with the turn key.
- G: this layout with the subject starting a tile further back, at (1, 2), at the room's end (8 moves); the first draft, which the independent check saw. Changed: a player holding Right crossed the button within one key repeat, so the door stood open for about 33 ms, its sounds the only sure sign (guideline 26). Moving the button off the start's line was weighed and refused: in this room every button that touches no wall is on the door's row, a button against a wall lets a player who walks onto it with the box face the wall and have the put-down refused (guideline 9), and a button off the way to the door lets the player go for the box first and never see the door shut.
- Not built: the exit itself linked to the button, with no door (the entry names a door); and a plain wall past the door, making the shot through the open door the lesson, which is idea 3 ("Hold the door with a shot"), a later twist that would skip the box here.

## Checks

- `npm run solve -- --baseline --par`: 7 moves, 0 portals, both searches; 0 portal wall sides; key 14 bits.
- Copies with the box removed, with the button's link and its antline removed, with the button and its antline removed, and with every wall plain and the box removed: all unsolvable from `--baseline` and `--par`. The copy with every wall plain and the box kept: 7 moves and 0 portals, both searches.
- Every reachable state (905, one completed) explored through the rules' step: each can still be finished, and none breaks a fact above. The same walk on a copy with the button beside the door reports the subject standing in the shut door and a completion without the box, so the check can fail.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass.
- Played through in the real game (headless Chrome, a throwaway profile, the dev server on a port of its own), all on this layout and each completing the chamber with no console error:
  - Right held from the start, as the keyboard sends it (one press, half a second, then a repeat every 33 ms): the door stands fully open with the subject on the button, then is shut by the time the subject reaches it. Then the rest of the intended route.
  - Wrong tries 1, 3, 4 and 9, then the box put on the button from the start's side and a walk round to the door.
  - Wrong try 5 and its recovery (8 presses from the pick-up), then a walk round to the door.
- An independent check (a fresh agent with only the file and the plan's entry, no notes), on variant G, found no `Must` breached, no route that skips the box and no dead end: 905 states, none needing the turn key, and its copies with the walls plain and the box removed are unsolvable from `--baseline` and `--par`. It flagged that a held key crossed the button within one key repeat (guideline 26), which moved the start one tile closer to the button (variant G); that a player who picks the box up from the bottom row will likely step onto the button with it (wrong try 5); and that this is the first chamber where interact matters while the entry's hint names only the button (the lure section).

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-23 | The intended route with no wasted press: right onto the button and on to the shut door (the lure, which every route from the start takes), down into the box, pick it up, left, the box onto the button from the right, then right three times out through the exit (7 moves, 0 portals, both the fewest). No wrong try in the recorded run. Recorded as `chamber_3.solution.json`; kept |
