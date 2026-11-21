import {findDestroyedBoxes} from '@/game/destroyed_boxes'
import {DELTAS, type Direction} from '@/game/direction'
import {boxSprite} from '@/game/element_drawings'
import {GameEvent} from '@/game/game_event'
import {CARRIED_BOX_AHEAD, CARRIED_BOX_SIZE} from '@/game/renderer'
import type {RulesState} from '@/game/rules/rules_state'
import {NO_BOX} from '@/game/rules/state_layout'
import type {SpriteName} from '@/game/sprite_set'

/**
 * A box a step sent back to its start tile: where it was last drawn, and
 * where it goes.
 */
export type ReturnedBox = {
  readonly index: number // Which box it is, its index in the chamber's box list, so it keeps its look as it goes
  readonly fell: boolean // Whether it fell into a ditch still open after the step, rather than came apart where it was
  readonly fromX: number // Column of its middle where it was last drawn, in tiles
  readonly fromY: number // Row of that middle, in tiles
  readonly fromSize: number // Its side there, as a share of a tile: less in the subject's hands
  readonly fromWay: Direction // The way its sprite was turned there
  readonly sprite: SpriteName // What it is drawn as: a plain box or a mirror box
  readonly way: Direction // The way its sprite is turned resting at its start
  readonly startX: number // Its start tile's column
  readonly startY: number // Its start tile's row
}

/** What a step reports when it sends a box home: one destroyed where it lay, one destroyed in the subject's hands by a fizzler, one a link sent back */
const RETURN_EVENTS: readonly GameEvent[] = [
  GameEvent.BOX_DESTROYED,
  GameEvent.CARRIED_BOX_DESTROYED,
  GameEvent.BOX_SENT_BACK,
]

/**
 * Whether a step reported sending any box home.
 * @param events - What happened in the step
 * @returns True when it did
 */
export function sendsBoxesHome(events: readonly GameEvent[]): boolean {
  return RETURN_EVENTS.some((event) => events.includes(event))
}

/**
 * Every box a step sent back to its start tile: each box destroyed where it
 * lay or was put down (findDestroyedBoxes), noting the one that fell into a
 * ditch; the box carried into an active fizzler, from the subject's hands;
 * and each other box that went from elsewhere to its start, which only a
 * link sending it back can do, or another box sent home onto its tile,
 * which sends it on to its own. A box resting at its start that was carried
 * before the step was put down there, not sent home.
 * @param before - The state before the step, or before this part of it
 * @param after - The state after the step, or after this part of it
 * @param events - What happened in the step, or in this part of it
 * @returns Each box that went home, empty when none did
 */
export function findReturnedBoxes(before: RulesState, after: RulesState, events: readonly GameEvent[]): ReturnedBox[] {
  if (!sendsBoxesHome(events)) {
    return []
  }

  const chamber = after.chamber
  const returned: ReturnedBox[] = []
  const destroyed = findDestroyedBoxes(before, after, events)
  const carried = before.carriedBox

  chamber.boxStarts.forEach((start, index) => {
    const resting = boxSprite(chamber, index)
    const box = {
      index: index,
      sprite: resting.name,
      way: resting.way,
      startX: start.x,
      startY: start.y,
    }
    const destroyedBox = destroyed.find((candidate) => candidate.index === index)

    if (destroyedBox !== undefined) {
      returned.push({
        ...box,
        fell: destroyedBox.fell,
        fromX: destroyedBox.x,
        fromY: destroyedBox.y,
        fromSize: destroyedBox.size,
        fromWay: destroyedBox.way,
      })
    } else if ((index === carried) && (after.carriedBox === NO_BOX) && events.includes(GameEvent.CARRIED_BOX_DESTROYED)) {
      // Where it was carried at the step's end
      const ahead = DELTAS[after.facing]

      returned.push({
        ...box,
        fell: false,
        fromX: after.subjectX + 0.5 + (ahead.dx * CARRIED_BOX_AHEAD),
        fromY: after.subjectY + 0.5 + (ahead.dy * CARRIED_BOX_AHEAD),
        fromSize: CARRIED_BOX_SIZE,
        fromWay: boxSprite(chamber, index, after.facing).way,
      })
    } else {
      const wasAway = (before.boxX(index) !== start.x) || (before.boxY(index) !== start.y)
      const isHome = (after.carriedBox !== index) && (after.boxX(index) === start.x) && (after.boxY(index) === start.y)

      if (wasAway && isHome && (index !== carried)) {
        returned.push({
          ...box,
          fell: false,
          fromX: before.boxX(index) + 0.5,
          fromY: before.boxY(index) + 0.5,
          fromSize: 1,
          fromWay: resting.way,
        })
      }
    }
  })

  return returned
}
