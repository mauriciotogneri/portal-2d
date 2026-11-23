# Handbook revision after run 1 (proposal)

A proposal for step 3.7 of `todo/campaign.md`: the revision of `docs/level_design.md` planned after run 1 (decision 10). Drafted 2026-11-23 from three sources: run 1's chamber notes (`docs/spoilers/chamber_1.md` to `chamber_4.md`: playtests, lesson lines, independent checks, variants and guidelines broken on purpose); the seven "Handbook lessons" at the end of `run_2_detail.md`; and a trim pass over the handbook. Every claim about the rules was checked against `docs/elements.md` and, where in doubt, `src/game/rules/step.ts`. Nothing changes until the author approves. Once the changes are applied, this file goes, and `run_2_detail.md` is rechecked against the revised handbook (its decision 5).

The evidence is thin: one player who knows every rule (the author), and one friend whose routes weren't recorded. So most of what is proposed comes from what run 1's layouts and checks showed, which doesn't depend on who played. Where a lesson rests on the author's play alone, it says so.

Every old text below occurs exactly once in today's handbook. The changes were applied to a scratch copy to measure the result. No guideline is removed whole, so no number goes unused. The three new ones take 108 to 110, each in the section it belongs to. Markdown numbers a list from its first item, so a new guideline is set off as a list of its own by an HTML comment line: `<!-- Added after run 1 -->` before it, plus `<!-- -->` after it where older guidelines follow. A preview then shows 108, not 33. GitHub's renderer was checked on a sample list, and in the patched copy all 25 numbered lists count up by one.

## Summary

20 changes, in the handbook's order: 3 add, 10 edit, 1 merge, 6 cut. A cut shortens text inside a guideline; a merge replaces a copy with a pointer to the guideline it copied.

| # | Guideline | Kind | Source | What it changes |
| --- | --- | --- | --- | --- |
| 1 | Intro | edit | Numbering (open question 1) | Says that numbers are kept for good, so 108 can sit after 32 |
| 2 | 4 | edit | Playtests of 1.1, 1.2 and 1.4 | A near miss meant as the clue reaches only players who miss |
| 3 | 9 | edit | Run 2 lesson 7 | Adds the refused crossing to the refusals that look possible |
| 4 | 26 | edit | Chamber 1.3's notes (lure, variant G) | A held key lingers only on the first tile of a walk |
| 5 | 108 | add | Playtests of 1.1, 1.2 and 1.4; lesson lines of 1.2 and 1.4 | New: teach only what every route forces |
| 6 | 40 | edit | Run 2 lesson 4; notes of 1.3 and 1.4 | How to check the shot through a door: one line, and a door right in front of the exit |
| 7 | 43 | cut | Trim pass | Shortens Playground 10's example to what it shows |
| 8 | States to avoid: "Shut by its own ray" | cut | Trim pass | Shortened to one line; guideline 92 says it in full |
| 9 | 62 | cut | Trim pass | Cuts the worked gate examples and the own-ray sentence |
| 10 | 66 | edit | Run 2 lessons 2 and 3; wording check; 1.4 wrong try 7 | Shots need facing too before the turn key; tightened |
| 11 | 109 | add | Run 2 lesson 1; playtest of 1.2 | New: how to force which portal moves and which is the way in |
| 12 | 78 | edit | Run 2 lesson 5; 1.4's notes | The player's own shot can lose the way back; one face is safe |
| 13 | 92 | cut | Trim pass | Cuts the fixture's description, which the fixture's name already gives |
| 14 | 99 | cut | Trim pass | Says the same in fewer words |
| 15 | Patterns: fact 1, and pattern 15 | merge | Trim pass | Fact 1's copy of guideline 62 goes; a pointer stays |
| 16 | Patterns: fact 2 | cut | Trim pass | Cuts its restatement of guideline 62's rule |
| 17 | Checking a chamber: intro | edit | Follows 110 | Places 110 between the designer's checks and the author's play |
| 18 | 104 | edit | Notes of 1.2, 1.3 and 1.4 (checks; 1.4's variants B and G) | Walk every reachable state, and again without the turn key |
| 19 | 110 | add | Notes of 1.1 to 1.4 (independent checks) | New: a fresh reviewer checks each draft before the author plays it |
| 20 | 105 | edit | 1.4's lesson line; the friend's playtest | The author's play tests the puzzle; note friends' routes, or their counts |

## Run 2's lessons

The seven proposals in `run_2_detail.md`, "Handbook lessons", each checked against the rules.

| # | Lesson | Verdict | Checked against the rules |
| --- | --- | --- | --- |
| 1 | Force which portal moves, and which is the way in | Reworded, as new guideline 109 (change 11) | True. A face that holds a portal refuses both colours (`step.ts`), and walking into a wall only turns the subject to face it, so a face the subject can walk up to can be shot again once empty. "Forcing it takes the box" is widened: the room's shape forces it too (1.4's ledge) |
| 2 | Every face the subject can walk into, it can shoot | Merged in part into guideline 66 (change 10) | True ("Move or turn": walking into a wall faces it, crossing only when both portals are open and it holds one on that side). The fact becomes one clause of 66; the rest is rejected (Rejected, row 2) |
| 3 | Shots need facing too, until the turn key is taught | Reworded, into guideline 66 (change 10) | True: a move onto a tile the subject can enter moves it, and onto one it can't only turns it. Added: a portal behind the tile can stand in for the run-up, and a key held through a crossing acts again (1.4, wrong try 7) |
| 4 | A door shows one face per side | Reworded and shortened, into guideline 40 (change 6) | True only for a door in a one-tile gap: its frame walls stop shots coming from the side, and a wall side facing a door never takes a portal. A door standing in open floor passes shots from every side, so the text is limited to a gap. Added run 1's own fix: a door right in front of the exit |
| 5 | A part reached only by portal is safest with a single face | Reworded, into guideline 78 (change 12) | True: from a part that sees only the face it came out of, every shot misses, so the pair can't change. Sharpened: only moving the portal that leads back strands the subject; moving the one it came out of is undone by shooting it back onto its face |
| 6 | With one box and one button, the box has one job | Rejected | See Rejected, row 1 |
| 7 | Walking into a portal whose other end faces an open ditch or a box is refused | Accepted, reworded, into guideline 9 (change 3) | True: a crossing checks the tile like a step and is refused with the error sound (`step.ts`). Widened from a ditch or a box to any tile the subject can't step onto |

