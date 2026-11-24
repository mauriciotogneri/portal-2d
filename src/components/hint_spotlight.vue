<script setup lang="ts">
/**
 * A tutorial hint over the chamber screen (docs/hints.md): the whole window
 * darkened but one tile, white brackets round that tile, and a card beside it
 * with the element's pictogram and name, the hint's text and a Continue
 * button, joined to the tile by a line. The card goes on the side of the tile
 * with the most room on the stage, whole on it and never over the tile. Only
 * a fresh Enter or a click on Continue presses it, and only once the hint has
 * shown for half a second; Space and Tab do nothing, and Escape is left to
 * the screen. Pressing shows Continue pressed, fades everything out, then
 * tells the screen.
 */
import {computed, onBeforeUnmount, onMounted, ref, useId, useTemplateRef} from 'vue'
import ElementPictogram from '@/components/element_pictogram.vue'
import type {PictogramKind} from '@/components/element_pictogram.vue'
import {Sound} from '@/game/sound'

/** A rectangle on the page, in page pixels from the window's top left corner. */
export type PageRect = {
  left: number
  top: number
  width: number
  height: number
}

/** Which side of the lit tile the card is on. */
type CardSide = 'left' | 'right' | 'above' | 'below'

/** The card's size on the page, in page pixels. */
type CardSize = {
  width: number
  height: number
}

/** Where the card and the line joining it to the tile go, in page pixels. */
type Placement = {
  side: CardSide // The side of the tile the card is on
  cardLeft: number
  cardTop: number
  lineStartX: number // On the card's edge facing the tile
  lineStartY: number
  lineEndX: number // Short of the brackets, where the dot is
  lineEndY: number
}

export interface HintSpotlightProps {
  kind: PictogramKind // The element the hint is about, whose pictogram the card shows
  title: string // The element's name
  text: string // What the hint says
  tile: PageRect // The lit tile, the element's own
  stage: PageRect // The dark area holding the chamber, which the card stays inside
}

const props = defineProps<HintSpotlightProps>()

const emit = defineEmits<{
  continue: []
}>()

const CARD_GAP = 48 // Page pixels between the card and the lit tile
const STAGE_MARGIN = 16 // Page pixels the card keeps from the stage's edges
const BRACKET_OUTSET = 3 // Page pixels the brackets' box reaches past the tile on each side
const LINE_GAP = 6 // Page pixels the joining line stops short of the brackets
const DOT_RADIUS = 3.5 // The joining line's end dot, in page pixels
const SLIDE = 10 // Page pixels the card slides in from, away from the tile
const GUARD_TIME = 500 // Milliseconds after the hint opens during which every key and click is ignored
const PRESSED_TIME = 200 // Milliseconds Continue shows pressed before the hint fades out
const FADE_OUT_TIME = 160 // Milliseconds the hint takes to fade out, as its style animates it

const titleId = useId()
const textId = useId()
const card = useTemplateRef<HTMLElement>('card')
const continueButton = useTemplateRef<HTMLButtonElement>('continueButton')
const cardSize = ref<CardSize | null>(null) // Measured once mounted; the card's width is fixed and its text doesn't change
const pressed = ref(false) // Whether Continue has been pressed, which shows it pressed and ignores every later press
const closing = ref(false) // Whether everything is fading out

let openedAt = 0 // When the hint opened, in milliseconds on the performance clock
let closeTimer: number | null = null // The pending timeout of the pressed moment or the fade-out

const placement = computed<Placement>(() => placeCard(props.tile, props.stage, cardSize.value ?? {
  width: 0,
  height: 0,
}))

const cardStyle = computed(() => {
  const side = placement.value.side
  return {
    'left': `${placement.value.cardLeft}px`,
    'top': `${placement.value.cardTop}px`,
    '--slide-x': `${(side === 'left') ? -SLIDE : (side === 'right') ? SLIDE : 0}px`,
    '--slide-y': `${(side === 'above') ? -SLIDE : (side === 'below') ? SLIDE : 0}px`,
  }
})

const lightStyle = computed(() => ({
  left: `${props.tile.left}px`,
  top: `${props.tile.top}px`,
  width: `${props.tile.width}px`,
  height: `${props.tile.height}px`,
}))

const bracketsStyle = computed(() => ({
  left: `${props.tile.left - BRACKET_OUTSET}px`,
  top: `${props.tile.top - BRACKET_OUTSET}px`,
  width: `${props.tile.width + 2 * BRACKET_OUTSET}px`,
  height: `${props.tile.height + 2 * BRACKET_OUTSET}px`,
}))

/**
 * Keeps a value between two bounds, the lower one winning when they cross.
 * @param value - The value
 * @param lowest - The lowest it may be
 * @param highest - The highest it may be
 * @returns The value, moved inside the bounds
 */
function clamp(value: number, lowest: number, highest: number): number {
  return Math.max(Math.min(value, highest), lowest)
}

