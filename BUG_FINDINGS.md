# Bug Findings

## Medium

### [a/user-interface-state/chamber-navigation/confirmed-exit-pushes-new-history-entry] Leaving a chamber pushes a new home entry, so browser Back keeps re-entering the chamber

- **Location:** `src/components/screens/chamber_screen.vue:267` (`leaveChamber`). Related: `src/components/screens/chamber_screen.vue:403` (`guardExit`), `:414-418` (the leave and update guards), `:446-461` (mount: attempt, `chamber_start`, music), `node_modules/vue-router/dist/vue-router.js:1307-1320` (a popstate that a guard aborts is undone with `routerHistory.go(-info.delta, false)`).
- **Severity:** Medium
- **Confidence:** High
- **Likelihood:** Medium. Browser Back is an ordinary way out of a page, and AGENTS.md documents it as the chamber's exit path. Every chamber left through Back, Exit chamber or Back to menu leaves the extra entry behind.
- **Defect:** When browser Back is pressed in a chamber, the guard refuses the navigation, and vue-router moves the history position back onto the chamber entry. Confirming Exit then calls `router.push(pendingRoute)`, which adds a new `/` entry after the chamber instead of finishing the back step. History becomes `[/, /chamber/N, /]`.
  - Back from home now lands on the chamber again. A new attempt is counted and stored, `chamber_start` is sent, and the music moves to the next track.
  - Back from that chamber asks for confirmation again, and confirming pushes `/` again. Plain Back can never get past the chamber to the page before it unless the chamber is finished.
  - Each lap adds a stored attempt and a `chamber_start`/`chamber_quit` pair. Exit chamber and Back to menu push the same way, so Back from home re-enters the last chamber after those too. That contradicts the history intent `openNextChamber` states at `:249-251`.
- **Trigger:** Open `/`, click a chamber row, press browser Back, choose Exit, then press Back again (and again).
- **Evidence / verification:**
  - Reproduced in Chrome against a dev build served from a disposable copy:
    - Opening `/chamber/1` from the menu made `history.length` 3.
    - Back opened "Exit chamber?". Exit landed on `/` with `history.length` 4.
    - Back landed on `/chamber/1` with the chamber running.
    - Back again showed the confirmation, and Exit pushed `/` again.
    - The console logged `chamber_start`, `chamber_quit`, `chamber_start`, `chamber_quit`.
  - Refutation pass:
    - No global guard exists.
    - The route's `beforeEnter` allows re-entry.
    - No `router.back`, `go` or `replace` appears in the leave path.
    - The long-press history menu can still jump past the chamber.
- **Suggested fix:** Finish the history move instead of pushing a new entry.
  - For a confirmed browser Back (the guard saw a popstate), go back with `router.back()`, or with the original delta for a jump through the history menu.
  - For Exit chamber and Back to menu: when the entry before the chamber is home (`history.state.back`), go back; otherwise `router.replace({name: 'home'})`.
  - Keep `leaveConfirmed` set so the guard lets the move through. `chamber_quit` is still sent once, from the confirmation.
  - Next chamber already uses `replace`, so a chamber reached that way still has home behind it.

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

### [a/user-interface-state/dialogs/key-handling-lost-when-focus-leaves-panel] After a click inside a dialog, its arrow keys stop working and Tab can leave it

