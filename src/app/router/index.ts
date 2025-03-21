import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@pages/home-page.vue'),
    },
    {
      path: '/sign-up',
      name: 'sing-up',
      component: () => import('@pages/sign-up-page.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ],
});

export default router;
