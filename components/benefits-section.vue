<template>
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
          Why choose us? 🌈
        </h2>
        <p class="text-xl text-white/90 max-w-2xl mx-auto font-medium">
          We're not just another URL shortener. We're the fun one!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
            v-for="(benefit, index) in benefits"
            :key="index"
            class="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:rotate-0"
            :class="benefit.rotate"
        >
          <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform -rotate-3"
              :class="benefit.color"
          >
            <component :is="benefit.icon" class="w-8 h-8 text-white"/>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-3">
            {{ benefit.title }}
          </h3>
          <p class="text-gray-500 leading-relaxed">
            {{ benefit.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {Zap, Shield, Smile, BarChart3} from 'lucide-vue-next';

const benefits = [
  {
    title: 'Super Fast',
    description: "Blink and it's done! Our shortening engine is optimized for speed.",
    icon: Zap,
    color: 'bg-yellow-400',
    shadow: 'shadow-yellow-200',
    rotate: '-rotate-2'
  },
  {
    title: 'Secure & Safe',
    description: 'We protect your data with bank-level encryption. Sleep easy!',
    icon: Shield,
    color: 'bg-green-400',
    shadow: 'shadow-green-200',
    rotate: 'rotate-1'
  },
  {
    title: 'User Friendly',
    description: 'So simple, your grandma could use it. No tech degree required.',
    icon: Smile,
    color: 'bg-pink-400',
    shadow: 'shadow-pink-200',
    rotate: '-rotate-1'
  },
  {
    title: 'Analytics',
    description: 'Track your clicks in real-time. Know your audience better.',
    icon: BarChart3,
    color: 'bg-purple-400',
    shadow: 'shadow-purple-200',
    rotate: 'rotate-2'
  }
];
</script>