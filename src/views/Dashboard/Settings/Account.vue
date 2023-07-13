<script setup>
import { storeToRefs } from 'pinia'
import UpdatePasswordModal from '@/components/Modals/UpdatePasswordModal.vue'
import UpdateDisplayNameModal from '@/components/Modals/UpdateDisplayNameModal.vue'
import UpdateEmailModalWithAuth from '@/components/Modals/UpdateEmailModalWithAuth.vue'
import { useApp } from '@/stores/app'
import { useFirebaseAuth } from '@/stores/auth'
const { user } = storeToRefs(useFirebaseAuth())
const app = useApp()
const auth = useFirebaseAuth()
</script>

<template>
  <div class="mt-10 divide-y divide-zinc-200">
    <div class="mt-6">
      <dl class="divide-y divide-zinc-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt class="text-sm font-medium text-zinc-500">Name</dt>
          <dd class="mt-1 flex text-sm text-zinc-800 sm:mt-0 sm:col-span-2">
            <span class="flex-grow">{{ user.displayName }}</span>
            <p
              class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              @click="app.toggleModal('displayName')"
            >
              Edit
            </p>
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
          <dt class="text-sm font-medium text-zinc-500">Email</dt>
          <dd class="mt-1 flex text-sm text-zinc-800 sm:mt-0 sm:col-span-2">
            <span class="flex-grow">{{ user.email }}</span>
            <p
              class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              @click="app.toggleModal('email')"
            >
              Edit
            </p>
          </dd>
        </div>
        <div
          v-if="auth.authProvider === 'password'"
          class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
        >
          <dt class="text-sm font-medium text-zinc-500">Password</dt>
          <dd class="mt-1 flex text-sm text-zinc-800 sm:mt-0 sm:col-span-2">
            <span class="flex-grow">***********</span>
            <p
              class="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
              @click="app.toggleModal('password')"
            >
              Edit
            </p>
          </dd>
        </div>
      </dl>
    </div>
    <UpdatePasswordModal />
    <UpdateDisplayNameModal />
    <UpdateEmailModalWithAuth />
  </div>
</template>
