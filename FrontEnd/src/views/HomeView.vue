<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { fetchData } from '../scripts/ajax.js';
import { getBrand, getBannerImage, getCarImage } from '../scripts/common.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const cars = ref([]);
const getDetailsPage = (carId) => {
  router.push({ path: `/detail/${carId}` });
};
const fetchCars = async () => {
  await fetchData('cars/published',
    function(data) {
      let lastFourCars = data.slice(-4);
      cars.value = lastFourCars;
    },
    function(error) {
      console.error('Bir hata oluştu:', error);
    }
  );
};


const itemsToShow = ref(10);

onMounted(() => {
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1920) {
      itemsToShow.value = 10;
    } else if (windowWidth >= 1280) {
      itemsToShow.value = 8;
    } else if (windowWidth >= 800) {
      itemsToShow.value = 6;
    } else {
      itemsToShow.value = 3;
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  fetchCars();
});

function directCarsWithBrandId(brandId) {
  console.log('directCarsWithBrandId', brandId);
  window.location.href = `/cars?brandId=${brandId}`;
}
</script>

<template>
  <div class="w-full flex flex-col gap-[16px]">
    <CustomCarousel :autoplay="2000" :wrap-around="true" :items-to-show="1" :slides="firstCarouselSlides">
      <template v-slot:default>
        <Slide v-for="slide in firstCarouselSlides" :key="slide.bannerId" :slide="slide">
          <div v-if="slide" class="flex items-center justify-center box-border w-full relative h-[420px] sm:h-[200px] px-[40px] sm:px-0 cursor-grab active:cursor-grabbing">
            <img :src="getBannerImage(slide.src)" :alt="slide.alt" class="w-full h-full object-cover rounded-[6px]" />
            <div class="w-[calc(100%-80px)] sm:w-full h-[30%] absolute bg-[rgba(0,0,0,0.75)] bottom-0 box-border px-[20px] pt-[10px] flex flex-col items-start rounded-[6px]">
              <h2 class="text-[28px] sm:text-[18px] text-second">{{ slide.title }}</h2>
              <p class="text-[16px] text-white text-left sm:hidden">{{ slide.description }}</p>
            </div>
          </div>
        </Slide>
      </template>
      <template #addons>
        <Pagination />
        <Navigation />
      </template>
    </CustomCarousel>

    <CustomCarousel :wrap-around="true" :items-to-show="itemsToShow" :slides="secondCarouselSlides" class="px-[50px]">
      <template v-slot:default>
        <Slide v-for="slide in secondCarouselSlides" :key="slide.id" :slide="slide">
          <div v-if="slide" @click="directCarsWithBrandId(slide.brandId)"  class="flex items-center justify-center w-[120px] h-[80px] p-[10px] sm:w-[70px] sm:h-[70px] dark:bg-[#efefef] rounded-[10px] border-[#ddd] border-[1px] cursor-pointer">
            <img :src="getBrand(slide.brandId).logo" :alt="slide.name" class="w-full h-full object-contain" />
          </div>
        </Slide>
      </template>
      <template #addons>
        <Navigation />
      </template>
    </CustomCarousel>

    <div class="w-full py-[5px] px-[20px] flex flex-col gap-[10px] items-start">
      <span class="text-[20px] w-full border-b-[1px] pb-[4px] border-main-shadow">Son Eklenen Araçlar</span>
      <div class="w-full flex gap-[10px] flex-wrap justify-center items-center">
        <div v-for="car in cars" :key="car.id" class="car-card rounded-[12px] border-[1px] w-[calc(25%-16px)] border-main 2xl:min-w-[340px] 2xl:w-[32%] xl:w-[340px] p-[20px] flex flex-col gap-[8px] bg-white shadow-md shadow-main-shadow relative ">
          <img v-if="getBrand(car.brand)" class="absolute top-[12px] left-[12px] w-[46px]" :src="getBrand(car.brand).logo" :alt="getBrand(car.brand).name" :title="getBrand(car.brand).name">
          <img class="h-[124px] object-contain" :src="getCarImage(car.image)" :alt="car.title">
          <div class="flex justify-between px-[10px] pt-[8px] border-t-[1px] border-t-main">
            <span class="text-[20px] text-main">{{ car.title }}</span>
            <button @click="getDetailsPage(car.carId)" class="gelatine text-[17px] border-1 border-second bg-second text-white p-[6px] rounded-[10px] shadow shadow-second-shadow">Detaylar <font-awesome-icon icon="fa-solid fa-circle-chevron-right" size="lg"/></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel as CustomCarousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { fetchDataPromise } from '../scripts/ajax.js';

export default defineComponent({
  data() {
    return {
      firstCarouselSlides: [],
      secondCarouselSlides: [],
    };
  },
  created() {
    this.fetchFirstCarouselData();
    this.fetchSecondCarouselData();
  },
  methods: {
    async fetchFirstCarouselData() {
      try {
        const data = await fetchDataPromise('home/banners');
        this.firstCarouselSlides = data;
      } catch (error) {
        console.error('First Carousel data fetch error:', error);
      }
    },
    async fetchSecondCarouselData() {
      try {
        const data = await fetchDataPromise('brands/published');
        this.secondCarouselSlides = data;
      } catch (error) {
        console.error('Second Carousel data fetch error:', error);
      }
    },
  },
  components: {
    CustomCarousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>
