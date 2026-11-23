# Chamber 6 (run 2, chamber 2.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: draft, designed 2026-11-23, waiting for the author's cold play. File: `src/chambers/chamber_6.json`, sixth in the play order; permanent id 6.

## Entry

Run 2, chamber 2, twist. Elements: a box, a button, a door, a ditch. The player knows run 1 and 2.1. It should teach that an open door lets shots through even where the subject can't follow, so a door held open is a window; and that a door, open or shut, and the walls facing it never hold a portal. Hint: none.

## Layout

6 × 6. The room (4 × 2) along the bottom, the subject starting at its left end in front of the button, the box right above the start, in the room's top left corner. The door (4, 3) is in the room's ceiling at its right end, with a ditch tile (4, 2) right in front of it inside the room, so no one walks into the doorway. Past the door, the landing (4, 4), a single tile, with the exit (5, 4) beside it in the right wall. An antline runs from the button up to (2, 2), right to the ditch and up into the door. Every wall is plain.

```
y5  W W W W W W
y4  W W W W . E
y3  W W W W D W
y2  W b . . ~ W
y1  W S o . . W
y0  W W W W W W
    0 1 2 3 4 5
```

`W` plain wall, `~` open ditch, `S` the subject's start (facing right), `o` the button, `b` the box, `D` the door (linked to the button, so it starts closed), `E` the exit (open).

The faces named below: **w**, the bottom face of (4, 5), the ceiling over the landing, the only face past the door the room can hit, in line only up column 4, through the doorway.

## Idea

The door to the exit stands behind a ditch, so the subject can never walk through it: held open by the box on the button, it is a window, and the subject shoots through it from below the ditch onto the ceiling over the landing, then crosses.

## Purpose

Twist: a door is a way through for shots even where it is no way through for the subject, which breaks run 1's reading of a door as only the last step before the exit. It plants 2.4's key move without rehearsing it (guideline 47): a shot through an open door from a distance, the door held by the box, the button off the doorway's line, so the subject never holds the door itself to shoot (guideline 40 decided as a cheat).

Gem, an easy one: one key step, the shot up through the open door, with a short route around it.

## Intended route

1. Walk up into the box above the start and pick it up.
2. Step right onto the button (the door opens), on to (3, 1) (it shuts) and to (4, 1), then back left to (3, 1), facing the button; put the box down on it: the door opens and its antline lights.
3. Step right to (4, 1), facing the room's right wall; shoot one colour onto it, (5, 1). Any wall of the room will do.
4. Walk up into the ditch to face up; shoot the other colour up through the open door onto w.
5. Walk right into the first portal; come out on the landing (4, 4), facing down; step right out through the exit.

Either colour can go on either face, and the room's portal anywhere in the room (guideline 31). Solver: 5 moves and 2 portals at fewest portals, 3 moves and 3 portals at fewest moves, both using the turn key (the fewest-moves route turns at the start to put the box straight onto the button, then crosses the room by portal); without it, 7 moves and 2 portals, and the state walk's fewest presses (13) are this route.

## Lure and where the player should get stuck

Run 1's habit: box on the button, walk through the door. The ditch in front of the door is in view from the start, so the habit fails at a glance; the first likely try is a shot at the shut door, up column 4, which leaves a miss ripple on the door. Once the box holds the door open, the line up column 4 runs over the ditch, through the doorway and past the landing to w.

Where the player should get stuck: seeing what a door the subject can't reach is for, and that its open doorway lets a shot through to the one tile past it.

