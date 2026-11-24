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
    <button class="action-btn" type="button" @click="openWindow('resume')">開啟履歷</button>
    <button class="action-btn" type="button" @click="openWindow('skills')">技能</button>
    <a class="action-btn pink" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
    <button class="action-btn" type="button" @click="openWindow('linkedin')">聯絡／LinkedIn</button>
  </div>
</template>
