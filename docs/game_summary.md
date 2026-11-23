# Portal 2D

A desktop puzzle game, a fan take on Valve's Portal. The player guides a test subject across grid-based test chambers to the exit, using a pair of portals (one blue, one orange) to get past walls, gaps and obstacles. There are no enemies, no physics and no way to die: each chamber is a puzzle of where to place portals, what to carry where, and in which order to open things.

## The view

- Seen from straight above, with no perspective: the chamber is a grid of square tiles. Walls and other raised things cast a soft shadow. The floor and the walls carry faint tone and wear, and the boxes, buttons, switches, arrows and ditches a faint look of their own, lit as the floor round them, none of which changes anything in play, so no stretch of them looks stamped from one tile and no two of a kind look quite alike.
- The camera never moves: the whole chamber is always on screen, scaled to fit and centred, but its tiles never grow larger than a chamber 16 tiles each way would get, so a small chamber leaves more of the room around it. There is no scrolling and nothing outside the chamber to explore.
- Beside the chamber, a side panel shows the chamber's sign (its number, its place in the list, a timer and an icon for each kind of element, dark for those the chamber holds) and the controls, drawn as the player's own keys, which the player can fold away under their heading.

## Turn by turn

- Nothing moves on its own. The game advances one action at a time, and only when the player acts.
- The actions: move (up, down, left or right), turn without moving (a move key pressed while holding the turn key, Shift by default; if the subject already faces that way, it moves), shoot a blue portal, shoot an orange portal, and interact (use a switch, pick up a box or put it down).
- Each action and everything it causes (a button pressed, a door opening, a fizzler firing) happens at once, before the next action.

## The subject

