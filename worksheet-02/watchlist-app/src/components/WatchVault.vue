<template>
  <div class="watch-vault">
    <h1>Watch Vault</h1>

    <!-- Formulário de adição -->
    <form @submit.prevent="addToWatchlist" class="add-form">
      <h2>Add to Watchlist</h2>

      <!-- Campo Type -->
      <div class="form-group">
        <label class="form-label">Type *</label>
        <div class="radio-group">
          <label v-for="type in types" :key="type" class="radio-option">
            <input type="radio" v-model="form.type" :value="type" required />
            <span>{{ type }}</span>
          </label>
        </div>
      </div>

      <!-- Campo Name -->
      <div class="form-group">
        <label class="form-label" for="name">Name *</label>
        <input
          id="name"
          type="text"
          v-model="form.name"
          placeholder="Enter name (min. 3 characters)"
          minlength="3"
          required
        />
      </div>

      <!-- Campo Category -->
      <div class="form-group">
        <label class="form-label">Category *</label>
        <div class="radio-group">
          <label v-for="category in categories" :key="category" class="radio-option">
            <input type="radio" v-model="form.category" :value="category" required />
            <span>{{ category }}</span>
          </label>
        </div>
      </div>

      <!-- Campo Rating -->
      <div class="form-group">
        <label class="form-label">Rating</label>
        <!-- Rating interativo com estrelas -->
        <!-- @mouseleave reseta o preview quando sai do elemento -->
        <div class="rating-stars" @mouseleave="hoverRating = 0">
          <!-- Gera 10 estrelas dinamicamente -->
          <span
            v-for="star in 10"
            :key="star"
            @click="form.rating = star"
            @mouseenter="hoverRating = star"
            :class="['star', { filled: star <= (hoverRating || form.rating) }]"
          >
            <!-- SVG da estrela (Lucide icon) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
              />
            </svg>
          </span>
        </div>
        <!-- Mostra valor atual (preview se hover, senão rating selecionado) -->
        <span class="rating-value">{{ hoverRating || form.rating }}/10</span>
      </div>

      <!-- Botões -->
      <div class="form-actions">
        <button type="submit" class="btn-primary">Add to Watchlist</button>
        <button type="button" @click="clearForm" class="btn-secondary">Clear Form</button>
      </div>
    </form>

    <!-- Lista de items -->
    <div class="watchlist">
      <div class="watchlist-header">
        <h2>My Watchlist</h2>

        <!-- Contador dinâmico de items (computed properties) -->
        <div v-if="items.length > 0" class="items-counter">
          Total: {{ items.length }} items ({{ seriesCount }} series, {{ moviesCount }} movies)
        </div>
      </div>

      <!-- Controles de ordenação (só visível se houver items) -->
      <div v-if="items.length > 0" class="sort-controls">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" v-model="sortBy">
          <option value="">-- Select --</option>
          <option value="name">Name (Alphabetically)</option>
          <option value="rating">Rating</option>
        </select>
        <!-- Botão desabilitado se não houver critério selecionado -->
        <button @click="toggleSortOrder" class="btn-sort" :disabled="!sortBy">
          {{ sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending' }}
        </button>
      </div>

      <!-- Tabela de items (utiliza computed sortedItems) -->
      <div v-if="items.length > 0" class="table-container">
        <table class="watchlist-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- v-for com :key único (id gerado por UUID) -->
            <tr v-for="item in sortedItems" :key="item.id">
              <td>{{ item.type }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
              <td>
                <span class="rating-display"> {{ item.rating }}/10 ⭐ </span>
              </td>
              <td>
                <button @click="removeItem(item)" class="btn-remove">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estado vazio (v-else) -->
      <div v-else class="empty-message">
        <p>No items added yet. Add your first one!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatchVault',

  data() {
    return {
      // Lista principal de items (séries e filmes)
      items: [],

      // Dados do formulário de adição
      form: {
        type: 'Series', // Valor inicial do radio button
        name: '',
        category: 'Action', // Valor inicial do radio button
        rating: 0,
      },

      // Controlo de ordenação
      sortBy: '', // Critério: 'name' ou 'rating'
      sortOrder: 'asc', // Ordem: 'asc' ou 'desc'

      // UI state
      hoverRating: 0, // Estrela sobre a qual o rato está (para preview visual)

      // Configuração
      STORAGE_KEY: 'watchlist_items', // Chave para localStorage

      // Opções para os radio buttons
      types: ['Series', 'Movie'],
      categories: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'],
    }
  },

  computed: {
    // Conta quantas séries existem na lista
    seriesCount() {
      return this.items.filter((item) => item.type === 'Series').length
    },

    // Conta quantos filmes existem na lista
    moviesCount() {
      return this.items.filter((item) => item.type === 'Movie').length
    },

    // Retorna items ordenados conforme critério selecionado
    // Utiliza toSorted() (imutável) em vez de sort() (muta o array original)
    sortedItems() {
      if (!this.sortBy) {
        return this.items // Sem ordenação, retorna original
      }

      // toSorted() cria nova cópia (não modifica this.items)
      return this.items.toSorted((a, b) => {
        let compareA, compareB

        if (this.sortBy === 'name') {
          // Comparação alfabética (case-insensitive)
          compareA = a.name.toLowerCase()
          compareB = b.name.toLowerCase()

          // localeCompare: retorna -1 (A<B), 0 (A=B), 1 (A>B)
          return this.sortOrder === 'asc'
            ? compareA.localeCompare(compareB)
            : compareB.localeCompare(compareA)
        } else if (this.sortBy === 'rating') {
          // Comparação numérica
          compareA = a.rating
          compareB = b.rating

          // Subtração: retorna negativo (A<B), 0 (A=B), positivo (A>B)
          return this.sortOrder === 'asc' ? compareA - compareB : compareB - compareA
        }

        return 0 // Fallback: mantém ordem original
      })
    },
  },

  watch: {
    // Observa mudanças no array items e guarda automaticamente no localStorage
    // deep: true → detecta mudanças dentro de objetos/arrays nested
    items: {
      handler() {
        this.saveToLocalStorage()
      },
      deep: true,
    },
  },

  mounted() {
    // Carregar dados do localStorage quando componente é montado
    this.loadFromLocalStorage()
  },

  methods: {
    // Adiciona novo item à watchlist (com validações)
    addToWatchlist() {
      // Validação 1: nome deve ter mínimo 3 caracteres
      if (this.form.name.length < 3) {
        alert('Name must have at least 3 characters')
        return
      }

      // Validação 2: verificar duplicados (mesmo nome + tipo)
      const duplicate = this.items.find(
        (item) =>
          item.name.toLowerCase() === this.form.name.toLowerCase() && item.type === this.form.type,
      )

      if (duplicate) {
        alert(
          `A ${this.form.type} with the name "${this.form.name}" already exists in your watchlist!`,
        )
        return
      }

      // Validação 3: rating entre 0 e 10
      if (this.form.rating < 0 || this.form.rating > 10) {
        alert('Rating must be between 0 and 10')
        return
      }

      // Criar novo item com ID único
      const newItem = {
        id: self.crypto.randomUUID(), // Gera UUID único
        type: this.form.type,
        name: this.form.name.trim(), // Remove espaços extras
        category: this.form.category,
        rating: this.form.rating,
      }

      this.items.push(newItem)
      this.clearForm() // Limpar formulário após sucesso
    },

    // Repõe formulário aos valores iniciais
    clearForm() {
      this.form = {
        type: 'Series',
        name: '',
        category: 'Action',
        rating: 0,
      }
      this.hoverRating = 0 // Limpar preview de estrelas
    },

    // Remove item da lista (com confirmação)
    removeItem(item) {
      const confirmed = confirm(`Are you sure you want to remove "${item.name}"?`)

      if (confirmed) {
        const index = this.items.findIndex((i) => i.id === item.id)
        if (index !== -1) {
          this.items.splice(index, 1) // Remove 1 elemento na posição index
        }
      }
    },

    // Alterna entre ordem ascendente e descendente
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    },

    // Guarda items no localStorage (persistência de dados)
    saveToLocalStorage() {
      try {
        const jsonData = JSON.stringify(this.items)
        localStorage.setItem(this.STORAGE_KEY, jsonData)
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },

    // Carrega items do localStorage ao montar o componente
    loadFromLocalStorage() {
      try {
        const storedData = localStorage.getItem(this.STORAGE_KEY)

        if (storedData) {
          const parsedData = JSON.parse(storedData)

          // Validar se é array antes de atribuir
          if (Array.isArray(parsedData)) {
            this.items = parsedData
          }
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
        this.items = [] // Fallback: array vazio em caso de erro
      }
    },
  },
}
</script>

<style scoped>
.watch-vault {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

/* Formulário */
.add-form {
  background-color: #2f2f2f;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 0.95em;
}

/* Input de texto */
input[type='text'] {
  width: 100%;
  padding: 10px 12px;
  background-color: #1a1a1a;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.87);
  font-size: 1em;
  font-family: inherit;
  transition: border-color 0.3s;
}

input[type='text']:focus {
  outline: none;
  border-color: #42b883;
}

input[type='text']::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Radio buttons */
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  background-color: #1a1a1a;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 6px;
  transition: all 0.3s;
}

.radio-option:hover {
  background-color: rgba(84, 84, 84, 0.3);
}

.radio-option input[type='radio'] {
  cursor: pointer;
  width: 16px;
  height: 16px;
}

.radio-option span {
  font-size: 0.95em;
}

/* Rating stars */
.rating-stars {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.star {
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.star svg {
  width: 32px;
  height: 32px;
  stroke: rgba(255, 255, 255, 0.3);
  fill: none;
  transition: all 0.2s;
}

.star:hover svg,
.star.filled svg {
  stroke: #ffd700;
  fill: #ffd700;
  transform: scale(1.1);
}

.rating-value {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

/* Botões */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}

.btn-primary {
  background-color: #42b883;
  color: #1a1a1a;
  flex: 1;
}

.btn-primary:hover {
  background-color: #35a372;
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}

.btn-secondary {
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(84, 84, 84, 0.65);
}

.btn-secondary:hover {
  background-color: rgba(84, 84, 84, 0.3);
  transform: translateY(-2px);
}

.btn-secondary:active {
  transform: translateY(0) scale(0.98);
}

/* Watchlist */
.watchlist {
  margin-top: 40px;
}

.watchlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.items-counter {
  background-color: #2f2f2f;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 600;
  border: 1px solid rgba(84, 84, 84, 0.65);
}

/* Controles de ordenação */
.sort-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.sort-controls label {
  font-weight: 600;
  font-size: 0.95em;
}

.sort-controls select {
  padding: 8px 12px;
  background-color: #1a1a1a;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.87);
  font-size: 0.95em;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.3s;
}

.sort-controls select:focus {
  outline: none;
  border-color: #42b883;
}

.btn-sort {
  padding: 8px 16px;
  background-color: #2f2f2f;
  color: rgba(255, 255, 255, 0.87);
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-sort:hover:not(:disabled) {
  background-color: rgba(84, 84, 84, 0.3);
}

.btn-sort:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Tabela */
.table-container {
  overflow-x: auto;
  background-color: #2f2f2f;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 8px;
}

.watchlist-table {
  width: 100%;
  border-collapse: collapse;
}

.watchlist-table thead {
  background-color: #1a1a1a;
}

.watchlist-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9em;
  border-bottom: 1px solid rgba(84, 84, 84, 0.65);
}

.watchlist-table tbody tr {
  border-bottom: 1px solid rgba(84, 84, 84, 0.3);
  transition: background-color 0.2s;
}

.watchlist-table tbody tr:hover {
  background-color: rgba(84, 84, 84, 0.2);
}

.watchlist-table tbody tr:last-child {
  border-bottom: none;
}

.watchlist-table td {
  padding: 12px 16px;
  font-size: 0.95em;
}

.rating-display {
  font-weight: 600;
}

.btn-remove {
  padding: 6px 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.85em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-remove:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.btn-remove:active {
  transform: translateY(0) scale(0.98);
}

/* Mensagem vazia */
.empty-message {
  text-align: center;
  padding: 40px;
  background-color: #2f2f2f;
  border: 1px solid rgba(84, 84, 84, 0.65);
  border-radius: 8px;
}

.empty-message p {
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin: 0;
}
</style>
