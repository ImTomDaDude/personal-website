<script setup>
import PixelIcon from './PixelIcon.vue'
import StartMenu from './StartMenu.vue'
import SystemTray from './SystemTray.vue'
import { useWindowManager } from '../composables/useWindowManager.js'
import { QUICK_LAUNCH } from '../data/windows.js'

const { ui, taskbarWindows, toggleStartMenu, toggleTaskButton, openWindow } = useWindowManager()
</script>

<template>
  <StartMenu v-if="ui.startMenuOpen" />
  <div class="taskbar">
    <button
      class="start-btn"
      type="button"
      :class="{ 'is-open': ui.startMenuOpen }"
      @click.stop="toggleStartMenu()"
    >
      <PixelIcon name="flower" :size="20" />
      Start
    </button>
    <div class="quick-launch">
      <button
        v-for="item in QUICK_LAUNCH"
        :key="item.id"
        type="button"
        :title="item.label"
        @click="openWindow(item.windowId)"
      >
        <PixelIcon :name="item.icon" :size="20" />
      </button>
    </div>
    <div class="task-buttons">
      <button
        v-for="win in taskbarWindows"
        :key="win.id"
        class="task-btn"
        type="button"
        :class="{ 'is-active': win.focused && !win.minimized }"
        @click="toggleTaskButton(win.id)"
      >
        <PixelIcon :name="win.icon" :size="18" />
        <span>{{ win.title }}</span>
      </button>
    </div>
    <SystemTray />
  </div>
</template>
