<script setup>
import { ref } from 'vue'
import PixelIcon from './PixelIcon.vue'

const open = ref(true)
const lines = [
  'Welcome to Chan Hoi On\'s desktop! I\'m PlusKit, the original little helper here.',
  'Click the icons on the left, or open a window from the Start menu.',
  'You can reach the owner by email or LinkedIn.',
]
const index = ref(0)

function poke() {
  open.value = true
  index.value = (index.value + 1) % lines.length
}
</script>

<template>
  <div class="mascot-dock">
    <div v-if="open" class="mascot-bubble">
      {{ lines[index] }}
    </div>
    <button class="mascot-btn" type="button" title="PlusKit" @click="poke">
      <PixelIcon name="pluskit" :size="64" />
    </button>
  </div>
</template>
