<script setup>
import { ref, onMounted, nextTick } from 'vue';
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
      async (data) => {
        carDetail.value = data;
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
  <div v-if="carDetail" class="car-details w-full p-[12px] flex items-center justify-center">
      <div class="flex flex-col gap-[10px] w-[50%]">
        <div class="w-full">
          <img v-for="image in carDetail.images" :key="image" class="car-image" :src="getImageUrl(image)">
        </div>
        <div class="w-full flex gap-[4%]">
          <img v-for="image in carDetail.images" :key="image" class="image-option" :src="getImageUrl(image)">
        </div>
      </div>
      <div>
        <h1>{{ carDetail.title }}</h1>
        <p>{{ carDetail.description }}</p>
        <p>{{ carDetail.price }}</p>
      </div>
  </div>
  <div v-else>
    <p>Loading...</p>
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
    opacity: 65%;
    border-radius: 6px;
  }
</style>