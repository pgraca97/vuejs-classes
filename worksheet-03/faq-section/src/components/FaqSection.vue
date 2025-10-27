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
        return value.every((faq) => faq.id && faq.title && faq.body)
      },
    },
  },
  data() {
    return {
      // Guarda o id do FAQ atualmente aberto; null significa nenhum aberto
      openFaqId: null,
    }
  },
  methods: {
    // Ao receber um toggle de um filho, alternamos o estado.
    // Se o mesmo id já estava aberto fechamos (null), senão abrimos o novo.
    handleToggle(faqId) {
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

    <!-- Cada item é controlado pelo pai via prop `isOpen` -->
    <FaqItem
      v-for="faq in faqs"
      :key="faq.id"
      :is-open="openFaqId === faq.id"
      @toggle="handleToggle(faq.id)"
    >
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
  padding: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
}

.close-all-btn {
  padding: 0.75rem 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.close-all-btn:hover {
  background: #c0392b;
}
</style>
