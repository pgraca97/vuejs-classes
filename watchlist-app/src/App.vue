<script>
export default {
  // Data: estado reativo do componente
  data() {
    return {
      message: 'Hello World',
      greetings: 'My first web vue app',
      movieInput: '', // Input ligado ao v-model
      movieArray: [], // Array que armazena os filmes
    }
  },

  methods: {
    // Método para adicionar filme à lista
    addMovie() {
      this.movieArray.push(this.movieInput) // Adiciona ao array
      console.log(this.movieArray) // Debug: mostra array no console
      this.movieInput = '' // Limpa o input após adicionar
    },
  },
}
</script>

<template>
  <header>
    <!-- Interpolação: mostra dados do componente -->
    <h1>{{ message }}</h1>
    <p>{{ greetings }}</p>
  </header>

  <div class="app">
    <div class="movie-forms">
      <!-- v-model: liga input ao estado -->
      <!-- @keyup.enter: executa método ao pressionar Enter -->
      <input
        type="text"
        placeholder="Nome da série ou filme"
        v-model="movieInput"
        @keyup.enter="addMovie"
      />
      <!-- @click: executa método ao clicar -->
      <button @click="addMovie">Adicionar</button>
    </div>

    <div class="movie-list">
      <h2 id="movie-list">Movie List</h2>
      <!-- v-for: renderiza lista dinamicamente -->
      <!-- :key: identifica cada item uniquamente -->
      <ul aria-labelledby="movie-list">
        <li v-for="(movie, index) in movieArray" :key="movie">
          {{ movie }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* scoped: CSS apenas para este componente */
h1 {
  color: red;
}

div.movie-forms {
  display: flex;
  gap: 10px;
}
</style>
