import {DELTAS, Direction} from '@/game/direction'
import type {BlockedShares} from '@/game/element_transitions'
import type {FizzlerFlashes, RunningFlash} from '@/game/fizzler_flashes'
import {type FizzlerSplashes, type RunningSplash, SPLASH_MILLISECONDS} from '@/game/fizzler_splashes'
import {PALETTE, withAlpha} from '@/game/palette'
import {pieceNumber} from '@/game/piece_number'
import {type BeamOrientation, type CompiledChamber, NO_ELEMENT} from '@/game/rules/compiled_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import {makeCanvas} from '@/game/sprite_scaling'
import {smoothStep} from '@/game/surface_noise'
import type {TilePainter} from '@/game/tile_painter'

/**
 * A fizzler's place in its run, the fizzlers side by side across one gap,
 * drawn as one field from the connector at its start to the one at its end.
 */
type RunPlace = {
  readonly span: BeamOrientation // Which way the field spans its gap: left to right, or top to bottom
  readonly start: number // How far along the run its tile starts, in tiles from the run's first connector
  readonly length: number // The run's length, in tiles
  readonly seed: number // Sets the run's field apart from every other run's
}

/** What the field is drawn from, made once */
type FieldImages = {
  readonly dash: HTMLCanvasElement // A dash: a short bright streak in a soft glow, longer than wide
  readonly tongue: HTMLCanvasElement // A tongue of light: bright at its root on the left, fading to the right and to both sides
  readonly wisps: HTMLCanvasElement // The wisps: thin winding filaments, on a tile that repeats seamlessly
}

/** Each fizzler's place in its run, worked out for one chamber */
type KeptPlaces = {
  readonly chamber: CompiledChamber // The chamber
  readonly places: readonly RunPlace[] // Each fizzler's place, by its number
}

/** The wisps' patterns, made for the context they are drawn on */
type WispPatterns = {
  readonly context: CanvasRenderingContext2D // The context they were made for
  readonly patterns: readonly CanvasPattern[] // One per layer of wisps
}

/** A flash running in a run of fizzlers */
type RunFlash = {
  readonly along: number // Where along the run it spreads from: the middle of the tile the subject was caught on, in tiles from the run's first connector
  readonly progress: number // How far through it is, from 0 to 1
}

/** A splash running in a run of fizzlers */
type RunSplash = {
  readonly along: number // Where along the run the shot met the field, in tiles from the run's first connector: the middle of the fizzler's tile, or its end for a shot along the run
  readonly face: number // Where across the field: 0 or 1, the edge of the face the shot met, or 0.5, the middle, for a shot along the run
  readonly progress: number // How far through it is, from 0 to 1
}

/** How opaque the field's blue is over what lies beneath */
const FIELD_OPACITY = 0.5

/** The moment a field held still shows, in seconds: with no time given (reduced motion, the home menu's map, the gallery) */
const STILL_SECONDS = 2.2

/** How strong the light along each connector is */
const GLOW_STRENGTH = 0.5

/** How far the light along a connector reaches into the field, in tiles */
const GLOW_REACH = 0.3

/** How unsteady the tongues of light are: how much they grow and shrink, and flicker */
const GLOW_FLICKER = 0.5

/** Tongues of light reaching in from each connector, per tile across the field */
const TONGUES_PER_CONNECTOR = 6

/** How strong the wisps are */
const WISP_STRENGTH = 0.4

/** Pixels across the wisps' tile, which repeats seamlessly */
const WISP_IMAGE_SIDE = 128

/**
 * The two layers of wisps: how many tiles one repeat of each spans, how far
 * it drifts each second, along the field and across it, in tiles, how strong
 * it shows, and how often it breathes, a little stronger and fainter, in
 * cycles a second. The second, larger, drifts the other way, so the wisps
 * wind through each other.
 */
const WISP_LAYERS = [
  {
    span: 1,
    along: 0.07,
    across: 0.07,
    strength: 0.8,
    breaths: 0.14,
    shift: 0,
  },
  {
    span: 1.37,
    along: -0.095,
    across: -0.095,
    strength: 0.55,
    breaths: 0.21,
    shift: 1,
  },
] as const

/** Dashes per tile along the field */
const DASHES_PER_TILE = 10

