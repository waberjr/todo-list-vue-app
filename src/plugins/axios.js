import axios from "axios";
import Cookie from '@/service/cookie.js';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(function(config) {
    const token = Cookie.getToken();
    
    if(token){
        config.headers['Authorization'] = token;
    }

    return config;
});

export default axios;