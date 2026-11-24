/**
 * The campaign's chambers, in play order. The engine scripts read it under Node
 * too (scripts/chamber_files.ts), so it uses nothing of Vite's, such as import.meta.env.
 */
import chamberOneData from '@/chambers/chamber_1.json'
import chamberTwoData from '@/chambers/chamber_2.json'
import chamberThreeData from '@/chambers/chamber_3.json'
import chamberFourData from '@/chambers/chamber_4.json'
import chamberFiveData from '@/chambers/chamber_5.json'
import chamberSixData from '@/chambers/chamber_6.json'
import chamberSevenData from '@/chambers/chamber_7.json'
import chamberEightData from '@/chambers/chamber_8.json'
import chamberNineData from '@/chambers/chamber_9.json'
import chamberTenData from '@/chambers/chamber_10.json'
import chamberElevenData from '@/chambers/chamber_11.json'
import chamberTwelveData from '@/chambers/chamber_12.json'
import chamberThirteenData from '@/chambers/chamber_13.json'
import chamberFourteenData from '@/chambers/chamber_14.json'
import type {ChamberData} from '@/game/chamber_data'

/** Which list a chamber is in: the campaign, under Play, or the playground chambers, under Playground in development. */
export type ChamberList = 'campaign' | 'playground'

export type ChamberEntry = {
  id: number // Permanent, 1 or more, given in the order chambers were created (1 is the tutorial's); it names the chamber's files, keys its stored progress and is sent as the analytics chamber_id, so changing one splits that chamber's analytics history
  number: number // Position in the list below, counted from 1, shown to the player and used in the address; derived, never typed by hand
  name: string // What the player sees it called, in sentence case: its listing's name, or "Chamber N"
  data: ChamberData // Layout loaded into the game
}

/** A chamber as listed: its number comes from where it sits in the list. */
type ChamberListing = {
  id: number // Permanent id, see ChamberEntry
  name?: string // Shown instead of "Chamber N", in sentence case
  data: ChamberData // Layout loaded into the game
}

// Play order: moving an entry renumbers the chambers, its id stays
const CHAMBER_LISTINGS: ChamberListing[] = [
  {
    id: 1,
    data: chamberOneData,
  },
  {
    id: 2,
    data: chamberTwoData,
  },
  {
    id: 3,
    data: chamberThreeData,
  },
  {
    id: 4,
    data: chamberFourData,
  },
  {
    id: 5,
    data: chamberFiveData,
  },
  {
    id: 6,
    data: chamberSixData,
  },
  {
    id: 7,
    data: chamberSevenData,
  },
  {
    id: 8,
    data: chamberEightData,
  },
  {
    id: 9,
    data: chamberNineData,
  },
  {
    id: 10,
    data: chamberTenData,
  },
  {
    id: 11,
    data: chamberElevenData,
  },
  {
    id: 12,
    data: chamberTwelveData,
  },
  {
    id: 13,
    data: chamberThirteenData,
  },
  {
    id: 14,
    data: chamberFourteenData,
  },
]

export const CHAMBERS: ChamberEntry[] = CHAMBER_LISTINGS.map((listing, index) => ({
  id: listing.id,
  number: index + 1,
  name: listing.name ?? `Chamber ${index + 1}`,
  data: listing.data,
}))

/**
 * Looks up a chamber by its number.
 * @param chamberNumber - Chamber number, counted from 1
 * @returns The chamber, or undefined when no chamber has that number
 */
export function findChamber(chamberNumber: number): ChamberEntry | undefined {
  return CHAMBERS.find((chamber) => chamber.number === chamberNumber)
}
