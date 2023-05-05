<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        MyTodo
      </a>

      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl flex flex-col items-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Esqueci minha senha
          </h1>

          <div v-if="response.message"
            :class="`rounded-sm text-center flex flex-col items-center dark:bg-${response.color}-300`">
            <h3 :class="`text-${response.color}-500`">{{ response.message }}</h3>
          </div>

          <FormVue @submit="forgotPassword" :validation-schema="forgotPasswordFormValidation">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu e-mail</label>
              <Field @keyup="resetResponse" type="email" id="email" name="email" v-model="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com">
              </Field>
              <ErrorMessage class="text-red-500" name="email"></ErrorMessage>
            </div>

            <button type="submit" :disabled="spinner.forgotPassword"
              class="w-full mt-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {{ spinner.forgotPassword ? 'Carregando...' : 'Recuperar senha' }}
            </button>
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

export default {
  components: {
    FormVue,
    Field,
    ErrorMessage
  },
  data() {
    return {
      email: '',
      forgotPasswordFormValidation: yup.object({
        email: yup.string().required().email(),
      }),
      response: {
        color: '',
        message: ''
      },
      spinner: {
        forgotPassword: false,
      }
    }
  },
  methods: {
    forgotPassword() {
      this.resetResponse();
      this.spinner.forgotPassword = true;

      this.$axios.post('/forgot-password', { email: this.email })
        .then(() => {
          this.response.color = 'green';
          this.response.message = 'Enviamos um e-mail com instruções de recuperação de senha.';
        })
        .catch((error) => {
          const errorCode = error?.response?.data?.error || 'ServerError';

          this.response.color = 'red';
          this.response.message = message[errorCode];
        })
        .finally(() => {
          this.spinner.forgotPassword = false;
        })
    },

    resetResponse() {
      this.response.color = '';
      this.response.message = '';
    }
  },
}
</script>