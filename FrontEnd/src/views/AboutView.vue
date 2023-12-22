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
  <div v-if="companyData" class="w-full flex items-start gap-[20px]">
    <div class="w-full flex flex-col gap-[20px] items-start text-justify">
      <h1>{{companyData.name}}</h1>
      <span>{{ companyData.about.description }}</span>
    </div>
    <img class="w-[50%]" :src=getCompanyImage(companyData.about.img) :alt=companyData.name>
  </div>
  <div v-else class="w-full flex items-start gap-[20px]">
    <div class="w-full flex flex-col gap-[20px] items-start text-justify">
      <h1>Company</h1>
      <span>Description</span>
    </div>
  </div>
</template>