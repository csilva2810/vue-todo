<template>
  <li :class="{ 'is-done': done }">
    <input type="checkbox" :checked="done" :id="title" @change="update(id)">
    <label :for="title">{{ title }}</label>
    <div class="options">
      <a href="#" class="icon edit" @click.prevent="edit(id)">&#9998;</a>
      <a href="#" class="icon remove" @click.prevent="remove(id)">&times;</a>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',

  props: ['done', 'title', 'id'],

  methods: {
    update(id) {
      this.$store.dispatch('updateTodo', {
        id,
        title: this.title,
        done: !this.done,
      });
    },

    remove(id) {
      this.$store.dispatch('removeTodo', id);
    },

    edit(id) {
      this.$store.dispatch('selectTodo', id);
    },
  },
};
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
}

label {
  margin-left: 5px;
  transition: .3s;
}

.is-done label {
  color: #ccc;
  text-decoration: line-through;
}

.options {
  margin-left: auto;
}

.icon {
  display: inline-block;
  margin-right: 10px;
  font-family: sans-serif;
  font-size: 24px;
  text-decoration: none;
}

.icon.remove {
  color: red;
}

.icon.edit {
  color: green;
}
</style>
