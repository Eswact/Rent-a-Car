<template>
  <Carousel :autoplay="2000" :wrap-around="true" :items-to-show="1">
    <Slide v-for="slide in slides" :key="slide.id">
      <div class="flex items-center justify-center box-border w-full relative h-[450px] px-[40px]">
        <img :src="slide.src" :alt="slide.alt" class="w-full h-full object-cover" />
        <div class="w-[calc(100%-80px)] h-[25%] absolute bg-[rgba(0,0,0,0.75)] bottom-0 box-border px-[20px] pt-[10px] flex flex-col items-start">
          <h2 class="text-[28px] text-second">{{ slide.title }}</h2>
          <p class="text-[16px] text-white text-left">{{ slide.description }}</p>
        </div>
      </div>
    </Slide>
    <template #addons>
      <Pagination />
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
  import { defineComponent } from 'vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
  import { fetchDataPromise } from '../scripts/ajax.js'

  export default defineComponent({
    name: 'DynamicSlides',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    data() {
      return {
        slides: [],
      };
    },
    async created() {
      try {
        const banners = await fetchDataPromise('home/banners');
        this.slides = banners;
      } catch (error) {
        console.error('API isteği başarısız oldu:', error);
      }
    },
  });
</script>
