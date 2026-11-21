import {Direction} from '@/game/direction'
import type {BlockedShares} from '@/game/element_transitions'
import type {LightBarrierReactions, RunningReaction} from '@/game/light_barrier_reactions'
import {PALETTE, withAlpha} from '@/game/palette'
import type {BeamOrientation, CompiledChamber} from '@/game/rules/compiled_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import {keptImage, makeCanvas} from '@/game/sprite_scaling'
import {smoothStep} from '@/game/surface_noise'
import type {TilePainter} from '@/game/tile_painter'

/**
 * A light barrier's place in its run, the light barriers side by side
 * running one way, drawn as one band from the end plate at its start to the
 * one at its end.
 */
type RunPlace = {
  readonly orientation: BeamOrientation // Which way the band runs: left to right, or top to bottom
  readonly start: number // How far along the run its tile starts, in tiles from the run's first end plate
  readonly length: number // The run's length, in tiles
  readonly seed: number // Sets the run's flicker apart from every other run's
}

/** Each light barrier's place in its run, kept for the chamber they were worked out for */
type KeptPlaces = {
  readonly chamber: CompiledChamber // The chamber
  readonly places: readonly (RunPlace | null)[] // Each light barrier's place, by its number; null for one that runs neither way
}

/** How a band shows part way through switching off or on */
type BandLook = {
  readonly fade: number // How opaque all of it is drawn, from 0 to 1
  readonly front: number // How far it has run out of its end plates towards the run's middle, from 0 to 1 (met in the middle)
  readonly open: number // How wide it has opened, as a share of its full width
  readonly line: number // How bright the line it unfolds from is, from 0 to 1
}

/** A reaction running in a band's run, as the tile drawn sees it */
type RunReaction = {
  readonly along: number // Where along the run the band was met, in tiles from its first end plate
  readonly side: number // Which face was met: 1 the face further across (below a band running left to right, right of one running top to bottom), -1 the nearer one, 0 its end, met along the band
  readonly progress: number // How far through the reaction, from 0 to 1
}

/** Half the band's width across its tile, in tiles: 96 px of 256. A ray ends, and a missed shot ripples, at its rim */
export const BAND_HALF_WIDTH = 48 / 256

/** The deep teal rim just outside each edge of the band, in tiles */
export const BAND_RIM = 2 / 256

/** How opaque the band's teal is over the floor */
const BAND_OPACITY = 0.7

/** How opaque its rim is */
const RIM_OPACITY = 0.5

/** Each bright edge line's thickness, in tiles, and never thinner than a pixel */
const EDGE_LINE = 3 / 256

/** How far in from each edge the light along it fades out, as a share of the band's full width */
const EDGE_LIGHT_DEPTH = 0.2

/** How bright the light along each edge is where it starts */
const EDGE_LIGHT_STRENGTH = 0.95

/** How far the light pooling where the band leaves an end plate reaches into it, in tiles */
const PLATE_GLOW_REACH = 0.4

/** How strongly the edges flicker: how much of their brightness they can lose at their dimmest */
const FLICKER_DEPTH = 0.225

/** The three waves the edges' flicker is made of, each its pace and its point in a cycle, as a share of the run's own phase */
const FLICKER_WAVES = [
  {
    cyclesPerSecond: 7.3,
    phase: 1,
  },
  {
    cyclesPerSecond: 11.9,
    phase: 2,
  },
  {
    cyclesPerSecond: 3.1,
    phase: 3,
  },
] as const

/** How far through switching the line it unfolds from has run out of both plates to meet in the middle */
const RUN_OUT_BY = 0.35

/** How far through switching it starts to widen from that line */
const WIDEN_FROM = 0.3

/** How far through switching it is drawn fully opaque */
const APPEAR_BY = 0.08

/** How far through switching its end plates' slots are lit */
const PLATES_LIT_BY = 0.25

/** How bright the line it unfolds from is at its brightest, half way through switching */
const LINE_STRENGTH = 0.9

/** The line's thickness, in tiles, and never thinner than 1.5 pixels */
const LINE_THICKNESS = 0.018

