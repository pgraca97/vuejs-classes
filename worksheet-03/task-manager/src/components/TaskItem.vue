<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
      validator(value) {
        return value.id && value.description && typeof value.completed === 'boolean'
      }
    }
  },
  methods: {
    toggleTask() {
      // Emite evento com o ID da tarefa
      this.$emit('toggle-task', this.task.id)
    },
    
    deleteTask() {
      // Emite evento com o ID da tarefa
      this.$emit('delete-task', this.task.id)
    },
  },
}
</script>

<template>
  <div class="task-item" :class="{ 'completed': task.completed }">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="toggleTask"
      class="task-checkbox"
    >
    
    <span class="task-description">
      {{ task.description }}
    </span>
    
    <button @click="deleteTask" class="delete-button">
      Remover
    </button>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.task-item:hover {
  background: #f9f9f9;
}

.task-item.completed {
  background: #f0f9f4;
  border-color: #27ae60;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-description {
  flex: 1;
  font-size: 1rem;
  transition: all 0.2s;
}

.task-item.completed .task-description {
  text-decoration: line-through;
  color: #999;
}

.delete-button {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.delete-button:hover {
  background: #c0392b;
}
</style>