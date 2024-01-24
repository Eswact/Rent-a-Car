<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import { setlocalstorage, getlocalstorage } from './scripts/common';

  const cookiesClose = () => {
    document.getElementById('cookies').classList.add('closed');
  }
  const cookiesAccept = () => {
    setlocalstorage('cookies', 'true');
    document.getElementById('cookies').classList.add('closed');
  }

  onMounted(() => {
    // cookies
    if (getlocalstorage('cookies') == 'true') {
      document.getElementById('cookies').classList.add('closed');
    }
    // dark-mode
    const darkModeToggle = document.getElementById('dark-mode-slider');
    if (getlocalstorage('dark-mode') != '' && getlocalstorage('cookies') == 'true') {
      if (getlocalstorage('dark-mode') == 'true') {
        document.documentElement.classList.add('dark');
        darkModeToggle.dataset.checked = true;
      } else {
        document.documentElement.classList.remove('dark');
        darkModeToggle.dataset.checked = false;
      }
    } else {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (prefersDarkScheme.matches) {
        document.documentElement.classList.add('dark');
        darkModeToggle.dataset.checked = true;
      }
    }
    darkModeToggle.addEventListener('click', () => {
      if (darkModeToggle.dataset.checked == 'true') {
        darkModeToggle.dataset.checked = false;
        document.documentElement.classList.remove('dark');
        setlocalstorage('dark-mode', 'false');
      } else {
        darkModeToggle.dataset.checked = true;
        document.documentElement.classList.add('dark');
        setlocalstorage('dark-mode', 'true');
      }
    });
    // hamburger-menu
    document.querySelector('.hamburger-button').addEventListener('click', () => {
      document.querySelector('.hamburger-menu').classList.add('open');
    });
    document.querySelector('.menu-close').addEventListener('click', () => {
      document.querySelector('.hamburger-menu').classList.remove('open');
    });
    document.querySelectorAll('.hamburger-menu ul li').forEach((item) => {
        item.addEventListener('click', () => {
          document.querySelector('.hamburger-menu').classList.remove('open');
        });
    });

    document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
          // Payment
          if (document.getElementById('paymentModal') != null) {
            document.getElementById('paymentModal').classList.remove('open');
          }
          // Admin
          if (document.getElementById('bannerModal') != null) {
            document.getElementById('bannerModal').classList.remove('open');
            document.getElementById('brandModal').classList.remove('open');
            document.getElementById('carModal').classList.remove('open');
          }
        }
    });
  });
</script>