## Wording check: 66, 67 and 74

The three guidelines run 1 extended.

| # | Guideline | Accurate | Clear | Length | Proposal |
| --- | --- | --- | --- | --- | --- |
| 1 | 66 | Yes: matches "Move or turn", "Crossing a portal" and "Interact". Says nothing of shots, which also need facing before the turn key | Hard going: the arrow clause and the run-up sentence run on | 272 words, the third longest | Rewritten (change 10), about 35 words longer |
| 2 | 67 | Yes: a box bars walking and every crossing onto its tile (fixture `portal_onto_box_refused`), and the sealed part matches 1.4's variant G | Clear | 158 words | None |
| 3 | 74 | Yes: only walls, a closed door or exit, and a fizzler or a light barrier that is on stop a shot, so with walls alone every face a shot reaches lies beside floor the subject can walk to | Clear | 137 words | None |

## Changes in full

Each old text is copied exactly from today's handbook, and each new text is ready to apply as written. Where only part of a guideline changes, only that part is quoted.

### 1. Intro: edit

Source: Numbering (open question 1). A reader who meets 108 after 32 needs one line saying why.

Old:

> The guide grows with what we learn: when designing, building or playing a chamber turns up a pitfall or a tip, add it here, marked, and fix or remove any guideline that no longer holds. A lesson that holds only for one chamber stays in its notes.

New:

> The guide grows with what we learn: when designing, building or playing a chamber turns up a pitfall or a tip, add it here, marked, and fix or remove any guideline that no longer holds. A lesson that holds only for one chamber stays in its notes. A guideline keeps its number for good, since chamber notes and plans cite it: a new one takes the next number and sits in the section it belongs to, and a removed one leaves its number unused.

### 2. Guideline 4: edit

