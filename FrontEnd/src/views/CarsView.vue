<script setup>
import { onMounted, ref } from 'vue'
import { fetchData } from '../scripts/ajax.js'
import { useRouter } from 'vue-router';

const router = useRouter();
const cars = ref([]);

const getDetailsPage = (carId) => {
  router.push({ path: `/detail/${carId}` });
};

const getImageUrl = (filename) => {
  return `http://localhost:3000/uploads/${filename}`;
};

onMounted(async () => {
  fetchData(
    'published',
    (data) => {
      cars.value = data;
    },
    (error) => {
      console.error('Bir hata oluştu:', error);
    }
  );
});
</script>

<template>
  <div class="flex flex-wrap gap-[20px]">
    <div v-for="car in cars" :key="car.id" class="car-card rounded-[12px] border-[1px] border-second w-[320px] p-[12px] flex flex-col gap-[8px] bg-white shadow-md shadow-second-shadow">
      <img :src="getImageUrl(car.image)" :alt="car.title">
      <div class="flex justify-between px-[10px] pt-[8px] border-t-[1px] border-t-main">
        <span class="text-[20px] text-main">{{ car.title }}</span>
        <button @click="getDetailsPage(car.carId)" class="border-1 border-second bg-second text-white p-[6px] rounded-[10px] shadow shadow-second-shadow">Hemen Kirala</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>