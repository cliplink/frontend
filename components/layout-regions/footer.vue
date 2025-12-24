<script setup lang="ts">

import {Github, Heart, Twitter} from "lucide-vue-next";
</script>

<template>
  <footer class="bg-black/10 backdrop-blur-sm text-white py-12 border-t border-white/10">
    <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="text-center md:text-left">
        <div class="flex items-center gap-2 justify-center md:justify-start mb-4">
          <span class="text-2xl">🔗</span>
          <span class="text-xl font-bold">Shorty</span>
        </div>
        <p class="text-white/60 text-sm">
          Making the internet a shorter place, one link at a time.
        </p>
      </div>

      <div class="flex gap-6">
        <a href="#" class="hover:text-pink-300 transition-colors transform hover:scale-110 duration-200">
          <Twitter class="w-6 h-6"/>
        </a>
        <a href="#" class="hover:text-pink-300 transition-colors transform hover:scale-110 duration-200">
          <Github class="w-6 h-6"/>
        </a>
      </div>

      <div class="text-sm text-white/60 flex items-center gap-1">
        Made with{' '}
        <Heart class="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse"/>
        {' '}
        by Magic Patterns
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>