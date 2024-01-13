<script setup>
import { onMounted, ref, watch } from 'vue';
import { fetchData } from '../scripts/ajax.js';
import { useRouter } from 'vue-router';
import { getDetailsPage, getCarImage, getBrand, getCategory } from '../scripts/common.js';

const router = useRouter();
const cars = ref([]);
const brands = ref([]);
const categories = ref([]);
const originalCars = ref([]);
const searchTerm = ref('');
const selectedBrand = ref(0);
const selectedCategory = ref(0);

const fetchCars = async () => {
  await fetchData('cars/published',
    function(data) {
      cars.value = data;
      originalCars.value = data;
    },
    function(error) {
      console.error('Bir hata oluştu:', error);
    }
  );
  await fetchData('brands/published',
    function(data) {
      brands.value = data;
      console.log(data)
    },
    function(error) {
      console.error('Bir hata oluştu:', error);
    }
  );
  await fetchData('categories/published',
    function(data) {
      categories.value = data;
    },
    function(error) {
      console.error('Bir hata oluştu:', error);
    }
  );
};

onMounted(() => {
  // brandId parametresini kontrol et
  const brandIdFromQuery = router.currentRoute.value.query.brandId;
  if (brandIdFromQuery) {
    selectedBrand.value = parseInt(brandIdFromQuery);
    console.log(selectedBrand.value)  
    document.getElementById('brandFilter').value = brandIdFromQuery;
  }

  fetchCars().then(() => {
    // car-search
    watch(searchTerm, () => {
      applyFilters();
    });

    // brand-select
    watch(selectedBrand, () => {
      applyFilters();
    });

    watch(selectedCategory, () => {
      applyFilters();
    });

    applyFilters();
  });

  document.getElementById('clearFilter').addEventListener('click', () => {
    searchTerm.value = '';
    selectedBrand.value = 0;
    selectedCategory.value = 0;
    applyFilters();
  });
});

function applyFilters() {
  cars.value = originalCars.value.filter(car => {
    const brandFilter = selectedBrand.value == 0 || car.brand == selectedBrand.value;
    const categoryFilter = selectedCategory.value == 0 || car.category == selectedCategory.value;
    const searchFilter = searchTerm.value === '' || car.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    return brandFilter && searchFilter && categoryFilter;
  });
}
</script>

<template>
  <!-- filters -->
  <div class="w-full px-[20px] flex items-center justify-between flex-wrap gap-[20px] md:justify-center">
    <div class="flex items-center flex-wrap gap-x-[40px] gap-y-[20px] md:justify-center">
      <input v-model="searchTerm" id="carNameFilter" type="search" placeholder="Aradığınız Araba" class="w-[160px] text-center text-[17px] text-[#333] dark:text-[#eee] bg-transparent placeholder-[#333] dark:placeholder-[#eee] focus:text-left focus:placeholder-transparent dark:focus:placeholder-transparent dark:border-[#ddd] focus:outline-none focus:border-b-[1px] border-[#555]" />
      <select v-model="selectedBrand" name="brands" id="brandFilter" class="w-[160px] text-[17px] text-[#333] dark:text-[#eee] bg-transparent">
        <option value=0>Marka Seçimi</option>
        <option v-for="brand in brands" :key="brand.brandId" :value="brand.brandId">{{ brand.name }}</option>
      </select>
      <select v-model="selectedCategory" name="categories" id="categoryFilter" class="w-[160px] text-[17px] text-[#333] dark:text-[#eee] bg-transparent">
        <option value=0>Kategori Seçimi</option>
        <option v-for="category in categories" :key="category.catId" :value="category.catId">{{ category.name }}</option>
      </select>
    </div>
    <button id="clearFilter" class="text-[18px] font-[600] bg-[#ee5d5d1e] text-second border-second border-[1px] py-[3px] px-[8px] rounded-[10px]">Temizle</button>
  </div>
  <hr class="mt-[10px] mb-[20px]">
  <!-- cars -->
  <div class="flex flex-wrap gap-[20px] items-center xl:justify-center">
    <div v-for="car in cars" :key="car.id" class="car-card rounded-[12px] border-[1px] w-[calc(25%-16px)] border-main 2xl:min-w-[340px] 2xl:w-[32%] xl:w-[340px] p-[20px] flex flex-col gap-[8px] bg-white dark:bg-[rgba(255,255,255,0.85)] shadow-md shadow-main-shadow relative ">
      <img v-if="getBrand(car.brand)" class="absolute top-[12px] left-[12px] h-[46px]" :src="getBrand(car.brand).logo" :alt="getBrand(car.brand).name" :title="getBrand(car.brand).name">
      <img class="h-[160px] object-contain" :src="getCarImage(car.image)" :alt="car.title">
      <div class="flex justify-between items-center px-[10px] pt-[8px] border-t-[1px] border-t-main">
        <div class="flex flex-col">
          <span class="text-[20px] text-main">{{ car.title }}</span>
          <span class="text-[14px] text-second">{{ getCategory(car.category) }} Araçlar</span>
        </div>
        <button @click="getDetailsPage(router, car.carId)" class="gelatine text-[17px] border-1 border-second bg-second text-white p-[8px] rounded-[10px] shadow shadow-second-shadow">Detaylar <font-awesome-icon icon="fa-solid fa-circle-chevron-right" size="lg"/></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>