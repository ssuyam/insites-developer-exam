<template>
  <div v-if="post" class="border shadow mt-4 p-12">
    <div v-if="mode === 'Publish'" class="flex flex-column justify-end mb-8">
      <label class="relative inline-flex items-center cursor-pointer">
        <input v-model="post.isPublished" @change="managePost" :checked="post.isPublished" type="checkbox" value="" class="sr-only peer">
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm font-medium">Publish Post</span>
      </label>
    </div>
    <hr />
    <div class="lg:w-3/5 text-center m-auto">

      <section v-if="post.imgURL" class="hero container max-w-screen-lg mx-auto pb-10 flex justify-center">
        <img class="h-auto max-w-full" :src="post.imgURL" alt="image description" loading="lazy">
      </section>

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
const title = ref('Publish');
let mode = ref('Publish');

if (route.name === 'Preview') mode.value = 'Preview';

const post = ref(postsStore.getPost(route.params.slug));

if (post.isPublished) title.value = 'Publish';

const managePost = () => {
  console.log('publish')
  postsStore.updatePost(post.value);
}
</script>

<style lang="scss" scoped>

</style>