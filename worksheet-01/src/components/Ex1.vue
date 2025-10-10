<template>
  <header>
    <!-- Interpolação: renderiza o valor de 'msg' -->
    <h1>{{ msg }}</h1>
  </header>
</template>

<script>
export default {
  name: 'HelloVue',
  data() {
    return {
      msg: 'Hello Vue!', // Estado reativo do componente
    }
  },
}
</script>

<style scoped>

h1 {
  color: #42b983;
}

</style>
