<script setup>
import { storeToRefs } from 'pinia'
import {
  Cog6ToothIcon,
  HomeIcon,
  UserGroupIcon,
  CreditCardIcon,
  ScissorsIcon,
  TagIcon,
  BuildingStorefrontIcon,
  RectangleStackIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  InboxArrowDownIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'
import { useFirebaseAuth } from '@/stores/auth'

const { accessRights } = storeToRefs(useFirebaseAuth())
</script>

<template>
  <div class="flex flex-col h-0 flex-1 bg-zinc-50">
    <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4">
        <router-link to="/dashboard">
          <img class="w-auto" src="@/assets/media/logo.svg" />
        </router-link>
      </div>
      <div class="mt-5 h-0 flex-1 overflow-y-auto">
        <nav @click="app.toggleMobileMenu" class="flex h-full flex-col">
          <div class="space-y-1">
            <router-link
              to="/dashboard"
              class="link text-zinc-700 hover:bg-zinc-200 group py-2 px-3 flex items-center text-sm font-medium"
            >
              <HomeIcon class="link group-hover:bg-zinc-200 mr-3 h-6 w-6" />
              <span>Home</span>
            </router-link>
            <router-link
              to="/dashboard/settings"
              class="link text-zinc-700 hover:bg-zinc-200 group py-2 px-3 flex items-center text-sm font-medium"
            >
              <Cog6ToothIcon
                class="link group-hover:bg-zinc-200 mr-3 h-6 w-6"
              />
              <span>Settings</span>
            </router-link>
            <router-link
              to="/dashboard/contact"
              class="link text-zinc-700 hover:bg-zinc-200 group py-2 px-3 flex items-center text-sm font-medium"
            >
              <QuestionMarkCircleIcon
                class="link group-hover:bg-zinc-200 mr-3 h-6 w-6"
              />
              <span>Help</span>
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active.link {
  --tw-text-opacity: 1;
  border-left: 4px solid #2563eb !important;
  background-color: #bfdbfe25 !important;
  color: #2563eb !important;
}
</style>
