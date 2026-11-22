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
