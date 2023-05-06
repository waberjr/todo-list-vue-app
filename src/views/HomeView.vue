
<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <Spinner v-if="spinner.todos"></Spinner>
      <template v-else>
        <div v-if="!errorGettingTodos">
          <TodoFormAdd></TodoFormAdd>

          <TodoItems v-if="todos.length > 0" :todos="todos"></TodoItems>
          <TodoEmpty v-else-if="todos.length == 0"></TodoEmpty>
        </div>

        <div v-else class="text-center text-lg text-gray-500">
          Houve um erro ao carregar suas tarefas :(

          <button @click="getTodos"
            class="w-full mt-3 mb-3 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <span>Tentar novamente</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import TodoFormAdd from '@/components/todo/TodoFormAdd.vue';
import TodoItems from '@/components/todo/TodoItems.vue';
import TodoEmpty from '@/components/todo/TodoEmpty.vue';

export default {
  components: {
    Spinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty
  },
  data() {
    return {
      todos: [],
      errorGettingTodos: false,
      spinner: {
        todos: false,
      }
    }
  },
  created() {
    this.getTodos();
  },

  methods: {
    getTodos() {
      this.spinner.todos = true;

      this.$axios.get('/todos')
        .then((response) => {
          this.todos = response.data.data;
        })
        .catch(() => {
          this.errorGettingTodos = true;
        })
        .finally(() => {
          this.spinner.todos = false;
        })
    }
  },
}
</script>