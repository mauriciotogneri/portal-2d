# Free movement: handoff plan

This file is the whole handoff for replacing the game's tile-by-tile movement with free movement. A new session knows nothing else about it, so everything decided, everything found in the code and every step to take is written here.

- **Written:** 2026-11-28, at commit `0bb5c76` on `main`.
- **Status:** design decided by the author, question by question (section 3). The step-by-step plan (section 7) was written but **not yet explicitly approved**: show the author the plan's outline and get a clear yes before starting step 1.
- **Branch:** work on `main` (the author's call). Don't create a branch.
- **Line numbers** below were read at `0bb5c76`; re-check them before editing, they drift.
- **This file** is temporary and isn't listed in `AGENTS.md`'s layout. When the work is done, ask the author whether to delete it (its lasting content belongs in `docs/`).
- `AGENTS.md` (project rules) and the author's global instructions load on their own in a new session; section 11 only repeats the parts this work trips over most.

---

## 1. Goal

Today the subject stands on one tile, faces one of four ways, and a move key press turns it (or, if it already faces that way, steps it one tile). Portals are shot only along the row or column it faces.

The goal is free movement, like a top-down shooter:

- W/A/S/D (held) move the subject continuously, at any position, not tile to tile.
- The mouse pointer sets the subject's facing at any angle.
- Left click shoots the blue portal, right click the orange one, along that angle.
- Space interacts (pick up or put down a box, use a switch).
- The subject still can't pass walls, closed doors, lasers that are on, open ditches, boxes, and so on, and still fits one-tile corridors.
- Walking through a portal is continuous: the subject can be half way through, drawn coming out of the other portal.

The change applies to the whole game, campaign included. The author accepts that chambers may become easier, unsolvable or broken, and that the solver may stop being accurate; they will play-test (playground and campaign chambers), give feedback, and redesign chambers, re-record solutions and fix the solver later. **This work does not redesign or re-check chambers.**

---

## 2. How movement works today (facts, at `0bb5c76`)

### Rules (`src/game/rules/`, pure, also run under Node)

- `Action` (`src/game/rules/action.ts:9-21`) is a union of 11 strings: `up`, `down`, `left`, `right` (plain moves: turn and step at once), `turnUp`, `turnDown`, `turnLeft`, `turnRight`, `blue`, `orange`, `interact`. `ACTIONS` (`:48-61`) is a fixed order that seeded random walks rely on. `MOVEMENTS` (`:63-97`) maps every action to its movement or null. `actionOfPress` (`:109-138`) maps a press to an action; every move key becomes a **turn** action (plain moves are only played by recorded solutions, behaviour fixtures and the solver).
- `step(chamber, state, action)` (`src/game/rules/step.ts:903`) returns `StepResult {state, events, path}` (`:41-45`); `path` is a list of `SlideLeg {x, y, direction, crossed, events, state}` (`:28-35`), empty unless the step slid. It returns the same state object when nothing changed.
- `move` (`step.ts:441-476`): if the subject's own tile is an arrow and the way isn't the arrow's, nothing happens at all (`:446`). Otherwise it faces the way; a turn stops there unless it already faced that way. A wall ahead → `crossPortal` (`:267-283`, private): `CROSSED` or `REFUSED` (error sound). A floor tile it can't enter → silent no-op. Slide floor → `slide` (`:389-429`); a slide that would loop is refused as a whole (`refuseLoop`, `:879-890`: only facing changes, `REFUSED`).
- Exported helpers usable from outside the rules: `allowsWay` (`:170`), `canEnter(draft, x, y, direction)` (`:195`, walls incl. outside the chamber, walking-blocking elements, arrow way; **not** boxes), `boxBlocksEntry` (`:226`), `stopsShot` (`:486`), `shotStop(draft, x, y, direction)` (`:542`), `putDownTile` (`:670`), `canInteractInPlace` (`:693`), `canInteract` (`:710`), `startChamber` (`:857`), `step` (`:903`). Private: `canArrive` (`:237`), `crossPortal`, `takesPortalsNow` (`:513-515`), `hasRoomForPortal` (`:527-529`), `shoot` (`:569-596`).
- **Shooting today** (`shoot`, `step.ts:569-596`), in order:
  1. Standing on a fizzler that is on (`stopsShootingFrom: 'whenBlocked'`): returns silently, no event.
  2. Carrying a box: `REFUSED`.
  3. `shotStop` walks from the next tile the way the subject faces (its own tile never counts) to the first tile where `stopsShot` (a blocked door, exit, fizzler or light barrier) or `chamber.isWall` (outside the chamber counts as wall) holds.
  4. The portal opens when `!stopsShot(stop)`, `takesPortalsNow(stop, OPPOSITES[dir])` and `hasRoomForPortal(stop, dir)`: `draft.openPortal(color, x, y, side)` and `BLUE_PORTAL_OPENED`/`ORANGE_PORTAL_OPENED`. Otherwise `REFUSED` (which plays the shot sound for a shot, not the error sound: `level.ts:460`).
  - `takesPortalsNow` = `chamber.canTakePortalOn(x, y, side) && !isBlockedAt('blockedWall', x, y)`. `canTakePortalOn` (`compiled_chamber.ts:550-559`) refuses faces in front of a door or exit, a laser or light-barrier run's end plate, a fizzler connector, and walls that never take portals (emitters, receivers, unlinked blocked walls, outside). `hasRoomForPortal` refuses a tile that already holds a portal (either colour, the one being moved included) on any side but the far one.
- **Events carry no data** (`src/game/game_event.ts:5-40`, a string union). Effects that need where a shot stopped recompute it from the state after the step with `shotStop(state, subjectX, subjectY, state.facing)`: `miss_ripple.ts:140-153`, `fizzler_splashes.ts:47`, `light_barrier_reactions.ts:53`, called from `level.ts:775-779`.
- **State** (`state_layout.ts:41-49`): fixed Int16 slots `SUBJECT_X` 0, `SUBJECT_Y` 1, `FACING` 2 (index into `DIRECTIONS`), `CARRIED_BOX` 3, `BLUE_PORTAL` 4-6 and `ORANGE_PORTAL` 7-9 (wall column, wall row, side index; -1 when closed), `COMPLETED` 10. No continuous position or angle anywhere. Hash: FNV-1a over the values (`rules_state.ts:29-45`, `text_hash.ts`). A step counts as a move when the subject's tile changes (`step_counts.ts:12-14`).
- **Interact** (`step.ts:721-757`): a hook on the subject's own tile first (a switch: `REFUSED` while carrying); else a carried box goes down on the faced tile (`putDownTile`) or `REFUSED`; else it picks up the box on the faced tile (`boxInReach` `:626` via `reachesAhead` `:610`). Everything uses the four-way `facing`.
- **Arrows**: an arrow turning under the subject calls `draft.face(way)` (`elements/arrow.ts:13-26`), so on an arrow the subject always faces its way and shots fly that way.
- **Coordinates**: row 0 is at the **bottom**; check `DELTAS` in `src/game/direction.ts` for which way `UP` goes (`y + 1` is expected).

### Replays, fixtures, checks

- `ReplayData.actions: readonly Action[]` (`src/game/replay_data.ts:19-24`), written as plain strings; `parseReplayAction` (`:32-40`) accepts only strings in `ACTIONS`. `scripts/solution_file.ts:89-97` rejects any non-string entry. `level.ts:349-375` (`createReplay`) and `chamber_screen.vue:572-597` write the file.
- Places that enumerate or switch over actions: `step.ts:765-787` (`runAction`) and `:921`; `replay_runner.ts:28-65` (passes them through); `scripts/check_replays.ts:72-79` (completed chamber: every action in `ACTIONS` must change nothing); `scripts/random_walk.ts:68` and `scripts/check_solver.ts:123` (seeded picks from `ACTIONS`); solver: `src/solver/baseline_search.ts:156`, `macro_action.ts` (`ACTION_BITS = 4`, index in `ACTIONS`, `:5`, `:50-91`), `shot_lines.ts:19-22`, `macro_search.ts:335-351`, `macro_route.ts:116`; `level.ts:579`, `:599`, `:608` (treats `'blue'`/`'orange'` actions as `PortalColor`); `src/dev/gallery_layouts.ts:313-334`, `src/dev/sprite_gallery.ts:359`; fixture types `scripts/fixtures/fixtures.ts:100`, `scripts/solver_fixtures/solver_fixtures.ts:27`.
- Actions printed with `${action}`: `level.ts:359`, `check_replays.ts:77`, `random_walk.ts:78`, `check_solver.ts:280,289`, `macro_action.ts:54`, `macro_route.ts:128`.
- Behaviour fixture shape (`scripts/fixtures/fixtures.ts:96-102`): `{name, behaviour, chamber (imported JSON), actions, expected: {completed, moves, portals, finalHash}}`; checked by `check_replays.ts:132-146`; their chambers also feed `random_walk` (`listFixtureChambers`, `:2530-2549`). Fixture chambers are `scripts/fixtures/*.json` (included by `tsconfig.scripts.json`).
- `docs/elements.md`: shot rules `:121-130`, interaction table `:271-290` with codes after it (shots: P1-P8 `:309-316`, each naming its fixtures in backticks), "changes from the original rules" `:244-269` (each ending "Fixture: `name`").
- `npm run verify` = lint, build, bundle check, assets check, smoke engine, replay check, solver check, random walk, chamber check (`package.json:13`).

### Live game (`src/game/`, browser side)

- **Level frame loop** (`level.ts`, `onFrame` `:833-877`): frame stats → delta → `playSlideBeats` and `tellWaitingCompletion` → `update()` unless paused → `ambient` check (incl. `turn.isRunningAt`) → render only if the state changed, something animates or ambient life runs (**idle frames draw nothing**) → next frame.
- **Presses → actions** (`update`, `:502-537`): the clock starts when a key in `CLOCK_START_KEYS` (`:93-101`) is pressed; once completed every press is dropped; otherwise one `input.takePress()` per frame → finish running animation → `updateRules` (`actionOfPress`, `:549`) → `runStep` (`:433-441`) → `applyStep` (`:575-623`: logs action + hash, counts moves when the tile changes, counts portals, starts the step animation, light-barrier walk-in, queues slide beats or plays the step's effects and sounds, calls `onStep`).
- `StepReport` (`level.ts:52-57`) is `{x, y, events, completed}` with x, y the rules tile; the chamber screen sets off tile hints by exact tile equality (`chamber_screen.vue:386-404`, `:399`). `onCompleted` takes no arguments.
- Public: `started` (`:286`), `elapsedHundredths` (`:295`), `moves` (`:305`), `portalsPlaced` (`:313`), `framesPerSecond` (`:323`), `chamberWidth`/`chamberHeight` (`:330-339`), `paused` (`:271-280`: disables input; resuming calls `input.reset()`), `load` (`:210-257`), `resize` (`:384-391`), `dispose` (`:396-406`), `createReplay` (`:349-376`). Reduced motion read at `:198`, checked at `:421`, `:580`, `:601`, `:737`, `:865`.
- **Input** (`src/game/input.ts`): listens on `window` for keyup, keydown, mousedown, contextmenu (`:68-71`). Presses are a FIFO (`:56`, `takePress` `:102-112`); a held key's repeat is dropped only while its earlier press still waits (`:159`). **No held-key state** (keyup only suppresses browser defaults, `:172-176`), **no blur handling**, **pointer position never read**. Only bound mouse buttons count (`getMouseBoundKey`, `key_bindings.ts:118`); each mousedown queues one press (`:186-203`); context menu suppressed only when the right button is bound (`:210-214`). Alt/Meta ignored. `FrameInput` is `{keys: readonly GameKey[]}` (`frame_input.ts:6-8`); `GameKey` = up, down, left, right, blue, orange, interact.
- **Animations**: `step_animation.ts` (purely visual): a step takes 120 ms (`STEP_MILLISECONDS`, `:37`, cubic ease-out), a slide 60 ms per unit (`:40`; a crossing is 2 units; last unit eased over 120 ms), a walk-out 180 ms per tile (`:43`) carried 1 tile past the exit (`:46`); starts one frame early (`:49`). API: `StepTransition`, `legUnits`, `slideUnits`, `legReach`, `shownState`, class `StepAnimation` (`running`, `endTime`, `start`, `finish`, `momentAt`, `transitionAt`). Also used by `tools/detail_mixer/engine/entry.ts:56,370-491` (not linted, not type-checked). `subject_pose.ts`: `SubjectPose {x, y, facing, clip, portalsAhead}` (`:17-23`); `subjectPose(state, transition, tileSize)` (`:41`) with slide (`:82`), glide (`:120`), walk-out (`:149`) and crossing (`:174-212`: two halves, each clipped to one tile) variants; offsets rounded to whole pixels. `subject_turn.ts` (`SubjectTurn`, `:51`): eases the drawn angle toward the facing, 100 ms per quarter turn (`:18`), snaps through portals (`:79-89`).
- **Renderer** (`renderer.ts`): `render(state, transition, time, fizzle, changes, ripple, fall, openings, turn, returns, particles, flashes, reactions, splashes)` (`:674`, positional). `drawSubject` (`:441-459`) clips via `drawClippedToTile(pose.clip)` (`tile_painter.ts:260-277`, shadow included); `drawSpriteRotated(sprite, x, y, angle, look)` (`tile_painter.ts:439-458`) **already takes any angle and fractional x/y**. Carried box: part of the `subject_holding_box` sprite with the box's look laid over (`CARRIED_BOX_AHEAD = 0.26`, `renderer.ts:93`; `:442-446`); the mirror stroke uses sin/cos of the angle (`:470-493`). Layers (`rules/draw_layer.ts`): floor, floorMarks, structure, blockers, portals, fixtures, items, subject, fields; rays after fixtures (`:715-717`); fields over the subject (`:697-699`); glows, particles, fizzle, flights, ripple last (`:720-737`). While completed, the subject is drawn on its own layer under the exit shadow (`:556-563`, `:703-704`).
- **Rays** end at the middle of the subject's rules tile (`rules/rays.ts:211`); `ray_drawing.ts:198-219` (`drawnEnd`) adjusts only at light barriers; ray glow cached by run key (`renderer.ts:625-642`).
- **Canvas mapping**: `tileSize = min(trunc(screenW / max(w, 16)), trunc(screenH / max(h, 16)))`, canvas = `tileSize*w × tileSize*h` (`tile_painter.ts:144-155`, `MINIMUM_TILES = 16` at `level.ts:104`). Row 0 at the bottom: `tileTop(y) = canvas.height - (y + 1) * tileSize` (`tile_painter.ts:711-713`). The screen passes device-pixel sizes (`chamber_screen.vue:204-206`, `:685-688`) and sets the CSS size to canvas / DPR (`:149-152`); the canvas is flex-centred in `.chamber-stage` (`:924-935`). The canvas element **is** the chamber area, so `getBoundingClientRect()` maps the pointer to tiles. `Level` is constructed with the canvas (`chamber_screen.vue:688`) but keeps no reference (`level.ts:197`); `Renderer` exposes no tile size. `placeHint` (`chamber_screen.vue:173-192`) already converts tile → page.
- **Effects that assume the rules tile/facing or `shotStop`**: `miss_ripple.ts:139-151`; `fizzler_splashes.ts:46-58`; `light_barrier_reactions.ts:52-75`, `:139-140` (`startWalkIn` needs a `Movement`; `fromX`/`fromY` pick the band's face, `light_barrier_band.ts:306-310`); `fizzler_flashes.ts:41-47`; `returned_boxes.ts:102-111` (carried box breaking up starts at tile centre + 0.26 × facing); `destroyed_boxes.ts:56-58` and `mirror_bounces.ts:65-67` (put-down tile from the facing; still right with the snapped facing). Unaffected: element transitions, portal openings and particles, fizzle particles, box falls, box return flights, exit shadow.
- **Sound** (`sound.ts:89-100`): `play()` restarts one shared element, no throttle. `REFUSED` plays `ERROR` (`level.ts:113`), except a shot's refusal plays `SHOOT` (`:460`). Walking into a plain wall emits nothing. Anything refused every frame would restart the error sound every frame.
- **Home menu map** (`chamber_preview.ts:24-26`) calls `render(state)` with defaults (pose at rest): keep that path working.
- **ESLint** (`eslint.config.js`): `src/game/**` may not import `@/chambers`, `@/components`, `@/services`, `vue`, `vue-router` nor use `localStorage`/`sessionStorage` (`:160-199`); `window`, `document`, pointer events, `requestAnimationFrame` are allowed. `src/game/rules/**` (`:185-253`) and `src/solver/**` (`:257-326`) also ban ~40 browser modules by name (incl. `input`, `level`, `renderer`, `step_animation`, `subject_pose`, `subject_turn`, `miss_ripple`) and the globals `window`, `document`, `Audio`, `requestAnimationFrame`, `performance`. **New browser modules must be added to both ban lists, and to the list in `AGENTS.md`.**

### App side (Vue)

- `chamber_screen.vue`: creates the level (`:688`), `onCompleted` (`:689`), `onStep` (`:690`), dev `frameStats` (`:691-696`), `load` (`:703`), restart (`:445-451`), fit/resize (`:198-209`, observers `:707-709`), dispose (`:749`), pause (`setPaused` `:252-256`; `openPause` `:261-267`; `openHint` `:293-300`; `handleCompleted` `:562`; `guardExit` `:661`; `resume` `:282-285`), Escape (`:620-646`), timer every frame (`:234-246`), timer hints (`:344-377`), analytics progress (`:420-428`: `moves`, `portals`, `pauses`, `framesPerSecond`). **No cursor style and no pointer listener on the stage or canvas.**
- Legend (`src/components/chamber_legend.vue`): header comment "turning and moving" (`:3`); 7 game keys (`:41-49`); the four move keys in an inverted-T cluster (`.arrow-keys`, `:92-97`, CSS `:329-360`); move row "Move" / "Face that way, press again to step" (`:99-100`); portal rows "Shoot a blue portal" / "Shoot an orange portal" (`:116`, `:132`); interact (`:146-147`); Esc/Pause (`:151-154`); only Space drawn wide (`:36`); heading has `@mousedown.prevent` (`:72`). `key_cap.vue:154` draws `MouseGlyph` for a mouse button (`mouse_glyph.vue:182-207` fills it in the portal's colour). `key_glyph.vue` draws arrows as triangles. `key_labels.ts:267-291` labels mouse buttons and arrows.
- Custom controls dialog (`custom_controls_dialog.vue`): rows Move up/down/left/right, Blue portal, Orange portal, Interact (`:32-68`); intro "Pick an action, then press its new key. For a portal, click its row with a mouse button." (`:236`); mouse note only on portal rows (`:95`); refusals (`:153-163`); mouse binding on mousedown over the waiting row (`:186-204`); context menu blocked on portal rows (`:212-216`). `control_row.vue` (`:37-45`, `:62`).
- Bindings: `src/game/key_bindings.ts`: `ARROW_KEY_BINDINGS` (`:21-29`: arrows, `KeyA` blue, `KeyD` orange, `Space` interact); one key per game key, never shared; only blue and orange may take `MouseLeft`/`MouseRight` (`MOUSE_GAME_KEYS` `:57-60`). `src/services/key_bindings.ts`: `ControlLayout = 'arrow-keys' | 'custom'` (`:13-21`), storage key `portal-2d.key-bindings` (`:29`), `{layout, custom}`; Default's keys never stored; fallbacks `readBindings` (`:75-103`), `readControls` (`:111-121`, unknown layout incl. retired `wasd-mouse` → Default); `chooseControlLayout` (`:185-196`) calls `trackControlsChange`. Home Settings > Controls: `home_screen.vue` `LAYOUTS` (`:181-190`), template `:1270-1297`.
- Analytics (`src/services/analytics.ts`): `RunProgress.moves` = "steps that put the subject on another tile" (`:59`); `LAYOUT_NAMES` sends `'arrow-keys'` as `'default'` (`:72-76`); event and parameter names are permanent.
- Hints (`src/services/hint_catalogue.ts`): chamber 1 timer hints cancelled by `crossed` (`:38-65`); chamber 3 tile hint at (5,2) cancelled by `boxPutDown`, comment "the first press towards the exit presses the button" (`:66-95`); no hint text names a key or turning. `hint_spotlight.vue` suppresses Space (`:220-223`).
- Changelog: `src/services/changelog.ts` (`CHANGELOG`, newest first); newest entry 0.1.0 (2026-11-14). Past entries describe past releases: leave them.
- Device gate: `src/services/device.ts:9` checks `pointer: coarse` only; its comment says "played with a keyboard" (`:7`); `desktop_only_notice.vue:3` "no keyboard to play with".

---

## 3. Decisions (the author chose each one)

| # | Area | Decision | What it rules out / costs |
|---|---|---|---|
| 1 | Scope | Free movement **replaces** grid movement game-wide. Chambers may break or become unsolvable, the solver may break; the author play-tests (playground and campaign) and gives feedback, then redesign, solutions, solver, analytics follow later. In their words: "it's ok if some chambers break or become unsolvable. i will fix them later." | No second mode, no playground-only trial, no chamber redesign in this work. |
| 2 | Grid scope | **Only the subject leaves the grid.** Boxes rest on tiles, rays run along rows and columns, every element works per tile, and a shot at any angle opens its portal on the **whole face** of the wall tile it hits. Chamber files and element rules stay. | No free boxes, no portals at arbitrary points along a wall, no angled rays or mirrors. |
| 3 | Portal crossing | **Walk through at walking speed**, drawn split across both portals; the subject's tile switches when its centre crosses the face. A held key **keeps moving it the way it came out** until the keys change. Shooting (and interacting) while half inside a portal is refused. | No snap-through animation; no screen-fixed keys after exit. |
| 4 | Interact target | The **neighbour tile the aim points to**, the aim snapped to four ways, shown with a faint highlight. Box rules unchanged; diagonals never targets. | No pointer-over-tile targeting, no nearest-box auto-target. |
| 5 | Arrows and slide floors | **Same rules, played as lanes.** Arrow: enter only moving its way; on it only that way's key moves, and **aim locks to its way** (so shots fly that way). Slide floor: the subject is **carried** along the row or column at a set speed, centred, with **no shooting or interacting** until it stops centred on a tile. | No free aim on arrows, no ice/conveyor physics. |
| 6 | Aim cue | A **faint aim line** from the gun to where a shot would stop now, with a small mark on that face. It does **not** say whether the face takes a portal. | No valid/invalid colouring, no crosshair-only. |
| 7 | Controls | Default: **W/A/S/D** move, **pointer** aims, **left click** blue, **right click** orange, **Space** interacts. **The mouse is required**: keyboard-only play goes away. Custom still rebinds any game key, one key per game key (e.g. moves to the arrows, a portal to a key). | No two keys per action, no keyboard aiming fallback. |
| 8 | Branch | Work on `main`. | — |

### Assumptions locked in without asking (tune after play-testing)

| # | Assumption |
|---|---|
| 1 | The body is a **circle 0.6 tile wide** (radius 0.3), so it fits one-tile corridors; a small corner assist slips it into a one-tile opening when slightly off line (a circle already slides round corners; add explicit assist only if play shows snags). |
| 2 | **Constant speed, 4 tiles per second**, no acceleration; diagonal speed normalised (not faster). |
| 3 | Shots leave from the **subject's centre**. A shot passing **exactly** between two blocking tiles that touch at a corner is stopped (a miss); grazing a single tile's corner passes; entering a wall exactly through its corner is a miss. |
| 4 | The rules' four-way facing **follows the aim** (snapped), so walking backwards while aiming forwards is allowed. |
| 5 | Anything turning solid at the body's edge (a door closing, a laser turning on, a box put down) **pushes the body out**; the tile under its centre never blocks it (today's rule: something closing under the subject does nothing). |
| 6 | If a portal closes while the subject straddles it (e.g. a fizzler turning on), the body is pushed fully onto the side its centre is on. |
| 7 | Walking into a portal whose far side refuses the crossing: the portal acts as a wall, and the error sound plays **once per contact**, not every frame. |
| 8 | Putting a box down on a tile the body overlaps nudges the subject back. |
| 9 | Rays and buttons react to the **tile under the centre**, as today. A ray stopped by the subject is drawn to the body's edge (or the tile's middle if the body is off its line). |
| 10 | Tile hints trigger when the centre enters their tile (unchanged mechanism). With reduced motion, slides jump straight to their stop and there is no walk-out (as today). |
| 11 | The move count (`moves`, analytics) keeps its meaning: each time the subject's tile changes. |
| 12 | The interact highlight shows only while a box is in reach on the snapped tile, or the subject carries a box. |
| 13 | The saved controls layout id `arrow-keys` becomes `default`; an old saved value falls back to Default (stored formats may change without migration, per `AGENTS.md`). Analytics keeps sending `default`. |
| 14 | No version bump and no changelog entry (the author decides those); chamber spoiler notes (`docs/spoilers/`) are not touched. |
| 15 | The campaign's recorded solutions are **not** re-recorded: they keep replaying because the old actions' rules don't change. |

---

## 4. Architecture

### The key idea: keep the rules discrete, drive them from a continuous layer

The rules engine stays exactly as it is for every existing action, so **recorded solutions, behaviour fixtures, the solver check and the random walk keep passing**. The live layer (browser side of `src/game/`) gets a free-moving body and turns what it does into the rules' existing actions:

| # | What happens live | Rules action played |
|---|---|---|
| 1 | The body's centre crosses into a neighbour tile | The plain move that way (`up`/`down`/`left`/`right`: turn and step at once). If both edges are crossed in one frame, play the horizontal one first, then the vertical one. |
| 2 | After that move (or a crossing, or an arrow turning), the aim's snapped way differs from the rules facing | A turn action to the aim's snapped way (ignored by the rules on an arrow, which is what locks aim there). |
| 3 | The aim's snapped way changes while standing | A turn action. |
| 4 | Left/right click (or a key bound to a portal) | The **new** aimed shot action (below). On an arrow tile the rules play today's four-way shot instead. |
| 5 | Interact pressed | `interact` (the facing is already synced to the snapped aim). |

Every action goes through `step` and `applyStep` as today: logged with its hash (so Download solution and `createReplay` keep working), counted, reported through `onStep`, sounds and effects played.

### Asking the rules what the body may enter ("tile gate")

Collision must never disagree with the rules. So for the **four side neighbours** of the tile under the centre, the gate runs the rules' plain move that way on the current state and **discards the result** (`step` is pure and cheap): the neighbour is enterable exactly when that move changes the subject's tile (a normal step, a slide, or a crossing with `CROSSED`). This one probe covers walls, closed doors and exits, lasers and light barriers that are on, open ditches, resting boxes, arrows (both the arrow on the tile being left and the one being entered), refused slide loops and portal crossings, exactly as the rules will judge them. A probe that reports `REFUSED` for a crossing means "solid face; play the error sound once on contact".

For the **four diagonal neighbours**, a tile counts as solid only when no way into it is allowed (`canEnter` false for all four ways, or a box rests there): the body only ever touches their corners.

Results are cached per rules state (the state object changes identity whenever anything changes).

### Coordinates and conventions

- Chamber coordinates in **tile units**, matching the rules: tile (x, y) spans `[x, x+1] × [y, y+1]`, its centre `(x + 0.5, y + 0.5)`, **row 0 at the bottom**, y grows upwards.
- Angles in **radians, counter-clockwise from +x (east)** in chamber coordinates. The canvas draws with y down, so convert when drawing (`drawSpriteRotated` takes clockwise-from-up: check its convention at `tile_painter.ts:439-458` and `subject_turn.ts` `WAY_ANGLES`).
- Pointer → chamber: `x = (clientX - rect.left) / rect.width * chamberWidth`, `y = chamberHeight - (clientY - rect.top) / rect.height * chamberHeight`, with `rect = canvas.getBoundingClientRect()` (cache it on load/resize; it's the chamber area exactly).
- Screen directions for keys: W/up = +y, S/down = −y, A/left = −x, D/right = +x.

### The aimed shot (new rules action)

- Type (new `src/game/rules/aimed_shot.ts`): `AimedShot = {shot: PortalColor, x: number, y: number, angle: number}`; `RulesAction = Action | AimedShot`; helpers to tell them apart, validate a parsed object (finite numbers, colour `'blue'`/`'orange'`) and print one (`describeAction`) for logs and script output. In a solution file it is a JSON object, e.g. `{"shot": "blue", "x": 3.42, "y": 1.5, "angle": 0.7854}`; doubles round-trip exactly through JSON, so replays stay deterministic.
- `step` accepts `RulesAction`. Existing string actions take today's path untouched.
- Running an aimed shot (in `step.ts`, so it can use the private `takesPortalsNow` and `hasRoomForPortal`):
  1. If the subject's tile is an arrow (a one-way tile): play today's `shoot(draft, color)` (facing already equals the arrow's way). This is the aim lock.
  2. Standing on a fizzler that is on: silent no-op (as today). Carrying a box: `REFUSED` (as today).
  3. Clamp the origin into the subject's tile (a tiny inset from its edges), so a bad file can't start a shot elsewhere.
  4. Trace (below). If the stop is a corner case or outside the chamber: `REFUSED` (a miss). Otherwise, with the entered side and the travel direction across that edge (`dir`): open the portal when `!stopsShot(stop)`, `takesPortalsNow(stop, side)` and `hasRoomForPortal(stop, dir)`, exactly as today; else `REFUSED`.
- Trace (new `src/game/rules/shot_trace.ts`, pure, no DOM): a grid traversal (Amanatides–Woo DDA) from the origin along `(cos angle, sin angle)`, snapping components with magnitude below 1e-12 to 0 (so the four axis angles behave exactly like today's straight shots). The subject's own tile never counts. It stops on the first tile where `chamber.isWall` (incl. outside the chamber) or `stopsShot` holds, and returns `{stopX, stopY, side, travel, hitX, hitY, kind}` where `side` is the face of the stop tile the line entered (moving +x enters its west/left side, i.e. `OPPOSITES[RIGHT]`), `travel` the axis direction crossed, `(hitX, hitY)` the exact point on that face, and `kind` one of `face`, `corner`, `edge`. Corner rule, with `EPSILON = 1e-9` tile: when the next x and y crossings coincide, look at the two side tiles; if **both** stop the shot → `corner` miss at the corner point; otherwise step diagonally into the corner tile, and if **that** tile stops the shot it was entered through its corner → `corner` miss; else go on.
- The live layer calls the same trace on the current state for the **aim line**, the **miss ripple**, **fizzler splashes** and **light-barrier reactions** (the rules' events carry no positions), so what is drawn always matches what the rules did.

### Walking through a portal

- A wall tile W next to the centre's tile, holding a portal on the face toward it, whose crossing the gate accepts, is **not solid through that face**; W's own neighbours along the wall are diagonal neighbours of the centre's tile and stay solid, so the body can only go straight in.
- When the centre crosses that face, play the plain move into W: the rules cross (`CROSSED`) and put the subject on the tile in front of the other portal, facing away from it. Move the body through the **portal mapping**: the rotation R that turns the entry direction (into the entry face) into the exit direction (out of the exit face); the centre's offset from the entry face's midpoint is rotated by R and placed relative to the exit face's midpoint. No mirroring.
- **Heading carry**: remember the held move keys at the crossing and R; while the same keys stay held and nothing else is pressed, the movement vector is R × (the keys' screen vector). Any change of held keys drops the carry.
- **Split drawing**: for every open portal face within 0.3 tile (the radius) of the centre, on the centre's side, also draw the body mapped through that portal pair. Each copy is clipped to **everything except that portal's wall tile** (canvas clip with an even-odd path: whole canvas plus the wall tile). The real body is clipped the same way for its own portal. This works before and after the centre crosses, and for the two-portals-facing-one-tile case.
- **Guards**: while the body overlaps any portal's wall tile, shots and interact are refused by the live layer with the error sound (the rules are not called). If a portal closes or a crossing back becomes refused while straddling, the gate makes that face solid and the normal push-out moves the body onto its centre's side.

### Lanes: arrows and slides

- **Arrow** (subject's tile is an arrow): only the key for the arrow's way moves the body (others are ignored, as the rules ignore them); the sideways offset eases to the lane's centre while moving; aim (drawn angle and rules facing) locks to the arrow's way. A turnable arrow turning underneath turns the lane with it (the rules already turn the subject).
- **Slide**: when a plain move returns a non-empty `path`, the body enters **carried** mode: the slide animation drives its position (start part way into the first tile, since the centre is already at its edge, i.e. 0.5 unit in; ease the sideways offset to 0 over the first leg), input moves nothing, shots and interact are ignored (no sound), and at the end the body is centred on the stop tile. Crossings inside a slide use today's slide-crossing drawing. With reduced motion the body jumps to the stop tile.
- **Walk-out**: when a move completes the chamber, the walk-out runs from the body's position, along the move's way, 180 ms per tile, one tile past the exit (as today), sideways offset eased out; the completion dialog waits for it. Reduced motion: no walk-out (today's behaviour).

### Per-frame flow in `Level` (after the change)

1. Frame stats, delta (cap the frame time at 50 ms so a hitch never moves the body more than 0.2 tile).
2. Slide beats and waiting completion, as today.
3. If not paused and not completed:
   1. Read held move keys and the pointer; compute the aim angle (keep the last angle while the pointer is within 0.1 tile of the centre) and its snapped way (switch only once past 50°, i.e. 5° of hysteresis, to avoid flicker).
   2. Unless carried: compute the movement vector (keys, arrow lane, heading carry), move the body with collision against the gate's solid tiles, push out of tiles that turned solid, and for each tile edge the centre crossed play the plain move (and a crossing applies the portal mapping). After each move, sync facing with a turn if needed.
   3. If the snapped aim differs from the rules facing (and not on an arrow, not carried): play a turn.
   4. Take queued presses (shots, interact) one per frame, as today, with the guards above.
   5. The clock starts on the first held move key, shot or interact (pointer movement alone doesn't start it).
4. Draw if the body moved, the drawn angle changed, an animation or effect runs, or ambient life runs; idle frames still draw nothing.

---

## 5. New and changed modules at a glance

| # | File | New/changed | Role |
|---|---|---|---|
| 1 | `src/game/rules/aimed_shot.ts` | new | The aimed shot action type, `RulesAction`, validation, printing |
| 2 | `src/game/rules/shot_trace.ts` | new | Pure tile traversal of a shot at any angle |
| 3 | `src/game/rules/step.ts` | changed | Runs the aimed shot; existing actions untouched |
| 4 | `src/game/replay_data.ts`, `src/game/rules/replay_runner.ts` | changed | Solutions carry aimed shots |
| 5 | `src/game/input.ts` | changed | Held move keys, pointer position, blur/visibility clearing |
| 6 | `src/game/subject_body.ts` | new | The free-moving body: position, radius, speed, collision, push-out, lanes, heading carry |
| 7 | `src/game/tile_gate.ts` | new | Which neighbour tiles the body may enter, by probing the rules |
| 8 | `src/game/pointer_aim.ts` | new | Pointer → chamber coordinates, aim angle, snapped way with hysteresis |
| 9 | `src/game/portal_passage.ts` | new | The rotation between two portal faces for points and headings |
| 10 | `src/game/subject_aim.ts` | new, replaces `subject_turn.ts` | The drawn angle: follows the pointer; eases locked turns at 100 ms per quarter turn |
| 11 | `src/game/aim_line.ts` | new | Draws the aim line and its mark |
| 12 | `src/game/interact_target.ts` | new | Draws the interact highlight |
| 13 | `src/game/level.ts` | changed | The new per-frame flow |
| 14 | `src/game/subject_pose.ts`, `renderer.ts`, `tile_painter.ts` | changed | Continuous pose, any angle, split drawing, new layers |
| 15 | `src/game/step_animation.ts` | changed | Slides and walk-out start from the body; glide removed |
| 16 | effects: `miss_ripple.ts`, `fizzler_splashes.ts`, `light_barrier_reactions.ts`, `fizzler_flashes.ts`, `returned_boxes.ts`, `ray_drawing.ts` | changed | Take the trace / body position instead of tile + facing |
| 17 | `src/game/palette.ts` | changed | Aim line, aim mark, interact highlight colours (`rgba()`) |
| 18 | `src/game/key_bindings.ts`, `src/services/key_bindings.ts`, `src/services/analytics.ts` | changed | New Default layout, layout id `default` |
| 19 | `chamber_legend.vue`, `key_cap.vue`, `mouse_glyph.vue`, `custom_controls_dialog.vue`, `control_row.vue`, `home_screen.vue`, `chamber_screen.vue` | changed | Controls UI, crosshair |
| 20 | `eslint.config.js` | changed | Ban lists for rules and solver |
| 21 | `scripts/solution_file.ts`, `scripts/check_replays.ts`, `scripts/random_walk.ts`, `scripts/fixtures/fixtures.ts` + new fixture JSON | changed/new | Checks for the aimed shot |
| 22 | docs (section 8) | changed | Every line made untrue |

One class per file, `snake_case` files, named exports, `@/` imports, no semicolons, no object shorthand, JSDoc on every class and function, end-of-line comment on each field (see `AGENTS.md` "TypeScript").

---

## 6. Edge cases to cover (check each in the browser)

| # | Case | Expected |
|---|---|---|
| 1 | One-tile corridor, entering slightly off line | Slides in (circle rounds the corner); no snag |
| 2 | Diagonal movement into a corner between two walls | Stops cleanly, no jitter |
| 3 | Two solid tiles touching at a corner | Body can't squeeze diagonally between them |
| 4 | Centre crosses x and y edges in one frame | Two moves, horizontal first, each judged by the rules |
| 5 | Door closes on a tile the body's edge overlaps (stepping off its button) | Body pushed out; centre's own tile never blocks |
| 6 | Box put down on the snapped tile while the body overlaps it | Body nudged back |
| 7 | Walking into a box, a closed door, a laser that is on, an open ditch | Solid, silent |
| 8 | Entering an arrow from the side or against it | Solid |
| 9 | On an arrow: other keys, aim | Ignored; aim locked to its way; shots fly its way |
| 10 | Turnable arrow turns under the subject | Lane and aim turn with it |
| 11 | Slide floor, slide through portals, slide stopping before a box | Carried, centred, stops centred; no shots meanwhile |
| 12 | Slide that would loop through two portals | Acts as a wall (the probe refuses it) |
| 13 | Portal crossing: same wall, opposite walls, perpendicular walls, two portals facing the same tile | Split drawing correct, mapping correct, heading carried |
| 14 | Stopping half way through a portal and trying to shoot or interact | Refused, error sound |
| 15 | Crossing refused (box or laser in front of the exit portal) | Portal acts as a wall, error sound once per contact |
| 16 | Crossing that releases a button and turns a fizzler on | Portals close; body pushed onto its centre's side |
| 17 | Shot exactly at 45° from a tile centre (passes corners) | Corner rule applies consistently with the aim line |
| 18 | Shot along an axis from the tile centre | Identical to today's shot |
| 19 | Shot from inside a fizzler that is on; shot while carrying | Silent no-op; refused |
| 20 | Pointer on top of the subject | Aim keeps its last angle |
| 21 | Window loses focus while a key is held | Held keys cleared, body stops |
| 22 | Pause and resume while moving | Body stops; resumes only on new key presses |
| 23 | Reaching the exit | Walk-out from the body's position, then the dialog |
| 24 | Reduced motion | Slides jump; no walk-out; walking and aiming still work |
| 25 | Restart chamber mid-move or mid-crossing | Body at the start tile's centre, no leftover carry or split |
| 26 | Hint tile reached; timer hints | Tile hint fires as the centre enters; timer hints as today |
| 27 | Download solution (dev) after walking, crossing, angled shots | The replay check accepts it (hashes, moves, portals match) |
| 28 | Right click while playing | Shoots orange; no browser menu |
| 29 | Click on the legend's heading | Shoots (as today with a bound button) and doesn't select text |

---

## 7. Step-by-step plan

After **every** step: `npm run lint:fix` then fix what's left, `npm run build` (type-checks first). Steps that touch the engine also run `npm run verify`. Steps that can be seen or played are also tested in the browser (section 11). Keep the game playable at the end of each step where possible.

### Step 1: Rules, shots at any angle (the game doesn't change yet)

1. New `src/game/rules/aimed_shot.ts`: `AimedShot`, `RulesAction`, a guard telling them apart, validation of a parsed value, `describeAction` for printing.
2. New `src/game/rules/shot_trace.ts`: the traversal and result described in section 4 ("The aimed shot"), taking the chamber and a "stops the shot" predicate so it stays independent of `step.ts`'s private helpers.
3. `src/game/rules/step.ts`: `step` (and `runAction`) accept `RulesAction`; add the aimed shot runner (arrow → today's shot; fizzler → no-op; carrying → `REFUSED`; clamp origin; trace; open portal on the entered face with today's checks, else `REFUSED`). Don't touch any existing action's code path.
4. `src/game/replay_data.ts`: `ReplayData.actions: readonly RulesAction[]`; parsing accepts the object form.
5. `src/game/rules/replay_runner.ts`: types only.
6. `scripts/solution_file.ts`: accept aimed shot objects (validate them) as well as strings.
7. `scripts/check_replays.ts`: print actions with `describeAction`; the "completed chamber stays completed" check also tries a few aimed shots (several angles from the subject's centre); add the **equivalence check**: at every state the recorded solutions and behaviour fixtures pass through, an aimed shot from the tile's centre along the facing's axis angle gives the same `StepResult` state hash and events as today's four-way shot of the same colour.
8. `scripts/fixtures/fixtures.ts` plus new tiny fixture chambers in `scripts/fixtures/`, each pinning one rule (expected `completed`, `moves`, `portals`, `finalHash`): a diagonal hit takes the entered face; a corner squeeze between two walls is a miss; a single-corner graze passes on; an aimed shot fired from an arrow goes the arrow's way; an aimed shot is refused while carrying and does nothing while standing in a fizzler that is on; an aimed shot leaving the chamber's area misses; the "no portal beside another portal on the same wall tile" rule hit at an angle; a closed door / light barrier that is on stops an angled shot. Name the fixtures in `docs/elements.md`'s table entries.
9. `scripts/random_walk.ts`: after the existing seeded pass (unchanged, so its printed numbers stay the same), a second seeded pass that fires aimed shots at random angles from random points inside the subject's tile, checking each settles within the pass cap.
10. `docs/elements.md`: rewrite "Shoot blue or orange" for the aimed shot (origin, angle, trace, entered face, corner rule, arrow lock, refusals), keep the four-way shot as the one recorded solutions and the solver use, add a "changes from the original rules" entry for shots at any angle with its fixtures, update `:7` (shots leave from the subject's tile).
- **Verify:** `npm run verify` passes; every existing recorded solution, fixture and solver hash is unchanged; the new fixtures pass; the equivalence check passes on every state.

### Step 2: Held keys, pointer, free walking (tested with the current arrow-key Default)

1. `src/game/input.ts`: held state for the move game keys (keydown adds, keyup removes, repeats ignored for moves; cleared on window `blur`, on `visibilitychange` to hidden, and by `reset()`); pointer position from `pointermove` on `window` (client coordinates, last known); shots and interact stay queued presses; keep the Alt/Meta and `preventDefault` rules as they are.
2. `src/game/frame_input.ts`, `src/game/game_key.ts`, `src/game/rules/action.ts`: remove `actionOfPress`'s move-to-turn mapping once `Level` no longer uses it, and anything left unused (if `FrameInput` ends up unused by the rules, also drop it from `tsconfig.scripts.json`'s `include`, after checking nothing else in the scripts reaches it). Keep every rules action.
3. New `src/game/subject_body.ts`: centre `(x, y)`, radius 0.3, speed 4 tiles/s; `move(vector, seconds, gate)`: integrate, then resolve against solid tiles in the 3 × 3 around the centre's tile (centre tile excluded): for each solid tile, the nearest point on its square to the centre; if closer than the radius, push the centre out along that line; repeat up to 3 times. Report which tile edges the centre crossed, in order (horizontal first). Lane mode for arrows; carried mode for slides; heading carry after crossings.
4. New `src/game/tile_gate.ts`: built from (chamber, state); for each of the four ways from the subject's tile, probe the plain move with `step` and record enterable / solid / refused-crossing; diagonals by `canEnter` in all four ways and `boxBlocksEntry`; expose "is this tile solid for the body" and "is this a refused portal face"; cache per state object.
5. New `src/game/pointer_aim.ts`: converts the stored pointer to chamber coordinates from the canvas rect (`Level` keeps the canvas element it is given and caches its rect on load and resize); angle from the body's centre (dead zone 0.1 tile keeps the last angle); snapped four-way way with 5° hysteresis.
6. `src/game/level.ts`: the per-frame flow of section 4 (moves and sync turns; no shots or crossings yet, they come in steps 3 and 4: until then shots keep today's four-way path and a portal face is solid); `load` puts the body at the start tile's centre and the angle at the start facing; clock starts on a held move key; `paused` and `reset` stop the body; draw only when something changed.
7. `src/game/subject_pose.ts`, `src/game/renderer.ts`, `src/game/tile_painter.ts`: the pose takes the body's continuous position and the drawn angle; draw the subject with the rotated path at any angle; the carried box and its mirror stroke follow the angle. Keep `render(state)` with defaults working for the home menu's map (`chamber_preview.ts`).
8. New `src/game/subject_aim.ts` (replacing `src/game/subject_turn.ts`; remove the old file in step 7): drawn angle = aim angle; when locked (arrow), ease to the lock at 100 ms per quarter turn (reuse the easing); snap with reduced motion.
9. `src/game/returned_boxes.ts`: a carried box breaking up starts from the body's position plus 0.26 tile along the drawn angle.
10. `src/game/ray_drawing.ts`: a ray stopped by the subject is drawn to where its line meets the body's circle, or to the tile's middle if it doesn't meet it.
- **Verify:** lint, build, `npm run verify`. Browser (Playground 1 and Chamber 1): walk in every direction and diagonally; one-tile corridors and corners; a button presses as the centre enters and releases as it leaves; boxes, doors, lasers, ditches block; a door closing on the body's edge pushes it out; the subject faces the pointer; moves counter; Download solution produces a file the dev completion accepts (it refuses when the run doesn't replay the same way). Edge cases 1-8, 20-22, 25-26.

### Step 3: Aim line, angled shots, interact highlight

1. New `src/game/aim_line.ts`: a thin faint line from the gun (body centre plus the sprite's gun offset along the angle) to the trace's hit point, with a small mark across that face; hidden while carrying a box, while carried by a slide, while paused and once completed; drawn along the arrow's way on an arrow.
2. New `src/game/interact_target.ts`: a faint outline of the snapped neighbour tile, shown while a box is in reach there (the rules' `canInteract`) or while carrying a box.
3. `src/game/palette.ts`: new colours (`rgba()`): aim line, aim mark, interact outline. Note in `docs/sprites.md` and in `AGENTS.md`'s palette sentence that they have no CSS token.
4. `src/game/level.ts`: a click (or a key bound to a portal) plays the aimed shot from the body's centre at the aim angle; keep the trace of the shot just taken for the effects.
5. `src/game/miss_ripple.ts`, `src/game/fizzler_splashes.ts`, `src/game/light_barrier_reactions.ts`, `src/game/fizzler_flashes.ts`: take the trace (hit point, entered side, travel direction) instead of recomputing from the subject's tile and facing.
6. `src/game/renderer.ts`: the interact outline on the floor marks layer (under the boxes), the aim line after the fields and before the effects.
- **Verify:** lint, build, `npm run verify`. Browser: diagonal shots onto every side of a wall; a miss ripples at the hit point; the corner squeeze; the aim line follows the pointer and ends where the portal opens; pick up and put down with the snapped aim and the outline; a shot from an arrow goes its way; Download solution with angled shots is accepted. Edge cases 17-19, 28-29.

### Step 4: Walking through portals

1. New `src/game/portal_passage.ts`: from two portal faces (wall tile + side), the rotation R and functions to map a point and a heading through it, both ways.
2. `src/game/tile_gate.ts`: a wall tile holding a portal on the face toward the subject's tile is enterable through that face exactly when the probe reports `CROSSED`; `REFUSED` marks a refused portal face.
3. `src/game/subject_body.ts`, `src/game/level.ts`: when the centre crosses a portal face, play the move (the rules cross) and move the body through the mapping; set up the heading carry; play the error sound once when the body first touches a refused portal face (reset when it leaves contact); refuse shots and interact (error sound, no rules call) while the body overlaps a portal's wall tile; after any step, if a face the body overlaps became solid, push out.
4. `src/game/subject_pose.ts`, `src/game/renderer.ts`, `src/game/tile_painter.ts`: the split pose (the real body plus a mapped copy per portal within the radius), each drawn clipped to everything except that portal's wall tile (shadow included).
5. `src/game/light_barrier_reactions.ts`: the walk-in direction for a crossing comes from the exit portal's way.
- **Verify:** lint, build, `npm run verify`. Browser: edge cases 13-16 on Playground 1 (and a portal pair on perpendicular walls), entering off-centre, stopping half way, a held key after a rotated exit, Download solution after crossings is accepted.

### Step 5: Arrows, slides, the walk-out

1. `src/game/subject_body.ts`, `src/game/level.ts`: arrow lane (only the arrow's way key moves; sideways offset eased to the lane centre; aim locked); a turnable arrow turning under the subject turns the lane.
2. `src/game/step_animation.ts`, `src/game/subject_pose.ts`: a slide starts from the body (0.5 unit into its first tile, sideways offset eased out over the first leg) and ends with the body centred on the stop tile; shots and interact ignored while carried; the walk-out starts from the body's position along the move's way at 180 ms per tile, one tile past the exit; reduced motion: slides jump, no walk-out. Remove the one-tile glide (no longer used).
- **Verify:** lint, build, `npm run verify`. Browser: Playground 1's slide room (button on slide floor, fizzler across it) and its arrows (incl. the turnable one); a slide through portals; a refused slide loop acts as a wall; the exit walk-out then the dialog; reduced motion (emulate `prefers-reduced-motion` in DevTools or with the Chrome tool). Edge cases 9-12, 23-24.

### Step 6: Controls and chamber screen (use the `frontend-design` skill)

1. `src/game/key_bindings.ts`: Default = `KeyW`, `KeyA`, `KeyS`, `KeyD` for up, left, down, right, `MouseLeft` blue, `MouseRight` orange, `Space` interact (rename the constant to match, e.g. `DEFAULT_BINDINGS`).
2. `src/services/key_bindings.ts`: layout id `default` (old `arrow-keys` and `wasd-mouse` fall back to Default); Custom still copies Default the first time it's picked; fallbacks unchanged otherwise. `src/services/analytics.ts`: `LAYOUT_NAMES` maps `default` → `'default'` (the sent value doesn't change).
3. `src/components/chamber_legend.vue`: the move row shows W/A/S/D in the inverted-T cluster with "Move" / "Hold to walk" (sentence case); a new "Aim" row with the mouse glyph ("Point with the mouse"); portal rows "Shoot a blue portal where you aim" and the orange one; update the header comment. `key_cap.vue`, `mouse_glyph.vue`: a plain mouse glyph (no button filled) for the Aim row if needed.
4. `src/components/custom_controls_dialog.vue`, `control_row.vue`: intro copy saying aiming is always the mouse; rows unchanged.
5. `src/components/screens/home_screen.vue`: the Controls row and its comment describe the new Default.
6. `src/components/screens/chamber_screen.vue`: `cursor: crosshair` over the chamber stage while playing (normal cursor while a dialog shows); update the comments that say "first key".
7. Comments only: `src/services/device.ts:7`, `src/components/desktop_only_notice.vue:3` (keyboard and mouse), `src/services/hint_catalogue.ts:66` ("the first move towards the exit").
- **Verify:** lint, build. Browser: Settings > Controls shows Default; the legend; the custom dialog rebinds moves to the arrows and a portal to a key, and both work in play; the crosshair; right click shoots without the browser menu; a click on the legend heading shoots and selects nothing.

### Step 7: Remove what became obsolete

1. Delete `src/game/subject_turn.ts`; remove the press-to-turn handling, the glide and any now-unused exports in `level.ts`, `step_animation.ts`, `subject_pose.ts`, `rules/action.ts`.
2. `eslint.config.js`: add the new browser modules (`subject_body`, `tile_gate`, `pointer_aim`, `portal_passage`, `subject_aim`, `aim_line`, `interact_target`) to the banned imports of both the rules block and the solver block, and remove `subject_turn`.
3. `src/dev/gallery_layouts.ts`, `src/dev/sprite_gallery.ts`: keep them compiling and showing the same sprites.
4. `tools/detail_mixer/`: it uses `StepAnimation` and isn't type-checked; read its `README.md`, open it, and fix what broke (or tell the author what no longer works there).
- **Verify:** lint, build, `npm run verify`; the sprite gallery and the detail mixer pages load without console errors.

### Step 8: Performance

1. Run the render profile as `docs/performance.md` describes, while walking, aiming (pointer moving), crossing portals and sliding, on Playground 1 and Chamber 29 (the largest campaign chambers).
- **Verify:** 60 fps holds; report the numbers. If not, profile and fix (e.g. cache the aim trace per state and angle).

### Step 9: Docs (every line made untrue; see section 8 for the list)

- **Verify:** search for stale phrases, e.g. `press again`, `Face that way`, `turn action`, `row or column the subject faces`, `pointer's movement`, `glides from tile`, `one action per frame`, `arrow keys` (each hit either fixed or still true).

### Step 10: Final pass

1. `npm run verify`.
2. Run the `delta-review` skill on every file changed (the author's global rule), then re-run the targeted checks if it applies fixes.
3. A muted browser pass over Playground 1, Playground 11 and Chambers 1, 3 and 29, going through section 6's table.
4. Report to the author in their reply format (global instructions): what changed, what was tested in the browser and what wasn't, the open points of section 9.

---

## 8. Docs to update (step 9)

Fix every line the change makes untrue (`AGENTS.md`, "Doc maintenance"). From the exploration at `0bb5c76`:

- **`AGENTS.md`**: `:3` ("keyboard-driven", "grid-based"); the verify description (the replay check's equivalence check, the random walk's second pass); `:47` Game/Vue boundary (Input queues presses; one press = one action per frame; a move key press is a turn; `onStep` per press; four moves/four turns; "every press taken ends the running step drawing"; `moves`; the rules ban list incl. `subject_turn`); `:49` Keyboard ownership ("the mouse plays no part … pointer's movement is ignored"; held repeats); `:50` Desktop only (mouse required); `:56` Recorded solutions (actions incl. the aimed shot object); the palette sentence (new colours with no CSS token).
- **`docs/elements.md`**: `:7`; "A step" `:73`; `:90`; "Move or turn" `:94-104` (the game now plays plain moves and sync turns from a free-moving body; keep the rules text for the actions themselves); "Crossing a portal" `:106-108`; "A slide" `:110-119` (refused loop wording); "Shoot blue or orange" `:121-130` (done in step 1); "Interact" `:135-136` (facing = snapped aim); rays `:176`; arrows `:211`; `:221`; changes #6 `:253`, #11 `:258`, #19 `:266`.
- **`docs/interface.md`**: Home menu `:46` (Controls row); Chamber screen `:56` (clock starts), `:60-62` (hints), `:66` (legend); Dialogs `:76-77`, `:87-92` (custom dialog); Keys `:98-104` (Default, mouse, held keys, preventDefault list, glyphs); Saved data `:151-155` (layout ids, fallbacks); Analytics `:175`, `:180`; Look `:221`, `:226`.
- **`docs/sprites.md`**: Turning `:54-68`; Splash `:193`; Light barrier reaction `:206`; Miss `:224`; Steps `:303-319`; The subject `:321-338`; the palette list (new colours); add sections for the aim line, the interact highlight and the split portal drawing.
- **`docs/game_summary.md`**: Turn by turn `:11-15`; The subject `:19-21`; Portals `:26`, `:29`; tiles row 17 `:52`; how each tile looks `:81-82`; Slide floors `:106`, `:109`, `:111`; Rays `:115`, `:121`; Other details `:125`; Chambers and progress `:134`; Screens `:149-150`.
- **`docs/hints.md`**: decisions 8 `:22`, 9 `:23`, 15 `:29`, 28 `:42`; hints table `:93-96`; how to add a hint step 1 `:102`; `:143`; notes for building `:157-158`.
- **`docs/level_design.md`**: guidelines 4, 24 and 38 ("turn-based game"), 26 (held-key repeat, turn first), 29 (moves the controls hide), 31 (sightlines), 40 (door shots only along its line), 54 ("shoot it from this column"), 66 (move key turns; run-up in line), 67 (facing to pick up; arrow facing), 86 ("turns the way pressed"), 87 ("only from that wall's own row or column"), 98, 118, 120, 123 (lines fix the tiles to shoot from); five facts #3 `:306`; Patterns > Portals #3, #9, #10, #11 `:363`, `:369-371`; States to avoid `:138`, `:151`. Add new guidelines, marked `Must`/`Should`: a wall face is reachable from anywhere with a clear line, so restrict unwanted faces with walls that refuse portals; avoid shots that need a shallow, pixel-precise angle; one-tile corridors fit the body; arrows still fix the shot's direction.
- **`docs/performance.md`**: `:15`, `:21`, `:40` (frames drawn while moving and aiming).
- **`docs/solver.md`**: `:22`, `:26`, `:27`, `:33-35`, `:46-47`, `:70`, `:151`: the solver models only four-way shots and tile moves; its verdicts and pars ignore angled shots.
- **`docs/solving_by_hand.md`**: `:160`, `:204-206`, "3. Map the sightlines" `:237-248`, Leapfrog `:293`, "Facing without turning" `:307`, the worked example `:434-450`.
- **`docs/campaign.md`**: `:9`, `:33` (decision 3, rules frozen while the campaign is built: note the movement change), `:51`, `:71`, `:95`, `:111`, `:143-144`, `:158`, `:162`, `:200`. State plainly that the chambers were designed for grid movement and await the author's play-test and redesign.
- **`README.md`**: `:9-11`.
- **`todo/creator_platform.md`**: decision 2 `:17`, A2.5 `:40`, A3.6 `:49`, A3.9 `:52`, A3.10 `:53`, A4.2 `:58`, `:72`, `:78`.
- Leave alone: `src/services/changelog.ts` past entries (they describe past releases), `docs/spoilers/` (chamber notes; redone with the redesign).

---

## 9. Risks and things the author will judge after play-testing

| # | Risk / open point |
|---|---|
| 1 | **Puzzle balance**: angled shots reach wall faces that today need a matching row or column, so many chambers likely get easier or gain unintended routes. Not fixed here (decision 1). |
| 2 | **Feel**: speed, body size, corner behaviour, the snap hysteresis and the heading carry are first guesses; expect tuning (a detail mixer page under `tools/detail_mixer/` is an option if the author wants to compare values). |
| 3 | **Split drawing** through portals at arbitrary offsets and rotations is the hardest drawing work; check every portal orientation pair. |
| 4 | **Solver** still works on the old actions only: its "unsolvable" verdicts and fewest-move counts no longer describe what a player can do. |
| 5 | **Keyboard-only players** can no longer play (decision 7). |
| 6 | **Deploys**: `npm run deploy` ships `main`; deploying part way through ships unfinished movement. Tell the author when the game is in a playable state. |
| 7 | **Logs grow**: every aim change across a 45° boundary logs a turn; solution files from live play get longer. Fine for now. |

---

## 10. Facts found along the way (already true at `0bb5c76`)

- `src/game/subject_pose.ts:29-30`'s comment says each half of a crossing is one tile's travel at the pace of a glide; outside a slide a crossing actually covers two tiles in the same 120 ms. Moot once crossings are walked (step 4), but don't carry the comment over.
- `docs/sprites.md` "The subject" lists "a move another way, a walk into a wall" as facing changes; key presses only produce turns, so neither happens in live play. Rewritten in step 9 anyway.
- `docs/elements.md` (slide loop) says a refused loop turns the subject "to the way pressed"; from a key press it already faces that way. Rewritten in step 9.
- `docs/sprites.md` "Steps" says only "its last tile eased out" for slides; the code eases the last unit over 120 ms (twice a unit). The doc's 0.42 s figure is right.
- `level.ts:608` passes `'blue'`/`'orange'` actions straight through as a `PortalColor`; keep that working (or make it explicit) when `RulesAction` arrives.

---

## 11. Working rules this work trips over (from `AGENTS.md` and the author's global instructions)

- **Workflow**: explore → plan → implement → verify; the plan needs the author's explicit approval before implementing; deviating from the approved plan needs saying first. Use `AskUserQuestion` for decisions that are the author's. Subagents are pre-authorised and preferred for exploration.
- **After code changes**: `npm run lint:fix`, fix the rest, `npm run build`, then the `delta-review` skill once per turn on the files changed. Never weaken a check or a test; never revert changes you didn't make; no commits, branches or pushes without the author's permission.
- **No test suite by design**: the safety net is TypeScript, the type-aware lint rules and the engine checks (`npm run verify`). Don't add `any`, don't loosen `strict` or `noUncheckedIndexedAccess`.
- **Rules are pinned**: changing a rule needs the author's explicit ask, re-recorded solutions and fixtures, and `docs/elements.md` updated in the same change. This plan adds one action (the aimed shot) and changes no existing rule.
- **UI changes**: always use the `frontend-design` skill. Tokens from `src/assets/styles.css`, `rgba()` colours, sentence-case copy, the signage look (`docs/interface.md` "Look").
- **Spoilers**: never tell the author a chamber's key move, layout or route before they've played it (`docs/spoilers/`).
- **Browser testing** (Chrome tool, when connected): run `npm run dev` in the background (e.g. `npm run dev -- --port 5199 --strictPort`), open a **new** tab, and after every page load, **before pressing Start**, mute it with:

  ```js
  const play = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { this.muted = true; return play.call(this) }
  ```

  The loading screen's Start button, then Playground (development builds) or Play. Keys can be sent with the tool's key action; held keys can be simulated by dispatching `keydown` on `window` (with `code`, e.g. `KeyD`) and a later `keyup`; pointer movement by dispatching `pointermove` on `window` with `clientX`/`clientY`; a click with `mousedown` (`button: 0` or `2`). Close the tab and stop the dev server when done, and say what was tested in the browser and what wasn't.
- **Seeing motion frame by frame**: this snippet (used during exploration) presses a key and captures a crop of the canvas every frame into a strip overlaid on the page, which a zoomed screenshot then shows; adapt it to held keys and pointer moves:

  ```js
  window.__film = async function (code, cropX, cropY, cropW, cropH, frames, label) {
    const canvas = document.querySelector('canvas')
    const shots = []
    const start = performance.now()
    window.dispatchEvent(new KeyboardEvent('keydown', { code: code, key: code, bubbles: true }))
    window.dispatchEvent(new KeyboardEvent('keyup', { code: code, key: code, bubbles: true }))
    await new Promise((resolve) => {
      const grab = () => {
        const frame = document.createElement('canvas')
        frame.width = cropW
        frame.height = cropH
        frame.getContext('2d').drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)
        shots.push({ t: Math.round(performance.now() - start), frame: frame })
        if (shots.length < frames) requestAnimationFrame(grab); else resolve()
      }
      requestAnimationFrame(grab)
    })
    const columns = 10, scale = 0.75
    const cellW = cropW * scale, cellH = cropH * scale + 16
    const strip = document.createElement('canvas')
    strip.width = columns * cellW
    strip.height = Math.ceil(shots.length / columns) * cellH + 20
    const ctx = strip.getContext('2d')
    ctx.fillStyle = 'rgba(0,0,0,1)'; ctx.fillRect(0, 0, strip.width, strip.height)
    ctx.fillStyle = 'rgba(255,255,255,1)'; ctx.font = '13px monospace'
    ctx.fillText(label, 4, 14)
    shots.forEach((shot, i) => {
      const x = (i % columns) * cellW, y = Math.floor(i / columns) * cellH + 20
      ctx.drawImage(shot.frame, x, y + 14, cellW - 2, cellH - 16)
      ctx.fillText(shot.t + 'ms', x + 3, y + 11)
    })
    let overlay = document.getElementById('__film')
    if (!overlay) { overlay = document.createElement('img'); overlay.id = '__film'; overlay.style.cssText = 'position:fixed;left:0;top:0;z-index:99999;pointer-events:none;max-width:100vw'; document.body.appendChild(overlay) }
    overlay.src = strip.toDataURL()
    return shots.map(s => s.t).join(',')
  }
  ```

  Remove the overlay afterwards (`document.getElementById('__film')?.remove()`). The canvas is in device pixels; read its size with `document.querySelector('canvas').getBoundingClientRect()`.
