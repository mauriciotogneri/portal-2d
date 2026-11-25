/**
 * Firebase Analytics: what players do in the chambers, the settings and About,
 * how the game loads, and the errors it meets. Only production builds send
 * anything; development builds log each event to the console instead.
 * Analytics never affects the game: a browser that can't run it, an ad blocker
 * or any error just means the events are dropped.
 *
 * Run events carry the attempt they belong to: the chamber's attempt count on
 * this device, kept with the progress and cleared by Reset progress. Every
 * opening, Restart chamber and Play again starts a new attempt, but Restart chamber
 * sends no chamber_start of its own, so runs = chamber_start + chamber_restart.
 * A restart ends attempt N, and the run after it is N + 1.
 */
import {getAnalytics, isSupported, logEvent} from 'firebase/analytics'
import type {Analytics} from 'firebase/analytics'
import {initializeApp} from 'firebase/app'
import type {FirebaseOptions} from 'firebase/app'
import type {App} from 'vue'
import type {ChamberEntry} from '@/services/chamber_catalogue'
import type {ControlLayout} from '@/services/key_bindings'

/** The events sent, named as they appear in the Firebase console. */
type EventName =
  | 'chamber_start'
  | 'chamber_restart'
  | 'chamber_quit'
  | 'chamber_abandon'
  | 'chamber_complete'
  | 'hint_shown'
  | 'setting_change'
  | 'controls_change'
  | 'progress_reset'
  | 'changelog_open'
  | 'feedback_open'
  | 'link_open'
  | 'loading_complete'
  | 'asset_failed'
  | 'desktop_only_shown'
  | 'exception'

/** An event's details, by parameter name. */
type EventParams = Record<string, string | number>

/** A volume the player can set under Settings. */
export type TrackedSetting = 'sound' | 'music'

/** The kind of file the loading screen downloads. */
export type AssetKind = 'audio' | 'image'

/** Why a file the loading screen downloads can't be used: it didn't download, or it was refused as a sprite. */
export type AssetFailure = 'download' | 'refused'

/** Where an error was caught: thrown and not caught, a promise rejected and not handled, or in a screen. */
type ExceptionSource = 'page' | 'promise' | 'screen'

/** How far a run got when it ended. */
export type RunProgress = {
  hundredths: number // The run's time as shown to the player, in hundredths of a second
  moves: number // Steps that put the subject on another tile
  portals: number // Portals opened on a wall during the run, misses not counted
  pauses: number // Times the pause menu was opened during the run
  framesPerSecond: number | null // How often the chamber's frame loop ran during the run, or null when it couldn't tell
}

// Google Analytics keeps at most this many characters of a parameter's value
const MAX_PARAMETER_LENGTH = 100

// Errors and failed files sent per visit at the most, so a fault that repeats can't flood the reports
const MAX_EXCEPTIONS = 10
const MAX_FAILED_ASSETS = 10

/** Each layout of controls as reports name it: Arrow keys is the one shown as Default. */
const LAYOUT_NAMES: Readonly<Record<ControlLayout, string>> = {
  'arrow-keys': 'default',
  'custom': 'custom',
}

// Only what Analytics needs: it fetches the measurement ID from Firebase on start
const FIREBASE_CONFIG: FirebaseOptions = {
  apiKey: 'AIzaSyDSkTfVrkuiVgvYridxb4HBARgU2QrFjrw', // Identifies the web app to Firebase; public by design
  projectId: 'portal-2d', // The Firebase project
  appId: '1:218230651857:web:96e0c9555b2bc28a26bef0', // The web app within the project
}

let analytics: Promise<Analytics | null> = Promise.resolve(null) // The running instance, or null while nothing is sent
const reportedErrors = new Set<string>() // Each error sent this visit, by its description
let failedAssetsSent = 0 // Failed files sent this visit

/**
 * Starts reporting the errors the page meets and starts sending events, in
 * production builds only and only where the browser supports Analytics. Call
 * once, when the app starts, before it mounts.
 * @param app - The app, whose errors in screens are reported too
 */
export function startAnalytics(app: App): void {
  window.addEventListener('error', (event) => {
    // A script from another site, or the browser's ResizeObserver notice, gives no error: nothing to act on
    if (event.error !== null && event.error !== undefined) {
      trackException(event.error, 'page')
    }
  })
  window.addEventListener('unhandledrejection', (event) => {
    trackException(event.reason, 'promise')
  })
  if (!import.meta.env.PROD) {
    return
  }
  // Vue's own handler logs an error in a screen to the console and goes on; this does the same, then
  // reports it. Development keeps Vue's, which also names the component
  app.config.errorHandler = (error) => {
    console.error(error)
    trackException(error, 'screen')
  }
  analytics = isSupported()
    .then((supported) => (supported ? getAnalytics(initializeApp(FIREBASE_CONFIG)) : null))
    .catch(() => null)
}