/** A dash's length, before each dash's own spread, in tiles */
const DASH_LENGTH = 0.07

/** How fast a dash drifts along the field, before each dash's own spread, in tiles a second */
const DASH_DRIFT = 0.06

/** A dash's thickness, in tiles, and never thinner than 3 pixels */
const DASH_THICKNESS = 0.06

/** How close to the run's ends a dash fades out, in tiles, so one drifting out at one end and back in at the other never shows the jump */
const DASH_END_FADE = 0.08

/** How strongly the field flashes where the subject is caught in it */
const FLASH_STRENGTH = 0.7

/** How bright the whole field turns as a flash starts, as a share of the flash's strength */
const FLASH_FILL = 0.4

/** How fast a flash fades: above 1, quickly at first */
const FLASH_FADE_POWER = 1.6

/** How strongly the field splashes where a portal shot met it */
const SPLASH_STRENGTH = 1

/** How far a splash's ring spreads into the field, in tiles */
const SPLASH_REACH = 0.8

/** How brightly the field lights up round the point a shot met, as a share of the splash's strength */
const SPLASH_FILL = 0.7

/** How fast a splash fades: above 1, quickly at first */
const SPLASH_FADE_POWER = 1.6

/** How long the white spot where a shot met the field lasts, fading, in milliseconds */
const SPLASH_SPOT_MILLISECONDS = 120

/** The white spot's radius, in tiles */
const SPLASH_SPOT_RADIUS = 0.3

/** What each of the run's things is numbered by, added to its seed */
const SALTS = {
  dashes: 404,
  tongues: 977,
} as const

/**
 * Keeps a number between two bounds.
 * @param value - The number
 * @param low - The lowest it may be
 * @param high - The highest it may be
 * @returns The number, no lower than low and no higher than high
 */
function clamp(value: number, low: number, high: number): number {
  return Math.min(high, Math.max(low, value))
}

/**
 * A wave between 0 and 1, at a pace and a point of its own.
 * @param cyclesPerSecond - How often it comes round
 * @param seconds - Now, in seconds
 * @param phase - Where it starts, as a share of a cycle
 * @returns From 0 to 1
 */
function wave(cyclesPerSecond: number, seconds: number, phase: number): number {
  return 0.5 + (0.5 * Math.sin(2 * Math.PI * ((cyclesPerSecond * seconds) + phase)))
}

/**
 * Paints an image whose every pixel is one colour, as opaque as a function
 * says.
 * @param width - Its width, in pixels
 * @param height - Its height, in pixels
 * @param colour - The colour, as rgba()
 * @param opacityAt - How opaque the pixel at a column and a row is, from 0 to 1
 * @returns The image
 */
function tintedImage(width: number, height: number, colour: string, opacityAt: (x: number, y: number) => number): HTMLCanvasElement {
  const image = makeCanvas(width, height)
  const pixels = image.context.createImageData(width, height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      pixels.data[(((y * width) + x) * 4) + 3] = Math.round(clamp(opacityAt(x, y), 0, 1) * 255)
    }
  }

  // The colour, only as opaque as each pixel says
  image.context.putImageData(pixels, 0, 0)
  image.context.globalCompositeOperation = 'source-in'
  image.context.fillStyle = colour
  image.context.fillRect(0, 0, width, height)

  return image.canvas
}

/**
 * Paints an image in two colours: the light, and the pale core over it where
 * the light is strongest.
 * @param width - Its width, in pixels
 * @param height - Its height, in pixels
 * @param lightAt - How opaque the light is at a column and a row, from 0 to 1
 * @param coreAt - How opaque the core is over it there, from 0 to 1
 * @returns The image
 */
function twoToneImage(width: number, height: number, lightAt: (x: number, y: number) => number, coreAt: (x: number, y: number) => number): HTMLCanvasElement {
  const image = makeCanvas(width, height)

  image.context.drawImage(tintedImage(width, height, PALETTE.fizzlerLight, lightAt), 0, 0)
  image.context.drawImage(tintedImage(width, height, PALETTE.fizzlerCore, coreAt), 0, 0)

  return image.canvas
}

/**
 * Draws a dash's image, 64 by 16 pixels: a soft glow of the light, and in
 * it a thinner streak of the core.
 * @returns The image
 */
