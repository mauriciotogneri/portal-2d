# Solver

A program that searches the states a chamber can reach, to prove it can be finished and to find its par (the fewest moves, the fewest portals). It was built as stage 02's prototype, which stopped on 2026-11-08: it is too slow on the large chambers (Playground 2 to 4, outside the campaign) for what was planned on top of it (see [Why it stopped](#why-it-stopped)). The code stays, runs under Node by hand, and its check runs in `npm run verify`, so it keeps working as the rules change. This file is what the stage learned, and what a revisit would start from. A chamber the solver can't handle is solved by hand instead (`docs/solving_by_hand.md`). The records below name the chambers as they were then: chamber 0, the tutorial, is now Playground 12, and chamber N, 1 to 9, is now Playground N + 1.

## Running it

| # | Command | What it does |
|---|---------|--------------|
| 1 | `npm run solve [chamber files]` | Prints each chamber's size (tiles, portal wall sides, flags, boxes, buttons, the state's values, a rough upper bound on its states, its key's width); every chamber in `src/chambers/` (the campaign's) when no file is given, so a playground chamber only when its file is named. A chamber whose key would need more than 64 bits fails there (Playground 1 needs 79). `--baseline` adds the reference search for both pars, `--solvable` the macro search for any route, `--par` the macro search for both pars; each prints its result, states, effort, time and route, a macro search also its peak memory, and a macro route is replayed through the rules; on a chamber with a receiver, each macro search prints that it refused and why. `--max-states=` (default 1,000,000) caps each search, and `--max-seconds=` (default 300) each macro search |
| 2 | `npm run solver:check` | Part of `npm run verify`: everything under [How it's checked](#how-its-checked), in about 5 seconds |
| 3 | `npm run state-set:bench` | By hand: seeded random keys into the state set, each found again with its parent and action, then as many other keys checked absent, with the time and memory. `--keys=` (default 10,000,000) and `--seed=` (default 1). Fails when a key is lost or comes back wrong, an absent key is found, or the set's arrays take more than 250 MiB |

The large chambers (Playground 2 to 4) need `--max-states=40000000` to search for 5 minutes without running out of room.

## How it works

The ground rule: every rule effect comes from the rules' own `step` (`src/game/rules/step.ts`); the solver never copies a rule. Where it needs to ask the rules something without taking a step, the rules export the check they use themselves: `allowsWay`, `canEnter` and `boxBlocksEntry` (walking), `shotStop` (where a shot stops), `portalEntrance` (the portal a move into a wall enters, in `src/game/rules/portals.ts`, which the step shares with the rays), `canInteract` (whether the interact key can do anything, facing a way), `canInteractInPlace` (whether something on the subject's tile takes the key, whatever way it faces) and `putDownTile` (where the key puts a carried box down, facing a way). Unpacking a key asks the rules where the rays run with `traceRays` (`src/game/rules/rays.ts`), as the step does to judge each receiver. Every shortcut the solver takes but the limited box drops is compared with the real step by the solver check.

The pieces, in `src/solver/`:

