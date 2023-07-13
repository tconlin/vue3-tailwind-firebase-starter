<script setup>
import { storeToRefs } from 'pinia'
import { useFirebaseAuth } from '@/stores/auth'
import { useApp } from '@/stores/app'
import { useRouter } from 'vue-router'
import MobileMenu from '@/components/Navigation/HomeMenuMobile.vue'
import ButtonAction from '@/components/Elements/ButtonAction.vue'
import { Bars3BottomLeftIcon } from '@heroicons/vue/24/outline'
const auth = useFirebaseAuth()
const app = useApp()
const { user } = storeToRefs(useFirebaseAuth())
const { homeMobileMenu } = storeToRefs(useApp())
const router = useRouter()

const logout = async () => {
  await auth.handleSignOut()
  router.push('/')
}
</script>

<template>
  <div class="relative p-12 bg-opacity-50">
    <div
      class="flex justify-between items-center max-w-7xl mx-auto px-4 py-2 sm:px-6 md:justify-start md:space-x-10 lg:px-8"
    >
      <div class="-mr-2 -my-2 md:hidden">
        <button
          type="button"
          class="bg-white rounded-md p-2 inline-flex items-center justify-center text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-expanded="false"
          @click="app.toggleHomeMobileMenu"
        >
          <span class="sr-only">Open menu</span>
          <Bars3BottomLeftIcon class="w-6 h-6" />
        </button>
      </div>
      <div class="justify-end hidden md:flex md:flex-1 items-center">
        <!-- <router-link
          v-if="!auth.isUserLoggedIn"
          class="whitespace-nowrap text-base font-medium text-zinc-500 hover:text-zinc-900 cursor-pointer"
          to="/register"
        >
          Register
        </router-link> -->
        <ButtonAction
          v-if="!auth.isUserLoggedIn"
          text="Login"
          class="pl-4"
          to="/login"
          navigationButton
        />
        <a
          v-if="auth.isUserLoggedIn"
          class="whitespace-nowrap text-base font-medium text-zinc-500 hover:text-zinc-900 cursor-pointer"
          @click="logout"
        >
          Sign Out
        </a>
        <ButtonAction
          v-if="auth.isUserLoggedIn"
          text="Dashboard"
          class="pl-4"
          to="/dashboard"
          navigationButton
        />
      </div>
      <MobileMenu v-show="homeMobileMenu" />
    </div>
  </div>
</template>
