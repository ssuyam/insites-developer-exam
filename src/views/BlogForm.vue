<template>
  <div class="border shadow p-5 mt-12 w-3/4 mx-auto">
    <form @submit.prevent="submit">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-4xl font-semibold leading-7 text-gray-900 decoration-sky-500 underline">{{ title }} Blog</h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
            <div class="sm:col-span-4">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xl">
                  
                  <input v-model="INITIAL_FORM.title" type="text" name="title" id="title" class="block flex-1 border-0 bg-transparent p-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="title">
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <label for="content" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
              <div class="mt-2">
                <textarea v-model="INITIAL_FORM.body" id="content" name="content" rows="3" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">Write some content.</p>
            </div>
            <div class="sm:col-span-4">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Banner Image</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xl">
                  <input v-model="INITIAL_FORM.imgURL" type="text" name="image" id="imageurl" class="block flex-1 border-0 bg-transparent p-2.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="imageurl">
                </div>
                <p @click="generateRandomImage" id="helper-text-explanation" class="mt-2 text-sm text-indigo-500 dark:text-indigo-400 link">Generate Random Image</p>

                <div class="..." v-if="INITIAL_FORM.imgURL">
                  <img :src="INITIAL_FORM.imgURL" class="object-cover h-48 w-96 ...">
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="INITIAL_FORM.isPublished" :checked="INITIAL_FORM.isPublished" type="checkbox" value="" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium">Publish Post</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button @click="router.push('/')" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import usePostsStore from '../stores/posts';
import slugify from '@/composables/slugify';

const INITIAL_FORM = ref({
  id: null,
  title: '',
  body: '',
  userId: 1,
  isPublished: false,
  imgURL: '',
});
const postsStore = usePostsStore();
const title = ref('Create');
const route = useRoute();
const router = useRouter();
if (route.params.id) {
  const data = postsStore.getPostById(route.params.id);
  
  INITIAL_FORM.value.title = data.title;
  INITIAL_FORM.value.body = data.body;
  INITIAL_FORM.value.id = data.id;
  INITIAL_FORM.value.isPublished = data.isPublished;
  INITIAL_FORM.value.imgURL = data.imgURL;
  title.value = 'Edit'
}

const submit = () => {
  INITIAL_FORM.value.slug = slugify(INITIAL_FORM.value.title);
  if (route.params.id) {
    postsStore.updatePost(INITIAL_FORM.value);
  } else {
    postsStore.addPost(INITIAL_FORM.value);
  }
  router.push('/');
}

const generateRandomImage = () => {
  const id = Math.floor((Math.random() * 1000) + 1)
  const url = `https://picsum.photos/id/${id}/600/400`;
  INITIAL_FORM.value.imgURL = url;
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>