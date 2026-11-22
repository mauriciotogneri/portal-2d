<script setup lang="ts">
/**
 * A chamber list in the home menu that scrolls on its own, so the logo, the
 * sections and the map stay put. It takes the height its column leaves it,
 * no less than three rows (below that the page scrolls instead). At an edge
 * with more rows beyond it, the rows fade out over half a row, and a thin
 * rule in the gap to its right shows the part of the list in view, darker
 * while the list has the keyboard and hidden when the list fits; the
 * browser's own scrollbar is hidden. The rows come from the slot. Reveal
 * keeps one more row in view beyond a row, gliding there unless motion is
 * reduced; a wheel turn stops the glide. Nothing else scrolls it but the
 * wheel, a trackpad and the browser's own focus.
 */
import {onBeforeUnmount, onMounted, ref, useTemplateRef} from 'vue'

export interface ChamberScrollerProps {
  active: boolean // Whether the list has the keyboard, which darkens its rule
}

defineProps<ChamberScrollerProps>()

const FADE_ROWS = 0.5 // How far the rows fade out at an edge with more beyond it, in rows
const KEPT_ROWS = 1 // How many more rows reveal keeps in view beyond the row it shows
const GLIDE_MS = 160 // How long reveal's glide takes

const viewport = useTemplateRef<HTMLElement>('viewport')
const thumb = useTemplateRef<HTMLElement>('thumb')
const overflowing = ref(false) // Whether the rows run past the list's height, which shows the rule

let resizeObserver: ResizeObserver | null = null // Fades the edges and places the rule again when the list changes size
let glideFrame: number | null = null // The glide's next animation frame, while one runs
let glideTarget: number | null = null // Where the running glide ends, which the next reveal starts from

/**
 * Lists the rows in the slot.
 * @returns The rows, in visual order
 */
function rowElements(): HTMLElement[] {
  return Array.from(viewport.value?.querySelectorAll<HTMLElement>('.menu-row') ?? [])
}

/**
 * Measures the distance from one row's top to the next's.
 * @param rows - The list's rows
 * @returns The distance in pixels: a row's height when there is only one, 0 with none
 */
function rowPitch(rows: HTMLElement[]): number {
  const first = rows[0]
  const second = rows[1]
  if (first === undefined) {
    return 0
  }
  if (second === undefined) {
    return first.offsetHeight
  }
  return second.getBoundingClientRect().top - first.getBoundingClientRect().top
}

/**
 * Fades the edges with more rows beyond them, the more the further the list
 * is scrolled from that edge, up to half a row, and sizes and places the
 * rule's thumb, for where the list is scrolled.
 */
function updateEdges(): void {
  const box = viewport.value
  if (box === null) {
    return
  }
  const maxScroll = box.scrollHeight - box.clientHeight
  overflowing.value = maxScroll > 0
  const fade = FADE_ROWS * rowPitch(rowElements())
  box.style.setProperty('--chamber-scroller-fade-top', `${Math.min(fade, box.scrollTop)}px`)
  box.style.setProperty('--chamber-scroller-fade-bottom', `${Math.min(fade, Math.max(maxScroll - box.scrollTop, 0))}px`)
  if (thumb.value !== null && box.scrollHeight > 0) {
    thumb.value.style.height = `${box.clientHeight * box.clientHeight / box.scrollHeight}px`
    thumb.value.style.transform = `translateY(${box.scrollTop * box.clientHeight / box.scrollHeight}px)`
  }
}

/**
 * Stops a running glide where it is.
 */
function stopGlide(): void {
  if (glideFrame !== null) {
    cancelAnimationFrame(glideFrame)
  }
  glideFrame = null
  glideTarget = null
}

/**
 * Scrolls the list to a position, at once or gliding there, eased out.
 * @param target - The position, in pixels from the list's top
 * @param glide - True to glide there, false to jump
 */
