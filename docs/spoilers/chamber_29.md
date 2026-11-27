# Chamber 29 (run 13, chamber 13.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: first built 2026-11-27; after the author's cold play the same day its top area was redone (Playtests), checked and independently reviewed; waiting for the author's cold play, then its recorded solution. File: `src/chambers/chamber_29.json`, twenty-ninth in the play order; permanent id 29, kept since the first version was never recorded. Run 13's first chamber (`docs/campaign.md`, "Run 13 in detail").

## Entry

Run 13, chamber 1, combine. Elements: slide floor, ditches, a laser over slide floor and the exit, which one receiver switches together, two emitters, a mirror box, with antlines; every wall steel but three plain walls. The player knows runs 1 to 12. It should teach that a receiver linking two elements switches both at once, so the light one of them needs the other can't have, and that a portal pair carries a light a mirror box turns to a receiver out of reach. Hint: none (convention 7).

## Layout

16 × 12, in two areas: the seed below, the top room above.

```
y11 ■ ■ ■ X ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
y10 ■ ■ ■ . . . . . ■ ■ ■ ■ ■ ■ ■ ■
y9  ■ ■ ■ . . . . . ■ ■ ■ ■ ■ ■ ■ ■
y8  ■ ■ ■ . . . . . _ _ _ F ■ ■ ■ ■
y7  ■ ■ ■ . . . . . ■ ■ ■ ■ ■ ■ ■ ■
y6  ■ ■ ■ . . . . . ■ ■ ■ ■ ■ ■ ■ ■
y5  ■ ■ ■ ■ ~ ■ ■ e ■ ■ ■ ■ ■ ■ ■ ■
y4  ■ _ _ _ ~ _ _ _ _ _ ■ ■ ■ ■ ■ ■
y3  P _ _ _ ~ _ _ _ _ _ _ . . . / R
y2  ■ . . Z j ~ ~ ~ ~ ~ ~ . . . . ■
y1  Q _ _ _ _ _ _ _ _ _ _ . S . . ■
y0  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ a ■
    0 1 2 3 4 5 6 7 8 9 10 ...    15
```

`■` steel; `P`, `Q` and `F` the plain walls; `~` slide floor; `_` an open ditch.

**Area A, the seed (bottom), the author's idea:**

- **The bridge:** slide floor along row 2, from (4, 2) to (10, 2), with ditches above and below. Its head, (11, 2), is plain floor in the east room; its far end, (1, 2) and (2, 2), a plain landing.
- **The laser Z** (3, 2), drawn `V`, lies over slide floor.
- **The receiver R** (15, 3) links both Z and the exit **X** (3, 11). The emitter **a** (14, 0) fires up into the mirror box `/` (14, 3), in the east room's far corner, which turns it right into R. So the chamber starts with the laser off and the exit open.
- **The junction j** (4, 2): from it, slide floor runs up column 4, through the gap (4, 5), into the top room.
- **The start S** (12, 1) faces up.
- **The plain walls P** (0, 3), at the far end of R's row, and **Q** (0, 1), two rows below. Both are shot from the east room, along their rows, over the ditches.

**Area B, the top room** (x 3–7, y 6–10), entered at (4, 6):

- **The emitter e** (7, 5), in the room's floor wall, fires up column 7 into the steel (7, 11).
- **The plain wall F** (11, 8), at the end of row 8, behind the ditches (8, 8) to (10, 8).
- **The exit X** (3, 11), in the room's top wall.

Two antlines, leaving R in opposite directions:

| # | From | To | Path | Note |
|---|---|---|---|---|
| 1 | R | Z | (15, 3), (15, 2), (3, 2) | Along the bridge's row, crossing a's light at right angles at (14, 2) |
| 2 | R | X | (15, 3), (15, 11), (3, 11) | Over steel only |

## Idea

**Area A:** the slide must stop mid-bridge at the junction, but R holds the laser off, so it runs past. Lift the mirror box out of a's light and the next slide stops in front of the laser.

