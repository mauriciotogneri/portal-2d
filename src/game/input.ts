import type {FrameInput} from '@/game/frame_input'
import {GameKey} from '@/game/game_key'
import {type BoundKey, getBoundKey, getMouseBoundKey, type KeyBindings} from '@/game/key_bindings'

/**
 * A press waiting for the level.
 */
type KeyPress = {
  readonly key: GameKey // The game key pressed
}

/**
 * Keyboard state for the game, fed by keydown and keyup on the window, and by
 * mousedown for the mouse buttons a portal can be bound to. Keys are read by
 * physical position (KeyboardEvent.code) through the player's bindings, so
 * they stay in place on every layout; a bound mouse button, left or right,
 * counts as a key pressed wherever in the window it is clicked, and the
 * pointer's movement plays no part. Every other key and button is ignored.
 * Presses wait in arrival order until the level takes them, one at a time.
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
  private readonly pressed = new Set<GameKey>() // Game keys pressed since the last clear(), auto-repeat included
  private readonly presses: KeyPress[] = [] // Presses not yet taken, oldest first

  /**
   * Starts listening to the keyboard and the mouse buttons on the window.
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
  }

  /**
   * Forgets which keys went down since the last call, keeping the presses
   * still waiting.
   */
  clear(): void {
    this.pressed.clear()
  }

  /**
   * Forgets every key: pressed and waiting.
   */
  reset(): void {
    this.pressed.clear()
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
   * @returns What the rules read for it, its key, or null when no press is
   * waiting
   */
  takePress(): FrameInput | null {
    const press = this.presses.shift()

    if (press === undefined) {
      return null
    }

    return {
      keys: [press.key],
    }
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
   * Stops listening to the keyboard and the mouse buttons.
   */
  dispose(): void {
    window.removeEventListener('keyup', this.onKeyup, false)
    window.removeEventListener('keydown', this.onKeydown, false)
    window.removeEventListener('mousedown', this.onMousedown, false)
    window.removeEventListener('contextmenu', this.onContextmenu, false)
  }

  /**
   * Records a key going down, unless disabled. A press waits for the level,
   * except a held key's repeat while its earlier press is still waiting, and
   * a press with Alt or Meta held, which is ignored.
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

    this.pressed.add(gameKey)

    if (!(event.repeat && this.presses.some((press) => press.key === gameKey))) {
      this.presses.push({
        key: gameKey,
      })
    }

    this.preventDefault(event)
  }

  /**
   * Suppresses a bound key's browser default as it goes up, unless disabled.
   * @param event - The keyup event
   */
  readonly onKeyup = (event: KeyboardEvent): void => {
    if (this.enabled && (this.getGameKey(getBoundKey(event.code)) !== null)) {
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
    if (!this.enabled || event.altKey || event.metaKey) {
      return
    }

    const gameKey = this.getGameKey(getMouseBoundKey(event.button))

    if (gameKey === null) {
      return
    }

    this.pressed.add(gameKey)
    this.presses.push({
      key: gameKey,
    })

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
