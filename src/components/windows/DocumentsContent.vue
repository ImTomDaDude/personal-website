<script setup>
import PixelIcon from '../PixelIcon.vue'
import { useWindowManager } from '../../composables/useWindowManager.js'

const { openWindow } = useWindowManager()

const files = [
  { id: 'about', label: '關於我.txt', icon: 'about' },
  { id: 'resume', label: '履歷.txt', icon: 'resume' },
  { id: 'skills', label: '技能.txt', icon: 'skills' },
  { id: 'projects', label: '專題.txt', icon: 'projects' },
  { id: 'notes', label: '小筆記.txt', icon: 'notes' },
]
</script>

<template>
  <div class="icon-grid">
    <button v-for="item in files" :key="item.id" type="button" @click="openWindow(item.id)">
      <PixelIcon :name="item.icon" :size="32" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>
