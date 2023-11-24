<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchData } from '../scripts/ajax.js';
import { getImageUrl } from '../scripts/common.js';


const router = useRouter();
const carId = ref(null);
const carDetail = ref(null);

onMounted(() => {
  if (router.currentRoute.value.params.carId) {
    carId.value = router.currentRoute.value.params.carId;
    fetchData(
      `detail/${carId.value}`,
      (data) => {
        carDetail.value = data;
        console.log(carDetail.value);
      },
      (error) => {
        console.error('Bir hata oluştu:', error);
      }
    );
  }
});
</script>

<template>
  <div class="car-details w-full p-[12px] flex items-center justify-center">
    <template v-if="carDetail">
      <div v-for="image in carDetail.images" :key="image">
        <img :src="getImageUrl(image)">
      </div>
      <div>
        <h1>{{ carDetail.title }}</h1>
        <p>{{ carDetail.description }}</p>
        <p>{{ carDetail.price }}</p>
      </div>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>
