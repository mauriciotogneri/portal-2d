/**
 * The tutorial hints, by campaign chamber (docs/hints.md): which hints a
 * chamber has, the element each explains, the tile it lights, what sets it
 * off and what it says. Kept outside the chamber files, keyed by each
 * chamber's permanent id, so the chambers and their recorded solutions stay
 * untouched. The engine scripts read it under Node too
 * (scripts/check_chambers.ts), so it uses nothing of Vite's or Vue's.
 */
import type {PositionData} from '@/game/chamber_data'
import type {GameEvent} from '@/game/game_event'
import type {ElementKind} from '@/game/rules/element_registry'
import type {ChamberEntry} from '@/services/chamber_catalogue'

/** The kinds of element a hint can explain: every kind in the registry but walls and the exit */
export type HintElement = Exclude<ElementKind, 'wall' | 'exit'>

/**
 * What sets a hint off: the subject standing on a tile after a step, or the
 * chamber clock reaching a number of seconds.
 */
export type HintTrigger = PositionData | {
  readonly seconds: number // Of the chamber clock, which counts from the first move, portal shot or interact and stops while paused or while a hint shows
}

/** One tutorial hint of a chamber. */
export type Hint = {
  readonly id: string // Permanent, unique within its chamber and never reused: it is stored once seen and sent to analytics
  readonly element: HintElement // The element the hint explains
  readonly tile: PositionData // The tile lit, the element's own: a box's start tile for a box
  readonly trigger: HintTrigger // What sets it off; a trigger tile may differ from the lit tile
  readonly cancelledBy?: GameEvent // A game event that, once it has happened in the attempt, keeps the hint from showing; a timer hint must name one
  readonly text: string // What the hint says, in sentence case, as short as will do
}

/** Each campaign chamber's hints, in the order they show when one step sets off several, by the chamber's permanent id */
export const CHAMBER_HINTS: Readonly<Record<number, readonly Hint[]>> = {
  // Chamber 1 (id 1), where the ditch and steel are first met; neither lit tile lines up with a plain wall
  1: [
    {
      id: 'ditch',
      element: 'ditch',
      tile: {
        x: 4,
        y: 1,
      },
      trigger: {
        seconds: 10,
      },
      cancelledBy: 'crossed',
      text: 'A ditch stops you, but not your shots.',
    },
    {
      id: 'steel',
      element: 'blockedWall',
      tile: {
        x: 2,
        y: 4,
      },
      trigger: {
        seconds: 20,
      },
      cancelledBy: 'crossed',
      text: 'Portals can\'t open on blocked walls.',
    },
  ],
  // Chamber 3 (id 3), the first chamber where interact does anything; the first press towards the exit presses the button, so no button event can cancel its hint
  3: [
    {
      id: 'button',
      element: 'button',
      tile: {
        x: 3,
        y: 2,
      },
      trigger: {
        x: 5,
        y: 2,
      },
      cancelledBy: 'boxPutDown',
      text: 'A button opens its door while something stands on it.',
    },
    {
      id: 'box',
      element: 'box',
      tile: {
        x: 5,
        y: 1,
      },
      trigger: {
        seconds: 10,
      },
      cancelledBy: 'boxPickedUp',
      text: 'Press interact to pick up a box, and again to put it down.',
    },
  ],
}

/**
 * A chamber's hints, in order.
 * @param chamber - The campaign chamber
 * @returns Its hints; none when it has none
 */
export function findHints(chamber: ChamberEntry): readonly Hint[] {
  return CHAMBER_HINTS[chamber.id] ?? []
}
