<template>
  <div v-if="product" class="product-detail">
    <!-- Breadcrumb simples -->
    <nav class="breadcrumb">
      <router-link :to="{ name: 'home' }">Home</router-link>
      <span> / </span>
      <router-link :to="{ name: 'products' }">Produtos</router-link>
      <span> / </span>
      <span>{{ product.name }}</span>
    </nav>

    <div class="product-content">
      <!-- Imagem do produto -->
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <!-- Informação do produto -->
      <div class="product-info">
        <h1>{{ product.name }}</h1>

        <div class="rating">⭐ {{ product.rating }} ({{ product.reviews }} reviews)</div>

        <p class="category">Categoria: {{ getCategoryName(product.categoryId) }}</p>

        <p class="description">{{ product.description }}</p>

        <div class="price-section">
          <p class="price">{{ formatPrice(product.price) }}</p>

          <div class="stock-info">
            <span v-if="product.stock > 0" class="in-stock">
              ✓ Em stock ({{ product.stock }} unidades disponíveis)
            </span>
            <span v-else class="out-of-stock"> ✗ Produto esgotado </span>
          </div>
        </div>

        <!-- Quantidade e botão de adicionar -->
        <div class="add-to-cart-section">
          <div class="quantity-selector">
            <label for="quantity">Quantidade:</label>
            <input
              id="quantity"
              type="number"
              v-model.number="quantity"
              min="1"
              :max="product.stock"
              :disabled="product.stock === 0"
              @blur="validateQuantity"
            />
          </div>

          <button
            @click="addToCart"
            @mousedown.prevent
            :disabled="product.stock === 0"
            class="add-button"
          >
            {{ product.stock === 0 ? 'Sem Stock' : 'Adicionar ao Carrinho' }}
          </button>
        </div>

        <!-- Mensagem de sucesso/erro -->
        <div v-if="message" :class="['message', messageType]">
          {{ message }}
        </div>

        <!-- Botões de navegação após adicionar -->
        <div v-if="showNavigationButtons" class="navigation-buttons">
          <button @click="continueShopping" class="secondary-button">Continuar a Comprar</button>
          <button @click="goToCart" class="primary-button">Ir para o Carrinho</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">
    <p>A carregar produto...</p>
  </div>
</template>

<script>
import { categories } from '@/data/shophub-data.js'
import { cartStore } from '@/stores/cart.js'

export default {
  name: 'ProductDetailView',

  data() {
    return {
      product: null,
      categories,
      quantity: 1,
      message: '',
      messageType: '', // 'success' ou 'error'
      showNavigationButtons: false,
      messageTimeout: null,
    }
  },

  methods: {
    // Corrige quantidade quando utilizador sai do input de quantidade
    validateQuantity() {
      if (!this.quantity || this.quantity < 1) {
        this.quantity = 1
      } else if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock
      }
    },

    addToCart() {
      // Validação: produto sem stock
      if (this.product.stock === 0) {
        this.showMessage('Este produto está esgotado.', 'error')
        return
      }

      // Validação: quantidade mínima
      if (!this.quantity || this.quantity < 1) {
        this.quantity = 1
      }

      // Validação: quantidade excede stock disponível
      if (this.quantity > this.product.stock) {
        const confirmed = confirm(
          `Apenas ${this.product.stock} unidades disponíveis. Adicionar ${this.product.stock} ao carrinho?`,
        )

        if (!confirmed) {
          this.quantity = this.product.stock
          return
        }

        this.quantity = this.product.stock
      }

      // Adiciona ao carrinho e atualiza stock
      cartStore.addItem(this.product, this.quantity)
      this.product.stock -= this.quantity
      this.$emit('cart-updated')

      // Mostra mensagem de sucesso
      this.showMessage(`${this.quantity} x ${this.product.name} adicionado ao carrinho!`, 'success')

      this.showNavigationButtons = true
      this.quantity = 1
    },

    showMessage(text, type) {
      // Limpa timeout anterior se existir
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout)
      }

      this.message = text
      this.messageType = type

      // Remove mensagem após 5 segundos
      this.messageTimeout = setTimeout(() => {
        this.message = ''
        this.messageTimeout = null
      }, 5000)
    },

    // Navegação programática após adicionar ao carrinho
    continueShopping() {
      this.$router.push({ name: 'products' })
    },

    goToCart() {
      this.$router.push({ name: 'cart' })
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
    // Obtém produto do localStorage pelo ID da rota
    // beforeEnter guard no router já validou que o produto existe
    const productId = this.$route.params.id
    this.product = cartStore.getProduct(productId)
  },
  beforeUnmount() {
    // Limpa timeout quando componente é destruído
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout)
    }
  },
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: var(--text-dark-secondary);
}

.breadcrumb a {
  color: var(--text-dark-blue);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }
}

.product-image img {
  width: 100%;
  border-radius: 12px;
}

.product-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.rating {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-dark-secondary);
}

.category {
  font-size: 0.9rem;
  color: var(--text-dark-secondary);
  margin-bottom: 1.5rem;
}

.description {
  line-height: 1.6;
  color: var(--text-dark);
  margin-bottom: 2rem;
}

.price-section {
  background: var(--bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
}

.stock-info {
  font-size: 1rem;
}

.in-stock {
  color: var(--green);
  font-weight: 600;
}

.out-of-stock {
  color: var(--red);
  font-weight: 600;
}

.add-to-cart-section {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.quantity-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quantity-selector label {
  font-weight: 600;
  color: var(--text-dark);
}

.quantity-selector input {
  width: 100px;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
}

.add-button {
  flex: 1;
  padding: 1rem 2rem;
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.add-button:hover:not(:disabled) {
  background-color: var(--btn-hover);
}

.add-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.message.success {
  background: var(--bg-soft);
  color: var(--green);
}

.message.error {
  background: var(--bg-soft);
  color: var(--red);
}

.navigation-buttons {
  display: flex;
  gap: 1rem;
}

.primary-button,
.secondary-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.primary-button {
  background: var(--black-mute);
  color: var(--text-dark-blue);
}

.primary-button:hover {
  background-color: var(--btn-hover);
}

.secondary-button {
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: 2px solid transparent;
  background:
    linear-gradient(var(--black-mute)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;
}

.secondary-button:hover {
  background:
    linear-gradient(var(--btn-hover)) padding-box,
    -webkit-linear-gradient(315deg, #42d392 25%, #647eff) border-box;
}

.loading {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>
