<template>
  <div class="student-card">
    <h2>{{ name }}</h2>
    <div class="student-info">
      <p><strong>Número:</strong> {{ studentNumber }}</p>
      <p><strong>Curso:</strong> {{ course }}</p>
      <p><strong>Ano:</strong> {{ year }}º</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentCard',
  // Propiedades recebidas do componente pai
  props: {
    name: {
      type: String,
      required: true, // Obrigatório - vai dar warning se não for fornecido
    },
    studentNumber: {
      type: Number,
      required: true,
      validator(value) {
        // Validator: função que valida o valor recebido
        // Valida que o número recebido é positivo
        if (value <= 0) {
          console.warn(`Invalid studentNumber: ${value}. Must be positive.`)
          return false
        }
        return true
      },
    },
    course: {
      type: String,
      // Default: valor utilizado quando o pai não passa a prop
      default: 'TSIW',
    },
    year: {
      type: Number,
      default: 2,
      validator(value) {
        // Valida que o ano está entre 1 e 3
        if (value < 1 || value > 3) {
          console.warn(`Invalid year: ${value}. Must be between 1 and 3.`)
          return false
        }
        return true
      },
    },
  },
}
</script>

<style scoped>
.student-card {
  border: 1px solid var(--green);
  border-radius: 8px;
  padding: 1rem;
  background-color: var(--bg-soft);
  text-align: left;
}

.student-card h2 {
  color: var(--text-dark);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2em;
}

.student-info {
  color: var(--text-dark-secondary);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.student-info p {
  margin: 0;
  font-size: 1em;
}

.student-info strong {
  color: var(--green);
}
</style>
