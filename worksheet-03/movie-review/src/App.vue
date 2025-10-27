<script>
import MovieReview from './components/MovieReview.vue'

export default {
  name: 'App',
  components: {
    MovieReview,
  },
  data() {
    return {
      // Cada filme é um objeto completo com TODAS as suas propriedades
      // Exatamente como viria de uma API ou base de dados
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
    // Método que será chamado quando o rating mudar
    // Recebe o ID do filme e o novo rating
    updateMovieRating(movieId, newRating) {
      // Encontra o filme no array pelo ID
      const movie = this.movies.find((m) => m.id === movieId)
      if (!movie) return

      if (movie.rating === newRating && movie.isWatched) return

      // Atualiza o rating do filme
      movie.rating = newRating
      movie.isWatched = true // marca como visto automaticamente
    },

    // Método que será chamado quando marcar como visto
    markMovieAsWatched(movieId) {
      const movie = this.movies.find((m) => m.id === movieId)
      if (!movie || movie.isWatched) return

      movie.isWatched = true
    },
  },
  computed: {
    // Exemplo de como agora podes fazer queries sobre os dados
    watchedMoviesCount() {
      return this.movies.filter((m) => m.isWatched).length
    },
    averageRating() {
      const ratedMovies = this.movies.filter((m) => m.rating > 0)
      if (ratedMovies.length === 0) return 0
      const sum = ratedMovies.reduce((acc, m) => acc + m.rating, 0)
      return (sum / ratedMovies.length).toFixed(1)
    },
  },
}
</script>

<template>
  <div class="app">
    <h1>As Minhas Reviews</h1>


    <div class="movies-container">
      <!-- Passa o objeto completo do filme -->
      <!-- E também passa os métodos que o filho pode chamar para atualizar o estado -->
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

.stats {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.stats p {
  margin: 0.5rem 0;
  font-weight: 600;
}

.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>
