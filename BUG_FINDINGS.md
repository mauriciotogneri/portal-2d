### [a/error-handling/asset-preloader/stalled-download-never-settles] A download that stalls keeps Start from ever appearing

- **Location:** `src/services/asset_preloader.ts:112` (`downloadFile`: `fetch` and `reader.read()` with no timeout or abort). Related: `src/services/asset_preloader.ts:227` (`Promise.all` over every file), `src/components/screens/loading_screen.vue:62-77` (`preload` shows Start only after it resolves).
- **Severity:** Medium
- **Confidence:** Low
- **Likelihood:** Low. Most broken connections end in an error, which is already caught. A permanent hang needs a connection that stays open but stops sending, for example a misbehaving proxy or a stalled server.
- **Defect:** The loading screen waits for every file to download or fail. A response that never answers, or stops part way through its body, never settles, so `preloadAssets` never resolves. Start never appears and the game can't be entered for that visit. The bar also stays at 0 until every server has answered. AGENTS.md promises that "A file that fails is skipped and loads on demand later". A stalled file never fails, so it is never skipped.
- **Trigger:** Any one audio or image request under `src/assets/audio/` or `src/assets/images/` that hangs mid-response during the loading screen.
- **Evidence / verification:**
  - Traced: there is no AbortSignal, timer or race anywhere in `downloadFile`, `preloadAssets` or `preload`. The loading screen offers no other way to Start.
  - Not reproduced: it would need a server that holds a response open.
  - Remaining assumption: how often real connections stall without the browser erroring them out.
- **Suggested fix:**
  - Give each download an inactivity timeout: an AbortController whose timer is reset on every chunk received and aborts after some seconds with no progress.
  - Treat the abort as a download failure, so the file is reported and left to load on demand.
  - Use an inactivity timer, not a total-time cap, so a slow download that is still progressing is never cut off.

## Low

### [a/repeated-and-interrupted-operations/dialogs/held-arrow-repeats-move-dialog-focus] A move key held into the completion dialog moves its focus on every repeat

- **Location:** `src/components/dialog_frame.vue:75` (`handleKeydown`, ArrowDown/ArrowUp). Related: `src/components/dialog_frame.vue:67-74` (only Enter/Space repeats suppressed), `src/components/completion_dialog.vue` (stacked actions).
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Medium. Six of the ten chambers have their exit in the top or bottom wall, and players often hold the arrow key while walking to the exit. The dialog opens within about half a second of the last step.
- **Defect:** The dialog suppresses held (repeating) Enter and Space, because "A key held since before the dialog opened ... must not press the action that just took focus". It does not suppress held arrows. When the chamber completes, the level pauses and its input stops. The arrow's auto-repeat keydowns then reach the focused "Next chamber" button. Each repeat moves focus to the next action with a move sound, so focus cycles through Next chamber, Play again, Back to menu (and Download solution in development) and stops wherever the key is released. Enter then presses that action instead of Next chamber.
- **Trigger:** Hold Down to walk into an exit in the bottom wall (or Up into a top-wall exit), and keep holding as the completion dialog opens.
- **Evidence / verification:**
  - Traced:
    - The completion pauses the level, and pausing disables the game's keyboard input.
    - The dialog focuses its first action on mount.
    - A repeat keydown bubbles to the panel's handler, and that handler calls `moveFocus` without checking `event.repeat`.
  - Refutation pass:
    - Left and Right do nothing in a stacked dialog.
    - No action is pressed by the arrows themselves.
    - The contract names only Enter and Space, but the dialog's own rule (keys held from before it opened must not act) covers this case.
- **Suggested fix:** Ignore repeating arrow keydowns for a key the dialog has not yet seen go down (record keys whose first, non-repeating keydown arrived after mount). An arrow held on purpose inside the dialog still moves focus.

### [b/contract-mismatches/changelog/retired-controls-still-advertised] The changelog still offers WASD-and-mouse controls and mouse aiming, which were removed

