<script setup>
import {onMounted} from 'vue';
import AppLayout from '@/layouts/AppLayout.vue'
import usePostsStore from '@/stores/posts';

const postsStore = usePostsStore();
onMounted(async () => {
  postsStore.getPosts();
});
</script>

<template>
  <div class="sm:container sm:mx-auto">
    <!-- <RouterView /> -->
      <AppLayout />
  </div>
</template>

<style scoped>

</style>
