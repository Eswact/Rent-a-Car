<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchData } from '../scripts/ajax.js';
import { getDetailsPage, getCarImage, getBrand, convert2Price } from '../scripts/common.js';
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const carId = ref(null);
const carDetail = ref(null);
const category = ref(null);
const cars = ref([]);

const getSimilarCars = async () => {
  await fetchData('cars/published',
    function(data) {
      let similarCars = data.filter((car) => car.category == category.value && car.carId != carId.value);
      cars.value = similarCars.slice(-4).reverse();
    },
    function(error) {
      console.error('Bir hata oluştu:', error);
    }
  );
};

//Payment Modal
const openPaymentModal = () => {
  document.getElementById('paymentModal').classList.add('open');
};
const closePaymentModal = () => {
  document.getElementById('paymentModal').classList.remove('open');
};
const paymentProcess = () => {
  toast.error("Ödeme işlemi gerçekleşmedi!");
  document.querySelectorAll('#paymentModal input').forEach((element) => {
    element.value = '';
  });
  closePaymentModal();
};

function getCarDetail() {
  if (router.currentRoute.value.params.carId) {
    carId.value = router.currentRoute.value.params.carId;
    fetchData(
      `cars/detail/${carId.value}`,
      async (data) => {
        carDetail.value = data;
        category.value = data.category;
        await nextTick(); // Wait for the next DOM update cycle
        document.querySelectorAll('.image-option').forEach((element) => {
          element.addEventListener('click', (event) => {
            document.querySelectorAll('.image-option').forEach((element) => {
              element.classList.remove('selected');
            });
            event.target.classList.add('selected');
            document.querySelectorAll('.car-image').forEach((element) => {
              element.classList.remove('visible');
            });
            document.querySelector(`.car-image[src="${event.target.src}"]`).classList.add('visible');
          });
        });
        document.querySelector('.image-option').click(); // Trigger first option
      },
      (error) => {
        console.error('Bir hata oluştu:', error);
      }
    ).then(() => {
      getSimilarCars();
    });
  }
}

onMounted(() => {
  getCarDetail();
  //Benzer Araçlar kısmı kullanılırsa
  watch(
    () => router.currentRoute.value.params.carId,
    () => {
      getCarDetail();
    }
  );
});
</script>

