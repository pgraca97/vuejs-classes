<template>
  <div class="news-list">
    <h2>Latest News</h2>

    <div class="news-grid">
      <article v-for="article in allNews" :key="article.id" class="news-card">
        <div class="news-header">
          <span class="category-tag" :class="getCategoryClass(article.category)">
            {{ article.category }}
          </span>
          <span class="news-date">{{ formatDate(article.date) }}</span>
        </div>

        <h3>{{ article.title }}</h3>
        <p class="news-summary">{{ article.summary }}</p>

        <!-- Botão agora navega para o artigo completo -->
        <button @click="goToArticle(article)" class="read-more">Read More</button>
      </article>
    </div>
  </div>
</template>

<script>
import { news } from '@/data/news.js'

export default {
  name: 'NewsListView',
  data() {
    return {
      allNews: news,
    }
  },
  methods: {
    getCategoryClass(category) {
      return category.toLowerCase().replace(/\s+/g, '-')
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
          name: article.category,
          id: article.id,
        },
      })
    },
  },
}
</script>

<style scoped>
.news-list h2 {
  font-size: 2rem;
}

.news-grid {
  display: grid;
  gap: 2rem;
}

.news-card {
  padding: 1.5rem 1.5rem 3rem 0;

  border-bottom: 1px solid var(--divider);
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.category-tag.technology {
  background-color: #e3f2fd;
  color: #1976d2;
}

.category-tag.environment {
  background-color: #e8f5e9;
  color: #388e3c;
}

.category-tag.business {
  background-color: #fff3e0;
  color: #f57c00;
}

.category-tag.health {
  background-color: #fce4ec;
  color: #c2185b;
}

.category-tag.science {
  background-color: #f3e5f5;
  color: #7b1fa2;
}

.category-tag.education {
  background-color: #e0f2f1;
  color: #00796b;
}

.category-tag.sports {
  background-color: #ffebee;
  color: #c62828;
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
</style>
