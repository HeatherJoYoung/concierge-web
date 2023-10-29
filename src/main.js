import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import NavBar from '@/components/shared/NavBar.vue';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('NavBar', NavBar);

app.mount('#app')
