import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { applyTheme } from './config/theme'
import './styles/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
applyTheme()
app.mount('#app')
