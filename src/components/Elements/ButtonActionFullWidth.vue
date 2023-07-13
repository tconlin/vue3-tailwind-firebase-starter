<script setup>
import { storeToRefs } from 'pinia'
import Loader from '@/components/Alerts/LoadingLightSmall.vue'
import { useApp } from '@/stores/app'
const { appLoading, moduleLoading } = storeToRefs(useApp())

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
      v-if="appLoading || moduleLoading"
      disabled
      type="button"
      class="relative w-full items-center text-center px-8 py-3 text-md font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-sky-600 to-cyan-400"
    >
      <Loader />
    </button>
    <router-link
      v-if="!appLoading && !moduleLoading && navigationButton"
      :to="to"
      class="relative w-full items-center text-center px-8 py-3 text-md font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-sky-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
    >
      <span v-if="text">{{ text }}</span>
    </router-link>
    <button
      v-if="!appLoading && !moduleLoading && !navigationButton"
      type="submit"
      class="relative w-full items-center text-center px-8 py-3 text-md font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:from-sky-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
    >
      <span v-if="text">{{ text }}</span>
    </button>
  </div>
</template>