function dashImage(): HTMLCanvasElement {
  const along = (x: number): number => Math.abs((x - 31.5) / 31.5)
  const across = (y: number): number => Math.abs((y - 7.5) / 7.5)

  return twoToneImage(64, 16, (x, y) => smoothStep(1, 0.15, along(x)) * Math.exp(-(across(y) ** 2) * 3) * 0.45, (x, y) => smoothStep(1, 0.5, along(x)) * Math.exp(-(across(y) ** 2) * 18))
}

/**
 * Draws a tongue's image, 64 by 32 pixels, its root on the left: the light
 * fading to the right and to both sides, the core at its root.
 * @returns The image
 */
function tongueImage(): HTMLCanvasElement {
  const lightAt = (x: number, y: number): number => ((1 - (x / 63)) ** 1.8) * Math.exp(-(((y - 15.5) / 15.5) ** 2) * 4.5)

  return twoToneImage(64, 32, lightAt, (x, y) => lightAt(x, y) * ((1 - (x / 63)) ** 4))
}

/**
 * Seamless smooth noise on the wisps' tile: a grid of numbers, a cell each,
 * blended smoothly between the four points round each pixel, the grid
 * wrapping round at its edges.
 * @param cells - Cells across the tile
 * @param salt - Which noise this is
 * @returns Reads the noise at a pixel, from 0 to 1
 */
function seamlessNoise(cells: number, salt: number): (x: number, y: number) => number {
  const numbers = new Float64Array(cells * cells)

  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = pieceNumber(salt, i, 0)
  }

  const at = (column: number, row: number): number => numbers[((((row % cells) + cells) % cells) * cells) + (((column % cells) + cells) % cells)] ?? 0

  return (x, y) => {
    const gridX = (x / WISP_IMAGE_SIDE) * cells
    const gridY = (y / WISP_IMAGE_SIDE) * cells
    const left = Math.floor(gridX)
    const top = Math.floor(gridY)
    const across = smoothStep(0, 1, gridX - left)
    const down = smoothStep(0, 1, gridY - top)
    const upper = at(left, top) + ((at(left + 1, top) - at(left, top)) * across)
    const lower = at(left, top + 1) + ((at(left + 1, top + 1) - at(left, top + 1)) * across)

    return upper + ((lower - upper) * down)
  }
}

/**
 * Draws the wisps' image, a tile that repeats seamlessly: three octaves of
 * seamless noise, warped a little so they wind instead of running straight,
 * kept only along their ridges, so they make thin filaments of light,
 * palest where they are strongest.
 * @returns The image
 */
function wispsImage(): HTMLCanvasElement {
  const side = WISP_IMAGE_SIDE
  const octaves = [
    {
      noise: seamlessNoise(4, 11),
      weight: 0.6,
    },
    {
      noise: seamlessNoise(8, 23),
      weight: 0.28,
    },
    {
      noise: seamlessNoise(16, 37),
      weight: 0.12,
    },
  ]
  const warpAcross = seamlessNoise(4, 51)
  const warpDown = seamlessNoise(4, 67)
  const strength = new Float64Array(side * side)

  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
      const warpedX = x + ((warpAcross(x, y) - 0.5) * 40)
      const warpedY = y + ((warpDown(x, y) - 0.5) * 40)
      let level = 0

      for (const octave of octaves) {
        level += octave.weight * octave.noise(warpedX, warpedY)
      }

      // Strong only along the noise's ridges, where it crosses its middle
      strength[(y * side) + x] = (1 - Math.abs((2 * level) - 1)) ** 7
    }
  }

  const lightAt = (x: number, y: number): number => Math.min(1, (strength[(y * side) + x] ?? 0) * 1.15)

  return twoToneImage(side, side, lightAt, (x, y) => lightAt(x, y) * smoothStep(0.4, 1, strength[(y * side) + x] ?? 0))
}

/**
 * Each fizzler's place in its run: the fizzlers side by side along its span,
 * as far as another fizzler continues it, which is also where its connectors
 * stand, at the run's two ends.
 * @param chamber - The chamber
 * @returns Each fizzler's place, by its number
 */
