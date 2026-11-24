<script setup>
import { ref } from 'vue'
import PixelIcon from '../PixelIcon.vue'
import { profile, contactMessages } from '../../data/content.js'

const extras = ref([])
const stickers = [
  { name: 'sticker-heart', label: 'Heart' },
  { name: 'sticker-star', label: 'Star' },
  { name: 'sticker-sparkle', label: 'Sparkle' },
  { name: 'sticker-plus', label: 'Plus' },
]

function sendSticker(item) {
  extras.value.push({
    from: 'me',
    text: `(Sent a “${item.label}” sticker) Thanks, PlusKit!`,
  })
}
</script>

<template>
  <div class="chat-pane">
    <div class="chat-log">
      <div v-for="(msg, i) in contactMessages" :key="'p' + i" class="bubble">
        <div class="bubble-meta">
          <PixelIcon name="pluskit" :size="16" />
          PlusKit
        </div>
        {{ msg.text }}
      </div>
      <div class="bubble">
        <div class="bubble-meta">
          <PixelIcon name="pluskit" :size="16" />
          PlusKit
        </div>
        Here's the owner's LinkedIn and email — feel free to say hello.
      </div>
      <div v-for="(msg, i) in extras" :key="'e' + i" class="bubble me">
        {{ msg.text }}
      </div>
    </div>
    <div class="chat-actions">
      <a class="action-btn pink" :href="`mailto:${profile.email}`">Send email</a>
      <a
        class="action-btn"
        :href="profile.linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open LinkedIn
      </a>
    </div>
    <div class="sticker-row">
      <button v-for="item in stickers" :key="item.name" type="button" @click="sendSticker(item)">
        <PixelIcon :name="item.name" :size="28" />
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
