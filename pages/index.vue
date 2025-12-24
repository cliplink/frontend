<template>
  <div
      class="min-h-screen w-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 animate-gradient flex flex-col">
    <main class="flex-grow flex flex-col items-center justify-center px-4 pt-10 pb-20">
      <div class="text-center mb-12 max-w-3xl mx-auto">
        <div
            class="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm mb-6 border border-white/30 animate-bounce">
          ✨ The friendliest URL shortener ever!
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
          Make your links <br/>
          <span class="text-yellow-300 relative inline-block">
            short & sweet
            <svg class="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 opacity-60" viewBox="0 0 100 10"
                 preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/>
            </svg>
          </span>{' '}
          🍭
        </h1>
        <p class="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium">
          Transform those long, ugly links into tiny, shareable gems. Free,
          fast, and full of joy!
        </p>
      </div>

      <url-shortener-form/>

      <benefits-section/>
    </main>

  </div>
</template>

<script setup lang="ts">
import {Github, Twitter, Heart} from 'lucide-vue-next';
</script>