function runPlaces(chamber: CompiledChamber): RunPlace[] {
  const places: RunPlace[] = []

  for (let i = 0; i < chamber.countOf('fizzler'); i++) {
    const position = chamber.positionOf('fizzler', i)
    const span = chamber.gapSpan(position.x, position.y)
    // Along the run: to the right for a field spanning left to right, down the screen for one spanning top to bottom
    const dx = (span === 'H') ? 1 : 0
    const dy = (span === 'H') ? 0 : -1
    let start = 0

    while (chamber.elementAt('fizzler', position.x - (dx * (start + 1)), position.y - (dy * (start + 1))) !== NO_ELEMENT) {
      start++
    }

    let length = start + 1

    while (chamber.elementAt('fizzler', position.x + (dx * (length - start)), position.y + (dy * (length - start))) !== NO_ELEMENT) {
      length++
    }

    const firstX = position.x - (dx * start)
    const firstRow = chamber.height - 1 - (position.y - (dy * start))

    places.push({
      span: span,
      start: start,
      length: length,
      seed: 9001 + (firstX * 131) + (firstRow * 17),
    })
  }

  return places
}

/**
 * The fizzlers' fields, drawn in code over the subject and every element,
 * under the glows: a see-through blue sheet across each gap, from one
 * connector to the other, with thin wisps of cyan light winding slowly
 * through it, light pooling along each connector in unsteady tongues, and
 * short bright dashes drifting along it. Fizzlers side by side across one
 * gap make one field. A field switching off or on fades out or in, as far
 * as its transition says, every part of it as faint as the rest; where the
 * subject is caught in a field, a ring of light spreads through it from the
 * subject's tile; where a portal shot met a field, it splashes: it lights up
 * round the point met on its face, a white spot flashes there, and a ring of
 * light spreads from it. With no time given, a field holds still at one
 * moment and nothing flashes or splashes. Each tile is drawn straight onto the canvas, clipped to
 * the tile, in the field's own frame: one unit a tile, along its run from
 * the first connector, and across it, the way through.
 */
export class FizzlerField {
  private images: FieldImages | null = null // What the field is drawn from, made the first time a field is drawn
  private wisps: WispPatterns | null = null // The wisps' patterns, made again for another context
  private places: KeptPlaces | null = null // Each fizzler's place in its run, for the chamber last drawn

  /**
   * Draws every field that is on, or fading out or in.
   * @param painter - Paints on the canvas
   * @param state - The state drawn
   * @param shares - How far on the fizzlers that are changing are drawn, or null to draw every one as the state says
   * @param time - The frame's time, in milliseconds on the frame clock, or null to hold every field still
   * @param flashes - Where the subject was caught in a field lately, or null when none can flash
   * @param splashes - Where a portal shot met a field lately, or null (the default) when none can splash
   */
  draw(painter: TilePainter, state: RulesState, shares: BlockedShares | null, time: number | null, flashes: FizzlerFlashes | null, splashes: FizzlerSplashes | null = null): void {
    const chamber = state.chamber
    const count = chamber.countOf('fizzler')

    if (count === 0) {
      return
    }

    const places = this.placesOf(chamber)
    const seconds = (time === null) ? STILL_SECONDS : time / 1000
    const running = ((time === null) || (flashes === null)) ? [] : flashes.runningAt(time)
    const splashing = ((time === null) || (splashes === null)) ? [] : splashes.runningAt(time)

    for (let i = 0; i < count; i++) {
      const share = (shares === null) ? null : shares('fizzler', i)
      const strength = Math.min((share !== null) ? share : (state.isBlocked('fizzler', i) ? 1 : 0), 1)
      const place = places[i]

      if ((strength <= 0) || (place === undefined)) {
        continue
      }

      const position = chamber.positionOf('fizzler', i)
      const runFlashes = FizzlerField.flashesIn(chamber, places, place, running)
      const runSplashes = FizzlerField.splashesIn(chamber, places, place, splashing)

      painter.drawInFrame(position.x, position.y + 1, Direction.UP, (ctx, tileSize) => {
        this.drawTile(ctx, tileSize, place, seconds, runFlashes, runSplashes, strength)
      })
    }
  }