- **Location:** `src/services/changelog.ts:24-25`, shown under About by `src/components/changelog_list.vue`.
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Medium. Every player who opens the changelog sees the newest release first, and 0.1.0 is still the current version in `package.json`.
- **Defect:** Release 0.1.0 tells players to "Pick Arrow keys, WASD and mouse, or your own keys under Settings" and that "With a mouse button bound, the test subject faces the pointer".
  - Commit e2c95b8 retired the WASD-and-mouse layout and mouse play. Settings now offers only Default and Custom, and AGENTS.md says "The mouse plays no part in the game".
  - The author's own practice is to remove retired features from the changelog: commit 8f660a7 deleted the undo lines and the whole 0.0.3 release.
- **Trigger:** Open About, then the changelog.
- **Evidence / verification:** Read `changelog.ts` at the audited commit; `git show e2c95b8 --stat` (the layout and the mouse glyph were removed, `changelog.ts` untouched); `git show 8f660a7 -- src/services/changelog.ts`. Refutation pass: the only defence is that the text records what 0.1.0 shipped, and the author's own history-rewriting practice contradicts it.
- **Suggested fix:** Reword or drop the two lines, following the author's convention, or add a release entry saying the WASD-and-mouse layout and mouse aiming were removed.

### [b/contract-mismatches/rules-settle/pass-cap-reached-by-valid-relay-chain] A valid relay chain listed in reverse order hits the 32-pass cap, so the chamber can't start

- **Location:** `src/game/rules/step.ts:831` (`settle`). Related: `src/game/rules/step.ts:64` (`PASS_CAP = 32`), `docs/elements.md` "A step" (the cap "guards against a mistake").
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. No shipped chamber has more than one receiver; it would hit a designer building a long relay.
- **Defect:**
  - Each pass judges the receivers in list order. When a relay chain is listed in reverse (each receiver switching on the emitter that lights the receiver listed before it), each pass lights only one more receiver.
  - A chain of 32 settles correctly in 33 passes, but the cap throws on the 32nd changing pass. The chamber passes the validator, then fails to start: the level, the home menu's map and `npm run smoke:engine` throw.
  - docs/elements.md argues that settling always ends and that the cap only catches "a mistake". Here there is no mistake: the number of passes needed grows with the chain's length, so the documented limit doesn't hold for valid chambers.
- **Trigger:** A chamber with emitter E1 on, emitters E2..E32 off with ids, receiver Rk lit by Ek's ray and linking Ek+1 (R32 linking the exit), and the receivers listed R32 first.
- **Evidence / verification:**
  - Reproduced with a tsx script on the real rules in a disposable copy:
    - 31 receivers in reverse order: settled, exit opened.
    - 32 in reverse order: "Error: A step still changed the state after 32 passes" from `startChamber`.
    - 32 in forward order: settled.
  - Refutation pass: what happens at the cap is documented, so what survives is that the documented bound is wrong for valid chambers.
- **Suggested fix:**
  - Derive the cap from the chamber, since each changing pass must change at least one bounded thing (for example receivers + buttons + boxes + a margin).
  - Or have the validator reject relay chains longer than the cap allows.
  - Correct docs/elements.md either way. No recorded solution changes, since no current chamber comes near the cap.

### [a/logic-errors/box-effects/link-sent-box-drawn-falling] A box a link sends home is drawn falling into a ditch when another box is destroyed in the same step

- **Location:** `src/game/destroyed_boxes.ts:77` (`fell`). Related: `src/game/destroyed_boxes.ts:49-63`, `src/game/box_fall.ts:43`, `src/game/returned_boxes.ts:65-87`.
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. It needs a switch or receiver that sends a box home from a bridged ditch, that ditch opening in the same step, and another box destroyed in that step. Reachable in the dev playground; no shipped chamber has this setup.
- **Defect:**
  - On any step that reports `boxDestroyed`, every box that went home from a tile holding a door, ditch, laser, light barrier or fizzler is counted as destroyed. One whose ditch is open after the step is drawn falling into the pit and gathering at its start.
  - A box the link sent home, before the ditch opened, is drawn falling too. docs/sprites.md says a box sent home by a link flies home in pieces.
  - The function's comment acknowledges the case.
