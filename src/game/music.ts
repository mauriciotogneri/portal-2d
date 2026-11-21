import menuMusicUrl from '@/assets/audio/music/menu.mp3'
import {createAudioPlayer} from '@/game/audio_sources'

/**
 * A track of background music, quietly under the sound effects, either looping
 * or played once through.
 */
export class Music {
  static masterVolume = 1 // The player's music volume, from 0 (off) to 1, multiplying the music's volume
  private static readonly VOLUME = 0.15 // Playback volume of every track at full master volume: their files are evened to one loudness (scripts/normalize_audio.sh), and this keeps them 10 dB under the sound effects

  onEnded: (() => void) | null = null // Called when the track has played through to its end; never for a track that loops
  onFailed: (() => void) | null = null // Called when the track's file fails to download or can't be played

  private readonly audio: HTMLAudioElement // The element that plays the track
  private readonly loops: boolean // Whether the track starts over when it reaches its end

  /**
   * @param url - Address of the audio file
   * @param loops - False to play the track once through, then stop
   */
  constructor(url: string, loops = true) {
    this.audio = createAudioPlayer(url)
    this.loops = loops
    this.audio.addEventListener('ended', () => {
      this.onEnded?.()
    })
    this.audio.addEventListener('error', () => {
      this.onFailed?.()
    })
  }

  /**
   * Starts or resumes the track at the music's volume scaled by the master
   * volume; on a track already playing, applies a change of the master volume.
   * @returns Whether the track started; false while the browser refuses to play until the user has interacted with the page, or when its file fails
   */
  async play(): Promise<boolean> {
    this.audio.loop = this.loops
    this.audio.volume = Music.VOLUME * Music.masterVolume
    try {
      await this.audio.play()
      return true
    } catch (_error) {
      return false
    }
  }

  /**
   * Pauses the track where it is.
   */
  pause(): void {
    this.audio.pause()
  }

  /**
   * Moves the track back to its beginning, whether it is playing or paused.
   */
  rewind(): void {
    this.audio.currentTime = 0
  }

  /**
   * Starts downloading the track ahead of playing it, so it can start at once.
   * Does nothing more once it has started, or when it already has its file.
   */
  prefetch(): void {
    this.audio.preload = 'auto'
  }

  /**
   * Tries to download the track's file again if it failed before, so a track
   * that failed while downloading ahead gets another chance when it comes up.
   */
  retryIfFailed(): void {
    if (this.audio.error !== null) {
      this.audio.load()
    }
  }
}

/**
 * Music for the home and settings screens.
 */
export const menuMusic = new Music(menuMusicUrl)
