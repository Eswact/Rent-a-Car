<script setup>
  import { fetchData } from '../scripts/ajax.js'
  import { ref, onMounted } from 'vue'

  const contactData = ref({})

  onMounted(() => {
    fetchData('company/published',
      function(data) {
        data.map((item) => {
          contactData.value = item.contact;
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
  <div class="flex flex-col gap-[20px] w-full">
    <div class="flex justify-center items-center h-[300px] w-full text-[32px] font-extrabold bg-cover bg-no-repeat text-white" style="background-image: linear-gradient(180deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.47) 30%),url(../src/assets/media/contact.png); background-position: center top 85%;">
      <span>İletişime Geçin</span>
    </div>
    <div class="w-full flex items-start gap-[20px]">
      <div class="flex flex-col gap-[20px] w-[50%]">
        <div class="flex flex-col gap-[10px] w-full">
          <label class="text-[20px] font-semibold text-main dark:text-white" for="name">Adınız Soyadınız</label>
          <input class="w-full p-[10px] border border-main dark:border-white rounded-md" type="text" id="name" name="name" placeholder="Adınız Soyadınız">
        </div>
        <div class="flex flex-col gap-[10px] w-full">
          <label class="text-[20px] font-semibold text-main dark:text-white" for="email">E-Posta Adresiniz</label>
          <input class="w-full p-[10px] border border-main dark:border-white rounded-md" type="email" id="email" name="email" placeholder="E-Posta Adresiniz">
        </div>
        <div class="flex flex-col gap-[10px] w-full">
          <label class="text-[20px] font-semibold text-main dark:text-white" for="message">Mesajınız</label>
          <textarea class="w-full p-[10px] border border-main dark:border-white rounded-md" id="message" name="message" placeholder="Mesajınız"></textarea>
        </div>
        <div class="flex justify-end">
          <button class="w-[200px] p-[10px] bg-main text-white rounded-md">Gönder</button>
        </div>
      </div>
      <div v-if="contactData" class="p-[40px] flex flex-col justify-center gap-[10px] text-[18px]">
        <span>Telefon: {{ contactData.tel }}</span>
        <span>Fax: {{ contactData.fax }}</span>
        <span>Mail: {{ contactData.mail }}</span>
        <span>Adres: {{ contactData.address }}</span>
      </div>
    </div>
    <!-- img map ? -->
  </div>
</template>