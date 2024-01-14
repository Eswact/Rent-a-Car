<script setup>
    import { ref, onMounted } from 'vue';
    import { fetchData, postData, postFormData } from '../scripts/ajax.js';
    import { getBannerImage, getBrand, getBrandImage, getCarImage, getCompanyImage } from '../scripts/common.js';
    import { useToast } from "vue-toastification";

    const toast = useToast();

    const banners = ref([]);
    const brands = ref([]);
    const categories = ref([]);
    const cars = ref([]);
    const contactData = ref([]);
    const aboutData = ref([]);
    
    const selectedImage = ref(null);
    const selectedImages = ref(null);
    const selectedImageContact = ref(null);
    const selectedImageAbout = ref(null);
    const triggerFileInput = (event) => {
        if (document.getElementById('bannerModal').classList.contains('open')) {
            document.getElementById('fileInputBanner').click();
        }
        if (document.getElementById('brandModal').classList.contains('open')) {
            document.getElementById('fileInputBrand').click();
        }
        if (document.getElementById('carModal').classList.contains('open')) {
            document.getElementById('fileInputCar').click();
        }
        if (event.target == document.getElementById('ContactImage')) {
            document.getElementById('fileInputContact').click();
        }
        if (event.target == document.getElementById('AboutImage')) {
            document.getElementById('fileInputAbout').click();
        }
    };
    const handleFileChange = (event) => {
        if (document.getElementById('carModal').classList.contains('open')) {
            selectedImages.value = [];
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    selectedImages.value.push(e.target.result);
                };
                reader.readAsDataURL(files[i]);
            }
        } 
        else {
            const file = event.target.files[0];
            handleImage(file, event.target);
        }
    };
    const handleDragOver = (event) => {
        event.dataTransfer.dropEffect = 'copy';
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        
        const inputElement = event.target.closest('.containImageSelector').querySelector('input[type="file"]');
        if (inputElement) {
            inputElement.files = event.dataTransfer.files;
        }

        handleImage(file, event.target);
    }; 
    const handleImage = (file, target) => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (target == document.getElementById('ContactImage') || target == document.getElementById('fileInputContact')) {
                selectedImageContact.value = e.target.result;
            }
            else if (target == document.getElementById('AboutImage') || target == document.getElementById('fileInputAbout')) {
                selectedImageAbout.value = e.target.result;
            }
            else {
                selectedImage.value = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };
    const resetFormInputs = () => {
        document.querySelectorAll('.formInputs').forEach(function (e) {
            e.value = null;
        });
        document.querySelectorAll('.formSelects').forEach(function (e) {
            e.value = 0;
        });
    };
    
    //Banners
    const getBanners = async () => {
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
            toast.success("Yeni Afiş Eklendi", {
                timeout: 3000
            });
        }, function () {
            toast.error("Yeni Afiş Eklenirken Hata", {
                timeout: 3000
            });
        }).then(() => {
            getBanners();
        });
        closeBannerModal();
    };
    const deleteBanner = (bannerId) => {
        postData(`home/banners/delete/${bannerId}`, {}, function () {
            toast.success("Afiş Kaldırıldı", {
                timeout: 3000
            });
        }, function () {
            toast.error("Afiş Kaldırılırken Hata", {
                timeout: 3000
            });
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
    const getBrands = async () => {
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
            toast.success("Yeni Marka Eklendi", {
                timeout: 3000
            });
        }, function () {
            toast.error("Yeni Marka Eklenirken Hata", {
                timeout: 3000
            });
        }).then(() => {
            getBrands();
        });
        closeBrandModal();
    };
    const deleteBrand = (brandId) => {
        postData(`brands/delete/${brandId}`, {}, function () {
            toast.success("Marka Kaldırıldı", {
                timeout: 3000
            });
        }, function () {
            toast.error("Marka Kaldırılırken Hata", {
                timeout: 3000
            });
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

    //Categories
    const getCategory = async () => {
        fetchData('categories/published',
            function (data) {
                categories.value = data;
                console.log(categories.value);
            },
            function (error) {
                console.error('Bir hata oluştu:', error);
            }
        );
    };

    //Cars
    const getCars = async () => {
        await fetchData('cars/published',
            function(data) {
                cars.value = data;
            },
            function(error) {
                console.error('Bir hata oluştu:', error);
            }
        );
    };
    const saveNewCar = () => {
        const files = document.getElementById('fileInputCar').files;
        const formData = new FormData();
        let images = [];
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
            images.push(files[i].name);
        }
        console.log(images);
        postFormData('admin/addCarImage', formData, function () {
            console.log('Başarılı');
        }, function (error) {
            console.error('Bir hata oluştu:', error);
        });
        postData('cars/create', {
            images: images,
            title: `${document.getElementById('brandSelect').options[document.querySelector('#brandSelect').selectedIndex].dataset.name} ${document.getElementById('carModel').value}`,
            brand: document.getElementById('brandSelect').value,
            category: document.getElementById('categorySelect').value,
            model: {
                name: document.getElementById('carModel').value,
                year: document.getElementById('carYear').value
            },
            description: document.getElementById('carDescription').value,
            people: document.getElementById('carPeople').value,
            capacity: document.getElementById('carCapacity').value,
            gasoline: document.getElementById('carGasoline').value,
            kilometer: document.getElementById('carKilometer').value,
            age: document.getElementById('carAge').value,
            payment: 1,
            dailyPrice: document.getElementById('carDailyPrice').value
        }, function () {
            toast.success("Yeni Araba Eklendi", {
                timeout: 3000
            });
        }, function () {
            toast.error("Yeni Araba Eklenirken Hata", {
                timeout: 3000
            });
        }).then(() => {
            getCars();
        });
        closeCarModal();
    };
    const deleteCar = (carId) => {
        postData(`cars/delete/${carId}`, {}, function () {
            toast.success("Araba Kaldırıldı", {
                timeout: 3000
            });
        }, function () {
            toast.error("Araba Kaldırılırken Hata", {
                timeout: 3000
            });
        }).then(() => {
            getCars();
        });
    };
    const openCarModal = () => {
        document.getElementById('carModal').classList.add('open');
    };
    const closeCarModal = () => {
        document.getElementById('carModal').classList.remove('open');
        selectedImages.value = null;
        resetFormInputs();
    };

    //Company
    const getCompany = async () => {
        await fetchData('company/published',
            function(data) {
                data.map((item) => {
                    contactData.value = item.contact;
                    aboutData.value = item.about;
                    selectedImageContact.value = getCompanyImage(item.contact.img);
                    selectedImageAbout.value = getCompanyImage(item.about.img);
                });
            },
            function(error) {
                console.error('Bir hata oluştu:', error)
            }
        )
    }
    const updateCompany = () => {
        const fileContact = document.getElementById('fileInputContact').files[0];
        const fileAbout = document.getElementById('fileInputAbout').files[0];
        if (fileContact) {
            postFormData('admin/addCompanyImage', {
                file: fileContact
            }, function () {
                console.log('Başarılı');
            }, function (error) {
                console.error('Bir hata oluştu:', error);
            });
        }
        if (fileAbout) {
            postFormData('admin/addCompanyImage', {
                file: fileAbout
            }, function () {
                console.log('Başarılı');
            }, function (error) {
                console.error('Bir hata oluştu:', error);
            });
        }
        postData('company/update', {
            contact: {
                tel: document.getElementById('companyTel').value,
                fax: document.getElementById('companyFax').value,
                mail: document.getElementById('companyMail').value,
                address: document.getElementById('companyAddress').value,
                img: fileContact ? fileContact.name : contactData.value.img
            },
            about: {
                header: document.getElementById('aboutHeader').value,
                description: document.getElementById('companyAbout').value,
                vision: document.getElementById('aboutVision').value,
                mission: document.getElementById('aboutMision').value,
                img: fileAbout ? fileAbout.name : aboutData.value.img
            }
        }, function () {
            toast.success("Şirket Bilgileri Güncellendi", {
                timeout: 3000
            });
        }, function () {
            toast.error("Şirket Bilgileri Güncellenirken Hata", {
                timeout: 3000
            });
        }).then(() => {
            getCompany();
        });
    }
    const clearContact = () => {
        selectedImageContact.value = null;
        document.getElementById('fileInputContact').value = null;
    };
    const clearAbout = () => {
        selectedImageAbout.value = null;
        document.getElementById('fileInputAbout').value = null;
    };

    //Ready
    onMounted(() => {
        //Requests
        getBanners();
        getBrands();
        getCategory();
        getCars();
        getCompany();
        //Tabs
        const tabs = document.querySelectorAll('.adminTabs span');
        const settingsContents = document.querySelectorAll('.settingsContent');
        console.log(tabs)
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(tab => tab.classList.remove('selected'));
                tab.classList.add('selected');
                settingsContents.forEach(settingsContent => settingsContent.style.display = 'none');
                const number = tab.dataset.number;
                const settingsContent = document.querySelector(`.settingsContent[data-number="${number}"]`);
                settingsContent.style.display = 'flex';
            });
        });
        document.querySelector('.adminTabs span[data-number="1"]').click();
    });
