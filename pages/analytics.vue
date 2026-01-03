<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div class="py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Link Analytics</h1>
        
        <div class="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div class="bg-indigo-50 p-6 rounded-full">
            <span class="text-6xl">📊</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-700">Analytics Coming Soon!</h2>
          <p class="text-gray-500 max-w-md">
            We are building a powerful dashboard for you to track your link performance, clicks, and geographic data.
          </p>
          <NuxtLink to="/">
            <ui-button variant="primary" class="mt-4">
              Back to Home
            </ui-button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
