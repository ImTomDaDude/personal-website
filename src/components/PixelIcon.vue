<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 32 },
})
</script>

<template>
  <svg
    class="pixel-icon"
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Flower mark used on the Start button -->
    <g v-if="name === 'flower'">
      <rect x="13" y="13" width="6" height="6" fill="#ffd36a" />
      <rect x="13" y="4" width="6" height="8" fill="#ff5ea0" />
      <rect x="13" y="20" width="6" height="8" fill="#ff5ea0" />
      <rect x="4" y="13" width="8" height="6" fill="#ff5ea0" />
      <rect x="20" y="13" width="8" height="6" fill="#ff5ea0" />
      <rect x="6" y="6" width="6" height="6" fill="#ff8ec4" />
      <rect x="20" y="6" width="6" height="6" fill="#ff8ec4" />
      <rect x="6" y="20" width="6" height="6" fill="#ff8ec4" />
      <rect x="20" y="20" width="6" height="6" fill="#ff8ec4" />
    </g>

    <!-- Cute CRT monitor with a teal screen and blossom -->
    <g v-else-if="name === 'computer'">
      <rect x="5" y="3" width="22" height="17" fill="#3a1830" />
      <rect x="6" y="4" width="20" height="15" fill="#d8a8c0" />
      <rect x="8" y="6" width="16" height="11" fill="#3a1830" />
      <rect x="9" y="7" width="14" height="9" fill="#c8fff8" />
      <rect x="14" y="9" width="4" height="4" fill="#ffd36a" />
      <rect x="12" y="10" width="2" height="2" fill="#ff5ea0" />
      <rect x="18" y="10" width="2" height="2" fill="#ff5ea0" />
      <rect x="14" y="8" width="2" height="2" fill="#ff5ea0" />
      <rect x="16" y="8" width="2" height="2" fill="#ff5ea0" />
      <rect x="14" y="13" width="4" height="1" fill="#5cb8b4" />
      <rect x="13" y="20" width="6" height="3" fill="#b08098" />
      <rect x="8" y="23" width="16" height="3" fill="#3a1830" />
      <rect x="9" y="23" width="14" height="2" fill="#c498b0" />
      <rect x="11" y="26" width="10" height="2" fill="#8a5870" />
    </g>

    <!-- Peach-pink folder -->
    <g v-else-if="name === 'folder'">
      <rect x="3" y="9" width="10" height="4" fill="#3a1830" />
      <rect x="4" y="10" width="8" height="3" fill="#ffc48a" />
      <rect x="3" y="12" width="26" height="16" fill="#3a1830" />
      <rect x="4" y="13" width="24" height="14" fill="#ffb070" />
      <rect x="4" y="13" width="24" height="3" fill="#ffd2a8" />
      <rect x="6" y="18" width="8" height="2" fill="#fff4e8" />
      <rect x="6" y="21" width="12" height="2" fill="#ffe2c4" />
    </g>

    <!-- Smiling profile / about -->
    <g v-else-if="name === 'about'">
      <rect x="6" y="2" width="20" height="28" fill="#3a1830" />
      <rect x="7" y="3" width="18" height="26" fill="#fff6fb" />
      <rect x="7" y="3" width="18" height="5" fill="#ff8ec4" />
      <rect x="11" y="9" width="10" height="10" fill="#3a1830" />
      <rect x="12" y="10" width="8" height="8" fill="#ffd0b8" />
      <rect x="13" y="9" width="6" height="3" fill="#5a3048" />
      <rect x="14" y="12" width="2" height="2" fill="#3a1830" />
      <rect x="18" y="12" width="2" height="2" fill="#3a1830" />
      <rect x="15" y="15" width="4" height="2" fill="#e07090" />
      <rect x="10" y="20" width="12" height="7" fill="#ffc6e3" />
      <rect x="12" y="20" width="8" height="2" fill="#ff9ac8" />
    </g>

    <!-- Document / resume -->
    <g v-else-if="name === 'resume'">
      <rect x="6" y="2" width="18" height="28" fill="#3a1830" />
      <rect x="7" y="3" width="16" height="26" fill="#fffafc" />
      <rect x="20" y="3" width="3" height="3" fill="#e8d0dc" />
      <rect x="21" y="2" width="3" height="4" fill="#f3e6f2" />
      <rect x="9" y="7" width="10" height="2" fill="#ff6ba8" />
      <rect x="9" y="11" width="12" height="2" fill="#d0b0c0" />
      <rect x="9" y="15" width="12" height="2" fill="#d0b0c0" />
      <rect x="9" y="19" width="8" height="2" fill="#d0b0c0" />
      <rect x="9" y="23" width="6" height="4" fill="#ffd36a" />
      <rect x="10" y="24" width="4" height="2" fill="#ff8ec4" />
    </g>

    <!-- Professional nametag, not a brand logo -->
    <g v-else-if="name === 'linkedin'">
      <rect x="3" y="8" width="26" height="18" fill="#3a1830" />
      <rect x="4" y="9" width="24" height="16" fill="#ffe4f1" />
      <rect x="4" y="9" width="24" height="4" fill="#ff6ba8" />
      <rect x="6" y="15" width="6" height="6" fill="#3a1830" />
      <rect x="7" y="16" width="4" height="4" fill="#ffd0b8" />
      <rect x="14" y="15" width="12" height="2" fill="#c06090" />
      <rect x="14" y="19" width="9" height="2" fill="#d8a0b8" />
      <rect x="12" y="5" width="8" height="4" fill="#3a1830" />
      <rect x="13" y="5" width="6" height="3" fill="#d8a8c0" />
    </g>

    <!-- Toolbox + sparkle for skills -->
    <g v-else-if="name === 'skills'">
      <rect x="4" y="12" width="24" height="16" fill="#3a1830" />
      <rect x="5" y="13" width="22" height="14" fill="#e8a858" />
      <rect x="5" y="13" width="22" height="4" fill="#f0c878" />
      <rect x="13" y="10" width="6" height="5" fill="#3a1830" />
      <rect x="14" y="11" width="4" height="3" fill="#d89040" />
      <rect x="8" y="19" width="6" height="5" fill="#8ad8d4" />
      <rect x="18" y="19" width="6" height="5" fill="#ff8ec4" />
      <rect x="23" y="4" width="2" height="6" fill="#ffd36a" />
      <rect x="21" y="6" width="6" height="2" fill="#ffd36a" />
    </g>

    <!-- Building blocks / project cubes -->
    <g v-else-if="name === 'projects'">
      <rect x="10" y="4" width="12" height="10" fill="#3a1830" />
      <rect x="11" y="5" width="10" height="8" fill="#8ad8d4" />
      <rect x="11" y="5" width="10" height="2" fill="#c8fff8" />
      <rect x="4" y="14" width="12" height="12" fill="#3a1830" />
      <rect x="5" y="15" width="10" height="10" fill="#ff8ec4" />
      <rect x="5" y="15" width="10" height="2" fill="#ffc6e3" />
      <rect x="16" y="16" width="12" height="12" fill="#3a1830" />
      <rect x="17" y="17" width="10" height="10" fill="#ffd36a" />
      <rect x="17" y="17" width="10" height="2" fill="#ffe9a8" />
    </g>

    <!-- Mesh bin -->
    <g v-else-if="name === 'recycle'">
      <rect x="8" y="5" width="16" height="3" fill="#3a1830" />
      <rect x="9" y="6" width="14" height="1" fill="#d0c0c8" />
      <rect x="6" y="8" width="20" height="20" fill="#3a1830" />
      <rect x="7" y="9" width="18" height="18" fill="#e8d0dc" />
      <rect x="9" y="11" width="2" height="14" fill="#c0a0b0" />
      <rect x="13" y="11" width="2" height="14" fill="#c0a0b0" />
      <rect x="17" y="11" width="2" height="14" fill="#c0a0b0" />
      <rect x="21" y="11" width="2" height="14" fill="#c0a0b0" />
      <rect x="9" y="17" width="14" height="2" fill="#d8b8c8" />
      <rect x="14" y="13" width="4" height="4" fill="#ff8ec4" />
    </g>

    <!-- Help / flower booklet -->
    <g v-else-if="name === 'help'">
      <rect x="6" y="4" width="20" height="24" fill="#3a1830" />
      <rect x="7" y="5" width="18" height="22" fill="#ffe4f1" />
      <rect x="13" y="9" width="6" height="6" fill="#ffd36a" />
      <rect x="11" y="10" width="4" height="4" fill="#ff5ea0" />
      <rect x="17" y="10" width="4" height="4" fill="#ff5ea0" />
      <rect x="13" y="7" width="6" height="4" fill="#ff5ea0" />
      <rect x="13" y="13" width="6" height="4" fill="#ff5ea0" />
      <rect x="12" y="20" width="8" height="3" fill="#c090a8" />
    </g>

    <!-- Envelope -->
    <g v-else-if="name === 'mail'">
      <rect x="3" y="8" width="26" height="18" fill="#3a1830" />
      <rect x="4" y="9" width="24" height="16" fill="#fff6fb" />
      <rect x="4" y="9" width="24" height="3" fill="#ff8ec4" />
      <polygon points="4,9 16,18 28,9" fill="#3a1830" />
      <polygon points="5,9 16,17 27,9" fill="#ffc6e3" />
    </g>

    <!-- Small show-desktop tiles -->
    <g v-else-if="name === 'desktop'">
      <rect x="4" y="4" width="24" height="20" fill="#3a1830" />
      <rect x="5" y="5" width="22" height="18" fill="#f3e6f2" />
      <rect x="7" y="7" width="6" height="6" fill="#ff8ec4" />
      <rect x="15" y="8" width="8" height="6" fill="#8ad8d4" />
      <rect x="4" y="24" width="24" height="4" fill="#ee8ab4" />
    </g>

    <!-- Calendar -->
    <g v-else-if="name === 'calendar'">
      <rect x="5" y="6" width="22" height="22" fill="#4d23cf" />
      <rect x="6" y="7" width="20" height="20" fill="#90f4e4" />
      <rect x="6" y="7" width="20" height="5" fill="#eaa0e8" />
      <rect x="9" y="5" width="3" height="5" fill="#4d23cf" />
      <rect x="20" y="5" width="3" height="5" fill="#4d23cf" />
      <rect x="9" y="16" width="3" height="3" fill="#4d23cf" />
      <rect x="14" y="16" width="3" height="3" fill="#4d23cf" />
      <rect x="19" y="16" width="3" height="3" fill="#ff7ad4" />
      <rect x="9" y="21" width="3" height="3" fill="#4d23cf" />
      <rect x="14" y="21" width="3" height="3" fill="#4d23cf" />
    </g>

    <!-- Notepad / quick notes -->
    <g v-else-if="name === 'notes'">
      <rect x="7" y="3" width="18" height="26" fill="#4d23cf" />
      <rect x="8" y="4" width="16" height="24" fill="#fffafc" />
      <rect x="10" y="7" width="8" height="2" fill="#4d23cf" />
      <rect x="20" y="6" width="2" height="2" fill="#eaa0e8" />
      <rect x="10" y="12" width="12" height="2" fill="#c8b4f0" />
      <rect x="10" y="16" width="12" height="2" fill="#c8b4f0" />
      <rect x="10" y="20" width="8" height="2" fill="#c8b4f0" />
    </g>

    <!-- Original PlusKit mascot (not a game character) -->
    <g v-else-if="name === 'pluskit'">
      <rect x="8" y="10" width="16" height="14" fill="#4d23cf" />
      <rect x="9" y="11" width="14" height="12" fill="#ffe9fb" />
      <rect x="9" y="11" width="14" height="3" fill="#90f4e4" />
      <rect x="12" y="15" width="2" height="2" fill="#4d23cf" />
      <rect x="18" y="15" width="2" height="2" fill="#4d23cf" />
      <rect x="14" y="18" width="4" height="2" fill="#ff7ad4" />
      <rect x="14" y="5" width="4" height="6" fill="#4d23cf" />
      <rect x="15" y="6" width="2" height="4" fill="#90f4e4" />
      <rect x="13" y="3" width="6" height="3" fill="#eaa0e8" />
      <rect x="15" y="2" width="2" height="2" fill="#ffd36a" />
      <rect x="6" y="22" width="4" height="3" fill="#c8b4f0" />
      <rect x="22" y="22" width="4" height="3" fill="#c8b4f0" />
    </g>

    <!-- Stickers -->
    <g v-else-if="name === 'sticker-heart'">
      <rect x="8" y="10" width="6" height="6" fill="#ff6eb4" />
      <rect x="18" y="10" width="6" height="6" fill="#ff6eb4" />
      <rect x="10" y="14" width="12" height="8" fill="#ff6eb4" />
      <rect x="12" y="20" width="8" height="3" fill="#ff6eb4" />
      <rect x="14" y="22" width="4" height="3" fill="#ff6eb4" />
      <rect x="10" y="12" width="2" height="2" fill="#fff" />
    </g>
    <g v-else-if="name === 'sticker-star'">
      <rect x="14" y="4" width="4" height="24" fill="#ffd36a" />
      <rect x="6" y="12" width="20" height="4" fill="#ffd36a" />
      <rect x="8" y="8" width="4" height="4" fill="#ffd36a" />
      <rect x="20" y="8" width="4" height="4" fill="#ffd36a" />
      <rect x="8" y="20" width="4" height="4" fill="#ffd36a" />
      <rect x="20" y="20" width="4" height="4" fill="#ffd36a" />
    </g>
    <g v-else-if="name === 'sticker-sparkle'">
      <rect x="14" y="6" width="4" height="20" fill="#7a5cff" />
      <rect x="8" y="14" width="16" height="4" fill="#7a5cff" />
      <rect x="6" y="8" width="3" height="3" fill="#90f4e4" />
      <rect x="23" y="20" width="3" height="3" fill="#ff7ad4" />
    </g>
    <g v-else-if="name === 'sticker-plus'">
      <rect x="13" y="6" width="6" height="20" fill="#4d23cf" />
      <rect x="6" y="13" width="20" height="6" fill="#4d23cf" />
      <rect x="14" y="7" width="4" height="18" fill="#90f4e4" />
      <rect x="7" y="14" width="18" height="4" fill="#90f4e4" />
    </g>
    <g v-else-if="name === 'sun'">
      <rect x="11" y="11" width="10" height="10" fill="#ffd36a" />
      <rect x="13" y="13" width="6" height="6" fill="#ffe9a0" />
      <rect x="15" y="4" width="2" height="5" fill="#ffb347" />
      <rect x="15" y="23" width="2" height="5" fill="#ffb347" />
      <rect x="4" y="15" width="5" height="2" fill="#ffb347" />
      <rect x="23" y="15" width="5" height="2" fill="#ffb347" />
    </g>

    <g v-else>
      <rect x="8" y="8" width="16" height="16" fill="#eaa0e8" />
    </g>
  </svg>
</template>