**Area B:** lifting the box also shut the exit, since R links both. So once upstairs the subject must give R light again from up there, where none of the bottom faces can be shot:

- the box, put down at (7, 8), turns e's light right along row 8 into F;
- a pair from F to P carries it out along R's row into R.
- P must be shot before going up. Finished from below, the pair lights R with the subject downstairs, the laser goes off, and the slide no longer stops at j.

The mirror box does its corner job twice: downstairs by leaving it, upstairs by doing it again for another light.

## Purpose

Graduation; the campaign's second-to-last chamber. Area A is the author's seed, a known move made harder. Area B, after the first top area was cut (Playtests), is known moves tangled, at the author's call: a box turning a light into a pair (chamber 26) that ends at the far end of the receiver's line (chamber 23). What is new is how the areas fight: one receiver holds both the laser, which must be on to go up, and the exit, which must open once up.

## Gem or flow

Two steps, guideline 11 bent on purpose (decision 7): area A's light catch, then area B's order.

## Intended route

1. Shoot P from the east room, along row 3.
2. Lift the mirror box: R goes dark, the laser comes on and the exit shuts.
3. Slide west from the head and stop at j, then up column 4 into the top room.
4. Put the box down at (7, 8) from (6, 8). e's light turns right into F, which holds no portal yet.
5. Shoot F, from row 8, over the box. The light goes through the pair, out of P and along row 3 into R. The laser goes off and the exit opens.
6. Walk to (3, 10) and out.

30 presses, the fewest (a walk of every state).

## Lure and where the player should get stuck

- **Area A:** the first slide from the head runs past the junction to the far landing, plainly. It comes back by sliding east.
- **Area B:** the natural order of discovery goes up first, works out the box and F up there, then comes down to shoot P. That lights R with the subject below: the exit opens upstairs, the laser goes off, and the next slide overshoots j. It fails plainly, but only after the whole top is built.
  - The way back is 19 presses (a restart costs 30): put F's colour on Q or P, go up, shoot F again over the box, which can stay where it is.
- **Q** is a fair wrong far end (guideline 21): the light comes out along row 1, two rows off, into the right wall.

## Restrictions

| # | Restriction | What it blocks |
|---|---|---|
| 1 | Only three plain walls; every other wall is steel | Any other pair carrying a light into R, or the subject anywhere |
| 2 | The steel (7, 11), at the end of e's column | Piping e's light with no box upstairs (guideline 123; made plain, completions without the box on (7, 8)) |
| 3 | The steel (14, 4), at the end of a's column | Piping a's light from downstairs, with the top room never needed (made plain, completions without a portal on F) |
| 4 | Q plain | Being stranded after finishing the pair from below (with Q steel, 112 dead states) |
| 5 | The steel (0, 2) | A dead end (with it plain, 32 dead states) |
| 6 | The ditches (8, 8) to (10, 8) | Walking into F's portal with the other on P, which is refused because P faces a ditch (guideline 9; floor there gives 320 such states) |
| 7 | The far landing in area A is reached only while the laser is off, and nothing can switch it on while the subject is there | Being shut in there |

## Facts that must never be possible

- The subject standing on the laser's tile.
- Reaching the top room without stopping at j with the laser on.
- Completion without a portal on P, a portal on F, and the box on (7, 8).
- The subject crossing a portal: every plain wall faces an open ditch.

## Guidelines broken on purpose

- **11:** two hard steps (decision 7).
- **99:** the size (decisions 4 and 5). The width, set by area A, already fixes the tile size, so the top room's steel costs nothing to read.
- **Run 13 decision 8:** area B has no catch no earlier route needed, at the author's call (`docs/campaign.md`, "Run 13 in detail").

## Risks named by the reviewers