  /**
   * Draws one tile of a field, clipped to it, in the field's own frame.
   * @param ctx - The canvas's context, framed on the tile's top left corner
   * @param tileSize - Side of a tile, in canvas pixels
   * @param place - The tile's place in its run
   * @param seconds - The moment drawn, in seconds
   * @param flashes - The flashes running in its run
   * @param splashes - The splashes running in its run
   * @param fade - How far on the field is drawn, from 0 (gone) to 1 (on)
   */
  private drawTile(ctx: CanvasRenderingContext2D, tileSize: number, place: RunPlace, seconds: number, flashes: readonly RunFlash[], splashes: readonly RunSplash[], fade: number): void {
    const images = this.imagesOf()

    ctx.beginPath()
    ctx.rect(0, 0, tileSize, tileSize)
    ctx.clip()

    // Along the run to the right, or down the screen for a field spanning top to bottom
    if (place.span === 'H') {
      ctx.transform(tileSize, 0, 0, tileSize, -place.start * tileSize, 0)
    } else {
      ctx.transform(0, tileSize, tileSize, 0, 0, -place.start * tileSize)
    }

    ctx.globalAlpha = fade
    ctx.fillStyle = withAlpha(PALETTE.fizzlerField, FIELD_OPACITY)
    ctx.fillRect(place.start, 0, 1, 1)
    FizzlerField.drawWisps(ctx, place, seconds, this.wispsFor(ctx, images), fade)
    FizzlerField.drawGlow(ctx, place, fade)
    FizzlerField.drawTongues(ctx, place, seconds, images.tongue, fade)
    FizzlerField.drawDashes(ctx, place, seconds, images.dash, 1 / tileSize, fade)
    FizzlerField.drawFlashes(ctx, place, flashes, 1 / tileSize, fade)
    FizzlerField.drawSplashes(ctx, splashes, 1 / tileSize, fade)
  }

  /**
   * What the field is drawn from, made the first time it is asked for.
   * @returns The images
   */
  private imagesOf(): FieldImages {
    this.images = this.images ?? {
      dash: dashImage(),
      tongue: tongueImage(),
      wisps: wispsImage(),
    }

    return this.images
  }

  /**
   * The wisps' patterns for a context, one per layer, made again for
   * another context.
   * @param ctx - The context drawn on
   * @param images - What the field is drawn from
   * @returns The patterns
   */
  private wispsFor(ctx: CanvasRenderingContext2D, images: FieldImages): readonly CanvasPattern[] {
    if ((this.wisps === null) || (this.wisps.context !== ctx)) {
      this.wisps = {
        context: ctx,
        patterns: WISP_LAYERS.map(() => ctx.createPattern(images.wisps, 'repeat')).filter((pattern): pattern is CanvasPattern => pattern !== null),
      }
    }

    return this.wisps.patterns
  }

  /**
   * Each fizzler's place in its run, worked out once per chamber.
   * @param chamber - The chamber drawn
   * @returns The places, by fizzler number
   */
  private placesOf(chamber: CompiledChamber): readonly RunPlace[] {
    if ((this.places === null) || (this.places.chamber !== chamber)) {
      this.places = {
        chamber: chamber,
        places: runPlaces(chamber),
      }
    }

    return this.places.places
  }

  /**
   * The flashes running in a run: each where along the run the fizzler the
   * subject was caught in lies.
   * @param chamber - The chamber
   * @param places - Each fizzler's place in its run
   * @param place - A place in the run
   * @param running - Every flash running
   * @returns The run's flashes
   */
  private static flashesIn(chamber: CompiledChamber, places: readonly RunPlace[], place: RunPlace, running: readonly RunningFlash[]): RunFlash[] {
    const found: RunFlash[] = []

    for (const flash of running) {
      const caught = places[chamber.elementAt('fizzler', flash.x, flash.y)]

      if ((caught !== undefined) && (caught.seed === place.seed) && (caught.span === place.span)) {
        found.push({
          along: caught.start + 0.5,
          progress: flash.progress,
        })
      }
    }

    return found
  }

