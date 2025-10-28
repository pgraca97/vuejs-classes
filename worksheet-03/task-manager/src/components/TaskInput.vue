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
    />
    <button @click="addTask" class="add-button">Adicionar</button>
  </div>
</template>

<style scoped>
.task-input {
  display: flex;
  gap: 0.75rem;
}

input::placeholder {
  font-weight: 500;
}

.input-field {
  font-family: inherit;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-dark);
  background-color: transparent;
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--divider);
  border-radius: 4px;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: var(--green);
}

.add-button {
  font-family: inherit;
  padding-inline: 0.75rem;
  background: var(--black-mute);
  color: var(--text-dark);
  border: 1px solid var(--divider);
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;

  cursor: pointer;
  transition: background 0.2s;
}

.add-button:hover {
  background: var(--black-muted);
}

</style>
