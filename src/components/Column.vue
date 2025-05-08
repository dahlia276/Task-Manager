<script setup lang="ts">
import Task from './Task.vue'

defineProps<{
  title: string
}>()

const testTasks = [
  { id: '1', title: 'Sample Task 1' },
  { id: '2', title: 'Sample Task 2' }
]
</script>

<template>
  <div class="column w-64 p-4 bg-gray-100 rounded">
    <h3 class="font-bold mb-3">{{ title }}</h3>
    <Task v-for="task in testTasks" :key="task.id" :task="task" />
  </div>
</template>
