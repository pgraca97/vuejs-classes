<template>
  <div class="banner">
    <div v-if="currentNews" class="banner-content">
      <div class="banner-text">
        <span class="banner-label">Featured</span>
        <h2>{{ currentNews.title }}</h2>
        <p>{{ currentNews.summary }}</p>
      </div>
      
      <div class="banner-dots">
        <span 
          v-for="(article, index) in featuredNews" 
          :key="article.id"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>

    <div v-else class="banner-empty">
      <p>No featured news available</p>
    </div>
  </div>
</template>

<script>
import { getFeaturedNews } from '@/data/news.js'

export default {
  name: 'BannerView',
  data() {
    return {
      featuredNews: getFeaturedNews(),
      currentIndex: 0,
      intervalId: null
    }
  },
  computed: {
    currentNews() {
      if (this.featuredNews.length === 0) return null
      return this.featuredNews[this.currentIndex]
    }
  },
  mounted() {
    // Auto-rotate entre notícias featured a cada 5 segundos
    if (this.featuredNews.length > 1) {
      this.intervalId = setInterval(() => {
        this.nextSlide()
      }, 5000)
    }
  },
  beforeUnmount() {
    // Limpa o interval quando o componente é destruído
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  methods: {
    nextSlide() {
      console.log(this.currentIndex)
      console.log(this.featuredNews.length)
      this.currentIndex = (this.currentIndex + 1) % this.featuredNews.length
      console.log(this.currentIndex)
    },
    goToSlide(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.banner {
  background: var(--black-mute);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--divider);
  min-height: 200px;
  display: flex;
  align-items: center;
}

.banner-content {
  padding: 2rem;
  color: var(--text-dark);
  width: 100%;
}

.banner-label {
  display: inline-block;
  background-color: var(--green);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.banner-text h2 {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.banner-text p {
  font-size: 1.1rem;
  opacity: 0.95;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.banner-dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.dot:hover {
  background-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.dot.active {
  background-color: var(--green);
  transform: scale(1.3);
}

.banner-empty {
  padding: 2rem;
  color: var(--text-dark);
  text-align: center;
  width: 100%;
}
</style>