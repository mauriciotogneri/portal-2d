# Chamber 5 (run 2, chamber 2.1)

Spoilers: the author reads this only after playing the chamber cold.

Status: draft, designed 2026-11-23, waiting for the author's cold play. File: `src/chambers/chamber_5.json`, fifth in the play order; permanent id 5.

## Entry

Run 2, chamber 1, test. Elements: walls, ditches, the exit (the plan's entry named steel too, dropped once the chamber needed none: see Checks). The player knows run 1. It should teach where the subject comes out: on the tile in front of the other portal, facing away from its wall, and only onto a tile it could step onto, so a portal facing an open ditch leads nowhere; and picking the faces to use among several. Hint: none.

## Layout

7 × 5. A ledge along the top (5 × 1), where the subject starts, over a row of ditch the full width of the room. Below it, on the bottom row: the stone (1, 1) at the left end, a ditch tile, the landing (3, 1) right over the exit, the pillar (4, 1), a wall tile standing up from the bottom wall, and a ditch tile. Every wall is plain: nothing in the chamber is steel.

```
y4  W W W W W W W
y3  W . . . S . W
y2  W ~ ~ ~ ~ ~ W
y1  W . ~ . P ~ W
y0  W W W E W W W
    0 1 2 3 4 5 6
```

`W` plain wall, `P` the pillar (a plain wall), `~` open ditch, `S` the subject's start (facing down), `E` the exit (open).

The faces named in the rest of these notes: **f**, the top face of (1, 0), the floor under the stone; **p**, the west face of the pillar, the only face with the landing in front of it; the pillar's top, which faces the ditch at (4, 2). The ledge sees every face of its own walls and, down its columns, f (column 1), the floor walls' tops at (2, 0) and (5, 0) (each in front of a ditch), the pillar's top (column 4), and the open exit (column 3). The stone sees f and the west wall's (0, 1) beside it, p along the bottom row, and the ledge's top wall up column 1.

## Idea

The only face with the landing in front of it is the pillar's side, which only a shot along the bottom row from the stone can hit, so the subject first drops onto the stone through the floor under it, then sends the portal it left on the ledge onto the pillar's side and crosses.

## Purpose

Reinforcing, as run 2's test: run 1's crossing, with the tile the subject comes out on as the thing to aim for. For the first time every wall takes portals, so the faces that fail here fail by what lies in front of them, not by steel: three of the five columns open a portal that leads nowhere. It plants 2.4's landing in a pocket beyond a ditch (where the subject comes out of a portal).

Gem, a gentle one: one key step, seeing that the landing's face is the pillar's side and so is shot from the stone, with a short route around it.

## Intended route

1. Walk left along the ledge to its end, (1, 3); shoot one colour at a ledge wall, say the west wall (0, 3) the walk faces.
2. Walk down into the ditch to face down; shoot the other colour down column 1, over the ditch and the stone, onto f.
3. Walk left into the first portal; come out on the stone (1, 1), facing up.
4. Walk right into the ditch to face right; shoot the colour left on the ledge along the bottom row, over the ditch and the landing, onto p.
5. Walk down into f; come out on the landing (3, 1), facing left; step down out through the exit.

Either colour can go on either face, and the ledge's portal can be on any of its walls (guideline 31). On the stone, sending the colour come out of to p works too: f is then empty, and the other colour goes onto f or onto (0, 1) beside the stone (4 portals). Solver: 6 moves and 3 portals at fewest portals, this route; 4 moves and 4 portals at fewest moves, which uses the turn key to cross along the ledge by portal. Without the turn key the state walk's fewest presses (11) are this route.

## Lure and where the player should get stuck

The subject starts on the ledge right over the pillar, facing down, so a first shot, before any step, opens a portal on the pillar's top, right beside the exit. With the other colour anywhere on the ledge, walking in is refused with the error sound: the pillar's portal faces the ditch, and the subject can't come out onto a ditch. That is the lure (guideline 3): the plan "a portal next to the exit" is the obvious one, and it fails at once, for a reason in plain view, the ditch in front of the far portal (guideline 4). Columns 2 and 5 fail the same way on the floor walls, each in front of a ditch, and column 3 sends the shot out through the open exit, a miss.

Where the player should get stuck: on the ledge, working out which face has the landing in front of it. The pillar is the only wall touching the landing, and of its sides only the west one faces it; that side is hit only by a shot heading right along the bottom row, so from the stone; and the stone is reached only down column 1. Each step forces the next (guideline 54).

## Restrictions

| # | Restriction | What it blocks |
|---|-------------|----------------|
| 1 | The ditch row under the ledge | Walking down from the ledge: every trip is a crossing |
| 2 | The ditch at (2, 1) between the stone and the landing | Walking from the stone to the landing |
| 3 | The pillar, the only wall beside the landing | Any face with the landing in front of it but p: the landing's other neighbours are ditch and the exit. A copy with the pillar steel is unsolvable |
| 4 | The ditch at (5, 1) | Nothing: it keeps the pillar standing alone, so its sides read as separate faces (guideline 19). As floor it would be a stone that leads nowhere, reached down column 5, a decoy (convention 2) |
| 5 | Every wall plain | Nothing: the lesson is that a face fails by what lies in front of it, so steel would blur it; and the entry asks for several faces to pick from (guideline 8: more faces to test). It also lets the ledge's portal go anywhere |
| 6 | The exit under the landing | Column 3's shot leaves the chamber through the open exit, so no face is in line from the ledge to the landing; the exit has a straight way in from the landing (guideline 98) |
| 7 | The start over the pillar, facing down | Nothing: the first shot opens the lure's portal on the pillar's top |

## Facts that must never be possible

- Reaching the landing without a portal on p. Checked: a copy with the pillar steel is unsolvable from `--baseline` and `--par`.
- Reaching the stone without a portal on f, and so from the ledge any other way. Checked: a copy with (1, 0) steel is unsolvable from `--baseline` and `--par` (the west wall beside the stone is in line only from the landing).
- A state from which the chamber can't be finished, with or without the turn key. Checked: all 3,980 reachable states (3,650 without the turn key) can still be finished.

## Guidelines broken on purpose

- Guideline 9 (don't make a refused action look possible): walking into a portal whose partner faces an open ditch is refused, and the pillar's top is meant to look possible. It is the entry's lesson, met at the first try, with the error sound and the ditch in plain view in front of the far portal.
- Guideline 4 (a near miss): the pillar's top is one side off the face that works. Here the near miss is the clue, as steel beside the plain face was in run 1, and the game shows the reason at once.
- Guideline 75 (limit faces with steel in test chambers): every wall is plain, since the faces this chamber is about fail by their landing tile, not by refusing portals.

## Near misses and wrong tries

None is a dead end: there is no box, link or anything one-way, and every part sees a face back to the ledge (the stone and the landing up their columns).

| # | Wrong try | What the game shows |
|---|-----------|---------------------|
| 1 | Shooting down from the start onto the pillar's top, then walking into the other portal | The error sound; the subject stays. The ditch lies in front of the pillar's portal: the lure |
| 2 | Shooting down column 2 or 5 and crossing | The same refusal: the floor wall there has a ditch in front of it |
| 3 | Shooting down column 3 | The shot leaves through the open exit: a miss ripple just inside it |
| 4 | Walking into a ditch | The subject stops facing it, silently |
| 5 | On the stone, sending the colour come out of to p | f is left empty and the other colour is on the ledge; shooting it onto f or (0, 1) fixes it |
| 6 | On the stone, shooting up column 1 | A portal on the ledge's top wall: a way back to the ledge, harmless |
| 7 | Walking into a portal while only one is open | Nothing, silently, as in run 1 |

## Variants tried

- J: this layout with a ledge two rows tall (7 × 6). Same pars (4 moves and 4 portals, 6 moves and 3 portals), no dead state (9,924 states), its key copies unsolvable. Cut: its second row serves no step (convention 6); the one-row ledge reads as a balcony over the pit.
- F: the landing over a stone in the same column, the exit in the right wall: the stone reached along the bottom row, then a shot up the column onto the ceiling over the landing (not built). Cut: two hops of chamber 1.2's shape, a stop and then a column shot, with nothing that makes the landing tile the thing to aim for.
- Not built: a single hop, the ledge seeing the landing's face directly. Cut: the spot where the subject stands would already look onto its target (guideline 12), so the face would need no picking.

## Checks

- `npm run solve -- --baseline --par --max-states=40000000`: 4 moves and 4 portals at fewest moves, 6 moves and 3 portals at fewest portals, both searches; 17 portal wall sides; key 16 bits.
- Copies with the pillar steel, with (1, 0) steel, and with every wall steel: all unsolvable from `--baseline` and `--par`.
- Every reachable state (3,980, and 3,650 without the turn key) explored through the rules' step: each can still be finished.
- `npm run chamber:check`, `npm run smoke:engine` and `npm run random:walk` pass (the walk: 100,000 steps, 73 completions, against 169 and 184 for chambers 1.1 and 1.2).
- Played through in the real game (the user's Chrome, the dev server on a port of its own, so the author's stored progress is untouched): the lure (the first shot onto the pillar's top, the crossing refused), then the intended route, completing the chamber with no console error.
- An independent check (a fresh agent with only the file and the plan's entry, no notes) found no shortcut, no dead end and no `Must` breached: its own walk found 3,980 states (3,650 without the turn key), none unfinishable, and its copies with (1, 0) steel, the pillar steel or the stone a ditch are unsolvable from `--baseline` and `--par`. It flagged three things, all accepted with no change to the layout:
  - The entry named steel, and the chamber has none: every face fails here by what lies in front of it, so steel would only blur the lesson (guideline 75, weighed above). The plan's entry now lists walls, ditches and the exit.
  - "Facing away from its wall" is shown on every crossing but never matters: the stone and the landing have a ditch or a wall on every side but the exit, so any move key turns the subject freely there. With no slide in the campaign yet, a facing can only matter to the next press; nothing in run 2 depends on it.
  - "A portal facing an open ditch leads nowhere" is met only by a wrong try, since it is a refusal (guideline 108); what every route forces is picking the faces with floor in front of them. The start's facing makes the wrong try very likely within a few presses.

## Playtests

None yet.
