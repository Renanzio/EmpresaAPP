<template>
  <div class="stats-row">
    <div class="stat-card" v-for="r in rolesList" :key="r.key" :class="r.statColor">
      <div class="stat-value">{{ countByRole(r.key) }}</div>
      <div class="stat-label">{{ r.label }}</div>
    </div>
    <div class="stat-card total">
      <div class="stat-value">{{ totalEmployees }}</div>
      <div class="stat-label">Total</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

const employees = computed(() => employeeStore.employees)
const totalEmployees = computed(() => employeeStore.totalEmployees)

const rolesList = [
  { key: 'Gerente', label: 'Gerentes', statColor: 'green' },
  { key: 'Analista', label: 'Analistas', statColor: 'blue' },
  { key: 'Assistente', label: 'Assistentes', statColor: 'orange' }
]

function countByRole(role) {
  return employees.value.filter(employee => employee.role === role).length
}
</script>
