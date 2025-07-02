<script setup lang="ts">
import { computed } from 'vue'
import Task from './Task.vue'
import type { Column, Task as TaskType } from '../types'

const props = defineProps<{
  column: Column
}>()

const emit = defineEmits<{
  'task-click': [task: TaskType]
  'task-edit': [task: TaskType]
  'add-task': [columnId: string]
}>()

const columnHeaderClass = computed(() => {
  const baseClass = 'font-semibold mb-4 text-sm uppercase tracking-wide'
  switch (props.column.id) {
    case 'todo':
      return `${baseClass} text-gray-600`
    case 'in-progress':
      return `${baseClass} text-blue-600`
    case 'done':
      return `${baseClass} text-green-600`
    default:
      return `${baseClass} text-gray-600`
  }
})

const columnBorderClass = computed(() => {
  switch (props.column.id) {
    case 'todo':
      return 'bg-gray-50 border-gray-200'
    case 'in-progress':
      return 'bg-blue-50 border-blue-200'
    case 'done':
      return 'bg-green-50 border-green-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
})


const handleTaskClick = (task: TaskType) => {
  emit('task-click', task)
}

const handleTaskEdit = (task: TaskType) => {
  emit('task-edit', task)
}

const handleAddTask = () => {
  emit('add-task', props.column.id)
}
</script>

<template>
  <div class="w-80 rounded-lg p-4 border" :class="columnBorderClass">
    <!-- Column Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 :class="columnHeaderClass">{{ column.title }}</h2>
        <span class="text-xs text-gray-400">{{ column.tasks.length }} tasks</span>
      </div>

      <!-- Add Task Button -->
      <button
          @click="handleAddTask"
          class="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg
               transition-all duration-200"
          title="Add new task"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
      </button>
    </div>

    <!-- Tasks Container -->
    <div class="min-h-[200px]">
      <!-- Empty State -->
      <div v-if="column.tasks.length === 0"
           class="text-center py-8 text-gray-400">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
        </svg>
        <p class="text-sm">No tasks yet</p>
        <button
            @click="handleAddTask"
            class="text-xs mt-1 text-blue-500 hover:text-blue-600 underline"
        >
          Add your first task!
        </button>
      </div>

      <!-- Task List -->
      <div v-else class="space-y-2">
        <Task
            v-for="task in column.tasks"
            :key="task.id"
            :task="task"
            @click="handleTaskClick"
            @edit="handleTaskEdit"
        />
      </div>
    </div>
  </div>
</template>
