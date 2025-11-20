<script>
import { mapState, mapActions } from 'pinia'
import { useCounterStore } from './stores/counter'
import CounterDisplay from './components/CounterDisplay.vue'
import ProgressBar from './components/ProgressBar.vue'
import CounterControls from './components/CounterControls.vue'
import OperationsHistory from './components/OperationsHistory.vue'

export default {
  name: 'App',
  components: {
    CounterDisplay,
    ProgressBar,
    CounterControls,
    OperationsHistory,
  },
  computed: {
    // Mapear state e getters da store para computed properties
    ...mapState(useCounterStore, [
      'count',
      'isMaxReached',
      'isMinReached',
      'progressPercentage',
      'historyCount',
      'last5Entries',
      'min',
      'max',
    ]),
  },
  methods: {
    // Mapear actions da store para methods
    ...mapActions(useCounterStore, ['increment', 'decrement', 'reset', 'incrementByAmount']),
  },
}
</script>

<template>
  <header>
    <h1>Counter App</h1>
    <span v-if="isMaxReached" class="badge badge-danger">Máximo Atingido</span>
    <span v-else-if="isMinReached" class="badge badge-warning">Mínimo Atingido</span>
  </header>

  <main>
    <!-- Display do valor atual com indicadores de limite -->
    <CounterDisplay :count="count" :is-max-reached="isMaxReached" :is-min-reached="isMinReached" />

    <!-- Barra de progresso visual (min → max) -->
    <ProgressBar :progress-percentage="progressPercentage" :min="min" :max="max" />

    <!-- Botões de controlo das operações -->
    <CounterControls
      :is-max-reached="isMaxReached"
      :is-min-reached="isMinReached"
      @increment="increment"
      @decrement="decrement"
      @increment-by-amount="incrementByAmount"
      @reset="reset"
    />

    <!-- Histórico das últimas operações -->
    <OperationsHistory :last5-entries="last5Entries" :history-count="historyCount" />
  </main>
</template>

<style scoped>
header {
  text-align: left;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (min-width: 768px) {
  header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  header h1 {
    font-size: 2.5rem;
  }
}

main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>
