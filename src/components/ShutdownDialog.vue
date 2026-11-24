<script setup>
import { useWindowManager } from '../composables/useWindowManager.js'

const { toggleShutdown } = useWindowManager()
</script>

<template>
  <div class="shutdown-backdrop" @click.self="toggleShutdown(false)">
    <div class="shutdown-dialog" role="dialog" aria-labelledby="shutdown-title">
      <div class="nso-titlebar">
        <span class="title-glyph" />
        <div id="shutdown-title" class="title-bar-text">Shut Down</div>
        <div class="nso-controls">
          <button class="ctrl" aria-label="Close" title="Close" @click="toggleShutdown(false)">
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 2 L8 8 M8 2 L2 8" stroke="#4d23cf" stroke-width="2" />
            </svg>
          </button>
        </div>
      </div>
      <div class="nso-body">
        <p>This is just a nostalgic joke — nothing will actually shut down.</p>
        <p>Want to keep exploring this pink-and-purple desktop?</p>
        <div class="btn-row">
          <button class="action-btn" type="button" @click="toggleShutdown(false)">Yes, I'll stay</button>
          <button class="action-btn pink" type="button" @click="toggleShutdown(false)">One more look</button>
        </div>
      </div>
      <div class="nso-statusbar">
        <span class="status-dots"><i /><i /><i /></span>
        <span>The system is still running</span>
      </div>
    </div>
  </div>
</template>
