
<template>
    <div class="space-y-2">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"></TodoItem>
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
    }
}
</script>