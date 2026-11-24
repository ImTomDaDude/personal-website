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
  <div class="start-menu" role="menu" aria-label="Start menu">
    <div class="start-stripe">CHAN HOI ON</div>
    <div class="start-items">
      <button
        v-for="item in START_MENU_ITEMS"
        :key="item.id"
        type="button"
        role="menuitem"
        @click="openItem(item.windowId)"
      >
        <PixelIcon :name="item.icon" :size="32" />
        <span>{{ item.label }}</span>
      </button>
      <div class="sep" />
      <button type="button" class="shutdown" @click="toggleShutdown(true)">
        <PixelIcon name="ame-sleepy" :size="32" />
        <span>Shut Down…</span>
      </button>
    </div>
  </div>
</template>
