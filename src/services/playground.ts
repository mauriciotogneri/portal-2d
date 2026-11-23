/**
 * The playground chambers, chambers outside the campaign for trying elements
 * and ideas: listed in the home menu's Playground section in development, and
 * reached by their address alone in production builds, to share test chambers.
 */
import type {ChamberData} from '@/game/chamber_data'
import {PLAYGROUND_LAYOUTS} from '@/services/playground_catalogue'

export type PlaygroundEntry = {
  number: number // Place in the list, counted from 1, shown to the player, used in the address and naming its file; derived, never typed by hand
  name: string // What the player sees it called: "Playground N"
  data: ChamberData // Layout loaded into the game
}

export const PLAYGROUND_CHAMBERS: PlaygroundEntry[] = PLAYGROUND_LAYOUTS.map((layout, index) => ({
  number: index + 1,
  name: `Playground ${index + 1}`,
  data: layout,
}))

/**
 * Looks up a playground chamber by its number.
 * @param playgroundNumber - Its number, counted from 1
 * @returns The playground chamber, or undefined when none has that number
 */
export function findPlaygroundChamber(playgroundNumber: number): PlaygroundEntry | undefined {
  return PLAYGROUND_CHAMBERS.find((entry) => entry.number === playgroundNumber)
}
