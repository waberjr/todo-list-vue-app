<script setup>
import { RouterView } from 'vue-router'
import PrincipalHeader from './components/PrincipalHeader.vue';
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 md:h-screen">
    <PrincipalHeader></PrincipalHeader>

    <RouterView />
  </section>
</template>
