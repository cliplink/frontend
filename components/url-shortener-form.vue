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
              <Link2 
                class="h-6 w-6 transition-colors"
                :class="error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-pink-500'"
              />
            </div>
            <input
                type="text"
                v-model="url"
                class="block w-full pl-14 pr-6 py-5 bg-gray-50 border-2 text-gray-900 text-lg rounded-2xl transition-all outline-none placeholder-gray-400"
                :class="error ? 'border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-400' : 'border-gray-100 focus:ring-4 focus:ring-pink-100 focus:border-pink-400'"
                placeholder="https://super-long-url.com/that-nobody-wants-to-type"
                @input="handleInputChange"
            />
          </div>

           <!-- Error Messages -->
           <div v-if="error" class="p-4 rounded-2xl border-2 animate-in fade-in slide-in-from-top-2 duration-300"
               :class="errorType === 'validation' ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'">
            <div class="flex items-start gap-3">
              <div class="flex-shrink-0" :class="errorType === 'validation' ? 'text-orange-500' : 'text-red-500'">
                <AlertCircle v-if="errorType === 'validation'" class="w-6 h-6" />
                <XCircle v-else class="w-6 h-6" />
              </div>
              <div class="flex-1">
                <p class="font-semibold mb-1" :class="errorType === 'validation' ? 'text-orange-800' : 'text-red-800'">
                  {{ errorType === 'validation' ? 'Invalid URL' : 'Server Error' }}
                </p>
                <div class="text-sm" :class="errorType === 'validation' ? 'text-orange-700' : 'text-red-700'">
                  <template v-if="Array.isArray(error)">
                    <ul class="list-disc list-inside">
                      <li v-for="(msg, index) in error" :key="index">{{ msg }}</li>
                    </ul>
                  </template>
                  <template v-else>
                    {{ error }}
                  </template>
                </div>
              </div>
            </div>
          </div>

          <ui-button type="submit" class="w-full text-xl py-5" size="lg" :is-loading="isLoading">
            {{ isLoading ? 'Shortening...' : 'Shorten It!' }}
            <Sparkles class="ml-2 w-5 h-5"/>
          </ui-button>
        </form>

        <div v-if="shortUrl"
             class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-lg">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3 overflow-hidden w-full">
              <div class="bg-white p-2 rounded-full shadow-md animate-bounce">
                <Check class="w-5 h-5 text-green-500"/>
              </div>
              <div class="flex-1 min-w-0">
                  <p class="text-xs text-gray-500 mb-1 font-medium">
                    Your shortened link:
                  </p>
                  <span class="text-xl md:text-2xl font-bold text-blue-600 truncate block">
                    {{ shortUrl }}
                  </span>
                </div>
            </div>
            <ui-button @click="handleCopy" variant="secondary" size="md" class="w-full md:w-auto whitespace-nowrap shadow-md hover:shadow-lg">
              <template v-if="copied">
                 Copied! <Check class="ml-2 w-4 h-4 text-green-500"/>
              </template>
              <template v-else>
                Copy Link
                <Copy class="ml-2 w-4 h-4"/>
              </template>
            </ui-button>
          </div>

          <div class="mt-4 pt-4 border-t border-blue-200 flex justify-center">
            <a href="#" class="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 transition-colors font-medium">
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
import {Link2, Copy, Check, Sparkles, ArrowRight, AlertCircle, XCircle} from 'lucide-vue-next';
import {triggerConfetti} from '~/utils/confetti';

type ErrorType = 'validation' | 'server' | null;

const url = ref('');
const isLoading = ref(false);
const shortUrl = ref('');
const copied = ref(false);
const error = ref<string | string[]>('');
const errorType = ref<ErrorType>(null);
const { links } = useApi();
const config = useRuntimeConfig();

const isValidUrl = (urlString: string): boolean => {
  try {
    // Add protocol if missing
    const urlToTest = urlString.startsWith('http') ? urlString : `https://${urlString}`;
    const url = new URL(urlToTest);
    // Check if it has a valid domain with TLD
    return url.hostname.includes('.') && url.hostname.split('.').length >= 2;
  } catch {
    return false;
  }
};

const handleInputChange = () => {
    // Clear errors when user starts typing
    if (error.value) {
      error.value = '';
      errorType.value = null;
    }
};

const handleSubmit = async () => {
  if (!url.value.trim()) {
      error.value = 'Please enter a URL first! 🔗';
      errorType.value = 'validation';
      return;
    }

  // Basic validation
  if (!isValidUrl(url.value)) {
    error.value = 'Hmm, that doesn\'t look like a valid URL. Try something like "example.com" or "https://example.com"';
    errorType.value = 'validation';
    return;
  }

  error.value = '';
  errorType.value = null;
  isLoading.value = true;
  shortUrl.value = '';

  try {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const link = await links.createLink({
        target: url.value,
        expiresAt: expiresAt.toISOString()
    });

    shortUrl.value = `${config.public.apiBaseUrl}/l/${link.shortId}`;

    triggerConfetti();
  } catch (err: any) {
      console.error('Create link error:', err);
      errorType.value = 'server';
      if (err.response?._data?.message) {
        error.value = err.response._data.message;
      } else {
        error.value = 'Oops! Our servers are having a moment. Please try again in a few seconds.';
      }
  } finally {
    isLoading.value = false;
  }
};

const handleCopy = () => {
  navigator.clipboard.writeText(shortUrl.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};
</script>
