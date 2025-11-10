<template>
  <div class="products-view">
    <header>
      <h1>Todos os Produtos</h1>
    </header>

    <!-- Filtro por categoria -->
    <div class="filters">
      <button @click="filterByCategory(null)" :class="{ active: !selectedCategory }">Todos</button>
      <button
        v-for="category in categories"
        :key="category.id"
        @click="filterByCategory(category.slug)"
        :class="{ active: selectedCategory === category.slug }"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Grid de produtos -->
    <div class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
          <img :src="product.image" :alt="product.name" />
        </router-link>

        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="category">{{ getCategoryName(product.categoryId) }}</p>
          <p class="price">{{ formatPrice(product.price) }}</p>

          <div class="stock-info">
            <span v-if="product.stock > 0" class="in-stock"> Em stock ({{ product.stock }}) </span>
            <span v-else class="out-of-stock"> Sem stock </span>
          </div>

          <div class="rating">⭐ {{ product.rating }} ({{ product.reviews }} reviews)</div>

          <router-link
            :to="{ name: 'product-detail', params: { id: product.id } }"
            class="view-button"
          >
            Ver Detalhes
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mensagem quando não há produtos -->
    <div v-if="filteredProducts.length === 0" class="no-products">
      <p>Não foram encontrados produtos nesta categoria.</p>
    </div>
  </div>
</template>

<script>
import { categories } from '@/data/shophub-data.js'
import { cartStore } from '@/stores/cart'

export default {
  name: 'ProductsView',

  data() {
    return {
      products: [], // Lista de produtos carregada do localStorage
      categories,
      selectedCategory: null,
    }
  },

  computed: {
    // Filtra produtos pela categoria selecionada
    filteredProducts() {
      if (!this.selectedCategory) {
        return this.products
      }

      return this.products.filter((p) => p.category === this.selectedCategory)
    },
  },

  methods: {
    filterByCategory(categorySlug) {
      this.selectedCategory = categorySlug

      // Atualiza query params na URL para manter filtro ao recarregar página
      // Navegação programática: push adiciona entrada ao histórico
      this.$router.push({
        name: 'products',
        query: categorySlug ? { category: categorySlug } : {},
      })
    },

    getCategoryName(categoryId) {
      const category = this.categories.find((c) => c.id === categoryId)
      return category ? category.name : 'Desconhecida'
    },

    formatPrice(price) {
      return `€${price.toFixed(2)}`
    },
  },

  created() {
    // Carrega produtos do localStorage
    this.products = cartStore.getProducts()

    // Lê categoria do query param se existir (ex: /products?category=sneakers)
    const categoryFromQuery = this.$route.query.category

    if (categoryFromQuery) {
      this.selectedCategory = categoryFromQuery
    }
  },

  // Watch: observa mudanças nos query params
  // Necessário quando utilizador usa botão voltar do browser
  watch: {
    '$route.query.category': {
      handler(newCategory) {
        this.selectedCategory = newCategory || null
      },
    },
  },
}
</script>

<style scoped>
.products-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  color: var(--text-dark);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1.1rem;
  color: var(--text-dark-secondary);
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filters button {
  font-family: inherit;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--divider);
  background: var(--black-mute);

  color: var(--text-dark);

  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
}

.filters button:hover {
  border-color: var(--text-dark-blue);
  color: var(--text-dark-blue);
}

.filters button.active {
  background: var(--text-dark-blue);
  color: var(--black-mute);
  border-color: var(--text-dark-blue);

  font-weight: 600;
}

.category {
  font-size: 0.85rem;
  color: var(--text-dark-secondary);
  margin-bottom: 0.5rem;
}

.stock-info {
  margin-bottom: 0.5rem;
}

.in-stock {
  color: var(--green);
  font-size: 0.9rem;
  font-weight: bold;
}

.out-of-stock {
  color: var(--red);
  font-size: 0.9rem;
  font-weight: bold;
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-dark-secondary);
}

.no-products p {
  font-size: 1.2rem;
}
</style>