- **Chamber index** (`chamber_index.ts`): numbers every tile that isn't wall, and every wall side a portal can ever open on: a wall's, or a blocked wall's that a link reaches or that starts unblocked, but never one facing a door or the exit, or behind a laser's or a light barrier's end plate or a fizzler's connector, nor any face of an emitter or a receiver.
- **State key** (`state_key_codec.ts`): a settled state packed into 64 bits from those numbers: the subject's tile and facing, the carried box, each portal (closed or a wall side), each box's tile (a mirror box's too, its mirror fixed by the chamber; a box that starts absent, or that a link reaches, which being destroyed leaves absent, has one more value, for absent, which can widen its field by a bit), one bit per switch for its used flag (a switch stays used from its first use until the chamber is loaded again), and one bit per blocked flag (one per element a button's, switch's or receiver's link reaches, a turnable arrow or an emitter among them). It leaves out what settling decides: each button's pressed flag, each receiver's lit flag (worked out on unpacking by tracing the rays, which don't depend on it), the carried box's tile (the subject's) and the completion (the subject on the exit). Rays are never stored, so they add nothing. Playground 2 to 4 need 50–54 bits; Playground 1, the playground for trying every element, needs 79, so the solver refuses it.
- **State set** (`state_set.ts`): keys in typed arrays of a capacity fixed up front, numbered in the order added, each with the entry it was reached from, so a route can be rebuilt. 10 million keys go in in 1.7 s and are found in 2.1 s, in 188 MiB.
- **Cost queue** (`cost_heap.ts`): a binary heap that gives back the cheapest queued state first, for the reference search and the macro search's cheapest-first modes.
- **Reference search** (`baseline_search.ts`, run by `--baseline`): every action from every state, cheapest first (Dijkstra), with none of the macro search's shortcuts. Exact and slow (about 35,000 states a second on a real chamber); it is the reference the macro search is checked against on the tiny chambers.
- **Macro search** (`macro_search.ts`): one step is a whole walk, then one action that a walk can't do: interact (once when something on the tile takes it, or else each way that faces a box in reach), a shot each way the subject may face, or a move a walk doesn't cover (onto or off an event tile, into a resting box, which only turns the subject, into a portal). Turning is free, so a state is stored with the subject facing its tile's canonical way (the first way it may move there for the state's blocked flags, which on an arrow is the way it points now). Three modes: any route (breadth first, stops at the first completed state), fewest moves and fewest portals (cheapest first on moves then portals, or the reverse). The route found is turned back into key presses (`macro_route.ts`) and replayed through the rules, and must reach every state the search stored along it. It refuses a chamber with a receiver (`macroSearchRefusal`): its walks, shot lines and regions assume walking changes nothing but the subject's tile, facing and carried box, and the subject cuts a ray by walking into it. The reference search, which takes every action through the rules, still runs there.
- **Macro action** (`macro_action.ts`): packs one macro step (the tile walked to, the way faced before a shot or an interact, the action) into one number, stored with each state the macro search keeps and turned back into key presses by `macro_route.ts`.

The shortcuts the macro search takes, in its three modes (the reference search takes none):

| # | Shortcut | File | Exact? | Used by | What it does |
|---|----------|------|--------|---------|--------------|
| 1 | Walks | `walk_graph.ts` | Yes | Every mode | Where the subject can walk changing only its tile, facing and carried box, built once per set of blocked flags, and so are each tile's ways the subject may move and its canonical facing, since a link can turn an arrow; a walk skips the tiles where a box rests, but its own start. A walk never steps onto an event tile, one whose element reacts to the subject entering or leaving it (buttons, fizzlers, the exit, and slide floors, where a move may slide on past the next tile), and goes nowhere from one: stepping onto or off one is an action of its own |
| 2 | Shot lines | `shot_lines.ts` | Yes | Every mode | Tiles whose shot a way stops at the same tile share one result: the first takes the shot through the rules, the others reuse it with only the subject's tile changed. Not on tiles where the subject can be kept from shooting (fizzlers) |
| 3 | No-op skips | `action_filter.ts` | Yes | Every mode | An interact or a move that the rules' own checks show can't change anything but the facing isn't taken through the rules, nor an interact each other way where something on the tile takes the key, which acts the same whatever way the subject faces. While a box is carried, interact is taken once per tile the box lands on: each way whose tile faced takes it. An interact they don't rule out is taken even when it changes nothing (a switch refusing a carried box) |
| 4 | Regions | `walk_graph.ts`, `macro_route.ts` | Yes | Any route | The subject is stored on its region's smallest tile: the tiles it can walk between both ways (one-way arrows make "the tiles a walk reaches" wrong), built once per set of blocked flags and of tiles where boxes rest. A shot line gives one state per region. The route's counts are taken from the actions it expands to |
| 5 | Limited box drops | `action_filter.ts` | No, a guess | Any route | A carried box is put down only on a button or at its start, or by the subject standing next to any other box, on or next to a fizzler or a switch, or in front of either portal while both are open. Since shooting takes free hands, a route that puts the box down just to shoot from somewhere else is missed too. So is a route that puts a box down on a door, a ditch, a laser, a light barrier or a fizzler that a button holds open, so that releasing the button sends the box back to its start. In an unusual layout (a one-way arrow right before a switch, say) it could miss every route; a wrong "unsolvable" would show, since every catalogue chamber has a recorded solution |

## How it's checked

`npm run solver:check` (`scripts/check_solver.ts`), part of `npm run verify`, prints a line for each chamber and each tiny chamber and fails on any of these:

- **The key.** Every state along each chamber's recorded solution (only the campaign's chambers have one: today those of Chambers 1 to 12) and along 100,000 seeded random steps packs into the key and unpacks unchanged. A key that would need more than 64 bits is refused (checked on made-up counts, 2^20 tiles and wall sides, not on a chamber).
- **The shortcuts against the rules' step.** From every state along the recorded solutions and every state the reference search finds on the tiny chambers, with the ways and canonical facings for each state's blocked flags:
  - each walk the walk graph allows gives the state the solver builds, and no move it leaves out (one into a resting box among them) lands on the plain tile next to the subject;
  - each turn gives the state the solver builds for that facing, or changes nothing where the subject may not move that way (on an arrow, any way but the one it points);
  - each shot from each tile a walk reaches, each way the subject may face there and each colour, gives the state the solver builds from the shot it shares with its line;
  - each move the solver skips as changing nothing changes nothing but where the subject faces, and so does each interact it skips, each way the subject may face, unless it gives what an interact the solver takes there gives; the drops the limited box drops leave out aren't checked, since they do change the state;
  - a tile a walk reaches is in the region of the tile the walk started from exactly when a walk from it gets back, and no tile of a region is smaller than the tile the region is numbered by.

  On a chamber with a receiver, which the macro search refuses, only the key's round trip runs: the walk, shot, skip and region checks are skipped, and the chamber's line says why.
