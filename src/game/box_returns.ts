import {Direction} from '@/game/direction'
import {type ElementLook, lookOf} from '@/game/element_detail'
import type {GameEvent} from '@/game/game_event'
import {pieceNumber} from '@/game/piece_number'
import {findReturnedBoxes, type ReturnedBox} from '@/game/returned_boxes'
import type {RulesState} from '@/game/rules/rules_state'
import type {PiecePlacement, TilePainter} from '@/game/tile_painter'

/**
 * A box on its way home, and when it set off.
 */
type BoxReturn = ReturnedBox & {
  readonly look: ElementLook | null // Its look of its own (element_detail), which its pieces show, or null for the sprite as it is
  readonly seed: number // Sets its pieces' paths apart from another return's
  readonly startTime: number // When it set off, in milliseconds on the frame clock
}

/**
 * How a sprite drawn facing up is turned to face a way, as the tile painter
 * turns it.
 */
type QuarterTurn = {
  readonly cos: number // Cosine of the turn
  readonly sin: number // Sine of the turn, clockwise on the canvas
}

/** How long a box takes from coming apart where it was to landing whole at its start, in milliseconds */
const FLY_MILLISECONDS = 800

/** How long a box that fell into a ditch takes to gather from its pieces at its start, while it falls, in milliseconds */
const GATHER_MILLISECONDS = 480

/** Pieces across a box's tile, as the break-up cuts a sprite */
const PIECES_ACROSS = 9

/** Share of the way home by which the first piece sets off, having come apart where the box was */
const SET_OFF_EARLIEST = 0.2

/** How much later than the first the last piece sets off, as a share of the way home */
const SET_OFF_SPREAD = 0.25

/** Share of the way home each piece spends flying */
const TRAVEL_SHARE = 0.5

/** How far a piece drifts out as it comes apart, as a share of the box's side, as the break-up's do */
const APART_DRIFT = 0.15

/** How far a piece's way turns from straight out of the box's middle, in radians either way */
const PATH_SPREAD = 0.6

/** How far a piece's flight bows to one side at its middle, in tiles */
const BOW = 0.25

/** How much a piece shrinks as it comes apart, as a share of its size */
const APART_SHRINK = 0.45

/** A piece's size in flight, as a share of its size in the box resting at its start */
const FLYING_SCALE = 0.55

/** Share of coming apart by which a piece is fully round */
const ROUNDED_BY = 0.5

/** Share of its flight left when a piece starts to square off again */
const SQUARED_FROM = 0.3

/** Share of the way home when the box's shadow starts to form at its start */
const SHADOW_FROM = 0.65

/** How late the last piece starts to gather, as a share of the gathering */
const GATHER_LATEST = 0.35

/** How far out the pieces start to gather from, in tiles */
const GATHER_SPREAD = 0.45

/** How much a piece's gathering distance varies, as a share either way */
const GATHER_VARIATION = 0.3

/** A gathering piece's size as it starts, as a share of its size in the box */
const GATHER_SMALLEST = 0.3

/** Share of its own gathering by which a piece has squared off */
const GATHER_SQUARED_BY = 0.25

/** How a sprite drawn facing up is turned to face each way, as the tile painter turns it */
const TURNS: Readonly<Record<Direction, QuarterTurn>> = {
  [Direction.UP]: {
    cos: 1,
    sin: 0,
  },
  [Direction.RIGHT]: {
    cos: 0,
    sin: 1,
  },
  [Direction.DOWN]: {
    cos: -1,
    sin: 0,
  },
  [Direction.LEFT]: {
    cos: 0,
    sin: -1,
  },
}

/**
 * Keeps a value between two bounds.
 * @param value - The value
 * @param low - The lowest it may be
 * @param high - The highest it may be
 * @returns The value, kept between them
 */
function clamp(value: number, low = 0, high = 1): number {
  return Math.min(Math.max(value, low), high)
}

/**
 * How long a box's return is drawn: its flight home, or, for one that fell,
 * its gathering at its start.
 * @param box - The box on its way home
 * @returns The time, in milliseconds
 */
function lengthOf(box: BoxReturn): number {
  return box.fell ? GATHER_MILLISECONDS : FLY_MILLISECONDS
}

/**
 * Whether a box rests at its start in a state: once it is picked up again,
 * or sent elsewhere, its return is no longer drawn.
 * @param state - The state drawn
 * @param box - The box on its way home
 * @returns True while it rests there
 */
function restsAtStart(state: RulesState, box: BoxReturn): boolean {
  return (state.carriedBox !== box.index) && (state.boxX(box.index) === box.startX) && (state.boxY(box.index) === box.startY)
}