/** Half the width of the bright front running out of each plate, in tiles */
const FRONT_HALF_WIDTH = 0.07

/** How bright that front is at its brightest */
const FRONT_STRENGTH = 0.95

/** How strong a reaction is */
const REACTION_STRENGTH = 0.8

/** How far the band brightens round where it was met, in tiles */
const REACTION_GLOW_RADIUS = 0.45

/** How far the two halves of the reaction's bar run off along the band by its end, in tiles */
const REACTION_RUN = 1.3

/**
 * How bright a band's end plates' slots are drawn part way through
 * switching: lit early in the band's coming on, and still lit until late
 * in its going off.
 * @param share - How far on the band is, from 0 (off) to 1 (on)
 * @returns How lit the slots are, from 0 to 1
 */
export function plateShine(share: number): number {
  return smoothStep(0, PLATES_LIT_BY, share)
}

/**
 * How a band shows part way through switching, the same both ways: a
 * bright line runs out of both end plates and meets in the middle, then
 * widens into the band, and the other way round as it goes off.
 * @param share - How far on it is, from 0 (off) to 1 (on)
 * @returns How it is drawn
 */
function switchingLook(share: number): BandLook {
  const line = LINE_STRENGTH * Math.sin(Math.PI * share)

  return {
    fade: Math.max(smoothStep(0, APPEAR_BY, share), line),
    front: smoothStep(0, RUN_OUT_BY, share),
    open: smoothStep(WIDEN_FROM, 1, share),
    line: line,
  }
}

/**
 * How bright a run's edges are at a moment: they flicker faintly, three
 * waves at paces of their own, each run at a point of its own.
 * @param place - A place in the run
 * @param seconds - The moment drawn, in seconds
 * @returns From 1 - FLICKER_DEPTH to 1
 */
function edgeBrightness(place: RunPlace, seconds: number): number {
  const phase = (place.seed % 11) * 0.31
  let sum = 0

  for (const wave of FLICKER_WAVES) {
    sum += Math.sin(2 * Math.PI * ((wave.cyclesPerSecond * seconds) + (phase * wave.phase)))
  }

  return 1 - (FLICKER_DEPTH * (0.5 + (0.5 * (sum / FLICKER_WAVES.length))))
}

/**
 * Paints the band's body over one tile, in the band's frame: its deep teal
 * rim, then its see-through teal.
 * @param ctx - The context, in the band's frame: one unit a tile, along the run, then across it
 * @param from - Where the tile starts along the run
 * @param half - Half the band's width, in tiles
 * @param pixel - A canvas pixel, in tiles
 */
function paintBody(ctx: CanvasRenderingContext2D, from: number, half: number, pixel: number): void {
  const rim = Math.max(BAND_RIM, pixel)

  ctx.fillStyle = withAlpha(PALETTE.lightBarrierRim, RIM_OPACITY)
  ctx.fillRect(from, 0.5 - half - rim, 1, 2 * (half + rim))
  ctx.fillStyle = withAlpha(PALETTE.lightBarrierBand, BAND_OPACITY)
  ctx.fillRect(from, 0.5 - half, 1, 2 * half)
}

/**
 * Paints the band's edges over one tile, in the band's frame: the light
 * along each, fading inwards, then its two bright edge lines.
 * @param ctx - The context, in the band's frame
 * @param from - Where the tile starts along the run
 * @param half - Half the band's width, in tiles
 * @param pixel - A canvas pixel, in tiles
 */
