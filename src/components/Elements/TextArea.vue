<template>
  <div>
    <label v-if="props.title" class="block text-sm font-medium text-zinc-500">
      {{ props.title }}
    </label>
    <div class="mt-1">
      <textarea
        rows="4"
        v-model="modelValue"
        :placeholder="props.placeholder"
        class="block w-full p-2 rounded-md border border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  id: String,
  title: String,
  placeholder: String,
  modelValue: {
    type: [String, null],
    required: true
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
