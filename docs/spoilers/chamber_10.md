# Chamber 10 (run 4, chamber 4.3)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-23, waiting for the author's cold play. File: `src/chambers/chamber_10.json`, tenth in the play order; permanent id 10. Designed together with chambers 4.1 (id 8) and 4.2 (id 9), all three before the author played any (the author's call, 2026-11-23).

## Entry

Run 4, chamber 3, combine, and the run's last chamber. Elements: a box, two buttons, two doors, a switch, and antlines; walls, steel and the exit are known from run 1. The player knows runs 1 to 3, 4.1 (the switch) and 4.2 (the box a switch brings in). It should teach that a door or exit a switch and a button link opens only while the button is held once the switch is used, each antline lighting as its own input does, and that one box can hold two buttons in turn. Hint: none.

## Layout

9 × 6. The near room, 4 × 3, holds the start in the middle of its left column, facing right, the box resting on its start, the button **B**, in the top row, and the second button **B2** in the bottom right corner. The door **D1**, linked to B and the switch, stands in the near room's left wall at the bottom row, with the exit right behind it, in the chamber's left wall. The door **D2**, linked to B2, stands in the near room's right wall in the middle row, and opens into the back room, one tile wide and three high, with the switch at its bottom; the switch links D1 and the box. Each room has one face that takes portals: **N**, the near room's ceiling over B2's column, and **K**, the back room's right wall in D2's row. Under the near room, the wall is two tiles thick, its outer row plain so it can carry the switch's line to D1; none of those plain tiles faces a floor tile, so none takes a portal.

```
y5  ■ ■ ■ ■ ■ N ■ ■ ■
y4  ■ ■ . B . . ■ . ■
y3  ■ ■ S . . . D . K
y2  E d . . . P ■ s ■
y1  ■ w ■ ■ ■ ■ ■ ■ ■
y0  ■ w w w w w w w ■
    0 1 2 3 4 5 6 7 8
```

`■` steel, `N` (5, 5) and `K` (8, 3) plain walls, the only faces that take portals (N's bottom face over (5, 4), K's left face over (7, 3)), `w` plain walls carrying an antline, no face of them looking onto floor, `S` the subject's start (2, 3), facing right, `B` the button (3, 4), linked to D1, with the box resting on it (its start), `P` B2 (5, 2), linked to D2, `D` D2 (6, 3), `s` the switch (7, 2), linked to D1 and the box, `d` D1 (1, 2), `E` the exit (0, 2) (open). Both doors are linked, so they start closed.

Antlines, four:

- B to D1: (3, 4), (3, 2), (1, 2), into D1 from the right; lit at the start, the box holding B.
- The switch to D1: (7, 2), (7, 0), (1, 0), (1, 2): hidden for one tile under the steel below the switch, then along the plain outer row and up into D1 from below.
- The switch to the box: (7, 2), (7, 4), (3, 4): up the back room, hidden for one tile under the steel between the rooms' top rows, then along the near room's top row to B, where it ends under the box.
- B2 to D2: (5, 2), (5, 3), (6, 3).

## Idea

Using the switch sends the box home onto B, opening D1 but letting B2 up, so D2 shuts behind the subject: a way back across D2, a portal outside the back room, must be in place before the switch is used, made while the box still holds D2.

From the idea pool, where it was sketched before run 4's other chambers (guideline 51):

