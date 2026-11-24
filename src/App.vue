<script setup>
import { onMounted } from 'vue'
import Desktop from './components/Desktop.vue'
import MobileLayout from './components/MobileLayout.vue'
import { useWindowManager } from './composables/useWindowManager.js'

const { openWindow } = useWindowManager()

onMounted(() => {
  openWindow('calendar')
  openWindow('about')
})
</script>

<template>
  <Desktop />
  <MobileLayout />
</template>
