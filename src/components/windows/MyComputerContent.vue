<script setup>
import PixelIcon from '../PixelIcon.vue'
import { useWindowManager } from '../../composables/useWindowManager.js'

const { openWindow } = useWindowManager()

const items = [
  { id: 'about', label: '關於我', icon: 'about' },
  { id: 'resume', label: '履歷', icon: 'resume' },
  { id: 'documents', label: '我的文件', icon: 'folder' },
  { id: 'skills', label: '技能', icon: 'skills' },
  { id: 'projects', label: '專題', icon: 'projects' },
  { id: 'linkedin', label: '聯絡', icon: 'linkedin' },
  { id: 'notes', label: '小筆記', icon: 'notes' },
]
</script>

<template>
  <div class="icon-grid">
    <button v-for="item in items" :key="item.id" type="button" @click="openWindow(item.id)">
      <PixelIcon :name="item.icon" :size="32" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>
