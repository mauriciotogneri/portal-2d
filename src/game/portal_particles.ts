import type {Direction} from '@/game/direction'
import {PALETTE, withAlpha} from '@/game/palette'
import {pieceNumber} from '@/game/piece_number'
import {OVAL_INSET} from '@/game/portal_openings'
import {PORTAL_COLORS, PortalColor} from '@/game/rules/portal_color'
import type {RulesState} from '@/game/rules/rules_state'
import {smoothStep} from '@/game/surface_noise'
import type {TilePainter} from '@/game/tile_painter'

/**
 * A portal giving off particles: where it is, when it opened and, once it
 * has closed or moved, when.
 */
type Source = {
  readonly color: PortalColor // Which portal
  readonly x: number // Column of its wall
  readonly y: number // Row of its wall
  readonly side: Direction // The side of the wall it opens on
  readonly seed: number // Sets its particles apart from another portal's
  readonly openTime: number // When it opened, in milliseconds on the frame clock; minus infinity for one found already open, at full strength at once
  readonly closeTime: number // When it closed or moved, in milliseconds on the frame clock; infinity while it is open
}

/**
 * What a portal's particles are drawn from, made once per colour.
 */
type ParticleImages = {
  readonly shaft: HTMLCanvasElement // A shaft of light: brightest at its foot and along its middle, fading up and to its sides
  readonly spark: HTMLCanvasElement // A spark: a pale middle in a ring of the portal's colour, fading to nothing
}

/** A portal's colours, as the palette names them */
type ParticleColors = {
  readonly rim: string // A shaft's sides and a spark's ring
  readonly shaft: string // A shaft's middle
  readonly core: string // A spark's middle
}

/** How many shafts stand on a portal at once, on average */
const SHAFTS_AT_ONCE = 6

/** How long a shaft lasts, before each shaft's own spread, in milliseconds */
const SHAFT_MILLISECONDS = 600

/** How much longer or shorter a shaft lasts: from 0.8 to 1.3 times as long */
const SHAFT_LIFE_SPREAD = {
  from: 0.8,
  range: 0.5,
}

/** How far a shaft reaches into the room at most, as a share of a tile */
const SHAFT_LENGTH = 0.5

/** How wide a shaft is, before each shaft's own spread, as a share of a tile */
const SHAFT_WIDTH = 0.25

/** How much wider or narrower a shaft is: from 0.6 to 1.4 times as wide */
const SHAFT_WIDTH_SPREAD = {
  from: 0.6,
  range: 0.8,
}

/** How much shorter a shaft can be: from 0.55 of its length to all of it */
const SHAFT_LENGTH_SPREAD = {
  from: 0.55,
  range: 0.45,
}

/** How tall a shaft stands as it starts, as a share of its length; it grows to all of it as it goes */
const SHAFT_GROWTH_FROM = 0.85

/** How far along the oval a shaft stands from its middle, at most, as a share of the oval's half width */
const SHAFT_SPREAD = 0.78

/** How far below the oval's middle a shaft's foot stands, as a share of the oval's half height, so it rises from the oval's face */
const SHAFT_FOOT = 0.4

/** How strongly a shaft shows at its brightest, as a share of the particles' strength */
const SHAFT_SHARE = 0.8

/** How sharply a shaft fades in and out: above 1, it stays faint longer at both ends */
const SHAFT_FADE_POWER = 1.5

/** How many sparks leave a portal each second */
const SPARKS_PER_SECOND = 20

/** How long a spark climbs, from 1 to 1.6 s, in milliseconds */
const SPARK_LIFE = {
  from: 1000,
  range: 600,
}

/** A spark's radius, before each spark's own spread, as a share of a tile */
const SPARK_SIZE = 0.015

/** How much larger or smaller a spark is: from 0.6 to 1.1 times as large */
const SPARK_SIZE_SPREAD = {
  from: 0.6,
  range: 0.5,
}

/** How far along the oval a spark leaves from its middle, at most, as a share of the oval's half width */
const SPARK_SPREAD = 0.8

/** How far a spark climbs, from 0.35 to all of a shaft's length */
const SPARK_CLIMB_SPREAD = {
  from: 0.35,
  range: 0.65,
}

