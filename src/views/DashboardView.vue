<template>

  <div class="app-layout">

    <Sidebar />

    <main class="content">

      <TopBar @newEmployee="openNewEmployee" />

      <StatsCards />

      <EmployeeTable
        @edit="openEdit"
        @delete="openDelete"
      />

    </main>

    <EmployeeModal
      :show="showEmployeeModal"
      :employee="selectedEmployee"
      @close="closeEmployeeModal"
    />

    <DeleteModal
      :show="showDeleteModal"
      :employee="selectedEmployee"
      @confirm="confirmDelete"
      @close="closeDeleteModal"
    />

    <ToastContainer />

  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

import Sidebar from '@/components/Sidebar.vue'
import TopBar from '@/components/TopBar.vue'
import StatsCards from '@/components/StatsCards.vue'
import EmployeeTable from '@/components/EmployeeTable.vue'
import EmployeeModal from '@/components/EmployeeModal.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import ToastContainer from '@/components/ToastContainer.vue'

import { useEmployeeStore } from '@/stores/employeeStore'

const employeeStore = useEmployeeStore()

const showEmployeeModal = ref(false)
const showDeleteModal = ref(false)

const selectedEmployee = ref(null)

onMounted(() => {
  employeeStore.loadEmployees()
})

function openNewEmployee() {
  selectedEmployee.value = null
  showEmployeeModal.value = true
}

function openEdit(employee) {
  selectedEmployee.value = employee
  showEmployeeModal.value = true
}

function closeEmployeeModal() {
  showEmployeeModal.value = false
}

function openDelete(employee) {
  selectedEmployee.value = employee
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
}

async function confirmDelete() {
  await employeeStore.removeEmployee(
    selectedEmployee.value.id
  )

  closeDeleteModal()
}
</script>
