<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchData } from '../scripts/ajax.js';

const router = useRouter();
const carId = ref(null);

onMounted(() => {
  // Vue Router'dan carId parametresini al
  console.log(router.currentRoute.value.params);
  if (router.currentRoute.value.params && router.currentRoute.value.params.carId) {
    carId.value = router.currentRoute.value.params.carId;
    console.log(carId.value);
    fetchData(
      `detail/${carId.value}`,
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Bir hata oluştu:', error);
      }
    );
  }
});
</script>

<template>
  <div>
    <h1>Detail page</h1>
  </div>
</template>
