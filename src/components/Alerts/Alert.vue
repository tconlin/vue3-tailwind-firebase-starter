<script setup>
import { storeToRefs } from 'pinia'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid'
import { useApp } from '@/stores/app'
const app = useApp()
const { notifications } = storeToRefs(useApp())
</script>

<template>
  <div
    v-if="notifications.length > 0"
    name="notification-list"
    tag="div"
    class="fixed top-0 right-0 left-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <div
        v-for="alert in notifications"
        :key="alert.id"
        aria-live="assertive"
        class="max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden"
        :class="
          alert.data.type == 'error'
            ? 'text-red-700 bg-red-100 border-red-300'
            : 'text-green-700 bg-green-100 border-green-300'
        "
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <CheckCircleIcon
                v-show="alert.data.type == 'success'"
                class="text-green-700"
              />
              <ExclamationCircleIcon
                v-show="alert.data.type == 'error'"
                class="text-red-700"
              />
            </div>

            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium">
                {{ alert.data.title }}
              </p>

              <p class="mt-1 text-sm">
                {{ alert.text }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                class="rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Close"
                @click="app.dismissNotification(alert.id)"
              >
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
