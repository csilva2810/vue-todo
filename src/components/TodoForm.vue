<template>
  <form class="todo-form" @submit.prevent="handleSubmit">
    <h2 class="title">Add Todo</h2>
    <div>
      <input
        type="text"
        class="form-control"
        placeholder="Ex: Learn something"
        v-model="title"
        ref="input"
      />
      <button>{{ mode === 'edit' ? 'Update' : 'Add' }} Todo</button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TodoForm',

  data() {
    return {
      title: '',
    };
  },

  watch: {
    todo(newValue, oldValue) {
      if (newValue !== null && newValue !== oldValue) {
        this.title = newValue.title;
        this.$refs.input.focus();
      }
    },
  },

  computed: {
    ...mapState({
      todo: 'selectedTodo',
    }),

    mode() {
      return this.todo !== null ? 'edit' : 'add';
    },
  },

  methods: {
    handleSubmit() {
      if (!this.title.trim()) {
        return false;
      }

      if (this.mode === 'edit') {
        return this.updateTodo();
      }

      return this.addTodo();
    },

    addTodo() {
      this.$store.dispatch('addTodo', {
        id: new Date().getTime(),
        done: false,
        title: this.title,
      });

      this.resetState();
    },

    updateTodo() {
      this.$store.dispatch('updateTodo', {
        id: this.todo.id,
        done: this.todo.done,
        title: this.title,
      });

      this.resetState();
    },

    resetState() {
      this.title = '';
      this.$store.dispatch('resetSelectedTodo');
    },
  },
};
</script>

<style scoped>
  .todo-form {
    margin-top: 15px;
    padding: 10px;
    font-size: 16px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }
  .title {
    margin-top: 0;
    margin-bottom: 5px;
  }
  .todo-form > div {
    display: flex;
  }
  .todo-form .form-control {
    flex-grow: 2;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 0;
  }
  .todo-form .form-control:focus {
    border-color: #0ea0d5;
  }
  .todo-form button {
    padding: 10px 5px;
    border-radius: 0;
    border: 2px solid #0ea0d5;
    border-radius: 4px;
    background-color: #0ea0d5;
    color: white;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    outline: none;
    transition: .3s;
  }
  .todo-form button:hover,
  .todo-form button:focus {
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.2);
  }
</style>
