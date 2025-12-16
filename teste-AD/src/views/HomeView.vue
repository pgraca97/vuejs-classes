<template>
  <div class="home-view">
    <header class="toolbar">
      <h1 class="page-title">Menu do Restaurante</h1>
      <router-link :to="{ name: 'dish-create' }" class="btn-primary"> + Novo Prato </router-link>
    </header>

    <!-- Filtros: categoria + disponibilidade -->
    <section class="filters-section">
      <div class="category-tabs">
        <button
          v-for="tab in categoryTabs"
          :key="tab.value"
          @click="handleCategoryChange(tab.value)"
          class="tab-btn"
          :class="{ active: store.activeCategory === tab.value }"
        >
          {{ tab.label }}
        </button>
      </div>

      <label class="availability-filter">
        <input
          type="checkbox"
          :checked="store.showOnlyAvailable"
          @change="store.toggleShowOnlyAvailable()"
        />
        Mostrar apenas disponíveis
      </label>
    </section>

    <!-- Estados de UI -->
    <div v-if="store.loading" class="loading-state">
      <p>A carregar pratos...</p>
    </div>

    <div v-else-if="store.hasError" class="error-state">
      <p>{{ store.error }}</p>
      <button @click="retryLoad" class="btn-secondary">Tentar novamente</button>
    </div>

    <div v-else-if="store.filteredDishes.length === 0" class="empty-state">
      <p v-if="store.hasDishes">Nenhum prato encontrado com os filtros atuais.</p>
      <p v-else>Ainda não existem pratos no menu.</p>
      <router-link :to="{ name: 'dish-create' }" class="btn-primary">
        Criar primeiro prato
      </router-link>
    </div>

    <!-- Grid de pratos -->
    <section v-else class="dishes-grid">
      <DishCard
        v-for="dish in store.filteredDishes"
        :key="dish.id"
        :dish="dish"
        @toggle-availability="handleToggleAvailability"
        @delete="handleDelete"
      />
    </section>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useDishesStore } from '@/stores/dishes'
import DishCard from '@/components/DishCard.vue'

export default {
  name: 'HomeView',

  components: {
    DishCard,
  },

  computed: {
    ...mapStores(useDishesStore),

    store() {
      return this.dishesStore
    },

    categoryTabs() {
      return [
        { value: null, label: 'Todos' },
        { value: 'starters', label: 'Entradas' },
        { value: 'mains', label: 'Pratos Principais' },
        { value: 'desserts', label: 'Sobremesas' },
        { value: 'drinks', label: 'Bebidas' },
      ]
    },
  },

  methods: {
    async handleCategoryChange(category) {
      await this.store.fetchDishesByCategory(category)
    },

    async handleToggleAvailability(dishId) {
      await this.store.toggleAvailability(dishId)
    },

    async handleDelete(dishId) {
      const dish = this.store.dishes.find((d) => d.id === dishId)
      const dishName = dish ? dish.name : 'este prato'

      if (!confirm(`Tem a certeza que deseja eliminar "${dishName}"?`)) {
        return
      }

      await this.store.removeDish(dishId)
    },

    async retryLoad() {
      await this.store.fetchDishesByCategory(this.store.activeCategory)
    },
  },

  async created() {
    await this.store.fetchAllDishes()
  },
}
</script>

<style scoped>
.home-view {
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.filters-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.category-tabs {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.tab-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background-color: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background-color: var(--bg-soft);
  border-color: var(--accent-primary);
}

.tab-btn.active {
  background-color: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.availability-filter {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  cursor: pointer;
}

.availability-filter input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}
</style>
