import Cookie from "@/service/cookie.js";

export default {
    redirectIfNotAuthenticated(to, from, next) {
        const token = Cookie.getToken();

        if(!token) {
            next({ name: 'login' });
        }

        next();
    },

    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken();

        if(token) {
            next({ name: 'home' });
        }

        next();
    }
}