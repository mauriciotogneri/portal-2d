import {Direction} from '@/game/direction'
import type {TileGate} from '@/game/tile_gate'

/**
 * What a move of the body did.
 */
export type BodyMove = {
  readonly moved: boolean // Whether its middle moved
  readonly pressedInto: readonly Direction[] // The ways it pressed into a solid side neighbour of its tile, in the order met
}

/**
 * The subject's body as the live game moves it: a circle free to stand
 * anywhere, in tiles as the rules count them (tile (x, y) spans x to x + 1
 * and y to y + 1, row 0 at the bottom). It is narrower than a tile, so it
 * fits one-tile corridors, and rounds corners on its own. It never reaches
 * deeper into a solid tile than it already did: a tile that turns solid
 * under its edge (a door closing, a box put down) pushes it out at a steady
 * pace instead of at once, and the tile under its middle never counts.
 */
export class SubjectBody {
  /** The body's radius, in tiles: 0.6 wide, so it fits a one-tile corridor */
  static readonly RADIUS = 0.3

  /** Walking speed, in tiles per second; the same any way, diagonals included */
  static readonly SPEED = 4

  /** How fast a tile that turned solid under the body's edge pushes it out, in tiles per second */
  private static readonly PUSH_SPEED = 2

  /** How many times the body is pushed out of solid tiles in one move, enough for a corner where two meet */
  private static readonly PUSH_PASSES = 3

  /** A distance below this, in tiles, is none */
  private static readonly TOUCH = 1e-9

  /** How far inside a tile's edge keepInTile() leaves the middle, in tiles */
  private static readonly EDGE_INSET = 1e-6

  private middleX = 0.5 // Its middle's distance from the chamber's left edge, in tiles
  private middleY = 0.5 // Its middle's distance from the chamber's bottom edge, in tiles

  /**
   * Its middle's distance from the chamber's left edge, in tiles.
   */
  get x(): number {
    return this.middleX
  }

  /**
   * Its middle's distance from the chamber's bottom edge, in tiles.
   */
  get y(): number {
    return this.middleY
  }

  /**
   * The column of the tile under its middle.
   */
  get tileX(): number {
    return Math.floor(this.middleX)
  }

  /**
   * The row of the tile under its middle.
   */
  get tileY(): number {
    return Math.floor(this.middleY)
  }

  /**
   * Puts its middle on a tile's middle.
   * @param tileX - Column
   * @param tileY - Row
   */
  place(tileX: number, tileY: number): void {
    this.middleX = tileX + 0.5
    this.middleY = tileY + 0.5
  }

  /**
   * Brings its middle back inside a tile, just within the edge it crossed,
   * after the rules refused a move onto the tile it had reached.
   * @param tileX - Column
   * @param tileY - Row
   */
  keepInTile(tileX: number, tileY: number): void {
    this.middleX = Math.min(Math.max(this.middleX, tileX + SubjectBody.EDGE_INSET), tileX + 1 - SubjectBody.EDGE_INSET)
    this.middleY = Math.min(Math.max(this.middleY, tileY + SubjectBody.EDGE_INSET), tileY + 1 - SubjectBody.EDGE_INSET)
  }

  /**
   * Moves its middle, then pushes it back out of the solid tiles around the
   * tile it started on as far as it may stay in them: no deeper than it was,
   * less by what the push speed takes off over the move's time. A move
   * with no distance only lets it be pushed out.
   * @param dx - How far it moves right, in tiles; left when negative
   * @param dy - How far it moves up, in tiles; down when negative
   * @param seconds - The time the move takes
   * @param gate - Which tiles around the one under its middle are solid, read on the tile it starts on
   * @returns Whether it moved, and which solid side neighbours it pressed into
   */
  move(dx: number, dy: number, seconds: number, gate: TileGate): BodyMove {
    const startX = this.middleX
    const startY = this.middleY
    const easing = SubjectBody.PUSH_SPEED * seconds
    const pressedInto: Direction[] = []
    let x = startX + dx
    let y = startY + dy

    for (let pass = 0; pass < SubjectBody.PUSH_PASSES; pass++) {
      let pushed = false

      for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
          const tileX = gate.x + offsetX
          const tileY = gate.y + offsetY

          if (((offsetX === 0) && (offsetY === 0)) || !gate.isSolid(tileX, tileY)) {
            continue
          }

          const allowed = Math.max(SubjectBody.depthIn(startX, startY, tileX, tileY) - easing, 0)
          const nearestX = Math.min(Math.max(x, tileX), tileX + 1)
          const nearestY = Math.min(Math.max(y, tileY), tileY + 1)
          const distance = Math.hypot(x - nearestX, y - nearestY)
          const excess = (SubjectBody.RADIUS - distance) - allowed

          if (excess <= SubjectBody.TOUCH) {
            continue
          }

          // Right on the tile's edge, it is pushed straight back onto its own tile
          const awayX = (distance > SubjectBody.TOUCH) ? (x - nearestX) / distance : -offsetX / Math.hypot(offsetX, offsetY)
          const awayY = (distance > SubjectBody.TOUCH) ? (y - nearestY) / distance : -offsetY / Math.hypot(offsetX, offsetY)

          x += awayX * excess
          y += awayY * excess
          pushed = true

          const way = SubjectBody.sideWay(offsetX, offsetY)

          if ((way !== null) && (((dx * offsetX) + (dy * offsetY)) > 0) && !pressedInto.includes(way)) {
            pressedInto.push(way)
          }
        }
      }

      if (!pushed) {
        break
      }
    }

    this.middleX = x
    this.middleY = y

    return {
      moved: (x !== startX) || (y !== startY),
      pressedInto: pressedInto,
    }
  }

  /**
   * How deep a circle of the body's radius reaches into a tile.
   * @param x - The circle's middle, from the chamber's left edge
   * @param y - The circle's middle, from the chamber's bottom edge
   * @param tileX - The tile's column
   * @param tileY - The tile's row
   * @returns How far it reaches in, in tiles; 0 when it doesn't touch it
   */
  private static depthIn(x: number, y: number, tileX: number, tileY: number): number {
    const nearestX = Math.min(Math.max(x, tileX), tileX + 1)
    const nearestY = Math.min(Math.max(y, tileY), tileY + 1)

    return Math.max(SubjectBody.RADIUS - Math.hypot(x - nearestX, y - nearestY), 0)
  }

  /**
   * The way to a side neighbour.
   * @param offsetX - Column step, from -1 to 1
   * @param offsetY - Row step, from -1 to 1
   * @returns The way, or null for a diagonal neighbour
   */
  private static sideWay(offsetX: number, offsetY: number): Direction | null {
    if (offsetY === 0) {
      return (offsetX > 0) ? Direction.RIGHT : Direction.LEFT
    }

    if (offsetX === 0) {
      return (offsetY > 0) ? Direction.UP : Direction.DOWN
    }

    return null
  }
}
