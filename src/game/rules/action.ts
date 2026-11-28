import {Direction} from '@/game/direction'

/**
 * One thing the player does in a step of the rules: a move or a turn
 * towards one of four directions, a portal shot, or interact.
 */
export type Action =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'turnUp'
  | 'turnDown'
  | 'turnLeft'
  | 'turnRight'
  | 'blue'
  | 'orange'
  | 'interact'

/**
 * Named values of Action.
 */
export const Action = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  TURN_UP: 'turnUp',
  TURN_DOWN: 'turnDown',
  TURN_LEFT: 'turnLeft',
  TURN_RIGHT: 'turnRight',
  BLUE: 'blue',
  ORANGE: 'orange',
  INTERACT: 'interact',
} as const

/**
 * What a move or turn action does: which way, and whether it only turns.
 */
export type Movement = {
  readonly direction: Direction // Which way the subject faces, and moves
  readonly turn: boolean // Whether it only turns, unless it already faced that way
}

/** Every action, in a fixed order, so a seeded walk picks the same ones on every run */
export const ACTIONS: readonly Action[] = [
  Action.UP,
  Action.DOWN,
  Action.LEFT,
  Action.RIGHT,
  Action.TURN_UP,
  Action.TURN_DOWN,
  Action.TURN_LEFT,
  Action.TURN_RIGHT,
  Action.BLUE,
  Action.ORANGE,
  Action.INTERACT,
]

/** What each move or turn action does; null for the other actions */
export const MOVEMENTS: Readonly<Record<Action, Movement | null>> = {
  [Action.UP]: {
    direction: Direction.UP,
    turn: false,
  },
  [Action.DOWN]: {
    direction: Direction.DOWN,
    turn: false,
  },
  [Action.LEFT]: {
    direction: Direction.LEFT,
    turn: false,
  },
  [Action.RIGHT]: {
    direction: Direction.RIGHT,
    turn: false,
  },
  [Action.TURN_UP]: {
    direction: Direction.UP,
    turn: true,
  },
  [Action.TURN_DOWN]: {
    direction: Direction.DOWN,
    turn: true,
  },
  [Action.TURN_LEFT]: {
    direction: Direction.LEFT,
    turn: true,
  },
  [Action.TURN_RIGHT]: {
    direction: Direction.RIGHT,
    turn: true,
  },
  [Action.BLUE]: null,
  [Action.ORANGE]: null,
  [Action.INTERACT]: null,
}
