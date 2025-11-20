import { DEFAULT_PRIORITY, isValidPriority, normalizePriority } from '@/constants/todo'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      // {
      //   id: crypto.randomUUID(),
      //   text: 'Learn Vue.js',
      //   completed: false,
      //   priority: 'alta',
      //   createdAt: new Date().toISOString(),
      // },
      // {
      //   id: crypto.randomUUID(),
      //   text: 'Complete worksheet 06',
      //   completed: true,
      //   priority: 'média',
      //   createdAt: new Date().toISOString(),
      // },
      // {
      //   id: crypto.randomUUID(),
      //   text: 'Review Pinia documentation',
      //   completed: false,
      //   priority: 'baixa',
      //   createdAt: new Date().toISOString(),
      // },
    ],
  }),

  // Persistir estado no localStorage
  persist: {
    key: 'todo-app',
    storage: localStorage,
  },
  getters: {
    completedToDos: (state) => state.todos.filter((todo) => todo.completed),
    activeToDos: (state) => state.todos.filter((todo) => !todo.completed),

    highPToDos: (state) =>
      state.todos.filter((todo) => todo.priority === 'alta' && !todo.completed),

    totalToDos: (state) => state.todos.length,

    totalCToDos: (state) => state.todos.filter((todo) => todo.completed).length,

    totalPToDos: (state) => state.todos.filter((todo) => !todo.completed).length,

    completedPercentage: (state) => {
      if (state.todos.length === 0) return 0
      return Math.round(
        (state.todos.filter((todo) => todo.completed).length / state.todos.length) * 100,
      )
    },
  },
  actions: {
    addTodo(text, priority) {
      // Validar: texto não vazio e mínimo 3 caracteres
      if (!text?.trim() || text.trim().length < 3) return

      const normalized = normalizePriority(priority)
      const finalPriority = isValidPriority(normalized) ? normalized : DEFAULT_PRIORITY

      // Adicionar no início da lista (mais recente primeiro)
      this.todos.unshift({
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        priority: finalPriority,
        createdAt: new Date().toISOString(),
      })
    },

    // Remove tarefa pelo ID
    removeTodo(id) {
      const i = this.todos.findIndex((todo) => todo.id === id)
      if (i === -1) return

      this.todos.splice(i, 1)
    },

    // Alterna estado completed da tarefa
    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (!todo) return

      todo.completed = !todo.completed
    },

    // Atualiza prioridade de uma tarefa
    updateTodoPriority(id, priority) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (!todo) return

      const normalized = normalizePriority(priority)
      todo.priority = isValidPriority(normalized) ? normalized : DEFAULT_PRIORITY
    },

    clearCompleted() {
      // Mantém apenas os que NÃO estão completos
      this.todos = this.todos.filter((todo) => !todo.completed)
    },

    // Remove todas as tarefas (pede confirmação)
    clearAll() {
      const confirmed = window.confirm(
        'Tens a certeza que queres remover todas as tarefas? Esta ação não pode ser revertida.',
      )

      if (!confirmed) return

      // $reset() repõe state ao inicial (neste caso, array vazia)
      this.$reset()
    },
  },
})