Source: Playtests of 1.1, 1.2 and 1.4. The author never shot steel in 1.1, 1.2 or 1.4, so none of the three near misses meant as clues fired. The detail goes in 108.

Old:

> Unless the near miss is the clue, make the lure fail by a clear margin, or for a reason the game shows at once (a door shutting on the step off its button, a band flaring on a refused shot), and within a few moves, before the player has built much on it.

New:

> Unless the near miss is the clue, make the lure fail by a clear margin, or for a reason the game shows at once (a door shutting on the step off its button, a band flaring on a refused shot), and within a few moves, before the player has built much on it. A near miss meant as the clue reaches only players who make that miss, so it can't be what teaches (guideline 108).

### 3. Guideline 9: edit

Source: Run 2 lesson 7. Both shots hit, so the faces look right, yet the crossing plays the error sound. Widened from "a ditch or a box" to every tile the subject can't step onto.

Old:

> shooting while carrying, putting a box down while on a switch (guideline 80). Each shows a miss ripple or plays the error sound;

New:

> shooting while carrying, putting a box down while on a switch (guideline 80), walking into a portal while the other faces a tile the subject can't step onto, such as an open ditch, a laser that is on or a resting box (guideline 67). Each shows a miss ripple or plays the error sound;

### 4. Guideline 26: edit

Source: Chamber 1.3's notes (lure, variant G). Variant G started one tile further back, and a held key crossed the button in about 33 ms. Moving the start one step closer let the door open in full. That holds for anything a held walk passes.

Old:

> make the route stop in front of it: a door to open, a button to press, a slide that ends facing it.

New:

> make the route stop in front of it: a door to open, a button to press, a slide that ends facing it. A held key steps once, then waits for the keyboard's repeat delay (about half a second by default) before stepping many times a second, so only a held walk's first tile is seen for long: chamber 1.3's button, one step from the start, holds the subject until its door has opened in full, but from two steps away a held key crossed it in about 33 ms.

### 5. Guideline 108: add, `Should`

Source: Playtests of 1.1, 1.2 and 1.4; lesson lines of 1.2 and 1.4. Three of run 1's four entries named a lesson some route skips: 1.1 (steel takes no portal, met only by a missed shot), 1.2 (either portal as the way in) and 1.4 (the refused shot). The author took the skipping route each time. 1.2's and 1.4's gaps were flagged by the reviewer before the author played (110), and 1.1's by its own notes. One player who knows the rules is weak evidence about players, but the gaps are in the layouts, whoever plays them.

Where: Teaching, after guideline 32, as a list of its own: the line `<!-- Added after run 1 -->` between guideline 32 and it, each with a blank line on both sides.

New:

> 108. `Should` **Teach only what every route forces.** Check each thing a chamber's entry says it teaches against every route, not only the shortest (guideline 102). A move only offered goes unused when another way costs one shot more: the author's run of chamber 1.2 walked into the same colour both times. A clue met only by a wrong try, such as a near miss on steel (guideline 4), reaches only players who make it: the author shot no steel in chambers 1.1, 1.2 and 1.4. A refused action can't be forced, since a player who expects the refusal never tries it: force the way round it, as chamber 1.4 forces putting the box down to shoot. What a chamber can't force, a later one forces before any chamber relies on it.

### 6. Guideline 40: edit

Source: Run 2 lesson 4; notes of 1.3 and 1.4. Run 1 checked this case twice, once in each box chamber, the same way each time. Scoped to a door in a one-tile gap, since a door in open floor passes shots from every side.

Old:

> Each such chamber decides whether that move is the lesson or a cheat, and breaks the line if it's a cheat.

New:

> Each such chamber decides whether that move is the lesson or a cheat, and breaks the line if it's a cheat. A door in a one-tile gap passes shots only along its own line, since a shot sideways from the doorway hits its frame, which takes no portal: check that line, whether the button is on it and the first wall past the door takes portals. A door right in front of the exit leaves the line nothing to hit (chambers 1.3 and 1.4).

### 7. Guideline 43: cut

Source: Trim pass. The detail of which tiles moved adds nothing to the point.

Old:

