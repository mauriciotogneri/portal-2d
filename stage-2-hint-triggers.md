# Hint triggers

Tick a box when the step is implemented and verified.
Stage 2 of 3, after stage-1-hint-display.md, before stage-3-run-1-hints.md.

## Goal and scope

The whole plan adds tutorial hints to Portal 2D: in a few early chambers, when the player reaches a chosen tile or spends some time without doing a chosen thing, the game pauses and a "spotlight" shows one element's tile with a short card explaining what that element is or does.

This stage makes hints reach players. When it is done:

- A hint list, outside the chamber files and keyed by each chamber's permanent id, says which hints a chamber has, what each lights and says, and what sets it off.
- The chamber screen sets hints off by the two triggers, one at a time, and never shows a hint the player has already seen.
- Seen hints are stored in the player's progress and forgotten by Reset progress.
- The game sends a `hint_shown` analytics event.
- `npm run chamber:check` checks the hint list against the chambers.
- One real hint is live: Chamber 3's box hint.
- The player-facing docs describe hints.

## Out of scope

- The display itself (spotlight, card, keys): built in stage 1.
- The other run 1 hints (steel and ditch in Chamber 1, the button in Chamber 3): stage 3.
- Hints outside run 1 (Chambers 1 to 4), in playground chambers, or about anything but an element: decided against.
- A way to read a hint again, a hint-closed analytics event, lighting several tiles at once: decided against or not needed.
- Any change to the game's rules (`src/game/rules/`), the chamber files or the recorded solutions: hints must not change them.
- Noticed and left alone: `src/services/analytics.ts` lines 136-140 have identical `if (name === 'exception')` and `else` branches.

## Decisions

| # | Decision | Reason |
|---|----------|--------|
| 1 | A hint only explains what an element is or does, never how to solve, and hints exist only in run 1 (Chambers 1 to 4); the lit tile is always that element's tile | `docs/level_design.md` guideline 31 and `docs/campaign.md` convention 7; the author kept them |
| 2 | Two triggers. A tile hint shows when the subject stands on its trigger tile after a step. A timer hint shows once the chamber clock reaches its seconds, unless its cancelling event has happened in this attempt | The author's two cases: a player arriving somewhere, and a player stuck for a while |
| 3 | The time counted is the chamber clock: it starts at the first move, portal shot or interact, and stops while paused or while a hint shows | The author's choice: count from when the player starts moving |
| 4 | A timer hint's "certain action" is one game event the rules already report (for example `boxPickedUp`, `crossed`, `buttonPressed`), counted if it happened at any time in the current attempt | Nothing new in the rules; covers run 1's elements |
| 5 | Slides and portal crossings may carry the subject past a trigger tile without stopping on it; trigger tiles are chosen with that in mind | The author accepted it rather than tracking every tile a step passes |
| 6 | Each hint shows once per player, ever: it is stored as seen when the player closes it. A restart (Restart chamber, Play again) resets the clock and the events seen in the attempt, but never brings back a seen hint. Reset progress forgets every seen hint | The author chose once per hint over "until the chamber is first completed", so a returning player is never interrupted again |
| 7 | One `hint_shown` analytics event when a hint appears, with the chamber and the hint's id | Shows where players stall; event and parameter names are permanent once sent |
| 8 | A seen hint can't be read again | Nothing to build; Enter-only closing makes losing one unread unlikely, and Reset progress brings them all back |
| 9 | Each hint names the tile it lights; a tile hint also names its trigger tile, which may differ | The trigger is where the player arrives; the light is on the element |
| 10 | Any hint may name a cancelling event (a box hint is skipped if the box was already picked up); a timer hint must name one | A hint about something the player has already done is noise |
| 11 | Leaving the chamber while a hint shows leaves it unseen | It is stored only when closed with Continue |
| 12 | One hint at a time; hints set off by the same step show in list order, one after the other | The card covers one tile at a time |
| 13 | Each hint has a permanent id, unique within its chamber and never reused | It is stored and sent to analytics |
| 14 | The hint list lives in its own file, keyed by the chamber's permanent id, outside the chamber files; `npm run chamber:check` fails when a lit tile no longer holds its element or a trigger tile is outside the chamber | Chamber files and their recorded solutions stay untouched; a chamber edit that moves an element is caught |
| 15 | No hint in playground chambers, and none once the step that completes the chamber has been taken | Playground chambers keep no progress; a hint over the walk-out would be pointless |
| 16 | Which hints, tiles, seconds and texts each chamber gets is decided per chamber, with the author; `docs/campaign.md` names steel and ditch hints for Chamber 1 and button and box hints for Chamber 3 | Content is the author's |
| 17 | Only Enter, or a click on Continue, closes a hint, after its first half second; Escape does nothing while it shows | Built in stage 1; repeated here because the docs of this stage describe them |

