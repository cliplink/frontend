<script setup lang="ts">
import { ref, computed } from 'vue';

const isLoginOpen = ref(false);
const isRegisterOpen = ref(false);
const token = useCookie('accessToken');
const { auth } = useApi();

const isAuthenticated = computed(() => !!token.value);

const openLogin = () => {
  isRegisterOpen.value = false;
  isLoginOpen.value = true;
};

const openRegister = () => {
  isLoginOpen.value = false;
  isRegisterOpen.value = true;
};

const handleLogout = async () => {
  try {
    await auth.logout();
  } catch (e) {
    console.error('Logout error:', e);
  } finally {
    token.value = null;
  }
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
          <NuxtLink to="/" class="cursor">
            Clikl
          </NuxtLink>
        </span>
      </div>
      <div class="hidden md:flex gap-4">
        <template v-if="isAuthenticated">
          <NuxtLink to="/analytics">
            <ui-button variant="ghost" size="sm">
              Analytics
            </ui-button>
          </NuxtLink>
          <ui-button variant="ghost" size="sm" @click="handleLogout">
            Log Out
          </ui-button>
        </template>
        <template v-else>
          <ui-button variant="ghost" size="sm" @click="openLogin">
            Log In
          </ui-button>
          <ui-button variant="secondary" size="sm" class="shadow-none border-0" @click="openRegister">
            Sign Up Free
          </ui-button>
        </template>
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