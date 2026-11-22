# Campaign

The plan for the campaign's chambers: the conventions every chamber keeps, every run in the order its elements arrive and what each run teaches, and the next run chamber by chamber. It names what each chamber should teach, never its key move, layout or route: those are in its notes under `docs/spoilers/`, which the author reads only after playing it cold. How to design a chamber is in `docs/level_design.md`; where the work stands is in `todo/campaign.md`.

**Before detailing a run or designing a chamber, read `docs/level_design.md` carefully, in full, and follow everything in it.** Read it again each time, not from memory, since it grows with every chamber, and read all of it, not only the sections that seem to apply: a guideline in one section often bears on a choice in another. Every `Must` holds for every chamber, broken only on purpose with the reason written in the chamber's notes; every `Should` is followed unless the notes say why another guideline serves the chamber better. A chamber is ready for the author only once it has passed every check that comes before the author's play under "Checking a chamber" there (guidelines 100–104).

Each run follows the handbook's four parts (guideline 41): teach, test, twist, combine. The rules each run teaches are named here; how a twist chamber turns them is not.

## Conventions

What every chamber keeps, so the player can trust it (the campaign intro of `docs/level_design.md`). Break one only in a chamber whose notes say why, and make the break plain.

| #   | Convention                                                                                                                 |
| --- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | Every box in a chamber is needed                                                                                           |
| 2   | Every element matters: each is used, or blocks a shortcut, and nothing is a decoy                                          |
| 3   | Every link has an antline, from each button, switch or receiver to what it links (guideline 96)                            |
| 4   | Steel, a blocked wall with no link, never takes a portal; a blocked wall that can open always has an antline leading to it |
| 5   | What holds the exit shut is in view from the start, with an antline from what opens it                                     |
| 6   | A chamber is no larger than its puzzle needs (guideline 99)                                                                |
| 7   | Hints, if they are built, appear only in run 1, and only say what an element is or does (guideline 31)                     |

## Runs

| #   | Run                                      | New elements and rules                                                                 | Size (guess) | Status         |
| --- | ---------------------------------------- | -------------------------------------------------------------------------------------- | ------------ | -------------- |
| 1   | First steps (the tutorial)               | Portals, walls and steel, the exit, the ditch, the box, the button, the door, antlines | 4            | Detailed below |
| 2   | Portals in depth                         | None                                                                                   | 5–7          | Outline        |
| 3   | Boxes and buttons                        | Turning in place; doors several buttons link                                           | 4–6          | Outline        |
| 4   | Switches                                 | The switch                                                                             | 3–4          | Outline        |
| 5   | Lasers, and floors and walls that switch | The laser; ditches and blocked walls a link switches                                   | 4–6          | Outline        |
| 6   | Fizzlers                                 | The fizzler                                                                            | 4–6          | Outline        |
| 7   | Arrows                                   | The arrow, and the arrow a link turns                                                  | 4–6          | Outline        |
| 8   | Light barriers                           | The light barrier                                                                      | 3–4          | Outline        |
| 9   | Slide floors                             | The slide floor                                                                        | 6–8          | Outline        |
| 10  | Rays                                     | The emitter and the receiver                                                           | 5–7          | Outline        |
| 11  | Mirror boxes                             | The mirror box                                                                         | 4–6          | Outline        |
| 12  | Finale                                   | None                                                                                   | 2–4          | Outline        |

About 50 to 70 chambers in all, a guess that each run's detailing will correct (guideline 42). The heavy runs (2, 9 and 10) sit between lighter ones, so the pace rises and falls (guideline 46), and each run brings something new.

### 1. First steps (the tutorial)

The core verbs, one at a time, in small rooms: walking to the exit; shooting a portal of each colour onto a plain wall and crossing between them; steel takes no portal; a ditch stops the subject but not a shot; a button opens what its antline leads to while something stands on it, and a box can stand there for the subject; a box can be carried through portals, and the portal keys don't shoot while one is carried. Mostly teach chambers, ending in one combine. Detailed [below](#run-1-in-detail).

### 2. Portals in depth

