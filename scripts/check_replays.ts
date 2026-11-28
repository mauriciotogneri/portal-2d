import {existsSync, readFileSync} from 'node:fs'
import type {ChamberData} from '@/game/chamber_data'
import {AIM_ANGLES} from '@/game/direction'
import {getChamberHash, type ReplayExpectation} from '@/game/replay_data'
import {ACTIONS} from '@/game/rules/action'
import {type AimedShot, describeAction, type RulesAction} from '@/game/rules/aimed_shot'
import {CompiledChamber} from '@/game/rules/compiled_chamber'
import {loadChamber, readChamber} from '@/game/rules/load_chamber'
import {PORTAL_COLORS} from '@/game/rules/portal_color'
import {runRulesReplay, type RulesReplayResult} from '@/game/rules/replay_runner'
import type {RulesState} from '@/game/rules/rules_state'
import {step} from '@/game/rules/step'
import {CHAMBER_FILES, CHAMBERS_DIRECTORY, listChamberFiles} from '@scripts/chamber_files'
import {type Fixture, FIXTURES} from '@scripts/fixtures/fixtures'
import {parseSolutionData} from '@scripts/solution_file'
import {SOLVER_FIXTURES, type SolverFixture, type SolverRoute} from '@scripts/solver_fixtures/solver_fixtures'

// Replays every chamber's recorded solution (src/chambers/chamber_N.solution.json)
// with the rules under Node, compares it with what it must give, and checks
// that no action, aimed shots included, changes the completed chamber; then
// every behaviour fixture (scripts/fixtures/fixtures.ts), compared with how
// it must end; on every state a solution or a fixture passes through, a shot
// aimed from the middle of the subject's tile along the way it faces must
// play exactly like the shot that way; then both
// hand-written routes of every solver fixture (scripts/solver_fixtures/),
// each on its chamber loaded with the layout checks, compared with how it
// must end. Prints one line per chamber and per fixture, and exits non-zero
// on any failure

/** The angles an aimed shot is tried at on a completed chamber: the eight ways round, and two between them */
const COMPLETED_SHOT_ANGLES: readonly number[] = [
  0,
  Math.PI / 4,
  Math.PI / 2,
  3 * Math.PI / 4,
  Math.PI,
  -3 * Math.PI / 4,
  -Math.PI / 2,
  -Math.PI / 4,
  0.3,
  2,
]

/**
 * A shot of one colour aimed from the middle of the subject's tile.
 * @param state - The state
 * @param color - The portal shot
 * @param angle - The way it goes, in radians counter-clockwise from right
 * @returns The aimed shot
 */
function aimedFromMiddle(state: RulesState, color: AimedShot['shot'], angle: number): AimedShot {
  return {
    shot: color,
    x: state.subjectX + 0.5,
    y: state.subjectY + 0.5,
    angle: angle,
  }
}

/**
 * Compares a replay's result with what it must give.
 * @param result - What the replay gave
 * @param expected - What it must give
 * @returns Every difference, in words, or null when there is none
 */
function describeDifferences(result: ReplayExpectation, expected: ReplayExpectation): string | null {
  const differences: string[] = []

  if (result.completed !== expected.completed) {
    differences.push(result.completed ? 'completes but should not' : 'does not complete but should')
  }

  if (result.moves !== expected.moves) {
    differences.push(`${result.moves} moves instead of ${expected.moves}`)
  }

  if (result.portals !== expected.portals) {
    differences.push(`${result.portals} portals instead of ${expected.portals}`)
  }

  if (result.finalHash !== expected.finalHash) {
    differences.push(`final hash ${result.finalHash} instead of ${expected.finalHash}`)
  }

  return (differences.length > 0) ? differences.join(', ') : null
}

/**
 * What a replay gave, in the terms of an expectation.
 * @param result - What the replay gave
 * @returns Its completion, counters and final hash
 */
function toExpectation(result: RulesReplayResult): ReplayExpectation {
  return {
    completed: result.completed,
    moves: result.moves,
    portals: result.portals,
    finalHash: result.finalState.hash,
  }
}

/**
 * Checks that no action, nor a shot aimed from the subject's tile at any of
 * a few angles, changes a completed chamber or reports anything.
 * @param chamber - The chamber
 * @param state - A completed state of it
 * @throws Error naming the first action that did
 */
function checkCompletedIsFinal(chamber: CompiledChamber, state: RulesState): void {
  const actions: RulesAction[] = [...ACTIONS]

  for (const color of PORTAL_COLORS) {
    for (const angle of COMPLETED_SHOT_ANGLES) {
      actions.push(aimedFromMiddle(state, color, angle))
    }
  }

  for (const action of actions) {
    const result = step(chamber, state, action)

    if ((result.state !== state) || (result.events.length > 0)) {
      throw new Error(`${describeAction(action)} after completion changed the state or reported [${result.events.join(', ')}]`)
    }
  }
}

/**
 * Checks that on every state of a replay, a shot of each colour aimed from
 * the middle of the subject's tile along the way it faces gives the same
 * state and events as the shot that way.
 * @param chamber - The chamber
 * @param states - The replay's states, its settled start first
 * @throws Error naming the first state and colour where they differ
 */
function checkAimedShotsMatch(chamber: CompiledChamber, states: readonly RulesState[]): void {
  states.forEach((state, index) => {
    for (const color of PORTAL_COLORS) {
      const straight = step(chamber, state, color)
      const aimed = step(chamber, state, aimedFromMiddle(state, color, AIM_ANGLES[state.facing]))

      if ((aimed.state.hash !== straight.state.hash) || (aimed.events.join() !== straight.events.join())) {
        throw new Error(`after press ${index}, the ${color} shot aimed along the subject's facing gave [${aimed.events.join(', ')}], hash ${aimed.state.hash}, not [${straight.events.join(', ')}], hash ${straight.state.hash}`)
      }
    }
  })
}

