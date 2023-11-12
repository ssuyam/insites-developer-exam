<template>
  <div>
    <ul class="flex border-b mt-6 mb-12">
      <li class="mr-6">
        <a class="text-blue-500 text-xl text-bold hover:text-blue-800" @click="router.push('/')">Home</a>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style lang="scss" scoped>

</style>