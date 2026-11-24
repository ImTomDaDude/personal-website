<script setup>
import PixelIcon from '../PixelIcon.vue'
import { useWindowManager } from '../../composables/useWindowManager.js'

const { openWindow } = useWindowManager()

const items = [
  { id: 'about', label: 'About Me', icon: 'about' },
  { id: 'resume', label: 'Experience', icon: 'resume' },
  { id: 'documents', label: 'My Documents', icon: 'folder' },
  { id: 'skills', label: 'Skills', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'projects' },
  { id: 'linkedin', label: 'Message', icon: 'linkedin' },
  { id: 'notes', label: 'Notes', icon: 'notes' },
  { id: 'terminal', label: 'Terminal', icon: 'terminal' },
  { id: 'remind', label: 'Remind', icon: 'remind' },
]
</script>

<template>
  <div class="icon-grid">
    <button v-for="item in items" :key="item.id" type="button" @click="openWindow(item.id)">
      <PixelIcon :name="item.icon" :size="40" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>
