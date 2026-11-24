<script setup>
import { useWindowManager } from '../composables/useWindowManager.js'

const { toggleShutdown } = useWindowManager()
</script>

<template>
  <div class="shutdown-backdrop" @click.self="toggleShutdown(false)">
    <div class="shutdown-dialog" role="dialog" aria-labelledby="shutdown-title">
      <div class="nso-titlebar">
        <span class="title-glyph" />
        <div id="shutdown-title" class="title-bar-text">關機</div>
        <div class="nso-controls">
          <button class="ctrl" aria-label="Close" title="關閉" @click="toggleShutdown(false)">
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 2 L8 8 M8 2 L2 8" stroke="#4d23cf" stroke-width="2" />
            </svg>
          </button>
        </div>
      </div>
      <div class="nso-body">
        <p>這只是懷舊小玩笑，並不會真的關閉任何東西。</p>
        <p>要繼續逛這個粉紫桌面嗎？</p>
        <div class="btn-row">
          <button class="action-btn" type="button" @click="toggleShutdown(false)">好，留下來</button>
          <button class="action-btn pink" type="button" @click="toggleShutdown(false)">再看一眼</button>
        </div>
      </div>
      <div class="nso-statusbar">
        <span class="status-dots"><i /><i /><i /></span>
        <span>系統仍在運作中</span>
      </div>
    </div>
  </div>
</template>
