import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/cars',
      name: 'cars',
      component: () => import('../views/CarsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/detail/:carId',
      name: 'detail',
      component: () => import('../views/CarDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        // Kullanıcı giriş yapmışsa devam et.
        if (isLoggedIn()) {
          next();
        } else {
          // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir.
          next('/login');
        }
      },
    },
  ]
})

export default router
