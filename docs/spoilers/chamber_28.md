# Chamber 28 (run 12, chamber 12.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-26 from its sketch, as drawn; checked and independently reviewed; kept by the author after their cold play, 2026-11-26; their cold run its recorded solution. File: `src/chambers/chamber_28.json`, twenty-eighth in the play order; permanent id 28. Run 12's combine and the campaign's last chamber (`docs/campaign.md`, "Run 12 in detail").

## Entry

Run 12, chamber 2, combine, the campaign's last chamber. Elements: two emitters, two receivers, a mirror box and the exit, with antlines; every wall steel but two plain walls. The player knows runs 1 to 11, and 12.1. It should teach that a receiver can switch on an emitter, which sends its ray only while that receiver is lit, and that one mirror box can turn two rays at once, one from each side, each its own way. Hint: none (convention 7).

## Layout

7 × 7. The emitter **E1** (0, 4), in the left wall, always on, fires right along row 4 into the plain wall (6, 4). The receiver **R1** (3, 6), in the top wall, listens down column 3 and links the emitter **E2** (6, 2), in the right wall, which fires left along row 2 into the plain wall (0, 2) while R1 is lit and is off otherwise. The receiver **R2** (3, 0), in the bottom wall, listens up column 3 and links the exit **E** (5, 0), in the bottom wall. So column 3 joins the two receivers, and crosses each emitter's row at a junction: **J1** (3, 4) on E1's row, **J2** (3, 2) on E2's. The mirror box (1, 3) slants `/`; the start (1, 2), below it, faces up at it.

```
y6  ■ ■ ■ R ■ ■ ■
y5  ■ . . . . . ■
y4  e . . j . . W
y3  ■ / . . . . ■
y2  W S . k . . f
y1  ■ . . . . . ■
y0  ■ ■ ■ q ■ E ■
    0 1 2 3 4 5 6
```

`■` steel, `W` a plain wall, `S` the subject's start (1, 2), facing up, `/` the mirror box (1, 3), its mirror from bottom left to top right, `e` E1 (0, 4), firing right, always on, `R` R1 (3, 6), listening down, linked to `f` E2 (6, 2), firing left while R1 is lit, `q` R2 (3, 0), listening up, linked to `E` (5, 0), closed while R2 is dark; `j` J1 (3, 4) and `k` J2 (3, 2), plain floor.

Two antlines:

- R1 to E2: (3, 6), (5, 6), (5, 3), (6, 3), (6, 2): right along the top wall, down column 5, crossing E1's row at right angles at (5, 4), onto the steel (6, 3) and down into E2, below the plain (6, 4).
- R2 to the exit: (3, 0), (5, 0): right along the bottom wall, over steel only.

No ray crosses the exit's approach (5, 1), nor does any ray R1 or R2 needs, the relay included (guideline 92).

## Idea

The two receivers share column 3, one at each end, so one box at a junction of column 3 with an emitter's row turns that emitter's light into one receiver from the front, and the other emitter's light, piped through the pair from (0, 2) to (6, 4) into its back, into the other receiver: a `/` turns a ray going right up and one going left down.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 12 in detail"):

