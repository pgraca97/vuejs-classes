<template>
  <div id="intro">
    <h2>User Profile</h2>
    <dl class="user-info">
      <dt>First name:</dt>
      <dd>{{ firstName }}</dd>

      <dt>Last name:</dt>
      <dd>{{ lastName }}</dd>

      <dt>Age:</dt>
      <dd>{{ age }}</dd>

      <!-- Renderizações múltiplas apenas como exemplo -->

      <dt>Full name (computed):</dt>
      <dd>{{ fullName }} | {{ fullName }} | {{ fullName }}</dd>

      <dt>Full name (method):</dt>
      <dd>{{ getFullName() }} | {{ getFullName() }} | {{ getFullName() }}</dd>
    </dl>

    <!-- Botão para demonstrar cache vs execução -->
    <div>
      <button @click="age++">Increase Age</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      age: 25,
    }
  },
  // Computed: com cache (só recalcula se firstName/lastName mudarem)
  computed: {
    fullName() {
      console.log('🟢 COMPUTED executado!')
      return `${this.firstName} ${this.lastName}`
    },
  },
  // Methods: sem cache (executam sempre que chamados)
  methods: {
    getFullName() {
      console.log('🔴 METHOD executado!')
      return `${this.firstName} ${this.lastName}`
    },
  },
}
</script>

<style scoped>
.user-info {
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.5rem 1rem;
  margin: 1rem 0;
  width: fit-content;
}

.user-info dt {
  font-weight: bold;
  color: #2c3e50;
  justify-self: end;
}

.user-info dd {
  margin: 0;
  font-size: 1.1em;
}

#intro h2 {
  color: #42b883;
  margin-bottom: 1rem;
}
</style>
