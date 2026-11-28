import {GameKey} from '@/game/game_key'
import {type BoundKey, getBoundKey, getMouseBoundKey, type KeyBindings} from '@/game/key_bindings'

/**
 * Where the pointer was last seen, in page pixels from the window's top left
 * corner (MouseEvent.clientX and clientY).
 */
export type PointerPlace = {
  readonly clientX: number // From the window's left edge
  readonly clientY: number // From the window's top edge
}

/** The game keys that move the subject while held */
const MOVE_KEYS: ReadonlySet<GameKey> = new Set([
  GameKey.UP,
  GameKey.DOWN,
  GameKey.LEFT,
  GameKey.RIGHT,
])

/**
 * Keyboard and mouse state for the game, fed by keydown and keyup on the
 * window, mousedown for the mouse buttons a portal can be bound to, and
 * pointermove for where the pointer is. Keys are read by physical position
 * (KeyboardEvent.code) through the player's bindings, so they stay in place
 * on every layout; a bound mouse button, left or right, counts as a key
 * pressed wherever in the window it is clicked. The move keys count while
 * held: a key goes down with its first keydown, its repeats ignored, and up
 * with its keyup, or when the window loses focus or the page is hidden,
 * which may never send it. The other keys are presses, waiting in arrival
 * order until the level takes them, one at a time. Every other key and
 * button is ignored.
 */
export class Input {
  /**
   * Keys whose browser default (scrolling, pressing a focused button,
   * Firefox's quick find) is suppressed while enabled, when they are bound
   */
  private static readonly KEYS_WITH_DEFAULTS: ReadonlySet<string> = new Set([
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Space',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    'Enter',
    'NumpadEnter',
    'Slash',
    'Quote',
  ])

  /**
   * Characters that open Firefox's quick find, whichever key types them on
   * the player's layout, suppressed while enabled when their key is bound
   */
  private static readonly QUICK_FIND_CHARACTERS: ReadonlySet<string> = new Set([
    '/',
    '\'',
  ])

  private static readonly RIGHT_MOUSE_BUTTON = 2 // MouseEvent.button of the right button, which opens the context menu

  enabled = true // When false, keydown and mousedown are ignored entirely and the context menu opens
  private readonly gameKeys: ReadonlyMap<BoundKey, GameKey> // The game key each bound key stands for
  private readonly pressed = new Set<GameKey>() // Game keys that went down since the last clear(), held move keys included
  private readonly held = new Set<GameKey>() // Move keys held down now
  private readonly presses: GameKey[] = [] // Presses of the other keys not yet taken, oldest first
  private pointerPlace: PointerPlace | null = null // Where the pointer was last seen, or null until it moves over the window

  /**
   * Starts listening to the keyboard, the mouse buttons and the pointer on
   * the window.
   * @param bindings - The key bound to each game key, which is only read
   */
  constructor(bindings: KeyBindings) {
    this.gameKeys = new Map<BoundKey, GameKey>(Object.values(GameKey).map((gameKey) => [
      bindings[gameKey],
      gameKey,
    ]))

    window.addEventListener('keyup', this.onKeyup, false)
    window.addEventListener('keydown', this.onKeydown, false)
    window.addEventListener('mousedown', this.onMousedown, false)
    window.addEventListener('contextmenu', this.onContextmenu, false)
    window.addEventListener('pointermove', this.onPointermove, false)
    window.addEventListener('blur', this.onBlur, false)
    document.addEventListener('visibilitychange', this.onVisibilityChange, false)
  }

  /**
   * Forgets which keys went down since the last call, keeping the keys held
   * and the presses still waiting.
   */
  clear(): void {
    this.pressed.clear()
  }

  /**
   * Forgets every key: pressed, held and waiting. A move key still held
   * counts again only once it goes down again.
   */
  reset(): void {
    this.pressed.clear()
    this.held.clear()
    this.presses.length = 0
  }

  /**
   * Forgets every press still waiting.
   */
  forgetPresses(): void {
    this.presses.length = 0
  }

  /**
   * Takes the oldest waiting press.
   * @returns Its game key, a portal or interact, or null when no press is waiting
   */
  takePress(): GameKey | null {
    return this.presses.shift() ?? null
  }

  /**
   * Whether a game key went down since the last clear().
   * @param key - The game key
   * @returns True when it was pressed
   */
  isPressed(key: GameKey): boolean {
    return this.pressed.has(key)
  }

  /**
   * Whether a move key is held down now.
   * @param key - The game key
   * @returns True while it is held
   */
  isHeld(key: GameKey): boolean {
    return this.held.has(key)
  }

  /**
   * Where the pointer was last seen over the window, or null until it moves
   * there.
   */
  get pointer(): PointerPlace | null {
    return this.pointerPlace
  }

