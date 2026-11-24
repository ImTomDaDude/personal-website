<script setup>
import { onMounted, onUnmounted } from 'vue'
import DesktopIcon from './DesktopIcon.vue'
import Win98Window from './Win98Window.vue'
import Taskbar from './Taskbar.vue'
import MascotBuddy from './MascotBuddy.vue'
import ShutdownDialog from './ShutdownDialog.vue'
import AboutContent from './windows/AboutContent.vue'
import ResumeContent from './windows/ResumeContent.vue'
import LinkedInContent from './windows/LinkedInContent.vue'
import SkillsContent from './windows/SkillsContent.vue'
import ProjectsContent from './windows/ProjectsContent.vue'
import MyComputerContent from './windows/MyComputerContent.vue'
import DocumentsContent from './windows/DocumentsContent.vue'
import RecycleBinContent from './windows/RecycleBinContent.vue'
import NotesContent from './windows/NotesContent.vue'
import CalendarContent from './windows/CalendarContent.vue'
import HelpContent from './windows/HelpContent.vue'
import RemindContent from './windows/RemindContent.vue'
import TerminalContent from './windows/TerminalContent.vue'
import { useWindowManager } from '../composables/useWindowManager.js'
import { DESKTOP_ICONS } from '../data/windows.js'

const { ui, openWindow, selectIcon, clearDesktopSelection, closeStartMenu } = useWindowManager()

function onDesktopClick(event) {
  if (event.target === event.currentTarget) {
    clearDesktopSelection()
  }
}

function onKey(event) {
  if (event.key === 'Escape') {
    closeStartMenu()
    ui.shutdownOpen = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
})

function openIcon(id) {
  selectIcon(id)
  openWindow(id)
}
</script>

<template>
  <div class="desktop-shell">
    <div class="desktop-area" @mousedown.self="onDesktopClick">
      <div class="icon-column">
        <DesktopIcon
          v-for="item in DESKTOP_ICONS"
          :key="item.id"
          :label="item.label"
          :icon="item.icon"
          :selected="ui.selectedIcon === item.id"
          @select="openIcon(item.windowId)"
          @open="openIcon(item.windowId)"
        />
      </div>
      <div class="icon-recycle">
        <DesktopIcon
          label="Recycle Bin"
          icon="recycle"
          :selected="ui.selectedIcon === 'recycle'"
          @select="openIcon('recycle')"
          @open="openIcon('recycle')"
        />
      </div>

      <Win98Window id="calendar"><CalendarContent /></Win98Window>
      <Win98Window id="notes"><NotesContent /></Win98Window>
      <Win98Window id="about"><AboutContent /></Win98Window>
      <Win98Window id="resume"><ResumeContent /></Win98Window>
      <Win98Window id="linkedin"><LinkedInContent /></Win98Window>
      <Win98Window id="skills"><SkillsContent /></Win98Window>
      <Win98Window id="projects"><ProjectsContent /></Win98Window>
      <Win98Window id="computer"><MyComputerContent /></Win98Window>
      <Win98Window id="documents"><DocumentsContent /></Win98Window>
      <Win98Window id="recycle"><RecycleBinContent /></Win98Window>
      <Win98Window id="help"><HelpContent /></Win98Window>
      <Win98Window id="remind"><RemindContent /></Win98Window>
      <Win98Window id="terminal"><TerminalContent /></Win98Window>

      <MascotBuddy />
    </div>
    <Taskbar />
    <ShutdownDialog v-if="ui.shutdownOpen" />
  </div>
</template>
