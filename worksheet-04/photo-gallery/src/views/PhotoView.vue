<template>
  <div class="photo-view">
    <!-- Foto não encontrada - navegamos automaticamente para 404 -->
    <div v-if="!photo"></div>

    <!-- Exibição da foto -->
    <div v-else class="photo-container">
      <!-- Botão voltar -->
      <RouterLink to="/" class="back-button">
        <span class="back-icon" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </span>
        Back to Gallery
      </RouterLink>

      <!-- Imagem principal -->
      <div class="photo-display">
        <img :src="photo.url" :alt="photo.title" />
      </div>

      <!-- Título -->
      <h1 class="photo-title">{{ photo.title }}</h1>

      <!-- Navegação entre fotos -->
      <div class="photo-navigation">
        <!-- Botão Anterior -->
        <button @click="goToPrevious" :disabled="!hasPrevious" class="nav-button">Previous</button>

        <!-- Botão Aleatório -->
        <button @click="goToRandom" class="nav-button random">Random</button>

        <!-- Botão Próxima -->
        <button @click="goToNext" :disabled="!hasNext" class="nav-button">Next</button>
      </div>

      <!-- Dica de navegação por teclado -->
      <p class="keyboard-hint">Use arrow keys to navigate, ESC to return to gallery</p>
    </div>
  </div>
</template>

<script>
import { getPhotoById, getPreviousPhoto, getNextPhoto, getRandomPhoto } from '@/data/photos.js'

export default {
  name: 'PhotoView',
  data() {
    return {
      photo: null,
    }
  },
  computed: {
    hasPrevious() {
      if (!this.photo) return false
      return getPreviousPhoto(this.photo.id) !== null
    },
    hasNext() {
      if (!this.photo) return false
      return getNextPhoto(this.photo.id) !== null
    },
  },
  created() {
    this.loadPhoto()
  },
  mounted() {
    // Adiciona event listener para navegação por teclado
    window.addEventListener('keydown', this.handleKeyNavigation)
  },
  beforeUnmount() {
    // Remove event listener ao desmontar o componente
    window.removeEventListener('keydown', this.handleKeyNavigation)
  },
  watch: {
    // Quando o ID na rota muda, recarrega a foto
    '$route.params.id': {
      handler() {
        this.loadPhoto()
      },
      immediate: false,
    },
  },
  methods: {
    loadPhoto() {
      const photoId = this.$route.params.id
      this.photo = getPhotoById(photoId)

      // Se a foto não existe, navega para a página 404
      if (!this.photo) {
        this.$router.push({ name: 'not-found' })
      }
    },

    goToPrevious() {
      const previousPhoto = getPreviousPhoto(this.photo.id)
      if (previousPhoto) {
        // Navegação programática com named route
        this.$router.push({
          name: 'photo',
          params: { id: previousPhoto.id },
        })
      }
    },

    goToNext() {
      const nextPhoto = getNextPhoto(this.photo.id)
      if (nextPhoto) {
        this.$router.push({
          name: 'photo',
          params: { id: nextPhoto.id },
        })
      }
    },

    goToRandom() {
      const randomPhoto = getRandomPhoto(this.photo.id)
      if (randomPhoto) {
        this.$router.push({
          name: 'photo',
          params: { id: randomPhoto.id },
        })
      }
    },

    // Navegação por teclado
    handleKeyNavigation(event) {
      // Setas esquerda/direita para navegar entre fotos
      if (event.key === 'ArrowLeft') {
        event.preventDefault() // Previne scroll da página
        if (this.hasPrevious) {
          this.goToPrevious()
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (this.hasNext) {
          this.goToNext()
        }
      } else if (event.key === 'Escape') {
        // ESC volta à página inicial
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>

<style scoped>
.photo-view {
  max-width: 1200px;
  margin: 0 auto;
}

.photo-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.back-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo-display {
  background-color: transparent;
  border-radius: 12px;
  overflow: hidden;
}

.photo-display img {
  width: 100%;
  height: auto;
  display: block;
}

.photo-title {
  text-align: center;
  font-size: 2rem;
  margin: 0;
}

.photo-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-button {
  font-family: inherit;
  padding: 1rem 2rem;
  background-color: var(--black-mute);
  color: var(--text-dark);
  border: 1px solid var(--divider);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover:not(:disabled) {
  background-color: var(--black-muted);
}

.nav-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-button.random {
  background-color: var(--green);
}

.nav-button.random:hover {
  background-color: var(--green-hover);
}

.keyboard-hint {
  text-align: center;
  color: var(--text-dark-secondary);
  font-size: 0.9rem;
  font-weight: 400;
  font-style: italic;
}
</style>