/**
 * Where one piece of a box flying home is drawn: it comes apart and rounds
 * off where the box was, as the break-up's pieces do, then sets off, in a
 * ripple with the others, along a slight bow to its own place in the box at
 * its start, where it grows back and squares off. Placed in the start
 * tile's sprite frame, as drawSpritePieces() places pieces.
 * @param box - The box on its way home
 * @param progress - How far home it is, from 0 to 1
 * @param offsetX - The piece's middle across the box at rest, in tiles from its middle
 * @param offsetY - The piece's middle down the box at rest, in tiles from its middle
 * @param index - The piece's number, which sets its own path
 * @returns Where it is drawn
 */
function flyingPiece(box: BoxReturn, progress: number, offsetX: number, offsetY: number, index: number): PiecePlacement {
  const setOff = SET_OFF_EARLIEST + (SET_OFF_SPREAD * pieceNumber(box.seed, index, 0))
  const home = TURNS[box.way]
  const from = TURNS[box.fromWay]
  // Where the piece was, as the box was drawn there, on the canvas (tiles, y down) from the start tile's middle
  const wasX = (box.fromX - (box.startX + 0.5)) + (box.fromSize * ((from.cos * offsetX) - (from.sin * offsetY)))
  const wasY = ((box.startY + 0.5) - box.fromY) + (box.fromSize * ((from.sin * offsetX) + (from.cos * offsetY)))
  // ...turned into the start sprite's frame
  const startX = (home.cos * wasX) + (home.sin * wasY)
  const startY = (-home.sin * wasX) + (home.cos * wasY)
  // Coming apart where it was: a short drift out, eased out
  const apart = clamp(progress / setOff)
  const outward = Math.atan2(offsetY, offsetX) + (PATH_SPREAD * ((2 * pieceNumber(box.seed, index, 2)) - 1))
  const drift = APART_DRIFT * box.fromSize * (1 - ((1 - apart) ** 3))
  const looseX = startX + (drift * Math.cos(outward))
  const looseY = startY + (drift * Math.sin(outward))
  // Then flying home, eased in and out, along a bow to one side
  const flown = clamp((progress - setOff) / TRAVEL_SHARE)
  const eased = (flown < 0.5) ? 2 * flown * flown : 1 - ((((-2 * flown) + 2) ** 2) / 2)
  const pathX = offsetX - looseX
  const pathY = offsetY - looseY
  const length = Math.hypot(pathX, pathY) || 1
  const bow = BOW * Math.sin(Math.PI * eased) * ((pieceNumber(box.seed, index, 3) < 0.5) ? -1 : 1)
  const x = looseX + (pathX * eased) - (bow * pathY / length)
  const y = looseY + (pathY * eased) + (bow * pathX / length)
  const flyingSize = box.fromSize * FLYING_SCALE

  return {
    dx: x - offsetX,
    dy: y - offsetY,
    scale: (flown <= 0) ? box.fromSize * (1 - (APART_SHRINK * apart)) : flyingSize + ((1 - flyingSize) * (flown * flown * (3 - (2 * flown)))),
    alpha: 1,
    roundness: (flown <= 0) ? clamp(apart / ROUNDED_BY) : clamp((1 - flown) / SQUARED_FROM),
  }
}

/**
 * Where one piece of a box gathering at its start is drawn: it comes in
 * from around the tile, quick at first and settling into place, growing,
 * fading in and squaring off as it lands, the pieces setting off in a
 * ripple, so the box forms from many directions at once: the break-up
 * played the other way.
 * @param box - The box on its way home
 * @param progress - How far it has gathered, from 0 to 1
 * @param offsetX - The piece's middle across the box, in tiles from its middle
 * @param offsetY - The piece's middle down the box, in tiles from its middle
 * @param index - The piece's number, which sets its own path
 * @returns Where it is drawn, or null while it has yet to start
 */
function gatheringPiece(box: BoxReturn, progress: number, offsetX: number, offsetY: number, index: number): PiecePlacement | null {
  const own = clamp((progress - (GATHER_LATEST * pieceNumber(box.seed, index, 0))) / (1 - GATHER_LATEST))

  if (own <= 0) {
    return null
  }

  // A piece at the very middle has no way out of it, so it takes its own
  const outward = ((offsetX === 0) && (offsetY === 0)) ? 2 * Math.PI * pieceNumber(box.seed, index, 1) : Math.atan2(offsetY, offsetX)
  const angle = outward + (PATH_SPREAD * ((2 * pieceNumber(box.seed, index, 2)) - 1))
  const left = GATHER_SPREAD * (1 + (GATHER_VARIATION * ((2 * pieceNumber(box.seed, index, 3)) - 1))) * ((1 - own) ** 3)

  return {
    dx: left * Math.cos(angle),
    dy: left * Math.sin(angle),
    scale: GATHER_SMALLEST + ((1 - GATHER_SMALLEST) * own),
    alpha: Math.min(own * 3, 1),
    roundness: clamp((1 - own) / GATHER_SQUARED_BY),
  }
}

