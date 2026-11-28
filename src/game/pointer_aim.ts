import {AIM_ANGLES, Direction} from '@/game/direction'
import type {PointerPlace} from '@/game/input'
import {DIRECTIONS} from '@/game/rules/state_layout'

/** A full turn, in radians */
const FULL_TURN = 2 * Math.PI

/**
 * The angle from one way to another, the shorter way round.
 * @param from - The angle turned from, in radians
 * @param to - The angle turned to, in radians
 * @returns The turn, in radians counter-clockwise, from just over minus a half turn up to a half turn
 */
export function angleBetween(from: number, to: number): number {
  const counterClockwise = (((to - from) % FULL_TURN) + FULL_TURN) % FULL_TURN

  return (counterClockwise > Math.PI) ? counterClockwise - FULL_TURN : counterClockwise
}

/**
 * The way nearest an angle.
 * @param angle - The angle, in radians counter-clockwise from right
 * @returns The way
 */
function nearestWay(angle: number): Direction {
  let nearest: Direction = Direction.RIGHT
  let nearestOff = Infinity

  for (const way of DIRECTIONS) {
    const off = Math.abs(angleBetween(angle, AIM_ANGLES[way]))

    if (off < nearestOff) {
      nearest = way
      nearestOff = off
    }
  }

  return nearest
}

/**
 * Where the player aims: the angle from the subject's middle to the
 * pointer, in the chamber, and the way it is snapped to, which the rules'
 * facing follows. The canvas is exactly the chamber, so its place on the
 * page maps the pointer onto tiles. A pointer right over the subject's
 * middle keeps the angle it had, and the snapped way changes only once the
 * angle is past the halfway mark between two ways by a margin, so an angle
 * near a diagonal doesn't flicker between them.
 */
export class PointerAim {
  /** How near the subject's middle the pointer keeps the angle it had, in tiles */
  private static readonly STILL_RADIUS = 0.1

  /** How far past the halfway mark between two ways the angle must go before the snapped way changes, in radians: 5° */
  private static readonly SNAP_MARGIN = 5 * Math.PI / 180

  private readonly canvas: HTMLCanvasElement // The canvas the chamber fills
  private canvasPlace: DOMRect | null = null // Where the canvas is on the page, measured when first needed after each change of size
  private aimAngle = 0 // The angle aimed at, in radians counter-clockwise from right
  private aimWay: Direction = Direction.RIGHT // The way it is snapped to

  /**
   * @param canvas - The canvas the chamber fills
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  /**
   * The angle aimed at, in radians counter-clockwise from right, in the
   * chamber, where rows grow upwards.
   */
  get angle(): number {
    return this.aimAngle
  }

  /**
   * The way the aim is snapped to.
   */
  get way(): Direction {
    return this.aimWay
  }

  /**
   * Aims squarely one way, as at a chamber's start, until the pointer says
   * otherwise.
   * @param way - The way
   */
  reset(way: Direction): void {
    this.aimAngle = AIM_ANGLES[way]
    this.aimWay = way
  }

  /**
   * Forgets where the canvas is on the page, so it is measured again, once
   * its size has changed.
   */
  remeasure(): void {
    this.canvasPlace = null
  }

  /**
   * Aims from the subject's middle at the pointer.
   * @param pointer - Where the pointer was last seen, or null when it hasn't been, which keeps the aim
   * @param fromX - The subject's middle, in tiles from the chamber's left edge
   * @param fromY - The subject's middle, in tiles from the chamber's bottom edge
   * @param chamberWidth - The chamber's width, in tiles
   * @param chamberHeight - The chamber's height, in tiles
   * @returns Whether the angle changed
   */
  update(pointer: PointerPlace | null, fromX: number, fromY: number, chamberWidth: number, chamberHeight: number): boolean {
    if (pointer === null) {
      return false
    }

    const place = this.canvasPlace ?? this.canvas.getBoundingClientRect()

    this.canvasPlace = place

    // A canvas not laid out yet maps nothing
    if ((place.width <= 0) || (place.height <= 0)) {
      return false
    }

    const pointerX = ((pointer.clientX - place.left) / place.width) * chamberWidth
    // Rows count up from the bottom, the page down from the top
    const pointerY = chamberHeight - (((pointer.clientY - place.top) / place.height) * chamberHeight)

    if (Math.hypot(pointerX - fromX, pointerY - fromY) < PointerAim.STILL_RADIUS) {
      return false
    }

    const angle = Math.atan2(pointerY - fromY, pointerX - fromX)

    if (Math.abs(angleBetween(angle, AIM_ANGLES[this.aimWay])) > ((Math.PI / 4) + PointerAim.SNAP_MARGIN)) {
      this.aimWay = nearestWay(angle)
    }

    const changed = angle !== this.aimAngle

    this.aimAngle = angle

    return changed
  }
}
