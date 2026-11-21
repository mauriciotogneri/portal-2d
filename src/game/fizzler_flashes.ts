import type {RulesState} from '@/game/rules/rules_state'

/**
 * Where the subject was caught in a field, and when.
 */
type Flash = {
  readonly x: number // Column of the subject's tile, a fizzler's
  readonly y: number // Row of that tile
  readonly startTime: number // When it was caught, in milliseconds on the frame clock
}

/**
 * A flash as the field drawing is told of it at a time.
 */
export type RunningFlash = {
  readonly x: number // Column of the fizzler the subject was caught in
  readonly y: number // Row of that fizzler
  readonly progress: number // How far through the flash, from 0 as it starts to 1 as it ends
}

/** How long a flash lasts, in milliseconds */
const FLASH_MILLISECONDS = 600

/**
 * The flashes of the fizzlers' fields where the subject was caught in one:
 * each time a step reports `fizzled` (it walked or crossed into a field
 * that is on, or one switched on under it), a ring spreads from its tile
 * through the field it was caught in, which brightens for a moment
 * (FizzlerField draws it). Purely visual: the rules have already closed
 * the portals, and nothing waits for the flash.
 */
export class FizzlerFlashes {
  private flashes: Flash[] = [] // The flashes started lately, the oldest first

  /**
   * Starts a flash where the subject stands in a state, alongside any still
   * running.
   * @param state - The state the subject was caught in, standing in a field
   * @param time - When, in milliseconds on the frame clock
   */
  start(state: RulesState, time: number): void {
    this.forgetEnded(time)
    this.flashes.push({
      x: state.subjectX,
      y: state.subjectY,
      startTime: time,
    })
  }

  /**
   * Ends every flash at once, so nothing of them is drawn again.
   */
  clear(): void {
    this.flashes = []
  }

  /**
   * Whether a flash is still running at a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while there is a flash to draw
   */
  isRunningAt(time: number): boolean {
    this.forgetEnded(time)

    return this.flashes.length > 0
  }

  /**
   * The flashes running at a time, and how far through each one is.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns The flashes, the oldest first
   */
  runningAt(time: number): RunningFlash[] {
    this.forgetEnded(time)

    return this.flashes.map((flash) => ({
      x: flash.x,
      y: flash.y,
      progress: Math.max(time - flash.startTime, 0) / FLASH_MILLISECONDS,
    }))
  }

  /**
   * Forgets the flashes that have ended by a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  private forgetEnded(time: number): void {
    this.flashes = this.flashes.filter((flash) => time - flash.startTime < FLASH_MILLISECONDS)
  }
}