</script>

<template>
    <div class="adminTabs w-full flex items-center justify-around p-[16px] text-[18px] md:px-0">
        <span data-number="1">Afişler</span>
        <span data-number="2">Markalar</span>
        <span data-number="3">Arabalar</span>
        <span data-number="4">Şirket</span>
    </div>
    <!-- Afişler -->
    <div data-number="1" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Afişler</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                <div v-for="banner in banners" :key="banner.bannerId" class="itemCard w-[360px] h-[120px] rounded-[10px] overflow-hidden cursor-pointer relative">
                    <img :src="getBannerImage(banner.src)" :alt="banner.title" class="w-full h-full object-cover">
                    <button @click="deleteBanner(banner.bannerId)" class="gelatine deleteItem absolute top-[4px] right-[4px] py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                </div>
                <div @click="openBannerModal" class="w-[360px] h-[120px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                    <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                        <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Markalar -->
    <div data-number="2" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Markalar</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[20px] flex-wrap p-[10px]">
                <div v-for="brand in brands" :key="brand.brandId" class="itemCard w-[100px] h-[100px] p-[10px] rounded-[10px] overflow-hidden cursor-pointer relative border-main border-[1px]">
                    <img :src="getBrandImage(brand.logo)" :alt="brand.name" class="w-full h-full object-cover">
                    <button @click="deleteBrand(brand.brandId)" class="gelatine deleteItem absolute top-[4px] right-[4px] py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                </div>
                <div @click="openBrandModal" class="w-[100px] h-[100px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                    <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                        <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Arabalar -->
    <div data-number="3" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Arabalar</h1>
            <hr class="mb-[10px]">
            <div class="flex items-center justify-center gap-[10px] flex-wrap p-[10px]">
                <div v-for="car in cars" :key="car.id" class="itemCard car-card rounded-[12px] border-[1px] border-main w-[228px] p-[10px] flex flex-col gap-[8px] bg-white shadow-md shadow-main-shadow relative cursor-pointer">
                    <button @click="deleteCar(car.carId)" class="gelatine deleteItem absolute top-[4px] right-[4px] py-[1px] px-[8px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']"/></button>
                    <img v-if="getBrand(car.brand)" class="absolute top-[12px] left-[12px] w-[30px]" :src="getBrand(car.brand).logo" :alt="getBrand(car.brand).name" :title="getBrand(car.brand).name">
                    <img class="h-[90px] object-contain" :src="getCarImage(car.image)" :alt="car.title">
                    <div class="flex justify-center items-center px-[10px] pt-[8px] border-t-[1px] border-t-main">
                        <span class="text-[18px] text-center text-main">{{ car.title }}</span>
                    </div>
                </div>
                <div @click="openCarModal" class="w-[228px] h-[156px] rounded-[10px] overflow-hidden border-[1px] border-main bg-main-shadow flex justify-center items-center cursor-pointer">
                    <div class="border-main border-[2px] rounded-[50%] text-main bg-white w-[50px] h-[50px] shadow-sm shadow-main flex justify-center items-center">
                        <font-awesome-icon icon="fa-solid fa-plus" size="2xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Şirket -->
    <div data-number="4" class="settingsContent w-full flex-col gap-[20px] py-[20px]">
        <div class="w-full">
            <h1 class="text-[20px] text-main dark:text-white">Şirket</h1>
            <hr class="mb-[10px]">
            <div id="companyInfo" class="flex gap-[10px] flex-wrap justify-center items-start p-[10px] mt-[12px] border-[1px] rounded-[10px]">
                <div v-if="aboutData" class="containImageSelector flex flex-col gap-[10px] p-[20px] w-[58%] md:w-full">
                    <h1 class="text-[20px] text-main dark:text-white w-full border-b-[1px] border-main-shadow pb-[4px]">Hakkında</h1>
                    <div class="w-full flex gap-[10px] sm:flex-col">
                        <div class="w-[60%] sm:w-full flex flex-col gap-[10px]">
                            <input :value="aboutData.header" type="text" id="aboutHeader" placeholder="Başlık" class="border-[1px] rounded-[6px] px-[12px] py-[px]">
                            <textarea :value="aboutData.description" id="companyAbout" placeholder="Hakkında" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[155px]"></textarea>
                            <textarea :value="aboutData.vision" id="aboutVision" placeholder="Vizyonumuz" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[155px]"></textarea>
                            <textarea :value="aboutData.mission" id="aboutMision" placeholder="Misyonumuz" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[155px]"></textarea>
                        </div>
                        <div class="w-[40%] sm:w-full">
                            <input type="file" id="fileInputAbout" ref="fileInputAbout" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp">
                            <div id="AboutImage" class="w-full h-full border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                                <div v-if="!selectedImageAbout" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                                    <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                                    <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                                </div>
                                <div v-else class="w-full h-full rounded-[6px] overflow-hidden relative">
                                    <button @click="clearAbout()" class="gelatine clearItem absolute top-[8px] right-[8px] py-[8px] px-[12px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']" size="xl"/></button>
                                    <img :src="selectedImageAbout" alt="Contact" class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="contactData" class="containImageSelector flex flex-col gap-[10px] p-[20px] w-[38%] md:w-full">
                    <h1 class="text-[20px] text-main dark:text-white w-full border-b-[1px] border-main-shadow pb-[4px]">İletişim</h1>
                    <input :value="contactData.tel" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" id="companyTel" placeholder="Telefon" class="border-[1px] rounded-[6px] px-[12px] py-[4px]">
                    <input :value="contactData.fax" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}" id="companyFax" placeholder="Fax" class="border-[1px] rounded-[6px] px-[12px] py-[4px]">
                    <input :value="contactData.mail" type="email" id="companyMail" placeholder="Email" class="border-[1px] rounded-[6px] px-[12px] py-[4px]">
                    <textarea :value="contactData.address" id="companyAddress" placeholder="Adres" class="border-[1px] rounded-[6px] px-[12px] py-[6px] min-h-[80px]"></textarea>
                    <input type="file" id="fileInputContact" ref="fileInputContact" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp">
                    <div id="ContactImage" class="w-full h-[300px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                        <div v-if="!selectedImageContact" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                            <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                            <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                        </div>
                        <div v-else class="w-full h-full rounded-[6px] overflow-hidden relative">
                            <button @click="clearContact()" class="gelatine clearItem absolute top-[8px] right-[8px] py-[8px] px-[12px] text-white bg-second rounded-[10px]"><font-awesome-icon :icon="['fas', 'trash-can']" size="xl"/></button>
                            <img :src="selectedImageContact" alt="Contact" class="w-full h-full object-cover">
                        </div>
                    </div>
                </div>
                <button @click="updateCompany()" class="w-[420px] md:w-[90%] pb-[6px] pt-[2px] border-[1px] rounded-[20px] border-second-shadow shadow-md shadow-second-shadow bg-second text-white text-[22px] font-bold">Kaydet</button>
            </div>
            
        </div>
    </div>

    <!-- Modals -->
    <!-- Banner -->
    <div id="bannerModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[800px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Banner Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeBannerModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
            <form class="flex flex-col gap-[10px] p-[10px]" enctype="multipart/form-data" method="POST">
                <div class="containImageSelector relative">
                    <input type="file" id="fileInputBanner" ref="fileInputBanner" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp" required>
                    <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                        <div v-if="!selectedImage" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                            <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                            <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                        </div>
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
    <div id="brandModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[400px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Marka Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeBrandModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
            <form class="flex flex-col gap-[10px] p-[10px]" enctype="multipart/form-data" method="POST">
                <div class="containImageSelector relative">
                    <input type="file" id="fileInputBrand" ref="fileInputBrand" @change="handleFileChange" class="formInputs hidden" accept=".jpg, .jpeg, .png, .webp" required>
                    <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                        <div v-if="!selectedImage" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                            <span class="text-[18px]">Resim seçin veya sürükleyip bırakın</span>
                            <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                        </div>
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
    <div id="carModal" class="z-20 fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)] justify-center items-center">
        <div class="bg-white w-[800px] rounded-[10px] relative border-[1px] border-main-shadow shadow-lg shadow-main-shadow max-w-[95%]">
            <div class="justify-between items-center px-[16px] py-[10px] border-b-[1px] shadow-md border-main-shadow">
                <h1 class="text-[20px] text-main font-[600]">Araba Ekle</h1>
                <button class="absolute top-[-11px] right-[-13px] text-second" @click="closeCarModal"><font-awesome-icon :icon="['fas', 'circle-xmark']" size="2xl" class="bg-white rounded-[50%] shadow-lg shadow-second-shadow"/></button>
            </div>
            <form class="flex flex-col gap-[10px] p-[10px]" action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" id="fileInputCar" ref="fileInputCar" name="files[]" @change="handleFileChange" accept=".jpg, .jpeg, .png, .webp" class="formInputs hidden" multiple>
                <div class="w-full h-[240px] border-[1px] rounded-[6px] flex justify-center items-center cursor-pointer" @click="triggerFileInput" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
                    <div v-if="!selectedImages" class="flex flex-col gap-[10px] justify-center items-center text-center text-second">
                        <span class="text-[18px]">Araba resimlerini seçmek için tıklayın</span>
                        <font-awesome-icon icon="fa-solid fa-upload" size="xl" />
                    </div>
                    <div v-else class="w-full h-full rounded-[6px] overflow-hidden flex flex-wrap p-[10px]">
                        <img v-for="image in selectedImages" :key="image" :src="image" alt="Selected Images" class="w-[50%] h-[50%] object-cover p-[2px]">
                    </div>
                </div>
                <select name="categories" id="categorySelect" class="formSelects w-full text-[17px] text-[#333] dark:text-[#eee] bg-transparent border-[1px] rounded-[6px] p-[4px]">
                    <option value=0 selected>Kategori Seçimi</option>
                    <option v-for="category in categories" :key="category.catId" :value="category.catId" :data-name="category.name">{{ category.name }}</option>
                </select>
                <select name="brands" id="brandSelect" class="formSelects w-full text-[17px] text-[#333] dark:text-[#eee] bg-transparent border-[1px] rounded-[6px] p-[4px]">
                    <option value=0 selected>Marka Seçimi</option>
                    <option v-for="brand in brands" :key="brand.brandId" :value="brand.brandId" :data-name="brand.name">{{ brand.name }}</option>
                </select>
                <div class="w-full flex items-center gap-[2%]">
                    <input id="carModel" type="text" placeholder="Model" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                    <input id="carYear" type="number" placeholder="Sene" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                </div>
                <textarea id="carDescription" class="formInputs border-[1px] px-[12px] py-[6px] rounded-[6px]" placeholder="Açıklama"></textarea>
                <div class="w-full flex items-center gap-[2%]">
                    <input id="carPeople" type="number" placeholder="Kişi Kapasitesi" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                    <input id="carCapacity" type="number" placeholder="Bagaj Kapasitesi" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                </div>
                <div class="w-full flex items-center gap-[2%]">
                    <input id="carKilometer" type="number" placeholder="Kilometre" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                    <select id="carGasoline" class="formSelects w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                        <option value="0" selected>Yakıt Seçimi</option>
                        <option value="1">Benzin</option>
                        <option value="2">Dizel</option>
                        <option value="3">LPG</option>
                        <option value="4">Elektrik</option>
                    </select>
                </div>
                <div class="w-full flex items-center gap-[2%]">
                    <input id="carAge" type="number" placeholder="Yaş Sınırı" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                    <input id="carDailyPrice" type="number" placeholder="Günlük Ücret" class="formInputs w-[49%] border-[1px] text-center p-[2px] rounded-[6px]">
                </div>
                <div class="flex justify-center items-center"><button type="button" @click="saveNewCar" class="bg-second w-[120px] p-[4px] text-[17px] text-white rounded-[10px]">Kaydet</button></div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .itemCard:hover .deleteItem {
        opacity: 1;
    }
    .deleteItem {
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
    .formInputs {
        color: #333;
    }
    .formSelects {
        color: #333;
    }
    #companyInfo input, #companyInfo textarea {
        color: #333;
    }
    .settingsContent {
        display: none;
    }
    .adminTabs span {
        cursor: pointer;
        color: #EE605F;
        padding: 4px 12px;
        border: 1px solid #EE605F;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 2px 2px 8px #ee5d5d5e;
    }
    .adminTabs span.selected {
        background-color: #EE605F;
        color: white;
    }
</style>