<template>
  <div class="form-view">
    <header class="form-header">
      <h1 class="page-title">Criar Novo Prato</h1>
    </header>

    <form @submit.prevent="handleSubmit" class="dish-form">
      <div class="form-group">
        <label for="name" class="form-label">Nome *</label>
        <input
          id="name"
          v-model.trim="form.name"
          type="text"
          class="form-input"
          :class="{ error: errors.name }"
          placeholder="Nome do prato"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Descrição *</label>
        <textarea
          id="description"
          v-model.trim="form.description"
          class="form-textarea"
          :class="{ error: errors.description }"
          placeholder="Descrição do prato"
          rows="4"
        ></textarea>
        <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
      </div>

      <div class="form-group">
        <label for="price" class="form-label">Preço (€) *</label>
        <input
          id="price"
          v-model.number="form.price"
          type="number"
          step="0.01"
          min="0.01"
          class="form-input"
          :class="{ error: errors.price }"
          placeholder="0.00"
        />
        <span v-if="errors.price" class="error-message">{{ errors.price }}</span>
      </div>

      <div class="form-group">
        <label for="category" class="form-label">Categoria *</label>
        <select
          id="category"
          v-model="form.category"
          class="form-select"
          :class="{ error: errors.category }"
        >
          <option value="" disabled>Selecione uma categoria</option>
          <option value="starters">Entradas</option>
          <option value="mains">Pratos Principais</option>
          <option value="desserts">Sobremesas</option>
          <option value="drinks">Bebidas</option>
        </select>
        <span v-if="errors.category" class="error-message">{{ errors.category }}</span>
      </div>

      <div class="form-group">
        <label for="imageUrl" class="form-label">URL da Imagem *</label>
        <input
          id="imageUrl"
          v-model.trim="form.imageUrl"
          type="text"
          class="form-input"
          :class="{ error: errors.imageUrl }"
          placeholder="https://exemplo.com/imagem.jpg"
        />
        <span v-if="errors.imageUrl" class="error-message">{{ errors.imageUrl }}</span>
      </div>

      <div class="form-group form-group-inline">
        <label class="checkbox-label">
          <input v-model="form.available" type="checkbox" />
          Disponível
        </label>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn-secondary">Cancelar</button>
        <button type="submit" class="btn-primary" :disabled="store.loading">
          {{ store.loading ? 'A criar...' : 'Criar Prato' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useDishesStore } from '@/stores/dishes'

export default {
  name: 'DishFormView',

  data() {
    return {
      form: {
        name: '',
        description: '',
        price: null,
        category: '',
        imageUrl: '',
        available: true,
      },
      errors: {
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      },
    }
  },

  computed: {
    ...mapStores(useDishesStore),

    store() {
      return this.dishesStore
    },
  },

  methods: {
    validate() {
      let isValid = true

      this.errors = {
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      }

      if (!this.form.name) {
        this.errors.name = 'O nome é obrigatório.'
        isValid = false
      }

      if (!this.form.description) {
        this.errors.description = 'A descrição é obrigatória.'
        isValid = false
      }

      if (this.form.price === null || this.form.price === '') {
        this.errors.price = 'O preço é obrigatório.'
        isValid = false
      } else if (this.form.price <= 0) {
        this.errors.price = 'O preço deve ser maior que 0.'
        isValid = false
      }

      if (!this.form.category) {
        this.errors.category = 'A categoria é obrigatória.'
        isValid = false
      }

      if (!this.form.imageUrl) {
        this.errors.imageUrl = 'O URL da imagem é obrigatório.'
        isValid = false
      }

      return isValid
    },

    async handleSubmit() {
      if (!this.validate()) return

      const newDish = await this.store.addDish({
        name: this.form.name,
        description: this.form.description,
        price: parseFloat(this.form.price),
        category: this.form.category,
        imageUrl: this.form.imageUrl,
        available: this.form.available,
      })

      if (newDish) {
        this.$router.push({ name: 'home' })
      }
    },

    handleCancel() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style scoped>
.form-view {
  max-width: var(--container-sm);
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-xl);
}

.form-header {
  margin-bottom: var(--spacing-xl);
}

.dish-form {
  background-color: var(--bg-soft);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-group-inline {
  display: flex;
  align-items: center;
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  color: var(--text-primary);
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: var(--accent-primary);
}

.form-input.error,
.form-textarea.error,
.form-select.error {
  border-color: var(--color-error);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.error-message {
  display: block;
  margin-top: var(--spacing-xs);
  color: var(--color-error);
  font-size: var(--font-size-sm);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  font-weight: 500;
  color: var(--text-primary);
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}
</style>
