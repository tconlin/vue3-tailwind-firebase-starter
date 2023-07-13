<template>
  <div class="flex items-center justify-center h-screen">
    <div id="loading-spinner" class="absolute">
      <div class="spin-icon"></div>
    </div>
    <p
      class="absolute font-medium text-md text-blue-500 text-center m-auto mt-36"
    >
      {{ text }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped>
#loading-spinner .spin-icon {
  margin: auto;
  width: 80px;
  height: 80px;
  border: solid 6px transparent;
  border-top-color: #2563eb;
  border-left-color: #2563eb;
  border-radius: 80px;
  -webkit-animation: loading-spinner 500ms linear infinite;
  -moz-animation: loading-spinner 500ms linear infinite;
  -ms-animation: loading-spinner 500ms linear infinite;
  -o-animation: loading-spinner 500ms linear infinite;
  animation: loading-spinner 500ms linear infinite;
}
@-webkit-keyframes loading-spinner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes loading-spinner {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes loading-spinner {
  0% {
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-ms-keyframes loading-spinner {
  0% {
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading-spinner {
  0% {
    transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
