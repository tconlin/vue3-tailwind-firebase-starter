<template>
  <main class="flex-1 pb-8">
    <!-- Page header -->
    <div class="bg-white shadow-xl rounded-xl">
      <div class="px-4 sm:px-6 lg:mx-auto lg:px-8">
        <div class="py-6 md:flex md:items-center md:justify-between">
          <div class="min-w-0 flex-1">
            <!-- Profile -->
            <div class="flex items-center">
              <div>
                <div class="flex items-center">
                  <h1
                    class="ml-3 text-2xl font-bold leading-7 text-zinc-900 sm:truncate sm:leading-9"
                  >
                    {{ getTimeOfDay() }}, {{ user.displayName }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { getTimeOfDay } from '@/misc/helpers'
import { useFirebaseAuth } from '@/stores/auth'
const { user } = storeToRefs(useFirebaseAuth())
</script>