> Playground 10 reuses the room of Playground 9 with the receiver moved to the bottom wall, the one change that breaks its answer (the exit and a few wall tiles moved with it), so the ray must come down from a portal on the ceiling, where the answer of Playground 9 runs it into the right wall.

New:

> Playground 10 reuses the room of Playground 9 with the receiver moved to the bottom wall, so the ray must come down from a portal on the ceiling.

### 8. States to avoid: "Shut by its own ray": cut

Source: Trim pass. It repeats 92 nearly word for word, and this section is an index that points at the guidelines.

Old:

> - **Shut by its own ray:** a door, the exit or a light barrier that a receiver holds open, standing in that receiver's own ray, shuts once anything cuts the ray before it, and from then on stops the ray itself, so it stays shut; and a portal carrying the ray, on a blocked wall that receiver unblocks or facing a fizzler it holds off, closes once anything cuts the ray, and can't open again while the receiver stays dark (guideline 92).

New:

> - **Shut by its own ray:** a door, the exit or a light barrier that a receiver holds open in its own ray, or a portal carrying that ray on a wall the receiver lets take portals, shuts once anything cuts the ray and stays shut while the receiver is dark (guideline 92).

### 9. Guideline 62: cut

Source: Trim pass. The gate examples repeat `docs/elements.md` (receivers, links), fixtures included, and the last sentence repeats 92. The rule, the antlines, "no either" and the arrows stay.

Old:

> Gates like these make good puzzles: a door a button and a receiver link opens once a box holds the button while the ray runs uncut, and closes when a box is put down in the ray or the subject steps into it; a door a switch and a button link opens only while the button is held once the switch has been used, whether the switch is used before the button goes down or while a box holds it. An arrow a link turns follows the same rule, turned only while all of its links are active. A door that its own receiver's ray must pass to reach the receiver opens only once a ray reaches the receiver some other way first (guideline 92).

New:

> An arrow a link turns follows the same rule, turned only while all of its links are active.

### 10. Guideline 66: edit

Source: Run 2 lessons 2 and 3; wording check; 1.4 wrong try 7. Every run 2 chamber comes before the turn key, and run 2 is all about shots. The rewrite adds shots, the facing a held key changes after a crossing, and the fact that walking into a wall faces it (lesson 2). It comes out about 35 words longer than today's text.

Old:

> 66. `Must` A box is put down only on the tile the subject faces; when that tile can't take it, the key is refused. Holding the turn key faces the subject any way without moving, so a box can go on any tile next to one the subject can stand on, if that tile can take it; only an arrow tile, where the subject can face nothing but the arrow's way, limits which way it faces; on an arrow a link turns, that way changes as it turns. Don't count on the way the subject walked in to keep a box off a tile. Until the campaign has taught turning in place (guideline 29), every put-down a route needs must work without the turn key, and without it the subject faces a tile that can take a box only from its start, or after stepping towards it, coming out of a portal facing it or picking a box up from it. So the tile a box must go on, such as a button, needs a run-up: a tile beside it with another beyond, in line, both floor the subject can walk carrying the box; or else a wall side that takes portals in line behind the tile beside it, which the subject comes out of carrying the box, facing the tile, once both portals were placed with free hands, since the portal keys don't shoot while a box is carried. A player who walks onto a button with its box must step off and come back at it from two tiles away, so each side with a run-up shortens the walk round.

New:

> 66. `Must` A box is put down only on the tile the subject faces; when that tile can't take it, the key is refused. Holding the turn key faces the subject any way without moving, so a box can go on any tile next to one the subject can stand on, if that tile can take it, except from an arrow, which lets it face only the arrow's way. Don't count on the way the subject walked in to keep a box off a tile. Until the campaign has taught turning in place (guideline 29), every put-down and every shot a route needs must work without the turn key. Without it, a move key only turns the subject where the tile ahead can't be entered (a wall with no portal to cross, an open ditch, a box), so any wall can be shot from the tile in front of it; a tile it could enter, it faces only from its start, after a step that way, coming out of a portal facing it or picking a box up from it. So a tile a route shoots from along open floor needs a run-up, the tile behind it in line; a tile a box must go on, such as a button, needs a tile beside it with another beyond, in line, both floor the subject can walk carrying the box. Either run-up can be a wall side that takes portals in line behind, the subject coming out of it facing the right way, both portals placed with free hands; a key held through that crossing acts again its own way once it repeats (guideline 26). A player who walks onto a button with its box must step off and come back at it from two tiles away, so each side with a run-up shortens the walk round.

