<script setup>
import PixelIcon from '../PixelIcon.vue'
import { useClock } from '../../composables/useClock.js'

const { timeLabel, dateLabel } = useClock()
</script>

<template>
  <div class="calendar-body">
    <PixelIcon name="sun" :size="48" />
    <div class="when">
      <div class="date-lg">{{ dateLabel }}</div>
      <div class="time-lg">{{ timeLabel }}</div>
    </div>
  </div>
</template>
