import {parseArgs} from 'node:util'
import type {ChamberData} from '@/game/chamber_data'
import {Action, ACTIONS} from '@/game/rules/action'
import {describeAction, type RulesAction} from '@/game/rules/aimed_shot'
import {CompiledChamber} from '@/game/rules/compiled_chamber'
import {type ChamberLoadResult, loadChamber, readChamber} from '@/game/rules/load_chamber'
import {PortalColor} from '@/game/rules/portal_color'
import type {RulesState} from '@/game/rules/rules_state'
import {startChamber, step} from '@/game/rules/step'
import {CHAMBER_FILES, listChamberFiles, listPlaygroundFiles, PLAYGROUND_FILES} from '@scripts/chamber_files'
import {listFixtureChambers} from '@scripts/fixtures/fixtures'
import {readNumberOption} from '@scripts/number_option'
import {createRandom} from '@scripts/seeded_random'

// Plays seeded random actions on every chamber and playground chamber with the
// rules under Node, then on every fixture chamber (scripts/fixtures/), which
// are made to reach the rules' edge cases, read without the layout checks so
// the one open at the edge still plays. Then each chamber is walked again,
// for a fifth of the steps, with aimed shots at random angles from random
// points of the subject's tile mixed in. Every step must settle within the
// rules' pass cap and nothing may throw. Reports steps per second, the speed
// baseline for the solver (stage 02), and the size of a chamber's state.
// Prints one line per chamber, and exits non-zero on any failure.
// Options: --seed=<number> (default 1), --steps=<number> per chamber (default 100000)

/** Steps per chamber unless --steps says otherwise */
const DEFAULT_STEPS = 100_000

/** Seed unless --seed says otherwise */
const DEFAULT_SEED = 1

/** The walk with aimed shots takes the steps divided by this */
const AIMED_STEP_DIVISOR = 5

/** In the walk with aimed shots, one step in this many, on average, is an aimed shot; the others are fixed actions */
const AIMED_SHOT_EVERY = 3

/**
 * How a walk went.
 */
type WalkResult = {
  readonly milliseconds: number // Time spent walking
  readonly stateBytes: number // Size of the chamber's state
  readonly completions: number // Times the walk completed the chamber and started over
}

/**
 * Compiles a chamber that was loaded or read.
 * @param loaded - What loading or reading its file gave
 * @returns The compiled chamber
 * @throws Error when the file had an error
 */
function compileChamber(loaded: ChamberLoadResult): CompiledChamber {
  if (loaded.chamber === null) {
    throw new Error(`the rules can't load it: ${loaded.problems.map((problem) => problem.message).join('; ')}`)
  }

  return new CompiledChamber(loaded.chamber)
}

/**
 * Picks one of the fixed actions.
 * @param random - The seeded random numbers
 * @returns The action
 */
function pickAction(random: () => number): Action {
  // The index is always inside the list; the fallback only satisfies the type checker
  return ACTIONS[Math.floor(random() * ACTIONS.length)] ?? Action.UP
}

/**
 * Picks an aimed shot, of either colour, at any angle from any point of the
 * subject's tile, or else one of the fixed actions.
 * @param random - The seeded random numbers
 * @param state - The state the action is taken on
 * @returns The action
 */
function pickAimedShotOrAction(random: () => number, state: RulesState): RulesAction {
  if ((random() * AIMED_SHOT_EVERY) >= 1) {
    return pickAction(random)
  }

  return {
    shot: (random() < 0.5) ? PortalColor.BLUE : PortalColor.ORANGE,
    x: state.subjectX + random(),
    y: state.subjectY + random(),
    angle: ((random() * 2) - 1) * Math.PI,
  }
}

/**
 * Walks a chamber with random actions, starting over whenever it is
 * completed.
 * @param chamber - The compiled chamber
 * @param steps - How many steps to take
 * @param seed - The seed for the actions
 * @param pick - Picks each action from the random numbers and the state
 * @returns How long the walk took, the state's size and the completions
 * @throws Error naming the step that failed
 */
