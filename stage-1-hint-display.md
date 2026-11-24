# Hint display

Tick a box when the step is implemented and verified.
Stage 1 of 3, before stage-2-hint-triggers.md.

## Goal and scope

The whole plan adds tutorial hints to Portal 2D: in a few early chambers, when the player reaches a chosen tile or spends some time without doing a chosen thing, the game pauses and a "spotlight" shows one element's tile with a short card explaining what that element is or does.

This stage builds only the display: the spotlight and its card on the chamber screen, opened by hand from the browser console in development builds. When it is done:

- `docs/hints.md` records every decision below.
- The chamber screen can show a hint over any tile, pausing the game and its clock until the player presses Enter, then carrying on.
- Nothing shows a hint to a player yet: no trigger, no stored data, no analytics.

## Out of scope

- What sets a hint off (a tile reached, a time passed), which hints exist, storing which hints were seen, the analytics event and the chamber check of the hint list: stage 2.
- The texts and tiles of the run 1 hints: stages 2 and 3.
- Player-facing docs (`docs/interface.md`, `docs/game_summary.md`, `AGENTS.md`'s chamber screen and keyboard paragraphs): stage 2, when players can first see a hint.
- Lighting several tiles at once (a run of fizzlers or lasers): not needed in run 1, whose hints each light one tile.
- A way to read a hint again: decided against.
- Noticed and left alone: `src/services/analytics.ts` lines 136-140 have identical `if (name === 'exception')` and `else` branches.

## Decisions

| # | Decision | Reason |
|---|----------|--------|
| 1 | The hint is the "spotlight" design (called B2): the whole screen, side panel included, darkens except the element's own tile, four white corner brackets mark the tile, and a card beside it holds the element's pictogram, its name as the title, a short text and a blue Continue button, joined to the tile by a thin line ending in a dot | Chosen by the author on an Artifact page that draws the real chamber screen with the game's renderer: https://claude.ai/artifact/C5MwvnphSuw5qpWG9ZBttP. Exact sizes, colours and timings are in `docs/hints.md`, "The chosen design" |
| 2 | A hint stops the game: the game and its clock pause until the player closes the hint, then play carries on from where it stopped | A stopping hint is sure to be read before the next step, and the clock doesn't count reading time |
| 3 | A hint only explains what an element is or does, never how to solve, and hints exist only in run 1 (Chambers 1 to 4); the lit tile is always that element's tile | `docs/level_design.md` guideline 31 and `docs/campaign.md` convention 7; the author kept them |
| 4 | Only Enter, or a click on Continue, closes a hint, and every key and click is ignored for the hint's first half second | A hint shows only once ever (stage 2), so closing it by accident loses it for good; Space is the default interact key and would otherwise press the focused Continue button |
| 5 | Escape does nothing while a hint shows | As on the chamber-complete dialog; the hint can't be lost to it, and the player presses Enter, then Escape, to reach the pause menu |
| 6 | The card goes on the side of the tile with the most room, whole on the stage (the dark area holding the chamber), never over the lit tile, the joining line straight | The design page always put it on the left; a chamber whose element sits near the left edge needs another side |
| 7 | As little text as will do: the shorter and clearer, the better | The author's rule (2026-11-22) |
| 8 | Pressing Continue plays the menu accept sound, as the dialogs do; with reduced motion the hint appears and goes at once | Matches every other dialog and the game's reduced-motion rule |
| 9 | Build in three stages: the display first, then the generic triggers with one real hint, then the remaining run 1 hints as data | Each stage can be checked on its own; every hint after the display is a data entry, not new code |

## Facts checked in the code

Checked on 2026-11-24.

- There is no hint or spotlight code in `src/`. The chamber screen's dialogs are one state, `type ChamberDialog = 'none' | 'pause' | 'settings' | 'confirm-reset' | 'confirm-exit' | 'completed'` (`src/components/screens/chamber_screen.vue:36`).
- Escape is handled in `handleKeydown` (`chamber_screen.vue:396-421`): it ignores repeats, and on `'completed'` it does nothing. No other key is handled by the screen in a chamber; restart is only in the pause menu.
- Browser Back while any dialog but the completion is open runs `guardExit` (`chamber_screen.vue:429-439`), which pauses and opens the exit confirmation; cancelling it (`cancelExit`, 312-316) opens the pause menu.
- Pausing (`Level.paused`, `src/game/level.ts:260-269`) disables the input; resuming forgets every press waiting and every key held. While paused, a step's glide, a slide's remaining beats (with their held-back sounds) and a walk-out keep drawing to their end, and the ambient effects keep moving; only the rules' update stops (`onFrame`, 801-845). The chamber clock grows only inside that update (481-487), so it stops while paused.
- `Level` does not expose the chamber's size in tiles. `CompiledChamber` has `width` and `height` (`src/game/rules/compiled_chamber.ts:251-252`); `Level` keeps it in a private `chamber` field.
- The canvas is exactly the chamber, centred in the stage, its page size its drawn size divided by the pixel ratio (`setCanvasPageSize`, `chamber_screen.vue:110-113`); `fitToStage` (119-129) refits it on every stage resize (a `ResizeObserver`) and pixel-ratio change. A tile's page size is therefore the canvas's `getBoundingClientRect().width` divided by the chamber's width in tiles. Chamber y counts up from the bottom row (`src/game/chamber_data.ts:9-12`), so tile (x, y) has its top-left corner at `left + x × size`, `top + (height − 1 − y) × size`.
- `src/components/dialog_frame.vue` holds the dialogs' keyboard behaviour (first action focused on mount, Tab wrapping inside, a repeating Enter or Space pressing nothing, `Sound.MENU_ACCEPT` on any action click) together with a centred panel and backdrop, so the hint card needs the behaviour without that layout.
- The pause dialog's Continue button is `.button .button-interaction` with `<span class="action-hint">Esc</span>` (`src/components/pause_dialog.vue:20`); `.action-hint` is defined only in that file's scoped style (lines 30-35). `.button`, `.button-interaction` and `.button:focus-visible` are shared in `src/assets/styles.css`.
- Pictograms: `src/components/element_pictogram.vue` draws one per `PictogramKind` (`Exclude<ElementKind, 'wall' | 'exit'> | 'mirrorBox'`, line 10). The elements' display names ("Box", "Button", "Ditch", "Blocked wall", "Fizzler", ...) exist only in `SIGN_ELEMENTS` inside `src/components/chamber_sign.vue` (lines 39-110), unexported, used as screen-reader text. Steel is a `blockedWalls` entry with no link, so the sign names it "Blocked wall"; there is no "Steel" string in `src/`.
- Every CSS shadow in the app is built from `--color-ink-rgb`; none uses black. The design page used black for the card's and brackets' shadows, so the built version uses ink instead. Tokens with alpha triplets: panel, white, ink, blue, subject.
- Development-only features are gated with `import.meta.env.DEV` (for example `chamber_screen.vue:74-76`), components loaded with an async import so production builds drop them. No function is exposed on `window` anywhere today, so the console function in phase 4 is the first.
- Enter and Space can both be bound to game keys under Custom controls (`src/game/key_bindings.ts:95-101` refuses only Escape, Tab, Alt, Meta, OS keys and F-keys). Default keys: arrows to move, A and D for the portals, Space to interact.

## What the user sees

For the developer, in `npm run dev`:

1. Open any chamber, play a few moves.
2. In the browser console, call the development function with an element kind, a tile and a text.
3. The screen darkens over 0.2 s, except that tile; white brackets frame it; the card slides in beside it with the element's pictogram and name, the text, and a focused blue Continue button showing "Enter" on its right. The chamber clock stops.
4. Arrow keys, Space and Escape do nothing. Enter in the first half second does nothing.
5. Enter after that shows Continue pressed (deep blue) for about 0.2 s, the hint fades out over 0.16 s and play carries on; the clock runs again.

Players see nothing new in this stage.

## Phases

## Phase 1 — Record the design

`docs/hints.md` describes the settled design, so the code can follow it.

- [ ] **Decisions into `docs/hints.md`.** Add to its decision table: the two triggers (a tile reached; a time on the chamber clock, starting at the first move, shot or interact, unless a chosen game event has happened in this attempt), each hint stored as seen once per player (in the chamber's progress record, forgotten by Reset progress, never brought back by a restart), Enter-only closing with the half-second guard, Escape doing nothing, the `hint_shown` analytics event, no way to read a hint again, element-only hints in run 1, and the assumptions (separate lit and trigger tiles, an optional cancelling event on any hint and a required one on a timer hint, seen when closed, one hint at a time in list order, permanent hint ids, the hint list outside the chamber files and checked by `npm run chamber:check`, the card on the side with most room, no hints in playground chambers or once the completing step is taken). Remove the open questions these settle; keep the ones still open (each hint's content). Say the design is being built. Check: every decision of this file and of the stage 2 and 3 files appears once, with no contradiction.
- [ ] **Verify.** Re-read `docs/hints.md` beside `docs/level_design.md` guideline 31 and `docs/campaign.md` convention 7: no contradiction.

## Phase 2 — Shared pieces

The pieces the card reuses are shared, with no visible change.

- [ ] **Share the action hint style.** Move `.action-hint` from `src/components/pause_dialog.vue`'s scoped style to `src/assets/styles.css`, unchanged. Check: the pause dialog's Continue still shows "Esc" in the same place and style.
- [ ] **Share the element names.** Add `src/services/element_names.ts` with each pictogram kind's name exactly as the chamber sign shows it, and make `src/components/chamber_sign.vue` read its names from it. Check: the sign's screen-reader names are unchanged (read them in the browser's accessibility tree or the DOM).
- [ ] **Expose the chamber's size.** Add `chamberWidth` and `chamberHeight` getters (in tiles; 0 before the first load) to `src/game/level.ts`, with JSDoc. Check: `npm run build`.
- [ ] **Verify.** `npm run lint:fix`, then `npm run build`; in the browser, the pause dialog and the chamber sign look as before.

## Phase 3 — The hint card

A component draws the spotlight and the card for a given tile rectangle, with its keyboard rules.

- [ ] **Spotlight.** New `src/components/hint_spotlight.vue`, given the element's pictogram kind, its title, the text and the lit tile's rectangle on the page. Darkening: `--color-ink` at 66 % over the whole window (`position: fixed; inset: 0`, above the side panel), cut out at the tile (a box exactly over the tile with a wide box shadow, clipped by the window). Brackets: four white corners, each 30 % of the tile's side long, 0.1875rem thick, their box the tile grown by 3 px each side, with a soft ink drop shadow. Check: drawn over a known tile in phase 4.
- [ ] **Card.** White plate (`--color-white`), 22rem wide, padding 1.25rem 1.375rem 1.375rem, 0.125rem `--color-ink-muted` frame, 0.375rem `--color-blue` top band, large soft ink shadow, parts 0.875rem apart. Head: the pictogram (`element_pictogram.vue`) 2.5rem square in a 0.125rem `--color-ink` frame with a fixed 0.1875rem padding (a percentage padding collapses in a flex row), then the title in Oxanium 700 at 1.625rem. Text: Chakra Petch 1rem, `--color-ink-muted`. Continue: `.button .button-interaction`, full width, label left, "Enter" right in `.action-hint`. Joining line: 2 px white from the card's edge, at the tile's middle height, to 6 px short of the brackets, ending in a white dot of 3.5 px radius. Colours from tokens only, `rgba()`, `border-radius` in rem. Check: compare with the design page at the same window size.
- [ ] **Placement.** Put the card on the side of the tile (left or right, its middle level with the tile's middle) with the most room inside the stage, 48 px from the tile; if neither side fits the card whole, above or below; never over the tile. Check: phase 4, with tiles near each edge.
- [ ] **Motion.** Darkening fades in over 0.2 s; card, brackets and line fade in over 0.18 s, the card sliding in from 10 px away from the tile, eased out (`--ease-out`). On Enter, Continue shows `--color-blue-deep` for about 0.2 s, then everything fades out over 0.16 s and the component emits `continue`. With `prefers-reduced-motion`, no fades, no slide and no pressed delay. Check: phase 4, with and without reduced motion.
- [ ] **Keys and pointer.** The card is a `role="dialog"` with `aria-modal="true"`, labelled by its title. Continue takes focus on open; Tab stays on it. Only a non-repeating Enter presses Continue; Space never does (stop the button's own Space activation on both keydown and keyup); arrows do nothing. Every key and click is ignored for the first 500 ms. Pressing plays `Sound.MENU_ACCEPT`. Check: phase 4.
- [ ] **Verify.** `npm run lint:fix`, then `npm run build`.

## Phase 4 — On the chamber screen

The chamber screen can show a hint over any tile, opened from the console in development.

- [ ] **A hint dialog state.** In `chamber_screen.vue`, add `'hint'` to `ChamberDialog` and the hint being shown. Showing pauses the game (`setPaused(true)`); Continue closes it and resumes (`resume()`). Escape's `'hint'` case does nothing. Browser Back still opens the exit confirmation in its place. Check: below.
- [ ] **The tile's rectangle.** Work it out from the canvas's `getBoundingClientRect()` and `level.chamberWidth` / `level.chamberHeight` (y counted from the bottom), and work it out again whenever `fitToStage` runs (stage resize, pixel-ratio change), so the spotlight follows. Check: resize the window while a hint shows.
- [ ] **Development console function.** Only when `import.meta.env.DEV`, put a function on `window` (declared in a global type, no cast) that shows a hint card for a given pictogram kind, tile and text; production builds drop it. Check: `npm run build`, then search `dist/assets/*.js` for the function's name: not found.
- [ ] **Verify.** `npm run lint:fix`, `npm run build`, then in the browser (`npm run dev` in the background, a new Chrome tab, sound muted with the `HTMLMediaElement.prototype.play` override from `AGENTS.md` before pressing Start): show a hint on an element tile in Playground 1 and in Chamber 1 at window sizes 1920 × 1080, 1440 × 900 and 1280 × 720; tiles near the left, right, top and bottom edges (the card changes side and stays whole on the stage); the clock stops while it shows; arrows, Space, Escape, a click within 0.5 s and Enter within 0.5 s do nothing; Enter after that closes it and play resumes; a key held through the hint doesn't move the subject after it; reduced motion (DevTools rendering emulation) shows and removes it at once; browser Back opens the exit confirmation. Then run the `delta-review` skill on the changed files and stop the dev server.

## Tests

The project has no test suite by design; its safety net is the type checker, the lint rules and the engine checks.

- `npm run lint:fix` and `npm run build` (type check first) after each phase.
- Manual browser checks listed in phase 4's verification, with screenshots at the three window sizes.
- `npm run verify` once at the end of the stage (lint, build, bundle and asset checks, engine checks). The rules are untouched, so the engine checks must pass unchanged; the bundle grows only by one small component.
- The `delta-review` skill on the files changed.

## Risks

- **Space presses Continue anyway.** A focused button activates on Space's keyup; if only keydown is stopped, Space still closes the hint. Notice: phase 4's check with Space. Stop both.
- **A hint opening mid-glide.** The pause lets a step being drawn run to its end, so the subject may still glide under the darkening for a fraction of a second. Notice: phase 4's check right after a move. Acceptable unless it looks wrong.
- **Small windows.** At 1280 × 720 the 22rem card covers a large share of the stage; a tile in a chamber's middle may have no side with room for it, so placement falls back to above or below. Notice: phase 4's check at 1280 × 720.
- **The tile rectangle drifting.** If the rectangle is computed before the canvas has its new size, the spotlight sits off the tile after a resize. Notice: resize while a hint shows.
- **Unverified:** that a `.ts` file may import the `PictogramKind` type from `element_pictogram.vue` in the app's TypeScript project (`src/services/element_names.ts` needs it). If not, declare the kind list in the new file and have the component use it.

## Done when

- [ ] `docs/hints.md` records every decision in this file's Decisions table and the trigger, storage and analytics decisions stage 2 builds.
- [ ] In a development build, the console function shows a hint over any tile, matching `docs/hints.md`'s chosen design, at 1920 × 1080, 1440 × 900 and 1280 × 720.
- [ ] While a hint shows, the game and the clock are paused; only Enter after the first half second, or a click on Continue after it, closes it; Escape, Space and arrows do nothing.
- [ ] The card is whole on the stage and never over the lit tile, for tiles near each edge.
- [ ] The production build holds no trace of the console function.
- [ ] `npm run verify` passes.

## Go/no-go points

- **The card at 1280 × 720.** If it covers too much of a small stage, the card's size goes back to the author (the design page can show a smaller one) before stage 2 adds real hints.
