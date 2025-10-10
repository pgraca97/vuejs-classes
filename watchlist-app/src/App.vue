<script>
export default {
  // Data: estado reativo do componente
  data() {
    return {
      message: 'Hello World',
      greetings: 'My first web vue app',
      movieInput: '', // Input ligado ao v-model
      movieArray: [], // Array que armazena os filmes (agora objetos)
      movieId: 1, // ID incremental para cada filme
    }
  },

  methods: {
    // Método para adicionar filme à lista
    addMovie() {
      // Verificar se o input não está vazio
      if (this.movieInput.trim() === '') {
        alert('Por favor, insira o nome de um filme ou série!')
        return // Sai do método sem adicionar
      }

      // Cria objeto com nome e ID único
      const newMovie = {
        id: this.movieId++, // Incrementa após cada utilização
        name: this.movieInput,
        // Alternativa com UUID (mais robusto):
        // id: self.crypto.randomUUID(), -> https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
      }

      this.movieArray.push(newMovie) // Adiciona objeto ao array
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
      <!-- :key: usa ID único (não o nome, que nesta lógica pode ser duplicado) -->
      <ul aria-labelledby="movie-list">
        <li v-for="movie in movieArray" :key="movie.id">
          {{ movie.name }}
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
