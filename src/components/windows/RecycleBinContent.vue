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
      <PixelIcon name="recycle" :size="64" />
    </button>
    <p class="org">回收筒是空的。</p>
    <p class="muted">什麼都沒有被丟棄。</p>
    <p v-if="taps >= 3" class="tagline">還想找出什麼嗎？夢想都還在桌面上喔。</p>
  </div>
</template>
