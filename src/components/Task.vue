<script setup lang="ts">
defineProps<{
  task: {
    id: string
    title: string
  }
}>()
</script>

<template>
  <div class="task bg-white p-3 mb-2 rounded shadow">
    <p class="text-gray-800">{{ task.title }}</p>
  </div>
</template>
