<template>
  <div>
    <h3>Peso {{ weight }} kgs</h3>
    <!-- Botão para testar beforeUpdate/updated -->
    <button @click="weight++">Aumentar Peso</button>
  </div>
</template>

<script>
export default {
  name: 'WeightEx',
  data() {
    return {
      weight: 72,
    }
  },

  // LIFECYCLE HOOKS (Ciclo de vida do componente)

  // CRIAÇÃO
  beforeCreate() {
    console.log('🔵 beforeCreate: componente ainda não inicializado')
  },

  created() {
    console.log('🟢 created: dados reativos já disponíveis')
  },

  // MONTAGEM (adicionar ao DOM)
  beforeMount() {
    console.log('🟡 beforeMount: antes de adicionar ao DOM')
  },

  mounted() {
    console.log('🟣 mounted: componente está no DOM e visível')
  },

  // ATUALIZAÇÃO (quando dados mudam)
  beforeUpdate() {
    console.log('🟠 beforeUpdate: dados mudaram, DOM ainda não atualizou')
    console.log('   📊 this.weight:', this.weight, 'kgs')
    console.log('   📺 DOM mostra:', document.querySelector('h3')?.textContent)
  },

  updated() {
    console.log('🔴 updated: DOM foi atualizada com os novos dados')
    console.log('   📊 this.weight:', this.weight, 'kgs')
    console.log('   📺 DOM mostra:', document.querySelector('h3')?.textContent)
  },

  // DESMONTAGEM (remover do DOM)
  beforeUnmount() {
    console.log('⚫ beforeUnmount: antes de remover componente do DOM')
  },

  unmounted() {
    console.log('⚪ unmounted: componente removido')
  },
}
</script>

<style scoped></style>
