<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useApp } from '@/stores/app'
import { useFirebaseAuth } from '@/stores/auth'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { useForm } from '@/composables/useForm'
import Loader from '@/components/Alerts/LoadingDarkSmall.vue'
import CancelButton from '@/components/Elements/ButtonCancel.vue'
import ActionButton from '@/components/Elements/ButtonAction.vue'
const { modal, moduleLoading, modalData } = storeToRefs(useApp())
const app = useApp()
const auth = useFirebaseAuth()

const { email, password, emailWithAuthSchema, toggle } = useForm()

const update = async (payload) => {
  await auth.updateUserEmail(payload.email, payload.password)
  app.toggleModal(null)
}

const cancel = () => {
  app.toggleModal(null)
}
</script>

<template>
  <TransitionRoot appear :show="modal == 'email'" as="template">
    <Dialog as="div" @close="cancel" class="relative z-40">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <Loader v-if="moduleLoading" class="m-auto my-12" />
              <div
                v-if="!moduleLoading"
                class="sm:flex block m-auto align-center justify-center"
              >
                <Form
                  v-slot="{ errors }"
                  :validation-schema="emailWithAuthSchema"
                  data-test="form"
                  @submit="update"
                  @keyup.enter="update"
                >
                  <div class="my-4">
                    <label
                      for="password"
                      class="block text-sm font-medium text-zinc-700"
                    >
                      Current Password
                    </label>
                    <div class="mt-1 relative">
                      <Field
                        v-model="password"
                        data-test="password"
                        name="password"
                        :type="!toggle ? 'password' : 'text'"
                        class="block w-full appearance-none rounded-md border border-zinc-300 px-3 py-2 placeholder-zinc-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                      <div class="absolute inset-y-2 right-0 pr-3">
                        <div
                          class="flex items-center"
                          @click="toggle = !toggle"
                        >
                          <EyeIcon
                            v-if="toggle"
                            class="h-6 w-6 text-zinc-500"
                          />
                          <EyeSlashIcon v-else class="h-6 w-6 text-zinc-500" />
                        </div>
                      </div>
                    </div>

                    <span class="mb-2 text-xs capitalize text-red-600">
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                  <div class="my-4">
                    <label
                      for="email"
                      class="block text-sm font-medium text-zinc-700"
                    >
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
                  <div
                    class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"
                  >
                    <CancelButton text="Cancel" @click.native="cancel" />
                    <ActionButton text="Update" />
                  </div>
                </Form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
