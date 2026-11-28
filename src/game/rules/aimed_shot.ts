import {type Action, ACTIONS} from '@/game/rules/action'
import {PORTAL_COLORS, type PortalColor} from '@/game/rules/portal_color'

/**
 * A portal shot at any angle from a point inside the subject's tile: the
 * shot the live game fires where the player aims. Coordinates are in tiles,
 * as the rules count them: tile (x, y) spans x to x + 1 and y to y + 1, row 0
 * at the bottom.
 */
export type AimedShot = {
  readonly shot: PortalColor // The portal shot
  readonly x: number // Where the shot leaves from, in tiles from the chamber's left edge
  readonly y: number // Where the shot leaves from, in tiles from the chamber's bottom edge
  readonly angle: number // The way it goes, in radians counter-clockwise from right
}

/**
 * Anything a step of the rules takes: one of the fixed actions, or an aimed
 * shot.
 */
export type RulesAction = Action | AimedShot

/**
 * Whether an action is an aimed shot rather than one of the fixed actions.
 * @param action - The action
 * @returns True for an aimed shot
 */
export function isAimedShot(action: RulesAction): action is AimedShot {
  return typeof action !== 'string'
}

/**
 * Whether a parsed JSON value is an object, as opposed to an array, a
 * primitive or null.
 * @param value - The value to test
 * @returns True for a plain object
 */
function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return (typeof value === 'object') && (value !== null) && (!Array.isArray(value))
}

/**
 * Reads one coordinate or the angle of an aimed shot.
 * @param value - The field's value
 * @param field - The field's name, for the error
 * @returns The number
 * @throws Error when it is not a finite number
 */
function readFinite(value: unknown, field: string): number {
  if ((typeof value !== 'number') || (!Number.isFinite(value))) {
    throw new Error(`an aimed shot's ${field} is not a finite number`)
  }

  return value
}

/**
 * Reads an action of a recorded run: a fixed action written as its name
 * ("up", "turnLeft", "blue"), or an aimed shot written as an object with
 * exactly the fields shot, x, y and angle.
 * @param value - The parsed JSON value
 * @returns The action
 * @throws Error when the value is neither
 */
export function parseRulesAction(value: unknown): RulesAction {
  if (typeof value === 'string') {
    const action = ACTIONS.find((candidate) => candidate === value)

    if (action === undefined) {
      throw new Error(`Unknown replay action: "${value}"`)
    }

    return action
  }

  if (!isRecord(value)) {
    throw new Error('A replay action is neither a name nor an aimed shot')
  }

  const unknownField = Object.keys(value).find((field) => (field !== 'shot') && (field !== 'x') && (field !== 'y') && (field !== 'angle'))

  if (unknownField !== undefined) {
    throw new Error(`An aimed shot has an unknown field: "${unknownField}"`)
  }

  const shot = PORTAL_COLORS.find((color) => color === value.shot)

  if (shot === undefined) {
    throw new Error('An aimed shot\'s shot is neither "blue" nor "orange"')
  }

  return {
    shot: shot,
    x: readFinite(value.x, 'x'),
    y: readFinite(value.y, 'y'),
    angle: readFinite(value.angle, 'angle'),
  }
}

/**
 * An action in words, for logs and the scripts' reports.
 * @param action - The action
 * @returns Its name, or for an aimed shot its colour, origin and angle
 */
export function describeAction(action: RulesAction): string {
  if (!isAimedShot(action)) {
    return action
  }

  return `${action.shot} aimed from (${action.x}, ${action.y}) at ${action.angle} rad`
}
