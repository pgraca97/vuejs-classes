<script>
import TodoFilters from './components/TodoFilters.vue'
import ToDoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import TodoStats from './components/TodoStats.vue'

export default {
  name: 'App',
  components: {
    ToDoForm,
    TodoStats,
    TodoFilters,
    TodoList,
  },
  data() {
    return {
      activeFilter: 'todas',
    }
  },
  methods: {
    handleFilterChange(filter) {
      this.activeFilter = filter
    },
  },
}
</script>

<template>
  <header>
    <h1>To-Do App</h1>
  </header>
  <main>
    <to-do-form />
    <hr />
    <todo-stats />
    <hr />
    <todo-filters @filter-changed="handleFilterChange" />
    <hr />
    <todo-list :active-filter="activeFilter" />
  </main>
</template>

<style scoped>
header {
  text-align: left;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (min-width: 768px) {
  header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  header h1 {
    font-size: 2.5rem;
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

hr {
  width: 100%;
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 1rem 0;
}
</style>
