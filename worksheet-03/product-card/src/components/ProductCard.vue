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
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--black-muted);
  text-align: left;
}

.product-card h2 {
  color: var(--text-dark);
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
  padding-top: 1rem;
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
  color: var(--text-dark);
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
  color: var(--green);
  border: 1px solid var(--green);
}

.badge.out-of-stock {
  color: var(--red);
  border: 1px solid var(--red);
}

.button-container {
  margin-top: auto;
  padding-inline: 2rem;
  min-height: 44px;
}

.add-to-cart-btn {
  font-family: inherit;
  width: 100%;
  padding: 0.75rem;
  background: var(--black-mute);
  border: 1px solid var(--divider);
  color: white;

  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover {
    background: var(--black-muted);
}
</style>
