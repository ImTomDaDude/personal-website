<script setup>
import { notesText } from '../../data/content.js'
</script>

<template>
  <div class="notes-body">
    <p v-for="(line, i) in notesText" :key="i">{{ line }}</p>
  </div>
</template>
