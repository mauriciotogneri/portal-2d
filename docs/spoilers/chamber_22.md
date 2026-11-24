# Chamber 22 (run 10, chamber 10.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-24 from its sketch, its start walled into a nook on its fresh reviewer's finding; checked and independently reviewed; kept by the author after their cold play, 2026-11-24; their solution is not recorded yet. File: `src/chambers/chamber_22.json`, twenty-second in the play order; permanent id 22. Run 10's first chamber (`docs/campaign.md`, "Run 10 in detail"). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 10, chamber 1, teach: the emitter's and the receiver's first contact. Elements: an emitter, a receiver, a box and the exit, with an antline; every wall steel. The player knows runs 1 to 9. It should teach that an emitter's ray lights the receiver it reaches, which opens what its antline leads to while lit; a box resting in the ray cuts it, and so does the subject standing in it. Hint: none (convention 7).

## Layout

5 × 5. The emitter **e** (0, 2) fires right along row 2 to the receiver **r** (4, 2), which listens left and links the exit **E** (2, 4), in the top wall. The box rests in the ray at (2, 2), so the receiver starts dark and the exit closed. The start (2, 1), a nook between steel, faces up at the box, so the only way out of it is up through the box's tile, in the ray; row 3, below the exit, is reached only across row 2.

```
y4  ■ ■ E ■ ■
y3  ■ . . . ■
y2  e . b . r
y1  ■ ■ S ■ ■
y0  ■ ■ ■ ■ ■
    0 1 2 3 4
```

`■` steel, `S` the subject's start (2, 1), in a nook, facing up, `b` the box (2, 2), `e` the emitter (0, 2), firing right, `r` the receiver (4, 2), listening left, linked to `E` (2, 4), closed while the receiver is dark.

One antline: the receiver to the exit, (4, 2), (4, 4), (2, 4): up from under the receiver over the right wall and left along the top wall into the exit, over steel only.

The ray crosses neither the exit nor its approach (2, 3) (guideline 92).

## Idea

The box cuts the ray; lifted out, the ray lights the receiver and the exit opens; then the way to the exit crosses the lit ray, so the exit shuts while the subject stands in it and opens again as it steps out.

Built from its sketch with (1, 1) and (3, 1) made steel, on its fresh reviewer's finding (Checks): open, they let a route cross the ray beside the box while it still cut it, then lift the box from above, so the lit receiver never went dark.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 10 in detail"), redrawn before approval on both proposal reviewers' findings (the idea pool, "Sketched for a run": its first draft, the box in a corridor, offered the subject's cut without forcing it, in chamber 9.1's frame):

> - **Run 10, chamber 1: the box in the light** (teach; an emitter, a receiver, a box, the exit). 5 × 5, every wall steel.
>
>   Idea: the box cuts the ray; lifted out, the ray lights the receiver and the exit opens; then the way to the exit crosses the lit ray, so the exit shuts while the subject stands in it and opens as it steps out.
>
>   Forced: the box out of the ray, and a step through the lit ray. Show, flow: the first thing in view. Risk: the crossing may be made carrying the box, so the subject alone cutting a ray is first forced in 10.2, where the receiver lights only as the subject steps out of the ray (its blind reviewer). _Check:_ 24 and 31 (one new element, in view of the start), 67 (the box put down on (2, 3) bars the exit; it is picked up from beside it), 92 (the ray crosses neither the exit nor its approach). Feasibility: 3 moves; all 330 states can be finished, and all 234 with the turn key refused; with the emitter off, unsolvable.

## Purpose

Teaching: the emitter, the receiver and the ray, the run's new element, alone (guideline 24). The box in the ray is the first thing in view (guideline 31), its start showing that a box stops a ray (guideline 12); the room's shape makes the walk to the exit cross the ray once it is lit, so the exit shutting and opening again shows that the receiver holds it only while lit, and that whatever stands in the ray cuts it.

Flow, a show chamber (guideline 32): the answer is the first thing in view.

## Intended route