  /**
   * The splashes running in a run: each where along the run the fizzler the
   * shot met lies, and on which face, the side the shot came from.
   * @param chamber - The chamber
   * @param places - Each fizzler's place in its run
   * @param place - A place in the run
   * @param running - Every splash running
   * @returns The run's splashes
   */
  private static splashesIn(chamber: CompiledChamber, places: readonly RunPlace[], place: RunPlace, running: readonly RunningSplash[]): RunSplash[] {
    const found: RunSplash[] = []

    for (const splash of running) {
      const met = places[chamber.elementAt('fizzler', splash.x, splash.y)]

      if ((met !== undefined) && (met.seed === place.seed) && (met.span === place.span)) {
        const delta = DELTAS[splash.way]
        // The shot's way across the field's frame, which runs down the screen for a field spanning left to right and to
        // the right for one spanning top to bottom: moving that way it meets the face at 0, moving back the face at 1
        const across = (place.span === 'H') ? -delta.dy : delta.dx
        // And along the run, to the right or down the screen, for a shot along it from the open floor at a run's end,
        // which meets the end of the tile it reached, where the miss ripple sits
        const along = (place.span === 'H') ? delta.dx : -delta.dy

        found.push({
          along: (across !== 0) ? met.start + 0.5 : met.start + ((along > 0) ? 0 : 1),
          face: (across > 0) ? 0 : (across < 0) ? 1 : 0.5,
          progress: splash.progress,
        })
      }
    }

    return found
  }

  /**
   * Draws the wisps over the tile: each layer's pattern, drifting along and
   * across the field and breathing.
   * @param ctx - The canvas's context, in the field's frame
   * @param place - The tile's place in its run
   * @param seconds - The moment drawn, in seconds
   * @param patterns - Each layer's pattern
   * @param fade - How far on the field is drawn, from 0 to 1
   */
  private static drawWisps(ctx: CanvasRenderingContext2D, place: RunPlace, seconds: number, patterns: readonly CanvasPattern[], fade: number): void {
    WISP_LAYERS.forEach((layer, k) => {
      const pattern = patterns[k]

      if (pattern === undefined) {
        return
      }

      const breath = 0.75 + (0.25 * Math.sin(2 * Math.PI * ((layer.breaths * seconds) + (layer.shift * 0.4))))
      const along = (layer.along * seconds) + (layer.shift * 0.37) + ((place.seed % 7) * 0.13)
      const across = (layer.across * seconds) + (layer.shift * 0.61)

      pattern.setTransform(new DOMMatrix().translateSelf(along, across).scaleSelf(layer.span / WISP_IMAGE_SIDE))
      ctx.globalAlpha = Math.min(1, WISP_STRENGTH * layer.strength * breath) * fade
      ctx.fillStyle = pattern
      ctx.fillRect(place.start, 0, 1, 1)
    })
  }

  /**
   * Draws the steady light along each connector of the run, fading into
   * the field, on the tiles it reaches.
   * @param ctx - The canvas's context, in the field's frame
   * @param place - The tile's place in its run
   * @param fade - How far on the field is drawn, from 0 to 1
   */
  private static drawGlow(ctx: CanvasRenderingContext2D, place: RunPlace, fade: number): void {
    const ends = [
      [
        0,
        GLOW_REACH,
      ],
      [
        place.length,
        place.length - GLOW_REACH,
      ],
    ] as const

    for (const [
      from,
      to,
    ] of ends) {
      if ((Math.max(from, to) < place.start) || (Math.min(from, to) > place.start + 1)) {
        continue
      }

      const fill = ctx.createLinearGradient(from, 0, to, 0)

      fill.addColorStop(0, withAlpha(PALETTE.fizzlerCore, 0.95 * GLOW_STRENGTH))
      fill.addColorStop(0.3, withAlpha(PALETTE.fizzlerLight, 0.5 * GLOW_STRENGTH))
      fill.addColorStop(1, withAlpha(PALETTE.fizzlerLight, 0))
      ctx.globalAlpha = fade
      ctx.fillStyle = fill
      ctx.fillRect(Math.min(from, to), 0, Math.abs(to - from), 1)
    }
  }

