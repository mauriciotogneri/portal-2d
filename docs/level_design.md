# Level Design

The handbook for designing the campaign's chambers (`src/chambers/`): what makes a chamber worth playing, how chambers follow each other, how to build one, what each element demands of a layout, patterns to build from, and the checks every chamber passes. It goes beyond what the chamber check rejects (`docs/elements.md`, "What the validator rejects"), and nothing checks these guidelines for us. The campaign plan (`docs/campaign.md`) says which chambers to build; each chamber's key move and intended route are kept apart from it, in its notes under `docs/spoilers/`, so the author can play every draft cold.

Every guideline is marked:

- `Must`: every chamber follows it. Breaking it lets the player reach one of the [states to avoid](#states-to-avoid), or leaves the chamber unchecked. Break one only on purpose, such as a trap the chamber makes plain, and write the reason in the chamber's notes.
- `Should`: a principle that makes a chamber or the campaign better, weighed with judgment against the others.

The guide grows with what we learn: when designing, building or playing a chamber turns up a pitfall or a tip, add it here, marked, and fix or remove any guideline that no longer holds. A lesson that holds only for one chamber stays in its notes.

**Contents**

- [Principles](#principles)
- [The campaign](#the-campaign)
- [Building a chamber](#building-a-chamber)
- [States to avoid](#states-to-avoid)
- [Element rules](#element-rules)
- [Patterns](#patterns)
- [Checking a chamber](#checking-a-chamber)

## Principles

What makes a chamber worth playing, whatever its elements.

### Aha, not trial and error

1. `Should` **The goal is obvious; the puzzle is how.** Show the exit, and what holds it shut, from the start, so the player works out how to get there, never what to do.
2. `Should` **Build on a catch.** The catch is two goals that seem in direct conflict; the smallest case is a button that opens a door the subject can't reach while standing on it. It resolves by changing the order, by starting from somewhere else, or, best, by a revelation: a consequence of the rules that isn't obvious but is logical, and joins the player's toolbox. A chamber whose catch is too easy, or that has none, is busywork.
3. `Should` **Lure the player into the catch.** The best chambers invite a wrong assumption that walks the player into the catch: it gives them a place to start, builds their picture of the chamber, all but guarantees a first failure, so they feel stumped instead of stumbling into the answer, and points them at the catch. A lure is built from real rules, never from a decoy.
4. `Should` **A lure fails plainly and soon.** A near miss reads as nearly right: a slide stopping one tile short of the button, a ray ending one tile from the receiver, the only portal face one row off the line. Unless the near miss is the clue, make the lure fail by a clear margin, or for a reason the game shows at once (a door shutting on the step off its button, a band flaring on a refused shot), and within a few moves, before the player has built much on it.
5. `Should` **Make the catch provable.** Keep the movable parts few (one box, few faces that take portals), so the player can rule out the obvious routes by reasoning; feeling sure it's impossible while knowing it isn't drives them on.
6. `Should` **Truth, not hardness; no one-off tricks.** An aha must show something true about the rules, or it feels empty: design for the pleasure of understanding, not the pride of beating something hard. A technique a chamber requires is one the campaign has taught or will use again: a solution that works at only one moment, which players can't experiment towards, feels like a trick, teaches little and leaves them suspicious in every later chamber.
7. `Should` **Let the rules shape the chamber, not the designer.** A draft that needs a pile of one-off patches, such as a lone blocked wall tile on the exact face a shortcut uses, reads as the designer saying no. Prefer a fix the room's own shape explains; when patches pile up, rethink the room.
8. `Should` **Kill trial and error.** Keep the steps few but the odds of any one guess low. The dial is how many faces take portals: two shots and a carry are quick to play but hard to stumble into when many faces take portals, while a room with one portal face teaches and doesn't test. Gate the chamber so that stumbling dead-ends. Rays are always on and invite wiggling into an accidental solve, which robs the player of understanding: put the insight where wiggling can't reach it, such as which wall must hold a portal, or where a box must already be before a slide.
9. `Should` **Don't make a refused action look possible.** Players repeat an action that isn't obviously impossible: shooting the wall behind an end plate (guideline 72), shooting across a light barrier as if it were a laser, shooting while carrying, putting a box down while on a switch (guideline 80). Each shows a miss ripple or plays the error sound; where the layout still makes one look possible, move the elements apart or give the shot another wall.

### Difficulty

10. `Should` **Make it harder by tangling, not by enlarging.** Neither the number of states nor the length of the shortest route predicts how long players take. What does: moves that take things away from their goal, and above all how often the route switches between the chamber's parts (a box, a portal) and goes back to one already started. One compact room where the route weaves between two boxes takes far longer than two rooms solved one after the other. So tangle the subgoals: one box needed on two buttons in turn, a portal placed for the first goal that breaks the second, a box carried away from its button first. The solver's fewest moves count walking, which adds nothing; the nearer measure is the number of walk-then-one-action steps on the shortest route.
11. `Should` **One key move, the rest turned down.** Players spend most of their time before the hard step and finish quickly after it, and each extra bottleneck adds to that. Name the one thing that makes the chamber hard and keep everything else plain: few kinds of element, a short route, subgoals in any order. Mark each chamber in its notes as a gem (one hard step, a short route around it) or a flow (several easy steps and no catch, such as a rest or a show chamber). A long route with more than one hard step is a slog: cut a step or split the chamber. Designers spot difficulty that comes from the idea but underrate difficulty that comes from the layout, such as length and a fixed order.
12. `Should` **Presentation is a dial.** The same puzzle gets much harder or easier by how it's shown: whether the player builds the setup or only triggers it (a mirror box already resting in the ray), where boxes start (one starting in a ray shows that boxes stop rays), how many faces take portals, and whether the spot where the setup is made looks onto its target. Turn each towards hidden for a harder chamber, towards shown for a teach chamber. When a chamber turns out too hard, try moving a box's start a tile or two before redesigning, and recheck guidelines 63, 64 and 65, since a box's start is also where it lands when sent back.
13. `Should` **Count routes, steps and options.** Every extra route the solver turns up makes a chamber easier, not just untidier. More steps make it harder, too many tedious. Too many options at each moment overwhelm; too few let players repeat whatever is in front of them until it works. With rays, difficulty comes from the turns and crossings in the solution, hardly from the number of emitters and receivers.
14. `Should` **Never make a chamber hard by shuffling a solved state.** The difficulty comes out arbitrary.

### Clarity

15. `Should` **Every element matters.** A piece the solution doesn't use is busywork that every restart replays, and clutter creates shortcuts, not difficulty: before adding an element to hide the answer, ask what simpler solution it enables. If one box gives a chamber away, the fix is a better idea, not a second box. When every tile has a purpose, players trust the chamber; once they meet a decoy, they hunt for decoys everywhere.
16. `Should` **Nothing that looks usable is unusable.** A box, button or switch in a sealed area reads as a target, and players keep trying to reach it. A lone face that takes portals among blocked walls reads as one that must be used; an unused stretch of portal wall doesn't.
17. `Should` **Use the plainer element, and make look-alikes differ.** A closed door and a light barrier that is on both stop walking, shots and rays; a laser that is on and an open ditch both stop walking and let shots and rays through. They differ mostly in placement (a light barrier or a laser can lie over slide floor and runs between end plates; the walls facing a door never take portals). For each element in a draft, ask what only it does there, and use the plainer one when the answer is nothing. Two similar elements shown together must differ in a way that matters in that chamber.
18. `Should` **Few kinds of element.** Players give up before trying a chamber with too much to take in at a glance: aim for two to four kinds of element per chamber. Variety belongs to the campaign, not the chamber: a combine chamber makes its elements act on each other, while a box room, then a slide room, then a ray room in one chamber is three chambers.
19. `Should` **Everything visible reads as meant.** On a single-screen grid with no decoration, every odd niche and tile shape is read as intent. Players assume they have exactly what they need and that objects stay where they're useful: a box on a button whose door is open reads as done, so a chamber whose answer lifts it off again has no spare box to try first. Symmetry makes a chamber easier to take in and points at its one odd tile: put the break where the answer is, and check that a wall added only to stop a shortcut isn't the loudest odd tile in the room.
20. `Should` **Match what matters with what stands out.** Eyes go to movement and light: lasers, open portals and rays glow, fizzler fields drift and light barriers flicker, so an animated element is noticed before a still one, and a moving distractor pulls harder than a still one (see also guideline 48).
21. `Should` **Only fair red herrings.** Unfair: decoration that seems to matter, leftovers of removed puzzles, and a wrong approach that can't be proven wrong, the most discouraging of all. Add no decoys; players find their own. Fair: a lure built from real rules that the player's own reasoning produces (guideline 3), or several plausible uses of the same real elements, only one of which works. A wrong approach that fails at once and visibly is fair; one that doesn't is closed off (with a face that refuses portals, say) or made to fail visibly within a few moves.
22. `Should` **Show progress, and let a solved part read as done.** Make each subgoal show when it's reached (an antline lighting, a door opening, a receiver lighting), and give a sure first subgoal within the first few moves. The whole chamber stays on screen, so a finished part stays in view: keep the chamber compact, and let what is done look done (its door open, its antline lit), so the player can tell which elements still matter. Separate independent subpuzzles visibly, or players take them for one big puzzle.
23. `Should` **Nothing looks like a timing check.** Slides and walk-outs animate, so never lay out a chamber where a slide looks like it has to be beaten or caught in time: players who suspect reflexes once suspect them everywhere.

### Teaching

24. `Should` **First contact is forced, safe and unambiguous.** A room where the only thing to do is the new move, with the reward just beyond. Lay out a teach chamber so wandering around doesn't solve it; if a player can still stumble into the answer, the next chamber checks the idea.
25. `Should` **Show it before requiring it.** Demonstrate a consequence on something unimportant first: a box the player doesn't need, lying where a door closes or a fizzler switches on, shows destruction and return before the player's own box is at stake; a mirror box already resting in a ray shows the turn. Rules that look like bugs at first (the portal keys silent inside a fizzler that is on, a slide loop refused, a switch refusing a put-down, a button slid over unpressed) need this most: a chamber that uses one on purpose shows it first where nothing is at stake.
26. `Should` **Make the player stop where it matters.** A held key repeats and a slide carries the subject past, so where a chamber shows something the player must notice, make the route stop in front of it: a door to open, a button to press, a slide that ends facing it.
27. `Should` **Correct the likely wrong belief, and teach no false one.** When players are likely to assume something false (such as a portal's far end staying put), give them a chamber that forces the opposite. Watch for a chamber that teaches something false or punishes the right move: a button meant for the subject sends players looking for a box that isn't there.
28. `Should` **Show that what looks lost isn't.** With no undo, a player who thinks they've lost presses Restart and learns a wrong rule. Likely false losses: a box breaking up (it flies home), both portals fizzling (shoot again), a portal vanishing as a blocked wall shuts, a door closing behind a portal that still leads back. Before a chamber relies on the player carrying on after one of these, an earlier chamber shows it can be undone.
29. `Should` **Teach the moves the controls hide.** Turning in place with the turn key is the only way to face a free tile without stepping onto it, and so to put a box down there (guideline 66); shooting through a door held open is another. A line in the controls legend isn't a lesson: give each such move a chamber where it is the only way, before any chamber relies on it.
30. `Should` **Consistent cues build habits.** Once early chambers always pair a button with a box, a button meant for the subject alone breaks the habit: good for a twist, confusing in a teach.
31. `Must` **Teach with the layout.** Every teach chamber works on its layout alone: put the first thing to use in view of the start, and let sightlines and antlines point at the next step. A narrowed opening says "use me" where an open wall says nothing: one gap in a fizzler run, one portal face among blocked walls. When a choice doesn't matter to the idea (which side of a fizzler to shoot from, which portal first), make every option work, so no one stalls on it. Tutorial hints (`docs/hints.md`, not built) are a backup for the first few chambers only: they say what an element is or does, never how to solve, and no chamber is designed around one.
32. `Should` **A show chamber looks as simple as it is.** A trivial chamber that just shows a consequence can delight; not every chamber needs a challenge. But players who expect a puzzle hunt for one, and nothing in the game tells them otherwise, so a show chamber has few elements and its answer is the first thing in view. A joke chamber (looks hard, one insight) risks the same hunt.

### Dead ends and tedium

33. `Should` **Design dead ends out.** The game has no undo, so deal with every dead end in this order of preference: design it out; make it visibly fatal at once; keep the replay short. A dead end costs the time before the player notices it plus the restart, and a hidden one teaches nothing (guideline 76). Restart replays every move before the failure, so put the step the player should experiment with near the start of the route, or keep the moves before it few.
34. `Should` **The catch early, nothing new late.** When a chamber's steps must come in a fixed order, put the catch in the first step, make every later step plain, and allow no dead end or new trick after the key move. A hard step the player can take in any order costs less than one fixed late.
35. `Should` **Build recovery in.** In box-and-door chambers, players portal the box past the door and trap themselves with buttons but no box. A destroyed box returns to its start and a switch can send a box home, so a switch reachable from where a box might get stranded is a rescue path. Once an area is solved, a short way back to its box spares a player who tried something.
36. `Should` **Let players experiment safely.** Fear of failure kills experimenting. A switch can't be undone and an arrow is a one-way step, so keep both off the tiles a player crosses while looking around, and let walks and shots be tried before anything is committed. Keep chambers short enough that a restart isn't a punishment.
37. `Should` **Walking is not thinking.** Long walks add tedium, not difficulty. A choice among a few options (which button gets the box, which face gets the portal) whose result only shows after a walk will be tried one by one: show the result where the choice is made (an antline lighting, a door in view). Once the idea has clicked, don't make the player carry it out through a long move sequence: replaying a solved chamber should take a minute at most.

### Shortcuts

38. `Must` **No route skips the idea.** In a turn-based game a slower route costs nothing, so making a shortcut longer steers no one: a walking or portal route that works will be taken. Close every one that skips the chamber's idea; a skip that takes more skill than the intended route may stay. The checks under [Checking a chamber](#checking-a-chamber) find them.
39. `Should` **Close a shortcut by taking away its cause.** Remove what makes it possible (a wall tile, a blocked wall in place of a face that takes portals, a moved box start, slide floor made plain) rather than punishing it (a fizzler across it, an arrow into a pocket), which also hurts honest players who wander there.
40. `Must` **Decide the shot through an open door.** Shots pass an open door, so "stand on the button, shoot through the doorway, step off, shoot the second portal on this side, cross" skips the box wherever a button holds a door open and the button's tile sees a wall beyond it that takes portals. Each such chamber decides whether that move is the lesson or a cheat, and breaks the line if it's a cheat.

## The campaign

How chambers follow each other. The plan (`docs/campaign.md`) outlines every run (which elements arrive, in what order, and what each run teaches) and details only the next run, each chamber by its part, its elements and what it should teach, never by its key move. The conventions the campaign keeps, such as whether every box in a chamber is needed and whether every link has an antline, are written there too: players push through "this seems impossible" only for a designer they trust, so make each convention plain and break none by accident.

41. `Should` **Teach, test, twist, combine.** Bring in each mechanic, and each existing element the campaign teaches, through a run of chambers in four parts, in this order:
    - *Teach*: the mechanic alone, with no way to fail at understanding it, since using it is the only way forward. Playground 5 opens by sliding the subject across a slide room.
    - *Test*: the mechanic alone, but the player must use it on purpose. Playground 10 needs a ray aimed where the answer of Playground 9 doesn't send it.
    - *Twist*: an unexpected consequence of the rules, such as a fizzler on a slide's way closing the portals mid-slide, or a door that shuts as the subject steps into the ray holding it open. In Playground 8, stepping off a button onto the arrow it turns lets the arrow turn back under the subject. A twist brings no new element; it shows a new consequence of the ones already known. For a hard twist, break a belief several chambers trained; for an easier one, a local assumption. Leaving out something nearly every earlier chamber had is hard to notice, and so makes a strong twist.
    - *Combine*: the mechanic with earlier ones.
42. `Should` **Size a run by what the element can say.** A full run is 10–12 chambers: 1–2 teach, about 3 test, about 3 twist and 3–4 combine. A short run of about 4 has room for about one of each, and a combine chamber can serve two mechanics at once. Before planning a run, count the element's distinct consequences (its cells in the interaction table of `docs/elements.md`, plus triples, which give the least predictable results): a run with more chambers than consequences repeats a trick. One teach chamber per element is enough, and a run of easy chambers on the same thing is cut to its best few.
43. `Should` **A test can reprise its teach chamber.** A test chamber can reuse its teach chamber's room with one change that breaks the teach chamber's answer: Playground 10 is the room of Playground 9 with the receiver moved to the bottom wall, so the ray must come down from a portal on the ceiling, where the answer of Playground 9 runs it into the right wall. It can also ask for the teach chamber's move again with a catch: Playground 6 asks for the move of Playground 5 twice, the second lane entered only by sliding back into the portal just come out of, so the other portal is the one to move. If the reprise's answer is an alternate solution of the original, some players used it already.
44. `Should` **One key move early, several routes later.** A run's teach and test chambers need one key move, not one route: routes may differ in which tile a shot is fired from, but none skips the move (guideline 102). Its twist and combine chambers may allow several solutions. A trivial unintended route in an early chamber can stay if it still teaches something new.
45. `Must` **Nothing before what it needs.** No chamber comes before the chambers that teach what it needs, and the tutorial run comes first. Set the order by playtests (guideline 105); analytics can inform it, but a few players are too few to rank chambers by difficulty. A chamber's number and link follow its place in the list, while its completions and best times follow its permanent id, so a reorder renumbers chambers without losing progress: say what moved in the changelog. A tweaked chamber keeps its id; a redesigned one is a new chamber with a new id, so old progress doesn't mark it done.
46. `Should` **Pace as a sawtooth, not a ramp.** Introduce each element alone in a simple chamber, practise it, combine it, let complexity rise, then reset with the next element: a steady ramp makes the last third exhausting. Put a short, easy chamber, such as a show chamber (guideline 32), between hard ones; easy needn't mean big (guideline 99). Have something new arrive at least every 15–30 minutes of play, a new element or a show chamber, since puzzles alone start to feel dry and the game has no story to carry the player.
47. `Should` **Bridge a jump; plant fragments, don't rehearse.** When a chamber asks too big a jump from the one before, add or change a chamber before it: design the chamber between the two, or split a step that needs two new ideas into chambers needing one each (a ray needing two turns, by a mirror box and a portal pair, comes after chambers that each need one). Teach a mechanic in the chamber just before the one that applies it, but plant a twist's fragments a few chambers earlier (the key move on its own, a side action repeated until it primes the idea, a layout that shows the whole space at a glance), so the player forgets them just long enough and puts them together alone: a chamber just before that rehearses the answer cuts the solve time and kills the aha. If a chamber is still too hard after a bridge, move it late, where nothing after depends on it. When two chambers' entries in the plan say the same thing, cut or merge one.
48. `Should` **Bring an old trick back before it's needed.** Players forget an earlier trick once a big new element arrives, and fixate on a new, animated element (a light barrier, a ray, a fizzler's field) over the tools they already have. Bring the trick back just before a chamber needs it again: when the answer is a plain crossing, make the chamber's first step, or the chamber before it, need the same crossing in a plain room. Priming an old tool is fine; handing over its catch isn't.
49. `Should` **Take the training wheels off at the end of a run.** The run's last chamber drops the cue that pointed at the move, so the player sees it works anywhere.
50. `Should` **The hardest challenges go where nothing depends on them.** Every chamber is required, and later ones assume earlier ones were learned, so a subtle truth for attentive players never gates the next chamber. Put the hardest challenge in a second route of a twist or combine chamber, or in a late chamber nothing after depends on. The last chamber needs synthesis and spectacle, not the hardest catch: a very hard required finale is resented.
51. `Should` **Sketch a run's combine chamber first.** When detailing a run, sketch its combine chamber first (in the notes), list the few things in it players won't understand yet, and derive the teach, test and twist chambers that plant them. Build and play them in play order all the same, so each cold play comes after the chambers before it.

## Building a chamber

52. `Must` **Keep two records per chamber.** Its entry in the plan: its part (teach, test, twist, combine, show or rest), its elements, what the player must already know and what it should teach, with nothing that gives the answer away. Its notes, `docs/spoilers/chamber_<id>.md`, which the author reads only after playing the chamber cold: the one-sentence idea (guideline 53); its purpose (teaching, reinforcing, a memorable moment or a rest; if none can be named, rework or cut it); gem or flow (guideline 11); its intended route in five or six key steps (box onto B1; blue portal on W from B1; box to B2; cross; exit); its lure and where the player should get stuck; each restriction and the shortcut it blocks (guideline 55); the facts that must never be possible (this face never takes a portal; this tile is never reached before the box is placed); any guideline broken on purpose, and why; and what each playtest showed. Re-read its place and difficulty at every draft: a chamber that outgrows its entry moves later or splits in two.
53. `Must` **Write the idea first.** Before placing a tile, write the chamber's idea as one sentence: the move that, once known, makes the chamber trivial. If it can't be written, the chamber isn't focused. Start from the one interaction the solution must contain and work backwards from it.
54. `Should` **Build the smallest room where that move is the only way through**, with no needless walking. For a teach chamber, or one meant to be worked out before the first move, place each piece in the order the player will notice it, so each deduction forces the next (the only face past the ditch that takes portals is in this column → shoot it from this column → this column is reached only carrying the box → put the box down first). For a chamber of several steps, work back from the exit, charting what each step needs; aim for a diamond, where one solve opens two or three paths that rejoin.
55. `Should` **Play it as an adversary.** For each shortcut, add exactly one restriction and write in the notes what it blocks. Delete any restriction that blocks nothing: it has become a red herring.
56. `Should` **Run the noise test**, at least twice per chamber: describe the solution, then remove every tile and element it doesn't mention. Keep such a piece only to block a shortcut (noted as in guideline 55), to stop an accidental solve, to change the pace, or to set up a lure; a lure that wouldn't mislead anyone is clutter. Trim the possibilities too: fewer things to do that aren't the solution, more empty space, no tight box shuffling. Every plain wall face takes portals, so each is a possibility: make the faces the idea doesn't need blocked walls with no link, minding guideline 16.
57. `Should` **Find the variations.** Try an easier version, a harder one, an extra constraint, and a different element enforcing the same constraint. The cheapest swap is another barrier in the same place, since each lets different things through ([Patterns](#patterns), the barriers). The easier versions become teach chambers. Variants in a row build a habit to break ([Patterns](#patterns), "A run that breaks its own pattern"); spread across runs, each arrives fresh.
58. `Should` **Expect waste.** Plan to keep a third to a half of what is drafted. Cut as you go, the weakest first when a better one arrives: a chamber that repeats another, or one whose route is a list of separate small jobs (open this door, cross that ditch, press that button) with no single moment, since problems that split into parts are easy. Keep every cut draft's idea in the idea pool (`docs/spoilers/ideas.md`), tagged by its elements and part, so it can be found again.

## States to avoid

A chamber should never let the player reach one of these, whatever they do and in whatever order: the `Must` guidelines exist to keep the player out of them. The rules allow all of these states, and nothing checks for them; each ends with the guidelines that prevent it.

### The player is stuck

Only Restart chamber gets the player out (guideline 76).

- **Frozen on an arrow:** the subject stands on an arrow, which lets it move only its own way, and that way is shut: a wall without a portal it can cross, an arrow pointing back, or a door, ditch, laser or light barrier that is blocked, often because stepping onto the arrow released the button holding it open, or an arrow turned under the subject to a way that is shut (guideline 77).
- **Shut in:** the subject is in a part of the chamber it can't leave: one it entered past an arrow, or by a portal when no portal it can shoot from inside brings it out again, or the portal it came out of closed behind it (guidelines 60, 76, 77 and 78).
- **A needed box out of reach:** a box the route still needs lies where the subject can't get to it, such as beyond a one-way passage, in a part reached only by portal, or on a start tile it was sent back to that the subject can't reach, or can't leave with the box (guidelines 63, 76 and 78).
- **A box barring the way:** a box put down, or sent back, in a one-tile passage, a doorway or on a button the route must cross, with no tile beside it left that the subject can reach and pick it up from (guideline 67).
- **A box that can't be put down:** in a pocket, the subject carries a box it can't put down, since no tile it can face can take it (standing on a switch, on an arrow whose way faces a tile that can't take a box, or boxed in by walls and boxes), and it can't shoot while carrying one (guideline 79).
- **Stranded by a slide:** a slide leaves the subject on a tile every way off which slides it back, or in a room whose only way out is a portal, after a fizzler on the slide's way closed the portals (guidelines 83 and 85).
- **Shut by its own ray:** a door, the exit or a light barrier that a receiver holds open, standing in that receiver's own ray, shuts once anything cuts the ray before it, and from then on stops the ray itself, so it stays shut (guideline 92).

### Something looks broken

- **Standing in something that blocks:** the subject stands in a closed door, over an open ditch, or in a laser or a light barrier that is on (guidelines 59, 60, 84 and 92).
- **The exit closing as the chamber completes:** stepping from a button onto the exit it opens completes the chamber as the exit closes, so the button never needed its box (guideline 59).
- **A button that seems not to work:** a door stays closed while a button linked to it is held down, because another button, switch or receiver linking it isn't active yet, and nothing in view shows which (guidelines 62 and 96).
- **A pickup that seems to fail:** a box picked up from inside a fizzler that is on is destroyed at once, and one lying on its own start tile lands back where it lay: the pickup and box-destroyed sounds play, but nothing moves (guideline 64).
- **A box under the subject:** a box sent back to its start while the subject stands there lands under it, the only way the two share a tile, and the subject must step off to pick it up from beside it (guideline 65).
- **A shot that does nothing:** the portal keys do nothing, without a sound, while the subject stands in a fizzler that is on (guideline 73).
- **A button slid over:** a slide over a button doesn't press it, so what the button opens stays shut as the subject slides past (guideline 82).
- **A move that only turns:** a slide that would loop through two portals forever is refused, with the error sound, and the subject only turns the way pressed (guideline 86).
- **A ray slid through:** a slide through a ray doesn't cut it, so its receiver stays lit as the subject slides past (guideline 94).

### Something is lost without warning

- **Fizzled by the subject's own step:** stepping off a fizzler's button, crossing a portal from it, or picking its box up from the fizzler's tile switches the fizzler on under the subject: both portals close and a carried box breaks up (guideline 61).
- **A portal closing by itself:** a portal facing a fizzler closes when the fizzler switches on, and one on a blocked wall vanishes when the wall is blocked again, with no sound or break-up of its own as the wall's steel slides shut (guidelines 60 and 73).
- **Fizzled on the way:** a slide over a fizzler that is on closes both portals and breaks up a carried box, though the subject doesn't stop there (guideline 83).

### The puzzle is bypassed

- **A route around the idea:** a route, walking or by portal, that reaches the exit without the chamber's key move (guidelines 38 and 102).
- **A box delivered by its start tile:** a box sent back lands on its start tile wherever that is, so a start beyond a barrier delivers it past the barrier, and a start on a button presses the button from anywhere (guideline 64).
- **A portal route the design didn't intend:** shots fly over lasers, ditches, boxes and arrows, so a portal can skip a laser, a ditch or a one-way passage (guidelines 74 and 101).
- **A pass through a blocked element:** a closed door, an open ditch, or a laser or a light barrier that is on, switched under the subject, lets it walk out the far side without holding the button (guidelines 59, 60 and 84).

The rules already keep out the rest, so a design never needs to guard against them: the subject coming out of a portal onto a tile it couldn't walk onto, into a doorway or onto the exit; a box lying in a closed door, over an open ditch, or in a laser, a light barrier or a fizzler that is on; a box on the exit or a switch, two boxes on one tile, or the subject on a box, but for a box sent back to its start under it; a carried box inside a fizzler that is on; and the subject leaving the chamber. A layout that starts in a broken state is rejected by the chamber check.

## Element rules

What each element demands of a layout, beyond what the chamber check rejects.

### Never switch something under the subject

Releasing a button, or a receiver going dark, closes or switches back on what it holds open, even under the subject. The rules leave the subject unharmed, but it is left standing in a closed door, over an open ditch, or inside a laser or a light barrier, which looks broken, and it can then walk out the far side, past the element, without holding the button.

Arrows are the exception: an arrow a link turns may turn under the subject. The subject turns with it, so nothing looks broken, and it can then leave only the arrow's new way, so it walks past nothing. Guideline 77 still holds, for both ways the arrow can point.

59. `Must` Don't put a button next to an element it links that keeps the subject out while blocked: a door, a ditch, a laser, a light barrier or the exit. Stepping off the button onto the element closes it under the subject, and so does picking up, from the element's tile, the box holding the button down. Stepping onto the exit completes the chamber even as it closes, so its button would never need a box.
60. `Must` Don't let a portal carry the subject straight from a button onto such an element: if a button stands in front of a wall side that can take a portal, no wall side facing one of its linked ditches, lasers or light barriers should take one. Doors and the exit are safe, since a wall side facing one never takes a portal. Nor should any side of a blocked wall the button links take one: crossing from the button out of a portal there blocks the wall again, which closes that portal, and the way back with it.
61. `Must` A fizzler next to its own button fizzles the subject as it steps off: both portals close and a carried box breaks up. So does picking the button's box up from the fizzler's tile, and crossing from the button out of a portal facing the fizzler, so if the button stands in front of a wall side that can take a portal, no wall side facing the fizzler should take one. Use these only as a deliberate trap.

### Links

62. `Must` An element several buttons, switches and receivers link, directly or through a group, is unblocked only while all of them are active: every button held down, every receiver lit, every switch used, which a switch stays until the chamber is restarted. So releasing any one button, or darkening any one receiver, closes it again, under the subject too (guideline 59, for each button), and stepping from one of its buttons onto another leaves it closed. Draw an antline from each of them (guideline 96): each lights as its own button, switch or receiver becomes active, so the player sees which are still to go. Never give a linked element `blocked` (the chamber check rejects it): it starts blocked, an emitter off, and those linking it decide. There is no "either opens it": an element opened by any one of two buttons can't be built, so build that as two routes, each past a door of its own. Doors in series, or a receiver that switches on a second emitter whose ray reaches a second receiver, build the same "all of them" with each input shown as a door or a ray of its own. Gates like these make good puzzles: a door a button and a receiver link opens once a box holds the button while the ray runs uncut, and closes when a box is put down in the ray or the subject steps into it; a door a switch and a button link opens only while the button is held once the switch has been used, whether the switch is used before the button goes down or while a box holds it. An arrow a link turns follows the same rule, turned only while all of its links are active. A door that its own receiver's ray must pass to reach the receiver opens only once a ray reaches the receiver some other way first (guideline 92).

### Boxes

63. `Must` A box that breaks up or falls goes back to its start tile: a fizzler destroys a box carried into it, and a door closing, a ditch opening, or a laser, a light barrier or a fizzler switching on destroys a box lying there. Keep each box's start tile within reach, from a tile beside it, for as long as the box is needed, with a way from there to where it is needed that crosses no fizzler that is on.
64. `Must` A box's start tile is where it lands, from anywhere, each time it is sent back, so make it a place where a box may appear at any time: not beyond a barrier the box shouldn't cross, and not on a button unless pressing it then is meant. A box resting on another box's start tile is sent on to its own start when that box lands, so keep start tiles off the natural places to put a box down. Keep them off a fizzler's neighbours too: a box picked up from inside the field while it lies on its start breaks up and lands back where it lay, so only its sounds show it happened.
65. `Must` Don't let a box be sent back to its start while the subject stands there. Keep each box's start off the tiles from which the subject puts a box on, or takes one off, a button whose links send that box back or destroy it (a door, a ditch, a laser, a light barrier or a fizzler where it lies), and off the tiles the subject stands on while such a link can switch. Otherwise the box lands under the subject, which must step off and pick it up from beside it.
66. `Must` A box is put down only on the tile the subject faces; when that tile can't take it, the key is refused. Holding the turn key faces the subject any way without moving, so a box can go on any tile next to one the subject can stand on, if that tile can take it; only an arrow tile, where the subject can face nothing but the arrow's way, limits which way it faces; on an arrow a link turns, that way changes as it turns. Don't count on the way the subject walked in to keep a box off a tile.
67. `Must` A box bars its tile: a box put down, or sent back, in a one-tile passage, a doorway or on a button closes that tile to the subject until it is picked up from beside it. Make sure a tile beside it, from which the subject can face it and pick it up, stays reachable; on an arrow tile the subject faces only the arrow's way, which on an arrow a link turns changes as it turns.
68. `Must` Send a box back with a switch, not a button or a receiver: a button sends it back when pressed and a receiver when it lights, but releasing the button or darkening the receiver does nothing (the chamber check warns).
69. `Must` Keep the chamber within the solver's state key, 64 bits: `npm run solve` prints each chamber's width. Each box adds about 8 bits, a mirror box included, each element a link reaches 1, an emitter included, and each switch 1, for its used flag; receivers and rays add none.
70. `Should` Nothing marks a box's start tile once the box has moved, so the player must remember it. Unless remembering is the puzzle, let the player watch the box fly home before a route depends on where it lands.
71. `Should` A spare box adds forgiveness and is the commonest way a chamber gets broken: run the solver with and without it.

### Portals

72. `Must` Some wall sides never take a portal: those facing a door or the exit, those behind the end plate of a run of lasers or light barriers, those behind a fizzler's connectors, every face of an emitter or a receiver, and, on a wall tile that already holds a portal, every side but the opposite one. Don't plan a route that needs one. Which walls a fizzler's connectors face is decided by what lies beside it (`docs/elements.md`, shooting), so placing a wall, a door, a ditch, a light barrier or another fizzler next to one can turn it, and with it which walls refuse portals: check the connectors in the game after changing a fizzler's surroundings.
73. `Must` A fizzler switching on closes a portal facing it, so a portal in front of a fizzler lasts only while the fizzler is off, and a portal on a blocked wall lasts only while the wall isn't blocked, vanishing as its steel slides shut, with no sound or break-up of its own. While the subject stands in a fizzler that is on, the portal keys do nothing, without a sound, so don't put one where the player would stand to aim.
74. `Must` Shots fly over lasers and ditches, even on or open, and over boxes, buttons, switches, arrows and rays; only a wall, a closed door or exit, and a fizzler or a light barrier that is on stop one. Check which wall sides each part of the chamber can shoot, since a portal can skip a laser, a ditch or a one-way passage.
75. `Should` Limit faces with blocked walls while teaching. Stage the portal: one pair of faces that take portals, then a few, then free choice. Blocked walls and the faces that never take a portal (guideline 72) both do the limiting, but a blocked wall looks off-limits and those faces don't: limit faces with blocked walls in teach and test chambers, and let a face that never takes a portal matter only after a chamber has shown a shot missing there. Where it doesn't matter to the idea, let the player choose where the exit portal goes: it teaches more than a fixed one.

### Dead ends

76. `Must` Steps can't be taken back, so a stuck player's only way out is Restart chamber. Every state from which the chamber can't be finished is either unreachable or plainly fatal the moment it's reached: no dead end a player can walk into without noticing, such as an arrow leading into a pocket with no way back. Look first within one or two actions of the intended route (guideline 104). A chamber that can be lost on purpose makes it obvious.
77. `Must` On an arrow, only its own way does anything, so the tile it points to must always let the subject on: not a wall without a portal it can cross, nor an arrow pointing back, nor a door, ditch, laser or light barrier that can be blocked while the subject stands on the arrow, above all one whose button the subject leaves by stepping onto the arrow. A portal facing an arrow tile only lets the subject out, and only when the arrow points away from the wall: the subject can never walk back into it. An arrow a link turns must follow this for both ways it can point, for as long as the subject can stand on it pointing that way, including right after it turns under the subject.
78. `Must` A part of the chamber the subject reaches only by portal needs a way back: a wall side it can shoot from inside that brings it out again, and the portal it came out of must not close behind it (guidelines 60 and 73).
79. `Must` The subject can't shoot while carrying a box, nor put the box down while standing on a switch, or where no tile it can face can take it, so a pocket it can enter carrying a box needs a tile there to put the box down, next to one the subject can stand on and face it from.
80. `Should` Keep switches off the tiles the player stands on to put a box down where the route needs one, such as next to a button the box should hold down, or next to the tile where a mirror box turns a ray onto its receiver. On a switch, the interact key goes to the switch, which refuses while a box is carried, so the box stays in hand with the error sound, and the subject hides the switch it stands on, so the refusal looks like a bug. Mind every tile from which the subject can face such a spot, above all the one it reaches first on its way there. This only makes the refusal less likely: a subject carrying a box can still walk onto any switch.

### Slide floors

81. `Must` A slide stops only on a tile that isn't slide floor, or in front of something the subject couldn't walk onto: a wall without a portal it can go through, a closed door or exit, an open ditch, a laser or a light barrier that is on, an arrow pointing another way, or a resting box. Work out where each slide stops from every tile it can start from, each way, and remember that a box the player can move changes that: a resting box stops a slide on the tile before it, which makes boxes a tool for choosing where a slide ends. Mid-slide, a portal the subject can't come out of (a box, an open ditch or a laser that is on in front of the other portal) stops the slide in front of it, silently, where the same crossing from rest is refused with the error sound.
82. `Must` A button on slide floor is pressed only by a box or by the subject stopping on it, which there means a slide ending on it; a slide over it doesn't press it. Put a button where slides end (against a wall, before a box, at the end of a lane) or on plain floor, unless sliding over it unpressed is the point.
83. `Must` A fizzler that is on fizzles the subject as a slide passes it: both portals close and a carried box breaks up, and the slide goes on. Treat a fizzler across a lane as one the subject walks into, and don't make the way out of a slide room depend on a portal that a fizzler in the room can close.
84. `Must` Guideline 59 reaches along every lane that starts next to a button: sliding off a button, the subject can end its slide on an element the button links (an open door, a bridged ditch, or a laser or a light barrier that is off on a tile that isn't slide floor), which then switches under it as the slide ends.
85. `Must` From rest on slide floor, a move onto more slide floor slides again, so the subject stops only where something stops it. Make sure every tile a slide can stop on has a move off it that leads somewhere new, so a room or lane of slide floor can't trap the subject in slides that only bring it back (guideline 76).
86. `Must` A slide that would enter the same tile the same way twice, looping through two portals, is refused as a whole: the error sound plays and the subject only turns the way pressed, which reads as a bug unless the chamber shows it. Don't let a chamber's natural moves set up such a loop by surprise.
87. `Should` A portal can only be shot at a wall from that wall's own row or column, so the portal that starts a slide into a lane is aimed from somewhere on the lane's line. If the subject should reach the lane only out of that portal, the spot to aim from must lie past something shots fly over but the subject can't cross, such as a ditch at the lane's far end; from anywhere else on the line it could simply walk or slide into the lane. The slide out of the portal then stops at the ditch, so put the way on (the exit, or the next spot to aim from) beside that tile.
88. `Should` Draw the slide graph: every tile a slide can stop on is a node and every slide an edge. Check that the goal is reachable only through the intended node, and that every node has a way off leading somewhere new (guidelines 81 and 85). Slide puzzles work best locked into a tight area, and weaken when spread into hallways and separate small puzzles; a slide maze that sends the player back to the start on a wrong move tests only patience. Each stopper removes more options than it seems to, and on an open slide field three free stoppers make every target reachable, a carried box easier still: constrain where a box can go down, or give it a second job.

### Turnable arrows

89. `Should` A turntable shows that an arrow turns, not which way it will point. Let the player see it turn, with its button or switch in view or an antline to it, before a route depends on its turned way.
90. `Must` An arrow is entered only moving the way it points now, so a fixed arrow pointing into a turnable one freezes the subject on it once the turnable one turns away (guideline 77). Reach a turnable arrow from plain floor, making it the gate of a run of arrows rather than its last arrow.
91. `Should` A turnable arrow whose button lies right behind it, the way it turns to, can be entered only from that button, and only by the subject standing there; stepping off the button turns the arrow back, so it always sends the subject on its own way. A box on that button holds the arrow turned but takes the one tile it is entered from, so the box seals it rather than opening it.

### Rays

92. `Must` A receiver holds its links open only while its ray reaches it, and the subject cuts a ray by standing in it, so a ray must not cross anything its own receiver holds open: a door, the exit, a bridged ditch, or a laser or a light barrier held off. Stepping there cuts the ray, and the receiver going dark switches the element under the subject (guideline 59). A closed door, the closed exit and a light barrier that is on also stop rays, so cutting the ray anywhere before such an element, even a tile away, shuts it for good, unless another ray can reach the receiver. Such an element starts shut, as every linked element starts blocked, so it opens only if another ray reaches the receiver first (fixture `ray_held_door_closes_behind_subject`, where a second emitter's ray, turned by a mirror box, opens the door). Nor let a ray cross every tile from which the subject can enter something its receiver holds open: standing in the ray, the subject holds it shut, so it can never step in.
93. `Must` A resting box stops a ray on its tile and a resting mirror box turns it a quarter turn, so a box the player can move changes where rays run. Work out each ray with each box wherever it can be put down, or sent back to (guideline 64), and with each portal pair the player can open, since a ray goes through portals as the subject does. A box put down in a ray cuts it within the step, and picking it up lets it on; a carried mirror box turns nothing, since the subject stops the ray first.
94. `Must` A ray passes everything else on the floor, on or off: ditches, fizzlers, lasers, slide floors, arrows, buttons and switches, and it presses no button it crosses. It counts only once a step settles: a slide passing through a ray doesn't cut it, while one that stops in it, or a crossing that comes out into it, does. A ray meant to be cut by a slide must cross a tile where the slide stops (guideline 82).
95. `Should` Players can fail to tell which way an emitter or a receiver faces, or which way a mirror box's mirror runs, and lose track of buttons under boxes: check `/` against `\`, the receiver's face and the emitter's face at about 40 px tiles.

### Antlines

96. `Should` Draw an antline from each button, switch or receiver to what it links, so the player learns how links work: the player shouldn't have to step on a button to learn what it does, and a link found without an antline must be remembered for the rest of the chamber, which is noise unless remembering is the puzzle. Leave one out only where finding the link is meant to be the puzzle, and never for an element several of them link (guideline 62). A line lights while its own button, switch or receiver is active, not when the element opens, so the unlit lines to an element still shut show what is left to do.
97. `Should` Turn an antline on the floor, or on a wall tile inside a wall, not on a wall tile at a wall's edge. A line crossing a plain wall shows on its top, but a turn there leaves out the dot of each arm that ends at the wall's bevel, and a turn on a lone wall tile keeps only its middle dot, so the turn is hard to follow (`docs/sprites.md`, antlines).

### The exit

98. `Must` The exit stands in the chamber's outer wall, away from its corners (the chamber check rejects it anywhere else), and the subject walks out through it, on past the chamber's edge, only when it steps onto it heading out of the chamber. Give it a straight way in from the tile inside it, and don't put a door in the outer wall beside it: stepping sideways from that doorway onto the exit, the subject just stops there.

### Size

99. `Should` Every chamber must fit the screen whole, since there is no camera: the whole chamber is always on screen, scaled to fit and centred, with no scrolling, so its tiles shrink as it grows, to about 40 px for Playground 2 (20 × 20) on a 1080p screen. Keep a chamber no larger than its puzzle needs, so its elements stay easy to read. Tiles stop growing below 16 tiles either way: a smaller chamber gets the tiles a 16 × 16 one would, with more room around it.

## Patterns

A toolbox, not rules: structures that make good chambers, each mapped to the game's elements, with what to check. Take one pattern per chamber: stacking several makes a chamber outgrow its place in the run.

### Five facts that shape them

1. **All of them, never either.** Several buttons, switches and receivers on one element open it only while all of them are active, and releasing or darkening any one closes it again (guideline 62). Doors in series, or a receiver that switches on a second emitter whose ray reaches a second receiver, build the same with each input shown as a door or a ray of its own. "Either input opens it" can't be built on one element: give each input a route of its own.
2. **Links only open things.** Pressing, using or lighting unblocks, once every input on the element is active; releasing or darkening any of them blocks again, and a used switch stays active until the chamber restarts. "Press X to close Y" can't be built directly. Exclusive states come from the layout: one box for two buttons, a mirror box steering a ray between two receivers, a turnable arrow, a switch that sends a box home (which releases its button).
3. **No hidden state, no timing, no momentum, no undo.** Every pattern that relies on fake walls, a clock, speed or an undo is out. Slides are the only "keep moving" rule, and they resolve within one step.
4. **Carrying, not pushing.** Push-block deadlocks don't exist; a box is a wall while it rests; full hands mean no portals.
5. **Shots pass open doors, lasers, ditches, boxes and arrows.** Most portal shortcuts come from this (guideline 74).

### The barriers

What each barrier lets through, for swapping one for another in the same place (guideline 57):

| # | Barrier | The subject | Shots | Rays |
| --- | --- | --- | --- | --- |
| 1 | Open ditch | Stops | Pass | Pass |
| 2 | Laser that is on | Stops | Pass | Pass |
| 3 | Fizzler that is on | Passes, but both portals close and a carried box breaks up | Stop | Pass |
| 4 | Light barrier that is on | Stops | Stop | Stop |
| 5 | Closed door | Stops | Stop | Stop |
| 6 | Resting box | Stops (and stops a slide before it) | Pass | Stop (a mirror box turns them) |

### Finding ideas

- **Play with the rules** until something surprising happens, then turn it into a chamber.
- **The pair table:** the interaction table in `docs/elements.md` puts every element against every other. Put a pair in an empty room and play until something surprising happens, then build backwards; the surprising cells are chamber candidates.
- **Completeness, then surprise:** for each element, ask how it behaves with every other ("on a slide floor? in a ray? behind a fizzler?"), then cut the cases a player would predict, keeping those a teach chamber needs.
- **Unintended solutions and near misses:** turn an unintended solution (one the solver turns up, or your own) into its own chamber, and a plan that almost worked into a chamber where it does. This works where the layout made the attempt fail (a face that wouldn't take the portal, a box one tile out of the ray, a slide that stopped a tile short); where a rule forbids it (shooting while carrying, shooting through a light barrier that is on), keep the failure as a lesson.
- **Other strategies for a small grid:** list action sequences (shoot then carry; carry, put down, shoot, pick up); try extreme geometry (every wall takes portals, or only one does); start from a solvable chamber and keep changing it until it's impossible, then undo the last change, to find its tightest version; use elements as gadgets (an arrow as a one-way valve, a switch as a latch).
- **Park ideas** in the idea pool (`docs/spoilers/ideas.md`) and go back to it: an idea can wait months for its chamber.

### Structures that work with any element

| # | Pattern | In Portal 2D |
| --- | --- | --- |
| 1 | **The catch** (two goals in conflict) | A button holds a door the subject must walk through; the box that could hold it is needed elsewhere |
| 2 | **The lure** (an easy first use primes a wrong move) | Two similar sub-problems in one room; the obvious move solves the first and fails on the second. The first sub-problem's job is to teach the wrong rule |
| 3 | **Both orders fail** (interleave) | Two goals in one corridor; finishing either first blocks the other; park one part-way |
| 4 | **One key move** (a bottleneck) | One non-obvious action unlocks the rest; everything after it is quick. One per chamber |
| 5 | **The counterintuitive move** | The box must first go _away_ from its button; an open door must first be let close |
| 6 | **Prepare, then trigger** | A final switch opens the exit and sends the boxes home, so the buttons they held come up: portals must already be placed so the route survives. The antlines show the trap in advance |
| 7 | **Proxy for two places** | Box on button. On its own a teach chamber, not a test |
| 8 | **Dilemma: one link, two effects** | Since pressing only opens, the cost comes from a side effect: one button opens door A and also turns an arrow on the route to B, or switches on an emitter whose ray crosses a tile the subject must stand on |
| 9 | **Reprise: same room, one change** | Guideline 43 |
| 10 | **A run that breaks its own pattern** | 4–5 small chambers sharing a motif, one change each. The first may be solved by stumbling if the next checks it; a middle one slips in, where it costs nothing, the piece the last turns on; the last makes both obvious tries fail, so the player has to break the pattern they built, not just use the mechanic |
| 11 | **Exactly enough** (the givens point at the answer) | N boxes, more than N buttons, one subset reaches the exit |
| 12 | **Ration the shared resource** | One box needed in two places; the order is the puzzle |
| 13 | **Show the goal blocked** | The exit in view from the start behind a laser or a light barrier, its antline running to a button that looks out of reach |
| 14 | **Exit on a ledge** (the idea as the final move) | The last move must be made from a place that the receiver or door itself unlocks |
| 15 | **Doors in series with lit antlines** | Each input shows as its own open door (fact 1) |
| 16 | **Progress latch** | Once the first half is solved, a switch opens a way back to the box's start, so a lost box costs little |
| 17 | **Reversal: don't use the core verb** | A chamber where any portal placed loses something needed. Once, late |
| 18 | **Alternate solution → its own chamber** | Block it in the original; make it the forced route of a new chamber |
| 19 | **Joke chamber** (looks hard, one insight) | A crowded-looking chamber whose answer ignores most of it. Rare, and never as the finale (guideline 32) |
| 20 | **Filters** (each actor has its own region) | Ferry the subject, the box, the shot and the ray each across its own barrier (see the barriers) |

### Portals

| # | Pattern | In Portal 2D, and what to check |
| --- | --- | --- |
| 1 | **Stage the tool by limiting faces** | Guideline 75 |
| 2 | **Gated islands** | 3–4 floor islands separated by lasers or open ditches, each with one face that takes portals and sees the next; a wrong order is a dead end fixed by re-shooting, never a softlock (guideline 78) |
| 3 | **First crossing with a landmark** | The subject comes out somewhere it could already see, facing away from the wall |
| 4 | **Enter the other end** | Playground 6 does this for slides |
| 5 | **Shoot past what you can't walk past** | A laser run across a corridor; a wall beyond it takes portals. Not the wall at the end of the run (guideline 72) |
| 6 | **Shot through an open door** | Stand on the button, shoot through the open doorway, step off, shoot the second portal, cross (guideline 40) |
| 7 | **A portal keeps what a door gave briefly** | Box on button, shoot through the open door, take the box elsewhere, let the door close: the portal stays and can carry a ray or the subject beyond |
| 8 | **One sightline past a fizzler** | A single gap in a fizzler run, or a single wall beyond it that takes portals, is the whole puzzle. Make it work from either side of the field (guideline 31) |
| 9 | **Switch stations** | Slide lanes joined by portals, with plain-floor tiles where the subject stops, turns and re-shoots |
| 10 | **Ferry across islands** | Islands separated by open ditches; each hop with a box is put down, re-aim, pick up, cross (no shooting while carrying) |
| 11 | **Arrow as a firing post** | On an arrow the subject faces only its way, so the arrow fixes the shot's direction; a turnable arrow chooses which wall a tile can hit |

### Boxes and buttons

| # | Pattern | In Portal 2D, and what to check |
| --- | --- | --- |
| 1 | **Hands full** | The button is reached only through a portal; shoot before picking up, or put down, shoot, pick up. Harder: the only tile that sees the portal wall is one reached while carrying |
| 2 | **Solved but trapped** | A one-tile corridor `S b . B . . E`: putting the box on B from the start side seals the corridor; carry it over B and put it down facing back. Reversible; teaches guideline 67 |
| 3 | **Decomposition dial** | Two rooms each with its own box and button, done one after the other (easy), against one compact room where the route keeps going back to a part already started: box 1 part-way, then box 2, then box 1 again, or a box and the portal pair taking turns (hard) (guideline 10) |
| 4 | **Counterintuitive first move** | The box starts beside its button, but putting it there first blocks the corridor to the only portal wall |
| 5 | **Box park nook** | A nook lets the subject free its hands to shoot. Include it only when that freedom is the point |
| 6 | **Fizzle to respawn** | When the box is needed back at its start, destroying it is the move |
| 7 | **Sacrifice as transport** | A box that starts on button B1 (holding door D1 open) is taken away for another job; later, with B1 out of reach, carrying it into a fizzler sends it home onto B1 and reopens D1. Guideline 64 lists this as a bypass; here it is the point. Check guideline 65 (the subject never on B1 then) |
| 8 | **Pull the rug** | A box resting on a bridged ditch is destroyed when the link releases, and returns to its start; never under the subject (guideline 59) |
| 9 | **Box marathon** | One box carried through the whole chamber and used several times. Players tend to leave the box behind: keep the destination always in view, and keep fizzlers off its path unless the reset is short |
| 10 | **Spare box** | Guideline 71 |
| 11 | **Box as one-way recall** | A switch linked to a box (guideline 68) is a "bring it back" button the player can use on purpose |

### Slide floors

| # | Pattern | In Portal 2D, and what to check |
| --- | --- | --- |
| 1 | **Lone stopper teach room** | A small slide room with one wall tile in the middle. A plain-floor tile stops the subject _on_ it, a wall _before_ it: worth showing early |
| 2 | **The box as a placeable stopper** | The subject slides; boxes are the stoppers it places. Mind guideline 88: free stoppers make most of an open field reachable |
| 3 | **The overshoot** | A button mid-lane is pressed only by stopping on it (guideline 82); the slide version of "press the button" needs a stopper placed first |
| 4 | **Portal as a redirector** | A slide into a portal comes out heading the way the other portal faces: a diagonal wall the player places. Bring it in after plain slides (guidelines 86 and 87) |
| 5 | **Half-bridge valve** | A lane with a stopper at one end and none at the other is a one-way valve built without arrows. With no undo, each one is a real commitment |
| 6 | **Nine-square lattice** | A 3×3 lattice of plain stop tiles joined by slide lanes, some walled off; portal walls at lane ends let the player edit the graph |
| 7 | **Landing points only at goals** | Scattered plain tiles in a slide field, some holding buttons. A button on slide floor doesn't stop a slide; a button on plain floor does |
| 8 | **Backward from the goal, then fill** | Start at the goal tile, ask what stops the subject there, walk back. Then let the solver find shortcuts; turning unused slide floor into plain floor is the direct fix |
| 9 | **Barrier as a stopper** | A light barrier switched on in a lane stops the slide in front of it |

### Arrows and turnable arrows

| # | Pattern | In Portal 2D, and what to check |
| --- | --- | --- |
| 1 | **The valve that ends backtracking** | An arrow in a one-tile corridor right after a section is solved, so the player never needs to come back |
| 2 | **The key lies beyond the valve** | Everything the route needs after an arrow must be past it, or reachable back over it by portal (guideline 63) |
| 3 | **One-way loops force deliberate navigation** | An arrow ring travelled one way; shots fly over arrows, so a portal can cut across it: the intended shortcut or a hole |
| 4 | **Carrying the key through one-way space** | On an arrow the subject faces only its way, so a box can go down only there; getting the box and the subject to the same place through one-way space is a puzzle in itself (guidelines 66, 67 and 79) |
| 5 | **Route switch** | A turnable arrow is a two-way route switch, held by a button, latched by a switch or held by a receiver (guidelines 89, 90 and 91) |
| 6 | **Funnel, then flip** | A room entered through an arrow; a turnable arrow inside, held by a button, opens the way back only while held, which forces the box-on-button decision |

### Rays, emitters, receivers and mirror boxes

| # | Pattern | In Portal 2D, and what to check |
| --- | --- | --- |
| 1 | **Portal the ray** | Playground 9 |
| 2 | **Mirror box shown in place** | The mirror box already rests in the ray, turning it into a wall one tile from where it would hit the receiver |
| 3 | **Mirror first, then needed elsewhere** | The mirror box turns the ray onto the receiver, then is needed on a button; the portal pair has to take over the ray |
| 4 | **Two rays, one mirror box, one portal pair** | Each tool solves one ray. Both receivers can share one door, open only while both are lit (guideline 62), or be chained, or each get its own door in series |
| 5 | **Cut the ray on purpose** | A dark receiver switches its links back: a light barrier comes on (stops a slide, blocks a shot), a laser comes on (destroys a box lying in it, which flies home), a ditch opens (the same). The ray must not cross the element its receiver holds (guideline 92) |
| 6 | **Toggle between two receivers** | A mirror box on the ray's line sends it to receiver B; without it the ray goes on to A. Putting the box down or picking it up flips which door is open |
| 7 | **Relay chain** | Receiver R1 switches on emitter E2, whose ray must reach R2. Cutting any segment darkens the chain, so route the first segment through a portal pair to keep it off the subject's path |
| 8 | **Two jobs at the bend** | A button on the ray's corner tile lets one mirror box both turn the ray and hold the button |
| 9 | **Bootstrap chain** | Each freed mirror box frees the next; moving the ray off R1 closes D1, and a door closing on a box sends it home: carry it clear before moving the light |
| 10 | **Light goes where you can't** | An open ditch or a laser that is on keeps the subject out but lets rays and shots through |
| 11 | **One listening face** | A receiver facing away from the emitter's line forces the ray to arrive through a mirror box or a portal |
| 12 | **Many targets, few redirectors** | Fewer mirror boxes than seem needed, plus a portal pair that stands in for one; one box already sits in a ray and must be moved |

### Fizzlers, lasers, light barriers, ditches, doors and blocked walls

| # | Pattern | In Portal 2D, and what to check |
| --- | --- | --- |
| 1 | **Set the portals before picking up the box** | Box and button on opposite sides of a fizzler that is on; place both portals from a spot whose shot lines miss the field, then carry the box through. Walking through destroys the box and closes the portals |
| 2 | **The missing rule: laser or light barrier?** | After chambers where both read as barriers, one where the only usable wall lies across a laser: shots fly over lasers, not through light barriers |
| 3 | **Light barrier as a switchable wall** | Use light barriers to reshape the route and the sightlines, not only to block |
| 4 | **Blocked walls as the portal budget** | One button that unblocks a set of walls changes which faces take portals |
| 5 | **Limited crossings, a held bridge** | A ditch bridged only while a button is held: each crossing costs the box's position |
| 6 | **Plan the switches** | Switches can't be undone, so one used too early can't be taken back; a door several inputs share opens only while all are active, so plan which one is met last (guideline 62) |

## Checking a chamber

The checks every draft passes, in this order, before the author plays it and after every change.

100. `Must` **Recheck after every change.** An edit that looks harmless can change the rules' outcome: a wall placed beside a fizzler turns its connectors and changes which walls take portals (guideline 72). While a draft changes, check after each tweak that the route still passes its key steps (in the notes), since a recorded solution breaks on any layout edit.
101. `Must` **Run the checks and the solver.** Run `npm run chamber:check` and `npm run replay:check`. `npm run solve -- --par src/chambers/chamber_N.json --max-states=40000000` finds the fewest moves and the fewest portals, which shows any shortcut the design didn't intend. To check that no route skips an element, solve a copy of the chamber with the links to it removed, using `--solvable`: it should come back unsolvable. The macro search behind `--par` and `--solvable` refuses a chamber with a receiver, since the subject cuts rays by walking: there, look for shortcuts with `--baseline` where it finishes, and by hand where it doesn't. A chamber the solver can't finish, or refuses, is solved and checked by hand as `docs/solving_by_hand.md` describes.
102. `Must` **No route skips the key move.** In teach and test chambers, a copy of the chamber with its key move made impossible comes back unsolvable: every wall face refusing portals, the box removed, the slide floor made plain, or the one face the idea needs set to refuse portals, whichever the chamber teaches. A designer shows that a chamber has a good solution; only an exhaustive search, or a careful argument by hand, shows that it has no shortcut.
103. `Should` **Check the forbidden facts.** Check each fact the notes say must never be possible (guideline 52), with the solver where a copy of the chamber can express it, else by hand.
104. `Should` **Take a near-miss census.** List the dead states within one or two actions of the intended route: those are the mistakes players will make, and each is visibly fatal or deliberately instructive. Judge a draft by what its likely wrong tries show: a wrong portal pair, a box on the wrong button or a slide that overshoots should end where the player can see what stopped it (a miss ripple, a band reacting, a door staying shut, an antline left unlit).
105. `Must` **Play it cold.** The author plays each draft before reading its notes, then compares their route with the intended one and decides: keep, tweak or redo. One or two friends play each finished run cold. Note in the chamber's notes where each player got confused and what helped them, a teach chamber above all. The designer knows the answer and grows blind to the chamber's difficulty, even with the solver's numbers in front of them: expect each chamber to be harder for a player than it feels to its designer.
106. `Must` **Record the solution.** Record it by playing the chamber through (Download solution in the completion dialog, in `npm run dev`): the author's cold play, once the chamber is approved, unless a tweak followed it. Record it again after any change to the chamber but its antlines.
107. `Should` **Feed the lessons back.** After each playtest, turn what it showed into a guideline here when it holds beyond the chamber, or into the chamber's notes when it doesn't.
