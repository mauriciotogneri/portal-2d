<script setup lang="ts">
/**
 * The pause menu's Settings: the sound effects and music volumes, as the home
 * menu lists them under Settings, then Done. Up and Down move between the
 * volumes and Done, and Left and Right on a volume turn it down or up, down to
 * Off. Escape is left to the screen, which goes back to the pause menu.
 */
import {ref} from 'vue'
import DialogFrame from '@/components/dialog_frame.vue'
import VolumeRow from '@/components/volume_row.vue'
import {AUDIO_VOLUMES} from '@/services/settings'

const emit = defineEmits<{
  close: []
}>()

const focusedVolume = ref<number | null>(null) // The volume whose row has the keyboard, by index, or null
</script>

<template>
  <DialogFrame title="Settings" tone="interaction" layout="stack" wide>
    <p>Left and Right change a volume; at 0 it is off.</p>
    <template #actions>
      <ul class="settings-dialog-list">
        <li v-for="(setting, index) in AUDIO_VOLUMES" :key="setting.label">
          <VolumeRow
            v-model="setting.volume.value"
            class="settings-dialog-row"
            :class="{
              'menu-row-active': focusedVolume === index,
            }"
            :label="setting.label"
            @focus="focusedVolume = index"
            @blur="focusedVolume = null"
          />
        </li>
      </ul>
      <button class="button button-interaction" type="button" @click="emit('close')">Done</button>
    </template>
  </DialogFrame>
</template>

<style scoped>
/* The rows as in the home menu, closer together, as in the custom controls dialog */
.settings-dialog-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 0 -1rem 0.5rem;
}

.settings-dialog-row {
  min-height: 3rem;
  padding: 0.375rem 1rem;
}

.settings-dialog-row :deep(.menu-row-label) {
  font-size: 1.625rem;
}

/* The pointer's row gets the faint bar the menu gives a chosen row */
.settings-dialog-row:hover:not(.menu-row-active) {
  background: rgba(var(--color-ink-rgb), 0.14);
}
</style>
