<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';

import BlogDelete from '../components/BlogDelete.vue';
import Pagination from '../components/Pagination.vue';
import Spinner from '../components/Spinner.vue';
import pencil from '../components/icons/pencil.vue';
import trash from '../components/icons/trash.vue';
import usePostsStore from '../stores/posts';

const postsStore = usePostsStore();
const posts = ref([]);
const isLoading = ref(true);

const router = useRouter();

/* Pagination */
  const totalBlogs = ref(0);
  let page = ref(0);
  const perPage = ref(10);
  const totalPage = ref(1);
  const maxButtons = ref(6);
  watch(page, () => {
    getPaginatedBlogLists();
  });
/* End Pagination */

onMounted(async () => {
  setTimeout(() => {
    page.value = 1;
    isLoading.value = false;
    totalBlogs.value = postsStore.posts.length;
  }, 1000);
});

const isShowDeleteModal = ref(false);
const toDelete = ref(null);

const getPaginatedBlogLists = () => {
  posts.value = postsStore.getPaginatedBlog(page.value, perPage.value);
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
    getPaginatedBlogLists();
  }
}

const next = () => {
  page.value++;
}
const prev = () => {
  page.value--;
}
const goto = (pNum) => {
  page.value = pNum;
}

const activeLink = ref(`text-sky-400 after:content-['_↗'] link`);
</script>

<template>
    <div class="sm:border sm:border-gray-400 sm:rounded-sm sm:m-8 p-2 sm:p-8">
      <div class="header border-b-4 mb-8">
        <button @click="router.push('/blog/')" class="btn-primary float-right">Create New Post</button>
        <h1 class="text-4xl text-center m-2.5 decoration-sky-500 underline">BlogPosts</h1>
      </div>
      <div v-if="!isLoading">
        <div v-for="post in posts" :key="post.id" class="flex flex-wrap justify-between border-b-2 mr-2.5 ml-2.5 mt-2.5 p-2.5 mb-36">
          <div class="mx-auto justify-center sm:flex sm:flex-column w-full lg:w-4/5">
            <div class="w-full sm:w-auto">
              <img v-if="post.imgURL" class="h-100 max-w-full sm:h-24 sm:max-w-xs sm:mt-2 sm:mr-4" :src="post.imgURL" alt="image">
              <img v-else class="h-100 max-w-full sm:h-24 sm:max-w-xs sm:mt-2 sm:mr-4" src="https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-12.jpg" alt="no image" />
            </div>
            <div>
              <h4 v-if="post.isPublished" @click="router.push(`/blog/preview/${post.slug}`)" class="text-xl font-semibold mb-6 mt-0 text-sky-400 after:content-['_↗'] link">{{post.title}}</h4>
              <h4 v-else :class="[{ activeLink : post.isPublished }, 'text-xl font-semibold mb-6 mt-0']">{{post.title}}</h4>
              <p class="text-base text-gray-700">{{post.body}}</p>
              <p v-if="post.isPublished" class="text-base text-indigo-300">Published</p>
              <p @click="router.push(`/blog/publish/${post.slug}`)" v-else class="text-base text-red-300 text-underline link">Publish now</p>
            </div>
          </div>
          <div class="w-full flex lg:w-1/5 p-2.5 justify-end">
            <button @click="router.push(`/blog/${post.id}`)" class="btn-primary"><pencil /></button>
            <button @click="showDeleteModal(post.id)" class="btn-primary"><trash /></button>
          </div>
        </div>
      </div>
      <div v-else>
        <Spinner />
      </div>
      <BlogDelete :isShowModal="isShowDeleteModal" @closeDeleteModal="closeDeleteModal" @deletePost="deletePost" />
      <Pagination
        v-if="posts.length > 0"
        :page="page"
        :totalPage="Math.ceil(totalBlogs / perPage)"
        :maxButtons="maxButtons"
        :perPage="perPage"
        @next="next"
        @prev="prev"
        @goto="goto"
      />
    </div>
</template>

<style scoped>
.link {
  cursor: pointer;
}
</style>
