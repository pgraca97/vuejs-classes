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
        // Dados de exemplo para testares
        { id: 1, description: 'Aprender Vue.js', completed: false },
        { id: 2, description: 'Fazer exercícios', completed: true },
      ],
      STORAGE_KEY: 'vue-tasks'
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
  // Carrega do localStorage quando o componente é criado
  mounted() {
    const savedTasks = localStorage.getItem(this.STORAGE_KEY)
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks)
    }
  },
  methods: {
    addTask(description) {
      // Cria nova tarefa e adiciona ao array
      const newTask = {
        id: self.crypto.randomUUID(),
        description: description,
        completed: false,
      }
      this.tasks.push(newTask)
      this.savedTasks() // Guarda após alterar
    },
    
    toggleTask(taskId) {
      // Encontra a tarefa e inverte o completed
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        this.savedTasks() 
      }
    },
    
    deleteTask(taskId) {
      // Remove a tarefa do array
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      this.savedTasks() 
    },

    savedTasks() {
      // Guarda o array de tarefas no localStorage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks))
    },
  },
}
</script>

<template>
  <div class="task-manager">
    <!-- Input para adicionar novas tarefas -->
    <TaskInput @add-task="addTask" />
    
    <!-- Contador de tarefas -->
    <div class="task-counter">
      <p>Total de tarefas: {{ totalTasks }}</p>
      <p>Tarefas completas: {{ completedTasks }} / {{ totalTasks }}</p>
    </div>
    
    <!-- Lista de tarefas -->
    <div class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-task="toggleTask"
        @delete-task="deleteTask"
      />
      
      <!-- Mensagem quando não há tarefas -->
      <p v-if="tasks.length === 0" class="empty-message">
        Nenhuma tarefa ainda. Adiciona uma acima!
      </p>
    </div>
  </div>
</template>

<style scoped>
.task-manager {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.task-counter {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

.task-counter p {
  margin: 0.25rem 0;
  font-weight: 600;
  color: #555;
}

.task-list {
  margin-top: 1.5rem;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 2rem;
}
</style>