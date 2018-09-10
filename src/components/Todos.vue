<template>
  <div>
    <h1 class="title">Todos</h1>
    <ul class="todos">
      <todo-item
        v-for="todo in visibleTodos"
        :key="todo.id"
        :title="todo.title"
        :done="todo.done"
        :id="todo.id"
      />
    </ul>
    <todo-filters />
    <todo-form />
  </div>
</template>

<script>
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';

export default {
  name: 'Todos',

  components: {
    TodoItem,
    TodoForm,
    TodoFilters,
  },

  computed: {
    visibleTodos() {
      const todos = this.$store.getters.visibleTodos;

      return todos;
    },
  },
};
</script>

<style scoped>
.todos {
  margin: 0;
  padding: 0;
  list-style: none;
}

.title {
  text-align: center;
}

.filter {
  margin-left: auto;
  margin-right: 0;
}
</style>