  /**
   * Stops listening to the keyboard, the mouse buttons and the pointer.
   */
  dispose(): void {
    window.removeEventListener('keyup', this.onKeyup, false)
    window.removeEventListener('keydown', this.onKeydown, false)
    window.removeEventListener('mousedown', this.onMousedown, false)
    window.removeEventListener('contextmenu', this.onContextmenu, false)
    window.removeEventListener('pointermove', this.onPointermove, false)
    window.removeEventListener('blur', this.onBlur, false)
    document.removeEventListener('visibilitychange', this.onVisibilityChange, false)
  }

  /**
   * Records a key going down, unless disabled or Alt or Meta is held. A move
   * key counts as held from its first keydown, its repeats ignored; any
   * other key's press waits for the level, except a repeat while its earlier
   * press is still waiting.
   * @param event - The keydown event
   */
  readonly onKeydown = (event: KeyboardEvent): void => {
    if (!this.enabled) {
      return
    }

    const key = getBoundKey(event.code)
    const gameKey = this.getGameKey(key)

    if ((key === null) || (gameKey === null)) {
      return
    }

    // With Alt or Meta held the key is a browser shortcut (Alt+Left goes
    // back), so it is left to the browser and doesn't play
    if (event.altKey || event.metaKey) {
      return
    }

    if (MOVE_KEYS.has(gameKey)) {
      // A repeat never brings back a key forgotten while it was held (a pause), so it moves again only once pressed again
      if (!event.repeat) {
        this.pressed.add(gameKey)
        this.held.add(gameKey)
      }
    } else {
      this.pressed.add(gameKey)

      if (!(event.repeat && this.presses.includes(gameKey))) {
        this.presses.push(gameKey)
      }
    }

    this.preventDefault(event)
  }

  /**
   * Lets go of a move key as it goes up, whether enabled or not, and
   * suppresses a bound key's browser default, unless disabled.
   * @param event - The keyup event
   */
  readonly onKeyup = (event: KeyboardEvent): void => {
    const gameKey = this.getGameKey(getBoundKey(event.code))

    if (gameKey === null) {
      return
    }

    this.held.delete(gameKey)

    if (this.enabled) {
      this.preventDefault(event)
    }
  }

  /**
   * Records a bound mouse button going down anywhere in the window, unless
   * disabled, as a key pressed: its press waits for the level, once however
   * long it is held. Its browser default
   * (selecting the text under it, moving the keyboard focus) is suppressed. A
   * click with Alt or Meta held is left to the browser and doesn't play.
   * @param event - The mousedown event
   */
  readonly onMousedown = (event: MouseEvent): void => {
    this.pointerPlace = {
      clientX: event.clientX,
      clientY: event.clientY,
    }

    if (!this.enabled || event.altKey || event.metaKey) {
      return
    }

    const gameKey = this.getGameKey(getMouseBoundKey(event.button))

    if (gameKey === null) {
      return
    }

    this.pressed.add(gameKey)
    this.presses.push(gameKey)

    event.preventDefault()
  }

  /**
   * Keeps the browser's context menu closed while enabled and the right mouse
   * button is bound, since it plays, unless Alt or Meta is held.
   * @param event - The contextmenu event
   */
  readonly onContextmenu = (event: MouseEvent): void => {
    if (this.enabled && !event.altKey && !event.metaKey && (this.getGameKey(getMouseBoundKey(Input.RIGHT_MOUSE_BUTTON)) !== null)) {
      event.preventDefault()
    }
  }

  /**
   * Remembers where the pointer is, enabled or not, so the aim is right as
   * soon as play resumes.
   * @param event - The pointermove event
   */
  readonly onPointermove = (event: PointerEvent): void => {
    this.pointerPlace = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
  }

  /**
   * Lets go of every move key when the window loses focus, since their keyup
   * goes elsewhere.
   */
  readonly onBlur = (): void => {
    this.held.clear()
  }

  /**
   * Lets go of every move key when the page is hidden, since their keyup may
   * never come.
   */
  readonly onVisibilityChange = (): void => {
    if (document.hidden) {
      this.held.clear()
    }
  }

  /**
   * The game key a key is bound to.
   * @param key - The key, as the game binds it, or null for one that can't be bound
   * @returns The game key, or null when it is not bound
   */
  private getGameKey(key: BoundKey | null): GameKey | null {
    return (key === null) ? null : (this.gameKeys.get(key) ?? null)
  }

  /**
   * Suppresses a bound key's browser default, such as scrolling, or the
   * browser shortcut it makes with Ctrl held (Ctrl+A selects the page, Ctrl+D
   * bookmarks it), unless Alt or Meta is held, which leaves the combination
   * to the browser.
   * @param event - The keyboard event of a bound key
   */
  private preventDefault(event: KeyboardEvent): void {
    const hasDefault = event.ctrlKey || Input.KEYS_WITH_DEFAULTS.has(event.code) || Input.QUICK_FIND_CHARACTERS.has(event.key)

    if (hasDefault && !event.altKey && !event.metaKey) {
      event.preventDefault()
    }
  }
}
