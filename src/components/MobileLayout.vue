<script setup>
import PixelIcon from './PixelIcon.vue'
import AboutContent from './windows/AboutContent.vue'
import ResumeContent from './windows/ResumeContent.vue'
import SkillsContent from './windows/SkillsContent.vue'
import ProjectsContent from './windows/ProjectsContent.vue'
import LinkedInContent from './windows/LinkedInContent.vue'
import NotesContent from './windows/NotesContent.vue'
import CalendarContent from './windows/CalendarContent.vue'
import RemindContent from './windows/RemindContent.vue'
import { profile } from '../data/content.js'

const sections = [
  { id: 'about', title: 'About Me', icon: 'about' },
  { id: 'resume', title: 'Experience', icon: 'resume' },
  { id: 'skills', title: 'Skills', icon: 'skills' },
  { id: 'projects', title: 'Projects', icon: 'projects' },
  { id: 'notes', title: 'Notes', icon: 'notes' },
  { id: 'remind', title: 'Remind', icon: 'remind' },
  { id: 'linkedin', title: 'Message', icon: 'linkedin' },
]
</script>

<template>
  <div class="mobile-shell">
    <header class="mobile-top">
      <PixelIcon name="ame" :size="48" />
      <div>
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.tagline }}</p>
      </div>
    </header>

    <div class="mobile-ames" aria-hidden="true">
      <PixelIcon name="kangel" :size="36" />
      <PixelIcon name="icon_status_follower" :size="36" />
      <PixelIcon name="icon_status_love" :size="36" />
      <PixelIcon name="icon_status_stress" :size="36" />
      <PixelIcon name="ame_black" :size="36" />
    </div>

    <nav class="mobile-nav">
      <a v-for="sec in sections" :key="sec.id" :href="'#' + sec.id">{{ sec.title }}</a>
    </nav>

    <section class="nso-window" style="position: relative">
      <div class="nso-titlebar">
        <span class="title-glyph" />
        <PixelIcon name="calendar" :size="16" class="title-icon" />
        <div class="title-bar-text">Calendar</div>
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
        <RemindContent v-else-if="sec.id === 'remind'" />
        <LinkedInContent v-else-if="sec.id === 'linkedin'" />
      </div>
      <div class="nso-statusbar">
        <span class="status-dots"><i /><i /><i /></span>
        <span>{{ sec.title }}</span>
      </div>
    </section>
  </div>
</template>
