<script setup lang="ts">
import { useHelloWorldLogic } from '../composables/HelloWorld.composable'

const { navigateToSample } = useHelloWorldLogic()

</script>

<template>
  <header class="app-header">
    <h1>Vue 3 Asset Template</h1>
  </header>

  <br/>

  <div class="hello-world">
    <h2>HelloWorld</h2>
    <button class="btn-primary" @click="navigateToSample">
      Goto Sample Page
    </button>
  </div>
</template>

<style scoped>
.hello-world {
  text-align: center;
}
.btn-primary {
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
