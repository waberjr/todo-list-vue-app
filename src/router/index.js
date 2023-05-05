import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import AuthView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import VerifyEmailView from '@/views/auth/VerifyEmailView.vue';
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue';
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue';
import Guard from '../service/middleware';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: Guard.redirectIfNotAuthenticated
    },
    {
      path: '/login',
      name: 'login',
      component: AuthView,
      beforeEnter: Guard.redirectIfAuthenticated
    },
    {
      path: '/cadastrar',
      name: 'register',
      component: RegisterView,
      beforeEnter: Guard.redirectIfAuthenticated
    },
    {
      path: '/verificar-email',
      name: 'verifyEmail',
      component: VerifyEmailView,
      beforeEnter: Guard.redirectIfAuthenticated
    },
    {
      path: '/esqueci-senha',
      name: 'forgotPassword',
      component: ForgotPasswordView,
      beforeEnter: Guard.redirectIfAuthenticated
    },
    {
      path: '/recuperar-senha',
      name: 'resetPassword',
      component: ResetPasswordView,
      beforeEnter: Guard.redirectIfAuthenticated
    }
  ]
})

export default router