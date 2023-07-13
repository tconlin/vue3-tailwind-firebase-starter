<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useApp } from '@/stores/app'
import Loader from '@/components/Alerts/LoadingDarkSmall.vue'
import CancelButton from '@/components/Elements/ButtonCancel.vue'
import ActionButton from '@/components/Elements/ButtonAction.vue'
import DangerButton from '@/components/Elements/ButtonDanger.vue'
const { modal, moduleLoading } = storeToRefs(useApp())

const app = useApp()

const props = defineProps({
  onExecute: {
    type: Function,
    required: true
  },
  onCancel: {
    type: Function,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    required: true
  },
  redButton: {
    type: Boolean,
    default: false
  }
})

const cancel = () => {
  app.toggleModal(null)
}
</script>

<template>
  <TransitionRoot appear :show="modal == 'warning'" as="template">
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
              class="w-full max-w-md transform overflow-hidden m-auto text-center rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <Loader v-if="moduleLoading" class="m-auto my-12" />
              <div v-if="!moduleLoading">
                <p>{{ message }}</p>
                <div class="mt-5 flex justify-between">
                  <CancelButton text="Cancel" @click.native="onCancel" />
                  <DangerButton
                    v-if="redButton"
                    :text="confirmText"
                    @click.native="onExecute"
                  />
                  <ActionButton
                    v-else
                    :text="confirmText"
                    @click.native="onExecute"
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