### 11. Guideline 109: add, `Should`

Source: Run 2 lesson 1; playtest of 1.2. This is how 108 works out for portals, and run 2 needs it twice (its 2.3 and 2.4 entries). Reworded: the room's shape forces it too, not only a box, as 1.4's ledge does.

Where: Element rules, Portals, after guideline 75, as a list of its own: the line `<!-- Added after run 1 -->` between guideline 75 and it, each with a blank line on both sides.

New:

> 109. `Should` **Force which portal moves, and which is the way in.** With walls and ditches alone, the player picks which colour goes where for one more shot at most, since the subject can shoot any face it can walk up to once that face is empty, so such a lesson is only offered (guideline 108). Two things force it: a box resting in front of the face just come out of shuts that portal, so it is the one to move; and a part that sees no face but the one it was entered by is left only through the portal the subject came out of (chamber 1.4's ledge), a trip a route makes only for something there, such as a box.

### 12. Guideline 78: edit

Source: Run 2 lesson 5; 1.4's notes. Today's text covers only a portal closing by itself, never one the player moves. Sharpened from the lesson: only moving the portal that leads back strands the player. Moving the other can be undone by shooting it back.

Old:

> 78. `Must` A part of the chamber the subject reaches only by portal needs a way back: a wall side it can shoot from inside that brings it out again, and the portal it came out of must not close behind it (guidelines 60 and 73).

New:

> 78. `Must` A part of the chamber the subject reaches only by portal needs a way back: a wall side it can shoot from inside that brings it out again, and the portal it came out of must not close behind it (guidelines 60 and 73). The player's own shot can lose it too: moving the portal that leads back onto another face in view strands the subject, unless the part also sees a face leading back. A part that sees no face but the one it came out of is safe: every shot from inside misses (chamber 1.4's ledge).

### 13. Guideline 92: cut

Source: Trim pass. The fixture is named; how it works is in `docs/elements.md`.

Old:

