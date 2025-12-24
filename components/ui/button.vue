<template>
  <button
    :class="[baseStyles, variants[variant], sizes[size], className]"
    :disabled="disabled || isLoading"
    v-bind="$attrs"
  >
    <template v-if="isLoading">
      <Loader2 class="w-5 h-5 mr-2 animate-spin" />
      Processing...
    </template>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  className: '',
  disabled: false,
});

const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-pink-300 border-b-4 border-pink-700 active:border-b-0 active:translate-y-1',
  secondary: 'bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg focus:ring-gray-200 border-2 border-transparent',
  ghost: 'bg-transparent hover:bg-white/10 text-white hover:text-white/90'
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};
</script>