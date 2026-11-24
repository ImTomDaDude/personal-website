<script setup>
import PixelIcon from './PixelIcon.vue'
import { useWindowManager } from '../composables/useWindowManager.js'
import { START_MENU_ITEMS } from '../data/windows.js'

const { openWindow, toggleShutdown, closeStartMenu } = useWindowManager()

function openItem(id) {
  openWindow(id)
  closeStartMenu()
}
</script>

<template>
  <div class="start-menu" role="menu" aria-label="開始功能表">
    <div class="start-stripe">CHAN HOI ON</div>
    <div class="start-items">
      <button
        v-for="item in START_MENU_ITEMS"
        :key="item.id"
        type="button"
        role="menuitem"
        @click="openItem(item.windowId)"
      >
        <PixelIcon :name="item.icon" :size="24" />
        <span>{{ item.label }}</span>
      </button>
      <div class="sep" />
      <button type="button" class="shutdown" @click="toggleShutdown(true)">
        <PixelIcon name="flower" :size="24" />
        <span>關機…</span>
      </button>
    </div>
  </div>
</template>
