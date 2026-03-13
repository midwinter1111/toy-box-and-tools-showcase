<script setup lang="ts">
import { useSampleLogic } from '../composables/SamplePage.composable'

const { goBack, triggerError } = useSampleLogic()
</script>

<template>
  <div class="about">
    <h1>Sample Page</h1>
  </div>
  <div class="actions">
      <button @click="goBack">Back to Home</button>
      <button @click="triggerError" style="background-color: #ffcccc; margin-left: 10px;">
        Trigger Error
      </button>
    </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.actions {
  margin-top: 20px;
}
</style>
