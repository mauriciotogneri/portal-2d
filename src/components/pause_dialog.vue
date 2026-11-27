<script setup lang="ts">
/**
 * Opened with Escape inside a chamber: continue, open the settings, restart or exit.
 * Continue takes focus, but on coming back from the settings or a confirmation,
 * where the action that opened it does.
 */
import DialogFrame from '@/components/dialog_frame.vue'

export type PauseAction = 'continue' | 'settings' | 'reset' | 'exit'

export interface PauseDialogProps {
  focusedAction?: PauseAction // The action that takes focus when the menu opens
}

// The actions in the order the menu lists them
const PAUSE_ACTIONS: readonly PauseAction[] = [
  'continue',
  'settings',
  'reset',
  'exit',
]

const props = withDefaults(defineProps<PauseDialogProps>(), {
  focusedAction: 'continue',
})

const emit = defineEmits<{
  continue: []
  settings: []
  reset: []
  exit: []
}>()
</script>

<template>
  <DialogFrame title="Paused" tone="interaction" :initial-action="PAUSE_ACTIONS.indexOf(props.focusedAction)">
    <template #actions>
      <button class="button button-interaction" type="button" @click="emit('continue')">
        Continue
        <span class="action-hint">Esc</span>
      </button>
      <button class="button button-quiet" type="button" aria-haspopup="dialog" @click="emit('settings')">Settings</button>
      <button class="button button-quiet" type="button" @click="emit('reset')">Restart chamber</button>
      <button class="button button-quiet" type="button" @click="emit('exit')">Exit chamber</button>
    </template>
  </DialogFrame>
</template>
