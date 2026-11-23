# Chamber 11 (run 5, chamber 5.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-23, checked and independently reviewed, waiting for the author's cold play. File: `src/chambers/chamber_11.json`, eleventh in the play order; permanent id 11. Designed together with chambers 5.2 (id 12) and 5.3 (id 13), all three before the author plays any (the author's call, 2026-11-23, as for runs 2 to 4). It has no recorded solution yet, so `npm run replay:check` and `npm run solver:check`, and with them `npm run verify` and `npm run deploy`, fail on it until the author's play is recorded.

## Entry

Run 5, chamber 1, teach. Elements: steel a button opens, a box, a button, a laser, and an antline; walls, steel and the exit are known from run 1. The player knows runs 1 to 4. It should teach that steel a button links takes portals while the button is held, its antline leading to it, and a box can hold it for the subject; that a laser stops the subject but not a shot; and that a shot passes a resting box. Hint: none (convention 7).

## Layout

7 × 6. A laser run splits the room wall to wall: below it the subject's side, 5 × 2; above it one row, with the exit at its right end, in the chamber's right wall. The subject starts in the middle of the lower row, facing up at the button **B** one step ahead; straight above, past the laser and the far row, **K**, a one-tile blocked wall in the top wall, linked to B. The box rests in the subject's side's bottom left corner. Every wall is steel but K and **N**, a plain face in the bottom wall right under the start.