1. Interact: the box is lifted out of the ray. The ray runs on to the receiver, which lights; its antline lights and the exit opens.
2. Up onto (2, 2), into the ray: the receiver goes dark, the exit shuts.
3. Up onto (2, 3), out of the ray: the receiver lights again, the exit opens.
4. Up into the exit.

This takes 3 moves and no portal, the fewest (`--baseline`); the turn key isn't needed. The box may be carried out or put down anywhere off the ray.

## Lure and where the player should get stuck

None: a teach chamber. What the player should notice is the exit shutting as the subject steps into the ray, two tiles from it, and opening as it steps out.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The start a nook, left only through the box's tile | Crossing the ray before the box is lifted, and lifting it from above: the receiver would never go dark once lit, leaving "while lit" and the cut only offered (guideline 108). Checked: as built, the receiver goes dark on every route |
| 2 | The box resting in the ray at the start | An exit open from the start: the ray reaches the receiver only once the box is lifted. Checked: with the emitter off, unsolvable |
| 3 | Every wall steel | Portals: nothing to shoot, so the first ray chamber holds one new thing |

## Facts that must never be possible

- Finishing with the box in the ray: checked, the receiver is dark whenever anything rests or stands in row 2.
- Finishing without the lit receiver going dark once: checked by its fresh reviewer, unsolvable.
- The subject standing in something blocked: checked, none among the 200 reachable states.
- A dead state: checked, all 200 can be finished.
- The box under the subject: nothing sends a box home here.

## Guidelines broken on purpose

None.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Pressing up at the start | Nothing: the box bars the nook's one way out; the ray ends on the box, the exit stays shut, its antline unlit |
| 2 | Putting the box back down in the ray, from the nook or beside it | The receiver goes dark and the exit shuts at once; from the nook, the box bars its one way out again until it is lifted |
| 3 | Putting the box down on (2, 3), in front of the exit | It bars the exit until picked up again from (1, 3) or (3, 3) |
| 4 | Standing in the ray, holding the box or not | The receiver goes dark until the subject steps out |

## Variants tried

- As sketched, with (1, 1) and (3, 1) open: a route could walk round the box through the ray while the box still cut it and lift it from above, so the lit receiver never went dark (its fresh reviewer). Made steel: 200 states, none dead.
- The first sketch, the box in a top corridor along the ray, joined at both ends to the bottom row, which held the start and the exit (the idea pool, "Sketched for a run"): redrawn before approval, since every route stood in the ray only while carrying the box and never crossed it lit (its blind reviewer, guideline 108), and its two rows joined round steel were chamber 9.1's frame (its handbook reviewer, guideline 113).

## Checks

- `npm run solve -- --baseline`: 3 moves and no portal, both searches; no portal wall side; key 10 bits. The macro search refuses it, as it does every chamber with a receiver.
- Every reachable state (200) explored through the rules' step: none dead, none with the subject standing in something blocked, none with a box under the subject. With every turn action refused: 127, none dead.
- Copy: with the emitter off, unsolvable.
- `npm run chamber:check`, `npm run smoke:engine`, `npm run lint` and `npm run build` pass. `npm run replay:check` fails only on the solutions not yet recorded.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the files of chambers 22 to 24 as built and their plan entries, not these notes) found no shortcut, no dead end and nothing that looks broken. Its findings:
  - The subject's cut wasn't forced: with (1, 1) and (3, 1) open, `left up up right down interact up` crossed the ray while the box still cut it and lifted the box from above, so the lit receiver never went dark. Answered: both made steel; checked, every route now darkens it, none dead.
  - Even so, the natural route crosses the ray carrying the box, so a player can read the cut as the box's; no layout with these elements was found that forces an empty-handed cut. Answered: 10.2 forces it (its receiver lights only as the subject, empty-handed, steps out of the ray), and the entry stands.
  - It doesn't read as an earlier chamber; the nearest frame is chamber 3.1's, a narrow room with the box between the start and the goal, whose lesson differs.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept. Their route isn't known until their solution is recorded (guideline 106) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, with no trouble, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
