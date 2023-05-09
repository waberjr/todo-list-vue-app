
<template>
    <div class="space-y-2">
        <TodoItem v-for="todo in todosArr" :key="todo.id" :todo="todo" @removeTodoFromArray="removeTodoFromArray">
        </TodoItem>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
    components: {
        TodoItem
    },

    props: {
        todos: {
            type: Array,
            default: () => []
        },
    },

    data() {
        return {
            todosArr: this.todos
        }
    },

    methods: {
        removeTodoFromArray(id) {
            const index = this.todosArr.findIndex(o => o.id === id);

            this.todosArr.splice(index, 1);
        }
    },
}
</script>