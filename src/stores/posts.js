import { defineStore } from 'pinia';

const usePostsStore = defineStore('postsStore', {
  state: () => ({
    posts: []
  }),
  persist: true,
  getters: {

  },
  actions: {
    getPosts() {
      try {
        return fetch('https://jsonplaceholder.typicode.com/posts')
                        .then(r => r.json())
                        .then(data => this.posts = data);
      } catch (e) {
        console.error(e);
      }
    },
    getPost(id) {
      const index = this.posts.findIndex(p => p.id === parseInt(id));
      return this.posts[index];
    },
    addPost(post) {
      post.id = Math.floor((Math.random() * 1000000) + 1)
      this.posts.unshift(post);
    },
    deletePost(id) {
      try {
        this.posts = this.posts.filter(p => p.id !== id);
      } catch(e) {
        console.error(e);
      }
    },
    updatePost(post) {
      console.log('post', post);
      const index = this.posts.findIndex(p => p.id === post.id);
      this.posts[index] = post;
    }
  },
});

export default usePostsStore;