<template>
  <div class="sidebar">
    <div class="sidebar-section">
      <h3>Categories</h3>
      <nav class="category-list">
        <RouterLink
          v-for="category in categories"
          :key="category"
          :to="`/category/${category}`"
          class="category-item"
        >
          <span>{{ category }}</span>
        </RouterLink>
      </nav>
    </div>

    <div class="sidebar-section">
      <h3>Featured News</h3>
      <div class="featured-list">
        <RouterLink
          v-for="article in featuredNews"
          :key="article.id"
          :to="{
            name: 'article',
            params: { name: article.category.toLocaleLowerCase(), id: article.id },
          }"
          custom
          v-slot="{ navigate, isExactActive }"
        >
          <div @click="navigate" 
          :class="['featured-item', {active: isExactActive}]">
            <h4>{{ article.title }}</h4>
            <span class="featured-category">{{ article.category }}</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories, getFeaturedNews } from '@/data/news.js'

export default {
  name: 'SidebarView',
  data() {
    return {
      categories: getCategories(),
      featuredNews: getFeaturedNews(),
    }
  },
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar-section {
  border-right: 1px solid var(--divider);
  padding: 1.5rem;
}

.sidebar-section h3 {
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  color: var(--text-dark-secondary);
  text-decoration: none;
  transition: color 0.3s;
}

.category-item:hover {
  color: var(--green);
}

.category-item.router-link-active {
  color: var(--green);
}

.featured-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.featured-item {
  padding: 0.75rem;
  background-color: var(--bg-soft);
  border-radius: 6px;
  border-left: 3px solid var(--green);
}

.featured-item.active {
  border-left: 3px solid var(--yellow);
}


.featured-item h4 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.featured-category {
  color: var(--text-dark-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
}
</style>
