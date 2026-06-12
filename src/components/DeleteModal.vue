<template>
  <div v-if="show" class="overlay" @click.self="emit('close')">
    <div class="modal" style="max-width:380px">
      <div class="modal-title">🗑️ Excluir funcionário</div>
      <p style="color:var(--muted);font-size:.9rem;margin-bottom:8px">
        Tem certeza que deseja excluir <strong style="color:var(--text)">{{ employee?.name }}</strong>?
        Esta ação não pode ser desfeita.
      </p>
      <div class="modal-actions">
        <button class="btn btn-ghost" @click="emit('close')">Cancelar</button>
        <button class="btn" style="background:var(--danger);color:#fff" @click="deleteEmployee" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Excluir</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useToastStore } from '@/stores/toastStore'

const props = defineProps({
  show: Boolean,
  employee: { type: Object, default: null }
})

const emit = defineEmits(['close', 'confirm'])

const employeeStore = useEmployeeStore()
const toastStore = useToastStore()
const loading = ref(false)

async function deleteEmployee() {
  if (!props.employee) return
  loading.value = true
  try {
    await employeeStore.removeEmployee(props.employee.id)
    toastStore.addToast('Funcionário excluído com sucesso!', 'ok')
    emit('confirm')
  } catch {
    toastStore.addToast('Erro ao excluir funcionário.', 'err')
  } finally {
    loading.value = false
  }
}
</script>