The portal tested and twisted, with no new element: a shot moves only its own colour's portal, so either end can be moved, including the one just come out of; the subject comes out of a portal facing away from its wall; the walls that never take a portal, such as those facing a door; what an open door lets through; planning portals around a box. One test, two or three twists, a combine.

### 3. Boxes and buttons

What a box can and can't do: putting it down on any side by turning in place, the move the controls hide (guideline 29); a box bars the tile it rests on; one box for two buttons in turn; a door several buttons link opens only while all of them are held, every antline lit (guideline 62).

### 4. Switches

The switch: it stays on from its first use, so it can't be undone; a door a switch and a button link; a switch linked to a box sends it home, and the box isn't lost, which shows before any later run relies on it that a box flying home is no loss (guideline 28).

### 5. Lasers, and floors and walls that switch

The laser stops the subject but not a shot, and the wall behind its end plate takes no portal; a ditch bridged only while a button is held; steel that takes portals while a button is held; a box lying where a ditch opens or a laser comes on is destroyed and flies home.

### 6. Fizzlers

Walking into a fizzler that is on closes both portals and breaks up a carried box, which flies home; shots don't pass one, and the portal keys do nothing inside one; a fizzler switching on closes a portal facing it; the walls behind its connectors take no portal.

### 7. Arrows

An arrow lets the subject on only its way, and on it the subject faces only that way; a link turns an arrow, which turns back when the link lets go, even under the subject. Arrows are valves: a run of them is a one-way road.

### 8. Light barriers

The light barrier stops the subject and shots, where a laser stops only the subject, and switches like a door; a short run, set against run 5's lasers (guideline 17).

### 9. Slide floors

A slide stops only where something stops it: a wall, a box, plain floor, a closed door, a light barrier or a laser that is on; a box placed as a stopper; a slide into a portal comes out heading the way the other portal faces; a button slid over isn't pressed; a fizzler on a slide's way fizzles the subject and the slide goes on. Combines with runs 6 to 8.

### 10. Rays

An emitter's ray lights a receiver, which holds its links open while lit; the subject and a resting box cut a ray, and a ray goes through portals as the subject does; a closed door and a light barrier that is on stop it; a ray must stay off what its own receiver holds (guideline 92). The solver's macro search refuses chambers with receivers, so these are checked by hand.

### 11. Mirror boxes

A resting mirror box turns a ray a quarter turn; mirror box and portal pair as the two ways to bend a ray; one box with two jobs.

### 12. Finale

Nothing new: chambers that make the campaign's elements act on each other, ending in a last chamber of synthesis and spectacle whose catch is no harder than the run before it (guideline 50).

## Run 1 in detail

The tutorial run: today's tutorial split into small chambers, about one new thing each, with fixed arrows and blocked walls that open left for their own runs (7 and 5). Every chamber works on its layout alone (guideline 31); the hint column names the element a hint would explain if hints are built. Walls alone can't make a portal crossing necessary, since a shot flies only over floor the subject could walk too (guideline 74), so chamber 1 already crosses a ditch, and the ditch's own teach chamber was cut (2026-11-22).

| #   | Part    | Elements                            | The player already knows                | Should teach                                                                                                                                       | Hint (if built) |
| --- | ------- | ----------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| 1   | Teach   | Walls, steel, a ditch, the exit     | The move keys, from the controls legend | Shooting a portal of each colour onto a plain wall, and crossing from one to the other; a ditch stops the subject but not a shot; steel takes none | Steel, ditch    |
| 2   | Test    | Walls, steel, a ditch, the exit     | Chamber 1                               | A shot flies straight along the row or column the subject faces, so where it stands decides which wall it hits; either portal can be the way in    | —               |
| 3   | Teach   | A box, a button, a door, an antline | Chamber 1                               | A button opens the door its antline leads to while something stands on it; a box carried there holds it for the subject                            | Button          |
| 4   | Combine | A box, a button, a door, a ditch    | Chambers 1 to 3                         | Carrying a box through portals; the portal keys don't shoot while a box is carried                                                                 | —               |
