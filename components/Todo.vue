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
      <p class="control">
        <button @click="getTodos" class="button is-rounded is-info">Get Todos</button>
      </p>
    </div>
    <div>
      <h2 class="subtitle">Todos</h2>
      <p v-if="todos.length>0">{{todos}}</p>
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
  methods: {
    addToDo: function() {
      if (!this.myTodo) {
        this.error = 'Please take this seriously'
        return
      }
      alert()
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
    getTodos: function() {
      let todos = []
      fireDb
        .collection('todos')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data().todo)
            // this.todos = this.todos.push('cat')
            todos = todos.push(doc.data().todo)
          })
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