- **Trigger:**
  - In the playground: box 52 on the button at (6,7), which bridges the ditches; box 51 on the bridged ditch at (2,7); another box on (2,6).
  - Use the switch at (8,8), which sends both boxes home. The button comes up, the ditches open, and the box on (2,6) is destroyed.
  - Box 51 is drawn falling instead of flying home.
- **Evidence / verification:** Traced the classification from the before/after states; the refutation pass built the playground trigger. Only the falling case looks wrong; for other tiles a destroyed box and a sent-home box are drawn the same.
- **Suggested fix:** The before and after states can't separate the two cases. Have the step say which boxes it destroyed (for example per-box detail on `boxDestroyed`, or a per-step set of destroyed box indices), and draw a box falling only when it is in that set.

### [a/repeated-and-interrupted-operations/input/orphan-key-repeats-queued] A key held from a dialog or the menu acts in the chamber through its auto-repeat

- **Location:** `src/game/input.ts:169` (a repeat is dropped only while an earlier press of that key still waits). Related: `src/game/level.ts:259-268` (resume calls `input.reset()`), `src/game/input.ts:91-95`.
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. The key must be held past the system's repeat delay across a resume or into a new chamber.
- **Defect:** AGENTS.md: "resuming forgets every press still waiting and every key held".
  - After a resume (or in a freshly opened chamber) the queue is empty. The auto-repeat keydowns of a key that went down before then pass the repeat check and are queued as presses, so the subject moves and the clock starts.
  - Examples:
    - With Custom controls binding Enter, holding Enter on Continue, Play again, Next chamber or the restart confirmation.
    - With Default keys, holding Down while pressing Enter on a chamber row in the menu.
- **Trigger:** Bind Enter to Up under Custom, open the pause menu, hold Enter on Continue for about a second: the subject moves.
- **Evidence / verification:** Traced: `reset()` clears the queue and the held keys, but a repeat keydown re-adds the key and queues it, because nothing remembers that the key's first keydown was never seen. Refutation pass: Space is safe, because buttons activate on its keyup.
- **Suggested fix:** Have `Input` remember which keys it saw go down (non-repeating) since it was created or last reset, and ignore repeat keydowns for any other key.

### [b/contract-mismatches/solver/flag-limit-below-key-limit] A chamber with more than 32 linked elements fits the solver's key but crashes its search and fails the checks

- **Location:** `src/solver/state_key_codec.ts:365` (`flagsOf` throws above 32 flags). Related: `src/solver/state_key_codec.ts:55-71` (`measureKey` accepts up to 64 bits), `scripts/check_solver.ts:162` (`checkWalks`, run on every chamber with no receiver), `docs/level_design.md` guideline 11.
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. Today's chambers have at most 9 linked elements, but each laser or ditch tile in a linked run counts on its own (chamber 1 already has 16 lasers and 14 ditches).
- **Defect:**
  - The key codec accepts a chamber whose key fits 64 bits, but reading its flags throws when there are more than 32.
  - `npm run solver:check` reports such a chamber as failed with no skip, so `npm run verify` and the default `npm run deploy` stop, and `npm run solve -- --solvable/--par` throws.
  - docs/level_design.md tells designers that the only limit is the 64-bit key ("each element a link reaches 1"). docs/solver.md names no 32-flag limit either.
- **Trigger:** A chamber with a group of 33 ditches linked to one button and no receiver.
- **Evidence / verification:**
  - Reproduced with a tsx script on a disposable copy: the codec accepted a 56-bit key.
  - `MacroSearch.run` threw "The chamber has 33 flags, more than 32 can be read as one number" in both the any-route and fewest-moves modes.
  - Refutation pass confirmed `check_solver` calls `flagsOf` for every chamber with no receiver.
