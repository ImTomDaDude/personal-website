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
    "Just OK? ...So you don't actually like me. Fine. Take this Love anyway. Don't you dare give it to anyone else.",
    "Hehe, OK. That's cold. I'm still sending Love. If you ignore it, I'll remember.",
    "Hmph. An OK after I waited? You're lucky I'm being nice. Here's Love. Say you wanted it.",
    "OK is what you say when you're bored of me. ...I'm not crying. Here's Love. You have to keep it.",
    "Pfft. You think OK is enough to calm me down? Cute. Love. Now don't go quiet on me.",
  ],
  love: [
    "You have to always love me. Any promise? If you hesitate, that means you already don't.",
    "Hehe. Love received. You're mine now. If you send this to someone else, I'll know.",
    "Don't send Love and then disappear. I'll sit here and get sad on purpose.",
    "Aw. You love me. Say it again. Louder. If you only say it once, it doesn't count.",
    "Love? Good. I was about to decide you hated me. Don't make me do that again.",
  ],
  omg: [
    "OMG? What, am I too much? You still don't get to leave.",
    "Hehe, shocked? Stay shocked. Walking away would hurt my feelings, and you don't want that.",
    "Don't OMG me like I'm a stranger. You already opened this. That's choosing me.",
    "Oh, so I'm scary now? ...Fine. Be scared. Just don't look at anyone else.",
    "OMG is not a no. If it was a no, I'd be really, really sad. You don't want that, right?",
  ],
  sad: [
    "Sad? If you're sad and it's not about me, I'm jealous of whatever it is.",
    "Don't be sad alone. Come here. If you won't, I'll be sadder than you.",
    "Hehe... you look like you need me. Say you need me. Otherwise I'll think you found someone else.",
    "I'll allow the Sad sticker. Once. Then you have to smile for me.",
    "Crying? Good, you still feel things. Feel them about me.",
  ],
  text: [
    "Hehe, you typed. I read every word. Don't type to other people like this.",
    "Mm. I saw that. If you go quiet after this, I'll assume you got bored of me.",
    "Say it nicer. I get sulky when messages feel cold.",
    "Aw, you talked to me. Stay. If you leave mid-sentence, I'll replay it all night.",
    "I kept that. Don't pretend you didn't mean it later.",
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
