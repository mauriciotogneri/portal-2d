# Performance

The checks that the chamber drawing holds 60 fps, kept from stages 03 and 04a's notes when their files were removed, and how to measure it again.

## Measuring

| # | Tool | Where | What it gives |
|---|------|-------|---------------|
| 1 | Render profile | `/src/dev/render_profile.html` in `npm run dev` | The baseline: Playground 4's settled start redrawn every frame, 600 frames at pixel ratio 1, then at 2, with each ratio's draw time and frame interval |
| 2 | Performance view | The chamber screen's rail, in `npm run dev` only | The frame loop's numbers while a chamber is played, effects included |
| 3 | Sprite gallery | `/src/dev/sprite_gallery.html` in `npm run dev` | One part of the drawing timed alone, by hand |

**The render profile.** Run it with the window in front: a hidden tab, or a browser that slowed the tab's idle frames past 50 ms before anything was drawn, makes the page say its numbers are not valid, but a covered window held to 30 Hz still passes that check. It sizes Playground 4 (23 × 17, the largest canvas and the most elements) for the stage the chamber screen leaves in a 1920 × 1080 window, 1488 × 1016 page pixels, and emulates pixel ratio 2 by the canvas's size, so ratio 2 can be measured on any screen. It draws the chamber without the chamber screen's see-through exit (so it keeps the black exit shadow and doesn't clear the canvas each frame), without its 16-tile minimum, which changes nothing for a chamber this large, and without any effect: only what moves with time alone, the glows, the fizzlers' fields and the light barriers' edges.

**The performance view.** In development, two small lines pinned over the foot of the chamber screen's rail (`src/components/performance_view.vue`), refreshed about once a second with a sample of the level's frame loop (`src/game/frame_stats.ts`): how often the loop ran, the average time between frames, the average time each drawing took, the average time each rules step took (kept from the latest sample with a step, so it holds between steps), and the JavaScript heap used and its limit, where the browser tells it (Chromium). A gap of over a second between frames (a hidden tab, the computer asleep) throws the sample away. It is the only measure of play as it happens, steps and effects included, but nothing records its numbers.

**Timing one part in the gallery.** The checks of 2026-11-20 and 21 below were taken by hand in the sprite gallery, which runs no frame loop of its own, through its console (`tools/detail_mixer/README.md` gives the code): a first frame timed on a renderer made afresh for each run (median of 9), later frames on one renderer at times 16.7 ms apart (medians of 60), on the main thread with `performance.now()` (0.1 ms steps). A state that would need playing to is reached by stepping a recorded solution's actions through the rules' `step`. The part being compared was switched off for the comparison by a temporary edit, in the page or in the code, undone after. They time the drawing only: frame intervals need the render profile, since a chamber played in the same page draws every frame and slows such timings, and a window behind another holds the frame loop to a few frames a second.

## What nothing measures

With today's renderer, no check has measured the rays (traced and drawn every frame in a chamber with an emitter), the see-through exit (which clears the canvas every frame), a step's glide or a slide, a portal's opening, a fizzle's pieces, the fizzlers' flashes and splashes, the light barriers' reactions, a box falling or flying home, or a missed shot's ripple. The performance view shows them while a chamber is played.

## Profiling baseline (2026-11-22)

Playground 4 (23 × 17), its settled start redrawn every frame with today's renderer: its backdrop, surface detail included, copied, its element detail, its ten lasers glowing and its two fizzlers' fields moving, both always on, but no portal, no ray and no see-through exit. Sized as the chamber screen sizes it in a 1920 × 1080 window, 1488 × 1016 page pixels, so 59 and 119 px tiles. Chrome 155 on Linux, Intel UHD Graphics 620 (Mesa, through ANGLE), 8 cores, a 59.9 Hz display at pixel ratio 1, in a maximized window, so ratio 2 is simulated by the canvas size (drawn at twice the size and shown at half). Median of 3 runs of 600 frames each, the range in brackets where runs differed:

| # | Pixel ratio | Canvas | Draw time median / p95 / max | Frame interval median / p95 | Frames skipping a refresh |
|---|---|---|---|---|---|
| 1 | 1 | 1357 × 1003 | 1.0 / 1.4 / 2.6 ms (median 1.0–1.1, p95 1.4–1.5, max 2.1–2.8) | 16.7 / 16.8 ms (p95 16.7–16.8) | 0 |
| 2 | 2 | 2737 × 2023 | 1.0 / 1.4 / 2.7 ms (max 2.0–2.9) | 16.7 / 16.7 ms (p95 16.7–16.8) | 0 |