/**
 * Sends one event once Analytics has started; drops it when nothing is sent.
 * Development builds log it to the console instead.
 * @param name - The event
 * @param params - Its details
 */
function sendEvent(name: EventName, params: EventParams = {}): void {
  if (import.meta.env.DEV) {
    // What a production build would send, so events can be checked without reaching the reports
    console.info(`[analytics] ${name}`, params)
    return
  }
  void analytics
    .then((instance) => {
      if (instance === null) {
        return
      }
      // A standard Google Analytics event has a call of its own, which the custom events' call refuses
      if (name === 'exception') {
        logEvent(instance, name, params)
      } else {
        logEvent(instance, name, params)
      }
    })
    .catch(() => {
      // Analytics failed: the event is dropped and the game goes on
    })
}

/**
 * Names a chamber in an event's details.
 * @param chamber - The chamber
 * @returns Its permanent id and the number the player sees
 */
function chamberParams(chamber: ChamberEntry): EventParams {
  return {
    chamber_id: chamber.id,
    chamber_number: chamber.number,
  }
}

/**
 * Names a run of a chamber in an event's details.
 * @param chamber - The chamber
 * @param attempt - The run's attempt number at the chamber
 * @returns The chamber's permanent id, the number the player sees and the attempt
 */
function runParams(chamber: ChamberEntry, attempt: number): EventParams {
  return {
    ...chamberParams(chamber),
    attempt: attempt,
  }
}

/**
 * Describes how far a run got in an event's details.
 * @param progress - The run
 * @returns Its time in milliseconds, its moves, its portals, its pauses and,
 * when it could tell, its frames per second
 */
function progressParams(progress: RunProgress): EventParams {
  const params: EventParams = {
    time_ms: progress.hundredths * 10,
    moves: progress.moves,
    portals: progress.portals,
    pauses: progress.pauses,
  }
  // Left out when the run was too short to tell
  if (progress.framesPerSecond !== null) {
    params.fps = Math.round(progress.framesPerSecond)
  }
  return params
}

/**
 * Cuts a parameter's value to the length Google Analytics keeps.
 * @param text - The value
 * @returns Its first characters, as many as are kept
 */
function limitLength(text: string): string {
  return text.slice(0, MAX_PARAMETER_LENGTH)
}

/**
 * Describes an error in one line.
 * @param error - What was thrown or rejected
 * @returns Its name and message, or, for something that isn't an Error, its text
 */
