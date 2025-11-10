<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <h1>Admin Dashboard</h1>
        <p class="subtitle">Enter your credentials to access the dashboard</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="your.email@company.com"
              autocomplete="off"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" class="login-button">Sign In</button>
        </form>

        <p class="demo-note">
          This is a demo. Enter any email and password to access the dashboard.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      // Simulação de login (sem validação real)
      // Em produção, seria feito aqui uma chamada à API e lógica adicional se necessário

      this.$router.push('/dashboard')
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
}

.login-card {
  background: var(--bg-soft);
  border: 1px solid var(--divider);
  border-radius: 12px;
  padding: 3rem;
}

h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  text-align: center;
  color: var(--text-dark-secondary);
  margin-bottom: 2rem;
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
  color: var(--green);
  font-weight: 600;
}

input::placeholder {
  font-weight: 500;
}

.form-group input {
  font-family: inherit;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-dark);
  background-color: transparent;
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--divider);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--green);
}

.login-button {
  display: inline-block;
  background-color: var(--black-mute);
  border: 1px solid var(--divider);
  color: var(--text-dark);
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.login-button:hover {
  background-color: var(--black-muted);
  color: var(--green);
}

.demo-note {
  text-align: center;
  color: var(--text-dark-secondary);
  font-size: 0.75rem;
  margin-top: 1.5rem;
  font-style: italic;
  font-weight: 400;
}
</style>
