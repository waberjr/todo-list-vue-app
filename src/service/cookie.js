import Cookie from "js-cookie";

const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;

export default {
    setToken(token) {
        Cookie.set(TOKEN_NAME, token, { expires: 30 });
    },

    getToken() {
        return Cookie.get(TOKEN_NAME);
    },

    deleteToken() {
        Cookie.remove(TOKEN_NAME);
    }
}