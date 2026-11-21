<script setup lang="ts">
/**
 * One volume in a menu: a row with its name and, at its right edge, a ramp of
 * bars rising like a volume wedge, one per step, lit up to the volume, then
 * the volume in sign numerals, or Off at 0, the only way to turn the sound
 * off. Left and Right step it down or up, clicking once the change has been
 * applied, so the click is heard at the new sound effects volume; a press or
 * drag on the bars sets it, and a press just left of them turns it off. Enter,
 * Space and a click on the name do nothing. Screen readers hear it as a slider.
 */
import {computed, nextTick, useId, useTemplateRef} from 'vue'
import {Sound} from '@/game/sound'
import {setVolume, VOLUME_MAX, VOLUME_STEP} from '@/services/settings'

export interface VolumeRowProps {
  label: string // The volume's name, such as "Music"
}

defineProps<VolumeRowProps>()

const volume = defineModel<number>({
  required: true,
})

const STEPS = VOLUME_MAX / VOLUME_STEP // Bars in the ramp, one per step

const labelId = useId()
const bars = useTemplateRef<HTMLElement>('bars')

// How many bars are lit, and the readout: the volume, or Off at 0
const litBars = computed(() => volume.value / VOLUME_STEP)
const readout = computed(() => volume.value === 0 ? 'Off' : String(volume.value))

/**
 * Sets the volume, kept within its range, with a click once the change has
 * been applied. Does nothing, silently, when the volume is already there.
 * @param next - The volume asked for
 */
function changeVolume(next: number): void {
  if (setVolume(volume, next)) {
    void nextTick(() => {
      Sound.MENU_MOVE.play()
    })
  }
}

/**
 * Left and Right step the volume down or up, held keys repeating. They are
 * kept from the menu and the dialogs, where Left would step back.
 * @param event - Keyboard event
 */
function handleKeydown(event: KeyboardEvent): void {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return
  }
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  changeVolume(volume.value + (event.key === 'ArrowRight' ? VOLUME_STEP : -VOLUME_STEP))
}

/**
 * Sets the volume from where the pointer is over the bars: a bar's own step
 * anywhere on it or the gap before it, and off anywhere left of the first bar.
 * @param clientX - The pointer's distance from the window's left edge, in page pixels
 */
function setVolumeAt(clientX: number): void {
  if (bars.value === null) {
    return
  }
  const rect = bars.value.getBoundingClientRect()
  const fraction = (clientX - rect.left) / rect.width
  changeVolume(Math.ceil(fraction * STEPS) * VOLUME_STEP)
}

/**
 * Starts setting the volume with the main button, following the pointer
 * until it is let go.
 * @param event - Pointer event
 */
function handlePointerDown(event: PointerEvent): void {
  if (event.button !== 0 || !(event.currentTarget instanceof HTMLElement)) {
    return
  }
  event.currentTarget.setPointerCapture(event.pointerId)
  setVolumeAt(event.clientX)
}

/**
 * Follows a drag along the bars.
 * @param event - Pointer event
 */
function handlePointerMove(event: PointerEvent): void {
  if (event.currentTarget instanceof HTMLElement && event.currentTarget.hasPointerCapture(event.pointerId)) {
    setVolumeAt(event.clientX)
  }
}
</script>

<template>
  <!-- The click is kept from a dialog, which would play its accept click for a row that presses nothing -->
  <button
    class="volume-row menu-row"
    :class="{
      'volume-row-off': volume === 0,
    }"
    type="button"
    role="slider"
    :aria-labelledby="labelId"
    aria-valuemin="0"
    :aria-valuemax="VOLUME_MAX"
    :aria-valuenow="volume"
    :aria-valuetext="volume === 0 ? 'Off' : `${volume}%`"
    @keydown="handleKeydown"
    @click.stop
  >
    <span :id="labelId" class="menu-row-label">{{ label }}</span>
    <span class="volume-control" aria-hidden="true">
      <span
        class="volume-ramp"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
      >
        <span ref="bars" class="volume-bars">
          <span
            v-for="bar in STEPS"
            :key="bar"
            class="volume-bar"
            :class="{
              'volume-bar-lit': bar <= litBars,
            }"
            :style="{
              height: `${0.5 + (bar - 1) * 0.125}rem`,
            }"
          ></span>
        </span>
      </span>
      <span class="volume-readout">{{ readout }}</span>
    </span>
  </button>
</template>

<style scoped>
/* Ramp and readout at the row's right edge */
.volume-control {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.75rem;
}

/* The press area reaches into the gap before the first bar, where a press turns the volume off,
   without taking any room from the row's name */
.volume-ramp {
  display: flex;
  align-items: flex-end;
  height: 1.625rem;
  margin-left: -0.75rem;
  padding-left: 0.75rem;
  cursor: pointer;
}

.volume-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.1875rem;
}

/* Unlit: an empty frame on the wall */
.volume-bar {
  width: 0.4375rem;
  border: 1px solid rgba(var(--color-ink-rgb), 0.28);
  background: rgba(var(--color-white-rgb), 0.5);
}

/* Lit in the blue of the layout lamp in use */
.volume-bar-lit {
  border-color: var(--color-blue-deep);
  background: var(--color-blue);
}

/* On the dark bar of the row with the keyboard */
.menu-row-active .volume-bar {
  border-color: rgba(var(--color-white-rgb), 0.6);
  background: transparent;
}

.menu-row-active .volume-bar-lit {
  border-color: var(--color-blue);
  background: var(--color-blue);
}

/* The volume in sign numerals, wide enough for 100 and Off, so the ramp never shifts */
.volume-readout {
  min-width: 2.75rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.06em;
  text-align: right;
  text-transform: uppercase;
}

.volume-row-off .volume-readout {
  color: var(--color-ink-muted);
}

.menu-row-active .volume-readout {
  color: var(--color-white);
}

.menu-row-active.volume-row-off .volume-readout {
  color: rgba(var(--color-white-rgb), 0.75);
}
</style>
