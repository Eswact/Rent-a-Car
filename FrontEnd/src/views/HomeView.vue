<script setup>
  import { onMounted } from 'vue'
  import axios from 'axios';

  onMounted(() => {
    axios.get('http://localhost:3000/api/cars/published')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  });
</script>

<template>
  <main>
    <h1>Home Page</h1>
  </main>
</template>
