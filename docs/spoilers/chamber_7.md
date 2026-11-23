# Chamber 7 (run 2, chamber 2.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: draft, designed 2026-11-23, waiting for the author's cold play. File: `src/chambers/chamber_7.json`, seventh in the play order; permanent id 7.

## Entry

Run 2, chamber 3, twist. Elements: a box, a button, a door, ditches. The player knows run 1, 2.1 and 2.2. It should teach that a box resting in front of a portal refuses every crossing onto its tile, so a box left there shuts that way; and that the portal just come out of moves like the other. Hint: none.

## Layout

7 × 6. The room (3 × 3, top left), where the subject starts and the box lies, with the door in its floor (2, 1) and the exit right under it (2, 0). A ditch column (x = 4) the room's full height splits it from the ledge (x = 5, three tiles tall), whose top tile is the button. The room's walls are plain; on the ledge's side only two faces are: **F**, the west face of (6, 4), right of the button, and **G**, the top face of (5, 1), under the ledge's bottom tile. Every other wall around the ledge and the ditch is steel. An antline runs from the button left along the top row to (3, 4), down to (3, 2), left to (2, 2) and down into the door, clear of the box's start (guideline 112).

```
y5  W W W W # # #
y4  W . . . ~ o F
y3  W . b . ~ . #
y2  W S . . ~ . #
y1  W W D W # G #
y0  W W E W W W W
    0 1 2 3 4 5 6
```

