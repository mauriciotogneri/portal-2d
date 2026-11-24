# Hints

Short notes shown during the first chambers, so a new player understands what an element does: for example, that walking into a fizzler that is on closes both portals and destroys a box the subject carries. Nothing of this is built yet. This file records the design chosen on 2026-11-21, how it was chosen, what is still open, and what was learned about the code on the way, so the work can start from here.

These are tutorial hints. They are not the solver's hints (a nudge, a highlight, the next move, on a key of their own), one of the player features dropped when the solver's prototype stopped (`docs/solver.md`); the solver itself is still in the code.

## The decision

| # | Question | Decided |
|---|----------|---------|
| 1 | Does a hint stop the game? | Yes. The game pauses (the clock too) until the player presses Enter, then carries on |
| 2 | How is it shown? | As a spotlight: the whole screen darkens except the element's own tile, and a card beside it holds the text and a Continue button |
| 3 | What does the spotlight light? | Only the tile of the element the hint is about, not the tiles round it (round 1 lit a 3 × 3 block; the author asked for one tile) |
| 4 | Where was it chosen? | On an Artifact page that draws the real chamber screen with the game's own renderer: https://claude.ai/artifact/C5MwvnphSuw5qpWG9ZBttP (see [The artifact](#the-artifact)) |
| 5 | How much text? | As little as will do: the shorter and clearer, the better (the author's rule, 2026-11-22) |

The request that started it: hints during the first chambers, of two kinds to compare, intrusive (the game stops, the player reads, dismisses it, and the game continues) and non-intrusive (shown without interrupting the game), each tried in different places on the screen. Round 1 showed seven styles (A to G, [below](#what-was-considered)); round 2 kept only B, the spotlight, with its light cut down to the element's own tile. That round 2 design, called B2 on the page, is the one chosen.

## The chosen design

Everything below is as the round 2 page draws it, at 1:1 screen pixels on the chamber screen (`src/components/screens/chamber_screen.vue`: the 23rem rail on the left, the dark stage on the right holding the canvas). Sizes are given in the game's own units (rem = 16 px) and colours by the game's tokens (`src/assets/styles.css`).

### What the player sees

| # | Part | Look |
|---|------|------|
| 1 | Darkening | The whole screen, rail included, under `--color-ink` at 66 % opacity, except the lit tile. The page made it as a box exactly over the tile with a box shadow spread 4000 px wide in that colour, clipped by the screen |
| 2 | Lit tile | The element's own tile, exactly: the chamber as drawn, untouched and not brightened |
| 3 | Brackets | Four white corner marks round the lit tile, each 30 % of the tile's side long, 0.1875rem (3 px) thick, set just outside the tile (their box is the tile grown by 3 px each side) so the tile shows whole, with a soft dark shadow (`drop-shadow(0 0 0.15rem)`, black at 70 %) so they read on light floor |
| 4 | Card | A white plate (`--color-white`), 22rem wide, padded 1.25rem 1.375rem 1.375rem, framed in 0.125rem `--color-ink-muted` (the chamber sign's frame) with a 0.375rem `--color-blue` top band (the dialogs' band for interaction), a large soft shadow (`0 1rem 2.5rem`, black at 40 %), its parts 0.875rem apart |
| 5 | Card head | The element's pictogram from the chamber sign (`src/components/element_pictogram.vue`), 2.5rem square, framed in 0.125rem `--color-ink` with 0.1875rem padding, then the element's name as the title in Oxanium 700 at 1.625rem (line height 1.05), 0.875rem apart |
| 6 | Card text | Chakra Petch at 1rem, `--color-ink-muted` |
| 7 | Continue | The game's `.button .button-interaction` (blue), the card's full width, label on the left, "Enter" on the right in white at 80 %, 0.875rem, weight 500 (as the pause dialog's Continue shows "Esc"), drawn focused (the ink ring `.button:focus-visible` draws). It turns `--color-blue-deep` while Enter is down |
| 8 | Card place | To the left of the lit tile: its right edge 48 px from the tile's left edge, centred on the tile's middle height |
| 9 | Leader | A 2 px white line from the card's right edge, at the tile's middle height, to 6 px short of the left brackets, ending in a white dot of 3.5 px radius |

### How it moves

| # | When | What |
|---|------|------|
| 1 | The hint is set off | The game pauses at once (nothing moves; the clock stops). The darkening fades in over 0.2 s. The card, the brackets and the leader fade in over 0.18 s, the card sliding in from 10 px to the left, eased out (cubic) |
| 2 | While it shows | Nothing moves. The player reads for as long as they like |
| 3 | Enter goes down | Continue shows pressed (deep blue) for about 0.2 s |
| 4 | Then | Everything fades out over 0.16 s and the game carries on from where it stopped |

With `prefers-reduced-motion` the game should show and remove it at once, like every other motion in the game (not tried on the page).

### Screen sizes

The chamber screen sizes tiles from the stage, so the lit tile is as large as the chamber's tiles. On Playground 2 (20 × 20 tiles), where the page was made:

| # | Window | Tile | Lit area with brackets |
|---|--------|------|------------------------|
| 1 | 1920 × 1080 | 50 px | 56 px |
| 2 | 1440 × 900 | 41 px | 47 px |
| 3 | 1280 × 720 | 32 px | 38 px |

At 1280 × 720 the lit tile is small but still clear with its brackets. The card is the same size at every window, so it covers a larger share of a smaller stage.

## The fizzler hint

The example every option showed, the author's own: "fizzlers destroy portals and boxes if you cross one that is on". Its title is "Fizzler", with the fizzler's pictogram. The page had two texts, switchable:

| # | Text | Wording |
|---|------|---------|
| 1 | Short (shown first) | Walking into a fizzler that is on closes both your portals and destroys a box you carry. |
| 2 | Long | Walking into a fizzler that is on closes both your portals. A box you carry through it is destroyed and goes back to where it started. A fizzler that is off lets everything through. |

Both follow the fizzler rule in `docs/elements.md` ("The fizzler rule"): entering a fizzler that is on (walking, coming out of a portal, or the field turning on under the subject) closes both portals and sends a carried box back to its start. Which one to use, and the wording of other elements' hints, aren't decided.

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

None of these was decided. Each needs an answer before building.

| # | Question | What is known |
|---|----------|---------------|
| 1 | When does a hint appear? | The page set it off when the subject came into the fizzler's part of the chamber (out of the portal, four tiles from the field). Other choices: when the chamber opens, when the subject first comes within some tiles of the element, or the first time the element would matter (before the step that would fizzle). The game reads one press per frame and never moves on its own, so a hint can be set off between two steps |
| 2 | Which hints, in which chambers? | Only the fizzler was mocked. The campaign holds Chambers 1 to 24 so far, the tutorial run, run 2's one chamber, run 3's two, run 4's three, run 5's two, run 6's two, run 7's two, run 8's one, run 9's four and run 10's three, with walls, blocked walls, ditches and the exit, from Chamber 3 on boxes, buttons, doors and antlines, from Chamber 8 on switches, from Chamber 9 on a box that starts absent, from Chamber 11 on lasers and blocked walls a button opens, from Chamber 13 on fizzlers, from Chamber 15 on arrows, from Chamber 16 on arrows a button turns, from Chamber 17 on light barriers, from Chamber 18 on slide floors, from Chamber 21 on lasers a button switches, from Chamber 22 on emitters and receivers, and from Chamber 24 on fizzlers a receiver switches; no campaign chamber yet holds any other element (the old tutorial, which also brought arrows, and the chambers that brought fizzlers, lasers, slide floors, turnable arrows, emitters and receivers left the campaign and are now playground chambers; lasers came back with run 5, fizzlers with run 6, arrows, turnable ones too, with run 7, slide floors with run 9, and emitters and receivers with run 10). Chamber 3 is the first where the interact key matters, picking a box up and putting it down on the tile faced, so its row in `docs/campaign.md` names a box hint beside the button's |
| 3 | Shown once, or every time? | Once per player (stored), once per visit, or on every attempt. If stored: under a `portal-2d.` key, wrapped in `try`/`catch`, and cleared by Reset progress or not |
| 4 | After Restart chamber? | Whether the hint shows again after a restart or Play again |
| 5 | Can the player read a hint again? | For example from the pause menu or the rail; nothing decided |
| 6 | Where does the card go when the left has no room? | The page always put it to the left (Playground 2's fizzler is near the right edge). A rule is needed: the side with the most room on the stage, the card whole on the stage, never over the lit tile, the leader straight |
| 7 | Which keys close it? | Enter on the page. Space too? A held key must not close it as it appears (most likely the interact key, Space by default, or a key bound to Enter), as `dialog_frame.vue` already ignores a repeating Enter or Space. A click? |
| 8 | Escape and pause | What Escape does while a hint shows: close it, or open the pause menu over it |
| 9 | Several elements at once | One hint at a time, in what order, and whether the spotlight can light several tiles (a run of fizzlers or lasers spans several) |
| 10 | Screen readers | The card as a `role="dialog"` with `aria-modal`, labelled by its title, as the other dialogs are |
| 11 | Analytics | Whether to send an event when a hint shows or closes (event names are permanent) |
| 12 | Which text, short or long | See [The fizzler hint](#the-fizzler-hint); decision 5 favours the short one |

## Notes for building

What was learned about the code while making the page. These are findings, not decisions.

- **Where it goes.** The chamber screen (`chamber_screen.vue`) owns the dialogs over the chamber, as one `ChamberDialog` state (`'none' | 'pause' | 'settings' | 'confirm-reset' | 'confirm-exit' | 'completed'`), pausing the game with `level.paused` and resuming it on close. A hint would be one more state there, and its Escape case in `handleKeydown` must be decided (open question 8). Pausing stops the clock (it counts only unpaused frames), and resuming forgets every press still waiting and every key held, so a key held through the hint doesn't carry on.
- **The game decides nothing about Vue.** `src/game/` never imports Vue, components or services. Whatever sets a hint off must reach the screen the way completion does (`level.onCompleted`): a callback from `Level`, or the screen reading the state after each step. The rules (`src/game/rules/`) must not change for hints: the recorded solutions and fixtures pin them.
- **Finding the tile on the page.** The canvas is exactly the chamber (`tileSize × width` by `tileSize × height` device pixels, in `TilePainter.setSize`), centred in the stage, its page size its drawn size divided by the pixel ratio. So a tile's page size is the canvas's `getBoundingClientRect().width` divided by the chamber's width in tiles, and tile (x, y), y counting from the bottom as the game does, lies at `left + x × size`, `top + (height − 1 − y) × size`. The tile size itself is `Math.trunc(min(stage width / max(chamber width, 16), stage height / max(chamber height, 16)))` in device pixels, the stage less its 2rem padding each side; a resize or a pixel ratio change moves it, so the spotlight must follow (`fitToStage`).
- **The darkening over the rail.** The dialogs' backdrop is `position: fixed; inset: 0`, over the rail too. The spotlight darkens the same area, cut out at one tile.
- **Reuse.** `dialog_frame.vue` has the keyboard behaviour a hint needs (first action focused, Tab kept inside, a repeating Enter or Space ignored, the accept sound on pressing) but also the centred panel and backdrop, so the card needs that behaviour without that layout. The pictograms are in `element_pictogram.vue`, one per kind (`PictogramKind`). The Continue button is the pause dialog's (`pause_dialog.vue`, with its `.action-hint`).
- **A pitfall the page hit.** The sign frames its pictograms with `padding: 7%`, which works in its grid cells. Put in a flex row, a percentage padding is taken from the row's width, not the frame's, and the pictogram shrinks to nothing: give the hint's frame a fixed padding (0.1875rem).
- **Colours.** The page used black for the card's and the brackets' shadows; built in the game, every colour must be an `rgba()` token from `styles.css` (no new colours), and `border-radius` in rem.
- **Sounds.** Not tried on the page. The dialogs play `Sound.MENU_ACCEPT` on pressing an action.
- **Docs to update when it is built.** `AGENTS.md` (the chamber screen, keyboard ownership, the layout), `docs/interface.md` (the chamber screen, the keys, the dialogs), `docs/game_summary.md` (the screens), `docs/level_design.md` if hints change how a chamber should introduce an element, and this file.

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
