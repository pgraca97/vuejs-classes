<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
      validator(value) {
        // Valida que o objeto task tem a estrutura esperada
        return (
          value.id && value.description && typeof value.completed === 'boolean'
        )
      },
    },
  },
  methods: {
    toggleTask() {
      // Emite evento com o ID da tarefa para o pai alterar o estado
      this.$emit('toggle-task', this.task.id)
    },
    deleteTask() {
      // Emite evento com o ID da tarefa para o pai remover do array
      this.$emit('delete-task', this.task.id)
    },
  },
}
</script>

<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <label class="checkbox-wrapper">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleTask"
        class="task-checkbox"
      />
      <span class="custom-checkbox"></span>
    </label>

    <span class="task-description">
      {{ task.description }}
    </span>

    <button @click="deleteTask" class="delete-button">Remover</button>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--divider);
  border-radius: 4px;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.task-item.completed {
  background: var(--black-muted);
  border: 1px solid var(--green);
}

/* Checkbox wrapper */
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* Esconde checkbox nativa */
.checkbox-wrapper input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Custom checkbox */
.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid var(--divider);
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-wrapper:hover input[type='checkbox']:not(:checked) + .custom-checkbox {
  background-color: var(--black-mute);
}

.checkbox-wrapper input[type='checkbox']:checked + .custom-checkbox {
  background: var(--black-muted);
}

/* Checkmark */
.checkbox-wrapper input[type='checkbox']:checked + .custom-checkbox::after {
  content: '✓';
  color: var(--green);
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s;
}

.checkbox-wrapper:hover input[type='checkbox']:checked + .custom-checkbox::after {
  color: var(--text-dark-secondary);
}

.task-description {
  flex: 1;
  font-family: inherit;
  margin-bottom: 0.15rem;
  color: var(--text-dark);
  font-size: 1rem;
  transition: all 0.2s;
}

.task-item.completed .task-description {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  font-family: inherit;
  padding: 0.5rem 0.75rem;
  background: var(--black-mute);
  color: var(--text-dark);
  border: 1px solid var(--divider);
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;
}

.delete-button:hover {
  color: var(--red);
}
</style>