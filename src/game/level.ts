import {BoxFall} from '@/game/box_fall'
import {BoxReturns} from '@/game/box_returns'
import type {ChamberData} from '@/game/chamber_data'
import type {Direction} from '@/game/direction'
import {ElementTransitions} from '@/game/element_transitions'
import {exitOuterSide} from '@/game/exit_shadow'
import {FizzleParticles} from '@/game/fizzle_particles'
import {FizzlerFlashes} from '@/game/fizzler_flashes'
import {FizzlerSplashes} from '@/game/fizzler_splashes'
import {GameEvent} from '@/game/game_event'
import {GameKey} from '@/game/game_key'
import type {FrameInput} from '@/game/frame_input'
import type {FrameStats} from '@/game/frame_stats'
import {Input} from '@/game/input'
import type {KeyBindings} from '@/game/key_bindings'
import {LightBarrierReactions} from '@/game/light_barrier_reactions'
import {findMirrorBounces, type MirrorBounces, NO_MIRROR_BOUNCES} from '@/game/mirror_bounces'
import {MissRipple} from '@/game/miss_ripple'
import {PortalOpenings} from '@/game/portal_openings'
import {PortalParticles} from '@/game/portal_particles'
import {sendsBoxesHome} from '@/game/returned_boxes'
import {getChamberHash, type ReplayData} from '@/game/replay_data'
import {hasAmbientLife, Renderer} from '@/game/renderer'
import {Action, actionOfPress, MOVEMENTS} from '@/game/rules/action'
import {CompiledChamber} from '@/game/rules/compiled_chamber'
import {loadChamber} from '@/game/rules/load_chamber'
import type {PortalColor} from '@/game/rules/portal_color'
import {runRulesReplay} from '@/game/rules/replay_runner'
import type {RulesState} from '@/game/rules/rules_state'
import {startChamber, step, type StepResult} from '@/game/rules/step'
import {Sound} from '@/game/sound'
import {legReach, StepAnimation} from '@/game/step_animation'
import {SubjectTurn} from '@/game/subject_turn'

/**
 * Something a slide being drawn still has waiting: what happened on one of
 * the tiles it entered, played as the subject gets there, or its stop and
 * settling, played as it ends.
 */
type SlideBeat = {
  readonly time: number // When it plays, in milliseconds on the frame clock
  readonly before: RulesState // The state drawn until then
  readonly after: RulesState // The state drawn from then on
  readonly events: readonly GameEvent[] // What happened, in order
  readonly joinsBreakUp: boolean // Whether what it breaks up joins what an earlier beat of the same slide broke up, rather than replacing it
  readonly bounces: MirrorBounces // Whether a ray started bouncing off a mirror box, judged over the whole slide, so only the beat of its stop and settling has one
}

/**
 * Plays a chamber on a canvas, driven by the chamber screen. Each frame takes
 * the oldest waiting key press, if any, as one action, fully resolved by the
 * rules' step, plays a sound for each thing that happened and redraws when
 * the state changed. A step that changes the state is then drawn over a few
 * frames, redrawn every frame until it ends, paused or not; the next press
 * ends it at once. When a step fizzles, the portals it took break up over a
 * few frames; a box a step sends back to its start, destroyed or sent home by
 * a link, comes apart where it was and flies there, while one on a ditch
 * that opens falls out of sight and gathers at its start;
 * an arrow a step turns swings its chevron round, a blocked wall a step
 * switches slides its steel apart or shut, a
 * ditch a step switches slides its grate in or out, a door or the exit a step
 * opens or closes slides open or shut, a fizzler's field a step switches
 * fades out or in, the field the subject is caught in flashes, a laser a step switches fades out or in, a light barrier's band a step
 * switches unfolds or folds away, a portal a shot opens grows open on its
 * wall, and a portal shot that misses
 * ripples where it stopped, a fizzler's field that stopped it splashes, and a light barrier's band that stopped it, or that the subject
 * walked into, reacts; no press waits for them nor cuts them short. While
 * a fizzler's field or a light barrier is on, or anything glows, breaks up, flashes, splashes, falls, changes, opens, ripples or reacts, every frame is
 * drawn too. Nothing is drawn over time when the player asks for reduced
 * motion: the glows hold steady, the fields hold still and the bands' edges hold steady. A step that slides is drawn along its path,
 * and what happens on each tile it enters (a fizzle, a portal crossing) waits
 * until the subject gets there, its stop and settling (buttons, doors, the
 * completion) until the slide ends; the next press first plays all that is
 * still waiting, and a load drops it. A step drawn over time that puts the
 * subject on the exit, moving out through the chamber's edge, walks it on
 * out of the chamber, and the completion waits until it is out of sight;
 * once the chamber is completed, no press is taken and none waits. Every
 * press it acts on is logged, so the run since the last load can be replayed
 * without a browser.
 */
