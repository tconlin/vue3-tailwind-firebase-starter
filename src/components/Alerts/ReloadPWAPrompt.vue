<script setup>
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast fixed right-0 bottom-0 m-8 p-6 text-left rounded-xl shadow-xl bg-zinc-100 z-50 border border-zinc-800"
    role="alert"
  >
    <div class="message mb-2 text-zinc-700">
      <span v-if="offlineReady">App ready to work offline</span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button
      class="bg-blue-500 rounded-lg text-white font-medium mr-2 hover:bg-blue-400 px-4 py-2"
      v-if="needRefresh"
      @click="updateServiceWorker()"
    >
      Reload
    </button>
    <button
      class="border-blue-500 rounded-lg text-blue-500 font-medium mr-2 hover:border-blue-400 hover:text-blue-400 px-4 py-2"
      @click="close"
    >
      Close
    </button>
  </div>
</template>

<style>
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
