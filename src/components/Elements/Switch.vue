<template>
  <SwitchGroup>
    <div>
      <SwitchLabel v-if="label" class="mr-4 font-base text-zinc-700 text-sm">
        {{ label }}
        <span
          v-if="price"
          class="bg-zinc-200 font-medium text-sm text-zinc-800 rounded-xl p-2 inline-block"
        >
          {{ formatPrice(price) }}
        </span>
      </SwitchLabel>
      <Switch
        v-model="modelValue"
        @click="emit('clickFunction')"
        :class="modelValue ? 'bg-blue-700' : 'bg-zinc-400'"
        class="relative inline-flex h-5 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          :class="modelValue ? 'translate-x-6' : 'translate-x-0'"
          class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
        />
      </Switch>
    </div>
  </SwitchGroup>
</template>

<script setup>
import { computed } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const props = defineProps({
  label: String,
  price: String,
  modelValue: {
    type: [Boolean, null],
    required: true
  },
  id: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['updateValue', 'clickFunction'])

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return emit('updateValue', value, props.id)
  }
})
</script>
