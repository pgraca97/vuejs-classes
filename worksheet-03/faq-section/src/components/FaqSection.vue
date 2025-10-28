<script>
import FaqItem from './FaqItem.vue'

export default {
  name: 'FAQSection',
  components: {
    FaqItem,
  },
  props: {
    faqs: {
      type: Array,
      required: true,
      validator(value) {
        // Valida que todos os objetos têm as propriedades obrigatórias
        return value.every((faq) => faq.id && faq.title && faq.body)
      },
    },
  },
  data() {
    return {
      // Controla qual FAQ está aberto (null = nenhum)
      // Apenas 1 FAQ aberto de cada vez
      openFaqId: null,
    }
  },
  methods: {
    handleToggle(faqId) {
      // Se clicar no mesmo que já está aberto, fecha
      // Senão, fecha o atual e abre o novo
      if (this.openFaqId === faqId) {
        this.openFaqId = null
      } else {
        this.openFaqId = faqId
      }
    },
  },
}
</script>

<template>
  <div class="faq-section">
    <div class="section-header">
      <h2 class="section-title">Perguntas Frequentes</h2>
    </div>

    <!-- Componente controlado: pai controla estado via prop isOpen -->
    <FaqItem
      v-for="faq in faqs"
      :key="faq.id"
      :is-open="openFaqId === faq.id"
      @toggle="handleToggle(faq.id)"
    >
      <!-- Preenchimento de named slots com dados do array -->
      <template #title>
        {{ faq.title }}
      </template>

      <template #subtitle v-if="faq.subtitle">
        {{ faq.subtitle }}
      </template>

      <template #body>
        {{ faq.body }}
      </template>
    </FaqItem>
  </div>
</template>

<style scoped>
.faq-section {
  max-width: 800px;
  margin: 0 auto;
  padding-inline: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: var(--green);
}

.section-title {
  margin: 0;
}
</style>