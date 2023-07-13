<script setup>
import { onMounted } from 'vue'
import { isNil } from 'lodash'
import { Form, Field } from 'vee-validate'
import { useForm } from '@/composables/useForm'
import ButtonAction from '@/components/Elements/ButtonAction.vue'
import { useFirebaseAuth } from '@/stores/auth'
import { useApp } from '@/stores/app'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useFirebaseAuth()
const app = useApp()

const { email, emailSchema } = useForm()

onMounted(() => {
  if (!isNil(auth.user)) {
    router.push('/dashboard')
  }
})

const resetPassword = async (payload) => {
  await auth.resetPassword(payload.email)
}
</script>

<template>
  <div>
    <div>
      <img class="h-12 w-auto" src="@/assets/media/logo.svg" />
      <h2 class="mt-6 text-3xl font-bold tracking-tight text-zinc-900">
        Reset Your Password
      </h2>
      <p class="mt-2 text-sm text-zinc-600">
        Or
        <router-link
          to="/login"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          login to your account
        </router-link>
      </p>
    </div>
    <div class="mt-8">
      <div class="mt-6">
        <Form
          v-slot="{ errors }"
          :validation-schema="emailSchema"
          data-test="form"
          @submit="resetPassword"
          @keyup.enter="resetPassword"
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
                type="text"
                autocomplete="email"
                class="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <span class="mb-2 text-xs capitalize text-red-600">
              <ErrorMessage name="email" />
            </span>
          </div>

          <ButtonAction text="Log In" />
        </Form>
      </div>
    </div>
  </div>
</template>
