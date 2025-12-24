<script setup lang="ts">
import { ref } from 'vue';

const isAuthModalOpen = ref(false);
</script>

<template>
  <nav class="p-6">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2">
        <div class="bg-white p-2 rounded-xl shadow-lg rotate-3">
          <span class="text-2xl">🔗</span>
        </div>
        <span class="text-2xl font-bold text-white drop-shadow-md tracking-wide">
            Shorty
          </span>
      </div>
      <div class="hidden md:flex gap-4">
        <ui-button variant="ghost" size="sm" @click="isAuthModalOpen = true">
          Log In
        </ui-button>
        <ui-button variant="secondary" size="sm" class="shadow-none border-0">
          Sign Up Free
        </ui-button>
      </div>
    </div>
    
    <auth-modal :is-open="isAuthModalOpen" @close="isAuthModalOpen = false" />
  </nav>
</template>

<style scoped>

</style>