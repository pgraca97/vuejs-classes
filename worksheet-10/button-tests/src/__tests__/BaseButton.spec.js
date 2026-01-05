// Testes do Componente BaseButton.vue
// Cobrem os fundamentos de component testing em Vue:
// - Renderização de props
// - Estados (disabled)
// - Eventos emitidos
// - Mudanças dinâmicas de props

import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/BaseButton.vue'

describe('BaseButton', () => {
  describe('rendering', () => {
    it('should render the label text', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Click me' },
      })

      expect(wrapper.text()).toBe('Click me')
    })

    it('should render different labels', () => {
      const wrapper1 = mount(BaseButton, {
        props: { label: 'Submit' },
      })
      const wrapper2 = mount(BaseButton, {
        props: { label: 'Cancel' },
      })

      expect(wrapper1.text()).toBe('Submit')
      expect(wrapper2.text()).toBe('Cancel')
    })
  })

  describe('disabled state', () => {
    it('should not be disabled by default', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button' },
      })

      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })

    it('should be disabled when prop is true', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button', disabled: true },
      })

      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('should not be disabled when prop is false', () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button', disabled: false },
      })

      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })
  })

  describe('click events', () => {
    it('should emit button-click event when clicked', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Click me' },
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('button-click')).toBeTruthy()
    })

    it('should emit button-click event multiple times', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button' },
      })

      const button = wrapper.find('button')
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')

      expect(wrapper.emitted('button-click')).toHaveLength(3)
    })

    it('should not emit event when disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button', disabled: true },
      })

      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted('button-click')).toBeUndefined()
    })

    it('should stop emitting after becoming disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Button', disabled: false },
      })

      const button = wrapper.find('button')
      await button.trigger('click')
      expect(wrapper.emitted('button-click')).toHaveLength(1)

      // setProps() para mudar props dinamicamente
      await wrapper.setProps({ disabled: true })
      await button.trigger('click')

      expect(wrapper.emitted('button-click')).toHaveLength(1)
    })
  })

  describe('integration', () => {
    it('should work correctly with dynamic prop changes', async () => {
      const wrapper = mount(BaseButton, {
        props: { label: 'Initial', disabled: false },
      })

      const button = wrapper.find('button')

      expect(wrapper.text()).toBe('Initial')
      expect(button.attributes('disabled')).toBeUndefined()

      await wrapper.setProps({ label: 'Updated' })
      expect(wrapper.text()).toBe('Updated')

      await button.trigger('click')
      expect(wrapper.emitted('button-click')).toHaveLength(1)

      await wrapper.setProps({ disabled: true })
      expect(button.attributes('disabled')).toBeDefined()

      await button.trigger('click')
      expect(wrapper.emitted('button-click')).toHaveLength(1)
    })
  })
})

// Conceitos demonstrados:
// - mount() para montar componentes com props
// - wrapper.find() com seletores CSS
// - wrapper.text() para verificar texto renderizado
// - wrapper.trigger() para simular eventos
// - wrapper.emitted() para verificar eventos emitidos
// - wrapper.attributes() para verificar atributos HTML
// - wrapper.setProps() para mudanças dinâmicas de props
