<script setup>
import { projects } from '../../data/content.js'
</script>

<template>
  <h2 class="page-heading">Projects</h2>
  <fieldset v-for="item in projects" :key="item.title" class="fieldset-card">
    <legend>{{ item.title }}</legend>
    <p class="muted" style="margin: 0">{{ item.description }}</p>
  </fieldset>
</template>
