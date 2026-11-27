# Chamber 29 (run 13, chamber 13.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-27, checked and independently reviewed; waiting for the author's cold play, then its recorded solution. File: `src/chambers/chamber_29.json`, twenty-ninth in the play order; permanent id 29. Run 13's first chamber, the harder of the graduation run's two (`docs/campaign.md`, "Run 13 in detail").

## Entry

Run 13, chamber 1, combine. Elements: slide floor, ditches (one a receiver bridges), a laser and a light barrier over slide floor, each a receiver switches, three emitters, three receivers, a mirror box, the exit, with antlines; every wall steel but six plain walls. The player knows runs 1 to 12. It should teach that a barrier over slide floor stops a slide only while it is on, that a light barrier also stops light, and that everything a step changes is judged once it ends, a slide included. Hint: none (convention 7).

## Layout

16 × 12, in two areas, the seed below and the new catch above.

```
y11 ■ ■ ■ ■ ■ X f ■ ■ ■ ■ ■ ■ ■ ■ ■
y10 ■ _ _ _ _ D _ _ _ ■ ■ ■ ■ ■ ■ ■
y9  H ~ ~ ~ ~ J B ~ ~ ■ ■ ■ ■ ■ ■ ■
y8  ■ . W W W ■ q ■ ■ ■ ■ ■ ■ ■ ■ ■
y7  U . . . . . . . . ■ ■ ■ ■ ■ ■ ■
y6  e . . . . . . . . r ■ ■ ■ ■ ■ ■
y5  ■ ■ ■ ■ ~ ■ ■ K ■ ■ ■ ■ ■ ■ ■ ■
y4  ■ _ _ _ ~ _ _ _ _ _ ■ ■ ■ ■ ■ ■
y3  ■ _ _ _ ~ _ _ _ _ _ _ . . . / R
y2  ■ . . Z j ~ ~ ~ ~ ~ ~ . . . . ■
y1  ■ _ _ _ _ _ _ _ _ _ _ . S . . ■
y0  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ a ■
    0 1 2 3 4 5 6 7 8 9 ...      15
```

`■` steel; `W`, `H`, `U` and `K` plain walls; `~` slide floor; `_` an open ditch.

**Area A, the seed (bottom).**

- **Bridge 1:** slide floor along row 2, from (4, 2) to (10, 2), with ditches above and below.
  - Its head, (11, 2), is plain floor in the east room. Its far end, (1, 2) and (2, 2), is a plain landing.
  - The laser **Z** (3, 2), drawn `V`, lies over slide floor, held off by the receiver **R** (15, 3).
- **The light:** the emitter **a** (14, 0) fires up into the mirror box `/` (14, 3), in the east room's far corner, which turns it right into R. So the laser starts off.
- **The junction j** (4, 2): from it, slide floor runs up column 4, through the gap (4, 5), into area B.
- **The start** (12, 1) faces up.

**Area B, the new catch (top).**

- **The row of light:** the emitter **e** (0, 6) fires right along row 6 into the receiver **r** (9, 6), which holds the light barrier **B** (6, 9) off. B is drawn `V` and lies over slide floor.
- **Bridge 2:** slide floor along row 9, from (1, 9) to (8, 9). Its head (1, 9) is reached from the room by the gap (1, 8). **J** (5, 9) is the tile to stop on.
- **The second light:** the emitter **f** (6, 11) fires down through the ditch (6, 10) and B's tile into the receiver **q** (6, 8). q holds the ditch **D** (5, 10) bridged.
- **The exit X** (5, 11) is above D and open; the ditch is what holds it.
- **The plain walls:**
  - **H** (0, 9), facing the head;
  - **U** (0, 7), on the unlit row;
  - **K** (7, 5), below the lit tile (7, 6);
  - (2, 8), (3, 8) and (4, 8), both faces;
  - (5, 8) stays steel: its top face fronts J and would skip the catch.

Three antlines, each over walls:

| # | From | To | Path | Note |
|---|---|---|---|---|
| 1 | R | Z | (15, 3), (15, 0), (0, 0), (0, 2), (3, 2) | Hidden under a; enters the laser over the landing's floor |
| 2 | r | B | (9, 6), (9, 9), (6, 9) | |
| 3 | q | D | (6, 8), (5, 8), (5, 10) | Over J's floor |

No ray crosses anything its own receiver holds open, nor a tile from which the subject enters it (guideline 92):

- a's light crosses nothing R holds;
- row 6 crosses neither of B's neighbours on the lane;
- f's column crosses B, which r holds, not q, and misses D and J.

## Idea

**Area A, the author's seed:** the slide must stop mid-bridge at the junction, but the laser is held off, so it runs past. Lift the mirror box out of the light that holds the laser off, and the next slide stops in front of it.

**Area B, the new catch:**

- The barrier that stops the slide at J also blocks the light that bridges the ditch above J. So it must be on while the subject slides and off once it stops.
- So cut its light with the subject's own body and start the slide from inside that light. Walk into the portal on K, whose only tile is in the light. The subject comes out at the head and slides with the barrier still on, since the step is judged only once it ends.
- The subject stops at J. As the step ends the light comes back, the barrier switches off, f's light reaches q and the ditch bridges.

## Purpose

Graduation; the campaign's second-to-last chamber.

