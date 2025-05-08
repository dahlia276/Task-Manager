<script setup lang="ts">
import Column from './Column.vue'
</script>

<template>
  <div class="board flex gap-4 p-4">
    <Column title="To Do" />
    <Column title="In Progress" />
    <Column title="Done" />
  </div>
</template>