/** How often a spark twinkles, from 2.5 to 4.5 times a second */
const TWINKLE_RATE = {
  from: 2.5,
  range: 2,
}

/** A spark at its faintest while it twinkles, as a share of its strength */
const TWINKLE_FAINTEST = 0.1

/** How strongly the particles are painted over what lies beneath, at their strongest */
const STRENGTH = 0.65

/** How long a portal that just opened takes to give off particles at full strength, in milliseconds */
const OPENING_RAMP_MILLISECONDS = 300

/** How long the particles still in the air take to fade once their portal closes or moves, in milliseconds */
const CLOSING_FADE_MILLISECONDS = 200

/** How far a particle's birth counts as later than it is when judging how far its portal had opened, in milliseconds, so the first ones aren't wholly faint */
const OPENING_HEAD_START = 50

/** Half the width of the portal's oval in its sprite (art/sprites/portal_blue.svg: 97.25 px of the 256 px tile), as a share of a tile */
const OVAL_HALF_WIDTH = 97.25 / 256

/** Half the height of the portal's oval in its sprite (19.75 px of the 256 px tile), as a share of a tile */
const OVAL_HALF_HEIGHT = 19.75 / 256

/** The faintest particle worth drawing */
const FAINTEST = 0.002

/** The smallest spark radius worth drawing, in pixels */
const SMALLEST_RADIUS = 0.05

/** A spark's image's side, in pixels: drawn shrunk to each spark's size */
const SPARK_IMAGE_SIDE = 64

/** A shaft's image's width, in pixels: drawn stretched to each shaft's size */
const SHAFT_IMAGE_WIDTH = 32

/** A shaft's image's height, in pixels */
const SHAFT_IMAGE_HEIGHT = 128

/** Each portal's colours */
const PARTICLE_COLORS: Readonly<Record<PortalColor, ParticleColors>> = {
  [PortalColor.BLUE]: {
    rim: PALETTE.particleBlue,
    shaft: PALETTE.particleBlueShaft,
    core: PALETTE.particleBlueCore,
  },
  [PortalColor.ORANGE]: {
    rim: PALETTE.particleOrange,
    shaft: PALETTE.particleOrangeShaft,
    core: PALETTE.particleOrangeCore,
  },
}

/** What a source's shafts are numbered by, added to its seed */
const SHAFT_STREAM = 0

/** What its sparks are numbered by, so they don't share the shafts' numbers; a source's seed is even, so no two sources share theirs */
const SPARK_STREAM = 1

/**
 * Draws a spark's image: a pale middle, a ring of the portal's colour round
 * it, fading to nothing at its edge.
 * @param colors - The portal's colours
 * @returns The image
 */
function sparkImage(colors: ParticleColors): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const half = SPARK_IMAGE_SIDE / 2

  canvas.width = SPARK_IMAGE_SIDE
  canvas.height = SPARK_IMAGE_SIDE

  if (ctx !== null) {
    const fill = ctx.createRadialGradient(half, half, 0, half, half, half)

    fill.addColorStop(0, colors.core)
    fill.addColorStop(0.16, colors.core)
    fill.addColorStop(0.34, withAlpha(colors.rim, 0.9))
    fill.addColorStop(0.62, withAlpha(colors.rim, 0.28))
    fill.addColorStop(1, withAlpha(colors.rim, 0))
    ctx.fillStyle = fill
    ctx.fillRect(0, 0, SPARK_IMAGE_SIDE, SPARK_IMAGE_SIDE)
  }

  return canvas
}

/**
 * Draws a shaft's image, standing on its foot at the bottom: across it, a
 * bell of light, its middle a little lighter than its sides; up it, rising
 * from the foot to its brightest just above it, then thinning out towards
 * the top.
 * @param colors - The portal's colours
 * @returns The image
 */
