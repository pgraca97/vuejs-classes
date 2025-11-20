<template>
  <h2 class="filters-title">Filters</h2>
  <div class="btn-container">
    <div class="filter-buttons">
      <button
        v-for="filter in FILTERS"
        :key="filter"
        :class="[
          'filter-btn',
          {
            active: currentFilter === filter,
          },
        ]"
        @click="selectedFilter = filter"
        @mouseenter="hoverFilter = null"
      >
        <span>{{ filter }}</span> ({{ getCounterFilter(filter) }})
      </button>
    </div>
    <div class="action-buttons">
      <button class="action-btn clean-completed" @click="clearCompleted">Limpar Concluídas</button>
      <button class="action-btn clean-all" @click="clearAll">Limpar Tudo</button>
    </div>
  </div>
</template>

<script>
import { FILTERS } from '@/constants/todo'
import { useTodoStore } from '@/stores/todo'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
  name: 'TodoFilters',
  data() {
    return {
      FILTERS,
      selectedFilter: FILTERS[0],
      hoverFilter: null,
    }
  },
  computed: {
    ...mapState(useTodoStore, ['totalToDos', 'totalPToDos', 'totalCToDos']),
    currentFilter() {
      return this.hoverFilter ?? this.selectedFilter
    },
  },
  methods: {
    ...mapActions(useTodoStore, ['clearCompleted', 'clearAll']),

    getCounterFilter(filter) {
      switch (filter) {
        case FILTERS[0]:
          return this.totalToDos
        case FILTERS[1]:
          return this.totalPToDos
        case FILTERS[2]:
          return this.totalCToDos
        default:
          return 0
      }
    },
  },
  watch: {
    // Emitir evento quando filtro muda
    selectedFilter(newFilter) {
      this.$emit('filter-changed', newFilter)
    },
    immediate: false,
  },
}
</script>

<style scoped>
.filters-title {
  line-height: 0.8;
  font-weight: 600;
  display: inline-block;
}

.btn-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
}

.filter-buttons,
.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);
}

.filter-btn,
.action-btn {
  flex: 1;
  font-family: inherit;
  font-size: var(--font-size-md);
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:is(:hover, .active) {
  border-color: var(--color-success);
}

.filter-btn span {
  text-transform: capitalize;
}

.clean-completed {
  background-color: var(--color-warning);
  color: var(--text-primary);
  border-color: var(--color-warning);
  font-weight: 600;
}

.clean-all {
  background-color: var(--color-danger);
  color: var(--text-primary);
  border-color: var(--color-danger);
  font-weight: 600;
}

.action-btn:hover {
  filter: brightness(0.9);
}
</style>
