<template>
  <button :disabled="disabled" @click="handleClick" class="base-button">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    // Texto a mostrar no botão
    // Obrigatório porque um botão sem texto não faz sentido
    label: {
      type: String,
      required: true,
    },

    // Se o botão está desativado
    // Quando true, o botão não pode ser clicado
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    // Lida com o click no botão
    // Não emitimos o evento quando o botão está disabled.
    // Apesar do HTML já prevenir clicks em botões disabled, é boa prática
    // adicionar esta verificação para garantir consistência do comportamento.
    handleClick() {
      if (!this.disabled) {
        this.$emit('button-click')
      }
    },
  },
}
</script>

