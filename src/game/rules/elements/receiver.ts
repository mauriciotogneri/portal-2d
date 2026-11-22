import type {ReceiverData} from '@/game/chamber_data'
import {GameEvent} from '@/game/game_event'
import {defineElement} from '@/game/rules/element_definition'
import type {StateDraft} from '@/game/rules/state_draft'

/**
 * Judges a receiver in every pass, after the buttons: lit while a ray
 * reaches its listening face, on the rays traced after every change made
 * before it in the step, not once per pass, so a receiver listed after
 * another sees in the same pass what that one's links changed. Lighting or
 * going dark, it reports it and runs its links, as a button does going down
 * and coming up: each element it links is unblocked while every button,
 * switch and receiver linking it is active, and blocked otherwise.
 * @param draft - The step's state
 * @param index - The receiver's index in the chamber's receiver list
 */
function judgeReceiver(draft: StateDraft, index: number): void {
  const lit = draft.rays.litReceivers[index] === true

  if (draft.setReceiverLit(index, lit)) {
    draft.emit(lit ? GameEvent.RECEIVER_LIT : GameEvent.RECEIVER_UNLIT)
    draft.applyLinks('receiver', index)
  }
}

/** A receiver, a wall tile of its own lit while a ray reaches its listening face, which is when it is active, as a button held down: an element it links (directly or through a link group) is unblocked while it and every other button, switch and receiver linking it are active; it stops walking and shots by being a wall, which the step reads apart, and takes no portal on any face */
export const RECEIVER_ELEMENT = defineElement<ReceiverData>()({
  kind: 'receiver',
  fileKey: 'receivers',
  count: 'many',
  sitsOn: 'wall',
  layer: 'blockers',
  linkable: false,
  defaultBlocked: null,
  blocksWalking: 'always',
  blocksShots: 'always',
  stopsShootingFrom: 'never',
  takesPortals: 'never',
  blocksRays: 'never',
  reactsToSubject: false,
  continuesMovement: false,
  events: [
    GameEvent.RECEIVER_LIT,
    GameEvent.RECEIVER_UNLIT,
  ],
  hooks: {
    everyPass: judgeReceiver,
  },
})
