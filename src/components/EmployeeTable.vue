<template>
  <div class="table-wrap">
    <table v-if="filteredEmployees.length > 0">
      <thead>
        <tr>
          <th>Funcionário</th>
          <th>Função</th>
          <th>Departamento</th>
          <th>Telefone</th>
          <th>Admissão</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in filteredEmployees" :key="emp.id">
          <td>
            <div class="emp-name">{{ emp.name }}</div>
            <div class="emp-email">{{ emp.email }}</div>
          </td>
          <td>
            <span class="role-badge" :class="roleBadgeClass(emp.role)">
              {{ getRoleLabel(emp.role) }}
            </span>
          </td>
          <td>{{ emp.department || '—' }}</td>
          <td>{{ emp.phone || '—' }}</td>
          <td>{{ formatDate(emp.admissionDate) }}</td>
          <td>
            <div class="actions">
              <button class="btn btn-ghost btn-sm" @click="emit('edit', emp)" title="Editar">✏️ Editar</button>
              <button class="btn btn-danger-ghost btn-sm" @click="emit('delete', emp)" title="Excluir">🗑</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty-state">
      <div class="empty-icon">👤</div>
      <div class="empty-title">Nenhum funcionário encontrado</div>
      <div class="empty-text">
        {{ employeeStore.searchTerm ? 'Tente outro termo de busca.' : 'Clique em "+ Novo funcionário" para começar.' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()
const emit = defineEmits(['edit', 'delete'])

const filteredEmployees = computed(() => employeeStore.filteredEmployees)

const rolesList = {
  Gerente: { label: 'Gerente', icon: '👔' },
  Analista: { label: 'Analista', icon: '📊' },
  Assistente: { label: 'Assistente', icon: '📝' }
}

function getRoleLabel(role) {
  return rolesList[role]?.label || role || '—'
}

function roleBadgeClass(role) {
  if (!role) return ''
  const map = {
    Gerente: 'badge-green',
    Analista: 'badge-blue',
    Assistente: 'badge-orange'
  }
  return map[role] || ''
}

function formatDate(date) {
  if (!date) return '—'
  try {
    const d = new Date(date)
    return d.toLocaleDateString('pt-BR')
  } catch {
    return date
  }
}
</script>
