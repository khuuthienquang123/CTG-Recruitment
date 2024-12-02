import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { AtomSpinner } from 'epic-spinners'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.component('AtomSpinner', AtomSpinner)
app.use(createPinia())
app.use(router)

app.mount('#app')
