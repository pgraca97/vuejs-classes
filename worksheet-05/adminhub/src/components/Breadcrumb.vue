<template>
  <nav class="breadcrumb" v-if="breadcrumbItems.length > 0">
    <router-link
      v-for="(item, index) in breadcrumbItems"
      :key="index"
      :to="item.path"
      class="breadcrumb-item"
      :class="{ active: index === breadcrumbItems.length - 1 }"
    >
      {{ item.name }}
      <span v-if="index < breadcrumbItems.length - 1" class="separator"> / </span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',

  data() {
    return {
      breadcrumbItems: [],
    }
  },

  methods: {
    // Constrói breadcrumb dinamicamente com base na rota atual
    buildBreadcrumb() {
      const items = []

      // Adiciona sempre Home como primeiro item
      items.push({
        name: 'Home',
        path: '/',
      })

      // Adiciona breadcrumb da rota atual se existir na meta
      if (this.$route.meta.breadcrumb) {
        items.push({
          name: this.$route.meta.breadcrumb,
          path: this.$route.path,
        })
      }

      this.breadcrumbItems = items
    },
  },

  // Watch para atualizar breadcrumb quando rota muda
  watch: {
    $route() {
      this.buildBreadcrumb()
    },
    immediate: false,
  },

  created() {
    this.buildBreadcrumb()
  },
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  font-size: 0.95rem;
}

.breadcrumb-item {
  color: var(--text-dark-secondary);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-item:hover:not(.active) {
  color: var(--text-dark-blue);
}

.breadcrumb-item.active {
  color: var(--green);
  font-weight: 600;
  cursor: default;
}

.separator {
  color: var(--text-dark-secondary);
  margin: 0 0.25rem;
}
</style>
