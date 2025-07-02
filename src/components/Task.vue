<script setup lang="ts">
import type { Task } from '../types'

defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  click: [task: Task]
  edit: [task: Task]
}>()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'todo':
      return 'border-l-gray-400'
    case 'in-progress':
      return 'border-l-blue-500'
    case 'done':
      return 'border-l-green-500'
    default:
      return 'border-l-gray-400'
  }
}
</script>

<template>
  <div
      class="task bg-white p-3 mb-2 rounded-lg shadow-sm border-l-4
           hover:shadow-md transition-all duration-200 cursor-pointer group"
      :class="getStatusColor(task.status)"
      @click="emit('click', task)"
  >
    <div class="flex items-start justify-between">
      <p class="text-gray-800 font-medium flex-1">{{ task.title }}</p>

      <!-- Edit button (shown on hover) -->
      <button
          @click.stop="emit('edit', task)"
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-200
               text-gray-400 hover:text-gray-600 p-1 rounded ml-2"
          title="Edit task"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
