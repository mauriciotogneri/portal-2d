/**
 * The playground, the development-only chamber outside the list for trying every element.
 */
import playgroundData from '@/dev/playground.json'
import type {ChamberData} from '@/game/chamber_data'

// Development only: the playground, a chamber outside the list for trying every element, each
// direction from the start switched by its own button, a turnable arrow turned by its own
// button in the middle room, a slide room off the left arm, and a ray room off the middle
// room's top right, where a button switches an emitter on and its ray, turned by a mirror box
// or routed through portals, lights a receiver that opens a door.
// Production builds have none, and the comparison lets them leave the file out
export const PLAYGROUND: ChamberData | undefined = import.meta.env.DEV === true ? playgroundData : undefined
