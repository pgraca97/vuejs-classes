<template>
  <section class="counter-display">
    <h2>{{ count }}</h2>
  </section>
</template>

<script>
export default {
  name: 'CounterDisplay',
  props: {
    count: {
      type: Number,
      required: true,
    },
    isMaxReached: {
      type: Boolean,
      required: true,
    },
    isMinReached: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.counter-display {
  width: 100%;
}

.counter-display h2 {
  text-align: center;
  line-height: 0.8;
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

@media (min-width: 768px) {
  .counter-display h2 {
    font-size: 4rem;
  }
}
</style>
