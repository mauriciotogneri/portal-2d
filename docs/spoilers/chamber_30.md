# Chamber 30 (run 13, chamber 13.2)

Spoilers: the author reads this only after playing the chamber cold.

Status: first built 2026-11-27; after the author's cold play the same day its box crossing was redone (Playtests), checked and independently reviewed; waiting for the author's cold play, then its recorded solution. File: `src/chambers/chamber_30.json`, thirtieth in the play order; permanent id 30, kept since the first version was never recorded. Run 13's second chamber and the campaign's last (`docs/campaign.md`, "Run 13 in detail").

## Entry

Run 13, chamber 2, combine, the campaign's last chamber. Elements, with antlines:

- two fizzlers, one a button switches;
- an arrow the same button turns, and a fixed arrow;
- two boxes, one absent until a switch brings it in;
- three doors in a row, each with its own button;
- a pit of ditches;
- the exit.

Every wall is steel but two plain walls. The player knows runs 1 to 12, and 13.1. It should teach two things. A switch linked to a box sends it home on every use, from wherever it lies. Doors in a row open together only while every button is held, with one box fewer than buttons. Hint: none (convention 7).

## Layout

15 × 10: the box room and the nook on the right, the doors room on the left, the corridor along the top.

```
y9  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ X ■
y8  ■ 1 . . D . . E . . F _ _ . W
y7  ■ ■ . ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
y6  ■ 2 . . . ■ 3 ■ ■ ■ ■ ■ ■ ■ ■
y5  ■ . . . . Y . T P k ■ ■ ■ ■ ■
y4  N . . . . ■ ■ ■ v ■ ■ ■ ■ ■ ■
y3  ■ . . . . ■ ■ . w ■ ■ ■ ■ ■ ■
y2  ■ . . . . Z . . . S ■ ■ ■ ■ ■
y1  ■ ■ ■ ■ ■ ■ . . . b ■ ■ ■ ■ ■
y0  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
    0 1 2 3 4 5 6 7 8 9 10 ...  14
```

`■` steel; `N` and `W` plain walls; `_` an open ditch.

**The box room** (x 6–9, y 1–3):

- The box **b** (9, 1). The start **S** (9, 2), facing left.
- The switch **w** (8, 3). It links only the box **x**, which it brings in on button 3. It has no antline (guideline 96).
- The fizzler **Z** (5, 2), between the box room and the doors room, held off by k.

**The nook** (row 5, past Y):

- The fizzler **Y** (5, 5), always on, between the doors room and the nook.
- **Button 3** (6, 6), x's start.
- The arrow **T** (7, 5) points right, onto **P** (8, 5), plain floor. While k is held, T turns down, into the steel (7, 4).
- The button **k** (9, 5), past P, links Z and T.
- The fixed arrow **v** (8, 4) leads from P down onto the switch.

**The doors room** (x 1–4, y 2–6) and **the corridor** (row 8), the author's seed:

- **Button 2** (1, 6). The near portal face N (0, 4). The gap (2, 7) up to the corridor.
- In the corridor:
  - **button 1** (1, 8), on the doors' line at its west end;
  - the doors **D** (4, 8), **E** (7, 8) and **F** (10, 8), opened by buttons 1, 2 and 3;
  - the pit, the ditches (11, 8) and (12, 8);
  - the ledge (13, 8), under the exit X (13, 9), with the plain face W (14, 8) behind it.

Five antlines:

| # | From | To | Path |
|---|---|---|---|
| 1 | Button 1 | D | (1, 8), (4, 8) |
| 2 | Button 2 | E | (1, 6), (0, 6), (0, 9), (7, 9), (7, 8) |
| 3 | Button 3 | F | (6, 6), (6, 7), (10, 7), (10, 8) |
| 4 | k | T | (9, 5), (9, 6), (7, 6), (7, 5) |
| 5 | k | Z | (9, 5), (10, 5), (10, 0), (5, 0), (5, 2), over steel |

## Idea

**The crossing, the new catch:**

