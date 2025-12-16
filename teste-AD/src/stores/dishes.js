// Store Pinia para gestão centralizada de pratos

import { defineStore } from 'pinia'
import { getAllDishes, getDishesByCategory, createDish, deleteDish, updateDish } from '@/api/dishes'

export const useDishesStore = defineStore('dishes', {
  state: () => ({
    dishes: [],
    activeCategory: null,
    showOnlyAvailable: false,

    // Estados de UI
    loading: false,
    error: null,
  }),

  getters: {
    // Filtra por categoria e disponibilidade
    filteredDishes(state) {
      let result = state.dishes

      if (state.activeCategory) {
        result = result.filter((dish) => dish.category === state.activeCategory)
      }

      if (state.showOnlyAvailable) {
        result = result.filter((dish) => dish.available)
      }

      return result
    },

    hasDishes(state) {
      return state.dishes.length > 0
    },

    hasError(state) {
      return state.error !== null
    },
  },

  actions: {
    // Carrega todos os pratos
    async fetchAllDishes() {
      this.loading = true
      this.error = null

      try {
        this.dishes = await getAllDishes()
      } catch (err) {
        console.error('Erro ao carregar pratos:', err)
        this.error = 'Não foi possível carregar os pratos.'
        this.dishes = []
      } finally {
        this.loading = false
      }
    },

    // Carrega pratos por categoria (null = todos)
    async fetchDishesByCategory(category) {
      this.loading = true
      this.error = null
      this.activeCategory = category

      try {
        this.dishes = category ? await getDishesByCategory(category) : await getAllDishes()
      } catch (err) {
        console.error('Erro ao carregar pratos por categoria:', err)
        this.error = 'Não foi possível carregar os pratos.'
        this.dishes = []
      } finally {
        this.loading = false
      }
    },

    // Cria novo prato e adiciona à lista local
    async addDish(dishData) {
      this.loading = true
      this.error = null

      try {
        const newDish = await createDish(dishData)
        this.dishes.push(newDish)
        return newDish
      } catch (err) {
        console.error('Erro ao criar prato:', err)
        this.error = 'Não foi possível criar o prato.'
        return null
      } finally {
        this.loading = false
      }
    },

    // Remove prato com optimistic update e rollback
    async removeDish(id) {
      this.error = null

      const index = this.dishes.findIndex((d) => d.id === id)
      const removedDish = this.dishes[index]

      // Optimistic: remove da UI imediatamente
      if (index !== -1) {
        this.dishes.splice(index, 1)
      }

      try {
        await deleteDish(id)
        return true
      } catch (err) {
        console.error('Erro ao remover prato:', err)
        // Rollback em caso de erro
        if (removedDish) {
          this.dishes.splice(index, 0, removedDish)
        }
        this.error = 'Não foi possível remover o prato.'
        return false
      }
    },

    // Toggle disponibilidade com optimistic update
    async toggleAvailability(id) {
      const dish = this.dishes.find((d) => d.id === id)
      if (!dish) return false

      const originalAvailable = dish.available
      dish.available = !dish.available

      try {
        // PUT requer objeto completo
        await updateDish(id, { ...dish })
        return true
      } catch (err) {
        console.error('Erro ao atualizar disponibilidade:', err)
        dish.available = originalAvailable
        this.error = 'Não foi possível atualizar o prato.'
        return false
      }
    },

    setActiveCategory(category) {
      this.activeCategory = category
    },

    toggleShowOnlyAvailable() {
      this.showOnlyAvailable = !this.showOnlyAvailable
    },
  },

  // Persiste apenas a preferência showOnlyAvailable
  persist: {
    pick: ['showOnlyAvailable'],
  },
})
