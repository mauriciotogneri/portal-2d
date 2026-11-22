# Performance

The checks that the chamber drawing holds 60 fps, kept from stages 03 and 04a's notes when their files were removed. To run the render profile again, open `/src/dev/render_profile.html` in `npm run dev`, with the window in front (a covered or minimized window slows its frames, and the page then says its numbers are not valid). It sizes Playground 4 for the stage the chamber screen leaves in a 1920 × 1080 window, 1488 × 1016 page pixels, but draws it without the chamber screen's see-through exit (so it keeps the black exit shadow and doesn't clear the canvas each frame) and without its 16-tile minimum, which changes nothing for a chamber as large as Playground 4. The older sections below name the chambers as they were when measured: the tutorial is now Chamber 1, chamber N (1 to 9) is now Playground N + 1 (so chamber 3, the render profile's, is Playground 4), and the playground is Playground 1; chambers 1 to 9's recorded solutions, which some checks below replayed, were deleted when they left the campaign (git history keeps them).

The render profile was last run on 2026-11-22, with today's renderer (see [profiling baseline](#profiling-baseline-2026-11-22)), but its chamber has no emitter and is drawn without the see-through exit, so nothing measures the rays, traced and drawn on every frame in a chamber with an emitter, or the see-through exit, which clears the canvas every frame. The later sections measure the surface detail, the element detail, the particles, the fields and the bands one at a time.

## Profiling baseline (2026-11-22)

Playground 4 (23 × 17, the largest canvas and the most elements), its settled start redrawn every frame with today's renderer: its backdrop, surface detail included, copied, its element detail, its ten lasers glowing and its two fizzlers' fields moving, both always on, but no portal, no ray and no see-through exit. Sized as the chamber screen sizes it in a 1920 × 1080 window, 1488 × 1016 page pixels, so 59 and 119 px tiles. Chrome 155 on Linux, Intel UHD Graphics 620 (Mesa, through ANGLE), 8 cores, a 59.9 Hz display at pixel ratio 1, in a maximized window, so ratio 2 is simulated by the canvas size (drawn at twice the size and shown at half). Median of 3 runs of 600 frames each, the range in brackets where runs differed:

| # | Pixel ratio | Canvas | Draw time median / p95 / max | Frame interval median / p95 | Frames skipping a refresh |
|---|---|---|---|---|---|
| 1 | 1 | 1357 × 1003 | 1.0 / 1.4 / 2.6 ms (median 1.0–1.1, p95 1.4–1.5, max 2.1–2.8) | 16.7 / 16.8 ms (p95 16.7–16.8) | 0 |
| 2 | 2 | 2737 × 2023 | 1.0 / 1.4 / 2.7 ms (max 2.0–2.9) | 16.7 / 16.7 ms (p95 16.7–16.8) | 0 |

Both ratios hold 60 fps with a wide margin: drawing takes about 6 % of a frame, and no frame missed a refresh. About a third (ratio 1) to half (ratio 2) of the intervals read 16.8 ms instead of 16.7, which is timer rounding at a 59.9 Hz display, not a dropped frame. Draw time is what the canvas calls take on the main thread; the GPU's share shows only in the frame interval. A first try, with the window covered, ran at about 1.5 frames a second and never finished.

The whole-frame checks before it (2026-11-09 to 11-13), on a far plainer renderer, with placeholder sprites and none of the detail, fields, bands or particles: the profile drew chamber 3's start in 0.5 ms a frame at either ratio, and in 0.8 ms once its lasers glowed and its fizzlers shimmered; the chamber screen itself, drawing every frame for a step or the glows, took 0.6 ms a frame at pixel ratio 1 and 1.0 ms at ratio 2; no frame missed a refresh, so the renderer stayed on the 2D canvas (stage 03's go/no-go point), and with reduced motion an idle chamber drew nothing and a move drew one frame. A try then with the window covered ran idle frames at 30 Hz and passed the profile's check, which only rejects idle frames slower than 50 ms.

## High-DPI check (2026-11-13)