function shaftImage(colors: ParticleColors): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = SHAFT_IMAGE_WIDTH
  canvas.height = SHAFT_IMAGE_HEIGHT

  if (ctx !== null) {
    // Across: a bell, e^(-5x²) from the middle to each side
    const across = ctx.createLinearGradient(0, 0, SHAFT_IMAGE_WIDTH, 0)

    across.addColorStop(0, withAlpha(colors.rim, 0.007))
    across.addColorStop(0.125, withAlpha(colors.rim, 0.06))
    across.addColorStop(0.25, withAlpha(colors.rim, 0.29))
    across.addColorStop(0.375, withAlpha(colors.rim, 0.73))
    across.addColorStop(0.5, colors.shaft)
    across.addColorStop(0.625, withAlpha(colors.rim, 0.73))
    across.addColorStop(0.75, withAlpha(colors.rim, 0.29))
    across.addColorStop(0.875, withAlpha(colors.rim, 0.06))
    across.addColorStop(1, withAlpha(colors.rim, 0.007))
    ctx.fillStyle = across
    ctx.fillRect(0, 0, SHAFT_IMAGE_WIDTH, SHAFT_IMAGE_HEIGHT)

    // Up: kept where the light is, nothing at the top, growing towards the foot, then falling away over its last tenth
    const up = ctx.createLinearGradient(0, 0, 0, SHAFT_IMAGE_HEIGHT)

    up.addColorStop(0, 'rgba(0, 0, 0, 0)')
    up.addColorStop(0.25, 'rgba(0, 0, 0, 0.095)')
    up.addColorStop(0.5, 'rgba(0, 0, 0, 0.31)')
    up.addColorStop(0.75, 'rgba(0, 0, 0, 0.61)')
    up.addColorStop(0.9, 'rgba(0, 0, 0, 0.84)')
    up.addColorStop(0.95, 'rgba(0, 0, 0, 0.46)')
    up.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = up
    ctx.fillRect(0, 0, SHAFT_IMAGE_WIDTH, SHAFT_IMAGE_HEIGHT)
  }

  return canvas
}

/**
 * A spark's strength over its climb: in quickly, held, then out over the
 * second half.
 * @param progress - How far through its climb, from 0 to 1
 * @returns The share of its strength, from 0 to 1
 */
function sparkEnvelope(progress: number): number {
  return smoothStep(0, 0.12, progress) * (1 - smoothStep(0.5, 1, progress))
}

/**
 * Calls a function for each particle of one of a source's streams in the
 * air at a time: born at a steady rate, each a little after its slot on the
 * frame clock, from the moment the source opened until it closed, and
 * still within the longest a particle of the stream lasts.
 * @param source - The portal giving them off
 * @param stream - Which of its streams
 * @param perMillisecond - How many are born each millisecond
 * @param longest - The longest one lasts, in milliseconds
 * @param time - Now, in milliseconds on the frame clock
 * @param visit - Called with each one's number and when it was born, in milliseconds on the frame clock
 */
function eachInAir(source: Source, stream: number, perMillisecond: number, longest: number, time: number, visit: (index: number, born: number) => void): void {
  const first = Math.max(0, Math.floor((time - longest) * perMillisecond) - 1)
  const last = Math.floor(time * perMillisecond)

  for (let index = first; index <= last; index++) {
    const born = (index + (pieceNumber(source.seed + stream, index, 0) * 0.85)) / perMillisecond

    if ((born <= time) && (born >= source.openTime) && (born < source.closeTime)) {
      visit(index, born)
    }
  }
}

/**
 * The particles rising from the open portals: soft shafts of light that
 * stand on the oval for a moment, and small sparks climbing them, drawn in
 * the portal's own colours, painted over what lies beneath. Purely visual:
 * each particle's place is worked out afresh every frame from when it was
 * born, so nothing is kept per particle. A portal that just opened comes up
 * to strength over a short time; once it closes or moves, the particles
 * still in the air fade out where they are.
 */
export class PortalParticles {
  private readonly sources: Record<PortalColor, Source | null> = {
    [PortalColor.BLUE]: null,
    [PortalColor.ORANGE]: null,
  } // Each portal while it is open, as it was last seen
  private closed: Source[] = [] // The portals that closed or moved lately, their particles fading
  private readonly images = new Map<PortalColor, ParticleImages>() // Each colour's images, made the first time they are needed

  /**
   * Follows a step that opened, moved or closed a portal: the portal that
   * was there starts fading, and the one that is there now starts giving
   * off particles.
   * @param before - The state before the step
   * @param after - The state after it
   * @param time - When it happened, in milliseconds on the frame clock
   */
  start(before: RulesState, after: RulesState, time: number): void {
    for (const color of PORTAL_COLORS) {
      if (!PortalParticles.samePlace(before, after, color)) {
        this.close(color, time)
        this.sources[color] = PortalParticles.sourceOf(after, color, time)
      }
    }
  }

