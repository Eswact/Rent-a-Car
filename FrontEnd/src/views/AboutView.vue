<script setup>
  import { fetchData } from '../scripts/ajax.js'
  import { getCompanyImage } from '../scripts/common.js'
  import { ref, onMounted } from 'vue'

  const companyData = ref(null);

  onMounted(() => {
    fetchData('company/published',
      function(data) {
        data.map((item) => {
          companyData.value = item;
        });
      },
      function(error) {
        console.error('Bir hata oluştu:', error)
      }
    )
  });
</script>

<template>
  <!-- arayüzü düzenlenecek -->
  <div v-if="companyData" class="w-full flex lg:flex-col-reverse items-start gap-[20px]">
    <div class="w-full flex flex-col gap-[20px] items-start text-justify">
      <h1 class="text-[1.75rem] xl:text-[1.5rem] md:text-[1.25rem] font-medium text-main dark:text-white w-full pb-[4px] border-b-[1px] border-main-shadow dark:border-second-shadow">Rent<span class="text-second font-semibold">E</span>ren: Yolculuğunuz Bizimle Başlar...</h1>
      <span class="text-[1.25rem] md:text-[1.1rem] text-main leading-[40px] pt-[10px] pr-[30px] md:pt-[0px] md:pr-[4px] md:pl-[4px] dark:text-white">{{ companyData.about.description }}</span>
    </div>
    <img class="w-[50%] h-[85vh] lg:w-full lg:h-[auto] lg:max-h-[370px] object-cover rounded-[10px]" :src=getCompanyImage(companyData.about.img) :alt=companyData.name>
  </div>
  <div v-else class="w-full flex items-start gap-[20px]">
    <span>Yükleniyor...</span>
  </div>
</template>