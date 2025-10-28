<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      default: 0,
      validator(value) {
        // Valida que o rating está entre 0 e 5
        return value >= 0 && value <= 5
      }
    }
  },
  data() {
    return {
      hoverRating: 0,
    }
  },
  methods: {
    selectRating(star) {
      // Emite rating selecionado para o pai
      this.$emit('rating-changed', star)
    },
  },
}
</script>

<template>
  <div class="rating-stars" @mouseleave="hoverRating = 0">
    <!-- Renderiza 5 estrelas interativas -->
    <svg
      v-for="star in 5"
      :key="star"
      @click="selectRating(star)"
      @mouseenter="hoverRating = star"
      class="star"
      :class="{ 'filled': star <= (hoverRating || rating) }"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.rating-stars {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  margin-bottom: 0.5rem;
}

.star {
  cursor: pointer;
  color: var(--text-dark-secondary);
  transition: all 0.2s;
}

.star:hover {
  transform: scale(1.1);
  color: var(--yellow);
}

.star.filled {
  fill: var(--yellow);
  color: var(--yellow);
}
</style>