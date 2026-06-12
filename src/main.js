import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/rhcentral.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize Firebase from localStorage config
const config = localStorage.getItem('firebaseConfig')
if (config) {
  const { initFirebase } = await import('./services/firebase')
  initFirebase(JSON.parse(config))
}

app.mount('#app')
