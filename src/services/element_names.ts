/**
 * What the player calls each kind of element that has a pictogram, in
 * sentence case: the names the chamber sign reads aloud and a hint shows as
 * its title. Steel, a blocked wall no link reaches, is a blocked wall here.
 */
import type {PictogramKind} from '@/components/element_pictogram.vue'

export const ELEMENT_NAMES: Readonly<Record<PictogramKind, string>> = {
  box: 'Box',
  button: 'Button',
  switch: 'Switch',
  door: 'Door',
  arrow: 'Arrow',
  slideFloor: 'Slide floor',
  ditch: 'Ditch',
  blockedWall: 'Blocked wall',
  laser: 'Laser',
  fizzler: 'Fizzler',
  lightBarrier: 'Light barrier',
  emitter: 'Emitter',
  receiver: 'Receiver',
  mirrorBox: 'Mirror box',
}
