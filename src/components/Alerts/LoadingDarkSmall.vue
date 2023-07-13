<script setup>
defineProps({
  text: String
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div id="loading-spinner" class="">
      <div class="spin-icon"></div>
    </div>
    <p class="font-light text-sm ml-2 text-blue-800 text-right">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
#loading-spinner .spin-icon {
  margin: auto;
  width: 20px;
  height: 20px;
  border: solid 3px transparent;
  border-top-color: #2563eb;
  border-left-color: #2563eb;
  border-radius: 40px;
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
