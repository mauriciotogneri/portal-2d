# Chamber 25 (run 11, chamber 11.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch; checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their cold run its recorded solution. File: `src/chambers/chamber_25.json`, twenty-fifth in the play order; permanent id 25. Run 11's first chamber (`docs/campaign.md`, "Run 11 in detail").

## Entry

Run 11, chamber 1, teach: the mirror box's first contact. Elements: an emitter, a receiver, a mirror box and the exit, with an antline; every wall steel. The player knows runs 1 to 10. It should teach that a resting mirror box turns a ray a quarter turn, so where it rests decides where the ray goes. Hint: none (convention 7).

## Layout

6 × 5. The emitter **e** (2, 0), in the bottom wall, fires up column 2 into the mirror box (2, 2), which slants `/` and turns the ray right along row 2 into the steel (5, 2), one tile below the receiver **r** (5, 3), which listens left along row 3 and links the exit **E** (0, 3), in the left wall at the other end of that row. The start (4, 1) faces left, towards the box.

```
y4  ■ ■ ■ ■ ■ ■
y3  E . . . . r
y2  ■ . / . . ■
y1  ■ . . . S ■
y0  ■ ■ e ■ ■ ■
    0 1 2 3 4 5
```

`■` steel, `S` the subject's start (4, 1), facing left, `/` the mirror box (2, 2), its mirror from bottom left to top right, `e` the emitter (2, 0), firing up, `r` the receiver (5, 3), listening left, linked to `E` (0, 3), closed while the receiver is dark.

One antline: the receiver to the exit, (5, 3), (5, 4), (0, 4), (0, 3): up from under the receiver, left along the top wall and down into the exit, over steel only.

Once lit, the ray runs up column 2 to (2, 3) and right along row 3 to the receiver: it crosses neither the exit nor its approach (1, 3) (guideline 92).

## Idea

The mirror box, shown turning the ray one row short of the receiver, moved up one tile turns it into the receiver.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 11 in detail"):

> - **Run 11, chamber 1: the mirror one tile off** (teach; an emitter, a receiver, a mirror box, the exit). 6 × 5, every wall steel.
>
>   Idea: the mirror box, shown turning the ray one row short of the receiver (guidelines 12 and 25; the near miss at the start is the clue, guideline 4), moved up one tile turns it into the receiver.
>
>   Forced: the box on (2, 3), the one tile that sends the ray into r; with no box, or with the box kept off (2, 3), unsolvable. Show, flow: the answer is the first thing in view. Risks: the box resting in the ray at the start is chamber 10.1's opening, turned instead of cut, meant as the contrast (with the box made plain, no earlier chamber is left: unsolvable); the author has played Playground 1's ray room, so it may feel trivial to them. Feasibility: 577 states, none dead; key 12 bits.

It is the idea pool's idea 28, which moved here:

> **Mirror box shown in place** (mirror box teach). The ray hits a mirror box resting one tile off, which turns it into a wall; moving the box one tile turns it onto the receiver. _Check:_ guideline 93 (every place the box can rest), guideline 80 (no switch where the subject stands to put it down).

## Purpose

Teaching: the mirror box, the run's new element, alone (guideline 24). The box already rests in the ray at the start, so its turn is the first thing in view (guidelines 12, 25 and 31), and the ray ends one tile below the receiver, so the near miss shown at the start is the clue (guideline 4): every route moves the box onto the one tile where its turn meets the receiver's row. Its contrast with chamber 10.1, whose box rests in the ray and cuts it, is meant: a box stops a ray, a mirror box turns it.

Flow, a show chamber (guideline 32): the answer is the first thing in view.

## Intended route

1. Left twice, to (2, 1), into the ray; turn up to face the box; interact: the box is lifted, and the ray, cut by the subject, reaches nothing.
2. Up through (2, 2) to (2, 3), carrying the box, then left to (1, 3).
3. Turn right and interact: the box goes down on (2, 3). The ray turns right along row 3 into the receiver, which lights; its antline lights and the exit opens. The key move.
4. Left into the exit.

This takes 6 moves and no portal, the fewest (`--baseline`); 12 presses. The box can go down on (2, 3) from any side: from (2, 2), (1, 3) or (3, 3).

