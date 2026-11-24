<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 32 },
})

const modules = import.meta.glob('../assets/icons/**/*.png', { eager: true, import: 'default' })

const files = {}
for (const [path, url] of Object.entries(modules)) {
  const parts = path.split('/')
  const file = parts[parts.length - 1].replace(/\.png$/i, '')
  const depth = parts.length
  const prev = files[file]
  if (!prev || depth < prev.depth) files[file] = { url, depth }
}

// Older screens still ask for these names. Point them at the PNGs that are actually in the folder.
const aliases = {
  pluskit: 'ame',
  about: 'ame',
  resume: 'clock',
  linkedin: 'chatroom',
  skills: 'chess',
  projects: 'game',
  computer: 'internet',
  folder: 'folder_open',
  recycle: 'trash',
  notes: 'text',
  help: 'search',
  remind: 'medications',
  sun: 'time_noon',
  'ame-happy': 'kangel',
  'ame-wink': 'icon_status_follower',
  'ame-angel': 'kangel',
  'ame-love': 'icon_status_love',
  'ame-sleepy': 'ame_black',
}

const src = computed(() => {
  const key = aliases[props.name] ?? props.name
  return files[key]?.url ?? files.ame?.url ?? ''
})
</script>

<template>
  <img class="pixel-icon" :src="src" :width="size" :height="size" alt="" draggable="false" />
</template>
