<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { fetchData } from '../scripts/ajax.js';
import { getCarImage, getBrandLogo, convert2Price } from '../scripts/common.js';


const router = useRouter();
const carId = ref(null);
const carDetail = ref(null);
const brand = ref(null);

onMounted(() => {
  if (router.currentRoute.value.params.carId) {
    carId.value = router.currentRoute.value.params.carId;
    fetchData(
      `cars/detail/${carId.value}`,
      async (data) => {
        carDetail.value = data;
        let brandId = data.brand;
        fetchData(`brands/${brandId}`, 
          async (data) => {
            brand.value = data.logo
          },
          (error) => {
            console.error('Bir hata oluştu:', error);
          }
        );
        await nextTick(); // Wait for the next DOM update cycle
        document.querySelectorAll('.image-option').forEach((element) => {
          element.addEventListener('click', (event) => {
            document.querySelectorAll('.image-option').forEach((element) => {
              element.classList.remove('selected');
            });
            event.target.classList.add('selected');
            document.querySelectorAll('.car-image').forEach((element) => {
              element.classList.remove('visible');
            });
            document.querySelector(`.car-image[src="${event.target.src}"]`).classList.add('visible');
          });
        });
        document.querySelector('.image-option').click(); // Trigger first option
      },
      (error) => {
        console.error('Bir hata oluştu:', error);
      }
    );
  }
});
</script>

<template>
  <div v-if="carDetail"  class="w-full p-[12px] flex flex-col gap-[40px]">
    <!-- car detail -->
    <div class="car-details w-full flex justify-center lg:flex-col lg:gap-[18px]">
        <!-- images -->
        <div class="flex flex-col gap-[10px] w-[50%] box-border px-[4%] lg:w-full xl:w-[60%]">
          <div class="w-full">
            <img v-for="image in carDetail.images" :key="image" class="car-image w-full" :src="getCarImage(image)">
          </div>
          <div class="w-full flex gap-[4%]">
            <img v-for="image in carDetail.images" :key="image" class="image-option" :src="getCarImage(image)">
          </div>
        </div>
        <!-- details -->
        <div class="w-[50%] pl-[10px] flex flex-col justify-around gap-[24px] lg:w-full lg:gap-[20px] xl:w-[40%]">
          <!-- title -->
          <div class="flex items-center gap-[20px] py-[10px]">
            <img class="w-[80px]" :src="getBrandLogo(brand)">
            <h1 class="text-[40px] text-main dark:text-white">{{ carDetail.title }}</h1>
          </div>
          <!-- description -->
          <p class="max-w-[80%] 2xl:max-w-[100%]">{{ carDetail.description }}</p>
          <!-- other details -->
          <div class="flex items-center gap-[10%]">
            <div class="flex flex-col gap-[15px] items-start">
              <div class="flex items-center gap-[10px] text-main dark:text-white">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-users" size="2xl" />
                <span class="font-semibold">5 Yetişkin</span>
              </div>
              <div class="flex items-center gap-[10px] text-main dark:text-white">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-suitcase-rolling" size="2xl" />
                <span class="font-semibold">1 Büyük bavul</span>
              </div>
              <div class="flex items-center gap-[10px] text-main dark:text-white">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-gas-pump" size="2xl" />
                <span class="font-semibold">Dizel / Benzin</span>
              </div>
            </div>
            <div class="flex flex-col gap-[15px] items-start">
              <div class="flex items-center gap-[10px] text-second">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-gauge-simple-high" size="2xl" />
                <span class="font-semibold">4000 km</span>
              </div>
              <div class="flex items-center gap-[10px] text-second">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-calendar-days" size="2xl" />
                <span class="font-semibold">21 Yaş ve üzeri</span>
              </div>
              <div class="flex items-center gap-[10px] text-second">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-credit-card" size="2xl" />
                <span class="font-semibold">1 Kredi kartı</span>
              </div>
            </div>
          </div>
          <!-- price -->
          <div class="flex items-center gap-[16px]">
            <button class="w-[164px] p-[8px] rounded-[10px] border-[1px] border-[#00823cbf] text-[18px] text-[#00823cbf] dark:bg-[#00823cbf] dark:text-white shadow-md shadow-[#00823c57] font-medium hover:bg-[#00823cbf] hover:text-white dark:hover:bg-[white] dark:hover:text-[#00823cbf] transition-all">Hemen Kirala</button>
            <span class="text-main font-semibold dark:text-white"><span class="text-[24px]">{{ convert2Price(carDetail.dailyPrice) }}</span> / Günlük</span>
          </div>
        </div>
    </div>
    <!-- other cars -->
    <div class="w-full flex flex-col gap-[20px]">
      <hr>
      <h3 class="absolute text-[20px] mt-[-17px] ml-[25px] bg-[white] dark:bg-dark">Benzer Araçlar</h3>
      <div></div>
    </div>
  </div>
  <!-- loading -->
  <div v-else>
    <p>Yükleniyor...</p>
  </div>
</template>

<style scoped>
  .car-image {
    display: none;
    border: 1px solid #ddd;
    border-radius: 12px;
  }
  .car-image.visible {
    display: block;
  }
  .image-option {
    cursor: pointer;
    width: 22%;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  .image-option.selected {
    border: 2px solid #ddd;
    opacity: 75%;
    filter: grayscale(50%);
    border-radius: 6px;
  }
</style>