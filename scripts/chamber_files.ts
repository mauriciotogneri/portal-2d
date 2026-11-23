import {readdirSync} from 'node:fs'
import type {ChamberData} from '@/game/chamber_data'
import {CHAMBERS} from '@/services/chamber_catalogue'
import {PLAYGROUND_LAYOUTS} from '@/services/playground_catalogue'

// The chamber files the engine scripts run, shared so that every script
// checks the same chambers: the game's own play order
// (src/services/chamber_catalogue.ts), each chamber's file named by its
// permanent id, and the playground chambers (src/services/playground_catalogue.ts),
// each one's file named by its number. The chamber check fails on a chamber
// whose file doesn't hold its layout, on an id that isn't a whole number of 1
// or more or is used twice, and on a playground chamber whose file doesn't hold its layout

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

/**
 * Names a playground chamber's file, after its number.
 * @param playgroundNumber - Its number in the playground list, counted from 1
 * @returns Its file name in src/dev/playground
 */
export function playgroundFileName(playgroundNumber: number): string {
  return `playground_${playgroundNumber}.json`
}

/** Every playground chamber, the chambers outside the campaign for trying elements and ideas, by its file name: checked, settled and walked like a chamber file, but with no recorded solution, and the solver leaves them out; the engine scripts fail on a playground file missing here */
export const PLAYGROUND_FILES: Readonly<Record<string, ChamberData>> = Object.fromEntries(PLAYGROUND_LAYOUTS.map((layout, index) => [
  playgroundFileName(index + 1),
  layout,
]))

/** Where the chamber files and their recorded solutions are */
export const CHAMBERS_DIRECTORY = new URL('../src/chambers/', import.meta.url)

/** Where the playground chambers' files are */
export const PLAYGROUND_DIRECTORY = new URL('../src/dev/playground/', import.meta.url)

/** A chamber layout's file name, as opposed to the solutions and other JSON next to it */
const CHAMBER_FILE = /^chamber_\d+\.json$/

/** A playground chamber's file name */
const PLAYGROUND_FILE = /^playground_\d+\.json$/

/**
 * Lists the files in a folder whose names match, in number order.
 * @param directory - The folder
 * @param pattern - The names to keep
 * @returns Their file names
 */
function listFiles(directory: URL, pattern: RegExp): string[] {
  return readdirSync(directory)
    .filter((name) => pattern.test(name))
    .sort((first, second) => first.localeCompare(second, 'en', {
      numeric: true,
    }))
}

/**
 * Lists the chamber files in src/chambers, in number order.
 * @returns Their file names
 */
export function listChamberFiles(): string[] {
  return listFiles(CHAMBERS_DIRECTORY, CHAMBER_FILE)
}

/**
 * Lists the playground chambers' files in src/dev/playground, in number order.
 * @returns Their file names
 */
export function listPlaygroundFiles(): string[] {
  return listFiles(PLAYGROUND_DIRECTORY, PLAYGROUND_FILE)
}
