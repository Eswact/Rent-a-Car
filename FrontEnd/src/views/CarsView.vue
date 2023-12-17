<script setup>
import { onMounted, ref, watch } from 'vue';
import { fetchData } from '../scripts/ajax.js';
import { useRouter } from 'vue-router';
import { getCarImage, getBrandLogo } from '../scripts/common.js';

const router = useRouter();
const cars = ref([]);
const originalCars = ref([]);
const searchTerm = ref('');
const selectedBrand = ref(0);

const getDetailsPage = (carId) => {
  router.push({ path: `/detail/${carId}` });
};

const fetchCars = async () => {
  fetchData('cars/published',
    function(data) {
      cars.value = data;
      originalCars.value = data;
    },
    function(error) {
      console.error('Bir hata oluştu:', error);
    }
  );
};

onMounted(() => {
  fetchCars();

  // car-search
  watch(searchTerm, () => {
    applyFilters();
  });

  // brand-select
  watch(selectedBrand, () => {
    applyFilters();
  });
});

function applyFilters() {
  cars.value = originalCars.value.filter(car => {
    const brandFilter = selectedBrand.value == 0 || car.brand == selectedBrand.value;
    const searchFilter = searchTerm.value === '' || car.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    return brandFilter && searchFilter;
  });
}
</script>

<template>
  <!-- filters -->
  <div class="w-full px-[20px] flex items-center flex-wrap gap-x-[40px] gap-y-[10px]">
    <input v-model="searchTerm" id="carNameFilter" type="search" placeholder="Aradığınız Araba" class="w-[160px] text-center text-[17px] text-[#333] dark:text-[#eee] bg-transparent placeholder-[#333] dark:placeholder-[#eee] focus:text-left focus:placeholder-transparent dark:focus:placeholder-transparent dark:border-[#ddd] focus:outline-none focus:border-b-[1px] border-[#555]" />
    <select v-model="selectedBrand" name="brands" id="brandFilter" class="w-[160px] text-[17px] text-[#333] dark:text-[#eee] bg-transparent">
      <option value=0>Marka Seçimi</option>
      <option value=1>Skoda</option>
      <option value=2>Volkswagen</option>
    </select>
  </div>
  <hr class="mt-[10px] mb-[20px]">
  <!-- cars -->
  <div class="flex flex-wrap gap-[20px] items-center md:justify-center">
    <div v-for="car in cars" :key="car.id" class="car-card rounded-[12px] border-[1px] border-second w-[340px] p-[20px] flex flex-col gap-[8px] bg-white shadow-md shadow-second-shadow relative ">
      <img v-if="getBrandLogo(car.brand)" class="absolute top-[12px] left-[12px] w-[46px]" :src="getBrandLogo(car.brand).logo" :alt="getBrandLogo(car.brand).name" :title="getBrandLogo(car.brand).name">
      <img :src="getCarImage(car.image)" :alt="car.title">
      <div class="flex justify-between px-[10px] pt-[8px] border-t-[1px] border-t-main">
        <span class="text-[20px] text-main">{{ car.title }}</span>
        <button @click="getDetailsPage(car.carId)" class="border-1 border-second bg-second text-white p-[6px] rounded-[10px] shadow shadow-second-shadow">Hemen Kirala</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>