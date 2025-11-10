<template>
  <!-- Só mostra quando isLoading é true -->
  <transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>A carregar...</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingIndicator',

  data() {
    return {
      isLoading: false,
    }
  },

  created() {
    // beforeEach: mostra loading quando navegação começa
    this.$router.beforeEach((to, from, next) => {
      this.isLoading = true
      next()
    })

    // afterEach: esconde loading quando navegação termina
    this.$router.afterEach(() => {
      // Pequeno delay para melhor UX (evita "piscar" em navegações rápidas)
      setTimeout(() => {
        this.isLoading = false
      }, 300)
    })
  },
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: var(--text-dark);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: var(--text-dark);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transição fade in/out */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
