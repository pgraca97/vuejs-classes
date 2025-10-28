<script>
import StudentCard from './components/StudentCard.vue'

export default {
  name: 'App',
  components: {
    StudentCard,
  },
  data() {
    return {
      students: [
        {
          id: self.crypto.randomUUID(),
          name: 'Ana Silva',
          studentNumber: 1234,
          course: 'TSIW',
          year: 2,
        },
        {
          id: self.crypto.randomUUID(),
          name: 'João Santos',
          studentNumber: 12346,
          course: 'Informática',
          year: 1,
        },
        {
          id: self.crypto.randomUUID(),
          name: 'Maria Costa',
          studentNumber: 12347,
          course: 'TSIW',
          year: 5,
        }, // Valor inválido - vai acionar o validator
        {
          id: crypto.randomUUID(),
          name: 'John Doe',
          studentNumber: 12348,
        }, // course e year omitidos - os valores default vão ser definidos no componente
      ],
    }
  },
}
</script>

<template>
  <h1>Lista de Estudantes</h1>

  <div class="students-grid">
    <!-- Passagem de cada prop individualmente -->
    <StudentCard
      v-for="student in students"
      :key="student.id"
      :name="student.name"
      :student-number="student.studentNumber"
      :course="student.course"
      :year="student.year"
    />
  </div>
</template>

<style scoped>
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
}
</style>
