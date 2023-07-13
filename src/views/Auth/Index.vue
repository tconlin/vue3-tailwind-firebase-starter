<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import Login from '@/components/Form/Login.vue'
import Register from '@/components/Form/Register.vue'
import ForgotPassword from '@/components/Form/ForgotPassword.vue'
import Loader from '@/components/Alerts/LoadingDarkLarge.vue'
import { useApp } from '@/stores/app'
const { appLoading } = storeToRefs(useApp())
const router = useRouter()
const { currentRoute } = router
</script>

<template>
  <div class="flex h-screen">
    <div
      class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <Loader v-if="appLoading" />
        <div v-if="!appLoading">
          <Login v-if="currentRoute.name === 'login'" />
          <Register v-if="currentRoute.name === 'register'" />
          <ForgotPassword v-if="currentRoute.name === 'forgot-password'" />
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 md:block gradient-background"></div>
  </div>
</template>

<style scoped>
.gradient-background {
  background: linear-gradient(-45deg, #92ead8, #adc9ed, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
