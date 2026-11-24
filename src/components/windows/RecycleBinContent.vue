<script setup>
import { ref } from 'vue'
import PixelIcon from '../PixelIcon.vue'

const taps = ref(0)
function poke() {
  taps.value += 1
}
</script>

<template>
  <div style="text-align: center; padding: 12px 8px">
    <button
      type="button"
      style="background: transparent; border: none; box-shadow: none"
      @click="poke"
    >
      <PixelIcon name="recycle" :size="72" />
    </button>
    <p class="org">The Recycle Bin is empty.</p>
    <p class="muted">Nothing has been thrown away.</p>
    <p v-if="taps >= 3" class="tagline">Still looking? The good stuff is still on the desktop.</p>
  </div>
</template>
