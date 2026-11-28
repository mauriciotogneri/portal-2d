import {AIM_ANGLES, type Direction} from '@/game/direction'
import {angleBetween} from '@/game/pointer_aim'

/**
 * A turn of the subject as drawn between following the aim and being held
 * one way, or back.
 */
type Blend = {
  readonly from: number // The angle drawn as it started, in radians counter-clockwise from right
  readonly startTime: number // When it started, in milliseconds on the frame clock
  readonly duration: number // How long it takes, in milliseconds
}

/** How long a quarter turn takes to draw, in milliseconds; a half turn takes half as long again */
const QUARTER_TURN_MILLISECONDS = 100

/** A quarter turn, in radians */
const QUARTER_TURN = Math.PI / 2

/** A turn smaller than this, in radians, is drawn at once */
const SMALLEST_TURN = 1e-6

/**
 * The angle the subject is drawn at: the aim's, following the pointer
 * exactly, unless it stands somewhere that holds it one way (an arrow),
 * where it faces that way. Coming to be held, or let go, or held another
 * way (an arrow turning under it), it turns from the angle drawn to its new
 * one, the shorter way round, over QUARTER_TURN_MILLISECONDS a quarter turn,
 * eased out, or at once when the player asks for reduced motion. Purely
 * visual: the rules have already turned it.
 */
export class SubjectAim {
  private heldWay: Direction | null = null // The way it is held, or null while it follows the aim
  private blend: Blend | null = null // The latest turn between the two, kept once over
  private drawnAngle = 0 // The angle drawn in the latest frame, in radians counter-clockwise from right

  /**
   * The angle drawn in the latest frame, in radians counter-clockwise from
   * right.
   */
  get angle(): number {
    return this.drawnAngle
  }

  /**
   * Draws it at an angle at once, held one way or following the aim, as at
   * a chamber's start.
   * @param angle - The angle, in radians counter-clockwise from right
   * @param heldWay - The way it is held, or null while it follows the aim
   */
  reset(angle: number, heldWay: Direction | null): void {
    this.heldWay = heldWay
    this.blend = null
    this.drawnAngle = (heldWay === null) ? angle : AIM_ANGLES[heldWay]
  }

  /**
   * The angle the subject is drawn at in a frame.
   * @param aimAngle - The angle aimed at, in radians counter-clockwise from right
   * @param heldWay - The way it is held now, or null while it follows the aim
   * @param time - The frame's time, in milliseconds on the frame clock
   * @param reducedMotion - Whether the player asks for reduced motion
   * @returns The angle, in radians counter-clockwise from right
   */
  angleAt(aimAngle: number, heldWay: Direction | null, time: number, reducedMotion: boolean): number {
    const target = (heldWay === null) ? aimAngle : AIM_ANGLES[heldWay]

    if (heldWay !== this.heldWay) {
      const turn = Math.abs(angleBetween(this.drawnAngle, target))

      this.heldWay = heldWay
      this.blend = (reducedMotion || (turn < SMALLEST_TURN)) ? null : {
        from: this.drawnAngle,
        startTime: time,
        duration: QUARTER_TURN_MILLISECONDS * (0.5 + (0.5 * turn / QUARTER_TURN)),
      }
    }

    const blend = this.blend
    const linear = (blend === null) ? 1 : Math.min(Math.max((time - blend.startTime) / blend.duration, 0), 1)

    // Cubic ease-out
    this.drawnAngle = (blend === null) ? target : blend.from + (angleBetween(blend.from, target) * (1 - ((1 - linear) ** 3)))

    return this.drawnAngle
  }

  /**
   * Whether it is still turning between following the aim and being held
   * at a time.
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns True while a turn is left to draw
   */
  isRunningAt(time: number): boolean {
    return (this.blend !== null) && ((time - this.blend.startTime) < this.blend.duration)
  }
}
