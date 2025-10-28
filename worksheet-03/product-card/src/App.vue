<script>
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    ProductList,
  },
}
</script>

<template>
  <h1>Vende-se!</h1>
  <!-- ProductList gere toda a lógica de produtos e eventos -->
  <ProductList />
</template>

<style scoped></style>