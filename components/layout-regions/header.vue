<script setup lang="ts">
import { ref } from 'vue';

const isLoginOpen = ref(false);
const isRegisterOpen = ref(false);

const openLogin = () => {
  isRegisterOpen.value = false;
  isLoginOpen.value = true;
};

const openRegister = () => {
  isLoginOpen.value = false;
  isRegisterOpen.value = true;
};
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
        <ui-button variant="ghost" size="sm" @click="openLogin">
          Log In
        </ui-button>
        <ui-button variant="secondary" size="sm" class="shadow-none border-0" @click="openRegister">
          Sign Up Free
        </ui-button>
      </div>
    </div>
    
    <auth-login 
      :is-open="isLoginOpen" 
      @close="isLoginOpen = false"
      @switch-to-register="openRegister"
    />

    <auth-register
      :is-open="isRegisterOpen"
      @close="isRegisterOpen = false"
      @switch-to-login="openLogin"
    />
  </nav>
</template>

<style scoped>

</style>