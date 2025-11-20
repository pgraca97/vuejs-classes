<template>
  <section class="history-container">
    <h2>Últimas 5 Operações</h2>
    <p>Total de Operações: {{ historyCount }}</p>

    <!-- Lista das últimas operações realizadas -->
    <ul v-if="last5Entries.length > 0">
      <li v-for="(entry, index) in last5Entries" :key="index">
        <span class="operation">{{ entry.operation }}</span>
        <span class="value">{{ entry.value }}</span>
        <span class="time">{{ formatTime(entry.timestamp) }}</span>
      </li>
    </ul>

    <!-- Empty state para quando não há operações -->
    <p v-else class="empty">Nenhuma operação realizada ainda</p>
  </section>
</template>

<script>
export default {
  name: 'OperationsHistory',
  props: {
    last5Entries: {
      type: Array,
      required: true,
    },
    historyCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    // Formata timestamp para hora legível (HH:MM:SS)
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 0.5rem;
}

.history-container h2 {
  margin-bottom: 0.3rem;
  font-size: 1.25rem;
}

@media (min-width: 768px) {
  .history-container {
    margin-top: 1rem;
  }

  .history-container h2 {
    font-size: 1.5rem;
  }
}

.history-container p {
  font-style: italic;
  color: var(--text-secondary);

}

.history-container ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0 ;

  overflow-y: auto;
}

.history-container li {
  padding: 0.75rem;
  background-color: var(--bg-soft);
  border-radius: var(--radius-md);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid var(--border-color);
  transition: all 0.2s;
}

@media (min-width: 768px) {
  .history-container li {
    padding: 1rem;
    grid-template-columns: 1fr auto auto;
    gap: 1rem;
  }
}

.history-container li:hover {
  border-color: var(--border-color-hover);
}

.operation {
  font-weight: 600;
  color: var(--color-warning);
  font-family: 'Courier New', monospace;
}

.value {
  color: var(--color-success);
  font-weight: bold;
  font-size: 1.1rem;
  text-align: right;
  min-width: 50px;
}

.time {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: monospace;
  text-align: right;
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .time {
    font-size: 0.85rem;
    grid-column: auto;
    min-width: 100px;
  }
}

.empty {
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
  padding: 2rem;
}
</style>