/**
 * Picks the side of the tile for the card: left or right, whichever has more
 * room, when the card fits there; otherwise above or below, likewise; when it
 * fits nowhere, the side where the least of it is off the stage.
 * @param spare - The room each side leaves once the card and its gap are in, in page pixels; negative when it doesn't fit
 * @returns The side
 */
function chooseSide(spare: Readonly<Record<CardSide, number>>): CardSide {
  const across: CardSide = (spare.left >= spare.right) ? 'left' : 'right'
  if (spare[across] >= 0) {
    return across
  }
  const along: CardSide = (spare.above >= spare.below) ? 'above' : 'below'
  if (spare[along] >= 0) {
    return along
  }
  return (spare[across] >= spare[along]) ? across : along
}

/**
 * Places the card beside the tile, its middle level with the tile's middle,
 * moved along that side only as far as keeps it whole on the stage, and the
 * joining line straight from the card's edge to just short of the brackets.
 * @param tile - The lit tile
 * @param stage - The area the card stays inside
 * @param size - The card's size
 * @returns Where the card and the line go
 */
function placeCard(tile: PageRect, stage: PageRect, size: CardSize): Placement {
  const tileRight = tile.left + tile.width
  const tileBottom = tile.top + tile.height
  const tileMiddleX = tile.left + tile.width / 2
  const tileMiddleY = tile.top + tile.height / 2
  const lowestLeft = stage.left + STAGE_MARGIN
  const highestLeft = stage.left + stage.width - STAGE_MARGIN - size.width
  const lowestTop = stage.top + STAGE_MARGIN
  const highestTop = stage.top + stage.height - STAGE_MARGIN - size.height
  const lineReach = BRACKET_OUTSET + LINE_GAP
  const side = chooseSide({
    left: tile.left - CARD_GAP - size.width - lowestLeft,
    right: highestLeft - tileRight - CARD_GAP,
    above: tile.top - CARD_GAP - size.height - lowestTop,
    below: highestTop - tileBottom - CARD_GAP,
  })
  switch (side) {
    case 'left':
    case 'right': {
      const cardLeft = (side === 'left') ? tile.left - CARD_GAP - size.width : tileRight + CARD_GAP
      return {
        side: side,
        cardLeft: cardLeft,
        cardTop: clamp(tileMiddleY - size.height / 2, lowestTop, highestTop),
        lineStartX: (side === 'left') ? cardLeft + size.width : cardLeft,
        lineStartY: tileMiddleY,
        lineEndX: (side === 'left') ? tile.left - lineReach : tileRight + lineReach,
        lineEndY: tileMiddleY,
      }
    }
    case 'above':
    case 'below': {
      const cardTop = (side === 'above') ? tile.top - CARD_GAP - size.height : tileBottom + CARD_GAP
      return {
        side: side,
        cardLeft: clamp(tileMiddleX - size.width / 2, lowestLeft, highestLeft),
        cardTop: cardTop,
        lineStartX: tileMiddleX,
        lineStartY: (side === 'above') ? cardTop + size.height : cardTop,
        lineEndX: tileMiddleX,
        lineEndY: (side === 'above') ? tile.top - lineReach : tileBottom + lineReach,
      }
    }
  }
}

/**
 * Presses Continue, once, after the hint's first half second: plays the
 * accept sound, shows it pressed, fades everything out, then tells the
 * screen. With reduced motion it tells the screen at once.
 */
function press(): void {
  if (pressed.value || (performance.now() - openedAt < GUARD_TIME)) {
    return
  }
  pressed.value = true
  Sound.MENU_ACCEPT.play()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    emit('continue')
    return
  }
  closeTimer = window.setTimeout(() => {
    closing.value = true
    closeTimer = window.setTimeout(() => {
      closeTimer = null
      emit('continue')
    }, FADE_OUT_TIME)
  }, PRESSED_TIME)
}

/**
 * Enter presses Continue, unless it is a held key's repeat; the browser's own
 * press of the focused button is stopped, so it counts once. Space never
 * presses it, being the default interact key, and Tab keeps focus on it.
 * Every other key is left alone: the game is paused, and Escape is the
 * screen's.
 * @param event - Keyboard event, anywhere in the window
 */
function handleKeydown(event: KeyboardEvent): void {
  switch (event.key) {
    case 'Enter':
      event.preventDefault()
      if (!event.repeat) {
        press()
      }
      break
    case ' ':
    case 'Tab':
      event.preventDefault()
      break
  }
}

/**
 * Stops Space pressing the focused button as it goes up, which is when a
 * button reacts to it.
 * @param event - Keyboard event, anywhere in the window
 */
function handleKeyup(event: KeyboardEvent): void {
  if (event.key === ' ') {
    event.preventDefault()
  }
}

onMounted(() => {
  openedAt = performance.now()
  const cardElement = card.value
  if (cardElement !== null) {
    cardSize.value = {
      width: cardElement.offsetWidth,
      height: cardElement.offsetHeight,
    }
  }
  continueButton.value?.focus()
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
  if (closeTimer !== null) {
    window.clearTimeout(closeTimer)
    closeTimer = null
  }
})
</script>

