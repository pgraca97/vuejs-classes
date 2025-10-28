<script>
import RatingStars from './RatingStars.vue'

export default {
  name: 'MovieReview',
  components: {
    RatingStars,
  },
  // Agora recebe o objeto completo do filme
  // Incluindo rating e isWatched
  props: {
    movie: {
      type: Object,
      required: true,
      validator(value) {
        // Valida que o objeto tem todas as propriedades necessárias
        return (
          value.id &&
          value.title &&
          value.description &&
          typeof value.rating === 'number' &&
          typeof value.isWatched === 'boolean'
        )
      },
    },
  },
  methods: {
    handleRatingChange(rating) {
      // Não guarda localmente, emite evento para o pai
      // Passa o ID do filme e o novo rating
      this.$emit('rating-changed', this.movie.id, rating)
    },
    handleMarkAsWatched() {
      // Emite evento com o ID do filme
      this.$emit('mark-as-watched', this.movie.id)
    },
  },
}
</script>

<template>
  <div class="movie-review" :class="{ watched: movie.isWatched }">
    <span class="title"
      ><h2>{{ movie.title }}</h2>
      <svg
        v-if="movie.isWatched"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-circle-check-icon lucide-circle-check"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </span>
    <p class="description">{{ movie.description }}</p>

    <!-- Passa o rating atual do filme -->
    <RatingStars :rating="movie.rating" @rating-changed="handleRatingChange" />

    <!-- Utiliza o rating do objeto filme -->
    <p class="rating-display" v-if="movie.rating > 0">Classificação: {{ movie.rating }}/5</p>
    <p class="rating-display" v-else>Clique para classificar</p>

    <!-- Utiliza o isWatched do objeto filme -->
    <button @click="handleMarkAsWatched" class="watched-btn" :disabled="movie.isWatched">
      {{ movie.isWatched ? 'Já Visto' : 'Marcar como Visto' }}
    </button>


  </div>
</template>

<style scoped>

.movie-review {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 1.5rem;
  background-color: var(--bg-soft);
  transition: border-color 0.3s;
}

.movie-review.watched {
  border-color: var(--green);
}

span.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

span.title svg {
  color: var(--green);
}

.movie-review h2 {
  margin: 0;
}

.description {
  color: var(--text-dark-secondary);
  margin: 1rem 0;
  flex: 1;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.5em;
}

.rating-display {
  margin-top: auto;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--text-dark-secondary);
}

.watched-btn {
  font-family: inherit;
  width: 100%;
  padding: 0.75rem;
  background-color: var(--black-mute);
  color: white;
  border: 1px solid var(--divider);
  border-radius: 8px;

  font-size: 0.9rem;
  font-weight: 600;

  color: rgba(255, 255, 255, 0.87);
  cursor: pointer;
  line-height: 1.7;

  margin-top: 1rem;

  transition: background-color 0.3s;
}

.watched-btn:hover:not(:disabled) {
  background-color: var(--black-muted);
}

.watched-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}


</style>