export class Level {
  /** Keys that start the clock: moving, both portals and interacting */
  private static readonly CLOCK_START_KEYS: readonly GameKey[] = [
    GameKey.LEFT,
    GameKey.UP,
    GameKey.RIGHT,
    GameKey.DOWN,
    GameKey.BLUE,
    GameKey.ORANGE,
    GameKey.INTERACT,
  ]

  /** Fewest tiles the chamber is sized for each way, so a small chamber's tiles are no larger than a chamber this size would get */
  private static readonly MINIMUM_TILES = 16

  /** A longer gap between frames (a hidden tab, the computer asleep) is left out of the frame rate, in milliseconds */
  private static readonly FRAME_RATE_GAP_LIMIT = 1000

  /** The sound each event of the rules plays, or null for one shown but not heard */
  private static readonly SOUNDS: Readonly<Record<GameEvent, Sound | null>> = {
    [GameEvent.BLUE_PORTAL_OPENED]: Sound.PORTAL_BLUE,
    [GameEvent.ORANGE_PORTAL_OPENED]: Sound.PORTAL_ORANGE,
    [GameEvent.REFUSED]: Sound.ERROR,
    [GameEvent.BOX_PICKED_UP]: Sound.BOX,
    [GameEvent.BOX_PUT_DOWN]: Sound.BOX,
    [GameEvent.BOX_DESTROYED]: Sound.BOX_DESTROYED,
    [GameEvent.CARRIED_BOX_DESTROYED]: Sound.BOX_DESTROYED,
    [GameEvent.BOX_SENT_BACK]: Sound.BOX_DESTROYED,
    [GameEvent.FIZZLED]: Sound.FIZZLE,
    [GameEvent.PORTAL_FIZZLED]: null,
    [GameEvent.CROSSED]: Sound.CROSS,
    [GameEvent.DOOR_OPENED]: Sound.DOOR_OPEN,
    [GameEvent.DOOR_CLOSED]: Sound.DOOR_CLOSE,
    [GameEvent.EXIT_OPENED]: Sound.DOOR_OPEN,
    [GameEvent.EXIT_CLOSED]: Sound.DOOR_CLOSE,
    [GameEvent.BUTTON_PRESSED]: Sound.BUTTON_ON,
    [GameEvent.BUTTON_RELEASED]: Sound.BUTTON_OFF,
    [GameEvent.SWITCH_USED]: Sound.SWITCH,
    [GameEvent.EXIT_REACHED]: Sound.EXIT_REACHED,
    [GameEvent.SLIDE_STARTED]: Sound.SLIDING_FLOOR,
    [GameEvent.SLIDE_STOPPED]: null,
    [GameEvent.ARROW_TURNED]: Sound.TURNABLE_ARROW,
    [GameEvent.BLOCKED_WALL_SWITCHED]: Sound.BLOCKED_WALL,
    [GameEvent.DITCH_SWITCHED]: Sound.DITCH_GRATE,
    [GameEvent.LIGHT_BARRIER_SWITCHED_OFF]: Sound.LIGHT_BARRIER_OFF,
    [GameEvent.LIGHT_BARRIER_SWITCHED_ON]: Sound.LIGHT_BARRIER_ON,
    [GameEvent.LASER_SWITCHED_OFF]: Sound.LASER_OFF,
    [GameEvent.LASER_SWITCHED_ON]: Sound.LASER_ON,
    [GameEvent.FIZZLER_SWITCHED_OFF]: Sound.FIZZLER_OFF,
    [GameEvent.FIZZLER_SWITCHED_ON]: Sound.FIZZLER_ON,
    [GameEvent.EMITTER_SWITCHED_OFF]: Sound.EMITTER_OFF,
    [GameEvent.EMITTER_SWITCHED_ON]: Sound.EMITTER_ON,
    [GameEvent.RECEIVER_LIT]: Sound.RECEIVER_ON,
    [GameEvent.RECEIVER_UNLIT]: Sound.RECEIVER_OFF,
  }

  onCompleted: (() => void) | null = null // Called once per load when the subject reaches the exit, or, when it walks on out of the chamber, once it is out of sight
  frameStats: FrameStats | null = null // Development only: told of each frame, each drawing and each rules step, which are timed only while it is set

