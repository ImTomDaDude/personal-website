<script setup>
import { useClock } from '../composables/useClock.js'
import { useWindowManager } from '../composables/useWindowManager.js'

const { timeLabel, dateLabel } = useClock()
const { openWindow } = useWindowManager()
</script>

<template>
  <button class="tray" type="button" :title="dateLabel" @click="openWindow('calendar')">
    <span class="clock">{{ timeLabel }}</span>
  </button>
</template>