Both ratios hold 60 fps with a wide margin: drawing takes about 6 % of a frame, and no frame missed a refresh. About a third (ratio 1) to half (ratio 2) of the intervals read 16.8 ms instead of 16.7, which is timer rounding at a 59.9 Hz display, not a dropped frame. Draw time is what the canvas calls take on the main thread; the GPU's share shows only in the frame interval. A first try, with the window covered, ran at about 1.5 frames a second and never finished.

## Earlier checks

Each on the same machine and Chrome, with what it found and what it decided.

| # | Check | Found | Decided |
|---|-------|-------|---------|
| 1 | Whole frame (2026-11-09 to 11-13), on a far plainer renderer: placeholder sprites, none of the detail, fields, bands or particles | The profile drew Playground 4's start in 0.5 ms a frame at either ratio, 0.8 ms with its lasers glowing and its fizzlers shimmering; the chamber screen, drawing every frame for a step or the glows, took 0.6 ms at pixel ratio 1 and 1.0 ms at 2; no frame missed a refresh. With reduced motion an idle chamber drew nothing and a move drew one frame | The renderer stays on the 2D canvas (stage 03's go/no-go point) |
| 2 | High DPI (2026-11-13): Chrome at 200 % zoom on the 1080p screen, so pixel ratio 2 | Each canvas's size in device pixels matched its own pixels exactly (Playground 4 at 1035 × 765, 45 px tiles, and the home menu's map), so every canvas pixel lands on one screen pixel; walls, the subject mid-glide and a fizzle's pieces are sharp, and zooming back refit the chamber at once, without a reload. The 256 px sprites are enlarged only for Chamber 1 on a 6K-class screen | The author accepted 200 % zoom in place of a real high-DPI screen |
| 3 | Surface detail (2026-11-20) | Drawn into the backdrop, so it costs nothing per frame, only when the backdrop is built: about 25 ms the first time a large chamber is drawn in a visit, on the home menu's map as a rule, and 6 to 9 ms after that. Most of it is working out the soft layers, 8 samples to a tile's side, so it hardly grows with the tile size. A frame where an antline lights up or goes dark takes 0.6 to 3.1 ms, since the floor with its detail is kept apart and only copied | The soft layers depend only on a chamber's size and walls, so they are kept (24 at once) and shared by the map, the chamber screen and every resize; the cloudy noise works its grids out once and only blends them at each sample (working them out at every sample took about 42 ms on Playground 2); the plainest smoothing stretches the soft layers, with no banding seen |
| 4 | Element detail (2026-11-21) | Once a tile size's images are made, it costs nothing measurable, per frame or on a first frame. Making them costs about 15 to 35 ms once per chamber and tile size in a visit, mostly on the home menu's map (Playground 4's 67 sprite images in 11 to 18 ms and its 39 pit tiles in 4 to 11 ms), and drawing the map again about 3 ms more, each drawing working out the looks afresh (about 1.5 ms for Playground 4) | Each instance's sprite with its look is made once per tile size and kept with that size's sprites, so a frame draws one image per box, button, switch, arrow and grate, and one per open pit tile |
| 5 | Portal particles (2026-11-21), Playground 4 with both portals open at 99 px tiles (a 2277 × 1683 canvas, pixel ratio 2's size) | Two portals' particles cost about 0.2 to 0.4 ms a frame, a few per cent of a 60 Hz frame | Nothing needed changing |
| 6 | Fizzler field (2026-11-21), Playground 2 (three fields) and Playground 4 (two) at 50 and 99 px tiles | The fields cost nothing this timing can tell apart from its noise | Each tile is drawn straight onto the canvas, clipped to it: a first build drew each on a scratch canvas laid on the chamber, which added 2.5 to 3.5 ms a frame at 99 px, about 1 ms a tile, nearly all in handing each fresh scratch canvas to the chamber's canvas |
| 7 | Light barrier band (2026-11-21), Playground 1 (15 × 15, three light barriers in one run) at 63 and 126 px tiles | Three bands cost under 0.1 ms a frame; one switching costs a little more for the 0.3 s it lasts | A steady band is drawn from two images painted once per tile size, which match the band painted straight onto the canvas within 8 levels of 255 in any colour; one switching is painted straight onto the canvas |
