<script setup>
import { computed } from 'vue'
import PixelIcon from '../PixelIcon.vue'
import { useClock } from '../../composables/useClock.js'

const { now, timeLabel, dateLabel } = useClock()

const timeIcon = computed(() => {
  const hour = now.value.getHours()
  if (hour >= 18 || hour < 6) return 'time_night'
  if (hour >= 16) return 'time_evening'
  return 'time_noon'
})
</script>

<template>
  <div class="calendar-body">
    <PixelIcon :name="timeIcon" :size="48" />
    <PixelIcon name="kangel" :size="48" />
    <div class="when">
      <div class="date-lg">{{ dateLabel }}</div>
      <div class="time-lg">{{ timeLabel }}</div>
    </div>
  </div>
</template>
