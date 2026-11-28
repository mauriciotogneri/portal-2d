import {DELTAS} from '@/game/direction'
import type {Movement} from '@/game/rules/action'
import {NO_ELEMENT} from '@/game/rules/compiled_chamber'
import type {RulesState} from '@/game/rules/rules_state'
import {allowsWay, shotStop} from '@/game/rules/step'

/**
 * Where a light barrier's band was met, from where, and when.
 */
type Reaction = {
  readonly x: number // Column of the light barrier met
  readonly y: number // Row of the light barrier met
  readonly fromX: number // Column of the subject's tile as it was met, which says which face of the band was met
  readonly fromY: number // Row of the subject's tile
  readonly startTime: number // When it was met, in milliseconds on the frame clock
}

/**
 * A reaction as the band drawing is told of it at a time.
 */
export type RunningReaction = {
  readonly x: number // Column of the light barrier met
  readonly y: number // Row of the light barrier met
  readonly fromX: number // Column of the subject's tile as it was met
  readonly fromY: number // Row of the subject's tile
  readonly progress: number // How far through the reaction, from 0 as it starts to 1 as it ends
}

/** How long a reaction lasts, in milliseconds */
const REACTION_MILLISECONDS = 700

/**
 * The reactions of the light barriers' bands where something met one that
 * is on: a portal shot the band stopped, or the subject walking into it.
 * The band brightens where it was met and a bright bar across it splits in
 * two and runs off both ways along it (LightBarrierBand draws it). The rules
 * report a refused shot but nothing for a walk into a band, so a walk-in is
 * read from the step: a move that left the subject on its tile, facing a
 * light barrier that is on; in the live game, from the subject's body
 * pressing into one. A band still reacting takes no new reaction, so a key
 * held into it pulses rather than staying lit. Purely visual: nothing
 * waits for it.
 */
export class LightBarrierReactions {
  private reactions: Reaction[] = [] // The reactions started lately, the oldest first

  /**
   * Starts a reaction where a portal shot the rules refused stopped, if a
   * light barrier that is on stopped it.
   * @param state - The state the shot was fired in, the subject facing the way it went
   * @param time - When, in milliseconds on the frame clock
   */
  startShot(state: RulesState, time: number): void {
    const stop = shotStop(state, state.subjectX, state.subjectY, state.facing)

    this.startAt(state, stop.x, stop.y, time)
  }

  /**
   * Starts a reaction where a move walked the subject into a light barrier
   * that is on: a move, or a turn the way it already faced, its own tile
   * letting it go that way, that left it on its tile.
   * @param before - The state before the step
   * @param after - The state after it
   * @param movement - What the move or turn action does
   * @param time - When, in milliseconds on the frame clock
   */
  startWalkIn(before: RulesState, after: RulesState, movement: Movement, time: number): void {
    const x = before.subjectX
    const y = before.subjectY
    const direction = movement.direction

    // A turn that only turned, a way its own tile forbids, or a move that went somewhere
    if ((movement.turn && (before.facing !== direction)) || !allowsWay(before, x, y, direction) || (after.subjectX !== x) || (after.subjectY !== y)) {
      return
    }

    this.startAt(after, x + DELTAS[direction].dx, y + DELTAS[direction].dy, time)
  }

  /**
   * Starts a reaction where the subject's body pressed into a light barrier
   * that is on, on a tile beside its own.
   * @param state - The state now
   * @param x - Column of the tile pressed into
   * @param y - Row of the tile pressed into
   * @param time - When, in milliseconds on the frame clock
   */
  startPressedInto(state: RulesState, x: number, y: number, time: number): void {
    this.startAt(state, x, y, time)
  }

  /**
   * Ends every reaction at once, so nothing of them is drawn again.
   */
  clear(): void {
    this.reactions = []
  }

  /**
   * Whether a reaction is still running at a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while there is a reaction to draw
   */
  isRunningAt(time: number): boolean {
    this.forgetEnded(time)

    return this.reactions.length > 0
  }

  /**
   * The reactions running at a time, and how far through each one is.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns The reactions, the oldest first
   */
  runningAt(time: number): RunningReaction[] {
    this.forgetEnded(time)

    return this.reactions.map((reaction) => ({
      x: reaction.x,
      y: reaction.y,
      fromX: reaction.fromX,
      fromY: reaction.fromY,
      progress: Math.max(time - reaction.startTime, 0) / REACTION_MILLISECONDS,
    }))
  }

  /**
   * Starts a reaction on a tile, met from the subject's tile, if a light
   * barrier that is on stands there and isn't reacting already.
   * @param state - The state it was met in
   * @param x - Column of the tile met
   * @param y - Row of the tile met
   * @param time - When, in milliseconds on the frame clock
   */
  private startAt(state: RulesState, x: number, y: number, time: number): void {
    const index = state.chamber.elementAt('lightBarrier', x, y)

    if ((index === NO_ELEMENT) || !state.isBlocked('lightBarrier', index)) {
      return
    }

    this.forgetEnded(time)

    if (this.reactions.some((reaction) => (reaction.x === x) && (reaction.y === y))) {
      return
    }

    this.reactions.push({
      x: x,
      y: y,
      fromX: state.subjectX,
      fromY: state.subjectY,
      startTime: time,
    })
  }

  /**
   * Forgets the reactions that have ended by a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   */
  private forgetEnded(time: number): void {
    this.reactions = this.reactions.filter((reaction) => time - reaction.startTime < REACTION_MILLISECONDS)
  }
}