function paintEdges(ctx: CanvasRenderingContext2D, from: number, half: number, pixel: number): void {
  const top = 0.5 - half
  const bottom = 0.5 + half
  // As far in as at full width, but never past the middle of a band still narrow
  const depth = Math.min(0.5, (EDGE_LIGHT_DEPTH * BAND_HALF_WIDTH) / Math.max(half, pixel))
  const light = ctx.createLinearGradient(0, top, 0, bottom)
  const thickness = Math.max(EDGE_LINE, pixel)

  light.addColorStop(0, withAlpha(PALETTE.lightBarrierLight, EDGE_LIGHT_STRENGTH))
  light.addColorStop(depth, withAlpha(PALETTE.lightBarrierLight, 0))
  light.addColorStop(1 - depth, withAlpha(PALETTE.lightBarrierLight, 0))
  light.addColorStop(1, withAlpha(PALETTE.lightBarrierLight, EDGE_LIGHT_STRENGTH))
  ctx.fillStyle = light
  ctx.fillRect(from, top, 1, 2 * half)
  ctx.fillStyle = PALETTE.lightBarrierEdge
  ctx.fillRect(from, top, 1, thickness)
  ctx.fillRect(from, bottom - thickness, 1, thickness)
}

/**
 * A steady band's tile, painted once per tile size and kept: its body, or
 * its edges, which are drawn over it as bright as they flicker.
 * @param tileSize - Side of a tile, in canvas pixels
 * @param part - Which part
 * @returns The image, a tile's size, of a band running left to right
 */
function steadyImage(tileSize: number, part: 'body' | 'edges'): HTMLCanvasElement {
  return keptImage(tileSize, `light-barrier-${part}`, () => {
    const image = makeCanvas(tileSize, tileSize)

    image.context.scale(tileSize, tileSize)

    if (part === 'body') {
      paintBody(image.context, 0, BAND_HALF_WIDTH, 1 / tileSize)
    } else {
      paintEdges(image.context, 0, BAND_HALF_WIDTH, 1 / tileSize)
    }

    return image.canvas
  })
}

/**
 * Each light barrier's place in its run: the light barriers side by side
 * the way it runs, as far as another one running the same way continues
 * it, which is also where its end plates stand, at the run's two ends.
 * @param chamber - The chamber
 * @returns Each light barrier's place, by its number
 */
function runPlaces(chamber: CompiledChamber): (RunPlace | null)[] {
  return chamber.entriesOf('lightBarrier').map((entry) => {
    const orientation = ((entry.direction === 'H') || (entry.direction === 'V')) ? entry.direction : null

    if (orientation === null) {
      return null
    }

    // Along the run: to the right for a band running left to right, down the screen for one running top to bottom
    const dx = (orientation === 'H') ? 1 : 0
    const dy = (orientation === 'H') ? 0 : -1
    let start = 0

    while (chamber.hasBeamAt('lightBarrier', entry.x - (dx * (start + 1)), entry.y - (dy * (start + 1)), orientation)) {
      start++
    }

    let length = start + 1

    while (chamber.hasBeamAt('lightBarrier', entry.x + (dx * (length - start)), entry.y + (dy * (length - start)), orientation)) {
      length++
    }

    const firstX = entry.x - (dx * start)
    const firstRow = chamber.height - 1 - (entry.y - (dy * start))

    return {
      orientation: orientation,
      start: start,
      length: length,
      seed: 7001 + (firstX * 131) + (firstRow * 17),
    }
  })
}

/**
 * The reactions running in a run: where along it each band was met, and on
 * which face, from the subject's tile as it was met.
 * @param chamber - The chamber
 * @param places - Each light barrier's place in its run
 * @param place - A place in the run
 * @param running - Every reaction running
 * @returns The run's reactions
 */
function reactionsIn(chamber: CompiledChamber, places: readonly (RunPlace | null)[], place: RunPlace, running: readonly RunningReaction[]): RunReaction[] {
  const found: RunReaction[] = []

  for (const reaction of running) {
    const met = places[chamber.elementAt('lightBarrier', reaction.x, reaction.y)]

    if ((met === null) || (met === undefined) || (met.seed !== place.seed) || (met.orientation !== place.orientation)) {
      continue
    }

    // Across the band, from its side; or along it, at the end of its tile nearer the subject: the left or upper end when
    // the subject is left of or above it
    const across = (met.orientation === 'H') ? Math.sign(reaction.y - reaction.fromY) : Math.sign(reaction.fromX - reaction.x)
    const before = (met.orientation === 'H') ? (reaction.fromX < reaction.x) : (reaction.fromY > reaction.y)

    found.push({
      along: met.start + ((across !== 0) ? 0.5 : (before ? 0 : 1)),
      side: across,
      progress: reaction.progress,
    })
  }

  return found
}

