<template>
  <div class="detail-view">
    <!-- Loading state -->
    <div v-if="store.loading" class="loading-state">
      <p>A carregar detalhes...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="store.hasError" class="error-state">
      <p>{{ store.error }}</p>
      <button @click="goBack" class="btn-back">Voltar</button>
    </div>

    <!-- Conteúdo do cocktail -->
    <article v-else-if="cocktail" class="cocktail-detail">
      <!-- Cabeçalho: imagem e informação básica -->
      <header class="detail-header">
        <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" class="detail-image" />

        <div class="detail-info">
          <h1>{{ cocktail.strDrink }}</h1>

          <!-- Botão de favorito -->
          <button
            class="favorite-btn-large"
            :class="{ 'is-favorite': store.isFavorite(cocktail.idDrink) }"
            @click="store.toggleFavorite(cocktail.idDrink)"
          >
            {{ store.isFavorite(cocktail.idDrink) ? '★ Favorito' : '☆ Adicionar aos Favoritos' }}
          </button>

          <dl class="detail-meta">
            <div class="meta-item">
              <dt>Categoria</dt>
              <dd>{{ cocktail.strCategory }}</dd>
            </div>

            <div class="meta-item">
              <dt>Copo</dt>
              <dd>{{ cocktail.strGlass }}</dd>
            </div>

            <div class="meta-item">
              <dt>Tipo</dt>
              <dd :class="alcoholicClass">{{ cocktail.strAlcoholic }}</dd>
            </div>
          </dl>
        </div>
      </header>

      <!-- Ingredientes -->
      <section class="ingredients-section">
        <h2>Ingredientes</h2>
        <ul class="ingredients-list">
          <li v-for="(item, index) in store.ingredients" :key="index">
            <span class="ingredient-name">{{ item.ingredient }}</span>
            <span v-if="item.measure" class="ingredient-measure">{{ item.measure }}</span>
          </li>
        </ul>
      </section>

      <!-- Instruções -->
      <section class="instructions-section">
        <h2>Instruções</h2>
        <p>{{ cocktail.strInstructions }}</p>
      </section>

      <!-- Navegação -->
      <nav class="detail-nav">
        <button @click="goBack" class="btn-back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Voltar
        </button>
      </nav>
    </article>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useCocktailsStore } from '@/stores/cocktails'

export default {
  name: 'CocktailDetailView',

  computed: {
    ...mapStores(useCocktailsStore),

    store() {
      return this.cocktailsStore
    },

    cocktail() {
      return this.store.currentCocktail
    },

    // ID extraído dos parâmetros da rota
    cocktailId() {
      return this.$route.params.id
    },

    // Classe dinâmica para badge alcoólico/não-alcoólico
    alcoholicClass() {
      if (!this.cocktail) return {}

      return {
        'badge-alcoholic': this.cocktail.strAlcoholic === 'Alcoholic',
        'badge-non-alcoholic': this.cocktail.strAlcoholic !== 'Alcoholic',
      }
    },
  },

  methods: {
    // Volta para a página anterior ou home
    goBack() {
      if (window.history.length > 2) {
        this.$router.back()
      } else {
        this.$router.push({ name: 'home' })
      }
    },

    async loadCocktail() {
      // Só carrega se ID for diferente (evita fetch redundante)
      if (this.cocktail?.idDrink === this.cocktailId) {
        return
      }

      await this.store.fetchCocktailById(this.cocktailId)
    },
  },

  // Navigation guard: carrega dados ao entrar na rota
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.loadCocktail()
    })
  },

  // Limpa dados ao sair da página
  beforeUnmount() {
    this.store.clearCurrentCocktail()
  },
}
</script>

<style scoped>
.detail-view {
  flex: 1;
  width: 100%;
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
}

.loading-state,
.error-state {
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.detail-header {
  display: flex;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.detail-image {
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: var(--radius-xl);
}

.detail-info {
  flex: 1;
}

.detail-info h1 {
  margin: 0 0 var(--spacing-md) 0;
  font-size: var(--font-size-3xl);
  color: var(--text-primary);
}

.favorite-btn-large {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  color: var(--text-primary);
  font-size: var(--font-size-md);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: var(--spacing-lg);
}

.favorite-btn-large:hover {
  border-color: var(--accent-primary);
}

.favorite-btn-large.is-favorite {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.detail-meta {
  margin: 0;
}

.meta-item {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.meta-item dt {
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 100px;
}

.meta-item dd {
  margin: 0;
  color: var(--text-primary);
}

.badge-alcoholic {
  color: var(--error) !important;
  font-weight: 600;
}

.badge-non-alcoholic {
  color: var(--success) !important;
  font-weight: 600;
}

.ingredients-section,
.instructions-section {
  margin-bottom: var(--spacing-2xl);
}

h2 {
  font-size: var(--font-size-xl);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.ingredients-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-md);
}

.ingredients-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-md);
  background: var(--bg-soft);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.ingredient-name {
  font-weight: 500;
  color: var(--text-primary);
}

.ingredient-measure {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.instructions-section p {
  line-height: 1.7;
  color: var(--text-primary);
  font-size: var(--font-size-lg);
}

.detail-nav {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.btn-back {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  font-size: var(--font-size-md);
}

@media (max-width: 700px) {
  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .detail-image {
    width: 100%;
    max-width: 320px;
    height: auto;
    aspect-ratio: 1;
  }

  .meta-item {
    justify-content: center;
  }

  .meta-item dt {
    min-width: auto;
  }
}
</style>
