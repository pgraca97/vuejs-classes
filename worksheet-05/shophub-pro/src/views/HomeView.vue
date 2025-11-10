<template>
  <div class="home">
    <header class="hero">
      <h1>ShopHub Pro</h1>
      <p>Os melhores ténis, as melhores escolhas</p>
      <router-link :to="{ name: 'products' }" class="cta-button">
        Ver Todos os Produtos
      </router-link>
    </header>

    <section class="featured">
      <h2>Produtos em Destaque</h2>
      <div class="products-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">{{ formatPrice(product.price) }}</p>
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
    </section>

    <section class="categories">
      <h2>Comprar por Categoria</h2>
      <div class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="{ name: 'products', query: { category: category.slug } }"
          class="category-card"
        >
          <img :src="category.image" :alt="category.name" />
          <h3>{{ category.name }}</h3>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { getFeaturedProducts, categories } from '@/data/shophub-data.js'

export default {
  name: 'HomeView',

  data() {
    return {
      categories,
    }
  },

  computed: {
    // Produtos em destaque para mostrar na homepage
    featuredProducts() {
      return getFeaturedProducts()
    },
  },

  methods: {
    formatPrice(price) {
      return `€${price.toFixed(2)}`
    },
  },
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-dark-secondary);
  border-radius: 12px;
}

.hero h1 {
  font-size: 5rem;
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  background: var(--black-mute);
  color: var(--text-dark-blue);
  text-decoration: none;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: var(--btn-hover);
}

.featured h2,
.categories h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
}

.category-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.category-card h3 {
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-dark);
}
</style>
