/**
 * The chamber opened most recently during this visit, a campaign chamber or
 * in development a playground chamber, so the home screen can pick it out
 * again on the way back. Kept in memory only: a reload forgets it.
 */
import type {ChamberList} from '@/services/chamber_catalogue'

/** A chamber as the home screen finds it again: its list and its number there. */
export type OpenedChamber = {
  list: ChamberList // The list it is in
  number: number // Its number in that list, counted from 1
}

let lastOpened: OpenedChamber | null = null // None until a chamber opens

/**
 * Records the chamber that has just opened.
 * @param list - The list it is in
 * @param chamberNumber - Its number in that list, counted from 1
 */
export function rememberChamber(list: ChamberList, chamberNumber: number): void {
  lastOpened = {
    list: list,
    number: chamberNumber,
  }
}

/**
 * Reads the chamber opened most recently during this visit.
 * @returns Its list and number, or null when no chamber has opened yet
 */
export function lastChamber(): OpenedChamber | null {
  return lastOpened
}