/**
 * The boxes going back to their start tiles, drawn over a few frames: a box
 * destroyed where it lay, in the subject's hands, or sent home by a link
 * comes apart where it was and its pieces fly home, over everything, and
 * join there, its shadow forming as they land; a box that fell into a ditch
 * gathers from pieces at its start while it falls. Purely visual: the rules
 * have already put each box at its start, where it is left out of the box
 * drawing until its return ends.
 */
export class BoxReturns {
  private returns: readonly BoxReturn[] = [] // The boxes on their way home, empty when none is
  private returnCount = 0 // Returns started so far, which seeds each new one

  /**
   * Starts the return of each box a step sent home, alongside those still
   * on their way, a box sent home again starting over.
   * @param before - The state before the step, or before this part of it
   * @param after - The state after the step, or after this part of it
   * @param events - What happened in the step, or in this part of it
   * @param time - Now, in milliseconds on the frame clock
   */
  start(before: RulesState, after: RulesState, events: readonly GameEvent[], time: number): void {
    const started = findReturnedBoxes(before, after, events).map((box) => ({
      ...box,
      look: lookOf(after.chamber, 'box', box.index),
      seed: this.returnCount++,
      startTime: time,
    }))

    if (started.length > 0) {
      this.returns = [
        ...this.returns.filter((running) => (time - running.startTime < lengthOf(running)) && !started.some((box) => box.index === running.index)),
        ...started,
      ]
    }
  }

  /**
   * Forgets the return of each box no longer resting at its start after a
   * step, picked up again, so it isn't drawn coming home again should it be
   * put back there before its return would have ended.
   * @param state - The state after the step, or after this part of it
   */
  forgetMoved(state: RulesState): void {
    if (this.returns.some((box) => !restsAtStart(state, box))) {
      this.returns = this.returns.filter((box) => restsAtStart(state, box))
    }
  }

  /**
   * Ends every return at once, so nothing of it is drawn again.
   */
  clear(): void {
    this.returns = []
  }

  /**
   * Whether a box is still on its way home at a time. Once the time reaches
   * its end, it is over.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while a return is left to draw
   */
  isRunningAt(time: number): boolean {
    if (this.returns.some((box) => time - box.startTime >= lengthOf(box))) {
      this.returns = this.returns.filter((box) => time - box.startTime < lengthOf(box))
    }

    return this.returns.length > 0
  }

  /**
   * Whether a box resting at its start is drawn taking shape there, rather
   * than resting, at a time.
   * @param state - The state drawn
   * @param index - The box's index in the chamber's box list
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while its return runs and it rests at its start
   */
  isReturningAt(state: RulesState, index: number, time: number): boolean {
    return this.returns.some((box) => (box.index === index) && (time - box.startTime < lengthOf(box)) && restsAtStart(state, box))
  }

  /**
   * Draws each box taking shape at its start as it is at a time, with the
   * boxes resting, in both their passes, shadows then sprites: its shadow
   * forming as its pieces land, and, for a box that fell, its pieces
   * gathering there.
   * @param painter - Paints on the canvas
   * @param state - The state drawn
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  drawLanding(painter: TilePainter, state: RulesState, time: number): void {
    for (const box of this.returns) {
      const progress = Math.max(time - box.startTime, 0) / lengthOf(box)

      if ((progress >= 1) || !restsAtStart(state, box)) {
        continue
      }

      if (box.fell) {
        painter.drawSpriteShadow(box.sprite, box.startX, box.startY, box.way, progress ** 2)
        painter.drawSpritePieces(box.sprite, box.startX + 0.5, box.startY + 0.5, 1, box.way, PIECES_ACROSS, (offsetX, offsetY, index) => gatheringPiece(box, progress, offsetX, offsetY, index), box.look)
      } else {
        painter.drawSpriteShadow(box.sprite, box.startX, box.startY, box.way, clamp((progress - SHADOW_FROM) / (1 - SHADOW_FROM)) ** 2)
      }
    }
  }

  /**
   * Draws the pieces of each box flying home as they are at a time, over
   * everything.
   * @param painter - Paints on the canvas
   * @param state - The state drawn
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  drawFlights(painter: TilePainter, state: RulesState, time: number): void {
    for (const box of this.returns) {
      const progress = Math.max(time - box.startTime, 0) / lengthOf(box)

      if (box.fell || (progress >= 1) || !restsAtStart(state, box)) {
        continue
      }

      painter.drawSpritePieces(box.sprite, box.startX + 0.5, box.startY + 0.5, 1, box.way, PIECES_ACROSS, (offsetX, offsetY, index) => flyingPiece(box, progress, offsetX, offsetY, index), box.look)
    }
  }
}
