<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import PixelIcon from './PixelIcon.vue'
import { useWindowManager } from '../composables/useWindowManager.js'

const props = defineProps({
  id: { type: String, required: true },
})

const {
  windows,
  ui,
  focusWindow,
  closeWindow,
  minimizeWindow,
  toggleMaximize,
  moveWindow,
  restoreAndMove,
  openWindow,
} = useWindowManager()

const win = computed(() => windows[props.id])
const openMenu = ref(null)
let dragging = false
let offsetX = 0
let offsetY = 0

const windowStyle = computed(() => {
  const w = win.value
  if (!w) return {}
  if (w.maximized) {
    return {
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      zIndex: w.z,
    }
  }
  return {
    left: `${w.x}px`,
    top: `${w.y}px`,
    width: `${w.w}px`,
    height: `${w.h}px`,
    zIndex: w.z,
  }
})

function onFocus() {
  focusWindow(props.id)
}

function onTitlePointerDown(event) {
  if (event.button !== 0) return
  if (event.target.closest('.nso-controls')) return
  focusWindow(props.id)
  openMenu.value = null
  const w = win.value
  if (w.maximized) {
    restoreAndMove(props.id, event.clientX)
  }
  dragging = true
  offsetX = event.clientX - windows[props.id].x
  offsetY = event.clientY - windows[props.id].y
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  event.preventDefault()
}

function onPointerMove(event) {
  if (!dragging) return
  moveWindow(props.id, event.clientX - offsetX, event.clientY - offsetY)
}

function onPointerUp() {
  dragging = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
}

function toggleMenu(name) {
  focusWindow(props.id)
  openMenu.value = openMenu.value === name ? null : name
  ui.openMenu = openMenu.value ? props.id : null
}

function onFileClose() {
  openMenu.value = null
  closeWindow(props.id)
}

function onHelp() {
  openMenu.value = null
  openWindow('help')
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div
    v-if="win && win.open"
    v-show="!win.minimized"
    class="nso-window"
    :class="{ 'is-maximized': win.maximized, 'is-focused': win.focused }"
    :style="windowStyle"
    @mousedown="onFocus"
  >
    <div
      class="nso-titlebar"
      :class="{ 'is-inactive': !win.focused }"
      @pointerdown="onTitlePointerDown"
      @dblclick="toggleMaximize(id)"
    >
      <span class="title-glyph" aria-hidden="true" />
      <PixelIcon :name="win.icon" :size="16" class="title-icon" />
      <div class="title-bar-text">{{ win.title }}</div>
      <div class="nso-controls">
        <button class="ctrl" aria-label="Minimize" title="最小化" @click.stop="minimizeWindow(id)" @pointerdown.stop>
          <svg viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="7" width="8" height="2" fill="#4d23cf" /></svg>
        </button>
        <button
          class="ctrl"
          :aria-label="win.maximized ? 'Restore' : 'Maximize'"
          :title="win.maximized ? '還原' : '最大化'"
          @click.stop="toggleMaximize(id)"
          @pointerdown.stop
        >
          <svg v-if="!win.maximized" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="1" y="1" width="8" height="8" fill="none" stroke="#4d23cf" stroke-width="2" />
          </svg>
          <svg v-else viewBox="0 0 10 10" aria-hidden="true">
            <rect x="3" y="1" width="6" height="6" fill="none" stroke="#4d23cf" stroke-width="1.6" />
            <rect x="1" y="3" width="6" height="6" fill="#fff" stroke="#4d23cf" stroke-width="1.6" />
          </svg>
        </button>
        <button class="ctrl" aria-label="Close" title="關閉" @click.stop="closeWindow(id)" @pointerdown.stop>
          <svg viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 2 L8 8 M8 2 L2 8" stroke="#4d23cf" stroke-width="2" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="win.menus && win.menus.length" class="nso-menubar">
      <div v-for="menu in win.menus" :key="menu" class="menu-wrap" style="position: relative">
        <button
          class="menu-item"
          :class="{ 'is-open': openMenu === menu }"
          @click.stop="toggleMenu(menu)"
        >
          {{ menu }}
        </button>
        <div v-if="openMenu === menu" class="menu-drop">
          <button v-if="menu === '檔案'" type="button" @click="onFileClose">關閉視窗</button>
          <button v-else-if="menu === '說明'" type="button" @click="onHelp">關於本網站</button>
          <button v-else type="button" disabled>尚未提供</button>
        </div>
      </div>
    </div>

    <div class="nso-body">
      <slot />
    </div>

    <div class="nso-statusbar">
      <span class="status-dots" aria-hidden="true"><i /><i /><i /></span>
      <span>{{ win.status }}</span>
    </div>
  </div>
</template>
