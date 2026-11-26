# Chamber 27 (run 12, chamber 12.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-26 from its sketch, as drawn; checked and independently reviewed; kept by the author after their cold play, 2026-11-26; their cold run its recorded solution. File: `src/chambers/chamber_27.json`, twenty-seventh in the play order; permanent id 27. Run 12's first chamber, its twist (`docs/campaign.md`, "Run 12 in detail").

## Entry

Run 12, chamber 1, twist. Elements: an emitter, a receiver, a mirror box and the exit, with an antline; every wall steel but four plain walls. The player knows runs 1 to 11. It should teach that standing in a ray shuts what it holds open, even right in front of it, so the light that opens the exit must reach its receiver by a way that misses the tile in front of the exit; and that which way a mirror box turns a ray depends on the side the ray comes from. Hint: none (convention 7).

## Layout

6 × 6. The emitter **e** (2, 5), in the top wall, fires down column 2 into the plain wall (2, 0). The receiver **r** (4, 0), in the bottom wall, listens up column 4 and links the exit **E** (5, 2), in the right wall, so the tile in front of the exit, **T** (4, 2), lies on the receiver's line; **M** (4, 1) is the tile below it, in front of the receiver. Four plain walls: (2, 0), the end of the emitter's line; (4, 5), the far end of the receiver's line; (0, 1) and (5, 1), the two ends of row 1, M's row, (5, 1) just below the exit. The mirror box (1, 4), in the top left corner, slants `\`. The start (3, 4) faces left, across the ray, at the box.

```
y5  ■ ■ e ■ W ■
y4  ■ \ . S . ■
y3  ■ . . . . ■
y2  ■ . . . T E
y1  W . . . M W
y0  ■ ■ W ■ r ■
    0 1 2 3 4 5
