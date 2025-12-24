<script setup lang="ts">

</script>

<template>
  <div
      class="min-h-screen w-full bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 animate-gradient flex flex-col">
    <layout-regions-header/>
    <slot/>
    <layout-regions-footer/>
  </div>
</template>

<style scoped>

</style>