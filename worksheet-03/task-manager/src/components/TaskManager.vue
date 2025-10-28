<script>
import TaskInput from './TaskInput.vue'
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskManager',
  components: {
    TaskInput,
    TaskItem,
  },
  data() {
    return {
      tasks: [
        { id: 1, description: 'Aprender Vue.js', completed: false },
        { id: 2, description: 'Fazer exercícios', completed: true },
      ],
      STORAGE_KEY: 'vue-tasks',
    }
  },
  computed: {
    totalTasks() {
      return this.tasks.length
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed).length
    },
  },
  mounted() {
    // Carrega tarefas guardadas no localStorage
    const savedTasks = localStorage.getItem(this.STORAGE_KEY)
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks)
    }
  },
  methods: {
    addTask(description) {
      // Cria nova tarefa com UUID único
      const newTask = {
        id: self.crypto.randomUUID(),
        description: description,
        completed: false,
      }
      this.tasks.push(newTask)
      this.saveTasks()
    },

    toggleTask(taskId) {
      // Encontra tarefa pelo ID e inverte o estado completed
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        this.saveTasks()
      }
    },

    deleteTask(taskId) {
      // Remove tarefa do array através de filter
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      this.saveTasks()
    },

    saveTasks() {
      // Persiste array de tarefas no localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks))
    },
  },
}
</script>

<template>
  <div class="task-manager">
    <TaskInput @add-task="addTask" />

    <div v-if="totalTasks" class="task-counter">
      <p>Total de tarefas: {{ totalTasks }}</p>
      <p>Tarefas completas: {{ completedTasks }} / {{ totalTasks }}</p>
    </div>

    <div class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
      />

      <p v-if="!totalTasks" class="empty-message">
        Nenhuma tarefa ainda. Adiciona uma acima!
      </p>
    </div>
  </div>
</template>

<style scoped>
.task-manager {
  background: var(--bg-soft);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-counter {
  margin: 1.5rem 0;
}

.task-counter p {
  margin: 0.25rem 0;
  font-weight: 500;
  color: var(--text-dark-secondary);
}

.task-counter p:last-child {
  margin-bottom: 0;
}

.empty-message {
  text-align: center;
  color: var(--text-dark-secondary);
  margin-top: 2rem;
  margin-bottom: 0;
}
</style>