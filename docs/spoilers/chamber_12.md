# Chamber 12 (run 5, chamber 5.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: built 2026-11-23, checked and independently reviewed, waiting for the author's cold play. File: `src/chambers/chamber_12.json`, twelfth in the play order; permanent id 12. Designed together with chambers 5.1 (id 11) and 5.3 (id 13), all three before the author plays any (the author's call, 2026-11-23). It has no recorded solution yet, so `npm run replay:check` and `npm run solver:check`, and with them `npm run verify` and `npm run deploy`, fail on it until the author's play is recorded.

## Entry

Run 5, chamber 2, twist. Elements: steel a button opens, a box, two buttons, a switch, a laser, the exit, and antlines; walls and steel are known from run 1. The player knows runs 1 to 4 and chamber 5.1. It should teach that a switch linked to a box sends it home from wherever it lies, and the box isn't lost; and that a portal on steel closes as the button holding the steel lets go and it shuts. Hint: none (convention 7).

## Layout

7 × 6, chamber 5.1's room with one change: the box starts on a second button, **B1**, in the subject's side's bottom left corner, which holds the exit open. As in 5.1, the subject starts in the middle of the lower row, facing up at **B2** one step ahead, which links **K**, the one-tile blocked wall straight above in the top wall, past the laser and the far row; **N** is the plain face right under the start. In the far row, one tile left of K's column, the switch, linked to the box. Every wall is steel but K and N.

```
y5  ■ ■ ■ K ■ ■ ■
y4  ■ . s . . . E
y3  ■ L L L L L ■
y2  ■ . . P . . ■
y1  ■ B . S . . ■
y0  ■ ■ ■ N ■ ■ ■
    0 1 2 3 4 5 6
```

`■` steel, `S` the subject's start (3, 1), facing up, `B` B1 (1, 1), linked to the exit, with the box resting on it (its start), `P` B2 (3, 2), linked to K, `L` the laser run (1, 3) to (5, 3), horizontal, on, `s` the switch (2, 4), linked to the box, `K` the blocked wall (3, 5), linked, `N` a plain wall (3, 0), `E` the exit (6, 4), linked to B1, so it starts closed and opens as the start settles, the box holding B1.

Antlines, three:

- B1 to the exit: (1, 1), (6, 1), (6, 4): right along the lower row, turning on the right wall and up it into the exit from below; lit at the start.
- B2 to K: (3, 2), (3, 5), straight up, as 5.1's.
- The switch to the box: (2, 4), (1, 4), (1, 1): left one tile, then down under the laser into B1 from above, ending on the box.

## Idea

The box holds the exit open and is needed on B2 to get past the laser, so it goes onto B2, and the switch past the laser sends it home onto B1, which opens the exit as the steel behind the subject shuts on its portal.

From the idea pool, where an independent reviewer sketched it while run 5 was detailed:

> - **Run 5, chamber 2: the box the switch sends home past the steel** (twist; built 2026-11-23 by the proposal's independent reviewer, to show that run 5 can force a box sent home from elsewhere with one box). A laser run splits the chamber wall to wall, the exit beyond it, in a far side with no plain face. The box rests on its start, button **B1**, linked to the exit, so the exit stands open, out of reach; beside B1 a second button, **B2**, opens **K**, a one-tile blocked wall past the laser, the only far face the near side sees; the near side has one face, **N**; past the laser, a switch linked to the box. The catch: the box holds the exit open and is needed on B2 to get to it. It resolves by the switch: the box from B1 onto B2 (the exit shuts), a pair on N and K, cross, use the switch: the box flies home onto B1 (the exit opens), B2 lets go, K shuts and the portal on it closes behind the subject, harmlessly, and out. Forced on every route: a box sent home from elsewhere, seen as no loss (guideline 28; carried from run 4 and asked of step 6.5), drawn as a destroyed box's flight home is (`docs/sprites.md`, "Fly home"), so run 6's fizzler can rely on it; a portal on steel closing as the steel shuts, also no loss, what 5.3 turns on, shown first (guideline 25); and one box for two buttons in turn. Neither can be avoided: the box can't be put back on B1 by hand, since the subject then has no way past the laser (guideline 116), and the far side has no face to move K's portal to. A flow (guideline 11): one real step, lifting the box off the button that holds the exit open; it may be stumbled through, as a show may (guideline 32), but its two consequences are met on every route. It is run 4's set-aside show, "the box flies home onto its button" (above), with the steel and the laser in place of its door and back room. _Check:_ 64 and 65 (the subject is past the laser as the box lands on B1); 70 (the box's start is seen held at the start, and the switch's antline ends on it); 59 and 60; 18 (five kinds of element: blocked wall, laser, box, button, switch, one over the guideline's four, the laser being the only barrier a shot crosses and the subject doesn't); 47 (it plants 5.3's closing portal, not 5.3's answer: no route shoots from past the laser); 113 (what every route does that none did before: send a box home from elsewhere, and lose a portal to shutting steel). Feasibility, 2026-11-23: the reviewer's prototype (7 × 6: the near side 5 × 2 below a laser row, one row above it with the switch and the exit, every wall steel but K, in the top wall, and N, in the bottom wall; B1 under B2 in the near side's left column), rechecked: 13 moves and 2 portals, both the fewest; all 1,426 reachable states can be finished, none of 999 dead without the turn key; no completion without a box sent home, or without K's portal closing as K shuts; the copy without the switch is unsolvable from `--baseline` and `--par`; the box never lands under the subject.

