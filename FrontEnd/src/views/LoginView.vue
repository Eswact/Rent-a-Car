<script setup>
import { ref } from 'vue';
import { postData } from '../scripts/ajax';
import { setlocalstorage } from '../scripts/common';

let username = ref('');
let password = ref('');

const submitForm = () => {
    if (username.value == '' || password.value == '') {
        alert('Lütfen tüm alanları doldurunuz!');
        return false;
    }
    else {
        postData('admin/login', { username: username.value, password: password.value }, 
            function () {
                setlocalstorage('user', username.value);
                window.location.href = '/admin';
            }, 
            function (error) {
                alert('Giriş başarısız! :' + error.message);
            });
    }
};
</script>

<template>
    <div class="w-full h-[100vh] flex justify-center items-center">
        <div class="border-[1px] border-main rounded-[18px] sm:border-0  w-[400px] h-[400px] sm:w-full sm:h-full flex flex-col gap-[20px] p-4 justify-center items-center">
            <div class="flex flex-col justify-center items-center gap-[10px]">
                <img class="w-[100px] h-[100px] rounded-[50%] mx-auto" src="../assets/media/logo.jpg" alt="logo">
                <h1 class="text-center text-2xl font-semibold">Admin Panel</h1>
            </div>
            <form class="w-full flex flex-col justify-center items-center gap-[20px] p-[20px]">
                <input type="text" name="username" autocomplete="on" v-model="username" placeholder="Kullanıcı Adı" class="p-2 border rounded w-full"  required/>
                <input type="password" name="password" autocomplete="on" v-model="password" placeholder="Parola" class="p-2 border rounded w-full"  required/>
                <button type="submit" @click.prevent="submitForm" class="p-2 bg-blue-500 text-white rounded w-full">Oturum Aç</button>
            </form>
        </div>
    </div>
</template>