<template>
  <ui-modal :is-open="isOpen" @close="close">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">Create Account 🚀</h2>
      <p class="text-gray-500">Join us to start shortening URLs.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700 ml-1">Email</label>
        <div class="relative">
          <Mail class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="block w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
            :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': error }"
            required
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="password" class="block text-sm font-medium text-gray-700 ml-1">Password</label>
        <div class="relative">
          <Lock class="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="block w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all outline-none"
            :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': error }"
            required
          />
        </div>
      </div>

      <div v-if="error"
           class="bg-red-50 text-red-600 p-3 rounded-xl text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
        <AlertCircle class="w-5 h-5 shrink-0" />
        <div>
          <p class="font-medium">Registration Failed</p>
          <p>{{ error }}</p>
        </div>
      </div>

      <ui-button
        type="submit"
        class="w-full text-lg py-3"
        :is-loading="isLoading"
      >
        Sign Up
      </ui-button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-500">
      Already have an account?
      <a href="#" @click.prevent="switchToLogin" class="text-pink-500 font-bold hover:underline">Log in</a>
    </div>
  </ui-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Mail, Lock, AlertCircle } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'switch-to-login'): void;
}>();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const { auth, user } = useApi();

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    error.value = '';
    email.value = '';
    password.value = '';
  }
});

const close = () => {
  emit('close');
};

const switchToLogin = () => {
  emit('switch-to-login');
};

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    await user.createUser({
      email: email.value,
      password: password.value,
    });

    // login after register
    const loginResponse = await auth.login({
      email: email.value,
      password: password.value,
    });

    const token = useCookie('accessToken');
    token.value = loginResponse.accessToken;

    close();
  } catch (err: any) {
    console.error('Registration error:', err);
    if (err.response?._data?.message) {
      const { message } = err.response._data;
      error.value = Array.isArray(message) ? message[0] : message;
    } else {
      error.value = 'An unexpected error occurred.';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