  /**
   * Draws the tongues of light reaching in from each connector, each its own
   * length, growing and shrinking slowly and a little unsteady, on the tiles
   * they reach.
   * @param ctx - The canvas's context, in the field's frame
   * @param place - The tile's place in its run
   * @param seconds - The moment drawn, in seconds
   * @param image - A tongue's image
   * @param fade - How far on the field is drawn, from 0 to 1
   */
  private static drawTongues(ctx: CanvasRenderingContext2D, place: RunPlace, seconds: number, image: HTMLCanvasElement, fade: number): void {
    const longest = GLOW_REACH * 2.6

    for (const end of [
      0,
      1,
    ]) {
      const root = (end === 0) ? 0 : place.length

      if ((end === 0) ? (root + longest < place.start) : (root - longest > place.start + 1)) {
        continue
      }

      for (let j = 0; j < TONGUES_PER_CONNECTOR; j++) {
        const numberOf = (salt: number): number => pieceNumber(place.seed + SALTS.tongues + end, j, salt)
        const across = (j + 0.2 + (0.6 * numberOf(1))) / TONGUES_PER_CONNECTOR
        const slow = wave(0.18 + (0.22 * numberOf(2)), seconds, numberOf(3))
        const quick = wave(1.4 + (1.6 * numberOf(4)), seconds, numberOf(5))
        const length = GLOW_REACH * (0.9 + (1.5 * slow * GLOW_FLICKER) + (0.2 * numberOf(6)))
        const width = 0.16 + (0.14 * numberOf(7))
        const alpha = GLOW_STRENGTH * (0.6 + (0.35 * slow)) * (1 - (GLOW_FLICKER * 0.3 * quick))

        ctx.save()
        ctx.translate(root, across)

        // The far connector's tongues reach back the other way
        if (end === 1) {
          ctx.scale(-1, 1)
        }

        ctx.globalAlpha = Math.min(1, alpha) * fade
        ctx.drawImage(image, 0, -width / 2, length, width)
        ctx.restore()
      }
    }
  }

  /**
   * Draws the dashes on the tile: scattered along the whole run, each
   * drifting its own way and twinkling; one drifting out at one end comes
   * back in at the other, faded out near the ends so the jump never shows.
   * @param ctx - The canvas's context, in the field's frame
   * @param place - The tile's place in its run
   * @param seconds - The moment drawn, in seconds
   * @param image - A dash's image
   * @param pixel - A canvas pixel, in tiles
   * @param fade - How far on the field is drawn, from 0 to 1
   */
  private static drawDashes(ctx: CanvasRenderingContext2D, place: RunPlace, seconds: number, image: HTMLCanvasElement, pixel: number, fade: number): void {
    const total = Math.round(DASHES_PER_TILE * place.length)
    const thickness = Math.max(pixel * 3, DASH_THICKNESS)

    for (let i = 0; i < total; i++) {
      const numberOf = (salt: number): number => pieceNumber(place.seed + SALTS.dashes, i, salt)
      const way = (numberOf(1) < 0.5) ? -1 : 1
      const speed = DASH_DRIFT * (0.5 + numberOf(2))
      const along = ((((numberOf(3) * place.length) + (way * speed * seconds)) % place.length) + place.length) % place.length
      const length = DASH_LENGTH * (0.6 + (0.8 * numberOf(4)))

      if ((along + length < place.start) || (along - length > place.start + 1)) {
        continue
      }

      const across = 0.05 + (0.9 * numberOf(5))
      const twinkle = 0.55 + (0.45 * Math.sin(2 * Math.PI * (((0.4 + (1.4 * numberOf(6))) * seconds) + numberOf(7))))
      const ends = smoothStep(0, DASH_END_FADE, along) * smoothStep(place.length, place.length - DASH_END_FADE, along)
      const alpha = Math.min(1, (0.75 + (0.45 * numberOf(8))) * twinkle * ends)

      if (alpha > 0) {
        ctx.globalAlpha = alpha * fade
        ctx.drawImage(image, along - (length / 2), across - (thickness / 2), length, thickness)
      }
    }
  }

