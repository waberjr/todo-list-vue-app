import { createApp } from 'vue'
import router from '@/router'
import store from '@/store'
import App from '@/App.vue'
// import veeValidate from '@/plugins/vee-validate.js';
import axios from '@/plugins/axios.js';

import '@/assets/main.css'
import '@/assets/css/tailwind.css'

const app = createApp(App);
//vuex
app.use(store);

//router
app.use(router);

//axios
app.config.globalProperties.$axios = axios;

//vee-validate
// app.use(veeValidate);

app.mount('#app')
