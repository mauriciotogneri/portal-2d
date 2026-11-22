/**
 * The playground chambers' layouts, in order: development-only chambers for
 * trying elements and ideas, never checked for a solution. Each one's file is
 * src/dev/playground/playground_N.json, N its place in the list counted from 1.
 * The engine scripts read it under Node too (scripts/chamber_files.ts), so it
 * uses nothing of Vite's; the game reads it only through
 * src/services/playground.ts, which production builds leave empty.
 */
import playgroundOneData from '@/dev/playground/playground_1.json'
import playgroundTwoData from '@/dev/playground/playground_2.json'
import playgroundThreeData from '@/dev/playground/playground_3.json'
import playgroundFourData from '@/dev/playground/playground_4.json'
import playgroundFiveData from '@/dev/playground/playground_5.json'
import playgroundSixData from '@/dev/playground/playground_6.json'
import playgroundSevenData from '@/dev/playground/playground_7.json'
import playgroundEightData from '@/dev/playground/playground_8.json'
import playgroundNineData from '@/dev/playground/playground_9.json'
import playgroundTenData from '@/dev/playground/playground_10.json'
import type {ChamberData} from '@/game/chamber_data'

// In order, each at the place its file's number names. Playground 1 holds every element, each
// direction from the start switched by its own button, a turnable arrow turned by its own button
// in the middle room, a slide room off the left arm, and a ray room off the middle room's top
// right, where a button switches an emitter on and its ray, turned by a mirror box or routed
// through portals, lights a receiver that opens a door
export const PLAYGROUND_LAYOUTS: ChamberData[] = [
  playgroundOneData,
  playgroundTwoData,
  playgroundThreeData,
  playgroundFourData,
  playgroundFiveData,
  playgroundSixData,
  playgroundSevenData,
  playgroundEightData,
  playgroundNineData,
  playgroundTenData,
]
