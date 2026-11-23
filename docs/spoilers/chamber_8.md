# Chamber 8 (run 4, chamber 4.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-23, their cold run its recorded solution. File: `src/chambers/chamber_8.json`, eighth in the play order; permanent id 8. Designed together with chambers 4.2 (id 9) and 4.3 (id 10), all three before the author played any (the author's call, 2026-11-23, as for runs 2 and 3).

## Entry

Run 4, chamber 1, teach. Elements: a switch, a door, a ditch; walls, steel and the exit are known from run 1. The player knows runs 1 to 3 (chambers 1 to 7). It should teach that the interact key uses the switch the subject stands on, and what its antline leads to opens for good, the line staying lit, so the subject can leave the switch behind. Hint: none (convention 7): the controls legend says Interact "Use switches, pick up and drop boxes".

## Layout

7 × 6, an L. The room, 5 × 2, along the top: the switch in its bottom left corner, the subject's start right beside it, facing it. Under the room's right three columns, a ditch across, and past it a two-tile ledge, the door at its end and the exit right behind the door, in the chamber's right wall. Every wall is steel but two: the ledge's floor wall under its left tile, and the room's left wall in the top row. An antline runs from the switch up a tile, right along the room's top row, down across the ditch onto the ledge and right into the door.

```
y5  ■ ■ ■ ■ ■ ■ ■
y4  W . . . . . ■
y3  ■ s S . . . ■
y2  ■ ■ ■ ~ ~ ~ ■
y1  ■ ■ ■ . . D E
y0  ■ ■ ■ W ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `W` a plain wall (a face that takes portals): **F** (3, 0), its top face under the ledge's landing (3, 1), and **R** (0, 4), its right face beside (1, 4); `~` an open ditch, `s` the switch (1, 3), linked to the door, `S` the subject's start (2, 3), facing left at the switch, `D` the door (5, 1) (linked, so it starts closed), `E` the exit (6, 1) (open).

The antline: (1, 3), (1, 4), (4, 4), (4, 1), (5, 1). The ditch tile (4, 2) hides one tile of it; it shows again on the ledge, where it turns into the door.

## Idea

The door to the exit stands across a ditch from its switch, so it has to open for good: the subject uses the switch with interact, leaves it, and crosses the ditch by portal to the door.

From the idea pool, where it was sketched as a plant of chamber 4.3 (guideline 51):

> - **Run 4, chamber 1: the switch beyond the ditch** (teach; a plant of chamber 4.3's sketch). The door before the exit is linked to a switch on an island past a ditch, with one face that takes portals on each side; no box. The subject crosses to the island by portal (run 1's move), uses the switch, and crosses back through the door, which stays open, its antline lit. Leaving the switch is forced in any layout, since the subject can't stand on it and pass its door; the ditch is there only to keep portals in use before 4.3 (guideline 48). The prototype below has chamber 1.1's shape, and so has the combine's: a plain face on each side wall in one row, the barrier between, the switch beyond. Its route, a pair across the barrier, the switch, then back through the same pair, is the combine's answer in small (guideline 47), so build 4.1 in another shape, or with the switch in plain reach and no portals. _Check:_ guideline 78 (the island sees only the face it was entered by and its own, so no shot from it strands the subject); 31 (the switch and its antline in view from the start); the switch's look, the button's yellow twin, read by stepping on it and nothing happening. Feasibility, 2026-11-23: a prototype (7 × 5): 10 moves and 2 portals; all 218 reachable states can be finished.

Built, the sketch's warning decided its shape. Its prototype's route, a pair across the barrier, the switch beyond, then back through the same pair, is chamber 4.3's answer in small (guideline 47), so the switch moved to the subject's side and the door, with the exit, across the ditch: every route uses the switch and then crosses away from it, and none needs to cross back after it. The portal crossing stays, so portals are in use just before 4.3 (guideline 48), and the room is an L with a column shot down to the ledge's face, so it looks neither like chamber 1.1's room split down the middle nor like 4.3's near room and back room. Its first draft (variant B) had the ledge above the room, its face in the ceiling and the room's face in the right wall; the independent check found its crossing almost tile for tile chamber 1.2's last one, so the room was turned upside down, the ledge below, and the room's face moved to its left wall.

## Purpose

Teaching: the switch, a new element. Its two plants for chamber 4.3 (its sketch, in `chamber_10.md`): a switch used with interact stays on, its door open and its line lit for good; and a portal crossing kept in use, since 3.1, 3.2 and 4.2 have none.

Flow: no hard step. The one new thing is pressing interact on the switch, which the controls legend names.

## Intended route

1. Step left onto the switch: nothing happens.
2. Interact: the switch is used; the door opens across the ditch and the antline lights, both for good.
3. Step up to (1, 4); walk left into the wall to face it and shoot one colour onto R.
4. Walk right to (3, 4), or (3, 3); walk down into the ditch to face it and shoot the other colour down column 3, over the ditch and the ledge, onto F.
5. Walk back to (1, 4) and left into R; come out of F onto the ledge at (3, 1), facing up.
6. Walk right to (4, 1), through the open door and out through the exit.

Either colour can go on either face, and either face first, even before the switch is used (guideline 31); the ditch can be crossed before the switch is used too, but then the door is shut and the subject walks back into the portal it came out of. Solver: 8 moves and 2 portals, both the fewest; the state walk's fewest presses (13) shoot F first, from the start's row, then use the switch, shoot R and cross. No route needs the turn key (the same 13 presses without it).

## Lure and where the player should get stuck

A teach chamber has no lure (guideline 24). The switch is drawn as the button's yellow twin, so the first try is chamber 1.3's: step onto it and expect the door to open. Nothing happens, and the door stays shut across the ditch, its line unlit. Where the player may stall: on the switch, expecting a button, until they press interact, which the controls legend names. A player who crosses first finds the door shut and comes back through the portal they came out of: the ledge sees no face but F, so no shot there can strand them.

What the chamber shows, on every route: stepping off the used switch, the door stays open and its line lit, where chamber 1.3's door shut on the step off its button, and the subject then goes as far from the switch as a ditch and a portal crossing take it.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The door, linked to the switch, right in front of the exit | Walking out without the switch: the copy with the switch removed (the door left shut) is unsolvable from `--baseline` and `--par`, and the state walk refusing every use of the switch reaches no completion |
| 2 | The ditch between the room and the ledge | Walking to the door, so the switch is left far behind: the walk refusing every crossing (560 states) reaches no completion; with every wall steel, the copy is unsolvable |
| 3 | Every wall steel but F and R | More faces than one pair: guideline 75 (one pair in a teach chamber). With two faces, a shot either re-places a portal or misses, so the ledge can't strand the subject (guideline 78). R in the room's left wall, not in the start's line, and the ledge below the room, so the crossing doesn't repeat chamber 1.2's last one |
| 4 | The switch on the room's side, the door and the exit on the ledge's | The combine's answer in small (guideline 47): no route crosses back after using the switch |
| 5 | The ledge two tiles long, F under its left tile | Nothing: the subject comes out facing up and walks along the ledge into the door, which it sees open from there |
| 6 | The start beside the switch, facing it | Nothing: the first thing to use in view and one press away (guideline 31); held, the key stops on the switch, against the wall |

Guideline 40, the shot through the open door: the door opens for good, so a shot through it decides nothing; along its row, a shot leaves through the open exit, and down its column, from the room, it passes the open doorway and misses on steel.

## Facts that must never be possible

- Reaching the exit without using the switch. Checked: the copy with the switch removed is unsolvable from `--baseline` and `--par`; the walk refusing every use of the switch reaches no completion.
- Reaching the ledge without a portal crossing. Checked: the walk refusing every crossing reaches no completion.
- A third face that takes portals. Checked: the solver counts 2 portal wall sides.
- The subject in the shut doorway, or the door out of step with its switch. Checked: every reachable state; the door never shuts once open.
- A state from which the chamber can't be finished. Checked: all 602 reachable states can be finished, with or without the turn key.

## Guidelines broken on purpose

None. Guideline 112: the ditch hides one tile of the antline; the line then shows again on the ledge and turns into the door, so it doesn't seem to end at the ditch, as variant B's did (its last tile hidden right below the door).

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Interact at the start, facing the switch | Nothing, silently: interact acts on the switch the subject stands on, not the tile faced, as run 3's boxes trained. Stepping on is the obvious next try |
| 2 | Stepping onto the switch and waiting | Nothing: the door stays shut and the line unlit |
| 3 | Crossing to the ledge before using the switch | The door is shut in front of the subject; walking back into F brings it out of R, back in the room |
| 4 | Shooting from the ledge | Each shot misses on steel or re-places the portal already on F |
| 5 | Interact anywhere but on the switch | Nothing |
| 6 | Walking into the ditch | The subject turns to face it, silently |
| 7 | Pressing interact on the switch again | Its sound again, nothing more: the door is already open |

## Variants tried

- The sketch's prototype (7 × 5, the switch on an island past the ditch, the door on the start's side; 10 moves and 2 portals, all 218 states finishable): not built, its route the combine's in small (Idea).
- A: the ditch straight across the room's full width, the ledge the whole top row, the door under the exit in the top wall (7 × 6; 618 states, none dead, 9 moves and 2 portals). Not kept: a room split straight across reads as chamber 1.1 turned on its side.
- B: the L with the room below and the ledge above, F in the ledge's ceiling and R in the room's right wall, the switch's line ending under the ditch right below the door (602 states, none dead, 9 moves and 2 portals). Not kept, after the independent check: its crossing, a ceiling face over a two-tile ledge past a ditch row, a face in the right wall of the room below, the exit at the ledge's right end, was chamber 1.2's last crossing almost tile for tile; and its line seemed to end at the ditch.
- C, kept: B turned upside down, R moved to the room's left wall, the line brought back onto the ledge.

## Checks

- `npm run solve -- --baseline --par`: 8 moves and 2 portals, both searches; 2 portal wall sides; key 13 bits.
- The copies with every wall steel and with the switch removed: unsolvable from `--baseline` and `--par`.
- Every reachable state (602, two completed, one per colour on F) explored through the rules' step: each can still be finished, and none breaks a fact above. With every turn action refused: 398 states, completed in 13 presses.
- `npm run chamber:check` passes.
- Played through in the real game, B and then C (headless Chrome with a throwaway profile, the dev server on a port of its own, so nothing touched the author's browser or progress): the switch, the door opening and its line lighting amber, both staying so as the subject left, the crossing and the walk out, completing the chamber with no console error. In C the line shows again on the ledge past the ditch and turns into the door.
- An independent check (a fresh agent with only the file and the plan's entry, no notes), on variant B: no shortcut, no dead end, no bug-like refusal and no `Must` breached; its own walk found 602 states (398 without the turn key), none unfinishable, 9 moves and 2 portals, and the copies without the switch and without faces unsolvable from `--baseline`. Every route uses the switch and leaves it; the line staying lit is shown, not forced, which is fine for a teach; the combine isn't rehearsed, since nothing ever shuts the subject in. Its judgment calls:
  - The line seemed to end at the ditch, which a ditch a link switches (run 5) could later make misleading: it proposed bringing the line back onto the ledge before the door. Done in C.
  - The crossing repeated chamber 1.2's last one almost tile for tile, though the forced switch keeps it from being a copy under guideline 113. Answered by C's layout. C changes no rule-relevant topology but where R is (the same 602 states, none dead; my walk and the copies were run again, guideline 100), so it had no second independent check.
  - Interact at the start, facing the switch, does nothing and silently: wrong try 1. Kept: it fails within a press and stepping on is the obvious next try.
  - Not checked by it: how the switch's sprite reads beside a button's; seen in my browser check only.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-23 | Played after chamber 3.2. Stepped right and shot F from (3, 3), down across the ditch, then up to (3, 4) and left to (2, 4) and shot R; then down and left onto the switch, used it, and stepped up and left into R, out on the ledge and through the open door (10 moves, 2 portals; the fewest are 8 and 2). Both portals were placed before the switch was used, which the chamber allows (guideline 31); the recorded run (restarts before it, if any, aren't in it) met none of the wrong tries. Recorded as `chamber_8.solution.json` (Download solution); kept: "i like those" |
