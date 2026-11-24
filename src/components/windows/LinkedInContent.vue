<script setup>
import { nextTick, ref } from 'vue'
import PixelIcon from '../PixelIcon.vue'
import { profile, contactMessages } from '../../data/content.js'

const extras = ref([])
const log = ref(null)
const draft = ref('')
const stickersOpen = ref(false)
const stickers = [
  { name: 'ok', label: 'OK' },
  { name: 'love', label: 'Love' },
  { name: 'omg', label: 'OMG' },
  { name: 'sad', label: 'Sad' },
]

const replies = {
  ok: [
    "Hmph. Just an OK? Open my LinkedIn or send me an email. Otherwise... I'll take this Love sticker back.",
    "Heh, you folded already? Fine, Love. Now open LinkedIn or email me, or else I'm done talking.",
    "OK? That's it? Tch. Here's Love. Open my LinkedIn or send an email. Otherwise I'll ignore you.",
    "I wasn't going to reply. Open LinkedIn or email me. Or else this Love doesn't count.",
    "Pfft. Cute. Take the Love sticker, then open my LinkedIn or send an email. Otherwise, don't bother me.",
  ],
  love: [
    'You have to always love me. Open my LinkedIn or send an email. Any promise? Otherwise...',
    "Love received. Now open LinkedIn or email me, or else I'll decide you were faking it.",
    "Hehe. If you love me, open my LinkedIn or send an email. No maybes. Otherwise I'll be upset.",
    "Sending Love means you're mine. Open LinkedIn or email me. Otherwise you don't mean it.",
    "Don't send Love unless you'll open my LinkedIn or email me. Otherwise... promise broken.",
  ],
  omg: [
    "OMG? Too late to just gasp. Open my LinkedIn or send an email. Otherwise I'll think you're running away.",
    "Hehe, overwhelmed? Open LinkedIn or email me. Otherwise leaving would make me sad.",
    "Don't OMG me and freeze. Open my LinkedIn or send an email, or else this doesn't count.",
    "Shocked? Good. Now open LinkedIn or email me. Otherwise I'll assume you disappeared.",
    "OMG is not a no. Open my LinkedIn or send an email. Otherwise you didn't really choose me.",
  ],
  sad: [
    "Sad? Then open my LinkedIn or send me an email. Otherwise I'll stay sad on purpose.",
    "If you're sad, open LinkedIn or email me. Don't be sad about anyone else, or else.",
    "Don't cry here. Open my LinkedIn or send an email. Otherwise I won't forgive the Sad sticker.",
    "Hehe... you need me. Open LinkedIn or email me and say it. Otherwise this sadness is wasted.",
    "I'll allow Sad. Once. Then open my LinkedIn or send an email, or else we're not fine.",
  ],
  text: [
    "Don't type it here. Email me, or find me on LinkedIn or Instagram.",
    "Cute, but this chat isn't the way. Use email, LinkedIn, or Instagram.",
    'Hehe. If you want a real reply, send an email or find me on LinkedIn or Instagram.',
    "I saw that. Now go use email, LinkedIn, or Instagram. That's how you actually reach me.",
    "Typing here doesn't count. Email me, or find me on LinkedIn or Instagram.",
  ],
}

const lastReply = {}

function pickReply(name) {
  const lines = replies[name]
  const pool = lines.filter((line) => line !== lastReply[name])
  const line = pool[Math.floor(Math.random() * pool.length)]
  lastReply[name] = line
  return line
}

async function scrollLog() {
  await nextTick()
  if (log.value) log.value.scrollTop = log.value.scrollHeight
}

function sendText() {
  const text = draft.value.trim()
  if (!text) return
  extras.value.push({ from: 'me', text })
  extras.value.push({ from: 'ame', text: pickReply('text') })
  draft.value = ''
  scrollLog()
}

async function sendSticker(item) {
  extras.value.push({ from: 'me', sticker: item.name, label: item.label })
  extras.value.push({
    from: 'ame',
    text: pickReply(item.name),
    sticker: item.name === 'ok' ? 'love' : '',
  })
  stickersOpen.value = false
  scrollLog()
}
</script>

<template>
  <div class="chat-pane">
    <div ref="log" class="chat-log">
      <div v-for="(msg, i) in contactMessages" :key="'p' + i" class="bubble">
        <div class="bubble-meta">
          <PixelIcon :name="i % 2 === 0 ? 'ame' : 'kangel'" :size="22" />
          Ame-chan
        </div>
        {{ msg.text }}
      </div>
      <div class="bubble">
        <div class="bubble-meta">
          <PixelIcon name="kangel" :size="22" />
          Ame-chan
        </div>
        Here's the owner's LinkedIn, Instagram, and email — feel free to say hello.
      </div>
      <div
        v-for="(msg, i) in extras"
        :key="'e' + i"
        class="bubble"
        :class="{ me: msg.from === 'me', sticker: msg.sticker && !msg.text }"
        :aria-label="msg.text ? undefined : msg.label"
      >
        <div v-if="msg.from === 'ame'" class="bubble-meta">
          <PixelIcon name="kangel" :size="22" />
          Ame-chan
        </div>
        <p v-if="msg.text" class="bubble-text">{{ msg.text }}</p>
        <PixelIcon v-if="msg.sticker" :name="msg.sticker" :size="msg.text ? 64 : 72" />
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
      <a
        class="action-btn"
        :href="profile.instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PixelIcon name="instagram" :size="18" />
        Open Instagram
      </a>
    </div>
    <form class="chat-compose" @submit.prevent="sendText">
      <div v-if="stickersOpen" class="sticker-row">
        <button
          v-for="item in stickers"
          :key="item.name"
          type="button"
          @click="sendSticker(item)"
        >
          <PixelIcon :name="item.name" :size="72" />
          {{ item.label }}
        </button>
      </div>
      <div class="compose-bar">
        <input
          v-model="draft"
          class="compose-input"
          type="text"
          placeholder="Say something..."
          aria-label="Message"
          @keydown.enter.prevent="sendText"
        />
        <button class="action-btn pink" type="submit" :disabled="!draft.trim()">Send</button>
        <button
          class="action-btn sticker-toggle"
          :class="{ 'is-on': stickersOpen }"
          type="button"
          @click="stickersOpen = !stickersOpen"
        >
          <PixelIcon name="love" :size="22" />
          Stickers
        </button>
      </div>
    </form>
  </div>
</template>
