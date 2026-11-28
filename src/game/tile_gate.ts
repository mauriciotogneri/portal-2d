import {DELTAS, Direction} from '@/game/direction'
import {Action} from '@/game/rules/action'
import type {CompiledChamber} from '@/game/rules/compiled_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import {boxBlocksEntry, canEnter, step} from '@/game/rules/step'
import {DIRECTIONS} from '@/game/rules/state_layout'

/** The plain move each way, which turns and steps at once */
export const PLAIN_MOVES: Readonly<Record<Direction, Action>> = {
  [Direction.UP]: Action.UP,
  [Direction.DOWN]: Action.DOWN,
  [Direction.LEFT]: Action.LEFT,
  [Direction.RIGHT]: Action.RIGHT,
}

/**
 * Which of the tiles around the subject's tile its body may reach into, read
 * from the rules on one state, so the body's collisions never disagree with
 * them. A side neighbour is open exactly when the plain move that way would
 * take the subject off its tile: the rules' step is run on the state and its
 * result thrown away, which judges walls, closed doors and exits, lasers and
 * light barriers that are on, open ditches, resting boxes, arrows (the one
 * being left and the one entered) and slides that would loop exactly as a
 * move will. A wall is solid even where a portal would take the subject
 * through. A diagonal neighbour, whose corner alone the body can touch, is
 * solid only when nothing could ever walk onto it now: a wall, a resting
 * box, or a tile no way into is allowed.
 */
export class TileGate {
  readonly state: RulesState // The state it was read from
  readonly x: number // Column of the subject's tile
  readonly y: number // Row of the subject's tile
  private readonly solid: readonly boolean[] // Whether each tile of the three by three around the subject's is solid, row by row from the bottom left

  /**
   * Reads the tiles around the subject's tile from the rules.
   * @param chamber - The chamber being played
   * @param state - The state now
   */
  constructor(chamber: CompiledChamber, state: RulesState) {
    const solid: boolean[] = []

    this.state = state
    this.x = state.subjectX
    this.y = state.subjectY

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        solid.push(TileGate.isSolidAt(chamber, state, dx, dy))
      }
    }

    this.solid = solid
  }

  /**
   * Whether a tile is solid to the body.
   * @param x - Column
   * @param y - Row
   * @returns True for a solid tile of the three by three around the subject's, or any tile beyond it; the subject's own tile never is
   */
  isSolid(x: number, y: number): boolean {
    const dx = x - this.x
    const dy = y - this.y

    if ((Math.abs(dx) > 1) || (Math.abs(dy) > 1)) {
      return true
    }

    return this.solid[(dx + 1) + ((dy + 1) * 3)] ?? true
  }

  /**
   * Whether one tile next to the subject's, or the subject's own, is solid.
   * @param chamber - The chamber being played
   * @param state - The state now
   * @param dx - Column step from the subject's tile, from -1 to 1
   * @param dy - Row step from the subject's tile, from -1 to 1
   * @returns True when solid
   */
  private static isSolidAt(chamber: CompiledChamber, state: RulesState, dx: number, dy: number): boolean {
    const x = state.subjectX + dx
    const y = state.subjectY + dy

    if ((dx === 0) && (dy === 0)) {
      return false
    }

    if (chamber.isWall(x, y)) {
      return true
    }

    const way = DIRECTIONS.find((direction) => (DELTAS[direction].dx === dx) && (DELTAS[direction].dy === dy))

    if (way === undefined) {
      return boxBlocksEntry(state, x, y) || DIRECTIONS.every((direction) => !canEnter(state, x, y, direction))
    }

    const moved = step(chamber, state, PLAIN_MOVES[way]).state

    return (moved.subjectX === state.subjectX) && (moved.subjectY === state.subjectY)
  }
}
