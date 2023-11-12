<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import BlogDelete from '../components/BlogDelete.vue';
import pencil from '../components/icons/pencil.vue';
import trash from '../components/icons/trash.vue';
import usePostsStore from '../stores/posts';

const postsStore = usePostsStore();


const router = useRouter();

onMounted(async () => {
  
  if (postsStore.posts.length === 0) {
    await getPosts();
  }
  
});

const posts = ref(null);
const isShowDeleteModal = ref(false);
const toDelete = ref(null);

const getPosts = () => {
  try {
    postsStore.getPosts();
  } catch (e) {
    console.error(e);
  }
  
}
const showDeleteModal = (postId) => {
  isShowDeleteModal.value = true;
  toDelete.value = postId;
}

const closeDeleteModal = () => {
  isShowDeleteModal.value = false;
}

const deletePost = () => {
  if (toDelete) {
    postsStore.deletePost(toDelete.value);
    toDelete.value = null; 
    closeDeleteModal();
  }
}
</script>

<template>
    <div class="sm:border sm:border-gray-400 sm:rounded-sm sm:m-8 p-2 sm:p-8">
      <div class="header border-b-4 mb-8">
        <button @click="router.push('/blog/')" class="btn-primary float-right">Create New Post</button>
        <h1 class="text-4xl text-center m-2.5 decoration-sky-500 underline">BlogPosts</h1>
      </div>
      <div v-for="post in postsStore.posts" :key="post.id" class="flex flex-wrap justify-between border-b-2 mr-2.5 ml-2.5 mt-2.5 p-2.5 mb-36">
        <div class="w-full lg:w-4/5">
          <h4 @click="router.push(`/blog/view/${post.id}`)" class="text-xl font-semibold text-sky-400 after:content-['_↗'] link mb-6">{{post.title}}</h4>
          <p class="ml-8 text-base text-gray-700">{{post.body}}</p>
        </div>
        <div class="w-full flex lg:w-1/5 p-2.5 justify-end">
          <button @click="router.push(`/blog/${post.id}`)" class="btn-primary"><pencil /></button>
          <button @click="showDeleteModal(post.id)" class="btn-primary"><trash /></button>
        </div>
      </div>
      <BlogDelete :isShowModal="isShowDeleteModal" @closeDeleteModal="closeDeleteModal" @deletePost="deletePost" />
    </div>
</template>

<style scoped>
.link {
  cursor: pointer;
}
</style>
