<script setup>
  import { onMounted, ref } from 'vue'
  import axios from 'axios';

  const getImageUrl = ref((filename) => {
    return `http://localhost:3000/uploads/${filename}`;
  });

  onMounted(async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/cars/published');
      const cars = res.data.map((e) => `
        <div class="car-card rounded-[12px] border-[1px] border-second w-[320px] p-[12px] flex flex-col gap-[8px] bg-white shadow-md shadow-second-shadow">
          <img src="${getImageUrl.value(e.image)}" alt="${e.title}">
          <div class="flex justify-between px-[10px] pt-[8px] border-t-[1px] border-t-main">
            <span class="text-[20px] text-main">${e.title}</span>
            <button class="border-1 border-second bg-second text-white p-[6px] rounded-[10px] shadow shadow-second-shadow">Hemen Kirala</button>
          </div>
        </div>
      `).join('');
      document.getElementById('car-cards').innerHTML = cars;
    } catch (err) {
      console.error(err);
    }
  });
</script>

<template>
  <div></div>
  <div id="car-cards" class="flex flex-wrap gap-[20px]"></div>
</template>

<style scoped>
</style>