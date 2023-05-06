<template>
  <section>
    <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl flex flex-col items-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Verificar Email
          </h1>

          <div v-if="spinner.verifyEmail"
            class="text-xl flex flex-col items-center text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            <Spinner></Spinner>
          </div>

          <div v-if="response.message" :class="`rounded-sm flex flex-col items-center`">
            <h3 :class="`text-${response.color}-500`">{{ response.message }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import message from '@/utils/messages';
import Spinner from '@/components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      token: '',
      response: {
        color: '',
        message: ''
      },
      spinner: {
        verifyEmail: true
      }
    }
  },

  beforeMount() {
    if (!this.$route?.query?.token) {
      this.$router.push({ name: 'login' });
    }
  },

  created() {
    this.token = this.$route?.query?.token || '';

    this.verifyEmail()
  },

  methods: {
    verifyEmail() {
      this.spinner.verifyEmail = true;

      this.$axios.post('/verify-email', { token: this.token })
        .then((response) => {
          this.response.color = 'green';
          this.response.message = 'E-mail Verificado com sucesso!';
        })
        .catch((error) => {
          const errorCode = error?.response?.data?.error || 'ServerError';

          this.response.color = 'red';
          this.response.message = message[errorCode]
        })
        .finally(() => {
          this.spinner.verifyEmail = false;
        })
    }
  },
}
</script>