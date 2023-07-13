<template>
  <div class="pt-2 pb-2 w-full inline-block">
    <label
      v-if="props.title"
      for="title"
      class="font-base block text-xs text-zinc-700"
    >
      {{ props.title }}
    </label>
    <div class="relative mt-1 rounded-lg">
      <input
        v-model="modelValue"
        :maxlength="props.maxLength"
        :type="props.type"
        class="block w-full rounded-md border border-zinc-200 p-4 text-xs focus:border-blue-200 focus:ring-blue-200 sm:text-sm"
        min="0"
        autocomplete="on"
        :max="props.max"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        :value="props.modelValue"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  id: String,
  title: String,
  maxLength: Number,
  disabled: Boolean,
  type: String,
  modelValue: {
    type: [Object, String, null],
    required: true
  },
  max: Number,
  placeholder: String,
  iconName: String
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
