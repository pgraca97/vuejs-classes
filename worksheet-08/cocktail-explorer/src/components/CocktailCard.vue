<template>
  <article class="cocktail-card" @click="$emit('click')">
    <!-- Botão de favorito (.stop evita propagação do click para o card) -->
    <button
      class="favorite-btn"
      :class="{ 'is-favorite': isFavorite }"
      @click.stop="$emit('toggle-favorite', cocktail.idDrink)"
      :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
    >
      {{ isFavorite ? '★' : '☆' }}
    </button>

    <img
      :src="cocktail.strDrinkThumb"
      :alt="cocktail.strDrink"
      class="cocktail-image"
      loading="lazy"
    />

    <div class="cocktail-info">
      <h3>{{ cocktail.strDrink }}</h3>
    </div>
  </article>
</template>

<script>
export default {
  name: 'CocktailCard',

  props: {
    cocktail: {
      type: Object,
      required: true,
      // Validação da estrutura mínima esperada
      validator(value) {
        return value.idDrink && value.strDrink && value.strDrinkThumb
      },
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },

  // Declaração explícita dos eventos emitidos (boa prática)
  emits: ['click', 'toggle-favorite'],
}
</script>

<style scoped>
.cocktail-card {
  position: relative;
  background: var(--bg-soft);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  padding: 0 !important;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.favorite-btn {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background-color: var(--bg-soft);
  opacity: 0.8;
  color: var(--accent-secondary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  z-index: 1;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn.is-favorite {
  color: var(--accent-secondary);
  background: var(--bg-soft);
}

.cocktail-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.cocktail-info {
  padding: var(--spacing-lg);
}

.cocktail-info h3 {
  margin: 0;
  text-align: left;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