Built in 5.1's room rather than the reviewer's prototype layout (B1 under B2 in the left column), so it reads as 5.1 with one change: the box is busy (Variants tried).

## Purpose

Twist: the box run 5.1 used is the one holding the exit open. Forced on every route, all three met as no loss: a box sent home from elsewhere (carried from run 4, asked of step 6.5, guideline 28), so run 6's fizzler can rely on it; a portal on steel closing as the steel shuts, what 5.3 turns on, shown first (guideline 25); and one box for two buttons in turn (run 4).

Flow (guideline 11): one real step, taking the box off the button that holds the exit open, trusting the switch's line to bring it back; the rest is 5.1's route and a walk. It may be stumbled through, as a show may (guideline 32), but both consequences are met on every route.

## Intended route

1. Step left to (2, 1); interact: lift the box off B1. The exit shuts and B1's line goes dark.
2. Step right to (3, 1); turn up in place; interact: the box goes down on B2. K's steel slides back and B2's line lights.
3. Shoot blue up, over the box, onto K; press down (it only turns the subject); shoot orange onto N.
4. Press down: walk into N and come out of K onto (3, 4), facing down.
5. Step left onto the switch; interact: the box flies home onto B1, the exit opens and B1's line lights; B2 lets go, K's steel shuts behind the subject and the portal on it goes.
6. Walk right four tiles and out through the exit.

Solver: 8 moves and 2 portals, both the fewest; the state walk's fewest presses (15) are this route, the portals in either order. Without the turn key, 19 presses.

## Lure and where the player should get stuck

5.1's answer is in view, the same room, start and facing, but its box is busy: lifting it off B1 shuts the exit, which reads as a loss; put back, the exit opens again (guideline 28). 5.1's own lure, standing on B2 and shooting K, still shows K shutting on its portal. On the far side, with the box on B2, the exit stands shut, B1's line dark, and the switch's line runs to the box's start. Where the player should get stuck: deciding to take the box off B1 at all; the switch's line, ending on the box, is the hint that it comes back.

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The exit linked to B1, the box resting there at the start | Leaving with the box elsewhere: the subject can't hold B1 from past the laser |
| 2 | The switch linked to the box, past the laser | Without it, no completion: the copy without the switch is unsolvable from `--baseline` and `--par`, and the walk refusing every box sent home reaches no completion |
| 3 | The far row with no plain face | Moving K's portal off K before the switch: the far side sees only K and N, so the walk refusing K's portal closing as K shuts reaches no completion; and carrying the box home by hand (guideline 116): with the box on B1 the subject has no way past the laser |
| 4 | K linked to B2 | Crossing without the box on B2: the copy with K unlinked steel is unsolvable |
| 5 | Every wall steel but K and N | Faces the idea doesn't need (guidelines 56 and 75) |
| 6 | B1 away from the exit, neither button in front of a plain face, the switch where no box goes down | Guidelines 59, 60 and 80: the box never crosses the laser, since K is open only while it rests on B2 |

## Facts that must never be possible

- Finishing without the switch sending the box home. Checked: the walk refusing it reaches no completion.
- Finishing without K's portal closing as K shuts. Checked: the walk refusing it reaches no completion.
- The box landing under the subject. Checked: no reachable state has it; the subject is on the switch, past the laser, whenever the box flies home (guidelines 64 and 65).
- The box past the laser, or the switch refusing a carried box. Checked by argument: K takes a portal only while the box rests on B2, so the box never crosses.
- The subject in the laser. Checked: no reachable state has it.
- A dead state. Checked: all 1,586 reachable states can be finished, and none of 1,053 without the turn key.

