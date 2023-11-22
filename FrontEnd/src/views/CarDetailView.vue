<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const carId = ref(null);

onMounted(() => {
  // Vue Router'dan carId parametresini al
  console.log(router.currentRoute.value.params);
  if (router.currentRoute.value.params && router.currentRoute.value.params.carId) {
    carId.value = router.currentRoute.value.params.carId;
    console.log(carId.value);
    fetchData(carId.value);
  }
});

const fetchData = async (carId) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/cars/detail/${carId}`);
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
  <div>
    <h1>Detail page</h1>
  </div>
</template>
