<script setup>
import { skills } from '../../data/content.js'
</script>

<template>
  <h2 class="page-heading">Skills</h2>
  <fieldset v-for="(items, group) in skills" :key="group" class="fieldset-card">
    <legend>{{ group }}</legend>
    <div class="chip-row">
      <span v-for="skill in items" :key="skill" class="chip">{{ skill }}</span>
    </div>
  </fieldset>
</template>
