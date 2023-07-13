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
      class="font-medium text-sm px-8 py-3 rounded-md shadow-sm text-blue-600 cursor-not-allowed text-center border-1 border-blue-600 pointer-events-none"
    >
      <Loader />
    </button>
    <router-link
      v-if="!appLoading && navigationButton"
      :to="to"
      class="font-medium text-sm px-8 py-3 rounded-md shadow-sm text-blue-600 hover:text-blue-400 cursor-pointer text-center border-1 border-blue-600 hover:border-blue-500"
    >
      <span>{{ text }}</span>
    </router-link>
    <button
      v-if="!appLoading && !navigationButton"
      type="button"
      class="font-medium text-sm px-8 py-3 rounded-md shadow-sm text-blue-600 hover:text-blue-400 cursor-pointer text-center border-1 border-blue-600 hover:border-blue-500"
    >
      <span>{{ text }}</span>
    </button>
  </div>
</template>
