<script setup>
import { storeToRefs } from 'pinia'
import { useFirebaseAuth } from '@/stores/auth'
import { useApp } from '@/stores/app'
import { useRouter } from 'vue-router'
import MobileMenu from '@/components/Navigation/HomeMenuMobile.vue'
import ButtonAction from '@/components/Elements/ButtonAction.vue'
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
  <div
    class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
  >
    <div
      class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-zinc-100 divide-y-2 divide-zinc-50"
    >
      <div class="pt-5 pb-6 px-5">
        <div class="flex items-center justify-between">
          <div>
            <router-link to="/">
              <!-- <img
                class="h-16 w-auto text-blue-700"
                src="@/assets/logo.png"
                @click="toggleHomeMobileMenu"
              /> -->
            </router-link>
          </div>
          <div class="-mr-2">
            <button
              type="button"
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              @click="app.toggleHomeMobileMenu"
            >
              <span class="sr-only">Close menu</span>
              <!-- Heroicon name: outline/x -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="border-zinc-200">
        <div>
          <div class="text-center p-6">
            <ButtonAction
              v-if="!auth.isUserLoggedIn"
              text="Login"
              class="w-full flex items-center justify-center"
              to="/login"
              navigation-button
            />
            <ButtonAction
              v-if="auth.isUserLoggedIn"
              text="Dashboard"
              class="w-full flex items-center justify-center"
              to="/dashboard"
              navigation-button
            />

            <a
              v-if="auth.isUserLoggedIn"
              class="whitespace-nowrap text-base font-medium text-zinc-500 hover:text-zinc-900 cursor-pointer text-center w-full flex items-center justify-center pt-4"
              @click="logout"
            >
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
