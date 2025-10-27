<script>
import TaskManager from './components/TaskManager.vue'

export default {
  name: 'App',
  components: {
    TaskManager,
  },
}
</script>

<template>
  <div class="app">
    <h1>Gestor de Tarefas</h1>
    <TaskManager />
  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
}
</style>