- **Decision 6, the harder of the two:** both reviewers judged it medium at most. Few faces, one useful tile for the box, and the top light the bottom corner's twin, so elimination finds it fast. Chamber 30 is longer. If the author's cold play finds 29 the easier, swapping the two in the play order is the fix (their ids stay).
- **113:** the top's move is chamber 26's. It is inherent to the idea once known moves are allowed. The first draft of the top was also in chamber 26's frame (a row turned into a column ending at the only face) and was turned (Variants tried). As built, it repeats the chamber's own bottom corner (and chamber 25's frame): an emitter firing up, the `/` box turning it right.
- **The strand looks fatal:** the exit opens upstairs while the subject is below. The way back is 19 presses and uses Q, which otherwise reads as a lone face with no job (guideline 16). Both are named.
- **95:** the laser runs between ditches; check its end plates in the game.

## Near misses and wrong tries

- **Shooting P only after going up:** the walk back down and up again costs 14 presses; the strand only comes if the box is already on (7, 8).
- **F shot before the box goes down:** fine, from anywhere on row 8. The pair carries nothing until the box turns the light, and the subject standing in e's column cuts it until it steps out.
- **The box left downstairs off its corner:** the laser stays on and the subject can go up, but the top needs the box: a trip back down.
- **No dead state.** Every one-way step (the slide down the branch, the far landing, the strand) has a way back.

## Variants tried

1. **The first version (played by the author):** the top area was a second bridge with a light barrier over slide floor, held off by a row of light, which also blocked the light bridging a ditch under the exit. The catch was to walk into a portal from inside the light, so the barrier stayed on through the whole slide out of the far portal. Cut on the author's cold play (Playtests); its idea is in the idea pool ("Cut drafts").
2. **A knock** (designer's first round): the exit on R, a plain box a switch recalls, and the mirror box parked on the plain box's start, so the recall sends it home to its corner and relights R. It was visible, but never shown before it was the answer, which the author's call ruled out. It also used no portal (the idea pool, run 13).
3. **The pipe in chamber 26's frame:** e in the top row firing left, the box turning it down a column of ditches into F below. 27,058 states, 37 presses, clean. The handbook reviewer found it was chamber 26 flipped top to bottom, so it was turned: e moved into the floor and F to the right.
4. **The top room** was 6 × 5 first; trimmed to 5 × 5 (73,858 states, 30 presses).

## Checks

- **Walk of every reachable state** through the rules' step, with the game's presses:
  - 73,858 states, 2 completed (the portal colours swapped);
  - 0 dead, 0 with the subject standing in something blocked, 0 with a box under it;
  - 30 presses, the fewest.
- **Key moves forced:** no completion avoids any of these:
  - the subject on j with the laser on;
  - a portal on P;
  - a portal on F;
  - the box resting on (7, 8).
- **Copies:** F steel gives 39,760 states and no completion. Each restriction above was checked by a copy.
- **The subject never stops on (4, 3) to (4, 5)**, so P is shot only from the east room.
- **Guideline 92:** the pair's light misses the exit's doorstep (3, 10), the laser, j and the landing (2, 2). Cutting it at (7, 6), (7, 7) or on row 3's east floor shuts the exit and the laser comes on, both undone by stepping out.
- **Handbook reviewer:** on the first pipe draft and again on the build. It found no shortcut, no dead end and no refusal that looks like a bug, and both lessons forced. The antlines and the frame were fixed on its findings.
- **Blind reviewer** (on the first pipe draft): solved it by reasoning. Area A took about two minutes, the remote light about three, and the order came at once. Verdict: "fair", "medium at best".
- **The solver's macro search refuses chambers with receivers**, so the walk stands in for it (guideline 101).

## Playtests

- **Author, cold, 2026-11-27, first version:** "the trick to pass a portal that is considered a single step is not going to be discovered/understood by users (even i was confused). redo the upper part to show another puzzle." Area A kept. The author then chose a new catch the game shows, shown first at no stake. When the designer found none left in the rules after chambers 1 to 28, the author chose known moves, tangled, with portals playing a real part.
- **Author, second version:** none yet.
