<template>
  <section class="progress-container">
    <div class="progress-bar">
      <!-- Barra de progresso dinâmica baseada na percentagem -->
      <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      <span class="progress-text">{{ progressPercentage }}%</span>
    </div>
    <!-- Labels dos valores mínimo e máximo -->
    <div class="progress-labels">
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progressPercentage: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped>
.progress-container {
  width: 100%;
}

.progress-bar {
  position: relative;
  height: 30px;
  background-color: var(--bg-soft);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #42a5f5, #66bb6a);
  transition: width 0.3s ease-in-out;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

@media (min-width: 768px) {
  .progress-bar {
    height: 35px;
    border-radius: 17px;
  }

  .progress-text {
    font-size: 1rem;
  }
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 0 0.5rem;
}
</style>
