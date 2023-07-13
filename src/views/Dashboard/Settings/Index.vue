<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Account from '@/views/Dashboard/Settings/Account.vue'
import { useApp } from '@/stores/app'

const app = useApp()
const router = useRouter()
const { currentRoute } = router

onMounted(() => {
  app.toggleModal(null)
})
</script>

<template>
  <div class="relative max-w-4xl mx-auto md:px-8 xl:px-0">
    <div class="pt-10 pb-16">
      <div class="px-4 sm:px-6 md:px-0">
        <h1 class="text-3xl font-extrabold text-zinc-900">Settings</h1>
      </div>
      <div class="px-4 sm:px-6 md:px-0">
        <div class="py-6">
          <div class="block">
            <div class="border-b border-zinc-200">
              <nav class="-mb-px flex space-x-8">
                <span
                  class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer"
                  :class="
                    currentRoute.name === 'settings-account'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                  "
                  @click="router.push({ path: '/dashboard/settings/account' })"
                >
                  Account
                </span>
              </nav>
            </div>
          </div>
          <Account v-if="currentRoute.name === 'settings-account'" />
        </div>
      </div>
    </div>
  </div>
</template>
