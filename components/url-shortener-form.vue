<template>
  <div class="w-full max-w-2xl mx-auto">
    <div
        class="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl transform transition-all hover:scale-[1.01] duration-500 relative overflow-hidden">
      <!-- Decorative background elements inside card -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-bl-[100px] -z-0 opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-tr-[80px] -z-0 opacity-50"></div>

      <div class="relative z-10">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Paste your long link here!{' '}
            <span class="inline-block animate-bounce">👇</span>
          </h2>
          <p class="text-gray-500 text-lg">
            We'll make it short, sweet, and shareable.
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Link2 class="h-6 w-6 text-gray-400 group-focus-within:text-pink-500 transition-colors"/>
            </div>
            <input
                type="text"
                v-model="url"
                class="block w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-gray-100 text-gray-900 text-lg rounded-2xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none placeholder-gray-400"
                placeholder="https://super-long-url.com/that-nobody-wants-to-type"
            />
          </div>

          <p v-if="error" class="text-red-500 text-center font-medium animate-pulse">
            Oops! {{ error }} 🙈
          </p>

          <ui-button type="submit" class="w-full text-xl py-5" size="lg" :is-loading="isLoading">
            Shorten It!
            <Sparkles class="ml-2 w-5 h-5"/>
          </ui-button>
        </form>

        <div v-if="shortUrl"
             class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3 overflow-hidden w-full">
              <div class="bg-white p-2 rounded-full shadow-sm">
                <Check class="w-5 h-5 text-green-500"/>
              </div>
              <span class="text-xl font-bold text-blue-600 truncate">
                {{ shortUrl }}
              </span>
            </div>
            <ui-button @click="handleCopy" variant="secondary" size="md" class="w-full md:w-auto whitespace-nowrap">
              <template v-if="copied">Copied! 🎉</template>
              <template v-else>
                Copy Link
                <Copy class="ml-2 w-4 h-4"/>
              </template>
            </ui-button>
          </div>

          <div class="mt-4 pt-4 border-t border-blue-100 flex justify-center">
            <a href="#" class="text-sm text-gray-500 hover:text-blue-500 flex items-center gap-1 transition-colors">
              View stats for this link
              <ArrowRight class="w-3 h-3"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {Link2, Copy, Check, Sparkles, ArrowRight} from 'lucide-vue-next';
import {triggerConfetti} from '~/utils/confetti';

const url = ref('');
const isLoading = ref(false);
const shortUrl = ref('');
const copied = ref(false);
const error = ref('');

const handleSubmit = async () => {
  if (!url.value) return;

  // Basic validation
  if (!url.value.includes('.')) {
    error.value = 'Please enter a valid URL (e.g., google.com)';
    return;
  }

  error.value = '';
  isLoading.value = true;
  shortUrl.value = '';

  // Simulate API call
  setTimeout(() => {
    isLoading.value = false;
    const randomString = Math.random().toString(36).substring(7);
    shortUrl.value = `short.link/${randomString}`;
    triggerConfetti();
  }, 1500);
};

const handleCopy = () => {
  navigator.clipboard.writeText(shortUrl.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>