## Facts checked in the code

Checked on 2026-11-24.

- `Level` (`src/game/level.ts`) tells the screen only of completion (`onCompleted`, line 138). Every press taken becomes one step in `applyStep` (550-598), which has the state before and after and the step's events (`result.events`), including a slide's, before their sounds are held back for drawing. The screen already sets `paused` from inside `onCompleted`, which `Level` calls during a frame, so pausing from a step callback has a precedent.
- The clock starts on `CLOCK_START_KEYS` (`level.ts:83-91`: the four moves, both portals, interact), grows only while unpaused (481-487) and is read as `elapsedHundredths`. The screen reads it every animation frame in `refreshTimer` (`src/components/screens/chamber_screen.vue:154-164`).
- A load (`level.load`, used by mount, Restart chamber and Play again through `restartChamber`, `chamber_screen.vue:223-228`) resets the clock and the counts.
- The game's events are a string union in `src/game/game_event.ts` (for example `bluePortalOpened`, `crossed`, `boxPickedUp`, `boxPutDown`, `buttonPressed`, `doorOpened`, `exitReached`).
- Progress (`src/services/progress.ts`): key `portal-2d.progress`, `{version: 4, chambers: {"<id>": {completed, bestTime, attempts}}}`; each field falls back on its own and unknown fields are dropped (lines 83-92); other tabs take over a saved record through the `storage` event (138-143); `resetProgress()` (248-251) stores an empty record and is called only from the home screen's Reset progress (`src/components/screens/home_screen.vue:826-830`).
- Analytics (`src/services/analytics.ts`): names are a private `EventName` union (lines 23-38); each event has an exported `track*` function; chamber events share `chamber_id`, `chamber_number` (`chamberParams`, 152-157) and `attempt` (`runParams`, 165-170); development builds only log `[analytics] <event>` and its parameters to the console. The chamber screen sends chamber events only for campaign chambers (`chamber.value` is undefined for playground chambers, line 64).
- Chamber check (`scripts/check_chambers.ts`, run by `npm run chamber:check` under `tsconfig.scripts.json`): each check collects problems, prints `<label> OK` or `<label> FAILED` with each problem, and `runAll()` (516-567) chains them; a chamber is compiled for tile checks as `checkOutsideEdge` does (296-304). A file the scripts reach must be in `tsconfig.scripts.json`'s `include`, and may use nothing of Vite or Vue.
- `CompiledChamber` (`src/game/rules/compiled_chamber.ts`): `width`, `height` (251-252), `elementAt(kind, x, y)` for placed elements (622; every tile of a blocked-wall rectangle), and the boxes' start tiles. Steel is a `blockedWalls` entry with no link.
- Chamber 3 (`src/chambers/chamber_3.json`) holds one box, one button, one door and an antline.

## What the user sees

1. A player opens Chamber 3 for the first time and starts moving; the chamber clock runs.
2. When the box hint's trigger is met (its tile reached, or its seconds passed without its cancelling event), the game pauses, the screen darkens except the box's tile, and the card explains the box.
3. The player presses Enter; the hint fades and play carries on.
4. Restarting the chamber, playing it again or reloading the page never shows that hint again.
5. After Reset progress in the home menu, the hint shows again as for a new player.
6. In a playground chamber, or once the step onto the exit is taken, no hint shows.

## Phases

## Phase 1 — The hint list and its check

The list exists, empty, and `npm run chamber:check` checks it.

