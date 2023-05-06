import Cookie from "@/service/cookie.js";
import store from '@/store'
import axios from 'axios';

export default {
    async redirectIfNotAuthenticated(to, from, next) {
        const token = Cookie.getToken();

        if(!token) {
            next({ name: 'login' });
            return;
        }

        await axios.get('/me')
            .then((response) => {
                if(!store?.state?.user?.id){
                    store.commit('user/STORE_USER', response.data.data);
                }
            })
            .catch(() => {
                Cookie.deleteToken();
                next({ name: 'login' });
                return;
            });

        next();
        return;
    },

    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken();

        if(token) {
            next({ name: 'home' });
            return;
        }

        next();
        return;
    }
}