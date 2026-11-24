<script setup>
import { profile, aboutSummary } from '../../data/content.js'
import { useWindowManager } from '../../composables/useWindowManager.js'

const { openWindow } = useWindowManager()
</script>

<template>
  <p class="tagline">{{ profile.tagline }}</p>
  <h2 class="page-heading">{{ profile.name }}</h2>
  <p class="lede">{{ aboutSummary }}</p>
  <div class="btn-row">
    <button class="action-btn" type="button" @click="openWindow('resume')">Open Experience</button>
    <button class="action-btn" type="button" @click="openWindow('skills')">Skills</button>
    <a class="action-btn pink" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
    <button class="action-btn" type="button" @click="openWindow('linkedin')">Message</button>
  </div>
</template>