<template>
  <!-- A press anywhere keeps focus on Continue, and clicks off the card do nothing -->
  <div
    class="hint-spotlight"
    :class="{
      'hint-spotlight-closing': closing,
    }"
    @mousedown.prevent
  >
    <div class="hint-light" :style="lightStyle"></div>
    <div class="hint-brackets" :style="bracketsStyle">
      <span class="hint-bracket hint-bracket-top-left"></span>
      <span class="hint-bracket hint-bracket-top-right"></span>
      <span class="hint-bracket hint-bracket-bottom-left"></span>
      <span class="hint-bracket hint-bracket-bottom-right"></span>
    </div>
    <svg class="hint-line" aria-hidden="true">
      <line :x1="placement.lineStartX" :y1="placement.lineStartY" :x2="placement.lineEndX" :y2="placement.lineEndY" />
      <circle :cx="placement.lineEndX" :cy="placement.lineEndY" :r="DOT_RADIUS" />
    </svg>
    <section
      ref="card"
      class="hint-card"
      :style="cardStyle"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      :aria-describedby="textId"
    >
      <div class="hint-head">
        <span class="hint-pictogram">
          <ElementPictogram :kind="kind" />
        </span>
        <h2 :id="titleId" class="hint-title">{{ title }}</h2>
      </div>
      <p :id="textId" class="hint-text">{{ text }}</p>
      <button
        ref="continueButton"
        class="button button-interaction hint-continue"
        :class="{
          'hint-continue-pressed': pressed,
        }"
        type="button"
        @click="press"
      >
        Continue
        <span class="action-hint">Enter</span>
      </button>
    </section>
  </div>
</template>

<style scoped>
/* ============================================
   The spotlight
   ============================================ */

/* Over the whole window, rail included, as the dialogs' backdrop is, clipping the darkening's
   reach; it fades out as one once Continue has shown pressed */
.hint-spotlight {
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
}

.hint-spotlight-closing {
  animation: hint-fade-out 160ms ease both;
}

/* A box exactly over the lit tile, whose shadow darkens everything round it */
.hint-light {
  position: absolute;
  box-shadow: 0 0 0 200vmax rgba(var(--color-ink-rgb), 0.66);
  animation: hint-fade-in 200ms linear both;
}

/* Four white corners just outside the lit tile, so it shows whole, shadowed so they read on
   light floor */
.hint-brackets {
  position: absolute;
  filter: drop-shadow(0 0 0.15rem rgba(var(--color-ink-rgb), 0.7));
  animation: hint-fade-in 180ms var(--ease-out) both;
}

.hint-bracket {
  position: absolute;
  width: 30%;
  height: 30%;
  border: 0 solid var(--color-white);
}

.hint-bracket-top-left {
  top: 0;
  left: 0;
  border-top-width: 0.1875rem;
  border-left-width: 0.1875rem;
}

.hint-bracket-top-right {
  top: 0;
  right: 0;
  border-top-width: 0.1875rem;
  border-right-width: 0.1875rem;
}

.hint-bracket-bottom-left {
  bottom: 0;
  left: 0;
  border-bottom-width: 0.1875rem;
  border-left-width: 0.1875rem;
}

.hint-bracket-bottom-right {
  right: 0;
  bottom: 0;
  border-right-width: 0.1875rem;
  border-bottom-width: 0.1875rem;
}

/* The line from the card to the tile, ending in a dot, drawn in page pixels */
.hint-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: hint-fade-in 180ms var(--ease-out) both;
}

.hint-line line {
  stroke: var(--color-white);
  stroke-width: 2;
}

.hint-line circle {
  fill: var(--color-white);
}

/* ============================================
   The card
   ============================================ */

/* A white plate in the chamber sign's frame, under the dialogs' blue band, sliding in from
   away from the tile */
.hint-card {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 22rem;
  padding: 1.25rem 1.375rem 1.375rem;
  border: 0.125rem solid var(--color-ink-muted);
  border-top: 0.375rem solid var(--color-blue);
  background: var(--color-white);
  box-shadow: 0 1rem 2.5rem rgba(var(--color-ink-rgb), 0.4);
  animation: hint-card-in 180ms var(--ease-out) both;
}

.hint-head {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

/* The sign's framed pictogram, with a fixed padding: a percentage one is taken from the row's
   width in a flex row, and the pictogram shrinks to nothing */
.hint-pictogram {
  display: block;
  flex: none;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.1875rem;
  border: 0.125rem solid var(--color-ink);
  color: var(--color-ink);
}

.hint-title {
  font-family: var(--font-display);
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.05;
}

.hint-text {
  color: var(--color-ink-muted);
}

/* Continue across the card, its key at the far end, as the pause dialog's */
.hint-continue {
  justify-content: flex-start;
  width: 100%;
}

/* Shown pressed for a moment after Enter or a click */
.hint-continue-pressed {
  background: var(--color-blue-deep);
}

@keyframes hint-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes hint-fade-out {
  to {
    opacity: 0;
  }
}

@keyframes hint-card-in {
  from {
    opacity: 0;
    transform: translate(var(--slide-x), var(--slide-y));
  }
}
</style>