- Stands on one tile and always faces one of the four directions. The way it faces matters, because portals are shot that way.
- Moving in a direction first turns it that way, then steps onto the next tile if it can enter it, and keeps going while that tile is a slide floor (see [Slide floors](#slide-floors)). Walking into something it can't enter only turns it.
- Can carry one box at a time. It picks up the box on the tile it faces, if it could step onto that tile but for the box (not through an arrow pointing another way or something that blocks walking), and never while it stands on a switch, where interact uses the switch instead; picked up while the subject stands in a fizzler that is on, the box breaks up at once and goes back to its start. It puts a box down only on the tile it faces, if it could step onto that tile and no box, exit, switch or fizzler that is on is there; otherwise the error sound plays. The box goes everywhere with it, through portals too. While carrying it, it can't shoot portals: trying plays the error sound.

## Portals

- There is one blue and one orange portal. Shooting a colour again moves that portal: the old one closes.
- A shot leaves in the direction the subject faces and travels in a straight line, instantly (no projectile is shown). The first wall it reaches takes the portal, on the side facing the subject.
- A hit plays its portal's opening sound. A shot misses (a shot sound, and a short ripple where it stopped) when a closed door, the closed exit, or a light barrier or a fizzler that is on is in the way, or when the wall can't take a portal there (a blocked wall refuses them while blocked, an emitter or a receiver on every face, and the side of a wall facing a door or the exit never takes one, open or closed, nor does the wall at the end of a run of lasers or light barriers, behind its end plate, nor either wall a fizzler's field spans between, behind its connector, on or off).
- A wall tile can't take a portal on a side that already holds one, or on the two sides next to it; only the opposite side is still free. Shots never go through portals.
- Crossing: with both portals open, walking into a wall on the side that holds a portal takes the subject through. It comes out on the tile in front of the other portal, facing away from it.
- A crossing is refused (error sound) when the subject couldn't walk onto that tile, for example an open ditch, a laser that is on or a box. It then stays where it was. No portal ever faces a door or the exit, so a crossing never lands in a doorway.

## Tiles

| #   | Tile          | What it does                                                                                                                                    | Can the subject walk on it?                          | Does a shot pass through?                                       | Can a button, switch or receiver change it? |
| --- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------- |
| 1   | Floor         | Empty tile, with nothing in the file                                                                                                            | Yes                                                  | Yes                                                             | No                                          |
| 2   | Slide floor   | Keeps the subject moving: entering it, the subject goes on the same way, tile by tile, until it can't (see [Slide floors](#slide-floors))       | Yes, and slides on                                   | Yes                                                             | No                                          |
| 3   | Wall          | Holds portals                                                                                                                                   | No (only by crossing a portal on it)                 | Stops the shot, which opens a portal there                      | No                                          |
| 4   | Blocked wall  | Refuses portals while blocked; a link can unblock a one-tile one so it takes portals, and blocking it again closes any portal on it             | No (only by crossing a portal on it while unblocked) | Stops the shot, which opens a portal there only while unblocked | Yes, a one-tile one                         |
| 5   | Emitter       | Sends a ray from one face while it is on (see [Rays](#rays)); takes no portal on any face                                                       | No                                                   | Stops the shot, which misses                                    | Yes, switched on or off                     |
| 6   | Receiver      | Lit while a ray reaches the face it listens on (see [Rays](#rays)); its linked elements change while it's lit, if the others linked to them are on too; takes no portal on any face | No                                                   | Stops the shot, which misses                                    | No                                          |
| 7   | Light barrier | A field of light, on or off, horizontal or vertical; stands only on a floor tile                                                                | Only when off                                        | Only when off                                                   | Yes                                         |
| 8   | Ditch         | A hole, open or bridged                                                                                                                         | Only when bridged                                    | Yes                                                             | Yes                                         |
| 9   | Door          | Closed or open                                                                                                                                  | Only when open                                       | Only when open                                                  | Yes                                         |
| 10  | Exit          | Reaching it completes the chamber; closed or open                                                                                               | Only when open                                       | Only when open                                                  | Yes                                         |
| 11  | Fizzler       | When on, closes both portals and sends a carried box back to its start                                                                          | Yes                                                  | Only when off                                                   | Yes                                         |
| 12  | Laser         | Horizontal or vertical; two can cross on one tile                                                                                               | Only when off                                        | Yes                                                             | Yes                                         |
| 13  | Box           | Can be carried; holds a button down; one per tile                                                                                               | No (it is picked up from beside it)                  | Yes                                                             | Yes (sent back to its start)                |
| 14  | Mirror box    | A box with a mirror slanting across it, always the same way; resting, it turns a ray a quarter turn; in every other way a box                   | No (it is picked up from beside it)                  | Yes                                                             | Yes (sent back to its start)                |
| 15  | Button        | Held down while the subject or a box is on it; its linked elements change while it's held, if the others linked to them are on too                | Yes                                                  | Yes                                                             | No                                          |
| 16  | Switch        | Interact to use it (not while carrying a box); it stays on from then until the chamber restarts, and its linked elements change while the others linked to them are on too; using it again sends a linked box back again | Yes                                                  | Yes                                                             | No                                          |
| 17  | Arrow         | One-way: the subject can enter only in the arrow's direction, and can only move or turn that way while on it; a turnable one turns a quarter turn when a link acts on it, turning a subject on it too | Only in its direction                                | Yes                                                             | Yes, a turnable one                         |

Every chamber is closed in by walls (or blocked walls, emitters, receivers, doors and the exit) along its edge, and has exactly one exit, in that outer wall and away from its corners. Beyond the edge counts as a wall that takes no portals.

## How each tile looks

| #   | Tile             | Looks like                                                                                          |
| --- | ---------------- | --------------------------------------------------------------------------------------------------- |
| 1   | Floor            | Very light grey, each tile a slightly different shade, darker towards the walls and brighter in the open, with faint scratches, cracks and chipped corners here and there |
| 2   | Slide floor      | The floor a shade cooler, crossed by thin grey diagonal lines that run on across neighbouring tiles; it keeps the floor's groove, so each tile still shows |
| 3   | Wall             | Mid-grey raised blocks with bevelled edges; neighbouring walls join into one mass, each flat top a plate of a slightly different shade, with faint scratches |
| 4   | Blocked wall     | Blocked: darker, riveted steel. Unblocked: a plain wall, with no mark that it can switch            |
| 5   | Emitter          | A dark steel housing on the wall's face it fires from, with a slit lens: lit pale gold while on, dark while off |
| 6   | Receiver         | The same housing with a round eye in place of the slit, lit pale gold while a ray reaches it, fading as it lights or goes dark |
| 7   | Light barrier    | On: a wide see-through teal band of hard light across the tile, horizontal or vertical, its bright edges flickering faintly, neighbours joined, a dark connector at each end with light pooling where the band leaves it. Off: only the connectors |
| 8   | Ditch            | Open: a deep pit, neighbours joined into one, its sides lighter and darker in long soft stretches. Bridged: a steel grate over it, each a shade of its own, with a band of bars rubbed paler and a scratch or two on its frame |
| 9   | Door             | Closed: a burgundy panel with glowing pink strips and a ring. Open: plain floor                     |
| 10  | Exit             | Closed: shaped like a door, but dark steel with white lights. Open: a gap in the outer wall, its floor fading into the dark stage around the chamber towards the chamber's edge (on the home menu's map, darkening to black) |
| 11  | Fizzler          | On: a see-through blue field over whatever is under it, thin wisps of cyan light winding slowly through it, light pooling at its connectors and short bright dashes drifting along it, a thin steel connector along each wall it spans between, its slot lit pale; fizzlers side by side across a gap make one field. Off: only the connectors, their slots dark |
| 12  | Laser            | On: a glowing crimson beam, horizontal or vertical, neighbours joined, an end plate at each end. Off: only the end plates |
| 13  | Box              | A grey plated cube, a little smaller than its tile, so a button under it still shows; lit as the floor where it started, darker by a wall, a look it keeps wherever it goes, in the subject's hands too |
| 14  | Mirror box       | The box with a glass bar from corner to corner in place of its disc, its plates a shade and a tint of their own; in the subject's hands, a line over the box shows which way it slants |
| 15  | Button           | A round red button on a white plate, the plate and its clamps a shade of their own; its dome lights up while pressed |
| 16  | Switch           | The button's twin in yellow, its plate a shade of its own; doesn't show whether it was used, though a dotted line from it lights once it is |
| 17  | Arrow            | A grey chevron pointing its way, its paint a shade of its own; a turnable one, a smaller chevron on a round disc cut into the floor, swinging round when it turns |
| 18  | Subject          | A painted test subject in an orange jumpsuit, portal gun pointing the way it faces; while carrying a box, it holds the box out in front instead |
| 19  | Portal           | A glowing blue or orange oval on the wall's edge facing the floor, with soft shafts of light and small sparks rising from it into the room |
| 20  | Ray              | A narrow pale gold beam with a dark rim and a white-hot core, glowing steadily, from the emitter's face to whatever stops it; it bends under a mirror box |

- Nothing in play ever waits for a drawing. The subject glides from tile to tile, through portals and along slides, and turns to face its new way; elements a link switches change over a moment (a door slides open, a laser fades, an arrow swings round); portals open, glow and give off sparks; a fizzle breaks the lost portals into pieces, and a box sent back to its start comes apart and flies home in pieces. A key pressed while anything moves acts at once, and a glide or a slide still running jumps to its end. During a slide, what happens on the way shows as the subject gets there, and what its stop sets off when it stops.
- Reaching the exit, the subject walks on out of the chamber, fading into the dark stage, and the completion dialog opens once it's gone; no key cuts it short, and the timer stopped at the key press.
- With reduced motion, nothing animates: everything changes at once, the glows and the fields hold still, the subject stays on the exit and the dialog opens at once.
- Each event has a sound of its own (a missed shot plays a shot sound), and every refused action plays the error sound: a crossing the subject can't come out of, shooting or using a switch while carrying a box, or putting a box down facing a tile that can't take it.
- How each thing looks and moves, with its timings: `docs/sprites.md`. Which sound plays when: `docs/interface.md` ("Sounds").

## Buttons, switches and links

- A button, switch or receiver is linked to elements elsewhere in the chamber: blocked walls (one tile each), emitters, light barriers, ditches, doors, the exit, fizzlers, lasers, turnable arrows and boxes. One can be linked to many, and several can share an element, which then needs all of them: a door two buttons are linked to opens only while both are held.
- An element opens once every button, switch and receiver linked to it is on (a button pressed, a switch used, a receiver lit): a blocked wall takes portals, an emitter switches on, a ditch is bridged, a door or the exit opens, a light barrier, fizzler or laser turns off, a turnable arrow turns to its other way, a box goes back to its start (unless it's being carried), flying home in pieces.
- Releasing any one of those buttons, or any one of those receivers going dark, closes it again: the blocked wall refuses portals (closing any portal on it), the emitter switches off, the ditch opens, the door or exit closes, the light barrier, fizzler or laser turns back on (a fizzler closing any portal facing it), the arrow turns back to its own way. A released button, or a receiver going dark, does nothing to a box.
- A button stays pressed only while the subject or a box is on it, so a box left on it keeps a door open while the subject walks away. A receiver works the same way, held by a ray instead (see [Rays](#rays)).
- A switch stays on from its first use until the chamber is restarted, so it never closes anything. Using it again only sends a linked box back again, while the others linked to the box are on. It can't be used while carrying a box, and a box is never put down on a switch, so none ever hides one.
- An element no button, switch or receiver is linked to keeps the state the chamber sets for good (an emitter is on unless the chamber says otherwise). A linked one starts closed, an emitter off, and opens at the start only if everything linked to it is already on, such as a button under a box or a receiver a ray reaches.
- Some links are shown by a dotted line on the floor, from the button, switch or receiver to the element, as in the original game, mostly in the tutorial and early chambers. It is cyan, and turns amber while its own button, switch or receiver is on, whether or not the element has opened, so the cyan lines to an element still closed show what is left to do. It is drawn over the tops of plain walls it crosses, but runs under blocked walls, emitters, receivers and anything else on its way, and changes nothing in play.

## Fizzlers in detail

- Entering a fizzler that is on (walking, coming out of a portal, or the fizzler turning on under the subject) closes both portals and sends a carried box back to its start.
- A portal can be shot past a fizzler that is off, or from inside it, onto the wall beyond at the end of its way through, never onto a wall behind its connectors; when the fizzler turns on, that portal closes and breaks up. So a crossing lands in a fizzler that is on only when the crossing itself turns it on, for example by leaving the button that held it off.
- While standing in a fizzler that is on, no portal can be shot.
- A box lying in a fizzler that switches on is destroyed: it goes back to its start, flying home in pieces. Any other box lying on the floor is affected only when it lies on the start tile of the box sent back, which sends it back to its own start.

## Slide floors

- Entering a slide floor, by walking onto it or coming out of a portal onto it, keeps the subject going the way it moves, tile by tile, all in the same action. It stops on the first tile that isn't slide floor (plain floor, an arrow pointing its way, or the open exit, which completes the chamber), or in front of anything it couldn't walk onto: a wall without a portal it can go through, an open ditch, a closed door or exit, a laser or a light barrier that is on, an arrow pointing another way, or a resting box.
- A slide goes through portals: sliding into a wall that holds a portal on that side, with the other one open, the subject comes out of the other portal, and slides on if it comes out onto slide floor. If it couldn't come out there, it stops in front of the portal, without the error sound a crossing from rest plays.
- On the way, a fizzler that is on still closes both portals and sends a carried box back to its start, and the slide goes on. A button passed over isn't pressed: only the tile where the slide stops counts.
- Standing on a slide floor, turning only turns; a move onto plain floor is a single step, and a move onto more slide floor slides again. Shooting, and picking up or putting down a box, work as on plain floor.
- Boxes don't slide: a box put down on slide floor stays there, and a carried box slides with the subject. A resting box stops a slide on the tile before it.
- A slide that would go round and round through two portals is refused: the error sound plays and the subject only turns the way pressed.

## Rays

- An emitter that is on sends a ray from the face it fires from, straight across the floor, tile by tile, until something stops it. Nothing travels along it: after each action every ray is worked out again from where everything stands, and it changes at once.
- A ray stops on a tile where the subject stands (with any box it carries), a box rests, a door or the exit is closed, or a light barrier is on, and at any wall it meets: a wall, a blocked wall, an emitter, a receiver or the chamber's edge. Everything else lets it through, on or off: ditches, fizzlers, lasers, buttons, switches, arrows and slide floors. A ray passing over a button doesn't press it.
- A resting mirror box turns a ray a quarter turn, the way its mirror slants, and the ray goes on from there. A mirror keeps its slant wherever its box goes, through portals too; a carried mirror box turns nothing, since the subject stops the ray first.
- A ray meeting a wall's side that holds a portal, while the other portal is open, comes out of the other portal, away from its wall, and goes on; with the other portal closed, it stops there.
- A ray reaching the face a receiver listens on lights it. While lit, a receiver acts like a held button: what it links opens, if everything else linked to it is on too, and closes again once no ray reaches it. A receiver can switch an emitter on, so one ray can start another.
- Rays block nothing and harm nothing: the subject walks into, stands in and walks through them, shots pass them, a box in one is safe, and rays cross each other freely. But a ray stops at the subject, so stepping into one darkens its receiver in the same action, closing what it held open, and stepping out lights it again. Putting a box down in a ray cuts it the same way, and picking the box up lets it through.
- Rays count only once an action has finished: a slide passing through a ray doesn't cut it, but one that stops in it does.

## Other details

- Something closing under the subject (a door, the exit, a light barrier, a ditch, a laser) doesn't hurt it: it can still turn, shoot, interact and walk off. A box it carries is kept.
- A box lying where a door closes, a ditch opens, or a laser, a light barrier or a fizzler switches on is destroyed: it goes back to its start, flying home in pieces, or falling into the ditch while it gathers at its start.
- A box keeps the subject off its tile, but lets shots through. A tile holds one box: a box can't be put down where another lies, and a box sent back to its start sends one lying there back to its own start. A box sent back to its start while the subject stands there lands under it: the subject can walk off but not back on, and picks the box up from beside it.
- Once the subject reaches the open exit, the chamber is complete and nothing more changes.

## Chambers and progress

- Eight chambers so far: the tutorial run, Chamber 1 (9 × 5 tiles), Chamber 2 (7 × 7 tiles), Chamber 3 (8 × 5 tiles) and Chamber 4 (9 × 5 tiles), then run 2, Chamber 5 (7 × 5 tiles), Chamber 6 (6 × 6 tiles), Chamber 7 (7 × 6 tiles) and Chamber 8 (10 × 5 tiles). The old tutorial (12 × 10 tiles) and the nine chambers that used to follow it left the game for good and are kept only in development, as playground chambers for trying elements and ideas.
- The timer starts with the first press of a move, portal or interact key in a chamber and stops when the chamber is complete. The only score is the time: there are no medals or move targets.
- Finishing a chamber shows the time and the best time (or "New best time"), with Next chamber, Play again and Back to menu (after the last chamber, only Back to menu and Play again).
- The pause menu offers Continue, Settings (the sound effects and music volumes, as under the home screen's Settings), Restart chamber and Exit chamber; restarting or leaving asks for confirmation first.
- Progress is kept on the device: which chambers are completed, each one's best time and how many attempts it has had.

## Sound and music

- Each event in a chamber has its sound (see [How each tile looks](#how-each-tile-looks)). The menus have three of their own: one for moving around them, one for pressing something, and one for starting a chamber from the home menu.
- Settings has two volumes, sound effects and music, each from Off to 100 in steps of 10, kept on the device.
- The home screen plays its own music, which carries on where it left off each time the player comes back to it.
- In a chamber, a playlist of tracks from the Portal and Portal 2 soundtracks plays, each track once through: the visit's first chamber starts its opener, Science is Fun, from the beginning, and every chamber opened after it, and Play again, moves on to the next track. A track that ends moves on too, Restart chamber leaves the track playing, and with the music Off nothing moves it on. The next visit carries on the list from where the last one left it.

## Screens

- **Loading screen:** the first screen of every visit; it loads the sounds, images and fonts, then waits for Start. The chamber music's tracks after its opener are left out: each downloads while the one before it plays.
- **Home screen:** a menu on the wall of a test-room photo: Play (the chambers, each with its best time, a figure that turns green once completed, and a map preview of the chamber; until any chamber has been opened on the device, and again after a progress reset, Enter, Space or a click on Play starts Chamber 1 instead, while Right still opens the list), Settings (the sound effects and music volumes, from Off to 100 in steps of 10, set with Left and Right or the pointer; controls; and reset progress; the controls are Default, the arrows with A, D, Space and Shift, or Custom keys set one by one; the mouse plays no part in the game) and About (More games, links to the author's other games; the changelog; Valve's Portal, Valve's games on Steam; and Feedback, by email).
- **Chamber screen:** the chamber on a dark stage, lit a little behind it, with the side panel beside it.
- Desktop only: phones and tablets get a notice instead of the game.
