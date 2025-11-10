<template>
  <div class="cart-view">
    <h1>Carrinho de Compras</h1>

    <!-- Carrinho vazio -->
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>O teu carrinho está vazio.</p>
      <router-link :to="{ name: 'products' }" class="shop-button"> Começar a Comprar </router-link>
    </div>

    <!-- Carrinho com itens -->
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" />

          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p class="item-price">{{ formatPrice(item.price) }}</p>
          </div>

          <div class="quantity-controls">
            <button
              @click="updateQuantity(item.id, item.quantity - 1)"
              :disabled="item.quantity <= 1"
            >
              -
            </button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)" :disabled="item.stock <= 0">
              +
            </button>
          </div>

          <div class="item-total">
            <p>{{ formatPrice(item.price * item.quantity) }}</p>
          </div>

          <button @click="removeItem(item.id)" class="remove-button">✕</button>
        </div>
      </div>

      <!-- Resumo do carrinho -->
      <div class="cart-summary">
        <h2>Resumo</h2>

        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>

        <div class="summary-row">
          <span>Envio</span>
          <span>{{ shipping === 0 ? 'Grátis' : formatPrice(shipping) }}</span>
        </div>

        <hr />

        <div class="summary-row total">
          <span>Total</span>
          <span>{{ formatPrice(total) }}</span>
        </div>

        <button @click="proceedToCheckout" class="checkout-button">Finalizar Compra</button>

        <router-link :to="{ name: 'products' }" class="continue-shopping">
          Continuar a Comprar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '@/stores/cart.js'

export default {
  name: 'CartView',

  data() {
    return {
      cartItems: [],
    }
  },

  computed: {
    subtotal() {
      return this.cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    },

    // Envio grátis para compras acima de €100
    shipping() {
      return this.subtotal >= 100 ? 0 : 5.99
    },

    total() {
      return this.subtotal + this.shipping
    },
  },

  methods: {
    loadCart() {
      const cartItems = cartStore.getItems()

      // Adicionar aos items do carrinho o stock atual de cada produto
      this.cartItems = cartItems.map((item) => {
        const product = cartStore.getProduct(item.id)

        return {
          ...item,
          stock: product ? product.stock : 0,
        }
      })
    },

    updateQuantity(productId, newQuantity) {
      if (newQuantity < 1) {
        return
      }

      const item = this.cartItems.find((i) => i.id === productId)
      const difference = newQuantity - item.quantity

      // Valida stock apenas se estiver a aumentar quantidade
      if (difference > 0) {
        if (difference > item.stock) {
          alert(`Apenas ${item.stock} unidades disponíveis em stock.`)
          return
        }
      }

      cartStore.updateQuantity(productId, newQuantity)
      this.loadCart()
      this.$emit('cart-updated')
    },

    removeItem(productId) {
      if (confirm('Tens a certeza que queres remover este item?')) {
        cartStore.removeItem(productId)
        this.loadCart()
        this.$emit('cart-updated')
      }
    },

    proceedToCheckout() {
      this.$router.push({ name: 'checkout' })
    },

    formatPrice(price) {
      return `€${price.toFixed(2)}`
    },
  },

  created() {
    this.loadCart()
  },

  // beforeRouteLeave: guard in-component que executa antes de sair da rota
  // Previne saída acidental quando há itens no carrinho
  beforeRouteLeave(to, from, next) {
    // Permite navegação sem aviso se for para checkout
    if (to.name === 'checkout') {
      next()
      return
    }

    // Permite navegação sem aviso se carrinho estiver vazio
    if (this.cartItems.length === 0) {
      next()
      return
    }

    // Para qualquer outra rota, pede confirmação
    const confirmed = window.confirm('Tens itens no carrinho. Tens a certeza que queres sair?')

    // next(false) cancela a navegação
    // next() permite a navegação
    next(confirmed)
  },
}
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-dark);
}

.empty-cart {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  flex: 1;
  gap: 1rem;
  text-align: center;
  padding-top: 6rem;
}

.empty-cart p {
  font-size: 1.2rem;
  color: var(--text-dark-secondary);
}

.shop-button {
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

.shop-button:hover {
  background-color: var(--btn-hover);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 8px;
  position: relative;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.item-price {
  color: var(--text-dark-secondary);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-dark);
}

.quantity-controls button {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--black-mute);
  color: var(--text-dark-secondary) !important;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.2s;
}

.quantity-controls button:hover:not(:disabled) {
  background: var(--btn-hover);
}

.quantity-controls button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quantity-controls span {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-size: 1.2rem;
  font-weight: bold;
  background: -webkit-linear-gradient(300deg, #42d392 5%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.remove-button {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--red);
  color: var(--text-dark);
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background 0.2s;
}

.remove-button:hover {
  background: #c82333;
}

@media (max-width: 600px) {
  .cart-view {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .cart-item {
    grid-template-columns: 80px 1fr auto;
    grid-template-areas:
      'image info remove'
      'image controls total';
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .cart-item img {
    grid-area: image;
    width: 100%;
  }

  .item-info {
    grid-area: info;
  }

  .item-info h3 {
    font-size: 0.95rem;
  }

  .quantity-controls {
    grid-area: controls;
    inline-size: fit-content;
  }

  .item-total {
    grid-area: total;
    font-size: 1.1rem;
    margin-left: auto;
  }

  .remove-button {
    grid-area: remove;
    justify-self: end;
    align-self: start;
  }

  .cart-summary {
    padding: 1.5rem;
  }

  .cart-summary h2 {
    font-size: 1.25rem;
  }

  .summary-row {
    font-size: 0.95rem;
  }

  .summary-row.total {
    font-size: 1.3rem;
  }
}

.cart-summary {
  background: var(--bg-soft);
  padding: 2rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 2rem;
  color: var(--text-dark);
}

.cart-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.5rem;
  font-weight: bold;
  background: -webkit-linear-gradient(300deg, #42d392 5%, #647eff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

hr {
  border: none;
  border-top: 1px solid var(--divider);
  margin: 1rem 0;
}

.checkout-button {
  width: 100%;
  padding: 1rem;
  border: 2px solid transparent;
  background:
    linear-gradient(var(--black-mute)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;
  color: var(--text-dark-blue);
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 1rem;
}

.checkout-button:hover {
  background:
    linear-gradient(var(--btn-hover)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;
}

.continue-shopping {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: var(--text-dark-blue);
  text-decoration: none;
  font-weight: 600;
}

.continue-shopping:hover {
  text-decoration: underline;
}
</style>
