<script setup>
  import { fetchData } from '../scripts/ajax.js'
  import { getCompanyImage } from '../scripts/common.js'
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
    <div class="flex justify-center items-center h-[300px] w-full text-[32px] rounded-[12px] font-extrabold bg-cover bg-no-repeat text-white" style="background-image: linear-gradient(180deg,rgba(28, 66, 79, 0.75),rgba(28, 66, 79, 0.25)),url(../src/assets/media/contact.png); background-position: center top 85%;">
      <span>İletişime Geçin</span>
    </div>
    <div class="w-full flex items-start gap-[20px] md:flex-col-reverse">
      <div class="flex flex-col gap-[20px] w-[50%] md:w-full px-[28px] py-[20px] border-[1px] border-main rounded-[10px] bg-main-shadow shadow-lg shadow-main-shadow">
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
          <textarea class="w-full p-[10px] min-h-[110px] border border-main dark:border-white rounded-md" id="message" name="message" placeholder="Mesajınız"></textarea>
        </div>
        <div class="flex justify-end">
          <button class="gelatine w-[132px] lg:w-full p-[8px] bg-second text-white text-[18px] font-[600] rounded-md">Gönder</button>
        </div>
      </div>
      <div v-if="contactData" class="px-[28px] py-[20px] flex flex-col justify-center gap-[10px] text-[18px] border-[1px] border-main rounded-[10px] bg-main-shadow shadow-lg shadow-main-shadow w-[50%] md:w-full">
        <h2 class="text-[20px] font-semibold text-main dark:text-white">İleşim Bilgileri</h2>
        <div class="w-full bg-white py-[10px] px-[20px] rounded-[6px] border-[1px] border-main flex flex-col gap-[6px]">
          <div class="w-full flex items-center justify-start gap-[8px]"><span class="text-second min-w-[80px] text-center border-[1px] border-second-shadow font-[500] rounded-[6px]">Telefon</span><span class="dark:text-black"> {{ contactData.tel }}</span></div>
          <div class="w-full flex items-center justify-start gap-[8px]"><span class="text-second min-w-[80px] text-center border-[1px] border-second-shadow font-[500] rounded-[6px]">Fax</span><span class="dark:text-black"> {{ contactData.fax }}</span></div>
          <div class="w-full flex items-center justify-start gap-[8px]"><span class="text-second min-w-[80px] text-center border-[1px] border-second-shadow font-[500] rounded-[6px]">Mail</span><span class="dark:text-black"> {{ contactData.mail }}</span></div>
          <div class="w-full flex items-center justify-start gap-[8px]"><span class="text-second min-w-[80px] text-center border-[1px] border-second-shadow font-[500] rounded-[6px]">Adres</span><span class="dark:text-black"> {{ contactData.address }}</span></div>
        </div>
        <div class="h-[218px] max-w-[100%] flex justify-center items-center">
          <img class="w-full h-full rounded-[10px] border-[1px] border-main shadow-lg shadow-main-shadow object-cover" :src="getCompanyImage(contactData.img)" alt="adres">
        </div>
      </div>
    </div>
  </div>
</template>