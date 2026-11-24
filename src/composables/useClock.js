import { useIntervalFn, useDateFormat, useNow } from '@vueuse/core'
import { computed } from 'vue'

export function useClock() {
  const now = useNow()
  useIntervalFn(() => {
    now.value = new Date()
  }, 1000)

  const timeLabel = computed(() =>
    new Intl.DateTimeFormat('zh-HK', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(now.value),
  )

  const dateLabel = computed(() =>
    new Intl.DateTimeFormat('zh-HK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(now.value),
  )

  const titleStamp = useDateFormat(now, 'YYYY-MM-DD HH:mm:ss')

  return { now, timeLabel, dateLabel, titleStamp }
}
