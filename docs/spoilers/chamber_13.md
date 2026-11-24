# Chamber 13 (run 6, chamber 6.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: kept by the author on 2026-11-24, after their cold play; their cold run its recorded solution. File: `src/chambers/chamber_13.json`, thirteenth in the play order; permanent id 13. Designed together with chamber 6.2 (id 14), both before the author plays either (the author's call, 2026-11-24, as for runs 2 to 5).

## Entry

Run 6, chamber 1, teach, and the run's first chamber. Elements: a fizzler, a box, a button and the exit, with an antline; steel is known from run 1. The player knows runs 1 to 5. It should teach that the subject walks through a fizzler that is on, and that a box carried into one breaks up and goes back to its start, so a box sent home from elsewhere is not lost (carried from runs 4 and 5). Hint: none (convention 7).

## Layout

7 × 4, every wall steel, so no portal opens anywhere. A Z: the start's two-tile column on the left, a passage along the bottom row holding **B**, the button, with the box resting on it (its start), then the fizzler, and past it a two-tile column up to the exit, in the chamber's right wall.

```
y3  ■ ■ ■ ■ ■ ■ ■
y2  ■ S ■ ■ ■ . E
y1  ■ . . B F . ■
y0  ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `S` the subject's start (1, 2), facing down, `B` the button (3, 1), linked to the exit, the box resting on it, `F` a fizzler (4, 1), on, no link, spanning top to bottom between the steel above and below it, `E` the exit (6, 2), linked, so it starts as B holds it: open, the box on B.

One antline, B to the exit: (3, 1), (3, 3), (6, 3), (6, 2): up over the steel above B, along the top wall, turning on its corner and down into the exit from above. It runs over steel only, under no element.

## Idea

The box holds the exit open and bars the only way to it, and carried into the field it breaks up and flies home onto B, so the subject takes it through the field and the exit opens behind.

From the idea pool, where it was sketched with the run (`docs/campaign.md`, "Run 6 in detail"); its coordinates are the sketch's, each y one more than here:

> - **Run 6, chamber 1: the box that bars the way** (teach). 7 × 5, every wall steel, so no portal opens anywhere:
>
> ```
> y4  # # # # # # #
> y3  # S # # # . E
> y2  # . . B F . #
> y1  # . # # # . #
> y0  # # # # # # #
>     0 1 2 3 4 5 6
> ```
>
> `S` the start (1, 3), facing down; `B` the button (3, 2), the box resting on it (its start), linked to the exit; `F` a fizzler (4, 2), on, no link, spanning top to bottom between the walls above and below, a field across a doorway; `E` the exit (6, 3), linked, so it is open from the start, the box holding B. Antline: (3, 2), (3, 4), (6, 4), (6, 3), over the steel into the exit from above. Two columns joined by a passage: the box on B bars the passage's mouth, the field fills the next tile, and past it the way turns up to the exit.
>
> Idea: the box holds the exit open and bars the only way to it; carried into the field it breaks up and flies home onto B, so the subject takes it through and the exit opens behind. Route: down, right to (2, 2), facing the box; lift it (the exit shuts); right onto B's tile and right into the field (the box breaks up and lands on B; the exit opens); right to (5, 2), stopped by the wall; up, right, out. Every route walks through the field and sends the box home through it (the walks refusing either reach no completion): past B, the only tile facing B is the field, where a carried box can't be, so the box can't be put back from the far side, and a box left anywhere else leaves the exit shut. The lure: lifting the box and setting it aside, then walking through: the exit shuts as the subject steps off B, plain at once (guideline 4), and the box waits where it was left (guideline 28). A flow: its one step is seeing that the field puts the box back where it holds the exit (guideline 32: it looks as simple as it is). It forces the run's carried item, a box sent home from elsewhere, as no loss (guideline 28): idea 11, "Fizzle to respawn", in its smallest form, and idea 12's cheap failure turned into the answer. The field's shots and portals wait for 6.2.
>
> Broken on purpose: guideline 64, no box start beside a field. Once the box is home, a subject in the field that turns back to it and presses interact picks it up from inside the field, so it breaks up and lands where it lay, only its sounds showing it (a pickup that seems to fail). The idea needs the field right past B, since a floor tile there would let the box be put back from beyond, and the state is off the route, after the exit has reopened. Guideline 26: a held key carries the subject over B and through the field but stops it facing the wall at (6, 2), the box landing on B behind it and the exit opening up and to its right. Its first draft, a 2 × 3 room with a straight passage along the start's row to the exit, was chamber 3.2's footprint and antline (its third reviewer), and let a held key walk out before the box had landed; the bend fixes both, and the columns keep clear of 3.1's neck. _Check:_ 59 (B not beside the exit), 63, 65 (the box lands on B only while the subject is in the field), 67 (the box on B bars the passage, (2, 2) staying in reach), 70, 72 (the field's connectors on the walls above and below: check in the game), 112. Feasibility, 2026-11-24: 7 moves and 0 portals; all 181 reachable states can be finished, and all 114 without the turn key; the walks refusing every step that breaks up a carried box, or every step into the field, reach no completion. Its reviewer, on the straight draft, found no dead end and judged it slight but keepable, as 1.3 and 4.2 are as short.

Built from its sketch with its two tiles no route needs, (1, 1) and (5, 1) there, made steel and the row they left empty taken out: the one past the field read as a target (guidelines 15, 19 and 56; its reviewer).

## Purpose

Teach, and the run's carried item: a box sent home from elsewhere, as no loss (guideline 28), forced on every route before any chamber relies on it. Idea 11 of the idea pool, "Fizzle to respawn", in its smallest form.

Flow: one step, seeing that the field puts the box back where it holds the exit, in a chamber that looks as simple as it is (guideline 32).

## Intended route

1. Step down to (1, 1), right to (2, 1), facing the box; interact: lift it off B. The exit shuts and B's line goes dark.
2. Step right onto B's tile (the subject holds B: the exit opens), then right into the field: the box breaks up and flies home onto B, and the exit stays open.
3. Step right to (5, 1), stopped facing the wall; up to (5, 2); right, out.

Solver: 7 moves and 0 portals, both the fewest; the state walk's fewest presses (8) are this route, with or without the turn key.

## Lure and where the player should get stuck

The box bars the passage, so the first move is to lift it, and the exit shuts. The natural next try sets it aside, back in the left column, and walks through: the exit, open while the subject crosses B, shuts as it steps off B into the field, plain at once and within a few moves (guideline 4), and the box waits where it was left (guideline 28). Put back on B from (2, 1), the box opens the exit and bars the way again. A player who knows the field breaks a carried box sees it as a loss and holds back; where they should get stuck is seeing that the box broken up in the field lands on B, behind them, so the field does what the box can't, put it back from beyond.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The field on the tile right past B | Putting the box back on B from beyond: from a floor tile there, the subject would put it down facing back, the exit open, and walk on (with the field made floor, 7 moves by chamber 3.1's move, its reviewer); the field can't hold a subject carrying a box |
| 2 | The box's start on B, in the passage's one-tile mouth | Reaching the exit with the box left on B: it bars the only way |
| 3 | The exit linked to B, past the field | Walking out with the box set aside |
| 4 | The way turning up after the field | A held key walking out before the box has landed (guideline 26): it stops the subject facing the wall at (6, 1), the box landing behind and the exit opening in view |
| 5 | Every wall steel | Any portal: no route can cross the field or the passage another way |
| 6 | B not beside the exit | Guideline 59 |

## Facts that must never be possible

- Finishing without the box carried into the field. Checked: the walk refusing every step that breaks up a carried box reaches no completion.
- Finishing without walking into the field. Checked: the walk refusing it reaches no completion.
- The box under the subject. Checked: no reachable state has it.
- A dead state. Checked: all 113 reachable states can be finished, and all 46 without the turn key.

## Guidelines broken on purpose

- 64, no box start beside a field: B is beside the field. Once the box is home, a subject in the field that presses back (which only turns it, the box on B) and then interact picks the box up from inside the field, so it breaks up at once and lands where it lay, only its sounds showing it (a pickup that seems to fail: the game draws nothing for a box that ends where it started, `src/game/returned_boxes.ts`). The idea needs the field right past B (Restriction 1), and the state, one of 113, is off the route, after the exit has reopened. Accepted by the author with the plan, 2026-11-24.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Lifting the box, setting it aside, walking through | The exit opens as the subject crosses B and shuts as it steps into the field; the box waits where it was left |
| 2 | Putting the box back on B from (2, 1) | The exit opens, and the box bars the way again; walking into it only turns the subject |
| 3 | On B's tile with the box, interact facing the field | Refused, with the error sound: a box isn't put down where a fizzler is on |
| 4 | In the field after the send-home, back and interact | The box breaks up and lands back on B, only its sounds showing it (Guidelines broken on purpose) |
| 5 | Shooting | A miss ripple on the steel; in the field, nothing, without a sound: no wall anywhere takes a portal, so guideline 73 isn't broken, and this is the silent portal keys' first showing, where nothing is at stake (guideline 25) |

## Variants tried

- The sketch's first draft: a 2 × 3 room, the start in the middle of its left column facing right, and a straight passage along the start's row, B at its mouth, the field, then the exit at its end (7 × 5; 253 states, none dead, 5 moves and 0 portals). Its reviewer found it chamber 3.2's footprint and antline, and a held key walked out in about 0.6 s, before the box's 0.8 s flight home had landed (guideline 26). The bend after the field fixes both; the columns keep clear of 3.1's neck, a room with a neck below its middle bending into the door.
- The sketch as approved, 7 × 5, with a third tile in each column (181 states, 114 without the turn key, none dead; 7 moves and 0 portals): the tile past the field was reachable only there, where the box never goes, so it read as a target (its reviewer). Both made steel, and the empty row taken out.

## Checks

- `npm run solve -- --baseline --par`: 7 moves and 0 portals, both searches; 0 portal wall sides; key 10 bits.
- Every reachable state (113, one completed) explored through the rules' step: none dead, none breaking a fact above. With every turn action refused: 46 states, none dead.
- The walks refusing every step that breaks up a carried box, and every step into the field: no completion.
- The field spans top to bottom (checked in the rules), its connectors on the steel above and below.
- `npm run chamber:check` and `npm run smoke:engine` pass; `npm run lint` and `npm run build` pass.
- Not played in the real game: the Chrome extension wasn't connected, 2026-11-24.
- An independent check (a fresh agent with only the 7 × 5 file, the plan's entry and the earlier chambers' files and notes, not these notes) found no shortcut and no dead end: its own walk found 181 states, 114 without the turn key, none dead, 7 moves and 0 portals, and no completion when every step breaking up a carried box is refused; the box never rests past the field nor under the subject, and the key step sends it home with no button released, so the exit never flickers. Its findings:
  - Guideline 64 broken, defensible (above).
  - The flight home is one tile, onto the tile the subject just left, so "back to its start" looks like "thrown back out of the field" (guidelines 27 and 70); the layout can't avoid it, since the first field tile the box enters is beside its start. Answered in the outline: a long flight home is carried forward, shown before any route relies on a far start. 6.2's likeliest wrong try already shows a box landing on its start, not on the tile the subject left.
  - It may read as chamber 3.1, a box and its button in a one-tile way, the field on 3.1's put-down-from-beyond tile, its key move "keep walking" after the pickup, which can play as a thing that happens (guideline 113, cut 5.2's complaint). Left to the author's cold play, as 5.1 was.
  - The refusal of a box put down into the field (Near misses 3), one press from the key step, plain but able to strengthen the false belief above.
  - The two unused tiles: removed (Variants tried).
  - No problem with the field's orientation or the antline.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | 2026-11-24 | Kept: they liked it. Their recorded run is the intended route: down and right to (2, 1), the box lifted off B (the exit shutting), then right onto B (the exit opening) and into the field, the box flying home onto B and the exit staying open; right to (5, 1), where one more right press only meets the wall at (6, 1) (Restriction 4), then up and out (7 moves and 0 portals, both the fewest). The lure doesn't show in it; earlier tries, if any, leave no trace in a recording. Recorded as `chamber_13.solution.json` (Download solution) |
| 2 | Friends, cold | 2026-11-24 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded (guideline 105) |
