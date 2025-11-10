<template>
  <header class="main-header">
    <div class="header-content">
      <router-link :to="{ name: 'home' }" class="logo"> ShopHub Pro </router-link>

      <nav class="main-nav">
        <router-link :to="{ name: 'home' }">Home</router-link>
        <router-link :to="{ name: 'products' }">Produtos</router-link>
        <router-link :to="{ name: 'cart' }" class="cart-link">
          Carrinho
          <span v-if="cartItemCount > 0" class="cart-badge">
            {{ cartItemCount > 99 ? '99+' : cartItemCount }}
          </span>
        </router-link>
      </nav>
    </div>
  </header>

  <main>
    <router-view @cart-updated="updateCartCount" />
  </main>

  <footer class="main-footer">
    <p>&copy; 2025 ShopHub Pro. Todos os direitos reservados.</p>
  </footer>
</template>

<script>
import { cartStore } from '@/stores/cart.js'

export default {
  name: 'App',

  data() {
    return {
      cartItemCount: 0,
    }
  },

  methods: {
    updateCartCount() {
      this.cartItemCount = cartStore.getItemCount()
    },
  },

  mounted() {
    // Atualiza contador inicial
    this.updateCartCount()

    // afterEach: navigation guard global que executa após cada navegação
    // Garante que badge do carrinho está sempre atualizado
    this.$router.afterEach(() => {
      this.updateCartCount()
    })
  },
}
</script>

<style>
.main-header {
  background-color: var(--bg);
  border-bottom: 1px solid var(--divider);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-dark);
  text-decoration: none;
}

.main-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.main-nav a {
  text-decoration: none;
  color: var(--text-dark-secondary);
  font-weight: 500;
  font-size: 0.813rem;
  line-height: 54px;

  transition: color 0.2s;
}

.main-nav a:hover {
  color: var(--green);
}

.main-nav a.router-link-active {
  color: var(--green);
  font-weight: 600;
  position: relative;
  border-bottom: 1px solid var(--green);
  bottom: -1px;
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-badge {
  background: var(--yellow);
  color: white;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

@media (min-width: 1200px) {
  .cart-badge {
    position: absolute;
    top: 8px;
    right: -35px;
  }
}

main {
  flex: 1;
}

.main-footer {
  border: 1px solid var(--divider);
  font-size: 0.75rem;
  font-weight: 500;

  color: var(--text-dark-secondary);
  text-align: center;
  padding: 2rem;
}
</style>
