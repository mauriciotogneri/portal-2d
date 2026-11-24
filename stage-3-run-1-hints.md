# Run 1 hints

Tick a box when the step is implemented and verified.
Stage 3 of 3, after stage-2-hint-triggers.md.

## Goal and scope

The whole plan adds tutorial hints to Portal 2D: in a few early chambers, when the player reaches a chosen tile or spends some time without doing a chosen thing, the game pauses and a "spotlight" shows one element's tile with a short card explaining what that element is or does.

This stage adds the remaining hints that `docs/campaign.md` names for run 1, as entries in the hint list built in stage 2: steel and the ditch in Chamber 1, and the button in Chamber 3 (whose box hint stage 2 added). When it is done, every run 1 hint is live and documented.

## Out of scope

- Hints for Chambers 2 and 4, which `docs/campaign.md` gives none, and for any chamber after run 1: decided against (`docs/campaign.md` convention 7).
- Changes to how hints are shown or set off: stages 1 and 2. The one possible exception is a title override for the steel hint (see Open decisions).
- Changes to the chambers themselves: every run 1 chamber works on its layout alone (`docs/level_design.md` guideline 31), and no chamber is designed around a hint.

## Decisions

| # | Decision | Reason |
|---|----------|--------|
| 1 | A hint only explains what an element is or does, never how to solve, and hints exist only in run 1 (Chambers 1 to 4); the lit tile is always that element's tile | `docs/level_design.md` guideline 31 and `docs/campaign.md` convention 7; the author kept them |
| 2 | Chamber 1 gets a steel hint and a ditch hint; Chamber 3 gets a button hint beside its box hint | `docs/campaign.md`'s run 1 table, "Hint (if built)" column |
| 3 | Each hint is either a tile hint (shown when the subject stands on its trigger tile) or a timer hint (shown when the chamber clock, which starts at the first move, shot or interact, reaches its seconds, unless its cancelling game event has happened in the attempt) | Built in stage 2 |
| 4 | Each hint names the tile it lights; a tile hint also names its trigger tile; any hint may name a cancelling event, a timer hint must | Built in stage 2 |
| 5 | Each hint shows once per player, ever, and has a permanent id, unique within its chamber, that is stored and sent to analytics | Built in stage 2 |
| 6 | Slides and portal crossings may carry the subject past a trigger tile; trigger tiles are chosen with that in mind | The author accepted it |
| 7 | As little text as will do: the shorter and clearer, the better | The author's rule (2026-11-22) |
| 8 | One hint at a time; hints set off by the same step show in list order | Built in stage 2 |
| 9 | Which tiles, seconds, cancelling events and texts each hint gets is decided with the author, per hint | Content is the author's |

## Facts checked in the code

Checked on 2026-11-24.

- `docs/campaign.md`'s run 1 table names the hints: Chamber 1 "Steel, ditch", Chamber 2 none, Chamber 3 "Button, box", Chamber 4 none.
- Chamber 1 (`src/chambers/chamber_1.json`) holds walls, steel (`blockedWalls` entries with no link, which never take a portal), ditches (`ditches`) and the exit. Chamber 3 (`src/chambers/chamber_3.json`) holds one box, one button (`buttons`, linked to a door), one door and an antline.
- The chamber sign names steel "Blocked wall" (the names are in `src/components/chamber_sign.vue`, shared from `src/services/element_names.ts` after stage 1); there is no "Steel" string in `src/`, while `docs/campaign.md` calls it steel.
- Useful cancelling events for these hints exist in `src/game/game_event.ts`: `bluePortalOpened`, `orangePortalOpened`, `refused` (also a shot that missed, for example on steel), `crossed`, `buttonPressed`, `doorOpened`.
- Unverified until stage 2 is built: the exact field names of a hint entry in `src/services/hint_catalogue.ts`.

## What the user sees

1. In Chamber 1, a new player who meets the steel or the ditch (by the trigger chosen for each) gets a hint lighting that tile, saying what it does, until Enter.
2. In Chamber 3, the button hint and the box hint each show once, on their own triggers; if both are set off by the same step, one follows the other.
3. None of them ever shows again for that player, until Reset progress.

## Phases

## Phase 1 — Chamber 1: steel and ditch

Chamber 1's two hints are live.

