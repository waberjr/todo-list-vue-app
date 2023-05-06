<template>
  <section>
    <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        MyTodo
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl flex flex-col items-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Faça login em sua conta
          </h1>

          <div v-if="response.message" :class="`rounded-sm flex flex-col items-center`">
            <h3 :class="`text-${response.color}-500`">{{ response.message }}</h3>
          </div>

          <FormVue @submit="login" :validation-schema="loginFormValidation">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu e-mail</label>
              <Field @keyup="resetResponse" type="email" id="email" name="email" v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com">
              </Field>
              <ErrorMessage class="text-red-500" name="email"></ErrorMessage>
            </div>

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Sua
                Senha</label>
              <Field @keyup="resetResponse" type="password" id="password" name="password" placeholder="••••••••"
                v-model="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              </Field>
              <ErrorMessage class="text-red-500" name="password"></ErrorMessage>
            </div>

            <div class="flex mt-5 items-center justify-between">
              <RouterLink :to="{ name: 'forgotPassword' }"
                class="text-sm text-white font-medium text-primary-600 hover:underline dark:text-primary-500">
                Esqueceu a senha?
              </RouterLink>
            </div>

            <button type="submit" :disabled="spinner.login"
              class="w-full mt-3 mb-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {{ spinner.login ? 'Carregando...' : 'Entrar' }}
            </button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Não tem uma conta ainda? <RouterLink :to="{ name: 'register' }" class="font-medium text-primary-600
                hover:underline dark:text-primary-500">Cadastre-se</RouterLink>
            </p>
          </FormVue>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Form as FormVue, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import message from '@/utils/messages';
import Cookie from "@/service/cookie.js";

export default {
  components: {
    FormVue,
    Field,
    ErrorMessage
  },
  data() {
    return {
      email: '',
      password: '',
      loginFormValidation: yup.object({
        email: yup.string().required().email(),
        password: yup.string().required()
      }),
      response: {
        color: '',
        message: ''
      },
      spinner: {
        login: false,
      }
    }
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password
      };

      this.resetResponse();
      this.spinner.login = true;

      this.$axios.post('/login', payload)
        .then((response) => {
          const token = `${response.data.token_type} ${response.data.access_token}`;
          Cookie.setToken(token);

          this.$store.commit('user/STORE_USER', response.data.data);

          this.$router.push({ name: 'home' })
        })
        .catch((error) => {
          const errorCode = error?.response?.data?.error || 'ServerError';

          this.response.color = 'red';
          this.response.message = message[errorCode]
        })
        .finally(() => {
          this.spinner.login = false;
        })
    },

    resetResponse() {
      this.response.color = '';
      this.response.message = '';
    }
  },
}
</script>