- **Suggested fix:** Either make `measureKey` refuse more than 32 flags and document that limit in docs/level_design.md and docs/solver.md, or read flags across both words of the key. The latter also means widening the caches keyed by a 32-bit flags number.

### [a/logic-errors/ray-drawing/glow-darkens-see-through-exit] A ray's glow darkens the see-through exit on the chamber screen instead of brightening it

- **Location:** `src/game/ray_drawing.ts:61` (`premultiplied` makes every glow stop opaque). Related: `src/game/ray_drawing.ts:311` (`paintRayGlows`), `src/game/tile_painter.ts:202-216` (`drawLayerAdded`: `'lighter'` at 0.8), `src/game/renderer.ts` (`seeThroughExit`: erase and exit cut-out).
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. It needs an emitter's ray crossing the open exit. Shipped chambers 8 and 9 can't arrange that, because their exit opens only while the ray ends on the receiver; the dev playground can.
- **Defect:** The glow is painted with opaque, premultiplied colours (its faint stops become `rgba(0,0,0,1)`) and added with `'lighter'`, which adds alpha as well as colour. Elsewhere the canvas is opaque, so only the colour adds. On the chamber screen, though, the exit's tile has been faded out to transparent so the stage shows through. Over that tile the glow band adds about 80% opacity of near-black and dull gold, so a dark bar covers the stage where docs/sprites.md says glows "brighten and never darken". Laser and portal glows have transparent sprites and don't do this.
- **Trigger:** In the playground, hold the exit open with the box on (7,8), route the ray up column 7 into the exit (portals on the right face of (9,10) and the left face of (11,9), mirror box at (7,9)), and look at the exit on the chamber screen.
- **Evidence / verification:**
  - Traced the compositing: an opaque source added with `'lighter'` over a transparent destination gives the source colour at the source alpha.
  - The refutation pass confirmed the maths and built the playground route.
  - Not looked at in a browser. The visible difference on the dark stage is subtle.
- **Suggested fix:** Make the added glow carry no opacity where it carries no light. For example, mask the glow layer with the canvas's own opacity before adding it, add it before the exit is cut out, or build the glow from transparent stops gathered in a way that keeps the brightest.

### [a/logic-errors/analytics/pause-menu-after-cancelled-back-not-counted] A pause menu reached by cancelling a Back-triggered exit isn't counted in `pauses`

- **Location:** `src/components/screens/chamber_screen.vue:287` (`cancelExit`). Related: `src/components/screens/chamber_screen.vue:403-411` (`guardExit`), `:173-178` (`openPause`, the only place `pauses` grows), `src/services/analytics.ts:183`.
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. It needs browser Back, then Cancel, then a restart or an exit from the pause menu that appears.
- **Defect:** AGENTS.md defines `pauses` as the "times the pause menu was opened during the attempt, the one that led to a restart or an exit included". Browser Back pauses the game and shows the exit confirmation without counting. Cancel then shows the pause menu, again without counting. A restart or exit chosen from that menu is sent with `pauses: 0`, although a pause menu led to it.
- **Trigger:** In a chamber with no dialog open: browser Back → Cancel → Restart chamber → confirm.
- **Evidence / verification:** Traced: `pauses` changes only in `openPause` and is reset per attempt. A Back confirmed straight away correctly reports 0. Refutation attempt: whether "opened" covers a menu reached by Cancel is arguable, but this menu then leads to the restart or exit the definition names.
- **Suggested fix:** Count the pause menu when Cancel brings it up after a confirmation that browser Back opened from play. Don't count it when the confirmation came from the pause menu's own Exit chamber, which was already counted.

## Summary

By severity: Medium 2, Low 17.

By confidence: High 8, Medium 9, Low 2.

| #   | Severity | High | Medium | Low |
| --- | -------- | ---- | ------ | --- |
| 1   | Medium   | 1    | 0      | 1   |
| 2   | Low      | 7    | 9      | 1   |

By Likelihood: High (0 findings), Medium (3 findings), Low (16 findings).