- [ ] **The list.** New `src/services/hint_catalogue.ts`, plain TypeScript using nothing of Vite or Vue: a hint type (permanent `id`, the `element` kind it explains as an element-registry kind but wall and exit, the lit `tile`, a `trigger` that is either a trigger tile or a number of seconds, an optional `cancelledBy` game event required for a timer hint, the `text`), the hints keyed by permanent chamber id (empty for now), and a function returning a chamber's hints in order. Add the file to `tsconfig.scripts.json`'s `include`. Check: `npm run build`.
- [ ] **The check.** In `scripts/check_chambers.ts`, a check run from `runAll()` after the catalogue check: every chamber id in the hint list belongs to a chamber in `src/services/chamber_catalogue.ts`; hint ids are unique within their chamber; each lit tile holds its element (a box's start tile for a box, `elementAt` for the others); each trigger tile is inside the chamber; each timer hint has seconds above 0 and a cancelling event. Update the file's header comment. Check: `npm run chamber:check` passes; a temporary wrong entry (lit tile off its element, trigger outside the chamber, duplicate id) fails with one clear problem each, then is removed.
- [ ] **Verify.** `npm run lint:fix`, `npm run build`, `npm run chamber:check`.

## Phase 2 — Seen hints in the progress record

The progress record remembers which hints a player has seen.

- [ ] **Store them.** In `src/services/progress.ts`, each chamber's record gains `hintsSeen`, a list of hint ids, read like the other fields (a list of strings, otherwise empty), with no version change, so existing progress keeps reading. Add `hasSeenHint(chamber, hintId)` and `markHintSeen(chamber, hintId)`, with JSDoc. Reset progress already stores an empty record, which forgets them. Check: `npm run build`.
- [ ] **Verify.** In the browser console of `npm run dev`, an existing `portal-2d.progress` value still reads (best times shown in the home menu unchanged) after the change.

## Phase 3 — The game reports each step

The chamber screen hears of every step with the subject's tile and the step's events. The rules don't change.

- [ ] **Step callback.** In `src/game/level.ts`, an `onStep` callback (like `onCompleted`), called at the end of `applyStep` with the subject's tile after the step, the step's events and whether the chamber is now completed. Not called by a load. JSDoc on the field and the report's type. Check: `npm run build`; `npm run replay:check` passes unchanged.
- [ ] **Verify.** `npm run lint:fix`, `npm run build`, `npm run replay:check`.

## Phase 4 — Triggers on the chamber screen

Hints from the list show when their trigger is met, one at a time, and are stored when closed.

- [ ] **Per attempt.** In `chamber_screen.vue`, keep the events seen in this attempt and the hints waiting to show, both cleared at every load (mount, Restart chamber, Play again). Only a campaign chamber has hints. Check: `npm run build`.
- [ ] **Tile hints.** In the step callback: when the chamber is completed, do nothing; otherwise add the step's events to those seen, and queue, in list order, each tile hint whose trigger tile is the subject's tile, not seen (`hasSeenHint`), not waiting, and whose cancelling event hasn't been seen. Check: below.
- [ ] **Timer hints.** In `refreshTimer`, while no dialog is open and the chamber isn't completed: queue each timer hint whose seconds the clock has reached, under the same conditions. Check: below.
- [ ] **Show and store.** Show the first waiting hint (stage 1's hint state) when no dialog is open, sending `hint_shown`; on Continue, `markHintSeen`, then show the next waiting hint or resume. A waiting hint whose cancelling event has since been seen is dropped. Check: below.
- [ ] **Analytics.** In `src/services/analytics.ts`, add `hint_shown` to `EventName` and `trackHintShown(chamber, attempt, hintId)`, sending the chamber events' shared parameters (`chamber_id`, `chamber_number`, `attempt`) and `hint_id`. Check: the development console logs `[analytics] hint_shown` with them.
- [ ] **Verify.** `npm run lint:fix`, `npm run build`; then a temporary hint on Chamber 1 (one tile hint and one timer hint, removed afterwards), tried in the browser (`npm run dev`, new Chrome tab, sound muted as `AGENTS.md` says): each shows on its trigger; the timer doesn't count before the first move or while paused; the cancelling event stops the timer hint; closed hints never show again after Restart chamber or a reload; Reset progress brings them back; no hint on the step onto the exit; none in Playground 1; `hint_shown` logged once per showing.

## Phase 5 — Chamber 3's box hint

The first real hint is live.

- [ ] **Choose it with the author.** Propose the box hint's trigger (tile or timer), its trigger tile or seconds, its cancelling event and a short text; the author picks (see Open decisions). If the text names a key, settle how before writing the entry. Check: the author's answer, recorded in `docs/hints.md`.
- [ ] **Add it.** Its entry in `src/services/hint_catalogue.ts` under Chamber 3's permanent id (3), id `box`. Check: `npm run chamber:check`.
- [ ] **Verify.** In the browser, as a new player (Reset progress first): play Chamber 3 until the hint shows, read it at 1920 × 1080 and 1280 × 720, close it, finish the chamber; play it again: no hint. Send the author the chamber's address to try it.

## Phase 6 — Docs

Every doc describes hints as built.

- [ ] **`docs/interface.md`.** "Chamber screen" (hints, their triggers, one at a time), "Keys" and "Dialogs" (Enter-only closing after half a second, Escape doing nothing, the card's keyboard), "Saved data" (the progress record's `hintsSeen`, forgotten by Reset progress), "Analytics" (`hint_shown` and its parameters, in the chamber events' form), "Look" (the spotlight and card). Check: re-read beside the code.
- [ ] **`AGENTS.md`.** The Game/Vue boundary paragraph (the screen reads `chamberWidth` and `chamberHeight`, gets `onStep` back), Keyboard ownership (the hint's keys), Persistence (seen hints in the progress record), the `chamber:check` description (the hint list check), the layout lines (`docs/hints.md` no longer "designed but not built"). Check: re-read.
- [ ] **The other docs.** `docs/game_summary.md` "Screens" (hints on the chamber screen); `docs/level_design.md` guideline 31 (hints built, still a backup, still never how to solve); `docs/campaign.md` convention 7 and the run tables' "Hint (if built)" headings; `docs/hints.md` (built, how to add a hint, Chamber 3's box hint). Check: `grep -rn "not built\|if built" docs AGENTS.md` finds nothing about hints.
- [ ] **Verify.** `npm run verify` passes; run the `delta-review` skill on the files changed in this stage.

## Tests

The project has no test suite by design.

- `npm run lint:fix` and `npm run build` after each phase.
- `npm run chamber:check`: the new hint list check, plus temporary wrong entries to see it fail.
- `npm run replay:check`: must pass unchanged, since the rules and the chambers don't change.
- Manual browser checks in phases 4 and 5 (triggers, cancelling, storing, Reset progress, playground, completion, analytics console output).
- `npm run verify` at the end of the stage, and the `delta-review` skill.

## Risks

- **A hint during a step being drawn.** A tile hint opens right after the step is taken, so the subject's glide or a slide finishes under the darkening, with its sounds. Notice: phase 4's browser check. Acceptable unless it looks wrong.
- **Leaving with Back cancelled.** Browser Back while a hint shows opens the exit confirmation in its place; cancelling it leads to the pause menu, then play, and the hint, never stored, can show again on its next trigger (a timer hint at once). Notice: phase 4. Acceptable.
- **A box hint after the box has moved.** The lit tile is the box's start tile; if the box was moved without its cancelling event happening, the light falls on an empty tile. Notice: choose `boxPickedUp` as the box hint's cancelling event.
- **An older build in another tab** drops the unknown `hintsSeen` field when it saves progress, forgetting seen hints. Unlikely; the cost is a hint shown again.
- **Storage blocked.** Seen hints can't be stored, so they show again on each visit. Accepted, as for progress.
- **Permanent names.** `hint_shown`, `hint_id` and each hint's id can't be renamed once production sends them. Notice: review them before the first deploy.

## Open decisions

- **Chamber 3's box hint content.** Deferred until the author sees proposals in phase 5. Options: a timer hint (for example 20 seconds, cancelled by `boxPickedUp`), which reaches only a stuck player; or a tile hint beside the box, which every new player sees. Recommendation: the timer hint, as hints are a backup for players who don't know how to progress.
- **Naming the interact key in a text.** A box hint may need to say which key picks a box up, and players can rebind it. Options: name no key ("the interact key, shown in the controls legend"), which needs nothing built; or fill the player's own key into the text from their bindings, which adds a placeholder step in phase 5. Recommendation: name no key, as the legend already shows it.

## Done when

- [ ] `src/services/hint_catalogue.ts` holds Chamber 3's box hint, and `npm run chamber:check` checks the list.
- [ ] A tile hint shows when the subject stands on its trigger tile; a timer hint shows when the clock reaches its seconds unless its cancelling event happened in the attempt.
- [ ] A closed hint never shows again, after a restart, Play again or a reload; Reset progress brings it back.
- [ ] No hint shows in playground chambers or after the step that completes a chamber.
- [ ] `hint_shown` is logged in development with `chamber_id`, `chamber_number`, `attempt` and `hint_id`.
- [ ] The rules, chamber files and recorded solutions are unchanged; `npm run verify` passes.
- [ ] The docs listed in phase 6 describe hints as built.

## Go/no-go points

- **The author's play of Chamber 3's box hint.** If a timer hint feels intrusive or too late, the seconds change (data only); if hints feel wrong as a whole, stage 3 stops.
