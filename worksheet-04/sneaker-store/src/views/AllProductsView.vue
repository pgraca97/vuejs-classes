<template>
  <div class="all-products">
    <h1>All Products</h1>
    <p class="subtitle">Browse our complete collection of sneakers</p>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <div class="product-info">
          <span class="category-badge">{{ product.category }}</span>
          <h3>{{ product.name }}</h3>
          <p class="price">€{{ product.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '@/data/products.js'

export default {
  name: 'AllProductsView',
  data() {
    return {
      products: products,
    }
  },
}
</script>

<style scoped>
.all-products {
  max-width: 1200px;
  padding-top: 0;
  padding-bottom: 2rem;
}

h1 {
  margin-bottom: 0.5rem;
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
.category-badge {
  display: inline-block;
  color: var(--text-dark-secondary);

  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
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
</style>