<template>
  <header v-if="$route.path !== '/login' && $route.path !== '/admin'"  class="z-10 bg-white dark:bg-dark fixed top-0 left-0 w-[85.4%] mx-[7.3%] full:w-[90%] full:mx-[5%] xl:w-full xl:mx-0 px-[20px] md:px-[10px] pt-[16px] md:pt-[10px] pb-[10px] border-b border-1 border-main dark:border-white text-xl lg:text-lg flex items-center justify-between overflow-hidden">
      <nav class="w-[90%] md:w-[auto] flex items-center gap-[5%] lg:gap-[20px] md:gap-[30px]">
        <RouterLink to="/" class="flex items-center justify-center gap-[16px] lg:gap-[10px] md:gap-[16px]">
          <img class="max-h-[68px] lg:max-h-[60px] md:max-h-[50px] rounded-[50%]" src="./assets/media/logo.jpg" alt="logo">
          <h1 class="text-[2rem] lg:text-[1.75rem] md:text-[1.5rem] sm:text-[1.75rem] font-medium text-main dark:text-white">Rent<span class="text-second font-semibold">E</span>ren</h1>
        </RouterLink>
        <ul class="flex items-center gap-[28px] xl:gap-[10px] md:gap-[20px] text-main dark:text-white sm:hidden">
          <li :class="{ 'active': $route.path === '/' }"><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-home" /> <span class="md:hidden">Anasayfa</span></RouterLink></li>
          <li :class="{ 'active': $route.path === '/cars' || $route.path.includes('/detail/') }"><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/cars"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-car" /> <span class="md:hidden">Arabalar</span></RouterLink></li>
          <li :class="{ 'active': $route.path === '/about' }"><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/about"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-circle-info" /> <span class="md:hidden">Hakkımızda</span></RouterLink></li>
          <li :class="{ 'active': $route.path === '/contact' }"><RouterLink class="w-full p-[10px] lg:p-[4px] flex items-center gap-[10px]" to="/contact"><font-awesome-icon class="text-[1.75rem] lg:text-[1.35rem] md:text-[1.5rem]" icon="fa-solid fa-headset" /> <span class="md:hidden">İletişim</span></RouterLink></li>
        </ul>
      </nav>
      <div class="w-[10%] md:w-[auto] flex items-center justify-end gap-[24px]">
        <span id="dark-mode-slider" class="darkmode-switch" data-checked="false"></span>
        <font-awesome-icon class="hamburger-button hidden sm:block text-[2rem] text-main dark:text-second" icon="fa-solid fa-bars" />
      </div>
  </header>

  <aside v-if="$route.path !== '/login' && $route.path !== '/admin'" class="z-20 hamburger-menu fixed top-0 right-0 bg-white dark:bg-dark h-full">
    <div class="w-full flex justify-end text-[24px] text-second"><font-awesome-icon class="menu-close" icon="fa-solid fa-xmark" /></div>
    <ul class="flex flex-col gap-[10px]">
      <li class="flex gap-2 text-main dark:text-white text-[20px]"><RouterLink to="/"><font-awesome-icon icon="fa-solid fa-home" /> <span>Anasayfa</span></RouterLink></li>
      <li class="flex gap-2 text-main dark:text-white text-[20px]"><RouterLink to="/cars"><font-awesome-icon icon="fa-solid fa-car" /> <span>Arabalar</span></RouterLink></li>
      <li class="flex gap-2 text-main dark:text-white text-[20px]"><RouterLink to="/about"><font-awesome-icon icon="fa-solid fa-circle-info" /> <span>Hakkımızda</span></RouterLink></li>
      <li class="flex gap-2 text-main dark:text-white text-[20px]"><RouterLink to="/contact"><font-awesome-icon icon="fa-solid fa-headset" /> <span>İletişim</span></RouterLink></li>
    </ul>
  </aside>

  <main v-if="$route.path !== '/login' && $route.path !== '/admin'" class="z-0 pt-[110px] lg:pt-[100px] md:pt-[80px] sm:pt-[75px]">
    <RouterView/>
  </main>
  <main v-else>
    <RouterView/>
  </main>

  <div id="cookies" class="fixed left-[10px] bottom-[10px] w-[450px] py-[22px] px-[30px] bg-[rgba(0,0,0,0.8)] rounded-[20px] gap-[20px] border-[1px] border-black shadow-lg shadow-[rgba(0,0,0,0.7)]">
    <button @click="cookiesClose" class="absolute top-[-10px] right-[-12px] text-second"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
    <img class="h-[182px]" src="./assets/media/cookies.png">
    <div class="flex flex-col gap-[16px] pt-[5px] px-[5px]">
      <span class="text-[12px] text-white">"Çerezleri kabul et" seçeneğine tıklayarak, çerezlerin cihazınızda saklayabileceğini ve Çerez Politikamıza uygun olarak bilgileriniz paylaşılabileceğini kabul etmiş olursunuz.</span>
      <button @click="cookiesAccept()" class="text-white text-[18px] text-[600] p-[8px] bg-second rounded-[14px] shadow-sm shadow-second-shadow border-[1px] border-second-shadow">Çerezleri Kabul Et</button>
    </div>
  </div>
</template>

<style scoped>
  .active {
    color: #EE605F;
  }
  #cookies {
    display: flex;
  }
  #cookies.closed {
    display: none;
  }
</style>