> (fixture `ray_held_door_closes_behind_subject`, where a second emitter's ray, turned by a mirror box, opens the door)

New:

> (fixture `ray_held_door_closes_behind_subject`)

### 14. Guideline 99: cut

Source: Trim pass. "Must fit" in a `Should` read as a demand, but the game already fits every chamber to the screen. What remains for the designer is the size.

Old:

> 99. `Should` Every chamber must fit the screen whole, since there is no camera: the whole chamber is always on screen, scaled to fit and centred, with no scrolling, so its tiles shrink as it grows, to about 40 px for Playground 2 (20 × 20) on a 1080p screen. Keep a chamber no larger than its puzzle needs, so its elements stay easy to read. Tiles stop growing below 16 tiles either way: a smaller chamber gets the tiles a 16 × 16 one would, with more room around it.

New:

> 99. `Should` There is no camera: the whole chamber is always on screen, scaled to fit and centred, so its tiles shrink as it grows, to about 40 px for a 20 × 20 chamber on a 1080p screen, and stop growing below 16 tiles either way. Keep a chamber no larger than its puzzle needs, so its elements stay easy to read.

### 15. Patterns: fact 1, and pattern 15: merge

Source: Trim pass. Fact 1 repeated 62's "doors in series" and "no either" sentences. Pattern 15 pointed at fact 1 for doors in series, so it now points at 62.

Part 1, old:

> 1. **All of them, never either.** Several buttons, switches and receivers on one element open it only while all of them are active, and releasing or darkening any one closes it again (guideline 62). Doors in series, or a receiver that switches on a second emitter whose ray reaches a second receiver, build the same with each input shown as a door or a ray of its own. "Either input opens it" can't be built on one element: give each input a route of its own.

Part 1, new:

> 1. **All of them, never either.** Several buttons, switches and receivers on one element open it only while all of them are active, so "either input opens it" takes a route per input (guideline 62).

Part 2, old:

> | Each input shows as its own open door (fact 1) |

Part 2, new:

> | Each input shows as its own open door (guideline 62) |

### 16. Patterns: fact 2: cut

Source: Trim pass. The "every input active" rule is in 62 and in fact 1. The point of fact 2 is that a link can't close anything.

Old:

> 2. **Links only open things.** Pressing, using or lighting unblocks, once every input on the element is active; releasing or darkening any of them blocks again, and a used switch stays active until the chamber restarts. "Press X to close Y" can't be built directly.

New:

> 2. **Links only open things.** Pressing, using or lighting only unblocks, and releasing or darkening blocks again, so "press X to close Y" can't be built directly.

### 17. Checking a chamber: intro: edit

Source: Follows 110. Two lines outside the handbook cite "guidelines 100–104" as the checks before the author plays. They are in open question 2.

Old:

> Guidelines 100, 101, 102, 103 and 104 run on every draft before the author plays it, and again after every change; guidelines 105, 106 and 107 are the author's play and what follows it.

New:

> Guidelines 100, 101, 102, 103 and 104 run on every draft before the author plays it, and again after every change, and guideline 110 once they pass; guidelines 105, 106 and 107 are the author's play and what follows it.

### 18. Guideline 104: edit

Source: Notes of 1.2, 1.3 and 1.4 (checks; 1.4's variants B and G). Chambers 1.2 to 1.4 were checked this way, at 400 to 1,318 states each. The walk without the turn key is what cut 1.4's variant B (12 states that can't be finished), and the full walk cut variant G (3,192). The solver's routes showed neither.

Old:

> should end where the player can see what stopped it (a miss ripple, a band reacting, a door staying shut, an antline left unlit).

New:

> should end where the player can see what stopped it (a miss ripple, a band reacting, a door staying shut, an antline left unlit). In a small chamber, also walk every reachable state through the rules' step and check each can still be finished, and until the turn key is taught, again with it never pressed (guideline 66): this found the dead ends of two of chamber 1.4's variants.

### 19. Guideline 110: add, `Should`

Source: Notes of 1.1 to 1.4 (independent checks). Run 1 did this for every chamber, but no doc asks for it. Its findings moved 1.3's start, and it predicted both things the author's play showed (1.2, 1.4).

Where: Checking a chamber, between guidelines 104 and 105, as a list of its own: the line `<!-- Added after run 1 -->` between guideline 104 and it, and the line `<!-- -->` between it and guideline 105, each with a blank line on both sides.

New:

> 110. `Should` **Have a fresh reviewer check it.** Once a draft passes guidelines 100 to 104, give a reviewer who hasn't seen its notes (a fresh agent) only the chamber file and its entry in the plan, to look for shortcuts, dead ends, refusals that look like bugs and lessons no route forces, and answer each finding in the notes. In run 1 its findings moved chamber 1.3's start and foresaw both things the author's play showed (chambers 1.2 and 1.4).

### 20. Guideline 105: edit

Source: 1.4's lesson line; the friend's playtest. The friend's run left only "nothing confused them", which can't show whether they met 1.4's refused shot. Analytics already sends moves, portals and restarts from a deployed build.

Old:

> One or two friends play each finished run cold. Note in the chamber's notes where each player got confused and what helped them, a teach chamber above all.

New:

> The author knows every rule, so their play tests a chamber's puzzle more than its teaching. One or two friends play each finished run cold. Note in the chamber's notes where each player got confused and what helped them, a teach chamber above all, and each friend's route, or else each chamber's moves, portals and restarts from analytics (deployed builds only): "nothing confused them" can't show whether a friend met a lesson.

## Rejected

| # | Proposal | Reason |
| --- | --- | --- |
| 1 | Run 2 lesson 6: with one box and one button, the box has one job | It holds only while a chamber has one box, one button and nothing else for a box to do: from run 9 a box also stops slides, and from run 10 it cuts rays. Its general point, that "needed elsewhere first" takes a second use, already follows from fact 2 (links only open things) and pattern 1 (the catch). Its example doesn't hold either: a second element on the same button opens along with the first, so it gives the box no second place to be |
| 2 | Run 2 lesson 2, past its first fact | "'The only tile that sees this face' is never the only one" restates that fact. "A box taking away a tile to shoot from matters only for faces the subject comes out in front of" is a narrow case, hard to parse, and only the reason `run_2_detail.md` left an idea out, which that file already says |
| 3 | Two refusals sharing one error sound (1.4, wrong try 13: a shot while carrying, then a put-down facing a ditch) | Only the reviewer flagged it; no player met it. Add it to guideline 9 if a playtest shows it |
| 4 | Walking into a lone portal does nothing, silently (wrong try 6 in 1.1, 8 in 1.2, 12 in 1.4) | No player was confused by it, and it comes from the rules, not a layout: a matter for hints, if they are built |
| 5 | Hints aren't needed (guideline 31) | Run 1 had none and the friend wasn't confused, but one friend with no recorded route is too little to change a `Must` |
| 6 | Run 1 is too easy | The author took the intended route with no wasted press in 1.1, 1.3 and 1.4. They know every rule, so this says little about other players, and guideline 105 already expects chambers to be harder for players than for their designer |
| 7 | Runs come out smaller than guessed (guideline 42) | Run 1 went from five chambers to four and run 2's guess from 5–7 to four, but run 2 isn't built yet: one run is not a pattern |

## Open questions

| # | Question | Recommendation |
| --- | --- | --- |
| 1 | Numbering: keep today's numbers (new ones 108 to 110, placed as above), or renumber everything in order? Guideline numbers are cited 330 times in 11 tracked files. 127 citations are inside the handbook. The other 203 are in 10 files: the idea pool 83, chamber notes 69 (1.1: 7, 1.2: 10, 1.3: 22, 1.4: 30), `run_2_detail.md` 28, `docs/campaign.md` 16, `todo/campaign.md` 5, `AGENTS.md` 1 and `docs/solving_by_hand.md` 1. Together they cite 68 different guidelines, two through the range "100–104". Scripts and code cite none | Keep them, as the author's default says. Renumbering means about 330 edits, most in records (chamber notes, the idea pool), where a slip quietly cites the wrong guideline, and old commits would keep the old numbers. Renumbering only buys reading order: 108 after 32 reads oddly in the source, but change 1 explains it and the preview numbers it right |
| 2 | Guideline 110 makes two lines outside the handbook incomplete: `docs/campaign.md` ("guidelines 100–104", the checks before the author plays) and step 2 of the workflow in `todo/campaign.md`. Update them in the same change? | Yes: "guidelines 100–104 and 110" in the first, and "then a fresh reviewer (guideline 110)" added to the second |
| 3 | Guideline 66: the full rewrite (change 10), or lesson 3's sentence appended to today's text? | The rewrite: it covers put-downs and shots in one pass, for about 35 words more. Appending adds about 70 words and leaves two separate lists of the ways the subject comes to face a tile |
| 4 | Guideline 62: cut its two worked gate examples (change 9)? | Cut them: `docs/elements.md` gives both, with their fixtures, and a designer working on switches or rays reads that first. Keep them only if the handbook should show what such gates are good for |
| 5 | Guideline 108: `Should` or `Must`? | `Should`. Run 1 shows a lesson can't always be forced (1.2's walls alone couldn't force either colour), and guideline 45, a `Must`, already keeps any chamber from coming before what it needs |
| 6 | The state walk in guideline 104 was a throwaway script in each of run 1's chambers. Add it to the repo's tools? | Not in this step: the guideline doesn't depend on a tool. Add a script if run 2's chambers need the same walk again |

## Length

`docs/level_design.md`, counted with `wc` (words are runs of characters between spaces), before and after every change above:

| # | Handbook | Lines | Words | Guidelines |
| --- | --- | --- | --- | --- |
| 1 | Today | 394 | 14,900 | 107: 40 `Must`, 67 `Should` |
| 2 | After | 409 | 15,384 | 110: 40 `Must`, 70 `Should` |
| 3 | Change | +15 | +484 (+3.2 %) | +3 |

The additions come to about 740 words and the trims to about 275 (the three comment lines account for the other 20), so the trims pay for a little over a third of what run 1 adds.
