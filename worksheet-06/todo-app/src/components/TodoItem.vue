<template>
  <article
    :class="['todo-item', { completed: todo.completed }]"
    :style="{ borderLeftColor: getPriorityColor(todo.priority) }"
  >
    <!-- Checkbox para marcar como concluída -->
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="toggleTodo(todo.id)"
      class="todo-checkbox"
    />

    <!-- Texto da tarefa -->
    <span class="todo-text">{{ todo.text }}</span>

    <!-- Selector de prioridade -->
    <select
      :value="todo.priority"
      @change="updateTodoPriority(todo.id, $event.target.value)"
      class="priority-select"
      :class="getPriorityClass(todo.priority)"
      :disabled="todo.completed"
    >
      <option v-for="priority in PRIORITIES" :key="priority" :value="priority">
        {{ priority }}
      </option>
    </select>

    <!-- Botão eliminar -->
    <button @click="removeTodo(todo.id)" class="delete-btn" title="Eliminar tarefa">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--text-secondary)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-trash2-icon lucide-trash-2"
      >
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    </button>
  </article>
</template>

<script>
import { PRIORITIES } from '@/constants/todo'
import { useTodoStore } from '@/stores/todo'
import { mapActions } from 'pinia'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
      validator(value) {
        // Validar estrutura básica do objeto todo
        return (
          value &&
          typeof value.id === 'string' &&
          typeof value.text === 'string' &&
          typeof value.completed === 'boolean' &&
          typeof value.priority === 'string' &&
          PRIORITIES.includes(value.priority)
        )
      },
    },
  },
  data() {
    return {
      PRIORITIES,
    }
  },
  methods: {
    ...mapActions(useTodoStore, ['toggleTodo', 'removeTodo', 'updateTodoPriority']),

    getPriorityClass(priority) {
      return `priority-${priority
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()}`
    },

    getPriorityColor(priority) {
      // Retorna cor para border-left consoante prioridade
      const colors = {
        baixa: 'var(--color-blue)',
        média: 'var(--color-warning)',
        alta: 'var(--color-danger)',
      }
      return colors[priority] || 'var(--border-color)'
    },
  },
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--bg-soft);
  border: 1px solid var(--border-color);
  border-left-width: 4px;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.todo-item.completed {
  opacity: 0.6;
  border-left-color: var(--border-color) !important;
}

.todo-item:hover {
  background-color: var(--bg-secondary);
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
}

.todo-text {
  flex: 1;
  color: var(--text-primary);
  word-break: break-word;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.priority-select {
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: inherit;
  font-size: var(--font-size-sm);
  text-transform: capitalize;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.priority-select:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.priority-select.priority-baixa {
  border-color: var(--color-blue);
}

.priority-select.priority-media {
  border-color: var(--color-warning);
}

.priority-select.priority-alta {
  border-color: var(--color-danger);
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: var(--spacing-xs);
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .todo-item {
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
  }

  .priority-select {
    font-size: var(--font-size-xs);
  }
}
</style>
