<script setup>
import { experience, education, certificates, profile } from '../../data/content.js'
</script>

<template>
  <h2 class="page-heading">Experience</h2>
  <p class="tagline">{{ profile.tagline }}</p>

  <fieldset class="fieldset-card">
    <legend>Experience</legend>
    <ol class="timeline">
      <li v-for="item in experience" :key="item.period + item.org">
        <span class="period">{{ item.period }}</span>
        <p class="org">{{ item.org }}</p>
        <p class="role">{{ item.title }}</p>
        <p class="muted">{{ item.description }}</p>
      </li>
    </ol>
  </fieldset>

  <fieldset class="fieldset-card">
    <legend>Education</legend>
    <ol class="timeline">
      <li v-for="item in education" :key="item.school">
        <span class="period">{{ item.period }}</span>
        <p class="org">{{ item.school }}</p>
        <p v-if="item.detail" class="role">{{ item.detail }}</p>
      </li>
    </ol>
  </fieldset>

  <fieldset class="fieldset-card">
    <legend>Certificates</legend>
    <ul class="timeline">
      <li v-for="item in certificates" :key="item.name">
        <span class="period">{{ item.year }}</span>
        <p class="org">{{ item.name }}</p>
      </li>
    </ul>
  </fieldset>
</template>
