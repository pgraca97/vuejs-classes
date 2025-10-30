<template>
  <div class="home">
    <h1>Photo Gallery</h1>
    <p class="subtitle">Click on any photo to view it in full size</p>

    <div class="gallery-grid">
      <!-- named routes com params -->
      <RouterLink 
        v-for="photo in photos" 
        :key="photo.id"
        :to="{ name: 'photo', params: { id: photo.id } }"
        class="photo-card"
      >
        <img :src="photo.url" :alt="photo.title">
        <div class="photo-overlay">
          <h3>{{ photo.title }}</h3>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { photos } from '@/data/photos.js'

export default {
  name: 'HomeView',
  data() {
    return {
      photos: photos
    }
  }
}
</script>

<style scoped>


h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: var(--text-dark-secondary);
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem; 
}


.photo-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
}

.photo-card:hover {
  transform: translateY(-8px);
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.photo-card:hover img {
  transform: scale(1.1);
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.photo-card:hover .photo-overlay {
  transform: translateY(0);
}

.photo-overlay h3 {
  color: white;
  margin: 0;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 2rem;
  }
}

</style>