> - **Run 4, chamber 3: the switch that shuts the door behind** (combine; sketched 2026-11-23, its run detailed in `docs/campaign.md` the same day; idea 9 below, "Prepare, then trigger", with one box). The near room holds the start, the box resting on its start, button **B**, and a second button **B2**, which opens door **D2** into a small back room holding the switch; the way out is a door **D1** (or the exit itself) in the near room, linked to B and the switch, so it opens only while B is held once the switch is used; the switch also links the box. At the start D1's line from B is lit, its line from the switch unlit, and D2 shut. The catch: the switch lies behind D2, which only the box can hold open (B2 off D2's line, so the subject can't hold D2 and shoot through it, guideline 40), and the box is what holds B; worse, using the switch sends the box home onto B, which completes D1 but lets B2 up, so D2 shuts with the subject in the back room and the way out open beyond it. It resolves by preparing before triggering (the patterns' "Prepare, then trigger"): a portal pair spanning D2 while the box holds it, one face in each room, each shot from its own side, or the back room's through the open doorway; then the switch, the crossing back, and out through D1. A second route makes the pair, puts the box back on B by hand, crosses in, uses the switch and crosses back. Every route has a portal on each side of D2 (fewest portals 2). One key move: a portal left on the near side before the switch is used; the back room's half can wait until D2 has shut (its reviewer's walk, forbidding any portal on the back face before the switch, still completes). So a portal shot early on the near face for no reason defuses the catch: keep that face out of the start's view and off a first idle shot (guideline 16, a lone plain face reads as one to use). The lure: the plain order, run 1's box onto the second button, walk in, use the switch, the only thing in the back room, which shuts the subject in after about six moves; it fails plainly and at once (D2 slams as the box flies home, D1 opening in view, out of reach; guideline 4), and the antlines showed it in advance (the switch's line runs to the box's start, B, and B's to D1). It is the chamber's only dead end, so it bends guideline 33 on purpose, as the pattern does, and keeps guideline 76 (plainly fatal the moment it's reached); its notes must say so (guideline 52). What every route must do (the second reviewer's walks): the box on B2, then back on B, and a portal pair across D2 that brings the subject back out once D2 is shut. Foreseeing the switch's side effect is forced only on the routes that let the switch take the box home. The second route above never does: forbidding every step that reports `boxSentBack` still completes, in 25 presses (27 in the copy with the near face moved), and that route is chamber 2.4's shot through a door its box holds plus run 3's carrying, the switch moving nothing. That is this sketch's main risk (guideline 113): played that way, it reads as 2.4. Closing it means the box, once off B, can't be carried back onto B by hand, which run 1 to 4's elements don't obviously give; designing 4.3 (step 6.3) either closes it, re-walked, or names it for the author's play, as chamber 3.2's sketch named its own risk. Plants: 4.1, the switch used with interact stays on, its door open for good, and a portal crossing kept in use, since 3.1, 3.2 and 4.2 have none (guideline 48); 4.2, a switch linked to a box brings it in on its start tile, where the switch's antline ends; 2.4, a door shutting keeps its portals. 4.2 forces only that arrival: a box already in the chamber pulled home by a switch is forced in no earlier chamber, so here the trap is what teaches it, which bends guideline 25, and 4.2 may even suggest that a switch makes boxes (guideline 27), the belief that walks players into the trap. Build this chamber from the copy with the near face moved (p4b), and 4.1 in a shape unlike it (its sketch below). Since 2026-11-23 4.2 is the teach of the box that starts absent (decision 12 of `todo/campaign.md`), no longer the show below that planted this chamber's lure with its own answer, so the lure rests on run 1's habit alone and the foresight on 4.2's rule; whether players foresee the slam is for the author's play to show. The door (or exit) a switch and a button link is first met here, its antlines showing which input is still to go, as chamber 3.2 met the door two buttons link. Keep it unrehearsed (guideline 47): neither 4.1 nor 4.2 has a portal pair across a door, and in neither does a switch take a box off a button. No route needs the switch used twice (the reviewer's walk), so the second use, which acts again, is left for a later chamber to show (guideline 27). _Check:_ guideline 40 (above); 59 (neither button beside its door); 64 and 65 (the box's start on B is meant, the switch pressing it from the back room, where the subject can't be on B); 67 (a box left in front of either face refuses the crossing onto it); exactly one face that takes portals on each side of D2, which is what keeps the prototype's only dead ends the trap: with the near room's walls all plain, 161,714 states and 8,724 dead, 8,640 of them guideline 111's (the box carried into the back room by portal, left there, then both portals moved to the near side); with the back room's walls all plain, 5,988 dead, some shut in before the switch is used; 78 (once D2 is shut, the back room sees only its own face: shooting the near portal's own colour onto it moves that portal inside, in view, and strands the subject, part of the trap; the other colour there misses, since the face already holds a portal); 96, 97 and 112 (the switch's two lines, to D1 and to the box's start, leave the back room over walls that must add no face onto floor, as chamber 3.2's plain walls carry its lines; steel hides a line); 95 (the box hides B at the start, its line to D1 lit); 80 (the switch off every tile where a box goes down) and 9 (a box carried through portals onto the switch meets the error sound on interact: harmless, for the near-miss census); 72 and 75 (no route relies on the walls facing a door, which run 5 shows); 28 (4.2 shows a box flying home as no loss). Feasibility, 2026-11-23: a throwaway prototype in a scratch folder, not a draft (8 × 5, the exit in the near room's bottom wall linked straight to B and the switch, every wall steel but the near room's west face and the back room's east face, both on D2's row), came out at 11 moves and 2 portals, both the fewest, from `--baseline` and `--par`. Its 6,158 reachable states hold 36 dead ones, all with the subject in the back room, the switch used, the box home and no portal outside: 12 are the trap, with no portal left outside before the switch, and 24 a colour slip after the key move was made, the near portal's own colour shot onto the back face, which moves it inside (allowing the switch only once a near portal exists still leaves those 24, the nearest 16 presses in). That slip breaks guideline 78 and comes late (guideline 34): the notes must break 78 on purpose with the reason, or the design close it; completions are reachable without the turn key; no completion keeps the box on B throughout. Copies: every wall steel, unsolvable; the switch not linked to the box, 13 moves and 0 portals (the link is the catch); B2 moved onto D2's row, the box never moves (14 presses: the subject holds D2 and shoots through); the near face moved from behind the start to the top wall over B2, 13 moves and 2 portals, the same 36 dead states. A fresh reviewer reproduced every number and found no route that skips the switch or the pair.
>
>   ```
>   y4  # # # # # # # #
>   y3  # . o . . # . #
>   y2  W S . . . D . W
>   y1  # . . . p # s #
>   y0  # # E # # # # #
>   ```
>
>   `#` steel, `W` plain wall, `S` the start (facing right), `o` B with the box on it, `p` B2, `D` D2, `s` the switch, `E` the exit (linked to B and the switch).

