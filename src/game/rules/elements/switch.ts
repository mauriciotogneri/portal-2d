import type {TriggerData} from '@/game/chamber_data'
import {GameEvent} from '@/game/game_event'
import {defineElement} from '@/game/rules/element_definition'
import type {StateDraft} from '@/game/rules/state_draft'

/**
 * Uses a switch with the interact key: refused while the subject carries a
 * box, otherwise it reports it, marks the switch used, which it stays until
 * the chamber is loaded again, and runs its links, every time: each element
 * it links is unblocked while every button, switch and receiver linking it
 * is active, so a linked box goes back to its start on each use while they
 * all are.
 * @param draft - The step's state
 * @param index - The switch's index in the chamber's switch list
 * @returns Always true: on a switch, the interact key does nothing else
 */
function useSwitch(draft: StateDraft, index: number): boolean {
  if (draft.isCarrying) {
    draft.emit(GameEvent.REFUSED)
  } else {
    draft.emit(GameEvent.SWITCH_USED)
    draft.markSwitchUsed(index)
    draft.applyLinks('switch', index)
  }

  return true
}

/** A switch on the floor, used with the interact key, active from its first use until the chamber is loaded again: an element it links (directly or through a link group) is unblocked while it and every other button, switch and receiver linking it are active */
export const SWITCH_ELEMENT = defineElement<TriggerData>()({
  kind: 'switch',
  fileKey: 'switches',
  count: 'many',
  sitsOn: 'floor',
  layer: 'fixtures',
  linkable: false,
  defaultBlocked: null,
  blocksWalking: 'never',
  blocksShots: 'never',
  stopsShootingFrom: 'never',
  takesPortals: 'never',
  blocksRays: 'never',
  reactsToSubject: false,
  continuesMovement: false,
  events: [GameEvent.SWITCH_USED],
  hooks: {
    interact: useSwitch,
  },
})
