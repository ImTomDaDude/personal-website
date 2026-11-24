<script setup>
import PixelIcon from './PixelIcon.vue'

defineProps({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  selected: { type: Boolean, default: false },
})

const emit = defineEmits(['open', 'select'])
</script>

<template>
  <button
    class="desktop-icon"
    :class="{ 'is-selected': selected }"
    type="button"
    @click="emit('select')"
    @dblclick.prevent="emit('open')"
  >
    <PixelIcon :name="icon" :size="32" class="icon-art" />
    <span class="icon-label">{{ label }}</span>
  </button>
</template>
