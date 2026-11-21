import {GameEvent} from '@/game/game_event'
import {traceRays} from '@/game/rules/rays'
import type {RulesState} from '@/game/rules/rules_state'
import {NO_BOX} from '@/game/rules/state_layout'

/** Whether a step set a ray bouncing off a mirror box, for the mirror box's sound */
export type MirrorBounces = {
  readonly started: boolean // Whether a ray turns, after the step, at a resting mirror box that no ray turned at, where it rested, before it
  readonly dropped: boolean // Whether the box the step put down is one of them
}

/** No ray started bouncing off a mirror box */
export const NO_MIRROR_BOUNCES: MirrorBounces = {
  started: false,
  dropped: false,
}

/**
 * The tiles where a state's rays turn at a mirror box: every corner of a
 * line but its first and its last, which are where it starts and ends.
 * @param state - A settled state, the only kind whose rays count
 * @returns Each tile, as its column and row joined by a comma
 */
function turningTiles(state: RulesState): Set<string> {
  const tiles = new Set<string>()

  for (const line of traceRays(state).lines) {
    for (const point of line.points.slice(1, -1)) {
      tiles.add(`${Math.floor(point.x)},${Math.floor(point.y)}`)
    }
  }

  return tiles
}

/**
 * Whether a step set a ray bouncing off a mirror box: a mirror box resting
 * after it where a ray turns, which wasn't resting on that tile before it
 * or turned no ray there, whether it was put down in the ray, a link sent
 * it there, or the ray reached it (an emitter switched on, a door opened, a
 * portal opened or the subject stepped out of the ray). A box counts once,
 * however many rays turn at it; a ray reaching a box another ray already
 * turns at isn't one. Both states are settled, since rays count only once a
 * step settles, so a slide's is judged from where it started to where it
 * stopped.
 * @param before - The state before the step
 * @param after - The state after the step
 * @param events - What happened in the step
 * @returns Whether any ray started bouncing off a mirror box, and whether off the one put down
 */
export function findMirrorBounces(before: RulesState, after: RulesState, events: readonly GameEvent[]): MirrorBounces {
  const chamber = after.chamber
  const mirrorBoxes = chamber.boxStarts.map((_, index) => index).filter((index) => chamber.mirrorOf(index) !== null)

  if ((after === before) || (mirrorBoxes.length === 0) || (chamber.countOf('emitter') === 0)) {
    return NO_MIRROR_BOUNCES
  }

  const turnedBefore = turningTiles(before)
  const turnedAfter = turningTiles(after)
  const putDown = events.includes(GameEvent.BOX_PUT_DOWN) ? before.carriedBox : NO_BOX
  let started = false
  let dropped = false

  for (const index of mirrorBoxes) {
    const x = after.boxX(index)
    const y = after.boxY(index)
    const tile = `${x},${y}`
    const restedThere = (before.carriedBox !== index) && (before.boxX(index) === x) && (before.boxY(index) === y)

    if ((after.carriedBox !== index) && turnedAfter.has(tile) && !(restedThere && turnedBefore.has(tile))) {
      started = true
      dropped = dropped || (index === putDown)
    }
  }

  return {
    started: started,
    dropped: dropped,
  }
}