<template>
  <div v-if="carDetail"  class="w-full p-[12px] flex flex-col gap-[40px]">
    <!-- car detail -->
    <div class="car-details w-full flex justify-center lg:flex-col lg:gap-[18px]">
        <!-- images -->
        <div class="flex flex-col gap-[10px] w-[50%] box-border px-[4%] lg:w-full xl:w-[60%]">
          <div class="w-full">
            <img v-for="image in carDetail.images" :key="image" class="car-image w-full" :src="getCarImage(image)">
          </div>
          <div class="w-full flex gap-[4%]">
            <img v-for="image in carDetail.images" :key="image" class="image-option" :src="getCarImage(image)">
          </div>
        </div>
        <!-- details -->
        <div class="w-[50%] pl-[10px] flex flex-col justify-around gap-[24px] lg:w-full lg:gap-[20px] xl:w-[40%]">
          <!-- title -->
          <div class="flex items-center gap-[20px] py-[10px]">
            <img class="w-[80px]" :src="getBrand(carDetail.brand).logo" :alt="getBrand(carDetail.brand).name" :title="getBrand(carDetail.brand).name">
            <h1 class="text-[40px] text-main dark:text-white">{{ carDetail.title }}</h1>
          </div>
          <!-- description -->
          <p class="max-w-[80%] 2xl:max-w-[100%]">{{ carDetail.description }}</p>
          <!-- other details -->
          <div class="flex items-center gap-[10%]">
            <div class="flex flex-col gap-[15px] items-start">
              <div class="flex items-center gap-[10px] text-main dark:text-white">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-users" size="2xl" />
                <span class="font-semibold">{{ carDetail.people }} Yetişkin</span>
              </div>
              <div class="flex items-center gap-[10px] text-main dark:text-white">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-suitcase-rolling" size="2xl" />
                <span class="font-semibold">{{ carDetail.capacity }} Büyük bavul</span>
              </div>
              <div class="flex items-center gap-[10px] text-main dark:text-white">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-gas-pump" size="2xl" />
                <span v-if="carDetail.gasoline == 1" class="font-semibold">Benzin</span>
                <span v-else-if="carDetail.gasoline == 2" class="font-semibold">Dizel</span>
                <span v-else-if="carDetail.gasoline == 3" class="font-semibold">LPG</span>
                <span v-else-if="carDetail.gasoline == 4" class="font-semibold">Elektrik</span>
                <span v-else>Bilinmiyor</span>
              </div>
            </div>
            <div class="flex flex-col gap-[15px] items-start">
              <div class="flex items-center gap-[10px] text-second">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-gauge-simple-high" size="2xl" />
                <span class="font-semibold">{{ carDetail.kilometer }} km</span>
              </div>
              <div class="flex items-center gap-[10px] text-second">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-calendar-days" size="2xl" />
                <span class="font-semibold">{{ carDetail.age }} Yaş ve üzeri</span>
              </div>
              <div class="flex items-center gap-[10px] text-second">
                <font-awesome-icon class="w-[50px]" icon="fa-solid fa-credit-card" size="2xl" />
                <span class="font-semibold">1 Kredi kartı</span>
              </div>
            </div>
          </div>
          <!-- price -->
          <div class="flex items-center gap-[16px]">
            <button @click="openPaymentModal()" class="w-[164px] p-[8px] rounded-[10px] border-[1px] border-[#00823cbf] text-[18px] text-[#00823cbf] dark:bg-[#00823cbf] dark:text-white shadow-md shadow-[#00823c57] font-medium hover:bg-[#00823cbf] hover:text-white dark:hover:bg-[white] dark:hover:text-[#00823cbf] transition-all">Hemen Kirala</button>
            <span class="text-main font-semibold dark:text-white"><span class="text-[24px]">{{ convert2Price(carDetail.dailyPrice) }}</span> / Günlük</span>
          </div>
        </div>
    </div>
    <!-- other cars -->
    <div class="w-full flex flex-col gap-[20px]">
      <hr>
      <h3 class="absolute text-[20px] mt-[-17px] ml-[25px] bg-[white] dark:bg-dark">Benzer Araçlar</h3>
      <div class="w-full flex gap-[10px] flex-wrap justify-start xl:justify-center items-center px-[20px] xl:px-0">
        <div v-for="car in cars" :key="car.id" class="car-card rounded-[12px] border-[1px] w-[calc(25%-16px)] border-main 2xl:min-w-[340px] 2xl:w-[32%] xl:w-[340px] p-[20px] flex flex-col gap-[8px] shadow-md shadow-main-shadow relative ">
          <img v-if="getBrand(car.brand)" class="absolute top-[12px] left-[12px] h-[46px]" :src="getBrand(car.brand).logo" :alt="getBrand(car.brand).name" :title="getBrand(car.brand).name">
          <img class="h-[124px] object-contain" :src="getCarImage(car.image)" :alt="car.title">
          <div class="flex justify-between items-center px-[10px] pt-[8px] border-t-[1px] border-t-main">
            <span class="text-[20px] text-main dark:text-white">{{ car.title }}</span>
            <button @click="getDetailsPage(router, car.carId)" class="gelatine text-[17px] border-1 border-second bg-second text-white p-[6px] rounded-[10px] shadow shadow-second-shadow">Detaylar <font-awesome-icon icon="fa-solid fa-circle-chevron-right" size="lg"/></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Yükleniyor...</p>
  </div>

  <!-- Payment Modal -->
  <div id="paymentModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
    <div class="bg-white w-[600px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
        <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
            <h1 class="text-[20px] text-main font-[600]">Kart Bilgilerinizi Giriniz</h1>
            <button class="absolute top-[-11px] right-[-13px] text-second" @click="closePaymentModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
        </div>
        <form class="flex flex-col gap-[10px] p-[10px]" method="POST" @submit.prevent="paymentProcess">
            <div class="flex flex-col">
              <div class="flex flex-col p-[6px]">
                <label class="text-[14px] h-[20px] text-second" for="creditCard">Kart Numarası:</label>
                <input id="creditCard" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx" class="border-b-[1px] border-main-shadow placeholder:text-main text-main p-[4px]" required>
              </div> 
              <div class="flex flex-col p-[6px]">
                <label class="text-[14px] h-[20px] text-second" for="nameSurname">Ad Soyad</label>
                <input id="nameSurname" placeholder="Adınız Soyadınız" type="text" maxlength="30" class="border-b-[1px] border-main-shadow placeholder:text-main text-main p-[4px]" required>
              </div>   
              <div class="flex justify-between w-full">
                <div class="flex flex-col p-[6px] w-[50%]">
                  <label class="text-[14px] h-[20px] text-second" for="cardExDate">Son Kullanma Tarihi</label>
                  <input id="cardExDate" type="month" class="border-b-[1px] border-main-shadow placeholder:text-main text-main p-[4px]" required>
                </div>
                <div class="flex flex-col p-[6px] w-[50%]">
                  <label class="text-[14px] h-[20px] text-second" for="cvv">CVV</label>
                  <input id="cvv" type="number" maxlength="3" placeholder="xxx" class="border-b-[1px] border-main-shadow placeholder:text-main text-main p-[4px]" required>
                </div>   
              </div>
            </div>
            <div class="flex justify-center items-center px-[4px]"><button type="sumbit" class="w-full bg-second py-[8px] px-[16px] text-[17px] text-white rounded-[6px]">Ödemeyi Tamamla</button></div>
        </form>
    </div>
  </div>
</template>

<style scoped>
  .car-image {
    display: none;
    border: 1px solid #ddd;
    border-radius: 12px;
  }
  .car-image.visible {
    display: block;
  }
  .image-option {
    cursor: pointer;
    width: 22%;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  .image-option.selected {
    border: 2px solid #ddd;
    opacity: 75%;
    filter: grayscale(50%);
    border-radius: 6px;
  }
  #paymentModal {
    display: none;
  }
  #paymentModal.open {
    display: flex;
  }
</style>