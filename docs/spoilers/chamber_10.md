# Chamber 10 (run 4, chamber 4.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: the third 4.3, kept by the author on 2026-11-23, their run its recorded solution. File: `src/chambers/chamber_10.json`, tenth in the play order; permanent id 10. The first 4.3, built with the same id the same day, was played cold by the author, who got stuck in its dead end and ruled dead ends out (decision 13 of `todo/campaign.md`); it is in the idea pool ("Cut drafts"). A second, milder one replaced it the same day and was itself replaced before the author played it, after its independent check (Variants tried). Neither was deployed, so this chamber keeps the id, the id after the last chamber's (the author's rule, no id skipped).

## Entry

Run 4, chamber 3, combine, and the run's last chamber. Elements: a box, two buttons, two doors, a switch, and antlines; walls, steel and the exit are known from run 1. The player knows runs 1 to 3, 4.1 (the switch) and 4.2 (the box a switch brings in). It should teach that a door or exit a switch and a button link opens only while the button is held once the switch is used, each antline lighting as its own input does, and that one box can hold two buttons in turn. Hint: none.

## Layout

8 × 6. A 3 × 3 room on the left, the subject starting in its middle, facing right, and the button **B** in its bottom left corner with the box resting on it (its start). From the room's bottom right tile a one-tile passage runs right: the button **B2**, then the hub **H**. Above H, the door **D2**, linked to B2, and above it the switch, in a nook of its own; right of H, the door **D1**, linked to B and the switch, and the exit right behind it in the chamber's right wall. Every wall is steel but a plain band carrying D1's two lines: the chamber's bottom row and the wall tiles right below and right above D1. None of the band's faces looks onto floor, so none takes a portal.

```
y5  ■ ■ ■ ■ ■ ■ ■ ■
y4  ■ . . . ■ s ■ ■
y3  ■ . S . ■ D w ■
y2  ■ B . . P H d E
y1  ■ ■ ■ ■ ■ ■ w ■
y0  ■ w w w w w w ■
    0 1 2 3 4 5 6 7
```

`■` steel, `w` plain walls carrying an antline, no face of them looking onto floor, `S` the subject's start (2, 3), facing right, `B` B (1, 2), linked to D1, with the box resting on it, `P` B2 (4, 2), linked to D2, `H` the hub (5, 2), floor, `D` D2 (5, 3), `s` the switch (5, 4), linked to D1 only, `d` D1 (6, 2), `E` the exit (7, 2) (open). Both doors are linked, so they start closed.

Antlines, three:

- B to D1: (1, 2), (1, 0), (6, 0), (6, 2): down through the steel under B, hidden for that tile, along the plain bottom row and up into D1 from below; lit at the start, the box holding B.
- The switch to D1: (5, 4), (6, 4), (6, 2): right through the steel beside the switch, hidden for that tile, then down the plain tile above D1 into it from above.
- B2 to D2: (4, 2), (5, 2), (5, 3): across the hub into D2 from below.

## Idea

The one box holds B, then B2, then B again: B2 sits in a one-tile passage, so the box goes down on it from the hub beyond, the switch is used while D1's button is up, which leaves D1 shut with only the switch's line lit, and the box is then fetched back onto B, the switch's input staying.

Built 2026-11-23 from the author's choice, after the second 4.3's check, of a 4.3 that shows both halves of D1's rule on every route with a run 3 move as its catch. The switch links D1 alone: linked to the box too, it would send the box home from B2 in the step it is used, lighting both of D1's lines at once, as the second 4.3 did.

## Purpose

Combine, and the run's end: D1's two inputs, met in both orders on every route, each line lighting as its own input does: at the start B's lit and the switch's not, D1 shut; at the switch the switch's lit and B's not, D1 still shut; then both, and D1 opens. One box for two buttons in turn (B, B2, B again), carried forward from run 3, and the switch's input staying while the box moves on, 4.1's lesson in a combine. No dead end anywhere (decision 13).

