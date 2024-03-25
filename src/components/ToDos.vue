<script setup>

import { useFirestore, useCollection } from 'vuefire'
const db = useFirestore()

// Under the VueFire probably does something like this
// Use onMounted lifecycle hook to subscribe to the Firestore collection
// onMounted(() => {
//   // onSnapshot listens for real-time updates to the todos collection
//   onSnapshot(todosCollection, (snapshot) => {
//      // Update the local todos array with changes from Firestore
//     todos.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   });
// });


const todos = useCollection(collection(db, 'todos'))


import { ref } from 'vue';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

// Refs for reactive properties for the input field
const newTodo = ref('');

// Reference to the Firestore collection
const todosCollection = collection(db, "todos");

// Function to add a new todo to the Firestore collection
const addTodo = async () => {
  if (newTodo.value.trim() !== '') {
    await addDoc(todosCollection, {
      text: newTodo.value,
      timestamp: Date.now()
    });
    newTodo.value = ''; // Reset the input field after adding a todo
  }
};

// Function to remove a todo from the Firestore collection
const removeTodo = async (todo) => {
  await deleteDoc(doc(db, "todos", todo.id));
};

</script>

<template>
  <div id="todo-app">
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <br>
        {{ new Date(todo.timestamp).toISOString() }}
        <button @click="removeTodo(todo)">x</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
