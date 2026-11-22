import type {TriggerData} from '@/game/chamber_data'
import {GameEvent} from '@/game/game_event'
import {defineElement} from '@/game/rules/element_definition'
import type {StateDraft} from '@/game/rules/state_draft'

/**
 * Judges a button in every pass: held down while the subject or any box is
 * on its tile. Going down or coming up, it reports it and runs its links:
 * each element it links is unblocked while every button, switch and
 * receiver linking it is active, and blocked otherwise.
 * @param draft - The step's state
 * @param index - The button's index in the chamber's button list
 */
function judgeButton(draft: StateDraft, index: number): void {
  const position = draft.chamber.positionOf('button', index)
  const held = draft.isSubjectAt(position.x, position.y) || draft.hasBoxAt(position.x, position.y)

  if (draft.setButtonPressed(index, held)) {
    draft.emit(held ? GameEvent.BUTTON_PRESSED : GameEvent.BUTTON_RELEASED)
    draft.applyLinks('button', index)
  }
}

/** A floor button, held down while the subject or a box is on it, which is when it is active: an element it links (directly or through a link group) is unblocked while it and every other button, switch and receiver linking it are active */
export const BUTTON_ELEMENT = defineElement<TriggerData>()({
  kind: 'button',
  fileKey: 'buttons',
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
  reactsToSubject: true,
  continuesMovement: false,
  events: [
    GameEvent.BUTTON_PRESSED,
    GameEvent.BUTTON_RELEASED,
  ],
  hooks: {
    everyPass: judgeButton,
  },
})
