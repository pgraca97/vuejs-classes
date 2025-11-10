<template>
  <div class="login-view">
    <div class="login-card">
      <div class="login-header">
        <h1>AdminHub</h1>
        <p>Faz login para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            v-model="form.username"
            placeholder="admin / manager / viewer"
            required
            autofocus
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="admin123 / manager123 / viewer123"
            required
          />
        </div>

        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <!-- Informação sobre credenciais de teste -->
        <div class="test-credentials">
          <p><strong>Credenciais de teste:</strong></p>
          <ul>
            <li><strong>Admin:</strong> admin / admin123</li>
            <li><strong>Manager:</strong> manager / manager123</li>
            <li><strong>Viewer:</strong> viewer / viewer123</li>
          </ul>
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'A entrar...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth.js'

export default {
  name: 'LoginView',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errorMessage: '',
      isLoading: false,
      loginTimeoutId: null, 
    }
  },

  methods: {
    handleLogin() {
      this.errorMessage = ''
      this.isLoading = true

      // Limpa timeout anterior, se existir
      if (this.loginTimeoutId) {
        clearTimeout(this.loginTimeoutId)
      }

      // Simula delay de rede para demonstração
      this.loginTimeoutId = setTimeout(() => {
        const result = authStore.login(this.form.username, this.form.password)

        if (result.success) {
          this.handleSuccessfulLogin()
        } else {
          this.errorMessage = result.error
          this.isLoading = false
        }

        this.loginTimeoutId = null
      }, 500)
    },

    handleSuccessfulLogin() {
      // Verifica se existe rota de destino guardada (utilizador tentou aceder a rota protegida)
      const redirect = this.$route.query.redirect

      if (redirect) {
        // Redireciona para rota original
        this.$router.push(redirect)
      } else {
        // Navegação standard para dashboard
        this.$router.push({ name: 'dashboard' })
      }
    },
  },

  // Limpar timeout pendente quando componente é destruído
  beforeUnmount() {
    if (this.loginTimeoutId) {
      clearTimeout(this.loginTimeoutId)
    }
  },
}
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2rem;
}

.login-card {
  background: var(--bg-soft);
  border-radius: 12px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 2.5rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--text-dark-secondary);
  font-size: 1.1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--text-dark-secondary);
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid var(--divider);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--green);
}

.error-message {
  padding: 1rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 6px;
  color: var(--red);
  font-weight: 600;
  text-align: center;
}

.test-credentials {
  background: var(--black-mute);
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.test-credentials p {
  margin-bottom: 0.5rem;
  color: var(--text-dark-secondary);
}

.test-credentials ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.test-credentials li {
  padding: 0.25rem 0;
  color: var(--text-dark);
}

.login-button {
  padding: 1rem;
  background: var(--black-mute);
  color: var(--text-dark-blue);
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.login-button:hover:not(:disabled) {
  background: var(--btn-hover);
}

.login-button:disabled {
  background: var(--divider);
  cursor: not-allowed;
}
</style>
