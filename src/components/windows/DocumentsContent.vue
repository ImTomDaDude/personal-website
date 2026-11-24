<script setup>
import PixelIcon from '../PixelIcon.vue'
import { useWindowManager } from '../../composables/useWindowManager.js'

const { openWindow } = useWindowManager()

const files = [
  { id: 'about', label: 'About Me.txt', icon: 'about' },
  { id: 'resume', label: 'Experience.txt', icon: 'resume' },
  { id: 'skills', label: 'Skills.txt', icon: 'skills' },
  { id: 'projects', label: 'Projects.txt', icon: 'projects' },
  { id: 'notes', label: 'Notes.txt', icon: 'notes' },
  { id: 'remind', label: 'Remind.txt', icon: 'remind' },
]
</script>

<template>
  <div class="icon-grid">
    <button v-for="item in files" :key="item.id" type="button" @click="openWindow(item.id)">
      <PixelIcon :name="item.icon" :size="40" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>
