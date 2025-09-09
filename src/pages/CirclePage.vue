<template>
  <div class="wrapper">
    <div class="controls">
      <label>Прогресс: {{ demoProgress }}%</label>
      <input type="range" v-model="demoProgress" min="0" max="100">

      <label>Статус:</label>
      <select v-model="demoStatus">
        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
      </select>

      <label>Тип:</label>
      <select v-model="demoType">
        <option value="circle">Circle</option>
        <option value="dashboard">Dashboard</option>
      </select>
    </div>

    <CircularProgressBar
      :model-value="+demoProgress"
      :status="demoStatus"
      :type="demoType"
      :size="150"
      :stroke-width="10"
      :duration="500"
    />
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import CircularProgressBar from '@/components/CircularProgressBar.vue';

const demoProgress = ref(50);
const demoStatus = ref<
  'in-progress' |
  'success' |
  'warning' |
  'error'
>('in-progress');

const demoType = ref<'circle' | 'dashboard'>('circle');

const statuses = ['in-progress', 'success', 'warning', 'error'] as const;
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  gap: 1rem;
}

.controls {
  display: grid;
  gap: 1rem;
  font-size: 1.2rem;
}
</style>