/**
 * Replays a chamber's recorded solution and checks it.
 * @param file - The chamber's file name
 * @param data - The chamber JSON
 * @returns A short summary of the solution
 * @throws Error saying why the solution fails
 */
function checkSolution(file: string, data: ChamberData): string {
  const solutionFile = file.replace(/\.json$/, '.solution.json')
  const solutionUrl = new URL(solutionFile, CHAMBERS_DIRECTORY)

  if (!existsSync(solutionUrl)) {
    throw new Error(`no solution recorded; save one as src/chambers/${solutionFile} with Download solution in the completion dialog (development only)`)
  }

  const parsed: unknown = JSON.parse(readFileSync(solutionUrl, 'utf8'))
  const solution = parseSolutionData(parsed)

  const loaded = loadChamber(data)

  if (loaded.chamber === null) {
    throw new Error(`the rules can't load the chamber: ${loaded.problems.map((problem) => problem.message).join('; ')}`)
  }

  if (solution.chamberHash !== getChamberHash(loaded.chamber)) {
    throw new Error(`the chamber changed since ${solutionFile} was recorded; record it again`)
  }

  const chamber = new CompiledChamber(loaded.chamber)
  const result = runRulesReplay(chamber, solution.actions)

  if (!result.completed) {
    throw new Error(`${solutionFile} does not complete the chamber`)
  }

  const differences = describeDifferences(toExpectation(result), solution.expected)

  if (differences !== null) {
    throw new Error(`${solutionFile}: ${differences}`)
  }

  checkCompletedIsFinal(chamber, result.finalState)
  checkAimedShotsMatch(chamber, result.states)

  return `${result.moves} moves, ${result.portals} portals`
}

/**
 * Replays a behaviour fixture and checks it ends as pinned.
 * @param fixture - The fixture
 * @throws Error saying how it ended differently
 */
function checkFixture(fixture: Fixture): void {
  const read = readChamber(fixture.chamber)

  if (read.chamber === null) {
    throw new Error(`the rules can't read the chamber: ${read.problems.map((problem) => problem.message).join('; ')}`)
  }

  const chamber = new CompiledChamber(read.chamber)
  const result = runRulesReplay(chamber, fixture.actions)
  const differences = describeDifferences(toExpectation(result), fixture.expected)

  if (differences !== null) {
    throw new Error(differences)
  }

  checkAimedShotsMatch(chamber, result.states)
}

/**
 * Replays a solver fixture's route and checks it completes as pinned.
 * @param chamber - The fixture's chamber, compiled
 * @param label - Which route it is, for the report
 * @param route - The route
 * @returns The label, with the route's moves and portals
 * @throws Error naming the route and how it ended differently
 */
function checkSolverRoute(chamber: CompiledChamber, label: string, route: SolverRoute): string {
  const result = runRulesReplay(chamber, route.actions)
  const differences = result.completed ? describeDifferences(toExpectation(result), route.expected) : 'does not complete the chamber'

  if (differences !== null) {
    throw new Error(`${label} route: ${differences}`)
  }

  checkCompletedIsFinal(chamber, result.finalState)

  return `${label} ${result.moves} moves, ${result.portals} portals`
}

/**
 * Loads a solver fixture's chamber, with the layout checks, and replays both
 * of its routes.
 * @param fixture - The fixture
 * @returns A short summary of both routes
 * @throws Error naming the route that fails, and why
 */
function checkSolverFixture(fixture: SolverFixture): string {
  const loaded = loadChamber(fixture.chamber)

  if (loaded.chamber === null) {
    throw new Error(`the rules can't load the chamber: ${loaded.problems.map((problem) => problem.message).join('; ')}`)
  }

  const chamber = new CompiledChamber(loaded.chamber)
  const fewestMoves = checkSolverRoute(chamber, 'fewest moves', fixture.fewestMoves)
  const fewestPortals = checkSolverRoute(chamber, 'fewest portals', fixture.fewestPortals)

  return `${fewestMoves}; ${fewestPortals}`
}

/**
 * Checks every chamber's solution, every fixture and every solver fixture's
 * routes, and reports each one.
 * @returns Whether all of them passed
 */
function runAll(): boolean {
  let passed = true

  for (const file of listChamberFiles()) {
    const data = CHAMBER_FILES[file]

    if (data === undefined) {
      console.error(`${file} FAILED: not in the play order (src/services/chamber_catalogue.ts)`)
      passed = false
      continue
    }

    try {
      console.log(`${file} OK: ${checkSolution(file, data)}`)
    } catch (error) {
      console.error(`${file} FAILED: ${error instanceof Error ? error.message : String(error)}`)
      passed = false
    }
  }

  for (const fixture of FIXTURES) {
    try {
      checkFixture(fixture)
      console.log(`fixture ${fixture.name} OK`)
    } catch (error) {
      console.error(`fixture ${fixture.name} FAILED: ${error instanceof Error ? error.message : String(error)}`)
      passed = false
    }
  }

  for (const fixture of SOLVER_FIXTURES) {
    try {
      console.log(`solver fixture ${fixture.name} OK: ${checkSolverFixture(fixture)}`)
    } catch (error) {
      console.error(`solver fixture ${fixture.name} FAILED: ${error instanceof Error ? error.message : String(error)}`)
      passed = false
    }
  }

  return passed
}

if (!runAll()) {
  process.exitCode = 1
}
