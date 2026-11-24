# Chamber 26 (run 11, chamber 11.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, turned a half turn on its fresh reviewer's finding, with the author's approval, so its frame isn't chamber 22's; checked and independently reviewed; waiting for the author's cold play. File: `src/chambers/chamber_26.json`, twenty-sixth in the play order; permanent id 26. Run 11's combine and last chamber (`docs/campaign.md`, "Run 11 in detail").

## Entry

Run 11, chamber 2, combine. Elements: an emitter, a receiver, a mirror box, a button, a door and the exit, with antlines; every wall steel but two plain walls. The player knows runs 1 to 10, and 11.1. It should teach that a closed door stops a ray, and that a mirror box resting on a button holds it down and turns a ray at once. Hint: none (convention 7).

## Layout

7 × 6. The emitter **e** (6, 3), in the right wall, fires left along row 3, through the button **B** (4, 3), into the mirror box (2, 3), which slants `\` and turns the ray up into the door **D** (2, 4), closed, which stops it. D, linked to B, stands in a one-tile nook between steel under the receiver **r** (2, 5), which listens down column 2 and links the exit **E** (1, 0), in the bottom wall. Above B, a second one-tile nook (4, 4) between steel. The start (5, 1) faces left. Two plain walls: X (4, 5), at the top of column 4, above B, and Y (2, 0), at the foot of column 2, the far end of the receiver's line.

```
y5  ■ ■ r ■ X ■ ■
y4  ■ ■ D ■ . ■ ■
y3  ■ . \ . o . e
y2  ■ . . . . . ■
y1  ■ . . . . S ■
y0  ■ E Y ■ ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `X` and `Y` plain walls, `S` the subject's start (5, 1), facing left, `o` B (4, 3), linked to `D` (2, 4), `\` the mirror box (2, 3), its mirror from top left to bottom right, `e` the emitter (6, 3), firing left, `r` the receiver (2, 5), listening down, linked to `E` (1, 0), closed while the receiver is dark.

Two antlines:

- B to D: (4, 3), (4, 2), (3, 2), (3, 4), (2, 4): down off the button, left one tile, up across the ray at right angles onto the steel beside the door and left into it, so it leaves the button away from the ray and passes visibly under it (its fresh reviewer, guideline 112).
- The receiver to the exit: (2, 5), (0, 5), (0, 0), (1, 0): along the top wall, down the left wall and right into the exit, over steel only.

No ray crosses the exit or its approach (1, 1) (guideline 92). B is two tiles from D (guideline 59).

## Idea

The box turns the ray at the one corner that leads to the receiver, but the door between them is shut, and the button that opens it lies in the ray, so the subject can't hold it without cutting the light; the box on the button holds it and turns the ray up column 4 into X, and a pair from X to Y carries the turned light up column 2 through the open door into the receiver.

From the idea pool, where it was sketched first with the run (`docs/campaign.md`, "Run 11 in detail"), redrawn before approval on both proposal reviewers' findings (Variants tried); the sketch's coordinates are those of the chamber before its half turn:

