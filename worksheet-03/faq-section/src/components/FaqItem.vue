<script>
export default {
  name: 'FAQItem',
  // Componente controlado pelo pai: recebe isOpen via prop
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggle() {
      // Emite evento para o pai saber que este item foi clicado
      // O pai decide como reagir (por exemplo: abrir/fechar ou garantir "apenas um aberto")
      this.$emit('toggle')
    },
  },
}
</script>

<template>
  <div class="faq-item" :class="{ open: isOpen }">
    <!-- Header clicável que sempre está visível -->
    <div class="faq-header" @click="toggle">
      <div class="faq-title-section">
        <!-- Slot nomeado para o título -->
        <h3 class="faq-title">
          <slot name="title">Título por defeito</slot>
        </h3>

        <!-- Slot nomeado para o subtitle (só aparece se for fornecido) -->
        <p v-if="$slots.subtitle" class="faq-subtitle">
          <slot name="subtitle"></slot>
        </p>
      </div>

      <!-- Indicador visual que roda quando abre/fecha -->
      <span class="faq-indicator" :class="{ rotated: isOpen }"> ▼ </span>
    </div>

    <!-- Body que aparece/desaparece consoante isOpen -->
    <div v-if="isOpen" class="faq-body">
      <!-- Slot nomeado para o conteúdo detalhado -->
      <slot name="body">Conteúdo por defeito</slot>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.3s;
}

.faq-item:hover {
  border-color: #3498db;
}

.faq-item.open {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  cursor: pointer;
  background: white;
  transition: background 0.2s;
}

.faq-header:hover {
  background: #f8f9fa;
}

.faq-title-section {
  flex: 1;
}

.faq-title {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.faq-subtitle {
  margin: 0.5rem 0 0 0;
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.faq-indicator {
  font-size: 1.2rem;
  color: #3498db;
  transition: transform 0.3s;
  user-select: none;
}

.faq-indicator.rotated {
  transform: rotate(180deg);
}

.faq-body {
  padding: 0 1.25rem 1.25rem 1.25rem;
  color: #555;
  line-height: 1.6;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
