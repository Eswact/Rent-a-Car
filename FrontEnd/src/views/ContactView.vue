<script setup>
  import { fetchData, postData } from '../scripts/ajax.js'
  import { getCompanyImage } from '../scripts/common.js'
  import { ref, onMounted } from 'vue'
  import { useToast } from "vue-toastification";

  const contactData = ref({})
  const toast = useToast();

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

  const handleSubmit = () => {
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };
    postData('company/sendMail', formData,
      function(data) {
        console.log('İstek başarılı:', data);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        toast.success("Mesajınız başarıyla gönderildi.", {
          timeout: 3000
        });
      },
      function(error) {
        console.error('Bir hata oluştu:', error);
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
        toast.error("Mesajınız gönderilirken bir hata oluştu.", {
          timeout: 3000
        });
      }
    )
  };
</script>

<template>
  <!-- arayüzü düzenlenecek -->
  <div class="flex flex-col gap-[20px] w-full">
    <div class="flex justify-center items-center h-[300px] w-full text-[32px] rounded-[12px] font-extrabold bg-cover bg-no-repeat text-white" style="background-image: linear-gradient(180deg,rgba(28, 66, 79, 0.55),rgba(28, 66, 79, 0.15)),url(../src/assets/media/contact.png); background-position: center top 85%;">
      <span>İletişime Geçin</span>
    </div>
    <div class="w-full flex items-start gap-[20px] md:flex-col-reverse">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-[20px] w-[50%] md:w-full px-[28px] py-[20px] border-[1px] border-main rounded-[10px] bg-main-shadow shadow-lg shadow-main-shadow">
        <div class="flex flex-col gap-[10px] w-full">
            <label class="text-[20px] font-semibold text-main dark:text-white" for="name">Adınız Soyadınız</label>
            <input class="w-full p-[10px] border border-main dark:border-white rounded-md" type="text" id="name" name="name" placeholder="Adınız Soyadınız" required>
        </div>
        <div class="flex flex-col gap-[10px] w-full">
            <label class="text-[20px] font-semibold text-main dark:text-white" for="email">E-Posta Adresiniz</label>
            <input class="w-full p-[10px] border border-main dark:border-white rounded-md" type="email" id="email" name="email" placeholder="E-Posta Adresiniz" required>
        </div>
        <div class="flex flex-col gap-[10px] w-full">
            <label class="text-[20px] font-semibold text-main dark:text-white" for="message">Mesajınız</label>
            <textarea class="w-full p-[10px] min-h-[110px] border border-main dark:border-white rounded-md" id="message" name="message" placeholder="Mesajınız" required></textarea>
        </div>
        <div class="flex justify-end">
            <button type="submit" class="gelatine w-[132px] lg:w-full p-[8px] bg-second text-white text-[18px] font-[600] rounded-md">Gönder</button>
        </div>
      </form>
      <div v-if="contactData" class="px-[26px] py-[8px] flex flex-col justify-center gap-[10px] text-[18px] w-[50%] md:w-full md:px-[2px] md:py-[2px]">
        <div class="w-full py-[10px] px-[12px] flex flex-col gap-[18px] md:px-0">
          <div class="w-full flex items-center justify-start gap-[8px] border-b-[1px] pb-[10px]"><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-phone" size="xl"/></span><span class="text-main dark:text-white"> {{ contactData.tel }}</span></div>
          <div class="w-full flex items-center justify-start gap-[8px] border-b-[1px] pb-[10px]"><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-fax" size="xl"/></span><span class="text-main dark:text-white"> {{ contactData.fax }}</span></div>
          <div class="w-full flex items-center justify-start gap-[8px] border-b-[1px] pb-[10px]"><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-envelope" size="xl"/></span><span class="text-main dark:text-white"> {{ contactData.mail }}</span></div>
          <div class="w-full flex items-center justify-start gap-[8px] border-b-[1px] pb-[10px]"><span class="text-second min-w-[60px] text-center"><font-awesome-icon icon="fa-solid fa-location-dot" size="xl"/></span><span class="text-main dark:text-white"> {{ contactData.address }}</span></div>
        </div>
        <a :href="contactData.link" target="_blank" class="h-[218px] max-w-[100%] flex justify-center items-center">
          <img class="w-full h-full rounded-[10px] border-[1px] border-main shadow-lg shadow-main-shadow object-cover" :src="getCompanyImage(contactData.img)" alt="adres">
        </a>
      </div>
    </div>
  </div>
</template>