  private chamber: CompiledChamber | null = null // The chamber being played, null before the first load
  private chamberHash = '' // Hash of the chamber being played, as replays name it
  private state: RulesState | null = null // The state now, null before the first load
  private replaySteps: Action[] = [] // Every press acted on since the last load, in order
  private stepHashes: string[] = [] // Hash of the state right after each logged press
  private clockStarted = false // Whether a game key has been pressed since the last load
  private elapsedSeconds = 0 // Play time since the clock started; only grows while unpaused
  private stepCount = 0 // Steps that put the subject on another tile since the last load
  private portalCount = 0 // Portals opened on a wall since the last load, misses not counted
  private rateFrames = 0 // Frames since the last load that came within the gap limit of the frame before them
  private rateMilliseconds = 0 // The gaps before those frames, added up
  private readonly renderer: Renderer // Draws the state
  private readonly animation = new StepAnimation() // The step being drawn over a few frames, if any
  private readonly fizzle = new FizzleParticles() // What the latest fizzle took, breaking up over a few frames, if anything
  private readonly changes = new ElementTransitions() // The arrows, the blocked walls, the ditches, the doors, the exit, the fizzlers, the lasers and the light barriers changing over a few frames after a step switched them, if any
  private readonly ripple = new MissRipple() // Where the latest missed portal shot stopped, rippling over a few frames, if anywhere
  private readonly fall = new BoxFall() // The boxes the latest step dropped into ditches, falling over a few frames, if any
  private readonly returns = new BoxReturns() // The boxes the latest steps sent home, coming apart and flying home, or gathering there, over a few frames, if any
  private readonly openings = new PortalOpenings() // The portals shots opened lately, opening over a few frames, if any
  private readonly particles = new PortalParticles() // The particles rising from the open portals, and fading where a portal closed lately
  private readonly flashes = new FizzlerFlashes() // Where the subject was caught in a fizzler's field lately, flashing over a few frames, if anywhere
  private readonly splashes = new FizzlerSplashes() // Where a portal shot met a fizzler's field lately, splashing over a few frames, if anywhere
  private readonly reactions = new LightBarrierReactions() // Where a shot or the subject met a light barrier's band lately, reacting over a few frames, if anywhere
  private readonly turn = new SubjectTurn() // The subject's facing as drawn, turning over a few frames whenever it comes to face another way
  private slideBeats: SlideBeat[] = [] // What the slide being drawn still has waiting, in order; empty when none is
  private completionTime: number | null = null // When the completion is told after a step that didn't slide and walks the subject out of the chamber, once it is out of sight, in milliseconds on the frame clock; null when none waits
  private frameTime = 0 // The latest frame's time, in milliseconds on the frame clock; redraws outside a frame use it, so a step being drawn never goes back
  private readonly reducedMotion: MediaQueryList // Whether the player asks for reduced motion, read each time something could be drawn over time
  private ambientDrawn = false // Whether the latest frame was drawn for what moves with time alone, so the frame after it ends draws it still
  private readonly input: Input // The keyboard, listening from construction until dispose()
  private initialized = false // Whether the frame loop has started
  private isPaused = false // Whether the loop skips updates and the input ignores keydown
  private disposed = false // Whether dispose() has run
  private frameId: number | null = null // The pending animation frame request
  private startTime = 0 // When the previous frame ran, in milliseconds since the epoch

