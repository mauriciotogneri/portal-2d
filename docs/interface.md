# Interface

Everything around the chamber itself: the screens, the menus and dialogs, the keys, the sounds and the music, what the device keeps, the analytics events and how each screen looks. The rules are in `docs/elements.md`, how the chamber is drawn and animated in `docs/sprites.md`, and the whole game in plain words in `docs/game_summary.md`. `AGENTS.md` keeps the rules for changing any of this.

## Screens

| # | Screen | Address | What it is |
|---|--------|---------|------------|
| 1 | Loading | Any, first | The first screen of every visit, on a desktop: it downloads the game's files, then waits for Start (see [loading screen](#loading-screen)) |
| 2 | Home | `/` | The menu, on a test room's wall (see [home menu](#home-menu)); any address the game doesn't know goes here |
| 3 | Chamber | `/chamber/N` | A chamber of the campaign, N its place in the play order, counted from 1; `/chamber/0` and a number with no chamber go home (see [chamber screen](#chamber-screen)) |
| 4 | Playground chamber | `/playground/N` | A playground chamber, in the chamber screen; `/playground`, `/playground/0` and a number past the last go home. Production builds leave out the home menu's section, so there the address is the only way in, for sharing test chambers |

Touch-first devices (`pointer: coarse`) get the desktop-only notice instead of the app.

## Home menu

The home screen has no game running, so the menu reads the keys itself (`event.key`, so the numpad's arrows follow it even with NumLock off). The first column holds the sections: Play, Settings and About, after Playground in development. Opening a section shows its rows in a second column, and the highlighted row's map, pages or changelog in a third.

Play lists only the chambers the player has reached: from Chamber 1 up to the one after the furthest chamber completed, so a first visit (or one after Reset progress) lists Chamber 1 alone, each completion of the furthest adds the next, and completing the last lists them all. A chamber completed past a gap (one skipped through its address, or a chamber remade under a new id) keeps every chamber before it listed. The list shows no row or hint for the chambers not yet listed (the chamber sign still counts them all, as in "03/10"), and their addresses still open them. The list follows the progress as it changes, another tab's included: when it shortens, a highlight past its end moves to the first chamber not yet completed. Development builds list by the same rule.

Getting around:

- Up and Down move the highlight within the column that has the keyboard, wrapping around; in the first column they change nothing else.
- Right or Enter opens the highlighted section and steps into it; Left, Escape or Backspace closes it again.
- Until any chamber has been opened on this device (no chamber has an attempt in the progress, so again after Reset progress), Enter, Space or a click on Play starts Chamber 1 (permanent id 1, the tutorial run's first chamber) instead, with the start sound, and Right still opens the chamber list.
- A chamber list scrolls on its own: as the highlight moves, the list glides over 160 ms, eased out, to keep one more row in view beyond the highlighted one (at once with `prefers-reduced-motion`), and a wheel turn stops the glide. Opening Play or Playground and coming back from a chamber show the highlighted row at once, and the pointer highlighting a row never scrolls the list.
- The menu's keys with Alt, Ctrl or Meta are left to the browser. Space presses any row but a link (a chamber, a playground chamber, a page, Feedback), where it does nothing.
- Each column is one Tab stop (its highlighted row, or the changelog), and a held (repeating) Enter is ignored, so it can't carry over from the previous screen.
- Moving the pointer onto a row (not a row appearing under a still pointer) highlights it and gives its column the keyboard, in any column; clicking a section opens it like Enter.
- While a dialog is open, the menu ignores every key but Escape, which closes the dialog.

Arriving:

- The first arrival shows only the sections, with Play highlighted and focused but not open; back from a chamber, Play is open with that chamber highlighted and focused, or the first chamber not yet completed when Play doesn't list it (opened by its address).
- Opening Play highlights the first chamber not yet completed, or the first chamber when all are.
- In development the first column starts with Playground, a section like Play: Right, Enter, Space or a click opens it and steps into its rows, Playground 1 to 12, on the one highlighted last (Playground 1 at first), with the highlighted one's map in the third column. The first arrival highlights and focuses Playground instead of Play, with nothing open, and back from a playground chamber, Playground is open with that chamber highlighted and focused. Production builds have no Playground row: back from a playground chamber, reached by its address, the menu is as on the first arrival.

The sections:

- **Play:** a row per chamber, with its best time and a figure that turns green once it is completed, and the highlighted chamber's map in the third column.
- **Settings:** the sound effects and music volumes, then Controls, then Reset progress.
  - On a volume, Left and Right step it down or up by 10, from Off (0) to 100, held keys repeating, instead of stepping back or in (Escape and Backspace still step back), and Enter and Space do nothing.
  - The Controls row's third column starts level with it: Default and Custom. Right, Enter or a click steps in (on the layout in use), and Left, Escape or Backspace steps back. Enter, Space or a click on a layout puts it in use; on Custom it also opens the [custom controls dialog](#dialogs).
  - Reset progress opens a confirmation; confirmed, it stores an empty progress record.
- **About:** More games (pages of the author's other games), Changelog, Valve's Portal and Feedback. The third column follows the highlighted row (the list of pages, or the changelog; Valve's Portal, which opens its page in a new tab, and Feedback show none). Right, Enter or a click steps into the pages or the changelog (where Up and Down scroll it), and Left, Escape or Backspace steps back to the About row. A page opens in a new tab and Feedback opens the mail app.

## Chamber screen

The chamber on a dark stage, beside a rail holding the chamber sign (its number, its place in the list, the timer and a pictogram for each kind of element) and the controls legend (see [look](#look)).

- **Escape** (not a held repeat) opens the pause menu, closes it, steps back from the settings or the restart or exit confirmation to it, and does nothing on the completion dialog or over a hint.
- **Browser Back** opens the exit confirmation (in a hint's place too), and leaves once it is confirmed or the chamber is finished. Leaving adds no history entry, so Back from home never re-enters the chamber: a confirmed Back, Forward or jump through the history menu finishes its own move, and Exit chamber and Back to menu go back to the home entry behind the chamber when it belongs to this page load, or else put home in the chamber's place.
- **The clock** starts on the first press of a move, portal or interact key after a load (one that only turns included), counts only unpaused frames and skips the time a tab spent hidden. It stops at the press that completes the chamber, though the completion dialog may wait for a slide and waits for the walk-out past the exit to end (`docs/sprites.md`, "Steps").
- **The pause menu:** Continue, Settings (the sound effects and music volumes), Restart chamber and Exit chamber; restarting or leaving asks for confirmation first.
- **The completion dialog:** the time and the best time (or "New best time"), with Next chamber, Play again and Back to menu (after the last chamber, Back to menu is the main button and there is no Next chamber); in development also Download solution (`AGENTS.md`, "Recorded solutions").
- **Tutorial hints** (`docs/hints.md`): a few chambers of the first run have hints, each explaining one element, listed by the chamber's permanent id in `src/services/hint_catalogue.ts` (for now four: Chamber 1's ditch and steel hints and Chamber 3's button and box hints). A hint pauses the game, the clock with it, and shows the spotlight on the element's tile with a card beside it (keys under [dialogs](#dialogs), look under [look](#look)). What sets one off:
  - A tile hint: the subject standing on its trigger tile after a step. A slide or a portal crossing that carries the subject past the tile without stopping there doesn't count.
  - A timer hint: the clock reaching its seconds, so it counts only play time, from the first press.
  - A hint may name a game event (a timer hint always does). Once that event has happened in the attempt, since the last load, the hint doesn't show, and is dropped if it was waiting to. Chamber 1's ditch hint shows at 10 seconds and its steel hint at 20, each unless the subject has come out of a portal; Chamber 3's button hint shows the first time the subject stands in front of the door unless the box has been put down, and its box hint at 10 seconds unless the box has been picked up.
  - Hints set off together show one at a time, in the list's order.
  - Each shows once per player: closing it stores it as seen ([saved data](#saved-data)), so Restart chamber, Play again and a reload never bring it back, and Reset progress does. Leaving while one shows leaves it unseen, and a hint whose exit confirmation is cancelled can show again on its next trigger (a timer hint at once).
  - None shows in a playground chamber, nor once the step that completes the chamber has been taken.
- **The legend** folds away, or opens, by a click on its heading, which doesn't take the keyboard, or by Tab and Enter, and stays as it was left between visits. Its keys are re-read from the player's layout when it appears.
- **A playground chamber** (opened from the home menu in development, by its address alone in production) keeps no progress or best time, shows no hint, sends none of the chamber events (in production the app-wide ones, such as a volume change or an error, still go) and offers no Download solution. Its sign shows its number and the list's count ("03/11"; a screen reader hears "Playground 03 of 11"), and its completion dialog offers Next chamber to the next playground chamber, none after the last.
- **The performance view** (development only): the frame loop's numbers, refreshed about once a second (`docs/performance.md`).

## Dialogs

While any dialog is open the game is paused and its input is ignored, and the dialog's buttons get the keyboard (`dialog_frame.vue`):

- The first action is focused. Up and Down (stacked actions) or Left and Right (actions in a row, the confirmation's) and Tab move between actions; the other two arrows do nothing.
- A held (repeating) Enter or Space presses nothing and a held arrow moves nothing, so a move key held into a dialog, such as one kept down while walking out of the exit, can't act in it.
- Resuming the game forgets every press still waiting and every key held.

A hint's card (`hint_spotlight.vue`, which doesn't use `dialog_frame.vue`) has one button, Continue, which holds the keyboard:

- Only Enter (not a held repeat) or a click on Continue presses it, and nothing does for the hint's first half second, since a hint shows only once and closing it by accident would lose it.
- Space (the default interact key) and Tab do nothing, a click off the card does nothing, and Escape does nothing while it shows; the player presses Enter, then Escape, to reach the pause menu.
- Pressed, Continue shows pressed for a moment, everything fades out and the game carries on; with reduced motion it goes at once.

The pause menu's Settings, under Continue, lists the same two volumes as the home menu's Settings: Left and Right step them, Up and Down move between them and Done, and Escape or Done goes back to the pause menu, on Continue.

The custom controls dialog (`custom_controls_dialog.vue`) opens from Custom under Settings: one row per game key, then Done, with the labels re-read from the layout as it opens.

- Enter, Space or a click on a key's row waits for its next key. While it waits, every keydown is taken before the dialog and the screen see it (so Ctrl and Shift can be bound), and a held key's repeats are ignored.
- The key pressed is bound, and a game key that held it takes the old one. Binding edits Custom.
- Escape cancels silently. A key that can't be bound shows "Can't use" and the key's name, and keeps waiting; so does a key held by a game key other than the portals while the waiting row is a portal on a mouse button, since the swap would hand that game key the button.
- While a portal's row waits, a left or right click on that row binds that mouse button (the browser's context menu never opens over a portal's row). Any other click anywhere, the waiting row included, cancels, and the release of a taken key and the click on the waiting row are kept from pressing the row again.
- Screen-reader status lines announce the layout put in use, and the dialog's wait, refusals and binds.

## Keys

- The game's `Input` owns the keys bound to its game keys (`src/game/key_bindings.ts`), read by physical position (`KeyboardEvent.code`), so they stay in place on every layout.
- The player picks a layout of controls under Settings: Default (the arrows, A and D (portals) and Space (interact)) or Custom (their own, set in its dialog, starting from Default the first time it is picked).
- Under Custom, each portal can be bound to the left or the right mouse button instead of a key; no other game key can. A bound button's press anywhere in the window, while playing, is that portal's press, one per click however long it is held, queued with the keys' presses in arrival order, and `Input` then suppresses its default (selecting text, moving the focus), so a click on the legend's heading also shoots. A click with Alt or Meta held is left to the browser and doesn't play. While playing with the right button bound, the browser's context menu doesn't open, unless Alt or Meta is held. The pointer's movement plays no part. The legend and the custom controls dialog show a bound button as a small mouse with that button filled in the portal's colour.
- A move key turns the subject to face that way, and moves it when it already faces that way; there is no turn key (it was Shift until 2026-11-24, when playtesters expected a move key to turn first).
- One key per game key, never shared; a left/right modifier pair counts as one key. Escape, Tab, Alt, Meta and the F-keys can't be bound. Held keys repeat with the key's auto-repeat, so a held move key the subject faces another way turns at once and walks only from its first repeat.
- While playing, `Input` calls `preventDefault`, on keydown and keyup, only for bound keys with a browser default (the arrows, Space, Page Up/Down, Home, End, Enter, Numpad Enter, the keys where a US keyboard has / and ', and any key that types Firefox's quick-find / or ' on the player's layout), and for every bound key with Ctrl held (Ctrl+A would select the page, Ctrl+D bookmark it), never with Alt or Meta held. A key pressed with Alt or Meta held is left to the browser and doesn't play.
- Keys are shown with the label the player's layout prints (`navigator.keyboard.getLayoutMap()` in Chromium, a US keyboard elsewhere), and the arrow keys as small triangles pointing their way.
- The numpad's keys are keys of their own, so with NumLock off its arrows don't move the subject unless bound.
- Screens own Escape (see [chamber screen](#chamber-screen) and [home menu](#home-menu)). While a hint shows, its card owns Enter, Space and Tab (see [dialogs](#dialogs)).

## Sounds

The rules play no sounds: they report what happens as events, and after each step the level plays the matching sound for each, in order (`src/game/level.ts`, the sounds in `src/game/sound.ts`):

| # | Event | Sound |
|---|-------|-------|
| 1 | Blue or orange portal opened | That portal's own |
| 2 | Refused | The error sound, but for a portal shot that missed: the shot sound |
| 3 | Box picked up, box put down | The box sound, the same for both |
| 4 | Box destroyed where something blocks, carried box destroyed by a fizzler, box sent back by a link, absent box brought in by a link | The box-destroyed sound |
| 5 | Fizzled | The fizzle sound (with the box-destroyed sound too for a box carried into the field) |
| 6 | Crossed | The crossing sound |
| 7 | Door or exit opened, closed | The door's opening or closing sound, shared by the exit |
| 8 | Button pressed, released | One sound each |
| 9 | Switch used | The switch sound |
| 10 | Exit reached | Its own |
| 11 | Slide started | The slide sound, once however long the slide runs |
| 12 | Arrow turned, blocked wall switched, ditch switched | One sound each, the same both ways |
| 13 | Light barrier, laser, fizzler or emitter switched off or on; receiver lit or gone dark | One sound each way for each |
| 14 | Portal closed by a fizzler switching on; slide stopped | None |

- A portal hit plays only its portal's sound. A shot tried while carrying a box never leaves, so it plays the error sound; a shot from inside a fizzler that is on fires nothing and stays silent.
- A ray starting to bounce off a mirror box, which the rules don't report (`findMirrorBounces` in `src/game/mirror_bounces.ts`), plays the mirror box's sound once, after the step's other sounds, however many boxes, and in place of the put-down sound when the box was put down in the ray. On a slide it waits for the slide's stop, and a load plays none.
- A load settles the chamber's start and plays the sounds of its events. During a slide each tile's sounds wait until the subject gets there (`docs/sprites.md`, "Steps").
- Three sounds belong to the interface, and the game never plays them; the screens do:
  - **Move:** every move of the home menu's highlight (keys, Tab or pointer) and of a dialog's focus between its buttons (the keyboard's arrows or Tab); stepping into or back out of a home menu section or About's or Controls' third column with Right and Left; Escape or Backspace stepping back; Escape closing a dialog or stepping back from a confirmation or the settings to the pause menu (not Escape cancelling a custom controls row's wait); Escape opening or closing the pause menu; and each step of a volume (Left, Right or the pointer; after the change, so it is heard at the new sound effects volume, and not at all once sound effects are down to Off).
  - **Accept:** pressing something with Enter, Space or a click: the loading screen's Start button, a dialog button (a custom controls row starting to wait for a key among them, never a volume row, which presses nothing), a home menu section or an About or Controls row (opening it or stepping into its third column, as Right does), a layout under Controls (with Custom, also opening its dialog), Reset progress (opening its confirmation), the chamber screen's Controls heading (folding or opening the legend) and a hint's Continue (Enter or a click); and a key or mouse button bound in the custom controls dialog. Opening Feedback or a page, which leave the game, plays neither.
  - **Start:** a chamber started from the home menu.
- Every sound plays at the sound effects volume: the settings set one master volume that every effect's volume is multiplied by, 0 playing nothing. The effects' files are evened to one loudness (`npm run audio:normalize`) and play 10 dB above the music.

## Music

- The settings set the music's master volume from the player's music volume, as for the sound effects, 0 playing nothing, and switch between two players:
  - **The menu music,** played on the home screen and resumed where it left off.
  - **The chamber playlist** (`src/game/music_playlist.ts`), played in a chamber. The visit's first chamber opened starts its opener, Science is Fun, from its beginning, and every chamber opened after it (Next chamber or from the home menu) and Play again move it on to the next track in its list, carrying on the list from where the last visit left it ([saved data](#saved-data)). Restart chamber leaves it playing, and with the music Off nothing moves it. A track that ends moves it on too, and no chamber track loops.
- The loading screen downloads the menu music and the playlist's opener; the playlist's other tracks are streamed (`src/assets/audio/music/streamed/`, about 150 MB): each is downloaded while the track before it plays.
- Nothing plays before Start: pressing it lets the music play.

## Saved data

The device keeps these in `localStorage`, every key prefixed `portal-2d.`:

- **The volumes,** `portal-2d.sound-volume` and `portal-2d.music-volume`: 0 (Off) to 100 in steps of 10; 100 plays as loud as the game did before it had volumes, so it is the default. Read once per visit, so not synced between tabs.
- **The legend,** `portal-2d.legend-open`: whether the chamber screen's controls legend is open, kept the same way.
- **The controls,** `portal-2d.key-bindings`: `{layout, custom}`, the layout in use, `arrow-keys` (shown as Default) or `custom`, and the Custom keys, a plain object, game key → key (its `KeyboardEvent.code`, `Control` or `Shift` for either side), or null until Custom is first picked.
  - Default's keys are never stored, so a change to them always takes effect.
  - A portal may hold a mouse button, `MouseLeft` or `MouseRight`, names no key's code takes.
  - Custom keys are read game key by game key: a stored key that can't be bound (a mouse button on any game key but a portal included) or is already taken falls back to that game key's Default key, and if that is then taken every game key goes back to Default.
  - A layout that isn't one (the retired `wasd-mouse` included), or Custom with no keys, falls back to Default; renaming a game key or a key name sends a stored binding of it back to Default, and a stored binding of a game key that no longer exists (the retired turn key) is dropped, keeping the rest.
  - Unlike the progress, it is not synced between tabs, so a tab keeps the controls it loaded until it reloads.
- **The playlist's place,** `portal-2d.music-track`: the position in its list, from 0, of the last track it moved to, so the next visit's list carries on after it once the opener has played. Missing, malformed or past the end of the list, the list starts from its top. Written by every tab, read once per visit.
- **The progress,** under one versioned key, `portal-2d.progress`: `{version: 4, chambers: {<id>: {completed, bestTime, attempts, hintsSeen}}}`, by permanent chamber id. Best times are in hundredths of a second; attempts are counted on each opening, Restart chamber and Play again; `hintsSeen` lists the ids of the chamber's hints the player has closed (a value that isn't a list of strings reads as none; it came without a version change, so a save made before hints existed reads with none seen). Version 4 since the tutorial run's first chamber took id 1 from the old tutorial, so every save from before is ignored. Every save writes the whole record, so each tab takes over the record whenever another tab saves it (the `storage` event). Reset progress stores an empty record, which forgets the seen hints too.

Malformed values, unknown fields and a record of another version are ignored, and a stored value that no longer reads falls back to its default. The last chamber opened (its list, the campaign or the playground chambers, and its number, which the home menu highlights on the way back) is kept in memory only.

## Analytics

Production builds send these Firebase Analytics events (`src/services/analytics.ts`; `npm run dev` logs each to the console as `[analytics] <event>` with its parameters instead).

The chamber events, each with `chamber_id`, `chamber_number` (its position in the play order, counted from 1, so Chamber 1 sends 1 for both) and `attempt` (the chamber's attempt count on this device, cleared by Reset progress; a restart ends attempt N and the next run is N + 1):

- `chamber_start`: the chamber opened, or Play again. Restart chamber sends none of its own, so runs = `chamber_start` + `chamber_restart`.
- `chamber_restart`: Restart chamber confirmed.
- `chamber_quit`: Exit chamber or browser Back confirmed; not Back to menu or Next chamber after finishing, nor closing the tab.
- `chamber_abandon`: the page closed, reloaded or left for another site before finishing; at most once per attempt, and a lower bound, since events sent as a page goes away can be lost. A page restored from the back/forward cache carries on, so an attempt can be abandoned and later still end another way.
- `chamber_complete`: the chamber completed, also with `first_completion` and `new_best` (1 or 0; after Reset progress the next completion counts as first again).
- `hint_shown`: a tutorial hint appeared, also with `hint_id` (the hint's permanent id, unique within its chamber, such as `box`); none when it closes. A hint left unseen by leaving sends it again the next time it shows.

All but `chamber_start` and `hint_shown` also carry `time_ms` (the time shown), `moves` (steps that put the subject on another tile), `portals` (portals placed, misses not counted), `pauses` (times the pause menu was opened during the attempt, the one that led to a restart or an exit included) and, once it can tell, `fps` (how often the level's frame loop ran since the chamber was loaded, paused or not, gaps of over a second between frames left out, rounded; it follows the monitor's refresh rate, so it shows a slowdown on one machine rather than comparing machines).

The others:

- `setting_change`: a volume changed, sent once it has stayed put for a second, unless it is back where it was last sent: `setting` (sound or music), `volume` (0 to 100) and `enabled` (on, or off at 0, kept from the on/off switches the volumes replaced).
- `controls_change`: another layout of controls put in use under Settings, not the one already in use: `layout` (default or custom). Binding a key sends nothing.
- `progress_reset`.
- `changelog_open`: stepping into the changelog, not just highlighting its row.
- `feedback_open`, and `link_open`: `link` (the page's name on its row) and `url`.
- `loading_complete`: the loading screen's bar is full and Start appears: `duration_ms` (the time since the page started loading) and `failed_files` (the files that didn't download or were refused as sprites). A visit left before then sends none, and pressing Start sends nothing.
- `asset_failed`: a file the loading screen downloads didn't download or was refused as a sprite, once per file: `file` (where it sits in `src/assets`, such as `images/chamber/box.webp`, since a build turns a small file into a data URL, so its address names nothing), `kind` (audio or image) and `reason` (download or refused); at most 10 per visit.
- `desktop_only_shown`: a touch-first device got the desktop-only notice.
- `exception`: Google Analytics' standard event for an error: one thrown and not caught, a promise rejected and not handled, or, in production builds, an error in a screen, which Vue would log to the console and which is still logged there. `description` (the error's name and message, or its text, cut to 100 characters) and `source` (page, promise or screen). An error event carrying no error, from a script on another site or the browser's ResizeObserver notice, is left out; each description is sent once per visit, at most 10 per visit.

## Loading screen

- Every visit on a desktop opens on `loading_screen.vue`, which downloads every file under `src/assets/audio/` and `src/assets/images/` (`asset_preloader.ts` finds them at build time) and the fonts, but the chamber playlist's streamed tracks (see [music](#music)), then waits for Start, whose button takes focus once loading finishes.
- Images are read back from the browser cache, except the chamber sprites (`src/assets/images/chamber/`), which are handed to the game decoded (`useSpriteFile` in `sprite_sources.ts`) before Start. In development, a file there that isn't a sprite's, or a sprite's file of the wrong size, is logged as an error.
- Audio is handed to the game's players as an in-memory copy (`useAudioFile` in `audio_sources.ts`), because Firebase varies responses by encoding and a media request would miss the cache and download the file again; the players download nothing on their own until they first play.
- Pressing Start plays the menu's accept sound, then the requested address opens, and the press lets the music play.
- In development (`npm run dev`) the bar takes at least 0.5 s, so the loading state can be seen.
- A file that fails is skipped and loads on demand later, and once nothing has arrived from any file for 15 s, every file still downloading fails, so a stalled download can't keep Start from appearing. A chamber sprite that fails, can't be decoded or has the wrong size isn't drawn for the rest of the visit. A dev page, which skips the loading screen, loads the sprites itself (`loadSprites`).
- Each file that fails is reported to analytics (`asset_failed`), and so is the end of the loading (`loading_complete`).

## Look

Test-facility signage: cool light panels on a seamed wall, thin rules, chamber numbers as large sign numerals, and the game's own colours as the only accents:

| # | Colour | Marks |
|---|--------|-------|
| 1 | Blue | Interaction and success: the pause dialog's band and Continue button, the chamber-complete dialog's band and main button (Next chamber, or Back to menu after the last chamber), a hint card's band and Continue button |
| 2 | Orange | The second portal: the logo and the legend |
| 3 | The floor button's red | Caution, on actions that discard progress: the confirmation dialog's band and button |
| 4 | The test subject's green | A completed chamber, on its row |

**The loading screen** sits on the seamed wall with larger panels, rivets where the seams cross and a soft vignette.

**The home screen** sits on a photo of a test room instead (`.room` and `.room-inner`, which keep its content on the room's back wall, clear of the side walls and floor), with the logo above the menu. The menu is lettering straight on the room's wall, with no panel:

- Once a section is opened, its rows stand in sign capitals beside the sections, the first level with the section's own row (a cascade, from the shared `--menu-row-height`).
- The row with the keyboard sits on a see-through dark bar with white lettering, which is also its focus mark, and the chosen row of a column without the keyboard on a fainter one.
- **Play** (and Playground) shows the highlighted chamber's map. The rows scroll on their own between that first row's line and 8vh above the window's foot, where the room's wall meets its floor (no fewer than three rows, below which the page scrolls instead), faded out over half a row at an edge with more rows beyond it, beside a thin rule in the gap to their right, like the changelog's, marking the part in view (darker while the list has the keyboard, in place of the browser's scrollbar, which is hidden, and hidden itself when the rows fit), while the logo, the sections and the map stay put. A chamber row ends with the best time, when there is one, and the test-subject figure, grey until the chamber is completed and green after; a playground chamber's row, with nothing saved, shows neither.
- **About** shows, level with the highlighted row, the pages as rows ending with an arrow leaving a box (they open a new tab, as does About's own Valve's Portal row, which ends in the same arrow; Feedback ends in it too, though it opens the mail app), or the changelog beside a thin rule that darkens when it has the keyboard.
- **Settings:** the sound effects and music rows end in a ramp of ten bars rising like a volume wedge, lit blue up to the volume, then the volume in sign numerals, or Off at 0. The Controls row has, level with it, the two layouts, each ending in a lamp, an unlit ring, lit blue on the layout in use. Settings ends with Reset progress, a plain row that leaves the red to its confirmation dialog.
- **The custom controls dialog** sits under a blue band: a line on how to set a key, a row per game key, in smaller sign capitals, ending in its key's cap (the portal keys' caps edged blue or orange, a dashed empty key reading "Press a key" while it waits), then Done.

**The chamber screen** puts the game on a dark graphite stage, lit a little in its middle, behind the chamber, and darkest at its edges, the canvas borderless so the open exit fades into it, beside a light rail, which never shows a scrollbar (a window too short for it scrolls it with the wheel). The rail holds:

- **The chamber sign:** a white plate in a thin, square-cornered border of muted grey. The two-digit number, in Oxanium's light weight, has its place in the list against it on its baseline ("/01", the last chamber's number in its list after the slash) and, at the end of that line, the timer, its digits on the same baseline under a stopwatch and a small caption, dimmed until the clock starts. Then a rule, and a framed pictogram for each of the fourteen kinds of element a chamber can hold (the exit and walls, in every chamber, have none; the mirror box, listed among the boxes, counts as a kind of its own), in two rows of seven, dark when the chamber has one and faint when it hasn't (the mirror box's dark when any box has a mirror, the one special case, the box's for any box).
- **The controls legend,** under a heading with an arrow at the end of its rule: the player's bound keys as their layout prints them, in keycaps (only Space drawn wide; the arrow keys as small triangles; a portal's mouse button as a small white mouse as tall as the keycaps, with that button filled in the portal's colour), then a divider, blue or orange for the portal keys, before what each key does; last, Esc for Pause.
- **The performance view,** in development only, pinned over the rail's foot, so it never makes the rail taller: the frame loop's numbers in two small lines, refreshed about once a second (frames per second, each drawing and the heap used, where Chromium tells it, then the average time between frames, each rules step, kept from the latest second with a step, and the heap limit), in a monospace face on the chamber's dark backdrop, set apart from the signage.

**A hint** darkens the whole window, rail included, but the element's own tile, which four white corner brackets frame. Beside it, joined by a white line ending in a dot, a white card under a blue band holds the element's pictogram and its name as the chamber sign gives them, the hint's text and a blue Continue showing "Enter". The card goes on the side of the tile with the most room on the stage, whole on the stage and never over the tile. Sizes, colours and how it moves: `docs/hints.md`, "The chosen design".
