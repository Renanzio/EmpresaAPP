<template>
  <div class="setup-container">
    <h1>Configurar Firebase</h1>

    <form @submit.prevent="saveConfig">
      <input v-model="form.apiKey" placeholder="API Key" />
      <input v-model="form.authDomain" placeholder="Auth Domain" />
      <input v-model="form.projectId" placeholder="Project ID" />
      <input v-model="form.storageBucket" placeholder="Storage Bucket" />
      <input v-model="form.messagingSenderId" placeholder="Sender ID" />
      <input v-model="form.appId" placeholder="App ID" />

      <button type="submit">
        Salvar Configuração
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
})

function saveConfig() {
  localStorage.setItem(
    'firebaseConfig',
    JSON.stringify(form)
  )

  router.push('/login')
}
</script>