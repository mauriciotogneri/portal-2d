import type {Direction} from '@/game/direction'
import {NO_ELEMENT} from '@/game/rules/compiled_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import {shotStop} from '@/game/rules/step'

/**
 * Where a portal shot met a fizzler's field, the way it flew, and when.
 */
type Splash = {
  readonly x: number // Column of the fizzler the shot met
  readonly y: number // Row of that fizzler
  readonly way: Direction // The way the shot flew, which says which face of the field it met
  readonly startTime: number // When it met the field, in milliseconds on the frame clock
}

/**
 * A splash as the field drawing is told of it at a time.
 */
export type RunningSplash = {
  readonly x: number // Column of the fizzler the shot met
  readonly y: number // Row of that fizzler
  readonly way: Direction // The way the shot flew
  readonly progress: number // How far through the splash, from 0 as it starts to 1 as it ends
}

/** How long a splash lasts, in milliseconds */
export const SPLASH_MILLISECONDS = 550

/**
 * The splashes of the fizzlers' fields where a portal shot met one that is
 * on: the field brightens round the point the shot met on its face, a white
 * spot flashes there, and a ring of light spreads from it into the field
 * (FizzlerField draws it). Splashes run alongside each other, so two shots
 * in quick succession both show. Purely visual: the rules have already
 * refused the shot, and nothing waits for the splash.
 */
export class FizzlerSplashes {
  private splashes: Splash[] = [] // The splashes started lately, the oldest first

  /**
   * Starts a splash where a portal shot the rules refused stopped, if a
   * fizzler that is on stopped it.
   * @param state - The state the shot was fired in, the subject facing the way it went
   * @param time - When, in milliseconds on the frame clock
   */
  startShot(state: RulesState, time: number): void {
    const stop = shotStop(state, state.subjectX, state.subjectY, state.facing)
    const index = state.chamber.elementAt('fizzler', stop.x, stop.y)

    if ((index === NO_ELEMENT) || !state.isBlocked('fizzler', index)) {
      return
    }

    this.forgetEnded(time)
    this.splashes.push({
      x: stop.x,
      y: stop.y,
      way: state.facing,
      startTime: time,
    })
  }

  /**
   * Ends every splash at once, so nothing of them is drawn again.
   */
  clear(): void {
    this.splashes = []
  }

  /**
   * Whether a splash is still running at a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while there is a splash to draw
   */
  isRunningAt(time: number): boolean {
    this.forgetEnded(time)

    return this.splashes.length > 0
  }

  /**
   * The splashes running at a time, and how far through each one is.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns The splashes, the oldest first
   */
  runningAt(time: number): RunningSplash[] {
    this.forgetEnded(time)

    return this.splashes.map((splash) => ({
      x: splash.x,
      y: splash.y,
      way: splash.way,
      progress: Math.max(time - splash.startTime, 0) / SPLASH_MILLISECONDS,
    }))
  }

  /**
   * Forgets the splashes that have ended by a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  private forgetEnded(time: number): void {
    this.splashes = this.splashes.filter((splash) => time - splash.startTime < SPLASH_MILLISECONDS)
  }
}
