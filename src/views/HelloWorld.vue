<template>
  <div class="dashboard">
    <h1>ツール選択</h1>
    <div class="card-grid">
      <div
        v-for="item in navigationItems"
        :key="item.id"
        class="nav-card"
        @click="navigateTo(item.path)"
      >
        <img :src="item.thumbnail" :alt="item.title" />
        <h3>{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHelloWorldLogic } from '../composables/HelloWorld.composable';

const { navigationItems, navigateTo } = useHelloWorldLogic();
</script>

<style scoped>
.dashboard {
  padding: 2rem;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
.nav-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.nav-card:hover {
  transform: translateY(-5px);
}
.nav-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
