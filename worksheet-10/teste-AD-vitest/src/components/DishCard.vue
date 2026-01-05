<template>
  <article class="dish-card" :class="{ unavailable: !dish.available }">
    <div class="dish-image-wrapper">
      <img :src="dish.imageUrl" :alt="dish.name" class="dish-image" />
      <span v-if="!dish.available" class="unavailable-badge"> Indisponível </span>
    </div>

    <div class="dish-content">
      <h3 class="dish-name">{{ dish.name }}</h3>
      <p class="dish-description">{{ truncatedDescription }}</p>

      <div class="dish-meta">
        <span class="dish-price">{{ formattedPrice }}</span>
        <span class="dish-category">{{ categoryLabel }}</span>
      </div>
    </div>

    <div class="dish-actions" @click.stop>
      <button
        class="action-btn"
        :class="{ active: dish.available }"
        :title="dish.available ? 'Marcar como indisponível' : 'Marcar como disponível'"
        @click="$emit('toggle-availability', dish.id)"
      >
        <AvailabilitySVG :is-available="dish.available" />
      </button>

      <button
        class="action-btn btn-delete"
        title="Eliminar prato"
        @click="$emit('delete', dish.id)"
      >
        <DeleteSVG />
      </button>
    </div>
  </article>
</template>

<script>
import AvailabilitySVG from './svgs/AvailabilitySVG.vue'
import DeleteSVG from './svgs/DeleteSVG.vue'

export default {
  name: 'DishCard',

  components: {
    AvailabilitySVG,
    DeleteSVG,
  },

  props: {
    dish: {
      type: Object,
      required: true,
    },
  },

  emits: ['toggle-availability', 'delete'],

  computed: {
    truncatedDescription() {
      const maxLength = 100
      if (this.dish.description.length <= maxLength) {
        return this.dish.description
      }
      return this.dish.description.substring(0, maxLength) + '...'
    },

    formattedPrice() {
      return this.dish.price.toFixed(2) + ' €'
    },

    categoryLabel() {
      const labels = {
        starters: 'Entrada',
        mains: 'Prato Principal',
        desserts: 'Sobremesa',
        drinks: 'Bebida',
      }
      return labels[this.dish.category] || this.dish.category
    },
  },
}
</script>

<style scoped>
.dish-card {
  background-color: var(--bg-soft);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dish-card.unavailable {
  opacity: 0.6;
}

.dish-card.unavailable .dish-image {
  filter: grayscale(50%);
}

.dish-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.dish-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.unavailable-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background-color: var(--color-error);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.dish-content {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.dish-name {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.dish-description {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  flex: 1;
}

.dish-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
}

.dish-price {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--accent-primary);
}

.dish-category {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  background-color: var(--bg-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.dish-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  justify-content: flex-end;
}
</style>
