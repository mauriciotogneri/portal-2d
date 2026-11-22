/**
 * Where this page load starts in the browser history, so a screen can tell
 * whether the entry before its own belongs to this page load, which going
 * back returns to without loading the site again. One that doesn't, such as
 * the entry before a chamber reloaded mid-run, belongs to an earlier load.
 * Kept in memory only: each page load records its own.
 */
import type {HistoryState} from 'vue-router'

let firstPosition: number | null = null // The router's position of the entry this page load started on; null until recorded

/**
 * Reads where a history entry sits in the browser history, as the router numbers its entries.
 * @param state - The router's state for the entry
 * @returns Its position, or null when the entry has none
 */
export function historyPosition(state: HistoryState): number | null {
  const position = state.position
  return typeof position === 'number' ? position : null
}

/**
 * Records the entry this page load starts on. Called once, as soon as the
 * router has numbered it.
 * @param state - The router's state for the entry the page load starts on
 */
export function rememberFirstEntry(state: HistoryState): void {
  firstPosition = historyPosition(state)
}

/**
 * Tells whether the entry before the current one shows an address and belongs
 * to this page load, so going back returns to it without loading the site again.
 * @param path - The address, as a full path such as "/"
 * @param state - The router's state for the current entry
 * @returns True when going back shows that address within this page load
 */
export function previousEntryIs(path: string, state: HistoryState): boolean {
  const position = historyPosition(state)
  return state.back === path && position !== null && firstPosition !== null && position > firstPosition
}