- The seed's answer, switching a barrier on to stop a slide, is the second area's lure.
- The laser and the light barrier differ in a way that matters (guideline 17): with a laser at B, the lure would solve area B.
- The rule the catch rests on is shown at no stake on every overshoot of bridge 2. D is bridged from the start, since r is lit, and stays bridged while each slide passes through f's light.

## Gem or flow

Two hard steps, guideline 11 bent on purpose (decision 7):

- area A's light catch, then area B's gem;
- the second is the chamber's moment.

## Intended route

1. Lift the mirror box: R goes dark and the laser comes on.
2. Slide west from the head, stopping at j; up the branch into the row of light.
3. Put the box down out of the light.
4. Shoot H from the head (1, 9), and K from (7, 6) or (7, 7).
5. Stand at (7, 6), in the light, and walk down into K.
   - The subject comes out at the head and slides east with B on, stopping at J.
   - As the step ends, r lights, B switches off, f's light reaches q and D bridges.
6. Up onto D and out.

36 presses, the fewest (a walk of every state).

## Lure and where the player should get stuck

- **Area A:** the first slide from the head runs past the junction to the far landing, plainly. The box sits in the far corner, away from the walk to the head. The blind reviewer, with the box beside the start, passed this catch by picking the box up first.
- **Area B:** two wrong tries, each failing plainly within a few moves.
  - Put the box in the light: the mirror box turns it away from r, and the slide stops at J, but B now blocks f's light, so D stays open.
  - Cross from the unlit row (U, or the walls at (2–4, 8)) onto bridge 2: the slide runs past J.

## Restrictions

| # | Restriction | What it blocks |
|---|---|---|
| 1 | No face takes portals in area A; the only plain face it sees is (4, 8)'s bottom face, up the branch from j, which only a solved seed reaches and area B reaches anyway | A portal route into area B round the seed |
| 2 | K is the only plain face whose tile is in the light | Any other way to start a slide from inside the light |
| 3 | U and (2–4, 8), plain | Nothing: lures, and the dial of guideline 8, so the answer isn't a two-face test (handbook reviewer) |
| 4 | (5, 8) steel | A portal out onto J. Made plain: 336 completions without the catch and 64 dead states (handbook reviewer) |
| 5 | Ditches round bridge 2 and round J | A box as a stopper beside J, chamber 19's answer |
| 6 | The far landing in area A is reached only while the laser is off, and nothing can switch it on while the subject is there | Being shut in there |

## Facts that must never be possible

- The subject standing on the laser's tile or the barrier's.
- Reaching area B without stopping at j.
- Completion without walking into K from (7, 6).

## Guidelines broken on purpose

- **11:** two hard steps (decision 7).
- **99:** the size (decisions 4 and 5).
- **23 and 25:** the barrier switching off as the slide stops may look like timing, and the rule it rests on was never forced before (run 12's list, item 8).
  - The drawing shows e's light whole again from the slide's first tile while B stays up until the stop (handbook reviewer).
  - Kept knowingly, as the run's new consequence, which the author approved as a risk; the author's cold play decides.

## Risks named by the reviewers

- **113:** area A is chamber 21's move plus chamber 22's lift out of a ray, which is allowed for the seed. Area B uses chamber 21's frame, with 21's answer as its lure.
- **95 and 19:** the laser runs between ditches, and B's run ends on a ditch and on q's face; no earlier chamber had either. To check in the game: the end plates read, and q's eye shows.
- **The entry:** the laser lets light through where B doesn't, but no ray crosses the laser, so the entry doesn't claim it.

## Near misses and wrong tries

- **The box in the light (area B):** fails at once, with D seen opening as B comes on. It can always be undone: lift the box out of the light.
- **Arriving from the branch:** the subject stops at (4, 6), in the light, so B comes on and D opens as it arrives. That is the first sight of the conflict.
- **No dead state:** every one-way step (the slide down the branch, the far landing) has a way back.

## Variants tried

- **Area B was sketched alone first:** 10 × 7, with the exit below, by the designer who found its catch; turned upside down to sit above the seed. With its lit face made steel, or its light moved down one row, the walk found no completion.
- **Area A was first sketched with a box resting on a button,** chamber 21's form. It became the mirror box in a ray, so the box has a job and the seed reads one link deeper.
- **The mirror box first sat beside the start.** The blind reviewer passed area A's catch by picking it up first, so it moved to the far corner.
- **Faces:** the handbook reviewer added the plain walls (2–4, 8).
- **The antline R to Z** first went down into the ditch below the laser, where it vanished. It was rerouted over the landing.

## Checks

- **Walk of every reachable state** through the rules' step, with the game's presses:
  - 224,994 states, 50 completed;
  - 0 dead, 0 with the subject standing in something blocked, 0 with a box under it;
  - 36 presses, the fewest.
- **Key moves forced:**

  | # | Copy | States | Completed |
  |---|---|---|---|
  | 1 | K made steel | 164,984 | 0 |
  | 2 | The laser made plain slide floor | 784 | 0 |

- **Handbook reviewer (beyond the walk):**
  - The subject never stops mid-bridge on row 2 (x 5–10), never on B's tile, and K's bottom face never takes a portal.
  - Guideline 92 holds for every ray.
- **Blind reviewer:**
  - Solved both areas by reasoning: area A in about a minute, area B in several, after the box in the light and the mirror box on B's tile.
  - Verdict "fair and good"; no step looked like a timing check.
- **The solver's macro search refuses chambers with receivers**, so the walk stands in for it (guideline 101).

## Playtests

None yet.
