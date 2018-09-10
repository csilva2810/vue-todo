<template>
  <div class="todo-filters">
    <input
      class="form-control filter"
      placeholder="Search..."
      :value="filter"
      @keyup="handleFilterChange($event.target.value)"
    />
    <div class="buttons">
      <a
        href="#"
        v-for="filter in filters"
        :key="filter"
        :class="['filter-button', { 'is-active': isActive(filter) }]"
        @click.prevent="toggleFilter(filter)"
      >{{ filter }}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TodoFilters',

  data() {
    return {
      filters: ['all', 'active', 'done'],
      filter: '',
    };
  },

  computed: {
    ...mapState(['visibilityFilter']),
  },

  methods: {
    toggleFilter(filter) {
      this.$store.dispatch('setVisibilityFilter', filter);
    },

    isActive(filter) {
      return filter === this.visibilityFilter;
    },

    handleFilterChange(value) {
      this.filter = value;
      this.$store.dispatch('setFilter', this.filter);
    },
  },
};
</script>

<style>
.todo-filters {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.filter {
  border-width: 1px;
  padding: 8px 10px;
}

.buttons {
  flex-grow: 2;
  display: block;
  text-align: right;
}

.filter-button {
  display: inline-block;
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  transition: .3s;
}

.filter-button:hover,
.filter-button:focus {
  box-shadow: 0 1px 5px 0 rgba(0,0,0,0.1);
}

.filter-button.is-active {
  border-color: #0ea0d5;
  color: #0ea0d5;
}
</style>
