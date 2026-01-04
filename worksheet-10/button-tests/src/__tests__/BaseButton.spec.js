import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseButton from '@/components/BaseButton.vue'

/** Testes para BaseButton
 * Objetivos dos testes:
 * - Montar componentes para testing com mount()
 * - Passar props e verificar renderização
 * - Simular interações do utilizador com trigger()
 * - Verificar eventos emitidos com emitted()
 */

describe('BaseButton', () => {
  describe('rendering', () => {
    it('should render the label text', () => {
      // mount() aceita um objeto de opções onde podemos passar props
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Click me',
        },
      })

      // wrapper.text() retorna todo o texto visível no componente
      expect(wrapper.text()).toBe('Click me')
    })

    it('should render different labels', () => {
      // Podemos testar com diferentes valores de props
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
      // Quando não passamos a prop disabled, deve ser false por default
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Button',
        },
      })

      // wrapper.find() permite selecionar elementos com seletores CSS
      const button = wrapper.find('button')

      // attributes() retorna todos os atributos HTML do elemento
      // Se disabled não estiver presente, attributes().disabled será undefined
      expect(button.attributes('disabled')).toBeUndefined()
    })

    it('should be disabled when prop is true', () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Button',
          disabled: true,
        },
      })

      const button = wrapper.find('button')

      // Quando disabled=true, o atributo HTML disabled é adicionado
      expect(button.attributes('disabled')).toBeDefined()
    })

    it('should not be disabled when prop is false', () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Button',
          disabled: false,
        },
      })

      const button = wrapper.find('button')

      expect(button.attributes('disabled')).toBeUndefined()
    })
  })

  describe('click events', () => {
    it('should emit click event when button is clicked', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Click me',
        },
      })

      // trigger() simula eventos do utilizador
      // É assíncrono porque o Vue precisa de tempo para processar o evento
      await wrapper.find('button').trigger('click')

      // emitted() retorna um objeto com todos os eventos emitidos
      // emitted('button-click') retorna um array com todas as emissões
      expect(wrapper.emitted('button-click')).toBeTruthy()
    })

    it('should emit click event multiple times', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Button',
        },
      })

      // Clicar 3 vezes
      const button = wrapper.find('button')
      await button.trigger('click')
      await button.trigger('click')
      await button.trigger('click')

      // emitted('button-click') retorna um array onde cada elemento representa uma emissão
      expect(wrapper.emitted('button-click')).toHaveLength(3)
    })

    it('should not emit click event when disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Button',
          disabled: true,
        },
      })

      // Tentar clicar num botão disabled
      await wrapper.find('button').trigger('click')

      // O evento não deve ter sido emitido
      expect(wrapper.emitted('button-click')).toBeUndefined()
    })

    it('should stop emitting after becoming disabled', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Button',
          disabled: false,
        },
      })

      // Primeiro click - deve funcionar
      const button = wrapper.find('button')
      await button.trigger('click')
      expect(wrapper.emitted('button-click')).toHaveLength(1)

      // Alterar a prop para disabled
      // setProps() é assíncrono porque o Vue precisa de re-renderizar
      await wrapper.setProps({ disabled: true })

      // Tentar clicar novamente - não deve emitir
      await button.trigger('click')

      // Ainda deve haver apenas 1 emissão (a primeira)
      expect(wrapper.emitted('button-click')).toHaveLength(1)
    })
  })

  // Teste de integração entre diferentes funcionalidades
  describe('integration', () => {
    it('should work correctly with dynamic prop changes', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          label: 'Initial',
          disabled: false,
        },
      })

      const button = wrapper.find('button')

      // Estado inicial
      expect(wrapper.text()).toBe('Initial')
      expect(button.attributes('disabled')).toBeUndefined()

      // Mudar label
      await wrapper.setProps({ label: 'Updated' })
      expect(wrapper.text()).toBe('Updated')

      // Click deve funcionar
      await button.trigger('click')
      expect(wrapper.emitted('button-click')).toHaveLength(1)

      // Desativar
      await wrapper.setProps({ disabled: true })
      expect(button.attributes('disabled')).toBeDefined()

      // Click não deve funcionar
      await button.trigger('click')
      expect(wrapper.emitted('button-click')).toHaveLength(1) // ainda 1, não aumentou
    })
  })
})
