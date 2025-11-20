<template>
  <h2 class="list-title">List</h2>
  <div class="todo-list">
    <!-- Renderizar todos conforme filtro ativo -->
    <todo-item v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />

    <!-- Mensagem quando não há tarefas -->
    <p v-if="filteredTodos.length === 0" class="empty-message">
      {{ emptyMessage }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores/todo'
import { FILTERS } from '@/constants/todo';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  props: {
    // Recebe filtro ativo do componente pai
    activeFilter: {
      type: String,
      default: FILTERS[0],
    },
  },
  data() {
    return {
      FILTERS,
    }
  },
  computed: {
    ...mapState(useTodoStore, ['todos', 'activeToDos', 'completedToDos']),

    // Filtra todos consoante filtro ativo
    filteredTodos() {
      switch (this.activeFilter) {
        case FILTERS[1]:
          return this.activeToDos
        case FILTERS[2]:
          return this.completedToDos
        default:
          return this.todos
      }
    },

    // Mensagem quando lista está vazia
    emptyMessage() {
      if (this.todos.length === 0) {
        return 'Nenhuma tarefa adicionada. Começa por criar uma!'
      }

      switch (this.activeFilter) {
        case FILTERS[1]:
          return 'Nenhuma tarefa pendente. Bom trabalho!'
        case FILTERS[2]:
          return 'Nenhuma tarefa concluída ainda.'
        default:
          return 'Nenhuma tarefa disponível.'
      }
    },
  },
}
</script>

<style scoped>
.list-title {
  line-height: 0.8;
  font-weight: 600;
  display: inline-block;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
}

.empty-message {
  text-align: center;
  color: var(--text-secondary);
  padding: var(--spacing-xl);
  font-style: italic;
}
</style>
