<template>
  <header class="topbar">
    <div class="topbar-left">
      <h2 class="page-title">{{ currentPageTitle }}</h2>
      <span class="employee-count">{{ filteredEmployees.length }} funcionário(s)</span>
    </div>
    <div class="topbar-right">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          v-model="employeeStore.searchTerm"
          class="search-input"
          placeholder="Buscar funcionário..."
        />
      </div>
      <button class="btn btn-primary" @click="emit('newEmployee')">
        + Novo funcionário
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

const emit = defineEmits(['newEmployee'])

const filteredEmployees = computed(() => employeeStore.filteredEmployees)

const currentPageTitle = computed(() => {
  if (employeeStore.selectedRole === 'Todos') {
    return 'Funcionários'
  }
  return employeeStore.selectedRole
})
</script>
