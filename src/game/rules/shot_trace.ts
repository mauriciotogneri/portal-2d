import {Direction} from '@/game/direction'
import type {CompiledChamber} from '@/game/rules/compiled_chamber'
import {OPPOSITES} from '@/game/rules/portals'

/**
 * How a traced shot ended: on a face of the tile that stopped it, or at a
 * corner, which is always a miss.
 */
export type ShotTraceKind = 'face' | 'corner'

/**
 * Named values of ShotTraceKind.
 */
export const ShotTraceKind = {
  FACE: 'face',
  CORNER: 'corner',
} as const

/**
 * Where a shot at any angle stopped, and how it got there.
 */
export type ShotTrace = {
  readonly kind: ShotTraceKind // On a face, or at a corner (a miss)
  readonly x: number // Column of the tile that stopped it; at a corner, the tile across it on the shot's main way, or the one entered through it
  readonly y: number // Row of that tile
  readonly side: Direction // The side of that tile the shot entered, the way that side faces; at a corner, the side facing back along its main way
  readonly travel: Direction // The way it crossed into that tile, the side's opposite
  readonly hitX: number // Where it stopped, in tiles from the chamber's left edge: on the face entered, or the corner
  readonly hitY: number // Where it stopped, in tiles from the chamber's bottom edge
}

/** A direction component smaller than this is taken as none, so a shot along a row or a column stays in it exactly */
const AXIS_SNAP = 1e-12

/** Two edge crossings closer than this along the shot, in tiles, cross a corner together */
const CORNER_EPSILON = 1e-9

/**
 * A direction component, with one too small to matter taken as none.
 * @param component - The cosine or sine of the shot's angle
 * @returns The component, or 0
 */
function snapAxis(component: number): number {
  return (Math.abs(component) < AXIS_SNAP) ? 0 : component
}

/**
 * How far along the shot it first crosses a column or row edge.
 * @param origin - The shot's start on that axis
 * @param tile - The tile it starts in on that axis
 * @param component - The shot's direction component on that axis
 * @returns The distance, in tiles along the shot; Infinity when it never crosses one
 */
function firstCrossing(origin: number, tile: number, component: number): number {
  if (component > 0) {
    return (tile + 1 - origin) / component
  }

  if (component < 0) {
    return (tile - origin) / component
  }

  return Infinity
}

/**
 * Traces a shot from a point at any angle, tile by tile, until a wall
 * (outside the chamber included) or a tile the stop test names stops it; the
 * tile it starts in never does. It visits the tiles the line passes through
 * in order (a grid traversal). Where the line crosses a column edge and a row
 * edge at once, it passes a corner: if the tiles on both sides of that
 * corner stop shots, the shot is squeezed between them, a miss; otherwise it
 * goes on diagonally, and a stopping tile entered that way was entered
 * through its corner, also a miss. Grazing one tile's corner passes it.
 * @param chamber - The chamber
 * @param stops - Whether something on a tile stops the shot, walls aside
 * @param originX - Where it leaves from, in tiles from the left edge
 * @param originY - Where it leaves from, in tiles from the bottom edge
 * @param angle - The way it goes, in radians counter-clockwise from right
 * @returns Where it stopped
 * @throws Error when the origin or the angle is not a finite number
 */
export function traceShot(chamber: CompiledChamber, stops: (x: number, y: number) => boolean, originX: number, originY: number, angle: number): ShotTrace {
  if ((!Number.isFinite(originX)) || (!Number.isFinite(originY)) || (!Number.isFinite(angle))) {
    throw new Error('A shot needs a finite origin and angle')
  }

  const stopsAt = (x: number, y: number): boolean => chamber.isWall(x, y) || stops(x, y)
  const dx = snapAxis(Math.cos(angle))
  const dy = snapAxis(Math.sin(angle))
  const stepX = Math.sign(dx)
  const stepY = Math.sign(dy)
  const wayX: Direction = (stepX > 0) ? Direction.RIGHT : Direction.LEFT
  const wayY: Direction = (stepY > 0) ? Direction.UP : Direction.DOWN
  const mainIsX = Math.abs(dx) >= Math.abs(dy)
  const mainWay = mainIsX ? wayX : wayY
  const deltaX = (stepX === 0) ? Infinity : 1 / Math.abs(dx)
  const deltaY = (stepY === 0) ? Infinity : 1 / Math.abs(dy)
  let tileX = Math.floor(originX)
  let tileY = Math.floor(originY)
  let nextX = firstCrossing(originX, tileX, dx)
  let nextY = firstCrossing(originY, tileY, dy)

  // Outside the chamber is wall, so every shot ends
  for (;;) {
    if (Math.abs(nextX - nextY) <= CORNER_EPSILON) {
      const cornerX = (stepX > 0) ? tileX + 1 : tileX
      const cornerY = (stepY > 0) ? tileY + 1 : tileY
      const besideX = stopsAt(tileX + stepX, tileY)
      const besideY = stopsAt(tileX, tileY + stepY)
      const corner = (x: number, y: number): ShotTrace => ({
        kind: ShotTraceKind.CORNER,
        x: x,
        y: y,
        side: OPPOSITES[mainWay],
        travel: mainWay,
        hitX: cornerX,
        hitY: cornerY,
      })

      if (besideX && besideY) {
        return mainIsX ? corner(tileX + stepX, tileY) : corner(tileX, tileY + stepY)
      }

      tileX += stepX
      tileY += stepY
      nextX += deltaX
      nextY += deltaY

      if (stopsAt(tileX, tileY)) {
        return corner(tileX, tileY)
      }
    } else if (nextX < nextY) {
      const distance = nextX

      tileX += stepX
      nextX += deltaX

      if (stopsAt(tileX, tileY)) {
        return {
          kind: ShotTraceKind.FACE,
          x: tileX,
          y: tileY,
          side: OPPOSITES[wayX],
          travel: wayX,
          hitX: (stepX > 0) ? tileX : tileX + 1,
          hitY: originY + (distance * dy),
        }
      }
    } else {
      const distance = nextY

      tileY += stepY
      nextY += deltaY

      if (stopsAt(tileX, tileY)) {
        return {
          kind: ShotTraceKind.FACE,
          x: tileX,
          y: tileY,
          side: OPPOSITES[wayY],
          travel: wayY,
          hitX: originX + (distance * dx),
          hitY: (stepY > 0) ? tileY : tileY + 1,
        }
      }
    }
  }
}