/**
 * The light barriers' bands, drawn in code among the blockers, over the
 * floor and under the end plates the light barrier's drawing adds: a
 * see-through teal band of hard light across the middle of each tile, from
 * one end plate to the other, a deep teal rim outside it, light pooling
 * where it leaves each plate, and two bright edges flickering faintly.
 * Light barriers side by side running one way make one band. A band
 * switching off or on unfolds: a bright line runs out of both plates and
 * meets in the middle, then widens into the band, and the other way round,
 * as far as its transition says. Where a shot or the subject met a band, it
 * brightens and a bright bar across it splits in two and runs off both ways
 * (LightBarrierReactions). With no time given, the edges hold steady at
 * their brightest and nothing reacts. A steady tile is drawn from images
 * painted once per tile size; one switching is painted straight onto the
 * canvas. Each tile is drawn clipped to it, in the band's own frame: one
 * unit a tile, along its run from the first end plate, and across it.
 */
export class LightBarrierBand {
  private places: KeptPlaces | null = null // Each light barrier's place in its run, for the chamber last drawn

  /**
   * Draws every band that is on, or switching off or on.
   * @param painter - Paints on the canvas
   * @param state - The state drawn
   * @param shares - How far on the light barriers that are changing are drawn, or null to draw every one as the state says
   * @param time - The frame's time, in milliseconds on the frame clock, or null to hold the edges steady
   * @param reactions - Where a band was met lately, or null when none can react
   */
  draw(painter: TilePainter, state: RulesState, shares: BlockedShares | null, time: number | null, reactions: LightBarrierReactions | null): void {
    const chamber = state.chamber
    const entries = chamber.entriesOf('lightBarrier')

    if (entries.length === 0) {
      return
    }

    const places = this.placesOf(chamber)
    const running = ((time === null) || (reactions === null)) ? [] : reactions.runningAt(time)

    entries.forEach((entry, i) => {
      const share = (shares === null) ? null : shares('lightBarrier', i)
      const on = Math.min((share !== null) ? share : (state.isBlocked('lightBarrier', i) ? 1 : 0), 1)
      const place = places[i]

      if ((on <= 0) || (place === null) || (place === undefined)) {
        return
      }

      const look = switchingLook(on)
      const brightness = (time === null) ? 1 : edgeBrightness(place, time / 1000)
      const runReactions = reactionsIn(chamber, places, place, running)

      painter.drawInFrame(entry.x, entry.y + 1, Direction.UP, (ctx, tileSize) => {
        LightBarrierBand.drawTile(ctx, tileSize, place, look, brightness, runReactions)
      })
    })
  }

  /**
   * Each light barrier's place in its run, worked out once per chamber.
   * @param chamber - The chamber drawn
   * @returns The places, by light barrier number
   */
  private placesOf(chamber: CompiledChamber): readonly (RunPlace | null)[] {
    if ((this.places === null) || (this.places.chamber !== chamber)) {
      this.places = {
        chamber: chamber,
        places: runPlaces(chamber),
      }
    }

    return this.places.places
  }

