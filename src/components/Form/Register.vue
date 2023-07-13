<script setup>
import { onMounted } from 'vue'
import { isNil } from 'lodash'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { useForm } from '@/composables/useForm'
import ButtonAction from '@/components/Elements/ButtonAction.vue'
import { useFirebaseAuth } from '@/stores/auth'
import { useApp } from '@/stores/app'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useFirebaseAuth()
const app = useApp()

const {
  email,
  password,
  displayName,
  passwordConfirmation,
  toggle,
  registerSchema
} = useForm()

onMounted(() => {
  if (!isNil(auth.user)) {
    router.push('/dashboard')
  }
})

const register = async (payload) => {
  await auth.register(
    payload.displayName,
    payload.email,
    payload.password,
    'merchant'
  )
  if (!isNil(auth.user)) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div>
    <div>
      <img class="h-12 w-auto" src="@/assets/media/logo.svg" />
      <h2 class="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        Create An Account
      </h2>
      <p class="mt-2 text-sm text-zinc-600">
        Or
        <router-link
          to="/login"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          login to an existing account
        </router-link>
      </p>
    </div>
    <div class="mt-8">
      <Form
        v-slot="{ errors }"
        :validation-schema="registerSchema"
        data-test="form"
        @submit="register"
        @keyup.enter="register"
      >
        <div class="my-4">
          <label for="email" class="block text-sm font-medium text-zinc-700">
            Name
          </label>
          <div class="mt-1">
            <Field
              v-model="displayName"
              data-test="displayName"
              name="displayName"
              type="text"
              class="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <span class="mb-2 text-xs capitalize text-red-600">
            <ErrorMessage name="displayName" />
          </span>
        </div>
        <div class="my-4">
          <label for="email" class="block text-sm font-medium text-zinc-700">
            Email address
          </label>
          <div class="mt-1">
            <Field
              v-model="email"
              data-test="email"
              name="email"
              type="text"
              autocomplete="email"
              class="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <span class="mb-2 text-xs capitalize text-red-600">
            <ErrorMessage name="email" />
          </span>
        </div>

        <div class="my-4">
          <label for="password" class="block text-sm font-medium text-zinc-700">
            Password
          </label>
          <div class="mt-1 relative">
            <Field
              v-model="password"
              data-test="password"
              name="password"
              :type="!toggle ? 'password' : 'text'"
              class="block w-full appearance-none rounded-md border border-zinc-300 pl-3 py-2 pr-16 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
            <div class="absolute inset-y-2 right-0 pr-8">
              <div class="flex items-center" @click="toggle = !toggle">
                <EyeIcon v-if="toggle" class="h-6 w-6 text-zinc-500" />
                <EyeSlashIcon v-else class="h-6 w-6 text-zinc-500" />
              </div>
            </div>
          </div>

          <span class="mb-2 text-xs capitalize text-red-600">
            <ErrorMessage name="password" />
          </span>
        </div>

        <div class="my-4">
          <label for="password" class="block text-sm font-medium text-zinc-700">
            Password Confirmation
          </label>
          <div class="mt-1 relative">
            <Field
              v-model="passwordConfirmation"
              data-test="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              class="block w-full appearance-none rounded-md border border-zinc-300 pl-3 py-2 pr-16 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <span class="mb-2 text-xs capitalize text-red-600">
            <ErrorMessage name="passwordConfirmation" />
          </span>
        </div>
        <ButtonAction text="Register" />
      </Form>
    </div>
  </div>
</template>