Built from the copy with the near face moved (p4b), as the sketch asked, with these changes:

- **D1, a door before the open exit**, in place of the exit linked straight to B and the switch, as the plan's two doors say; the exit moved to the left wall, D1 just inside it, two tiles from B, so B isn't beside it (guideline 59).
- **The antlines.** Four lines, two of them into D1, which must not run on top of each other (chamber 3.2's restriction 6): B's comes into D1 from the right, along the floor; the switch's comes in from below, along a plain outer row under the near room, which is why the bottom wall is two tiles thick. The switch's line to the box leaves the back room at the top and runs along the near room's top row into B. In the game each reads as its own: B's lit at the start, the switch's two unlit until it is used.
- **The hand route is named, not closed** (below): with runs 1 to 4's elements, no layout of this shape closes it without losing the trap.

## Purpose

Combine, and the run's end: the door a switch and a button link (D1), met here first, its antlines showing which input is still to go; one box for two buttons in turn, carried forward from run 3; and the switch's link to the box, which turns using the switch into a trap. What every route must do that no earlier one did (guideline 113): put the box on B2 to open D2, then get it back onto B while the subject reaches the switch behind D2, with a portal pair across D2 that brings the subject back out once D2 is shut. The pattern is the handbook's "Prepare, then trigger".

Gem: one key step, a portal left outside the back room before the switch is used, with a short route around it.

## Intended route

1. Face up (up, into the box) and pick it up from B: B's line goes dark.
2. Carry it to (5, 3), face down and put it on B2: D2 opens and B2's line lights.
3. From (5, 3), shoot one colour up onto N; then either shoot the other right, through the open D2, onto K, or leave K for later.
4. Go into the back room, through D2 or by walking into N (out of K at (7, 3)); step down onto the switch and press interact: the box flies home onto B, both of D1's lines light and D1 opens; B2 comes up and D2 shuts.
5. Step up to (7, 3) and walk right into K, shooting it first if it has no portal yet, with the colour not on N; come out of N at (5, 4), facing down.
6. Walk to D1, through it and out through the exit.

Either colour can go on either face. Solver: 15 moves and 2 portals, both the fewest; its two routes are this one, one shooting K through the open D2 before going in by N, the other going in through D2 and shooting K from inside after the switch. The state walk's fewest presses (23) are this route with both portals placed before going in by N.

## Lure and where the player should get stuck

The lure (guideline 3) is the plain order, run 1's habit: carry the box onto B2, walk in through the open D2, and use the switch, the only thing in the back room. The box comes apart and flies home onto B, D1 opens in view with both its lines lit, and D2 slams shut with the subject behind it. The back room sees only K, and a portal there leads nowhere. It fails plainly and at once (guideline 4), 11 presses into the chamber at the nearest, and the antlines showed it in advance: the switch's line ends under the box on B, and B's leads to D1. It is the chamber's only dead end, a deliberate one (Guidelines broken on purpose).

Where the player should get stuck: after the restart, seeing that the way out of the back room has to be made before the switch is used, while the box still holds D2 and K can be seen through the doorway or reached on foot, and that the near room's one face, N, is the way back.

**The hand route**, named for the author's cold play (the sketch's main risk, guideline 113): put the box on B2, place both portals (K through the open D2), carry the box back onto B by hand, go in by N, use the switch, which sends nothing home since the box is already there, come back out by K and leave. 29 presses, 21 moves and 2 portals; the walk refusing every step that sends a box home still completes. It still forces the pair across D2, one box on two buttons in turn, and D1's two inputs; what it skips is the switch's link to the box. Played that way, the chamber reads as chamber 2.4's shot through a held door plus a carry. Closing it was weighed and not done:

