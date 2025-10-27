<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      default: 0,
      validator(value) {
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
      // Emite o evento para o componente pai
      this.$emit('rating-changed', star)
    },
  },
}
</script>

<template>
  <div class="rating-stars" @mouseleave="hoverRating = 0">
    <!-- Renderiza 5 estrelas -->
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
  color: #ddd;
  transition: all 0.2s;
}

.star:hover {
  transform: scale(1.1);
  color: #f39c12;
}

.star.filled {
  fill: #f39c12;
  color: #f39c12;
}
</style>