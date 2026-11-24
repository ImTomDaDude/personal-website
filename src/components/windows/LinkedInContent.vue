<script setup>
import { ref } from 'vue'
import PixelIcon from '../PixelIcon.vue'
import { profile, contactMessages } from '../../data/content.js'

const extras = ref([])
const stickers = [
  { name: 'sticker-heart', label: '心心' },
  { name: 'sticker-star', label: '星星' },
  { name: 'sticker-sparkle', label: '閃亮' },
  { name: 'sticker-plus', label: '加號' },
]

function sendSticker(item) {
  extras.value.push({
    from: 'me',
    text: `（送出「${item.label}」貼圖）謝謝 PlusKit！`,
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
        這是主人的 LinkedIn 與電郵，歡迎打招呼～
      </div>
      <div v-for="(msg, i) in extras" :key="'e' + i" class="bubble me">
        {{ msg.text }}
      </div>
    </div>
    <div class="chat-actions">
      <a class="action-btn pink" :href="`mailto:${profile.email}`">傳送電郵</a>
      <a
        class="action-btn"
        :href="profile.linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        開啟 LinkedIn
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