```

`■` steel, `W` a plain wall, `S` the subject's start (3, 4), facing left, `\` the mirror box (1, 4), its mirror from top left to bottom right, `e` the emitter (2, 5), firing down, `r` the receiver (4, 0), listening up, linked to `E` (5, 2), closed while the receiver is dark; `T` (4, 2) the one tile the exit is entered from, `M` (4, 1) the tile between T and the receiver.

One antline: the receiver to the exit, (4, 0), (3, 0), (3, 2), (5, 2): left along the bottom wall, up column 3 and right along row 2 through T into the exit. It crosses each ray a route makes at right angles (column 4 at T, row 1 at (3, 1)), runs over no face that takes portals and under no box start (guideline 112).

## Idea

Every ray into the receiver comes down column 4, so only one turned into it at M, below the doorstep, lets the subject stand on T with the exit open: the box on M, with the light brought along row 1 from the left by a pair from (2, 0) to (0, 1), which `\` turns down into the receiver.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 12 in detail"):

> - **Run 12, chamber 1: the light across the doorstep** (twist; an emitter, a receiver, a mirror box, the exit). 6 × 6, every wall steel but four plain walls:
>
>   ```
>   y5  # # e # W #
>   y4  # \ . S . #
>   y3  # . . . . #
>   y2  # . . . . E
>   y1  W . . . . W
>   y0  # # W # r #
>       0 1 2 3 4 5
>   ```
>
>   `e` (2, 5) fires down column 2 into the plain (2, 0); `r` (4, 0) listens up column 4 and links the exit `E` (5, 2), in the right wall, so the tile in front of the exit, T (4, 2), lies on the receiver's line. Plain walls: (4, 5), the far end of the receiver's line; (2, 0), the end of the emitter's; (0, 1) and (5, 1), the two ends of row 1, (5, 1) just below the exit. The box `\` starts at (1, 4); the subject at (3, 4), facing left. Antline: (4, 0), (3, 0), (3, 2), (5, 2), along the bottom wall, up column 3 and along row 2 through T into the exit, crossing each ray at right angles and no face that takes portals (guideline 112). Idea: every ray into the receiver comes down column 4, so only one turned into it at M (4, 1), below T, misses the doorstep: the box at M, with the light brought along row 1 from the left through a pair from (2, 0) to (0, 1), which `\` turns down into the receiver. Lure: chamber 10.2's habit, a portal where the ray hits, (2, 0), and one at the far end of the receiver's line, (4, 5): the light runs down column 4, the receiver lights and the exit opens, and stepping onto T, the only tile the exit is entered from, cuts the light, so the exit shuts in front of the subject. The likely second try, the natural next press once the box is put on M from (3, 1): the other portal on (5, 1), beside the exit: the light enters M from the right, and `\` turns it up column 4, back through T. Forced: the box on M; portals on (0, 1) and (2, 0); the box's mirror (each copy unsolvable). No route needs (5, 1) or (4, 5): they are the flip's wrong try and the lure. Shown: which way a mirror box turns a ray depends on the side it comes from, met on the likely wrong try and decided on every route. 21,506 states, none dead, none with the subject standing in something blocked, none with a box under it; fewest 7 moves and 3 portals, or 8 moves and 2; 19 presses; the receiver lit with the subject on T in 8 states, each with the box on M and the pair on (2, 0) and (0, 1); the lure reached in 10 presses; key 20 bits. Gem: one realisation, the light must miss the doorstep, then one choice, which side of the box. Breaks guideline 92's last `Must` on purpose in the lure state, which can always be undone.
>
>   Risks: its frame against chamber 23 (10.2's U-turn, an exit in a side wall with a plain wall beside it) and chamber 25's opening turned top to bottom (an emitter in a horizontal wall firing along column 2, the start one row in, right of the ray, facing left at the box; its handbook reviewer); the lure is 10.2's move, and the answer's pieces are 11.1's turn and a pair; the right side, (0, 1), is one shot away, so some players will learn the flip by trial (guideline 8). Its blind reviewer rated its catch light, leaning solid, and found no shortcut, dead end or refusal that looks broken.

It is run 10's dropped twist (guideline 41's old example, a door that shuts as the subject steps into the ray holding it open), which had no way round with one emitter and no mirror box (guideline 120); here the mirror box gives the way round.

## Purpose

A twist (guideline 41): no new element, a new consequence of known ones. Run 10 taught that the subject cuts a ray by standing in it, and chamber 10.1 that the exit shuts while it does; here the only tile the exit is entered from lies on the receiver's line, so the light that opens the exit, brought the way chamber 10.2 taught, shuts it in the subject's face. The way round is to bring the light into the receiver's line below the doorstep, which only the mirror box can do, and only from the side its slant allows: the side a mirror box turns from, carried from run 11, is met on the likely wrong try and decided on every route. A memorable moment: the exit shutting one step from the subject.

Gem: one realisation, the light must miss the doorstep, then one choice, which side of the box.

## Intended route

1. Left to (2, 4), into the ray; turn down and shoot (2, 0), where the ray ends.
2. Turn left and lift the box from (1, 4); carry it down column 2 to (2, 1) and right to (3, 1).
3. Interact: the box goes down on M, facing the light's way in from the left. The key move.
4. Turn left and shoot (0, 1): the light comes out of (0, 1) along row 1, into the subject at (3, 1).
5. Up to (3, 2), out of row 1: the light reaches M, `\` turns it down into the receiver, which lights; its antline lights and the exit opens.
6. Right onto T, out of every ray, and into the exit.

This takes 8 moves and 2 portals, 19 presses, the fewest presses (a walk of every reachable state); the fewest moves is 7, with 3 portals, and the fewest portals 2, with 8 moves (`--baseline`). Either shot can come first, and either colour on either wall; the box can go down on M only from (3, 1) or from T, its two floor neighbours.

## Lure and where the player should get stuck

From the first frame the ray runs down column 2 onto a plain wall, and the other lone plain wall in the top row, (4, 5), stands at the far end of the receiver's line: chamber 10.2's rule, a portal where the ray ends and one at the far end of the receiver's line. The pair works: the light runs down column 4 into the receiver, the antline lights and the exit opens, the progress a lure should show (guideline 22). Then the step onto T, the only tile the exit is entered from, cuts the light, and the exit shuts in the subject's face, for a reason the game shows at once (guideline 4); stepping back off opens it again. Where the player should get stuck is that every way the light can reach the receiver seems to cross T, since the receiver listens up the very column T stands in.

The way out is a light that enters column 4 below T, at M, turned there by the mirror box. The likely second try, once the box is down on M from (3, 1) and the subject turns to the nearest plain wall, (5, 1), beside the exit, puts the other portal there: the light enters M from the right, and `\` turns it up, back through T into the plain (4, 5), so the receiver stays dark. That shows the side matters; the light from the left, through (0, 1), turns down into the receiver. Some players will find the side by trial, since (0, 1) is one shot away (guideline 8): the realisation the chamber rests on is the first, that the light must miss the doorstep.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The exit in the right wall, T on the receiver's line | The lure succeeding: every ray into the receiver comes down column 4, and only one turned at M misses T. Checked: the receiver is lit with the subject on T in 8 of 21,506 states, each with the box on M and the pair on (2, 0) and (0, 1) |
| 2 | M walled on the right by (5, 1), on the left open along row 1 to (0, 1) | Any bend into column 4 but M's: with the box kept off M, unsolvable |
| 3 | The box's `\` | The light from the right, through (5, 1), turning into the receiver: it turns up through T. Checked: with a `/` box the chamber solves through (5, 1) instead, so the slant alone decides the side |
| 4 | (2, 0) and (0, 1) the only pair that brings the light along row 1 from the left | Any other way in: with either made steel, unsolvable; with the box made plain, or with no box, unsolvable |
| 5 | (4, 5) plain, at the far end of the receiver's line | Kept to set up the lure (guideline 56), chamber 10.2's pair. No route needs it: with (4, 5) and (5, 1) both steel, still solvable in 8 moves and 2 portals |
| 6 | (5, 1) plain, beside the exit | Kept for the likely second try, which shows the side a mirror box turns from (guideline 56), and so that (0, 1) isn't the lone plain face in the side walls, which would give the side away (guideline 16; its fresh reviewer). No route needs it (restriction 5's check) |
| 7 | The box starting in the top left corner, off every ray | The turn shown before the player looks for it: the first frame shows only the ray running straight onto (2, 0), chamber 10.2's cue, which leads into the lure |
| 8 | Every other wall steel | Other pairs, and the trial and error they would allow (guideline 8) |

## Facts that must never be possible

- Finishing without the box on M: checked, unsolvable with the box kept off it.
- Finishing without portals on (2, 0) and (0, 1): checked, unsolvable with either steel.
- The receiver lit with the subject on T, but with the box on M and the pair on (2, 0) and (0, 1): checked, none (the 8 such states all have them).
- The subject standing in something blocked: checked, none among the 21,506 reachable states.
- A dead state: checked, all 21,506 can be finished.
- The box under the subject: nothing sends a box home here.

## Guidelines broken on purpose

Guideline 92's last `Must`, "nor let a ray cross every tile from which the subject can enter something its receiver holds open", in the lure state: the pair on (2, 0) and (4, 5) runs the light across T, the only tile the exit is entered from. It is the twist itself, and the state can always be undone: stepping off T lights the receiver again, and moving either portal changes the light's way (no reachable state is dead). Guideline 92's other cases hold: the exit, a closed exit stopping a ray, is never on a ray the receiver needs, and no portal the light goes through can close.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | The lure: a pair on (2, 0) and (4, 5) | The light runs down column 4 into the receiver, the antline lights and the exit opens; the step onto T cuts the light, and the exit shuts in front of the subject; stepping back off opens it again |
| 2 | The box on M, a pair on (2, 0) and (5, 1) | The light comes out of (5, 1) into M from the right, and `\` turns it up column 4, through T, onto (4, 5): the receiver stays dark, the light visibly turned the wrong way |
| 3 | A pair on (2, 0) and (0, 1) with M empty | The light runs along row 1 past the receiver's column onto (5, 1): the clue, a light crossing the column below T |
| 4 | The box down in column 2, in the emitter's ray | `\` turns the light right along that row: onto steel in rows 3 and 4, onto the closed exit in row 2, onto (5, 1) in row 1 |
| 5 | The box on M with the pair on (2, 0) and (4, 5) | `\` turns the light coming down column 4 right, onto (5, 1): the receiver stays dark |
| 6 | The box down on T | It bars the exit until lifted again from (3, 2), (4, 3) or M |
| 7 | Standing in the lit ray, anywhere along it | The receiver goes dark and the exit shuts until the subject steps out |
| 8 | Walking into a portal | The subject crosses between two plain walls; every way back is open |

## Variants tried

None built: the sketch was built as drawn. Before the proposal, the sketch's prototype was checked by two fresh reviewers, one against the handbook and one on the prototypes alone (the idea pool, "Sketched for a run").

## Checks

- `npm run solve -- --baseline`: fewest moves 7, with 3 portals, and fewest portals 2, with 8 moves; four portal wall sides; key 20 bits. The macro search refuses it, as it does every chamber with a receiver.
- Every reachable state (21,506) explored through the rules' step with the game's presses (each move key a turn, or a move when the subject already faces that way): none dead, none with the subject standing in something blocked, none with a box under the subject; fewest 19 presses; the receiver first lit after 10 presses, the lure; lit with the subject on T in 8 states, each with the box on M and the pair on (2, 0) and (0, 1).
- Copies: with the box made plain, unsolvable; with no box, unsolvable; with (2, 0) steel, unsolvable; with (0, 1) steel, unsolvable; with the box kept off M, unsolvable (all 20,244 states dead); with a `/` box, solvable through (5, 1) instead, 7 moves and 2 portals; with (4, 5) and (5, 1) both steel, still 8 moves and 2 portals.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run random:walk`, `npm run lint` and `npm run build` pass. `npm run replay:check` and `npm run solver:check` pass with the recorded solution.
- Played in `npm run dev` with the Chrome tool, muted, 2026-11-26, at about 48 px tiles: the box's `\` reads clearly, the four plain walls stand out from the steel, and the ray's first frame ends on (2, 0). The lure lit the receiver, its antline and the exit, and the step onto T darkened all three, the subject standing in the light one step from the exit; the box on M with the pair on (2, 0) and (5, 1) turned the light visibly up through T; moving the far portal to (0, 1) and stepping out of row 1 lit the receiver, the light crossing its own path at (2, 1) as a plain cross, and the subject stood on T with the exit open and walked out. No console error.
- An independent check (a fresh agent with only this chamber's file, chambers 22 to 26's files and the plan, not these notes) found no shortcut, no dead end and nothing that looks broken: the same 21,506 states, fewest 7 moves and 3 portals or 8 moves and 2, 19 presses; every copy above unsolvable; the refusals all known rules (shots at the emitter, the receiver or the closed exit, shots while carrying, crossings refused by the box resting in front of the far portal, which no route needs). Rated light, edging solid: a gem with one key move, suiting a twist before a finale no harder than run 11. Its findings:
  - The side clause is decided on every route but contrasted only on wrong tries, so within this chamber it is offered (guideline 108). Answered: every route turns light going right down at `\`, the face chamber 26 never used (its `\` turned light going left up), so across 26 and this chamber the player meets one mirror from both sides; that is how the run plants it for 12.2 (`docs/campaign.md`, run 12).
  - Its frame echoes chamber 26, played just before: the two plain walls on 26's very tiles, (2, 0) and (4, 5), the same `\` box and a start facing left, so the lure is 26's pair with the light reversed; and the emitter in column 2, as chamber 25's, flipped. Answered: kept, as the reviewer leans, for the author's cold play: it strengthens the lure, and the answer's moves are new (a pair turning the light a quarter turn, the box off the emitter's line in front of the receiver). Mirrored left to right, the box would slant `/` and its forced turn, light going left turned down into a receiver below, would be 12.2's key turn itself, rehearsing the finale (guideline 47); a half turn would force 26's own turn; a transpose would put the emitter in the right wall firing left, as 26's.
  - (4, 5) and (5, 1) block nothing but each sets up a lure; without (4, 5) no route could put light across the doorstep, and (5, 1) also keeps (0, 1) from being the lone plain face in the side walls (guideline 16), which would give the side away. Answered: named in Restrictions; the two side faces sharing row 1, the answer's row, is a cue left in (guideline 19).
  - The antline hides under a ray only with the box on (2, 2), the light then running along row 2 into the closed exit, a plausible wrong try; minor. A line over walls only, (4, 0), (5, 0), (5, 2), would pass over (5, 1), the wrong side's face. Answered: kept.
  - The `\` must read unmistakably, since a `/` solves through the other wall (guideline 95). Answered: checked in the game at about 48 px (above).

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-26 | Kept, and liked. Their recorded run goes straight to the answer: the box lifted from (2, 4), carried along row 4 and down column 3 to (3, 1) and put down on M facing right, before any portal; then (0, 1) shot from (2, 1), and (2, 0) from there facing down; the step out of column 2 lit the receiver and opened the exit, and the subject walked onto T and out (10 moves and 2 portals, 21 presses; the fewest are 7 moves with 3 portals, 8 with 2, and 19 presses). The lure and the wrong side never show in it; earlier tries, if any, leave no trace in a recording. Recorded as `chamber_27.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-26 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