function describeError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`
  }
  try {
    return String(error)
  } catch (_error) {
    // An object whose text can't be read
    return 'Unknown error'
  }
}

/**
 * An error went uncaught. Each one is sent once per visit, and only the
 * first few are.
 * @param error - What was thrown or rejected
 * @param source - Where it was caught
 */
function trackException(error: unknown, source: ExceptionSource): void {
  const description = limitLength(describeError(error))
  if (reportedErrors.has(description) || reportedErrors.size >= MAX_EXCEPTIONS) {
    return
  }
  reportedErrors.add(description)
  sendEvent('exception', {
    description: description,
    source: source,
  })
}

/**
 * A run of a chamber begins: the chamber was opened, or played again after finishing it.
 * @param chamber - The chamber
 * @param attempt - The run's attempt number at the chamber
 */
export function trackChamberStart(chamber: ChamberEntry, attempt: number): void {
  sendEvent('chamber_start', runParams(chamber, attempt))
}

/**
 * The player confirmed Restart chamber, ending the run. The next run starts
 * without a chamber_start event.
 * @param chamber - The chamber
 * @param attempt - The attempt number of the run that ended
 * @param progress - How far the run got before the reset
 */
export function trackChamberRestart(chamber: ChamberEntry, attempt: number, progress: RunProgress): void {
  sendEvent('chamber_restart', {
    ...runParams(chamber, attempt),
    ...progressParams(progress),
  })
}

/**
 * The player confirmed leaving the chamber before finishing it.
 * @param chamber - The chamber
 * @param attempt - The run's attempt number at the chamber
 * @param progress - How far the run got
 */
export function trackChamberQuit(chamber: ChamberEntry, attempt: number, progress: RunProgress): void {
  sendEvent('chamber_quit', {
    ...runParams(chamber, attempt),
    ...progressParams(progress),
  })
}

/**
 * The page was closed, reloaded or left for another site during an unfinished
 * run. Sent at most once per attempt. A page the browser keeps in its
 * back/forward cache can be shown again and the run carried on, so an attempt
 * may be abandoned and later still end another way. Events sent as a page goes
 * away can be lost, so the counts are a lower bound.
 * @param chamber - The chamber
 * @param attempt - The run's attempt number at the chamber
 * @param progress - How far the run got
 */
export function trackChamberAbandon(chamber: ChamberEntry, attempt: number, progress: RunProgress): void {
  sendEvent('chamber_abandon', {
    ...runParams(chamber, attempt),
    ...progressParams(progress),
  })
}

/**
 * The subject reached the exit.
 * @param chamber - The chamber
 * @param attempt - The run's attempt number at the chamber
 * @param progress - The finished run
 * @param firstCompletion - Whether the chamber had not been completed before (since progress was last reset)
 * @param newBest - Whether the run set the chamber's best time, which a first completion always does
 */
export function trackChamberComplete(chamber: ChamberEntry, attempt: number, progress: RunProgress, firstCompletion: boolean, newBest: boolean): void {
  sendEvent('chamber_complete', {
    ...runParams(chamber, attempt),
    ...progressParams(progress),
    // 1 or 0, so reports can sum them
    first_completion: firstCompletion ? 1 : 0,
    new_best: newBest ? 1 : 0,
  })
}

/**
 * A tutorial hint showed over the chamber, which it does once per player
 * unless progress is reset or the player leaves before closing it.
 * @param chamber - The chamber
 * @param attempt - The run's attempt number at the chamber
 * @param hintId - The hint's permanent id, unique within the chamber
 */
export function trackHintShown(chamber: ChamberEntry, attempt: number, hintId: string): void {
  sendEvent('hint_shown', {
    ...runParams(chamber, attempt),
    hint_id: hintId,
  })
}

/**
 * The player changed a volume, once it settled.
 * @param setting - Which volume
 * @param volume - Its new value, from 0 (off) to 100
 */
export function trackSettingChange(setting: TrackedSetting, volume: number): void {
  sendEvent('setting_change', {
    setting: setting,
    // Kept from the on/off switches the volumes replaced, so the history carries on
    enabled: volume > 0 ? 'on' : 'off',
    volume: volume,
  })
}

/**
 * The player put another layout of controls in use under Settings.
 * @param layout - The layout now in use
 */
export function trackControlsChange(layout: ControlLayout): void {
  sendEvent('controls_change', {
    layout: LAYOUT_NAMES[layout],
  })
}

/**
 * The player confirmed Reset progress.
 */
export function trackProgressReset(): void {
  sendEvent('progress_reset')
}

/**
 * The player stepped into the changelog under About.
 */
export function trackChangelogOpen(): void {
  sendEvent('changelog_open')
}

/**
 * The player picked Feedback under About, opening their mail app.
 */
export function trackFeedbackOpen(): void {
  sendEvent('feedback_open')
}

/**
 * The player opened a page listed under About.
 * @param label - The page's name on its row
 * @param url - Its address
 */
export function trackLinkOpen(label: string, url: string): void {
  sendEvent('link_open', {
    link: label,
    url: url,
  })
}

/**
 * The loading screen finished downloading, and Start appeared.
 * @param durationMilliseconds - Time since the page started loading
 * @param failedFiles - Files that didn't download or were refused
 */
export function trackLoadingComplete(durationMilliseconds: number, failedFiles: number): void {
  sendEvent('loading_complete', {
    duration_ms: Math.round(durationMilliseconds),
    failed_files: failedFiles,
  })
}

/**
 * A file the loading screen downloads can't be used. Only the first few per
 * visit are sent; loading_complete counts them all.
 * @param file - Where the file sits in src/assets, such as images/chamber/box.webp
 * @param kind - What kind of file it is
 * @param reason - Why it can't be used
 */
export function trackAssetFailed(file: string, kind: AssetKind, reason: AssetFailure): void {
  if (failedAssetsSent >= MAX_FAILED_ASSETS) {
    return
  }
  failedAssetsSent += 1
  sendEvent('asset_failed', {
    file: limitLength(file),
    kind: kind,
    reason: reason,
  })
}

/**
 * A touch-first device was shown the desktop-only notice instead of the game.
 */
export function trackDesktopOnlyShown(): void {
  sendEvent('desktop_only_shown')
}
