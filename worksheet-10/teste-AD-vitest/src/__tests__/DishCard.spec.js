// Testes do Componente DishCard.vue
// Cobrem os fundamentos de component testing em Vue:
// - Renderização de props
// - Eventos emitidos
// - Classes CSS condicionais

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DishCard from '@/components/DishCard.vue'

describe('DishCard.vue', () => {
  // Objeto mock de um prato para usar nos testes
  const mockDish = {
    id: 1,
    name: 'Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, and guanciale',
    price: 12.5,
    category: 'mains',
    available: true,
    imageUrl: 'https://example.com/carbonara.jpg',
  }

  describe('rendering', () => {
    it('should render dish name and price correctly', () => {
      const wrapper = mount(DishCard, {
        props: { dish: mockDish },
      })

      // Verificar texto geral
      expect(wrapper.text()).toContain('Carbonara')
      expect(wrapper.text()).toContain('12.50')
      expect(wrapper.text()).toContain('€')

      // Verificar elementos específicos
      expect(wrapper.find('.dish-name').text()).toBe('Carbonara')
      expect(wrapper.find('.dish-price').text()).toContain('12.50 €')
    })
  })

  describe('events', () => {
    it('should emit delete event with correct ID when delete button is clicked', async () => {
      const wrapper = mount(DishCard, {
        props: { dish: mockDish },
      })

      // Clicar no botão de eliminar
      await wrapper.find('.btn-delete').trigger('click')

      // Verificar que o evento foi emitido com o ID correto
      expect(wrapper.emitted('delete')).toBeTruthy()
      expect(wrapper.emitted('delete')[0]).toEqual([mockDish.id])
    })
  })

  describe('conditional rendering', () => {
    it('should apply unavailable class when dish is unavailable', () => {
      const unavailableDish = { ...mockDish, available: false }

      const wrapper = mount(DishCard, {
        props: { dish: unavailableDish },
      })

      // Card deve ter classe "unavailable"
      expect(wrapper.find('.dish-card').classes()).toContain('unavailable')

      // Badge de indisponibilidade deve estar visível
      expect(wrapper.text()).toContain('Indisponível')
      expect(wrapper.find('.unavailable-badge').exists()).toBe(true)
    })

    it('should not have unavailable class when dish is available', () => {
      const wrapper = mount(DishCard, {
        props: { dish: mockDish },
      })

      expect(wrapper.find('.dish-card').classes()).not.toContain('unavailable')
      expect(wrapper.find('.unavailable-badge').exists()).toBe(false)
    })
  })
})

// Conceitos demonstrados:
// - mount() para montar componentes com props
// - wrapper.find() com seletores CSS
// - wrapper.text() para verificar texto renderizado
// - wrapper.trigger() para simular eventos
// - wrapper.emitted() para verificar eventos emitidos
// - wrapper.exists() para verificar presença de elementos
// - wrapper.classes() para verificar classes CSS