`W` plain wall, `#` steel, `F` and `G` plain walls (the ledge's two faces), `~` open ditch, `S` the subject's start (facing up), `b` the box, `o` the button, `D` the door (linked to the button, so it starts closed), `E` the exit (open).

The room sees F along its top row, over the ditch and the button, and steel along its other rows; it never sees G, which only a shot down the ledge's column hits. The ledge sees F (from the button, walking into it), G, and the room's west wall along each row.

## Idea

The button lies on the tile in front of the ledge's only face the room can hit, so the box put on it shuts the portal the subject came out of, and the subject leaves the ledge only by moving that portal down onto the ledge's other face.

## Purpose

Twist: it breaks the habit chambers 1.2 and 1.4 trained, sending on the portal left behind while the one come out of stays (guideline 27 names this wrong belief), and shows a box shutting a portal by resting in front of it. It also brings back carrying the box through portals just before 2.4 needs it (guideline 48).

Gem: one key step, moving the portal behind the box, with a short route around it.

## Intended route

1. Shoot one colour along the top row, over the ditch and the button, onto F; shoot the other on a wall of the room.
2. Pick up the box; walk into the room's portal; come out on the button, facing left, carrying the box. The door opens while the subject stands there.
3. Step down twice and back up once, to face the button from (5, 3); put the box down on it: the door opens and stays open, its antline lit.
4. Step down to (5, 2), which faces G; shoot the colour that is on F, the one come out of, onto G.
5. Walk down into G; come out in the room; walk down through the door and out through the exit.

Either colour can go on either face, and the room's portal on any wall of the room (guideline 31). A player who looks ahead can move the portal from F to G on a first trip without the box, then bring the box in through G (coming out facing up, one step from facing the button) and leave the same way; the portal come out of still moves. Solver: 11 moves and 3 portals at fewest portals, 9 moves and 4 portals at fewest moves; without the turn key the state walk's fewest presses (20) are this route.

## Lure and where the player should get stuck

With the box on the button, F is behind it: the subject can't stand in front of F to walk in, and the room sees nothing of the ledge but F. G is the ledge's one other face. The habit from chambers 1.2 and 1.4 says to send on the portal left behind, the colour still in the room: shot onto G, it pairs G with F, and walking into G is refused with the error sound, the box in plain view on the tile the subject would come out on. That is the lure (guideline 3): a move from real rules that the earlier chambers trained, failing at once and for a reason the game shows (guideline 4). The fix is the colour on F: it moves like the other.

Where the player should get stuck: on the ledge, the box placed, working out that the portal they came out of is the one to move.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditch column | Walking between the room and the ledge |
| 2 | (6, 2) and (6, 3) steel, so F is the ledge's only face the room sees | Landing on the ledge below the button, carrying the box in, putting it down and leaving by the same portal, which skips the twist: copies with either plain finish without the portal on F ever moving (110 completions in each walk) and have states that can't be finished (13,848 and 11,256) |
| 3 | G plain, in line only down the ledge's column | The way off the ledge once the box is on the button; a copy with G steel is unsolvable |
| 4 | (5, 5) steel | Nothing: a second face in front of the button, noise (guideline 56) |
| 5 | (4, 1) and (4, 5) steel | Nothing: faces only a ditch, unreachable; steel keeps F and G the only plain faces on the ledge's side, so each reads as meant (guideline 16) |
| 6 | The door right in front of the exit | The shot through the open door (guideline 40, a cheat here): its line runs out through the exit. The button is off the door's lines anyway |
| 7 | The ledge three tiles tall | Nothing: the run-up (5, 2) to (5, 3) that faces the button without the turn key (guideline 66) |
| 8 | The room's walls plain | Nothing: the room sees the ledge only along its top row, so its own portal goes anywhere |

## Facts that must never be possible

- Finishing without moving the portal off F. Checked: the state walk that refuses every shot moving a portal off F reaches no completion (33,108 states).
- Reaching the exit without the box on the button. Checked: copies with the box removed, and with the button's link and its antline removed, are unsolvable from `--baseline` and `--par`.
- Crossing from the room onto the ledge anywhere but the button, unless G already holds a portal. Checked: the walk; every such crossing lands on (5, 4), or on (5, 2) with a portal on G.
- The box in the doorway, destroyed or sent home; the subject in the shut doorway; the door out of step with its button. Checked: every reachable state; the box rests only on the room's 9 tiles and the ledge's 3.
- A state from which the chamber can't be finished, with or without the turn key. Checked: all 54,318 reachable states (41,299 without the turn key) can still be finished.

## Guidelines broken on purpose

- Guideline 67 (a box left in front of the only way into a part seals it off): the box on the button seals the ledge from the room on purpose. Nothing on the ledge is needed once the box is there, and while it is on the way there, the walk finds no state that can't be finished.
- Guideline 9 (don't make a refused action look possible): walking into a portal whose partner has a box in front of it is refused; it is the entry's lesson, met with the error sound and the box in plain view.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished, and the ledge always sees the room's west wall, so a portal back is always one shot away.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | With the box on the button, moving the room's colour onto G and walking in | The error sound; the subject stays. The box lies on the tile it would come out on: the lure |
| 2 | Shooting along the room's middle or bottom row | A miss ripple on steel below F |
| 3 | Coming out on the button with the box and pressing interact | Refused, with the error sound: the subject faces the ditch |
| 4 | Stepping down once and pressing interact | The box goes down at (5, 2), in front of G; picking it up again and coming back up from (5, 2) faces the button |
| 5 | Stepping down once, then up | The subject walks back onto the button, still carrying the box; the run-up is from two tiles below |
| 6 | Shooting while carrying the box | Refused, with the error sound, as in chamber 1.4 |
| 7 | Standing on the button, shooting left | A portal on the room's west wall; the door, open now, is on no line from the button |
| 8 | Walking into a ditch | The subject stops facing it, silently |

## Variants tried

- A: (4, 1) and (4, 5) plain (the same states and pars). Not chosen: F and G read less clearly as the ledge's two faces.
- Copies with (6, 2) or (6, 3) plain: the twist skipped and dead ends (restriction 2).
- Not built: the button one tile past the landing, so the subject comes out facing it and puts the box down at once. Cut: the box would never rest in front of a portal, the twist itself.

## Checks

- `npm run solve -- --baseline --par --max-states=40000000`: 9 moves and 4 portals at fewest moves, 11 moves and 3 portals at fewest portals, both searches; 10 portal wall sides; key 22 bits.
- Copies with the box removed, with the button's link and its antline removed, and with G steel: all unsolvable from `--baseline` and `--par`.
- Every reachable state (54,318, and 41,299 without the turn key) explored through the rules' step: each can still be finished, and none breaks a fact above. In the walk without the turn key, 46 steps are a move refused while the box rests on the button, the lure's refusal among them.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass (the walk: 100,000 steps, 6 completions).
- Played through in the real game (the user's Chrome, the dev server on a port of its own, so the author's stored progress is untouched): the lure (the room's colour moved onto G, the crossing refused with the box in view), its recovery (the other colour sent back to the room's west wall) and the way out, completing the chamber with no console error.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no dead end, no route past the box and no `Must` breached: its own walk found 54,318 states (41,299 without the turn key), none unfinishable, and its copies with the box removed, G steel or F steel are unsolvable from `--baseline` and `--par`. Without the turn key it counts 11 moves and 6 portals at fewest moves, 13 moves and 3 portals at fewest portals. Its findings, both judgment calls, accepted with no change:
  - The box in front of a portal is met only on the lure: the look-ahead route (the ledge visited empty-handed first, the portal come out of moved to G, the box brought in through G, landing on the button's run-up) never rests the box in front of an open portal, 2 moves over par; so does a route at par that parks the box at (5, 2) and shoots G over it. A refusal can't be forced (guideline 108); what every route forces is moving the portal off F, its way round. Closing the look-ahead route would take G away as a way onto the ledge, which the twist needs as the way off.
  - "The portal just come out of moves" holds as "the portal on F moves", the one the subject first came out of onto the ledge; a route at par moves the room's colour onto G first, comes back out of G, and only then moves F's.
  - Also noted: coming out on the button with the box, interact faces the ditch and is refused (wrong try 3); after the lure, a shot of the other colour at G misses, since G holds a portal; the steel at (4, 1), (4, 5), (6, 1) and (6, 5) is never hit, only drawn.

## Playtests

None yet.
