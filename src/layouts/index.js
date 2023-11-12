import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Blog Post List',
      component: () => import('../views/BlogPosts.vue'),
      meta: { layout: 'DefaultLayout' }
    },
    {
      path: '/blog',
      name: 'Blogs',
      children: [
        {
          path: '',
          name: 'Blog Lists',
          component: () => import('../views/BlogForm.vue'),
          meta: { layout: 'DefaultLayout' }
        },
        {
          path: ':id',
          name: 'Blog Form',
          component: () => import('../views/BlogForm.vue'),
          meta: { layout: 'DefaultLayout' }
        },
        {
          path: 'view/:id',
          name: 'Blog Post',
          component: () => import('../views/BlogPost.vue'),
          meta: { layout: 'DefaultLayout' }
        }
      ]
    }
  ]
})

export default router
