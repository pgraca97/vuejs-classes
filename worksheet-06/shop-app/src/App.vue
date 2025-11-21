<script>
import { mapStores, mapState, mapActions } from 'pinia'
import ProductItem from './components/ProductItem.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { useProductsStore } from './stores/products'
import { useCartStore } from './stores/cart'

export default {
  name: 'App',

  components: {
    ProductItem,
    ShoppingCart,
  },

  computed: {
    // Acesso à store completa de produtos (productsStore.products)
    ...mapStores(useProductsStore),
    // Getters do carrinho para mostrar badge e controlar visibilidade
    ...mapState(useCartStore, ['cartItemsCount', 'isCartEmpty']),
  },

  methods: {
    // Action para adicionar produto ao carrinho
    ...mapActions(useCartStore, ['addItem']),
  },

  created() {
    // Carregar produtos ao iniciar aplicação
    this.productsStore.setProducts()
  },
}
</script>

<template>
  <header>
    <h1>Shop App</h1>
    <!-- Badge com número total de items (só aparece se carrinho não vazio) -->
    <span v-if="!isCartEmpty" class="cart-badge">{{ cartItemsCount }} items</span>
  </header>

  <!-- Grid responsiva de produtos -->
  <section class="product-grid">
    <ProductItem
      v-for="product in productsStore.products"
      :key="product.id"
      :product="product"
      @add-to-cart="addItem"
    />
  </section>

  <hr v-if="!isCartEmpty" />

  <!-- Carrinho de compras (só aparece se tiver items) -->
  <section v-if="!isCartEmpty" class="shopping-cart">
    <h2>
      Shopping Cart <span>({{ cartItemsCount }})</span>
    </h2>
    <div class="cart-content">
      <ShoppingCart />
    </div>
  </section>

  <!-- Mensagem de carrinho vazio -->
  <section v-else class="empty-cart">
    <p>O teu carrinho está vazio</p>
  </section>
</template>

<style scoped>
header {
  text-align: left;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}

.cart-badge {
  background-color: var(--color-blue);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

@media (min-width: 768px) {
  header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  header h1 {
    font-size: 2.5rem;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

h2 span {
  font-size: var(--font-size-md);
  font-weight: 400;
  color: var(--color-blue);
}

.cart-content {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 2rem;
  margin-top: 1rem;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: minmax(0, 1fr);
  }
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-size: 1.25rem;
}
</style>
