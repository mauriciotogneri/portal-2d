# Chamber 14 (run 6, chamber 6.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-24, after their cold play; their run's solution is not recorded yet. File: `src/chambers/chamber_14.json`, fourteenth in the play order; permanent id 14. Designed together with chamber 6.1 (id 13), both before the author plays either (the author's call, 2026-11-24, as for runs 2 to 5). Until its solution is recorded, `npm run replay:check` and `npm run solver:check`, and so `npm run verify` and `npm run deploy`, fail on it.

## Entry

Run 6, chamber 2, test, and the run's last chamber. Elements: a fizzler, a box, a button, the exit and ditches, with an antline; walls and steel are known from run 1. The player knows runs 1 to 5 and chamber 6.1. It should teach that shots stop at a fizzler that is on, and that walking into one closes both portals. Hint: none (convention 7).

## Layout

7 × 5. A column across the middle, a ditch, the fizzler, a ditch, splits the near side (2 × 3, left), where the subject starts in the middle row facing right with the box below-right of it and the exit in the left wall's bottom row, from the far side (2 × 3, right), where **B**, the button, stands in the middle row right in front of **Y**, a plain face in the right wall. **X**, a plain face, is in the left wall's top row. Every other wall is steel.

```
y4  ■ ■ ■ ■ ■ ■ ■
y3  X . . ~ . . ■
y2  ■ S . F . B Y
y1  E . b ~ . . ■
y0  ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `X` a plain wall (0, 3), `Y` a plain wall (6, 2), `S` the subject's start (1, 2), facing right, `b` the box (2, 1), `~` open ditches (3, 3) and (3, 1), `F` a fizzler (3, 2), on, no link, spanning top to bottom between the ditches, `B` the button (5, 2), linked to the exit, `E` the exit (0, 1), linked, so it starts closed.

The faces: **X**, the east face of (0, 3), and **Y**, the west face of (6, 2), the only two. The near side sees X; the far side sees X over the upper ditch and Y, behind B.

One antline, B to the exit: (5, 2), (5, 0), (0, 0), (0, 1): down under (5, 1), along the bottom wall, turning on its corner and up into the exit from below.

## Idea

The near side sees no face past the field, so the pair that carries the box over is made from the far side and the subject comes back through it, not through the field; the box on B then shuts that pair, so the way back to the exit is through the field, which closes both portals.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 6 in detail"):

> - **Run 6, chamber 2: the pair from past the field** (test). 7 × 5:
>
> ```
> y4  # # # # # # #
> y3  X . . ~ . . #
> y2  # S . F . B Y
> y1  E . b ~ . . #
> y0  # # # # # # #
>     0 1 2 3 4 5 6
> ```
>
> `X` a plain wall (0, 3); `Y` a plain wall (6, 2); `S` the start (1, 2), facing right; `b` the box (2, 1); `~` ditches (3, 3) and (3, 1); `F` a fizzler (3, 2), on, no link, spanning top to bottom between the ditches; `B` the button (5, 2), right in front of Y, linked to the exit; `E` the exit (0, 1), linked. Antline: (5, 2), (5, 0), (0, 0), (0, 1): down under (5, 1), along the bottom wall and up into the exit. The near side (2 × 3) holds the subject, the box and the exit, and sees one face, X; the far side (2 × 3) holds B and sees X over the upper ditch and Y, its own face, behind B. The field is the subject's one way across.
>
> Idea: the near side sees no face past the field (the start's row, the line to Y, stops at the field; rows 1 and 3 end on the exit and steel), so the pair that carries the box over is made from the far side, and the subject comes back through it, not through the field; once the box is on B, in front of Y, that pair is shut, and the way back to the exit is through the field, which closes both portals. Route: right through the field to (4, 2); shoot Y from (4, 2) or (5, 2); shoot X along row 3 from (4, 3) or (5, 3); walk into Y from B's tile and out of X onto (1, 3); fetch the box; carry it into X and out of Y onto B, facing left; step left to (4, 2), turn back and put the box down on B (the exit opens); walk left into the field (both portals close) and out. Forced (each walk refusing it reaches no completion): walking through the field; a crossing; Y shot from (4, 2) or (5, 2), and X from (4, 3) or (5, 3); walking into the field with a portal open, the closing as no loss. Offered on the likeliest wrong tries: the first shot from the start, straight at Y, stops at the field; walking back through the field before carrying the box closes the pair; a box carried into the field flies home (6.1). The turn key puts the box on B (run 3).
>
> Broken on purpose: guideline 73, no field where the player would aim. The field is the only tile on Y's line on the near side's way across, and the first walk enters it facing Y, so a portal key pressed there does nothing, without a sound. It is met where nothing is at stake, one step from a tile where the shot works, as guideline 25 wants for a rule that looks like a bug, and a field off Y's line would leave "shots stop at it" unforced. Its drafts: the first had the exit on the far side and B beside the field, and offered the portals closing without forcing it (its reviewers); one with Y off the field's line kept guideline 73 and left the stopped shot unforced; moving the exit to the near side, with B right in front of Y, forces the walk back through the field with both portals open. Risks: its frame echoes chamber 1.1 (two sides split by a full-height column, a face on each side wall): if the author's play says so, reshape it, as an L as 4.1 did, not the rules (its third reviewer); the field between two ditches has its connectors on ditch edges, not walls: check the look in the game (guideline 72); a crossing refused onto a box parked in front of X (guideline 9, rare). _Check:_ 59, 60 (B, in front of Y, links only the exit), 64 (the box's start is off the field's neighbours), 67 (the box on B shuts Y on purpose; parked in front of X it shuts X, recoverable through the field), 75 (two faces), 78 (the far side's way back is the field), 112. Feasibility, 2026-11-24: 14 moves and 2 portals, both the fewest; all 3,459 reachable states can be finished, and without the turn key none, since the box goes down on B only with a turn; copies with X steel or Y steel are unsolvable from `--par`; with the field made floor, 8 moves and 0 portals.

Built as its sketch, tile for tile.

## Purpose

Test: the fizzler's shots and portals, which 6.1, with no face anywhere, doesn't show. Every route makes the pair from past the field, and walks into the field with both portals open, as no loss. Idea 10 of the idea pool, "Set your portals first", in a relative: the portals set from past the field, not from a tile whose lines miss it.

Gem: one key move, making the pair from the far side and coming back through it, with a carry after it and a walk out.

## Intended route

1. Walk right through the field to (4, 2); shoot blue right, over B, onto Y.
2. Step up to (4, 3); turn left in place and shoot orange, over the upper ditch, onto X. The key move: the pair from past the field.
3. Step down to (4, 2) and right onto B (the exit opens while the subject stands there); walk right into Y and out of X onto (1, 3), facing right.
4. Step right to (2, 3) and down to (2, 2), facing down; interact: pick up the box.
5. Walk up to (2, 3), left to (1, 3), and left into X: out of Y onto B, facing left.
6. Step left to (4, 2), turn right in place and interact: the box goes down on B and the exit opens; its line lights.
7. Walk left into the field (both portals close), on to (1, 2), down to (1, 1) and left, out.

This route takes 18 moves and 2 portals. Solver: 14 moves and 2 portals, both the fewest, by fetching the box first and leaving it at (2, 3), next to where the crossing sets the subject down; the state walk's fewest presses (24) are that route. The turn key puts the box on B, so with it refused the chamber can't be finished.

## Lure and where the player should get stuck

From the start the subject faces Y, the only far face, straight ahead past the field, and the first shot stops at the field with a miss ripple, plain at once (guideline 4). Stepping into the field and shooting again does nothing, without a sound, one tile from where the shot works (Guidelines broken on purpose). Carrying the box straight at the field breaks it up, and it flies home, as 6.1 showed. The near side's only face is X, so a pair can't be made from there, and X shot first closes as the subject walks into the field. On the far side, a player who shoots both faces and then walks back through the field closes them: plain at once, and nothing lost but the shots. Where the player should get stuck is seeing that the pair has to be made past the field and walked back through.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The field on the start's row, between Y and the near side | Shooting Y from the near side: every route shoots it from (4, 2) or (5, 2) (the walk refusing both reaches no completion) |
| 2 | X the near side's only face, and seen from the far side over the upper ditch | A pair made from the near side; and the far side always has a face that brings it back to the near side (guideline 78) |
| 3 | Rows 1 and 3 ending on the exit and on steel on the far side's wall | The near side seeing a far face over a ditch |
| 4 | B right in front of Y, and the exit on the near side | Walking back to the exit through the pair once the box is on B: the walk refusing every step into the field with a portal open reaches no completion |
| 5 | The box's start (2, 1) off the field's neighbours | A box picked up from inside the field on its start (guideline 64) |
| 6 | Every other wall steel | Faces the idea doesn't need (guidelines 56 and 75) |
| 7 | B, in front of Y, linked only to the exit | Guideline 60 |

## Facts that must never be possible

- Finishing without a crossing. Checked: the walk refusing every crossing reaches no completion.
- Finishing without a shot onto Y from past the field, or onto X from the far side's top row. Checked: the walks refusing every shot from (4, 2) and (5, 2), or from (4, 3) and (5, 3), reach no completion.
- Finishing without walking into the field with a portal open. Checked: the walk refusing it reaches no completion.
- Finishing with X and Y copies as steel. Checked: both copies are unsolvable from `--par`.
- The box under the subject. Checked: no reachable state has it.
- A dead state. Checked: all 3,459 reachable states can be finished.

## Guidelines broken on purpose

- 73, no field where the player would aim: the field is the only tile on Y's line between the near side and Y, and the first walk enters it facing Y, so a portal key pressed there does nothing, without a sound. Met where nothing is at stake, one step from a tile where the shot works, as guideline 25 wants for a rule that looks like a bug; with the field off Y's line, "shots stop at it" would go unforced. Accepted by the author with the plan, 2026-11-24.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting at Y from the start | A miss ripple at the field |
| 2 | Stepping into the field and shooting | Nothing, without a sound (Guidelines broken on purpose); one step on, the shot works |
| 3 | Carrying the box into the field | It breaks up and flies home to (2, 1); both portals close |
| 4 | Shooting X first, then walking into the field | X's portal closes; it can be shot again from the far side |
| 5 | Making the pair on the far side, then walking back through the field | Both portals close; walking over again and shooting again restores them |
| 6 | The box put down in front of X | Nothing crosses onto that tile while it rests there; the field brings the subject back to pick it up |
| 7 | Standing on B | The exit opens while the subject stands there and shuts on the step off |
| 8 | Shooting the steel | A miss ripple |

## Variants tried

- The sketch's first draft: the exit in the far side's right wall and B beside the field (10 moves and 2 portals; 3,463 states, none dead, 1,663 without the turn key). It offered the portals closing but forced none of it, since no route walks into the field with a portal open (its reviewers).
- Y in the far side's top wall, off the field's line, B under it: guideline 73 kept, but every line from the near side then ended on steel, so the stopped shot went unforced (10 moves and 2 portals; 3,463 states, none dead).
- This one: the exit moved to the near side, with B right in front of Y, which forces the walk back through the field with both portals open.

## Checks

- `npm run solve -- --baseline --par`: 14 moves and 2 portals, both searches; 2 portal wall sides; key 16 bits.
- Copies with X steel or Y steel: unsolvable from `--par`. With the field made floor: 8 moves and 0 portals.
- Every reachable state (3,459, three completed) explored through the rules' step: none dead, none breaking a fact above. With every turn action refused: 1,661 states, none completed (the turn key puts the box on B).
- The walks refusing every crossing, every shot onto Y from past the field, every shot onto X from the far side's top row, and every step into the field with a portal open: no completion.
- The field spans top to bottom (checked in the rules), its connectors on the ditches above and below; how that looks is unchecked in the game (guideline 72).
- `npm run chamber:check` and `npm run smoke:engine` pass; `npm run lint` and `npm run build` pass.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the file, the plan's entry and the earlier chambers' files and notes, not these notes) found no shortcut and no dead end: its own walk found 3,459 states, none dead, and, with the turn actions refused, 1,661 and no completion; 14 moves and 2 portals; every route shoots both faces from past the field, crosses back by portal and carries the box through the same pair (the walks refusing either far-side shot, or the crossing back without the box, or the one with it, reach no completion). Its findings:
  - It may read as earlier chambers (guidelines 108 and 113): every route meets the new rules only as the way round them, the shot stopping at the field is offered (the start faces Y, so the first press likely shows it), and the walk into the field with both portals open comes, on the shortest routes, only on the way out, when nothing is at stake; a player who walks across first and shoots both faces from there plays 1.1's shot over a ditch, 1.4's and 2.4's carry back through the portal come out of, and 3.1's put-down after a turn. Two lures bite, plainly and within a few moves: X shot before the first walk through the field, and walking back through it after shooting. Left to the author's cold play. Starting the subject past the field made the route that avoids them shorter, so not tried further.
  - Guideline 73 broken, defensible as the run's deliberate break (above): reachable in 48 states, likeliest right after a shot is seen stopping at the field.
  - The turn key on every route, for the last put-down only: the subject comes out onto B facing left, so a reflex interact puts the box on (4, 2), from where it is picked straight back up (guideline 66, allowed since 3.1).
  - A crossing refused onto the box left at (1, 3), in front of X (Near misses 6): reachable in 8 states, guideline 67 kept by the field's second way in; guideline 9, low.
  - A box picked up from inside the field breaks up at once and flies home (2 states): reachable, as the run's paragraph lists among the refusals no route can be made to meet.
  - The field's connectors face the ditches, the first time they don't face walls: to check in the game (guideline 72).
  - Both portal rules are first met here, in a test, 6.1 having no face (guidelines 25 and 28): mild, since shooting again from the far side recovers.
  - At a glance it resembles chamber 1.1, two small rooms split by a barrier column and a face on each side; the faces are in other rows and the route differs. Low.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept: they liked it. Their route isn't known until their solution is recorded (guideline 106) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