  /**
   * Takes over a canvas. Nothing is drawn until load().
   * @param canvas - The canvas to draw on
   * @param bindings - The key bound to each game key, which is only read
   * @param screenWidth - Width available to the chamber, in canvas pixels
   * @param screenHeight - Height available to the chamber, in canvas pixels
   */
  constructor(canvas: HTMLCanvasElement, bindings: KeyBindings, screenWidth: number, screenHeight: number) {
    // The open exit fades the canvas out, so the stage behind it shows through with no step at the chamber's edge
    this.renderer = new Renderer(canvas, screenWidth, screenHeight, Level.MINIMUM_TILES, true)
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    this.input = new Input(bindings)
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  /**
   * Loads the chamber, settles its start and draws it;
   * loading again resets it, its clock and its counters.
   * The first load starts the frame loop, running its first frame at once.
   * @param chamberData - The chamber JSON, which is only read
   * @throws Error when the rules can't load the chamber
   */
  load(chamberData: ChamberData): void {
    const loaded = loadChamber(chamberData)

    if (loaded.chamber === null) {
      throw new Error(`The rules can't load the chamber: ${loaded.problems.map((problem) => problem.message).join('; ')}`)
    }

    const chamber = new CompiledChamber(loaded.chamber)
    const start = startChamber(chamber)

    this.renderer.setSize(chamber.width, chamber.height)
    this.chamber = chamber
    this.chamberHash = getChamberHash(loaded.chamber)
    this.state = start.state
    this.replaySteps = []
    this.stepHashes = []
    this.clockStarted = false
    this.elapsedSeconds = 0
    this.stepCount = 0
    this.portalCount = 0
    this.rateFrames = 0
    this.rateMilliseconds = 0
    this.animation.finish()
    // What a slide of the run being dropped still had waiting goes with it, its completion included, and so does a walk-out's
    this.slideBeats = []
    this.completionTime = null
    this.fizzle.clear()
    this.changes.clear()
    this.ripple.clear()
    this.fall.clear()
    this.returns.clear()
    this.openings.clear()
    this.particles.clear()
    this.flashes.clear()
    this.splashes.clear()
    this.reactions.clear()
    this.turn.clear()

    this.countPortals(start.events)
    this.playSounds(start.events)

    if (!this.initialized) {
      this.initialized = true
      this.run()
    }

    this.render(this.frameTime)
  }

  /**
   * Whether the game is paused.
   */
  get paused(): boolean {
    return this.isPaused
  }

  /**
   * Pauses or resumes. While paused the state does not update and keydown is
   * ignored, but a step being drawn still runs to its end.
   * Resuming forgets every key, pressed and held, first.
   */
  set paused(value: boolean) {
    this.isPaused = value

    if (value) {
      this.input.enabled = false
    } else {
      this.input.reset()
      this.input.enabled = true
    }
  }

  /**
   * Whether the clock is running, that is, a game key has been pressed since
   * the last load. It keeps this value once the game pauses.
   */
  get started(): boolean {
    return this.clockStarted
  }

  /**
   * Play time since the clock started, in whole hundredths of a second.
   * Frames that ran while the game was paused or the tab was hidden are not
   * counted.
   */
  get elapsedHundredths(): number {
    return Math.floor(this.elapsedSeconds * 100)
  }

  /**
   * Steps that put the subject on another tile since the last load: a walk,
   * a portal crossing or a whole slide counts as one. Turning in place,
   * walking into something solid and a slide that ends where it started
   * don't count.
   */
  get moves(): number {
    return this.stepCount
  }

  /**
   * Portals opened on a wall since the last load; a shot that misses doesn't
   * count, and moving a portal counts again.
   */
  get portalsPlaced(): number {
    return this.portalCount
  }

  /**
   * How often the frame loop has run since the last load, in frames per
   * second, paused or not, leaving out gaps of over a second between frames
   * (a hidden tab, the computer asleep); null until a frame has followed
   * another within that time.
   */
  get framesPerSecond(): number | null {
    return (this.rateFrames === 0) ? null : this.rateFrames * 1000 / this.rateMilliseconds
  }

  /**
   * The run since the last load as a replay, for saving a solution. Replays
   * the logged presses on the chamber's start first and checks that they
   * reproduce the live run: the state after every press, the moves and the
   * portals.
   * @returns The replay
   * @throws Error when no chamber is loaded, or when the replay differs from the live run
   */
  createReplay(): ReplayData {
    if (this.chamber === null) {
      throw new Error('No chamber is loaded')
    }

    const actions = [...this.replaySteps]
    const result = runRulesReplay(this.chamber, actions)
    const differingStep = this.stepHashes.findIndex((hash, index) => hash !== result.stepHashes[index])

    if (differingStep !== -1) {
      throw new Error(`The replay differs from the live run after press ${differingStep + 1} of ${actions.length} (${actions[differingStep]})`)
    }

    if ((result.moves !== this.stepCount) || (result.portals !== this.portalCount)) {
      throw new Error(`The replay counts ${result.moves} moves and ${result.portals} portals, the live run ${this.stepCount} and ${this.portalCount}`)
    }

    return {
      chamberHash: this.chamberHash,
      actions: actions,
      expected: {
        completed: result.completed,
        moves: result.moves,
        portals: result.portals,
        finalHash: result.finalState.hash,
      },
    }
  }

  /**
   * Fits the current chamber to a new screen area and redraws it as the
   * latest frame drew it, part way through a step being drawn too.
   * @param screenWidth - Width available to the chamber, in canvas pixels
   * @param screenHeight - Height available to the chamber, in canvas pixels
   */
  resize(screenWidth: number, screenHeight: number): void {
    this.renderer.resize(screenWidth, screenHeight)

    if (this.chamber !== null) {
      this.renderer.setSize(this.chamber.width, this.chamber.height)
      this.render(this.frameTime)
    }
  }

  /**
   * Stops the frame loop and the keyboard listeners for good.
   */
  dispose(): void {
    this.disposed = true
    document.removeEventListener('visibilitychange', this.onVisibilityChange)

    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId)
      this.frameId = null
    }

