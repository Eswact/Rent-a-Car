<script setup>
    import { ref, onMounted } from 'vue';
    import { fetchData, postData } from '../scripts/ajax.js';
    import { getBannerImage } from '../scripts/common.js';

    const banners = ref([]);
    const selectedImage = ref(null);

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleImage(file);
    };

    const handleDragOver = (event) => {
        event.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleImage(file);
    };

    const handleImage = (file) => {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            selectedImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    };

    const openBannerModal = () => {
        document.querySelector('.bannerModal').classList.add('open');
    };

    const closeBannerModal = () => {
        document.querySelector('.bannerModal').classList.remove('open');
    };

    onMounted(() => {
        fetchData('home/banners',
            function (data) {
                banners.value = data;
            },
            function (error) {
                console.error('Bir hata oluştu:', error);
            }
        );
    });
</script>

<template>
    <div>
        <h1>Bannerlar</h1>
        <hr class="mb-[10px]">
        <div class="flex items-center gap-[10px] flex-wrap">
            <div v-for="banner in banners" :key="banner.bannerId" class="w-[360px] h-[120px] rounded-[10px] overflow-hidden">
                <img :src="getBannerImage(banner.src)" alt="banner" class="w-full h-full object-cover">
            </div>
            <div @click="openBannerModal" class="w-[360px] h-[120px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                    <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                </div>
            </div>
        </div>
    </div>

    <div class="bannerModal flex absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[800px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Banner Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeBannerModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
            <form id="modalContent" class="flex flex-col gap-[10px] p-[10px]">
                <div class="relative">
                    <input type="file" id="fileInput" ref="fileInput" @change="handleFileChange" class="hidden" accept=".jpg, .jpeg, .png, .webp" required>
                    <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                        <div v-if="!selectedImage" class="text-center">Resim seçin veya sürükleyip bırakın</div>
                        <div v-else class="w-full h-full rounded-[6px] overflow-hidden">
                            <img :src="selectedImage" alt="Selected Image" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
                <input type="text" id="bannerHeader" placeholder="Başlık giriniz..." class="border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                <textarea name="description" id="bannerDescription" placeholder="Açıklama giriniz..." class="border-[1px] rounded-[6px] px-[12px] py-[4px]"></textarea>
                <div class="flex justify-center items-center"><button class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button></div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .bannerModal {
        display: none;
    }
    .bannerModal.open {
        display: flex;
    }
</style>