Gem, a modest one: one key step, the box put down on B2 from the hub, chamber 3.1's move, by the author's choice; the rest is walking.

## Intended route

1. Step down to (2, 2) and left into the box, facing it; interact: pick it up from B, whose line goes dark.
2. Walk right over (3, 2) and B2 onto the hub; D2 opens while the subject crosses B2 and shuts on the step off.
3. Turn left in place; interact: the box goes down on B2 behind; D2 opens and B2's line lights.
4. Walk up through D2 onto the switch; interact: the switch's line lights, and D1 stays shut, B being up.
5. Walk back down to the hub and left into the box; pick it up (D2 shuts), carry it back over B2 to (2, 2), and put it down on B, facing left: D1 opens, both its lines lit.
6. Walk right along the passage, through D1 and out through the exit.

Solver: 16 moves and 0 portals, both the fewest; the state walk's fewest presses (24) are this route. Every route needs the turn key, at the hub.

## Lure and where the player should get stuck

The first plan is chamber 1.3's: carry the box to B2 and put it down from the room's side, from (3, 2). D2 opens, but the box now bars the passage to it (guideline 67), plain at once; interact picks it up again. Standing on B2 empty-handed opens D2 only while the subject is there. Where the player should get stuck: seeing that the box has to go down on B2 from the hub, behind the subject, as in 3.1, and then, at the switch, that D1 still wants its button: its line from B is dark while the switch's is lit. Nothing is lost by any try.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | D1, linked to B and the switch, right in front of the exit | Leaving without the switch: the walk refusing every use of the switch reaches no completion; with D1 linked to B alone, the copy takes 6 moves, the switch's part skipped |
| 2 | D2, linked to B2, the only way to the switch | Reaching the switch without the box on B2: the walk that never lets the box rest on B2 (444 states) reaches no completion |
| 3 | B2 in a one-tile passage, the hub the only tile beyond it | The box on B2 from the room's side, which bars the passage: the walk refusing the turn on the hub reaches no completion, and so does the one refusing every turn |
| 4 | The switch linked to D1 alone | D1's two lines lighting together: the switch is used only while B is up (refusing it then leaves no completion), so every route sees D1 shut with the switch used |
| 5 | Every wall steel but the plain band | Faces the idea doesn't need (guideline 56): with every wall plain, portal pairs shorten the walking (11 moves and 4 portals), the fewest-moves route still turning on the hub |
| 6 | B2 not beside D2 and off its column; B not beside D1; D1 right in front of the exit | Guidelines 59 and 40 |
| 7 | The plain band below and above D1 | D1's two lines coming into it from below and from above, apart, with one tile hidden each; no extra face (0 portal wall sides) |

## Facts that must never be possible

- Finishing without the box on B2 at some point, or without the switch. Checked: each walk refusing it reaches no completion.
- Using the switch while B is held. Checked: never reached; the switch is past D2, which needs the box on B2.
- Finishing without turning in place. Checked: the walk refusing every turn reaches no completion.
- The subject in a shut doorway. Checked: no reachable state has it; nothing sends the box home, so it never lands under the subject.
- A portal anywhere. Checked: the solver counts 0 portal wall sides.
- A dead state. Checked: all 989 reachable states can be finished.

## Guidelines broken on purpose

None. Guideline 113, by the author's choice: the key step is chamber 3.1's put-down behind, the one move here a player has made before; what every route does that no earlier one did is meet D1's two inputs in both orders and move the box on after the switch.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | The box onto B2 from (3, 2) | D2 opens, but the box bars the passage; picked up again from (3, 2) |
| 2 | Standing on B2 | D2 opens while the subject is there and shuts on the step off |
| 3 | The box put down on the hub | It bars the way to D2 and D1; picked up again from B2's tile |
| 4 | Leaving the box on B2 after the switch and walking to D1 | D1 stays shut, the switch's line lit and B's dark |
| 5 | Using the switch again | Nothing more |
| 6 | Shooting | A miss ripple on steel |