  /**
   * Draws one tile of a band, clipped to it, in the band's own frame.
   * @param ctx - The canvas's context, framed on the tile's top left corner
   * @param tileSize - Side of a tile, in canvas pixels
   * @param place - The tile's place in its run
   * @param look - How it shows, part way through switching or not
   * @param brightness - How bright its edges are as they flicker, from 0 to 1
   * @param reactions - The reactions running in its run
   */
  private static drawTile(ctx: CanvasRenderingContext2D, tileSize: number, place: RunPlace, look: BandLook, brightness: number, reactions: readonly RunReaction[]): void {
    const pixel = 1 / tileSize
    const half = BAND_HALF_WIDTH * look.open
    const steady = (look.fade >= 1) && (look.front >= 1) && (look.open >= 1) && (look.line <= 0)

    ctx.beginPath()
    ctx.rect(0, 0, tileSize, tileSize)
    ctx.clip()

    // Along the run to the right, or down the screen for a band running top to bottom
    if (place.orientation === 'H') {
      ctx.transform(tileSize, 0, 0, tileSize, -place.start * tileSize, 0)
    } else {
      ctx.transform(0, tileSize, tileSize, 0, 0, -place.start * tileSize)
    }

    // Only as far as it has run out of its end plates
    if (look.front < 1) {
      const reach = look.front * (place.length / 2)

      ctx.save()
      ctx.beginPath()
      ctx.rect(0, -1, reach, 3)
      ctx.rect(place.length - reach, -1, reach, 3)
      ctx.clip()
    }

    ctx.globalAlpha = look.fade

    if (half > pixel / 4) {
      if (steady) {
        ctx.drawImage(steadyImage(tileSize, 'body'), place.start, 0, 1, 1)
      } else {
        paintBody(ctx, place.start, half, pixel)
      }

      LightBarrierBand.drawPlateGlow(ctx, place, half, look.fade)

      ctx.globalAlpha = look.fade * brightness

      if (steady) {
        ctx.drawImage(steadyImage(tileSize, 'edges'), place.start, 0, 1, 1)
      } else {
        paintEdges(ctx, place.start, half, pixel)
      }

      LightBarrierBand.drawReactions(ctx, half, reactions, pixel, look.fade)
    }

    if (look.line > 0) {
      const thickness = Math.max(pixel * 1.5, LINE_THICKNESS)

      ctx.globalAlpha = look.line * look.fade
      ctx.fillStyle = PALETTE.lightBarrierFlare
      ctx.fillRect(place.start, 0.5 - (thickness / 2), 1, thickness)
    }

    if (look.front < 1) {
      ctx.restore()
      LightBarrierBand.drawFronts(ctx, place, half, look)
    }

    ctx.globalAlpha = 1
  }

  /**
   * Draws the light pooling where the band leaves each end plate of its run,
   * fading into it, on the tiles it reaches.
   * @param ctx - The canvas's context, in the band's frame
   * @param place - The tile's place in its run
   * @param half - Half the band's width, in tiles
   * @param fade - How opaque the band is drawn, from 0 to 1
   */
  private static drawPlateGlow(ctx: CanvasRenderingContext2D, place: RunPlace, half: number, fade: number): void {
    const ends = [
      [
        0,
        PLATE_GLOW_REACH,
      ],
      [
        place.length,
        place.length - PLATE_GLOW_REACH,
      ],
    ] as const

    for (const [
      from,
      to,
    ] of ends) {
      if ((Math.max(from, to) < place.start) || (Math.min(from, to) > place.start + 1)) {
        continue
      }

      const glow = ctx.createLinearGradient(from, 0, to, 0)

      glow.addColorStop(0, withAlpha(PALETTE.lightBarrierEdge, 0.85))
      glow.addColorStop(0.35, withAlpha(PALETTE.lightBarrierLight, 0.35))
      glow.addColorStop(1, withAlpha(PALETTE.lightBarrierLight, 0))
      ctx.globalAlpha = fade
      ctx.fillStyle = glow
      ctx.fillRect(Math.min(from, to), 0.5 - half, Math.abs(to - from), 2 * half)
    }
  }

