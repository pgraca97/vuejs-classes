// Testes da Store Pinia - useCounterStore
// Cobrem o ciclo completo de state management:
// - State inicial
// - Actions (increment, decrement, reset)
// - Getters (double, isPositive)

import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, it, expect } from 'vitest'
import { useCounterStore } from '@/stores/counter'

describe('useCounterStore', () => {
  // Criar nova instância do Pinia antes de cada teste
  // Garante que cada teste tem uma store limpa
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with count = 0', () => {
      const store = useCounterStore()

      expect(store.count).toBe(0)
    })
  })

  describe('actions', () => {
    describe('increment', () => {
      it('should increase count by 1', () => {
        const store = useCounterStore()

        expect(store.count).toBe(0)
        store.increment()
        expect(store.count).toBe(1)
      })

      it('should work multiple times', () => {
        const store = useCounterStore()

        store.increment()
        store.increment()
        store.increment()

        expect(store.count).toBe(3)
      })
    })

    describe('decrement', () => {
      it('should decrease count by 1', () => {
        const store = useCounterStore()

        store.decrement()

        expect(store.count).toBe(-1)
      })

      it('should allow negative numbers', () => {
        const store = useCounterStore()

        store.decrement()
        store.decrement()
        store.decrement()

        expect(store.count).toBe(-3)
      })

      it('should work after incrementing', () => {
        const store = useCounterStore()

        store.increment()
        store.increment()
        store.decrement()

        expect(store.count).toBe(1)
      })
    })

    describe('reset', () => {
      it('should reset count to 0', () => {
        const store = useCounterStore()

        store.increment()
        store.increment()
        store.increment()
        expect(store.count).toBe(3)

        store.reset()

        expect(store.count).toBe(0)
      })

      it('should reset from negative values', () => {
        const store = useCounterStore()

        store.decrement()
        store.decrement()
        expect(store.count).toBe(-2)

        store.reset()

        expect(store.count).toBe(0)
      })
    })
  })

  describe('getters', () => {
    describe('double', () => {
      it('should return double the count value', () => {
        const store = useCounterStore()

        expect(store.double).toBe(0)

        store.count = 5
        expect(store.double).toBe(10)
      })

      it('should work with negative numbers', () => {
        const store = useCounterStore()

        store.count = -3
        expect(store.double).toBe(-6)
      })

      it('should be reactive to state changes', () => {
        const store = useCounterStore()

        expect(store.double).toBe(0)
        store.increment()
        expect(store.double).toBe(2)
      })
    })

    describe('isPositive', () => {
      it('should return false when count is 0', () => {
        const store = useCounterStore()

        expect(store.isPositive).toBe(false)
      })

      it('should return true when count is greater than 0', () => {
        const store = useCounterStore()

        store.increment()

        expect(store.isPositive).toBe(true)
      })

      it('should return false when count is less than 0', () => {
        const store = useCounterStore()

        store.decrement()

        expect(store.isPositive).toBe(false)
      })

      it('should update reactively', () => {
        const store = useCounterStore()

        expect(store.isPositive).toBe(false)

        store.increment()
        expect(store.isPositive).toBe(true)

        store.decrement()
        store.decrement()
        expect(store.isPositive).toBe(false)
      })
    })
  })

  describe('integration', () => {
    it('should maintain consistency between state, actions and getters', () => {
      const store = useCounterStore()

      expect(store.count).toBe(0)
      expect(store.double).toBe(0)
      expect(store.isPositive).toBe(false)

      store.increment()
      store.increment()
      store.increment()

      expect(store.count).toBe(3)
      expect(store.double).toBe(6)
      expect(store.isPositive).toBe(true)

      store.decrement()
      store.decrement()
      store.decrement()
      store.decrement()
      store.decrement()

      expect(store.count).toBe(-2)
      expect(store.double).toBe(-4)
      expect(store.isPositive).toBe(false)

      store.reset()

      expect(store.count).toBe(0)
      expect(store.double).toBe(0)
      expect(store.isPositive).toBe(false)
    })
  })
})

// Conceitos demonstrados:
// - setActivePinia() para setup do Pinia em testes
// - beforeEach() para garantir testes isolados
// - Testar state inicial
// - Testar actions síncronas
// - Testar getters e a sua reatividade