> - **Run 11, chamber 2: the button in the light** (combine; an emitter, a receiver, a mirror box, a button, a door, the exit; sketched first). 7 × 6, every wall steel but `W`.
>
>   Forced: the box resting on B, turning the ray into a pair from (2, 0) to (4, 5): with the box made plain, with (2, 0) steel, with (4, 5) steel or with the box kept off B, unsolvable. Shown on every play, from the first frame: a closed door stops a ray (carried from run 10), and a mirror box slanting `\`, where 11.1's slants `/`. Lure: the box already does its job at the corner, so the first try leaves it there and stands on B, which opens D but cuts the light at B (guideline 19: a box doing its job reads as done); 11.1's habit, the box at the corner, is the start. Gem, light: one realisation, the box's second job, then two shots.
>
>   Risks: six kinds of element (guideline 18, bent: each has a job); the pair is chamber 10.2's rule, a portal at the far end of the receiver's line; B's antline runs over (3, 2), in the ray's row; every route crosses the lit column 4 to reach the exit, which closes and opens again (harmless, 10.1's lesson). Feasibility: 7,198 states, none dead, none with the subject standing in something blocked, none with a box under it; key 19 bits.

It is the idea pool's idea 30, "Two jobs at the bend", with the box starting at the corner and the button's link on a door the ray must pass, so the habit, the box on the button, doesn't solve it unseen.

## Purpose

Combine: run 11's mirror box with run 1's button and door, and run 10's receiver and its rule for a pair, a portal at the far end of the receiver's line (chamber 10.2). Its new consequence is one box with two jobs, holding a button and turning a ray at once, the outline's goal for run 11. It also shows, from the first frame, what run 10 carried here: a closed door stops a ray. And its box slants the other way from 11.1's, so the run shows both mirrors.

Gem, light: one realisation, the box's second job, then two shots; a flow for a player whose habit carries the box onto the button first (Lure).

## Intended route

1. Left to (4, 1), up to B (4, 3): D opens, but the subject, standing in the ray at B, cuts it before it reaches the box; the receiver stays dark.
2. Shoot X (4, 5) up column 4.
3. Left to (3, 3), off B, so D shuts again; interact: the box is lifted from the corner, and the ray, cut by the subject, reaches nothing.
4. Turn right and interact: the box goes down on B. D opens, and the box turns the ray up column 4 into the portal on X. The key move.
5. Left along row 3 to (2, 3) and down column 2 to (2, 1); shoot Y (2, 0): the light comes out of Y up column 2, into the subject.
6. Left to (1, 1), out of the light: it runs up column 2 through D into the receiver, which lights; its antline lights and the exit opens.
7. Down into the exit.

This takes 9 moves and 2 portals, the fewest (`--baseline`); 20 presses. Either shot can come first, and either colour on either wall. B need never be stood on: with the subject kept off it, still solvable, in 21 presses.

## Lure and where the player should get stuck

The box already does its job: from the first frame it turns the ray at the one corner that leads to the receiver, so it reads as done (guideline 19), and only the door stops the light. B's antline leads to that door, so the first try leaves the box where it is and stands on B: D opens, but the subject, in the ray at B, cuts the light before it reaches the box. Chamber 11.1's habit, the box at the corner on the receiver's line, is the start state. Where the player should get stuck is that B needs something on it that doesn't cut the light, and the only box is the one turning it; the way out is that a mirror box doesn't cut the light, it turns it, so on B it does both jobs, and the light, turned up column 4, needs a pair to reach the receiver's line.

A player who carries the box onto B by habit, the campaign's oldest move, never meets the lure: the ray then points straight at X, the one plain wall it meets, and the only other plain wall, Y, lies on the receiver's line, chamber 10.2's rule, so the box's second job can arrive as something that happens rather than a step worked out (guideline 113; its fresh reviewer). Lifting the box off the corner, where it visibly works, is what the lure asks the player to see past; whether players do it before standing on B is for the cold play to show.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | B on the emitter's row, before the corner | The subject holding B: standing there it cuts the ray. Checked: no reachable state has the receiver lit with the box off B |
| 2 | D between the corner and the receiver, linked to B | The box at its start alone lighting the receiver. Checked: with no door, solved in 6 presses without moving the box; with D never opening, unsolvable |
| 3 | The box starting at the corner, doing its job | The habit, the box carried onto B first, solving it before any lure is met (the redrawn first draft, Variants tried) |
| 4 | Only X and Y plain, at the top of column 4 above B and at the far end of the receiver's line | Any other bend: the box on B turns the ray only into X, and only Y sends it into the receiver. Checked: with X steel, or Y steel, unsolvable |
| 5 | The emitter's row ending at steel (0, 3) | Chamber 10.2's pair from the emitter's end to the receiver's far end, a face no route would use with the box on B (guideline 16) |
| 6 | D in a one-tile nook between steel | A door that reads as a gate in front of the receiver, and no way past it but the light's |
| 7 | The emitter in the right wall firing left, the exit in the bottom wall | Chamber 22's frame, its emitter at (0, 2) firing right along row 2 past the key tile at (2, 2), with a one-tile nook beside it (guideline 113): the chamber as first built had it, and was turned a half turn |

## Facts that must never be possible

- The receiver lit with the box off B: checked, none among the 7,198 reachable states.
- D open with B up: checked, none.
- Finishing without the box on B: checked, unsolvable with the box kept off it.
- The subject standing in something blocked: checked, none among the 7,198 reachable states.
- A dead state: checked, all 7,198 can be finished.
- The box under the subject: nothing sends a box home here.

## Guidelines broken on purpose

None. Guideline 18 is bent: six kinds of element, each with a job, the emitter and its receiver one between them (`docs/campaign.md`, "Run 11 in detail").

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Standing on B with the box at the corner | D opens and B's antline lights, but the ray ends on the subject at B; the receiver stays dark |
| 2 | Lifting the box from the corner | The ray runs on along row 3 into the left wall |
| 3 | Putting the box down elsewhere on row 3, at (1, 3), (3, 3) or (5, 3) | It turns the ray up into the steel above |
| 4 | Putting the box on B before any portal | D opens; the ray turns up column 4 and ends on X, a plain wall: the clue |
| 5 | A pair on X and Y with the box at its start | Nothing changes: the ray passes B going left, turns at the corner into D and never meets X |
| 6 | Standing in a lit ray: on row 3, in column 4's nook, in column 2 or in the open door | The receiver goes dark and the exit shuts until the subject steps out; D, held by B, stays open |
| 7 | Putting the box on B from the nook above it | The box walls the subject into the nook until it lifts the box again, or walks out through a portal on X once both are open (its fresh reviewer) |
| 8 | Walking into a portal | The subject crosses between X and Y; either way back is open |

## Variants tried

- As first built, the chamber turned a half turn from this one: the emitter at (0, 2) firing right along row 2, B (2, 2), the box at (4, 2), D (4, 1) over the receiver (4, 0), the exit (5, 5) in the top wall, X (2, 0) and Y (4, 5), the start (1, 4) facing right; B's antline ran along row 2 under the ray. Its fresh reviewer found its lower left chamber 22's frame (the emitter at (0, 2) firing right along row 2, the key tile (2, 2) in the ray, a one-tile nook below it, the exit in the top wall) and its button's line hidden under the ray at the start; the author chose the half turn, the same puzzle with the same figures, 2026-11-24, and the line was rerouted.
- The first sketch, the chamber as first built turned top to bottom with a `/` box: the box started beside the start, facing it; plain faces above B, at the foot of the receiver's line and at the end of the emitter's row, the last as a lure (chamber 10.2's pair, which the closed door stopped); an open niche by the start. 7 moves and 2 portals, 16 presses; 15,082 states, none dead. Redrawn before approval: the box on B was 5 presses from the start, so habit found the answer before any lure, and no state had the receiver lit with B up, so the door stopping the ray was met only on wrong tries (both proposal reviewers, guidelines 3 and 108). Its blind reviewer moved the box onto the corner and made the emitter row's end, a face no route then used (guideline 16), and the niche steel; it was then turned top to bottom with the other slant, so the run shows both mirrors and its frame no longer echoed the cut test's (the idea pool, "Sketched for a run").
- Without the door, the exit linked to both B and the receiver: five kinds of element, a lure that lights the receiver with B up. Dropped on the author's pick, 2026-11-24, to keep the door, so a closed door stopping a ray shows on every play (the idea pool, "Sketched for a run").

## Checks

- `npm run solve -- --baseline`: 9 moves and 2 portals, both searches; two portal wall sides; key 19 bits. The macro search refuses it, as it does every chamber with a receiver.
- Every reachable state (7,198) explored through the rules' step with the game's presses (each move key a turn, or a move when the subject already faces that way): none dead, none with the subject standing in something blocked, none with a box under the subject.
- Copies: with the box made plain, unsolvable; with X steel, unsolvable; with Y steel, unsolvable; with D never opening, unsolvable; with no door, 6 presses, the box never moved; with the box kept off B, unsolvable; with the subject kept off B, 6,030 states, none dead, 21 presses.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run random:walk`, `npm run lint` and `npm run build` pass. `npm run replay:check` and `npm run solver:check` fail only on the solution not yet recorded.
- Played in `npm run dev` with the Chrome tool, muted, 2026-11-24, at about 44 px tiles, as first built and again turned: the box's `\` reads clearly, the turned ray ending on the closed door shows from the first frame, and the two plain walls stand out from the steel; standing on B opened D and lit B's antline while the ray ended on the subject; the route above completed it, the light coming out of Y through the open door into the receiver. Turned, B's rerouted line visibly leaves the button downward, crosses under the ray and enters D. No console error in the first play.
- An independent check (a fresh agent with only the files of chambers 25 and 26 as first built and their plan entries, not these notes) found no shortcut, no dead end and nothing that looks broken; with the box never resting on B, every state is dead, and both portals are forced by the layout. Its findings:
  - B's antline ran along row 2 under the ray at the start, so it seemed to rise out of the ray at (3, 2) rather than leave the button. Answered: rerouted to leave the button away from the ray and cross it at right angles; checked in the game.
  - Habit, the box carried onto B, can solve it, the ray then pointing at the one plain wall it meets, and a route that never stands on B exists, so the catch is met only on a wrong try (guideline 108): a flow for such a player, a gem only if the lure is met. No cheap fix was found: a start above B facing down puts the lure one press away but faces the nook's plain wall, a free first portal. Answered: named under Lure as a risk for the author's cold play.
  - Its lower left was chamber 22's frame. Answered: turned a half turn, on the author's choice.
  - Nothing after 11.1 checks aiming, since here the button picks the mirror's tile (guideline 24). Answered: the test that would have, of which way a mirror turns a ray from each side, was cut on purpose (the idea pool, "Sketched for a run"), and the flip goes to the finale.
  - Putting the box on B from the nook above walls the subject in until it lifts the box again; not dead, and unlikely. Answered: added to the wrong tries.

## Playtests

None yet.