function scrollListTo(target: number, glide: boolean): void {
  const box = viewport.value
  if (box === null) {
    return
  }
  stopGlide()
  const start = box.scrollTop
  if (!glide || Math.abs(target - start) < 1) {
    box.scrollTop = target
    return
  }
  const startTime = performance.now()
  glideTarget = target
  const glideStep = (now: number): void => {
    const progress = Math.min(Math.max((now - startTime) / GLIDE_MS, 0), 1)
    box.scrollTop = start + (target - start) * (1 - (1 - progress) ** 3)
    if (progress < 1) {
      glideFrame = requestAnimationFrame(glideStep)
    } else {
      glideFrame = null
      glideTarget = null
    }
  }
  glideFrame = requestAnimationFrame(glideStep)
}

/**
 * Scrolls the list just enough to show a row with one more row beyond it on
 * the side it is nearest leaving by, or as far as the list goes. Leaves the
 * list where it is (or where its glide ends) when that already shows.
 * @param index - The row's index in the list
 * @param glide - True to glide there, unless motion is reduced; false to jump
 */
function reveal(index: number, glide: boolean): void {
  const box = viewport.value
  const rows = rowElements()
  const row = rows[index]
  if (box === null || row === undefined) {
    return
  }
  const margin = KEPT_ROWS * rowPitch(rows)
  const rowTop = row.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
  const rowBottom = rowTop + row.offsetHeight
  let target = glideTarget ?? box.scrollTop
  if (rowTop - margin < target) {
    target = rowTop - margin
  } else if (rowBottom + margin > target + box.clientHeight) {
    target = rowBottom + margin - box.clientHeight
  }
  target = Math.min(Math.max(target, 0), box.scrollHeight - box.clientHeight)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  scrollListTo(target, glide && !reducedMotion)
}

defineExpose({
  reveal: reveal,
})

onMounted(() => {
  const box = viewport.value
  if (box === null) {
    return
  }
  resizeObserver = new ResizeObserver(updateEdges)
  resizeObserver.observe(box)
  if (box.firstElementChild !== null) {
    resizeObserver.observe(box.firstElementChild)
  }
  updateEdges()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  stopGlide()
})
</script>

<template>
  <div class="chamber-scroller">
    <div
      ref="viewport"
      class="chamber-scroller-viewport"
      @scroll="updateEdges"
      @wheel.passive="stopGlide"
    >
      <slot></slot>
    </div>
    <div
      v-show="overflowing"
      class="chamber-scroller-rule"
      :class="{
        'chamber-scroller-rule-active': active,
      }"
      aria-hidden="true"
    >
      <div ref="thumb" class="chamber-scroller-thumb"></div>
    </div>
  </div>
</template>

<style scoped>
/* Takes the height its column leaves it, down to three rows, below which the page scrolls instead */
.chamber-scroller {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  min-height: calc(3 * var(--menu-row-height) + 2 * var(--menu-row-gap, 0.25rem));
}

/* The rows scroll here, under a mask that fades each edge with more rows beyond it (the script sets
   how far); the rule stands in for the scrollbar */
.chamber-scroller-viewport {
  flex: 0 1 auto;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
  mask-image: linear-gradient(
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 1) var(--chamber-scroller-fade-top, 0px),
    rgba(0, 0, 0, 1) calc(100% - var(--chamber-scroller-fade-bottom, 0px)),
    rgba(0, 0, 0, 0) 100%
  );
}

/* A focus ring inside the row, where the list's edges can't cut it off (high-contrast mode paints it) */
.chamber-scroller-viewport :deep(.menu-row:focus-visible) {
  outline-offset: -0.1875rem;
}

/* The rule in the gap to the list's right, like the changelog's: its thumb marks the part of the list in view */
.chamber-scroller-rule {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(100% + 1.25rem);
  width: 0.25rem;
  background: rgba(var(--color-ink-rgb), 0.14);
}

.chamber-scroller-thumb {
  width: 100%;
  background: rgba(var(--color-ink-rgb), 0.35);
  transition: background-color 90ms ease;
}

/* Darker while the list has the keyboard, like a row's bar */
.chamber-scroller-rule-active .chamber-scroller-thumb {
  background: rgba(var(--color-ink-rgb), 0.5);
}
</style>