Stage 03's "Check high-DPI again" step: Chrome at 200 % zoom on the same 1080p screen, so a pixel ratio of 2 and a 960 × 455 page. Each canvas's size in device pixels, as Chrome reports it (`devicePixelContentBoxSize`), matched its own pixels exactly, so every canvas pixel lands on one screen pixel: chamber 3 at 1035 × 765 (45 px tiles), and the home menu's map. Seen at full resolution, the walls with their bevels and shadows, the subject at rest and part way through a glide, and the pieces of a fizzle are all sharp. Zooming back to 100 % with chamber 3 open refit it at once, without a reload, to 1127 × 833, again one to one. At 200 % the page is too small for the home menu's map, which draws only 12 × 10 pixels; a real high-DPI screen gives it far more room. Sprites are only enlarged past their 256 px for the tutorial on a 6K-class screen (an estimate from the stage's margins, as measured then: 434 page pixels across and 66 down, 432 and 64 since the canvas lost its border). The author accepted 200 % zoom in place of a real high-DPI screen.

## Surface detail check (2026-11-20)

The surface detail (`docs/sprites.md`) is drawn into the backdrop, so it costs nothing per frame: what it adds is to building the backdrop, once per chamber load and per tile size, and to each drawing of the home menu's map. Same machine, Chrome 155, a page at pixel ratio 1 in `npm run dev`; a renderer made afresh for each run and timed on the main thread over its first frame, then each part of the detail drawn on its own (medians of 9 runs).

Most of the cost is working out the soft layers (the floor's patches, room light and grime, and the walls' patches), 8 samples to a tile's side, not painting, so it hardly grows with the tile size. With the soft layers worked out on every run:

| # | Chamber | Tile | First frame, backdrop built | Later frame | Floor tone | Floor wear | Wall tone | Wall wear |
|---|---|---|---|---|---|---|---|---|
| 1 | 1 (20 × 20) | 45 px | 32.0 ms | 0.5 ms | 14.0 ms | 4.1 ms | 6.4 ms | 1.3 ms |
| 2 | 1 (20 × 20) | 90 px | 39.5 ms | 0.6 ms | 14.6 ms | 3.5 ms | 7.4 ms | 1.5 ms |
| 3 | 3 (23 × 17) | 59 px | 31.8 ms | 1.4 ms | 13.5 ms | 2.7 ms | 6.5 ms | 1.2 ms |
| 4 | 3 (23 × 17) | 119 px | 34.6 ms | 0.8 ms | 15.1 ms | 2.7 ms | 6.2 ms | 1.2 ms |
| 5 | Tutorial (12 × 10) | 56 px | 10.2 ms | 0.1 ms | 5.9 ms | 0.8 ms | 2.4 ms | 0.9 ms |

That is about 24 to 27 ms of a large chamber's first frame. Two things got it there: the cloudy noise works its grids out once and only blends them at each sample (working them out at every sample, the four parts took about 42 ms on chamber 1), and the soft layers are stretched with the plainest smoothing, with no banding seen at these strengths.

The soft layers depend only on a chamber's size and walls, not on the tile size, so they are kept once painted (24 at once, two to a chamber) and shared by the home menu's map, the chamber screen and every resize. With them kept, and the home menu's map (632 × 474 px) drawn for the first time in the visit, then again:

| # | Chamber | First frame, backdrop built, at the game's tile / at twice it | Floor tone | Floor wear | Wall tone | Wall wear | Menu map, first / again |
|---|---|---|---|---|---|---|---|
| 1 | 1 (20 × 20) | 15.2 / 16.8 ms | 1.4 ms | 4.1 ms | 0.7 ms | 2.6 ms | 58.5 / 14.1 ms |
| 2 | 3 (23 × 17) | 11.9 / 11.6 ms | 1.4 ms | 3.4 ms | 0.7 ms | 1.3 ms | 60.2 / 17.3 ms |
| 3 | 2 (23 × 13) | 9.8 / 10.6 ms | 0.8 ms | 3.2 ms | 0.5 ms | 1.7 ms | 34.5 / 9.4 ms |
| 4 | Tutorial (12 × 10) | 5.0 / 4.5 ms | 0.3 ms | 1.4 ms | 0.3 ms | 1.6 ms | 26.5 / 5.1 ms |

So a large chamber's detail costs about 25 ms the first time it is drawn in a visit, in the menu's map as a rule, and about 6 to 9 ms after that, on the map and when the chamber opens. The map's first drawing of a chamber also shrinks every sprite to a new tile size, as it did before the detail, so that column isn't the detail's cost alone; with the soft layers worked out every time, drawing chamber 1's map again took 31.3 ms. Replaying the tutorial's recorded solution on one renderer, the frames where an antline lit up or went dark took 0.6 to 3.1 ms, since the floor with its detail is kept apart and only copied, and the others 0.4 ms on average.

## Element detail check (2026-11-21)

The element detail (`docs/sprites.md`) is drawn per instance from images made once per tile size and kept with that size's sprites, so a frame draws one image per box, button, switch, arrow and grate as before, and one per open pit tile in place of its four quarters. Same machine, Chrome, a page at pixel ratio 1 in `npm run dev`: the sprite gallery, which runs no frame loop. Each chamber's sprites were shrunk and its soft layers worked out first, so a first frame here is the backdrop and the element detail alone; a renderer made afresh for each run (medians of 9), later frames on one renderer (medians of 60). The detail was switched off for the comparison by a temporary edit, made and undone for this check alone.

| # | Chamber | Tile | First frame, images made: off / on | First frame, images kept: off / on | Later frame: off / on | Menu map, first: off / on | Menu map, again: off / on |
|---|---|---|---|---|---|---|---|
| 1 | 1 (20 × 20) | 45 px | 15.7 / 34.8 ms | 15.0 / 14.7 to 15.8 ms | 0.6 / 0.5 ms | 47.6 / 74.7 ms | 15.3 / 18.6 ms |
| 2 | 3 (23 × 17) | 59 px | 32.3 / 28.8 ms | 15.2 / 14.3 to 16.4 ms | 0.7 / 0.5 to 0.7 ms | 50.4 / 87.5 ms | 13.6 / 17.1 ms |
| 3 | 2 (23 × 13) | 63 px | 12.2 / 22.5 ms | 11.1 / 12.9 ms | 0.3 / 0.2 ms | 11.0 / 23.9 ms | 11.2 / 18.4 ms |
| 4 | Tutorial (12 × 10) | 56 px | 19.5 / 9.3 ms | 6.6 / 6.2 ms | 0.1 / 0.1 ms | 59.4 / 86.2 ms | 6.0 / 6.6 ms |

Once a size's images are made, the detail costs nothing measurable, per frame or on a chamber's first frame. Making them is what it adds, once per tile size in a visit: for chamber 3, its 67 sprite images took 11 to 18 ms and its 39 pit tiles 4 to 11 ms, the larger figures the first time, which also paints the chamber's pit shade (kept, 24 chambers at once, as the soft layers are) and runs the code for the first time. The first-frame and first-map columns are noisy (single runs, the first in the page among them: only noise explains chamber 3 and the tutorial reading lower with the detail on), so take about 15 to 35 ms once per chamber and tile size as the figure, mostly on the home menu's map, whose sizes differ from the chamber screen's. Drawing the map again costs about 3 ms more, the looks being worked out again for each new drawing (each draws a chamber compiled afresh). Working out every look of chamber 3 takes about 1.5 ms. A first try, with the detail on and a chamber being played in the same page, which draws every frame, read the first frames about 10 ms slower than this check did.

## Portal particles check (2026-11-21)

The portals' particles (`docs/sprites.md`) are drawn every frame while a portal is open, when the level already draws every frame for the glows, so they add only their own drawing. Chrome 155 on the development machine, `npm run dev`: in the sprite gallery, which runs no frame loop, chamber 3 after 54 actions of its recorded solution (both portals open) drawn on one renderer at 99 px tiles, a 2277 × 1683 canvas, the size the chamber screen gives it at pixel ratio 2, each frame drawn with and without the particles at times 16.7 ms apart, timed on the main thread with `performance.now()` (0.1 ms steps). Medians of 60 frames each:

| # | Run | Without particles | With particles |
|---|---|---|---|
| 1 | 1 | 0.8 ms | 1.0 ms |
| 2 | 2 | 0.9 ms | 1.1 ms |
| 3 | 3 | 1.3 ms | 1.7 ms |

So the particles of two portals cost about 0.2 to 0.4 ms a frame, a few per cent of a 60 Hz frame. The browser window was behind another during the check, which held its frame loop to a few frames a second, so frame intervals weren't measured, only the drawing.

## Fizzler field check (2026-11-21)

The fizzlers' fields (`docs/sprites.md`) are drawn in code every frame while one is on, so a chamber with a fizzler on now draws every frame, as one with a laser on already did. Chrome 155 on the development machine, `npm run dev`: in the sprite gallery, which runs no frame loop, chambers 1 (three fields) and 3 (two) at their settled start drawn on one renderer at 50 and 99 px tiles (the chamber screen's size at pixel ratio 1, near enough, and at pixel ratio 2), each frame drawn with the fields and with their drawing switched off in the page alone, at times 16.7 ms apart, timed on the main thread with `performance.now()` (0.1 ms steps). Medians of 60 frames each, three runs:

| # | Chamber | Canvas | Without fields | With fields |
|---|---|---|---|---|
| 1 | 1 (20 × 20) | 1000 × 1000 | 1.2, 1.0, 0.9 ms | 1.1, 1.0, 0.9 ms |
| 2 | 1 (20 × 20) | 1980 × 1980 | 1.1, 1.1, 1.5 ms | 1.3, 1.3, 1.3 ms |
| 3 | 3 (23 × 17) | 1150 × 850 | 1.1, 0.9, 0.9 ms | 0.9, 0.9, 0.8 ms |
| 4 | 3 (23 × 17) | 2277 × 1683 | 1.4, 1.2, 1.1 ms | 1.2, 0.9, 1.3 ms |

So the fields cost nothing this timing can tell apart from its noise. A first build drew each field tile on a scratch canvas and laid it on the chamber, so a field would fade as a whole: at 99 px that added 2.5 to 3.5 ms a frame, about 1 ms a tile, nearly all of it in handing each freshly drawn scratch canvas to the chamber's canvas, so each tile is now drawn straight onto the canvas, clipped to it, every part of a fading field faded alike. Frame intervals weren't measured, only the drawing.

## Light barrier band check (2026-11-21)

The light barriers' bands (`docs/sprites.md`) are drawn in code, and while one is on its edges flicker, so a chamber with a light barrier on now draws every frame, as one with a fizzler's field or a laser on already did. No chamber has a light barrier yet, so the playground (15 × 15, its three light barriers in one run, on at its start) stood in. Chrome 155 on the development machine, `npm run dev`: in the sprite gallery, which runs no frame loop, the playground's settled start drawn on one renderer at 63 and 126 px tiles (the chamber screen's size at pixel ratio 1 and 2), whole frames and the bands' drawing alone (`LightBarrierBand.draw`, ten calls a sample), at times 16.7 ms apart, timed on the main thread with `performance.now()` (0.1 ms steps). Medians of 60 samples each, three runs:

| # | Canvas | Whole frame | Bands, steady | Bands, switching |
|---|---|---|---|---|
| 1 | 945 × 945 | 0.7, 0.6, 0.5 ms | 0.03, 0.03, 0.03 ms | 0.05, 0.04, 0.04 ms |
| 2 | 1890 × 1890 | 0.6, 0.6, 0.6 ms | 0.03, 0.04, 0.03 ms | 0.04, 0.04, 0.05 ms |

So three bands cost under 0.1 ms a frame: a steady band is drawn from two images painted once per tile size, which match the band painted straight onto the canvas within 8 levels of 255 in any colour, and one switching, painted straight onto the canvas, costs a little more for the 0.3 s it lasts. The browser window was behind another during the check, which held its frame loop to a few frames a second, so frame intervals weren't measured, only the drawing.