    this.input.dispose()
  }

  /**
   * Draws the current state, part way through the step being drawn, if any,
   * with what moves with time alone at this time, the fizzlers' fields, the light barriers' bands, the portals' particles, what breaks up,
   * flashes, splashes, reacts, falls or flies home, a portal opening, a missed shot's ripple, the subject turning and the arrows, the blocked walls, the ditches, the doors,
   * the exit, the fizzlers, the lasers and the light barriers changing included, or held still when the player asks for
   * reduced motion.
   * @param time - Now, in milliseconds on the frame clock
   */
  private render(time: number): void {
    if (this.state !== null) {
      const frameStats = this.frameStats
      const drawStart = (frameStats === null) ? 0 : performance.now()

      this.renderer.render(this.state, this.animation.transitionAt(time), this.reducedMotion.matches ? null : time, this.fizzle, this.changes, this.ripple, this.fall, this.openings, this.turn, this.returns, this.particles, this.flashes, this.reactions, this.splashes)
      frameStats?.recordDraw(performance.now() - drawStart)
    }
  }

  /**
   * Runs the rules' step, timed while frame stats are set.
   * @param chamber - The chamber being played
   * @param state - The state before the step
   * @param action - The action stepped
   * @returns What the rules' step gave for it
   */
  private runStep(chamber: CompiledChamber, state: RulesState, action: Action): StepResult {
    const frameStats = this.frameStats
    const stepStart = (frameStats === null) ? 0 : performance.now()
    const result = step(chamber, state, action)

    frameStats?.recordStep(performance.now() - stepStart)

    return result
  }

  /**
   * Plays the sound of each thing that happened, in order. A portal shot
   * that misses plays the shot sound instead of the error sound; any other
   * refusal plays the error sound. A portal a fizzler closes by turning on
   * plays none. A ray starting to bounce off a mirror box plays the mirror
   * box's sound last, once however many it bounces off, and a mirror box put
   * down in a ray plays it instead of the put-down sound.
   * @param events - What happened
   * @param shot - Whether a portal shot made it happen
   * @param bounces - Whether it set a ray bouncing off a mirror box
   */
  private playSounds(events: readonly GameEvent[], shot = false, bounces = NO_MIRROR_BOUNCES): void {
    for (const event of events) {
      if (bounces.dropped && (event === GameEvent.BOX_PUT_DOWN)) {
        continue
      }

      const sound = (shot && (event === GameEvent.REFUSED)) ? Sound.SHOOT : Level.SOUNDS[event]

      sound?.play()
    }

    if (bounces.started) {
      Sound.MIRROR_BOX_RAY.play()
    }
  }

  /**
   * Whether what happened can break a portal up: a fizzle, or a portal a
   * fizzler closed by switching on.
   * @param events - What happened
   * @returns True when it can
   */
  private static breaksUp(events: readonly GameEvent[]): boolean {
    return events.includes(GameEvent.FIZZLED) || events.includes(GameEvent.PORTAL_FIZZLED)
  }

  /**
   * Counts the portals opened on a wall.
   * @param events - What happened
   */
  private countPortals(events: readonly GameEvent[]): void {
    for (const event of events) {
      if ((event === GameEvent.BLUE_PORTAL_OPENED) || (event === GameEvent.ORANGE_PORTAL_OPENED)) {
        this.portalCount++
      }
    }
  }

  /**
   * Runs one frame: takes the oldest waiting press, if any, ends the step
   * being drawn and runs the rules' step for it; once the chamber is
   * completed, forgets every waiting press instead. Then forgets which keys
   * went down during the frame, for the clock.
   * @param delta - Seconds since the previous frame
   * @param input - The keyboard
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns Whether the state changed
   */
  private update(delta: number, input: Input, time: number): boolean {
    let updated = false

    // The clock counts from the frame after the first key, so the wait before it is not included,
    // and stops at the press that completes the chamber, though a slide onto the exit is drawn before the completion is told
    if (this.clockStarted) {
      if ((this.state === null) || !this.state.completed) {
        this.elapsedSeconds += delta
      }
    } else if (Level.CLOCK_START_KEYS.some((key) => input.isPressed(key))) {
      this.clockStarted = true
    }

    if ((this.chamber !== null) && (this.state !== null)) {
      if (this.state.completed) {
        // Nothing more runs, so no press is taken, and none is left waiting:
        // a held key's repeats can't cut short a walk-out or a slide onto the exit
        input.forgetPresses()
      } else {
        const press = input.takePress()

        // A press never waits for the step being drawn: it ends it at once,
        // even when the press itself changes nothing, after playing all that a
        // slide still has waiting
        if (press !== null) {
          this.playSlideBeats(time, true)
          this.animation.finish()
          updated = this.updateRules(this.chamber, this.state, press, time)
        }
      }
    }

    input.clear()

    return updated
  }

  /**
   * Runs one step of the rules for a press. Nothing runs once the chamber is
   * completed.
   * @param chamber - The chamber being played
   * @param state - The state before the step
   * @param press - The press, one key and whether the turn key was held
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns Whether the state changed
   */
  private updateRules(chamber: CompiledChamber, state: RulesState, press: FrameInput, time: number): boolean {
    const action = actionOfPress(press)

    if ((action === null) || state.completed) {
      return false
    }

    return this.applyStep(state, action, this.runStep(chamber, state, action), time)
  }

  /**
   * Takes a step of the rules: records it in the log,
   * counts the move and the portals opened, starts drawing the step when it changed the state, with
   * each arrow, blocked wall, ditch, door, exit, fizzler, laser and light barrier it switched changing, what it took
   * breaking up when it fizzled, each box it sent home flying there or falling, a portal it opened opening, and a ripple
   * where a portal shot it refused stopped, a light barrier's band it walked the subject into reacting, and plays the sounds of what
   * happened, a missed portal shot's own.
   * A step that slid and is drawn over time leaves all but the log and the
   * counts waiting until the subject gets to each tile, and the end of the
   * slide. A step drawn over time that walks the subject out of the chamber
   * leaves the completion waiting until the subject is out of sight.
   * @param state - The state before the step
   * @param action - The action stepped
   * @param result - What the rules' step gave for it
   * @param time - The frame's time, in milliseconds on the frame clock
   * @returns Whether the state changed
   */
  private applyStep(state: RulesState, action: Action, result: StepResult, time: number): boolean {
    const next = result.state
    // A shot tried while carrying a box never leaves, so its refusal is the
    // error sound, with no ripple
    const shot = ((action === Action.BLUE) || (action === Action.ORANGE)) && !state.isCarrying
    const drawn = (next !== state) && !this.reducedMotion.matches
    const walkOut = drawn ? Level.walkOutWay(result) : null
    const bounces = findMirrorBounces(state, next, result.events)

    this.logStep(action, next)

    // Only moves change the subject's tile, so a new tile is one step
    if ((next.subjectX !== state.subjectX) || (next.subjectY !== state.subjectY)) {
      this.stepCount++
    }

    this.countPortals(result.events)
    this.state = next

    if (drawn) {
      this.animation.start(state, next, result.events, result.path, walkOut, time)
    }

    // A light barrier's band the subject walked into reacts; the rules report nothing for it
    const movement = MOVEMENTS[action]

    if ((movement !== null) && !this.reducedMotion.matches) {
      this.reactions.startWalkIn(state, next, movement, time)
    }

    if (drawn && (result.path.length > 0)) {
      this.queueSlideBeats(state, result, bounces)
    } else {
      this.playStep(state, next, result.events, shot ? action : null, time, false, walkOut === null, bounces)

      if (walkOut !== null) {
        this.completionTime = this.animation.endTime ?? time
      }
    }

    return next !== state
  }

  /**
   * The way the subject walks on out of the chamber after a step: the way it
   * moved onto the exit, when that leads out through the chamber's edge.
   * Moving onto the exit along the edge, from beside it, it stays there.
   * @param result - What the rules' step gave
   * @returns The way, or null when the step didn't complete the chamber or the subject moved onto the exit along the chamber's edge
   */
  private static walkOutWay(result: StepResult): Direction | null {
    const next = result.state

    if (!next.completed) {
      return null
    }

    // Along a slide, its last leg's way; a step that didn't slide faces the subject the way it moved onto the exit, onto
    // the next tile or out of a portal, and nothing on the exit's tile turns it as the step settles
    const arrival = result.path.at(-1)?.direction ?? next.facing

    return (arrival === exitOuterSide(next.chamber)) ? arrival : null
  }

  /**
   * Leaves what a slide being drawn did waiting: what happened on each tile
   * it entered until the subject is half way into that tile, or through the
   * portal onto it, and its stop and settling until the slide ends, or, when
   * it walks the subject out of the chamber, until it is out of sight. Only
   * reaching the exit is heard with the last tile, as the subject gets onto
   * the exit, rather than once it has walked out of sight.
   * @param state - The state before the step
   * @param result - What the rules' step gave for it, a slide
   * @param bounces - Whether it set a ray bouncing off a mirror box, heard as it stops
   */
  private queueSlideBeats(state: RulesState, result: StepResult, bounces: MirrorBounces): void {
    const path = result.path
    let before = state
    let legEvents = 0
    let brokeUp = false

    for (const [
      index,
      leg,
    ] of path.entries()) {
      this.slideBeats.push({
        time: this.animation.momentAt(legReach(path, index)) ?? this.frameTime,
        before: before,
        after: leg.state,
        events: leg.events,
        joinsBreakUp: brokeUp,
        bounces: NO_MIRROR_BOUNCES,
      })
      before = leg.state
      legEvents += leg.events.length
      brokeUp = brokeUp || Level.breaksUp(leg.events)
    }

    const settled = result.events.slice(legEvents)
    const lastLeg = this.slideBeats.at(-1)

    if ((lastLeg !== undefined) && (path.length > 0) && settled.includes(GameEvent.EXIT_REACHED)) {
      this.slideBeats[this.slideBeats.length - 1] = {
        ...lastLeg,
        events: [
          ...lastLeg.events,
          GameEvent.EXIT_REACHED,
        ],
      }
    }

    this.slideBeats.push({
      time: this.animation.endTime ?? this.frameTime,
      before: before,
      after: result.state,
      events: settled.filter((event) => event !== GameEvent.EXIT_REACHED),
      joinsBreakUp: brokeUp,
      bounces: bounces,
    })
  }

  /**
   * Plays what a slide being drawn has waiting, in order, up to a time, or
   * all of it.
   * @param time - Now, in milliseconds on the frame clock
   * @param all - Whether to play all of it, even what is due later
   */
  private playSlideBeats(time: number, all = false): void {
    for (let beat = this.slideBeats.at(0); (beat !== undefined) && (all || (beat.time <= time)); beat = this.slideBeats.at(0)) {
      this.slideBeats.shift()
      this.playStep(beat.before, beat.after, beat.events, null, Math.min(beat.time, time), beat.joinsBreakUp, true, beat.bounces)
    }
  }

  /**
   * Shows what happened from one state to the next, all of a step or a part
   * of a slide: each arrow, blocked wall, ditch, door, exit, fizzler, laser and
   * light barrier switched starts changing, the portals a fizzle took break
   * up and the field the subject is caught in flashes, each box sent home comes apart and flies there, or falls into a
   * ditch and gathers there, a portal opened opens and starts giving off
   * particles, those of a portal closed or moved fade, and a refused portal
   * shot ripples, and a fizzler's field or a light barrier's band that stopped it splashes or reacts, all only when motion is allowed; then the sounds play, and
   * the completion is told when the chamber is completed, unless it waits
   * for a walk-out.
   * @param before - The state before
   * @param after - The state after
   * @param events - What happened, in order
   * @param shot - The colour of the portal shot that made it happen, or null for anything else
   * @param time - When it happened, in milliseconds on the frame clock
   * @param joinsBreakUp - Whether what it breaks up joins what an earlier part of the same step broke up, rather than replacing it
   * @param tellsCompletion - Whether the completion is told now, rather than left waiting until a walk-out ends
   * @param bounces - Whether it set a ray bouncing off a mirror box
   */
  private playStep(before: RulesState, after: RulesState, events: readonly GameEvent[], shot: PortalColor | null, time: number, joinsBreakUp = false, tellsCompletion = true, bounces = NO_MIRROR_BOUNCES): void {
    if (!this.reducedMotion.matches) {
      if (after !== before) {
        this.changes.start(before, after, time)
      }

      // A fizzler breaks up the portals it takes: both when the subject is caught in it, one facing it when it turns on
      if (Level.breaksUp(events)) {
        this.fizzle.start(before, after, events, time, joinsBreakUp)
      }

      // The field the subject is caught in flashes from its tile
      if (events.includes(GameEvent.FIZZLED)) {
        this.flashes.start(after, time)
      }

      // A box lying on a ditch that opened falls into it
      if (events.includes(GameEvent.BOX_DESTROYED)) {
        this.fall.start(before, after, events, time)
      }

      // Each box sent home comes apart where it was and flies there, or, one that fell, gathers there; one picked up
      // again is done with going home
      this.returns.forgetMoved(after)

      if (sendsBoxesHome(events)) {
        this.returns.start(before, after, events, time)
      }

      // A portal a shot opened grows open on its wall
      if (events.includes(GameEvent.BLUE_PORTAL_OPENED) || events.includes(GameEvent.ORANGE_PORTAL_OPENED)) {
        this.openings.start(after, events, time)
      }

      // A portal opened, moved or closed: the particles of the one that was there fade, and the new one's start rising
      this.particles.start(before, after, time)

      // Only a shot's refusal ripples: a refused crossing or interact shows nothing; and a fizzler's field that stopped it
      // splashes, a light barrier that stopped it reacts
      if ((shot !== null) && events.includes(GameEvent.REFUSED)) {
        this.ripple.start(after, shot, time)
        this.splashes.startShot(after, time)
        this.reactions.startShot(after, time)
      }
    }

    this.playSounds(events, shot !== null, bounces)

    if (after.completed && tellsCompletion) {
      this.onCompleted?.()
    }
  }

  /**
   * Tells the completion a walk-out left waiting, once the subject is out of
   * sight.
   * @param time - Now, in milliseconds on the frame clock
   */
  private tellWaitingCompletion(time: number): void {
    if ((this.completionTime !== null) && (this.completionTime <= time)) {
      this.completionTime = null
      this.onCompleted?.()
    }
  }

  /**
   * Logs a press acted on and the state it led to.
   * @param action - The action
   * @param state - The state after it
   */
  private logStep(action: Action, state: RulesState): void {
    this.replaySteps.push(action)
    this.stepHashes.push(state.hash)
  }

  /**
   * Starts the frame loop, running the first frame straight away.
   */
  private run(): void {
    this.startTime = Date.now()
    this.onFrame(performance.now())
  }

  /**
   * Starts the next frame's time from now when the tab comes back, so the
   * time it spent hidden is not counted as one long frame.
   */
  private readonly onVisibilityChange = (): void => {
    if (!document.hidden) {
      this.startTime = Date.now()
    }
  }

  /**
   * Runs one frame, then requests the next. A frame that throws ends the loop.
   * @param time - The frame's time, in milliseconds on the frame clock (the page's, as `performance.now()` reads it)
   */
  private readonly onFrame = (time: number): void => {
    // The first frame has none before it: the frame time is still 0
    const frameGap = time - this.frameTime

    if (this.frameTime > 0 && frameGap > 0 && frameGap <= Level.FRAME_RATE_GAP_LIMIT) {
      this.rateFrames += 1
      this.rateMilliseconds += frameGap
    }

    this.frameTime = time
    this.frameStats?.recordFrame(time)

    const currentTime = Date.now()
    const delta = (currentTime - this.startTime) / 1000
    this.startTime = currentTime

    // A step still being drawn needs this frame, paused or not: part way
    // through, or its end once it is over or a press ended it
    const wasAnimating = this.animation.running
    let stateUpdated = false

    // What a slide being drawn has waiting plays as the subject gets there, paused or not, and the completion a walk-out
    // left waiting is told as the subject goes out of sight
    this.playSlideBeats(time)
    this.tellWaitingCompletion(time)

    if (!this.isPaused) {
      stateUpdated = this.update(delta, this.input, time)
    }

    // So does a field or a band that is on, and anything that glows, gives off particles, breaks up, flashes, splashes, reacts, falls, changes,
    // opens, ripples or turns, paused or not, and the first frame after it stops, which draws it still
    const ambient = (this.state !== null) && !this.reducedMotion.matches && (hasAmbientLife(this.state) || this.fizzle.isRunningAt(time) || this.flashes.isRunningAt(time) || this.splashes.isRunningAt(time) || this.reactions.isRunningAt(time) || this.fall.isRunningAt(time) || this.returns.isRunningAt(time) || this.changes.isRunningAt(time) || this.openings.isRunningAt(time) || this.particles.isRunningAt(time) || this.ripple.isRunningAt(time) || this.turn.isRunningAt(time))

    if (stateUpdated || wasAnimating || ambient || this.ambientDrawn) {
      this.render(time)
    }

    this.ambientDrawn = ambient

    // A callback during the frame may have disposed of the level
    if (!this.disposed) {
      this.frameId = requestAnimationFrame(this.onFrame)
    }
  }
}