  /**
   * Forgets every portal, so nothing is drawn until one opens.
   */
  clear(): void {
    for (const color of PORTAL_COLORS) {
      this.sources[color] = null
    }

    this.closed = []
  }

  /**
   * Whether there are particles to draw at a time: while a portal is open,
   * and while those of one that closed are fading.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while there is something to draw
   */
  isRunningAt(time: number): boolean {
    this.closed = this.closed.filter((source) => time - source.closeTime < CLOSING_FADE_MILLISECONDS)

    return (this.closed.length > 0) || PORTAL_COLORS.some((color) => this.sources[color] !== null)
  }

  /**
   * Draws the particles in the air at a time, those of the portals that
   * closed lately first. A portal the state has but no step was followed
   * for, such as one opened while motion was reduced, is taken as open
   * long since; one followed that the state no longer has is dropped.
   * @param painter - Paints on the canvas
   * @param state - The state drawn
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  draw(painter: TilePainter, state: RulesState, time: number): void {
    for (const source of this.closed) {
      if (time - source.closeTime < CLOSING_FADE_MILLISECONDS) {
        this.drawSource(painter, source, time)
      }
    }

    for (const color of PORTAL_COLORS) {
      const source = this.sources[color]
      const side = state.portalSide(color)

      if ((side === null) || (source === null) || (source.x !== state.portalX(color)) || (source.y !== state.portalY(color)) || (source.side !== side)) {
        this.sources[color] = PortalParticles.sourceOf(state, color, Number.NEGATIVE_INFINITY)
      }

      const shown = this.sources[color]

      if (shown !== null) {
        this.drawSource(painter, shown, time)
      }
    }
  }

  /**
   * Starts a portal's particles fading, if it is open.
   * @param color - The portal
   * @param time - When it closed or moved, in milliseconds on the frame clock
   */
  private close(color: PortalColor, time: number): void {
    const source = this.sources[color]

    if (source !== null) {
      this.closed.push({
        ...source,
        closeTime: time,
      })
      this.sources[color] = null
    }
  }

