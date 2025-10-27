<script>
export default {
  name: 'TaskInput',
  data() {
    return {
      newTaskDescription: '', // Input value
    }
  },
  methods: {
    addTask() {
      // Trim para remover espaços em branco no início/fim
      const description = this.newTaskDescription.trim()
      
      // Não permite adicionar tarefas vazias
      if (description === '') {
        return
      }
      
      // Emite evento com a descrição
      this.$emit('add-task', description)
      
      // Limpa o input
      this.newTaskDescription = ''
    },
    
    // Método para permitir adicionar com Enter
    handleKeyup(event) {
      if (event.key === 'Enter') {
        this.addTask()
      }
    },
  },
}
</script>

<template>
  <div class="task-input">
    <input
      v-model="newTaskDescription"
      @keyup="handleKeyup"
      type="text"
      placeholder="Adicionar nova tarefa..."
      class="input-field"
    >
    <button @click="addTask" class="add-button">
      Adicionar
    </button>
  </div>
</template>

<style scoped>
.task-input {
  display: flex;
  gap: 0.75rem;
}

.input-field {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #3498db;
}

.add-button {
  padding: 0.75rem 1.5rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-button:hover {
  background: #229954;
}
</style>