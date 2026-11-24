<script setup>
import { ref } from 'vue'
import PixelIcon from './PixelIcon.vue'

const faces = [
  { icon: 'ame', label: 'Smile', line: "Hi! I'm Ame-chan. Welcome to Chan Hoi On's desktop." },
  { icon: 'kangel', label: 'Happy', line: 'Click the icons on the left, or open a window from the Start menu.' },
  { icon: 'icon_status_follower', label: 'Sparkle', line: 'You can reach the owner by email or LinkedIn.' },
  { icon: 'icon_status_love', label: 'Love', line: 'Thanks for visiting. The owner is passionate about AI engineering.' },
  { icon: 'icon_status_stress', label: 'Stress', line: "Don't stress the computer. I'll get sleepy too." },
  { icon: 'ame_black', label: 'Sleepy', line: 'The lights are low. Shut Down is in the Start menu.' },
]
const open = ref(true)
const index = ref(0)

function poke() {
  open.value = true
  index.value = (index.value + 1) % faces.length
}

function pick(i) {
  open.value = true
  index.value = i
}
</script>

<template>
  <div class="mascot-dock">
    <div v-if="open" class="mascot-bubble">
      {{ faces[index].line }}
    </div>
    <div class="mascot-moods" role="group" aria-label="Ame-chan expressions">
      <button
        v-for="(face, i) in faces"
        :key="face.icon"
        type="button"
        :title="face.label"
        :aria-label="face.label"
        :class="{ 'is-on': i === index }"
        @click="pick(i)"
      >
        <PixelIcon :name="face.icon" :size="28" />
      </button>
    </div>
    <button class="mascot-btn" type="button" title="Ame-chan" @click="poke">
      <PixelIcon :name="faces[index].icon" :size="80" />
    </button>
  </div>
</template>
