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
      // API isteği
      this.slides = [
        {
          id: 1,
          src: "https://wallpapers.com/images/hd/ultra-wide-4k-car-3lxbiug6ognbvkxm.jpg",
          alt: "1",
          title: "Duyuru 1",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laudantium incidunt fugit labore mollitia? Consequuntur accusamus mollitia, distinctio cum rerum quod praesentium facilis sunt, suscipit aliquid non enim sit! Repudiandae.",
        },
        {
          id: 2,
          src: "https://4.bp.blogspot.com/-JmiIs3ZwMt0/WBLdRnYHRiI/AAAAAAAANmk/OEDgtVFVRDYlV0Xjxs-QWID3hQ-nngp_QCLcB/s1600/Ultra%2BWide%2BBackgrounds%2B2.jpg",
          alt: "2",
          title: "Duyuru 2",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laudantium incidunt fugit labore mollitia? Consequuntur accusamus mollitia, distinctio cum rerum quod praesentium facilis sunt, suscipit aliquid non enim sit! Repudiandae.",
        },
        {
          id: 3,
          src: "https://wallpapercave.com/wp/wp11184054.png",
          alt: "3",
          title: "Duyuru 3",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laudantium incidunt fugit labore mollitia? Consequuntur accusamus mollitia, distinctio cum rerum quod praesentium facilis sunt, suscipit aliquid non enim sit! Repudiandae.",
        },
      ];
    } catch (error) {
      console.error('API isteği başarısız oldu:', error);
    }
  },
});
</script>

<style scoped>
.custom-carousel-item {
  position: relative;
  width: 100%;
  height: 400px;
}

.custom-carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.overlay h2 {
  margin-bottom: 10px;
}
</style>
