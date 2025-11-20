<template>
  <h2 class="stats-title">Stats</h2>
  <div class="stats-grid">
    <p>
      Total tasks
      <strong>{{ totalToDos }}</strong>
    </p>
    <p>
      Concluídas
      <strong>{{ totalCToDos }}</strong>
    </p>
    <p>
      Pendentes
      <strong>{{ totalPToDos }}</strong>
    </p>
    <div class="progress-bar">
      <div class="progress-container">
        <div class="progress-fill" :style="[{ width: completedPercentage + '%' }]"></div>
        <span>{{ completedPercentage }} %</span>
      </div>
      <p>{{ totalCToDos }} de {{ totalToDos }} tarefas concluídas</p>
    </div>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todo'
import { mapState } from 'pinia'

export default {
  name: 'TodoStats',
  computed: {
    ...mapState(useTodoStore, ['totalToDos', 'totalCToDos', 'totalPToDos', 'completedPercentage']),
  },
}
</script>

<style scoped>
.stats-title {
  line-height: 0.8;
  font-weight: 600;
  display: inline-block;
}

.stats-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  align-items: start;
}

.stats-grid p {
  margin: 0;
  font-size: var(--font-size-base);
  background: var(--bg-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
}

.stats-grid > p {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-md);

  color: var(--text-secondary);
}

.stats-grid > p strong {
  font-size: 2rem;
  color: var(--text-primary);
}

.progress-bar {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  background: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  position: relative;
  overflow: hidden;
}

.progress-container {
  position: relative;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.progress-fill {
  height: 100%;

  background: linear-gradient(90deg, #42a5f5, #66bb6a);
  transition: width 0.3s ease-in-out;
}

.progress-container span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.progress-bar p {
  text-align: center;
  font-style: italic;
  color: var(--text-secondary);
  padding: 0;
  margin-top: var(--spacing-xs);
}
</style>
