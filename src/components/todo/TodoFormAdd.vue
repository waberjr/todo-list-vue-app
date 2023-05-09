<template>
    <FormVue @submit="createTodo" :validation-schema="newTodoFormValidation" class="px-4 bg-gray-900 h-15 
                                                          rounded-sm border-l-2 border-blue-400 mb-3">

        <div class="flex items-center">
            <Field v-model="label" @keyup="resetResponse" name="label" :disabled="spinner.newTodo"
                placeholder="Adicione um novo item ..." type="text" class="bg-gray-900 placeholder-gray-500 text-gray-500 
            font-light focus:outline-none block w-full appearance-none leading-normal 
            py-3 pr-3"></Field>


            <button class="text-blue-400 text-xs font-semibold 
            focus:outline-none" type="submit" :disabled="spinner.newTodo">
                <Spinner v-if="spinner.newTodo"></Spinner>
                <span v-else>ADICIONAR</span>
            </button>
        </div>

        <!-- <ErrorMessage class="text-red-500" name="label"></ErrorMessage> -->
    </FormVue>
</template>

<script>
import { Form as FormVue, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Spinner from '@/components/Spinner.vue';

export default {
    components: {
        FormVue,
        Field,
        // ErrorMessage,
        Spinner
    },

    emits: ['addTodoToArray'],

    data() {
        return {
            label: '',
            newTodoFormValidation: yup.object({
                label: yup.string().required(),
            }),
            spinner: {
                newTodo: false,
            },
            response: {
                color: '',
                message: ''
            },
        }
    },
    methods: {
        createTodo(values, formActions) {
            this.resetResponse();
            this.spinner.newTodo = true;

            const playload = {
                label: this.label
            }

            this.$axios.post('/todos', playload)
                .then((response) => {
                    this.$emit("addTodoToArray", response.data.data);
                    formActions.resetForm();
                })
                .finally(() => {
                    this.spinner.newTodo = false;
                })
        },

        resetResponse() {
            this.response.color = '';
            this.response.message = '';
        }
    },
}
</script>