import { AuthoredApi } from '@/shared/api/authored/authored.api';
import Container from 'typedi';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home-page/home-page.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/auth-page/ui/auth-page.vue'),
      meta: {
        requiresAuth: false,
        requiresUnauth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/',
    },
  ],
});

router.beforeEach(async (to) => {
  const api = Container.get(AuthoredApi);

  if (!api.isLoggedIn) {
    try {
      await api.refresh();
    } catch {}
  }

  if (to.meta.requiresAuth) {
    if (!api.isLoggedIn) {
      return 'auth';
    }
  } else if (to.meta.requiresUnauth) {
    if (api.isLoggedIn) {
      return 'home';
    }
  }
});

export default router;
