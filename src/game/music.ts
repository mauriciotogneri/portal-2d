import gameMusicUrl from '@/assets/audio/music/Portal 2 OST Volume 1 - Science is Fun.mp3'
import menuMusicUrl from '@/assets/audio/music/menu.mp3'
import {createAudioPlayer} from '@/game/audio_sources'

/**
 * Background music, looping quietly under the sound effects.
 */
export class Music {
  static masterVolume = 1 // The player's music volume, from 0 (off) to 1, multiplying the music's volume
  private static readonly VOLUME = 0.15 // Playback volume of every track at full master volume: their files are evened to one loudness (scripts/normalize_audio.sh), and this keeps them 10 dB under the sound effects

  private readonly audio: HTMLAudioElement // The element that plays the track

  /**
   * @param url - Address of the audio file
   */
  constructor(url: string) {
    this.audio = createAudioPlayer(url)
  }

  /**
   * Starts or resumes the track on a loop at the music's volume scaled by the
   * master volume; on a track already playing, applies a change of the master volume.
   * @returns Whether the track started; false while the browser refuses to play until the user has interacted with the page
   */
  async play(): Promise<boolean> {
    this.audio.loop = true
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
}

/**
 * Music for the home and settings screens.
 */
export const menuMusic = new Music(menuMusicUrl)

/**
 * Music inside a chamber.
 */
export const gameMusic = new Music(gameMusicUrl)