- **The searches.** On every tiny chamber, the reference search and the macro search find both hand-counted pars, the macro search also finds a route in its any-route mode, and every route replays through the rules to the counts found (each search capped at 1,000,000 states, a macro search at 60 s). Every state the reference search found survives the key with a key of its own, so no two of them share one.

The tiny chambers are in `scripts/solver_fixtures/` (`solver_fixtures.ts` lists them with their routes): walking through a portal, carrying a box through a portal, a box held on a button, a switch across a laser, a fizzler that destroys a carried box, a one-way arrow trap, putting a box down to use a switch, an arrow a switch turns for good, an arrow a button turns back under the subject, a box that starts absent until a switch brings it in, and a box a switch links, which a fizzler leaves absent until the switch brings it back. Each has a fewest-moves and a fewest-portals route counted by hand, never by a search, with a short argument for why each count is the least, and `npm run replay:check` plays both routes on the chamber loaded with the layout checks, each of which must complete with its pinned counts and final hash.

## What was measured

All in Node 24 on the author's machine (8 cores), one search at a time unless said otherwise.

The old tutorial, now Playground 12, under the rules as they stood on 2026-11-22 (`npm run solve -- --solvable --par src/dev/playground/playground_12.json`, at the default caps of 1,000,000 states and 300 s a search), the only chamber searched since the prototype stopped:

| # | Search | Result | States kept | Expanded | Time | Peak memory |
|---|--------|--------|-------------|----------|------|-------------|
| 1 | any route | solved: 57 moves, 4 portals | 187,740 | 176,382 | 27.6 s | 154 MiB |
| 2 | fewest moves | solved: 19 moves, 8 portals | 717,831 | 639,125 | 230.9 s | 257 MiB |
| 3 | fewest portals | gave up (time) | 762,120 | 701,376 | 300 s | 265 MiB |

Its recorded solution takes 33 moves and 6 portals, so the fewest-moves route is 14 moves shorter, and the any-route search found one with 2 fewer portals. Neither route has been looked at for a shortcut the design didn't intend.