The entry's second half, the walls facing a door: only partly met. A shot at the shut door misses on it, which every likely first try up column 4 shows ("a door, shut, never holds a portal"). The walls beside the door, (3, 3) and (5, 3), face it only along the wall's line, which a shot meets only from inside the doorway, and the subject reaches the doorway only from the landing, with nothing to do there. So that half is not shown in this layout; a later chamber that relies on a wall facing a door must show the miss first (guideline 75). Variant D below would have shown it, at the cost of the window.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditch (4, 2) in front of the door | Walking through the door: with it floor, the box opens the door and the subject walks out with no portal |
| 2 | The far side a single landing tile, beside the exit | A box carried through the window's portal and left past the door, where nothing brings it back once that portal moves: variant A, two tiles past the door, has 6,160 states that can't be finished (2,322 without the turn key). On the landing a carried box can go down nowhere (the door, two walls and the exit), so it stays in hand (guideline 111, added from this draft and 2.4's) |
| 3 | The button off column 4 | The shot through the door from the button (guideline 40, a cheat here): the button sees only the room's walls |
| 4 | The box's start in the top left corner | Nothing: off the antline, which a box hides where it rests (variant C, the first draft, whose line seemed to run from the button into the box), and off the shooting tile (4, 1) (variant B) |
| 5 | The start right in front of the button, facing it | Nothing: the first press stops on the button, where a held key waits for its repeat delay while the door opens in full (guideline 26), as in chamber 1.3 |
| 6 | The room two rows tall | Nothing: a way round the box on the button |
| 7 | Every wall plain | Nothing: the room sees past its walls only through the door, so no face elsewhere skips it; the subject's own portal goes anywhere |

## Facts that must never be possible

- Reaching the landing without the box on the button. Checked: copies with the box removed, with the button's link and its antline removed, and with (4, 5) steel are unsolvable from `--baseline` and `--par`.
- The box past the door, in the doorway, destroyed or sent home. Checked: the state walk; the box rests only on the room's 7 tiles, and no step reports `boxDestroyed`, `carriedBoxDestroyed` or `boxSentBack`.
- The subject in the shut doorway, or the door out of step with its button. Checked: every reachable state.
- A state from which the chamber can't be finished, with or without the turn key. Checked: all 37,242 reachable states (27,307 without the turn key) can still be finished.

## Guidelines broken on purpose

None. Guideline 40 is decided as a cheat, and the button is off the door's line.

## Near misses and wrong tries

None is a dead end: every reachable state can still be finished, and there is nothing one-way.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting up column 4 at the shut door | A miss ripple on the door |
| 2 | Walking into the ditch in front of the door | The subject stops facing it, silently |
| 3 | Carrying the box onto the button and pressing interact | The box goes down on the tile faced, beside the button, or the put-down is refused facing a wall; the door shuts on the step off, as in chamber 1.3. Coming back at the button from (4, 1) faces it |
| 4 | Pressing interact facing the ditch with the box | Refused, with the error sound, as in chamber 1.4 |
| 5 | Shooting while carrying the box | Refused, with the error sound, as in chamber 1.4 |
| 6 | Carrying the box through to the landing | It can't go down there; the subject walks out with it or takes it back through the same pair |
| 7 | Standing on the button, shooting | The shot hits a wall of the room |

## Variants tried

- A: the far side two tiles wide, the door at (3, 3), the exit at (5, 4). Cut: the box can be carried past the door by the window's portal and stranded there, 6,160 dead states (restriction 2).
- C: the box starting at (3, 2), the first draft, which the independent check saw (same states and portals). Changed after seeing it in the game: the antline runs under the box and then under the ditch, so its visible part ran from the button into the box, as if the two were linked (guideline 112, added from it).
- B: the box starting on the shooting tile (4, 1) (same states, no dead end). Not chosen: the box sitting under the window draws the eye up its column, and lying in front of the room's right wall it makes the start's first shot, along the bottom row, open a portal with a box in front of it, 2.3's lesson met early by chance.
- D: the ditch behind the door instead of in front of it (not built): the subject walks into the doorway and shoots from inside it, which would show a wall facing the door missing (a shot sideways from the doorway), but it never shoots through a door from a distance, the fragment 2.4 needs.

## Checks

- `npm run solve -- --baseline --par --max-states=40000000`: 3 moves and 3 portals at fewest moves, 5 moves and 2 portals at fewest portals, both searches; 13 portal wall sides; key 20 bits.
- Copies with the box removed, with the button's link and its antline removed, and with (4, 5) steel: all unsolvable from `--baseline` and `--par`.
- Every reachable state (37,242, and 27,307 without the turn key) explored through the rules' step: each can still be finished, and none breaks a fact above.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass (the walk: 100,000 steps, 17 completions).
- Played through in the real game (the user's Chrome, the dev server on a port of its own, so the author's stored progress is untouched): the intended route, with the box on (1, 2), completes the chamber with no console error. The first draft (variant C) showed the antline running into the box.
- An independent check (a fresh agent with only the file and the plan's entry, no notes), on variant C and again on this layout, found no shortcut, no dead end and no `Must` breached: its own walk found 37,242 states (27,307 without the turn key), none unfinishable, and its copies with the button's link removed, the box removed or the door made a wall are unsolvable from `--baseline` and `--par`. Its findings:
  - The entry's half about the walls facing a door is neither forced nor shown (see the lure section): the plan should move it to a chamber where such a wall is a natural target. Not changed here; for the author to decide.
  - The antline, on variant C, ran into the box: fixed by moving the box. Its last stretch still lies under the ditch in front of the door, so it ends at the ditch's rim, right under the door; seen in the game, it reads as leading to the door. A path over the wall tops would reach the door from above, but it points at the landing, so it wasn't taken.
  - The key shot is also the most natural try at (4, 1), once pressing up has turned the subject towards the ditch: expect it to play as a quick flow more than a gem.
  - With the box right above the start, it is picked up beside the button, where turning in place is the obvious way to put it down; the route without the turn key is the walk round to (4, 1) and back. Every box start in this room needs that turn or that walk (a put-down always faces away from where the box was picked up), as in 2.3's ledge.
  - (2, 2) is on no fewest route: kept for the antline's turn and as a way round the box on the button.
  - Accepted as they are: a put-down facing the ditch is refused (wrong try 4); a portal facing the box's start refuses a crossing while it rests there, 2.3's lesson met early by a player who tries it, though nothing invites it; and the landing takes no box (guideline 79 on its letter), never a stuck state, since the exit is beside it and the portal leads back.

## Playtests

None yet.
