<template>
  <div class="border shadow mt-4 p-12">
    <div class="w-1/2 lg:w-3/5">
      <h4 class="text-xl font-semibold mb-2.5 text-grey-400">{{post.title}}</h4>
      <p class="text-base text-gray-700 ml-8">{{post.body}}</p>
      <button @click="router.push('/')" type="button" class="btn-primary mt-12 text-sm font-semibold leading-6">Go Back</button>
    </div>
  </div>
</template>

<script setup>
import usePostsStore from '../stores/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();

const post = ref(postsStore.getPost(route.params.id));
</script>

<style lang="scss" scoped>

</style>