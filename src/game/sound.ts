import blockedWallUrl from '@/assets/audio/sound/blocked_wall.mp3'
import boxUrl from '@/assets/audio/sound/box.mp3'
import boxDestroyedUrl from '@/assets/audio/sound/box_destroyed.mp3'
import {createAudioPlayer} from '@/game/audio_sources'
import buttonOffUrl from '@/assets/audio/sound/button_off.mp3'
import buttonOnUrl from '@/assets/audio/sound/button_on.mp3'
import crossUrl from '@/assets/audio/sound/cross.mp3'
import ditchGrateUrl from '@/assets/audio/sound/ditch_grate.mp3'
import doorCloseUrl from '@/assets/audio/sound/door_close.mp3'
import doorOpenUrl from '@/assets/audio/sound/door_open.mp3'
import emitterOffUrl from '@/assets/audio/sound/emitter_off.mp3'
import emitterOnUrl from '@/assets/audio/sound/emitter_on.mp3'
import errorUrl from '@/assets/audio/sound/error.mp3'
import exitReachedUrl from '@/assets/audio/sound/exit_reached.mp3'
import fizzleUrl from '@/assets/audio/sound/fizzle.mp3'
import fizzlerOffUrl from '@/assets/audio/sound/fizzler_off.mp3'
import fizzlerOnUrl from '@/assets/audio/sound/fizzler_on.mp3'
import laserOffUrl from '@/assets/audio/sound/laser_off.mp3'
import laserOnUrl from '@/assets/audio/sound/laser_on.mp3'
import lightBarrierOffUrl from '@/assets/audio/sound/light_barrier_off.mp3'
import lightBarrierOnUrl from '@/assets/audio/sound/light_barrier_on.mp3'
import menuAcceptUrl from '@/assets/audio/sound/menu_accept.mp3'
import menuMoveUrl from '@/assets/audio/sound/menu_move.mp3'
import mirrorBoxRayUrl from '@/assets/audio/sound/mirror_box_ray.mp3'
import portalBlueUrl from '@/assets/audio/sound/portal_blue.mp3'
import portalOrangeUrl from '@/assets/audio/sound/portal_orange.mp3'
import receiverOffUrl from '@/assets/audio/sound/receiver_off.mp3'
import receiverOnUrl from '@/assets/audio/sound/receiver_on.mp3'
import shootUrl from '@/assets/audio/sound/shoot.mp3'
import slidingFloorUrl from '@/assets/audio/sound/sliding_floor.mp3'
import startUrl from '@/assets/audio/sound/start.mp3'
import switchUrl from '@/assets/audio/sound/switch.mp3'
import turnableArrowUrl from '@/assets/audio/sound/turnable_arrow.mp3'

/**
 * A sound effect. Each effect is a single shared instance that restarts from
 * the beginning every time it plays, cutting itself off if still playing.
 */
export class Sound {
  static masterVolume = 1 // The player's sound effects volume, from 0 (off: play() does nothing) to 1, multiplying the effects' volume
  private static readonly VOLUME = 0.5 // Playback volume of every effect at full master volume: their files are evened to one loudness (scripts/normalize_audio.sh), and this puts them 10 dB above the music

  static readonly PORTAL_BLUE = new Sound(portalBlueUrl) // Blue portal opened
  static readonly PORTAL_ORANGE = new Sound(portalOrangeUrl) // Orange portal opened
  static readonly SHOOT = new Sound(shootUrl) // Portal shot missed: nothing there takes a portal
  static readonly BUTTON_ON = new Sound(buttonOnUrl) // Button pressed down
  static readonly BUTTON_OFF = new Sound(buttonOffUrl) // Button released
  static readonly BOX = new Sound(boxUrl) // Box picked up or put down
  static readonly FIZZLE = new Sound(fizzleUrl) // Subject entered an active fizzler
  static readonly CROSS = new Sound(crossUrl) // Subject went through a portal
  static readonly DOOR_OPEN = new Sound(doorOpenUrl) // Door or exit opened
  static readonly DOOR_CLOSE = new Sound(doorCloseUrl) // Door or exit closed
  static readonly ERROR = new Sound(errorUrl) // Action refused
  static readonly SWITCH = new Sound(switchUrl) // Switch used
  static readonly TURNABLE_ARROW = new Sound(turnableArrowUrl) // A turnable arrow turned, by a link, to its turned way or back
  static readonly BLOCKED_WALL = new Sound(blockedWallUrl) // A blocked wall switched, by a link, to take portals or to refuse them
  static readonly DITCH_GRATE = new Sound(ditchGrateUrl) // A ditch's grate slid in or out, a link bridging or opening it
  static readonly LIGHT_BARRIER_OFF = new Sound(lightBarrierOffUrl) // A light barrier switched off by a link
  static readonly LIGHT_BARRIER_ON = new Sound(lightBarrierOnUrl) // A light barrier switched on by a link
  static readonly LASER_OFF = new Sound(laserOffUrl) // A laser switched off by a link
  static readonly LASER_ON = new Sound(laserOnUrl) // A laser switched on by a link
  static readonly FIZZLER_OFF = new Sound(fizzlerOffUrl) // A fizzler switched off by a link
  static readonly FIZZLER_ON = new Sound(fizzlerOnUrl) // A fizzler switched on by a link
  static readonly BOX_DESTROYED = new Sound(boxDestroyedUrl) // A box destroyed where something blocks, carried into an active fizzler, or sent back to its start by a link
  static readonly EXIT_REACHED = new Sound(exitReachedUrl) // The subject reached the open exit
  static readonly SLIDING_FLOOR = new Sound(slidingFloorUrl) // The subject started sliding on a slide floor, once per slide
  static readonly RECEIVER_ON = new Sound(receiverOnUrl) // A ray reached a receiver, which lit up
  static readonly RECEIVER_OFF = new Sound(receiverOffUrl) // A receiver no ray reaches any more went dark
  static readonly EMITTER_ON = new Sound(emitterOnUrl) // An emitter switched on by a link
  static readonly EMITTER_OFF = new Sound(emitterOffUrl) // An emitter switched off by a link
  static readonly MIRROR_BOX_RAY = new Sound(mirrorBoxRayUrl) // A ray started bouncing off a mirror box, one put down in it included
  static readonly MENU_MOVE = new Sound(menuMoveUrl) // A menu's or dialog's highlight moved (arrow keys, Tab or the pointer), a menu stepped into or back out of with the arrow keys, or Escape or Backspace stepped back, closed a dialog or opened or closed the pause menu, or a volume stepped (Left, Right or the pointer); played by the screens, not the game
  static readonly MENU_ACCEPT = new Sound(menuAcceptUrl) // A menu row or dialog button pressed (Enter, Space or a click), never a volume row, or a key bound; played by the screens, not the game
  static readonly START = new Sound(startUrl) // Chamber picked on the home screen; played by the screens, not the game

  private readonly audio: HTMLAudioElement // The element that plays this effect

  /**
   * @param url - Address of the audio file
   */
  constructor(url: string) {
    this.audio = createAudioPlayer(url)
  }

  /**
   * Plays the effect from the start at the effects' volume scaled by the
   * master volume, unless the master volume is off.
   */
  play(): void {
    if (Sound.masterVolume === 0) {
      return
    }

    this.audio.volume = Sound.VOLUME * Sound.masterVolume
    this.audio.pause()
    this.audio.currentTime = 0
    this.audio.play().catch(() => {
      // The browser refuses to play until the user has interacted with the page
    })
  }
}