## Lure and where the player should get stuck

None: a teach chamber. What the player should notice is the ray turning at the box, at the start one row short of the receiver, and, with the box moved up one tile, into it.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The box resting in the ray at the start | A teach where the turn is met by chance: the turn is the first thing in view (guideline 25). Checked: with no box, unsolvable; with a plain box, unsolvable |
| 2 | The receiver on row 3, one row above the ray's turn at the start | Any other tile for the box: only (2, 3) turns the ray into the receiver. Checked: with the box kept off (2, 3), unsolvable |
| 3 | The emitter in the bottom wall, the receiver and the exit in the side walls | Chamber 10.1's frame, its emitter in the left wall firing along the middle row (guideline 113) |
| 4 | Every wall steel | Portals: nothing to shoot, so the chamber holds one new thing |

## Facts that must never be possible

- Finishing without the box on (2, 3): checked, unsolvable with the box kept off it.
- The subject standing in something blocked: checked, none among the 577 reachable states.
- A dead state: checked, all 577 can be finished.
- The box under the subject: nothing sends a box home here.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Lifting the box and putting it down off column 2 | The ray runs straight up column 2 into the top wall; the exit stays shut, its antline unlit |
| 2 | Putting the box down on (2, 1) | It turns the ray right along row 1 into the right wall |
| 3 | Putting the box back on (2, 2) | As at the start: the ray turns one row short of the receiver |
| 4 | Putting the box down on (1, 3), in front of the exit | It bars the exit until picked up again from (1, 2) or (2, 3) |
| 5 | Standing in the lit ray, in column 2 below the box or on row 3 between the box and the receiver | The receiver goes dark and the exit shuts until the subject steps out |

## Variants tried

- The first sketch, 6 × 6 with an empty top row, 1,025 states: trimmed to 6 × 5, since the row did nothing (guideline 99).
- An emitter in the left wall firing right along the middle row, a receiver in the top wall: dropped before the sketch for chamber 10.1's frame, its emitter at (0, 2) firing along the middle row with the box in the ray (guideline 113).

## Checks

- `npm run solve -- --baseline`: 6 moves and no portal, both searches; no portal wall side; key 12 bits. The macro search refuses it, as it does every chamber with a receiver.
- Every reachable state (577) explored through the rules' step with the game's presses (each move key a turn, or a move when the subject already faces that way): none dead, none with the subject standing in something blocked, none with a box under the subject.
- Copies: with no box, unsolvable; with the box made plain, unsolvable; with the box kept off (2, 3), unsolvable.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run random:walk`, `npm run lint` and `npm run build` pass. `npm run replay:check` and `npm run solver:check` pass with the recorded solution.
- Played in `npm run dev` with the Chrome tool, muted, 2026-11-24, at about 44 px tiles: the box's `/` reads clearly at the start, and the ray visibly ends one tile below the receiver; the route above completed it, the receiver, its antline and the exit lighting as the box went down on (2, 3); no console error.
- An independent check (a fresh agent with only the files of chambers 25 and 26 and their plan entries, not these notes) found no shortcut, no dead end and nothing that looks broken: with the box never resting on (2, 3), all 532 states are dead; the near miss at the start is the clue, and every player sees it; chamber 10.1's habit, lifting the box out of the ray, fails plainly, the ray running up column 2 into steel; the slant reads physically, the receiver's face is right, the antline runs over steel only. Its one note: the chamber can be stumbled into, lifting the box from (2, 1), stepping up and putting it down ahead, and no later chamber tests aiming, since in 11.2 the button picks the mirror's tile. Answered: a teach may be stumbled through (guideline 24); the test that would have checked it was cut on purpose (the idea pool, "Sketched for a run").

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept, and liked. Their recorded run lifts the box from its right, from (3, 2), not from below, steps up to (3, 3) and puts it down on (2, 3) facing left: the ray turns into row 3 and ends on the subject until it steps down; then left along row 2 across the lit column 2 (the exit shutting and opening again), up to (1, 3) and into the exit (8 moves and no portal; the fewest is 6). The key move is the intended one; earlier tries, if any, leave no trace in a recording. Recorded as `chamber_25.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
