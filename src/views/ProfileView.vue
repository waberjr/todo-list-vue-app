<template>
    <section>
        <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="text-xl flex flex-col items-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Meu perfil
                    </h1>

                    <div v-if="response.message" :class="`rounded-sm flex flex-col items-center`">
                        <h3 :class="`text-${response.color}-500`">{{ response.message }}</h3>
                    </div>

                    <FormVue @submit="updateProfile" :validation-schema="profileFormValidation">
                        <div>
                            <label for="first_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <Field @keyup="resetResponse" type="text" id="first_name" name="first_name" v-model="first_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </Field>
                            <ErrorMessage class="text-red-500" name="first_name"></ErrorMessage>
                        </div>

                        <div>
                            <label for="last_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Sobrenome</label>
                            <Field @keyup="resetResponse" type="text" id="last_name" name="last_name" v-model="last_name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </Field>
                            <ErrorMessage class="text-red-500" name="last_name"></ErrorMessage>
                        </div>

                        <div>
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">E-mail</label>
                            <Field @keyup="resetResponse" type="email" id="email" name="email" v-model="email"
                                disabled="true"
                                class="bg-gray-50 disabled:text-slate-500 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </Field>
                            <ErrorMessage class="text-red-500" name="email"></ErrorMessage>
                        </div>


                        <div>
                            <Field name="changePassword" id="changePassword" type="checkbox" v-model="changePassword"
                                @click="resetPassword" value="true" class="mt-5" />
                            <label for="changePassword" class="text-white"> Alterar senha </label>

                            <div v-if="changePassword">
                                <label for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-3">Senha</label>
                                <Field @keyup="resetResponse" type="password" id="password" name="password"
                                    v-model="password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </Field>
                                <ErrorMessage class="text-red-500" name="password"></ErrorMessage>
                            </div>
                        </div>

                        <button type="submit" :disabled="spinner.profile"
                            class="w-full mt-3 mb-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {{ spinner.profile ? 'Carregando...' : 'Salvar' }}
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
import { mapState, mapMutations } from 'vuex';
import message from '@/utils/messages';

export default {
    components: {
        FormVue,
        Field,
        ErrorMessage
    },

    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            changePassword: false,
            profileFormValidation: yup.object({
                first_name: yup.string().required(),
                last_name: yup.string().required(),
                changePassword: yup.boolean(),
                password: yup.string().when("changePassword", (changePassword, schema) => {
                    if (changePassword)
                        return schema.min(8).max(30)
                    return schema
                })
            }),
            response: {
                color: '',
                message: ''
            },
            spinner: {
                profile: false,
            }
        }
    },

    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },

    created() {
        this.first_name = this.user.first_name;
        this.last_name = this.user.last_name;
        this.email = this.user.email;
    },

    methods: {
        ...mapMutations('user', ['STORE_USER']),

        updateProfile() {
            const payload = {
                first_name: this.first_name,
                last_name: this.last_name,
                // email: this.email,
            };

            if (this.password) {
                payload.password = this.password;
            }

            this.resetResponse();
            this.spinner.profile = true;

            this.$axios.put('/me', payload)
                .then((response) => {
                    this.response.color = 'green';
                    this.response.message = 'Informações atualizadas com sucesso!'

                    this.STORE_USER(response.data.data);
                })
                .catch((error) => {
                    const errorCode = error?.response?.data?.error || 'ServerError';

                    this.response.color = 'red';
                    this.response.message = message[errorCode]
                })
                .finally(() => {
                    this.spinner.profile = false;
                })
        },

        resetResponse() {
            this.response.color = '';
            this.response.message = '';
        },

        resetPassword() {
            this.password = '';
        }
    },
}
</script>