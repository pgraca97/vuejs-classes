<template>
  <div class="home-view">
    <!-- Secção de filtros e pesquisa -->
    <section class="filters-section">
      <!-- Filtro por categoria (desativado em modo pesquisa) -->
      <div class="filter-group" :class="{ 'filter-disabled': isSearchMode }">
        <label for="category-select">Categoria:</label>
        <select
          id="category-select"
          v-model="selectedCategory"
          @change="handleCategoryChange"
          :disabled="store.loading || isSearchMode"
        >
          <option v-for="category in store.categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
        <span v-if="isSearchMode" class="mode-indicator"> (pesquisa ativa) </span>
      </div>

      <!-- Pesquisa por nome com Enter ou botão -->
      <div class="search-group">
        <label for="search-input">Pesquisar:</label>
        <input
          id="search-input"
          v-model="searchQuery"
          type="text"
          placeholder="Nome do cocktail..."
          @keyup.enter="handleSearch"
          :disabled="store.loading"
        />
        <button @click="handleSearch" :disabled="store.loading || !searchQuery.trim()">
          Pesquisar
        </button>
        <!-- Botão para limpar pesquisa e voltar à categoria -->
        <button
          v-if="isSearchMode"
          @click="clearSearch"
          :disabled="store.loading"
          class="btn-secondary"
        >
          Limpar
        </button>
      </div>
    </section>

    <!-- Indicador do modo atual -->
    <div class="results-header">
      <p v-if="isSearchMode" class="results-info search-mode">
        A mostrar resultados para "<strong>{{ activeSearchTerm }}</strong
        >"
        <span class="results-count" v-if="store.hasCocktails">
          ({{ store.cocktails.length }} encontrados)
        </span>
      </p>
      <p v-else class="results-info category-mode">
        Categoria: <strong>{{ selectedCategory }}</strong>
        <span class="results-count" v-if="store.hasCocktails">
          ({{ store.cocktails.length }} cocktails)
        </span>
      </p>
    </div>

    <!-- Estado de Loading -->
    <div v-if="store.loading" class="loading-state">
      <p>A carregar cocktails...</p>
    </div>

    <!-- Estado de Erro -->
    <div v-else-if="store.hasError" class="error-state">
      <p>{{ store.error }}</p>
      <button @click="retryLoad">Tentar novamente</button>
    </div>

    <!-- Estado Vazio -->
    <div v-else-if="!store.hasCocktails" class="empty-state">
      <p v-if="isSearchMode">
        Nenhum cocktail encontrado para "<strong>{{ activeSearchTerm }}</strong
        >".
      </p>
      <p v-else>Nenhum cocktail encontrado.</p>
    </div>

    <!-- Listagem de Cocktails -->
    <section v-else class="cocktails-grid">
      <CocktailCard
        v-for="cocktail in store.cocktails"
        :key="cocktail.idDrink"
        :cocktail="cocktail"
        :is-favorite="store.isFavorite(cocktail.idDrink)"
        @click="navigateToDetail(cocktail.idDrink)"
        @toggle-favorite="handleToggleFavorite"
      />
    </section>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCocktailsStore } from '@/stores/cocktails'
import CocktailCard from '@/components/CocktailCard.vue'

export default {
  name: 'HomeView',

  components: {
    CocktailCard,
  },

  data() {
    return {
      // Estado de UI local (não precisa estar na store)
      searchQuery: '',
      // Termo guardado ao executar pesquisa (separado do input)
      activeSearchTerm: '',
      selectedCategory: 'Cocktail',
      isSearchMode: false,
    }
  },

  computed: {
    // mapStores expõe a store como this.cocktailsStore
    ...mapStores(useCocktailsStore),

    // Alias para acesso mais limpo no template
    store() {
      return this.cocktailsStore
    },
  },

  methods: {
    async handleCategoryChange() {
      this.isSearchMode = false
      this.searchQuery = ''
      await this.store.fetchCocktailsByCategory(this.selectedCategory)
    },

    async handleSearch() {
      const query = this.searchQuery.trim()
      if (!query) return

      this.isSearchMode = true
      this.activeSearchTerm = query
      await this.store.searchCocktails(query)
    },

    // Limpa pesquisa e volta à listagem por categoria
    async clearSearch() {
      this.searchQuery = ''
      this.activeSearchTerm = ''
      this.isSearchMode = false
      await this.store.fetchCocktailsByCategory(this.selectedCategory)
    },

    async retryLoad() {
      if (this.isSearchMode) {
        await this.handleSearch()
      } else {
        await this.store.fetchCocktailsByCategory(this.selectedCategory)
      }
    },

    navigateToDetail(id) {
      this.$router.push({ name: 'cocktail-detail', params: { id } })
    },

    handleToggleFavorite(cocktailId) {
      this.store.toggleFavorite(cocktailId)
    },
  },

  // Carrega dados iniciais
  async created() {
    await this.store.fetchCategories()

    // Sincroniza categoria com a store (caso já tenha sido alterada)
    if (this.store.selectedCategory) {
      this.selectedCategory = this.store.selectedCategory
    }

    await this.store.fetchCocktailsByCategory(this.selectedCategory)
  },
}
</script>

<style scoped>
.home-view {
  flex: 1;
  width: 100%;
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
}

.filters-section {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.filter-group,
.search-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.filter-group label,
.search-group label {
  font-weight: 500;
  color: var(--text-secondary);
}

.search-group input {
  min-width: 220px;
}

.btn-secondary {
  color: var(--accent-secondary);
}

.filter-group.filter-disabled {
  opacity: 0.5;
}

.filter-group.filter-disabled select {
  cursor: not-allowed;
}

.mode-indicator {
  font-size: var(--font-size-xs);
  color: var(--accent-primary);
  font-style: italic;
}

.results-header {
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
}

.results-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.results-info strong {
  color: var(--text-primary);
}

.results-info.search-mode strong {
  color: var(--accent-primary);
}

.results-count {
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-xs);
  opacity: 0.8;
}

.error-state button {
  margin-top: var(--spacing-lg);
}

.cocktails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

@media (max-width: 640px) {
  .filters-section {
    flex-direction: column;
  }

  .filter-group,
  .search-group {
    flex-wrap: wrap;
    width: 100%;
  }

  .search-group input {
    min-width: 100%;
  }
}
</style>