Size of the problem, as the chambers were on 2026-11-21 (`npm run solve`), when chambers 1 to 9 were still in the campaign. The upper bound is tiles × 4 facings × (wall sides + 1)² for the portals × (tiles + 1)^boxes for the boxes × 2^flags (since switches stay used, `npm run solve` also multiplies it by 2^switches and adds a bit per switch to the key, so a chamber with a switch now shows a higher bound and a wider key than here):

| # | Chamber | Size | Tiles | Portal wall sides | Flags | Boxes | Buttons | Upper bound | Key bits |
|---|---------|------|-------|-------------------|-------|-------|---------|-------------|----------|
| 1 | 0, the tutorial | 12×10 | 61 | 58 | 2 | 1 | 2 | ~10^8.3 | 29 |
| 2 | 1 | 20×20 | 252 | 187 | 6 | 2 | 5 | ~10^14.2 | 50 |
| 3 | 2 | 23×13 | 185 | 161 | 9 | 2 | 2 | ~10^14.5 | 53 |
| 4 | 3 | 23×17 | 241 | 165 | 5 | 2 | 4 | ~10^13.7 | 49 |
| 5 | 4 | 13×9 | 65 | 61 | 0 | 0 | 0 | ~10^6.0 | 21 |
| 6 | 5 | 9×13 | 40 | 36 | 0 | 0 | 0 | ~10^5.3 | 20 |
| 7 | 6 | 10×7 | 27 | 28 | 1 | 0 | 0 | ~10^5.3 | 18 |
| 8 | 7 | 10×9 | 36 | 44 | 2 | 1 | 2 | ~10^7.6 | 29 |
| 9 | 8 (a receiver: the macro search refuses it) | 9×7 | 33 | 27 | 1 | 0 | 0 | ~10^5.3 | 19 |
| 10 | 9 (a receiver: the macro search refuses it) | 9×7 | 33 | 27 | 1 | 0 | 0 | ~10^5.3 | 19 |

