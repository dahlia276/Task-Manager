<script setup lang="ts">
import { ref, computed} from 'vue'
import Column from './Column.vue'
import type { Column as ColumnType, Task, TaskStatus } from '../types'

const boardTitle = ref('My Task Board')
const columns = ref<ColumnType[]>([
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Design database schema',
        status: 'todo',
        description: 'Create a comprehensive database schema for the task management system'
      },
      {
        id: '2',
        title: 'Create UI mockups',
        status: 'todo',
        description: 'Design wireframes and mockups for all main screens'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Build Board component',
        status: 'in-progress',
        description: 'Create the main kanban board with drag and drop functionality'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '4',
        title: 'Set up Vue project',
        status: 'done',
        description: 'Initialize Vue 3 project with TypeScript and Tailwind CSS'
      }
    ]
  }
])


const handleTaskClick = (task: Task) => {
  console.log('Task clicked:', task)
  // TODO: Open task detail modal
  alert(`Task: ${task.title}\n\nClick to view details (modal coming soon!)`)
}

const handleTaskEdit = (task: Task) => {
  console.log('Task edit:', task)

  // TODO: Replace with modal later
  const newTitle = prompt('Edit task title:', task.title)
  if (newTitle && newTitle.trim() && newTitle !== task.title) {
    columns.value.forEach(column => {
      const taskIndex = column.tasks.findIndex(t => t.id === task.id)
      if (taskIndex !== -1) {
        column.tasks[taskIndex].title = newTitle.trim()
        column.tasks[taskIndex].updatedAt = new Date()
      }
    })
  }
}

const handleAddTask = (columnId: string) => {
  const taskTitle = prompt('Enter task title:')
  if (taskTitle && taskTitle.trim()) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      status: columnId as TaskStatus,
      createdAt: new Date()
    }

    const column = columns.value.find(col => col.id === columnId)
    if (column) {
      column.tasks.push(newTask)
    }
  }
}

// Board actions
const clearCompletedTasks = () => {
  const doneColumn = columns.value.find(col => col.id === 'done')
  if (doneColumn && doneColumn.tasks.length > 0) {
    if (confirm(`Are you sure you want to clear ${doneColumn.tasks.length} completed tasks?`)) {
      doneColumn.tasks = []
    }
  }
}

const totalTasks = computed(() => {
  return columns.value.reduce((total, column) => total + column.tasks.length, 0)
})

const completionRate = computed(() => {
  const doneColumn = columns.value.find(col => col.id === 'done')
  const doneCount = doneColumn ? doneColumn.tasks.length : 0
  return totalTasks.value > 0 ? Math.round((doneCount / totalTasks.value) * 100) : 0
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Board Header -->
    <div class="bg-white shadow-sm border-b border-gray-200 p-6 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ boardTitle }}</h1>
          <div class="flex items-center space-x-6 text-sm text-gray-600">
  <span class="flex items-center">
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
    {{ totalTasks }} total tasks
  </span>
            <span class="flex items-center">
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    {{ completionRate }}% complete
  </span>
          </div>
        </div>

        <!-- Board Actions -->
        <div class="flex items-center space-x-3">
          <button
              @click="clearCompletedTasks"
              class="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700
                   rounded-lg transition-colors duration-200 flex items-center"
              :disabled="!columns.find(col => col.id === 'done')?.tasks.length"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>

    <!-- Board Content -->
    <div class="px-6 pb-6">
      <div class="flex gap-6 overflow-x-auto pb-4">
        <Column
            v-for="column in columns"
            :key="column.id"
            :column="column"
            @task-click="handleTaskClick"
            @task-edit="handleTaskEdit"
            @add-task="handleAddTask"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for horizontal overflow */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
