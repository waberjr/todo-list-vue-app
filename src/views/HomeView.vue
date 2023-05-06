
<template>
  <div class="px-3 py-10 md:px-10">
    <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
      <Spinner v-if="loading"></Spinner>
      <template v-else>
        <TodoFormAdd></TodoFormAdd>

        <TodoItems v-if="$store.state.todos.length"></TodoItems>
        <TodoEmpty v-else></TodoEmpty>
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
      loading: false
    }
  },
  created() {
    this.loading = true;

    // this.$store.dispatch('getTodos')
    //   .finally(() => {
    //     this.loading = false;
    //   })
  }
}
</script>