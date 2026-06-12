<template>
  <div v-if="show" class="overlay" @click.self="emit('close')">
    <div class="modal">
      <div class="modal-title">{{ isEditing ? '✏️ Editar funcionário' : '➕ Novo funcionário' }}</div>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <div class="field">
        <label>Nome completo *</label>
        <input v-model="form.name" placeholder="João da Silva" />
      </div>
      <div class="field">
        <label>E-mail *</label>
        <input type="email" v-model="form.email" placeholder="joao@empresa.com" />
      </div>
      <div class="field">
        <label>Função / Cargo *</label>
        <select v-model="form.role">
          <option value="">Selecione...</option>
          <option v-for="r in rolesList" :key="r.key" :value="r.key">{{ r.icon }} {{ r.label }}</option>
        </select>
      </div>
      <div class="field">
        <label>Departamento</label>
        <input v-model="form.department" placeholder="Engenharia, Marketing..." />
      </div>
      <div class="field">
        <label>Telefone</label>
        <input v-model="form.phone" placeholder="(11) 99999-9999" />
      </div>
      <div class="field">
        <label>Data de admissão</label>
        <input type="date" v-model="form.admissionDate" />
      </div>
      <div class="field">
        <label>Observações</label>
        <textarea v-model="form.notes" rows="2" placeholder="Informações adicionais..."></textarea>
      </div>

      <div class="modal-actions">
        <button class="btn btn-ghost" @click="emit('close')">Cancelar</button>
        <button class="btn btn-success" @click="saveEmployee" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>{{ isEditing ? 'Salvar alterações' : 'Cadastrar' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useEmployeeStore } from '@/stores/employeeStore'
import { useToastStore } from '@/stores/toastStore'

const props = defineProps({
  show: Boolean,
  employee: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const employeeStore = useEmployeeStore()
const toastStore = useToastStore()

const isEditing = computed(() => !!props.employee)
const loading = ref(false)
const error = ref('')

const rolesList = [
  { key: 'Gerente', label: 'Gerentes', icon: '👔' },
  { key: 'Analista', label: 'Analistas', icon: '📊' },
  { key: 'Assistente', label: 'Assistentes', icon: '📝' }
]

const form = ref({
  name: '',
  email: '',
  role: '',
  department: '',
  phone: '',
  admissionDate: '',
  notes: ''
})

function resetForm() {
  form.value = {
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    admissionDate: '',
    notes: ''
  }
  error.value = ''
}

watch(() => props.show, (val) => {
  if (val) {
    if (props.employee) {
      form.value = {
        name: props.employee.name || '',
        email: props.employee.email || '',
        role: props.employee.role || '',
        department: props.employee.department || '',
        phone: props.employee.phone || '',
        admissionDate: props.employee.admissionDate || '',
        notes: props.employee.notes || ''
      }
    } else {
      resetForm()
    }
  }
})

async function saveEmployee() {
  error.value = ''

  if (!form.value.name || !form.value.email || !form.value.role) {
    error.value = 'Preencha os campos obrigatórios.'
    return
  }

  loading.value = true
  try {
    if (isEditing.value) {
      await employeeStore.editEmployee(props.employee.id, { ...form.value })
      toastStore.addToast('Funcionário atualizado com sucesso!', 'ok')
    } else {
      await employeeStore.addEmployee({ ...form.value })
      toastStore.addToast('Funcionário cadastrado com sucesso!', 'ok')
    }
    emit('close')
  } catch {
    error.value = 'Erro ao salvar. Verifique os dados e tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>