  /**
   * Draws the flashes running in the run on the tile: the field brightens,
   * and a ring spreads from the tile the subject was caught on, at a near
   * even pace, so it stays inside a single tile for most of its life.
   * @param ctx - The canvas's context, in the field's frame
   * @param place - The tile's place in its run
   * @param flashes - The run's flashes
   * @param pixel - A canvas pixel, in tiles
   * @param fade - How far on the field is drawn, from 0 to 1
   */
  private static drawFlashes(ctx: CanvasRenderingContext2D, place: RunPlace, flashes: readonly RunFlash[], pixel: number, fade: number): void {
    for (const flash of flashes) {
      const progress = flash.progress

      if ((progress < 0) || (progress >= 1)) {
        continue
      }

      const strength = FLASH_STRENGTH * ((1 - progress) ** FLASH_FADE_POWER)
      const radius = 0.06 + (0.75 * (progress ** 0.8))

      ctx.globalAlpha = fade
      ctx.fillStyle = withAlpha(PALETTE.fizzlerLight, FLASH_FILL * strength)
      ctx.fillRect(place.start, 0, 1, 1)
      ctx.beginPath()
      ctx.arc(flash.along, 0.5, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = withAlpha(PALETTE.fizzlerCore, Math.min(1, 1.1 * strength))
      ctx.lineWidth = Math.max(pixel * 1.2, 0.1 * (1 - progress))
      ctx.stroke()
      ctx.strokeStyle = withAlpha(PALETTE.fizzlerLight, 0.35 * strength)
      ctx.lineWidth = Math.max(pixel * 2, 0.28 * (1 - progress))
      ctx.stroke()
    }
  }

  /**
   * Draws the splashes running in the run on the tile: the field lights up
   * round the point the shot met on its face, a white spot flashes there
   * for a moment, and a ring of light spreads from it into the field, all
   * fading, quickly at first.
   * @param ctx - The canvas's context, in the field's frame
   * @param splashes - The run's splashes
   * @param pixel - A canvas pixel, in tiles
   * @param fade - How far on the field is drawn, from 0 to 1
   */
  private static drawSplashes(ctx: CanvasRenderingContext2D, splashes: readonly RunSplash[], pixel: number, fade: number): void {
    for (const splash of splashes) {
      const progress = splash.progress

      if ((progress < 0) || (progress >= 1)) {
        continue
      }

      const strength = SPLASH_STRENGTH * ((1 - progress) ** SPLASH_FADE_POWER)
      const spot = Math.max(1 - ((progress * SPLASH_MILLISECONDS) / SPLASH_SPOT_MILLISECONDS), 0)
      const radius = 0.05 + (SPLASH_REACH * (progress ** 0.8))

      ctx.globalAlpha = fade
      FizzlerField.drawSoftSpot(ctx, splash.along, splash.face, 0.25 + (SPLASH_REACH * 0.9), PALETTE.fizzlerLight, SPLASH_FILL * strength)
      FizzlerField.drawSoftSpot(ctx, splash.along, splash.face, SPLASH_SPOT_RADIUS, PALETTE.fizzlerSplashSpot, 0.9 * SPLASH_STRENGTH * spot)
      ctx.beginPath()
      ctx.arc(splash.along, splash.face, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = withAlpha(PALETTE.fizzlerLight, 0.45 * strength)
      ctx.lineWidth = Math.max(pixel * 2, 0.3 * (1 - progress))
      ctx.stroke()
      ctx.strokeStyle = withAlpha(PALETTE.fizzlerSplashRing, Math.min(1.2 * strength, 1))
      ctx.lineWidth = Math.max(pixel * 1.5, 0.11 * (1 - progress))
      ctx.stroke()
    }
  }

  /**
   * Draws a soft round spot of light, a colour fading out from its middle.
   * @param ctx - The canvas's context, in the field's frame
   * @param along - Its middle, along the run, in tiles
   * @param across - Its middle, across the field, in tiles
   * @param radius - How far it reaches, in tiles
   * @param colour - Its colour
   * @param alpha - How opaque it is at its middle, from 0 to 1
   */
  private static drawSoftSpot(ctx: CanvasRenderingContext2D, along: number, across: number, radius: number, colour: string, alpha: number): void {
    if (alpha <= 0) {
      return
    }

    const fill = ctx.createRadialGradient(along, across, 0, along, across, radius)

    fill.addColorStop(0, withAlpha(colour, alpha))
    fill.addColorStop(1, withAlpha(colour, 0))
    ctx.fillStyle = fill
    ctx.fillRect(along - radius, across - radius, radius * 2, radius * 2)
  }
}