- Once a pair spans D2, nothing in runs 1 to 4 stops the box going back to B by hand: the pair would have to be lost when the box leaves B2 (a blocked wall B2 links, run 5), or B lie where the subject can't take the box.
- B on a ledge past a ditch, reached only by portal, closes it (the two portals can't span both the ditch and D2), but fetching the box leaves a portal in the near room, so the lure no longer traps: the subject in the back room shoots K and walks out. That loses the chamber's catch.
- N in front of B, so the box at home shuts it: it shuts the intended way back too.

These were reasoned through on paper, not built.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | D1, linked to B and the switch, right in front of the exit | Leaving without both: the walk refusing every use of the switch reaches no completion, and so does the walk that never lets the box rest on B2 (1,584 states) |
| 2 | The switch behind D2, which only B2 opens | Reaching the switch without the box on B2: the same walk |
| 3 | B2 off D2's row and not beside D2 | Guideline 40: the subject holding D2 itself and shooting K through it, so the box never moves (the sketch's copy with B2 on D2's row); and guideline 59 |
| 4 | Exactly one face on each side of D2, N and K | Guideline 111's dead ends (the sketch's copies with a room's walls all plain: 8,724 and 5,988 dead states), and more ways round: with these two, the only dead states are the trap's |
| 5 | N over B2's column, off the start's lines | A portal shot on N first thing, for no reason, which takes the bite out of the trap (guideline 16) |
| 6 | The switch linked to the box | Nothing to prepare: without the link, the copy takes 15 moves and 0 portals (the box stays on B2, the subject walks in and out through D2, then carries the box to B) |
| 7 | B two tiles from D1, D1 right in front of the exit | Guidelines 59 and 40: D1's row runs out through the exit, and no other tile sees through it |
| 8 | The bottom wall two tiles thick, its outer row plain | The switch's line into D1 running along B's, the lit one hiding the unlit one; no extra face (the solver counts 2 portal wall sides) |
| 9 | The back room's top tile | Nothing: the switch's line to the box leaves the back room there, clear of D2 and of B2's line |

## Facts that must never be possible

- Finishing without the box on B2 at some point. Checked: the walk that never lets the box rest on B2 reaches no completion.
- Finishing without a portal on N, or without one on K. Checked: each walk refusing it reaches no completion.
- Finishing without using the switch. Checked: the walk refusing it reaches no completion.
- A dead state other than the trap's. Checked: all 36 dead states have the subject in the back room, the switch used, the box home and no portal outside the back room: 12 with no portal at all, 24 with one, on K (reached by shooting K before using the switch, or by the colour slip below).
- The box landing under the subject, or the subject in a shut doorway. Checked: no reachable state has either.
- A portal anywhere but N and K. Checked: the solver counts 2 portal wall sides.

## Guidelines broken on purpose

- **33, design dead ends out**: the trap is a dead end on purpose, as the pattern "Prepare, then trigger" is; guideline 76 holds, since it is plainly fatal the moment it is reached (D2 slams, the box flies home in view, the back room sees only K), and it comes early, 11 presses in.
- **78, a part reached only by portal needs a way back the player's own shot can't lose**: with N placed and K not yet, shooting N's own colour onto K from inside moves the way back into the back room, stranding the subject. It can't be closed: whatever face the subject can walk into, it can shoot, and a face outside that the back room could see would defuse the trap. It is the trap's own lesson, no portal left outside, and plainly fatal at once (N's portal vanishes from the near room and reappears on K; the other colour is closed and K is full), but it comes late in a route (guideline 34).
- **25, show it before requiring it**: no earlier chamber shows a switch taking a box that is already in the chamber home; 4.2 shows only a box brought in. Here the trap is what shows it, as the sketch planned.

## Near misses and wrong tries

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | The lure: box on B2, in through D2, the switch | Dead end: the box flies home onto B, D1 opens out of reach, D2 slams; Restart chamber |
| 2 | As 1, with K shot first | The same dead end, K's portal leading nowhere |
| 3 | The colour slip: N placed, in, the switch, then N's colour onto K | Dead end: the way back moves inside, in view |
| 4 | A portal shot on N early, for no reason | No harm: the lure no longer traps, provided K then gets the other colour |
| 5 | Picking the box up off B | B's line goes dark, D1 stays shut (it was: the switch's line is unlit) |
| 6 | The subject standing on B2 | D2 opens while it stands there and shuts on the step off; B2 is off D2's row, so no shot through it from there |
| 7 | Shooting at the shut D2 or D1 | A miss on the door |
| 8 | Interact on the switch while carrying the box (carried in by the pair) | Refused, with the error sound |
| 9 | The box carried into the back room by the pair and left there, then the switch | The box flies home onto B from there, which is fine: the pair still leads out |
| 10 | Using the switch with the box on B (the hand route) | Nothing flies; D1 opens |