## Guidelines broken on purpose

- 18, bent: five kinds of element (blocked wall, laser, box, button, switch), one over the guideline's four; the laser is the only barrier a shot crosses and the subject doesn't, and the chamber plays as a flow. Named in the outline.
- 17, bent: the laser plays an open ditch's part, as in 5.1. Named in the outline.
- 113, a risk: the room is 5.1's with one change (a reprise, guideline 43), so its first half replays 5.1's route. What every route adds that none did before: a box sent home from elsewhere, and a portal lost to shutting steel.
- 96, a risk: the switch's line ends on B1 from above and B1's line leaves it to the right, so where they meet they read as one line from the switch to the exit while both are dark (the box on B2) or both lit (after the switch). At the start one is lit and the other not, and the box flying home onto B1 shows the switch's part. Unavoidable with the switch linked to a box resting on a button, which the twist needs (guideline 70); to watch in the author's play.

## Near misses and wrong tries

None is a dead end.

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Standing on B2, shooting K, stepping off | K's steel slides shut and the portal on it goes; shot again later |
| 2 | The box lifted off B1 and put back | The exit shuts, then opens again |
| 3 | The box on B2, across, and to the exit | The exit stays shut, B1's line dark |
| 4 | Standing on B1 with the box on B2 | The exit opens while the subject stands there, out of reach past the laser |
| 5 | The box put down on (3, 1), in front of N | Nothing crosses onto N's tile while it rests there; picked up again from beside it |
| 6 | Using the switch again | Nothing more: the box is home |
| 7 | Shooting the steel | A miss ripple |

## Variants tried

- The switch at (1, 4), its line straight down into B1: the same 1,586 states, none dead, 10 moves; the walk back to the exit two tiles longer for nothing.
- B2 above B1 in the left column, as the sketch's prototype had them, with K above B2 and the switch at (3, 4): 1,586 states, none dead (1,095 without the turn key), 10 moves; the switch's line had to wind round B2 to reach B1, three turns, and the room no longer read as 5.1's. Set aside for the reprise.

## Checks

- `npm run solve -- --baseline --par`: 8 moves and 2 portals, both searches; 2 portal wall sides; key 20 bits.
- Copies without the switch, or with K unlinked steel: unsolvable from `--baseline` and `--par`.
- Every reachable state (1,586, two completed) explored through the rules' step: none dead, none breaking a fact above. With every turn action refused: 1,053 states, none dead.
- The walks refusing every box sent home, and refusing K's portal closing as K shuts: no completion.
- `npm run chamber:check` passes.
- Played through in the real game (`npm run dev` in Chrome, the tab muted), along the route without the turn key: at the start B1's line lit and the switch's dark, two lines meeting at the box; with the box lifted both dark, reading as one L from the switch to the exit (Guidelines broken on purpose); at the switch the box flies home, the exit opens, B1's and the switch's lines light, B2's goes dark and K shuts, its portal gone; then out, with no console error.
- An independent check (a fresh agent with only the file, the plan's entry and 5.1's file, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 1,586 states, 1,053 without the turn key, none dead; 8 moves and 2 portals; every completing route uses the switch, sends the box home and sees K's portal close as K shuts, the portal on K always open when the switch is used, since every shot from the far row misses; the box is never destroyed and never lands under the subject; without the switch it is unsolvable, with the exit always open it needs no switch, without the laser neither. Its judgment calls:
  - It reads as 5.1 plus one press (guidelines 47 and 113): 5.1's fewest route is 5.2's first nine actions, and the switch, one tile from where the subject comes out and the only thing to do there, needs no foresight, so a player can finish on 5.1's habit. Accepted as the outline's flow (guidelines 11 and 32), whose two consequences every route meets; the author's cold play decides whether it earns its place, as run 2's drafts did.
  - The portal closing on K may go unnoticed (guidelines 20 and 25): it is silent and comes in the same step as the box flying home, the exit opening and two lines lighting, and the player may credit the switch. Accepted: the steel shutting is in view beside the switch, 5.1's lure shows it alone, and 5.3's lure shows it again where it matters.
  - B1's line runs along the floor's lower row, through the start and the box's way, and meets the switch's line at the box as one L. Kept: the bottom wall would carry it over N, the only face on that side, and run it straight on from the switch's line, reading as one line through B1; checked in the game above.
  - Both the switch's line and B2's run under the laser: in the game each shows on both sides of the beam.

## Playtests

| # | Who | Date | What the run shows |
|---|-----|------|--------------------|
