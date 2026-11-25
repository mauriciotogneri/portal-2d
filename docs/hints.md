# Hints

Short notes shown during the first chambers, so a new player understands what an element does: for example, that steel never takes a portal. The design was chosen on 2026-11-21 and settled on 2026-11-24, and it is built in three stages: the spotlight and its card (stage 1), then what sets a hint off, the seen hints stored, analytics, the hint list and its check, and Chamber 3's box hint (stage 2), both built, and the other run 1 hints (stage 3), still to come, planned in `stage-3-run-1-hints.md` at the repository's root. This file records the decisions, the chosen design, how to add a hint, how it was chosen, what is still open, and what was learned about the code on the way.

Hints reach players. The hint list (`src/services/hint_catalogue.ts`) says which hints each campaign chamber has, and the chamber screen sets them off by their triggers (decisions 8 to 13), shows each through `src/components/hint_spotlight.vue` as its `'hint'` dialog, pausing the game until Continue, sends `hint_shown` as it appears and stores it as seen in the chamber's progress record once it is closed. One hint is live: Chamber 3's box hint (decision 25). In development, `showHint(kind, x, y, text)` in the browser console still shows a hint over any tile of the open chamber (y counted from the bottom row), which is stored nowhere and sends nothing; production builds leave that function out.

These are tutorial hints. They are not the solver's hints (a nudge, a highlight, the next move, on a key of their own), one of the player features dropped when the solver's prototype stopped (`docs/solver.md`); the solver itself is still in the code.

## The decision

Rows 1 to 5 were decided on 2026-11-21 and 2026-11-22, rows 6 to 24 on 2026-11-24 with the stage plans, and rows 25 and 26 on 2026-11-25.

