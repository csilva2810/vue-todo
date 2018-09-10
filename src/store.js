import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [{
      id: 1,
      title: 'Learn Vue',
      done: false,
    }, {
      id: 2,
      title: 'Learn Vuex',
      done: false,
    }, {
      id: 3,
      title: 'Create awesome apps',
      done: false,
    }],
    selectedTodo: null,
    visibilityFilter: 'all',
    filter: '',
  },

  mutations: {
    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },

    updateTodo(state, payload) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === payload.id) {
          return Object.assign({}, todo, payload);
        }

        return todo;
      });
    },

    removeTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },

    selectTodo(state, id) {
      state.selectedTodo = this.getters.getTodoById(id);
    },

    resetSelectedTodo(state) {
      state.selectedTodo = null;
    },

    setVisibilityFilter(state, filter) {
      state.visibilityFilter = filter;
    },

    setFilter(state, query) {
      state.filter = query;
    },
  },

  actions: {
    addTodo({ commit }, todo) {
      commit('addTodo', todo);
    },

    updateTodo({ commit }, todo) {
      commit('updateTodo', todo);
    },

    removeTodo({ commit }, id) {
      commit('removeTodo', id);
    },

    selectTodo({ commit }, id) {
      commit('selectTodo', id);
    },

    resetSelectedTodo({ commit }) {
      commit('resetSelectedTodo');
    },

    setVisibilityFilter({ commit }, filter) {
      commit('setVisibilityFilter', filter);
    },

    setFilter({ commit }, query) {
      commit('setFilter', query);
    },
  },

  getters: {
    getTodoById: ({ todos }) => id => todos.find(todo => todo.id === id),
    visibleTodos: ({ todos, visibilityFilter, filter }) => {
      let visibleTodos = todos;

      if (visibilityFilter === 'active') {
        visibleTodos = todos.filter(todo => !todo.done);
      }

      if (visibilityFilter === 'done') {
        visibleTodos = todos.filter(todo => todo.done);
      }

      if (filter.trim()) {
        return visibleTodos.filter(todo =>
          todo.title.toLowerCase().includes(filter.toLowerCase()));
      }

      return visibleTodos;
    },
  },
});