## Variants tried

- The sketch's prototypes (8 × 5, the exit linked to B and the switch): p4, N behind the start (11 moves and 2 portals, 6,158 states, 36 dead), and p4b, N over B2 (13 moves); this chamber is p4b with D1, the exit moved and the antlines laid out, and keeps p4b's numbers but for the longer walk to D1 (6,166 states, 36 dead, 15 moves).
- Closures of the hand route (above), reasoned, not built.
- The set-aside show of the idea pool, the box flying home onto its button with the way out past the back room: no portals, no catch.

## Handbook lesson to propose once the author has played it

It gives the move away, so only after the cold play: a portal pair spanning a door frees the box holding that door, so with runs 1 to 4's elements a route can always carry the box where a switch would send it, by hand, while the pair stands; a chamber that needs the switch to do it must lose the pair when the box leaves (a blocked wall the door's button links) or keep the box's start out of the subject's reach with the box, and the second leaves a portal behind that can defuse a trap built on having none.

## Checks

- `npm run solve -- --baseline --par`: 15 moves and 2 portals, both searches; 2 portal wall sides; key 20 bits.
- The copy with every wall steel: unsolvable from `--baseline` and `--par`. The copy without the switch's link to the box: 15 moves and 0 portals.
- Every reachable state (6,166, two completed) explored through the rules' step: 36 dead, all the trap's (Facts). With every turn action refused: 4,531 states, completed in 23 presses. Refusing every step that sends a box home: 6,106 states, completed in 29 presses (the hand route).
- `npm run chamber:check` passes.
- Played through in the real game (headless Chrome with a throwaway profile, the dev server on a port of its own): the box onto B2, D2 opening, N and K shot, the crossing in, the switch sending the box home onto B as D2 shut and D1 opened, the crossing back and the walk out, completing the chamber with no console error. The four lines read as described: B's lit at the start, the switch's two unlit until it was used.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) worked out the catch and the key move as written here, and found no shortcut that skips the pair, the switch or the box on both buttons: its own walk found 6,166 states (4,531 without the turn key), 2 completed, 36 dead (30 without the turn key), all in the back room after the switch, the nearest 11 actions in, 15 moves and 2 portals. Guidelines 59, 60, 63 to 68 and 111 hold; the box never lands under the subject and the subject never stands in a shut doorway; no state needs a second use of the switch, and nothing relies on the walls facing a door. Its findings, each a judgment call, and the answers:
  - Sending the box home is never forced: its hand route, 21 moves. The plan says exactly that ("No run 4 route is forced to send a box home from elsewhere"), so the hand route keeps 4.3 within the plan; every 15-move route relies on it, and the trap shows it to every player who takes the plain order. Named above for the author's play.
  - That route reads like chamber 2.4. Named above, the sketch's main risk.
  - The natural first try is the dead end, and the first showing of a present box sent home costs a restart (guidelines 25, 33, 70): broken on purpose, above.
  - The wrong colour after the switch is a dead end after the key move (78, 34): broken on purpose, above. It noted that a route which shoots K through D2 first is immune, since K then holds a portal and refuses a second shot.
  - An idle early shot on N defuses the trap: restriction 5 keeps N off the start's lines; a player who shoots it anyway still has to give K the other colour.
  - Antlines: the switch's line to D1 is hidden for the tile right below the switch, so it seems to start on the plain row, a tile lower; that tile can't be plain, since its top face looks onto the switch and would give the back room a second face. The switch's line to the box ends at the edge of B, which is the box's start and also the button whose line leaves it downward, so once the box has moved the two can read as one line, switch to B to D1; their colours differ at the start (B's lit, the switch's unlit) and while the box is away both are unlit. The plain (1, 1) under D1 is a lone odd tile, there only for the line. All three kept, to watch in the author's play.
  - On the 15-move routes, the switch's lines and B's never rest lit apart after the start: the switch brings the box onto B in the step it is used, so both light at once. Each input's own line lighting shows at the start (B's lit, the switch's not) and on the hand route.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
| 1 | The author, cold | — | Waiting |
