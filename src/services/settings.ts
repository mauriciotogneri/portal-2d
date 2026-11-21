/**
 * Sound effects and music volumes, kept in localStorage and applied to the
 * game audio, and whether the chamber screen's controls legend is open, kept
 * the same way.
 */
import {ref, watch} from 'vue'
import type {Ref} from 'vue'
import {gameMusic, menuMusic, Music} from '@/game/music'
import {Sound} from '@/game/sound'
import {trackSettingChange} from '@/services/analytics'
import type {TrackedSetting} from '@/services/analytics'

/** Which background track a screen plays. */
export type MusicTrack = 'menu' | 'game'

/** A volume the player sets, as the menus list it. */
export type VolumeSetting = {
  label: string // Name on its row
  volume: Ref<number> // The volume, from 0 (off) to VOLUME_MAX
}

export const VOLUME_STEP = 10 // How far one press of Left or Right moves a volume
export const VOLUME_MAX = 100 // Full volume: as loud as the game played before it had volumes

const SOUND_VOLUME_STORAGE_KEY = 'portal-2d.sound-volume'
const MUSIC_VOLUME_STORAGE_KEY = 'portal-2d.music-volume'
const LEGEND_STORAGE_KEY = 'portal-2d.legend-open'

const VOLUME_SETTLE_TIME = 1000 // Milliseconds a volume must stay put before analytics hears of it, so a run of steps counts once

const MUSIC_TRACKS: Record<MusicTrack, Music> = {
  menu: menuMusic,
  game: gameMusic,
}

let currentTrack: MusicTrack | null = null // Track of the open screen; none until a screen opens

/**
 * Reads an on/off preference. Missing or unreadable values count as on.
 * @param key - localStorage key
 * @returns The stored preference
 */
function readPreference(key: string): boolean {
  try {
    return localStorage.getItem(key) !== 'false'
  } catch (_error) {
    return true
  }
}

/**
 * Persists an on/off preference.
 * @param key - localStorage key
 * @param value - Preference to store
 */
function writePreference(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, String(value))
  } catch (_error) {
    // Storage blocked: the preference lasts for this visit only
  }
}

/**
 * Whether a number is a volume the menus can set.
 * @param volume - The number
 * @returns True for a whole step from 0 to VOLUME_MAX
 */
function isVolume(volume: number): boolean {
  return Number.isInteger(volume) && volume >= 0 && volume <= VOLUME_MAX && volume % VOLUME_STEP === 0
}

/**
 * Reads a stored volume. Missing or unreadable values count as full volume.
 * @param key - localStorage key of the volume
 * @returns The stored volume
 */
function readVolume(key: string): number {
  try {
    const stored = localStorage.getItem(key)
    if (stored === null) {
      return VOLUME_MAX
    }
    const volume = /^\d+$/.test(stored) ? Number(stored) : Number.NaN
    return isVolume(volume) ? volume : VOLUME_MAX
  } catch (_error) {
    return VOLUME_MAX
  }
}

/**
 * Persists a volume.
 * @param key - localStorage key
 * @param volume - Volume to store
 */
function writeVolume(key: string, volume: number): void {
  try {
    localStorage.setItem(key, String(volume))
  } catch (_error) {
    // Storage blocked: the volume lasts for this visit only
  }
}

/**
 * Plays the open screen's track if the music volume is above 0, and pauses
 * every other track. Safe to call repeatedly; playing music that is already
 * playing only applies the music volume.
 */
function applyMusic(): void {
  const playingMusic = musicVolume.value > 0 && currentTrack !== null ? MUSIC_TRACKS[currentTrack] : null
  for (const music of Object.values(MUSIC_TRACKS)) {
    if (music === playingMusic) {
      void music.play().then((started) => {
        if (started) {
          stopRetryingMusic()
        }
      })
    } else {
      music.pause()
    }
  }
}

/**
 * Stops retrying the music on key presses and clicks, once a track has started.
 */
function stopRetryingMusic(): void {
  window.removeEventListener('keydown', applyMusic)
  window.removeEventListener('pointerdown', applyMusic)
}

export const soundVolume = ref(readVolume(SOUND_VOLUME_STORAGE_KEY)) // The sound effects volume, from 0 (off) to VOLUME_MAX
export const musicVolume = ref(readVolume(MUSIC_VOLUME_STORAGE_KEY)) // The music volume, from 0 (off) to VOLUME_MAX

/**
 * The volumes in the order the menus list them, under Settings and in the
 * pause menu's Settings.
 */
export const AUDIO_VOLUMES: VolumeSetting[] = [
  {
    label: 'Sound',
    volume: soundVolume,
  },
  {
    label: 'Music',
    volume: musicVolume,
  },
]

/**
 * Sets a volume, kept within its range.
 * @param volume - The volume
 * @param next - The volume asked for
 * @returns Whether the volume changed
 */
export function setVolume(volume: Ref<number>, next: number): boolean {
  const kept = Math.min(VOLUME_MAX, Math.max(0, next))
  if (kept === volume.value) {
    return false
  }
  volume.value = kept
  return true
}

Sound.masterVolume = soundVolume.value / VOLUME_MAX
Music.masterVolume = musicVolume.value / VOLUME_MAX

// The last volume analytics heard of, or the one the visit started with, and the wait for a new one to settle
const reportedVolumes: Record<TrackedSetting, number> = {
  sound: soundVolume.value,
  music: musicVolume.value,
}
const settleTimers: Record<TrackedSetting, number | undefined> = {
  sound: undefined,
  music: undefined,
}

/**
 * Tells analytics of a volume once it has stayed put for a moment, so a run
 * of steps counts as one change, and one that ends where it began as none.
 * @param setting - Which volume
 * @param volume - Its new value
 */
function reportVolume(setting: TrackedSetting, volume: number): void {
  window.clearTimeout(settleTimers[setting])
  settleTimers[setting] = window.setTimeout(() => {
    if (volume !== reportedVolumes[setting]) {
      reportedVolumes[setting] = volume
      trackSettingChange(setting, volume)
    }
  }, VOLUME_SETTLE_TIME)
}

watch(soundVolume, (volume) => {
  Sound.masterVolume = volume / VOLUME_MAX
  writeVolume(SOUND_VOLUME_STORAGE_KEY, volume)
  reportVolume('sound', volume)
})

watch(musicVolume, (volume) => {
  Music.masterVolume = volume / VOLUME_MAX
  writeVolume(MUSIC_VOLUME_STORAGE_KEY, volume)
  applyMusic()
  reportVolume('music', volume)
})

export const legendOpen = ref(readPreference(LEGEND_STORAGE_KEY)) // Whether the chamber screen shows its controls, or has them folded away under their heading

watch(legendOpen, (open) => {
  writePreference(LEGEND_STORAGE_KEY, open)
})

/**
 * Switches the background music to a screen's track, which loops while the
 * screen is open and, unless told to start over, resumes where it left off when
 * the screen opens again. Browsers block audio until the page gets a key press
 * or click, so on a fresh visit every key press and click retries the track
 * until it starts; some keys, such as Escape, don't count as interacting with the page.
 * @param track - The track the opening screen plays
 * @param fromStart - True to play the track from its beginning instead of where it left off
 */
export function playMusic(track: MusicTrack, fromStart = false): void {
  currentTrack = track
  if (fromStart) {
    MUSIC_TRACKS[track].rewind()
  }
  applyMusic()
  window.addEventListener('keydown', applyMusic)
  window.addEventListener('pointerdown', applyMusic)
}
