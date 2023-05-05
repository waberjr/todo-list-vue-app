import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cadastrar',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/verificar-email',
      name: 'verifyEmail',
      component: () => import('../views/VerifyEmailView.vue')
    }
  ]
})

export default router