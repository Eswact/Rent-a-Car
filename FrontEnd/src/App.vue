<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { onMounted } from 'vue'

  onMounted(() => {
    // dark-mode
    const darkModeToggle = document.getElementById('dark-mode-slider');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
      document.documentElement.classList.add('dark');
      darkModeToggle.checked = true;
    }
    darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  });
</script>

<template>
  <header class="w-[100%] px-[50px] xl:px-[20px] md:px-[10px] pt-[16px] md:pt-[10px] pb-[10px] border-b border-1 border-main dark:border-white text-xl lg:text-lg flex items-center justify-between overflow-hidden">
      <nav class="w-[90%] md:w-[auto] flex items-center gap-[5%] lg:gap-[20px] md:gap-[30px]">
        <div class="flex items-center justify-center gap-[16px] lg:gap-[10px] md:gap-[16px]">
          <img class="max-h-[68px] lg:max-h-[60px] md:max-h-[50px] rounded-[50%]" src="./assets/media/logo.jpg" alt="logo">
          <h1 class="text-[2rem] lg:text-[1.75rem] md:text-[1.5rem] sm:text-[1.75rem] font-medium text-main dark:text-white">Rent<span class="text-second font-semibold">E</span>ren</h1>
        </div>
        <ul class="flex items-center gap-[28px] xl:gap-[10px] md:gap-[20px] text-main dark:text-white sm:hidden">
          <li><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-home" /> <span class="md:hidden">Anasayfa</span></RouterLink></li>
          <li><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/cars"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-car" /> <span class="md:hidden">Arabalar</span></RouterLink></li>
          <li><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/about"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-circle-info" /> <span class="md:hidden">Hakkımızda</span></RouterLink></li>
          <li><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/contact"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-headset" /> <span class="md:hidden">İletişim</span></RouterLink></li>
        </ul>
      </nav>
      <div class="w-[10%] md:w-[auto] flex items-center justify-end gap-[24px]">
        <input type="checkbox" id="dark-mode-slider" class="switch">
        <font-awesome-icon class="hidden sm:block text-[2rem] text-main dark:text-second" icon="fa-solid fa-bars" />
      </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
