<script setup>
import PixelIcon from './PixelIcon.vue'
import AboutContent from './windows/AboutContent.vue'
import ResumeContent from './windows/ResumeContent.vue'
import SkillsContent from './windows/SkillsContent.vue'
import ProjectsContent from './windows/ProjectsContent.vue'
import LinkedInContent from './windows/LinkedInContent.vue'
import NotesContent from './windows/NotesContent.vue'
import CalendarContent from './windows/CalendarContent.vue'
import { profile } from '../data/content.js'

const sections = [
  { id: 'about', title: '關於我', icon: 'about' },
  { id: 'resume', title: '履歷', icon: 'resume' },
  { id: 'skills', title: '技能', icon: 'skills' },
  { id: 'projects', title: '專題與作品', icon: 'projects' },
  { id: 'notes', title: '小筆記', icon: 'notes' },
  { id: 'linkedin', title: '聯絡', icon: 'linkedin' },
]
</script>

<template>
  <div class="mobile-shell">
    <header class="mobile-top">
      <PixelIcon name="pluskit" :size="40" />
      <div>
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.tagline }}</p>
      </div>
    </header>

    <nav class="mobile-nav">
      <a v-for="sec in sections" :key="sec.id" :href="'#' + sec.id">{{ sec.title }}</a>
    </nav>

    <section class="nso-window" style="position: relative">
      <div class="nso-titlebar">
        <span class="title-glyph" />
        <PixelIcon name="calendar" :size="16" class="title-icon" />
        <div class="title-bar-text">日曆</div>
      </div>
      <div class="nso-body"><CalendarContent /></div>
      <div class="nso-statusbar"><span class="status-dots"><i /><i /><i /></span></div>
    </section>

    <section
      v-for="sec in sections"
      :id="sec.id"
      :key="sec.id"
      class="nso-window"
      style="position: relative"
    >
      <div class="nso-titlebar">
        <span class="title-glyph" />
        <PixelIcon :name="sec.icon" :size="16" class="title-icon" />
        <div class="title-bar-text">{{ sec.title }}</div>
      </div>
      <div class="nso-body">
        <AboutContent v-if="sec.id === 'about'" />
        <ResumeContent v-else-if="sec.id === 'resume'" />
        <SkillsContent v-else-if="sec.id === 'skills'" />
        <ProjectsContent v-else-if="sec.id === 'projects'" />
        <NotesContent v-else-if="sec.id === 'notes'" />
        <LinkedInContent v-else-if="sec.id === 'linkedin'" />
      </div>
      <div class="nso-statusbar">
        <span class="status-dots"><i /><i /><i /></span>
        <span>{{ sec.title }}</span>
      </div>
    </section>
  </div>
</template>
