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

const { email, password, toggle, loginSchema } = useForm()

onMounted(() => {
  if (!isNil(auth.user)) {
    router.push('/dashboard')
  }
})

const login = async (payload) => {
  await auth.login(payload.email, payload.password)
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
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-zinc-600">
        Or
        <router-link
          to="/register"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          create an account
        </router-link>
      </p>
    </div>
    <div class="mt-8">
      <!-- <div>
        <div>
          <button
            class="px-6 py-3 mt-4 w-full font-semibold text-zinc-600 bg-white border-2 border-zinc-300 rounded-md outline-none hover:bg-zinc-100 focus:outline-none"
            @click="signInWithGoogle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="inline w-5 h-5 mr-3 text-zinc-900 fill-current"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div class="relative mt-6">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-zinc-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-zinc-50 px-2 text-zinc-500">Or continue with</span>
          </div>
        </div>
      </div> -->

      <div>
        <Form
          v-slot="{ errors }"
          :validation-schema="loginSchema"
          data-test="form"
          @submit="login"
          @keyup.enter="login"
        >
          <div class="my-4">
            <label for="email" class="block text-sm font-medium text-zinc-700">
              Email address
            </label>
            <div class="mt-1">
              <Field
                v-model="email"
                data-test="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <span class="mb-2 text-xs capitalize text-red-600">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div class="my-4">
            <label
              for="password"
              class="block text-sm font-medium text-zinc-700"
            >
              Password
            </label>
            <div class="mt-1 relative">
              <Field
                v-model="password"
                data-test="password"
                name="password"
                :type="!toggle ? 'password' : 'text'"
                autocomplete="current-password"
                class="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              <div class="absolute inset-y-2 right-0 pr-3">
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

          <div class="flex items-center justify-between my-8">
            <div class="text-sm">
              <router-link
                to="/forgot-password"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </router-link>
            </div>
          </div>

          <ButtonAction text="Log In" />
        </Form>
      </div>
    </div>
  </div>
</template>
