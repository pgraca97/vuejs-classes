<template>
  <div class="shop">
    <!-- Sidebar fixa que aparece sempre -->
    <aside class="sidebar">
      <h2>Categories</h2>
      <nav class="category-nav">
        <!-- Link para todos os produtos -->
        <RouterLink to="/shop" class="category-link"> All Products </RouterLink>

        <!-- Links dinâmicos para cada categoria -->
        <RouterLink
          v-for="category in categories"
          :key="category"
          :to="`/shop/category/${category}`"
          class="category-link"
        >
          {{ category }}
        </RouterLink>
      </nav>
    </aside>

    <!-- Área de conteúdo onde as rotas filhas são renderizadas -->
    <main class="products-area">
      <!-- Este RouterView renderiza AllProductsView ou CategoryView -->
      <RouterView />
    </main>
  </div>
</template>

<script>
import { products, getCategories } from '@/data/products.js'

export default {
  name: 'ShopView',
  data() {
    return {
      products: products,
      categories: getCategories(),
    }
  },
}
</script>

<style scoped>
.shop {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100vh - 121px); 
}

.sidebar {
  padding-top: 0;
  padding-inline: 1rem;
}

.sidebar h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.category-nav {
  display: flex;

  gap: 1rem;
}

.category-link {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-dark-secondary);
  text-decoration: none;
  transition: color 0.3s;
}

.category-link:hover {
  color: var(--green);
}

.category-link.router-link-exact-active {
  color: var(--green);
}

.products-area {
  padding-inline: 1rem;
}

@media (min-width: 768px) {
  .shop {
    grid-template-columns: 250px 1fr;
  }

  .sidebar {
    border-right: 1px solid var(--divider);
  }

  .category-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .sidebar, .products-area {
    padding-inline: 2rem;
  }
}
</style>
