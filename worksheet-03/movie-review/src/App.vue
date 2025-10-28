<script>
import MovieReview from './components/MovieReview.vue'

export default {
  name: 'App',
  components: {
    MovieReview,
  },
  data() {
    return {
      // Estado centralizado: App mantém todos os dados dos filmes
      movies: [
        {
          id: self.crypto.randomUUID(),
          title: 'Bring Her Back (2025)',
          description:
            'Two orphaned step-siblings are taken in by an adoptive mother with macabre intentions, discovering that she plans to use occult rituals to bring her dead daughter back to life.',
          isWatched: false,
          rating: 0,
        },
        {
          id: self.crypto.randomUUID(),
          title: 'Weapons (2025)',
          description:
            'A horror thriller directed by Zach Cregger, in which multiple seemingly unconnected stories intertwine around a mysterious violent event, exploring paranoia, violence, and the collapse of American morality.',
          isWatched: false,
          rating: 0,
        },
        {
          id: self.crypto.randomUUID(),
          title: 'Presence (2024)',
          description:
            'A psychological thriller directed by Steven Soderbergh about a family haunted by an invisible presence after moving house. As the supernatural events escalate, dark secrets and internal tensions are revealed, threatening to destroy them from within and forcing each member to confront their deepest fears.',
          isWatched: false,
          rating: 0,
        },
        {
          id: self.crypto.randomUUID(),
          title: 'Longlegs (2024)',
          description:
            'An FBI agent (Maika Monroe) investigates a serial killer who uses enigmatic codes and occult practices, uncovering a terrifying personal connection to the killer himself (Nicolas Cage).',
          isWatched: false,
          rating: 0,
        },
      ],
    }
  },
  methods: {
    // Handler de evento rating-changed vindo do MovieReview
    updateMovieRating(movieId, newRating) {
      const movie = this.movies.find((m) => m.id === movieId)
      if (!movie) return
      if (movie.rating === newRating && movie.isWatched) return

      movie.rating = newRating
      movie.isWatched = true // Marca como visto automaticamente ao avaliar
    },

    // Handler de evento mark-as-watched vindo do MovieReview
    markMovieAsWatched(movieId) {
      const movie = this.movies.find((m) => m.id === movieId)
      if (!movie || movie.isWatched) return

      movie.isWatched = true
    },
  }
}
</script>

<template>
  <div class="app">
    <h1>As Minhas Reviews</h1>

    <div class="movies-container">
      <!-- Passa objeto filme completo e ouve eventos emitidos pelo MovieReview -->
      <MovieReview
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @rating-changed="updateMovieRating"
        @mark-as-watched="markMovieAsWatched"
      />
    </div>
  </div>
</template>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>