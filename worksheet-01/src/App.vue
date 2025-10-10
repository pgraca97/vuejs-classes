<script>
// Ex1: Componente básico com interpolação e scoped CSS
import Ex1 from './components/Ex1.vue'
// Ex2: Computed properties vs Methods
import Ex2 from './components/Ex2.vue'
// Ex3: Lifecycle Hooks (ciclo de vida do componente)
import Ex3 from './components/Ex3.vue'
// Ex4: Diretivas (v-for, v-if, v-bind, v-on, v-html), operador ternário, :disabled
import Ex4 from './components/Ex4.vue'

export default {
  name: 'App',
  components: {
    Ex1,
    Ex2,
    Ex3,
    Ex4,
  },
  data() {
    return {
      showEx3: true,
    }
  },
}
</script>

<template>
  <Ex1 />
  <hr />
  <Ex2 />
  <hr />
  <!-- Botão para testar beforeUnmount/unmounted do Ex3 -->
  <button @click="showEx3 = !showEx3">
    {{ showEx3 ? 'Desmontar Ex3' : 'Montar Ex3' }}
  </button>
  <Ex3 v-if="showEx3" />
  <hr />
  <Ex4 />
</template>

<style scoped></style>
