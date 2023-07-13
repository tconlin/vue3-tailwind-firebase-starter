<template>
  <div>
    <Listbox v-model="modelValue">
      <ListboxLabel v-if="label" class="text-sm text-zinc-500">
        {{ label }}
      </ListboxLabel>
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
        >
          <span v-if="modelValue" class="block truncate">
            {{ modelValue.name }}
          </span>
          <span v-else class="block truncate">
            {{ props.options[defaultOptionIndex].name }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-zinc-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 z-50 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.id"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-blue-100 text-blue-900' : 'text-zinc-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate'
                  ]"
                >
                  {{ option.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  label: String,
  modelValue: {
    type: [Object, null],
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: false
  },
  defaultOptionIndex: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  if (!props.modelValue) {
    emit('updateValue', props.options[props.defaultOptionIndex], props.id)
  }
})

const emit = defineEmits(['updateValue'])

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('updateValue', value, props.id)
  }
})
</script>