- b can cross Z only while k is held, and the only box that can reach k is x, from the nook. Y breaks up b on the way in.
- Once x is on k, T has turned away and nothing reaches P or k again, so x is out of reach, and button 3 needs it.
- But the switch that brought x in sends it home onto button 3 each time it is used.
- No earlier route needed a switch's second use. Chamber 9 offers one as a rescue no route needs (its notes, near misses), and the campaign carried it forward from run 4 until run 12 dropped it (`docs/campaign.md`).

**The arrows' job:** T is the nook's gate. It lets the subject onto P from the nook only while k is up, and turns away into the steel as soon as k goes down, which seals x on k (chamber 17's arrow that closes a way). v is the one-way way out of P, so the box room can't reach k.

**The seed, the author's idea:**

- Three doors in a row, open together only while all three buttons are held, are the only line to W.
- With two boxes, the subject holds the button on the line, button 1, and shoots W through all three doors and over the pit.
- It steps off, so the doors close and the portal stays. Then it shoots N and crosses to the ledge.

## Purpose

The finale: synthesis and spectacle, with catches no harder than chamber 29's (guideline 50).

- The crossing is the new catch: a box that holds a button out of reach comes back by the switch that brought it.
- The closing show: the three doors opening, their antlines lit, and the shot across the pit to the exit's ledge.

## Gem or flow

Two steps: the crossing, a gem; then the seed, light (chamber 5's move with more doors).

## Intended route

1. Use the switch: x appears on button 3, and F opens.
2. Walk through Z, which carries nothing, into the doors room, then through Y into the nook. Lift x off button 3 (F shuts).
3. Over T onto P, and put x on k. Z goes off, and T turns down beside the subject.
4. Down v into the box room. Carry b through Z onto button 2: E opens.
5. Back to the switch and use it again. x flies home onto button 3, and F opens; k comes up, Z comes on and T turns back.
6. Stand on button 1 and shoot W through D, E and F, over the pit. Step off, shoot N, walk into it, and go up into the exit.

83 presses, the fewest (a walk of every state). b must cross Z before the second use, which lets k up so that Z comes back on; putting it down on button 2 can come before or after, and the fewest puts b down just past Z and fetches it after the switch.

## Lure and where the player should get stuck

- **x on button 3, F open,** reads as done (guideline 19). The answer lifts it off again.
- **Once x holds k and b is on button 2:** F is shut, and x is out of reach behind a turned arrow. The player hunts for a way back to x and finds the switch, whose first use brought it.
- **b carried into Z:** it breaks up and flies home (chamber 6.1's lesson, so few will try it).
- **Low-stake showings of the second use** (wrong tries, not forced):
  - x carried out through Y breaks up and stays gone, since it is linked, and the switch brings it back;
  - x carried from P down v lands in the box room, where the switch sends it home from there.

## Restrictions

| # | Restriction | What it blocks |
|---|---|---|
| 1 | No plain wall in sight of the box room or the nook | A portal pair carrying b round Z, or reaching k |
| 2 | Y, always on, fencing the nook | b carried to k and left there for good (without Y, 19,353 dead states) |
| 3 | T turns away from P while k is held | x fetched back off k by hand, which skips the switch's second use (with T fixed, x can be fetched) |
| 4 | The steel (7, 4), under T | T turned opening a way into the box room instead of closing one |
| 5 | v one-way, with the switch at its foot | The box room reaching k; v always leads somewhere |
| 6 | The pit before the ledge | A box carried through W's portal and left on the ledge, out of reach once the portals are lost (guideline 111; floor there, 19,364 dead states) |
| 7 | W is on the corridor's line only, and buttons 2 and 3 are off it | Shooting W without the subject on button 1 |

## Facts that must never be possible

- W hit while any door is shut.
- A box past E (0 states). Boxes can rest between D and E, harmlessly.
- b on k (0 states).
- The subject on T while it points down (0 states).
- Completion without x resting on k.

## Guidelines broken on purpose

- **11:** two hard steps (decision 7).
- **18:** eight kinds of element (decision 4).
- **117 and 28:** x is the campaign's first linked box that can be destroyed (carried through Y), and it stays gone until the switch is used again. Convention 3 waives the antline to a box that starts absent. A line here would end on button 3's plate and read as switch, button 3, F (guideline 112). The switch is always in reach, so it is never a dead end.
- **80 and 9:** a box carried onto the switch is refused interact, with the error sound. The earliest case is 6 presses in: lift b beside the start, step onto the switch. It is known since run 4, and recoverable.
- **124 and 25, and run 13's amended decision 8:** the second use is new to the campaign's routes and is seen on screen as it happens: x flies home and F opens. But it is shown first at low stake only by wrong tries, not on every route. Kept because run 4 taught that a switch sends its box home, so once x is out of reach, using the switch again is the plain thing to try. The author's cold play decides.

## Risks named by the reviewers

- **37 and 50, the pace:** 83 presses. That is three crossings of Z, two trips to the nook, and a round trip to the switch after the idea has clicked. The blind reviewer found it "a little long". The switch must sit at v's foot, so the trip is structural.
- **113:**
  - A switch's box round trip may recall chamber 4.3 (guideline 116). Here x is stuck where only the switch can move it, and the same switch both brings it in and recalls it.
  - It keeps the cut version's seed and two of its named risks: x looking lost, and the switch refusal.
- **The author's bar, met in part:** the second use is new and shown on screen, but shown at low stake only by wrong tries, not on every route.
- **Antline 3** runs along row 7 right under E: check in the game that it doesn't seem to end in E.
- **x vanishing** through Y looks lost; using the switch brings it back.

## Near misses and wrong tries

- **Two boxes on buttons 1 and 2,** or 1 and 3: D and one other door open, the third stays shut, plainly.
- **A box carried through the portal to the ledge:** it can't be put down there (the pit, the exit and the walls refuse it), so it comes back or goes out with the subject.
- **x picked up again from P,** right after putting it on k: allowed; T turns back, and the way out is still v.
- **No dead state.** Every one-way step (T, v, the field for a box, the portal to the ledge) has a way back.

## Variants tried

1. **The first version (played by the author):** b was left on T, then a turnable arrow between the rooms. From the doors room the subject stood on T's button, so T turned under the box toward it, and the box was lifted from that side. Cut on the author's cold play (Playtests); its idea is in the idea pool ("Cut drafts").
2. **The designer's three candidates:**
   - the fenced nook, kept;
   - a one-way road of fixed arrows from the doors room to k, ending on the switch, with no turnable arrow (1,223,619 states, 80 presses);
   - the same road with x's home on button 3, where calling x home could knock b, left there, back to the box room.
3. **The kept candidate first had k on (8, 5).** x went down onto it from T, which then turned under the subject. That was cut 7.3's key move, and chamber 16's reversed (handbook reviewer). So k moved to (9, 5), P became plain floor and (7, 4) steel, and T now turns beside the subject, in view (guideline 89).
4. **k's antline to Z** first ran along the box room's floor, through the start, where boxes rest. It was rerouted over steel.

## Checks

- **Walk of every reachable state** through the rules' step, with the game's presses:
  - 154,344 states, 48 completed;
  - 0 dead, 0 with the subject standing in something blocked, 0 with a box under it;
  - 83 presses, the fewest.
- **The solver's pars** (`npm run solve -- --par`): 48 moves and 2 portals; each search's route has both.
- **Key move forced:**
  - No completion avoids x resting on k.
  - With x on k, nothing but the switch reaches it: the subject stands on P with x on k only right after putting it there.
  - The designer's walk, with the switch's second use banned, found no completion. That was on the draft before the arrow fix, which only made k harder to reach.
- **The seed's shot is forced, by argument:**
  - W is reached only along row 8, and only through D, E and F, which need buttons 1, 2 and 3 held.
  - There are two boxes, and of the three buttons only button 1 is on row 8.
- **Handbook reviewer:** confirmed the walk, no shortcut, no dead end, and both lessons forced. The arrow fix and the antline were made on its findings.
- **Blind reviewer** (on the draft before the arrow fix):
  - Solved it by reasoning in about 15 minutes, mostly drawing the map. It ruled out reaching k with b, and taking x off k by hand, before finding the second use.
  - Verdict: "fair and clean, with a real catch", "the finish is a good show", "a little long".

## Playtests

- **Author, cold, 2026-11-27, first version:** "the trick to pass the first cube to the left room is weird. find another way that doesn't use arrows. use the arrows in that chamber for another thing." The seed was kept.
- **Author, second version:** none yet.