- **Location:** `src/components/dialog_frame.vue:125` (`@keydown` bound to the panel only). Related: `src/components/dialog_frame.vue:89-92` (the Tab wrap), `src/components/screens/home_screen.vue:842-851` (the menu's handler returns without `preventDefault` while a dialog is open), `src/components/chamber_legend.vue:67-79` (the legend toggle behind a chamber dialog).
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. It needs a click on a part of the dialog that is not a button, which keyboard players rarely do.
- **Defect:** The dialog's arrow-key and Tab handling runs only while focus is inside the panel. Clicking its title, its text or the backdrop moves focus to the page body.
  - The arrows then do nothing; in the pause menu's Settings, Left and Right no longer change the volume.
  - Tab and Shift+Tab follow the browser's default from the clicked point. Shift+Tab can focus a row of the home menu, or the chamber legend's fold toggle, behind the `aria-modal` dialog, and Enter there activates it natively.
  - The component promises that "Tab stays inside the dialog", and AGENTS.md requires keyboard-operable dialogs.
- **Trigger:** Open the custom controls dialog (or any dialog), click its title, then press an arrow key, or Shift+Tab followed by Enter.
- **Evidence / verification:**
  - Traced: there is no window-level dialog key handler, no `inert` on the background (`inert` is used only on the legend body) and no focusout recovery.
  - The home screen recovers from the same situation for its own columns, but the dialogs don't.
  - Not reproduced in a browser. Shift+Tab's starting point is the browser's sequential-focus behaviour.
- **Suggested fix:** While a dialog is mounted, make the rest of the screen `inert` and handle the dialog's keys at the window level (or send focus back to the last focused action on focusout), so keyboard control stays in the dialog whatever is clicked.

### [b/contract-mismatches/key-bindings/custom-fallback-checks-later-game-keys] Stored Custom keys fall back to Default as a whole in cases the documented rule keeps them

- **Location:** `src/services/key_bindings.ts:74` (`readBindings`), the second loop at `:91-98`.
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. Divergence needs a stored key that can no longer be bound, on a game key whose Default key is held by a later game key. The real retired layout (WASD with portals on the mouse) gives all-Default under either reading.
- **Defect:**
  - AGENTS.md says Custom keys are "read game key by game key". A stored key that can't be bound or is already taken falls back to that game key's Default key, and only "if that is then taken" does every game key go back to Default.
  - The code first keeps every valid, unique stored key for all game keys, and only then checks each fallback against all of them, later game keys included. So a fallback that would be free when read in order is counted as taken, and every Custom key is lost.
  - Its own comment ("no earlier game key holds it") misses earlier fallbacks too.
- **Trigger:** `portal-2d.key-bindings` = `{"layout":"custom","custom":{"up":"MouseLeft","down":"ArrowUp","left":"KeyJ","right":"KeyL","blue":"KeyU","orange":"KeyO","interact":"KeyK","turn":"Shift"}}`.
  - Read in order: up gets ArrowUp, down (its key now taken) gets ArrowDown, and J, L, U, O and K are kept.
  - The code returns all Default.
- **Evidence / verification:** Traced both loops by hand for this input. Refutation pass: both readings keep one key per game key, so the difference is only which keys survive. Stored formats may reset on updates (decision 13), but the fallback rule is specified explicitly.
- **Suggested fix:** Read the game keys in one ordered pass. For each, take its stored key if it can be bound and no earlier game key's final key holds it. Otherwise take its Default key if no earlier game key's final key holds it. Otherwise return all Default.

### [b/resource-and-configuration-parity/input/numpad-navigation-default-not-suppressed] A bound numpad key pressed with NumLock off still scrolls

- **Location:** `src/game/input.ts:230` (`preventDefault`, matching `KEYS_WITH_DEFAULTS` on `event.code` only). Related: `src/game/input.ts:26-40`.
- **Severity:** Low
- **Confidence:** Low
- **Likelihood:** Low. It needs Custom controls on the numpad, NumLock off, and the chamber screen's rail both overflowing (a short window) and holding keyboard focus.
- **Defect:** With NumLock off, the numpad's 8, 2, 4, 6, 7, 1, 9 and 3 send the codes `Numpad8` and so on, with the keys ArrowUp, ArrowDown, Home, End, PageUp and PageDown. These keys have the browser defaults that AGENTS.md says are suppressed for bound keys ("the arrows, ... Page Up/Down, Home, End"). The suppression list is checked against the code only, so a bound numpad key plays its game action and the browser also scrolls, for example the rail after its legend toggle was clicked.
- **Trigger:** Bind Numpad2 to Down under Custom, turn NumLock off, shrink the window until the rail overflows, click the legend heading, then press Numpad2.
- **Evidence / verification:**
  - Traced: no other listener calls `preventDefault` for these codes, and the keyup path has the same gap.
  - Not reproduced in a browser.
  - Uncertainties: whether the documented list was meant to cover these keys, and which element the browser scrolls.
- **Suggested fix:** Also treat a bound key as having a default when `event.key` is one of ArrowUp, ArrowDown, ArrowLeft, ArrowRight, PageUp, PageDown, Home or End.

### [a/boundary-and-encoding-cases/dialogs/custom-controls-dialog-overflows-short-viewport] The custom controls dialog is cut off with no scrolling in short windows

- **Location:** `src/components/custom_controls_dialog.vue:238` (rows "closer together, so all eight fit a short window"). Related: `src/components/dialog_frame.vue:143-167` (fixed, flex-centred backdrop, no `max-height` or `overflow`).
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. It needs a viewport under about 576 CSS px tall. Examples: a 1280×720 CSS screen (for example a 1080p laptop at 150% scaling) with the taskbar, tabs and bookmarks bar, or browser zoom. docs/hints.md lists 1280×720 among the target window sizes.
- **Defect:** The panel is about 640 CSS px tall. It is centred in a fixed backdrop that can't scroll, so in a shorter viewport the overflow goes off both edges. Below about 576 px the title and the Done button start to be cut off, and nothing lets the player scroll to them.
- **Trigger:** Open Settings → Controls → Custom in a viewport about 560 CSS px tall.
- **Evidence / verification:**
  - Measured in Chrome: the panel's bounding box is 639.6 px tall.
  - The refutation pass checked the height item by item and found no transformed ancestor or scroll container. It corrected the threshold from 640 px to about 576 px, because the panel's padding is cut off first.
  - Escape still closes the dialog, and Tab still reaches Done.
- **Suggested fix:** Let the backdrop scroll (`overflow-y: auto`) and centre the panel with `margin: auto` instead of flex alignment, so an oversize panel stays reachable. Or cap the panel's height to the viewport and let the list of controls scroll inside it.

### [a/state-and-lifecycle/chamber-map/no-redraw-on-pixel-ratio-change] The home menu's map isn't redrawn when the screen's pixel density changes

- **Location:** `src/components/chamber_map.vue:43` (`ResizeObserver` only). Related: `src/components/chamber_map.vue:37` (chamber watch), `src/components/screens/chamber_screen.vue:129-142` (the chamber screen watches the density with `matchMedia`).
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. It needs the window moved between monitors with different scaling while the Play map is shown.
- **Defect:** The map is drawn "at device resolution so it stays sharp", but it is redrawn only when its CSS size or the highlighted chamber changes. Moving the window to a monitor with another pixel ratio changes neither, so the map stays at the old resolution (blurry on a denser screen) until another chamber is highlighted. The chamber screen handles exactly this case.
- **Trigger:** Show Play with a chamber highlighted, then drag the window to a monitor with a different scale factor.
- **Evidence / verification:** Traced: a content-box `ResizeObserver` reports CSS-pixel changes only, and nothing else in `src/` watches the ratio for the map. Refutation pass found no other redraw path.
- **Suggested fix:** Watch the pixel ratio the way the chamber screen does (a `matchMedia` resolution query re-armed on each change), or observe with `box: 'device-pixel-content-box'`.

### [a/user-interface-state/chamber-row/start-sound-on-modified-click] A Ctrl/Shift/Cmd-click on a chamber row plays the start sound without starting it

- **Location:** `src/components/chamber_row.vue:30` (`@click="Sound.START.play()"`).
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. Modified clicks on menu rows are rare in a keyboard game.
- **Defect:** The row plays the start sound on every click. RouterLink ignores clicks with Ctrl, Shift, Meta or Alt held and leaves them to the browser, which opens the chamber in a new tab or window, so this tab plays the start sound while staying on the menu.
- **Trigger:** Ctrl-click (or Cmd-click) a chamber row in Play.
- **Evidence / verification:**
  - Traced: RouterLink's `guardEvent` returns early for modified clicks, while the parent's `@click` still runs.
  - Refutation pass: a middle click fires `auxclick`, not `click`, so only clicks with a modifier key held are affected.
- **Suggested fix:** Play the sound only for a click RouterLink will act on: plain left click, no modifier keys.

### [a/null-and-numeric-hazards/level-clock/unclamped-wall-clock-delta] The chamber clock follows wall-clock jumps, so a run can get a negative time and lose the best time

- **Location:** `src/game/level.ts:812` (`delta = (Date.now() - this.startTime) / 1000`). Related: `src/game/level.ts:483` (added unchecked), `src/game/level.ts:789-793` (only a visibility change resets the start), `src/services/format_time.ts`, `src/services/progress.ts:220-229` (`recordTime`), `src/services/progress.ts:74-90` (`isCount`).
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. It needs the system clock to step during a run (an NTP correction, a manual change, a VM resume), or a suspend that fires no `visibilitychange`.
- **Defect:** Each frame's time comes from the wall clock with no clamp.
  - A backward step lowers the run time, possibly below zero.
  - `formatTime(-5)` shows "-1:-1.-5".
  - On completion, `recordTime` stores a negative best time over the genuine one, the dialog says "New best time", and `time_ms` is negative. On the next visit `isCount` throws the negative value away, so the chamber has no best time at all.
  - A forward jump, or a suspend with no visibility event, adds the whole gap to the run.
  - The same file already treats gaps over a second as invalid for the frame rate (`FRAME_RATE_GAP_LIMIT`, "the computer asleep").
- **Trigger:** Set the system clock back a minute while a chamber's clock is running, then finish the chamber.
- **Evidence / verification:**
  - Traced from the frame loop to the progress record, and computed `formatTime(-5)` by hand.
  - Refutation pass found no clamp. The monotonic frame time is already passed to `onFrame` and isn't used for the clock.
  - Not reproduced in a browser.
- **Suggested fix:**
  - Take the clock's delta from the frame time (`performance.now()` / the rAF timestamp).
  - Clamp it to between 0 and a frame-gap limit, like the frame-rate stat's.
  - Have `recordTime` refuse negative times.

### [a/user-interface-state/home-menu/controls-column-stale-highlight] Stepping back into Controls lands on the last highlighted layout, not the one in use

- **Location:** `src/components/screens/home_screen.vue:316` (`highlightItem`). Related: `src/components/screens/home_screen.vue:326-329` (reset only when the Settings row changes), `:506-517` (`openDetail`), `:548-556` (step back).
- **Severity:** Low
- **Confidence:** High
- **Likelihood:** Low. It needs the layout highlight moved without picking, then a step out and back in.
- **Defect:** AGENTS.md: under Settings, "Right, Enter or a click steps in (on the layout in use)". The layout highlight is reset to the layout in use only when another Settings row is highlighted. Stepping into Controls, moving to the other layout without picking it, stepping back with Left and stepping in again focuses the stale layout. The same happens after closing and reopening Settings while Controls stays highlighted. Enter there puts the layout that isn't in use into use.
- **Trigger:** Settings → Controls → Right (Default is focused) → Down (Custom highlighted, not picked) → Left → Right: Custom is focused.
- **Evidence / verification:** Traced: neither the step back, `closeSection` nor `openDetail` resets `highlightedLayout`. Refutation pass: the stale row keeps its faint "chosen" bar, so the target is visible, but it still contradicts the contract.
- **Suggested fix:** Reset the layout highlight to the layout in use when the player steps back out of the Controls column or closes Settings. Don't reset it on the pointer path, which highlights a layout and then steps in.

### [a/repeated-and-interrupted-operations/chamber-completion/completion-lost-on-page-close-during-walk-out] Closing the page while the subject walks out of a finished chamber loses the completion and reports it abandoned

- **Location:** `src/components/screens/chamber_screen.vue:356` (`handlePageHide`). Related: `src/game/level.ts:584-586` (the completion waits for the walk-out), `src/game/level.ts:760-765` (told from a later frame), `src/components/screens/chamber_screen.vue:295-306` (`handleCompleted` is the only place progress is saved).
- **Severity:** Low
- **Confidence:** Medium
- **Likelihood:** Low. The window is the walk-out or the slide onto the exit, about 0.4 s or more after the completing press.
- **Defect:**
  - The press that completes the chamber stops the clock, but `onCompleted` (marking the chamber completed, recording the time, sending `chamber_complete`) is deferred until the walk-out or slide ends.
  - If the page is closed or reloaded in that window, `handlePageHide` sees no completion dialog and sends `chamber_abandon` for a run that reached the exit. Nothing records the completion or the best time.
  - AGENTS.md documents only that a load or a reset drops what a slide has waiting. Page close is not covered.
- **Trigger:** Finish a chamber and close or reload the tab before the subject has walked out of sight.
- **Evidence / verification:** Traced: the level keeps the completed state, but no persistence runs before `onCompleted`, and `pagehide` checks only the dialog. Refutation pass: Back and Escape during the wait are safe, because the waiting completion replaces those dialogs; closing the page has no handling.
- **Suggested fix:**
  - Expose whether the level's state is completed.
  - On `pagehide`, record the completion (completed flag, best time, `chamber_complete`) instead of an abandon when it is.
  - Guard against recording it a second time if the page comes back from the back/forward cache and `onCompleted` then fires.

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

| # | Severity | High | Medium | Low |
|---|----------|------|--------|-----|
| 1 | Medium | 1 | 0 | 1 |
| 2 | Low | 7 | 9 | 1 |

By Likelihood: High (0 findings), Medium (3 findings), Low (16 findings).
