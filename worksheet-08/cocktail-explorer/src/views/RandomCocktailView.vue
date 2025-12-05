<template>
  <div class="random-view">
    <h2 class="subtitle">Deixa-te surpreender por um cocktail aleatório!</h2>

    <!-- Loading state -->
    <div v-if="store.loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>A descobrir um cocktail...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="store.hasError" class="error-state">
      <p>{{ store.error }}</p>
      <button @click="discoverNew" class="btn-discover">Tentar novamente</button>
    </div>

    <!-- Cocktail card com dica de navegação -->
    <div v-else-if="cocktail" class="random-content">
      <CocktailCard
        :cocktail="cocktail"
        :is-favorite="store.isFavorite(cocktail.idDrink)"
        @click="goToDetail"
        @toggle-favorite="store.toggleFavorite"
      />

      <p class="hint">Clica no card para ver os detalhes</p>
    </div>

    <!-- Botão para descobrir novo -->
    <button @click="discoverNew" :disabled="store.loading" class="btn-discover">
      {{ store.loading ? 'A carregar...' : 'Descobrir Outro' }}
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCocktailsStore } from '@/stores/cocktails'
import CocktailCard from '@/components/CocktailCard.vue'

export default {
  name: 'RandomCocktailView',

  components: {
    CocktailCard,
  },

  computed: {
    ...mapStores(useCocktailsStore),

    store() {
      return this.cocktailsStore
    },

    cocktail() {
      return this.store.currentCocktail
    },
  },

  methods: {
    async discoverNew() {
      await this.store.fetchRandomCocktail()
    },

    goToDetail() {
      if (this.cocktail) {
        this.$router.push({
          name: 'cocktail-detail',
          params: { id: this.cocktail.idDrink },
        })
      }
    },
  },

  // Carrega um cocktail aleatório ao entrar na página
  created() {
    this.discoverNew()
  },
}
</script>

<style scoped>
.random-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

h2 {
  color: var(--text-secondary);
  font-weight: 400;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-2xl);
}

.loading-state {
  padding: var(--spacing-3xl) 0;
}

.random-content {
  margin-bottom: var(--spacing-2xl);
}

.hint {
  margin-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-style: italic;
  color: var(--text-secondary);
}

.btn-discover {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  border: none;
}
</style>
