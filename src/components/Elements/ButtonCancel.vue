<script setup>
import { storeToRefs } from 'pinia'
import Loader from '@/components/Alerts/LoadingDarkSmall.vue'
import { useApp } from '@/stores/app'
const { appLoading } = storeToRefs(useApp())

defineProps({
  navigationButton: {
    type: Boolean,
    default: false
  },
  to: String,
  text: String,
  iconName: String
})
</script>

<template>
  <div>
    <button
      v-if="appLoading"
      disabled
      type="button"
      class="relative items-center text-center px-8 py-3 text-md border border-zinc-300 font-medium rounded-md shadow-sm bg-white text-base text-zinc-700 pointer-events-none cursor-not-allowed"
    >
      <Loader />
    </button>
    <router-link
      v-if="!appLoading && navigationButton"
      :to="to"
      class="relative items-center text-center cursor-pointer px-8 py-3 text-md border border-zinc-300 font-medium rounded-md shadow-sm bg-white text-base text-zinc-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      <span v-if="text">{{ text }}</span>
    </router-link>
    <button
      v-if="!appLoading && !navigationButton"
      type="button"
      class="relative items-center text-center cursor-pointer px-8 py-3 text-md border border-zinc-300 font-medium rounded-md shadow-sm bg-white text-base text-zinc-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
    >
      <span v-if="text">{{ text }}</span>
    </button>
  </div>
</template>