function walkChamber(chamber: CompiledChamber, steps: number, seed: number, pick: (random: () => number, state: RulesState) => RulesAction): WalkResult {
  const random = createRandom(seed)
  const startTime = performance.now()
  const start = startChamber(chamber).state
  let state = start
  let completions = 0

  for (let stepNumber = 1; stepNumber <= steps; stepNumber++) {
    const action = pick(random, state)

    try {
      state = step(chamber, state, action).state

      if (state.completed) {
        state = start
        completions++
      }
    } catch (error) {
      throw new Error(`step ${stepNumber} (${describeAction(action)}): ${error instanceof Error ? error.message : String(error)}`, {
        cause: error,
      })
    }
  }

  return {
    milliseconds: performance.now() - startTime,
    stateBytes: start.byteSize,
    completions: completions,
  }
}

/**
 * Describes how a walk went.
 * @param result - The walk
 * @param steps - How many steps it took
 * @returns Its time, speed, state size and completions
 */
function describeWalk(result: WalkResult, steps: number): string {
  const perSecond = Math.round(steps / (result.milliseconds / 1000))

  return `${steps} steps in ${(result.milliseconds / 1000).toFixed(2)} s, ${perSecond} steps per second, state ${result.stateBytes} bytes, ${result.completions} completions`
}

/**
 * Walks a chamber with the fixed actions, then again, for fewer steps, with
 * aimed shots mixed in.
 * @param chamber - The compiled chamber
 * @param steps - How many random actions the first walk takes
 * @param seed - Seed of the random actions
 * @returns How both walks went
 * @throws Error naming the walk and the step that failed
 */
function walkBoth(chamber: CompiledChamber, steps: number, seed: number): string {
  const result = walkChamber(chamber, steps, seed, pickAction)
  const aimedSteps = Math.ceil(steps / AIMED_STEP_DIVISOR)
  let aimed: WalkResult

  try {
    aimed = walkChamber(chamber, aimedSteps, seed, pickAimedShotOrAction)
  } catch (error) {
    throw new Error(`with aimed shots, ${error instanceof Error ? error.message : String(error)}`, {
      cause: error,
    })
  }

  return `${describeWalk(result, steps)}; with aimed shots ${aimedSteps} steps in ${(aimed.milliseconds / 1000).toFixed(2)} s, ${aimed.completions} completions`
}

/**
 * Walks one chamber file, with the layout checks, and reports it.
 * @param file - Its file name
 * @param data - The chamber JSON
 * @param steps - How many random actions to take
 * @param seed - Seed of the random actions
 * @returns Whether the walk finished
 */
function walkChamberFile(file: string, data: ChamberData, steps: number, seed: number): boolean {
  try {
    console.log(`${file} OK: ${walkBoth(compileChamber(loadChamber(data)), steps, seed)}`)

    return true
  } catch (error) {
    console.error(`${file} FAILED: ${error instanceof Error ? error.message : String(error)}`)

    return false
  }
}

/**
 * Walks every chamber file in src/chambers, every playground chamber and every fixture
 * chamber, and reports each one.
 * @returns Whether every walk finished
 */
function runAll(): boolean {
  const options = parseArgs({
    options: {
      seed: {
        type: 'string',
      },
      steps: {
        type: 'string',
      },
    },
  }).values
  const seed = readNumberOption(options.seed, DEFAULT_SEED, 'seed')
  const steps = readNumberOption(options.steps, DEFAULT_STEPS, 'steps')
  let passed = true

  console.log(`Seed ${seed}, ${steps} steps per chamber`)

  for (const file of listChamberFiles()) {
    const data = CHAMBER_FILES[file]

    if (data === undefined) {
      console.error(`${file} FAILED: not in the play order (src/services/chamber_catalogue.ts)`)
      passed = false
      continue
    }

    passed = walkChamberFile(file, data, steps, seed) && passed
  }

  for (const file of listPlaygroundFiles()) {
    const data = PLAYGROUND_FILES[file]

    if (data === undefined) {
      console.error(`${file} FAILED: not in the playground list (src/services/playground_catalogue.ts)`)
      passed = false
      continue
    }

    passed = walkChamberFile(file, data, steps, seed) && passed
  }

  for (const fixtureChamber of listFixtureChambers()) {
    const label = `fixture chamber of ${fixtureChamber.name}`

    try {
      console.log(`${label} OK: ${walkBoth(compileChamber(readChamber(fixtureChamber.chamber)), steps, seed)}`)
    } catch (error) {
      console.error(`${label} FAILED: ${error instanceof Error ? error.message : String(error)}`)
      passed = false
    }
  }

  return passed
}

if (!runAll()) {
  process.exitCode = 1
}