  /**
   * Draws the reactions running in the run on the tile, inside the band:
   * it brightens round where it was met, the face met flares there, and a
   * bright bar across it splits in two and runs off both ways, fading.
   * @param ctx - The canvas's context, in the band's frame
   * @param half - Half the band's width, in tiles
   * @param reactions - The run's reactions
   * @param pixel - A canvas pixel, in tiles
   * @param fade - How opaque the band is drawn, from 0 to 1
   */
  private static drawReactions(ctx: CanvasRenderingContext2D, half: number, reactions: readonly RunReaction[], pixel: number, fade: number): void {
    const top = 0.5 - half
    const bottom = 0.5 + half
    const thick = Math.max(pixel * 2, EDGE_LINE * 2.5)

    for (const reaction of reactions) {
      const progress = reaction.progress

      if ((progress < 0) || (progress >= 1)) {
        continue
      }

      const fading = (1 - progress) ** 1.5
      const along = reaction.along
      const across = (reaction.side > 0) ? bottom : (reaction.side < 0) ? top : 0.5
      const glow = ctx.createRadialGradient(along, across, 0, along, across, REACTION_GLOW_RADIUS)

      ctx.globalAlpha = fade
      glow.addColorStop(0, withAlpha(PALETTE.lightBarrierEdge, 0.85 * REACTION_STRENGTH * fading))
      glow.addColorStop(1, withAlpha(PALETTE.lightBarrierEdge, 0))
      ctx.fillStyle = glow
      ctx.fillRect(along - REACTION_GLOW_RADIUS, top, 2 * REACTION_GLOW_RADIUS, 2 * half)

      // The face met flares where it was met
      if (reaction.side !== 0) {
        const spread = 0.12 + (0.5 * progress)
        const flare = ctx.createLinearGradient(along - spread, 0, along + spread, 0)

        flare.addColorStop(0, withAlpha(PALETTE.lightBarrierFlare, 0))
        flare.addColorStop(0.5, withAlpha(PALETTE.lightBarrierFlare, REACTION_STRENGTH * fading))
        flare.addColorStop(1, withAlpha(PALETTE.lightBarrierFlare, 0))
        ctx.fillStyle = flare
        ctx.fillRect(along - spread, (reaction.side > 0) ? bottom - thick : top, 2 * spread, thick)
      }

      // The bar across the band, split in two, each half running off its own way
      for (const way of [
        -1,
        1,
      ]) {
        const at = along + (way * (progress ** 0.85) * REACTION_RUN)
        const width = 0.05 + (0.06 * progress)
        const bar = ctx.createLinearGradient(at - width, 0, at + width, 0)

        bar.addColorStop(0, withAlpha(PALETTE.lightBarrierFlare, 0))
        bar.addColorStop(0.5, withAlpha(PALETTE.lightBarrierFlare, 0.95 * REACTION_STRENGTH * ((1 - progress) ** 0.9)))
        bar.addColorStop(1, withAlpha(PALETTE.lightBarrierFlare, 0))
        ctx.fillStyle = bar
        ctx.fillRect(at - width, top, 2 * width, 2 * half)
      }
    }
  }

  /**
   * Draws the bright fronts of a band running out of its end plates, where
   * they have got to, on the tiles they are on.
   * @param ctx - The canvas's context, in the band's frame
   * @param place - The tile's place in its run
   * @param half - Half the band's width, in tiles
   * @param look - How it shows part way through switching
   */
  private static drawFronts(ctx: CanvasRenderingContext2D, place: RunPlace, half: number, look: BandLook): void {
    const reach = look.front * (place.length / 2)
    const strength = FRONT_STRENGTH * (Math.sin(Math.PI * look.front) ** 0.6)
    // At least as wide as the line it unfolds from
    const top = Math.min(0.5 - half, 0.5 - (LINE_THICKNESS * 1.2))
    const height = 2 * (0.5 - top)

    for (const along of [
      reach,
      place.length - reach,
    ]) {
      if ((along < place.start - FRONT_HALF_WIDTH) || (along > place.start + 1 + FRONT_HALF_WIDTH)) {
        continue
      }

      const front = ctx.createLinearGradient(along - FRONT_HALF_WIDTH, 0, along + FRONT_HALF_WIDTH, 0)

      front.addColorStop(0, withAlpha(PALETTE.lightBarrierEdge, 0))
      front.addColorStop(0.5, withAlpha(PALETTE.lightBarrierFlare, strength))
      front.addColorStop(1, withAlpha(PALETTE.lightBarrierEdge, 0))
      ctx.globalAlpha = look.fade
      ctx.fillStyle = front
      ctx.fillRect(along - FRONT_HALF_WIDTH, top, 2 * FRONT_HALF_WIDTH, height)
    }
  }
}
