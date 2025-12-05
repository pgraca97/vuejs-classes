<template>
  <!-- Header com navegação principal e badge de favoritos -->
  <header class="app-header">
    <nav class="main-nav">
      <router-link to="/" class="nav-brand">Cocktail Explorer</router-link>

      <div class="nav-left">
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/random" class="nav-link">Descobrir</router-link>
        </div>

        <!-- Contador de favoritos -->
        <div v-if="favoritesCount > 0" class="favorites-badge">★ {{ favoritesCount }}</div>
      </div>
    </nav>
  </header>

  <!-- Conteúdo das rotas -->
  <main class="app-main">
    <router-view />
  </main>

  <!-- Footer -->
  <footer class="app-footer">
    <p>Cocktail Explorer © {{ currentYear }} | Dados fornecidos por TheCocktailDB</p>
  </footer>
</template>

<script>
import { mapStores } from 'pinia'
import { useCocktailsStore } from '@/stores/cocktails'

export default {
  name: 'App',

  computed: {
    // mapStores expõe a store como this.cocktailsStore
    ...mapStores(useCocktailsStore),

    currentYear() {
      return new Date().getFullYear()
    },

    favoritesCount() {
      return this.cocktailsStore.favoritesCount
    },
  },

  // Inicializa favoritos do localStorage ao arrancar a app
  created() {
    this.cocktailsStore.loadFavoritesFromStorage()
  },
}
</script>

<style>
.app-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-nav {
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: 0 var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.nav-brand {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--accent-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: var(--font-size-sm);
  line-height: 54px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--accent-secondary);
}

.nav-link.router-link-active {
  color: var(--accent-primary);
  font-weight: 600;
  position: relative;
  border-bottom: 1px solid var(--accent-primary);
  bottom: -1px;
}

.favorites-badge {
  margin-left: auto;
  background: #fef3c7;
  color: #b45309;
  padding: var(--spacing-2xs) var(--spacing-md);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.app-footer {
  flex-shrink: 0;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding: var(--spacing-lg) var(--spacing-xl);
  text-align: center;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

@media (max-width: 640px) {
  .main-nav {
    flex-wrap: wrap;
  }

  .nav-brand {
    width: 100%;
    margin-bottom: var(--spacing-sm);
  }

  .favorites-badge {
    margin-left: 0;
  }
}
</style>