| # | Question | Decided |
|---|----------|---------|
| 1 | Does a hint stop the game? | Yes. The game pauses, the clock too, until the player closes the hint, then carries on from where it stopped: a stopping hint is sure to be read before the next step, and the clock doesn't count reading time |
| 2 | How is it shown? | As a spotlight: the whole screen, rail included, darkens except the element's own tile, and a card beside it holds the element's pictogram and name, the text and a Continue button ([The chosen design](#the-chosen-design)) |
| 3 | What does the spotlight light? | Only the tile of the element the hint is about, not the tiles round it (round 1 lit a 3 × 3 block; the author asked for one tile). Lighting several tiles at once (a run of fizzlers or lasers) isn't needed in run 1 |
| 4 | Where was it chosen? | On an Artifact page that draws the real chamber screen with the game's own renderer: https://claude.ai/artifact/C5MwvnphSuw5qpWG9ZBttP (see [The artifact](#the-artifact)) |
| 5 | How much text? | As little as will do: the shorter and clearer, the better (the author's rule, 2026-11-22) |
| 6 | What may a hint say? | Only what an element is or does, never how to solve; the lit tile is always that element's tile (`docs/level_design.md` guideline 31 and `docs/campaign.md` convention 7, which the author kept) |
| 7 | Which chambers have hints? | Only run 1, Chambers 1 to 4: `docs/campaign.md` names steel and ditch hints for Chamber 1 and button and box hints for Chamber 3, none for Chambers 2 and 4. None in playground chambers, which keep no progress |
| 8 | What sets a hint off? | One of two triggers, the author's two cases, a player arriving somewhere and a player stuck for a while. A tile hint shows when the subject stands on its trigger tile after a step; a timer hint shows once the chamber clock reaches its seconds. Slides and portal crossings may carry the subject past a trigger tile without stopping on it, so trigger tiles are chosen with that in mind (the author accepted it rather than tracking every tile a step passes) |
| 9 | Which time does a timer hint count? | The chamber clock: it starts at the first move, portal shot or interact, stops while the game is paused or a hint shows, and starts again from 0 on a restart |
| 10 | Can something cancel a hint? | Yes: any hint may name one game event the rules already report (such as `boxPickedUp`, `crossed` or `buttonPressed`), and once that event has happened in the current attempt the hint doesn't show, and is dropped if it was waiting to. A timer hint must name one, since a hint about something the player has already done is noise |
| 11 | Which tiles does a hint name? | The tile it lights, always its element's, and for a tile hint its trigger tile, which may differ: the trigger is where the player arrives, the light is on the element |
| 12 | Shown once, or every time? | Once per player, ever, so a returning player is never interrupted again. A hint counts as seen when the player closes it, and is stored in the chamber's progress record; leaving the chamber while it shows leaves it unseen. A restart (Restart chamber, Play again) resets the clock and the events seen in the attempt, but never brings back a seen hint. Reset progress forgets every seen hint |
| 13 | Several at once? | One at a time, as the card covers one tile at a time: hints set off by the same step show in list order, one after the other |
| 14 | Can the player read a hint again? | No. Nothing to build: closing by Enter alone makes losing one unread unlikely, and Reset progress brings them all back |
| 15 | Which keys close it? | Only Enter, or a click on Continue, and every key and click is ignored for the hint's first half second: a hint shows only once ever, so closing it by accident loses it for good. Space never presses Continue, since it is the default interact key, and a held (repeating) Enter presses nothing |
| 16 | What do Escape and browser Back do? | Escape does nothing while a hint shows, as on the chamber-complete dialog, so the hint can't be lost to it: the player presses Enter, then Escape, to reach the pause menu. Browser Back opens the exit confirmation in the hint's place, as from the other dialogs |
| 17 | Where does the card go? | Beside the lit tile, on the side with the most room on the stage (the dark area holding the chamber), whole on the stage, never over the lit tile, the leader straight: on the left or the right when either has room, otherwise above or below. The page always put it on the left, but a chamber whose element sits near the left edge needs another side |
| 18 | Sound and reduced motion? | Pressing Continue plays the menu accept sound, as the dialogs do. With `prefers-reduced-motion` the hint appears and goes at once, with no pressed delay |
| 19 | Screen readers? | The card is a `role="dialog"` with `aria-modal`, labelled by its title, as the other dialogs are |
| 20 | Analytics? | One `hint_shown` event when a hint appears, with the chamber events' shared parameters (`chamber_id`, `chamber_number`, `attempt`) and `hint_id`, which shows where players stall; none when it closes. Event and parameter names, and hint ids, are permanent once production sends them |
| 21 | Where are hints listed? | In a hint list of their own, keyed by each chamber's permanent id, outside the chamber files, so the chamber files and their recorded solutions stay untouched. Each hint has a permanent id, unique within its chamber and never reused, as it is stored and sent. `npm run chamber:check` checks the list and fails when a lit tile no longer holds its element or a trigger tile is outside its chamber, so a chamber edit that moves an element is caught |
| 22 | When does no hint show? | In playground chambers, and once the step that completes the chamber has been taken, as a hint over the walk-out would be pointless |
| 23 | Who decides each hint's content? | The author, per hint: its trigger, trigger tile or seconds, cancelling event, lit tile and text ([Open questions](#open-questions)) |
| 24 | How is it built? | In three stages, each checked on its own: the display first, then the triggers with one real hint, Chamber 3's box hint, then the other run 1 hints as data. Every hint after the display is a data entry, not new code |
| 25 | Chamber 3's box hint? | A timer hint, id `box`: it shows once the chamber clock reaches 10 seconds, unless the box has been picked up (`boxPickedUp`) in the attempt, lights the box's start tile and says "Press interact to pick up a box, and again to put it down." (the author's choice of trigger, seconds and text) |
| 26 | Does a hint name a key? | No: it says "interact", the game key's name, as the controls legend shows which key it is and players can rebind it (the author's choice, with the box hint's text) |

The request that started it: hints during the first chambers, of two kinds to compare, intrusive (the game stops, the player reads, dismisses it, and the game continues) and non-intrusive (shown without interrupting the game), each tried in different places on the screen. Round 1 showed seven styles (A to G, [below](#what-was-considered)); round 2 kept only B, the spotlight, with its light cut down to the element's own tile. That round 2 design, called B2 on the page, is the one chosen.

## The chosen design

Everything below is as the round 2 page draws it, at 1:1 screen pixels on the chamber screen (`src/components/screens/chamber_screen.vue`: the 23rem rail on the left, the dark stage on the right holding the canvas), but for the card's place, which decision 17 settled, and the shadows' colour. Sizes are given in the game's own units (rem = 16 px) and colours by the game's tokens (`src/assets/styles.css`).

### What the player sees

| # | Part | Look |
|---|------|------|
| 1 | Darkening | The whole screen, rail included, under `--color-ink` at 66 % opacity, except the lit tile. The page made it as a box exactly over the tile with a box shadow spread 4000 px wide in that colour, clipped by the screen |
| 2 | Lit tile | The element's own tile, exactly: the chamber as drawn, untouched and not brightened |
| 3 | Brackets | Four white corner marks round the lit tile, each 30 % of their box's side long, 0.1875rem (3 px) thick, set just outside the tile (their box is the tile grown by 3 px each side) so the tile shows whole, with a soft dark shadow (`drop-shadow(0 0 0.15rem)`, ink at 70 %) so they read on light floor |
| 4 | Card | A white plate (`--color-white`), 22rem wide, padded 1.25rem 1.375rem 1.375rem, framed in 0.125rem `--color-ink-muted` (the chamber sign's frame) with a 0.375rem `--color-blue` top band (the dialogs' band for interaction), a large soft shadow (`0 1rem 2.5rem`, ink at 40 %), its parts 0.875rem apart |
| 5 | Card head | The element's pictogram from the chamber sign (`src/components/element_pictogram.vue`), 2.5rem square, framed in 0.125rem `--color-ink` with 0.1875rem padding, then the element's name as the sign gives it, as the title, in Oxanium 700 at 1.625rem (line height 1.05), 0.875rem apart |
| 6 | Card text | Chakra Petch at 1rem, `--color-ink-muted` |
| 7 | Continue | The game's `.button .button-interaction` (blue), the card's full width, label on the left, "Enter" on the right in white at 80 %, 0.875rem, weight 500 (as the pause dialog's Continue shows "Esc"), drawn focused (the ink ring `.button:focus-visible` draws). It turns `--color-blue-deep` while pressed |
| 8 | Card place | 48 px from the lit tile, on the side with the most room (decision 17). On the left or the right, its middle level with the tile's middle, moved up or down only as far as keeps it whole on the stage; above or below, centred on the tile, moved sideways likewise. The page always put it on the left |
| 9 | Leader | A 2 px white line from the card's edge facing the tile, through the tile's middle, to 6 px short of the brackets, ending in a white dot of 3.5 px radius |

### How it moves

| # | When | What |
|---|------|------|
| 1 | The hint is set off | The game pauses at once (nothing moves; the clock stops). The darkening fades in over 0.2 s. The card, the brackets and the leader fade in over 0.18 s, the card sliding in from 10 px further from the tile, eased out (`--ease-out`) |
| 2 | While it shows | Nothing moves. The player reads for as long as they like |
| 3 | Enter goes down, or Continue is clicked | Continue shows pressed (deep blue) for about 0.2 s |
| 4 | Then | Everything fades out over 0.16 s and the game carries on from where it stopped |

With `prefers-reduced-motion` it appears and goes at once, with no pressed delay, like every other motion in the game (decision 18).

### Screen sizes

The chamber screen sizes tiles from the stage, so the lit tile is as large as the chamber's tiles. On Playground 2 (20 × 20 tiles), where the page was made:

| # | Window | Tile | Lit area with brackets |
|---|--------|------|------------------------|
| 1 | 1920 × 1080 | 50 px | 56 px |
| 2 | 1440 × 900 | 41 px | 47 px |
| 3 | 1280 × 720 | 32 px | 38 px |

At 1280 × 720 the lit tile is small but still clear with its brackets. The card is the same size at every window, so it covers a larger share of a smaller stage.

## How to add a hint

A hint is a data entry: no code changes.

1. Settle its content with the author (decision 23), within decisions 5, 6 and 26: what the element is or does, never how to solve, as short as will do, naming no key.
2. Add it to `CHAMBER_HINTS` in `src/services/hint_catalogue.ts`, under the campaign chamber's permanent id (not its number; a playground chamber can't have one, decision 22). A chamber's hints show in list order when one step sets off several (decision 13).
3. Run `npm run chamber:check`. Its `hint list` line fails when an id in the list belongs to no chamber of the play order, a hint id is used twice in a chamber, a lit tile doesn't hold its element, a trigger tile is outside the chamber, or a timer hint waits 0 seconds or less or names no cancelling event.
4. Try it in `npm run dev`. A hint closed once never shows again in that browser, so use Reset progress (home menu, Settings) first, or a browser with no stored progress. Each showing logs `[analytics] hint_shown` to the console, with `chamber_id`, `chamber_number`, `attempt` and `hint_id`.

| # | Field | What it holds |
|---|-------|---------------|
| 1 | `id` | Permanent, unique within its chamber and never reused, as it is stored once seen and sent as `hint_id` (decision 21); named after the element, such as `box` |
| 2 | `element` | The kind of element it explains, any kind in the element registry but wall and exit; the card shows its pictogram and its name on the chamber sign (steel is `blockedWall`, "Blocked wall") |
| 3 | `tile` | The lit tile, `{x, y}`, y counted from the bottom row: the element's own, and for a box its start tile |
| 4 | `trigger` | A trigger tile, `{x, y}`, for a tile hint, or `{seconds}` of the chamber clock for a timer hint (decisions 8, 9 and 11) |
| 5 | `cancelledBy` | A game event (`src/game/game_event.ts`) that, once it has happened in the attempt, keeps the hint from showing; required for a timer hint (decision 10) |
| 6 | `text` | What the card says, in sentence case |

Chamber 3's box hint, under id 3, is the example to copy (decision 25).

## The page's example: the fizzler

The example every option showed, the author's own: "fizzlers destroy portals and boxes if you cross one that is on". No run 1 chamber holds a fizzler, so hints being run 1's alone (decision 7), this hint won't be built; it stays as the page's example and a sample of the wording. Its title is "Fizzler", with the fizzler's pictogram. The page had two texts, switchable:

| # | Text | Wording |
|---|------|---------|
| 1 | Short (shown first) | Walking into a fizzler that is on closes both your portals and destroys a box you carry. |
| 2 | Long | Walking into a fizzler that is on closes both your portals. A box you carry through it is destroyed and goes back to where it started. A fizzler that is off lets everything through. |

Both follow the fizzler rule in `docs/elements.md` ("The fizzler rule"): entering a fizzler that is on (walking, coming out of a portal, or the field turning on under the subject) closes both portals and sends a carried box back to its start. Decision 5 favours the short one.

## What was considered

Round 1 (artifact version 1) showed seven styles on the same scene, all in step. A to D stop the game until Enter; E to G let it run. At the time my recommendation was G; the author chose B and asked for it with only the element's tile lit.

| # | Option | Game | Where | Leaves | Good at | Costs |
|---|--------|------|-------|--------|---------|-------|
| 1 | A · Dialog | Stops | Centre of the screen, on the pause dialog's shell (`dialog_frame.vue`: dark backdrop, 26rem panel, blue band, pictogram and title, text, Continue) | On Enter | Reads as part of the game | Covers the whole chamber and says nothing about where the element is |
| 2 | B · Spotlight | Stops | On the element: the element and the eight tiles round it lit, brackets, the card to its left with a leader | On Enter | Shows exactly where, while everything waits | Needs a rule that keeps the card on the stage and off the element, in every chamber |
| 3 | C · Picture card | Stops | Centre: a 44rem card with two crops of this chamber as the game draws it, before (both portals open) and after (one step into the field, both gone), then the text and Continue | On Enter | Shows the rule happening in the chamber's own drawing | Biggest and slowest to read; each hint needs a picture chosen for it |
| 4 | D · Rail, paused | Stops | A notice in the rail between the chamber sign and the controls (white plate, blue band, pictogram, title, text, Continue), opening like the legend folds, the stage dimmed | On Enter | The chamber stays in view, only dimmed, and nothing is covered | The eye has to leave the chamber; the rail is short on small screens (at 1280 × 720 it pushes the controls out of view) |
| 5 | E · Tag | Runs | A small white plate below and left of the element, a leader to it, pulsing brackets on its tile | About 1.7 s after the subject walks through (or after 10 s) | Points at the element and stops nothing | Covers a patch of the chamber; easy to walk past unread |
| 6 | F · Toast | Runs | A dark bar at the foot of the stage, pictogram and text, a blue line counting down | After 6 s | Familiar, the same place for every hint | Covers the chamber's bottom rows; can time out before it is read |
| 7 | G · Rail notice | Runs | D's notice without the button, plus pulsing brackets on the element's tile for about 3 s and the element's pictogram on the chamber sign lit blue | Stays until the chamber ends | Never covers the chamber or stops play | The eye has to go to the rail; the clock runs while the player reads |

Why G was recommended then: nothing in a chamber moves until a key is pressed, so a hint that stays up already gives the player all the time they want. Against it, and for B: a stopping hint is sure to be read before the next step, and the spotlight still shows which element it means. Round 1's notes also raised that a hint that lets the game run leaves the clock counting while the player reads; B stops the clock.

## Open questions

Each is the author's to answer, when the stage that needs it gets there.

| # | Question | What is known |
|---|----------|---------------|
| 1 | Each hint's content | Chamber 3's box hint is settled (decision 25). For each of Chamber 1's steel and ditch hints and Chamber 3's button hint: tile or timer hint, its trigger tile or seconds, its cancelling event, its lit tile and its text. Recommended: timer hints, as hints are a backup for players who don't know how to progress, cancelled by the event that shows the element was understood (the box's by `boxPickedUp`, which also keeps the light off a box that has moved from its start tile; the button's by `buttonPressed`); a tile hint only where every player should read it first. A text or a lit tile must never point at the route (decision 6) |
| 2 | Steel's title | The card's title is the element's name on the chamber sign, "Blocked wall", while the campaign calls it steel, so a player may not connect the two. Keep "Blocked wall", which needs nothing built; or show "Steel" through an optional title on a hint. Recommended: "Blocked wall", so the card and the sign agree |
| 3 | The card on a small screen | At 1280 × 720 the 22rem card covers a large share of the stage: Chamber 3's box hint, checked there, covers about the chamber's left half, the lit box clear. If it covers too much, its size goes back to the author (the page can show a smaller one) |

## Notes for building

What was learned about the code while making the page and building the hints. These are findings, not decisions.

- **Where it goes.** The chamber screen (`chamber_screen.vue`) owns the dialogs over the chamber, as one `ChamberDialog` state, `'hint'` among them, pausing the game with `level.paused` and resuming it on close. Escape does nothing in the hint's state (decision 16). Pausing stops the clock (it counts only unpaused frames), and resuming forgets every press still waiting and every key held. A key still held once the hint closes acts again from its next auto-repeat, as after any dialog; pressing Enter usually ends another key's auto-repeat, but closing with a click doesn't.
- **The game decides nothing about Vue.** `src/game/` never imports Vue, components or services, so steps reach the screen the way completion does (`level.onCompleted`): `Level` calls `onStep` after each step it takes for a press, never for a load, with the subject's tile after it, the step's events and whether it completed the chamber. The screen sets off tile hints there and timer hints as it refreshes the clock each frame. The rules (`src/game/rules/`) didn't change for hints and must not: the recorded solutions and fixtures pin them.
- **Seen hints.** Each chamber's progress record holds `hintsSeen`, the ids of the hints closed, read like its other fields, with no change of the record's version, so progress stored before hints kept reading.
- **Two hints in a row.** The spotlight keeps state of its own (pressed, closing, its measured size), so the screen keys it by a count of the hints shown: a hint shown as the one before it closes gets a fresh spotlight. Without that key, the second card stayed invisible and could not be closed.
- **Finding the tile on the page.** The canvas is exactly the chamber (`tileSize × width` by `tileSize × height` device pixels, in `TilePainter.setSize`), centred in the stage, its page size its drawn size divided by the pixel ratio. So a tile's page size is the canvas's `getBoundingClientRect().width` divided by the chamber's width in tiles, and tile (x, y), y counting from the bottom as the game does, lies at `left + x × size`, `top + (height − 1 − y) × size`. The tile size itself is `Math.trunc(min(stage width / max(chamber width, 16), stage height / max(chamber height, 16)))` in device pixels, the stage less its 2rem padding each side; a resize or a pixel ratio change moves it, so the spotlight must follow (`fitToStage`).
- **The darkening over the rail.** The dialogs' backdrop is `position: fixed; inset: 0`, over the rail too. The spotlight darkens the same area, cut out at one tile.
- **A pitfall the page hit.** The sign frames its pictograms with `padding: 7%`, which works in its grid cells. Put in a flex row, a percentage padding is taken from the row's width, not the frame's, and the pictogram shrinks to nothing: give the hint's frame a fixed padding (0.1875rem).
- **Colours.** The page used black for the card's and the brackets' shadows; every shadow in the game is built from `--color-ink-rgb`, so the built hint uses ink. Every colour is an `rgba()` token from `styles.css` (no new colours), and `border-radius` is in rem.

## The artifact

https://claude.ai/artifact/C5MwvnphSuw5qpWG9ZBttP, private to its owner, titled "Chamber Hint Styles".

| # | Version | Label | What it shows |
|---|---------|-------|---------------|
| 1 | 1 | Round 1: seven hint styles | A to G, the large view with a picker and a side-by-side compare, all seven in step, a notes table |
| 2 | 2 | Round 2: spotlight on one tile | B2 large (at the chosen window size), then B2 at 1920 × 1080, 1440 × 900 and 1280 × 720 in step; round 1 kept below, collapsed, drawn only while open |

**The scene.** Playground 2 from its recorded solution of the time (`src/chambers/chamber_1.solution.json` before commit 9021c28, a path that has held other chambers' since; git history keeps it, but an engine built today draws only the chamber's start), steps 96 to 116: the blue portal on the wall at (12, 7) facing right, the orange one at (15, 7), then moved to (14, 12) facing down (step 99); at step 101 the subject walks into the blue portal and comes out at (14, 11); steps 102 to 105 walk right to (18, 11); step 106 walks up into the fizzler at (18, 12), which no link reaches (always on): `fizzled`, both portals close. Each step shows for 0.42 s at 1×, and the loop is 11.5 s: the hint at 2.25 s (step 101), Enter at 7.0 s, the game going on at 7.6 s, the fizzle at 9.55 s. The page sets the clock on the sign to 01:12.40 at step 96 (not a measured time).

**Its controls.** Play and pause, a scrubber with the moments marked, speed (0.25×, 0.5×, 1×), screen (1920 × 1080, 1440 × 900, 1280 × 720), text (short, long), large view (fit, actual size), and a lamp beside each screen showing the key being pressed.

**How it was made.** One HTML page (written in the session's scratch folder, which doesn't survive the session) drawing the chamber screen in HTML and CSS copied from the game's components and the chamber through `ChamberEngine` from `tools/detail_mixer/build/engine.js` (built by `tools/detail_mixer/build.sh`; its API is in `tools/detail_mixer/README.md`), published beside the page as `engine.js`. Each step is drawn once with `ChamberEngine.render(canvas, 1, tileSize, {step})` and copied onto every screen showing it.

**Getting its source back.** With Claude's Artifact tool: `action: "read"` on the URL returns the page's HTML to its owner, and `path: "engine.js"` its engine. Publishing to the same URL keeps the link.

**Its limits.** The chamber jumps a tile per step, without the game's glide, and the fizzle's break-up isn't drawn (`render` draws states, not animation). Checked in headless Chrome at desktop width, light and dark; not at phone width.
