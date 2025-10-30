<template>
  <div class="article-view">
    <!-- Article not found -->
    <div v-if="!article" class="not-found">
      <h1>Article Not Found</h1>
      <p>The article you're looking for doesn't exist or may have been removed.</p>

    </div>

    <!-- Article content -->
    <div v-else class="article-container">
      <!-- Breadcrumb navigation -->
      <nav class="breadcrumb">
        <RouterLink to="/home">Home</RouterLink>
        <span class="separator">›</span>
        <RouterLink :to="`/category/${article.category}`">
          {{ article.category }}
        </RouterLink>
        <span class="separator">›</span>
        <span class="current">{{ article.title }}</span>
      </nav>

      <!-- Article header -->
      <header class="article-header">
        <span class="category-badge" :class="getCategoryClass(article.category)">
          {{ article.category }}
        </span>
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="date">{{ formatDate(article.date) }}</span>
        </div>
      </header>

      <!-- Article body -->
      <div class="article-body">
        <p class="lead">{{ article.summary }}</p>
        <div class="article-content">
          <p>{{ article.content }}</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { getNewsById } from '@/data/news.js'

export default {
  name: 'ArticleView',
  computed: {
    article() {
      // Obtém o ID do artigo da rota
      const articleId = this.$route.params.id
      return getNewsById(articleId)
    },
  },
  methods: {
    goBack() {
      // Navega de volta para a categoria utilizando navegação programática
      if (this.article) {
        this.$router.push(`/category/${this.article.category}`)
      } else {
        this.$router.push('/home')
      }
    },

    getCategoryClass(category) {
      return category.toLowerCase().replace(/\s+/g, '-')
    },

    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-PT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.article-view {
  max-width: 900px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.breadcrumb .separator {
  color: var(--divider);
}

.breadcrumb .current {
  color: var(--text-dark-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--divider);
}

.category-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.category-badge.technology {
  background-color: #e3f2fd;
  color: #1976d2;
}

.category-badge.environment {
  background-color: #e8f5e9;
  color: #388e3c;
}

.category-badge.business {
  background-color: #fff3e0;
  color: #f57c00;
}

.category-badge.health {
  background-color: #fce4ec;
  color: #c2185b;
}

.category-badge.science {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.category-badge.education {
  background-color: #e0f2f1;
  color: #00796b;
}

.category-badge.sports {
  background-color: #ffebee;
  color: #c62828;
}

.article-header h1 {
  font-size: 2.5rem;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--text-dark-secondary);
}

.article-body {
  margin-bottom: 3rem;
}

.lead {
  font-size: 1.25rem;
  color: var(--text-dark);
  line-height: 1.7;
  margin-bottom: 2rem;
  font-weight: 500;
}

.article-content {
  color: var(--text-dark);
  font-size: 1.1rem;
  line-height: 1.8;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.article-actions {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--divider);
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

.not-found h1 {
  color: var(--red);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
}


</style>
