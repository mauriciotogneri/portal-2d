import openerUrl from '@/assets/audio/music/Portal 2 OST Volume 1 - Science is Fun.mp3'
import fourThousandDegreesKelvinUrl from '@/assets/audio/music/streamed/Portal 1 OST - 4000 Degrees Kelvin.mp3'
import subjectNameHereUrl from '@/assets/audio/music/streamed/Portal 1 OST - Subject Name Here.mp3'
import youCantEscapeUrl from '@/assets/audio/music/streamed/Portal 1 OST - You Cant Escape, You Know.mp3'
import fifteenAcresUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - 15 Acres of Broken Glass.mp3'
import sevenNinesUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - 9999999.mp3'
import comedyEqualsTragedyUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - Comedy = Tragedy + Time.mp3'
import concentrationEnhancingUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - Concentration Enhancing Menu Initialiser.mp3'
import imDifferentUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - Im Different.mp3'
import friendlyFaithPlateUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - The Friendly Faith Plate.mp3'
import youKnowHerUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 1 - You Know Her？.mp3'
import almostAtFiftyPercentUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Almost At Fifty Percent.mp3'
import bringYourDaughterUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Bring Your Daughter To Work Day.mp3'
import dieCutLaserDanceUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Die Cut Laser Dance.mp3'
import dontDoItUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Dont Do it.mp3'
import forwardingTheCauseUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Forwarding the Cause of Science.mp3'
import musicOfTheSpheresUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Music of the Spheres 2 (Incendiary Lemons).mp3'
import theReunionUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - The Reunion.mp3'
import vitrificationOrderUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 2 - Vitrification Order.mp3'
import bombsForThrowingUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - Bombs for Throwing at You (Four Part Plan).mp3'
import carolineDeletedUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - Caroline Deleted.mp3'
import robotWaitingRoomUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - Robot Waiting Room 1.mp3'
import someAssemblyRequiredUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - Some Assembly Required.mp3'
import partWhereHeKillsYouUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - The Part Where He Kills You.mp3'
import wheatleyScienceUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - Wheatley Science.mp3'
import yourPreciousMoonUrl from '@/assets/audio/music/streamed/Portal 2 OST Volume 3 - Your Precious Moon.mp3'
import {Music} from '@/game/music'

/**
 * Music that plays its tracks one after another, each once through: an opening
 * track, then a fixed list, going round it. Each track that starts downloads
 * the next one in the list, so it is ready when its turn comes. A track whose
 * file fails is skipped; when the next one fails too, the playlist stays
 * silent until it is moved on.
 */
export class MusicPlaylist {
  lastTrack = -1 // Position in the list of the last track moved to, which the next one follows; -1 before any
  onTrackChosen: ((track: number) => void) | null = null // Called with the position in the list of each track moved to

  private readonly opener: Music // The track a playlist starts with
  private readonly tracks: Music[] // The list played after the opener, in order
  private current: Music // The track playing, or the one that plays when the playlist plays
  private playing = false // Whether the playlist was last told to play rather than pause
  private skippedFailure = false // Whether the current track was moved to because the one before it failed

  /**
   * @param openerUrl - Address of the opening track's file
   * @param trackUrls - Addresses of the list's files, in the order they play
   */
  constructor(openerUrl: string, trackUrls: string[]) {
    this.opener = this.createTrack(openerUrl)
    this.tracks = trackUrls.map((url) => this.createTrack(url))
    this.current = this.opener
  }

  /**
   * How many tracks the list holds, the opener left out.
   */
  get trackCount(): number {
    return this.tracks.length
  }

  /**
   * Plays or resumes the current track, and starts downloading the next one in
   * the list; on a track already playing, applies a change of the master volume.
   * @returns Whether the track started; false while the browser refuses to play until the user has interacted with the page, or when its file fails
   */
  async play(): Promise<boolean> {
    this.playing = true
    const started = await this.current.play()
    if (started) {
      this.nextTrack?.prefetch()
    }
    return started
  }

  /**
   * Pauses the current track where it is.
   */
  pause(): void {
    this.playing = false
    this.current.pause()
  }

  /**
   * Makes the opener the current track, from its beginning.
   */
  startOpener(): void {
    this.choose(this.opener)
  }

  /**
   * Makes the next track in the list the current one, from its beginning.
   */
  moveOn(): void {
    const track = this.nextTrack
    if (track === undefined) {
      return
    }
    this.lastTrack = (this.lastTrack + 1) % this.tracks.length
    this.choose(track)
    this.onTrackChosen?.(this.lastTrack)
  }

  /**
   * The track the list plays next; undefined when the list is empty.
   */
  private get nextTrack(): Music | undefined {
    return this.tracks[(this.lastTrack + 1) % this.tracks.length]
  }

  /**
   * Stops the current track and puts another in its place, from its
   * beginning, giving its file another chance if it failed before.
   * @param track - The track to play from now on
   */
  private choose(track: Music): void {
    this.current.pause()
    this.current = track
    this.skippedFailure = false
    track.retryIfFailed()
    track.rewind()
  }

  /**
   * Creates one of the playlist's tracks, which moves the playlist on when it
   * ends or fails while it is the current track.
   * @param url - Address of the track's file
   * @returns The track
   */
  private createTrack(url: string): Music {
    const track = new Music(url, false)
    track.onEnded = () => {
      if (track === this.current) {
        this.moveOnAndPlay()
      }
    }
    track.onFailed = () => {
      // A track downloading ahead that fails gets another chance when it comes up
      if (track === this.current && !this.skippedFailure) {
        this.moveOnAndPlay()
        this.skippedFailure = true
      }
    }
    return track
  }

  /**
   * Moves on to the next track in the list, and plays it if the playlist was playing.
   */
  private moveOnAndPlay(): void {
    this.moveOn()
    if (this.playing) {
      void this.play()
    }
  }
}

/**
 * Music inside a chamber.
 */
export const gameMusic = new MusicPlaylist(openerUrl, [
  fourThousandDegreesKelvinUrl,
  subjectNameHereUrl,
  youCantEscapeUrl,
  fifteenAcresUrl,
  sevenNinesUrl,
  comedyEqualsTragedyUrl,
  concentrationEnhancingUrl,
  imDifferentUrl,
  friendlyFaithPlateUrl,
  youKnowHerUrl,
  almostAtFiftyPercentUrl,
  bringYourDaughterUrl,
  dieCutLaserDanceUrl,
  dontDoItUrl,
  forwardingTheCauseUrl,
  musicOfTheSpheresUrl,
  theReunionUrl,
  vitrificationOrderUrl,
  bombsForThrowingUrl,
  carolineDeletedUrl,
  robotWaitingRoomUrl,
  someAssemblyRequiredUrl,
  partWhereHeKillsYouUrl,
  wheatleyScienceUrl,
  yourPreciousMoonUrl,
])
