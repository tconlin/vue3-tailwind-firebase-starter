<script setup>
import { storeToRefs } from 'pinia'
import { Bars3BottomLeftIcon, UserIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { useApp } from '@/stores/app'
import { useFirebaseAuth } from '@/stores/auth'
const { user } = storeToRefs(useFirebaseAuth())
const app = useApp()
const auth = useFirebaseAuth()
const router = useRouter()

const logout = async () => {
  await auth.handleSignOut()
  router.push('/')
}
</script>

<template>
  <div>
    <div
      class="relative z-10 flex-shrink-0 flex h-16 border-b border-zinc-200 bg-zinc-50"
    >
      <button
        class="px-4 border-r-2 border-zinc-200 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
        @click="app.toggleMobileMenu"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon class="h-6 w-6" />
      </button>
      <div class="flex items-center text-right ml-auto mr-8 md:mr-12">
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto"
        >
          <!-- Profile dropdown -->
          <Menu as="div" class="relative">
            <div>
              <MenuButton
                class="flex text-zinc-400 hover:text-zinc-500 cursor-pointer -m-2 p-2"
              >
                <div class="inline-block pr-4 text-right sm:block">
                  <p class="text-sm font-medium text-zinc-700 block">
                    {{ user.displayName }}
                  </p>
                  <p class="text-xs font-medium text-zinc-500 block">
                    {{ user.email }}
                  </p>
                </div>
                <UserIcon class="h-8 w-8" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg divide-y-1 divide-zinc-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem
                  v-slot="{ active }"
                  class="cursor-pointer text-right block sm:hidden"
                >
                  <div
                    :class="[
                      active ? 'bg-zinc-100' : '',
                      'block px-4 py-2 text-sm text-zinc-700'
                    ]"
                  >
                    <p class="text-sm font-medium text-zinc-700 block">
                      {{ user.displayName }}
                    </p>
                    <p class="text-xs font-medium text-zinc-500 block">
                      {{ user.email }}
                    </p>
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }" class="cursor-pointer">
                  <router-link
                    to="/dashboard/settings"
                    :class="[
                      active ? 'bg-zinc-100' : '',
                      'block px-4 py-2 text-sm text-zinc-700'
                    ]"
                  >
                    Settings
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }" class="cursor-pointer">
                  <a
                    @click.native="logout"
                    :class="[
                      active ? 'bg-zinc-100' : '',
                      'block px-4 py-2 text-sm text-zinc-700'
                    ]"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
