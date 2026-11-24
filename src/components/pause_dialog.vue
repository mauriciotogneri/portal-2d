<script setup lang="ts">
/**
 * Opened with Escape inside a chamber: continue, open the settings, restart or exit.
 */
import DialogFrame from '@/components/dialog_frame.vue'

const emit = defineEmits<{
  continue: []
  settings: []
  reset: []
  exit: []
}>()
</script>

<template>
  <DialogFrame title="Paused" tone="interaction">
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
