<script setup>
import { ref } from 'vue'
import PixelIcon from './PixelIcon.vue'

const open = ref(true)
const lines = [
  '歡迎來到 Chan Hoi On 的桌面！我是原創小助手 PlusKit。',
  '按左邊的圖示，或從「開始」打開視窗吧～',
  '有事可以用電郵或 LinkedIn 找主人喔。',
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
