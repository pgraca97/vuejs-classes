<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="todoText" type="text" placeholder="Add a new todo" class="todo-input" />
    <div class="form-group">
      <div class="priority-btns-container">
        <button
          v-for="priority in PRIORITIES"
          type="button"
          :key="priority"
          :class="[
            'priority-btn',
            getPriorityClass(priority),
            { active: currentPriority === priority },
          ]"
          @click="selectedPriority = priority"
          @mouseenter="hoverPriority = priority"
          @mouseleave="hoverPriority = null"
        >
          {{ priority }}
        </button>
      </div>
      <button type="submit" class="add-btn">Add Todo</button>
    </div>
  </form>
</template>

<script>
import { DEFAULT_PRIORITY, PRIORITIES } from '@/constants/todo'
import { useTodoStore } from '@/stores/todo'
import { mapActions } from 'pinia'

export default {
  name: 'TodoForm',
  data() {
    return {
      PRIORITIES,
      todoText: '',
      selectedPriority: DEFAULT_PRIORITY,
      hoverPriority: null,
    }
  },
  computed: {
    currentPriority() {
      return this.hoverPriority ?? this.selectedPriority
    },
  },
  methods: {
    ...mapActions(useTodoStore, ['addTodo']),

    getPriorityClass(priority) {
      return `priority-${priority
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()}`
    },

    // Submeter formulário e resetar campos
    handleSubmit() {
      this.addTodo(this.todoText, this.selectedPriority)

      // Reset do form
      this.todoText = ''
      this.selectedPriority = DEFAULT_PRIORITY
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
}
.priority-btns-container {
  display: flex;
  gap: var(--spacing-sm);
}

.priority-btns-container button {
  flex: 1;

  font-family: inherit;
  font-size: var(--font-size-md);
  color: var(--text-primary);

  text-transform: capitalize;

  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  cursor: pointer;
  transition: border-color 0.3s ease;
}

button.priority-baixa {
  color: var(--color-blue);
}

button.priority-media {
  color: var(--color-warning);
}

button.priority-alta {
  color: var(--color-danger);
}

button.priority-baixa:is(:hover, .active) {
  border-color: var(--color-blue);
}

button.priority-media:is(:hover, .active) {
  border-color: var(--color-warning);
}

button.priority-alta:is(:hover, .active) {
  border-color: var(--color-danger);
}

.form-group {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.todo-input {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 1.1rem;
  background-color: var(--bg-soft);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-dark);
  transition: all 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: var(--color-success);
}

.todo-input::placeholder {
  color: var(--text-secondary);
}

button[type='submit'].add-btn {
  background-color: var(--bg-soft);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: inherit;

  font-size: var(--font-size-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type='submit']:hover {
  background-color: var(--bg-secondary);
}
</style>
