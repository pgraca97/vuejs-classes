<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
      validator(value) {
        // Valida que o objeto tem as propriedades necessárias
        const hasRequiredProps =
          value.name &&
          typeof value.price === 'number' &&
          value.image &&
          typeof value.inStock === 'boolean'

        if (!hasRequiredProps) {
          console.warn('Product object missing required properties')
          return false
        }
        return true
      },
    },
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
      }).format(this.product.price)
    },
  },
  methods: {
    addToCart() {
      // Emite o evento para o componente pai
      this.$emit('add-to-cart', this.product.id)
    },
  },
}
</script>

<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />

    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <span
        class="badge"
        :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }"
      >
        {{ product.inStock ? 'Em Stock' : 'Esgotado' }}
      </span>

      <p class="price">{{ formattedPrice }}</p>

      <div class="button-container">
        <button v-if="product.inStock" @click="addToCart" class="add-to-cart-btn">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid rgb(66, 184, 131);
  border-radius: 8px;
  padding: 1rem;
  background-color: rgb(36, 36, 36);
  text-align: left;
}

.product-card h2 {
  color: rgba(255, 255, 255, 0.87);
  margin: 0;
  font-size: 1em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.5em;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: white;
  border-radius: 4px;
}

.product-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.product-info h3 {
  margin: 0;
  font-size: 1.1rem;
}

.price {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.87);
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  align-self: flex-start;
}

.badge.in-stock {
  color: rgb(66, 184, 131);
  border: 1px solid rgb(66, 184, 131);
}

.badge.out-of-stock {
  color: rgb(184, 66, 66);
  border: 1px solid rgb(184, 66, 66);
}

.button-container {
  margin-top: auto;
  min-height: 44px;
}

.add-to-cart-btn {
  font-family: 'inter-variable', 'Inter', sans-serif;
  width: 100%;
  padding: 0.75rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.add-to-cart-btn:hover {
  background: #229954;
}
</style>
