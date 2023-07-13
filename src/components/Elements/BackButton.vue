<script setup>
defineProps({
  text: String,
  redirect: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="w-48 absolute h-10 left-0 top-0 mt-8 ml-8">
    <router-link :to="redirect">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current text-blue-600 w-8 float-left"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <p class="font-medium text-blue-600 hover:text-blue-500 float-left mt-1">
        {{ text }}
      </p>
    </router-link>
  </div>
</template>
