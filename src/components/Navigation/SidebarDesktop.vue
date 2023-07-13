<script setup>
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex flex-col h-0 flex-1 border-r-2 bg-zinc-50">
    <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
      <div class="flex mx-auto flex-shrink-0 px-4">
        <router-link to="/dashboard">
          <img class="w-auto" src="@/assets/media/logo.svg" />
        </router-link>
      </div>
      <nav class="mt-6 w-full flex-1 space-y-1">
        <router-link
          to="/dashboard"
          class="link text-zinc-700 hover:bg-zinc-200 group w-full p-3 flex flex-col items-center text-xs font-medium"
        >
          <HomeIcon class="link flex-shrink-0 h-6 w-6" />
          <span class="mt-2">Home</span>
        </router-link>
        <router-link
          to="/dashboard/settings"
          class="link text-zinc-700 hover:bg-zinc-200 group w-full p-3 flex flex-col items-center text-xs font-medium"
        >
          <Cog6ToothIcon class="link flex-shrink-0 h-6 w-6" />
          <span class="mt-2">Settings</span>
        </router-link>
        <router-link
          to="/dashboard/contact"
          class="link text-zinc-700 hover:bg-zinc-200 group w-full p-3 flex flex-col items-center text-xs font-medium"
        >
          <QuestionMarkCircleIcon class="link flex-shrink-0 h-6 w-6" />
          <span class="mt-2">Help</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.router-link-active.link {
  --tw-text-opacity: 1;
  border-left: 4px solid #f59e0b !important;
  background-color: #fffbeb !important;
  color: #f59e0b !important;
}
</style>
