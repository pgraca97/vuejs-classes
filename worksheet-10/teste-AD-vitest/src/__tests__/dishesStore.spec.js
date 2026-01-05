// Testes da Store Pinia - useDishesStore
// Cobrem o ciclo completo de state management:
// - State inicial
// - Actions assíncronas
// - Optimistic updates com rollback
// - Getters

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDishesStore } from '@/stores/dishes'
import * as dishesAPI from '@/api/dishes'

// Mock do módulo da API para não fazer pedidos reais
vi.mock('@/api/dishes', () => ({
  getAllDishes: vi.fn(),
  createDish: vi.fn(),
  deleteDish: vi.fn(),
  updateDish: vi.fn(),
}))

describe('useDishesStore', () => {
  let store

  beforeEach(() => {
    // Criar nova instância do Pinia antes de cada teste
    // Garante que cada teste tem uma store limpa
    setActivePinia(createPinia())
    store = useDishesStore()
    vi.clearAllMocks()
  })

  describe('initial state', () => {
    it('should initialize with empty dishes and null activeCategory', () => {
      expect(store.dishes).toEqual([])
      expect(store.dishes).toHaveLength(0)
      expect(store.activeCategory).toBeNull()
    })
  })

  describe('actions', () => {
    it('fetchAllDishes() should call API and update state', async () => {
      const mockDishes = [
        { id: 1, name: 'Carbonara', category: 'mains', available: true },
        { id: 2, name: 'Tiramisu', category: 'desserts', available: true },
      ]

      dishesAPI.getAllDishes.mockResolvedValueOnce(mockDishes)

      await store.fetchAllDishes()

      expect(dishesAPI.getAllDishes).toHaveBeenCalledTimes(1)
      expect(store.dishes).toEqual(mockDishes)
      expect(store.dishes).toHaveLength(2)
    })

    it('addDish() should add dish to local list after creating in API', async () => {
      store.dishes = []

      const newDish = { name: 'Caesar Salad', price: 8.5, category: 'starters' }
      const createdDish = { id: 3, ...newDish }

      dishesAPI.createDish.mockResolvedValueOnce(createdDish)

      const result = await store.addDish(newDish)

      expect(dishesAPI.createDish).toHaveBeenCalledWith(newDish)
      expect(store.dishes).toHaveLength(1)
      expect(store.dishes[0]).toEqual(createdDish)
      expect(result).toEqual(createdDish)
    })

    it('removeDish() should rollback if API fails', async () => {
      // Lista inicial com 3 pratos
      store.dishes = [
        { id: 1, name: 'Dish 1' },
        { id: 2, name: 'Dish 2' },
        { id: 3, name: 'Dish 3' },
      ]

      // Simular falha na API
      dishesAPI.deleteDish.mockRejectedValueOnce(new Error('Server error'))

      await store.removeDish(2)

      // Prato deve ter voltado à lista (rollback)
      expect(store.dishes).toHaveLength(3)
      expect(store.dishes.find((d) => d.id === 2)).toBeDefined()
      expect(store.dishes.find((d) => d.id === 2).name).toBe('Dish 2')

      // Deve ter mensagem de erro
      expect(store.error).toBe('Não foi possível remover o prato.')
    })
  })

  describe('getters', () => {
    it('filteredDishes should return only dishes from active category', () => {
      store.dishes = [
        { id: 1, name: 'Carbonara', category: 'mains', available: true },
        { id: 2, name: 'Tiramisu', category: 'desserts', available: true },
        { id: 3, name: 'Pizza', category: 'mains', available: false },
        { id: 4, name: 'Bruschetta', category: 'starters', available: true },
      ]

      store.activeCategory = 'mains'

      const filtered = store.filteredDishes
      expect(filtered).toHaveLength(2)
      expect(filtered.every((d) => d.category === 'mains')).toBe(true)
    })
  })
})

// Conceitos demonstrados:
// - setActivePinia() para setup do Pinia em testes
// - vi.mock() para mock de módulos inteiros
// - Testar state inicial
// - Testar actions assíncronas que chamam APIs
// - Testar optimistic updates com rollback em caso de erro
// - Testar getters que processam/filtram dados
