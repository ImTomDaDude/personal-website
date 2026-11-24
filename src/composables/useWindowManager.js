import { computed, reactive } from 'vue'
import { TASKBAR_HEIGHT, WINDOW_CATALOG } from '../data/windows.js'

function cloneDefault(def) {
  return { x: def.x, y: def.y, w: def.w, h: def.h }
}

function createWindowState(catalog) {
  const pos = cloneDefault(catalog.default)
  return {
    id: catalog.id,
    title: catalog.title,
    icon: catalog.icon,
    menus: catalog.menus,
    status: catalog.status,
    open: false,
    minimized: false,
    maximized: false,
    focused: false,
    x: pos.x,
    y: pos.y,
    w: pos.w,
    h: pos.h,
    z: 1,
    openedAt: 0,
    restore: null,
  }
}

let zCounter = 20
let openedSeq = 0

const windows = reactive(
  Object.fromEntries(
    Object.values(WINDOW_CATALOG).map((item) => [item.id, createWindowState(item)]),
  ),
)

const ui = reactive({
  startMenuOpen: false,
  selectedIcon: null,
  shutdownOpen: false,
  openMenu: null,
})

function blurAll() {
  Object.values(windows).forEach((win) => {
    win.focused = false
  })
}

export function useWindowManager() {
  const openWindows = computed(() =>
    Object.values(windows)
      .filter((win) => win.open)
      .sort((a, b) => a.z - b.z),
  )

  const visibleWindows = computed(() => openWindows.value.filter((win) => !win.minimized))

  const taskbarWindows = computed(() =>
    Object.values(windows)
      .filter((win) => win.open)
      .sort((a, b) => a.openedAt - b.openedAt),
  )

  const focusedWindow = computed(() => Object.values(windows).find((win) => win.open && win.focused) ?? null)

  function focusWindow(id) {
    const win = windows[id]
    if (!win || !win.open) return
    blurAll()
    win.focused = true
    win.minimized = false
    zCounter += 1
    win.z = zCounter
    ui.openMenu = null
    ui.startMenuOpen = false
  }

  function openWindow(id) {
    const win = windows[id]
    if (!win) return
    if (!win.open) {
      win.open = true
      win.minimized = false
      win.maximized = false
      openedSeq += 1
      win.openedAt = openedSeq
      const d = WINDOW_CATALOG[id].default
      const offset = (openedSeq % 6) * 16
      win.x = d.x + offset
      win.y = d.y + offset
      win.w = d.w
      win.h = d.h
    }
    focusWindow(id)
    ui.startMenuOpen = false
    ui.openMenu = null
  }

  function closeWindow(id) {
    const win = windows[id]
    if (!win) return
    win.open = false
    win.focused = false
    win.minimized = false
    win.maximized = false
    win.restore = null
    ui.openMenu = null
    const remaining = Object.values(windows)
      .filter((item) => item.open && !item.minimized)
      .sort((a, b) => b.z - a.z)
    if (remaining[0]) focusWindow(remaining[0].id)
  }

  function minimizeWindow(id) {
    const win = windows[id]
    if (!win) return
    win.minimized = true
    win.focused = false
    ui.openMenu = null
    const remaining = Object.values(windows)
      .filter((item) => item.open && !item.minimized)
      .sort((a, b) => b.z - a.z)
    if (remaining[0]) focusWindow(remaining[0].id)
  }

  function toggleMaximize(id) {
    const win = windows[id]
    if (!win) return
    focusWindow(id)
    if (win.maximized) {
      const prev = win.restore
      win.maximized = false
      if (prev) {
        win.x = prev.x
        win.y = prev.y
        win.w = prev.w
        win.h = prev.h
      }
      win.restore = null
    } else {
      win.restore = { x: win.x, y: win.y, w: win.w, h: win.h }
      win.maximized = true
    }
  }

  function moveWindow(id, x, y) {
    const win = windows[id]
    if (!win || win.maximized) return
    const minX = 24 - win.w
    const maxX = (typeof window !== 'undefined' ? window.innerWidth : 1200) - 24
    const minY = 0
    const maxY = (typeof window !== 'undefined' ? window.innerHeight : 800) - TASKBAR_HEIGHT - 24
    win.x = Math.min(Math.max(x, minX), maxX)
    win.y = Math.min(Math.max(y, minY), maxY)
  }

  function restoreAndMove(id, cursorX) {
    const win = windows[id]
    if (!win || !win.maximized) return
    const prev = win.restore ?? WINDOW_CATALOG[id].default
    win.maximized = false
    win.w = prev.w
    win.h = prev.h
    const ratio = cursorX / (typeof window !== 'undefined' ? window.innerWidth : win.w)
    win.x = Math.round(cursorX - prev.w * ratio)
    win.y = 0
    win.restore = null
  }

  function toggleTaskButton(id) {
    const win = windows[id]
    if (!win || !win.open) {
      openWindow(id)
      return
    }
    if (win.focused && !win.minimized) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  function toggleStartMenu() {
    ui.startMenuOpen = !ui.startMenuOpen
    ui.openMenu = null
  }

  function closeStartMenu() {
    ui.startMenuOpen = false
  }

  function selectIcon(id) {
    ui.selectedIcon = id
  }

  function clearDesktopSelection() {
    ui.selectedIcon = null
    ui.startMenuOpen = false
    ui.openMenu = null
  }

  function toggleShutdown(open) {
    ui.shutdownOpen = open
    ui.startMenuOpen = false
  }

  return {
    windows,
    ui,
    openWindows,
    visibleWindows,
    taskbarWindows,
    focusedWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
    restoreAndMove,
    toggleTaskButton,
    toggleStartMenu,
    closeStartMenu,
    selectIcon,
    clearDesktopSelection,
    toggleShutdown,
  }
}
