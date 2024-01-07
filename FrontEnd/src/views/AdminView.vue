<script setup>
    import { ref, onMounted } from 'vue';
    import { fetchData, postData, postFormData } from '../scripts/ajax.js';
    import { getBannerImage, getBrandImage } from '../scripts/common.js';

    const banners = ref([]);
    const brands = ref([]);
    
    const selectedImage = ref(null);
    const triggerFileInput = () => {
        if (document.getElementById('bannerModal').classList.contains('open')) {
            document.getElementById('fileInputBanner').click();
        }
        if (document.getElementById('brandModal').classList.contains('open')) {
            document.getElementById('fileInputBrand').click();
        }
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
    const resetFormInputs = () => {
        document.querySelectorAll('.formInputs').forEach(function (e) {
            e.value = null;
            console.log(e.value)
        });
    };

    
    //Banners
    const getBanners = () => {
        fetchData('home/banners',
            function (data) {
                banners.value = data;
                console.log(banners.value);
            },
            function (error) {
                console.error('Bir hata oluştu:', error);
            }
        );
    };
    const saveNewBanner = () => {
        const file = document.getElementById('fileInputBanner').files[0];
        postFormData('admin/addBannerImage', {
            file: file
        }, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        });
        postData('home/banners/create', {
            src: file.name,
            alt: file.name,
            title: document.getElementById('bannerHeader').value,
            description: document.getElementById('bannerDescription').value
        }, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        }).then(() => {
            getBanners();
        });
        closeBannerModal();
    };
    const deleteBanner = (bannerId) => {
        postData(`home/banners/delete/${bannerId}`, {}, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        }).then(() => {
            getBanners();
        });
    };
    const openBannerModal = () => {
        document.getElementById('bannerModal').classList.add('open');
    };
    const closeBannerModal = () => {
        document.getElementById('bannerModal').classList.remove('open');
        selectedImage.value = null;
        resetFormInputs();
    };

    //Brands
    const getBrands = () => {
        fetchData('brands/published',
            function (data) {
                brands.value = data;
                console.log(brands.value);
            },
            function (error) {
                console.error('Bir hata oluştu:', error);
            }
        );
    };
    const saveNewBrand = () => {
        const file = document.getElementById('fileInputBrand').files[0];
        postFormData('admin/addBrandImage', {
            file: file
        }, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        });
        postData('brands/create', {
            name: document.getElementById('brandName').value,
            logo: file.name
        }, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        }).then(() => {
            getBrands();
        });
        closeBrandModal();
    };
    const deleteBrand = (brandId) => {
        postData(`brands/delete/${brandId}`, {}, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        }).then(() => {
            getBrands();
        });
    };
    const openBrandModal = () => {
        document.getElementById('brandModal').classList.add('open');
    };
    const closeBrandModal = () => {
        document.getElementById('brandModal').classList.remove('open');
        selectedImage.value = null;
        resetFormInputs();
    };

    //Ready
    onMounted(() => {
        getBanners();
        getBrands();
    });
</script>

<template>
    <div class="w-full flex flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Afişler</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                <div v-for="banner in banners" :key="banner.bannerId" class="bannerCard w-[360px] h-[120px] rounded-[10px] overflow-hidden cursor-pointer relative">
                    <img :src="getBannerImage(banner.src)" :alt="banner.title" class="w-full h-full object-cover">
                    <button @click="deleteBanner(banner.bannerId)" class="deleteBanner absolute top-[4px] right-[4px] py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                </div>
                <div @click="openBannerModal" class="w-[360px] h-[120px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                    <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                        <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full flex flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Markalar</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[20px] flex-wrap p-[10px]">
                <div v-for="brand in brands" :key="brand.brandId" class="bannerCard w-[100px] h-[100px] p-[10px] rounded-[10px] overflow-hidden cursor-pointer relative border-main border-[1px]">
                    <img :src="getBrandImage(brand.logo)" :alt="brand.name" class="w-full h-full object-cover">
                    <button @click="deleteBrand(brand.brandId)" class="deleteBanner absolute top-[4px] right-[4px] py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                </div>
                <div @click="openBrandModal" class="w-[100px] h-[100px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                    <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                        <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full flex flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Arabalar</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                
            </div>
        </div>
    </div>
    <div class="w-full flex flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Şirket</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                
            </div>
        </div>
    </div>

    <!-- Modals -->
    <!-- Banner -->
    <div id="bannerModal" class="flex fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[800px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Banner Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeBannerModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
            <form class="flex flex-col gap-[10px] p-[10px]" enctype="multipart/form-data" method="POST">
                <div class="relative">
                    <input type="file" id="fileInputBanner" ref="fileInputBanner" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp" required>
                    <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                        <div v-if="!selectedImage" class="text-center">Resim seçin veya sürükleyip bırakın</div>
                        <div v-else class="w-full h-full rounded-[6px] overflow-hidden">
                            <img :src="selectedImage" alt="Selected Image" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
                <input type="text" id="bannerHeader" placeholder="Başlık giriniz..." class="formInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                <textarea name="description" id="bannerDescription" placeholder="Açıklama giriniz..." class="formInputs border-[1px] rounded-[6px] px-[12px] py-[4px]"></textarea>
                <div class="flex justify-center items-center"><button type="button" @click="saveNewBanner" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button></div>
            </form>
        </div>
    </div>
    <!-- Brand -->
    <div id="brandModal" class="flex fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[400px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Marka Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeBrandModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
            <form class="flex flex-col gap-[10px] p-[10px]" enctype="multipart/form-data" method="POST">
                <div class="relative">
                    <input type="file" id="fileInputBrand" ref="fileInputBrand" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp" required>
                    <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                        <div v-if="!selectedImage" class="text-center">Resim seçin veya sürükleyip bırakın</div>
                        <div v-else class="w-full h-full rounded-[6px] overflow-hidden">
                            <img :src="selectedImage" alt="Selected Image" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
                <input type="text" id="brandName" placeholder="Marka adı giriniz..." class="formInputs border-[1px] rounded-[6px] px-[12px] py-[4px]" required>
                <div class="flex justify-center items-center"><button type="button" @click="saveNewBrand" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button></div>
            </form>
        </div>
    </div>
    <!-- Car -->
    <div id="carModal" class="flex fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[800px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Araba Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeCarModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .bannerCard:hover .deleteBanner {
        opacity: 1;
    }
    .deleteBanner {
        transition: all 0.3s ease;
        opacity: 0;
    }
    #bannerModal {
        display: none;
    }
    #bannerModal.open {
        display: flex;
    }
    #brandModal {
        display: none;
    }
    #brandModal.open {
        display: flex;
    }
    #carModal {
        display: none;
    }
    #carModal.open {
        display: flex;
    }
</style>