> - **Run 12, chamber 2: one mirror, two lights** (combine, the campaign's last chamber; two emitters, two receivers, a mirror box, the exit). From its handbook reviewer's alternative, checked, turned a quarter turn clockwise so its bottom row isn't chamber 25's opening. 7 × 7, every wall steel but two plain walls:
>
>   ```
>   y6  # # # r # # #
>   y5  # . . . . . #
>   y4  e . . . . . W
>   y3  # / . . . . #
>   y2  W S . . . . f
>   y1  # . . . . . #
>   y0  # # # q # E #
>       0 1 2 3 4 5 6
>   ```
>
>   `e` E1 (0, 4) fires right along row 4 into the plain (6, 4); `r` R1 (3, 6) listens down column 3 and links `f` E2 (6, 2), which fires left along row 2 while R1 is lit and is off otherwise; `q` R2 (3, 0) listens up column 3 and links the exit `E` (5, 0), in the bottom wall. Plain walls: (6, 4) and (0, 2), the ends of the two emitters' rows. The box `/` starts at (1, 3); the subject at (1, 2), facing up at it. Antlines: R1 to E2, (3, 6), (5, 6), (5, 3), (6, 3), (6, 2), along the top wall, down column 5 across row 4 at right angles, and into E2 over the right wall below the plain (6, 4); R2 to the exit, (3, 0), (5, 0), along the bottom wall. Idea: the two receivers share column 3, one at each end, so one box at a junction of column 3 with an emitter's row turns that emitter's light into its receiver from the front, and the other emitter's light, piped through the pair into its back, into the other receiver: a `/` turns a ray going right up and one going left down. With the box at (3, 4), E1's light turns up into R1, E2 switches on, and its light runs along row 2 into (0, 2), out of (6, 4) and into the box's back, which turns it down into R2; with the box at (3, 2), E1's light goes round through the pair into the box's front and up into R1, and E2's light meets its back. Lure: 11.1's habit, the box at (3, 4), where E1's row meets R1's column: R1 lights, its antline lights, E2 switches on and its light runs along row 2 into the plain (0, 2); moving the box to (3, 2), where E2's row meets R2's column, darkens R1, and E2 with it. Forced: the box at (3, 4) or (3, 2); portals on (0, 2) and (6, 4) (each copy unsolvable); R2 lit in 196 states, every one with the box turning both lights; never lit with R1 dark. Spectacle: the last step out of a lit row lets the light run through the pair, R1 switches E2 on, and the box turns both lights at once, each its own way, into the two receivers, and the exit opens. 17,504 states, none dead, none with the subject standing in something blocked, none with a box under it; fewest 10 moves and 2 portals; 19 presses; the lure reached in 7 presses; key 19 bits. Gem, light: one realisation, the box's other side, then two shots.
>
>   Risks: a player who shoots both plain walls first, then puts the box on either junction, never meets the lure, though the double turn still ends on screen (its handbook reviewer); four kinds of element, rays only, while idea 37 imagined most of the campaign's elements; the relay is shown, not worked out, its antline stating it; its left wall's emitter firing right along row 4 against chamber 22's along row 2, to check when built.

It is the idea pool's pattern of two rays and one mirror box (Patterns, rays, 4) with the relay chain (Patterns, rays, 7), and idea 37's capstone narrowed to rays, the finale the author accepted on 2026-11-25.

## Purpose

The campaign's last chamber: synthesis and spectacle, with a catch no harder than run 11's (guideline 50). It combines run 10's receiver and pair with run 11's mirror box and 12.1's side a mirror turns from, and adds one link never shown before, a receiver switching on an emitter, shown rather than worked out, its antline stating it. Its new consequence, the one every route must make, is one box turning two lights at once, one from each side, each its own way: the last step lights both receivers through one box, and the exit opens.

Gem, light: one realisation, the box's other side, then two shots.

## Intended route

1. Lift the box from (1, 3); carry it up to (1, 3) and right to (3, 3), below J1.
2. Turn up and put it down on J1: E1's light turns up into R1, which lights; its antline lights, E2 switches on, and E2's light runs along row 2 onto the plain (0, 2). The lure (below).
3. Right to (4, 3) and up to (4, 4), in E1's row past the box; turn right and shoot (6, 4).
4. Down to (4, 2), into E2's light; turn left and shoot (0, 2). The key move: the pair that pipes E2's light into the box's back.
5. Down to (4, 1), out of E2's row: E2's light runs into (0, 2), out of (6, 4) along row 4 into the box from the right, and `/` turns it down column 3 into R2, which lights; its antline lights and the exit opens. The box now turns both lights, each its own way.
6. Right to (5, 1) and down into the exit.

This takes 10 moves and 2 portals, the fewest (`--baseline`), in 24 presses; the fewest presses is 19, with 11 moves (a walk of every reachable state). Either colour on either wall; the box can stay on J1, or go on J2, where E1's light comes round through the pair into its front and up into R1, and E2's light meets its back and turns down into R2. Every route crosses a lit ray to reach the exit, which shuts and opens again (chamber 10.1's lesson, harmless).

## Lure and where the player should get stuck

Chamber 11.1's habit: the box where the emitter's row meets the receiver's column. E1's light, from the first frame, runs along row 4 past column 3 onto the plain (6, 4), and R1, at the top of column 3, has its antline running to E2: the box on J1 turns E1's light up into R1, which lights, E2 switches on, and its light runs along row 2 into the plain (0, 2), crossing J2. Progress shows (guideline 22): a receiver lit, an antline lit, a second emitter on. The same habit then says to put the box on J2, where E2's row meets R2's column; but lifting it from J1 darkens R1, and E2 with it, so the light to turn at J2 is gone. Where the player should get stuck is that one box is needed at both junctions at once.

The way out is the box's other side: a box at one junction already stands in column 3, the line both receivers listen along, so the other light, brought to it from behind, turns the other way down the same column. The two plain walls, each at the end of an emitter's row, make the pair that brings it: chamber 10.2's habit, a portal where each light ends. A player who shoots both plain walls first, then puts the box on either junction, never meets the lure, but still sees the double turn end on screen (its proposal's handbook reviewer); the finale is meant to be synthesis, not the hardest catch (guideline 50).

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | R1 and R2 in one column, at its two ends | Two boxes' worth of turns: one box at a junction of column 3 faces both receivers. Checked: with the box kept off both junctions, unsolvable (16,156 of 16,212 states dead); kept off either one alone, solvable at the other |
| 2 | E2 linked to R1, the relay | The box serving one light at a time: R2 lights only while R1 is lit. Checked: R2 lit in 192 states, never with R1 dark; with R1 taken out and E2 always on, the box on J2 alone opens the exit, 6 moves and no portal, chamber 11.1's move |
| 3 | The plain walls only at the ends of the emitters' rows, (0, 2) and (6, 4) | Any light reaching a junction from behind but through that pair, and any skip of the relay: a plain face at (6, 3) or (6, 5) would let E1's light U-turn into R2 with R1 never lit (its fresh reviewer). Checked: with either steel, unsolvable |
| 4 | The box's `/` | E1's light turned straight down column 3 into R2, skipping the relay: with a `\` box, solved in 8 moves and no portal |
| 5 | The box a mirror box | Checked: with the box made plain, unsolvable |
| 6 | E1 always on, in the left wall | The first light, in view from the first frame, running past J1 onto (6, 4) |
| 7 | The box starting at (1, 3), off every ray, the start below it facing it | A box that already turns a light: the first turn is the player's, made by 11.1's habit at J1 (the lure) |
| 8 | Every other wall steel | Other pairs, and the trial and error they would allow (guideline 8) |

## Facts that must never be possible

- R2 lit with R1 dark: checked, none among the 17,504 reachable states.
- Finishing with the box off both junctions: checked, unsolvable.
- Finishing without portals on (0, 2) and (6, 4): checked, unsolvable with either steel.
- The subject standing in something blocked: checked, none.
- A dead state: checked, all 17,504 can be finished.
- The box under the subject: nothing sends a box home here.

## Guidelines broken on purpose

None. Four kinds of element (guideline 18).

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | The box on J1, the lure | R1 lights, its antline lights and E2 switches on; E2's light runs along row 2 onto (0, 2); R2 stays dark, the exit's antline unlit |
| 2 | The box moved from J1 to J2 | Lifting it darkens R1 and switches E2 off; on J2 it turns nothing, E1's light running on along row 4 onto (6, 4) |
| 3 | A pair on (0, 2) and (6, 4) with no box on a junction | E1's light runs into (6, 4), out of (0, 2) along row 2 onto E2's face: nothing lights |
| 4 | The box elsewhere in E1's row, at (1, 4), (2, 4), (4, 4) or (5, 4) | `/` turns E1's light up into the steel of the top wall |
| 5 | The box elsewhere in row 2, with the pair open | `/` turns E1's light, coming out of (0, 2), up into steel |
| 6 | Standing in a lit ray | The receiver it feeds goes dark; in R1's light, E2 switches off and R2 goes dark with it; the exit shuts until the subject steps out |
| 7 | The box down at (1, 2) or (5, 4), in front of a plain wall | It refuses crossings onto it until lifted again, and turns any light reaching it up into steel |
| 8 | Walking into a portal | The subject crosses between (0, 2) and (6, 4); both ways back are open |

## Variants tried

None built: the sketch was built as drawn. Before the proposal, its prototype was checked by two fresh reviewers, one against the handbook and one on the prototypes alone, and it replaced a first last chamber their findings showed to be chamber 11.2's handover with a relay (the idea pool, "Sketched for a run").

## Checks

- `npm run solve -- --baseline`: 10 moves and 2 portals, both searches; two portal wall sides; key 19 bits. The macro search refuses it, as it does every chamber with a receiver.
- Every reachable state (17,504) explored through the rules' step with the game's presses (each move key a turn, or a move when the subject already faces that way): none dead, none with the subject standing in something blocked, none with a box under the subject; fewest 19 presses; R1 first lit after 7 presses, the lure; R2 lit in 192 states besides the 4 completed ones, never with R1 dark.
- Copies: with the box made plain, unsolvable; with (0, 2) steel, unsolvable; with (6, 4) steel, unsolvable; with the box kept off both junctions, unsolvable; kept off J1 alone, or J2 alone, solvable in 19 presses; with a `\` box, 8 moves and no portal, E1's light turned straight into R2; with R1 taken out and E2 always on, or with E1 taken out too, 6 moves and no portal, the box on J2.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run random:walk`, `npm run lint` and `npm run build` pass. `npm run replay:check` and `npm run solver:check` pass with the recorded solution.
- Played in `npm run dev` with the Chrome tool, muted, 2026-11-26, at about 42 px tiles: the box's `/` reads clearly, both plain walls stand out from the steel, and R1's antline visibly crosses E1's ray at right angles and enters E2. The lure, the box on J1, lit R1 and its antline and switched E2 on, its light running onto (0, 2); the intended route's last step out of row 2 sent E2's light through the pair into the box's back, R2 and its antline lit and the exit opened, the box turning both lights at once; walked out, the completion dialog offering Back to menu, as for the last chamber. No console error.
- An independent check (a fresh agent with only this chamber's file, chambers 22 to 27's files and the plan, not these notes) found no shortcut, no dead end and nothing from "States to avoid": the same 17,504 states, 10 moves and 2 portals, 19 presses; exactly two answers, the box on J1 or J2 with the pair on (0, 2) and (6, 4), either colour; every copy above unsolvable or as listed, and with R1 taken out and E2 off, unsolvable; R2 never lit with R1 dark, so both lessons hold on every route. Rated light, borderline trivial for a player who shoots the two lone faces first, within the brief (guideline 50): a gentle, pretty closer, its last picture rays on all four sides of the box. Its findings:
  - The catch can arrive by stumbling: a player who puts the box where 11.1's habit does and shoots the only two faces meets one box turning two lights as something that happened, not a step worked out (guidelines 8 and 113). Its fix, if wanted: make the pair a choice with more plain faces, such as (1, 0) and (5, 6), keeping the point symmetry (52,504 states, none dead, the same two answers, R1 still needed), or faces in the left wall or at (1, 6). Answered: kept as sketched for the author's cold play, since the sketch names this risk and the plan chose a finale no harder than run 11's; the extra faces are the cheapest change if that play finds the chamber slight.
  - The two plain faces are what keep the relay forced: a plain face at (6, 3) or (6, 5) lets E1's light U-turn on the right wall into R2 with R1 never lit, and one at (6, 1) lights R2 alone too, saved only because that light crosses the exit's approach. Answered: named in Restrictions; any added face stays off the right wall, and off (2, 0) and (4, 6), which would give near misses one column off.
  - Its forced moves partly repeat older ones: on J2, E1's light carried by the pair out of the left wall going right into the box, which turns it into a receiver, is 12.1's answer; the pair on opposite walls carrying a light on its way is 11.2's form; the box turning E1's light straight into R1 is 11.1's move. What is new is both turns on one tile at once, gated by the relay, and the box never has to leave a tile where it works, so it isn't 11.2's handover. Answered: meant (`docs/campaign.md`, run 12: 12.1 plants the side a mirror box turns from); whether 12.1 rehearses the answer too closely (guideline 47) is for the author's cold play.
  - The setup never lights on the press that completes it: every tile beside a junction and both shooting rows lie in the finished light, so both receivers light only as the subject steps out of it. Answered: the spectacle the sketch names, the last step out of a lit row; it echoes 12.1's last step.
  - E2 is the campaign's first emitter that starts off, so its dark housing must not read as a third dark receiver (guideline 95). Answered: checked in the game at about 45 px: it shows E1's slotted housing with its lens dark, unlike the receivers' round eyes.
  - With the pair open and the box on no junction, E1's light ends on E2's face, which might read as powering it; R1's antline to E2 says otherwise. Crossings into a portal are refused with the box at (1, 2) or (5, 4), which no route needs (wrong try 7). Answered: left.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-26 | Kept, and liked. Their recorded run puts the box straight onto J2 from (2, 2), before any portal, shoots (0, 2) from there and (6, 4) from (2, 4), and walks along row 4, cutting E1's light, to (5, 4); the step down out of it lit R1, switched E2 on and lit R2 in one step, the box turning both lights at once, and the exit opened; then down across E2's row, the exit shutting and opening again, and out (10 moves and 2 portals, and 19 presses, all the fewest). The lure, the box on J1, never shows in it, so the relay was first seen in the same step as the double turn; earlier tries, if any, leave no trace in a recording. Recorded as `chamber_28.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-26 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
