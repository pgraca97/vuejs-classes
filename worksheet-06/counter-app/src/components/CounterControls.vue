<template>
  <section class="controls-container">
    <!-- Botões de controlo com validação de limites -->
    <button @click="$emit('decrement')" :disabled="isMinReached">-1</button>
    <button @click="$emit('increment')" :disabled="isMaxReached">+1</button>
    <button @click="$emit('increment-by-amount', 5)" :disabled="isMaxReached">+5</button>
    <button @click="$emit('reset')" class="btn-reset">Reset</button>
  </section>
</template>

<script>
export default {
  name: 'CounterControls',
  props: {
    isMaxReached: {
      type: Boolean,
      required: true,
    },
    isMinReached: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['increment', 'decrement', 'increment-by-amount', 'reset'],
}
</script>

<style scoped>
.controls-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

button {
  font-family: inherit;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: var(--radius-md);
  flex: 1 1 auto;
  min-width: 70px;
}

@media (min-width: 768px) {
  .controls-container {
    gap: 1rem;
  }

  button {
    flex: 0 1 auto;
    min-width: 80px;
  }
}

button:hover:not(:disabled) {
  border-color: var(--border-color-hover);
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-reset {
  background-color: var(--color-danger);
  border-color: var(--color-danger);
}
</style>
