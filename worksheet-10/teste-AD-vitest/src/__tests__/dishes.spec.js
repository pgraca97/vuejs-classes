// Testes das Funções API - '@/api/dishes'
// Cobrem os cenários mais comuns de testes de API:
// - GET para obter dados
// - POST para criar recursos
// - PUT para atualizar recursos
// - Error handling (404, etc.)

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getAllDishes, createDish, updateDish, deleteDish } from '@/api/dishes'

describe('API Functions - dishes.js', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.clearAllMocks()
  })

  describe('getAllDishes', () => {
    it('should make GET request and return array of dishes', async () => {
      const mockDishes = [
        { id: 1, name: 'Carbonara', price: 12.5 },
        { id: 2, name: 'Tiramisu', price: 6.0 },
      ]

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockDishes,
      })

      const result = await getAllDishes()

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/dishes', {
        method: 'GET',
      })
      expect(result).toEqual(mockDishes)
      expect(result).toHaveLength(2)
    })
  })

  describe('createDish', () => {
    it('should make POST request with data and return created dish', async () => {
      const newDish = {
        name: 'Caesar Salad',
        description: 'Fresh salad',
        price: 8.5,
        category: 'starters',
        available: true,
        imageUrl: 'https://example.com/salad.jpg',
      }

      const createdDish = { id: 10, ...newDish }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createdDish,
      })

      const result = await createDish(newDish)

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/dishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDish),
      })
      expect(result).toEqual(createdDish)
      expect(result.id).toBe(10)
    })
  })

  describe('updateDish', () => {
    it('should make PUT request to toggle availability', async () => {
      const dishId = 5

      // Dados antes da alteração (simulado conceptualmente)
      const originalAvailable = true

      // Dados após a alteração
      const updatedDish = {
        id: 5,
        name: 'Carbonara',
        description: 'Italian pasta',
        price: 12.5,
        category: 'mains',
        available: !originalAvailable, // false
        imageUrl: 'https://example.com/img.jpg',
      }

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => updatedDish,
      })

      const result = await updateDish(dishId, updatedDish)

      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3000/dishes/${dishId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDish),
      })
      expect(result).toEqual(updatedDish)
      expect(result.available).toBe(false)
    })
  })

  describe('deleteDish', () => {
    it('should throw error when dish does not exist (404)', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      // expect().rejects para testar erros assíncronos
      await expect(deleteDish(999)).rejects.toThrow('HTTP error! status: 404')

      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/dishes/999', {
        method: 'DELETE',
      })
    })
  })
})

// Conceitos demonstrados:
// - vi.fn() para mock do fetch global
// - mockResolvedValueOnce() para simular respostas
// - Testar métodos HTTP (GET, POST, PUT, DELETE)
// - Verificar URL, headers e body dos pedidos
// - expect().rejects.toThrow() para erros assíncronos
