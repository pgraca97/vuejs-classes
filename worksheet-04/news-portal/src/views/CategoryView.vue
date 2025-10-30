<template>
  <div class="category-view">
    <!-- Category not found -->
    <div v-if="!categoryExists" class="not-found">
      <h1>Category Not Found</h1>
      <p>The category "{{ categoryName }}" doesn't exist.</p>
      <RouterLink to="/home" class="back-button">
        
        Back to Home
      </RouterLink>
    </div>

    <!-- Category content -->
    <div v-else>
      <div class="category-header">
        <RouterLink to="/home" class="back-button">

          Back to Home
        </RouterLink>
        <h1>{{ categoryName }}</h1>
        <p class="subtitle">
          {{ filteredNews.length }} article{{ filteredNews.length !== 1 ? 's' : '' }} in this
          category
        </p>
      </div>

      <!-- Aqui precisamos do RouterView para renderizar as nested routes -->
      <!-- Quando estamos em /category/Technology, renderiza a lista -->
      <!-- Quando estamos em /category/Technology/article/1, renderiza o artigo -->
      <RouterView v-if="$route.params.id" />

      <!-- Lista de notícias (só mostra se não estivermos num artigo) -->
      <div v-else>
        <div class="news-grid">
          <article v-for="article in filteredNews" :key="article.id" class="news-card">
            <div class="news-header">
              <span class="news-date">{{ formatDate(article.date) }}</span>
            </div>

            <h3>{{ article.title }}</h3>
            <p class="news-summary">{{ article.summary }}</p>

            <!-- Botão agora navega para o artigo -->
            <button @click="goToArticle(article)" class="read-more">Read More</button>
          </article>
        </div>

        <div v-if="filteredNews.length === 0" class="no-news">
          <p>No articles found in this category.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsByCategory, getCategories } from '@/data/news.js'

export default {
  name: 'CategoryView',
  data() {
    return {
      filteredNews: [],
      categoryName: '',
      validCategories: getCategories(),
    }
  },
  computed: {
    categoryExists() {
      return this.validCategories.some(
        (cat) => cat.toLowerCase() === this.categoryName.toLowerCase(),
      )
    },
  },
  created() {
    this.loadCategoryNews()
  },
  watch: {
    '$route.params.name': {
      handler() {
        this.loadCategoryNews()
      },
    },
  },
  methods: {
    loadCategoryNews() {
      this.categoryName = this.$route.params.name

      if (this.categoryExists) {
        this.filteredNews = getNewsByCategory(this.categoryName)
      } else {
        this.filteredNews = []
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },

    // Para navegar para o artigo
    goToArticle(article) {
      this.$router.push({
        name: 'article',
        params: {
          name: this.categoryName,
          id: article.id,
        },
      })
    },
  },
}
</script>

<style scoped>
.category-view {
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  display: inline-flex;
  inline-size: fit-content;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: var(--black-muted);
}


.category-header {
  margin-bottom: 1rem;
}

.category-header h1 {
  font-size: 2.5rem;
}

.subtitle {
  color: var(--text-dark-secondary);
  font-size: 1.1rem;
}

.news-grid {
  display: grid;
  gap: 2rem;
}

.news-card {
  padding: 1.5rem 1.5rem 3rem 0;

  border-bottom: 1px solid var(--divider);
}

.news-card:first-child {
  padding-top: 3rem;
  border-top: 1px solid var(--divider);
}

.news-card:last-child {
  border-bottom: none;
}

.news-header {
  margin-bottom: 1rem;
}

.news-date {
  color: var(--text-dark-secondary);
  font-size: 0.875rem;
}

.news-card h3 {
  color: var(--text-dark);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

.news-summary {
  color: var(--text-dark-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  font-family: inherit;
  padding: 0.5rem 1.5rem;
  background-color: var(--bg-soft);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.read-more:hover {
  background-color: var(--black-muted);
}

.no-news {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-dark-secondary);
}

.not-found h1 {
  color: var(--red);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
}
</style>