```
y5  ■ ■ ■ K ■ ■ ■
y4  ■ . . . . . E
y3  ■ L L L L L ■
y2  ■ . . B . . ■
y1  ■ x . S . . ■
y0  ■ ■ ■ N ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `S` the subject's start (3, 1), facing up, `B` the button (3, 2), linked to K, `x` the box (1, 1), `L` the laser run (1, 3) to (5, 3), horizontal, on (no link reaches it), `K` the blocked wall (3, 5), linked, so it starts refusing portals, `N` a plain wall (3, 0), `E` the exit (6, 4) (open).

One antline, B to K: (3, 2), (3, 5), straight up under the laser and across the far row into K from below.

## Idea

The box on B holds K's steel open, so a portal shot onto K over the box, with one on N, carries the subject past the laser, which it can't walk across.

From the idea pool, where it was sketched as a plant of chamber 5.3 (guideline 51):

> - **Run 5, chamber 1: steel that opens** (teach; a plant of chamber 5.3's sketch, from idea 19 below). A laser run splits the room wall to wall, the exit beyond it; the only face beyond that the subject's side sees is **K**, a one-tile blocked wall linked to button **B** on the subject's side, an antline from B straight to it; the box lies on the subject's side, which has one face that takes portals, **N**. The subject starts one step from B, facing it and K beyond. The route: the box on B, K's steel slides back, a portal on K, shot over the box on B, and one on N, cross, out. First contact forced, safe and unambiguous (guideline 24): nothing past the laser is reached without a portal on K, which takes one only while B is held, and the subject can't hold B and cross, since no plain face stands beside B (guideline 60). Its fresh reviewer found that every route shoots over the box on B, which no earlier route had to (chamber 1.4's recorded solution does it by choice), so the entry names a shot passing a resting box; moving B off K's column would drop it, and the lure with it. The lure: chamber 1.3's step onto the button, and 2.4's shot from it: the subject on B opens K, a shot puts a portal on it, and the step off shuts the steel, the portal gone with it, three presses from the start, nothing lost (guideline 28); not forced (guideline 108), which 5.2 is there for. The laser's first contact: it plays an open ditch's part (it stops the subject and lets the shot through), which run 1 taught; still a second new element in a teach, a bend of guideline 24 named in the outline, and its glow draws the eye from the still steel (guideline 20), which the antline from B to K offsets. It runs wall to wall, so no shot reaches the walls behind its end plates. _Check:_ guideline 60; 31 (B and K in view from the start, the antline between); 17 (as 5.3); 113 (the route is box on a button, a shot over a barrier and a crossing, the shape of chamber 1.3 and 1.1, and of cut 2.2, which the author found "same as chamber 4": what differs is that the shot's target is the steel the button changes, in view as it opens; the author's play will tell); 47 (K must stay the only far face, with the exit beyond, so no shot from the far side is ever needed). Feasibility, 2026-11-23: a prototype (7 × 6: the subject's side 5 × 2 below a laser row, one row above it with the exit in its right wall, every wall steel but K, in the top wall, and N, straight below the start): 6 moves and 2 portals, both the fewest; all 1,546 reachable states can be finished, none of 1,017 dead without the turn key; copies without the box, or with K unlinked steel, are unsolvable from `--baseline` and `--par`; the lure (up, a shot, down) closes the portal on K in three presses. A fresh reviewer, given only the file and the entry, found the same counts, no dead end and no shortcut.

Built as its prototype, tile for tile: the counts below are the sketch's. The box's start was tried in five other places (Variants tried) and kept in the corner.

## Purpose

Teaching: steel a button opens, a new element, and the laser, new but asking no new rule (an open ditch's part, run 1), and a shot over a resting box, which no earlier route had to make. Its plants: for 5.2 and 5.3, steel a button holds open takes portals, and its likeliest wrong try, the lure below, shows the portal on it closing as it shuts; for 5.3, the room itself, which 5.2 and 5.3 keep.

Gem, a small one: one step, the box onto B so the steel stays open without the subject, then a plain crossing.

## Intended route

1. Step left to (2, 1); interact: pick up the box from the corner.
2. Step right to (3, 1); turn up in place; interact: the box goes down on B, which lights its line, and K's steel slides back.
3. Shoot blue up, over the box and the laser, onto K.
4. Press down (the wall below only turns the subject); shoot orange onto N.
5. Press down: walk into N and come out of K onto (3, 4), facing down.
6. Walk right three tiles and out through the exit.

Solver: 6 moves and 2 portals, both the fewest; the state walk's fewest presses (12) are this route, the portals in either order. Without the turn key, 16 presses: the box goes down on B from beside it after a run-up.

## Lure and where the player should get stuck

The subject starts facing B: stepping on it (chamber 1.3's step onto the button) slides K's steel back and lights B's line; a shot puts a portal on K (chamber 2.4's shot from the button); the step off shuts the steel, and the portal goes with it. Three presses from the start, plain at once, nothing lost (guideline 28): the shot can be made again. Not forced (guideline 108): a player who brings the box first never meets it, so 5.2 forces the closing. Where the player should get stuck: hardly at all; seeing that the box, not the subject, has to hold K, and then shooting over it.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | K linked to B, steel until B is held | Crossing without the button: the copy with K unlinked steel is unsolvable from `--baseline` and `--par` |
| 2 | One box, and no plain face beside B | Holding B and crossing: the subject on B can shoot both K and N, but walks into N only from (3, 1), off B (guideline 60); the copy without the box is unsolvable |
| 3 | The laser run wall to wall | Walking to the exit; its end plates face steel, so no shot is lost to them |
| 4 | Every wall steel but K and N | Faces the idea doesn't need (guidelines 56 and 75): N is the subject's side's only face, K the only one past the laser |
| 5 | B in K's column, the start right below B | Every route shooting over the box on B: the walk refusing every portal-opening shot over it reaches no completion. B off the column would drop that lesson, and the lure with it |

## Facts that must never be possible

- Crossing the laser without the box on B. Checked: the copy without the box is unsolvable, and the subject can't hold B while it walks into N.
- Finishing without a shot passing the box on B. Checked: the walk refusing it reaches no completion.
- The box past the laser. Checked by argument: K takes a portal only while the box rests on B, so the box is never carried across.
- The subject in the laser, or the box under the subject. Checked: no reachable state has either.
- A dead state. Checked: all 1,546 reachable states can be finished, and none of 1,017 without the turn key.

## Guidelines broken on purpose

- 24, bent: a second new element in a teach. The laser asks for no rule the player hasn't met, only a new look; its glow draws the eye from the still steel (guideline 20), which B's line offsets. Named in the outline.
- 17, bent: the laser does nothing here that an open ditch wouldn't. It is met in run 5 so runs 6 and 7 can use it as a barrier before run 8's light barrier and run 9's slides set it apart. Named in the outline.
- 113, a risk the author chose to take: the route has the shape of chambers 1.3 and 1.1 (a box on a button, a shot over a barrier, a crossing), and cut 2.2 was found "same as chamber 4". What differs is that the shot's target is the steel the button changes, in view as it opens. Kept as a teach of its own, to be judged on the author's cold play.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Standing on B, shooting K, stepping off | K's steel slides shut and the portal on it goes; shot again later |
| 2 | Standing on B, shooting K and N, then stepping down and walking into N | K's portal goes on the step off B; with one portal open, walking into N only turns the subject |
| 3 | The box put down on (3, 1), in front of N | Nothing crosses onto N's tile while it rests there; picked up again from beside it |
| 4 | The box put down anywhere but B | K stays steel and B's line dark |
| 5 | Shooting the steel, or K while B is up | A miss ripple |
| 6 | Walking into the laser | The subject stops, facing it |
| 7 | Shooting while carrying the box | Refused, with the error sound |

## Variants tried

- The box's start at (1, 2), (2, 1), (4, 1), (5, 1) and (5, 2): the same 1,546 states, none dead; 8, 4, 4, 6 and 8 moves. At (2, 1) or (4, 1) the box lies beside the start, handed over; at (1, 2) or (5, 2) the walk is longer for nothing. The corner, the sketch's place, is kept.

## Checks

- `npm run solve -- --baseline --par`: 6 moves and 2 portals, both searches; 2 portal wall sides; key 18 bits.
- Copies without the box, or with K unlinked steel: unsolvable from `--baseline` and `--par`.
- Every reachable state (1,546, two completed) explored through the rules' step: none dead, none breaking a fact above. With every turn action refused: 1,017 states, none dead.
- The walk refusing every portal-opening shot over the box on B: no completion.
- The lure: up, blue, down closes K's portal in three presses.
- `npm run chamber:check` passes.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 1,546 states, 1,017 without the turn key, none dead; 6 moves and 2 portals; copies without the box, with K unlinked steel or with N steel are unsolvable, and without the laser it is a 6-move walk with no portal; every route shoots past the box on B and past the laser, and no chamber from 1 to 10 forces a shot past a resting box. Its judgment calls:
  - The lure shows a portal closing by itself, a likely false loss (guideline 28), before 5.2 shows it as no loss. Accepted: it is the natural first try, fails within three presses, shows "while the button is held", and a shot puts the portal back.
  - 5.3's lesson can be met here: the box on B, both portals placed, then the box lifted, and K shuts on its portal. Accepted: nothing past the laser needs the box, so few will lift it, and meeting it here only plants 5.3's lure (guideline 47 warns against rehearsing the answer, the shot from past the laser, which no route here makes).
  - "A laser stops the subject" is only a refusal (guideline 108). Accepted, as the outline does: every route works round it.
  - It may read as 1.3 plus 1.1 (guideline 113); moderate risk, for the author's play.
  - B's line runs under the laser, whose beam may hide that tile's middle dot: checked in the game below.
- Played through in the real game (`npm run dev` in Chrome, the tab muted): the lure (up, a shot, down) opens K, puts a portal on it and closes it on the step off, B's line lighting and going dark; then the route without the turn key (the box onto B from beside it, a shot over it onto K, one onto N, the crossing, the walk out), completing the chamber with no console error. B's line reads as one straight line from B to K: the beam hides only the dot under it, the dots either side show. The turn key wasn't tried in the game, since the browser tool sends Shift only as a modifier, not as the held key the game reads.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
