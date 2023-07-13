<script setup>
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import ReloadPWA from '@/components/Alerts/ReloadPWAPrompt.vue'
import Alert from '@/components/Alerts/Alert.vue'
import HomeNavBar from '@/components/Navigation/HomeNavBar.vue'
import SidebarClose from '@/components/Navigation/SidebarClose.vue'
import SidebarMobile from '@/components/Navigation/SidebarMobile.vue'
import SidebarDesktop from '@/components/Navigation/SidebarDesktop.vue'
import DashboardTopNav from '@/components/Navigation/DashboardTopNav.vue'
import { useApp } from '@/stores/app'
import { useFirebaseAuth } from '@/stores/auth'
const { user, isEmailVerified } = storeToRefs(useFirebaseAuth())
const { nav, mobileMenu, padding } = storeToRefs(useApp())
const app = useApp()

onBeforeMount(() => {
  app.toggleModal(null)
  app.clearNotifications()
  app.appLoadingComplete()
  app.moduleLoadingComplete()
})
</script>

<template>
  <div>
    <div v-if="nav === 'none'">
      <main class="absolute inset-0">
        <Alert class="z-50" />
        <ReloadPWA class="z-50" />
        <router-view />
      </main>
    </div>
    <div v-if="nav === 'home'" class="min-h-screen flex flex-col">
      <HomeNavBar v-if="nav === 'home'" class="z-50" />
      <div class="flex-grow">
        <Alert class="z-50" />
        <ReloadPWA class="z-50" />
        <router-view />
      </div>
    </div>
    <div v-if="nav === 'dashboard' && user" class="relative h-screen flex">
      <div
        class="transition-opacity ease-linear duration-300 fixed inset-0 flex md:hidden"
        role="dialog"
        aria-modal="true"
        :class="!mobileMenu ? 'hidden opacity-0 z-40' : 'opacity-100 z-40'"
      >
        <div
          class="transition-opacity ease-linear duration-300 fixed inset-0 bg-zinc-600 bg-opacity-75"
          aria-hidden="true"
          :class="!mobileMenu ? 'opacity-0' : 'opacity-100'"
          @click="app.toggleMobileMenu"
        ></div>
        <div
          class="transition ease-in-out duration-300 transform relative flex-1 flex flex-col max-w-xs w-full"
          :class="!mobileMenu ? '-translate-x-full' : 'translate-x-0'"
        >
          <SidebarClose
            :class="!mobileMenu ? 'opacity-0' : 'opacity-100'"
            @click.native="app.toggleMobileMenu"
          />
          <SidebarMobile />
        </div>
        <div class="flex-shrink-0 w-14"></div>
      </div>

      <div class="hidden md:flex md:flex-shrink-0 z-20 w-32 fixed inset-y-0">
        <div class="flex flex-col w-full">
          <SidebarDesktop />
        </div>
      </div>
      <div class="w-full md:pl-32">
        <div class="fixed top-0 right-0 left-0 z-10">
          <DashboardTopNav :class="mobileMenu ? 'z-0' : 'z-40'" />
        </div>
        <main class="flex-1 relative focus:outline-none mt-16">
          <div
            :class="
              padding
                ? 'mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12'
                : ''
            "
          >
            <Alert class="z-50" />
            <ReloadPWA class="z-50" />
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