## Variants tried

- The first 4.3 (the idea pool, "Cut drafts"): a dead end by design.
- The second 4.3, built and checked the same day, never played: the idea pool's show, "the box flies home onto its button", with D1 linked to B and the switch, the switch also linked to the box; 7 × 7, a 3 × 3 room holding B2 and B with the box, D2 up into a corridor with the switch, then D1 and the exit (9 moves and 0 portals; 357 states, none dead; no route without the switch sending the box home). Replaced after its independent check: the switch, used while the box held B2, sent it home onto B in the same step, so D1's two lines always lit together and no route showed D1 shut with the switch used (guideline 108); its room was chamber 4.2's, its route 4.2's first half and 4.1's second (guideline 113); its lines were mostly hidden and met at B, reading as one.
- Dead-end-free versions of the first 4.3's catch, reasoned, not built: none exists with these elements, since once the subject is shut behind D2 the switch has already put the box on B and opened D1, so any way out of the switch's room is the whole solution. A switch that sends the box home matters only where the subject can't carry it there: with the way out behind D2, a way back from the switch's room also lets a route carry the box by hand; with the way out past the switch, it is the second 4.3; B on a ledge past a ditch, reached only by portal, leaves a portal outside from fetching the box, so the switch's room is never a trap.

## Checks

- `npm run solve -- --baseline --par`: 16 moves and 0 portals, both searches; 0 portal wall sides; key 14 bits.
- The copy with D1 linked to B alone: 6 moves, the switch skipped. The copy with every wall plain: 11 moves and 4 portals, its fewest-moves route still turning on the hub.
- Every reachable state (989, one completed) explored through the rules' step: none dead, none breaking a fact above. With every turn action refused: 319 states, no completion.
- `npm run chamber:check` passes.
- Played through in the real game (headless Chrome with a throwaway profile, the dev server on a port of its own): the box carried over B2 and put down behind from the hub, D2 opening, the switch lighting its line with D1 still shut and B's line dark, the box fetched back onto B, D1 opening with both lines lit, and the walk out, completing the chamber with no console error.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 989 states, one completed, none dead, 319 without the turn key and none of them completed, 16 moves and 0 portals, every shot a miss; the switch is never used while B is held, so every route sees D1 shut with the switch used; one box on two buttons in turn is forced; the only refusals are put-downs facing walls or shut doors, those on the hub pointing at the turn. Its judgment calls:
  - The catch replays chamber 3.1's: a button in a one-tile gap, the tile past it, a door beside that tile, and the lure is 3.1 and 3.2's box barring its tile; the switch and the box carried back are carried out rather than worked out, so it will likely play as a flow. The author's choice, accepted.
  - D1's corner is chamber 3.2's tile for tile: the door in front of the exit in the right wall, plain walls above and below it, a line coming in from each side. Kept: it is the same kind of door, two inputs, drawn the same way.
  - "B held, the switch unused" shows only in the opening picture, not as something a route makes happen. Accepted: the start shows it, B's line lit and D1 shut.
  - The switch's line turns on the steel beside it, so only two dots show, above D1: it reads weakly. To watch in the author's play.
  - B's line is hidden under the box and the steel below it, so it seems to start on the bottom wall; it lines up with B and starts lit.
  - The plain tile above D1, between two doorways, takes no portal; a shot at it from either doorway misses. Chamber 3.2's convention.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author | 2026-11-23 | Played after choosing its catch, so not cold: they knew it would be a run 3 move. Exactly the intended route: the box off B, carried over B2 and put down behind from the hub with a turn, the switch, the box fetched back onto B, out through D1 (16 moves, 0 portals, both the fewest). Recorded as `chamber_10.solution.json` (Download solution); kept: "i like chamber 10" |
| 2 | Friends, cold | 2026-11-23 | Played it and liked it, by the author's account. Their routes, and how many friends played, weren't recorded, so whether it played as a flow, its reviewer's guess, can't be shown (guideline 105) |
