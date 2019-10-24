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
      <div v-if="todos.length>0">
        <div v-for="todo in todos" :key="todo.todo" class="block">
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
import { fireDb } from '~/plugins/firebase.js'

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
  mounted() {
    this.getTodos()
  },
  methods: {
    addToDo: function() {
      if (!this.myTodo) {
        this.error = 'Please take this seriously'
        return
      }
      fireDb
        .collection('todos')
        .add({
          todo: this.myTodo
        })
        .then(response => {
          if (response) {
            this.myTodo = ''
            this.error = 'Todo added successfully'
          }
        })
        .catch(error => (this.error = error))
    },
    async getTodos() {
      fireDb
        .collection('todos')
        .limit(6)
        .get()
        .then(querySnapshot => {
          const todos = querySnapshot.docs.map(doc => doc.data())
          // do something with documents
          this.todos = todos
        })
    },
    deleteTodo(todoId) {
      if (fireDb.collection('todos').doc(todoId)) {
        alert(todoId)
        return
      }
      fireDb
        .collection('todos')
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
.heading {
  text-align: left;
}

.subtitle {
  margin-top: 50px;
}
</style>
