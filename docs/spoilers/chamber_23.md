# Chamber 23 (run 10, chamber 10.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their solution is not recorded yet. File: `src/chambers/chamber_23.json`, twenty-third in the play order; permanent id 23. Run 10's second chamber (`docs/campaign.md`, "Run 10 in detail"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 10, chamber 2, teach. Elements: an emitter, a receiver and the exit, with an antline; every wall steel but two plain walls. The player knows runs 1 to 9, and 10.1. It should teach that a ray goes through portals as the subject does, so a pair carries it to a receiver out of its line. Hint: none (convention 7).

## Layout

5 × 5. The emitter **e** (4, 1), in the right wall, fires left along row 1 into the plain wall X (0, 1); the receiver **r** (4, 3), above it in the same wall, listens left along row 3, whose far wall is the plain wall Y (0, 3); it links the exit **E** (0, 2), in the left wall between X and Y. The start (2, 2) faces left at the exit.

```
y4  ■ ■ ■ ■ ■
y3  W . . . r
y2  E . S . ■
y1  W . . . e
y0  ■ ■ ■ ■ ■
    0 1 2 3 4
```

`■` steel, `W` a plain wall (X below, Y above), `S` the subject's start (2, 2), facing left, `e` the emitter (4, 1), firing left, `r` the receiver (4, 3), listening left, linked to `E` (0, 2), closed while the receiver is dark.

One antline: the receiver to the exit, (4, 3), (4, 2), (0, 2): down from under the receiver onto the steel beside it and left along row 2, under the start, into the exit. It was first drawn over the top wall and down over Y, and rerouted on its fresh reviewer's finding, so that no portal on Y could make it seem to end there (guideline 112).

Neither ray row crosses the exit's approach (1, 2) (guideline 92).

## Idea

A portal where the ray hits the wall and one on the receiver's far wall turn the ray back into the receiver: a U-turn, unlike Playground 9's pillar or Playground 10's ceiling.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 10 in detail"):

> - **Run 10, chamber 2: the light around** (teach; an emitter, a receiver, the exit). 5 × 5, every wall steel but `W`.
>
>   Idea: a portal where the ray hits the wall and one on the receiver's far wall turn the ray back into the receiver, a U-turn, unlike Playground 9's pillar or Playground 10's ceiling.
>
>   Forced: both portals, and the subject out of the ray: the receiver lights only as the subject steps out of it, never on a shot (its blind reviewer). Show, flow. Risk: it is Playground 9's lesson, which the author has played (its handbook reviewer), in a room of its own. _Check:_ 75 (one pair of faces), 92 (neither row crosses the exit's approach). Feasibility: 6 moves and 2 portals, the fewest; all 254 states can be finished; with no plain wall, unsolvable.

## Purpose

Teaching: a ray goes through portals, the run's second lesson, with one pair of faces only (guideline 75). It also forces what 10.1 can let the box take the credit for: the subject alone cutting a ray, since every shot here is fired from a ray's row, so the receiver lights only once the subject steps out of the ray (its blind reviewer, from the proposal).

Flow, a show chamber (guideline 32).

## Intended route

1. Up, left, shoot Y (0, 3) along row 3.
2. Down twice, turn left, shoot X (0, 1) along row 1, standing in the emitter's ray. The ray now runs into X, out of Y and back along row 3; the subject, in row 1, cuts it.
3. Up into row 2, out of every ray: the receiver lights, its antline lights, the exit opens.
4. Left into the exit.

This takes 6 moves and 2 portals, the fewest (`--baseline`). Either colour on either wall, and either wall first, work the same.

## Lure and where the player should get stuck

None: a teach chamber. What the player should notice is the ray coming out of the second portal and running into the receiver once the subject steps out of row 1 or row 3.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | Every wall steel but X and Y | Any other pair: the two faces are the only ones that take a portal (guideline 75) |
| 2 | The exit between X and Y, its approach on row 2 | The ray crossing the exit's approach, which would shut the exit as the subject reached it (guideline 92) |

## Facts that must never be possible

- Finishing without both portals: checked, with no plain wall, unsolvable.
- The subject standing in something blocked: checked, none among the 254 reachable states.
- A dead state: checked, all 254 can be finished.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end: a portal moved is shot again.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | One portal only, on X | The ray goes into it and stops: a portal alone passes nothing |
| 2 | Waiting in row 1 or row 3 once both portals are open | The ray ends on the subject, the receiver stays dark until it steps into row 2 |
| 3 | Walking into a portal | The subject comes out of the other, onto the opposite row, facing right |

## Variants tried

None before this one; its sketch was approved as drawn.

## Checks

- `npm run solve -- --baseline`: 6 moves and 2 portals, both searches; 2 portal wall sides; key 11 bits.
- Every reachable state (254) explored through the rules' step: none dead, none with the subject standing in something blocked.
- Copy: with no plain wall, unsolvable.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 22 to 24 as built and their plan entries, not these notes) found no shortcut, no dead end and nothing that looks broken: 254 states, none dead; with both plain walls steel, unsolvable (36 states, all dead). Its findings:
  - The antline ran down the left wall over Y, the face that must take a portal, so a portal there might seem to end it (guideline 112). Answered: rerouted along row 2.
  - It is a show chamber with one placement, fine for a teach (guideline 32), and reads as no earlier chamber: chamber 1.1 also has two lone portal faces, but nothing crosses a portal here.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their route isn't known until their solution is recorded (guideline 106) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, with no trouble, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