  /**
   * Draws one portal's particles, in its frame: turned as its sprite is,
   * the room above the oval.
   * @param painter - Paints on the canvas
   * @param source - The portal
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  private drawSource(painter: TilePainter, source: Source, time: number): void {
    const images = this.imagesOf(source.color)
    // Particles in the air fade once their portal closes; one born just after it opened is fainter
    const fade = (born: number): number => {
      const closing = (time > source.closeTime) ? Math.max(0, 1 - ((time - source.closeTime) / CLOSING_FADE_MILLISECONDS)) : 1

      return closing * smoothStep(0, OPENING_RAMP_MILLISECONDS, born - source.openTime + OPENING_HEAD_START)
    }

    painter.drawInFrame(source.x + 0.5, source.y + 0.5, source.side, (ctx, tileSize) => {
      const ovalY = -(0.5 - OVAL_INSET) * tileSize
      const halfWidth = OVAL_HALF_WIDTH * tileSize
      const halfHeight = OVAL_HALF_HEIGHT * tileSize
      const shaftLongest = SHAFT_MILLISECONDS * (SHAFT_LIFE_SPREAD.from + SHAFT_LIFE_SPREAD.range)

      eachInAir(source, SHAFT_STREAM, SHAFTS_AT_ONCE / SHAFT_MILLISECONDS, shaftLongest, time, (index, born) => {
        const numberOf = (salt: number): number => pieceNumber(source.seed + SHAFT_STREAM, index, salt)
        const life = SHAFT_MILLISECONDS * (SHAFT_LIFE_SPREAD.from + (SHAFT_LIFE_SPREAD.range * numberOf(1)))
        const progress = (time - born) / life

        if (progress >= 1) {
          return
        }

        const along = halfWidth * SHAFT_SPREAD * ((numberOf(2) * 2) - 1)
        const width = SHAFT_WIDTH * tileSize * (SHAFT_WIDTH_SPREAD.from + (SHAFT_WIDTH_SPREAD.range * numberOf(3)))
        const length = SHAFT_LENGTH * tileSize * (SHAFT_LENGTH_SPREAD.from + (SHAFT_LENGTH_SPREAD.range * numberOf(4))) * (SHAFT_GROWTH_FROM + ((1 - SHAFT_GROWTH_FROM) * progress))
        const alpha = STRENGTH * SHAFT_SHARE * (Math.sin(Math.PI * progress) ** SHAFT_FADE_POWER) * fade(born)

        if (alpha > FAINTEST) {
          ctx.globalAlpha = Math.min(1, alpha)
          ctx.drawImage(images.shaft, along - (width / 2), ovalY + (halfHeight * SHAFT_FOOT) - length, width, length)
        }
      })

      eachInAir(source, SPARK_STREAM, SPARKS_PER_SECOND / 1000, SPARK_LIFE.from + SPARK_LIFE.range, time, (index, born) => {
        const numberOf = (salt: number): number => pieceNumber(source.seed + SPARK_STREAM, index, salt)
        const life = SPARK_LIFE.from + (SPARK_LIFE.range * numberOf(1))
        const age = time - born

        if (age >= life) {
          return
        }

        const progress = age / life
        const along = halfWidth * SPARK_SPREAD * ((numberOf(2) * 2) - 1)
        const climb = SHAFT_LENGTH * tileSize * (SPARK_CLIMB_SPREAD.from + (SPARK_CLIMB_SPREAD.range * numberOf(3))) * progress * (1.2 - (0.2 * progress))
        // Swinging between its faintest and full strength, each spark at a pace and a point of its own
        const twinkle = ((1 + TWINKLE_FAINTEST) / 2) + (((1 - TWINKLE_FAINTEST) / 2) * Math.sin(2 * Math.PI * (numberOf(4) + ((age / 1000) * (TWINKLE_RATE.from + (TWINKLE_RATE.range * numberOf(5)))))))
        const radius = SPARK_SIZE * tileSize * (SPARK_SIZE_SPREAD.from + (SPARK_SIZE_SPREAD.range * numberOf(6)))
        const alpha = STRENGTH * sparkEnvelope(progress) * twinkle * fade(born)

        if ((alpha > FAINTEST) && (radius > SMALLEST_RADIUS)) {
          ctx.globalAlpha = Math.min(1, alpha)
          ctx.drawImage(images.spark, along - radius, ovalY - climb - radius, radius * 2, radius * 2)
        }
      })
    })
  }

  /**
   * A colour's images, made the first time they are asked for.
   * @param color - The portal
   * @returns Its shaft's and its spark's images
   */
  private imagesOf(color: PortalColor): ParticleImages {
    let images = this.images.get(color)

    if (images === undefined) {
      images = {
        shaft: shaftImage(PARTICLE_COLORS[color]),
        spark: sparkImage(PARTICLE_COLORS[color]),
      }
      this.images.set(color, images)
    }

    return images
  }

  /**
   * Whether a step left a portal where it was: open on the same side of the
   * same wall, or closed both before and after.
   * @param before - The state before the step
   * @param after - The state after it
   * @param color - The portal
   * @returns True when the step didn't open, move or close it
   */
  private static samePlace(before: RulesState, after: RulesState, color: PortalColor): boolean {
    const side = before.portalSide(color)

    if (side === null) {
      return after.portalSide(color) === null
    }

    return (after.portalSide(color) === side) && (after.portalX(color) === before.portalX(color)) && (after.portalY(color) === before.portalY(color))
  }

  /**
   * A state's portal as a source of particles, or null when it is closed.
   * @param state - The state
   * @param color - The portal
   * @param openTime - When it opened, in milliseconds on the frame clock, or minus infinity when that isn't known
   * @returns The source, or null
   */
  private static sourceOf(state: RulesState, color: PortalColor, openTime: number): Source | null {
    const side = state.portalSide(color)

    if (side === null) {
      return null
    }

    const x = state.portalX(color)
    const y = state.portalY(color)
    const opened = Number.isFinite(openTime) ? Math.round(openTime) : 0

    return {
      color: color,
      x: x,
      y: y,
      side: side,
      seed: Math.trunc(pieceNumber((color === PortalColor.BLUE) ? 1 : 2, (x * 4096) + y, opened) * 1000000) * 2,
      openTime: openTime,
      closeTime: Number.POSITIVE_INFINITY,
    }
  }
}
