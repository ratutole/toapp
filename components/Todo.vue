<template>
  <div class="home">
    <div class="heading">{{this.error}}</div>
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input v-model="myTodo" class="input" />
      </p>
      <p class="control">
        <button @click="addToDo" class="button is-rounded is-info">Add New Todo</button>
      </p>
    </div>
    <div>
      <h2 class="subtitle">Todos</h2>
      <div>
        <div v-for="todo in todos" :key="todo.id" class="block">
          <span class="tag is-light is-medium">
            {{todo.todo}}
            <button class="delete is-small" @click="deleteTodo(todo.id)"></button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { todosCollection } from '~/plugins/firebase.js'

export default {
  name: 'Home',
  data: function() {
    return {
      myTodo: '',
      error: '',
      writeSuccessful: false,
      todos: []
    }
  },
  // mounted() {
  //   this.getTodos()
  // },
  firestore: {
    todos: todosCollection.limit(6)
  },

  methods: {
    addToDo: function() {
      if (!this.myTodo) {
        this.error = 'Please take this seriously'
        return
      }
      todosCollection
        .add({
          todo: this.myTodo
        })
        .then(response => {
          if (response) {
            this.error = `Todo added successfully, id${response.id}`
            this.myTodo = ''
          }
        })
        .catch(error => (this.error = error))
    },
    // getTodos: function() {
    //   todosCollection
    //     .limit(6)
    //     .get()
    //     .then(response => {})
    // },
    deleteTodo(todoId) {
      todosCollection
        .doc(todoId)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!')
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    }
  }
}
</script>


<style scoped>
.home {
  /* background: yellow; */
  min-width: 600px;
}
.heading {
  text-align: left;
}

.subtitle {
  margin-top: 30px;
}
</style>
