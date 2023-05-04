import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'
import '@/plugins/vee-validate.js';
import axios from '@/plugins/axios.js';

import '@/assets/main.css'
import '@/assets/css/tailwind.css'

const app = createApp(App).use(store)

app.use(router)

app.config.globalProperties.$axios = axios;

app.mount('#app')
