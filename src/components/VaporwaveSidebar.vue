<script setup>
/* Original vaporwave panel — inspired by the genre, not a copy of the game art. */
</script>

<template>
  <aside class="vapor-sidebar" aria-hidden="true">
    <svg viewBox="0 0 168 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3a1a8a" />
          <stop offset="28%" stop-color="#c45cff" />
          <stop offset="55%" stop-color="#ff7ab8" />
          <stop offset="72%" stop-color="#ff9a4a" />
          <stop offset="88%" stop-color="#ff6a3a" />
          <stop offset="100%" stop-color="#2a1040" />
        </linearGradient>
      </defs>
      <rect width="168" height="900" fill="url(#sky)" />
      <!-- sun -->
      <circle cx="84" cy="620" r="48" fill="#ffd36a" />
      <circle cx="84" cy="620" r="36" fill="#ffe9a0" />
      <!-- horizon bands -->
      <rect x="0" y="620" width="168" height="8" fill="#ff8a40" opacity="0.5" />
      <rect x="0" y="636" width="168" height="4" fill="#ffb060" opacity="0.4" />
      <rect x="0" y="648" width="168" height="4" fill="#ffd080" opacity="0.3" />
      <!-- buildings -->
      <rect x="8" y="700" width="28" height="200" fill="#1a0a30" />
      <rect x="14" y="712" width="6" height="8" fill="#ffb0ff" />
      <rect x="22" y="728" width="6" height="8" fill="#90f4e4" />
      <rect x="14" y="748" width="6" height="8" fill="#ffb0ff" />
      <rect x="40" y="740" width="36" height="160" fill="#140824" />
      <rect x="46" y="752" width="8" height="8" fill="#90f4e4" />
      <rect x="58" y="768" width="8" height="8" fill="#ffb0ff" />
      <rect x="88" y="680" width="22" height="220" fill="#1c0c38" />
      <rect x="118" y="720" width="42" height="180" fill="#120820" />
      <rect x="126" y="736" width="8" height="8" fill="#90f4e4" />
      <rect x="140" y="752" width="8" height="8" fill="#ffb0ff" />
      <!-- original utility pole, simpler and offset differently than the reference -->
      <rect x="64" y="560" width="6" height="340" fill="#120820" />
      <rect x="46" y="600" width="42" height="5" fill="#120820" />
      <rect x="50" y="640" width="34" height="4" fill="#120820" />
      <path d="M8 592 Q64 620 160 580" fill="none" stroke="#120820" stroke-width="2" />
      <path d="M0 632 Q64 660 168 620" fill="none" stroke="#120820" stroke-width="2" />
      <!-- stars -->
      <rect x="20" y="40" width="4" height="4" fill="#fff" />
      <rect x="120" y="70" width="3" height="3" fill="#ffe9fb" />
      <rect x="50" y="110" width="3" height="3" fill="#fff" />
      <rect x="140" y="150" width="4" height="4" fill="#90f4e4" />
      <rect x="30" y="200" width="3" height="3" fill="#fff" />
    </svg>
    <div class="vapor-caption">HOI ON · 2025</div>
  </aside>
</template>