The searches below ran on 2026-11-08 and are a record, not today's figures; the recorded solutions they mention were deleted when those chambers left the campaign (git history keeps them). The chambers' barriers have since become blocked walls; their floor tiles then still counted as tiles (262, 189 and 268, with a key of 52–53 bits), but nothing could stand on them, so that only renumbered the states. The rules have changed too (shooting takes free hands, and a tile holds one box, both 2026-11-15; the walls beside a door or the exit, and those behind a laser's or a light barrier's end plate, take no portal, which also left fewer wall sides to number, and a fizzler switching on closes a portal facing it, both 2026-11-16; the walls behind a fizzler's connector take no portal either, 2026-11-21, which left chamber 1 four fewer wall sides and chamber 3 two), which changes the states a chamber can reach.

States expanded in 5 minutes as the shortcuts were added (the par searches don't use regions or limited drops):

| # | Chamber | Search | Walks only | + shot lines, regions | + no-op skips | + limited drops |
|---|---------|--------|------------|-----------------------|---------------|-----------------|
| 1 | 1 | any route | 308,160 | 1,564,928 | 1,952,960 | 1,996,352 |
| 2 | 1 | fewest moves | 346,496 | 755,456 | 1,072,448 | — |
| 3 | 2 | any route | 662,208 | 2,000,384 | 2,988,288 | 3,077,760 |
| 4 | 2 | fewest moves | 737,344 | 1,438,592 | 2,409,408 | — |
| 5 | 3 | any route | 1,144,896 | 1,665,408 | solved in 211 s | solved in 110 s |
| 6 | 3 | fewest moves | 1,019,008 | 1,553,280 | 2,487,616 | — |

The solver as it stood (`npm run solve -- --solvable --par --max-states=40000000 --max-seconds=300`, 2026-11-08):

| # | Chamber | Search | Result | States kept | Expanded | Time | Peak memory |
|---|---------|--------|--------|-------------|----------|------|-------------|
| 1 | 1 | any route | gave up | 2,062,500 | 1,996,352 | 300 s | 537 MiB |
| 2 | 1 | fewest moves | gave up | 2,124,927 | 1,176,640 | 300 s | 613 MiB |
| 3 | 1 | fewest portals | gave up | 2,767,380 | 1,232,576 | 300 s | 628 MiB |
| 4 | 2 | any route | gave up | 4,632,844 | 3,077,760 | 300 s | 628 MiB |
| 5 | 2 | fewest moves | gave up | 3,988,349 | 2,247,744 | 300 s | 671 MiB |
| 6 | 2 | fewest portals | gave up | 3,857,234 | 2,220,224 | 300 s | 671 MiB |
| 7 | 3 | any route | solved: 166 moves, 26 portals | 1,131,692 | 1,131,690 | 110 s | 624 MiB |
| 8 | 3 | fewest moves | gave up | 2,845,748 | 2,328,768 | 300 s | 629 MiB |
| 9 | 3 | fewest portals | gave up | 2,705,013 | 2,064,768 | 300 s | 629 MiB |

What the numbers say:

- Chamber 3's any-route search expanded all but 2 of the states it kept, so 1.13 million is close to all its any-route states. Its route (166 moves, 26 portals) isn't optimal: the solution recorded then took 121 and 28 (recorded again on 2026-11-18, it took 216 and 40, until it was deleted when the chamber left the campaign).
- Given 10 minutes (all three chambers at once, which slows each by about 25%), chamber 1 kept 6,151,720 states with 2,366,824 still waiting (66,148 at 5 minutes), and chamber 2 kept 6,988,696 with 2,369,944 waiting (1,555,084 at 5 minutes). Both keep growing past five times chamber 3's total.
- Every box drop in chambers 1 and 2's solutions recorded then was one the drop limit allows, so it isn't what keeps them from finishing. Since shooting takes free hands (2026-11-15), chamber 2's solution as recorded then (97 moves, 16 portals; recorded again on 2026-11-18, at 147 and 28) also put the box down twice just to shoot, where the limit doesn't allow it, and chamber 3's any-route search finds 187 moves and 25 portals instead (1,124,333 states kept, 139 s, 286 MiB, with `--max-states=3000000 --max-seconds=240`, run again 2026-11-15 after a tile came to hold one box, which changed neither the route nor the states).
- Where the time goes: shots are 88–92% of the rules' steps (34–67 first shots on a line per expanded state), at 270,000–450,000 steps a second. A 15-second profile of chamber 1's any-route search (before the no-op skips) put 45% of the time in the rules' step and 27% in packing states into keys and back.
- Run-to-run noise is about ±10% on the states expanded in 5 minutes.

Earlier, on the original rules (since deleted), two throwaway searches failed: a breadth-first search over single presses found nothing in chamber 2 after 2.75 million states (49 presses deep), and one that treated walking as free and searched over world-changing actions reached 13 actions deep before portal pairs times box positions blew up; each chamber needs 20–40 such actions.

## Why it stopped

The prototype had to pass these before anything was built on it:

| # | Test | Pass | If it fails |
|---|------|------|-------------|
| 1 | Node: any route on each current chamber | ≤ 60 s, ≤ 2 GB | Stop after the prototype |
| 2 | Node: both pars on each current chamber | ≤ 60 s, ≤ 2 GB | Keep the solvability check, drop par |
| 3 | Browser worker: the next move to the next milestone, from a mid-game state | ≤ 1 s for 95% of states, ≤ 256 MB | No live next-move hints, no dead-end warning |
| 4 | Node: any route on a 12×12 chamber with one box | ≤ 2 s | No generated chambers |

Test 1 failed: chamber 3 took 110 s, and chambers 1 and 2 hadn't finished after 10 minutes, past 6 million states each, so passing would take well over 10× more speed. Test 2 failed with it (no par search finished in 5 minutes). Tests 3 and 4 weren't run. What was dropped: the solvability and par checks, par in the chamber files, the shortcut report, hints and the dead-end warning, solver difficulty metrics (see Difficulty below) and generated chambers.

## If it's revisited

Ideas not tried:

- **Skip refused shots.** A shot that is refused, or puts a portal where it already is, changes nothing, but still takes a step; how many do wasn't measured. Since shooting takes free hands, every shot from a state that carries a box is refused, so skipping them all there is a sure gain; elsewhere most walls in the current chambers take portals, so the gain may be small.
- **Less packing and unpacking.** Turning keys into states and back took about a quarter of the time.
- **Several cores.** Each search runs on one core.
- **Search toward the exit.** The any-route search explores every state at one depth before the next; a search guided by an estimate of the distance left might reach the exit far sooner, while still proving "unsolvable" only by exhausting the states.
- **Dead ends.** Marking states from which the exit can't be reached (by searching backwards over the explored states) would prune them, and would measure how many there are; one-way arrows are the main source today.
- **Smaller chambers.** Generated or player-made chambers could be sized to what the solver handles, which test 4 would measure.

Known limits:

- Boxes aren't interchangeable: whatever sends a box home sends it to its own start (a box link, a fizzler, and a linked door closing, ditch opening, or laser or light barrier switching on under it), so treating boxes as identical is only safe in a chamber with none of these (today no chamber with two or more boxes).
- The state space grows with boxes and size: two boxes give ~3.5–6.5×10^4 placements, and a third multiplies that by ~190–250.
- A browser worker holds about 10^7 keys (160–250 MB); 10^8 doesn't fit.
- A new mechanic must keep the state discrete and small enough for the 64-bit key (a timed button adds a counter per button; a ray adds nothing, since it is traced from the state rather than stored), declare its event tiles, and come with a tiny chamber with hand-counted pars. Echo (a ghost replaying the previous attempt) puts the whole previous attempt in the state, which likely breaks the solver.
- A chamber with a receiver gets only the reference search and the key check. A ray makes every tile it crosses an event tile, and which tiles those are changes with the state, so the walks, shot lines and regions would have to work out per state where rays run; the skip was chosen over that.

What was planned on top of the prototype, and decided, in case it comes back:

- **Par.** Two independent optimums: fewest moves (ties broken by fewest portals) and fewest portals (ties broken by fewest moves), each with its own stored solution. Stored in the chamber file's `par` block, which format 2 already reserves and nothing writes yet. The chamber hash that recorded solutions pin covers the whole file but its antlines, `par` included, so writing par would make every recorded solution report a changed chamber: leave `par` out of that hash first, as the antlines are, or re-record them.
- **Checks.** A solve-all table (id, number, solvable, par, states, time) with `--write` to store par; every chamber solvable, stored par equal to computed par, and no recorded solution beating par (that would mean a solver bug, so a hard failure); results cached by chamber content plus solver and rules version; the optimal routes stored next to the recorded solution and replayed by the replay check.
- **Designer tools.** Solving with a restriction (a door never opens, a box never carried, no portal on a wall area); a report of par against the recorded solution (flagged under 70% of its moves), the elements the chamber is solvable without, wall sides no optimal route uses and tiles never reached; a development-only replay viewer.
- **Player features.** Milestones derived offline from the optimal route; the solver in a lazily created worker owned by the chamber screen, with a newer request cancelling the older; a dead-end warning ("You can't finish from here", with a Rewind action) off by default behind a Settings switch, reporting only when a search is exhausted; tiered hints (a nudge naming the element, a highlight, the next move) on a new rebindable game key, default H, that doesn't start the clock, with hint use shown on the result; analytics events `hint_request` and `dead_end_shown`.
- **Difficulty.** Shown to players from measured clear rates; solver numbers only as a designer aid. Difficulty from player data was later dropped too: the chamber order comes from playtests.
- **Generated chambers.** Mutating hand-made chambers at 12×12 or less and keeping what the solver accepts, timeboxed to 10 sittings, shipped pre-generated after the author's review.
