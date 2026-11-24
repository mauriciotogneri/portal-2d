import {GameKey} from '@/game/game_key'

/**
 * A key as the game binds it: the physical key's KeyboardEvent.code, except
 * that both keys of a left and right modifier pair share one name ("Control",
 * "Shift"), so either of them will do; or, for a portal only, the left or
 * right mouse button, as "MouseLeft" or "MouseRight", names no key's code
 * takes.
 */
export type BoundKey = string

/** One of the two mouse buttons that can be bound. */
export type MouseButton = 'left' | 'right'

/**
 * The key each game key is bound to: one key each, never shared.
 */
export type KeyBindings = Readonly<Record<GameKey, BoundKey>>

/** The Default layout, stored as Arrow keys: arrows, A, D, Space and either Shift */
export const ARROW_KEY_BINDINGS: KeyBindings = {
  [GameKey.UP]: 'ArrowUp',
  [GameKey.DOWN]: 'ArrowDown',
  [GameKey.LEFT]: 'ArrowLeft',
  [GameKey.RIGHT]: 'ArrowRight',
  [GameKey.BLUE]: 'KeyA',
  [GameKey.ORANGE]: 'KeyD',
  [GameKey.INTERACT]: 'Space',
  [GameKey.TURN]: 'Shift',
}

/**
 * A second turn key the Default layout takes on trial, either Ctrl, shown
 * nowhere in the game (not in the legend, Settings or the custom controls
 * dialog)
 */
export const DEFAULT_EXTRA_TURN_KEY: BoundKey = 'Control'

/** The shared name of each left and right modifier key */
const FOLDED_KEYS: Readonly<Record<string, BoundKey>> = {
  ControlLeft: 'Control',
  ControlRight: 'Control',
  ShiftLeft: 'Shift',
  ShiftRight: 'Shift',
}

/**
 * Keys that can't be bound: Escape and Tab belong to the screens, and Alt,
 * Meta (with the names older browsers give it) and the function keys to the
 * browser. Unidentified stands for a key the browser can't name.
 */
const UNBINDABLE_KEYS: ReadonlySet<string> = new Set([
  'Escape',
  'Tab',
  'AltLeft',
  'AltRight',
  'MetaLeft',
  'MetaRight',
  'OSLeft',
  'OSRight',
  'Unidentified',
])

/** The game keys a mouse button can be bound to: the two portals */
const MOUSE_GAME_KEYS: ReadonlySet<GameKey> = new Set([
  GameKey.BLUE,
  GameKey.ORANGE,
])

/** The bound key of each mouse button that can be bound, by MouseEvent.button */
const MOUSE_BUTTON_KEYS: ReadonlyMap<number, BoundKey> = new Map([
  [
    0,
    'MouseLeft',
  ],
  [
    2,
    'MouseRight',
  ],
])

/** Each mouse button that can be bound, by its bound key; a map, so a stored name such as "constructor" finds nothing */
const MOUSE_BUTTONS: ReadonlyMap<BoundKey, MouseButton> = new Map([
  [
    'MouseLeft',
    'left',
  ],
  [
    'MouseRight',
    'right',
  ],
])

/** Function keys, F1 to F24 */
const FUNCTION_KEY_PATTERN = /^F\d+$/

/**
 * The key a keyboard event's code is bound as.
 * @param code - A KeyboardEvent.code
 * @returns The key, with left and right modifiers folded into one, or null
 * when the key can't be bound
 */
export function getBoundKey(code: string): BoundKey | null {
  if ((code === '') || UNBINDABLE_KEYS.has(code) || FUNCTION_KEY_PATTERN.test(code)) {
    return null
  }

  return FOLDED_KEYS[code] ?? code
}

/**
 * Whether a game key's binding can hold a key name: a key that can be bound,
 * with left and right modifiers already folded into one, or, for a portal,
 * the left or right mouse button.
 * @param gameKey - The game key bound
 * @param key - The key name, such as a stored binding
 * @returns True when the game key's binding can hold it
 */
export function canBindKey(gameKey: GameKey, key: string): boolean {
  if (getKeyMouseButton(key) !== null) {
    return MOUSE_GAME_KEYS.has(gameKey)
  }

  return getBoundKey(key) === key
}

/**
 * The key a mouse event's button is bound as.
 * @param button - A MouseEvent.button
 * @returns The bound key of the left or right button, or null for any other
 * button, which can't be bound
 */
export function getMouseBoundKey(button: number): BoundKey | null {
  return MOUSE_BUTTON_KEYS.get(button) ?? null
}

/**
 * Which mouse button a bound key is.
 * @param key - The bound key
 * @returns The button, or null for a key of the keyboard
 */
export function getKeyMouseButton(key: BoundKey): MouseButton | null {
  return MOUSE_BUTTONS.get(key) ?? null
}