- [ ] **Choose them with the author.** For each, propose the trigger (tile or timer), its trigger tile or seconds, its cancelling event, the lit tile and a short text; for steel, also whether its title is "Blocked wall" (the sign's name) or "Steel" (see Open decisions). Send the author proposals, not routes: never describe the chamber's solution. Check: the author's answers, recorded in `docs/hints.md`.
- [ ] **Title override, only if the author wants "Steel".** Give hint entries an optional title used instead of the element's name, shown on the card. Check: `npm run build`.
- [ ] **Add them.** Entries under Chamber 1's permanent id (1) in `src/services/hint_catalogue.ts`, ids `steel` and `ditch`. Check: `npm run chamber:check`.
- [ ] **Verify.** As a new player (Reset progress first), in the browser (`npm run dev`, new Chrome tab, sound muted as `AGENTS.md` says): each hint shows on its trigger, lights the right tile and reads in full at 1920 × 1080 and 1280 × 720; a cancelling event stops a timer hint; neither shows again after Restart chamber. Send the author the chamber's address to try them.

## Phase 2 — Chamber 3: button

Chamber 3's button hint is live beside its box hint.

- [ ] **Choose it with the author.** Propose the button hint's trigger, tile or seconds, cancelling event (for example `buttonPressed`), lit tile and text, and its order against the box hint in the list. Check: the author's answer, recorded in `docs/hints.md`.
- [ ] **Add it.** Its entry under Chamber 3's permanent id (3), id `button`, placed in list order. Check: `npm run chamber:check`.
- [ ] **Verify.** As a new player, play Chamber 3: each hint shows once on its trigger; if both trigger together, they show one after the other; neither shows again after Play again. Send the author the chamber's address to try it.

## Phase 3 — Docs

The docs list every run 1 hint.

- [ ] **`docs/hints.md`.** List each hint (chamber, id, element, trigger, cancelling event, text) and remove what is no longer open. Check: re-read against `src/services/hint_catalogue.ts`.
- [ ] **`docs/campaign.md`.** Make the run 1 table's hint column match the hints built. Check: re-read.
- [ ] **Verify.** `npm run verify` passes; run the `delta-review` skill on the files changed in this stage if any code changed (the title override).

## Tests

The project has no test suite by design.

- `npm run chamber:check` after each new entry: the lit tiles hold their elements, the trigger tiles are inside their chambers, ids are unique.
- Manual browser play as a new player for each hint, at 1920 × 1080 and 1280 × 720.
- The author's own play of Chambers 1 and 3.
- `npm run verify` at the end of the stage.

## Risks

- **A hint that solves.** A text or a lit tile that points at the route breaks guideline 31. Notice: read each text asking "does it say what the element does, or what to do?".
- **A trigger tile skipped.** A slide or a portal crossing can carry the subject past a trigger tile. Notice: when choosing a tile, check that every route into that part of the chamber stops on it, or use a timer hint.
- **Steel's name.** The card's title comes from the sign ("Blocked wall"), while the campaign calls it steel; a player may not connect the two. Notice: the author's look in phase 1.
- **Unverified:** whether the hint entry's fields from stage 2 differ from what this file names; follow `src/services/hint_catalogue.ts`.

## Open decisions

- **Each hint's trigger, seconds, cancelling event and text.** Deferred to the author, per hint, when proposed in phases 1 and 2. Recommendation: timer hints for players who stall, cancelled by the event that shows the element was understood (for the button, `buttonPressed`); a tile hint only where every player should read it first.
- **Steel's title.** Deferred until the author sees the card. Options: "Blocked wall", the sign's name, which needs nothing built; or "Steel", the campaign's word, which needs the optional title override in phase 1. Recommendation: "Blocked wall", so the card and the sign agree.

## Done when

- [ ] Chamber 1's steel and ditch hints and Chamber 3's button hint are in `src/services/hint_catalogue.ts`, and `npm run chamber:check` passes.
- [ ] Each shows once to a new player on its trigger, lights its element's tile and never shows again for that player until Reset progress.
- [ ] `docs/hints.md` and `docs/campaign.md` list exactly the hints built.
- [ ] `npm run verify` passes.

## Go/no-go points

- **The author's play of Chamber 1.** If the steel or ditch hint feels like it gives the chamber away, it is dropped or turned into a timer hint before Chamber 3's button hint is added.
