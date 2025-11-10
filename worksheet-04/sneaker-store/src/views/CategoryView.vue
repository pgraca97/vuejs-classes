<template>
  <div class="category-view">
    <div v-if="!categoryExists" class="not-found">
      <h1>Category Not Found</h1>
      <p>The category "{{ categoryName }}" doesn't exist.</p>
      <RouterLink to="/shop" class="back-button"> View All Products </RouterLink>
    </div>

    <div v-else>
      <div class="header">
        <h1>{{ categoryName }}</h1>
        <p class="subtitle">
          {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found
        </p>
      </div>

      <div class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">€{{ product.price.toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="no-products">
        <p>No products found in this category.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductsByCategory, getCategories } from '@/data/products.js'

export default {
  name: 'CategoryView',
  data() {
    return {
      filteredProducts: [],
      categoryName: '',
      validCategories: getCategories(),
    }
  },
  computed: {
    categoryExists() {
      return this.validCategories.some(
        (cat) => cat.toLowerCase() === this.categoryName.toLowerCase(),
      )
    },
  },
  created() {
    // Carrega os produtos quando o componente é criado
    this.loadCategoryProducts()
  },
  watch: {
    // Isto resolve o problema da reutilização do componente
    // Quando mudamos de /shop/category/Running para /shop/category/Casual,
    // o Vue reutiliza o mesmo componente CategoryView
    // Então é necessário observar mudanças na rota e recarregar os produtos
    '$route.params.name': {
      handler() {
        this.loadCategoryProducts()
      },
      immediate: false, // Não precisa de executar imediatamente porque o created() já o faz
    },
  },
  methods: {
    loadCategoryProducts() {
      // Obtém o nome da categoria do URL
      this.categoryName = this.$route.params.name

      // Filtra produtos pela categoria
      if (this.categoryExists) {
        this.filteredProducts = getProductsByCategory(this.categoryName)
      } else {
        this.filteredProducts = []
      }
    },
  },
}
</script>

<style scoped>
.category-view {
  max-width: 1200px;
  padding-top: 0;
  padding-bottom: 2rem;
}

.header {
  margin-bottom: 2rem;
}

h1 {
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.subtitle {
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  border: 1px solid var(--divider);
  background-color: var(--bg-soft);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.product-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  min-height: 120px;
}

.product-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.price {
  color: var(--text-dark-secondary);
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-dark-secondary);
}

.not-found h1 {
  color: var(--red);
}

.back-button {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  margin-top: 1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  line-height: 1.7;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: var(--black-muted);
}
</style>
