import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import './assets/main.css'
import './assets/css/tailwind.css'

const app = createApp(App).use(store)

app.use(router)

app.mount('#app')
