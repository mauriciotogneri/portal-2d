import {readdirSync} from 'node:fs'
import playground from '@/dev/playground.json'
import type {ChamberData} from '@/game/chamber_data'
import {CHAMBERS} from '@/services/chamber_catalogue'

// The chamber files the engine scripts run, shared so that every script
// checks the same chambers: the game's own play order
// (src/services/chamber_catalogue.ts), each chamber's file named by its
// permanent id. The chamber check fails on a chamber whose file doesn't hold
// its layout, and on an id that isn't a whole number of 0 or more or is used twice

/**
 * Names a chamber's file, after its permanent id.
 * @param id - The chamber's permanent id
 * @returns Its file name in src/chambers
 */
export function chamberFileName(id: number): string {
  return `chamber_${id}.json`
}

/** Every chamber in the play order, by its file name; the engine scripts fail on a chamber file missing here */
export const CHAMBER_FILES: Readonly<Record<string, ChamberData>> = Object.fromEntries(CHAMBERS.map((chamber) => [
  chamberFileName(chamber.id),
  chamber.data,
]))

/** The playground (src/dev/playground.json), the development-only chamber for trying every element: checked, settled and walked like a chamber file, but it has no recorded solution and the solver leaves it out */
export const PLAYGROUND_FILE = 'playground.json'

/** The playground's layout */
export const PLAYGROUND_DATA: ChamberData = playground

/** Where the chamber files and their recorded solutions are */
export const CHAMBERS_DIRECTORY = new URL('../src/chambers/', import.meta.url)

/** A chamber layout's file name, as opposed to the solutions and other JSON next to it */
const CHAMBER_FILE = /^chamber_\d+\.json$/

/**
 * Lists the chamber files in src/chambers, in number order.
 * @returns Their file names
 */
export function listChamberFiles(): string[] {
  return readdirSync(CHAMBERS_DIRECTORY)
    .filter((name) => CHAMBER_FILE.test(name))
    .sort((first, second) => first.localeCompare(second, 'en', {
      numeric: true,
    }))
}
